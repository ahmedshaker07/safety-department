import { Space, Tag } from "antd";

export const REPORTS_TABLE_COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span>{text}</span>
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <span>Invite {record.name}</span>
        <span>Delete</span>
      </Space>
    )
  }
];
