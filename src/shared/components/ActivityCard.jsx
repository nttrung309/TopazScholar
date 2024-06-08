// @ts-nocheck
import React from "react";
import { BsFillShareFill } from "react-icons/bs";
import { TimePrettier } from "shared/helper/Time";

const ActivityCard = ({variant, data}) => {
    const cardVariant = ['horizontal', 'vertical'].includes(variant) ? variant : 'vertical';

    return (
        <div className={'activity-card ' + cardVariant}>
            <img src={data?.mediaContent?.images[0]} alt="" />
            <div className="content">
                <div className="info">
                    <div className="activity-time">{TimePrettier(data.startDate)}</div>
                    <div className="activity-name">{data.name}</div>
                    <div className="activity-area">{data.address}</div>
                </div>
                <div className="card-footer">
                    <div className="view-detail btn" onClick={() => {}}>Xem chi tiết</div>
                    <div className="share btn"><BsFillShareFill /></div>
                </div>
            </div>
        </div>
    );
}

export default ActivityCard;