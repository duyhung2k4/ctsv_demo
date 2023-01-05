import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { ActionTypeLogin } from "../../redux/action/actionLogin";
import { ModelTeacher } from "../../models/modelTeacher";
import { ThunkfunctionLogin } from "../../redux/thunkfunction/login/ThunkfunctionLogin";

const ComponentLogin: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [warning, setWarning] = useState<string>("");

    const message: string = useSelector((state: TypeReducer) => state.login.Message);

    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        if(message === "Done") {
            navigate("/");
        } else if(message === "Error") {
            setWarning("Tai khoan ko ton tai");
            dispatch({
                type: ActionTypeLogin.CHANGE_MESSAGE,
                payload: ""
            })
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
                                                setWarning("Dien thieu thong tin");
                                            } else {
                                                const teacher: ModelTeacher = {
                                                    Email: email,
                                                    Pass: pass
                                                }

                                                dispatch(ThunkfunctionLogin(teacher));
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

export default ComponentLogin; 