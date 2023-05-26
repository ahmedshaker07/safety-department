import { lazy } from "react";
import { retry } from "./helpers";

const Overview = lazy(
  async () =>
    await retry(async () => await import("../components/Overview/Overview"))
);

const protectedRoutes = [
  {
    path: "/overview",
    exact: true,
    name: "Overview",
    component: Overview
  }
];

export default protectedRoutes;
