import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { fadeInLeft, fadeInRight } from "@/lib/motion/variants";

export function LivingSpacesSection() {
  const t = useTranslations("livingSpaces");

  const features = [t("feature1"), t("feature2"), t("feature3")];

  return (
    <section className="section-y bg-white" aria-label="Living spaces">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal variants={fadeInLeft}>
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[560px] rounded-lg overflow-hidden">
              <Image
                src="/images/pic1.webp"
                alt="Spacious enclosed terrace with glass walls and pergola roof"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-sm rounded-md p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-light rounded-md flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 rounded-sm bg-brand" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink leading-tight">
                      {t("accentTitle")}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {t("accentDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variants={fadeInRight}>
            <div className="flex flex-col gap-8">
              <SectionHeading
                label={t("label")}
                title={t("title")}
                description={t("description")}
              />

              <ul className="flex flex-col gap-4">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    <span className="text-sm text-ink-secondary font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/services" className="self-start">
                <Button size="lg" variant="primary">
                  {t("cta")}
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
