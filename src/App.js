import React, { useContext } from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Layout, Spin } from "antd";

import protectedRoutes from "./utils/routes";
import { ContextWrapper } from "./contexts/user.context";

import Signin from "./components/Signin/Signin";
import DefaultLayout from "./components/Layouts/DefaultLayout/DefaultLayout";
import ASHeader from "./components/ASHeader/ASHeader";
import ASLoading from "./components/ASLoading/ASLoading";

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
  const { token, isFetchingInitialData } = useContext(ContextWrapper);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={token ? <DefaultLayout /> : <Root />}>
        <Route
          index
          element={<Navigate to={token ? "/reports" : "/signin"} />}
        />
        <Route
          path="/signin"
          element={
            token ? (
              <Navigate to="/reports" />
            ) : (
              <React.Suspense fallback={<Spin />}>
                <Signin />
              </React.Suspense>
            )
          }
        />
        <Route element={token ? <Outlet /> : <Navigate to="/signin" />}>
          {protectedRoutes.map(
            ({ component: Component, path, props = {} }, idx) => (
              <Route
                key={idx}
                element={
                  <React.Suspense fallback={<Spin />}>
                    <Component {...props} />
                  </React.Suspense>
                }
                path={path}
              />
            )
          )}
        </Route>
      </Route>
    )
  );

  return isFetchingInitialData ? (
    <ASLoading />
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
