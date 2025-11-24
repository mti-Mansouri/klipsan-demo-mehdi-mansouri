
import ServerStatusToast from "@/components/server-status-toast";


export default function BookClassLayout({children}:  {children: React.ReactNode}){
return(
    <>
    {children}
    <ServerStatusToast/>
    </>
)
}