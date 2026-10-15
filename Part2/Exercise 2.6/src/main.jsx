import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const names = [
  {
  name:'Arto Hellas',
  id:1
},
{
  name:'Ada Lovelacc',
  id:2
}
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App names={names}/>
  </StrictMode>,
)
