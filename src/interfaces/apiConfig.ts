import axios from 'axios';

import ErrorResponse from './ErrorResponse';
import { ApiClientConfig } from '@/useApiClient/interfaces';
import { getArrayBufferError } from '@/useApiClient';

const apiConfig: ApiClientConfig = {
  requestConfig: {
    withCredentials: false,
    baseURL: '/api/',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getError: (e: any, options) => {
    const error = (!axios.isCancel(e) && options.responseType === 'arraybuffer')
      ? getArrayBufferError(e)
      : e;
    if (error?.response?.data?.message) {
      return new ErrorResponse(
          error?.response?.data?.message,
          'error',
      );
    }
    return error;
  },
};

export default apiConfig;
