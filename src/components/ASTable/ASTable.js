import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { injectIntl } from "react-intl";
import { Table } from "antd";

import { TABLE_PAGE_SIZES } from "../../constants/helpers";

import ASButton from "../ASButton/ASButton";

import "./ASTable.scss";

const ASTable = forwardRef(
  (
    {
      columns,
      dataSource,
      rowKey,
      fetchData,
      intl,
      pageLimit = 10,
      initialPageNumber = 1,
      hasExportFeatures = false,
      onRowClick = () => {},
      tableRef,
      externalLoading,
      rememberOptions = false,
    },
    _
  ) => {
    const [pageSize, setPageSize] = useState(pageLimit);
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const getData = useCallback(
      async ({
        pageNumber = rememberOptions
          ? parseInt(localStorage.getItem("pageNumber") || 1)
          : 1,
        pageSize = rememberOptions
          ? parseInt(localStorage.getItem("pageLimit") || 10)
          : 10,
        sorter = {},
        filters = {},
      }) => {
        setLoading(true);
        const { count } = await fetchData({
          pageNumber,
          pageSize,
          sorter,
          filters,
        });
        setTotal(count);
        setPageSize(pageSize);
        setPageNumber(pageNumber);
        if (rememberOptions) {
          localStorage.setItem("pageLimit", pageSize);
          localStorage.setItem("pageNumber", pageNumber);
        }
        setLoading(false);
      },
      [fetchData, rememberOptions]
    );

    const handleTableChange = ({ current, pageSize }, _, { field, order }) => {
      getData({
        pageNumber: current,
        pageSize,
        sorter: { field, order },
      });
    };

    useImperativeHandle(tableRef, () => ({
      refreshTable({ pageNumber = 1, filters = {} }) {
        getData({ pageNumber, filters });
      },
      triggerLoading(value) {
        setLoading(value);
      },
      getPageNumber() {
        return pageNumber;
      },
    }));

    useEffect(() => {
      getData({});
    }, [getData]);

    return (
      <Table
        ref={tableRef}
        className="astable"
        columns={columns}
        rowKey={rowKey}
        dataSource={dataSource}
        pagination={{
          total,
          pageSize: pageSize,
          current: pageNumber,
          locale: {
            items_per_page: intl.formatMessage({
              id: "common.per_page",
            }),
          },
          pageSizeOptions: TABLE_PAGE_SIZES,
        }}
        scroll={{
          x: 1100,
          y: 500,
        }}
        loading={loading || externalLoading}
        onChange={handleTableChange}
        title={() =>
          hasExportFeatures && (
            <div className="filtered-reports-page__table-actions">
              <ASButton label="PDF" />
              <ASButton label="Excel" />
            </div>
          )
        }
        onRow={(record) => {
          return {
            onClick: () => {
              onRowClick({ data: record });
            },
          };
        }}
      />
    );
  }
);

export default injectIntl(ASTable);
