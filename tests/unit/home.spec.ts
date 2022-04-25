import { mount } from '@vue/test-utils';

import Home from '@/pages/Home.vue';
import apiConfig from '@/interfaces/apiConfig';
import getPosts from '@/server_js/posts';
import PostPros from '@/server_js/post';

jest.mock('axios', () => Object.assign(
  jest.fn(),
  {
    request: () => Promise.resolve<{ data: PostPros[]}>({ data: getPosts() }),
    CancelToken: { source: () => ({ token: 'test' }) },
    isCancel: () => false,
  },
));

const options = {
  global: {
    provide: { USE_API_CLIENT: apiConfig },
  },
};

describe('Test data', () => {
  it('Home => Get all posts', async () => {
    const wrapper = mount(Home, options);
    const btn = wrapper.find('#btn-get-posts');
    await btn.trigger('click');
    expect(wrapper.text()).toMatch('01Title');
  });
});
