import { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Line } from "@ant-design/plots";

function ActionsPerDepartment() {
  const [data, setData] = useState([]);

  const config = {
    data,
    xField: "date",
    yField: "count",
    seriesField: "type",
    slider: {
      start: 0,
      end: 1,
    },
  };

  const getColumnData = () => {
    setData([
      {
        date: "1/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "1/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "1/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "2/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "2/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "2/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "3/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "3/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "3/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "4/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "4/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "4/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "4/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "4/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "4/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "5/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "5/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "5/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "6/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "6/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "6/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "7/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "7/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "7/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "8/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "8/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "8/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "9/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "9/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "9/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "10/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "10/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "10/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "11/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "11/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "11/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "12/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "12/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "12/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "13/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "13/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "13/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "14/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "14/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "14/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
      {
        date: "15/1/23",
        count: Math.random() * 100,
        type: "Safe",
      },
      {
        date: "15/1/23",
        count: Math.random() * 100,
        type: "Unsafe",
      },
      {
        date: "15/1/23",
        count: Math.random() * 100,
        type: "Followup",
      },
    ]);
  };

  useEffect(() => {
    getColumnData();
  }, []);

  return <Line {...config} />;
}

export default injectIntl(ActionsPerDepartment);
