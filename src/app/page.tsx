import Image from "next/image";

export default function Home() {
  return (
 <main className="">
  <figure className="
  w-screen
  h-screen
  relative
  grid
  grid-cols-[repeat(24,1fr)]
  grid-rows-[repeat(12,1fr)]
  ">
  {/* <Image className="object-" fill quality={100} src ="/Images/img-1.webp"  alt="Klipsan-header"/> */}
  <img className="
  col-start-1 col-end-[-1]
  row-start-1 row-end-[-1]
  w-full
  h-full
  object-cover

  "
   src ="/Images/img-1.webp"  alt="Klipsan-header" />
   <div
   className="
       col-start-1 col-end-[-1]
  row-start-1 row-end-[-1]
  z-5
  bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.3)_100%)]
   "
   ></div>
    <p className="text-white text-[50px] z-10 font-bebas font-bold
    col-start-[3] col-end-[20] 
                row-start-[11] row-end-[-1]
    ">TRAIN ON YOUR OWN TIME.</p>
  </figure>

  {/* second section */}
  <section>
    <p>WE’RE A HIGH QUALITY GYM DEDICATED TO AFFORDABLE HEALTH AND WELLNESS.</p>
    <p>Klipsan Fitness is a gym where you come as you are, and do your best. Our membership offers both digital and in-club programming aimed at helping you achieve your fitness goals. Discover all of our club’s offerings below.</p>
  </section>
  <section>
    <img src="" alt="" />
    <img src="" alt="" />
  </section>
  <section>
    <div>AMENITIES</div>
    <p>At Klipsan Fitness, we’re always expanding our amenities to meet the needs of our community. Something you’d like to see added to our list? Submit a request.</p>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
        <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </section>
  <section>
    <div>SCHEDULE A VISIT</div>
    <p>Take a free 30-minute tour of either of our locations to help you decide if Klipsan is the right gym for you. You’ll have the opportunity to try equipment, observe classes, and get direct answers to all of your questions.</p>
  <form action=""></form>

  </section>

  <section>
    <p>KLIPSAN FITNESS WAS CENTRAL IN HELPING ME GAIN THE STAMINA FOR MY RECENT MARATHON.</p>
    <p>-Alejandro Jimenez</p>
  </section>
  <section>
    <section></section>
    <section></section>
  </section>
  <section></section>
 </main>
  );
}
