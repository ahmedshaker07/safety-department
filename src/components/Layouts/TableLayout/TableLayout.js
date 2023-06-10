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
}) => {
  return (
    <div className="table-layout">
      <div className="table-layout__add-report">
        <ASButton label={btnLabel} onClick={onClick} />
      </div>
      <ASTable
        columns={columns}
        dataSource={dataSource}
        fetchData={fetchData}
        rowKey={rowKey}
      />
    </div>
  );
};

export default TableLayout;
