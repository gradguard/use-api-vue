import {
  inject, provide, reactive, getCurrentInstance,
} from 'vue';

import { ApiClientConfig } from './interfaces';

const USE_API_CLIENT = 'USE_API_CLIENT';

export const useApiProvider = (
  params: ApiClientConfig,
  id = '',
): void => {
  provide(USE_API_CLIENT + id, reactive(params));
};

export const useApiClient = (id = '') => {
  const vm = getCurrentInstance()?.proxy;

  if (!vm) {
    throw new Error(
      'vue-query hooks can only be used inside setup() function.',
    );
  }
  const apiClient = inject<ApiClientConfig>(USE_API_CLIENT + id);
  if (!apiClient) {
    throw new Error(
      `No apiClient ${USE_API_CLIENT + id} found in Vue context, use 'useApiProvider' to set one in the root component.`,
    );
  }

  return apiClient;
};
