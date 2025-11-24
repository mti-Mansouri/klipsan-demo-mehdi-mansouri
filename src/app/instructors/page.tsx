"use client";
import { useState } from "react";
import ButtonKlipsan from "@/components/button-comonent";
import Reveal from "@/components/reveal";

// Form Data Interface
interface InstructorFormData {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  goals: string[];
  frequency: string;
}

export default function InstructorsPage() {
  // --- STATE ---
  const [formData, setFormData] = useState<InstructorFormData>({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    goals: [],
    frequency: "Not sure yet",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InstructorFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- HANDLERS ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name as keyof InstructorFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const currentGoals = prev.goals;
      if (checked) {
        return { ...prev, goals: [...currentGoals, value] };
      } else {
        return { ...prev, goals: currentGoals.filter((g) => g !== value) };
      }
    });
    // Clear error
    if (errors.goals) setErrors((prev) => ({ ...prev, goals: undefined }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof InstructorFormData, string>> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.date) newErrors.date = "Date is required";
    
    if (formData.goals.length === 0) {
      newErrors.goals = "Please select at least one goal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      console.log("Form Submitted:", formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Thank you! We will be in touch.");
      // Reset form
      setFormData({ firstName: "", lastName: "", email: "", date: "", goals: [], frequency: "Not sure yet" });
    }
    
    setIsSubmitting(false);
  };

  // --- DATA ---
  const instructors = [
    { name: "NICOLE WINTER", role: "PILATES, YOGA", img: "/Images/instructor-1.jpg" },
    { name: "AARON HUGHES", role: "STRENGTH TRAINING, BOXING", img: "/Images/instructor-2.webp" },
    { name: "DERRICK SAWYERS", role: "CARDIO, CORE", img: "/Images/instructor-3.webp" },
    { name: "ALIYAH WILLIAMS", role: "CORE, CARDIO", img: "/Images/instructor-4.webp" },
    { name: "OMAR HARRIS", role: "CARDIO, YOGA", img: "/Images/instructor-5.jpeg" },
    { name: "TESHIA MILLER", role: "BOXING, STRENGTH TRAINING", img: "/Images/instructor-6.webp" },
  ];

  const goalOptions = [
    "Weight loss",
    "Build muscle",
    "Improve endurance",
    "General fitness",
    "Injury/rehab",
    "Not sure yet"
  ];

  return (
    <main className="bg-white w-full min-h-screen flex flex-col overflow-x-hidden pt-[90px]">
      
      {/* --- INSTRUCTORS GRID --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-auto md:px-[30px] md:gap-[30px]">
        {instructors.map((instructor, idx) => (
          <figure key={idx} className="relative w-full h-[50vh] md:h-[75vh] group overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={instructor.img}
              alt={instructor.name}
            />
            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            
            <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 text-center text-white w-full px-4">
              <Reveal delay={idx * 100}>
                <div className="flex flex-col items-center justify-center">
                  <strong className="text-[30px] md:text-[40px] font-bebas leading-none">
                    {instructor.name}
                  </strong>
                  <span className="text-sm md:text-base tracking-widest font-medium ">
                    {instructor.role}
                  </span>
                </div>
              </Reveal>
            </figcaption>
          </figure>
        ))}
      </section>

      {/* --- FORM SECTION --- */}
      <section className="w-full min-h-screen py-20 px-6 lg:px-[10%] flex flex-col lg:flex-row gap-16">
        
        {/* Left Text */}
        <div className="lg:w-1/2 flex flex-col items-start gap-8 lg:sticky lg:top-32 h-fit">
          <Reveal>
            <div>
              <p className="font-bebas font-bold uppercase text-[40px] md:text-[60px] leading-none">
                INTERESTED IN PERSONAL
              </p>
              <p className="font-bebas font-bold uppercase text-[40px] md:text-[60px] leading-none ">
                TRAINING?
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg leading-relaxed text-gray-700">
              Share your personal training goals, any questions you have, or
              anything you’d like to learn more about—we’ll be in touch soon to
              chat next steps.
            </p>
          </Reveal>
        </div>

        {/* Right Form */}
        <div className="lg:w-1/2">
          <Reveal delay={400}>
            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6 w-full">
              
              {/* Name Fields */}
              <fieldset className="w-full">
                <label className="font-bold text-sm">
                  <span>Name</span>
                  <span className="text-gray-600 ml-2">(required)</span>
                </label>
                <div className="flex flex-col md:flex-row gap-3 w-full mt-2">
                  <div className="grow">
                    <div className="text-sm text-gray-500 mb-1">First Name</div>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border w-full h-[50px] p-3 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${errors.firstName ? 'border-red-500 bg-red-50' : ''}`}
                      type="text"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="grow">
                    <div className="text-sm text-gray-500 mb-1">Last Name</div>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border w-full h-[50px] p-3 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${errors.lastName ? 'border-red-500 bg-red-50' : ''}`}
                      type="text"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
              </fieldset>

              {/* Email */}
              <div className="flex gap-1 flex-col w-full">
                <label>
                  <span className="font-bold text-sm">Email</span>
                  <span className="text-gray-600 ml-2 text-sm">(required)</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`bg-gray-50 border h-[50px] p-3 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
                  type="email"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Date */}
              <div className="flex gap-1 flex-col w-full md:w-1/2">
                <label>
                  <span className="font-bold text-sm">Date</span>
                  <span className="text-gray-600 ml-2 text-sm">(required)</span>
                </label>
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`bg-gray-50 h-[50px] border p-3 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${errors.date ? 'border-red-500 bg-red-50' : ''}`}
                  type="date"
                />
                {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
              </div>

              {/* Training Goals (Checkboxes) */}
              <div className="flex flex-col items-start gap-3 w-full">
                <label>
                  <span className="font-bold text-sm">Training goals</span>
                  <span className="text-gray-600 ml-2 text-sm">(required)</span>
                </label>
                <span className="text-gray-500 text-sm block -mt-2">Select all that apply</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 w-full">
                  {goalOptions.map((goal) => (
                    <div key={goal} className="flex items-center">
                      <input
                        id={`goal-${goal}`}
                        type="checkbox"
                        value={goal}
                        checked={formData.goals.includes(goal)}
                        onChange={handleCheckboxChange}
                        className="bg-gray-50 border w-5 h-5 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 accent-black"
                      />
                      <label htmlFor={`goal-${goal}`} className="ml-3 text-gray-700 cursor-pointer">
                        {goal}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.goals && <p className="text-red-500 text-xs">{errors.goals}</p>}
              </div>

              {/* Frequency Select */}
              <div className="w-full">
                <label>
                  <span className="font-bold text-sm">How often do you want to train per week?</span>
                  <span className="text-gray-600 ml-2 text-sm">(required)</span>
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="bg-gray-50 border mt-2 w-full h-[50px] p-3 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 appearance-none"
                >
                  <option value="Not sure yet">Not sure yet</option>
                  <option value="1x/week (just getting started)">1x/week (just getting started)</option>
                  <option value="2–3x/week (building consistency)">2–3x/week (building consistency)</option>
                  <option value="4–5x/week (all in!)">4–5x/week (all in!)</option>
                  <option value="6+ sessions/week (next level!)">6+ sessions/week (next level!)</option>
                </select>
              </div>

              <div className="mt-4">
                <ButtonKlipsan theme="light">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </ButtonKlipsan>
              </div>

            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}