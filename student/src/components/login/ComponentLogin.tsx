import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { getCookie } from "typescript-cookie";
import { ThunkfunctionLogin } from "../../redux/thunkfunction/login/ThunkfunctionLogin";
import { ModelAccountStudent } from "../../models/student/modelsAccountStudent";
const CompnentLogin: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
    const navigate = useNavigate();

    const message: string = useSelector((state: TypeReducer) => state.login.Message);

    const dispatch: Dispatch<any> = useDispatch();

    const accessToken: string | undefined = getCookie("accessToken");

    useEffect(() => {
        if(message === "Error") {
            setWarning("Tai khoan khong ton tai");
        }
        if(accessToken !== undefined) {
            navigate("/")
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
                                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                                setEmail(e.target.value);
                                            }}
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
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setPass(e.target.value);
                                            }}
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
                                            if(email === "" || pass === "") {
                                                setWarning("Thieu thong tin");
                                            } else {
                                                
                                                const account: ModelAccountStudent = {
                                                    Email: email,
                                                    Pass: pass
                                                }
                                                dispatch(ThunkfunctionLogin(account))
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

export default CompnentLogin;