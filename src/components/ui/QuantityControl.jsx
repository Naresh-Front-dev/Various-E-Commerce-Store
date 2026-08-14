import IconButton from './IconButton'

function QuantityControl({
  className = '',
  label,
  onDecrease,
  onIncrease,
  value,
}) {
  return (
    <div
      className={`inline-flex h-10 items-center rounded-full border border-[#2f2217]/20 bg-white ${className}`}
      aria-label={`Quantity for ${label}`}
    >
      <IconButton
        className="rounded-full text-xl"
        label={`Decrease ${label} quantity`}
        size="sm"
        variant="ghost"
        onClick={onDecrease}
      >
        &minus;
      </IconButton>
      <span className="min-w-8 text-center text-sm font-medium" aria-live="polite">
        {value}
      </span>
      <IconButton
        className="rounded-full text-xl"
        label={`Increase ${label} quantity`}
        size="sm"
        variant="ghost"
        onClick={onIncrease}
      >
        +
      </IconButton>
    </div>
  )
}

export default QuantityControl
