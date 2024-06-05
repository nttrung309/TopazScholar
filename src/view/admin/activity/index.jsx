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
  UpdateHaft,
} from "../../../redux/activity/activityThunk";
import { ActivityDataSelector } from "../../../redux/activity/activitySelector";
import { UpdateHostByActId } from "../../../redux/host/hostThunk";
import { AuthUIDSelector } from "../../../redux/auth/userSelector";

const Popover = ({
  record,
  setRecord,
  navigate,
  setOpenStatusModal,
  setOpenApproveModal,
  form,
}) => {
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
                setOpenApproveModal(true);
                form.setFieldsValue({
                  regStatus: record.regStatus,
                  denyReason: record.denyReason,
                  adminNote: record.adminNote,
                });

                setRecord(record);
              }}
            >
              Phê duyệt hoạt động
            </p>
            <p
              className="item"
              onClick={() => {
                setOpenStatusModal(true);
                form.setFieldsValue({
                  activityStatus:
                    record?.activityStatus === "Undefined"
                      ? null
                      : record?.activityStatus,
                  registerStatus:
                    record?.registerStatus === "Undefined"
                      ? null
                      : record?.registerStatus,
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
  const userID = useSelector(AuthUIDSelector);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [record, setRecord] = useState(null);

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const activityStatus = Form.useWatch("activityStatus", form);
  const regStatus = Form.useWatch("regStatus", form);

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
    if (
      faculty?.indexOf("Tất cả") !== -1 &&
      participants?.indexOf("Tất cả") !== -1
    )
      return "Tất cả sinh viên trường";
    else
      return (
        "Sinh viên năm " +
        participants?.join(", ") +
        " - Khoa " +
        faculty?.join(", ")
      );

    // else if (faculty === "Tất cả" && participants !== "Tất cả")
    //   return (
    //     faculty +
    //     " " +
    //     participants.charAt(0).toLowerCase() +
    //     participants.slice(1)
    //   );
    // else if (faculty !== "Tất cả" && participants === "Tất cả")
    //   return (
    //     participants +
    //     " sinh viên " +
    //     faculty?.slice(0, 1).toLowerCase() +
    //     faculty?.slice(1)
    //   );
    // else return participants + " " + faculty;
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
      render: (item) => dayjs(item).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "regDate",
      key: "regDate",
      render: (item) => dayjs(item).format("DD/MM/YYYY"),
    },
    {
      title: "Tình trạng đơn đăng ký",
      dataIndex: "regStatus",
      key: "regStatus",
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
          {STATUS.find((item) => item.value === status).label.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "activityStatus",
      key: "activityStatus",
      render: (status) => (
        <Tag
          key={status}
          color={
            status === "TakingPlace"
              ? "#0A58CA"
              : status === "Finished"
              ? "#888DC2"
              : status === "NotStartYet"
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
      title: "Trạng thái đăng ký",
      dataIndex: "registerStatus",
      key: "registerStatus",
      render: (status) => (
        <Tag
          key={status}
          color={
            status === "Available" ? "#0A58CA" : status === "Full" && "#888DC2"
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
          setOpenApproveModal={setOpenApproveModal}
          form={form}
        />
      ),
    },
  ];

  const handleSubmitStatus = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      // @ts-ignore
      // prettier-ignore
      const result = await dispatch(UpdateHaft({ ...values, actID: record.actID }));
      // setOpenStatusModal(false);
      // form.resetFields();
      if (result.status === "Success")
        message.success("Cập nhật thông tin thành công!");
      else if (result.status === "Error") message.error("Có lỗi xảy ra!");
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleSubmitApprove = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      // @ts-ignore
      // prettier-ignore
      const result = await dispatch(UpdateHostByActId({ ...values, actID: record.actID, adminID: userID }));
      setOpenApproveModal(false);
      form.resetFields();
      if (result.status === "Success")
        message.success("Cập nhật thông tin thành công!");
      else if (result.status === "Error") message.error("Có lỗi xảy ra!");
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    if (activityStatus === "Finished")
      form.setFieldValue("registerStatus", "Full");
    else if (
      activityStatus === "NotStartYet" ||
      activityStatus === "TakingPlace"
    )
      return;
    else if (
      activityStatus !== "NotStartYet" &&
      activityStatus !== "TakingPlace"
    ) {
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
              setRecord({
                ...record,
                activityStatus:
                  record.activityStatus === "Undefined"
                    ? "Đơn đăng ký chưa được duyệt"
                    : STATUS.find(
                        (item) => item.value === record.activityStatus
                      )?.label,
                registerStatus:
                  record.registerStatus === "Undefined"
                    ? "Đơn đăng ký chưa được duyệt"
                    : STATUS.find(
                        (item) => item.value === record.registerStatus
                      )?.label,
              });
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
      </Modal>

      {/* Modal approve actvity */}
      <Modal
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
      </Modal>
    </div>
  );
};

export default Activity;

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
