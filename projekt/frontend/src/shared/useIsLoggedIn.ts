import { useProfileDataQuery } from 'shared/useProfileDataQuery';

export const useIsLoggedIn = () => {
  const { data: profileData, isLoading: isProfileDataLoading } = useProfileDataQuery();

  return {
    isLoggedIn: !!profileData,
    isLoading: isProfileDataLoading,
  };
};
