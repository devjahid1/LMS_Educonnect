import Image from "next/image";
import logo from "@/assets/project.png";
import { cn } from "@/lib/utils";
export const Logo = ({ className = "" }) => {
  return (
    <Image className={cn("max-w-[100px]", className)} src={logo} alt="logo" />
  );
};