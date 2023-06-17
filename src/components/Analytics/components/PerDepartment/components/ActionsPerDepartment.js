import { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { injectIntl } from "react-intl";

function ActionsPerDepartment() {
  const [data, setData] = useState([]);

  const config = {
    data,
    xField: "department",
    yField: "count",
    seriesField: "type",
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    label: {
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };

  const getColumnData = () => {
    setData([
      {
        department: "Department 1",
        type: "Safe",
        count: 5,
      },
      {
        department: "Department 1",
        type: "Unsafe",
        count: 10,
      },
      {
        department: "Department 1",
        type: "Followup",
        count: 15,
      },
      {
        department: "Department 2",
        type: "Safe",
        count: 10,
      },
      {
        department: "Department 2",
        type: "Unsafe",
        count: 20,
      },
      {
        department: "Department 2",
        type: "Followup",
        count: 22,
      },
      {
        department: "Department 3",
        type: "Safe",
        count: 20,
      },
      {
        department: "Department 3",
        type: "Unsafe",
        count: 10,
      },
      {
        department: "Department 3",
        type: "Followup",
        count: 5,
      },
      {
        department: "Department 4",
        type: "Safe",
        count: 5,
      },
      {
        department: "Department 4",
        type: "Unsafe",
        count: 8,
      },
      {
        department: "Department 4",
        type: "Followup",
        count: 18,
      },
      {
        department: "Department 5",
        type: "Safe",
        count: 4,
      },
      {
        department: "Department 5",
        type: "Unsafe",
        count: 9,
      },
      {
        department: "Department 5",
        type: "Followup",
        count: 14,
      },
      {
        department: "Department 6",
        type: "Safe",
        count: 9,
      },
      {
        department: "Department 6",
        type: "Unsafe",
        count: 10,
      },
      {
        department: "Department 6",
        type: "Followup",
        count: 6,
      },
    ]);
  };

  useEffect(() => {
    getColumnData();
  }, []);

  return <Column {...config} />;
}

export default injectIntl(ActionsPerDepartment);
