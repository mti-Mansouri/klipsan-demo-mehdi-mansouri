import { Location, locations } from "./location-data";
export default function LocationsPage() {
  return (
    <main className="min-h-screen w-screen flex flex-col pt-[220px] px-[5%] bg-white ">
      {locations.map((location, index) => {
        return (
          <div
            className={`flex justify-between items-start py-[70px] ${
              index === locations.length - 2 && "border-b-2 border-b-black"
            }`}
            key={index}
          >
            <div className="flex flex-col justify-between items-start gap-2">
              <p className="uppercase  font-bebas font-bold text-[40px]">
                {location.name}
              </p>
              <p>{location.address}</p>
              <p className="uppercase  font-bold text-[40px] mt-[50px]">
                CONTACT
              </p>
              <p>{location.email}</p>
              <p>{location.phone}</p>
            </div>
            <SimpleMap address={location.url} />
          </div>
        );
      })}
    </main>
  );
}

export function SimpleMap({ address }: { address: string }) {
  return (
    <div className="h-[500px] max-w-[50%] w-full rounded-xl overflow-hidden shadow-lg grow-0">
      <iframe
        className="w-full h-full border-0 filter grayscale"
        loading="lazy"
        // allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?${address}&output=embed`}
      ></iframe>
    </div>
  );
}
