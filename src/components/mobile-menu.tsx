"use client";
import Link from "next/link";
import ButtonKlipsan from "./button-comonent";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context"; // <--- Import Auth

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { totalItem } = useCart();
  const { isAuthenticated, logout } = useAuth(); // <--- Use Auth

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center px-[20px] h-[90px]">
        <Link href="/" onClick={onClose} className="font-bebas font-bold text-4xl text-black">
          KLIPSAN
        </Link>
        
        <div className="flex items-center gap-6 text-black">
          <Link href="/shopping-cart" onClick={onClose} className="flex items-center gap-1">
             <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z" />
             </svg>
             <span className="font-bold text-lg">{totalItem}</span>
          </Link>

          <button onClick={onClose} className="p-2">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="flex-1 flex flex-col justify-center px-[20px] gap-8">
        <Link href="/classes-overview" onClick={onClose} className="text-4xl text-black flex justify-between items-center">
           Classes <span>›</span>
        </Link>
        <Link href="/instructors" onClick={onClose} className="text-4xl text-black">
           Instructors
        </Link>
        <Link href="/locations" onClick={onClose} className="text-4xl text-black">
           Locations
        </Link>
        <Link href="/shop" onClick={onClose} className="text-4xl text-black">
           Shop
        </Link>
      </div>

      {/* Bottom Buttons */}
      <div className="p-[20px] pb-10 border-t border-gray-100 flex flex-col gap-4">
        <Link href="/join" onClick={onClose} className="text-4xl text-black mb-2">
           Join Our Gym
        </Link>
         
         {isAuthenticated && (
         <ButtonKlipsan theme="light" onClick={() => { logout(); onClose(); }}>Log out</ButtonKlipsan>
         )}
      </div>
    </div>
  );
}