import HeartIcon from 'assets/img/heart.svg?component-solid';

export const Footer = () => {
  return (
    <footer class='mx-auto w-full max-w-prose pb-6 pl-6 pr-6 text-center text-gray-400'>
      <div class='flex flex-col items-center text sm text-gray-400'>
        <a
          class='text-gray-400 text-sm hover:cursor-pointer hover:underline'
          href='/disclaimer'
        >
          Disclaimer
        </a>
        <a
          target='_blank'
          class='flex items-center text-sm hover:underline'
          href='https://multiversx.com/'
        >
          Made with
          <HeartIcon class='mx-1 fill-gray-400' />
          by the MultiversX team
        </a>
      </div>
    </footer>
  );
};
