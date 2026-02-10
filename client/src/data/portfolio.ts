import srtTransport from "../assets/portfolio/srt-transport.png";
import drmSecurity from "../assets/portfolio/drm-security.png";
import apuraCleaning from "../assets/portfolio/apura-cleaning.png";
import eerstHelpen from "../assets/portfolio/eerst-helpen.png";
import spoedcare from "../assets/portfolio/spoedcare.png";
import brothersGrill from "../assets/portfolio/brothers-grill.png";
import adVisser from "../assets/portfolio/ad-visser.png";
import unforgettableParty from "../assets/portfolio/unforgettable-party.png";
import limbourgia from "../assets/portfolio/limbourgia.png";
import kMensen from "../assets/portfolio/k-mensen.png";

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  design: string;
  addOn: string;
  branding: string;
  image: string;
  description: string;
  websiteUrl: string;
  services: string[];
}

export const categories = [
  "All",
  "Business Services",
  "Education & Training",
  "Hospitality & Catering",
  "Health & Care",
  "Entertainment & Events",
  "Transport & Logistics",
  "Cleaning & Facility",
  "Garden & Landscape",
];

export const types = [
  "All",
  "Website Element Design",
  "Full Website Design",
  "Landing Page",
  "E-commerce",
];

export const designs = [
  "All",
  "Modern",
  "Classic",
  "Minimalist",
  "Bold",
];

export const addOns = [
  "All",
  "SEO Package",
  "Content Writing",
  "Photography",
  "Social Media",
];

export const brandings = [
  "All",
  "Full Branding",
  "Logo Only",
  "Brand Refresh",
  "No Branding",
];

export const projects: Project[] = [
  {
    id: "1",
    name: "SRT Transport",
    slug: "srt-transport",
    category: "Business Services",
    type: "Website Element Design",
    design: "Modern",
    addOn: "SEO Package",
    branding: "Full Branding",
    image: srtTransport,
    description: "For SRT Transport we designed and developed a brand-new website that reflects their fast, personal, and affordable moving services. The result is a modern, user-friendly platform that helps customers quickly find the information they need and request a quote.",
    websiteUrl: "https://srttransport.nl",
    services: ["Web Development", "SEO", "Branding"],
  },
  {
    id: "2",
    name: "DRM Security",
    slug: "drm-security",
    category: "Business Services",
    type: "Website Element Design",
    design: "Bold",
    addOn: "Content Writing",
    branding: "Full Branding",
    image: drmSecurity,
    description: "DRM Security needed a professional online presence that conveys trust and safety. We built a sleek, dark-themed website showcasing their security services in Rotterdam, complete with service pages, client testimonials, and easy contact options.",
    websiteUrl: "https://drmsecurity.nl",
    services: ["Web Development", "Graphic Design", "Content Writing"],
  },
  {
    id: "3",
    name: "Apura Cleaning",
    slug: "apura-cleaning",
    category: "Cleaning & Facility",
    type: "Website Element Design",
    design: "Modern",
    addOn: "SEO Package",
    branding: "Brand Refresh",
    image: apuraCleaning,
    description: "Apura Cleaning provides professional cleaning services in Tilburg. We created a fresh, clean website that mirrors their commitment to spotless results. The site features service descriptions, an online quote form, and optimized local SEO.",
    websiteUrl: "https://apuracleaning.nl",
    services: ["Web Development", "SEO", "Graphic Design"],
  },
  {
    id: "4",
    name: "Eerst Helpen",
    slug: "eerst-helpen",
    category: "Education & Training",
    type: "Full Website Design",
    design: "Modern",
    addOn: "Content Writing",
    branding: "Logo Only",
    image: eerstHelpen,
    description: "Eerst Helpen offers first aid training courses. We developed a comprehensive website with course listings, online registration, location information, and an intuitive booking system that makes signing up for classes seamless.",
    websiteUrl: "https://eersthelpen.nl",
    services: ["Web Development", "Graphic Design", "Content Writing"],
  },
  {
    id: "5",
    name: "Spoedcare",
    slug: "spoedcare",
    category: "Education & Training",
    type: "Full Website Design",
    design: "Minimalist",
    addOn: "Photography",
    branding: "Full Branding",
    image: spoedcare,
    description: "Spoedcare provides safety training and certification programs. We built a professional, clean website focused on credibility and easy navigation. The design emphasizes their expertise while making course registration straightforward.",
    websiteUrl: "https://spoedcare.nl",
    services: ["Web Development", "Branding", "Photography"],
  },
  {
    id: "6",
    name: "The Brothers Grill",
    slug: "the-brothers-grill",
    category: "Hospitality & Catering",
    type: "Website Element Design",
    design: "Bold",
    addOn: "Photography",
    branding: "Full Branding",
    image: brothersGrill,
    description: "The Brothers Grill is a catering and restaurant business with a passion for great food. We created a warm, inviting website featuring their menu, catering services, and online ordering capabilities with mouth-watering food photography.",
    websiteUrl: "https://thebrothersgrill.nl",
    services: ["Web Development", "Graphic Design", "Photography"],
  },
  {
    id: "7",
    name: "Ad Visser Tuinonderhoud",
    slug: "ad-visser-tuinonderhoud",
    category: "Garden & Landscape",
    type: "Landing Page",
    design: "Classic",
    addOn: "SEO Package",
    branding: "No Branding",
    image: adVisser,
    description: "Ad Visser Tuinonderhoud specializes in garden maintenance and landscaping. We designed a nature-inspired website showcasing their services, portfolio of completed gardens, and easy-to-use contact form for requesting quotes.",
    websiteUrl: "https://advissertuinonderhoud.nl",
    services: ["Web Development", "SEO"],
  },
  {
    id: "8",
    name: "My Unforgettable Party",
    slug: "my-unforgettable-party",
    category: "Entertainment & Events",
    type: "Full Website Design",
    design: "Bold",
    addOn: "Social Media",
    branding: "Full Branding",
    image: unforgettableParty,
    description: "My Unforgettable Party creates magical celebrations for children and families. We developed a vibrant, colorful website that captures the joy of their events, featuring party packages, photo galleries, and an online booking system.",
    websiteUrl: "https://myunforgettableparty.nl",
    services: ["Web Development", "Graphic Design", "Social Media"],
  },
  {
    id: "9",
    name: "Limbourgia Touringcars",
    slug: "limbourgia-touringcars",
    category: "Transport & Logistics",
    type: "Website Element Design",
    design: "Classic",
    addOn: "Content Writing",
    branding: "Brand Refresh",
    image: limbourgia,
    description: "Limbourgia Touringcars offers touring car and bus rental services. We built a professional website with booking functionality, fleet showcase, route information, and a clean design that inspires confidence in their transportation services.",
    websiteUrl: "https://limbourgiatouringcars.nl",
    services: ["Web Development", "Content Writing", "Graphic Design"],
  },
  {
    id: "10",
    name: "K Mensen",
    slug: "k-mensen",
    category: "Cleaning & Facility",
    type: "Full Website Design",
    design: "Minimalist",
    addOn: "SEO Package",
    branding: "Logo Only",
    image: kMensen,
    description: "K Mensen provides cleaning and facility services for businesses. We created a professional, corporate website highlighting their range of services, team expertise, and client success stories with a focus on trust and reliability.",
    websiteUrl: "https://kmensen.nl",
    services: ["Web Development", "SEO", "Branding"],
  },
];
