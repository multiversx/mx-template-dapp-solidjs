import { faBell } from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';
import { Button } from 'components';
import { NotificationsFeedManager } from 'lib';

export const NotificationsButton = () => {
  const handleOpenNotificationsFeed = () => {
    NotificationsFeedManager.getInstance().openNotificationsFeed();
  };

  return (
    <Button
      onClick={handleOpenNotificationsFeed}
      class='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
    >
      <Fa icon={faBell} size='sm' />
    </Button>
  );
};
