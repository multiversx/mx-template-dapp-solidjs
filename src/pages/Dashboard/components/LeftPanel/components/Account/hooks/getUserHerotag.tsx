import axios from 'axios';

import { createEffect, createSignal } from 'solid-js';
import { ID_API_URL, USERS_API_URL } from 'config/config.mainnet';

export const getUserHerotag = (address: string) => {
  const [profileUrl, setProfileUrl] = createSignal('');
  const [herotag, setHerotag] = createSignal('');

  const getUserProfileData = async (userAddress?: string) => {
    if (!userAddress) {
      return;
    }

    try {
      const { data } = await axios.get(`${USERS_API_URL}${userAddress}`, {
        baseURL: ID_API_URL
      });

      return data;
    } catch (_err) {
      console.error('Unable to fetch profile url');
    }
  };

  createEffect(() => {
    if (!address) return;

    const fetchUserProfileUrl = async () => {
      const data = await getUserProfileData(address);
      setProfileUrl(data?.profile?.url);
      setHerotag(data?.herotag);
    };

    fetchUserProfileUrl();
  });

  return [herotag, profileUrl];
};
