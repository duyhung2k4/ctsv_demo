import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { FamilyContext } from "./ComponentFamilyRelationship";
import { setDefaultResultOrder } from "dns";

interface props {
    keys: string
}

const ComponentChangeInfoFather = (props: props) => {

    const familyContext = useContext(FamilyContext);

    const data: any | undefined = familyContext?.Father;

    const [info, setInfo] = useState<string>("")

    useEffect(() => {
        data !== undefined && setInfo(data[`${props.keys}`]);
    }, [data])

    return (
        <>
            {
                familyContext?.Update === true && data !== undefined ?
                    (props.keys === "AcademicLevel" ?
                        <select 
                            value={info}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                data[`${props.keys}`] = e.target.value;
                                familyContext.SetFather(data);
                                setInfo(e.target.value);
                            }}
                        >
                            <option value="Tốt nghiệp Tiểu học">Tốt nghiệp Tiểu học</option>
                            <option value="Tốt nghiệp THCS">Tốt nghiệp THCS</option>
                            <option value="Tốt nghiệp THPT">Tốt nghiệp THPT</option>
                            <option value="Tốt nghiệp Trung cấp">Tốt nghiệp Trung cấp</option>
                        </select>
                        : <input
                            value={info}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                data[`${props.keys}`] = e.target.value;
                                familyContext.SetFather(data)
                                setInfo(e.target.value);
                            }}
                        />)
                    : <span>{data && data[`${props.keys}`]}</span>
            }
        </>
    )
}

const ComponentChangeInfoMother = (props: props) => {
    const familyContext = useContext(FamilyContext);

    const data: any | undefined = familyContext?.Mother;

    const [info, setInfo] = useState<string>("")

    useEffect(() => {
        data !== undefined && setInfo(data[`${props.keys}`]);
    }, [data])

    return (
        <>
            {
                familyContext?.Update === true && data !== undefined ?
                    (props.keys === "AcademicLevel" ?
                        <select 
                            value={info}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                data[`${props.keys}`] = e.target.value;
                                familyContext.SetMother(data);
                                setInfo(e.target.value);
                            }}
                        >
                            <option value="Tốt nghiệp Tiểu học">Tốt nghiệp Tiểu học</option>
                            <option value="Tốt nghiệp THCS">Tốt nghiệp THCS</option>
                            <option value="Tốt nghiệp THPT">Tốt nghiệp THPT</option>
                            <option value="Tốt nghiệp Trung cấp">Tốt nghiệp Trung cấp</option>
                        </select>
                        : <input
                            value={info}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                data[`${props.keys}`] = e.target.value;
                                familyContext.SetMother(data)
                                setInfo(e.target.value);
                            }}
                        />)
                    : <span>{data && data[`${props.keys}`]}</span>
            }
        </>
    )

}

export const ComponentParents: React.FC = () => {

    return (
        <div className="col-md-12">
            <li className="col-md-12">
                <b className="col-md-12">Thông tin bố</b>
                <div className="col-md-12" style={{ paddingLeft: "20px" }}>
                    <p>Họ và tên: <ComponentChangeInfoFather keys="Name" /></p>
                    <p>Dân tộc: <ComponentChangeInfoFather keys="Ethnic" /></p>
                    <p>Tôn giáo: <ComponentChangeInfoFather keys="Religion" /></p>
                    <p>Ngày sinh: <ComponentChangeInfoFather keys="DateOfBirth" /></p>
                    <p>Trình độ học vấn: <ComponentChangeInfoFather keys="AcademicLevel" /></p>
                    <p>Hộ khẩu thường trú: <ComponentChangeInfoFather keys="PermanentResidence" /></p>
                    <p>Số điện thoại: <ComponentChangeInfoFather keys="PhoneNumber" /></p>
                    <p>Email: <ComponentChangeInfoFather keys="Email" /></p>
                </div>
            </li>
            <li className="col-md-12">
                <b className="col-md-12">Thông tin Mẹ</b>
                <div className="col-md-12" style={{ paddingLeft: "20px" }}>
                    <p>Họ và tên: <ComponentChangeInfoMother keys="Name" /></p>
                    <p>Dân tộc: <ComponentChangeInfoMother keys="Ethnic" /></p>
                    <p>Tôn giáo: <ComponentChangeInfoMother keys="Religion" /></p>
                    <p>Ngày sinh: <ComponentChangeInfoMother keys="DateOfBirth" /></p>
                    <p>Trình độ học vấn: <ComponentChangeInfoMother keys="AcademicLevel" /></p>
                    <p>Hộ khẩu thường trú: <ComponentChangeInfoMother keys="PermanentResidence" /></p>
                    <p>Số điện thoại: <ComponentChangeInfoMother keys="PhoneNumber" /></p>
                    <p>Email: <ComponentChangeInfoMother keys="Email" /></p>
                </div>
            </li>
        </div>
    )
}