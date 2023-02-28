import { onUnmounted } from 'vue';

interface KeyValue {
  [key:string]: string | number | undefined;
}

// export type RequestInitNew = Omit<>

export type requestConfigType = Omit<
RequestInit,
  'url' |
  'method' |
  'signal' |
  'body'
>

export interface ApiClientConfig {
  getExtraBody?: (options: RequestInit) => RequestInit['body'];
  onError?: (error: unknown, options: RequestInit) => void;
  getError?: (error: unknown, options: RequestInit) => unknown;
  requestConfig?: requestConfigType;
}