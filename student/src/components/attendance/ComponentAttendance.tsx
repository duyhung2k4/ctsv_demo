import React, { useEffect } from "react";
import "./ComponentAttendance.css";
import { ModelAttendance } from "../../models/student/modelAttendance";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { access, stat } from "fs";
import { Dispatch } from "redux";
import { ThunkfunctionGetAttendance } from "../../redux/thunkfunction/attendance/ThunkfunctionGetAttendance";
const ComponentAttendance: React.FC = () => {

    const listAttendance: ModelAttendance[] = useSelector((state: TypeReducer) => state.attendance.ListAttendance);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(ThunkfunctionGetAttendance());
    }, [])

    return (
        <div className="col-md-12">
            <h3>Điểm danh chuyên cần</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Học kì</th>
                        <th>Lớp học phần</th>
                        <th>Số buổi đã dạy</th>
                        <th>Số buổi đi học</th>
                        <th>Số buối vắng có phép</th>
                        <th>Số buổi vắng không phép</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listAttendance.map(
                            (attendance: ModelAttendance, i) =>
                            <tr key={i}>
                                <th>{attendance.Semester}</th>
                                <th>{attendance.CourseCode?.Name}</th>
                                <th>{attendance.NumberOfLessonsTaught}</th>
                                <th>{attendance.NumberOfSchoolDays}</th>
                                <th>{attendance.AbsenceWithoutPermission}</th>
                                <th>{attendance.UnexcusedAbsence}</th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentAttendance;