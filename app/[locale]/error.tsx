"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <p className="text-7xl font-bold text-[#c0392b] mb-4">500</p>
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            Something Went Wrong
          </h1>
          <p className="text-[#7a7a7a] mb-8">
            An unexpected error occurred. Please try again.
          </p>
          <Button variant="primary" size="md" onClick={reset}>
            Try Again
          </Button>
        </div>
      </Container>
    </section>
  );
}
