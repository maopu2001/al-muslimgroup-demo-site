"use client";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Moon02Icon, Sun } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  switch (theme) {
    case "light":
      return (
        <Button
          variant="outline"
          size="icon"
          className="w-20 px-5 gap-2"
          onClick={() => setTheme("dark")}
        >
          Light
          <HugeiconsIcon icon={Sun} className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to dark theme</span>
        </Button>
      );
    default:
      return (
        <Button
          variant="outline"
          size="icon"
          className="w-20 px-5 gap-2"
          onClick={() => setTheme("light")}
        >
          Dark
          <HugeiconsIcon icon={Moon02Icon} className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to light theme</span>
        </Button>
      );
  }
}
