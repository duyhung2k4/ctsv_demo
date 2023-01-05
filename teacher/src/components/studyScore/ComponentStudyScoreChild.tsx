import React, { useEffect, useState } from "react";
import "./ComponentStudyScore.css";
import { useParams } from "react-router-dom";
import { ModelStudentBaseInfo } from "../../models/modelStudentBaseInfo";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkfunctionCreateStudyCodeAndAttendance } from "../../redux/thunkfunction/ThunkfunctionCreateStudyCodeAndAttendance";
import { ModelStudyScore } from "../../models/modelStudyScore";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { ThunkfunctionGetStudyScore, ThunkfunctionUpdateStudyScore } from "../../redux/thunkfunction/studyScore/ThunkfunctionGetStudyScore";
import { CSVLink } from "react-csv";
import { ReadFileCSV } from "../../module/moduleReadFileCsv";
import { ActionTypeCourseCode } from "../../redux/action/actionCourseCode";

export const ComponentStudyScoreChild: React.FC = () => {

    const { course_code_id } = useParams();
    const id: number = Number(course_code_id);
    const message: string = useSelector((state: TypeReducer) => state.courseCode.Message);

    const [create, setCreate] = useState<boolean>(false);
    const [study_score_update, setStudyScoreUpdate] = useState<ModelStudyScore[]>([]);
    const [student_code, setStudentCode] = useState<string>("");
    const [list_student, setListStudent] = useState<ModelStudentBaseInfo[]>([]);

    const listStudyScore: ModelStudyScore[] = useSelector((state: TypeReducer) => state.studyScore.ListStudyScore);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(ThunkfunctionGetStudyScore(id));
        dispatch({
            type: ActionTypeCourseCode.CHANGE_MESSAGE,
            payload: ""
        })
    }, [id, message])

    return (
        <div className="col-md-12">
            <div className="col-md-12">
                <div className="col-md-4 offset-md-8 row" style={{ marginTop: "20px", marginBottom: "50px" }}>
                    {
                        !create && <button className="btn" onClick={() => {
                            setCreate(!create);
                        }}>Tạo bảng điểm học sinh</button>
                    }
                    {
                        create && <button className="btn btn-success" onClick={() => {
                            dispatch(ThunkfunctionCreateStudyCodeAndAttendance(list_student, id));
                            setListStudent([]);
                            setCreate(!create);
                        }}>Tạo</button>
                    }
                    {
                        create && <button className="btn btn-danger" onClick={() => {
                            setCreate(!create);
                        }}>Hủy</button>
                    }
                </div>
                <span style={{ clear: "both" }}></span>
                {create && <div className="col-md-8 row">
                    <input
                        style={{ marginRight: "10px" }}
                        value={student_code}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setStudentCode(e.target.value);
                        }}
                    />
                    <button className="btn"
                        onClick={() => {
                            const newStudent: ModelStudentBaseInfo = {
                                StudentCode: student_code
                            }

                            student_code !== "" && setListStudent([...list_student, newStudent]);
                            setStudentCode("");
                        }}
                    >
                        Add Student
                    </button>
                </div>}
                {create && <p>DS Mã SV: [{list_student.map((std: ModelStudentBaseInfo, i) => <span key={i}>{`${std.StudentCode}, `}</span>)}]</p>}
            </div>
            <div className="col-md-12">
                <div className="col-md-12 row" style={{ marginBottom: "20px" }}>
                    <div className="col-md-4">
                        <CSVLink className="btn btn-success" data={listStudyScore} filename="study_score">Export Data</CSVLink>
                    </div>
                    <div style={{ float: "right" }} className="row col-md-4 offset-md-4">
                        <input
                            type="file"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const file_list: FileList | null = e.target.files;
                                if (file_list !== null) {
                                    ReadFileCSV(file_list, setStudyScoreUpdate);
                                }
                            }}
                        />
                        <button
                            className="btn"
                            onClick={() => {
                                dispatch(ThunkfunctionUpdateStudyScore(study_score_update));
                            }}
                        >Update</button>
                    </div>
                    <span style={{ clear: "both" }}></span>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
                            <th>Mã SV</th>
                            <th>Họ và tên</th>
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
                                        <th>{studyScore.CourseName}</th>
                                        <th>{studyScore.StudentBaseInfo?.StudentCode}</th>
                                        <th>{studyScore.StudentBaseInfo?.Firstname} {studyScore.StudentBaseInfo?.Lastname}</th>
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
        </div>
    )
}