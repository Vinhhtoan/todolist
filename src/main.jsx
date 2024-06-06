import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Login } from "./pages/Authentication/Login"
import { HomePage } from "./pages/HomePage"

import {
    BrowserRouter as Router, Routes , Route, createBrowserRouter, RouterProvider 
} from "react-router-dom";
import { InboxPage } from './pages/InboxPage'
import { SearchPage } from './pages/SearchPage'
import { TodayPage } from './pages/TodayPage'
import { UpcomingPage } from './pages/UpcomingPage'
import { FilterPage } from './pages/FilterPage'
const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
        path: "/home",
        element: <HomePage />,
        children: [
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "inbox",
                element: <InboxPage/>
            },
            {
                path: "today",
                element: <TodayPage/>
            },
            {
                path: "upcoming",
                element: <UpcomingPage/>
            },
            {
                path: "filter",
                element: <FilterPage/>
            },
        ]
    },
    
  ]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
