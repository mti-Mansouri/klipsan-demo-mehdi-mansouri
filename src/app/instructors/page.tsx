import ButtonKlipsan from "@/components/button-comonent";

export default function InstructorsPAge() {
  console.log("Instructors Page");
  return (
    <main
      className=" bg-white py-[100px] px-[10%] w-screen min-h-screen flex flex-col 
    "
    >
      <section
        className="
        grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))]
        w-full h-[150vh] gap-5 text-white
        "
      >
        <figure className="relative">
          <img
            className="w-full h-full object-cover "
            src="/Images/instructor-1.jpg"
            alt=""
          />
          <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 text-center">
            {" "}
            <strong className="text-[30px] font-bebas text-nowrap">
              NICOLE WINTER
            </strong>{" "}
            <span>PILATES, YOGA</span>
          </figcaption>
        </figure>
        <figure className="relative">
          <img
            className="w-full h-full object-cover"
            src="/Images/instructor-2.webp"
            alt=""
          />
          <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 text-center">
            {" "}
            <strong className="text-[30px] font-bebas text-nowrap">
              AARON HUGHES
            </strong>{" "}
            <span>STRENGTH TRAINING, BOXING</span>
          </figcaption>
        </figure>
        <figure className="relative">
          <img
            className="w-full h-full object-cover"
            src="/Images/instructor-3.webp"
            alt=""
          />
          <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 text-center">
            {" "}
            <strong className="text-[30px] font-bebas text-nowrap">
              DERRICK SAWYERS
            </strong>{" "}
            <span>CARDIO, CORE</span>
          </figcaption>
        </figure>
        <figure className="relative">
          <img
            className="w-full h-full object-cover"
            src="/Images/instructor-4.webp"
            alt=""
          />
          <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/5 flex flex-col gap-5 text-center">
            {" "}
            <strong className="text-[30px] font-bebas text-nowrap">
              ALIYAH WILLIAMS
            </strong>{" "}
            <span>CORE, CARDIO</span>
          </figcaption>
        </figure>
        <figure className="relative">
          <img
            className="w-full h-full object-cover"
            src="/Images/instructor-5.jpeg"
            alt=""
          />
          <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/5 flex flex-col gap-5 text-center">
            {" "}
            <strong className="text-[30px] font-bebas text-nowrap">
              OMAR HARRIS
            </strong>{" "}
            <span>CARDIO, YOGA</span>
          </figcaption>
        </figure>
        <figure className="relative">
          <img
            className="w-full h-full object-cover"
            src="/Images/instructor-6.webp"
            alt=""
          />
          <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/5 flex flex-col gap-5 text-center">
            {" "}
            <strong className="text-[30px] font-bebas text-nowrap">
              TESHIA MILLER
            </strong>{" "}
            <span>BOXING, STRENGTH TRAINING</span>
          </figcaption>
        </figure>
      </section>
      <section className="w-full h-screen my-[50px] flex justify-between">
        <section className="flex flex-col items-start gap-8">
          {/* left text */}
          <p className="font-bebas font-bold uppercase text-[40px]">
            INTERESTED IN PERSONAL TRAINING?
          </p>
          <p>
            Share your personal training goals, any questions you have, or
            anything you’d like to learn more about—we’ll be in touch soon to
            chat next steps.
          </p>
        </section>
        <form action="">
          {/* right form */}
          <fieldset className="w-full">
            <label className="" htmlFor="">
              <span>Name</span>
              <span className="text-gray-600 ml-2">(required)</span>
            </label>
            <div className="flex gap-3 w-full mt-4">
              <div className="grow-1">
                <div className="text-sm">First Name</div>
                <input
                  className="bg-gray-50 border mt-2  w-full  h-[40px] p-2 
                  focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                  "
                  type="text "
                />
              </div>
              <div className="grow-1">
                <div className="text-sm">Last Name</div>
                <input
                  className="bg-gray-50 border mt-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 w-full h-[40px] p-2"
                  type="text"
                />
              </div>
            </div>
          </fieldset>
          <div className="flex gap-3 flex-col w-full">
            <label htmlFor="">
              <span>Email</span>
              <span className="text-gray-600 ml-2">(required)</span>
            </label>
            <input
              className="bg-gray-50 border  focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 h-[40px] p-2"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="">
              <span>Email</span>
              <span className="text-gray-600 ml-2">(required)</span>
            </label>
            <span className="text-gray-600">Select all that apply</span>
            <div>
              <input type="checkbox" />
              <label htmlFor="">
                {" "}
                <span>Weight loss</span>
              </label>
            </div>
            <div>
              <input type="checkbox" />
              <label htmlFor="">
                {" "}
                <span>Build muscle</span>
              </label>
            </div>
            <div>
              <input type="checkbox" />
              <label htmlFor="">
                {" "}
                <span>Improve endurance</span>
              </label>
            </div>
            <div>
              <input type="checkbox" />
              <label htmlFor="">
                {" "}
                <span>General fitness</span>
              </label>
            </div>
            <div>
              <input type="checkbox" />
              <label htmlFor="">
                {" "}
                <span>Injury/rehab</span>
              </label>
            </div>
            <div>
              <input type="checkbox" />
              <label htmlFor="">
                {" "}
                <span>Not sure yet</span>
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="">
              <span>How often do you want to train per week?</span>
              <span className="text-gray-600 ml-2">(required)</span>
            </label>
            <select name="" id="">
              <option value="Not sure yet">Not sure yet</option>
              <option value="1x/week (just getting started)">
                1x/week (just getting started)
              </option>
              <option value="2–3x/week (building consistency)">
                2–3x/week (building consistency)
              </option>
              <option value="4–5x/week (all in!)">4–5x/week (all in!)</option>
              <option value="6+ sessions/week (next level!)">
                6+ sessions/week (next level!)
              </option>
            </select>
          </div>
          <ButtonKlipsan theme="light">Submit</ButtonKlipsan>
        </form>
      </section>
    </main>
  );
}
