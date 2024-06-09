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

const Popover = ({
  record,
  form,
  setRecord,
  setOpenUpdateSupply,
  getAllSupplyTypes,
  setOpenStatusModal,
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
                  typeID: record.typeName,
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
                form.setFieldsValue({
                  name: record.name,
                  address: record.address,
                  typeID: record.typeName,
                });
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
  // const result = useSelector(ExcuteSupplyTypeState);

  const [openAddSupply, setOpenAddSupply] = useState(false);
  const [openUpdateSupply, setOpenUpdateSupply] = useState(false);
  const [openAddType, setOpenAddType] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [record, setRecord] = useState(false);

  const [form] = Form.useForm();

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

    getAllSupply();
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
      title: "Ngày sử dụng cuối",
      dataIndex: "lastUser",
      key: "lastUser",
      render: (value) => {
        return value;
      },
    },
    {
      title: "Người sử dụng cuối",
      dataIndex: "lastUsedDate",
      key: "lastUsedDate",
    },
    {
      title: "Người phê duyệt cuối",
      dataIndex: "lastAdmin",
      key: "lastAdmin",
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

  const handleSubmitType = async () => {
    try {
      const values = await form.validateFields();
      // @ts-ignore
      dispatch(CreateSupplyType(values));
      if (typeResult?.status === "Success")
        message.success("Tạo mới thành công!");
      else if (typeResult?.status === "Error") message.error("Có lỗi xảy ra!");
      else if (typeResult?.status === "Existed")
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
      dispatch(CreateSupply(values));
      console.log(supplyResult);
      if (supplyResult?.status === "Success")
        message.success("Tạo mới thành công!");
      else if (supplyResult?.status === "Error")
        message.error("Có lỗi xảy ra!");

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
      // console.log(supplyResult);
      // if (supplyResult?.status === "Success")
      //   message.success("Tạo mới thành công!");
      // else if (supplyResult?.status === "Error")
      //   message.error("Có lỗi xảy ra!");

      // setOpenAddSupply(false);
      // form.resetFields();
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleSubmitStatus = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      // @ts-ignore
      // dispatch(CreateSupply(values));
      // console.log(supplyResult);
      // if (supplyResult?.status === "Success")
      //   message.success("Tạo mới thành công!");
      // else if (supplyResult?.status === "Error")
      //   message.error("Có lỗi xảy ra!");

      // setOpenAddSupply(false);
      // form.resetFields();
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="account">
      <div className="page-title">
        <div className="title-icon">
          <i className="bi bi-lightning-fill" />
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
        // onRow={(record) => {
        //   return {
        //     onDoubleClick: async () => {
        //       setRecord({
        //         ...record,
        //         activityStatus:
        //           record.activityStatus === "Undefined"
        //             ? "Đơn đăng ký chưa được duyệt"
        //             : STATUS.find(
        //                 (item) => item.value === record.activityStatus
        //               )?.label,
        //         registerStatus:
        //           record.registerStatus === "Undefined"
        //             ? "Đơn đăng ký chưa được duyệt"
        //             : STATUS.find(
        //                 (item) => item.value === record.registerStatus
        //               )?.label,
        //       });
        //       setOpenDetailModal(true);
        //     },
        //   };
        // }}
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
          <Form.Item
            name="activityStatus"
            label="Trạng thái hoạt động"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạng thái hoạt động!",
              },
            ]}
          >
            <Select options={STATUS.slice(3, 8)} />
          </Form.Item>
          <Form.Item name="registerStatus" label="Trạng thái đăng ký">
            <Select
              placeholder="Chọn tình trạng đăng ký"
              options={STATUS.slice(8, 10)}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal approve actvity */}
      {/* <Modal
        title="Phê duyệt hoạt động"
        centered
        open={openApproveModal}
        key={openApproveModal ? "openApprove" : "closedApprove"}
        okText="Lưu"
        onOk={form.submit}
        onCancel={() => {
          setOpenApproveModal(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleSubmitApprove}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item name="regStatus" label="Tình trạng đơn đăng ký">
            <Select
              options={[
                {
                  value: "Approved",
                  label: "Phê duyệt",
                },
                {
                  value: "Denied",
                  label: "Từ chối",
                },
                {
                  value: "Waiting",
                  label: "Chờ phê duyệt",
                },
              ]}
            />
          </Form.Item>
          {regStatus === "Denied" && (
            <Form.Item
              name="denyReason"
              label="Lý do từ chối"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lý do từ chối!",
                },
              ]}
            >
              <Input.TextArea
                autoSize={{ minRows: 1 }}
                placeholder="Lý do từ chối"
              />
            </Form.Item>
          )}
          <Form.Item name="adminNote" label="Lưu ý từ người phê duyệt">
            <Input.TextArea
              autoSize={{ minRows: 1 }}
              placeholder="Lưu ý từ người phê duyệt"
            />
          </Form.Item>
        </Form>
      </Modal> */}

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
