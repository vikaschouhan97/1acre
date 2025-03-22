import React from "react";
import SuspenseLoader from "../contents/Loader";

const Loader = () => (
  <div className="fixed top-0 left-0 w-[100%] h-screen flex flex-col gap-8 items-center justify-center">
    <SuspenseLoader />
  </div>
);

export default Loader;
