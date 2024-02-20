import ASButton from "../../ASButton/ASButton";
import ASTable from "../../ASTable/ASTable";

import "./TableLayout.scss";

const TableLayout = ({
  onClick,
  btnLabel,
  columns,
  dataSource,
  fetchData,
  rowKey,
  tableRef,
  onRowClick,
  rememberOptions = false,
}) => {
  return (
    <div className="table-layout">
      {btnLabel && (
        <div className="table-layout__add-report">
          <ASButton label={btnLabel} onClick={onClick} />
        </div>
      )}
      <ASTable
        columns={columns}
        dataSource={dataSource}
        fetchData={fetchData}
        rowKey={rowKey}
        tableRef={tableRef}
        onRowClick={onRowClick}
        rememberOptions={rememberOptions}
      />
    </div>
  );
};

export default TableLayout;
