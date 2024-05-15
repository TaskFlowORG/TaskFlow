"use client";

import { useRouter } from "next/navigation";
import { animatePageOut } from "@/animations";

export const  Transition =({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href, router);
  };

  return (
    <p
      className='font-alata text-xs lg:text-sm underline hover:cursor-pointer hover:text-secondary '
      onMouseUp={handleClick}
    >
      {label}
    </p>
  );
}