// @ts-nocheck
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import { BsChevronLeft, BsCloudArrowUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  GetActivityByActID,
  HostActivity,
  UpdateActivity,
} from "../../../redux/activity/activityThunk";
import { AuthUIDSelector } from "../../../redux/auth/userSelector";
import { ActivityDataSelector } from "../../../redux/activity/activitySelector";

const MAX_IMAGES = 5;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CreateNewActivity = () => {
  const type = useLocation().pathname;
  const actID = useLocation()?.state?.id;
  const dispatch = useDispatch();
  const userID = useSelector(AuthUIDSelector);
  const activity = useSelector(ActivityDataSelector);

  const [form] = Form.useForm();
  const formValue = Form.useWatch("form", form);
  const activityStatus = Form.useWatch("activityStatus", form);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const getAllActivity = async () => {
      try {
        // @ts-ignore
        await dispatch(GetActivityByActID(actID));
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };
    getAllActivity();
  }, [actID, dispatch]);

  const getFileList = () => {
    if (activity) {
      const images = activity.mediaContent?.images.map((path, index) => ({
        uid: index,
        name: path?.slice(8),
        status: "done",
        url: "http://localhost:5000/" + path,
      }));
      return images;
    } else return null;
  };

  useEffect(() => {
    const getInitialValue = () => {
      if (activity)
        form.setFieldsValue({
          ...activity,
          regStatus: activity?.regStatus,
          startDate: activity?.startDate ? dayjs(activity?.startDate) : "",
          endDate: activity?.endDate ? dayjs(activity?.endDate) : "",
          activityStatus:
            activity?.activityStatus === "Undefined"
              ? null
              : activity?.activityStatus,
          registerStatus:
            activity?.registerStatus === "Undefined"
              ? null
              : activity?.registerStatus,
          images: getFileList(),
        });
      else
        form.setFieldsValue({
          images: null,
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
        });
    };

    getInitialValue();
  }, []);

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
  }, [activityStatus, form]);

  const handleSubmitActivity = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();
      console.log(values);
      const formData = new FormData();
      values.images.forEach((item) => {
        formData.append("images", item.originFileObj);
      });
      values.faculty.forEach((item) => {
        formData.append("faculty", item);
      });
      values.participants.forEach((item) => {
        formData.append("participants", item.slice(15));
      });
      formData.append("name", values.name);
      formData.append("content", values.content);
      formData.append("category", values.category);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("form", values.form);
      formData.append("address", values.address);
      formData.append("linkJoin", values.linkJoin);
      formData.append("maxParticipants", values.maxParticipants);
      formData.append("rule", values.rule);
      formData.append("userID", userID);

      // @ts-ignore
      const result = await dispatch(HostActivity(formData));
      form.resetFields();
      if (result) message.success("Tạo hoạt động mới thành công!");
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleUpdateActivity = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      //Check new uploaded image
      const activityImages = getFileList();
      let newImages = values.images;
      for (let i = 0; i < activityImages.length; i++) {
        newImages = newImages.filter(
          (image) => image.name !== activityImages[i].name
        );
      }

      //Return remain images from database (when user delete a image in database)
      let remainImages = [];
      for (let i = 0; i < activityImages.length; i++) {
        const image = values.images.filter(
          (image) => image.name === activityImages[i].name
        );
        if (image.length !== 0) remainImages.push(image);
      }

      remainImages = remainImages.reduce((acc, el) => acc.concat(el), []);
      newImages.forEach((item) => {
        formData.append("images", item.originFileObj);
      });
      remainImages.forEach((item) => {
        formData.append("remainImages", item.url?.slice(22));
      });
      values.faculty.forEach((item) => {
        formData.append("faculty", item);
      });
      values.participants.forEach((item) => {
        formData.append("participants", item);
      });
      formData.append("actID", activity.actID);
      formData.append("name", values.name);
      formData.append("content", values.content);
      formData.append("category", values.category);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("form", values.form);
      formData.append("address", values.address);
      formData.append("linkJoin", values.linkJoin);
      formData.append("maxParticipants", values.maxParticipants);
      formData.append("rule", values.rule);
      formData.append("activityStatus", values.activityStatus);
      formData.append("registerStatus", values.registerStatus);
      formData.append("userID", userID);

      // @ts-ignore
      const result = await dispatch(UpdateActivity(formData));
      if (result) message.success("Cập nhật hoạt động thành công!");
    } catch (error) {
      console.log("Failed:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const beforeUpload = async (file, fileList) => {
    const isImg =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif";
    if (!isImg) {
      message.error("Ảnh phải có định dạng là jpeg, jpg, png và gif");
      return Upload.LIST_IGNORE;
    }
    if (fileList.length === MAX_IMAGES) {
      message.error("Bạn đã tải lên đủ số lượng ảnh tối đa");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  return (
    <div className="account">
      <div className="page-title">
        <div className="title-icon">
          <i className="bi bi-lightning-fill" />
        </div>
        <div className="title-name">
          {activity ? activity.name : "Tạo hoạt động"}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <Link
          to="/admin/activity"
          className="back-list"
          style={{ position: "absolute", top: 0 }}
        >
          <BsChevronLeft fontSize={12} />
          Danh sách hoạt động
        </Link>

        <Form
          style={{ marginTop: 20 }}
          className="form"
          form={form}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          {/* {activity && (
            <Form.Item name="regStatus">
              <Select options={STATUS.slice(0, 3)} />
            </Form.Item>
          )} */}
          <Form.Item
            name="images"
            label="Hình ảnh"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                type: "array",
                required: true,
                message: "Vui lòng tải lên ít nhất 1 hình ảnh cho hoạt động!",
              },
            ]}
          >
            <Upload.Dragger
              name="files"
              multiple={true}
              listType="picture-card"
              maxCount={MAX_IMAGES}
              beforeUpload={beforeUpload}
              onPreview={handlePreview}
            >
              <BsCloudArrowUp size={40} />
              <p className="ant-upload-text">Thêm hình ảnh</p>
            </Upload.Dragger>
          </Form.Item>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}

          <Form.Item
            name="name"
            label="Tên hoạt động"
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
            label="Nội dung"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung hoạt động!",
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={2000}
              autoSize={{ minRows: 4 }}
              placeholder="Nội dung hoặc mô tả về hoạt động"
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Loại hoạt động"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại hoạt động!",
              },
            ]}
          >
            <Select placeholder="Chọn loại hoạt động" options={CATEGORY} />
          </Form.Item>
          <Form.Item
            label="Thời gian hoạt động"
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
            label="Hình thức"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập hình thức tổ chức hoạt động!",
              },
            ]}
          >
            <Select
              placeholder="Chọn hình thức tổ chức hoạt động"
              options={FORM}
            />
          </Form.Item>
          {formValue === "Trực tiếp" ? (
            <Form.Item
              name="address"
              label="Địa điểm"
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
                label="Liên kết tham gia"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập liên kết tham gia!",
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
              name={"faculty"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đối tượng tham gia!",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 10px)",
              }}
            >
              <Select
                placeholder="Chọn khoa"
                options={FACULTY}
                mode="multiple"
                allowClear
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
                width: "calc(50% - 10px)",
                marginLeft: "20px",
              }}
            >
              <Select
                placeholder="Chọn năm"
                options={YEAR}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="maxParticipants"
            label="Số lượng tối đa"
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
          <Form.Item name="rule" label="Quy định">
            <Input.TextArea
              showCount
              maxLength={500}
              autoSize={{ minRows: 1 }}
              placeholder="Quy định tham gia"
            />
          </Form.Item>
          {activity && (
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
                  options={STATUS.slice(3, 8)}
                  placeholder="Chọn trạng thái hoạt động"
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
                  disabled={
                    activityStatus === "NotStartYet" ||
                    activityStatus === "TakingPlace"
                      ? false
                      : true
                  }
                  options={STATUS.slice(8, 10)}
                />
              </Form.Item>
            </Form.Item>
          )}
          {type !== '/admin/activity/create' ? (
            <div style={{ justifySelf: "flex-end" }}>
              <Button style={{ marginRight: 20 }} htmlType="reset">
                Reset
              </Button>
              <Button
                key="submit"
                type="primary"
                onClick={handleUpdateActivity}
              >
                Lưu thay đổi
              </Button>
            </div>
          ) : (
            <Button
              style={{ justifySelf: "flex-end" }}
              key="submit"
              type="primary"
              onClick={handleSubmitActivity}
            >
              Tạo hoạt động
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default CreateNewActivity;
const STATUS = [
  {
    value: "Approved",
    label: "Đã phê duyệt",
  },
  {
    value: "Denied",
    label: "Từ chối",
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

const CATEGORY = [
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
];

const FORM = [
  {
    value: "Trực tiếp",
    label: "Trực tiếp",
  },
  {
    value: "Online",
    label: "Online",
  },
];

const FACULTY = [
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
    value: "học và Kỹ thuật Thông tin",
    label: "học và Kỹ thuật Thông tin",
  },
];

const YEAR = [
  {
    value: "Tất cả",
    label: "Tất cả",
  },
  {
    value: "Sinh viên năm 1",
    label: "Sinh viên năm 1",
  },
  {
    value: "Sinh viên năm 2",
    label: "Sinh viên năm 2",
  },
  {
    value: "Sinh viên năm 3",
    label: "Sinh viên năm 3",
  },
  {
    value: "Sinh viên năm 4",
    label: "Sinh viên năm 4",
  },
];
