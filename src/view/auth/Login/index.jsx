// @ts-nocheck
import React, { useState } from "react";

import { ReactSVG } from "react-svg";

import LogoIcon from "../../../shared/asset/icon/logo.svg";
import { Button, Input } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { routerSignUp } from "../SignUp/router";

import { useDispatch } from "react-redux";
import { AuthLogin } from "../../../redux/auth/userThunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const HandleLogin = async () => {
    try {
      // Dispatch action 'login' với username và password
      await dispatch(AuthLogin({ email, password }));
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Đăng nhập thất bại:", error.message);
    }
  };

  return (
    <div className="auth">
      <ReactSVG className="auth__banner" src={LogoIcon} />
      <div className="auth__form">
        <div className="auth__form__container">
          <div className="auth__form__header">
            <div className="auth__form__header__title">Đăng nhập</div>
            <div className="auth__form__header__sub-title">
              {"Chưa có tài khoản? "}
              <span onClick={() => navigate(routerSignUp.path)}>
                Đăng ký ngay
              </span>
            </div>
          </div>
          <div className="auth__form__body">
            <div className="auth__form__body__input-containter">
              <div className="auth__form__input-item">
                <div className="auth__form__input-item__label">Email</div>
                <Input
                  onChange={(event) => setEmail(event.target.value)}
                  className="auth__form__input-item__input"
                  placeholder="Email"
                />
              </div>
              <div className="auth__form__input-item">
                <div className="auth__form__input-item__label">Mật khẩu</div>
                <Input.Password
                  className="auth__form__input-item__input"
                  placeholder="Mật khẩu"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div className="auth__form__forgot-password">Quên mật khẩu?</div>
            <div className="auth__form__control-group">
              <Button
                className="auth__form__btn primary"
                type="primary"
                onClick={HandleLogin}
              >
                Đăng nhập
              </Button>
              <div className="auth__form__control-group__divider">Hoặc</div>
              <Button
                className="auth__form__btn gg-login"
                icon={<GoogleOutlined />}
              >
                Đăng nhập với Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
