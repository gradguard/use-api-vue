# use-api-vue

Typescript class to work with AJAX requests. In order to use do the folowing steps:

## 1. Configure Provider

Add `useApiProvider` to the main component. And configure the global variables:
- extraPostData: To add extra data in each `POST` request.
- onError: To execute a function in each exception.
- getError: Convert exceptions to your custom exception format.
- requestConfig: [AxiosRequestConfig](https://github.com/axios/axios/blob/master/index.d.ts#L76)


## 2. Use hooks like
```typescript
  const { data, error, loading, send } = useGetRef<PostProps[], ErrorFormat>({ onCancelCallback: onUnmounted });
  send<PostsParams>('/posts', { category: [1,2,3] }); // It will send a request to the server
  return {
    data,
    error,
    loading,
    send,
  };
```

## Using with Vue Query

This package can be used with [vue-query](https://github.com/DamianOsipiuk/vue-query).
```typescript
  const result = useQuery<AxiosResponse<PostProps[]>, ErrorFormat>(
    'posts',
    () => get<PostProps[]>('/posts');
  );
```