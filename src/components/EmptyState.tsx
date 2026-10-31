import type { ReactNode } from "react";
import { Button } from "@/components/Button";

type EmptyStateProps = {
  kicker?: ReactNode;
  title: string;
  body?: string;
  href?: string;
  action?: string;
  heading?: boolean;
};

export function EmptyState({ kicker, title, body, href, action, heading = true }: EmptyStateProps) {
  const Title = heading ? "h2" : "p";

  return (
    <div className="empty-panel">
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <Title className="empty-title">{title}</Title>
      {body ? <p className="muted">{body}</p> : null}
      {href && action ? <Button href={href}>{action}</Button> : null}
    </div>
  );
}
