import React, { useEffect } from "react";
import { ModelCourseCode } from "../../models/modelCourseCode";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkfunctionGetCourseCode } from "../../redux/thunkfunction/courseCode/ThunkfunctionGetCourseCode";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ComponentStudyScoreChild } from "./ComponentStudyScoreChild";
import "./ComponentStudyScore.css";

const ComponentStudyScore: React.FC = () => {

    const listCourseCode: ModelCourseCode[] = useSelector((state: TypeReducer) => state.courseCode.ListCourseCode);

    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();

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
                <option value="/study_score">Các lớp học phần</option>
                {
                    listCourseCode.map(
                        (courseCode: ModelCourseCode, i) =>
                        <option key={i} value={`/study_score/${courseCode.Id}`}>{courseCode.Name}</option>
                    )
                }
            </select>
            <Routes>
                <Route path="/:course_code_id" element={<ComponentStudyScoreChild />} />
            </Routes>
        </div>
    )
}

export default ComponentStudyScore;