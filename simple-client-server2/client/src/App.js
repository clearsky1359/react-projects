import './App.css';

import{useState, useEffect} from 'react';

function App() {

  const [data, setData]=useState('');
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');

  useEffect(()=>{
    fetch('https://8080-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/getAllTests')
    .then((res)=>res.json())
    .then(d=>setData(d))

  },[])

const handleSubmit=(e)=>{
  e.preventDefault()
  fetch('https://8080-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/getAllTests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name,
    email
  
  })
})
.then(res => res.json())
    .then(newData => {
      setData(prevData => [...prevData, newData]);
      setName('');
      setEmail('');
    })
    .catch(error => console.error(error));

}



  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input id='name' value={name} onChange={e=>(setName(e.target.value))}/>
        <br/>
        <label htmlFor='email'>Email</label>
        <input id='email' value={email} onChange={e=>(setEmail(e.target.value))}/>
        <button>Submit</button>
        <hr/><hr/>
      </form>

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
