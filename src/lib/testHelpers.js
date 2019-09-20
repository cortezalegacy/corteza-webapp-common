import Vue from 'vue'
import { createLocalVue, shallowMount as sm } from '@vue/test-utils'

Vue.config.ignoredElements = [
  'font-awesome-icon',
  // Ignore all bootstrap elements
  /^b-/,
]

export const writeableWindowLocation = ({ path: value = '/' } = {}) => Object.defineProperty(window, 'location', { writable: true, value })

export const mount = (component, params = {}) => shallowMount(component, { ...params })

export const shallowMount = (component, { mocks = {}, stubs = [], ...options } = {}) => {
  let localVue = createLocalVue()

  return sm(component, {
    localVue,
    stubs: ['router-view', 'router-link', 'confirmation-toggle', 'user-roles', 'permissions-button', ...stubs],
    mocks: {
      $t: (e) => e,
      $SystemAPI: {},
      $route: { query: { fullPath: '', token: undefined } },
      $auth: {},
      ...mocks,
    },
    ...options,
  })
}

export default shallowMount
