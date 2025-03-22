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
