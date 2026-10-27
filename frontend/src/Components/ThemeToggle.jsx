import { Moon, Sun } from "lucide-react";
import { useTheme } from "../utils/theme";

const ThemeToggle = ({ floating = false }) => {
  const { isDark, toggle } = useTheme();

  const base =
    "p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer";
  const floatingCls =
    "fixed top-4 right-4 z-50 rounded-full bg-white border border-gray-200 shadow-md";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={floating ? `${base} ${floatingCls}` : base}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
