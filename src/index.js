import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import router from './routes.js';
import { Provider } from "react-redux";
import store from './store/index';


import {RouterProvider} from "react-router-dom";
  
  createRoot(document.getElementById("root")).render(
   
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>

  );

