import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Tag,
} from "antd";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllActivity,
  HostActivity,
} from "../../../redux/activity/activityThunk";
import { AuthUIDSelector } from "../../../redux/auth/userSelector";
import { ActivityDataSelector } from "../../../redux/activity/activitySelector";

const { TextArea } = Input;

const Activity = () => {
  const dispatch = useDispatch();
  const userID = useSelector(AuthUIDSelector);
  const activities = useSelector(ActivityDataSelector);

  const [openCreatingModal, setOpenCreatingModal] = useState(false);
  const [activity, setActivity] = useState(null);
  const [typeModal, setTypeModal] = useState(null);
  const [form] = Form.useForm();
  const formValue = Form.useWatch("form", form);

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
  }, []);

  const handleSubmitActivity = async () => {
    try {
      const values = await form.validateFields();
      // @ts-ignore
      //prettier-ignore
      await dispatch(HostActivity({ ...values, userID: userID }));
      setOpenCreatingModal(false);
      form.resetFields();
    } catch (error) {
      console.log("Failed:", error);
    }
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const openAddModal = () => {
    setOpenCreatingModal(true);
    setTypeModal("add");
    setActivity({
      name: "",
      content: "",
      category: null,
      startDate: "",
      endDate: "",
      form: null,
      address: "",
      linkJoin: "",
      faculty: null,
      participants: null,
      maxParticipants: null,
      rule: "",
      activityStatus: "NotApproved",
      registerStatus: "Available",
    });
  };

  const deleteActivity = () => {};

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
    // {
    //   title: "Nội dung",
    //   dataIndex: "content",
    //   key: "content",
    //   width: 340,
    // },
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
      title: "Tình trạng",
      dataIndex: "activityStatus",
      key: "dateCreated",
      render: (status) => (
        <Tag key={status} color={status === "NotStartYet" && "blue"}>
          {status === "NotStartYet" && "Sắp diễn ra".toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "",
      key: "action",
      render: () => (
        <div className="action-group">
          <Button
            icon={<i className="bi bi-pencil-square" />}
            className="edit"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="account">
      <div className="page-title">
        <div className="title-icon">
          <i className="bi bi-person-fill" />
        </div>
        <div className="title-name">Quản lý hoạt động</div>
        <Button
          icon={<BsPlus size={24} />}
          type="primary"
          onClick={openAddModal}
        >
          Tạo hoạt động
        </Button>
      </div>
      <div className="main-content" style={{ marginTop: 40 }}></div>
      <Table
        style={{
          wordWrap: "break-word",
          wordBreak: "break-word",
        }}
        columns={columns}
        dataSource={activities}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              // @ts-ignore
              setActivity({ ...record });
              setTypeModal("view");
              setOpenCreatingModal(true);
            },
          };
        }}
      />

      <Modal
        title="Thông tin hoạt động"
        centered
        open={openCreatingModal}
        key={openCreatingModal ? "open" : "closed"}
        onOk={handleSubmitActivity}
        okText="Tạo hoạt động"
        cancelText="Hủy"
        onCancel={() => setOpenCreatingModal(false)}
        okButtonProps={{
          autoFocus: true,
        }}
        destroyOnClose
        footer={typeModal === "view" && null}
      >
        <Form
          form={form}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          size="large"
          initialValues={activity}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên hoạt động!",
              },
            ]}
          >
            <Input
              placeholder="Tên hoạt động"
              readOnly={typeModal === "view" && true}
            />
          </Form.Item>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung hoạt động!",
              },
            ]}
          >
            <TextArea
              showCount
              maxLength={2000}
              autoSize={{ minRows: 4 }}
              placeholder="Nội dung hoặc mô tả về hoạt động"
              readOnly={typeModal === "view" && true}
            />
          </Form.Item>
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại hoạt động!",
              },
            ]}
          >
            <Select
              placeholder="Chọn loại hoạt động"
              options={[
                {
                  value: "Học thuật",
                  label: "Học thuật",
                },
                {
                  value: "Thể thao",
                  label: "Thể thao",
                },
                {
                  value: "Việc làm",
                  label: "Việc làm",
                },
                {
                  value: "Tình nguyện",
                  label: "Tình nguyện",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian tổ chức!",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 10px)",
              }}
            >
              <DatePicker
                showTime={{
                  format: "HH:mm",
                }}
                placeholder={"Thời gian bắt đầu"}
                format="DD/MM/YYYY HH:mm"
                // disabledDate={disabledDate}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="endDate"
              style={{
                display: "inline-block",
                width: "calc(50% - 10px)",
                marginLeft: "20px",
              }}
            >
              <DatePicker
                showTime={{
                  format: "HH:mm",
                }}
                placeholder={"Thời gian kết thúc"}
                format="DD/MM/YYYY HH:mm"
                // disabledDate={disabledDate}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="form"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập hình thức tổ chức hoạt động!",
              },
            ]}
          >
            <Select
              placeholder="Chọn hình thức tổ chức hoạt động"
              options={[
                {
                  value: "Trực tiếp",
                  label: "Trực tiếp",
                },
                {
                  value: "Online",
                  label: "Online",
                },
              ]}
            />
          </Form.Item>  
          {formValue === "Trực tiếp" ? (
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa điểm tổ chức!",
                },
              ]}
            >
              <Input
                placeholder="Địa điểm tổ chức"
                readOnly={typeModal === "view" && true}
              />
            </Form.Item>
          ) : (
            formValue === "Online" && (
              <Form.Item
                name="linkJoin"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập liên kết tham gia!",
                  },
                  {
                    type: "url",
                    warningOnly: true,
                  },
                ]}
              >
                <Input
                  placeholder="Liên kết tham gia sự kiện"
                  readOnly={typeModal === "view" && true}
                />
              </Form.Item>
            )
          )}
          <Form.Item
            label="Đối tượng tham gia"
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name={"faculty"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đối tượng tham gia!",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(60% - 10px)",
              }}
            >
              <Select
                placeholder="Chọn khoa"
                options={[
                  {
                    value: "Tất cả",
                    label: "Tất cả",
                  },
                  {
                    value: "Khoa học máy tính",
                    label: "Khoa học máy tính",
                  },
                  {
                    value: "Công nghệ phần mềm",
                    label: "Công nghệ phần mềm",
                  },
                  {
                    value: "Kỹ thuật máy tính",
                    label: "Kỹ thuật máy tính",
                  },
                  {
                    value: "Hệ thống thông tin",
                    label: "Hệ thống thông tin",
                  },
                  {
                    value: "Mạng máy tính và truyền thông",
                    label: "Mạng máy tính và truyền thông",
                  },
                  {
                    value: "Khoa học và Kỹ thuật Thông tin",
                    label: "Khoa học và Kỹ thuật Thông tin",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name={"participants"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đối tượng tham gia!",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(40% - 10px)",
                marginLeft: "20px",
              }}
            >
              <Select
                placeholder="Chọn năm"
                options={[
                  {
                    value: "Tất cả",
                    label: "Tất cả",
                  },
                  {
                    value: "Năm 1",
                    label: "Năm 1",
                  },
                  {
                    value: "Năm 2",
                    label: "Năm 2",
                  },
                  {
                    value: "Năm 3",
                    label: "Năm 3",
                  },
                  {
                    value: "Năm 4",
                    label: "Năm 4",
                  },
                ]}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="maxParticipants"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng tham gia tối đa!",
              },
            ]}
          >
            <InputNumber
              placeholder="Số lượng tham gia tối đa"
              min={1}
              style={{
                width: "100%",
              }}
              readOnly={typeModal === "view" && true}
            />
          </Form.Item>

          <Form.Item name="rule">
            <TextArea
              showCount
              maxLength={500}
              autoSize={{ minRows: 1 }}
              placeholder="Quy định tham gia"
            />
          </Form.Item>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name="activityStatus"
              label="Trạng thái hoạt động"
              style={{
                display: "inline-block",
                width: "calc(50% - 10px)",
              }}
            >
              <Select
                options={[
                  {
                    value: "NotApproved",
                    label: "Chưa phê duyệt",
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
                ]}
              />
            </Form.Item>
            <Form.Item
              name="registerStatus"
              label="Tình trạng đăng ký"
              style={{
                display: "inline-block",
                width: "calc(50% - 10px)",
                marginLeft: "20px",
              }}
            >
              <Select
                placeholder="Chọn tình trạng đăng ký"
                options={[
                  {
                    value: "Available",
                    label: "Đang mở",
                  },
                  {
                    value: "Full",
                    label: "Đã đóng",
                  },
                ]}
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Activity;
