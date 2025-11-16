import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <figure
        className="
  w-screen
  h-screen
  relative
  grid
  grid-cols-[repeat(24,1fr)]
  grid-rows-[repeat(12,1fr)]
  "
      >
        {/* <Image className="object-" fill quality={100} src ="/Images/img-1.webp"  alt="Klipsan-header"/> */}
        <img
          className="
  col-start-1 col-end-[-1]
  row-start-1 row-end-[-1]
  w-full
  h-full
  object-cover

  "
          src="/Images/img-1.webp"
          alt="Klipsan-header"
        />
        <div
          className="
       col-start-1 col-end-[-1]
  row-start-1 row-end-[-1]
  z-5
  bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.3)_100%)]
   "
        ></div>
        <p
          className="text-white text-[50px] z-10 font-bebas font-bold
    col-start-[3] col-end-[20] 
                row-start-[11] row-end-[-1]
    "
        >
          TRAIN ON YOUR OWN TIME.
        </p>
      </figure>

      {/* second section */}
      <section
        className="
  w-screen
  h-[40vh]
  bg-black
  grid
  grid-cols-[repeat(24,1fr)]
  grid-rows-[repeat(5,1fr)]
  
  "
      >
        <p
          className="
    font-bebas
    uppercase
    text-white
    text-[40px]
    col-start-[3] col-end-[14]
    row-start-[2] row-end-[span 2]
    font-bold
    "
        >
          WE’RE A HIGH QUALITY GYM DEDICATED TO AFFORDABLE HEALTH AND WELLNESS.
        </p>
        <p
          className="
    text-white
    text-lg
    col-start-[17] col-end-[-3]
    row-start-[2] row-end-[span 2]

    "
        >
          Klipsan Fitness is a gym where you come as you are, and do your best.
          Our membership offers both digital and in-club programming aimed at
          helping you achieve your fitness goals. Discover all of our club’s
          offerings below.
        </p>
      </section>

      {/* section 3 */}

      <section
        className="
    w-screen
  h-screen
  bg-black
  grid
  grid-cols-[repeat(24,1fr)]
  grid-rows-[repeat(12,1fr)]
  overflow-hidden
  "
      >
        <img
          className="
    object-cover
    col-start-[7] col-end-[14]
    row-start-[4] row-end-[11]
    "
          src="/Images/img-2.jpg"
          alt=""
        />
        <img
          className="
    object-cover
    col-start-[13] col-end-[19]
    row-start-[2] row-end-[-3]
    "
          src="/Images/img-3.webp"
          alt=""
        />
      </section>
      <section
        className="
  w-screen
  h-[120vh]
  bg-black
  text-white
    grid
  grid-cols-[repeat(24,1fr)]
  grid-rows-[repeat(16,1fr)]
  "
      >
        <div
          className="
    font-bebas
    font-bold
    col-start-[11] col-end-[14]
    row-start-[4] row-end-[span 1]
    text-[35px]
    text-center
    "
        >
          AMENITIES
        </div>
        <p
          className="
    text-[22px]
    col-start-[7] col-end-[18]
    row-start-[5] row-end-[span 1]
    text-center
    pt-4
    "
        >
          At Klipsan Fitness, we’re always expanding our amenities to meet the
          needs of our community. Something you’d like to see added to our list?
          Submit a request.
        </p>
        <ul
          className="
    col-start-[8] col-end-[11]
    row-start-[10] row-end-[span auto]
    text-center
    text-[18px]
        flex flex-col items-center gap-[25px]
    "
        >
          <li className="before:content-['•']  relative before:absolute before:left-[50%] before:top-[100%]">
            Modern Facilities
          </li>
          <li className="before:content-['•']  relative before:absolute before:left-[50%] before:top-[100%]">
            Premium Classes
          </li>
          <li className="before:content-['•']  relative before:absolute before:left-[50%] before:top-[100%]">
            Personal Trainers
          </li>
          <li className="before:content-['•']  relative before:absolute before:left-[50%] before:top-[100%]">
            Rockwall
          </li>
          <li className="">Boxing Ring</li>
        </ul>
        <ul
          className="
    col-start-[14] col-end-[17]
    row-start-[10] row-end-[span auto]
    text-center
    text-[18px]
    flex flex-col items-center gap-[25px]

    "
        >
          <li className="before:content-['•']  relative before:absolute before:left-[50%] before:top-[100%]">
            Juice Bar
          </li>
          <li className="before:content-['•']  relative before:absolute before:left-[50%] before:top-[100%]  ">
            Personal Nutritiousness
          </li>
          <li className="before:content-['•']  relative before:absolute before:left-[50%] before:top-[100%]">
            Monthly Guest Passes
          </li>
          <li className="before:content-['•']  relative before:absolute before:left-[50%] before:top-[100%]">
            Basketball Courts
          </li>
          <li className="">Lockers</li>
        </ul>
      </section>
      {/* section 4 */}
      <section
        className="bg-white
  text-black
  w-screen
  h-[75vh]
  overflow-hidden
  grid-cols-[repeat(24,1fr)]
  grid-rows-[repeat(10,1fr)]
  
  "
      >
        <div>SCHEDULE A VISIT</div>
        <p>
          Take a free 30-minute tour of either of our locations to help you
          decide if Klipsan is the right gym for you. You’ll have the
          opportunity to try equipment, observe classes, and get direct answers
          to all of your questions.
        </p>
        <form action=""></form>
      </section>
      {/* section 5 */}
      <section
        className="
    
