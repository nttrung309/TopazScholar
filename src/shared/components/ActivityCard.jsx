// @ts-nocheck
import React from "react";
import { BsFillShareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { TimePrettier } from "shared/helper/Time";

const ActivityCard = ({variant, data}) => {
    const navigate = useNavigate();
    const cardVariant = ['horizontal', 'vertical'].includes(variant) ? variant : 'vertical';

    return (
        <div className={'activity-card ' + cardVariant} onClick={() => {
            if(cardVariant == 'horizontal'){navigate('/activity/' + data.actID);};
        }}>
            <img src={data?.mediaContent?.images[0]} alt="" />
            <div className="content">
                <div className="info">
                    <div className="activity-time">{TimePrettier(data.startDate)}</div>
                    <div className="activity-name">{data.name}</div>
                    <div className="activity-area">{data.address}</div>
                </div>
                <div className="card-footer">
                    <div className="view-detail btn" onClick={() => {navigate('/activity/' + data.actID)}}>Xem chi tiết</div>
                    <div className="share btn"><BsFillShareFill /></div>
                </div>
            </div>
        </div>
    );
}

export default ActivityCard;