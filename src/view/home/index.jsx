import React, { useEffect } from "react";

import ActivityCard from "shared/components/ActivityCard";

import { BsHouseFill } from "react-icons/bs";
import Calendar from "./components/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { UserDataSelector } from "../../redux/auth/userSelector";
import { ActivityDataSelector } from "../../redux/activity/activitySelector";
import { GetAllActivity } from "../../redux/activity/activityThunk";

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(UserDataSelector);
  const activityData = useSelector(ActivityDataSelector);

  useEffect(() => {
    LoadAllActivity();
  }, []);

  const LoadAllActivity = async () => {
    await dispatch(GetAllActivity());
  }

  useEffect(() => {
    console.log(activityData);
  }, [activityData]);

  

  return (
    <div className="home">
      <div className="page-title">
        <div className="title-icon">
          <BsHouseFill />
        </div>
        <div className="title-name">Trang chủ</div>
      </div>
      <div className="main-content">
        <div className="my-activity section">
          <div className="section__title">Sự kiện của bạn</div>
          <div className="section__content">
            {activityData?.length > 0 ? (
              <ActivityCard variant="horizontal" data={activityData[0]} />
            ) : (
              <p>Không có sự kiện nào</p>
            )}
          </div>
        </div>
        <div className="upcoming-activity section vertical">
          <div className="section__title">Sự kiện sắp đến</div>
          <div className="section__content">
            {activityData?.length > 0 ? (
              activityData.map((data, index) => (
                <ActivityCard key={index} variant="vertical" data={data} />
              ))
            ) : (
              <p>Không có sự kiện sắp đến</p>
            )}
          </div>
        </div>
        <div className="my-calender section">
          <div className="section__title">Sự kiện của bạn</div>
          <div className="section__content">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
