import React, { useEffect, useState } from "react";
import { ModelGranduationInformation, ModelResultsOfAnnouncement } from "../../models/student/modelEnrollmentInformation";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkfunctionGetGranduationInformation, ThunkfunctionGetResultsOfAnnouncement } from "../../redux/thunkfunction/enrollmentInformation/ThunkfunctionGetEnrollmentInformation";
import "./ComponentEnrollmentInformation.css";

const ComponentEnrollmentInformation:React.FC = () => {

    const granduationInformation: ModelGranduationInformation = useSelector((state: TypeReducer) => state.enrollmentInformation.GranduationInformation);
    const resultsOfAnnouncement: ModelResultsOfAnnouncement = useSelector((state: TypeReducer) => state.enrollmentInformation.ResultsOfAnnouncement);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);

    const [total_score_for_admission, setTotalScoreForAdmission] = useState<number>(0);
    const tu_nhien:string[] = ["A00", "A01", "B00", "B"];

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        if(resultsOfAnnouncement.Combination === "A00") {
            setTotalScoreForAdmission(resultsOfAnnouncement.Toan + resultsOfAnnouncement.Li + resultsOfAnnouncement.Hoa);
        } else if(resultsOfAnnouncement.Combination === "B00") {
            setTotalScoreForAdmission(resultsOfAnnouncement.Toan + resultsOfAnnouncement.Hoa + resultsOfAnnouncement.Sinh);
        }
    }, [resultsOfAnnouncement])

    useEffect(() => {
        dispatch(ThunkfunctionGetGranduationInformation());
        dispatch(ThunkfunctionGetResultsOfAnnouncement());
    }, [message])

    return (
        <div className="col-md-12" style={{ paddingBottom: "50px" }}>
            <div className="col-md-12">
                <h3 className="col-md-12">Thông tin tốt nghiệp cấp 3</h3>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Xếp loại học lực</div>
                    <div className="col-md-8">{granduationInformation.RankAcademic}</div>
                </div>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Xếp loại hạnh kiểm</div>
                    <div className="col-md-8">{granduationInformation.RatingOfConduct}</div>
                </div>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Năm quyết định</div>
                    <div className="col-md-8">{granduationInformation.YearOfDecision}</div>
                </div>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Số quyết định tốt nghiệp</div>
                    <div className="col-md-8">{granduationInformation.NumberOfGraduationDecisions}</div>
                </div>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Xếp loại tốt nghiệp</div>
                    <div className="col-md-8">{granduationInformation.GraduationGrade}</div>
                </div>
            </div>
            <div className="col-md-12" style={{ marginTop: "40px" }}>
                <h3 className="col-md-12">Ngành học</h3>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Tên ngành</div>
                    <div className="col-md-8">{resultsOfAnnouncement.IndustryName}</div>
                </div>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Mã ngành</div>
                    <div className="col-md-8">{resultsOfAnnouncement.IndustryCode}</div>
                </div>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Hình thức xét tuyển</div>
                    <div className="col-md-8">{resultsOfAnnouncement.Form}</div>
                </div>
            </div>

            <div className="col-md-12" style={{ marginTop: "40px", marginBottom: "500px" }}>
                <h3 className="col-md-12">Kết quả xét tuyển</h3>
                <div className="col-md-12 row enroll-info">
                    <div className="col-md-4">Giải quốc tế/Quốc gia/Tỉnh/Thành phố</div>
                    <div className="col-md-8">{resultsOfAnnouncement.Award}</div>
                </div>
                <div className="col-md-12 row enroll-info">
                    <div className="col-md-4">Chứng chỉ quốc tế</div>
                    <div className="col-md-8">{resultsOfAnnouncement.InternationalCertificate}</div>
                </div>
                <div className="col-md-12 row enroll-info">
                    <div className="col-md-4">Tổ hợp môn xét tuyển</div>
                    <div className="col-md-8" style={{ height: "390px" }}>
                        <table className="table table-bordered col-md-12" style={{ marginTop: "20px" }}>
                            <tbody>
                                <tr>
                                    <th>Tổ hợp</th>
                                    <td>{resultsOfAnnouncement.Combination}</td>
                                    <th>Tổng điểm</th>
                                    <td>{total_score_for_admission}</td>
                                </tr>
                                <tr>
                                    <th>Môn 1</th>
                                    <td>Toán</td>
                                    <th>Điểm</th>
                                    <td>{resultsOfAnnouncement.Toan}</td>
                                </tr>
                                <tr>
                                    <th>Môn 2</th>
                                    <td>Văn</td>
                                    <th>Điểm</th>
                                    <td>{resultsOfAnnouncement.Van}</td>
                                </tr>
                                <tr>
                                    <th>Môn 3</th>
                                    <td>Anh</td>
                                    <th>Điểm</th>
                                    <td>{resultsOfAnnouncement.Anh}</td>
                                </tr>
                                {
                                    tu_nhien.find((to_hop: string) => to_hop === resultsOfAnnouncement.Combination) !== undefined ? 
                                    <>
                                    <tr>
                                        <th>Môn 4</th>
                                        <td>Lí</td>
                                        <th>Điểm</th>
                                        <td>{resultsOfAnnouncement.Li}</td>
                                    </tr>
                                    <tr>
                                        <th>Môn 5</th>
                                        <td>Hóa</td>
                                        <th>Điểm</th>
                                        <td>{resultsOfAnnouncement.Hoa}</td>
                                    </tr>
                                    <tr>
                                        <th>Môn 6</th>
                                        <td>Sinh</td>
                                        <th>Điểm</th>
                                        <td>{resultsOfAnnouncement.Sinh}</td>
                                    </tr>
                                    </> :
                                    <>
                                    <tr>
                                        <th>Môn 4</th>
                                        <td>Sử</td>
                                        <th>Điểm</th>
                                        <td>{resultsOfAnnouncement.Su}</td>
                                    </tr>
                                    <tr>
                                        <th>Môn 5</th>
                                        <td>Địa</td>
                                        <th>Điểm</th>
                                        <td>{resultsOfAnnouncement.Dia}</td>
                                    </tr>
                                    <tr>
                                        <th>Môn 6</th>
                                        <td>Công Dân</td>
                                        <th>Điểm</th>
                                        <td>{resultsOfAnnouncement.CongDan}</td>
                                    </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComponentEnrollmentInformation;