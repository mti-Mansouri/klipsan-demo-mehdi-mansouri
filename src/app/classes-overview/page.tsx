import { classes } from "./classes-data";
import ButtonKlipsan from "@/components/button-comonent";
import Link from "next/link";
import Reveal from "@/components/reveal";

export default function ClassesOverviewPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="relative w-full h-[60vh] md:h-screen">
        <img
          className="w-full h-full object-cover"
          src="/Images/classes-header.webp"
          alt="Classes Overview"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Title - Absolute Bottom Left */}
        <div className="absolute bottom-[10%] left-[5%] md:left-[10%] z-10">
           <Reveal>
             <h1 className="text-white font-bebas font-bold text-[50px] md:text-[70px] leading-none tracking-wide">
               CLASSES OVERVIEW
             </h1>
           </Reveal>
        </div>
      </header>

      {/* --- INTRO SECTION --- */}
      <section className="w-full py-16 px-6 md:py-32 md:px-[7%] flex flex-col lg:flex-row justify-between gap-12">
        <div className="lg:w-1/2">
          <Reveal>
            <h2 className="uppercase font-bebas font-bold text-[40px] md:text-[60px] leading-none">
              MAKE IT STAND OUT
            </h2>
          </Reveal>
        </div>
        
        <div className="lg:w-1/2 lg:max-w-[600px]">
          <Reveal delay={200}>
            <p className="text-base md:text-lg leading-relaxed text-gray-800">
              It all begins with an idea. Maybe you want to launch a business. Maybe
              you want to turn a hobby into something more. Or maybe you have a
              creative project to share with the world. Whatever it is, the way you
              tell your story online can make all the difference.
            </p>
          </Reveal>
        </div>
      </section>


      <section className="px-6 md:px-[7%] flex flex-col gap-20 md:gap-32 pb-20 md:pb-40">
        {classes.map((item, index) => {

          const isEven = index % 2 === 0;

          return (
            <div
              className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20"
              key={index}
            >
              {/* IMAGE COLUMN */}
              <div className={`w-full lg:w-[45%] aspect-[4/5] lg:aspect-[3/4] ${!isEven ? "lg:order-2" : ""}`}>
                <Reveal width="100%">
                  <img
                    className="w-full h-full object-cover shadow-lg"
                    src={item.image}
                    alt={item.name}
                  />
                </Reveal>
              </div>

              {/* TEXT COLUMN */}
              <div className="w-full lg:w-[50%] flex flex-col items-start">
                <Reveal delay={200}>
                  <h3 className="uppercase font-bebas font-bold text-[40px] md:text-[60px] leading-none mb-4">
                    {item.name}
                  </h3>
                  
                  <p className="uppercase mb-8 text-sm md:text-base tracking-widest text-gray-500 font-bold">
                    TAUGHT BY{" "}
                    <Link className="border-b border-black hover:text-gray-800 mx-1" href={item.url || "#"}>
                      {item.instructor[0]}
                    </Link>
                    {item.instructor.length > 1 && (
                      <>
                        AND{" "}
                        <Link className="border-b border-black hover:text-gray-800 mx-1" href={item.url || "#"}>
                          {item.instructor[1]}
                        </Link>
                      </>
                    )}
                  </p>

                  <div className="mb-8 space-y-1 text-sm md:text-base font-medium text-gray-700">
                    {item.timeTable.map((timeT, i) => (
                      <p key={i}>{timeT}</p>
                    ))}
                  </div>

                  <p className="text-base md:text-lg leading-relaxed text-gray-800 mb-10 max-w-xl">
                    {item.description}
                  </p>

                  <Link href={"/book-a-class"}>
                    <ButtonKlipsan theme="light">BOOK A CLASS</ButtonKlipsan>
                  </Link>
                </Reveal>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}