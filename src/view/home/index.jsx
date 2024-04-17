import React from "react";

import ActivityCard from "shared/components/ActivityCard";

import { BsHouseFill } from "react-icons/bs";
import Calendar from "./components/Calendar";

const Home = () => {
  return (
    <div className="home">
      <div className="page-title">
        <div className="title-icon">
          <BsHouseFill/>
        </div>
        <div className="title-name">Trang chủ</div>
      </div>
      <div className="main-content">
        <div className="my-activity section">
          <div className="section__title">
            Sự kiện của bạn
          </div>
          <div className="section__content">
            <ActivityCard variant='horizontal'/>
          </div>
        </div>
        <div className="upcoming-activity section vertical">
          <div className="section__title">
            Sự kiện sắp đến
          </div>
          <div className="section__content">
            <ActivityCard variant='vertical'/>
            <ActivityCard variant='vertical'/>
            <ActivityCard variant='vertical'/>
          </div>
        </div>
        <div className="my-calender section">
          <div className="section__title">
              Sự kiện của bạn
            </div>
            <div className="section__content">
              <Calendar/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
