import { lazy } from "react";
import { retry } from "./helpers";

const Reports = lazy(
  async () =>
    await retry(async () => await import("../components/Reports/Reports"))
);

const Followup = lazy(
  async () =>
    await retry(async () => await import("../components/Followup/Followup"))
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

const ReportsPerEntity = lazy(
  async () =>
    await retry(
      async () =>
        await import("../components/ReportsPerEntity/ReportsPerEntity")
    )
);

const Settings = lazy(
  async () =>
    await retry(async () => await import("../components/Settings/Settings"))
);

const protectedRoutes = [
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
    path: "/reports/:id",
    name: "Edit Reports",
    component: AddEditReports,
  },
  {
    path: "/reports/time",
    name: "Reports by time",
    component: FilteredReports,
    props: { pageType: "time" },
  },
  {
    path: "/reports/reporter",
    name: "Reports by reporter",
    component: ReportsPerEntity,
    props: { pageType: "reporter" },
  },
  {
    path: "/reports/department",
    name: "Reports by department",
    component: ReportsPerEntity,
    props: { pageType: "department" },
  },
  {
    path: "/followup",
    name: "Followup Actions",
    component: Followup,
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
