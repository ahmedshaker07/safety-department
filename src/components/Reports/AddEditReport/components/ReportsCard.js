const ReportsCards = ({ title, children }) => {
  return (
    <div className="add-edit-report__card add-edit-report__actions-card">
      <span className="display-xs">{title}</span>
      {children}
    </div>
  );
};

export default ReportsCards;
