import React from "react";

import { ReactSVG } from 'react-svg';

import LogoIcon  from'../../../shared/asset/icon/logo.svg';
import { Button, Input } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

import { routerLogin } from "../Login/router";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    return(
        <div className="auth sign-up">
            <ReactSVG className="auth__banner" src={LogoIcon}/>
            <div className="auth__form">
                <div className="auth__form__container">
                    <div className="auth__form__header">
                        <div className="auth__form__header__title">
                            Đăng ký
                        </div>
                        <div className="auth__form__header__sub-title">
                            {'Đã có tài khoản? '}
                            <span onClick={() => navigate(routerLogin.path)}>
                                Đăng nhập ngay
                            </span>
                        </div>
                    </div>
                    <div className="auth__form__body">
                        <div className="auth__form__body__input-containter">
                            <div className="auth__form__input-item">
                                <div className="auth__form__input-item__label">Email</div>
                                <Input className="auth__form__input-item__input" placeholder="Email" />
                            </div>
                            <div className="auth__form__input-item">
                                <div className="auth__form__input-item__label">Mật khẩu</div>
                                <Input.Password className="auth__form__input-item__input" placeholder="Mật khẩu" />
                            </div>
                            <div className="auth__form__input-item">
                                <div className="auth__form__input-item__label">Xác nhận mật khẩu</div>
                                <Input.Password className="auth__form__input-item__input" placeholder="Xác nhận mật khẩu" />
                            </div>
                        </div>
                        <div className="auth__form__control-group" style={{marginTop: '20px'}}>
                            <Button className="auth__form__btn primary" type='primary'>Đăng ký</Button>
                            <div className="auth__form__control-group__divider">Hoặc</div>
                                <Button
                                    className="auth__form__btn gg-login"
                                    icon={<GoogleOutlined/>}
                                >
                                        Đăng ký với Google
                                </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;