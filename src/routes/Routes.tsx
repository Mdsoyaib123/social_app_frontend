import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Register from "../pages/Registration";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Feed />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },

]);

export default routes;