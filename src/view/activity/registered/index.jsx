import SideBar from "layout/SideBar";
import React from "react";
import ActivityCard from "shared/components/ActivityCard";
import SubSidebar from "shared/components/SubSidebar";

const ActivyRegistered = () => {
  return (
    <div className="activity-registered">
      <SubSidebar />

      <div className="main">
        <div className="page-title">
          <div className="title-icon">
            <i className="bi bi-lightning-fill" />
          </div>
          <div className="title-name">Hoạt động bạn đã đăng ký tham gia</div>
        </div>

        <div className="flex-column">
          <div className="item">
            <div className="title">Hôm nay</div>
            <ActivityCard variant="horizontal" />
            <ActivityCard variant="horizontal" />
          </div>

          <div className="item">
            <div className="title">Tháng trước</div>
            <ActivityCard variant="horizontal" />
            <ActivityCard variant="horizontal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivyRegistered;
