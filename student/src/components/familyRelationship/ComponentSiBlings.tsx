import React, { useContext, useState } from "react";
import { FamilyContext } from "./ComponentFamilyRelationship";
import { ModelSiBlings } from "../../models/student/modelFamilyRelationship";
import { useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";

interface props {
    type: string
    data: any
    setData: any
}

const ComponentAddSiBling = (props: props) => {

    return (
        <>
            {props.type === "select" ?
                <select
                    value={props.data}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        props.setData(e.target.value);
                    }}
                >
                    <option value="Anh trai">Anh trai</option>
                    <option value="Chị gái">Chị Gái</option>
                    <option value="Em trai">Em trai</option>
                    <option value="Em gái">Em gái</option>
                </select> 
                :<input
                    value={props.data}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        props.setData(e.target.value);
                    }}
                />
            }
        </>
    )
}

const ComponentSiBlings: React.FC = () => {

    const familyContext = useContext(FamilyContext);
    const baseInfo = useSelector((state: TypeReducer) => state.generalInformation.BaseInfo);

    const [relationship, setRelationship] = useState<string>("Anh trai");
    const [name, setName] = useState<string>("");
    const [date_of_birth, setDateOfBirth] = useState<string>("");
    const [job, setJob] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [addingtional_information, setAddingtionalInformation] = useState<string>("");

    return (
        <div className="col-md-12">
            <li className="col-md-12">
                <b>Thông tin về Anh, Chị, Em ruột: </b>
                <div className="col-md-12">
                    <table className="table table-bordered col-md-10">
                        <thead>
                            <tr>
                                <th>Quan hệ</th>
                                <th>Họ tên</th>
                                <th>Năm sinh</th>
                                <th>Nghề nghiệp</th>
                                <th>Chỗ ở hiện tại</th>
                                <th>Thông tin bổ sung</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                familyContext?.Update &&
                                <tr>
                                    <th>
                                        <ComponentAddSiBling
                                            type="select"
                                            data={relationship}
                                            setData={setRelationship}
                                        />
                                    </th>
                                    <th>
                                        <ComponentAddSiBling
                                            type="input"
                                            data={name}
                                            setData={setName}
                                        />
                                    </th>
                                    <th>
                                        <ComponentAddSiBling
                                            type="input"
                                            data={date_of_birth}
                                            setData={setDateOfBirth}
                                        />
                                    </th>
                                    <th>
                                        <ComponentAddSiBling
                                            type="input"
                                            data={job}
                                            setData={setJob}
                                        />
                                    </th>
                                    <th>
                                        <ComponentAddSiBling
                                            type="input"
                                            data={address}
                                            setData={setAddress}
                                        />
                                    </th>
                                    <th>
                                        <ComponentAddSiBling
                                            type="input"
                                            data={addingtional_information}
                                            setData={setAddingtionalInformation}
                                        />
                                    </th>
                                    <th>
                                        <button 
                                            className="btn"
                                            onClick={() => {
                                                const siblings: ModelSiBlings[] | undefined = familyContext.SiBlings;
                                                const newSibling: any = {
                                                    BaseInfoId: baseInfo.Id,
                                                    Relationship: relationship,
                                                    Name: name,
                                                    DateOfBirth: date_of_birth,
                                                    Job: job,
                                                    Address: address,
                                                    AdditionalInformation: addingtional_information,
                                                }

                                                let checkShort: boolean = true;

                                                for(let key in newSibling) {
                                                    if(newSibling[key] === "") {
                                                        checkShort = false;
                                                    }
                                                }

                                                if(checkShort) {
                                                    siblings?.push(newSibling);
                                                    familyContext.SetSiBling(siblings);
                                                    setRelationship("Anh trai");
                                                    setName("");
                                                    setDateOfBirth("");
                                                    setAddress("");
                                                    setJob("");
                                                    setAddingtionalInformation("");
                                                } else {
                                                    console.log("Điền thiếu thông tin");
                                                }


                                            }}
                                        >Add</button>
                                    </th>
                                </tr>
                            }
                            {
                                familyContext?.SiBlings !== undefined &&
                                familyContext.SiBlings.map(
                                    (sibling: ModelSiBlings, i) =>
                                        <tr key={i}>
                                            <td>{sibling.Relationship}</td>
                                            <td>{sibling.Name}</td>
                                            <td>{sibling.DateOfBirth}</td>
                                            <td>{sibling.Job}</td>
                                            <td>{sibling.Address}</td>
                                            <td>{sibling.AdditionalInformation}</td>
                                            {
                                                familyContext.Update &&
                                                <td>
                                                    <button 
                                                        className="btn"
                                                        onClick={() => {
                                                            const newSibling: ModelSiBlings[] | undefined = familyContext.SiBlings?.filter((sibl: ModelSiBlings, index) => index !== i);
                                                            if(newSibling !== undefined) {
                                                                familyContext.SetSiBling(newSibling);
                                                            }
                                                        }}
                                                    >X</button>
                                                </td>
                                            }
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </li>
        </div>
    )
}

export default ComponentSiBlings;