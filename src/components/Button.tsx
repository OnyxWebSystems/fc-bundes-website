import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "line" | "ghost";
  arrow?: boolean;
};

export function Button({ href, children, external = false, variant = "line", arrow = false }: ButtonProps) {
  const className = variant === "ghost" ? "btn btn-ghost" : "btn";
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      ) : null}
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
