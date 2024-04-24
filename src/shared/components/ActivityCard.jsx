    // @ts-nocheck
    import React from "react";
    import { BsFillShareFill } from "react-icons/bs";

    const ActivityCard = ({variant}) => {
        const cardVariant = ['horizontal', 'vertical'].includes(variant) ? variant : 'vertical';

        return (
            <div className={'activity-card ' + cardVariant}>
                <img src={require('../asset/image/temp/card-img.png')} alt="" />
                <div className="content">
                    <div className="info">
                        <div className="activity-time">THỜI GIAN DIỄN RA</div>
                        <div className="activity-name">Ngày hội việc làm 2023</div>
                        <div className="activity-area">Địa điểm</div>
                    </div>
                    <div className="card-footer">
                        <div className="view-detail btn">Xem chi tiết</div>
                        <div className="share btn"><BsFillShareFill /></div>
                    </div>
                </div>
            </div>
        );
    }

    export default ActivityCard;