import { Button, Input, Modal, Switch, Table } from "antd";
import React, { useState } from "react";

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
  const [selectedItemId, setSelectedItemId] = useState(null);

  const selectRow = (record) => {
    if (record.key >= 0) {
      setSelectedItemId(record);
    } else {
      setSelectedItemId(null);
    }
  };

  // Handle close creating modal
  const handleCloseCreatingModal = () => {
    setIsOpenCreationModal(false);
    selectedItemId && setSelectedItemId(null);
  };

  // Handle submit creating modal
  const handleSubmitCreating = () => {
    handleCloseCreatingModal();
  };

  // Handle close deleting modal
  const handleCloseDeletionModal = () => {
    setIsOpenDeletionModal(false);
    setSelectedItemId(null);
  };

  // Handle submit deleting modal
  const handleSubmitDeleting = async () => {
    try {
      if (!selectedItemId) return;
      handleCloseDeletionModal();
    } catch (error) {}
  };

  return (
    <div className="account">
      <div className="page-title">
        <div className="title-icon">
          <i className="bi bi-person-fill" />
        </div>
        <div className="title-name">Quản lý tài khoản</div>
        <Button
          icon={<i className="bi bi-plus" />}
          type="primary"
          onClick={() => setIsOpenCreationModal(true)}
        >
          Thêm tài khoản
        </Button>
      </div>
      <div className="main-content" style={{ marginTop: 40 }}></div>
      <Table
        dataSource={data}
        onRow={(record) => ({
          onClick: () => {
            selectRow(record);
          },
        })}
      >
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
              <Button
                icon={
                  <i
                    className="bi bi-trash"
                    onClick={() => setIsOpenDeletionModal(true)}
                  />
                }
                className="delete"
              />
            </div>
          )}
        />
      </Table>

      {/* Creation modal */}
      <Modal
        title="Thông tin tài khoản"
        open={isOpenCreationModal}
        footer={[
          <Button key="back" onClick={handleCloseCreatingModal}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitCreating}>
            Lưu
          </Button>,
        ]}
      >
        <div>
          <div>Tên tài khoản</div>
          <Input value={selectedItemId?.name} />
        </div>
        <div>
          <div>Email</div>
          <Input value={selectedItemId?.email} />
        </div>
        <div>
          <div>Mật khẩu</div>
          <Input.Password value={selectedItemId && "123456"} />
        </div>
        <div>
          <div>Xác nhận mật khẩu</div>
          <Input.Password value={selectedItemId && "123456"} />
        </div>
      </Modal>

      {/* Deletion modal */}
      <Modal
        title="Xác nhận"
        open={isOpenDeletionModal}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmitDeleting}>
            Xóa
          </Button>,
          <Button key="back" onClick={handleCloseDeletionModal}>
            Hủy
          </Button>,
        ]}
      >
        Bạn có chắc chắc muốn xóa nội dung này?
      </Modal>
    </div>
  );
};

export default Account;
