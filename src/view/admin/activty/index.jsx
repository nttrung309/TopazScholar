import React, { useState } from "react";
import { Button, DatePicker, Input, Modal, Select, Table, Tag } from "antd";
import { BsPlus } from "react-icons/bs";
import dayjs from "dayjs";
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

  const handleCloseCreatingModal = () => {
    setOpenCreatingModal(false);
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
          onClick={() => {
            setOpenCreatingModal(true);
            setActivity({
              name: "",
              content: "",
              type: null,
              address: "",
              start: "",
              end: "",
              form: "offline",
              rule: "",
            });
          }}
        >
          Thêm hoạt động
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
        onCancel={handleCloseCreatingModal}
        footer={[
          <Button key="back" onClick={handleCloseCreatingModal}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            // onClick={handleSubmitCreating}
          >
            Lưu
          </Button>,
        ]}
      >
        <div>
          <div>Tên hoạt động</div>
          <Input
            size="large"
            value={activity?.name}
            onChange={(event) => {
              setActivity((prevState) => ({
                ...prevState,
                name: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <div>Nội dung</div>
          <TextArea
            rows={4}
            size="large"
            value={activity?.content}
            onChange={(event) => {
              setActivity((prevState) => ({
                ...prevState,
                content: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <div>Loại hoạt động</div>
          <Select
            size="large"
            placeholder="Chọn loại hoạt động"
            value={activity?.type}
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
        </div>
        <div>
          <div>Địa điểm</div>
          <Input
            size="large"
            value={activity?.address}
            onChange={(event) => {
              setActivity((prevState) => ({
                ...prevState,
                address: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <div>Thời gian tổ chức</div>
          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="DD/MM/YYYY HH:mm"
            size="large"
            minDate={dayjs(new Date(), "DD/MM/YYYY HH:mm")}
            onChange={(_date, dateString) => {
              setActivity((prevState) => ({
                ...prevState,
                start: dateString[0],
                end: dateString[1],
              }));
              console.log(activity);
            }}
          />
        </div>
        <div>
          <div>Hình thức</div>
          <Select
            size="large"
            value={activity?.form}
            onChange={(value) => {
              setActivity((prevState) => ({
                ...prevState,
                form: value,
              }));
            }}
            options={[
              {
                value: "offline",
                label: "Offline",
              },
              {
                value: "online",
                label: "Online",
              },
            ]}
          />
        </div>
        <div>
          <div>Quy định</div>
          <Input
            size="large"
            value={activity?.rule}
            onChange={(event) => {
              setActivity((prevState) => ({
                ...prevState,
                rule: event.target.value,
              }));
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Activity;
