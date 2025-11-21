"use client";
import { useCart } from "@/context/cart-context";
import ButtonKlipsan from "@/components/button-comonent";
import Link from "next/link";


export default function ShoppingCartPage() {
  const { items, totalPrice, removeItem, updateQuantity } = useCart();

  return (
    <main className="min-h-screen w-screen bg-white py-[120px] px-[10%] flex flex-col items-start gap-4 ">
      <p className="font-bebas font-bold text-4xl">Shopping Cart</p>
      {items.length === 0 ? (
        <p>You have nothing in your shopping cart.</p>
      ) : (
        <div className="flex flex-col items-start w-full justify-between ">
          {items.map((item, index) => (
            <div
              className="flex w-full h-[200px] border-b-1 border-gray-300 mb-5"
              key={`${item.id}-${item.option}-${index}`}
            >
              <figure className="h-[90%] aspect-square">
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                ></img>
              </figure>
              <div className="h-full flex grow-1 justify-between items-start w-1/2">
                <div className="flex flex-col items-start ">
                    <p className="m-5 ">{item.name}</p>
                    {item.option && <p className="ml-5 text-sm text-gray-500 ">{item.option}</p>}
                </div>
                <div>
                  {" "}
                  <button
                    onClick={() => {
                      updateQuantity(item.id, item.quantity + 1, item.option);
                    }}
                    className="inline mx-5 cursor-pointer  text-gray-600 font-bold"
                  >
                    +
                  </button>{" "}
                  {item.quantity}{" "}
                  <button
                    onClick={() => {
                      updateQuantity(item.id, item.quantity - 1, item.option);
                    }}
                    className="inline mx-5 cursor-pointer font-bold text-gray-600"
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="flex grow-1 h-full justify-end items-start">
                <p>
                  <span>$</span>
                  {item.price.toFixed(2)}
                </p>
                <button
                  className="inline mx-5 cursor-pointer  text-gray-600 font-bold"
                  onClick={() => removeItem(item.id, item.option)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <div className="flex w-1/3 justify-between">
          <p>Subtotal</p>
          <p className="font-bold">
            <span>$</span>
            {totalPrice.toFixed(2)}
          </p>
        </div>
      )}
      {
        items.length > 0 ? 
        <Link href={"/checkout"}>
          <ButtonKlipsan theme="light">Checkout</ButtonKlipsan>
        </Link>
        : <Link href={"/shop"}><ButtonKlipsan theme="light">Continue Shopping</ButtonKlipsan></Link>
      }
    </main>
  );
}
