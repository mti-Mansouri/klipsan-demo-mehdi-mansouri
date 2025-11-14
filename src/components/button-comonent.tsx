type ButtonThemes = "dark" | "light";
interface ButtonProps {
  theme?: ButtonThemes;
  children: React.ReactNode;
  onClick?: () => void;
}
export default function buttonKlipsan({
  theme = "dark",
  children,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "py-2 px-[15px] rounded-xl font-medium transitions-color captalize";
    const themeClasses: Record<ButtonThemes,string>={
        dark : "bg-black text-white hover:bg-gray-800",
        light : "bg-white text-black hover:bg-gray-200"
    }

  return <button
  onClick={onClick}
  className={`${baseClasses}  ${themeClasses[theme]}`}
  >{children}</button>;
}
