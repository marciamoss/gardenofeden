import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const { totalTrees } = useSelector((state) => state.userData);

  return (
    <footer className="pb-1 bg-black absolute inset-x-0 bottom-0 h-8 overflow-scroll">
      <p className="mx-auto text-lg text-center text-white max-[280px]:text-xs">
        {totalTrees
          ? `The users of this site have planted ${totalTrees} trees`
          : ""}
      </p>
    </footer>
  );
};

export default Footer;
