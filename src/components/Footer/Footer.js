import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center bg-black absolute bottom-0 right-0 left-0">
      <p className="mx-auto text-lg text-center text-white px-4 py-3 ">
        The users of this site have planted %% trees, offsetting over %% tons of
        carbon!
      </p>
    </footer>
  );
};

export default Footer;
