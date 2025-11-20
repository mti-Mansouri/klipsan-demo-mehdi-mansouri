import Link from "next/link"
import { PRODUCTS } from "@/lib/product-data"

export default function ShopPage() {

    return <main className="min-h-screen w-screen  bg-white pt-[120px] pb-20">
        {/* product  */}
        <section
        className="px-[5%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
            {
                PRODUCTS.map((product,index)=>(
                    <Link key={product.id} href={`/shop/p/${product.slug}`}>
                        <div className="flex flex-col items-center gap-10 aspect-square" >
                            <div className="w-full ">
                                <img className=" object-cover w-full aspect-square" src={product.image} alt="" />
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-bebas font-bold text-[25px]">{product.name}</p>
                                <p>{"$"+product.price} {product.subscription ? ` ${product.subscription}` : ""}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </section>
    </main>
}