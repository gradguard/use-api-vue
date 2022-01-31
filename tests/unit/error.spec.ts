import { shallowMount } from '@vue/test-utils';

import Error from '@/pages/Error.vue';
import apiConfig from '@/interfaces/apiConfig';

const message = 'This is an expected error';
jest.mock('axios', () => Object.assign(
  jest.fn(),
  {
    // eslint-disable-next-line prefer-promise-reject-errors
    request: () => Promise.reject({ message }),
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
  it('Error => Get error', async () => {
    const wrapper = shallowMount(Error, options);
    const btn = wrapper.find('#btn-get-error');
    await btn.trigger('click');
    expect(wrapper.text()).toMatch(message);
  });
});
