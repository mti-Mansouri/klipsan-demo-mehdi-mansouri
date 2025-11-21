"use client";

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
    <main className=" flex flex-col items-center w-screen h-screen">
      {(!isReady || isChecking || isUnavailable || true) && (
        <div className="flex items-center gap-7">
          <span>{`Ready: ${isReady}`}</span>
          <span>{`Checking: ${isChecking}`}</span>
          <span>{`Unavailable: ${isUnavailable}`}</span>
        </div>
      )}

      <h1 className="w-full font-bebsas font-bold text-5xl border-t-1 border-b-1 ">
        Checkout
      </h1>
      <div className="w-full h-full flex">
        <div className="bg-white flex flex-col items-end ml-10 flex-grow">
          {/* left */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="bg-gray-200 flex  flex-grow max-w-1/2">
          {/* right */}
          <div className="m-10 p-10 border-1 ">
            <p>Order Summary</p>
            {items.map((items, index) => (
              <div key={`${items.option}-${items.id}`}></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
