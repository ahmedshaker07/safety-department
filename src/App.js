import React from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider
} from "react-router-dom";
import { Layout, Spin } from "antd";

import protectedRoutes from "./utils/routes";
import { isAuth } from "./utils/helpers";

import Signin from "./components/Signin/Signin";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import ASHeader from "./components/ASHeader/ASHeader";

import "./styles/global-overrides.scss";

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
          element={
            isAuth() ? (
              <Navigate to="/overview" />
            ) : (
              <React.Suspense fallback={<Spin />}>
                <Signin />
              </React.Suspense>
            )
          }
        />
        <Route element={isAuth() ? <Outlet /> : <Navigate to="/signin" />}>
          {protectedRoutes.map(({ component: Component, path }, idx) => (
            <Route
              key={idx}
              element={
                <React.Suspense fallback={<Spin />}>
                  <Component />
                </React.Suspense>
              }
              path={path}
            />
          ))}
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
