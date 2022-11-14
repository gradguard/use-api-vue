import { AxiosRequestConfig, Method } from 'axios';
import { ref } from 'vue';

import { ApiResponse, ConfigOptions } from './interfaces';
import useApi from './useApi';

const useApiRef = <Data = unknown, Error = unknown>(
  method: Method, config?: ConfigOptions, id = '',
) => {
  const error = ref<Error>();
  const loading = ref<boolean>(false);
  const data = ref<ApiResponse<Data>>();
  const sendRequest = useApi(method, config, id);
  async function send<Params = unknown>(
    url: string, params?: Params, axiosConfig?: AxiosRequestConfig,
  ): Promise<ApiResponse<Data> | Error> {
    loading.value = true;
    error.value = undefined;
    try {
      const response = await sendRequest<Data>(url, params, axiosConfig);
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

export const useGetRef = <Data = unknown, Error = unknown>(
  config?: ConfigOptions, id = '',
) => useApiRef<Data, Error>('get', config, id);

export const usePostRef = <Data = unknown, Error = unknown>(
  config?: ConfigOptions, id = '',
) => useApiRef<Data, Error>('post', config, id);

export const usePutRef = <Data = unknown, Error = unknown>(
  config?: ConfigOptions, id = '',
) => useApiRef<Data, Error>('put', config, id);

export const useDeleteRef = <Data = unknown, Error = unknown>(
  config?: ConfigOptions, id = '',
) => useApiRef<Data, Error>('delete', config, id);
