import { Link } from "@tanstack/react-router";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-semibold">No route matched</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        That page isn&apos;t part of the matcher. Head back and run a resume through the pipeline.
      </p>
      <Button as={Link} to="/" className="mt-8">
        Back to home
      </Button>
    </div>
  );
}
