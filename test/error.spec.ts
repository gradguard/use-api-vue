import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount } from '@vue/test-utils';
import apiConfig from '../src/interfaces/apiConfig';
import Error from '../src/pages/Error.vue';

const wait = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
const options = {
  global: {
    provide: { USE_API_CLIENT: apiConfig },
  },
};
var mock = new MockAdapter(axios);
const message = 'Get Errors Request failed with status';
mock.onGet("/posts.json").reply(500, message);
describe('Test data', () => {
  it('Posts => Get all posts', async () => {
    const wrapper = mount(Error, options);
    const btn = wrapper.find('#btn-get-error');
    await btn.trigger('click');
    await wait(1000)
    console.log(wrapper.text());
    expect(wrapper.text()).toMatch(message);
  });
});


