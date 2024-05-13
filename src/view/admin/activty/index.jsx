import { Button, Table, Tag } from "antd";
import React from "react";

const data = [
  {
    key: "1",
    name: "UIT Job Fair 2023",
    user: "Nguyễn Ngọc Trinh",
    hostDate: "03/12/2023",
    registerDate: "12/11/2023",
    status: "Đã kết thúc",
  },
  {
    key: "2",
    name: "Tháng hành động thanh niên",
    user: "Nguyễn Thành Trung",
    hostDate: "26/03/2024",
    registerDate: "20/03/2024",
    status: "Đã kết thúc",
  },
  {
    key: "3",
    name: "Cuộc thi tìm hiểu về lịch sử",
    user: "Nguyễn Ngọc Trinh",
    hostDate: "20/03/2024",
    registerDate: "12/03/2024",
    status: "Đã kết thúc",
  },
  {
    key: "4",
    name: "Thủ lĩnh sinh viên 2024",
    user: "Nguyễn Thành Trung",
    hostDate: "20/05/2024",
    registerDate: "10/05/2023",
    status: "Sắp diễn ra",
  },
];

const { Column } = Table;

const Activity = () => {
  return (
    <div className="account">
      <div className="page-title">
        <div className="title-icon">
          <i className="bi bi-person-fill" />
        </div>
        <div className="title-name">Quản lý hoạt động</div>
        <Button icon={<i className="bi bi-plus" />} type="primary">
          Thêm hoạt động
        </Button>
      </div>
      <div className="main-content" style={{ marginTop: 40 }}></div>
      <Table dataSource={data}>
        <Column title="#" dataIndex="key" key="key" />
        <Column title="Tên hoạt động" dataIndex="name" key="name" />
        <Column title="Người đăng ký" dataIndex="user" key="user" />
        <Column title="Ngày tổ chức" dataIndex="hostDate" key="hostDate" />
        <Column
          title="Ngày đăng ký"
          dataIndex="registerDate"
          key="registerDate"
        />
        <Column
          title="Tình trạng"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Tag key={status} color={status === "Sắp diễn ra" && "blue"}>
              {status.toUpperCase()}
            </Tag>
          )}
        />
        <Column
          title=""
          fixed
          key="action"
          render={() => (
            <div className="action-group">
              <Button
                icon={<i className="bi bi-pencil-square" />}
                className="edit"
              />
              <Button icon={<i className="bi bi-trash" />} className="delete" />
            </div>
          )}
        />
      </Table>
    </div>
  );
};

export default Activity;
