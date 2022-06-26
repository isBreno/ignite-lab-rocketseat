import { Hamburger, List, X } from "phosphor-react";
import React, { useContext, useState } from "react";
import { Logo } from "./Logo";

export default function Header() {
  const [isActive, setisActive] = useState(false);
  return (
    <header className="w-full py-5 flex items-center justify-between px-4 lg:justify-center bg-gray-700 border-b border-gray-600">
      <Logo />
      <div className="flex gap-2 items-center text-xl lg:hidden">
        Aulas
        {isActive ? (
          <X size={36} onClick={() => setisActive(!isActive)} />
        ) : (
          <List size={36} onClick={() => setisActive(!isActive)} />
        )}
      </div>
    </header>
  );
}
