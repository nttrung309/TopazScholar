import {
  Button,
  Input,
  Modal,
  Switch,
  Table,
  Divider,
  notification,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AccountManageDataSelector } from "../../../redux/admin/account/accountManageSelector";
import {
  ChangeActiveState,
  GetAllUsersData,
  UpdateUserData,
} from "../../../redux/admin/account/accountManageThunk";
import { CheckCircleFilled, SearchOutlined } from "@ant-design/icons";

const { Column } = Table;

const Account = () => {
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  const [isOpenCreationModal, setIsOpenCreationModal] = useState(false);
  const [isOpenDeletionModal, setIsOpenDeletionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [isClickChangeActiveState, setIsClickChangeActiveState] =
    useState(false);
  const userData = useSelector(AccountManageDataSelector);

  useEffect(() => {
    LoadUsersData();
  }, []);

  const openNotification = (msg) => {
    api.info({
      message: msg,
      placement: "bottomLeft",
      icon: <CheckCircleFilled style={{ fontSize: "24px", color: "green" }} />,
      duration: 3,
    });
  };

  const LoadUsersData = async () => {
    try {
      // Dispatch action 'login' với username và password
      // @ts-ignore
      await dispatch(GetAllUsersData());
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error occurred:", error.message);
    }
  };

  const selectRow = (record) => {
    if (record) {
      setSelectedItem(record);
      setUserInput(record);
    } else {
      setSelectedItem(null);
    }
  };

  // Handle close creating modal
  const handleCloseCreatingModal = () => {
    setIsOpenCreationModal(false);
    selectedItem && setSelectedItem(null);
    userInput && setUserInput(null);
  };

  // Handle submit creating modal
  const handleSubmitCreating = async () => {
    console.log(userInput);
    //@ts-ignore
    await dispatch(UpdateUserData(userInput));
    handleCloseCreatingModal();
    openNotification("Cập nhật thành công");
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

  const HandleUserInput = (event, field) => {
    setUserInput((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const HandleChangeActiveState = async () => {
    setIsClickChangeActiveState(true);
  };

  const FetchChangeActiveState = async () => {
    console.log(userInput);
    //@ts-ignore
    await dispatch(ChangeActiveState(userInput));
  };

  useEffect(() => {
    if (isClickChangeActiveState && userInput) {
      FetchChangeActiveState();
      handleCloseDeletionModal();
      openNotification("Cập nhật thành công");
      setIsClickChangeActiveState(false);
    }
  }, [userInput, isClickChangeActiveState]);

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
      <div className="main-content">
        <Input
          className="user-search-bar"
          placeholder="Nhập thông tin người dùng"
          prefix={<SearchOutlined />}
          style={{ margin: "20px 0", maxWidth: "300px" }}
        ></Input>
      </div>
      <Table
        dataSource={userData}
        onRow={(record) => ({
          onClick: () => {
            selectRow(record);
            console.log(record);
          },
        })}
      >
        <Column title="Tên tài khoản" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Ngày tạo" dataIndex="createdDate" key="createdDate" />
        <Column title="Số điện thoại" dataIndex="phone" key="phone" />
        <Column
          title="Hoạt động"
          dataIndex="active"
          key="active"
          render={(active) => (
            <Switch
              checked={active}
              onClick={() => {
                HandleChangeActiveState();
              }}
            />
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
                onClick={() => {
                  setIsOpenCreationModal(true);
                }}
              />
              {/* <Button
                icon={
                  <i
                    className="bi bi-trash"
                    onClick={() => setIsOpenDeletionModal(true)}
                  />
                }
                className="delete"
              /> */}
            </div>
          )}
        />
      </Table>

      {/* Creation modal */}
      <Modal
        title="Thông tin tài khoản"
        centered
        open={isOpenCreationModal}
        key={isOpenCreationModal ? "open" : "closed"}
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
          <Input
            defaultValue={selectedItem?.name}
            onChange={(event) => {
              HandleUserInput(event, "name");
            }}
          />
        </div>
        <div>
          <div>Email</div>
          <Input
            defaultValue={selectedItem?.email}
            onChange={(event) => {
              HandleUserInput(event, "email");
            }}
          />
        </div>
        <div>
          <div>Số điện thoại</div>
          <Input
            defaultValue={
              selectedItem?.phone == "Chưa có" ? "" : selectedItem?.phone
            }
            onChange={(event) => {
              HandleUserInput(event, "phone");
            }}
          />
        </div>
        <div>
          <div>Mật khẩu</div>
          <Input.Password
            defaultValue={selectedItem && "123456"}
            onChange={(event) => {
              HandleUserInput(event, "password");
            }}
          />
        </div>
        <div>
          <div>Xác nhận mật khẩu</div>
          <Input.Password
            defaultValue={selectedItem && "123456"}
            onChange={(event) => {
              HandleUserInput(event, "rePassword");
            }}
          />
        </div>
      </Modal>

      {/* Deletion modal */}
      <Modal
        title="Xác nhận"
        open={isOpenDeletionModal}
        onCancel={handleCloseDeletionModal}
        centered
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmitDeleting}>
            Xóa
          </Button>,
          <Button key="back" onClick={handleCloseDeletionModal}>
            Hủy
          </Button>,
        ]}
      >
        Bạn có chắc chắc muốn xóa người dùng này?
      </Modal>
      {contextHolder}
    </div>
  );
};

export default Account;
