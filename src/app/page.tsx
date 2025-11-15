import Image from "next/image";

export default function Home() {
  return (
 <main className="">
  <figure className=" w-[100vw] h-[100vh] relative">
  <Image fill quality={100} src ="/Images/img-1.webp"  alt="Klipsan-header"/>
  {/* <img className="w-full h-full object-cover" src ="/Images/img-1.webp"  alt="Klipsan-header" /> */}

  </figure>
 </main>
  );
}
