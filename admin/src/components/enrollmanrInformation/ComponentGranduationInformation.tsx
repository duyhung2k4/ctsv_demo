import React, { useEffect, useState } from "react";
import { ModelGranduationInformation } from "../../models/student/modelEnrollmentInformation";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkFunctionGetGranduationInformation } from "../../redux/thunkFunction/enrollmentInformation/ThunkFunctionGetEnrollmentInformation";
import { CSVLink } from "react-csv";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { ThunkFunctionUpdateGranduationInformation } from "../../redux/thunkFunction/enrollmentInformation/ThunkFunctionUpdateEnrollmentInformation";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";
const ComponentGranduationInformation: React.FC = () => {

    const listGranduationInformation: ModelGranduationInformation[] = useSelector((state: TypeReducer) => state.enrollmentInformation.GranduationInformation);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);
    const dispatch: Dispatch<any> = useDispatch();

    const [granduation, setGranduation] = useState<ModelGranduationInformation[]>([]);

    useEffect(() => {
        dispatch(ThunkFunctionGetGranduationInformation());
    }, [message])

    return (
        <div>
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
                        const fileList: FileList | null = e.target.files;
                        if(fileList !== null) {
                            ReadFileExcel(fileList, setGranduation);
                        } 
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        dispatch(ThunkFunctionUpdateGranduationInformation(granduation));
                    }}
                >Update Granduaction Information</button>
            </div>
            <br/>
            <CSVLink data={listGranduationInformation} filename="granduation_information" className="btn btn-success">Export Data</CSVLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>Mã SV</th>
                        <th>Xếp loại học lực</th>
                        <th>Xếp loại hạnh kiểm</th>
                        <th>Năm quyết định</th>
                        <th>Số quyết định tốt nghiệp</th>
                        <th>Xếp loại tốt nghiệp</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listGranduationInformation.map(
                            (granduaion: ModelGranduationInformation, i) => 
                            <tr key={i}>
                                <td>{granduaion.StudentBaseInfo?.StudentCode}</td>
                                <td>{granduaion.RankAcademic}</td>
                                <td>{granduaion.RatingOfConduct}</td>
                                <td>{granduaion.YearOfDecision}</td>
                                <td>{granduaion.NumberOfGraduationDecisions}</td>
                                <td>{granduaion.GraduationGrade}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentGranduationInformation;