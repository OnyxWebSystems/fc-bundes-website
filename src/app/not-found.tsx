import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="page not-found">
      <div className="wrap">
        <h1 className="section-title">Page not found</h1>
        <div className="btn-row" style={{ marginTop: "1.5rem" }}>
          <Button href="/">Home</Button>
        </div>
      </div>
    </div>
  );
}
