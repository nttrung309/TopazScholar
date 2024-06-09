import {
  Button,
  Form,
  Input,
  Modal,
  Popover as AntPopover,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ExcuteSupplyState,
  SupplyDataSelector,
} from "../../../redux/admin/supply/SupplySelector";
import {
  CreateSupply,
  GetAllSupplies,
  UpdateSupply,
} from "../../../redux/admin/supply/SupplyThunk";
import {
  CreateSupplyType,
  GetAllSupplyTypes,
} from "../../../redux/admin/supplyType/supplyTypeThunk";
import {
  ExcuteSupplyTypeState,
  SupplyTypeDataSelector,
} from "../../../redux/admin/supplyType/supplyTypeSelector";
import { AuthUIDSelector } from "../../../redux/auth/userSelector";
import { AccountManageDataSelector } from "../../../redux/admin/account/accountManageSelector";
import { GetAllUsersData } from "../../../redux/admin/account/accountManageThunk";
import dayjs from "dayjs";

const Popover = ({
  record,
  form,
  setRecord,
  setOpenUpdateSupply,
  setOpenStatusModal,
  getAllSupplyTypes,
  getUsersAsOptions,
}) => {
  return (
    <div className="action-group">
      <AntPopover
        placement="left"
        content={
          <div>
            <p
              className="item"
              onClick={() => {
                setOpenUpdateSupply(true);
                getAllSupplyTypes();
                form.setFieldsValue({
                  name: record.name,
                  address: record.address,
                  typeID: record.typeID,
                });
                setRecord(record);
              }}
            >
              Chỉnh sửa
            </p>
            <p
              className="item"
              onClick={() => {
                setOpenStatusModal(true);
                getUsersAsOptions();
                form.setFieldsValue({
                  name: record.name,
                  status: record.status,
                  lastUsedDate: "",
                  lastUser: "",
                  lastAdmin: "",
                });
                setRecord(record);
              }}
            >
              Cập nhật trạng thái
            </p>
          </div>
        }
      >
        <Button
          icon={<i className="bi bi-three-dots-vertical" />}
          className="edit"
        />
      </AntPopover>
    </div>
  );
};

