import { Component } from "solid-js";
import Fa from "solid-fa";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Loader: Component = () => {
  return (
    <div class="flex justify-center items-center h-screen">
      <Fa icon={faSpinner} spin class="text-4xl text-blue-500" />
    </div>
  );
};
