import React, { useEffect } from "react";
import "./ComponentStudyScore.css";
import { ModelStudyScore } from "../../models/student/modelStudyScore";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkfunctionGetStudyScore } from "../../redux/thunkfunction/studyScore/ThunkfunctionStudyScore";

const ComponentStudyScore: React.FC = () => {

    const listStudyScore: ModelStudyScore[] = useSelector((state: TypeReducer) => state.studyScore.ListStudyScore);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(ThunkfunctionGetStudyScore());
    }, [])

    return (
        <div className="col-md-12">
            <h3>Điểm theo học kì</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Mã học phần</th>
                        <th>Tên học phần</th>
                        <th>Số tín chỉ</th>
                        <th>Học kì</th>
                        <th>Điểm thang 10</th>
                        <th>Điểm thang 4</th>
                        <th>Điểm chữ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listStudyScore.map(
                            (studyScore: ModelStudyScore, i) =>
                            <tr key={i}>
                                <th>{studyScore.CourseCode?.Code}</th>
                                <th>{studyScore.CourseCode?.Name}</th>
                                <th>{studyScore.Credits}</th>
                                <th>{studyScore.Semester}</th>
                                <th>{studyScore.ScalePoint10}</th>
                                <th>{studyScore.ScalePoint4}</th>
                                <th>{studyScore.LetterPoint}</th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentStudyScore;