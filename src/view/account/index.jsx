import { Button, Input, Modal, Switch, Table } from "antd";
import React, { useState } from "react";
import { BsPersonFill, BsPlus } from "react-icons/bs";

const data = [
  {
    key: "1",
    name: "Mike",
    email: "admin@gmail.com",
    active: true,
  },
  {
    key: "2",
    name: "John",
    email: "admin@gmail.com",
    active: false,
  },
  {
    key: "3",
    name: "Mike",
    email: "admin@gmail.com",
    active: true,
  },
  {
    key: "4",
    name: "John",
    email: "admin@gmail.com",
    active: true,
  },
  {
    key: "5",
    name: "Mike",
    email: "admin@gmail.com",
    active: false,
  },
  {
    key: "6",
    name: "John",
    email: "admin@gmail.com",
    active: true,
  },
  {
    key: "7",
    name: "Mike",
    email: "admin@gmail.com",
    active: true,
  },
  {
    key: "8",
    name: "John",
    email: "admin@gmail.com",
    active: true,
  },
  {
    key: "9",
    name: "Mike",
    email: "admin@gmail.com",
    active: true,
  },
  {
    key: "10",
    name: "John",
    email: "admin@gmail.com",
    active: true,
  },
  {
    key: "11",
    name: "Mike",
    email: "admin@gmail.com",
    active: true,
  },
  {
    key: "12",
    name: "John",
    email: "admin@gmail.com",
    active: true,
  },
];

const { Column } = Table;

const Account = () => {
  const [isOpenCreationModal, setIsOpenCreationModal] = useState(false);
  const [isOpenDeletionModal, setIsOpenDeletionModal] = useState(false);
  const showModal = () => {
    setIsOpenCreationModal(true);
  };
  const handleOk = () => {
    setIsOpenCreationModal(false);
  };
  const handleCancel = () => {
    setIsOpenCreationModal(false);
  };
  return (
    <div className="account">
      <div className="page-title">
        <div className="title-icon">
          <i className="bi bi-person-fill" />
        </div>
        <div className="title-name">Quản lý tài khoản</div>
        <Button icon={<i className="bi bi-plus" />} type="primary">
          Thêm tài khoản
        </Button>
      </div>
      <div className="main-content" style={{ marginTop: 40 }}></div>
      <Table dataSource={data}>
        <Column title="#" dataIndex="key" key="key" />
        <Column title="Tên tài khoản" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Hoạt động"
          dataIndex="active"
          key="active"
          render={(active) => <Switch checked={active} />}
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
                onClick={() => setIsOpenCreationModal(true)}
              />
              <Button icon={<i className="bi bi-trash" />} className="delete" />
            </div>
          )}
        />
      </Table>

      {/* Creation modal */}
      <Modal
        title="Thông tin tài khoản"
        open={isOpenCreationModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div>Tên tài khoản</div>
          <Input />
        </div>
        <div>
          <div>Email</div>
          <Input />
        </div>
        <div>
          <div>Mật khẩu</div>
          <Input />
        </div>
        <div>
          <div>Xác nhận mật khẩu</div>
          <Input />
        </div>
      </Modal>

      {/* Confirm delete modal */}
      <Modal
        title="Xác nhận"
        open={isOpenDeletionModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>Bạn có chắc chắc muốn xóa nội dung này?</div>
      </Modal>
    </div>
  );
};

export default Account;
