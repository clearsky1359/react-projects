import {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [data, setData]=useState('initial value')

  useEffect(()=>{
    fetch('https://8080-clearsky135-reactprojec-pn9cq9isfm9.ws-us88.gitpod.io/test').then(res=>res.json()).then(data=> console.log(data))

  },[])

  return (
    <>
      <h1>{data}</h1>
    </>
  );
}

export default App;
