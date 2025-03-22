import { Layers, Phone, User } from "lucide-react";

export type AccordionData = {
  icon: React.ReactNode;
  title: string;
  options: string[];
};

export const NavbarConstantUser: AccordionData = {
  icon: <User />,
  title: "User Profiles",
  options: ["Agent", "Developer", "Land Owner"],
};

export const NavbarConstantServices: AccordionData = {
  icon: <Layers />,
  title: "Services",
  options: [
    "Tag Along Opportunities",
    "Hand Holding",
    "Land Monitoring",
    "Thorough Legal Verification",
    "Land Survey",
  ],
};

export const NavbarConstantContact: AccordionData = {
  icon: <Phone />,
  title: "Contact Us",
  options: ["Support@1acre.in", "WhatsApp", "LinkedIn", "YouTube", "Instagram"],
};

export interface LandMedia {
  image: string;
}

export interface LandPrice {
  price_per_acre_crore: {
    lakh?: number;
    crore?: number;
  };
}

export interface LandSize {
  total_land_size_in_acres: {
    acres?: number;
    cents?: number;
    guntas?: number;
  };
}

interface DivisionInfo {
  id: number;
  name: string;
  division_type: string;
}

export interface Property {
  id: number;
  land_media: LandMedia[];
  land_price: LandPrice;
  land_size: LandSize;
  division_info: DivisionInfo[];
}

export interface CarouselCardsProps {
  property: Property;
}

export interface ImageProps {
  img: LandMedia;
  idx: number;
}

export interface Location1 {
  id: number;
  lat: string;
  long: string;
  land_price: LandPrice;
  land_size: LandSize;
}

export interface Location2 {
  id: number;
  lat: number;
  lng: number;
  price: string;
  land_size: string;
}
