import { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { injectIntl } from "react-intl";

function AvgDurationPerDepartment() {
  const [data, setData] = useState([]);

  const config = {
    data,
    xField: "department",
    yField: "duration",
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
      duration: {
        alias: "Duration",
      },
    },
  };

  const getColumnData = () => {
    setData([
      {
        department: "Department 1",
        duration: 3.8,
      },
      {
        department: "Department 2",
        duration: 5.2,
      },
      {
        department: "Department 3",
        duration: 6.1,
      },
      {
        department: "Department 4",
        duration: 4.5,
      },
      {
        department: "Department 5",
        duration: 4.8,
      },
      {
        department: "Department 6",
        duration: 3.8,
      },
    ]);
  };

  useEffect(() => {
    getColumnData();
  }, []);

  return <Column {...config} />;
}

export default injectIntl(AvgDurationPerDepartment);
