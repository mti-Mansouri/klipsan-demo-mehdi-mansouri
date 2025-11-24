"use client";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define the steps
type CheckoutStep = "email" | "delivery" | "payment" | "review";

// Form Data Interface
interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  newsletter: boolean;
}

export default function CheckoutPage() {
  const { items, totalPrice, removeItem } = useCart();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState<CheckoutStep>("email");
  const [completedSteps, setCompletedSteps] = useState({
    email: false,
    delivery: false,
    payment: false,
  });

  // Unified Form State
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    newsletter: false,
  });

  // Error State
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/shop");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  // --- Helpers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    // Update data
    setFormData((prev) => ({ ...prev, [name]: val }));

    // Clear error for this field if user starts typing
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // --- Validation Logic ---

  const validateEmailStep = () => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const validateDeliveryStep = () => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";
    if (!formData.address.trim()) newErrors.address = "Address required";
    if (!formData.city.trim()) newErrors.city = "City required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Navigation Handlers ---

  const handleContinueToDelivery = () => {
    if (validateEmailStep()) {
      setCompletedSteps((prev) => ({ ...prev, email: true }));
      setActiveStep("delivery");
    }
  };

  const handleContinueToPayment = () => {
    if (validateDeliveryStep()) {
      setCompletedSteps((prev) => ({ ...prev, delivery: true }));
      setActiveStep("payment");
    }
  };

  const handleContinueToReview = () => {
    // No validation needed for placeholder payment yet
    setCompletedSteps((prev) => ({ ...prev, payment: true }));
    setActiveStep("review");
  };

  const handlePurchase = async () => {
    console.log("Processing Purchase with data:", formData);
    alert("Ready to integrate Stripe!");
  };

  const toggleStep = (step: CheckoutStep) => {
    if (step === "email") setActiveStep("email");
    if (step === "delivery" && completedSteps.email) setActiveStep("delivery");
    if (step === "payment" && completedSteps.delivery) setActiveStep("payment");
    if (step === "review" && completedSteps.payment) setActiveStep("review");
  };

  // Helper for Input Styling
  const getInputClass = (fieldName: keyof CheckoutFormData) => {
    return `w-full border rounded p-3 outline-none focus:ring-2 transition-colors ${
      errors[fieldName]
        ? "border-red-500 bg-red-50 focus:ring-red-200"
        : "border-gray-300 focus:ring-black"
    }`;
  };

  return (
    <main className="flex flex-col w-screen h-screen overflow-hidden bg-white text-black font-sans">
      <header className="h-[80px] w-full flex items-center px-6 md:px-12 border-b border-gray-200 shrink-0 z-20 bg-white">
        <Link href="/" className="font-bebas font-bold text-4xl tracking-wider">
          KLIPSAN
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <section className="flex-1 overflow-y-auto bg-white">
          <div className="p-6 md:p-12 max-w-[750px] mx-auto flex flex-col gap-4 pb-20">
            <div
              className={`border rounded-md transition-all duration-300 ${
                activeStep === "email"
                  ? "border-black ring-1 ring-black"
                  : "border-gray-200"
              }`}
            >
              <div
                onClick={() => toggleStep("email")}
                className="p-4 flex justify-between items-center cursor-pointer bg-gray-50/50"
              >
                <h2 className="font-bold text-lg">1. Contact Information</h2>
                {completedSteps.email && (
                  <span className="text-green-600 font-bold">✓</span>
                )}
              </div>

              {activeStep === "email" && (
                <div className="p-6 pt-0 animate-fade-in">
                  <div className="mt-4">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={getInputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}

                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer mt-4">
                      <input
                        name="newsletter"
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-black"
                      />
                      Sign up to receive news and updates
                    </label>
                    <button
                      onClick={handleContinueToDelivery}
                      className="w-full bg-black text-white font-bold py-4 mt-6 rounded hover:bg-gray-800 transition"
                    >
                      CONTINUE TO DELIVERY
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className={`border rounded-md transition-all duration-300 ${
                activeStep === "delivery"
                  ? "border-black ring-1 ring-black"
                  : "border-gray-200"
              }`}
            >
              <div
                onClick={() => toggleStep("delivery")}
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  !completedSteps.email
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-gray-50/50"
                }`}
              >
                <h2 className="font-bold text-lg">2. Delivery Details</h2>
                {completedSteps.delivery && (
                  <span className="text-green-600 font-bold">✓</span>
                )}
              </div>

              {activeStep === "delivery" && (
                <div className="p-6 pt-0 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="col-span-1">
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className={getInputClass("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="col-span-1">
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className={getInputClass("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className={getInputClass("address")}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div className="col-span-1">
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className={getInputClass("city")}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div className="col-span-1">
                      <input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Postal Code"
                        className={getInputClass("postalCode")}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleContinueToPayment}
                    className="w-full bg-black text-white font-bold py-4 mt-6 rounded hover:bg-gray-800 transition"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              )}
            </div>

            <div
              className={`border rounded-md transition-all duration-300 ${
                activeStep === "payment"
                  ? "border-black ring-1 ring-black"
                  : "border-gray-200"
              }`}
            >
              <div
                onClick={() => toggleStep("payment")}
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  !completedSteps.delivery
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-gray-50/50"
                }`}
              >
                <h2 className="font-bold text-lg">3. Payment Method</h2>
                {completedSteps.payment && (
                  <span className="text-green-600 font-bold">✓</span>
                )}
              </div>

              {activeStep === "payment" && (
                <div className="p-6 pt-0 animate-fade-in">
                  <div className="mt-4 p-4 border border-gray-200 bg-gray-50 rounded text-center text-gray-500">
                    <p>🔒 Credit Card Form (Stripe Elements) will go here</p>
                  </div>
                  <button
                    onClick={handleContinueToReview}
                    className="w-full bg-black text-white font-bold py-4 mt-6 rounded hover:bg-gray-800 transition"
                  >
                    REVIEW ORDER
                  </button>
                </div>
              )}
            </div>

            <div
              className={`border rounded-md transition-all duration-300 ${
                activeStep === "review"
                  ? "border-black ring-1 ring-black"
                  : "border-gray-200"
              }`}
            >
              <div
                onClick={() => toggleStep("review")}
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  !completedSteps.payment
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-gray-50/50"
                }`}
              >
                <h2 className="font-bold text-lg">4. Review & Purchase</h2>
              </div>

              {activeStep === "review" && (
                <div className="p-6 pt-0 animate-fade-in">
                  <div className="mt-4 text-sm text-gray-600 space-y-2 border-b border-gray-100 pb-4 mb-4">
                    <div className="flex justify-between">
                      <span className="font-bold">Contact:</span>
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Ship to:</span>
                      <span className="text-right">
                        {formData.address}, {formData.city}{" "}
                        {formData.postalCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Name:</span>
                      <span>
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-green-700 text-white font-bold py-4 mt-2 rounded hover:bg-green-800 transition shadow-lg text-lg flex items-center justify-center gap-2"
                  >
                    <span>PAY</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-4 text-xs text-gray-400 underline pl-2">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </section>

        <section className="hidden lg:block w-1/2 bg-gray-50 border-l border-gray-200 overflow-y-auto">
          <div className="p-12 lg:px-20 max-w-[550px] border-1 border-gray-50 bg-white mx-auto ">
            <h2 className="font-bold text-xl mb-8 text-gray-800">
              Order Summary
            </h2>

            <div className="flex flex-col gap-6 mb-8 border-b border-gray-200 pb-8">
              {items.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex gap-4 items-start"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 border bg-white rounded-md overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-0 right-0 bg-gray-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-bl-md font-bold z-10">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <p className="font-bold text-gray-800 leading-tight">
                      {item.name}
                    </p>
                    {item.option && (
                      <p className="text-sm text-gray-500 font-medium">
                        {item.option}
                      </p>
                    )}

                    <button
                      onClick={() => removeItem(item.id, item.option)}
                      className="text-xs text-gray-400 underline hover:text-red-600 text-left w-fit mt-1 transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="font-bold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-2xl font-bold mt-6 pt-6 border-t border-gray-200 text-black">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* <div className="mt-12 flex items-center gap-2 text-gray-500 text-sm bg-gray-100 p-3 rounded justify-center border border-gray-200">
                  <span className="text-lg">🔒</span> Secure SSL Checkout
              </div> */}
          </div>
        </section>
      </div>
    </main>
  );
}
