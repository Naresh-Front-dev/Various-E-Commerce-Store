function SectionEyebrow({ children, dark = false }) {
  return (
    <p
      className={`inline-flex min-h-9 items-center rounded-md px-2.5 py-1.5 text-[11px] font-medium uppercase leading-none tracking-[-0.02em] sm:text-xs ${
        dark ? 'bg-[#caa778] text-[#2f2217]' : 'bg-[#ead1a7] text-[#2f2217]'
      }`}
    >
      {children}
    </p>
  )
}

export default SectionEyebrow
