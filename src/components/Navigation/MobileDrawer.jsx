import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menuList from "@/utils/menuList";

export default function MobileDrawer() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <span className="flex items-center justify-center">
          <i aria-hidden className="bx bx-menu-alt-left"></i>
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="py-6 border-b">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
          {menuList.map((menu, idx) => (
            <Link
              href={menu.link}
              key={idx}
              className="capitalize font-medium text-gray-800 hover:text-mainColor dark:text-white"
              onClick={() => setIsOpen(false)} // Close drawer on link click
            >
              <ul className="w-full py-2 px-2 my-1">
                <li
                  className={`py-1 px-4 block w-full capitalize rounded-lg overflow-hidden ${
                    path === menu?.link || path === `${menu?.link}/`
                      ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white"
                      : "active:bg-gray-300 dark:active:bg-gray-600"
                  }`}
                >
                  {menu.name}
                </li>
              </ul>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
