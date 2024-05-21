import { Button, Input, Modal, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AccountManageDataSelector } from "../../../redux/admin/account/accountManageSelector";
import { GetAllUsersData } from "../../../redux/admin/account/accountManageThunk";

const { Column } = Table;

const Account = () => {
  const dispatch = useDispatch();

  const [isOpenCreationModal, setIsOpenCreationModal] = useState(false);
  const [isOpenDeletionModal, setIsOpenDeletionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const userData = useSelector(AccountManageDataSelector);

  useEffect(() => {
    LoadUsersData();
  }, []);

  const LoadUsersData = async () => {
    try {
      // Dispatch action 'login' với username và password
      await dispatch(GetAllUsersData());
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error occurred:", error.message);
    }
  }

  const selectRow = (record) => {
    if (record) {
      setSelectedItem(record);
    } else {
      setSelectedItem(null);
    }
  };

  // Handle close creating modal
  const handleCloseCreatingModal = () => {
    setIsOpenCreationModal(false);
    selectedItem && setSelectedItem(null);
  };

  // Handle submit creating modal
  const handleSubmitCreating = () => {
    handleCloseCreatingModal();
  };

  // Handle close deleting modal
  const handleCloseDeletionModal = () => {
    setIsOpenDeletionModal(false);
    setSelectedItem(null);
  };

  // Handle submit deleting modal
  const handleSubmitDeleting = async () => {
    try {
      if (!selectedItem) return;
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
        dataSource={userData}
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
        onCancel={handleCloseCreatingModal}
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
          <Input defaultValue={selectedItem?.name} />
        </div>
        <div>
          <div>Email</div>
          <Input defaultValue={selectedItem?.email} />
        </div>
        <div>
          <div>Mật khẩu</div>
          <Input.Password defaultValue={selectedItem && "123456"}/>
        </div>
        <div>
          <div>Xác nhận mật khẩu</div>
          <Input.Password defaultValue={selectedItem && "123456"} />
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
