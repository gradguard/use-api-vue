import * as axios from 'axios';
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import * as vue from 'vue';
import { onUnmounted } from 'vue';

declare type ApiResponse<Data = any, DataParams = any> = AxiosResponse<Data, DataParams>;
declare type ApiRequestConfig<DataParams = any> = AxiosRequestConfig<DataParams>;
interface ConfigOptions extends ApiRequestConfig {
    onCancelCallback?: typeof onUnmounted;
}
interface KeyValue {
    [key: string]: string | number | undefined;
}
declare type requestConfigType = Omit<ApiRequestConfig, 'url' | 'method' | 'cancelToken' | 'params' | 'data' | 'paramsSerializer'>;
interface ApiClientConfig {
    extraPostData?: (options: ApiRequestConfig) => KeyValue;
    onError?: (error: unknown, options: ApiRequestConfig) => void;
    getError?: (error: unknown, options: ApiRequestConfig) => unknown;
    requestConfig?: requestConfigType;
}
declare const isCancel: (value: any) => value is axios.Cancel;

declare const useApiProvider: (params: ApiClientConfig, id?: string) => void;
declare const useApiClient: (id?: string) => ApiClientConfig;

declare const getArrayBufferError: <Data = any, DataConfig = any>(error: AxiosError<Data, DataConfig>) => AxiosError<Data, DataConfig>;
declare const useGet: (config?: ConfigOptions, id?: string) => <Data = unknown, Params = unknown>(url: string, params?: Params | undefined, config?: ApiRequestConfig<Params> | undefined) => Promise<ApiResponse<Data, Params>>;
declare const usePost: (config?: ConfigOptions, id?: string) => <Data = unknown, Params = unknown>(url: string, params?: Params | undefined, config?: ApiRequestConfig<Params> | undefined) => Promise<ApiResponse<Data, Params>>;
declare const usePut: (config?: ConfigOptions, id?: string) => <Data = unknown, Params = unknown>(url: string, params?: Params | undefined, config?: ApiRequestConfig<Params> | undefined) => Promise<ApiResponse<Data, Params>>;
declare const useDelete: (config?: ConfigOptions, id?: string) => <Data = unknown, Params = unknown>(url: string, params?: Params | undefined, config?: ApiRequestConfig<Params> | undefined) => Promise<ApiResponse<Data, Params>>;

declare const useGetRef: <Data = unknown, Error_1 = unknown>(config?: ConfigOptions, id?: string) => {
    data: vue.Ref<ApiResponse<Data, any> | undefined>;
    error: vue.Ref<Error_1 | undefined>;
    loading: vue.Ref<boolean>;
    send: <Params = unknown>(url: string, params?: Params | undefined, axiosConfig?: AxiosRequestConfig) => Promise<Error_1 | ApiResponse<Data, any>>;
};
declare const usePostRef: <Data = unknown, Error_1 = unknown>(config?: ConfigOptions, id?: string) => {
    data: vue.Ref<ApiResponse<Data, any> | undefined>;
    error: vue.Ref<Error_1 | undefined>;
    loading: vue.Ref<boolean>;
    send: <Params = unknown>(url: string, params?: Params | undefined, axiosConfig?: AxiosRequestConfig) => Promise<Error_1 | ApiResponse<Data, any>>;
};
declare const usePutRef: <Data = unknown, Error_1 = unknown>(config?: ConfigOptions, id?: string) => {
    data: vue.Ref<ApiResponse<Data, any> | undefined>;
    error: vue.Ref<Error_1 | undefined>;
    loading: vue.Ref<boolean>;
    send: <Params = unknown>(url: string, params?: Params | undefined, axiosConfig?: AxiosRequestConfig) => Promise<Error_1 | ApiResponse<Data, any>>;
};
declare const useDeleteRef: <Data = unknown, Error_1 = unknown>(config?: ConfigOptions, id?: string) => {
    data: vue.Ref<ApiResponse<Data, any> | undefined>;
    error: vue.Ref<Error_1 | undefined>;
    loading: vue.Ref<boolean>;
    send: <Params = unknown>(url: string, params?: Params | undefined, axiosConfig?: AxiosRequestConfig) => Promise<Error_1 | ApiResponse<Data, any>>;
};

export { ApiClientConfig, ApiRequestConfig, ApiResponse, ConfigOptions, getArrayBufferError, isCancel, useApiClient, useApiProvider, useDelete, useDeleteRef, useGet, useGetRef, usePost, usePostRef, usePut, usePutRef };
