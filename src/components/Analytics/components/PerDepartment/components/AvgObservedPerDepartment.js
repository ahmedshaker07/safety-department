import { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { injectIntl } from "react-intl";

function AvgObservedPerDepartment() {
  const [data, setData] = useState([]);

  const config = {
    data,
    xField: "department",
    yField: "observed",
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      department: {
        alias: "Department",
      },
      observed: {
        alias: "Observed",
      },
    },
  };

  const getColumnData = () => {
    setData([
      {
        department: "Department 1",
        observed: 38,
      },
      {
        department: "Department 2",
        observed: 52,
      },
      {
        department: "Department 3",
        observed: 61,
      },
      {
        department: "Department 4",
        observed: 45,
      },
      {
        department: "Department 5",
        observed: 48,
      },
      {
        department: "Department 6",
        observed: 38,
      },
    ]);
  };

  useEffect(() => {
    getColumnData();
  }, []);

  return <Column {...config} />;
}

export default injectIntl(AvgObservedPerDepartment);
