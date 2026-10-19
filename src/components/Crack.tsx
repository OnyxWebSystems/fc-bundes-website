export function Crack({ className = "" }: { className?: string }) {
  return (
    <svg className={`crack ${className}`} viewBox="0 0 1200 28" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 18 H360 L418 5 L462 22 H760 L812 8 L854 20 H1200" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
