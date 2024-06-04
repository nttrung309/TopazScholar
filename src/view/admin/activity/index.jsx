import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  Button,
  Carousel,
  Form,
  Input,
  Modal,
  Popover as AntPopover,
  Table,
  Tag,
  Select,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllActivity,
  UpdateStatus,
} from "../../../redux/activity/activityThunk";
import { ActivityDataSelector } from "../../../redux/activity/activitySelector";

const Popover = ({ record, setRecord, navigate, setOpenStatusModal, form }) => {
  return (
    <div className="action-group">
      <AntPopover
        placement="left"
        content={
          <div>
            <p
              className="item"
              onClick={() =>
                navigate("/admin/activity/edit", {
                  state: { id: record.actID },
                })
              }
            >
              Chỉnh sửa
            </p>
            <p
              className="item"
              onClick={() => {
                setOpenStatusModal(true);
                form.setFieldsValue({
                  actID: record.actID,
                  activityStatus: record.activityStatus,
                  registerStatus: record.registerStatus,
                });
              }}
            >
              Phê duyệt hoạt động
            </p>
            <p
              className="item"
              onClick={() => {
                setOpenStatusModal(true);
                form.setFieldsValue({
                  activityStatus: record.activityStatus,
                  registerStatus: record.registerStatus,
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

const Activity = () => {
  const dispatch = useDispatch();
  const activities = useSelector(ActivityDataSelector);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [record, setRecord] = useState(null);

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const activityStatus = Form.useWatch("activityStatus", form);

  const getData = (data) => {
    return data?.map((item, index) => ({ ...item, key: index + 1 }));
  };

  const getHostDate = (startDate, endDate) => {
    const startDateString = dayjs(startDate)
      .format("HH:mm - Ngày DD/MM/YYYY")
      .toString();
    if (record?.endDate)
      return (
        startDateString +
        " đến " +
        dayjs(endDate).format("HH:mm - Ngày DD/MM/YYYY").toString()
      );
    else return startDateString;
  };

  const getPartipants = (faculty, participants) => {
    if (faculty === "Tất cả" && participants === "Tất cả")
      return "Tất cả sinh viên trường";
    else if (faculty === "Tất cả" && participants !== "Tất cả")
      return (
        faculty +
        " " +
        participants.charAt(0).toLowerCase() +
        participants.slice(1)
      );
    else if (faculty !== "Tất cả" && participants === "Tất cả")
      return (
        participants +
        " sinh viên " +
        faculty?.slice(0, 1).toLowerCase() +
        faculty?.slice(1)
      );
    else return participants + " " + faculty;
  };

  useEffect(() => {
    const getAllActivity = async () => {
      try {
        // @ts-ignore
        await dispatch(GetAllActivity());
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };
    getAllActivity();
  }, [dispatch]);

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên hoạt động",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Người đăng ký",
      dataIndex: "hostName",
      key: "hostName",
      width: 200,
    },
    {
      title: "Ngày tổ chức",
      dataIndex: "time",
      key: "time",
      render: (item) => dayjs(item.startDate).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (item) => dayjs(item).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "activityStatus",
      key: "activityStatus",
      render: (status) => (
        <Tag
          key={status}
          color={
            status === "NotApprovedYet"
              ? "#0A58CA"
              : status === "NotStartYet"
              ? "#888DC2"
              : status === "NotApproved"
              ? "#dc3545"
              : status === "TakingPlace"
              ? "#007747"
              : status === "Delaying"
              ? "#FE7C1B"
              : status === "Canceled" && "#454655"
          }
        >
          {STATUS.find((item) => item.value === status).label.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "registerStatus",
      key: "registerStatus",
      render: (status) => (
        <Tag
          key={status}
          color={
            status === "Available"
              ? "#0A58CA"
              : status === "Full"
              ? "#888DC2"
              : status === "NotApproved"
              ? "#dc3545"
              : status === "TakingPlace"
              ? "#007747"
              : status === "Delaying"
              ? "#FE7C1B"
              : status === "Canceled" && "#454655"
          }
        >
          {STATUS.find((item) => item.value === status)?.label.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Popover
          record={record}
          setRecord={setRecord}
          navigate={navigate}
          setOpenStatusModal={setOpenStatusModal}
          form={form}
        />
      ),
    },
  ];

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();
      console.log(values);
      if (
        values.activityStatus === "NotStartYet" ||
        values.activityStatus === "TakingPlace"
      )
        if (!values.registerStatus) {
          message.error("Vui lòng chọn tình trạng đăng ký");
          return;
        }

      // @ts-ignore
      await dispatch(UpdateStatus({ ...values, actID: record.actID }));
      setOpenStatusModal(false);
      form.resetFields();
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    if (activityStatus === "NotStartYet" || activityStatus === "TakingPlace")
      return;
    if (activityStatus !== "NotStartYet" && activityStatus !== "TakingPlace") {
      form.setFieldValue("registerStatus", null);
    }
  }, [activityStatus]);

  return (
    <div className="account">
      <div className="page-title">
        <div className="title-icon">
          <i className="bi bi-lightning-fill" />
        </div>
        <div className="title-name">Quản lý hoạt động</div>
        <Button
          icon={<i className="bi bi-plus" />}
          type="primary"
          onClick={() => navigate("/admin/activity/create")}
        >
          Tạo hoạt động
        </Button>
      </div>
      <Table
        style={{
          wordWrap: "break-word",
          wordBreak: "break-word",
          marginTop: 40,
        }}
        columns={columns}
        dataSource={getData(activities)}
        onRow={(record) => {
          return {
            onDoubleClick: async () => {
              setRecord(record);
              setOpenDetailModal(true);
            },
          };
        }}
      />

      {/* Modal update status */}
      <Modal
        title="Cập nhật trạng thái"
        centered
        open={openStatusModal}
        key={openStatusModal ? "open" : "closed"}
        okText="Lưu"
        onOk={handleSubmitStatus}
        onCancel={() => setOpenStatusModal(false)}
        destroyOnClose
      >
        <Form
          form={form}
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
            <Select options={STATUS.slice(0, 6)} />
          </Form.Item>

          <Form.Item
            name="registerStatus"
            label="Tình trạng đăng ký"
            dependencies={["activityStatus"]}
          >
            <Select
              options={STATUS.slice(6, 8)}
              disabled={
                activityStatus === "NotStartYet" ||
                activityStatus === "TakingPlace"
                  ? false
                  : true
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal view details */}
      <Modal
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
            {record?.mediaContent?.images?.map((path) => (
              <img alt="Activity" src={"http://localhost:5000/" + path} />
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
          value={getHostDate(record?.time?.startDate, record?.time?.endDate)}
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
              value={
                STATUS.find((item) => item.value === record?.activityStatus)
                  ?.label
              }
              readOnly
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div className="label">Tình trạng đăng ký</div>
            <Input
              size="large"
              value={
                STATUS.find((item) => item.value === record?.registerStatus)
                  ?.label
              }
              readOnly
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Activity;

const STATUS = [
  {
    value: "NotApprovedYet",
    label: "Chờ phê duyệt",
  },
  {
    value: "NotApproved",
    label: "Từ chối",
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
    value: "Available",
    label: "Mở đăng ký",
  },
  {
    value: "Full",
    label: "Đóng đăng ký",
  },
];
