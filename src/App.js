import React from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider
} from "react-router-dom";
import { Layout } from "antd";

import protectedRoutes from "./utils/routes";

import Overview from "./components/Overview/Overview";
import Signin from "./components/Signin/Signin";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import ASHeader from "./components/ASHeader/ASHeader";

import "./styles/global-overrides.scss";

// const isAuth = () => localStorage.getItem("newToken");
const isAuth = () => false;

function Root() {
  return (
    <Layout className="as-registration-layout">
      <ASHeader />
      <Outlet />
    </Layout>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={isAuth() ? <DefaultLayout /> : <Root />}>
        <Route
          index
          element={<Navigate to={isAuth() ? "/overview" : "/signin"} />}
        />
        <Route
          path="/signin"
          element={isAuth() ? <Navigate to="/overview" /> : <Signin />}
        />
        <Route element={isAuth() ? <Outlet /> : <Navigate to="/signin" />}>
          {protectedRoutes.map(({ path }, idx) => (
            <Route key={idx} element={<Overview />} path={path} />
          ))}
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
