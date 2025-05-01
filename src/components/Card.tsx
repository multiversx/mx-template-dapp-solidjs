import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';
import { IPropsWithChildren, IPropsWithClass } from 'types';

interface CardType extends IPropsWithChildren, IPropsWithClass {
  title: string;
  description?: string;
  reference: string;
  anchor?: string;
}

export const Card = (props: CardType) => {
  const { title, children, description, reference, anchor } = props;

  return (
    <div
      class='flex flex-col flex-1 rounded-xl bg-white p-6 justify-center'
      data-testid={props['data-testid']}
      id={anchor}
    >
      <h2 class='flex text-xl font-medium group'>
        {title}
        <a
          href={reference}
          target='_blank'
          class='hidden group-hover:block ml-2 text-blue-600'
        >
          <Fa icon={faInfoCircle} size='sm' />
        </a>
      </h2>
      {description && <p class='text-gray-400 mb-6'>{description}</p>}
      {children}
    </div>
  );
};
