import React, { createContext, useEffect, useState } from "react";
import "./ComponentFamilyRelationship.css";
import { ComponentParents } from "./ComponentParents";
import { ModelParents, ModelSiBlings } from "../../models/student/modelFamilyRelationship";
import { useDispatch, useSelector } from "react-redux";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { Dispatch } from "redux";
import { ThunkfunctionGetParents, ThunkfunctionGetSiBlings } from "../../redux/thunkfunction/familyRelationship/ThunkfunctionGetFamilyRelationship";
import { ThunkfunctionUpdateParents, ThunkfunctionUpdateSiblings } from "../../redux/thunkfunction/familyRelationship/ThunkfunctionUpdateFamilyRelationship";
import ComponentSiBlings from "./ComponentSiBlings";

interface Family {
    Father?: ModelParents
    Mother?: ModelParents
    SiBlings?: ModelSiBlings[]
    SetFather?: any
    SetMother?: any
    SetSiBling?: any
    Update?: boolean
}

export const FamilyContext: React.Context<Family | null> = createContext<Family | null>(null);

const ComponentFamilyRelationship: React.FC = () => {

    const parents: ModelParents[] = useSelector((state: TypeReducer) => state.familyRelationship.Parents);
    const siblings: ModelSiBlings[] = useSelector((state: TypeReducer) => state.familyRelationship.SiBlings);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);

    const [father, setFather] = useState<ModelParents>({});
    const [mother, setMother] = useState<ModelParents>({});
    const [sibling, setSiBling] = useState<ModelSiBlings[]>([]);
    const [update, setUpdate] = useState<boolean>(false);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        setFather(parents[0]);
        setMother(parents[1]);
        setSiBling(siblings);
    }, [parents, siblings])

    useEffect(() => {
        dispatch(ThunkfunctionGetParents());
        dispatch(ThunkfunctionGetSiBlings());
    }, [message])

    return (
        <FamilyContext.Provider
            value={{
                Father: father,
                Mother: mother,
                SiBlings: sibling,
                SetFather: setFather,
                SetMother: setMother,
                SetSiBling: setSiBling,
                Update: update
            }}
        >
            <div className="col-md-12">
                <div className="row" style={{ float: "right" }}>
                    {!update && <button
                        className="btn"
                        onClick={() => {
                            setUpdate(!update);
                        }}
                    >Chỉnh Sửa</button>}
                    {update &&
                        <button
                            onClick={() => {
                                dispatch(ThunkfunctionUpdateParents([father, mother]));
                                dispatch(ThunkfunctionUpdateSiblings(sibling));
                                setUpdate(!update);
                            }}
                            className="btn btn-success"
                        >Cập nhật</button>
                    }
                    {update &&
                        <button
                            onClick={() => {
                                setUpdate(!update);
                            }}
                            className="btn btn-danger">
                            Hủy</button>
                    }
                </div>
                <span style={{ clear: "both" }}></span>
                <div className="col-md-12" style={{ paddingBottom: "50px" }}>
                    <div className="col-md-12">
                        <h3>Cha mẹ</h3>
                        <ComponentParents/>
                        <h3>Anh chị em</h3>
                        <ComponentSiBlings/>
                    </div>
                </div>
            </div>
        </FamilyContext.Provider>
    )
}

export default ComponentFamilyRelationship;