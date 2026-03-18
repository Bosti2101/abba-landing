import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <p className="text-7xl font-bold text-[#c0392b] mb-4">404</p>
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            Page Not Found
          </h1>
          <p className="text-[#7a7a7a] mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/">
            <Button variant="primary" size="md">
              Go Home
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
