import axios from 'axios';
import { provide, reactive, getCurrentInstance, inject, ref } from 'vue';
import qs from 'qs';

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line prefer-destructuring
const isCancel = axios.isCancel;

const USE_API_CLIENT = 'USE_API_CLIENT';
const useApiProvider = (params, id = '') => {
    provide(USE_API_CLIENT + id, reactive(params));
};
const useApiClient = (id = '') => {
    const vm = getCurrentInstance()?.proxy;
    if (!vm) {
        throw new Error('vue-query hooks can only be used inside setup() function.');
    }
    const apiClient = inject(USE_API_CLIENT + id);
    if (!apiClient) {
        throw new Error(`No apiClient ${USE_API_CLIENT + id} found in Vue context, use 'useApiProvider' to set one in the root component.`);
    }
    return apiClient;
};

const getArrayBufferError = (error) => {
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
function useApi(method, setupConfig, id = '') {
    const { extraPostData, onError, getError, requestConfig: globalConfig, } = useApiClient(id);
    const { onCancelCallback, ...axiosSetupConfig } = setupConfig ?? {};
    const cancelToken = axios.CancelToken.source();
    if (onCancelCallback) {
        onCancelCallback(() => cancelToken.cancel());
    }
    async function api(url, params, config) {
        const axiosConfig = {
            cancelToken: cancelToken.token,
            paramsSerializer: {
                encode: (method === 'get')
                    ? (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat' })
                    : undefined,
            },
            ...globalConfig,
            ...axiosSetupConfig,
            ...config,
            url,
            method,
            params: (method === 'get') ? params : undefined,
            data: params,
        };
        if (extraPostData) {
            const newParams = {
                ...axiosConfig.data,
                ...extraPostData(axiosConfig),
            };
            axiosConfig.data = newParams;
        }
        try {
            return await axios.request(axiosConfig);
        }
        catch (error) {
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
const useGet = (config, id = '') => useApi('get', config, id);
const usePost = (config, id = '') => useApi('post', config, id);
const usePut = (config, id = '') => useApi('put', config, id);
const useDelete = (config, id = '') => useApi('delete', config, id);

const useApiRef = (method, config, id = '') => {
    const error = ref();
    const loading = ref(false);
    const data = ref();
    const sendRequest = useApi(method, config, id);
    async function send(url, params, axiosConfig) {
        loading.value = true;
        error.value = undefined;
        try {
            const response = await sendRequest(url, params, axiosConfig);
            data.value = response;
            loading.value = false;
            return response;
        }
        catch (exception) {
            error.value = exception;
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
const useGetRef = (config, id = '') => useApiRef('get', config, id);
const usePostRef = (config, id = '') => useApiRef('post', config, id);
const usePutRef = (config, id = '') => useApiRef('put', config, id);
const useDeleteRef = (config, id = '') => useApiRef('delete', config, id);

export { getArrayBufferError, isCancel, useApiClient, useApiProvider, useDelete, useDeleteRef, useGet, useGetRef, usePost, usePostRef, usePut, usePutRef };
//# sourceMappingURL=index.js.map
