"use client";
import Link from "next/link";

type DropdownItem = {
    name: string;
    href: string;
}
type DropdownProps = {
    title : string;
    items: DropdownItem[];
    theme?: "dark" | "light";
}

export default function DropDownMenu({title, items , theme = "dark"}: DropdownProps) {
    return(
        <div className="relative group">
            <button 
            type="button"

            >{title}</button>
            <div
            className={
                `            hidden
            group-hover:block
            absolute
            top-full
            -left-3
            bg-${theme === "dark" ? "black" : "white"}
            text-${theme === "dark" ? "white" : "black"}
            py-2
            px-3
            w-54
            z-50
            cursor-pointer`
            }
            >
                {items.map((item)=>(
                    <Link 
                    className="block "
                    key={item.name} href={item.href}>{item.name}</Link>
                ))}
            </div>

        </div>
    )
}