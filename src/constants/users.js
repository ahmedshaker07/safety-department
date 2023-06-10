export const USERS_COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
