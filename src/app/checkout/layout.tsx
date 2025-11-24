
import ServerStatusToast from "@/components/server-status-toast";


export default function CheckoutLayout({children}:  {children: React.ReactNode}){
return(
    <>
    {children}
    <ServerStatusToast/>
    </>
)
}