import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import qs from 'qs';

import { ConfigOptions } from './interfaces';
import { useApiClient } from './useApiClient';

export const getArrayBufferError = <T=unknown, D=unknown>(error: AxiosError): AxiosError<T, D> => {
  if (!error?.response?.data) {
    throw new Error('Server response null');
  }
  const data = new Uint8Array(error.response.data);
  const decodedString = new TextDecoder().decode(data);
  const response = JSON.parse(decodedString);
  return {
    ...error,
    response: {
      ...error.response,
      data: response,
    },
  };
};

export default function useApi(method: Method, setupConfig?: ConfigOptions) {
  const {
    extraPostData,
    onError,
    getError,
    requestConfig: globalConfig,
  } = useApiClient();
  const { onCancelCallback, ...axiosSetupConfig } = setupConfig ?? {};
  const cancelToken = axios.CancelToken.source();
  if (onCancelCallback) {
    onCancelCallback(() => cancelToken.cancel());
  }
  async function api<Data = unknown, Params = unknown>(
    url: string, params?: Params, config?: AxiosRequestConfig<Params>,
  ) {
    const axiosConfig: AxiosRequestConfig<Params> = {
      cancelToken: cancelToken.token,
      paramsSerializer: (method === 'get') ? (parameters) => qs.stringify(parameters) : undefined,
      ...globalConfig,
      ...axiosSetupConfig,
      ...config,
      url,
      method,
      params: (method === 'get') ? params : undefined,
      data: params,
    };

    if (extraPostData) {
      axiosConfig.data = {
        ...axiosConfig.data,
        ...extraPostData(axiosConfig),
      };
    }

    try {
      return await axios.request<Data, AxiosResponse<Data, Params>, Params>(axiosConfig);
    } catch (error) {
      if (onError) {
        onError(error, axiosConfig);
      }
      if (getError) {
        throw getError(error, axiosConfig);
      }
      throw error;
    }
  }

  return api;
}

export const useGet = (config?: ConfigOptions) => useApi('get', config);

export const usePost = (config?: ConfigOptions) => useApi('post', config);

export const usePut = (config?: ConfigOptions) => useApi('put', config);

export const useDelete = (config?: ConfigOptions) => useApi('delete', config);
