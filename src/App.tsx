import { Outlet } from "react-router-dom"
import logo from "./assets/images/logo.svg";
import profileImg from "./assets/images/profile.png";
import Navbar from "./components/Navbar"

function App() {
  const user = {
    name: "Dylan Field",
    avatar: profileImg,
  };
  return (
    <div>
     <Navbar logo={logo} user={user} />
     <div className="">
       <Outlet />
     </div>
    </div>
  )
}

export default App
