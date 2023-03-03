import './App.css';

import{useState, useEffect} from 'react';

function App() {

  const [data, setData]=useState('');
  useEffect(()=>{
    fetch('https://8080-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/getAllTests')
    .then((res)=>res.json())
    .then(d=>setData(d))

  },[])
  return (
    <>
      {data && data.map((r,index) => (
        <div key={index}>
          <p>{r.name}</p>
          <p>{r.email}</p>
          <hr/>
        </div>
      ))}
    </>
  );
}


export default App;
