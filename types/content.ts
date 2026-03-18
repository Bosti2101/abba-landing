export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

export interface StrengthItem {
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioCategory {
  id: string;
  label: string;
  images: PortfolioImage[];
}

export interface PortfolioImage {
  src: string;
  alt: string;
  category: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactBranch {
  name: string;
  email: string;
  phone: string;
  address: string;
  mapEmbedUrl: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}
