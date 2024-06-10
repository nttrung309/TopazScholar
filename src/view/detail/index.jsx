import React, { useEffect, useState } from "react";
import SubSidebar from "shared/components/SubSidebar";
import Image from "../../shared/asset/image/temp/card-img.png";
import { Button, Modal, Radio, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import SuggestActivityCard from "./components/SuggestActivityCard";
import { useDispatch, useSelector } from "react-redux";
import { GetActivityByActID } from "../../redux/activity/activityThunk";
import { ActivityDataSelector } from "../../redux/activity/activitySelector";
import { AuthUIDSelector } from "../../redux/auth/userSelector";
import { AttendActivity } from "../../redux/auth/userThunk";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const options = [
  {
    label: "Mô tả chi tiết",
    value: "Mô tả chi tiết",
  },
  {
    label: "Bình luận",
    value: "Bình luận",
  },
];

const DetailActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actID } = useParams();  // Lấy uid từ URL
  const [messageApi, contextHolder] = message.useMessage();
  const activityData = useSelector(ActivityDataSelector);
  const userUID = useSelector(AuthUIDSelector);
  const [value, setValue] = useState("Mô tả chi tiết");
  //default || ongoing || registered || finished
  const [state, setState] = useState("default");

  //true || false
  const [hosting, setHosting] = useState(false);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    LoadActivityData();
  }, [actID]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    if(activityData && userUID){
      setHosting(userUID == activityData?.hostName);

      const now = new Date();
      if(new Date(activityData.endDate) < now){
        setState('finished');
      }
      else {
        if(userUID == activityData?.hostName){
          if(new Date(activityData.startDate) > now){
            setState('default');
          }
          else if((new Date(activityData.startDate) <= now) && (new Date(activityData.endDate) > now)){
            setState('ongoing');
          }
        }
        else{
          if((new Date(activityData.startDate) <= now) && (new Date(activityData.endDate) > now)){
            setState('ongoing');
          }
          else if(activityData?.participants?.includes(userUID)){
            setState('registered');
          }
          else if(new Date(activityData.startDate) > now){
            setState('default');
          }
          
        }
      }
    }
  }, [activityData, userUID]);

  const LoadActivityData = async () => {
    await dispatch(GetActivityByActID(actID))
  }

  const formatDate = (dateString) => {
    if(!dateString) {
      return;
    }
    const date = new Date(dateString);
  
    const day = format(date, 'HH:mm', { locale: vi });
    const weekDay = format(date, "EEEE", { locale: vi }).toUpperCase();
    const dayMonthYear = format(date, 'dd/MM/yyyy', { locale: vi });
  
    return `${day}, ${weekDay} ${dayMonthYear}`;
  };

  const HandleRegister = async () => {
    await dispatch(AttendActivity({
      actID: activityData.actID,
      userID: userUID
    }));
    HandleCancel();
    infoRegisterSucceed();

    setTimeout(() => {
      window.location.reload(true);
    }, 3000); // Hẹn giờ 3 giây
  }

  const infoRegisterSucceed = () => {
    messageApi.open({
      type: 'success',
      content: 'Đăng ký thành công',
      duration: 3
    });
  };

  const HandleCancel = () => {
    setIsRegisterModalOpen(false);
  }

  return (
    <div className="activity">
      {contextHolder}
      <div className="main">
        <div className="page-title">
          <div className="title-icon">
            <i className="bi bi-lightning-fill" />
          </div>
          <div className="title-name">
            {activityData?.name}
          </div>
        </div>

        <div className="column-2">
          <div className="cell left">
            <img src={activityData?.mediaContent?.images[0]} alt="" />
            <Radio.Group
              options={options}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              optionType="button"
              buttonStyle="solid"
            />
            {value === "Mô tả chi tiết" ? (
              <div className="description">
                {activityData?.content}
              </div>
            ) : (
              <div className="comment">
                <div className="comment__input">
                  <i className="bi bi-emoji-smile" />
                  <input placeholder="Bình luận" />
                  <i className="bi bi-cursor-fill active"></i>
                </div>

                <div className="comment__list">
                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>

                  <div className="item">
                    <img src={Image} />
                    <div className="content-wrapper">
                      <div className="user">Nguyễn Ngọc Trinh</div>
                      <div className="content">Alu alu</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="cell">
            {hosting ? (
              <>
                {state === "default" ? (
                  <div className="button-wrapper">
                    <Button size="large" style={{ flex: 1 }} onClick={() => navigate('/activity/edit/' + activityData.actID)}>
                      Chỉnh sửa thông tin
                    </Button>
                    <Button type="primary" size="large" style={{ flex: 1 }}>
                      Tạo lịch nhắc
                    </Button>
                    <Button size="large">
                      <i className="bi bi-share-fill" />
                    </Button>
                  </div>
                ) : (
                  state === "ongoing" && (
                    <>
                      <div className="button-wrapper">
                        <div className="activity-tag blue">
                          Đang mở điểm danh
                        </div>
                        <div className={`activity-tag ${state}`}>
                          sự kiện đang diễn ra
                        </div>
                      </div>
                      <div className="button-wrapper">
                        <Button type="primary" size="large">
                          Đóng điểm danh
                        </Button>
                      </div>
                    </>
                  )
                )}
              </>
            ) : (
              <>
                {state === "default" ? (
                  <div className="button-wrapper">
                    <Button type="primary" size="large" style={{ flex: 1 }} onClick={() => setIsRegisterModalOpen(true)}>
                      Đăng ký tham gia
                    </Button>
                    <Modal title="Bạn có chắc muốn đăng kí tham gia?" open={isRegisterModalOpen} onOk={HandleRegister} onCancel={HandleCancel}>
                    </Modal>
                    <Button type="primary" size="large">
                      <i className="bi bi-share-fill" />
                    </Button>
                  </div>
                ) : state === "ongoing" ? (
                  <div className="button-wrapper">
                    <div className={`activity-tag ${state}`}>
                      sự kiện đang diễn ra
                    </div>
                    <Button type="primary" size="large">
                      Điểm danh tham gia
                    </Button>
                  </div>
                ) : state === "registered" ? (
                  <div className="button-wrapper">
                    <div className={`activity-tag ${state}`}>
                      Bạn đã đăng ký tham gia hoạt động này
                    </div>
                    <Button type="primary" size="large">
                      <i className="bi bi-share-fill" />
                    </Button>
                  </div>
                ) : (
                  <div className="button-wrapper">
                    <div className={`activity-tag ${state}`}>
                      sự kiện đã kết thúc
                    </div>
                    <Button type="primary" size="large">
                      Đánh giá hoạt động
                    </Button>
                  </div>
                )}
              </>
            )}

            <div className="information">
              <div className="infor-wrapper">
                <div className="row">
                  <i className="bi bi-clock" />
                  {activityData && formatDate(activityData?.startDate)}
                </div>

                <div className="row">
                  <i className="bi bi-geo-alt" />
                  {activityData?.address}
                </div>

                <div className="row">
                  <i className="bi bi-people" />
                  Bất cứ ai
                </div>
                <div className="row content-2">
                  <i className="bi bi-building" />
                  <span>Người tổ chức:</span>
                  Trường ĐH Công nghệ Thông tin, Trường ĐH Công nghệ Thông tin
                </div>
                <div className="row"></div>
              </div>
            </div>

            <div className="information">
              <div className="button-wrapper">
                <div className="label">Số người tham gia</div>
                {hosting && <Link to="#">Xem danh sách</Link>}
              </div>
              <div className="number">{activityData?.participants?.length}</div>
              <div className="sub-text">Đã tham gia</div>
            </div>

            {!hosting && (
              <div className="suggest">
                <div className="title">{"Gợi ý hoạt động"}</div>

                <SuggestActivityCard />
                <SuggestActivityCard />
                <SuggestActivityCard />
                <SuggestActivityCard />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailActivity;
