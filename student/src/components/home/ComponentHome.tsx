import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import "./ComponentHome.css"
import { useDispatch, useSelector } from "react-redux";
import { ThunkfunctionGetBaseInfo } from "../../redux/thunkfunction/generalInformation/ThunkfunctionGetGeneralInformation";
import { ModelStudentBaseInfo } from "../../models/student/modelGeneralInformation";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import ComponentGeneralInformation from "../generalInformation/ComponentGeneralInformation";
import ComponentEnrollmentInformation from "../enrollmentInformation/ComponentEnrollmentInformation";
import ComponentFamilyRelationship from "../familyRelationship/ComponentFamilyRelationship";
import ComponentTeacher from "../teacher/ComponentTeacher";
import ComponentStudyScore from "../studyScore/ComponentStudyScore";
import ComponentAttendance from "../attendance/ComponentAttendance";

const ComponentHome: React.FC = () => {

    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();

    const accessToken: string | undefined = getCookie("accessToken");
    const baseInfo: ModelStudentBaseInfo = useSelector((state: TypeReducer) => state.generalInformation.BaseInfo);

    useEffect(() => {

        dispatch(ThunkfunctionGetBaseInfo());

        if (accessToken === undefined) {
            navigate("/login");
        }
    }, [])

    return (

        <div className="col-md-12" style={{ position: "absolute" }}>
            <div className="col-md-12" style={{ height: "50px", backgroundColor: "black", borderRadius: "5px", position: "fixed", zIndex: 3 }}>
            </div>
            <div className="col-md-12" style={{ marginTop: "100px", borderRadius: "5px" }}>
                <div className="row">
                    <div className="col-md-2">
                        <img className="col-md-12" src={baseInfo.Image} />
                    </div>
                    <div className="col-md-10">
                        <div>
                            <h3 style={{ color: "rgb(34, 54, 113)" }}>Thông Tin Cơ Bản</h3>
                        </div>
                        <div className="col-md-12" style={{ height: "3px", backgroundColor: "rgb(242, 101, 38)" }}></div>
                        <div className="row col-md-12">
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Mã SV</h6>
                                <p className="p_base_info">{baseInfo.StudentCode}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Họ và Đệm</h6>
                                <p className="p_base_info">{baseInfo.Firstname}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Tên</h6>
                                <p className="p_base_info">{baseInfo.Lastname}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Giới tính</h6>
                                <p className="p_base_info">{baseInfo.Gender ? "Nam" : "Nữ"}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Ngày sinh</h6>
                                <p className="p_base_info">{baseInfo.DateOfBirth}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Email</h6>
                                <p className="p_base_info">{baseInfo.Student?.Email}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Lớp</h6>
                                <p className="p_base_info">{baseInfo.Class}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Hệ đào tạo</h6>
                                <p className="p_base_info">{baseInfo.TrainingSystem}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Khóa</h6>
                                <p className="p_base_info">{baseInfo.Course}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Khoa</h6>
                                <p className="p_base_info">{baseInfo.Department}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Ngành</h6>
                                <p className="p_base_info">{baseInfo.Branch}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Chương trình đào tạo</h6>
                                <p className="p_base_info">{baseInfo.EducationProgram}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Trạng thái</h6>
                                <p className="p_base_info">{baseInfo.Status ? "Đang học" : "Nghỉ học"}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info">Chức vụ</h6>
                                <p className="p_base_info">{baseInfo.Position}</p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info"></h6>
                                <p className="p_base_info"></p>
                            </div>
                            <div className="col-md-3 base_info">
                                <h6 className="p_base_info"></h6>
                                <p className="p_base_info"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12" style={{ borderTop: "3px solid rgb(242, 101, 38)", marginTop: "20px" }}>
                <div className="col-md-12 row">
                    <div className="col-md-2" style={{ marginTop: "20px" }}>
                        <ul className="navbar-nav mr-auto" style={{ height: "100%", borderRight: "1px solid black", }}>
                            <li className="nav-item active li-link-info">
                                <NavLink
                                    style={{ paddingLeft: "8px" }}
                                    className={({ isActive }) => {
                                        return isActive ? "nav-link link-info-2" : "nav-link link-info"
                                    }}
                                    to="/study_score"
                                >Điểm học tập</NavLink>
                            </li>
                            <li className="nav-item active li-link-info">
                                <NavLink
                                    style={{ paddingLeft: "8px" }}
                                    className={({ isActive }) => {
                                        return isActive ? "nav-link link-info-2" : "nav-link link-info"
                                    }}
                                    to="/attendance"
                                >Điểm danh chuyên cần</NavLink>
                            </li>
                            <li className="nav-item active li-link-info">
                                <NavLink
                                    style={{ paddingLeft: "8px" }}
                                    className={({ isActive }) => {
                                        return isActive ? "nav-link link-info-2" : "nav-link link-info"
                                    }}
                                    to="/general_information"
                                >Thông tin chung</NavLink>
                            </li>
                            <li className="nav-item active li-link-info">
                                <NavLink
                                    style={{ paddingLeft: "8px" }}
                                    className={({ isActive }) => {
                                        return isActive ? "nav-link link-info-2" : "nav-link link-info"
                                    }}
                                    to="/enrollment_information"
                                >Thông tin tuyển sinh</NavLink>
                            </li>
                            <li className="nav-item active li-link-info">
                                <NavLink
                                    style={{ paddingLeft: "8px" }}
                                    className={({ isActive }) => {
                                        return isActive ? "nav-link link-info-2" : "nav-link link-info"
                                    }}
                                    to="/family_relationship"
                                >Quan hệ gia đình</NavLink>
                            </li>
                            <li className="nav-item active li-link-info">
                                <NavLink
                                    style={{ paddingLeft: "8px" }}
                                    className={({ isActive }) => {
                                        return isActive ? "nav-link link-info-2" : "nav-link link-info"
                                    }}
                                    to="/teacher"
                                >Giảng viên quản lí</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-10" style={{ marginTop: "20px", marginBottom: "40px" }}>
                        <Routes>
                            <Route path="/" element={<ComponentGeneralInformation />} />
                            <Route path="/general_information" element={<ComponentGeneralInformation />} />
                            <Route path="/enrollment_information" element={<ComponentEnrollmentInformation />} />
                            <Route path="/family_relationship" element={<ComponentFamilyRelationship />} />
                            <Route path="/teacher" element={<ComponentTeacher />} />
                            <Route path="/study_score" element={<ComponentStudyScore />} />
                            <Route path="/attendance" element={<ComponentAttendance />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ComponentHome;