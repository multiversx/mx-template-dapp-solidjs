import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';
import { Component } from 'solid-js';

export const Loader: Component = () => {
  return (
    <div class='flex justify-center items-center h-screen'>
      <Fa icon={faSpinner} spin class='text-4xl text-blue-500' />
    </div>
  );
};
