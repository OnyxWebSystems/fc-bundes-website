import Image from "next/image";
import Link from "next/link";

type ImageFrameProps = {
  src: string;
  alt: string;
  category?: string;
  title?: string;
  aspect?: "portrait" | "landscape" | "square" | "cinema";
  position?: string;
  priority?: boolean;
  sizes?: string;
  href?: string;
  external?: boolean;
  clip?: boolean;
};

export function ImageFrame({
  src,
  alt,
  category,
  title,
  aspect = "portrait",
  position = "center center",
  priority = false,
  sizes = "(max-width: 800px) 100vw, 40vw",
  href,
  external = false,
  clip = true,
}: ImageFrameProps) {
  const frame = (
    <>
      <span className={`frame-media aspect-${aspect}`} data-clip={clip ? "" : undefined}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          sizes={sizes}
          style={{ objectFit: "cover", objectPosition: position }}
        />
      </span>
      {category || title ? (
        <span className="frame-caption">
          {category ? <span className="kicker">{category}</span> : null}
          {title ? <strong>{title}</strong> : null}
        </span>
      ) : null}
    </>
  );

  if (href && external) {
    return (
      <a className="image-frame" href={href} target="_blank" rel="noopener noreferrer">
        {frame}
      </a>
    );
  }

  if (href) {
    return (
      <Link className="image-frame" href={href}>
        {frame}
      </Link>
    );
  }

  return <figure className="image-frame">{frame}</figure>;
}