const Supply = () => {
  const dispatch = useDispatch();
  const supplies = useSelector(SupplyDataSelector);
  const types = useSelector(SupplyTypeDataSelector);
  const typeResult = useSelector(ExcuteSupplyTypeState);
  const supplyResult = useSelector(ExcuteSupplyState);
  const userID = useSelector(AuthUIDSelector);
  const users = useSelector(AccountManageDataSelector);

  const [openAddSupply, setOpenAddSupply] = useState(false);
  const [openUpdateSupply, setOpenUpdateSupply] = useState(false);
  const [openAddType, setOpenAddType] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [record, setRecord] = useState(false);

  const [form] = Form.useForm();
  const statusValue = Form.useWatch("status", form);

  const getData = (data) => {
    return data?.map((item, index) => ({ ...item, key: index + 1 }));
  };

  useEffect(() => {
    const getAllSupply = async () => {
      try {
        // @ts-ignore
        await dispatch(GetAllSupplies());
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };

    const getAllUSer = async () => {
      try {
        // @ts-ignore
        await dispatch(GetAllUsersData());
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };

    getAllSupply();
    getAllUSer();
  }, []);

  const getAllSupplyTypes = async () => {
    try {
      // @ts-ignore
      await dispatch(GetAllSupplyTypes());
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên vật dụng",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Vị trí",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Loại",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          key={status}
          color={
            status === "Available"
              ? "#0A58CA"
              : status === "Used"
              ? "#007747"
              : status === "Broken" && "#dc3545"
          }
        >
          {STATUS.find((item) => item.value === status)?.label.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Người sử dụng cuối",
      dataIndex: "lastUser",
      key: "lastUser",
      render: (value) => users.find((item) => item.uid === value)?.name,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "lastUpdateDate",
      key: "lastUsedDate",
      render: (item) => dayjs(item).format("DD/MM/YYYY"),
    },
    {
      title: "Người phê duyệt cuối",
      dataIndex: "lastAdmin",
      key: "lastAdmin",
      render: (value) => users.find((item) => item.uid === value)?.name,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Popover
          record={record}
          form={form}
          setRecord={setRecord}
          getAllSupplyTypes={getAllSupplyTypes}
          getUsersAsOptions={getUsersAsOptions}
          setOpenUpdateSupply={setOpenUpdateSupply}
          setOpenStatusModal={setOpenStatusModal}
        />
      ),
    },
  ];

  const getTypesAsOptions = (types) => {
    return types?.map((item) => ({
      label: item.name,
      value: item.typeID,
    }));
  };

  const getUsersAsOptions = (user) => {
    return user?.map((item) => ({
      label: item.name,
      value: item.uid,
    }));
  };

  const handleSubmitType = async () => {
    try {
      const values = await form.validateFields();
      // @ts-ignore
      dispatch(CreateSupplyType(values));
      if (typeResult?.status === "Success")
        message.success("Tạo mới thành công!");
      else if (typeResult === "Error") message.error("Có lỗi xảy ra!");
      else if (typeResult === "Existed")
        message.error("Thông tin này đã tồn tại!");

      setOpenAddType(false);
      form.resetFields();
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleSubmitSupply = async () => {
    try {
      const values = await form.validateFields();
      // @ts-ignore
      //prettier-ignore
      dispatch(CreateSupply({ ...values, lastAdmin: userID, lastUser: userID }));
      console.log(supplyResult);
      if (supplyResult === "Success") message.success("Tạo mới thành công!");
      else if (supplyResult === "Error") message.error("Có lỗi xảy ra!");

      setOpenAddSupply(false);
      form.resetFields();
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleUpdateSupply = async () => {
    try {
      const values = await form.validateFields();
      // @ts-ignore
      dispatch(UpdateSupply({ ...values, supplyID: record.supplyID }));
      console.log(supplyResult);
      if (supplyResult === "Success") message.success("Tạo mới thành công!");
      else if (supplyResult === "Error") message.error("Có lỗi xảy ra!");

      setOpenUpdateSupply(false);
      form.resetFields();
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleSubmitStatus = async () => {
    try {
      const values = await form.validateFields();
      // @ts-ignore
      // prettier-ignore
      dispatch(UpdateSupply({ ...values, supplyID: record.supplyID , lastAdmin: userID,}));

      if (supplyResult === "Success") message.success("Tạo mới thành công!");
      else if (supplyResult === "Error") message.error("Có lỗi xảy ra!");

      setOpenStatusModal(false);
      form.resetFields();
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="account">
      <div className="page-title">
        <div className="title-icon">
          <i className="bi bi-plug-fill" />
        </div>
        <div className="title-name">Quản lý vật dụng</div>
        <Button
          icon={<i className="bi bi-plus" />}
          type="primary"
          onClick={() => {
            getAllSupplyTypes();
            setOpenAddSupply(true);
          }}
        >
          Tạo vật dụng
        </Button>
        <Button
          icon={<i className="bi bi-plus" />}
          type="primary"
          onClick={() => setOpenAddType(true)}
        >
          Tạo loại vật dụng
        </Button>
      </div>

      <Table
        style={{
          wordWrap: "break-word",
          wordBreak: "break-word",
          marginTop: 40,
        }}
        columns={columns}
        dataSource={getData(supplies)}
      />

      {/* Modal update status */}
      <Modal
        title="Cập nhật trạng thái"
        centered
        open={openStatusModal}
        key={openStatusModal ? "openStatus" : "closedStatus"}
        okText="Lưu"
        onOk={form.submit}
        onCancel={() => {
          setOpenStatusModal(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleSubmitStatus}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item name="name" label="Tên vật dụng">
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạng thái vật dụng!",
              },
            ]}
          >
            <Select options={STATUS} />
          </Form.Item>
          {statusValue === "Used" && (
            <Form.Item
              name="lastUser"
              label="Họ tên người mượn"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn họ tên người mượn!",
                },
              ]}
            >
              <Select options={getUsersAsOptions(users)} />
            </Form.Item>
          )}
        </Form>
      </Modal>

      {/* Modal add type */}
      <Modal
        title="Thông tin loại vật dụng"
        centered
        open={openAddType}
        key={openAddType ? "openAddType" : "closedAddType"}
        okText="Lưu"
        onOk={form.submit}
        onCancel={() => {
          setOpenAddType(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleSubmitType}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="name"
            label="Tên loại vật dụng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên loại vật dụng !",
              },
            ]}
          >
            <Input size="large" placeholder="Tên loại vật dụng" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal add supply */}
      <Modal
        title="Thông tin vật dụng"
        centered
        open={openAddSupply}
        key={openAddSupply ? "openAdd" : "closedAdd"}
        okText="Lưu"
        onOk={form.submit}
        onCancel={() => {
          setOpenAddSupply(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleSubmitSupply}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="name"
            label="Tên vật dụng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên vật dụng !",
              },
            ]}
          >
            <Input size="large" placeholder="Tên vật dụng" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Vị trí lưu trữ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vị trí vật dụng !",
              },
            ]}
          >
            <Input size="large" placeholder="Vị trí" />
          </Form.Item>
          <Form.Item
            name="typeID"
            label="Loại vật dụng"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại vật dụng!",
              },
            ]}
          >
            <Select
              options={getTypesAsOptions(types)}
              placeholder="Chọn loại vật dụng"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal update supply */}
      <Modal
        title="Thông tin vật dụng"
        centered
        open={openUpdateSupply}
        key={openUpdateSupply ? "openUpdate" : "closedUpdate"}
        okText="Lưu"
        onOk={form.submit}
        onCancel={() => {
          setOpenUpdateSupply(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleUpdateSupply}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="name"
            label="Tên vật dụng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên vật dụng !",
              },
            ]}
          >
            <Input size="large" placeholder="Tên vật dụng" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Vị trí lưu trữ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vị trí vật dụng !",
              },
            ]}
          >
            <Input size="large" placeholder="Vị trí" />
          </Form.Item>
          <Form.Item
            name="typeID"
            label="Loại vật dụng"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại vật dụng!",
              },
            ]}
          >
            <Select
              options={getTypesAsOptions(types)}
              placeholder="Chọn loại vật dụng"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Supply;

const STATUS = [
  {
    value: "Broken",
    label: "Đã hỏng",
  },
  {
    value: "Used",
    label: "Đang được mượn",
  },
  {
    value: "Available",
    label: "Có sẵn",
  },
];
