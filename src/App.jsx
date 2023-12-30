import { useLocalStore } from './globalStore.js'

const Increment = () => {
  const { increment } = useLocalStore()

  return <button onClick={increment}>Increment</button>
}

const Decrement = () => {
  const { decrement } = useLocalStore()

  return <button onClick={decrement}>Decrement</button>
}

const Count = () => {
  const { count } = useLocalStore()

  return <h1>{count}</h1>
}

const App = () => {
  return (
    <>
      <Count />
      <Increment />
      <Decrement />
    </>
  )
}

export default App
