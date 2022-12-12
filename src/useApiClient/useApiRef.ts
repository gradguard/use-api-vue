import { AxiosRequestConfig, Method } from 'axios';
import { onUnmounted, ref } from 'vue';

import { ApiResponse, ConfigOptions } from './interfaces';
import useApi from './useApi';

const getDefaultConfig = (config?: ConfigOptions) => {
  if (!config) {
    return { onCancelCallback: onUnmounted };
  }
  if  (!config.onCancelCallback) {
    return { ...config, onCancelCallback: onUnmounted };
  }
  return config;
}

const useApiRef = <Data = unknown, Params = unknown, Error = unknown>(
  method: Method, config?: ConfigOptions, id = '',
) => {
  const error = ref<Error>();
  const loading = ref<boolean>(false);
  const data = ref<ApiResponse<Data, Params>>();
  const sendRequest = useApi(method, getDefaultConfig(config), id);

  async function send(
    url: string, params?: Params, axiosConfig?: AxiosRequestConfig,
  ): Promise<ApiResponse<Data, Params> | Error> {
    loading.value = true;
    error.value = undefined;
    try {
      const response = await sendRequest<Data, Params>(url, params, axiosConfig);
      data.value = response;
      loading.value = false;
      return response;
    } catch (exception) {
      error.value = exception as Error;
      loading.value = false;
      return error.value;
    }
  }

  return {
    data,
    error,
    loading,
    send,
  };
};

export const useGetRef = <Data = unknown, Params = unknown, Error = unknown>(
  config?: ConfigOptions, id = '',
) => useApiRef<Data, Params, Error>('get', config, id);

export const usePostRef = <Data = unknown, Params = unknown, Error = unknown>(
  config?: ConfigOptions, id = '',
) => useApiRef<Data, Params, Error>('post', config, id);

export const usePutRef = <Data = unknown, Params = unknown, Error = unknown>(
  config?: ConfigOptions, id = '',
) => useApiRef<Data, Params, Error>('put', config, id);

export const useDeleteRef = <Data = unknown, Params = unknown, Error = unknown>(
  config?: ConfigOptions, id = '',
) => useApiRef<Data, Params, Error>('delete', config, id);
