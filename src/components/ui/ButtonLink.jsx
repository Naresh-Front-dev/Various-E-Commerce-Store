import arrowOutward from '../../assets/icons/arrow-outward.svg'

const variants = {
  primary:
    'bg-[#2f2217] text-white transition-[background-color,transform] hover:bg-[#493525] focus-visible:outline-[#2f2217]',
  footer:
    'border border-[#c7a980]/45 text-[#f7f3ef] transition-colors hover:border-[#c7a980] hover:bg-[#c7a980] hover:text-[#2f2217] focus-visible:outline-[#c7a980]',
}

const sizes = {
  sm: 'min-h-11 px-4',
  md: 'min-h-12 px-4 py-3',
  none: '',
}

function ButtonLink({
  children,
  className = '',
  iconClassName = 'size-5',
  showArrow = false,
  size = 'md',
  variant = 'primary',
  ...props
}) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && (
        <img className={iconClassName} src={arrowOutward} width="20" height="20" alt="" />
      )}
    </a>
  )
}

export default ButtonLink
