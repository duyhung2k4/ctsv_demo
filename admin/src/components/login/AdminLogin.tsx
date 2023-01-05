import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { ThunkFunctionAdminLogin } from "../../redux/thunkFunction/login/ThunkFunctionAdminLogin";
import { getCookie } from "typescript-cookie";
import "./AdminLogin.css";

const AdminLogin: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [ warning, setWarning ] = useState<string>("");

    const navigate = useNavigate();

    const dispatch: Dispatch<any> = useDispatch();

    const message: string = useSelector((state: TypeReducer) => state.login.Message);
    const token: string | undefined = getCookie("accessToken");

    useEffect(() => {
        if (token !== undefined) {
            navigate("/");
        }
        if(message === "Error") {
            setWarning("Tai khoan khong ton tai");
        }
    }, [message])

    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <form action="" autoComplete="off">
                                    <div className="form-group">
                                        <input
                                            className="col-md-10 offset-md-1"
                                            style={{
                                                borderRadius: "5px",
                                                marginTop: "20px",
                                                border: "1px solid black"
                                            }}
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            placeholder="Email"
                                            type="email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="col-md-10 offset-md-1"
                                            style={{
                                                borderRadius: "5px",
                                                marginTop: "20px",
                                                border: "1px solid black"
                                            }}
                                            value={pass}
                                            onChange={(e) => { setPass(e.target.value) }}
                                            placeholder="Pass"
                                            type="password"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <p>{warning}</p>
                                    </div>
                                    <button
                                        style={{
                                            marginTop: "20px"
                                        }}
                                        onClick={() => {
                                            if(email && pass) {
                                                dispatch(ThunkFunctionAdminLogin(email, pass));
                                            } else {
                                                setWarning("Thieu thong tin");
                                            }
                                        }}
                                        type="button"
                                        id="sendlogin"
                                        className="btn btn-primary col-md-10 offset-md-1"
                                    >login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin