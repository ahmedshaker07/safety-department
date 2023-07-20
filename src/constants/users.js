import { fmt } from "../components/IntlWrapper/IntlWrapper";

export const USERS_COLUMNS = [
  {
    title: fmt({ id: "users.full_name" }),
    dataIndex: "fullName",
  },
  {
    title: fmt({ id: "signin.email" }),
    dataIndex: "email",
  },
  {
    title: fmt({ id: "users.phone" }),
    dataIndex: "phoneNumber",
  },
  {
    title: fmt({ id: "users.role" }),
    dataIndex: "role",
    render: (role) => role.toLowerCase(),
  },
];
