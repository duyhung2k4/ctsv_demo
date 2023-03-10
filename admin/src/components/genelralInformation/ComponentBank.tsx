import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ModelBank } from "../../models/student/modelGeneralInformation";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { ThunkFunctionGetBank } from "../../redux/thunkFunction/generalInformation/ThunkFuntionGeneralInformationAccountStudent";
import { CSVLink } from "react-csv";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { ThunkFunctionUpdateBank } from "../../redux/thunkFunction/generalInformation/ThunkFunctionUpdateGeneralInformation";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";

const ComponentBank: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const listBank: ModelBank[] = useSelector((state: TypeReducer) => state.generalInformation.Bank);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);

    const [bank, setBank] = useState<ModelBank[]>([]);

    useEffect(() => {
        dispatch(ThunkFunctionGetBank());
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
                    <p style={{ fontSize: "26px"}}>{message === "Done" ? "Th??nh c??ng" : "Th???t b???i"}</p>
                </div>
            </div>}
            <div className="col-md-12" style={{ marginBottom: "20px" }}>
                <input
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                        const bankFile: FileList | null = e.target.files;
                        if (bankFile !== null) {
                            ReadFileExcel(bankFile, setBank);
                        }
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        dispatch(ThunkFunctionUpdateBank(bank));
                    }}
                >Update Bank</button>
            </div>
            <CSVLink data={listBank} filename="bank" className="btn btn-success">Export Data</CSVLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>M?? sv</th>
                        <th>Ch??? t??i kho???n</th>
                        <th>Ng??n h??ng</th>
                        <th>Chi nh??nh</th>
                        <th>S??? TK</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listBank.map(
                            (bank: ModelBank, i) =>
                                <tr key={i}>
                                    <td>{bank.StudentBaseInfo?.StudentCode}</td>
                                    <td>{bank.AccountHolder}</td>
                                    <td>{bank.Name}</td>
                                    <td>{bank.Branch}</td>
                                    <td>{bank.AccountNumber}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentBank;