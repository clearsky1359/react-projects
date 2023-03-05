import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('https://8080-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/upload', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch('https://8080-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/getAllTests')
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  useEffect(() => {
    fetch('https://8080-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/images')
      .then((res) => res.json())
      .then((images) => setImages(images));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      .then((res) => res.json())
      .then((newData) => {
        setData((prevData) => [...prevData, newData]);
        setName('');
        setEmail('');
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Data:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item._id}>
              {item.name} - {item.email}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit2}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>



      <button onClick={() => {
        fetch('https://8080-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io/images')
          .then((res) => res.json())
          .then((images) => {
            setImages(images)
          
            console.log(images)
          });
      }}>Show Images</button>

      <h2>Images:</h2>
      {images.map((image, index) => (
        <img
          key={index}
          src={`data:${image.contentType};base64,${image.data}`}
          alt={image.name}
          width="200"
          height="200"
        />
      ))}
    </div>
  );
}

export default App;
