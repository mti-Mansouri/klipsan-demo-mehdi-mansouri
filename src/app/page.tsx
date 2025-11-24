import Image from "next/image";
import ButtonKlipsan from "@/components/button-comonent";
import Link from "next/link";
import Reveal from "@/components/reveal";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <figure className="relative w-full h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/Images/img-1.webp"
            alt="Klipsan-header"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Text Content - Positioned Absolute on Desktop, Centered on Mobile */}
        <div className="absolute inset-0 flex items-end pb-20 px-6 md:block md:pb-0 md:px-0">
           <Reveal>
             <p className="text-white text-[40px] md:text-[50px] font-bebas font-bold z-10 leading-tight
                           md:absolute md:bottom-[10%] md:left-[10%] md:max-w-[60%]">
               TRAIN ON YOUR OWN TIME.
             </p>
           </Reveal>
        </div>
      </figure>

      {/* --- MISSION STATEMENT --- */}
      <section className="w-full bg-black py-16 px-6 md:py-24 md:px-12 lg:h-[40vh] lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="col-span-12 lg:col-start-2 lg:col-span-5 mb-8 lg:mb-0">
          <Reveal>
            <p className="font-bebas uppercase text-white text-[32px] md:text-[40px] font-bold leading-none">
              WE’RE A HIGH QUALITY GYM DEDICATED TO AFFORDABLE HEALTH AND WELLNESS.
            </p>
          </Reveal>
        </div>
        <div className="col-span-12 lg:col-start-8 lg:col-span-4">
          <Reveal delay={200}>
            <p className="text-gray-300 text-lg leading-relaxed">
              Klipsan Fitness is a gym where you come as you are, and do your best.
              Our membership offers both digital and in-club programming aimed at
              helping you achieve your fitness goals. Discover all of our club’s
              offerings below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- IMAGES GRID (Mobile: Stacked, Desktop: Asymmetric Grid) --- */}
      <section className="w-full bg-black relative h-[50vh] md:h-screen grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 overflow-hidden">
        {/* Image 1 */}
        <div className="relative w-full h-full md:col-start-1 md:row-start-1 md:col-span-2">
           {/* We use absolute positioning on desktop to match your overlap design */}
           <div className="hidden md:block absolute top-[20%] left-[25%] w-[30%] h-[60%] z-10">
              <Reveal width="100%" delay={100}>
                <img className="w-full h-full object-cover shadow-xl" src="/Images/img-2.jpg" alt="" />
              </Reveal>
           </div>
           <div className="hidden md:block absolute top-[10%] right-[20%] w-[25%] h-[80%]">
              <Reveal width="100%" delay={300}>
                <img className="w-full h-full object-cover shadow-xl" src="/Images/img-3.webp" alt="" />
              </Reveal>
           </div>

           {/* Mobile View: Just show one hero image or stack them */}
           <img className="md:hidden w-full h-full object-cover object-center " src="/Images/img-9.webp" alt="" />
        </div>
      </section>

      {/* --- AMENITIES --- */}
      <section className="w-full bg-black text-white py-20 px-6 md:py-32">
        <Reveal width="100%">
          <h2 className="font-bebas font-bold text-[40px] text-center mb-6">AMENITIES</h2>
        </Reveal>
        
        <Reveal width="100%" delay={100}>
          <p className="text-[18px] md:text-[22px] text-center max-w-3xl mx-auto mb-16 text-gray-300">
            At Klipsan Fitness, we’re always expanding our amenities to meet the
            needs of our community. Something you’d like to see added to our list?
            Submit a request.
          </p>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32">
          <Reveal delay={200}>
            <ul className="text-center text-[18px] flex flex-col gap-6">
              <li className="amenity-item">Modern Facilities</li>
              <li className="amenity-item">Premium Classes</li>
              <li className="amenity-item">Personal Trainers</li>
              <li className="amenity-item">Rockwall</li>
              <li>Boxing Ring</li>
            </ul>
          </Reveal>
          
          <Reveal delay={400}>
            <ul className="text-center text-[18px] flex flex-col gap-6">
              <li className="amenity-item">Juice Bar</li>
              <li className="amenity-item">Personal Nutritiousness</li>
              <li className="amenity-item">Monthly Guest Passes</li>
              <li className="amenity-item">Basketball Courts</li>
              <li>Lockers</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* --- SCHEDULE VISIT (Form) --- */}
      <section className="bg-white text-black w-full py-20 px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-24 lg:py-32">
        <div className="col-span-12 lg:col-span-5 mb-12 lg:mb-0">
          <Reveal>
            <h2 className="font-bebas font-bold text-[50px] mb-6 leading-none">SCHEDULE A VISIT</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Take a free 30-minute tour of either of our locations to help you
              decide if Klipsan is the right gym for you. You’ll have the
              opportunity to try equipment, observe classes, and get direct answers
              to all of your questions.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7  md:ml-auto">
          <Reveal delay={200}>
            <form  className="flex flex-col  gap-6 max-w-lg">
              <fieldset className="w-full">
                <label className="font-bold text-sm uppercase">Name <span className="text-gray-400 font-normal lowercase ml-1">(required)</span></label>
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                  <div className="grow">
                    <input placeholder="First Name" className="bg-gray-50 border w-full h-[50px] p-3 focus:ring-2 focus:ring-black outline-none" type="text" />
                  </div>
                  <div className="grow">
                    <input placeholder="Last Name" className="bg-gray-50 border w-full h-[50px] p-3 focus:ring-2 focus:ring-black outline-none" type="text" />
                  </div>
                </div>
              </fieldset>

              <div className="flex flex-col w-full">
                <label className="font-bold text-sm uppercase">Email <span className="text-gray-400 font-normal lowercase ml-1">(required)</span></label>
                <input className="bg-gray-50 border w-full h-[50px] p-3 mt-2 focus:ring-2 focus:ring-black outline-none" type="email" />
              </div>

              <div className="flex flex-col w-full md:w-[50%]">
                <label className="font-bold text-sm uppercase">Date <span className="text-gray-400 font-normal lowercase ml-1">(required)</span></label>
                <input className="bg-gray-50 border w-full h-[50px] p-3 mt-2 focus:ring-2 focus:ring-black outline-none" type="date" />
              </div>

              <div className="mt-4">
                <ButtonKlipsan theme="light">Submit</ButtonKlipsan>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* --- QUOTE SECTION --- */}
      <section className="w-full py-24 px-6 bg-[linear-gradient(90deg,#d6ca69,#c7b478,#9f8d83,#7c9e8f)] text-white flex items-center justify-center">
        <Reveal>
          <div className="max-w-4xl text-center relative">
            <span className="block text-[80px] leading-none font-bebas absolute -top-10 left-1/2 -translate-x-1/2 opacity-50">“</span>
            <p className="font-bebas font-bold text-[30px] md:text-[50px] leading-tight relative z-10">
              KLIPSAN FITNESS WAS CENTRAL IN HELPING ME GAIN THE STAMINA FOR MY RECENT MARATHON.
            </p>
            <p className="mt-6 text-lg tracking-widest font-bold">- ALEJANDRO JIMENEZ</p>
          </div>
        </Reveal>
      </section>

      {/* --- LOCATIONS --- */}
      <section className="bg-black text-white py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-center place-items-center ">
        <Reveal delay={100}>
          <div className="flex flex-col items-center">
            <p className="font-bebas text-[35px] mb-4 font-bold tracking-wider">BROOKLYN</p>
            <p className="text-gray-300">12834 Fitness Ln.</p>
            <p className="text-gray-300">Brooklyn, NY</p>
            <p className="text-gray-300">11385</p>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex flex-col items-center">
            <p className="font-bebas text-[35px] mb-4 font-bold tracking-wider">LOS ANGELES</p>
            <p className="text-gray-300">12834 Fitness Ln.</p>
            <p className="text-gray-300">Los Angeles, LA</p>
            <p className="text-gray-300">11385</p>
          </div>
        </Reveal>
      </section>

      {/* --- GALLERY GRID --- */}
      <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
        {["img-9.webp", "img-4.webp", "img-5.webp", "img-6.webp", "img-8.webp", "img-7.webp"].map((img, idx) => (
          <div key={idx} className="aspect-[3/4] md:aspect-square relative group overflow-hidden">
             <img
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
               src={`/Images/${img}`}
               alt=""
             />
          </div>
        ))}
      </section>

    </main>
  );
}