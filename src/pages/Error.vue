<template>
  <button id="btn-get-error" @click="() => send('error')">
    Get Errors
  </button>
  <div v-if="loading">
    loading...
  </div>
  <div v-if="error">
    {{ error.message }}
  </div>
</template>

<script setup lang="ts">
import { useGetRef } from '../useApiClient/useApiRef';
import ErrorResponse from '../interfaces/ErrorResponse';
import PostPros from '../interfaces/post';

const { error, loading, send } = useGetRef<PostPros, unknown, ErrorResponse>();
</script>
