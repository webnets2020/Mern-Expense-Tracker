import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { createBrowserRouter } from "react-router-dom";
import CheckAuth from "./utils/Auths";
import GuestAuth from "./utils/Guest";

export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
        // element:token ? <Home/> : <Navigate to='/login'  replace={true} />,
      },
      {
        path: "login",
        element: <GuestAuth> <Login /></GuestAuth>
      },
      {
        path: "register",
        element: <GuestAuth><Register /></GuestAuth>
      },
    ],
  },
]);
