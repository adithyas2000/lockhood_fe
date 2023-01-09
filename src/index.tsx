import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavStrip from './components/navbar';
import LoginPage from './components/auth/login';
import Dashboard from './components/dashboard';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './css/colors.css';
import KanbanBoard from './components/jobs/kanban';
import KanbanCard from './components/jobs/kanbanCard';
import SalesPage from './components/salesPage';
import OrderRequestsPage from './components/orderRequestsPage';
import AddJob from './components/jobs/addJob';
import AddEmployeePage from './components/employees/addEmployee';
import CreateInventoryPage from './components/inventory/createInventory';
import ViewInventory from './components/inventory/viewInventory';
import UpdateInventoryPage from './components/inventory/updateInventory';
import AssignEmployeePage from './components/jobs/assignEmployee';
import ViewAllEmployeesPage from './components/employees/viewAllEmployees';
import CreateProductPage from './components/products/createProductPage';
import ViewProducts from './components/products/viewProducts';

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
  // JOB ROUTES
  {
    path: "/job/kanban",
    element: <KanbanBoard />
  },
  {
    path:"/job/addJob/:uId",
    element:<AddJob/>
  },{
    path:"/job/assign/:jId",
    element:<AssignEmployeePage/>
  },
  // REPORTS
  {
    path:"/salesReport",
    element:<SalesPage/>
  },
  {
    path:'/orderRequests',
    element:<OrderRequestsPage/>
  },
  // EMPLOYEE ROUTES
  {
    path:'/employees/add',
    element:<AddEmployeePage/>
  },
  {
    path:'employees/view',
    element:<ViewAllEmployeesPage/>
  },
  // INVENTORY ROUTES
  {
    path:'/inventory/create',
    element:<CreateInventoryPage/>
  },
  {
    path:'/inventory/view',
    element:<ViewInventory/>
  },
  {
    path:'/inventory/update/:mId',
    element:<UpdateInventoryPage/>
  },
  // PRODUCT ROUTES
  {
    path:'/products/create',
    element:<CreateProductPage/>
  },
  {
    path:'/products/view',
    element:<ViewProducts/>
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


