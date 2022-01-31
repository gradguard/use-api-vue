import { AxiosRequestConfig } from 'axios';
import { onUnmounted } from 'vue';

export interface ConfigOptions extends AxiosRequestConfig {
    onCancelCallback: typeof onUnmounted;
  }

  interface KeyValue {
    [key:string]: string | number | undefined;
  }

  type requestConfigType = Omit<
    AxiosRequestConfig,
    'url' |
    'method' |
    'cancelToken' |
    'params' |
    'data' |
    'paramsSerializer'
  >

export interface ApiClientConfig {
    extraPostData?: (options: AxiosRequestConfig) => KeyValue;
    onError?: (error: unknown, options: AxiosRequestConfig) => void;
    getError?: (error: unknown, options: AxiosRequestConfig) => unknown;
    requestConfig?: requestConfigType;
  }
