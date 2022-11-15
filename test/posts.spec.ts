import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount } from '@vue/test-utils';
import apiConfig from '../src/interfaces/apiConfig';
import Posts from '../src/pages/Posts.vue';
import posts from '../public/posts.json';

const wait = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
const options = {
  global: {
    provide: { USE_API_CLIENT: apiConfig },
  },
};
var mock = new MockAdapter(axios);
mock.onGet("/posts.json").reply(200, posts);

describe('Test data', () => {
  it('Posts => Get all posts', async () => {
    const wrapper = mount(Posts, options);
    const btn = wrapper.find('#btn-get-posts');
    await btn.trigger('click');
    await wait(1000)
    console.log(wrapper.text());
    expect(wrapper.text()).toMatch('01Title');
  });
});
