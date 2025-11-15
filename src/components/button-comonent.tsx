type ButtonThemes = "dark" | "light";
interface ButtonProps {
  theme?: ButtonThemes;
  children: React.ReactNode;
  onClick?: () => void;
}
export default function ButtonKlipsan({
  theme = "dark",
  children,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "py-2 px-[15px]  font-medium transitions-color captalize";
  const themeClasses: Record<ButtonThemes, string> = {
    dark: "bg-transparent text-white border-2 border-white rounded-full px-10 py-2 uppercase tracking-wider font-normal  hover:bg-white hover:text-black",
    light:
      "bg-transparent border-2 border-black rounded-full text-black hover:bg-white font-normal px-[25px]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses}  ${themeClasses[theme]}`}
    >
      {children}
    </button>
  );
}
