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

const AddEditReports = lazy(
  async () =>
    await retry(
      async () =>
        await import("../components/Reports/AddEditReport/AddEditReport")
    )
);

const Settings = lazy(
  async () =>
    await retry(async () => await import("../components/Settings/Settings"))
);

const protectedRoutes = [
  {
    path: "/overview",
    name: "Overview",
    component: Overview
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports
  },
  {
    path: "/reports/add",
    name: "Create Reports",
    component: AddEditReports
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  }
];

export default protectedRoutes;
