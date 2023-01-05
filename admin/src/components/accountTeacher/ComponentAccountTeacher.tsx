import React, { useEffect, useState } from "react";
import { ModelAccountTeacher } from "../../models/student/modelAccountTeacher";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkFunctionCreateAccountTeacher, ThunkFunctionGetAccountTeacher } from "../../redux/thunkFunction/accountTeacher/ThunkFunctionAccountTeacher";
import { CSVLink } from "react-csv";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";

const ComponentAccountTeacher: React.FC = () => {

    const listAccountTeacher: ModelAccountTeacher[] = useSelector((state: TypeReducer) => state.accountTeacher.AccountTeacher);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);
    const dispatch: Dispatch<any> = useDispatch();

    const [account, setAccount] = useState<ModelAccountTeacher[]>([]);

    useEffect(() => {
        dispatch(ThunkFunctionGetAccountTeacher());
    }, [message])

    return (
        <div className="sec__one col-md-12" style={{ marginTop: "20px" }}>
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
                <div className="col-md-12" style={{ marginBottom: "20px"}}>
                    <input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const fileList: FileList | null = e.target.files;
                            if(fileList !== null) {
                                ReadFileExcel(fileList, setAccount);
                            }
                        }}
                    />
                    <button
                        className="btn"
                        onClick={() => {
                            dispatch(ThunkFunctionCreateAccountTeacher(account))
                        }}
                    >Create Account Teacher</button>
                </div>
                <CSVLink data={listAccountTeacher} filename="account_teacher" className="btn btn-success">Export Data</CSVLink>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Số ĐT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listAccountTeacher.map(
                                (account: ModelAccountTeacher, i) =>
                                    <tr key={i}>
                                        <th>{account.Id}</th>
                                        <th>{account.Name}</th>
                                        <th>{account.Email}</th>
                                        <th>{account.Phone}</th>
                                    </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ComponentAccountTeacher;