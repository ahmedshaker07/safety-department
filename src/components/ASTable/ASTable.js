import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { injectIntl } from "react-intl";
import { Table, Input } from "antd";

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
      hasSearch = true,
    },
    _
  ) => {
    const [pageSize, setPageSize] = useState(pageLimit);
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [total, setTotal] = useState(0);

    const onSearchTextChange = ({ target }) => {
      setSearchText(target.value);
    };

    const getData = useCallback(
      async ({ pageNumber = 1, pageSize = 10, sorter = {}, search = "" }) => {
        setLoading(true);
        const { count } = await fetchData({
          pageNumber,
          pageSize,
          sorter,
          search,
        });
        setTotal(count);
        setLoading(false);
      },
      [fetchData]
    );

    const handleTableChange = ({ current, pageSize }, _, { field, order }) => {
      setPageSize(pageSize);
      setPageNumber(current);
      getData({
        pageNumber: current,
        pageSize,
        sorter: { field, order },
      });
    };

    const onSearchClick = () => {
      if (searchText) {
        getData({ pageSize, search: searchText });
        setSearchText("");
      }
    };

    useImperativeHandle(tableRef, () => ({
      refreshTable() {
        getData({});
      },
      triggerLoading(value) {
        setLoading(value);
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
        loading={loading || externalLoading}
        onChange={handleTableChange}
        title={() => (
          <>
            {hasSearch && (
              <div className="filtered-reports-page__table-search">
                <Input
                  placeholder={intl.formatMessage({ id: "common.search" })}
                  value={searchText}
                  onChange={onSearchTextChange}
                />
                <ASButton
                  disabled={!searchText}
                  label={intl.formatMessage({ id: "common.search" })}
                  onClick={onSearchClick}
                />
              </div>
            )}
            {hasExportFeatures && (
              <div className="filtered-reports-page__table-actions">
                <ASButton label="PDF" />
                <ASButton label="Excel" />
              </div>
            )}
          </>
        )}
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
