export const types = Object.freeze({
  pending: 'pending',
  completed: 'completed',
  updateSet: 'updateSet',
  removeFromSet: 'removeFromSet',
  clearSet: 'clearSet',
})

const reqEndpoints = [
  'list',
  'read',
  'create',
  'update',
  'delete',
]

export const emptyGenericState = {
  pending: false,
  set: [],
}

export function genericGetters ({ primaryKey } = {}) {
  return {
    pending: (state) => state.pending,

    getByID (state) {
      return (ID) => state.set.find((opt) => ID === opt[primaryKey])
    },

    set (state) {
      return state.set
    },
  }
}

export function epMapper (epm, client = {}) {
  if (typeof epm === 'string') {
    const prefix = epm
    epm = {}

    reqEndpoints.forEach(n => {
      epm[n] = prefix + n.charAt(0).toUpperCase() + n.slice(1)
    })
  }

  for (var ep of reqEndpoints) {
    if (epm[ep] === undefined) {
      throw new Error(`incomplete mapping: missing '${ep}' endpoint`)
    }

    if (client[epm[ep]] === undefined) {
      throw new Error(`invalid client: missing '${epm[ep]}' endpoint`)
    }
  }

  return epm
}

/**
 *
 * @param client
 * @param epm
 * @param Type
 * @param primaryKey
 */
export function genericActions ({ client, epm, Type, primaryKey } = {}) {
  epm = epMapper(epm, client)

  return {
    async load ({ commit, getters }, { clear = false, force = false, ...filter } = {}) {
      if (clear) {
        commit(types.clearSet)
      }

      if (!force && getters.set.length > 1) {
        // When there's forced load, make sure we have more than 1 item in the set
        // in the scenario when user came to detail page first and has one item loaded
        // > 0 would not be sufficient.
        return new Promise((resolve) => resolve(getters.set))
      }

      commit(types.pending)
      return client[epm['list']](filter).then(({ set, filter }) => {
        if (set && set.length > 0) {
          commit(types.updateSet, set.map(t => new Type(t)))
        }

        commit(types.completed)
        return getters.set
      })
    },

    async findByID ({ commit, getters }, { force = false, ...filter } = {}) {
      if (!force) {
        const stored = getters.getByID(filter[primaryKey])
        if (stored) {
          // Make sure we do not reference one in the state
          return Promise.resolve(new Type({ ...stored }))
        }
      }

      commit(types.pending)
      return client[epm['read']]({ ...filter }).then(raw => {
        // We cast 2 times -- just to make sure we do not reference one in the state
        commit(types.updateSet, [new Type(raw)])
        commit(types.completed)
        return new Type(raw)
      })
    },

    async create ({ commit }, item) {
      commit(types.pending)
      return client[epm['create']](item).then(raw => {
        // We cast 2 times -- just to make sure we do not reference one in the state
        commit(types.updateSet, [new Type(raw)])
        commit(types.completed)
        return new Type(raw)
      })
    },

    async update ({ commit }, item) {
      commit(types.pending)
      return client[epm['update']](item).then(raw => {
        // We cast 2 times -- just to make sure we do not reference one in the state
        commit(types.updateSet, [new Type(raw)])
        commit(types.completed)
        return new Type(raw)
      })
    },

    async delete ({ commit }, item) {
      commit(types.pending)
      return client[epm['delete']](item).then(() => {
        commit(types.removeFromSet, item)
        commit(types.completed)
        return true
      })
    },

    clearSet ({ commit }) {
      commit(types.clearSet)
    },
  }
}

export function genericMutations ({ primaryKey } = {}) {
  return {
    [types.pending] (state) {
      state.pending = true
    },

    [types.completed] (state) {
      state.pending = false
    },

    [types.updateSet] (state, set) {
      if (state.set.length === 0) {
        state.set = set
        return
      }

      set.forEach(newItem => {
        const oldIndex = state.set.findIndex((i) => i[primaryKey] === newItem[primaryKey])
        if (oldIndex > -1) {
          state.set.splice(oldIndex, 1, newItem)
        } else {
          state.set.push(newItem)
        }
      })
    },

    [types.removeFromSet] (state, removedSet) {
      (removedSet || []).forEach(removedItem => {
        const i = state.set.findIndex((i) => i[primaryKey] === removedItem[primaryKey])
        if (i > -1) {
          state.set.splice(i, 1)
        }
      })
    },

    [types.clearSet] (state) {
      state.pending = false
      state.set.splice(0)
    },
  }
}
