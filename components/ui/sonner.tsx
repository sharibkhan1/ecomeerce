"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  // Determine whether the theme is dark
  const isDarkMode = theme === "dark"

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            group toast 
            group-[.toaster]:bg-background 
            group-[.toaster]:text-foreground 
            group-[.toaster]:border-border 
            group-[.toaster]:shadow-lg 
            ${isDarkMode ? 'group-[.toaster]:border-white group-[.toaster]:text-white' : ''}
          `,
          description: `
            group-[.toast]:text-muted-foreground 
            ${isDarkMode ? 'group-[.toast]:text-white' : ''}
          `,
          actionButton: `
            group-[.toast]:bg-primary 
            group-[.toast]:text-primary-foreground 
            ${isDarkMode ? 'group-[.toast]:bg-primary/50 group-[.toast]:text-white' : ''}
          `,
          cancelButton: `
            group-[.toast]:bg-muted 
            group-[.toast]:text-muted-foreground 
            ${isDarkMode ? 'group-[.toast]:bg-muted/50 group-[.toast]:text-white' : ''}
          `,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
