import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ModelAttendance } from "../../models/modelAttendance";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkfunctionGetAttendance, ThunkfunctionUpdateAttendance } from "../../redux/thunkfunction/attendance/ThunkfunctionAttendance";
import { CSVLink } from "react-csv";
import "./ComponentAttendance.css";
import { ReadFileCSV } from "../../module/moduleReadFileCsv";
import { ActionTypeCourseCode } from "../../redux/action/actionCourseCode";

export const ComponentAttendanceChild: React.FC = () => {

    const { course_code_id } = useParams();
    const id: number = Number(course_code_id);

    const listAttendance: ModelAttendance[] = useSelector((state: TypeReducer) => state.attendance.ListAttendance);
    const message: string = useSelector((state: TypeReducer) => state.courseCode.Message);

    const [attendance_update, setAttendanceUpdate] = useState<ModelAttendance[]>([]);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(ThunkfunctionGetAttendance(id));
        dispatch({
            type: ActionTypeCourseCode.CHANGE_MESSAGE,
            payload: ""
        })
    }, [id, message])

    return (
        <div className="col-md-12" style={{ marginTop: "50px" }}>
            <div className="col-md-12 row" style={{ marginBottom: "50px" }}>
                <div className="col-md-4">
                    <CSVLink className="btn btn-success" data={listAttendance} filename="attendance">Export Data</CSVLink>
                </div>
                <div className="row col-md-4 offset-md-4">
                    <input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file_list: FileList | null = e.target.files;
                            if (file_list !== null) {
                                ReadFileCSV(file_list, setAttendanceUpdate);
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            dispatch(ThunkfunctionUpdateAttendance(attendance_update));
                        }}
                        className="btn"
                    >Update</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>H???c k??</th>
                        <th>L???p h???c ph???n</th>
                        <th>M?? sinh vi??n</th>
                        <th>S??? bu???i ???? d???y</th>
                        <th>S??? bu???i ??i h???c</th>
                        <th>S??? bu???i v???ng c?? ph??p</th>
                        <th>S??? bu???i v???ng kh??ng ph??p</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listAttendance.map(
                            (attendance: ModelAttendance, i) =>
                                <tr key={i}>
                                    <td>{attendance.Semester}</td>
                                    <td>{attendance.CourseCode?.Name}</td>
                                    <td>{attendance.StudentBaseInfo?.StudentCode}</td>
                                    <td>{attendance.NumberOfLessonsTaught}</td>
                                    <td>{attendance.NumberOfSchoolDays}</td>
                                    <td>{attendance.AbsenceWithoutPermission}</td>
                                    <td>{attendance.UnexcusedAbsence}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}