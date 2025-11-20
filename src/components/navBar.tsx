"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonKlipsan from "./button-comonent";
import DropDownMenu from "./dropDownMenu";
import { useCart } from "@/context/cart-context";
type Path =
  | "/"
  | "/instructors"
  | "/locations"
  | "/shop"
  | "/book-a-class"
  | "/classes-overview"
  | "/classes"
  | "/shopping-cart"
  | "/terms-and-conditions"
  |"/privacy-policy"
  |"/faqs"

  | "/join";
type ColorTheme = "dark" | "light";

const navTheme: Record<Path, ColorTheme> = {
  "/": "dark",
  "/instructors": "light",
  "/locations": "light",
  "/shop": "light",
  "/classes": "light",
  "/book-a-class": "light",
  "/classes-overview": "dark",
  "/shopping-cart": "light",
  "/join": "dark",
  "/terms-and-conditions":"light",
  "/privacy-policy":"light",
  "/faqs":"light"
};

export default function NavBar() {
  const {totalItem} = useCart();
  const currentPAth = usePathname();
  let theme = (navTheme[currentPAth as Path] ?? "dark") as ColorTheme;
  if (currentPAth.concat("/shop/p")){
    // console.log("it works")
    theme = "light" as ColorTheme;
  }

  const colorTheme: Record<ColorTheme, string> = {
    dark: "text-white bg-black",
    light: "text-black bg-white",
  };
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else if (window.scrollY < 60) {
        setScrolled(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseClasses = `
  fixed w-full right-0 left-0 z-50 px-[60px] flex justify-between items-center h-[90px]
  
  ${!scrolled ? "bg-transparent" : theme === "dark" ? "bg-black" : "bg-white"}
  ${theme === "dark" ? "text-white" : "text-black"}
`;

  // ----------------------------
  return (
    <nav className={` ${baseClasses}  `}>
      <section className="">
        <ul className="list-none flex justify-between items-center gap-7 text-[18px]">
          <li className="font-Bebas Neue font-bold text-4xl">
            <Link href={"/"}>KLIPSAN</Link>
          </li>
          <li 
                      className={
                currentPAth === "/book-a-class" ||
                currentPAth === "/classes" ||
                currentPAth === "/classes-overview"
                  ? "border-b"
                  : ""
              }
          >
            {/* <Link
              className={
                currentPAth === "/book-a-class" ||
                currentPAth === "/classes" ||
                currentPAth === "/classes-overview"
                  ? "border-b"
                  : ""
              }
              href="/classes"
            >
              Classes
            </Link> */}
            <DropDownMenu title="Classes" theme={theme} items={
              [
                {name: "Classes Overview", href: "/classes-overview"},
                {name: "Book a Class", href: "/book-a-class"}
              ]
            } />
          </li>
          <li>
            <Link
              className={
                (currentPAth as Path) === "/instructors" ? "border-b" : ""
              }
              href="/instructors"
            >
              Instructors
            </Link>
          </li>
          <li>
            <Link
              className={currentPAth === "/locations" ? "border-b" : ""}
              href="/locations"
            >
              Locations
            </Link>
          </li>
          <li>
            <Link
              className={(currentPAth as Path) === "/shop" ? "border-b" : ""}
              href="/shop"
            >
              Shop
            </Link>
          </li>
        </ul>
      </section>
      <section className="">
        <ul className="list-non flex justify-between items-center gap-10 text-[14px]">
          <li className="flex justify-center items-center gap-2">
            
            <Link href={"/shopping-cart"}>
              <svg
                fill="currentColor"
                className={`w-[24px] h-[24px] `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z" />
              </svg>
            </Link>
            <p>{totalItem}</p>
          </li>
          <li>
            <Link href={"/join"}>
            <ButtonKlipsan theme={theme==="dark"?"dark":"light"}>Join OUR GYM</ButtonKlipsan>
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
