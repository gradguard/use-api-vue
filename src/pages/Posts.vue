<template>
  <button id="btn-get-posts" @click="() => send('/posts.json')">
    Get Posts
  </button>
  <div v-if="loading">
    loading...
  </div>
  <div v-if="posts?.data">
    <h1>Posts</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in posts.data"
          :key="post.id"
        >
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';

import { useGetRef } from '../useApiClient/useApiRef';
import PostPros from '../interfaces/post';

export default defineComponent({
  setup() {
    const { data: posts, loading, send } = useGetRef<PostPros[]>({
      onCancelCallback: onUnmounted,
    });
    return {
      posts,
      loading,
      send,
    };
  },
});
</script>
