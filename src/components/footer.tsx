"use client";
import Link from "next/link";
import ButtonKlipsan from "./button-comonent";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();
  if (path === "/checkout") {
    return null;
  }

  return (
    <footer
      className=" text-white bg-black
       flex flex-col justify-start items-center
        w-full py-10 md:h-[calc(100vh-200px)] md:py-0
        
        "
    >
      <section className="w-[85%] flex flex-col gap-8 border-b-2 border-white/20 pb-10 md:h-[50%] md:justify-center md:pb-0">
        <div className="font-bebas font-bold text-[30px] md:text-[40px] uppercase">
          STAY UPDATED
        </div>
        <div className="flex flex-col md:flex-row gap-6  ">
          <p className="text-base md:text-lg md:max-w-[50%]">
            Sign up to be the first to find out when we add new classes,
            amenities, and more. We respect your privacy and will never share
            your information with any third-party vendors.{" "}
          </p>
          <form className="flex flex-col md:flex-row gap-4 grow justify-end items-start md:items-end">
            <input
              className=" bg-white h-[50px]  border-4 text-black
                focus:outline-none focus:ring-2
                 focus:ring-white focus:ring-offset-2  p-2 w-full md:w-[200px]"

              type="email"
              name=""
              id=""
              placeholder="Email Address"
            />
            <ButtonKlipsan>sign up</ButtonKlipsan>
          </form>
        </div>
      </section>
      {/* lower part */}
      <section className="w-[85%] flex flex-col md:flex-row pt-10 gap-10 md:gap-0 h-auto md:h-[50%]">
        <section className="flex flex-col md:flex-row justify-between grow">
          <section className="mb-8 md:mb-0">
            <p className="font-bebas font-bold text-[24px] md:text-[30px] pb-4">
              SUPPORT
            </p>
            <ul>
              <li className="underline underline-offset-3 ">
                <Link href={"/terms-and-conditions"}>Terms and Conditions</Link>
              </li>
              <li className="underline underline-offset-3">
                <Link href={"/privacy-policy"}>Private Policy</Link>{" "}
              </li>
              <li className="underline underline-offset-3">
                {" "}
                <Link href={"/faqs"}>FAQs</Link>
              </li>
            </ul>
          </section>
          <section className="mb-8 md:mb-0">
            <p className="font-bebas font-bold text-[24px] md:text-[30px] pb-4">
              CONTACT
            </p>
            <ul>
              <li>email@example.com</li>
              <li>1+(555)-555-5555</li>
            </ul>
          </section>
        </section>
        <section className="flex flex-col items-start md:items-end  md:grow-[0.5]">
          <p className="font-bebas font-bold text-[24px] md:text-[30px] pb-4">KLIPSAN</p>
          <div className="flex gap-3">
            <svg
              fill="currentColor"
              className={`w-[24px] h-[24px] `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
            </svg>
            <svg
              fill="currentColor"
              className={`w-[24px] h-[24px] `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" />
            </svg>
            <svg
              fill="currentColor"
              className={`w-[24px] h-[24px] `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" />
            </svg>
          </div>
        </section>
      </section>
    </footer>
  );
}
