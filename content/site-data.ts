import type {
  StatItem,
  PortfolioCategory,
  ContactBranch,
  ServiceItem,
} from "@/types/content";

export const aboutStats: StatItem[] = [
  { value: "1500", label: "stat1Label", suffix: "+" },
  { value: "258", label: "stat2Label", suffix: "+" },
  { value: "9", label: "stat3Label", suffix: "" },
  { value: "200", label: "stat4Label", suffix: "+" },
];

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "retractable-roof",
    label: "category1",
    images: [
      {
        src: "/images/pic1.jpeg",
        alt: "Retractable roof pergola over residential terrace",
        category: "retractable-roof",
      },
      {
        src: "/images/pic2.jpeg",
        alt: "Modern retractable pergola system",
        category: "retractable-roof",
      },
    ],
  },
  {
    id: "winter-garden",
    label: "category2",
    images: [
      {
        src: "/images/pic3.jpeg",
        alt: "Elegant winter garden extension",
        category: "winter-garden",
      },
      {
        src: "/images/pic4.jpeg",
        alt: "Modern winter garden with glass walls",
        category: "winter-garden",
      },
    ],
  },
  {
    id: "bioclimatic-roof",
    label: "category3",
    images: [
      {
        src: "/images/pic5.jpeg",
        alt: "Bioclimatic rolling roof system",
        category: "bioclimatic-roof",
      },
      {
        src: "/images/pic6.jpeg",
        alt: "Louvered bioclimatic pergola",
        category: "bioclimatic-roof",
      },
    ],
  },
  {
    id: "guillotine-window",
    label: "category4",
    images: [
      {
        src: "/images/pic7.jpeg",
        alt: "Automatic guillotine window system",
        category: "guillotine-window",
      },
      {
        src: "/images/pic8.jpeg",
        alt: "Glass guillotine enclosure",
        category: "guillotine-window",
      },
    ],
  },
];

export const contactBranches: ContactBranch[] = [
  {
    name: "bulgariaBranch",
    email: "office@abapergola.bg",
    phone: "+359 2 123 4567",
    address: "bulgariaAddress",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93438.96024764498!2d23.2539071!3d42.6977082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%2C%20Bulgaria!5e0!3m2!1sen!2s!4v1700000000000",
  },
  {
    name: "romaniaBranch",
    email: "office@abapergola.ro",
    phone: "+40 748 123 456",
    address: "romaniaAddress",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91158.63080702834!2d26.0322432!3d44.4267674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest%2C%20Romania!5e0!3m2!1sen!2s!4v1700000000000",
  },
];

export const serviceItems: ServiceItem[] = [
  {
    id: "retractable-roof",
    title: "item1Title",
    description: "item1Desc",
    image: "/images/pic1.jpeg",
    href: "/projects/retractable-roof",
  },
  {
    id: "winter-garden",
    title: "item2Title",
    description: "item2Desc",
    image: "/images/pic3.jpeg",
    href: "/projects/winter-garden",
  },
  {
    id: "bioclimatic-roof",
    title: "item3Title",
    description: "item3Desc",
    image: "/images/pic5.jpeg",
    href: "/projects/bioclimatic-roof",
  },
  {
    id: "guillotine-window",
    title: "item4Title",
    description: "item4Desc",
    image: "/images/pic9.jpeg",
    href: "/projects/guillotine-window",
  },
];
