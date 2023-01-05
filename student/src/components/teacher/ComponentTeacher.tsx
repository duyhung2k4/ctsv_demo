import React from "react";
import "./ComponentTeacher.css";
import { ModelTeacher } from "../../models/teacher/ModelTeacher";
import { useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";

const ComponentTeacher: React.FC = () => {

    const teacher: ModelTeacher | undefined = useSelector((state: TypeReducer) => state.generalInformation.BaseInfo.Teacher);

    return (
        <div className="col-md-12" style={{ paddingBottom: "50px" }}>
            <div className="col-md-12">
                <h3>Giảng viên quản lí</h3>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Họ tên</div>
                    <div className="col-md-8">{teacher !== undefined && teacher.Name}</div>
                </div>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Số điện thoại</div>
                    <div className="col-md-8">{teacher !== undefined && teacher.Phone}</div>
                </div>
                <div className="col-md-6 row enroll-info">
                    <div className="col-md-4">Email</div>
                    <div className="col-md-8">{teacher !== undefined && teacher.Email}</div>
                </div>
            </div>
        </div>
    )
}

export default ComponentTeacher;