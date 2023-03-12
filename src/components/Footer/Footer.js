import React, { useState } from "react";

const Footer = () => {
  return (
    <footer class="flex flex-col justify-center bg-black mt-5">
      <p className="mx-auto text-lg text-center text-white px-4 py-3 ">
        The users of this site have planted %% trees, offsetting over %% tons of
        carbon!
      </p>
    </footer>
  );
};

export default Footer;
