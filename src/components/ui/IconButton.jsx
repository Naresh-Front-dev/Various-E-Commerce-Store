const variants = {
  dark: 'bg-[#2f2217] text-white hover:bg-[#493525] focus-visible:outline-[#2f2217]',
  header: 'bg-[#d9d9d9] text-[#2f2217] hover:bg-[#c9c9c9] focus-visible:outline-[#2f2217]',
  outline:
    'border border-[#2f2217]/20 text-[#2f2217] hover:bg-[#f1ebe5] focus-visible:outline-[#2f2217]',
  ghost: 'text-[#2f2217] hover:bg-[#eee7df] focus-visible:outline-[#2f2217]',
  unstyled: '',
}

const sizes = {
  sm: 'size-10',
  md: 'size-11',
  lg: 'size-12',
  none: '',
}

function IconButton({
  children,
  className = '',
  label,
  ref,
  size = 'md',
  type = 'button',
  variant = 'ghost',
  ...props
}) {
  return (
    <button
      ref={ref}
      className={`relative grid shrink-0 cursor-pointer place-items-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      type={type}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton
