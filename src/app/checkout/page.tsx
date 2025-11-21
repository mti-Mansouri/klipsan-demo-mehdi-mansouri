import { useBackendStatus } from "@/context/backend-status-context"
import { useCart } from "@/context/cart-context";

export default function CheckoutPage(){
    const { isReady, isChecking, isUnavailable } = useBackendStatus();



    return(

        <main className=" flex flex-col items-center w-screen h-screen">
            {(!isReady || isChecking || isUnavailable || true) &&
            <div className="flex items-center gap-7">
                
                    <span>{`Ready: ${isReady}`}</span>
                    <span>{`Checking: ${isChecking}`}</span>
                    <span>{`Unavailable: ${isUnavailable}`}</span>
                
            </div> }

            <h1 className="w-full font-bebsas font-bold text-5xl border-t-1 border-b-1 ">Checkout</h1>
            <div className="w-full h-full flex">
            <div className="bg-white">
                {/* left */}
            </div>
            <div className="bg-gray-200">
                {/* right */}
            </div>
            </div>

        </main>
    )
}