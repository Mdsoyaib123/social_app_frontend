import { Outlet } from "react-router-dom"
import logo from "./assets/images/logo.svg";

import Navbar from "./components/Navbar"

function App() {

  return (
    <div>
     <Navbar logo={logo}  />
     <div className="">
       <Outlet />
     </div>
    </div>
  )
}

export default App
