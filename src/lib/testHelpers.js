import { shallowMount } from '@vue/test-utils'

const writeableWindowLocation = ({ path: value = '/' } = {}) => Object.defineProperty(window, 'location', { writable: true, value })

const mount = (component, params = {}) => shallowMount(component, { ...params })

export { writeableWindowLocation, mount }
