import { spawn } from 'node:child_process'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const targetUrl = process.argv[2] || 'http://127.0.0.1:5173'
const screenshotPath = process.argv[3] || 'visual-check.png'
const widths = [375, 430, 768, 1024, 1280, 1440, 1920]
const captureWidths = process.argv[4]
  ? process.argv[4].split(',').map(Number)
  : [375, 768, 1440, 1920]
const captureMode = process.argv[5]
const captureCartQuantity = captureMode === 'cartquantity'
const captureCart = captureMode === 'cart' || captureCartQuantity
const captureJewellery = captureMode === 'jewellery'
const profile = await mkdtemp(join(tmpdir(), 'codex-various-browser-'))

const browser = spawn(
  chromePath,
  [
    '--remote-debugging-pipe',
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-component-update',
    '--disable-extensions',
    '--window-position=-32000,-32000',
    '--window-size=1440,900',
    '--disable-gpu',
    '--disable-software-rasterizer',
    'about:blank',
  ],
  {
    windowsHide: true,
    stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'],
  },
)

const pending = new Map()
let commandId = 0
let responseBuffer = Buffer.alloc(0)

browser.stdio[4].on('data', (chunk) => {
  responseBuffer = Buffer.concat([responseBuffer, chunk])
  let boundary = responseBuffer.indexOf(0)

  while (boundary !== -1) {
    const payload = responseBuffer.subarray(0, boundary).toString('utf8')
    responseBuffer = responseBuffer.subarray(boundary + 1)
    boundary = responseBuffer.indexOf(0)
    if (!payload) continue
    const message = JSON.parse(payload)
    if (!message.id || !pending.has(message.id)) continue
    const { resolve, reject, timer } = pending.get(message.id)
    clearTimeout(timer)
    pending.delete(message.id)
    if (message.error) reject(new Error(message.error.message))
    else resolve(message.result)
  }
})

browser.stdio[2].on('data', (chunk) => process.stderr.write(chunk))

const send = (method, params = {}, sessionId) => {
  const id = ++commandId
  const payload = { id, method, params }
  if (sessionId) payload.sessionId = sessionId
  browser.stdio[3].write(`${JSON.stringify(payload)}\0`)
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id)
      reject(new Error(`Timed out waiting for ${method}`))
    }, 20000)
    pending.set(id, { resolve, reject, timer })
  })
}

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

