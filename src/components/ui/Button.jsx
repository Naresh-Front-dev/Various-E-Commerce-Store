const variants = {
  primary:
    'bg-[#2f2217] text-white transition-[background-color,transform] hover:bg-[#493525] focus-visible:outline-[#2f2217]',
  outline:
    'border border-[#2f2217]/30 text-[#2f2217] transition-colors hover:bg-white focus-visible:outline-[#2f2217]',
  accent:
    'bg-[#c7a980] text-[#2f2217] transition-colors hover:bg-[#ddc299] focus-visible:outline-[#c7a980]',
  unstyled: '',
}

const sizes = {
  sm: 'min-h-11 px-4',
  md: 'min-h-12 px-4 py-3',
  lg: 'min-h-14 px-6',
  none: '',
}

function Button({
  children,
  className = '',
  ref,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      ref={ref}
      className={`inline-flex cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
