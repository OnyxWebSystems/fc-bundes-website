import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
};

export function ButtonArrow() {
  return (
    <span className="btn-arrow" aria-hidden="true">
      <svg viewBox="0 0 18 18" width="16" height="16">
        <path d="M2 9h13M10.5 4.5 15 9l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </span>
  );
}

export function Button({
  href,
  children,
  external = false,
  variant = "primary",
  arrow = true,
  className: extra,
}: ButtonProps) {
  const className = [variant === "ghost" ? "btn btn-ghost" : "btn", extra].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <ButtonArrow /> : null}
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {content}
    </Link>
  );
}
