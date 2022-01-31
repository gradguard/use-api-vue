<template>
  <div class="menu">
    <router-link to="/">
      Posts
    </router-link>
    |
    <router-link to="/error">
      Error
    </router-link>
  </div>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { useApiProvider } from './useApiClient/useApiClient';
import apiConfig from './interfaces/apiConfig';

export default defineComponent({
  name: 'App',
  setup() {
    useApiProvider(apiConfig);
  },
});
</script>

<style scoped>
.menu {
  margin-bottom: 20px;
}
</style>
