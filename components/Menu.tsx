import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

interface Link {
  name: string;
  href: string;
}

interface MenuProps {
  links: Link[];
}

const Menu = ({ links }: MenuProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <svg
          className="hamburgerIcon"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            fill="white"
          ></path>
        </svg>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <ul className="lg:space-x-4">
            {links.map((link) => (
              <li key={link.name} className="px-1 py-3 my-3 font-medium lg:font-normal lg:py-0 lg:my-0 border rounded-lg">
                <Link
                  href={link.href}
                  className=" hover:text-black transition-colors transform hover:scale-[1.03] transition-transform duration-200 ease-in-out inline-block"
                >
                  <DrawerTrigger>{link.name}</DrawerTrigger>
                </Link>
              </li>
            ))}
          </ul>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
