import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ModelAddress } from "../../models/student/modelGeneralInformation";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { ThunkFunctionGetAddress } from "../../redux/thunkFunction/generalInformation/ThunkFuntionGeneralInformationAccountStudent";
import { CSVLink } from "react-csv";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { ThunkFunctionUpdateAddress } from "../../redux/thunkFunction/generalInformation/ThunkFunctionUpdateGeneralInformation";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";


const ComponentAddress: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const listAddress: ModelAddress[] = useSelector((state: TypeReducer) => state.generalInformation.Address);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);

    const [address, setAddress] = useState<ModelAddress[]>([]);

    useEffect(() => {
        dispatch(ThunkFunctionGetAddress());
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

                        const addressFile: FileList | null = e.target.files;
                        if(addressFile !== null) {
                            ReadFileExcel(addressFile, setAddress)
                        }
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        dispatch(ThunkFunctionUpdateAddress(address))
                    }}
                >Update Address</button>
            </div>
            <CSVLink data={listAddress} filename="address" className="btn btn-success" >Export Data</CSVLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>M?? sv</th>
                        <th>N??i sinh</th>
                        <th>?????a ch??? c?? tr?? hi???n t???i</th>
                        <th>?????a ch??? th?????ng tr??</th>
                        <th>?????a ch??? li??n h???</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listAddress.map(
                            (address: ModelAddress, i) => 
                            <tr key={i}>
                                <td>{address.StudentBaseInfo?.StudentCode}</td>
                                <td>{address.PlaceOfBirth}</td>
                                <td>{address.CurrentResidentialAddress}</td>
                                <td>{address.PermanentAddress}</td>
                                <td>{address.AddressContact}</td>
                            </tr>
                        )   
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentAddress;