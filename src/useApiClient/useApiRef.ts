import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { ref } from 'vue';

import { ConfigOptions } from './interfaces';
import useApi from './useApi';

const useApiRef = <Data = unknown, Error = unknown>(method: Method, config: ConfigOptions) => {
  const error = ref<Error>();
  const loading = ref<boolean>(false);
  const data = ref<AxiosResponse<Data>>();
  const sendRequest = useApi(method, config);
  async function send<Params = unknown>(
    url: string, params?: Params, axiosConfig?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Data> | Error> {
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

export const useGetRef = <Data = unknown, Error = unknown>(config: ConfigOptions) => useApiRef<Data, Error>('get', config);

export const usePostRef = <Data = unknown, Error = unknown>(config: ConfigOptions) => useApiRef<Data, Error>('post', config);

export const usePutRef = <Data = unknown, Error = unknown>(config: ConfigOptions) => useApiRef<Data, Error>('put', config);

export const useDeleteRef = <Data = unknown, Error = unknown>(config: ConfigOptions) => useApiRef<Data, Error>('delete', config);
