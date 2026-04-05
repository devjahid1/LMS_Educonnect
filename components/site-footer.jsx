import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function SiteFooter({ className }) {
  return (
    <footer className={cn("border-t bg-gray-50", className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        
        {/* Left */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-2">
          <Logo />
          <p className="text-sm text-gray-600 text-center md:text-left">
            Empowering developers to learn, build, and grow with modern technology.
          </p>
        </div>

        {/* Right */}
        <div className="text-sm text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} <a href="https://jahid.me" target="_blank">jahid</a> All rights reserved.
        </div>
      </div>
    </footer>
  );
}