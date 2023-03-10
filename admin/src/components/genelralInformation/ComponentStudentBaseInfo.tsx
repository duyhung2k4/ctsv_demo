import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ModelStudentBaseInfo } from "../../models/student/modelGeneralInformation";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { ThunkFunctionGetStudentBaseInfo } from "../../redux/thunkFunction/generalInformation/ThunkFuntionGeneralInformationAccountStudent";
import { CSVLink } from "react-csv";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { ThunkFunctionUpdateBaseInfo } from "../../redux/thunkFunction/generalInformation/ThunkFunctionUpdateGeneralInformation";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";

const ComponentStudentBaseInfo: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch()
    const listStudentBaseInfo: ModelStudentBaseInfo[] = useSelector((state: TypeReducer) => state.generalInformation.StudentBaseInfo);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);

    const [baseInfo, setBaseInfo] = useState<ModelStudentBaseInfo[]>([]);

    useEffect(() => {
        dispatch(ThunkFunctionGetStudentBaseInfo());
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

                        const fileList: FileList | null = e.target.files;

                        if(fileList !== null) {
                            ReadFileExcel(fileList, setBaseInfo);
                        }
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        dispatch(ThunkFunctionUpdateBaseInfo(baseInfo))
                    }} 
                >Update Base Info</button>
            </div>
            <CSVLink data={listStudentBaseInfo} filename="base_info" className="btn btn-success">Export Data</CSVLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>M?? sinh vi??n</th>
                        <th>Email</th>
                        <th>H???c v?? t??n n???m</th>
                        <th>T??n</th>
                        <th>Gi???i t??nh</th>
                        <th>Ng??y sinh</th>
                        <th>L???p</th>
                        <th>H??? ????o t???o</th>
                        <th>Kh??a</th>
                        <th>Khoa</th>
                        <th>Ng??nh</th>
                        <th>Ch????ng tr??nh ????o t???o</th>
                        <th>Tr???ng th??i</th>
                        <th>Ch???c v???</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listStudentBaseInfo.map(
                            (studentBaseInfo: ModelStudentBaseInfo, i) =>
                            <tr key={i}>
                                <td>{studentBaseInfo.Id}</td>
                                <td>{studentBaseInfo.StudentCode}</td>
                                <td>{studentBaseInfo.Email}</td>
                                <td>{studentBaseInfo.Firstname}</td>
                                <td>{studentBaseInfo.Lastname}</td>
                                <td>{studentBaseInfo.Gender ? "Nam" : "Nu"}</td>
                                <td>{studentBaseInfo.DateOfBirth}</td>
                                <td>{studentBaseInfo.Class}</td>
                                <td>{studentBaseInfo.TrainingSystem}</td>
                                <td>{studentBaseInfo.Course}</td>
                                <td>{studentBaseInfo.Department}</td>
                                <td>{studentBaseInfo.Branch}</td>
                                <td>{studentBaseInfo.EducationProgram}</td>
                                <td>{studentBaseInfo.Status ? "Dang hoc" : "Nghi hoc"}</td>
                                <td>{studentBaseInfo.Position}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentStudentBaseInfo