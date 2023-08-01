import './App.css'
import {useState} from 'react'
import axios from 'axios';


function App() {

  const [response, setResponse] = useState();

  async function getResponse() {
    const res = await axios.get('http://localhost:3000/products/')
    setResponse(res.data.products[0])
    console.log(response.product)
}

  return (
    <>
      
    </>
  )
}

export default App
