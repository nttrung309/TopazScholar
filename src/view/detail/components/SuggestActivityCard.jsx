import React from "react";
import Image from "../../../shared/asset/image/temp/card-img.png";
import { Button } from "antd";

const SuggestActivityCard = () => {
  return (
    <div className="suggest-card">
      <div className="content">
        <img src={Image} />
        <div className="content__wrapper">
          <span>Thời gian diễn ra</span>
          <span>Ngày hội việc làm 2023</span>
          <span>Địa điểm</span>
        </div>
      </div>
      <div className="button">
        <Button size="large">Xem chi tiết</Button>
        <Button size="large">
          <i className="bi bi-share-fill" />
        </Button>
      </div>
    </div>
  );
};

export default SuggestActivityCard;
