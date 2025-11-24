"use client";
import { locations } from "@/lib/location-data";
import Reveal from "@/components/reveal";

export default function LocationsPage() {
  return (

    <main className="min-h-screen w-full flex flex-col pt-32 md:pt-[220px] px-6 md:px-[5%] bg-white overflow-x-hidden">
      
      {locations.map((location, index) => {
        const isLast = index === locations.length - 1;

        return (
          <div
            className={`flex flex-col md:flex-row justify-between items-start py-12 md:py-[70px] gap-12 md:gap-0 ${
              !isLast ? "border-b-2 border-b-black" : ""
            }`}
            key={index}
          >
            <div className="flex flex-col justify-between items-start gap-2 w-full md:w-1/2">
              <Reveal>
                <p className="uppercase font-bebas font-bold text-4xl md:text-[40px] mb-4">
                  {location.name}
                </p>
                <p className="text-lg text-gray-800">{location.addressLine1}</p>
                <p className="text-lg text-gray-800">{location.addressLine2}</p>
              </Reveal>

              <Reveal delay={200}>
                <p className="uppercase font-bold text-3xl md:text-[40px] mt-10 md:mt-[50px] mb-4 font-bebas">
                  CONTACT
                </p>
                <p className="text-lg text-gray-800 underline cursor-pointer">{location.email}</p>
                <p className="text-lg text-gray-800">{location.phone}</p>
              </Reveal>
            </div>

            <div className="w-full md:w-1/2 flex justify-end">
               <Reveal width="100%" delay={300}>
                  <SimpleMap url={location.mapEmbedUrl} />
               </Reveal>
            </div>
          </div>
        );
      })}
    </main>
  );
}

function SimpleMap({ url }: { url: string }) {
  return (

    <div className="h-[300px] md:h-[500px] w-full md:max-w-[90%] rounded-xl overflow-hidden shadow-lg bg-gray-100">
      <iframe
        className="w-full h-full border-0 filter grayscale hover:grayscale-0 transition-all duration-500"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={url}
        title="Google Map"
      ></iframe>
    </div>
  );
}