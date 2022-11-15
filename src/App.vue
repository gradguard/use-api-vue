<template>
  <div>
    <Error />
    <Posts />
  </div>
</template>

<script setup lang="ts">
import { useApiProvider } from './useApiClient/useApiClient';
import apiConfig from './interfaces/apiConfig';
import Posts from './pages/Posts.vue';
import Error from './pages/Error.vue';

useApiProvider(apiConfig);
useApiProvider(apiConfig, 'unique-id');
</script>