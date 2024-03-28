import React from "react";

import { ReactSVG } from 'react-svg';

import LogoIcon  from'../../../shared/asset/icon/logo.svg';
import { Button, Input } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const Login = () => {
    return(
        <div className="auth-login">
            <ReactSVG className="auth-login__banner" src={LogoIcon}/>
            <div className="auth-login__login-form">
                <div className="auth-login__login-form__container">
                    <div className="auth-login__login-form__header">
                        <div className="auth-login__login-form__header__title">
                            Đăng nhập
                        </div>
                        <div className="auth-login__login-form__header__sub-title">
                            {'Chưa có tài khoản? '}
                            <span>
                                Đăng ký ngay
                            </span>
                        </div>
                    </div>
                    <div className="auth-login__login-form__body">
                        <div className="auth-login__login-form__body__input-containter">
                            <div className="auth-login__login-form__input-item">
                                <div className="auth-login__login-form__input-item__label">Email</div>
                                <Input className="auth-login__login-form__input-item__input" placeholder="Email" />
                            </div>
                            <div className="auth-login__login-form__input-item">
                                <div className="auth-login__login-form__input-item__label">Mật khẩu</div>
                                <Input.Password className="auth-login__login-form__input-item__input" placeholder="Mật khẩu" />
                            </div>
                        </div>
                        <div className="auth-login__login-form__forgot-password">Quên mật khẩu?</div>
                        <div className="auth-login__login-form__control-group">
                            <Button className="auth-login__login-form__btn login" type='primary'>Đăng nhập</Button>
                            <div className="auth-login__login-form__control-group__divider">Hoặc</div>
                                <Button
                                    className="auth-login__login-form__btn gg-login"
                                    icon={<GoogleOutlined/>}
                                >
                                        Đăng nhập với Google
                                </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;