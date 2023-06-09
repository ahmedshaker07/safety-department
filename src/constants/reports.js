import { fmt } from "../components/IntlWrapper/IntlWrapper";

export const FIRST_SECTION_FIELDS = {
  LEFT: [
    {
      name: "area",
      label: fmt({ id: "reports.area" }),
      placeholder: fmt({ id: "reports.area" }),
    },
    {
      name: "assessor",
      label: fmt({ id: "reports.assessor" }),
      placeholder: fmt({ id: "reports.assessor" }),
    },
    {
      name: "assited",
      label: fmt({ id: "reports.assited" }),
      placeholder: fmt({ id: "reports.assited" }),
    },
    {
      name: "peopleobserved",
      label: fmt({ id: "reports.observed" }),
      placeholder: fmt({ id: "reports.observed" }),
    },
  ],
  RIGHT: [
    {
      name: "date",
      label: fmt({ id: "reports.date" }),
      placeholder: fmt({ id: "reports.date" }),
    },
    {
      name: "starttime",
      label: fmt({ id: "reports.start_time" }),
      placeholder: fmt({ id: "reports.start_time" }),
    },
    {
      name: "finishtime",
      label: fmt({ id: "reports.finish_time" }),
      placeholder: fmt({ id: "reports.finish_time" }),
    },
    {
      name: "duration",
      label: fmt({ id: "reports.duration" }),
      placeholder: fmt({ id: "reports.duration" }),
    },
  ],
};

export const DEFAULT_ACTIONS = {
  safe: [
    {
      name: "safe-0",
      key: 0,
    },
  ],
  unsafe: [
    {
      name: "unsafe-0",
      key: 0,
    },
  ],
  followup: [
    [
      {
        name: "followup-1",
      },
      {
        name: "whom-1",
      },
      {
        name: "when-1",
      },
      {
        name: "nmha-1",
      },
    ],
  ],
};
