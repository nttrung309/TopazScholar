import React, { useState } from "react";
import SubSidebar from "shared/components/SubSidebar";
import Image from "../../shared/asset/image/temp/card-img.png";
import { Button, Radio } from "antd";
import { Link } from "react-router-dom";
import SuggestActivityCard from "./components/SuggestActivityCard";

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
  const [value, setValue] = useState("Mô tả chi tiết");

  //default || ongoing || registered || finished
  const [state, setState] = useState("finished");

  //true || false
  const hosting = true;

  return (
    <div className="activity">
      <div className="main">
        <div className="page-title">
          <div className="title-icon">
            <i className="bi bi-lightning-fill" />
          </div>
          <div className="title-name">
            Ngày hội Sinh viên và Doanh nghiệp - UIT Career Day 2020
          </div>
        </div>

        <div className="column-2">
          <div className="cell left">
            <img src={Image} alt="" />
            <Radio.Group
              options={options}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              optionType="button"
              buttonStyle="solid"
            />
            {value === "Mô tả chi tiết" ? (
              <div className="description">
                Thứ bảy 05/12/2020, Trường ĐH Công nghệ Thông tin ĐHQG-HCM sẽ tổ
                chức Ngày hội Sinh viên và Doanh nghiệp - UIT Career Day
                2020.UIT Career Day 2020 có sự tham gia của 25 doanh nghiệp hoạt
                động trong lĩnh vực công nghệ thông tin và truyền thông với dự
                kiến hơn 1500 thông tin tuyển dụng thực tập, việc làm và hàng
                ngàn quà tặng gửi đến các bạn sinh viên tham gia.Ngày hội là dịp
                để sinh viên và doanh nghiệp có điều kiện gặp gỡ, trao đổi trực
                tiếp, đáp ứng và thoả mãn nhu cầu về cung – cầu tuyển dụng, nhất
                là nhu cầu tuyển dụng nguồn nhân lực có chất lượng trong lĩnh
                vực công nghệ thông tin và truyền thông.Ngày hội sẽ diễn ra
                trong thời gian từ 7h30 sáng đến 12h00 cùng ngày với hơn 30 gian
                hàng, gồm các nội dung chính: Check-in khai mạc; Doanh nghiệp tự
                giới thiệu; Phỏng vấn thử thành công thật; các Hội thảo chuyên
                đề về sản phẩm công nghệ mới, tư vấn kỹ năng nghề nghiệp.Ngày
                hội được tài trợ và đồng hành bởi các doanh nghiệp:• Tài trợ
                Vàng: công ty KMS Technology Việt Nam, công ty NashTech Việt
                Nam• Tài trợ Bạc: công ty VNG, công ty Netcompany Vietnam, công
                ty FPT Software Tp. HCM, công ty ELCA Việt Nam, công ty Fujinet
                Systems và công ty FOSSIL VIETNAM• Tài trợ Đồng: công ty Chợ
                tốt, công ty DXC Việt Nam và công ty Dirox CÁC HOẠT ĐỘNG CHÍNH
                TRONG NGÀY HỘI- Check-in Khai mạc và Trao học bổng- Gian hàng
                giới thiệu, game show của các doanh nghiệp- Hội thảo Công nghệ,
                Kỹ năng:- Phỏng vấn, tuyển dụng - Tư vấn nghề nghiệp- Bốc thăm
                may mắn Ẩn bớt
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
                    <Button size="large" style={{ flex: 1 }}>
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
                    <Button type="primary" size="large" style={{ flex: 1 }}>
                      Đăng ký tham gia
                    </Button>
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
                  7:30, Thứ bảy 05/12/2020
                </div>

                <div className="row">
                  <i className="bi bi-geo-alt" />
                  Trường ĐH Công nghệ Thông tin ĐHQG-HCM
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
              <div className="number">100</div>
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
