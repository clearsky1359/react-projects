import { useState } from 'react'
import{Select} from './components/Select';

import './App.css'

const options=[
{label:'First',value:1},
{label:'Second',value:2},
{label:'Third',value:3},
{label:'Forth',value:4},
{label:'Fifth',value:5},
]

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>hi</p>
      <Select options={options}/>
    </>
  )
}

export default App
