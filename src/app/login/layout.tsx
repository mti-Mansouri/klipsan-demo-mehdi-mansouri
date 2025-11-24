
import ServerStatusToast from "@/components/server-status-toast";


export default function LogIntLayout({children}:  {children: React.ReactNode}){
return(
    <>
    {children}
    <ServerStatusToast/>
    </>
)
}