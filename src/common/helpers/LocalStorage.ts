import StorageHelper from '@helpers/StorageHelper';

export const ClearAllStoredValues = async () => {
  await StorageHelper.deleteSecureItem('@user');
  await StorageHelper.deleteSecureItem('@token');
  await StorageHelper.deleteSecureItem('@refresh_token');
};

export const getUserDetails = async () => {
  const userData = await StorageHelper.getSecureData('@user');
  const userDataObj = userData != null ? JSON.parse(userData) : null;
  return userDataObj;
};
export const storeUser = (user: any) => {
  StorageHelper.storeSecureData('@user', user);
  return true;
};
export const GetStoredLogin = async () => {
  const RemeberDetailsAvailable = await StorageHelper.getSecureData(
    '@remeberVal',
  );
  const remeberDataObj =
    RemeberDetailsAvailable != null
      ? JSON.parse(RemeberDetailsAvailable)
      : null;
  return remeberDataObj;
};
export const SetRemeberMe = async (remberVal: any) => {
  await StorageHelper.storeSecureData('@remeberVal', remberVal);
  return true;
};
export const RemoveRemebered = async () => {
  await StorageHelper.deleteSecureItem('@remeberVal');
  return true;
};
