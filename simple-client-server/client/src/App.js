import {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [data, setData]=useState([1,2])
  const [test, setTest]=useState('')

  useEffect(()=>{
    fetch('https://8081-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/test')
    .then(res=>res.json()).
    then(data=> {setData(data)
    
    })

  },[])
  console.log(test)

  const submit = e => {
    e.preventDefault();

    fetch('https://8081-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ test })
    }).then(() => {
      console.log('added');
      setTest(''); // clear the input field after submitting
      // fetch the data again to update the component with the new test
      fetch('https://8081-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/test')
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
    });
  };

  return (
    <>
    {data.map((d,index) => <p key={index}>{d.test}</p>)}
    <form onSubmit={submit}>
      <label htmlFor='test'> Enter new test</label>
      <input id='test' value={test} onChange={(e)=>{setTest(e.target.value)}}/>
      <button> Submit </button>
    </form>

    </>
  );
}

export default App;
