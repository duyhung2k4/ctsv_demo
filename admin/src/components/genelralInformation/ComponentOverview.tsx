import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ModelOverview } from "../../models/student/modelGeneralInformation";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { ThunkFunctionGetOverview } from "../../redux/thunkFunction/generalInformation/ThunkFuntionGeneralInformationAccountStudent";
import { CSVLink } from "react-csv";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { ThunkFunctionUpdateOverview } from "../../redux/thunkFunction/generalInformation/ThunkFunctionUpdateGeneralInformation";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";
const ComponentOverview: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const listOverview: ModelOverview[] = useSelector((state: TypeReducer) => state.generalInformation.Overview);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);

    const [overview, setOverview] = useState<ModelOverview[]>([]);

    useEffect(() => {
        dispatch(ThunkFunctionGetOverview());
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
                        const fileOverview: FileList | null = e.target.files;
                        if(fileOverview !== null) {
                            ReadFileExcel(fileOverview, setOverview);
                        } 
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        console.log(overview);
                        dispatch(ThunkFunctionUpdateOverview(overview));
                    }}
                >Update Overview</button>
            </div>
            <CSVLink data={listOverview} filename="overview" className="btn btn-success">Export Data</CSVLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>M?? SV</th>
                        <th>S??? cmnd/cccd</th>
                        <th>Ng??y c???p</th>
                        <th>N??i c???p</th>
                        <th>Qu???c t???ch</th>
                        <th>D??n t???c</th>
                        <th>T??n gi??o</th>
                        <th>S??? th??? BHYT</th>
                        <th>?????i t?????ng ch??nh s??ch</th>
                        <th>?????i t?????ng ??u ti??n</th>
                        <th>Nh??m m??u</th>
                        <th>Ng??y v??o ?????ng</th>
                        <th>S??? quy???t ?????nh</th>
                        <th>Ng??y quy???t ?????nh</th>
                        <th>Ng??y v??o ??o??n</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOverview.map(
                            (overview: ModelOverview, i) => 
                            <tr key={i}>
                                <td>{overview.StudentBaseInfo?.StudentCode}</td>
                                <td>{overview.CccdNumber}</td>
                                <td>{overview.DateRange}</td>
                                <td>{overview.IssuedBy}</td>
                                <td>{overview.Nationality}</td>
                                <td>{overview.Ethnic}</td>
                                <td>{overview.Religion}</td>
                                <td>{overview.HealthInsuranceCardNumber}</td>
                                <td>{overview.PolicyObject}</td>
                                <td>{overview.PriorityObject}</td>
                                <td>{overview.BloodGroup}</td>
                                <td>{overview.NumberOfDecisionsToJoinTheParty}</td>
                                <td>{overview.PartyAdmissionDate}</td>
                                <td>{overview.DecisionDay}</td>
                                <td>{overview.DateOfAdmissionToTheUnion}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentOverview;