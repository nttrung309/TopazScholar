import {
  Button,
  Form,
  Input,
  Modal,
  Popover,
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
} from "../../../redux/admin/supply/SupplyThunk";
import {
  CreateSupplyType,
  GetAllSupplyTypes,
} from "../../../redux/admin/supplyType/supplyTypeThunk";
import {
  ExcuteSupplyTypeState,
  SupplyTypeDataSelector,
} from "../../../redux/admin/supplyType/supplyTypeSelector";

const Supply = () => {
  const dispatch = useDispatch();
  const supplies = useSelector(SupplyDataSelector);
  const types = useSelector(SupplyTypeDataSelector);

  const typeResult = useSelector(ExcuteSupplyTypeState);
  const supplyResult = useSelector(ExcuteSupplyState);
  // const result = useSelector(ExcuteSupplyTypeState);

  const [openAddSupply, setOpenAddSupply] = useState(false);
  const [openAddType, setOpenAddType] = useState(false);

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

    const getAllSupplyTypes = async () => {
      try {
        // @ts-ignore
        await dispatch(GetAllSupplyTypes());
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };

    getAllSupply();
    getAllSupplyTypes();
  }, []);

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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          key={status}
          color={
            status === "Waiting"
              ? "#0A58CA"
              : status === "Approved"
              ? "#007747"
              : status === "Denied" && "#dc3545"
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
    // {
    //   title: "",
    //   key: "action",
    //   render: (_, record) => (
    //     <Popover
    //       record={record}
    //       setRecord={setRecord}
    //       navigate={navigate}
    //       setOpenStatusModal={setOpenStatusModal}
    //       setOpenApproveModal={setOpenApproveModal}
    //       form={form}
    //     />
    //   ),
    // },
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
      else if (supplyResult?.status === "Existed")
        message.error("Thông tin này đã tồn tại!");

      setOpenAddSupply(false);
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
          <i className="bi bi-lightning-fill" />
        </div>
        <div className="title-name">Quản lý vật dụng</div>
        <Button
          icon={<i className="bi bi-plus" />}
          type="primary"
          onClick={() => setOpenAddSupply(true)}
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
        // dataSource={getData(supplies)}
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
      {/* <Modal
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
              disabled={
                activityStatus === "NotStartYet" ||
                activityStatus === "TakingPlace"
                  ? false
                  : true
              }
            />
          </Form.Item>
        </Form>
      </Modal> */}

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

      {/* Modal view details */}
      {/* <Modal
        title="Thông tin hoạt động"
        centered
        footer={null}
        open={openDetailModal}
        key={openDetailModal ? "openDetail" : "closedDetail"}
        onCancel={() => setOpenDetailModal(false)}
        destroyOnClose
        width={800}
      >
        {record?.mediaContent?.images?.length > 1 ? (
          <Carousel
            fade
            arrows
            prevArrow={<BsChevronLeft size={32} />}
            nextArrow={<BsChevronRight size={40} />}
            infinite={false}
          >
            {record?.mediaContent?.images?.map((path, index) => (
              <img
                key={index}
                alt="Activity"
                src={"http://localhost:5000/" + path}
              />
            ))}
          </Carousel>
        ) : (
          <img alt="Activity" src={record?.mediaContent?.images[0]} />
        )}
        <div className="label" style={{ marginTop: 0 }}>
          Tên hoạt động
        </div>
        <Input value={record?.name} size="large" readOnly />
        <div className="label">Nội dung</div>
        <Input.TextArea
          showCount
          maxLength={2000}
          autoSize={{ minRows: 4, maxRows: 6 }}
          size="large"
          value={record?.content}
          readOnly
        />
        <div className="label">Loại hoạt động</div>
        <Input size="large" value={record?.category} readOnly />
        <div className="label">Thời gian tổ chức</div>
        <Input
          size="large"
          value={getHostDate(record?.startDate, record?.endDate)}
          readOnly
        />
        <div className="label">Hình thức</div>
        <Input size="large" value={record?.form} />
        {record?.form === "Trực tiếp" ? (
          <>
            <div className="label">Địa điểm</div>
            <Input size="large" value={record?.address} readOnly />
          </>
        ) : (
          record?.form === "Online" && (
            <Input size="large" value={record?.linkJoin} readOnly />
          )
        )}
        <div className="label">Đối tượng tham gia</div>
        <Input
          size="large"
          value={getPartipants(record?.faculty, record?.participants)}
          readOnly
        />
        <div className="label">Số lượng tối đa</div>
        <Input size="large" value={record?.maxParticipants} readOnly />
        <div className="label">Quy định</div>
        <Input.TextArea
          size="large"
          autoSize={{ minRows: 1 }}
          readOnly
          value={record?.rule}
        />
        <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div className="label">Trạng thái hoạt động</div>
            <Input
              size="large"
              value={record?.activityStatus}
              readOnly
              disabled={
                record?.activityStatus === "Đơn đăng ký chưa được duyệt"
              }
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div className="label">Trạng thái đăng ký</div>
            <Input
              size="large"
              value={record?.registerStatus}
              readOnly
              disabled={
                record?.activityStatus === "Đơn đăng ký chưa được duyệt"
              }
            />
          </div>
        </div>
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
    </div>
  );
};

export default Supply;

const STATUS = [
  {
    value: "Approved",
    label: "Đã phê duyệt",
  },
  {
    value: "Denied",
    label: "Đã từ chối",
  },
  {
    value: "Waiting",
    label: "Chờ phê duyệt",
  },
  {
    value: "NotStartYet",
    label: "Chưa bắt đầu",
  },
  {
    value: "TakingPlace",
    label: "Đang diễn ra",
  },
  {
    value: "Delaying",
    label: "Tạm hoãn",
  },
  {
    value: "Canceled",
    label: "Bị hủy",
  },
  {
    value: "Finished",
    label: "Đã kết thúc",
  },
  {
    value: "Available",
    label: "Mở đăng ký",
  },
  {
    value: "Full",
    label: "Đóng đăng ký",
  },
];
