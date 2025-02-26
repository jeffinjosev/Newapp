import moment from 'moment';
import StorageHelper from '@helpers/StorageHelper';
import axios from 'axios';
import {API_BASE} from '@helpers/Global';

/**
 * Function to Refresh the expired token
 *
 */
const getNewAuthToken = async () => {
  try {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    const params = {
      //@ts-ignore
      token: JSON.parse(await StorageHelper.getSecureData('@token')),
      //@ts-ignore
      refresh_token: JSON.parse(
        await StorageHelper.getSecureData('@refresh_token'),
      ),
    };
    const config = {
      method: 'POST',
      url: `${API_BASE}auth/token`,
      data: params,
      headers: header,
    };
    //    console.log('refresh token config', config);
    //@ts-ignore
    const response = await axios(config);
    // StorageHelper.storeSecureData('@token', response?.data?.data?.token);
    // StorageHelper.storeSecureData('@token_expiry', response?.data?.data?.token_expiry);
    StoreToken(response);
    //   console.log('refresh token response', response);
    return response?.data?.data?.token;
  } catch (err) {
    //
  }
};
/**
 * Function to get the saved token
 *

 */
export const GetToken = async () => {
  //@ts-ignore
  const token_expiry = JSON.parse(
    await StorageHelper.getSecureData('@token_expiry'),
  );
  const hourDifference = moment(token_expiry).diff(moment(), 'hours');
  //  console.log('hourDifference', hourDifference);
  if (hourDifference == null || hourDifference <= 1) {
    let token = await getNewAuthToken();
    //  console.log('getNewAuthToken res', token);
    return token;
  } else {
    //@ts-ignore
    let token = JSON.parse(await StorageHelper.getSecureData('@token'));
    return token;
  }
};
/**
 * Function to save the token locally if the response have token
 * @param {string} response - The response from the API Call.
 *
 */
export const StoreToken = async (response: any) => {
  if (response?.data?.data && 'token' in response?.data?.data) {
    StorageHelper.storeSecureData('@token', response?.data?.data?.token);
    StorageHelper.storeSecureData(
      '@token_expiry',
      response?.data?.data?.token_expiry,
    );
    if ('refresh_token' in response?.data?.data) {
      StorageHelper.storeSecureData(
        '@refresh_token',
        response?.data?.data?.refresh_token,
      );
    }
  }
};
