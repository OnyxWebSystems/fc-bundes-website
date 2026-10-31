import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <div className="page">
      <PageHero index="00" kicker="Missing page" title="Page not found" line="This address is not part of FC Bundes." />
      <div className="chapter">
        <div className="wrap">
          <Button href="/">Home</Button>
        </div>
      </div>
    </div>
  );
}
