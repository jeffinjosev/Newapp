import axios, {AxiosRequestConfig} from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {API_BASE, LOG} from '@helpers/Global';
import {GetToken, StoreToken} from '@helpers/handleToken';
import ToastHelper from '@helpers/ToastHelper';
import {ApiHeaderType} from '@src/types';
import {ShowErrorMessages} from '@helpers/Utils';

/**
 * Function to make an API call
 *
 * @param {string} route - The API endpoint.
 * @param {string} method - The HTTP method for the request (e.g., 'get', 'post').
 * @param {Object} data - The data to be sent in the request body for methods like 'POST'.
 * @param {Object} tokenNeeded - Whether the API call needs token or not default value is TRUE'.
 * @returns {Promise} - A Promise that resolves with the API response or rejects with an error.
 */
export async function apiCall(
  method: string,
  route: string,
  params: Object,
  tokenNeeded: boolean = true,
) {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    ToastHelper.error(
      'No network connection. Please check your connection and try again',
    );
    return null;
  }

  try {
    let header: ApiHeaderType = {
      'Content-Type': 'application/json',
    };
    let AuthToken;

    if (tokenNeeded === true) {
      AuthToken = await GetToken();
      header.Authorization = 'Bearer ' + AuthToken;
    }
    let data: any = {};
    let apiParams: any = {};
    if (method !== 'get' && method !== 'delete') {
      data = params;
    } else if (method === 'get' || method === 'delete') {
      apiParams = params;
    }
    if (method === 'put') {
      data = 'data' in params ? params.data : params;
      apiParams = 'params' in params ? params.params : {};
    }
    LOG('API Request', data, apiParams);
    const config: AxiosRequestConfig = {
      method: method,
      url: API_BASE + route,
      data: Object.keys(data).length ? data : undefined,
      params: Object.keys(apiParams).length ? apiParams : undefined,
      headers: header,
      maxBodyLength: Infinity,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      paramsSerializer: params => {
        const newParams = [];
        for (let k in params) {
          if (Array.isArray(params[k]) || typeof params[k] === 'object') {
            newParams.push(`${k}=${JSON.stringify(params[k])}`);
          } else {
            newParams.push(`${k}=${encodeURIComponent(params[k])}`);
          }
        }
        return newParams.join('&');
      },
    };
    LOG('API Request config', config);
    const response = await axios(config);
    LOG('API Reponse', response);
    StoreToken(response);
    return response?.data;
  } catch (err) {
    //@ts-ignore
    const errorResponse = err?.response;
    //
    LOG('API Error Reponse', JSON.stringify(errorResponse));
    LOG('error for api call', route);
    if (errorResponse) {
      if (
        !(
          errorResponse.config.url === API_BASE + 'auth/local' &&
          errorResponse.status === 403
        ) &&
        errorResponse.status !== 403 &&
        ///removed unathorised while calling user/me
        //for handle opening of deleted account
        !(
          errorResponse.status === 401 &&
          errorResponse.config.url === API_BASE + 'user/me'
        )
      ) {
        if (errorResponse?.data?.message) {
          if (Array.isArray(errorResponse?.data?.message)) {
            ShowErrorMessages(errorResponse?.data?.message);
            // errorResponse?.data?.error && ToastHelper.error(errorResponse?.data?.error);
          } else {
            (errorResponse?.data?.message != 'Listener not found !' ||
              errorResponse?.data?.message != 'Unauthorized') &&
              ToastHelper.error(String(errorResponse?.data?.message));
          }
        } else {
          ToastHelper.error(JSON.stringify(errorResponse.data));
        }
      }
      let response: {error: any} = {error: ''};
      if (!('error' in errorResponse?.data)) {
        response = {
          ...errorResponse?.data,
          error: 'Api Failed',
          status: errorResponse.status,
        };
      } else {
        response = {...errorResponse?.data, status: errorResponse.status};
      }
      return response;
    } else {
      return err;
    }
  }
}

/**
 * Function to make an API call for Assets upload
 *
 * @param {string} route - The API endpoint.
 * @param {string} method - The HTTP method for the request (e.g., 'get', 'post').
 * @param {Object} data - The data in formData to be sent in the request body for methods like 'POST'.
 * @param {Object} tokenNeeded - Whether the API call needs token or not default value is TRUE'.
 * @returns {Promise} - A Promise that resolves with the API response or rejects with an error.
 */
export async function assetApiCall(
  method: string,
  route: string,
  params: Object,
  tokenNeeded: boolean = true,
) {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    ToastHelper.error(
      'No network connection. Please check your connection and try again',
    );
    return null;
  }
  try {
    let header: ApiHeaderType = {
      'Content-Type': 'multipart/form-data',
    };
    let AuthToken;

    if (tokenNeeded === true) {
      AuthToken = await GetToken();
      header.Authorization = 'Bearer ' + AuthToken;
    }
    let data: any = {};
    let apiParams: any = {};
    if (method !== 'get' && method !== 'delete') {
      data = params;
    } else if (method === 'get' || method === 'delete') {
      apiParams = params;
    }
    if (method === 'put') {
      data = 'data' in params ? params.data : params;
      apiParams = 'params' in params ? params.params : {};
    }
    //
    const config: AxiosRequestConfig = {
      method: method,
      url: API_BASE + route,
      data: Object.keys(data).length ? data : undefined,
      params: Object.keys(apiParams).length ? apiParams : undefined,
      headers: header,
      timeout: 15000,
      maxContentLength: 10000000,
      maxBodyLength: Infinity,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      paramsSerializer: params => {
        const newParams = [];
        for (let k in params) {
          if (Array.isArray(params[k]) || typeof params[k] === 'object') {
            newParams.push(`${k}=${JSON.stringify(params[k])}`);
          } else {
            newParams.push(`${k}=${encodeURIComponent(params[k])}`);
          }
        }
        return newParams.join('&');
      },
    };
    //
    //  console.log('API Request config', JSON.stringify(config));
    const response = await axios(config);
    //
    //  console.log('API Reponse', response);
    StoreToken(response);
    return response?.data;
  } catch (err) {
    //@ts-ignore
    const errorResponse = err?.response;
    //
    //  console.log('API Error Reponse', JSON.stringify(errorResponse));
    if (errorResponse) {
      if (
        !(
          errorResponse.config.url === API_BASE + 'auth/local' &&
          errorResponse.status === 403
        ) &&
        errorResponse.status !== 403
      ) {
        if (errorResponse?.data?.message) {
          if (Array.isArray(errorResponse?.data?.message)) {
            console.warn('isarray');
            // errorResponse?.data?.error && ToastHelper.error(errorResponse?.data?.error);
            ShowErrorMessages(errorResponse?.data?.message);
          } else {
            ToastHelper.error(String(errorResponse?.data?.message));
          }
        } else {
          ToastHelper.error(JSON.stringify(errorResponse.data));
        }
        //
      }
      let response: {error: any} = {error: ''};
      if (!('error' in errorResponse?.data)) {
        response = {
          ...errorResponse?.data,
          error: 'Api Failed',
          status: errorResponse.status,
        };
      } else {
        response = {...errorResponse?.data, status: errorResponse.status};
      }
      return response;
    } else {
      return err;
    }
  }
}
