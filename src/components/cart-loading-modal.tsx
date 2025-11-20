"use client"
import { useCart } from "@/context/cart-context";



export default function CartLoadingModal() {
    const { isAdding } = useCart();
  
    if (!isAdding) {return null;}

    return(
        <div className="
        fixed inset-0 z-100 bg-black/60 backdrop-blur-sm
        flex justify-center items-center transition-all 
        ">
            <div
            className="
            bg-white p-8 md:p-12 flex flex-col items-center justify-center
            gap-4 shadow-2xs border-2 border-white min-w-[300px]
            "
            >
                {/* spinner */}
                <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin">

                </div>
                                    <p className="font-bebas font-bold text-3xl text-black tracking-wide uppercase mt-4">Adding to cart...</p>
                    <p className="text-sm text-gray-500">
          Please wait while we update your cart.
        </p>
            </div>
        </div>
    )
}