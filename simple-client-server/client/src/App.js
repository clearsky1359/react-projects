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
      setTest(''); 
      // clear the input field after submitting
      // fetch the data again to update the component with the new test
      fetch('https://8081-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/upload')
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
    });
  };

//working on img
const [selectedFile, setSelectedFile] = useState(null);
const handleFileInputChange = e => {
  setSelectedFile(e.target.files[0]);
};

const handleSubmit = e => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('file', selectedFile);

  fetch('https://8081-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/upload', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      console.log('File uploaded successfully:', data);
    })
    .catch(err => {
      console.error('Error uploading file:', err);
    });
};



///

  return (
    <>
    {data.map((d,index) => <p key={index}>{d.test}</p>)}
    <form onSubmit={submit}>
      <label htmlFor='test'> Enter new test</label>
      <input id='test' value={test} onChange={(e)=>{setTest(e.target.value)}}/>
      <button> Submit </button>
    </form>

    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileInputChange} />
      <button type="submit" disabled={!selectedFile}>
        Upload
      </button>
    </form>

    </>
  );
}

export default App;
