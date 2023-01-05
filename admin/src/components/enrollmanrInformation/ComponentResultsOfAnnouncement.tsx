import React, { useEffect, useState } from "react";
import { ModelResultsOfAnnouncement } from "../../models/student/modelEnrollmentInformation";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkFunctionGetResultsOfAnnouncement } from "../../redux/thunkFunction/enrollmentInformation/ThunkFunctionGetEnrollmentInformation";
import { CSVLink } from "react-csv";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { ThunkFunctionUpdateResultsOfAnnouncement } from "../../redux/thunkFunction/enrollmentInformation/ThunkFunctionUpdateEnrollmentInformation";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";
const ComponentResultsOfAnnouncement: React.FC = () => {

    const listResultsOfAnnouncement: ModelResultsOfAnnouncement[] = useSelector((state: TypeReducer) => state.enrollmentInformation.ResultsOfAnnouncement);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);
    const dispatch: Dispatch<any> = useDispatch();
    const [result, setResult] = useState<ModelResultsOfAnnouncement[]>([]);

    console.log(listResultsOfAnnouncement);

    useEffect(() => {
        dispatch(ThunkFunctionGetResultsOfAnnouncement());
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
            <div className="col-md-12" style={{ marginBottom: "20px"}}>
                <input
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const fileList: FileList | null = e.target.files;
                        if(fileList !== null) {
                            ReadFileExcel(fileList, setResult);
                        }
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        dispatch(ThunkFunctionUpdateResultsOfAnnouncement(result));
                    }}
                >Update Results Of Announcement</button>
            </div>
            <CSVLink data={listResultsOfAnnouncement} filename="results_of_announcement" className="btn btn-success">Export Data</CSVLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>Max SV</th>
                        <th>Tên Ngành</th>
                        <th>Mã Ngành</th>
                        <th>Hình thức trúng tuyển</th>
                        <th>Giải</th>
                        <th>Chứng chỉ quốc tế</th>
                        <th>Tổ hợp xét tuyển</th>
                        <th>Toán</th>
                        <th>Lí</th>
                        <th>Hóa</th>
                        <th>Văn</th>
                        <th>Anh</th>
                        <th>Sinh</th>
                        <th>Sử</th>
                        <th>Địa</th>
                        <th>Công dân</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listResultsOfAnnouncement.map(
                            (result: ModelResultsOfAnnouncement, i) =>
                            <tr key={i}>
                                <td>{result.StudentBaseInfo?.StudentCode}</td>
                                <td>{result.IndustryName}</td>
                                <td>{result.IndustryCode}</td>
                                <td>{result.Form}</td>
                                <td>{result.Award}</td>
                                <td>{result.InternationalCertificate}</td>
                                <td>{result.TotalScoreForAdmission}</td>
                                <td>{result.Toan}</td>
                                <td>{result.Li}</td>
                                <td>{result.Hoa}</td>
                                <td>{result.Van}</td>
                                <td>{result.Anh}</td>
                                <td>{result.Sinh}</td>
                                <td>{result.Su}</td>
                                <td>{result.Dia}</td>
                                <td>{result.CongDan}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentResultsOfAnnouncement;