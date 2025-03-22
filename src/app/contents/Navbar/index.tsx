"use client";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, Info } from "lucide-react";
import { useState } from "react";
import AccordionComponent from "./accordion";
import {
  NavbarConstantContact,
  NavbarConstantServices,
  NavbarConstantUser,
} from "@/utils/types";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogTitle } from "@radix-ui/react-dialog";
import WhatsAppIcon from "@/app/assets/icons/whatsAppIcon";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 flex justify-center w-full py-4 md:px-32 px-2 border-b shadow-sm bg-white z-50">
      <div className="lg:max-w-[1920px] w-full flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold flex items-center space-x-1">
          <Image
            src="https://www.1acre.in/static/images/icons/logo.png"
            height={90}
            width={100}
            alt="logo"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6 text-gray-700 text-xs xl:text-base">
          <a href="#" className="hover:text-black">
            Agents
          </a>
          <a href="#" className="hover:text-black">
            Land Owners
          </a>
          <a href="#" className="hover:text-black">
            Developers
          </a>
          <a href="#" className="hover:text-black flex items-center space-x-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span>Services</span>
          </a>
          <a href="#" className="hover:text-black">
            All Lands
          </a>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            Sell Land
            <WhatsAppIcon />
          </Button>
          <Button className="bg-yellow-400 hover:bg-yellow-500">Login →</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className=" p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        <Drawer direction="right" open={menuOpen}>
          {/* <DrawerTrigger>Open</DrawerTrigger> */}
          <DrawerContent>
            <DrawerHeader>
              <DialogTitle></DialogTitle>
              <ScrollArea className="h-[85vh] rounded-md">
                <div className="w-full bg-white px-6 shadow-none z-50 flex flex-col space-y-4">
                  <div className="flex justify-between items-center w-full">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 md:invisible">
                      Login
                    </Button>
                    <button className="end" onClick={() => setMenuOpen(false)}>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <AccordionComponent data={NavbarConstantUser} />
                  <AccordionComponent data={NavbarConstantServices} />
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-lg font-medium"
                  >
                    <BookOpen /> <span>Lakes</span>{" "}
                    <span className="text-xs bg-yellow-300 px-2 rounded">
                      New
                    </span>
                  </a>
                  <div className="bg-yellow-100 p-4 rounded-lg flex items-center space-x-4">
                    <Image
                      src="https://www.1acre.in/static/images/icons/logo.png"
                      alt="Premium"
                      width={12}
                      height={12}
                      className="w-12"
                    />
                    <div>
                      <span className="font-bold">1acre Premium</span>
                      <p className="text-xs">
                        Map view of 4800+ lands, layers, facilitated lands,
                        etc...
                      </p>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-lg font-medium mb-6"
                  >
                    <Info /> <span>About Us</span>
                  </a>
                  <AccordionComponent data={NavbarConstantContact} />
                </div>
              </ScrollArea>
            </DrawerHeader>
            <DrawerFooter className="mt-[-12px]">
              <div className="flex flex-col space-y-2 text-gray-700">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Conditions</a>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}