bg-[linear-gradient(90deg,#d6ca69,#c7b478,#9f8d83,#7c9e8f)]
  text-white 
  w-screen
  h-[65vh]
  overflow-hidden
  grid
  grid-cols-[repeat(24,1fr)]
  grid-rows-[repeat(10,1fr)]
  
  "
      >
        <p 
        className="
        font-bebas
        text-center
        font-bold
        text-[40px]
col-start-[3] col-end-[-3] row-start-[5] row-end-[span 3]

relative
before:content-['“'] before:text-[65px] before:absolute before:left-[50%] before:-top-[150%] before:translate-[-50%,-50%]
after:content-['-Alejandro Jimenez'] after:text-[20px] after:absolute after:left-[50%] after:top-[50%] 
        "
        >
          KLIPSAN FITNESS WAS CENTRAL IN HELPING ME GAIN THE STAMINA FOR MY
          RECENT MARATHON.
        </p>
        {/* <p
        className="
        text-center
col-start-[11] col-end-[14] row-start-[7] row-end-[span 1]
text-[20px]
        "
        >-Alejandro Jimenez</p> */}
      </section>

      {/* section 6 */}
      <section
        className="
  bg-black
  text-white
    w-screen
  h-[30vh]
  overflow-hidden
  grid
  grid-cols-[repeat(24,1fr)]
  grid-rows-[repeat(6,1fr)]
  "
      >
        <section></section>
        <section></section>
      </section>

      {/* section 7 */}
      <section
        className="
      bg-black
  text-white
    w-screen
  h-[35vh]
  overflow-hidden
  grid
  grid-cols-[repeat(6,1fr)]
  grid-rows-[repeat(1,1fr)]
  "
      >
        <div className="     col-start-[1] col-end-[span 1] row-start-[1] row-end-[span auto]">
          <img
            className="w-full h-full object-cover"
            src="/Images/img-9.webp"
            alt=""
          />
        </div>
        <div className="col-start-[2] col-end-[span 1]">
          <img
            className="w-full h-full object-cover"
            src="/Images/img-4.webp"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-full object-cover"
            src="/Images/img-5.webp"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-full object-cover"
            src="/Images/img-6.webp"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-full object-cover"
            src="/Images/img-8.webp"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-full object-cover"
            src="/Images/img-7.webp"
            alt=""
          />
        </div>
      </section>
    </main>
  );
}
