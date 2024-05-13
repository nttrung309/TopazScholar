import React, { useState } from "react";

import { ReactSVG } from 'react-svg';

import LogoIcon  from'../../../shared/asset/icon/logo.svg';
import { Alert, Button, Input } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

import { routerLogin } from "../Login/router";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthSignUp } from "../../../redux/auth/userThunk";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [warning, setWarning] = useState(null);

    const HandleSignUp = async () => {
        try {
            // Dispatch action 'login' với username và password
            const validation = AuthValidate();
            if (validation.isValid){
                await dispatch(AuthSignUp({email, password}));
            }
            else{
                setWarning(validation.msg);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Đăng nhập thất bại:', error.message);
        }
    }
    
    const AuthValidate = () => {
        var checkState = {
            isValid: false,
            msg: ''
        }

        if(email === '' || password === '' || rePassword === ''){
            checkState.msg = "Vui lòng nhập đầy đủ thông tin!";
            return checkState;
        }

        if(password != rePassword){
            checkState.msg = "Mật khẩu không khớp!";
            return checkState;
        }
    
        // Check email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            checkState.msg = "Email không hợp lệ";
            return checkState;
        }
    
        // Set isValid true when data valid
        checkState.isValid = true;
        return checkState;
    }

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
                                <Input 
                                    className="auth__form__input-item__input" 
                                    placeholder="Email"
                                    onChange={(event) => {setEmail(event.target.value); if(warning != null){setWarning(null);}}}
                                />
                            </div>
                            <div className="auth__form__input-item">
                                <div className="auth__form__input-item__label">Mật khẩu</div>
                                <Input.Password 
                                    className="auth__form__input-item__input" 
                                    placeholder="Mật khẩu"
                                    onChange={(event) => {setPassword(event.target.value); if(warning != null){setWarning(null);}}}
                                />
                            </div>
                            <div className="auth__form__input-item">
                                <div className="auth__form__input-item__label">Xác nhận mật khẩu</div>
                                <Input.Password
                                    className="auth__form__input-item__input" 
                                    placeholder="Xác nhận mật khẩu"
                                    onChange={(event) => {setRePassword(event.target.value); if(warning != null){setWarning(null);}}}
                                />
                            </div>
                            {(warning != null) ? 
                                <Alert
                                description={warning}
                                type="warning"
                                showIcon 
                              /> : null
                            }
                        </div>
                        <div className="auth__form__control-group" style={{marginTop: '20px'}}>
                            <Button 
                                className="auth__form__btn primary" 
                                type='primary'
                                onClick={HandleSignUp}>
                                    Đăng ký
                            </Button>
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