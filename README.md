# use-api-vue

Typescript functions to work with AJAX requests and [vue-query](https://github.com/DamianOsipiuk/vue-query).

## Install

`npm i use-api-vue`

## 1. Configure Provider

Add `useApiProvider` to the main component ([example](https://github.com/gradguard/use-api-vue/blob/main/src/App.vue) [here](https://github.com/gradguard/use-api-vue/blob/main/src/interfaces/apiConfig.ts)). And configure the global variables:
- extraPostData: To add extra data in each `POST` request.
- onError: To execute a function in each exception.
- getError: Convert exceptions to your custom exception format.
- requestConfig: [AxiosRequestConfig](https://github.com/axios/axios/blob/master/index.d.ts#L76)

## Using with Vue Query

This package can be used with [vue-query](https://github.com/DamianOsipiuk/vue-query).

```typescript
  import { usePost, ApiResponse } from 'use-api-vue';

  // add this as global provider
  useApiProvider({
    getError: (error: any) => getError(error),
  });

  // In your component
  const get = useGet();
  const result = useQuery<ApiResponse<PostProps[]>, ErrorFormat>(
    'posts',
    () => get<PostProps[]>('/posts');
  );
```

## Use hooks like

The params `data`, `error`, `loading` are reactive. `send` function is not reactive.

```typescript
  import { useGetRef } from 'use-api-vue';

  const { data, error, loading, send } = useGetRef<PostProps[], PostsParams, ErrorFormat>();
  /**
   * It will send a request to the server
   * You can use `data` variable or response if you are using it inside of a function
   */
  const response = await send('/posts', { category: [1,2,3] });
  if (response instanceof Error) {
    console.log(response.message);
  } else {
    console.log(response.data);
  }
```