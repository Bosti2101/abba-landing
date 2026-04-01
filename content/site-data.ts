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
      alt: "Pergolă Retractabilă — ABA Pergola Systems",
      category: "pergola-retractabila",
    })),
  },
  {
    id: "gradina-de-iarna",
    label: "category2",
    images: Array.from({ length: 9 }, (_, i) => ({
      src: `/projects/GRADINA DE IARNA/gradina-de-iarna-${i + 1}.webp`,
      alt: "Grădină de Iarnă — ABA Pergola Systems",
      category: "gradina-de-iarna",
    })),
  },
  {
    id: "sistem-bioclimatic",
    label: "category3",
    images: Array.from({ length: 12 }, (_, i) => ({
      src: `/projects/SISTEM BIOCLIMATIC/bioclimatic-${i + 1}.webp`,
      alt: "Sistem Bioclimatic — ABA Pergola Systems",
      category: "sistem-bioclimatic",
    })),
  },
  {
    id: "sistem-ghilotina",
    label: "category4",
    images: Array.from({ length: 9 }, (_, i) => ({
      src: `/projects/SISTEM GHILOTINA/sistem-ghilotina-${i + 1}.webp`,
      alt: "Sistem Ghilotină — ABA Pergola Systems",
      category: "sistem-ghilotina",
    })),
  },
  {
    id: "sistem-glisant",
    label: "category5",
    images: Array.from({ length: 3 }, (_, i) => ({
      src: `/projects/SISTEM GLISANT/sistem-glisant-${i + 1}.webp`,
      alt: "Sistem Glisant — ABA Pergola Systems",
      category: "sistem-glisant",
    })),
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
    id: "gradina-de-iarna",
    title: "item2Title",
    description: "item2Desc",
    image: "/projects/GRADINA DE IARNA/gradina-de-iarna-1.webp",
    href: "/projects/gradina-de-iarna",
  },
  {
    id: "sistem-bioclimatic",
    title: "item3Title",
    description: "item3Desc",
    image: "/projects/SISTEM BIOCLIMATIC/bioclimatic-1.webp",
    href: "/projects/sistem-bioclimatic",
  },
  {
    id: "sistem-ghilotina",
    title: "item4Title",
    description: "item4Desc",
    image: "/projects/SISTEM GHILOTINA/sistem-ghilotina-1.webp",
    href: "/projects/sistem-ghilotina",
  },
  {
    id: "sistem-glisant",
    title: "item5Title",
    description: "item5Desc",
    image: "/projects/SISTEM GLISANT/sistem-glisant-1.webp",
    href: "/projects/sistem-glisant",
  },
];
