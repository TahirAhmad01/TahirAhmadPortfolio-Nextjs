import avatar from "@/assets/images/webp/logo.webp";
import menuList from "@/utils/menuList";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import MobileDrawer from "./MobileDrawer";
import NextTopLoader from "nextjs-toploader";

export default function Navbar({ theme, toggleDarkMode, loading }) {
  const path = usePathname();

  return (
    <React.Fragment>
      <div
        className={`backdrop-blur-xl bg-[#f1f5f9]/20 dark:bg-[#0b1327]/20 w-full top-0 left-0 fixed z-50 py-4 transition-all duration-200 my-collapsible my-collapsible shadow-sm`}
      >
        <div className="containerCustom flex items-center justify-between h-full">
          <div>
            <Link href="/">
              <h4 className="flex items-center text-xl">
                <div className="h-9 w-9 overflow-hidden rounded-full bg-transparent">
                  <Image src={avatar} alt="Tahir's picture" width={0} height={0} />
                </div>
                <div className="ml-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#18c8fd] to-purple-600 font-extrabold text-2xl">
                    {process.env.name}
                  </span>
                </div>
              </h4>
            </Link>
          </div>
          <div className="flex items-center">
            <div className=" hidden md:block">
              <ul className="flex">
                {menuList.map((menu, idx) => (
                  <Link href={menu?.link} className="capitalize" key={idx}>
                    <li
                      className={`px-3 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#18c8fd] to-purple-600 font-medium ${path === menu?.link || path === menu?.link + "/" ? "text-transparent font-semibold" : ""}`}
                    >
                      {menu.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="w-7 flex justify-end">
              {loading && (
                <DarkModeSwitch
                  checked={theme === "dark" ? true : false}
                  onChange={toggleDarkMode}
                  size={19}
                />
              )}
            </div>
            <div className="md:hidden flex flex-col items-start text-[1.9rem] ml-2">
              <MobileDrawer />
            </div>
          </div>
        </div>

        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
      </div>
    </React.Fragment>
  );
}
