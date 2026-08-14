import bowlImage from '../assets/images/handcrafted-charcoal-bowl.jpg'
import vaseImage from '../assets/images/speckled-stoneware-vase.jpg'
import mugSetImage from '../assets/images/ceramic-mug-set.jpg'
import cracklePotImage from '../assets/images/iridescent-crackle-pot.jpg'
import plateImage from '../assets/images/sage-ceramic-plate.jpg'
import teapotImage from '../assets/images/sage-teapot.jpg'
import clayPotImage from '../assets/images/textured-clay-pot.jpg'
import goldTextureRingsImage from '../assets/images/gold-texture-rings.jpg'
import emeraldJewellerySetImage from '../assets/images/emerald-jewellery-set.jpg'
import haloDiamondRingImage from '../assets/images/halo-diamond-ring.jpg'
import crystalLinkBraceletImage from '../assets/images/crystal-link-bracelet.jpg'
import pearlHoopEarringsImage from '../assets/images/pearl-hoop-earrings.jpg'

export const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Shop All', href: '#shop' },
  { label: 'New In', href: '#shop' },
  { label: 'Collections', href: '#collections' },
  { label: 'Sale', href: '#shop' },
  { label: 'About', href: '#about' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
]

const bowl = {
  name: 'Charcoal Wabi-Sabi Bowl',
  price: '$120.00',
  image: bowlImage,
  alt: 'Handcrafted charcoal ceramic bowl',
  imageClassName: 'h-[100%] w-[125%]',
}

const vase = {
  name: 'Speckled Stoneware Vase',
  price: '$95.00',
  image: vaseImage,
  alt: 'Speckled stoneware vase',
  imageClassName: 'h-[106.8%] w-[125%]',
}

const crackleVessel = {
  name: 'Iridescent Crackle Vessel',
  price: '$85.00',
  image: cracklePotImage,
  alt: 'Iridescent crackle-glazed ceramic vessel',
  imageClassName: 'size-full',
}

const sagePlate = {
  name: 'Sage Ceramic Plate',
  price: '$95.00',
  image: plateImage,
  alt: 'Sage green handcrafted ceramic plate',
  imageClassName: 'size-full',
}

const sageTeapot = {
  name: 'Sage Ceramic Teapot',
  price: '$140.00',
  image: teapotImage,
  alt: 'Sage green ceramic teapot',
  imageClassName: 'size-full',
}

const clayVessel = {
  name: 'Textured Clay Vessel',
  price: '$110.00',
  image: clayPotImage,
  alt: 'Textured warm brown ceramic vessel',
  imageClassName: 'size-full',
}

export const productPages = [
  [
    { ...bowl, id: 'charcoal-bowl' },
    { ...vase, id: 'stoneware-vase' },
  ],
  [
    { ...crackleVessel, id: 'crackle-pot' },
    { ...sagePlate, id: 'sage-plate' },
  ],
  [
    { ...sageTeapot, id: 'sage-teapot' },
    { ...clayVessel, id: 'clay-pot' },
  ],
]

export const benefits = [
  'Quality Assured',
  'Handpicked Items',
  'Easy Returns',
  'Fast Shipping',
  'Secure Checkout',
]

export const collectionGroups = [
  {
    label: 'Moldavite',
    products: [
      {
        id: 'mug-set',
        name: 'Artisan Stoneware Mug Set',
        price: '$120.00',
        image: mugSetImage,
        alt: 'Collection of handcrafted ceramic mugs',
        imageClassName: 'grayscale',
      },
      {
        id: 'crackle-pot',
        name: 'Iridescent Crackle Vessel',
        price: '$85.00',
        image: cracklePotImage,
        alt: 'Iridescent crackle-glazed ceramic pot',
      },
      {
        id: 'sage-plate',
        name: 'Sage Ceramic Plate',
        price: '$95.00',
        image: plateImage,
        alt: 'Sage green handcrafted ceramic plate',
      },
      {
        id: 'sage-teapot',
        name: 'Sage Ceramic Teapot',
        price: '$140.00',
        image: teapotImage,
        alt: 'Sage green ceramic teapot',
      },
      {
        id: 'clay-pot',
        name: 'Textured Clay Vessel',
        price: '$110.00',
        image: clayPotImage,
        alt: 'Textured warm brown ceramic pot',
      },
    ],
  },
  {
    label: 'Jewellery',
    products: [
      {
        id: 'gold-texture-rings',
        name: 'Diamond Mesh Ring',
        price: '$145.00',
        image: goldTextureRingsImage,
        alt: 'Gold mesh rings with diamond settings',
      },
      {
        id: 'emerald-jewellery-set',
        name: 'Emerald Heirloom Set',
        price: '$210.00',
        image: emeraldJewellerySetImage,
        alt: 'Emerald and gold necklace with matching earring',
      },
      {
        id: 'halo-diamond-ring',
        name: 'Halo Diamond Ring',
        price: '$180.00',
        image: haloDiamondRingImage,
        alt: 'Rose gold and silver halo diamond ring',
      },
      {
        id: 'crystal-link-bracelet',
        name: 'Crystal Link Bracelet',
        price: '$160.00',
        image: crystalLinkBraceletImage,
        alt: 'Silver crystal link bracelet on a black surface',
      },
      {
        id: 'pearl-hoop-earrings',
        name: 'Pearl Hoop Earrings',
        price: '$125.00',
        image: pearlHoopEarringsImage,
        alt: 'Gold hoop earrings with pearl details',
      },
    ],
  },
]

export const searchableProducts = Array.from(
  new Map(
    [...productPages.flat(), ...collectionGroups.flatMap((collection) => collection.products)].map(
      (product) => [product.id, product],
    ),
  ).values(),
)

export const guidanceSteps = [
  {
    number: '1.',
    title: 'Browse the range',
    description: 'Explore the collection and find items that catch your eye.',
    image: 'knot',
  },
  {
    number: '2.',
    title: 'Share your preferences',
    description: "Tell us your style, budget or occasion and we'll narrow it down.",
    image: 'vase',
  },
  {
    number: '3.',
    title: "We'll guide you",
    description: 'Get a personalised recommendation before you order.',
    image: 'bowl',
  },
]

export const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '#shop' },
      { label: 'New In', href: '#shop' },
      { label: 'Bestsellers', href: '#shop' },
      { label: 'On Sale', href: '#shop' },
      { label: 'Gift Ideas', href: '#collections' },
      { label: 'Coming Soon', href: '#collections' },
      { label: 'Archive', href: '#collections' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { label: 'Explore by Style', href: '#collections' },
      { label: 'Natural Materials', href: '#collections' },
      { label: 'Limited Editions', href: '#collections' },
      { label: 'Bundles & Sets', href: '#collections' },
      { label: 'Gift Sets', href: '#collections' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '#about' },
      { label: 'How It Works', href: '#journal' },
      { label: 'Quality Promise', href: '#about' },
      { label: 'Sustainability', href: '#about' },
      { label: 'Journal', href: '#journal' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '#journal' },
      { label: 'Shipping & Returns', href: '#benefits' },
      { label: 'Track My Order', href: '#contact' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Wholesale', href: '#contact' },
    ],
  },
]
