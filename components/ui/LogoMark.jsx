export default function LogoMark({ size = 'md' }) {
  const dim   = size === 'sm' ? { wrap: 'w-7 h-7', icon: 18, rounded: 'rounded-md', shadow: 'shadow-sm shadow-black/20' }
                              : { wrap: 'w-8 h-8', icon: 20, rounded: 'rounded-lg', shadow: 'shadow-md shadow-black/25' }
  return (
    <div
      className={`${dim.wrap} ${dim.rounded} flex items-center justify-center shrink-0 ${dim.shadow}`}
      style={{ background: 'linear-gradient(135deg, #692BBA 0%, #4BAF92 100%)' }}
      aria-hidden="true"
    >
      <svg width={dim.icon} height={dim.icon} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.5"  y="3"      width="3.5" height="16"   rx="1.75" fill="white" />
        <rect x="9.5"  y="3"      width="3.5" height="16"   rx="1.75" fill="white" />
        <rect x="9.5"  y="3"      width="10"  height="3.5"  rx="1.75" fill="white" />
        <rect x="9.5"  y="10.25"  width="7.5" height="3"    rx="1.5"  fill="white" />
      </svg>
    </div>
  )
}
