import AddToCartButton from './AddToCartButton'

function ProductCard({ product, onAdd, priority = false, className = '' }) {
  return (
    <article className={`flex min-w-0 flex-col gap-5 ${className}`}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white ring-1 ring-[#2f2217]/25 ring-inset">
        <img
          className={`pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover ${product.imageClassName}`}
          src={product.image}
          alt={product.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
        <div className="pointer-events-none absolute inset-x-[-1px] bottom-0 h-1/5 bg-gradient-to-b from-transparent to-black" />
        <AddToCartButton
          className="absolute bottom-[clamp(10px,0.781vw,15px)] right-[clamp(10px,0.781vw,15px)]"
          product={product}
          onAdd={onAdd}
        />
      </div>

      <div className="flex flex-col items-start gap-3.5">
        <h2 className="text-[22px] font-medium leading-normal tracking-[-0.02em] text-[#2f2217] xl:text-[clamp(20px,1.458vw,28px)]">
          {product.name}
        </h2>
        <p className="rounded bg-[#2f2217] p-2.5 text-base font-medium leading-none tracking-[-0.02em] text-[#f7f3ef] xl:text-[clamp(16px,1.042vw,20px)]">
          {product.price}
        </p>
      </div>
    </article>
  )
}

export default ProductCard
