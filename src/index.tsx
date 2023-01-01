import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavStrip from './components/navbar';
import LoginPage from './components/login';
import Dashboard from './components/dashboard';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './css/colors.css';
import KanbanBoard from './components/kanban';
import KanbanCard from './components/kanbanCard';
import SalesPage from './components/salesPage';
import OrderRequestsPage from './components/orderRequestsPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/kanban",
    element: <KanbanBoard />
  },
  {
    path: "/kanbanCard",
    element: <KanbanCard action={function(){console.log("TestKanbanCardEndpoint");}} id={1} title='My title' header='My header' content='My content' type={1}/>
  },
  {
    path:"/salesReport",
    element:<SalesPage/>
  },
  {
    path:'/orderRequests',
    element:<OrderRequestsPage/>
  }
]);

root.render(
  <>
    <NavStrip />
    <RouterProvider router={router} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


