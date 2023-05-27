import { lazy } from "react";
import { retry } from "./helpers";

const Overview = lazy(
  async () =>
    await retry(async () => await import("../components/Overview/Overview"))
);

const Reports = lazy(
  async () =>
    await retry(async () => await import("../components/Reports/Reports"))
);

const Settings = lazy(
  async () =>
    await retry(async () => await import("../components/Settings/Settings"))
);

const protectedRoutes = [
  {
    path: "/overview",
    exact: true,
    name: "Overview",
    component: Overview
  },
  {
    path: "/reports",
    exact: true,
    name: "Reports",
    component: Reports
  },
  {
    path: "/settings",
    exact: true,
    name: "Settings",
    component: Settings
  }
];

export default protectedRoutes;
