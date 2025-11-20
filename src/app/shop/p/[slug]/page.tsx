"use client";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/lib/product-data";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import ButtonKlipsan from "@/components/button-comonent";
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
      <main className=" w-screen min-h-screen pt-[12p0x] flex py-[7%] justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bebas text-4xl mb-4">Product Not Found</h1>
          <ButtonKlipsan theme="light" onClick={() => router.push("/shop")}>
            Return to Shop
          </ButtonKlipsan>
        </div>
      </main>
    );
  }

  //   handel add to cart
  const handleAddToCArt = async () => {
    if (isAdding) {
      return;
    }
  
    await addItem(
      {
        id: product?.id,
        name: product?.name,
        price: product?.price,
        image: product?.image,
      },
      quantity,
      selectedOption
    );
  };
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <main className=" w-screen min-h-screen py-[120px] flex px-[7%] justify-between">
      <div className=" h-full w-1/2 flex flex-col items-center gap-4 order-2">
        <img
          className="w-full h-full object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* information section */}
      <section className=" h-full w-1/2 flex flex-col items-start gap-4">
        <p className="font-bebas font-bold text-5xl">{product.name}</p>
        <p className="font-bebas font-bold text-3xl">
          <span>{"$ " + product.price.toFixed(2)}</span>{" "}
          {product.subscription && product.subscription}
        </p>
        <p>{product.description}</p>
        {product.features && (
          <ul className="list-inside list-disc lis ">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
        {product.selectTitle && <p>{product.selectTitle}</p>}
        {product.selectOptions && (
          <select
            onChange={handleOptionChange}
            defaultValue={product.selectOptions[0]}
            className="bg-white text-black border mt-2  w-1/2  h-[60px] p-4 
                  focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                  "
            name=""
            id=""
          >
            {product.selectOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {product.selectTitle && product.selectTitle == "Quantity" && (
          <input
            className="bg-white text-black border mt-2  w-1/6  h-[60px] p-4  font-bold 
                  focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                  "
            value={quantity}
            type="number"
            onChange={(e) => {
  const value = parseInt(e.target.value);
  setQuantity(isNaN(value) ? 1 : value);
}}
          />
        )}
        <div className="">
          <ButtonKlipsan onClick={handleAddToCArt} theme="light">
            Add to Cart
          </ButtonKlipsan>
        </div>
      </section>
    </main>
  );
}