try {
  await send('Browser.getVersion')
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
  await send('Page.enable', {}, sessionId)
  await send('Runtime.enable', {}, sessionId)
  await send('Page.navigate', { url: targetUrl }, sessionId)
  await delay(1500)
  if (captureMode === 'autoplay') await delay(3500)

  const results = []
  for (const width of widths) {
    await send(
      'Emulation.setDeviceMetricsOverride',
      {
        width,
        height: width < 768 ? 844 : 900,
        deviceScaleFactor: 1,
        mobile: width < 768,
      },
      sessionId,
    )
    await delay(250)
    const evaluation = await send(
      'Runtime.evaluate',
      {
        expression: `JSON.stringify({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          height: document.documentElement.scrollHeight,
          rightEdge: [...document.querySelectorAll('body *')]
            .map((element) => ({ element, rect: element.getBoundingClientRect() }))
            .filter(({ rect }) => rect.right >= document.documentElement.scrollWidth - 1)
            .slice(0, 5)
            .map(({ element, rect }) => ({
              tag: element.tagName,
              className: String(element.className).slice(0, 100),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width)
            })),
          sections: [...document.querySelectorAll('main > section')].map((section) => ({
            id: section.id,
            width: Math.round(section.getBoundingClientRect().width)
          })),
          collectionTab: (() => {
            const tab = [...document.querySelectorAll('#collections button')]
              .find((button) => button.textContent.trim() === 'Moldavite')
            if (!tab) return null
            const style = getComputedStyle(tab)
            const rect = tab.getBoundingClientRect()
            return {
              className: tab.className,
              fontFamily: style.fontFamily,
              fontSize: style.fontSize,
              lineHeight: style.lineHeight,
              letterSpacing: style.letterSpacing,
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            }
          })(),
          carousel: (() => {
            const current = document.querySelector('#shop [aria-current="true"]')
            const progress = current?.querySelector('span')
            const track = document.querySelector('#shop [style*="translateX"]')
            return {
              slide: document.querySelector('#shop [aria-live="polite"]')?.textContent.trim(),
              trackTransform: track?.style.transform,
              progressTransform: progress ? getComputedStyle(progress).transform : null,
              progressAnimation: progress ? getComputedStyle(progress).animationName : null,
              indicatorCursor: current ? getComputedStyle(current).cursor : null
            }
          })()
        })`,
        returnByValue: true,
      },
      sessionId,
    )
    results.push({ width, ...JSON.parse(evaluation.result.value) })
  }

  for (const width of captureWidths) {
    await send(
      'Emulation.setDeviceMetricsOverride',
      { width, height: width < 768 ? 844 : 900, deviceScaleFactor: 1, mobile: width < 768 },
      sessionId,
    )
    await send(
      'Runtime.evaluate',
      {
        expression: `new Promise(async (resolve) => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
            window.scrollTo(0, y)
            await new Promise((next) => setTimeout(next, 80))
          }
          window.scrollTo(0, 0)
          resolve(true)
        })`,
        awaitPromise: true,
      },
      sessionId,
    )
    await delay(300)
    const metrics = await send('Page.getLayoutMetrics', {}, sessionId)
    if (captureJewellery) {
      await send(
        'Runtime.evaluate',
        {
          expression: `(() => {
            const tab = [...document.querySelectorAll('#collections button')]
              .find((button) => button.textContent.trim() === 'Jewellery')
            tab?.click()
            document.querySelector('#collections')?.scrollIntoView({ block: 'start' })
          })()`,
        },
        sessionId,
      )
      await delay(450)
    }
    if (captureCart) {
      await send(
        'Runtime.evaluate',
        {
          expression: `(() => {
            const addButton = document.querySelector('#shop button[aria-label^="Add "]')
            addButton?.click()
            ${captureCartQuantity ? 'addButton?.click()' : ''}
            document.querySelector('[aria-controls="cart-drawer"]')?.click()
          })()`,
        },
        sessionId,
      )
      await delay(400)
      if (captureCartQuantity) {
        const cartCheck = await send(
          'Runtime.evaluate',
          {
            expression: `JSON.stringify({
              rows: document.querySelectorAll('#cart-drawer li').length,
              quantity: document.querySelector('#cart-drawer [aria-label^="Quantity for"] span')?.textContent.trim(),
              cartLabel: document.querySelector('[aria-controls="cart-drawer"]')?.getAttribute('aria-label'),
              addedState: document.querySelector('#shop button[aria-label*="added to cart"]')?.getAttribute('aria-label')
            })`,
            returnByValue: true,
          },
          sessionId,
        )
        console.log(`CART_CHECK ${cartCheck.result.value}`)
      }
    }
    const screenshot = await send(
      'Page.captureScreenshot',
      captureJewellery
        ? { format: 'png', fromSurface: true, captureBeyondViewport: false }
        : {
            format: 'png',
            fromSurface: true,
            captureBeyondViewport: true,
            clip: {
              x: 0,
              y: 0,
              width,
              height: captureCart ? (width < 768 ? 844 : 900) : Math.ceil(metrics.cssContentSize.height),
              scale: 1,
            },
          },
      sessionId,
    )
    const outputPath = screenshotPath.replace(/\.png$/i, `-${width}.png`)
    await writeFile(outputPath, Buffer.from(screenshot.data, 'base64'))
    if (captureCart) {
      await send(
        'Runtime.evaluate',
        {
          expression: `document.querySelector('#cart-drawer [aria-label="Close cart"]')?.click()`,
        },
        sessionId,
      )
      await delay(350)
    }
  }
  console.log(JSON.stringify(results, null, 2))
} finally {
  browser.kill()
}
