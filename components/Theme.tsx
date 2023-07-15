"use client";

import { GoDeviceDesktop } from "react-icons/go";
import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Theme() {
  // _________________Hooks --------------------------------
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>();

  useEffect(() => {
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme!);
  }, [theme]);
  // __________________Functions ________________

  // __________________JSX________________________
  return (
    <div className="flex gap-5 items-center justify-center mt-4  text-white  border-t  border-gray-700 pt-4">
      {/* system theme | default */}

      <button
        className={`text-md hover:text-green-400 rounded-full p-2 ${
          selectedTheme === "system" ? "selected-theme" : ""
        } `}
        onClick={() => setTheme("system")}
        title="system theme"
      >
        <GoDeviceDesktop />
      </button>
      {/* dark theme  */}
      <button
        className={`text-md hover:text-green-400 rounded-full p-2 ${
          selectedTheme === "dark" ? "selected-theme" : ""
        } `}
        onClick={() => setTheme("dark")}
        title="dark theme"
      >
        <BsMoon />
      </button>
      {/* light theme  */}
      <button
        className={`text-md hover:text-green-400 rounded-full p-2 ${
          selectedTheme === "light" ? "selected-theme" : ""
        }`}
        onClick={() => setTheme("light")}
        title="light theme"
      >
        <BsSun />
      </button>
    </div>
  );
}
