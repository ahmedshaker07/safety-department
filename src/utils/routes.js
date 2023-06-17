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

const Users = lazy(
  async () => await retry(async () => await import("../components/Users/Users"))
);

const Actions = lazy(
  async () =>
    await retry(async () => await import("../components/Actions/Actions"))
);

const Departments = lazy(
  async () =>
    await retry(
      async () => await import("../components/Departments/Departments")
    )
);

const AddEditReports = lazy(
  async () =>
    await retry(
      async () =>
        await import("../components/Reports/AddEditReport/AddEditReport")
    )
);

const FilteredReports = lazy(
  async () =>
    await retry(
      async () => await import("../components/FilteredReports/FilteredReports")
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
    component: Overview,
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
  },
  {
    path: "/reports/add",
    name: "Create Reports",
    component: AddEditReports,
  },
  {
    path: "/reports/day",
    name: "Reports by day",
    component: FilteredReports,
    props: { pageType: "day" },
  },
  {
    path: "/reports/reporter",
    name: "Reports by reporter",
    component: FilteredReports,
    props: { pageType: "reporter" },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/actions",
    name: "Actions",
    component: Actions,
  },
  {
    path: "/departments",
    name: "Departments",
    component: Departments,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

export default protectedRoutes;
