import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "line" | "ghost";
};

export function Button({ href, children, external = false, variant = "line" }: ButtonProps) {
  const className = variant === "ghost" ? "btn btn-ghost" : "btn";
  const content = (
    <>
      <span>{children}</span>
      <span className="btn-arrow" aria-hidden="true">
        {external ? "↗" : "→"}
      </span>
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer" data-cursor="open">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href} data-cursor="open">
      {content}
    </Link>
  );
}
