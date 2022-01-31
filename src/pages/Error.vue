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

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';

import { useGetRef } from '@/useApiClient/useApiRef';
import ErrorResponse from '@/interfaces/ErrorResponse';
import PostPros from '@/server_js/post';

export default defineComponent({
  setup() {
    const { error, loading, send } = useGetRef<PostPros, ErrorResponse>({
      onCancelCallback: onUnmounted,
    });
    return {
      loading,
      error,
      send,
    };
  },
});
</script>
