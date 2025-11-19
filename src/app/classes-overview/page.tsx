import { classes } from "./classes-data";
import ButtonKlipsan from "@/components/button-comonent";
import Link from "next/link";
export default function ClassesOverviewPage() {
  return (
    <main className="min-h-screen w-screen  ">
      <header className="w-screen h-screen relative">
        <img
          className="w-full h-full object-cover"
          src="/Images/classes-header.webp"
          alt=""
        />
        <div className=" bg-[rgba(0,0,0,0.3)_100%)] z-5 absolute w-full h-full inset-0"></div>
        <p className=" z-6 uppercase font-bebas font-bold text-[70px] absolute left-1/14 bottom-1/11 text-white">
          CLASSES OVERVIEW
        </p>
      </header>
      <section className="w-full h-[65vh] flex justify-between pt-40 px-[7%]">
        <p className="uppercase font-bebas font-bold text-[60px]">
          MAKE IT STAND OUT
        </p>
        <p className="text-lg max-w-[50%]">
          It all begins with an idea. Maybe you want to launch a business. Maybe
          you want to turn a hobby into something more. Or maybe you have a
          creative project to share with the world. Whatever it is, the way you
          tell your story online can make all the difference. Don’t worry about
          sounding professional. Sound like you. There are over 1.5 billion
          websites out there, but your story is what’s going to separate this
          one from the rest. If you read the words back and don’t hear your own
          voice in your head, that’s a good sign you still have more work to do.
        </p>
      </section>

      {/* class overview */}
      <section className="px-[7%] flex flex-col gap-30 pb-40">
        {classes.map((item, index) => {
          return (
            // right
            <div
              className="flex justify-between w-full h-screen items-start"
              key={index}
            >
              <div
                className={`w-[40%] h-full ${
                  index % 2 == 0 ? "" : "order-2"
                }   `}
              >
                <img
                  className={` w-full h-full object-cover`}
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <section className="w-1/2 h-full flex flex-col items-start text-sm ">
                {/* information */}
                <p className="uppercase font-bebas font-bold text-[60px] ">
                  {item.name}
                </p>
                <p className="uppercase mb-7">
                  TAUGHT BY
                  <Link className="border-b mx-1" href={item.url}>
                    {item.instructor[1]}
                  </Link>
                  {item.instructor.length > 1 && (
                    <>
                      AND
                      <Link className="border-b mx-1" href={item.url}>
                        {"" + item.instructor[2]}
                      </Link>
                    </>
                  )}
                </p>
                <div className="mb-15">
                  {item.timeTable.map((timeT, index) => {
                    return <p key={index}>{timeT}</p>;
                  })}
                </div>
                <p className="max-w-[85%] mb-20 text-base">
                  {item.description}
                </p>
                <Link href={"/book-a-class"}>
                  <ButtonKlipsan theme="light">BOOK A CLASS</ButtonKlipsan>
                </Link>
              </section>
            </div>
          );
        })}
      </section>
    </main>
  );
}
