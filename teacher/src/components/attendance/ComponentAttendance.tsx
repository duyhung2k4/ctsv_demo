import React, { useEffect } from "react";
import "./ComponentAttendance.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ModelCourseCode } from "../../models/modelCourseCode";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { ComponentAttendanceChild } from "./ComponentAttendanceChild";
import { Dispatch } from "redux";
import { ThunkfunctionGetCourseCode } from "../../redux/thunkfunction/courseCode/ThunkfunctionGetCourseCode";

const ComponentAttendance: React.FC = () => {

    const listCourseCode: ModelCourseCode[] = useSelector((state: TypeReducer) => state.courseCode.ListCourseCode);
    const navigate = useNavigate();

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(ThunkfunctionGetCourseCode());
    }, [])

    return (
        <div className="col-md-12" style={{ marginTop: "20px" }}>
            <select
                className="col-md-3 offset-md-8"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    navigate(`${e.target.value}`);
                }}
            >
                <option value="/attendance">Các lớp học phần</option>
                {
                    listCourseCode.map(
                        (courseCode: ModelCourseCode, i) =>
                            <option key={i} value={`/attendance/${courseCode.Id}`}>{courseCode.Name}</option>
                    )
                }
            </select>
            <Routes>
                <Route path="/:course_code_id" element={<ComponentAttendanceChild />} />
            </Routes>
        </div>
    )
}

export default ComponentAttendance;