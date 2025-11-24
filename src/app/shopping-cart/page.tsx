"use client";
import { useCart } from "@/context/cart-context";
import ButtonKlipsan from "@/components/button-comonent";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import Reveal from "@/components/reveal";

export default function ShoppingCartPage() {
  const { items, totalPrice, removeItem, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <main className="min-h-screen w-full bg-white pt-[120px] pb-20 px-6 md:px-[10%] flex flex-col items-start gap-8 overflow-x-hidden">
      
      <Reveal>
        <h1 className="font-bebas font-bold text-4xl md:text-5xl">Shopping Cart</h1>
      </Reveal>

      {items.length === 0 ? (
        <Reveal delay={100}>
          <p className="text-lg text-gray-600">You have nothing in your shopping cart.</p>
        </Reveal>
      ) : (
        <div className="flex flex-col w-full gap-8">
          
          {/* --- CART ITEMS --- */}
          <div className="flex flex-col w-full border-t border-gray-200">
            {items.map((item, index) => (
              <Reveal key={`${item.id}-${item.option}-${index}`} width="100%">
                <div className="flex flex-col md:flex-row w-full py-6 border-b border-gray-200 gap-6 md:gap-8 items-start md:items-center">
                  
                  {/* Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-gray-50 rounded-md overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col md:flex-row grow w-full justify-between gap-4 md:items-center">
                    
                    {/* Name & Option */}
                    <div className="flex flex-col gap-1 md:w-1/3">
                      <p className="font-bold text-lg">{item.name}</p>
                      {item.option && (
                        <p className="text-sm text-gray-500 font-medium">{item.option}</p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 border border-gray-300 rounded-full px-4 py-2 w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.option)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.option)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex justify-between md:flex-col md:items-end w-full md:w-auto gap-1">
                      <p className="font-bold text-lg">
                        ${item.price.toFixed(2)}
                      </p>
                      <button
                        className="text-sm text-gray-400 underline hover:text-red-600 transition-colors"
                        onClick={() => removeItem(item.id, item.option)}
                      >
                        Remove
                      </button>
                    </div>

                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* --- SUMMARY --- */}
          <Reveal width="100%" delay={200}>
            <div className="flex flex-col items-end gap-6 w-full  pt-8">
              
              <div className="flex w-full md:w-1/3 justify-between text-xl">
                <p>Subtotal</p>
                <p className="font-bold">${totalPrice.toFixed(2)}</p>
              </div>
              

              <div className="w-full md:w-auto flex flex-col gap-3">
                <Link href={isAuthenticated ? "/checkout" : "/login"} className="w-full">
                  <ButtonKlipsan theme="light">
                    {isAuthenticated ? "Checkout" : "Login to Checkout"}
                  </ButtonKlipsan>
                </Link>
                

              </div>

            </div>
          </Reveal>

        </div>
      )}
    </main>
  );
}