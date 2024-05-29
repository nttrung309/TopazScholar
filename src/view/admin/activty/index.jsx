import React, { useState } from "react";
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
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { HostActivity } from "../../../redux/activity/activityThunk";
import { AuthUIDSelector } from "../../../redux/auth/userSelector";
const data = [
  {
    key: "1",
    name: "UIT Job Fair 2023",
    user: "Nguyễn Ngọc Trinh",
    hostDate: "03/12/2023",
    registerDate: "12/11/2023",
    status: "Đã kết thúc",
  },
  {
    key: "2",
    name: "Tháng hành động thanh niên",
    user: "Nguyễn Thành Trung",
    hostDate: "26/03/2024",
    registerDate: "20/03/2024",
    status: "Đã kết thúc",
  },
  {
    key: "3",
    name: "Cuộc thi tìm hiểu về lịch sử",
    user: "Nguyễn Ngọc Trinh",
    hostDate: "20/03/2024",
    registerDate: "12/03/2024",
    status: "Đã kết thúc",
  },
  {
    key: "4",
    name: "Thủ lĩnh sinh viên 2024",
    user: "Nguyễn Thành Trung",
    hostDate: "20/05/2024",
    registerDate: "10/05/2023",
    status: "Sắp diễn ra",
  },
];

const { Column } = Table;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Activity = () => {
  const [openCreatingModal, setOpenCreatingModal] = useState(false);
  const [activity, setActivity] = useState(null);
  const dispatch = useDispatch();
  const userID = useSelector(AuthUIDSelector);
  const [form] = Form.useForm();
  const formValue = Form.useWatch("form", form);

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
      activityStatus: "NotStartYet",
      registerStatus: "Available",
    });
  };

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
      <Table dataSource={data}>
        <Column title="#" dataIndex="key" key="key" />
        <Column title="Tên hoạt động" dataIndex="name" key="name" />
        <Column title="Người đăng ký" dataIndex="user" key="user" />
        <Column title="Ngày tổ chức" dataIndex="hostDate" key="hostDate" />
        <Column
          title="Ngày đăng ký"
          dataIndex="registerDate"
          key="registerDate"
        />
        <Column
          title="Tình trạng"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Tag key={status} color={status === "Sắp diễn ra" && "blue"}>
              {status.toUpperCase()}
            </Tag>
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
              />
              <Button icon={<i className="bi bi-trash" />} className="delete" />
            </div>
          )}
        />
      </Table>

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
            <Input placeholder="Tên hoạt động" />
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
              maxLength={1000}
              autoSize={{ minRows: 4 }}
              placeholder="Nội dung hoặc mô tả về hoạt động"
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
            name="date"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian diễn ra hoạt động!",
              },
            ]}
          >
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
              format="DD/MM/YYYY HH:mm"
              // disabledDate={disabledDate}
              style={{ width: "100%" }}
            />
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
              <Input placeholder="Địa điểm tổ chức" />
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
                <Input placeholder="Liên kết tham gia sự kiện" />
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
              name="faculty"
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
              name="participants"
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
