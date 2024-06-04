import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button, Carousel, Image, Input, Modal, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetAllActivity } from "../../../redux/activity/activityThunk";
import { ActivityDataSelector } from "../../../redux/activity/activitySelector";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Activity = () => {
  const dispatch = useDispatch();
  const activities = useSelector(ActivityDataSelector);

  const [openModal, setOpenModal] = useState(false);
  const [record, setRecord] = useState(null);

  const navigate = useNavigate();

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
  }, []);

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
      title: "Tình trạng",
      dataIndex: "activityStatus",
      key: "dateCreated",
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
      title: "",
      key: "action",
      render: (_, record) => (
        <div className="action-group">
          <Button
            icon={<i className="bi bi-pencil-square" />}
            className="edit"
            onClick={() =>
              navigate("/admin/activity/edit", { state: { activity: record } })
            }
          />
        </div>
      ),
    },
  ];

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
              setOpenModal(true);
            },
          };
        }}
      />

      <Modal
        title="Thông tin hoạt động"
        centered
        footer={null}
        open={openModal}
        key={openModal ? "open" : "closed"}
        onCancel={() => setOpenModal(false)}
        okButtonProps={{
          autoFocus: true,
        }}
        destroyOnClose
        width={800}
      >
        <Carousel
          fade
          arrows
          prevArrow={<BsChevronLeft size={32} />}
          nextArrow={<BsChevronRight size={40} />}
          infinite={false}
        >
          {record?.mediaContent?.images?.map((path) => {
            console.log("http://localhost:5000/" + path);
            return <img src={"http://localhost:5000/" + path} />;
          })}
        </Carousel>
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
