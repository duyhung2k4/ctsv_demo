import React, { useEffect, useState } from "react";
import { ModelCourse } from "../../models/student/modelCourse";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkFunctionCreateCourse, ThunkFunctionGetCourse } from "../../redux/thunkFunction/course/ThunkFunctionCourse";
import { CSVLink } from "react-csv";
import { ReadFileExcel } from "../../module/moduleWithFileExcel";
import { ActionTypeGeneralInformation } from "../../redux/action/student/actionGeneralInformation";
const ComponentCourse: React.FC = () => {

    const listCourse: ModelCourse[] = useSelector((state: TypeReducer) => state.course.Course);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);
    const dispatch: Dispatch<any> = useDispatch();

    const [course, setCourse] = useState<ModelCourse[]>([{
        Name: "",
        Code: "",
        TeacherId: 1
    }]);

    useEffect(() => {
        dispatch(ThunkFunctionGetCourse());
    }, [message])

    return (
        <div className="sec__one col-md-12" style={{ marginTop: "20px" }}>
            {message && <div
                style={{
                    position: "fixed",
                    height: "25vh",
                    width: "30%",
                    border: (message === "Done" ? "1px solid green" : "1px solid red"),
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
                <div style={{ position: "relative", textAlign: "center", height: "20%", marginTop: "15%" }}>
                    <p style={{ fontSize: "26px" }}>{message === "Done" ? "Thành công" : "Thất bại"}</p>
                </div>
            </div>}
            <div className="col-md-12">
                <div className="col-md-12">
                    <input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const fileList: FileList | null = e.target.files;
                            if (fileList !== null) {
                                ReadFileExcel(fileList, setCourse);
                            }
                        }}
                    />
                    <button
                        className="btn"
                        onClick={() => {
                            dispatch(ThunkFunctionCreateCourse(course))
                        }}
                    >Update or Insert Course</button>
                </div>
                <CSVLink data={listCourse.length > 0 ? listCourse : course} filename="course" className="btn btn-success">Export Data</CSVLink>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
                            <th>Giáo viên</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listCourse.map(
                                (course: ModelCourse, i) =>
                                    <tr key={i}>
                                        <td>{course.Code}</td>
                                        <td>{course.Name}</td>
                                        <td>{course.Teacher?.Name}</td>
                                    </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ComponentCourse;