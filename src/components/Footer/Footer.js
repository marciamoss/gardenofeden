import React from "react";

const Footer = () => {
  return (
    <footer className="pb-1 bg-black absolute inset-x-0 bottom-0 h-8 overflow-scroll">
      <p className="mx-auto text-lg text-center text-white max-[280px]:text-xs">
        The users of this site have planted %% trees, offsetting over %% tons of
        carbon!
      </p>
    </footer>
  );
};

export default Footer;
