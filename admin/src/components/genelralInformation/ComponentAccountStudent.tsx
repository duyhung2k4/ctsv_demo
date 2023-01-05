import React, { ChangeEvent, useEffect, useState } from "react";
import { ModelAccountStudent } from "../../models/student/modelAccountStudent";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkFunctionGetAccountStudent } from "../../redux/thunkFunction/generalInformation/ThunkFuntionGeneralInformationAccountStudent";
import { ThunkFunctionInsertAccountStudent } from "../../redux/thunkFunction/generalInformation/ThunkFunctionInsertGeneralInformation";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { CSVLink } from "react-csv";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";

const ComponentAccountStudent: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const listAccountStudent: ModelAccountStudent[] = useSelector((state: TypeReducer) => state.generalInformation.Account);
    const message :string = useSelector((state: TypeReducer) => state.generalInformation.Message);

    useEffect(() => {
        dispatch(ThunkFunctionGetAccountStudent());
    }, [message])

    const [info, setInfo] = useState<ModelAccountStudent[]>([]);

    return (
        <div className="col-md-12">
            {message && <div
                style={{
                position: "fixed",
                height: "25vh",
                width: "30%",
                border: (message === "Done" ? "1px solid green": "1px solid red"),
                borderRadius: "5px",
                backgroundColor: "white",
                zIndex: 2,
                marginTop: "10vh",
                marginLeft: "35%",
            }}>
                <div className="col-md-12">
                    <button 
                        className="btn" 
                        style={{ float: "right" }}
                        onClick={() => {
                            dispatch({
                                type: ActionTypeGeneralInformation.CHANGE_MESSAGE,
                                payload: ""
                            })
                        }}
                    >x</button>
                </div>
                <div style={{position: "relative", textAlign: "center", height: "20%", marginTop: "15%" }}>
                    <p style={{ fontSize: "26px"}}>{message === "Done" ? "Thành công" : "Thất bại"}</p>
                </div>
            </div>}
            <div className="col-md-12">
                <input
                    type="file"
                    multiple={false}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {

                        const fileList: FileList | null = e.target.files;

                        if(fileList !== null) {
                            ReadFileExcel(fileList, setInfo);
                        }

                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        let listAccount: ModelAccountStudent[] = [];
                        info.forEach((info: ModelAccountStudent) => {
                            const newAccount: ModelAccountStudent = {
                                Email: String(info.Email),
                                Pass: String(info.Pass)
                            }
                            listAccount.push(newAccount);
                        })
                        dispatch(ThunkFunctionInsertAccountStudent(listAccount));
                    }} 
                >Create Account</button>
                <div className="col-md-12"><p>{message === "Error" ? "Lỗi, yêu cầu thử lại" : (message ? "Thành công": "")}</p></div>
            </div>
            <CSVLink data={listAccountStudent} filename="account_student" className="btn btn-success">Export Data</CSVLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Mật khẩu</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listAccountStudent.map(
                            (account: ModelAccountStudent, i) =>
                                <tr key={i}>
                                    <td>{account.Id}</td>
                                    <td>{account.Email}</td>
                                    <td>{account.Pass}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentAccountStudent;