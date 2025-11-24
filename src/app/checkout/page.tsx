"use client";
import Link from "next/link";
import { useBackendStatus } from "@/context/backend-status-context";
import { useCart } from "@/context/cart-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { isReady, isChecking, isUnavailable } = useBackendStatus();
  const { items } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/shop");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null; // Render nothing while redirecting
  }
  return (
    <main className=" flex flex-cols  w-screen h-screen  ">
      {/* {(!isReady || isChecking || isUnavailable || true) && (
        <div className="flex items-center gap-7">
          <span>{`Ready: ${isReady}`}</span>
          <span>{`Checking: ${isChecking}`}</span>
          <span>{`Unavailable: ${isUnavailable}`}</span>
        </div>
      )} */}

      <h1 className="w-full h-[100px] font-bebsas font-bold p-4 text-4xl border-t-1 border-b-1 mt-8 border-gray-200 ">
        <Link href="/">Klipsan</Link>
      </h1>
      <div className="bg-amber-300 flex-1 w-[500px] h-[500px]">
fsa
      </div>

    </main>
  );
}
