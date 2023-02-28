import { onUnmounted } from 'vue';
import { requestConfigType } from './interfaces';
import { useApiClient } from './useApiClient';

export const getArrayBufferError = <Data=any, DataConfig=any>(
  error: AxiosError<Data, DataConfig>,
): AxiosError<Data, DataConfig> => {
  if (!error?.response?.data) {
    throw new Error('Server response null');
  }
  const data = new Uint8Array();
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

type ApiRequestInitProps = Omit<RequestInit, 'body' | 'method'> & {
  onCancelCallback?: typeof onUnmounted;
};

export default function useApi(method: string, setupConfig?: ApiRequestInitProps, id = '') {
  const {
    getExtraBody,
    onError,
    getError,
    requestConfig: globalConfig,
  } = useApiClient(id);

  const { onCancelCallback, ...requestInitConfig } = setupConfig ?? {};
  const controller = new AbortController();
  if (onCancelCallback) {
    onCancelCallback(() => controller.abort());
  }
  async function api<Data = unknown, Params = unknown>(
    url: string, params?: Params, config?: ApiRequestInitProps,
  ) {
    const URL = params ? url  + '?' + new URLSearchParams(params) : url;
    const requestInit: RequestInit = {
      signal: controller.signal as RequestInit['signal'],
      ...globalConfig,
      ...requestInitConfig,
      ...config,
      method,
    };
    const body = params ? JSON.stringify(params) : null;

    if (getExtraBody) {
      const extraBody = getExtraBody(requestInit);
      if (typeof requestInit.body === 'object' && typeof extraBody === 'object') {
        const newParams = {
          ...requestInit.body,
          ...extraBody,
        };
        requestInit.body = JSON.stringify(newParams);
      }
    } else {
      requestInit.body = JSON.stringify(requestInit.body);
    }

    try {
      return await fetch(URL, requestInit);
    } catch (error) {
      if (onError) {
        onError(error, requestInit);
      }
      if (getError) {
        throw getError(error, requestInit);
      }
      throw error;
    }
  }

  return api;
}

export const useGet = (config?: ApiRequestInitProps, id = '') => useApi('get', config, id);

export const usePost = (config?: ApiRequestInitProps, id = '') => useApi('post', config, id);

export const usePut = (config?: ApiRequestInitProps, id = '') => useApi('put', config, id);

export const useDelete = (config?: ApiRequestInitProps, id = '') => useApi('delete', config, id);
