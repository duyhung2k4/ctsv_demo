import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ModelContact } from "../../models/student/modelGeneralInformation";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { ThunkFunctionGetContact } from "../../redux/thunkFunction/generalInformation/ThunkFuntionGeneralInformationAccountStudent";
import { CSVLink } from "react-csv";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { ThunkFunctionUpdateContact } from "../../redux/thunkFunction/generalInformation/ThunkFunctionUpdateGeneralInformation";
import { type } from "os";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";

const ComponentContact: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const listContact: ModelContact[] = useSelector((state: TypeReducer) => state.generalInformation.Contact);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);

    const [contact, setContact] = useState<ModelContact[]>([]);

    useEffect(() => {
        dispatch(ThunkFunctionGetContact());
    }, [message])

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
            <div className="col-md-12" style={{ marginBottom: "20px" }}>
                <input
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const contactFile: FileList | null = e.target.files
                        if(contactFile !== null) {
                            ReadFileExcel(contactFile, setContact);
                        }
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        dispatch(ThunkFunctionUpdateContact(contact));
                    }}
                >Update Contact</button>
            </div>
            <CSVLink data={listContact} filename="contact" className="btn btn-success">Export Contact</CSVLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>Mã sinh viên</th>
                        <th>SĐT Liên hệ</th>
                        <th>SĐT khác</th>
                        <th>Email</th>
                        <th>Email khác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listContact.map(
                            (contact: ModelContact, i) => 
                            <tr key={i}>
                                <td>{contact.StudentBaseInfo?.StudentCode}</td>
                                <td>{contact.PhoneNumber}</td>
                                <td>{contact.OtherPhoneNumber}</td>
                                <td>{contact.Email}</td>
                                <td>{contact.OtherEmail}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentContact;