"use client";
import { useParams, useRouter } from "next/navigation";
import { getProductBySlug } from "@/lib/product-data";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import ButtonKlipsan from "@/components/button-comonent";
import Reveal from "@/components/reveal";

export default function ProductDetailPage() {
  const param = useParams();
  const slug = param.slug as string;
  const router = useRouter();

  const product = getProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    product?.selectOptions ? product.selectOptions[0] : undefined
  );

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const { addItem, isAdding } = useCart();

  if (!product) {
    return (
      <main className="w-full min-h-screen pt-[120px] flex justify-center items-center bg-white">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-bebas text-4xl mb-4 text-black">Product Not Found</h1>
          <ButtonKlipsan theme="light" onClick={() => router.push("/shop")}>
            Return to Shop
          </ButtonKlipsan>
        </div>
      </main>
    );
  }

  const handleAddToCart = async () => {
    if (isAdding) return;
    
    await addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity,
      selectedOption
    );
  };

  return (
    // Changed gap-12 to gap-8 on mobile for tighter grouping, removed overflow constraints
    <main className="w-full min-h-screen bg-white pt-[120px] pb-20 px-6 md:px-[7%] flex flex-col lg:flex-row gap-8 lg:gap-20">
      
      {/* --- IMAGE SECTION --- */}
      {/* Mobile: aspect-square (perfect box). Desktop: h-[80vh] (tall) */}
      <div className="w-full lg:w-1/2 order-1 lg:order-2 aspect-square lg:aspect-auto lg:h-[80vh] bg-gray-50 relative overflow-hidden rounded-md shadow-sm">
        <Reveal width="100%">
          <img
            className="w-full h-full object-cover object-center"
            src={product.image}
            alt={product.name}
          />
        </Reveal>
      </div>

      {/* --- INFORMATION SECTION --- */}
      <section className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col items-start gap-6">
        
        {/* Header Group */}
        <div className="flex flex-col gap-2">
          <Reveal>
            <h1 className="font-bebas font-bold text-5xl md:text-[70px] leading-none text-black">
              {product.name}
            </h1>
          </Reveal>

          <Reveal delay={100}>
            {/* Price Alignment Fix: flex items-baseline aligns the bottom of the text */}
            <div className="flex items-baseline gap-3">
              <span className="font-bebas font-bold text-4xl text-black">
                ${product.price.toFixed(2)}
              </span>
              {product.subscription && (
                <span className="text-lg text-gray-500 font-medium">
                  {product.subscription}
                </span>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="text-lg leading-relaxed text-gray-700">
            {product.description}
          </p>
        </Reveal>

        {product.features && (
          <Reveal delay={300}>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Options / Controls */}
        <div className="w-full flex flex-col gap-6 mt-6 border-t border-gray-100 pt-6">
          
          {/* Dropdown (if exists) */}
          {product.selectOptions && (
            <Reveal delay={400}>
              <div className="flex flex-col gap-2 w-full max-w-xs">
                {product.selectTitle && <label className="font-bold text-xs tracking-wider text-gray-500 uppercase">{product.selectTitle}</label>}
                <div className="relative">
                  <select
                    onChange={handleOptionChange}
                    value={selectedOption}
                    className="bg-white text-black border border-gray-300 w-full h-[50px] px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-black cursor-pointer rounded-none"
                  >
                    {product.selectOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                </div>
              </div>
            </Reveal>
          )}

          {/* Quantity Input (if title allows) */}
          {product.selectTitle === "Quantity" && (
            <Reveal delay={400}>
              <div className="flex flex-col gap-2 w-24">
                 <label className="font-bold text-xs tracking-wider text-gray-500 uppercase">Quantity</label>
                 <input
                  className="bg-white text-black border border-gray-300 w-full h-[50px] px-4 font-bold focus:outline-none focus:ring-2 focus:ring-black text-center"
                  value={quantity}
                  type="number"
                  min="1"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setQuantity(isNaN(value) || value < 1 ? 1 : value);
                  }}
                />
              </div>
            </Reveal>
          )}

          {/* Add to Cart Button */}
          <Reveal delay={500}>
            <div className="mt-2">
              <ButtonKlipsan onClick={handleAddToCart} theme="light">
                {isAdding ? "Adding..." : "Add to Cart"}
              </ButtonKlipsan>
            </div>
          </Reveal>
        </div>

      </section>
    </main>
  );
}