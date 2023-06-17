import { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Line } from "@ant-design/plots";

function ReportsPerDate() {
  const [data, setData] = useState([]);

  const config = {
    data,
    padding: "auto",
    xField: "Date",
    yField: "count",
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.75,
      end: 1,
    },
  };

  const getColumnData = () => {
    setData([
      {
        Date: "2010-01",
        count: 1998,
      },
      {
        Date: "2010-02",
        count: 1850,
      },
      {
        Date: "2010-03",
        count: 1720,
      },
      {
        Date: "2010-04",
        count: 1818,
      },
      {
        Date: "2010-05",
        count: 1920,
      },
      {
        Date: "2010-06",
        count: 1802,
      },
      {
        Date: "2010-07",
        count: 1945,
      },
      {
        Date: "2010-08",
        count: 1856,
      },
      {
        Date: "2010-09",
        count: 2107,
      },
      {
        Date: "2010-10",
        count: 2140,
      },
      {
        Date: "2010-11",
        count: 2311,
      },
      {
        Date: "2010-12",
        count: 1972,
      },
      {
        Date: "2011-01",
        count: 1760,
      },
      {
        Date: "2011-02",
        count: 1824,
      },
      {
        Date: "2011-03",
        count: 1801,
      },
      {
        Date: "2011-04",
        count: 2001,
      },
      {
        Date: "2011-05",
        count: 1640,
      },
      {
        Date: "2011-06",
        count: 1502,
      },
      {
        Date: "2011-07",
        count: 1621,
      },
      {
        Date: "2011-08",
        count: 1480,
      },
      {
        Date: "2011-09",
        count: 1549,
      },
      {
        Date: "2011-10",
        count: 1390,
      },
      {
        Date: "2011-11",
        count: 1325,
      },
      {
        Date: "2011-12",
        count: 1250,
      },
      {
        Date: "2012-01",
        count: 1394,
      },
      {
        Date: "2012-02",
        count: 1406,
      },
      {
        Date: "2012-03",
        count: 1578,
      },
      {
        Date: "2012-04",
        count: 1465,
      },
      {
        Date: "2012-05",
        count: 1689,
      },
      {
        Date: "2012-06",
        count: 1755,
      },
      {
        Date: "2012-07",
        count: 1495,
      },
      {
        Date: "2012-08",
        count: 1508,
      },
      {
        Date: "2012-09",
        count: 1433,
      },
      {
        Date: "2012-10",
        count: 1344,
      },
      {
        Date: "2012-11",
        count: 1201,
      },
      {
        Date: "2012-12",
        count: 1065,
      },
      {
        Date: "2013-01",
        count: 1255,
      },
      {
        Date: "2013-02",
        count: 1429,
      },
      {
        Date: "2013-03",
        count: 1398,
      },
      {
        Date: "2013-04",
        count: 1678,
      },
      {
        Date: "2013-05",
        count: 1524,
      },
      {
        Date: "2013-06",
        count: 1688,
      },
      {
        Date: "2013-07",
        count: 1500,
      },
      {
        Date: "2013-08",
        count: 1670,
      },
      {
        Date: "2013-09",
        count: 1734,
      },
      {
        Date: "2013-10",
        count: 1699,
      },
      {
        Date: "2013-11",
        count: 1508,
      },
      {
        Date: "2013-12",
        count: 1680,
      },
      {
        Date: "2014-01",
        count: 1750,
      },
      {
        Date: "2014-02",
        count: 1602,
      },
      {
        Date: "2014-03",
        count: 1834,
      },
      {
        Date: "2014-04",
        count: 1722,
      },
      {
        Date: "2014-05",
        count: 1430,
      },
      {
        Date: "2014-06",
        count: 1280,
      },
      {
        Date: "2014-07",
        count: 1367,
      },
      {
        Date: "2014-08",
        count: 1155,
      },
      {
        Date: "2014-09",
        count: 1289,
      },
      {
        Date: "2014-10",
        count: 1104,
      },
      {
        Date: "2014-11",
        count: 1246,
      },
      {
        Date: "2014-12",
        count: 1098,
      },
      {
        Date: "2015-01",
        count: 1189,
      },
      {
        Date: "2015-02",
        count: 1276,
      },
      {
        Date: "2015-03",
        count: 1033,
      },
      {
        Date: "2015-04",
        count: 956,
      },
      {
        Date: "2015-05",
        count: 845,
      },
      {
        Date: "2015-06",
        count: 1089,
      },
      {
        Date: "2015-07",
        count: 944,
      },
      {
        Date: "2015-08",
        count: 1043,
      },
      {
        Date: "2015-09",
        count: 893,
      },
      {
        Date: "2015-10",
        count: 840,
      },
      {
        Date: "2015-11",
        count: 934,
      },
      {
        Date: "2015-12",
        count: 810,
      },
      {
        Date: "2016-01",
        count: 782,
      },
      {
        Date: "2016-02",
        count: 1089,
      },
      {
        Date: "2016-03",
        count: 745,
      },
      {
        Date: "2016-04",
        count: 680,
      },
      {
        Date: "2016-05",
        count: 802,
      },
      {
        Date: "2016-06",
        count: 697,
      },
      {
        Date: "2016-07",
        count: 583,
      },
      {
        Date: "2016-08",
        count: 456,
      },
      {
        Date: "2016-09",
        count: 524,
      },
      {
        Date: "2016-10",
        count: 398,
      },
      {
        Date: "2016-11",
        count: 278,
      },
      {
        Date: "2016-12",
        count: 195,
      },
      {
        Date: "2017-01",
        count: 145,
      },
      {
        Date: "2017-02",
        count: 207,
      },
    ]);
  };

  useEffect(() => {
    getColumnData();
  }, []);

  return <Line {...config} />;
}

export default injectIntl(ReportsPerDate);
