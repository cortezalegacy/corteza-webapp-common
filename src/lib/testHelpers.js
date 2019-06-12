import { shallowMount } from '@vue/test-utils'

const writeableWindowLocation = ({ path: value = '/' } = {}) => Object.defineProperty(window, 'location', { writable: true, value })

const mount = (component, params = {}) => shallowMount(component, { ...params })

const stdStubs = ['router-view', 'router-link', 'b-form-group', 'b-form-text', 'b-button', 'b-form-input', 'b-button-close', 'b-form']

export { writeableWindowLocation, mount, stdStubs }
