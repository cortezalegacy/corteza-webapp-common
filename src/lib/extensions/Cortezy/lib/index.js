import EventEmitter from 'events'

let crt = 0

// ~Singleton for module-wide use
export const bus = new EventEmitter()

export function genID () {
  return `${crt++}`
}
