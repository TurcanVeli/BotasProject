import React from 'react';

import './App.css';

//Pages
import Homepage from './Pages/Home/HomePage';
import Navbar from './Component/Navbar/Navbar';
import Notfound from './Pages/notFound/Notfound';
import RootTree from './Pages/RootTree/RootTree';
import OutageReport from './Pages/OutageReport/OutageReport'



import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";




const Layout = () => {
  return (

    <div className="app">
      <Navbar />

      <Outlet />

    </div>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Notfound />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/roottree",
        element: <RootTree />,

      },
      {
        path:"/OutageReport",
        element: <OutageReport/>

      }

    ]
  },

]);







function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
