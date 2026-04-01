import type {
  StatItem,
  PortfolioCategory,
  ContactBranch,
  ServiceItem,
} from "@/types/content";

export const aboutStats: StatItem[] = [
  { value: "15000", label: "stat1Label", suffix: "+" },
  { value: "350", label: "stat2Label", suffix: "+" },
  { value: "18", label: "stat3Label", suffix: "" },
  { value: "200", label: "stat4Label", suffix: "+" },
];

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "pergola-retractabila",
    label: "category1",
    images: Array.from({ length: 22 }, (_, i) => ({
      src: `/projects/PERGOLA RETRACTABILA/pergola-retractabila-${i + 1}.webp`,
      alt: "ABA Pergola Systems",
      category: "pergola-retractabila",
    })),
  },
  {
    id: "winter-garden",
    label: "category2",
    images: [
      {
        src: "/images/pic3.webp",
        alt: "Elegant winter garden extension",
        category: "winter-garden",
      },
      {
        src: "/images/pic4.webp",
        alt: "Modern winter garden with glass walls",
        category: "winter-garden",
      },
    ],
  },
  {
    id: "sistem-bioclimatic",
    label: "category3",
    images: Array.from({ length: 12 }, (_, i) => ({
      src: `/projects/SISTEM BIOCLIMATIC/bioclimatic-${i + 1}.webp`,
      alt: "ABA Pergola Systems",
      category: "sistem-bioclimatic",
    })),
  },
  {
    id: "guillotine-window",
    label: "category4",
    images: [
      {
        src: "/images/pic7.webp",
        alt: "Automatic guillotine window system",
        category: "guillotine-window",
      },
      {
        src: "/images/pic8.webp",
        alt: "Glass guillotine enclosure",
        category: "guillotine-window",
      },
    ],
  },
];

export const contactBranches: ContactBranch[] = [
  {
    name: "bulgariaBranch",
    email: "h.gyudzhen@abapergola.ro",
    phone: "+359 89 539 39 00",
    address: "bulgariaAddress",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Varna%2C+ul.+Radost+9%2C+Bulgaria&output=embed&z=13",
  },
  {
    name: "romaniaBranch",
    email: "info@abapergola.ro",
    phone: "+40 757 032 748",
    address: "romaniaAddress",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Comuna+Slatioara%2C+Strada+Unirii+7%2C+Judet+Olt%2C+Romania&output=embed&z=13",
  },
];

export const serviceItems: ServiceItem[] = [
  {
    id: "pergola-retractabila",
    title: "item1Title",
    description: "item1Desc",
    image: "/projects/PERGOLA RETRACTABILA/pergola-retractabila-1.webp",
    href: "/projects/pergola-retractabila",
  },
  {
    id: "winter-garden",
    title: "item2Title",
    description: "item2Desc",
    image: "/images/pic3.webp",
    href: "/projects/winter-garden",
  },
  {
    id: "sistem-bioclimatic",
    title: "item3Title",
    description: "item3Desc",
    image: "/images/pic5.webp",
    href: "/projects/sistem-bioclimatic",
  },
  {
    id: "guillotine-window",
    title: "item4Title",
    description: "item4Desc",
    image: "/images/pic9.webp",
    href: "/projects/guillotine-window",
  },
];
