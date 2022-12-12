/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosBase, * as axiosBaseTypes from 'axios';
import { onUnmounted } from 'vue';

export type ApiResponse<Data=any, DataParams=any> = axiosBaseTypes.AxiosResponse<Data, DataParams>;
export type ApiRequestConfig<DataParams=any> = axiosBaseTypes.AxiosRequestConfig<DataParams>;

export interface ConfigOptions extends ApiRequestConfig {
  onCancelCallback?: typeof onUnmounted;
}

interface KeyValue {
  [key:string]: string | number | undefined;
}

type requestConfigType = Omit<
ApiRequestConfig,
  'url' |
  'method' |
  'cancelToken' |
  'params' |
  'data' |
  'paramsSerializer'
>

export interface ApiClientConfig {
  extraPostData?: (options: ApiRequestConfig) => KeyValue;
  onError?: (error: unknown, options: ApiRequestConfig) => void;
  getError?: (error: unknown, options: ApiRequestConfig) => unknown;
  requestConfig?: requestConfigType;
}

export const axios  = axiosBase;
export const axiosTypes = axiosBaseTypes;
