import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavbarRouting from './component/Navbar/NavbarRouting'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <NavbarRouting/>
      </div>
  )
}

export default App


