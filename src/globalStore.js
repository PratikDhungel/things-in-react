import { useEffect, useState } from 'react'

const createEmitters = () => {
  const subscriptions = new Map()

  return {
    emit: (value) => {
      subscriptions.forEach((sub) => sub(value))
    },
    // Use subscribe function as a part of useEffect callback
    subscribe: (emitTo) => {
      const key = Symbol()

      subscriptions.set(key, emitTo)

      return () => {
        subscriptions.delete(key)
      }
    },
  }
}

const createStore = (initializer) => {
  let store = {}

  const { emit, subscribe } = createEmitters()

  const get = () => store
  const set = (operation) => {
    store = operation(store)

    emit(store)
  }

  store = initializer(get, set)

  const useStore = () => {
    const [localStore, setLocalStore] = useState(get())

    useEffect(() => subscribe(setLocalStore), [])

    return localStore
  }

  return useStore
}

const useLocalStore = createStore((get, set) => ({
  count: 0,
  increment: () => set((store) => ({ ...store, count: ++store.count })),
  decrement: () => set((store) => ({ ...store, count: --store.count })),
}))

export { useLocalStore }
