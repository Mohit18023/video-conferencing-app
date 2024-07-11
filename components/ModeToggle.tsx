
"use client"


import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
   const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("bg-custom-gradient")
      document.body.classList.remove("bg-dark-1")
      // Add similar lines to change navbar, sidebar, avatar colors
    } else if (theme === "dark") {
      document.body.classList.add("bg-dark-1")
      document.body.classList.remove("bg-custom-gradient")
      // Add similar lines to change navbar, sidebar, avatar colors
      document.getElementsByClassName('sidebar')[0].classList.add("bg-dark-2");
    } 
  }, [theme])
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button className="p-1"   size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`${theme==="dark"?"bg-dark-3":"bg-white bg-opacity-30 backdrop-blur-lg border border-white border-opacity-20"}`} align="end">
        <DropdownMenuItem className="font-bold cursor-pointer"onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="font-bold cursor-pointer"  onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
