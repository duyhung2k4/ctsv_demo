import React, { useEffect, useState } from "react";
import "./ComponentGeneralInformation.css";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkfunctionGetBank, ThunkfunctionGetContact, ThunkfunctionGetOverview, ThunkfuntionGetAddress } from "../../redux/thunkfunction/generalInformation/ThunkfunctionGetGeneralInformation";
import { ModelAddress, ModelBank, ModelContact, ModelOverview } from "../../models/student/modelGeneralInformation";
import { TypeReducer } from "../../redux/reducer/mainReducer";
import { ThunkfunctionUpdateGeneralInformation } from "../../redux/thunkfunction/generalInformation/ThunkfunctionUpdateGeneralInformation";
import { ActionTypeGeneralInformation } from "../../redux/action/actiongeneralInformation";


interface props {
    originalData: any
    data: any
    setData: any
    type: boolean
}

const TypeComponent = (props: props) => {

    return (
        <div className="type content">
            {
                props.type ?
                    <input
                        style={{ height: "100%", width: "100%" }}
                        value={props.data}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            props.setData(e.target.value);
                        }}
                    /> :
                    <span>{props.originalData}</span>
            }
        </div>
    )
}

const TypeComponentForBank = (props: props) => {

    return (
        <span>
            {
                props.type ? 
                    <input
                        style={{ height: "100%", width: "100%"}}
                        value={props.data}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            props.setData(e.target.value);
                        }}
                    /> : <span>{props.originalData}</span>
            }
        </span>
    )
}

const ComponentGeneralInformation: React.FC = () => {

    const overview: ModelOverview = useSelector((state: TypeReducer) => state.generalInformation.Overview);
    const contact: ModelContact = useSelector((state: TypeReducer) => state.generalInformation.Contact);
    const address: ModelAddress = useSelector((state: TypeReducer) => state.generalInformation.Address);
    const bank: ModelBank = useSelector((state: TypeReducer) => state.generalInformation.Bank);
    const message: string = useSelector((state: TypeReducer) => state.generalInformation.Message);
    const dispatch: Dispatch<any> = useDispatch();

    const [update, setUpdate] = useState<boolean>(false);

    const [cccd, setCccd] = useState<string | undefined>(overview.CccdNumber);
    const [date_range, setDateRange] = useState<string | undefined>(overview.DateRange);
    const [issued_by, setIssuedBy] = useState<string | undefined>(overview.IssuedBy);
    const [health_insurance_card_number, setHealthInsuranceCardNumber] = useState<string | undefined>(overview.HealthInsuranceCardNumber);
    const [policy_object, setPolicyObject] = useState<string | undefined>(overview.PolicyObject);
    const [priority_object, setPriorityObject] = useState<string | undefined>(overview.PriorityObject);
    const [blood_group, setBloodGroup] = useState<string | undefined>(overview.BloodGroup);
    const [nationality, setNationality] = useState<string | undefined>(overview.Nationality);
    const [ethnic, setEthnic] = useState<string | undefined>(overview.Ethnic);
    const [religion, setReligion] = useState<string | undefined>(overview.Religion);
    const [party_admission_date, setPartyAdmissionDate] = useState<string | undefined>(overview.PartyAdmissionDate);
    const [number_of_decisions_to_join_the_party, setNumberOfDecisionsToJoinTheParty] = useState<string | undefined>(overview.NumberOfDecisionsToJoinTheParty);
    const [decision_day, setDecisionDay] = useState<string | undefined>(overview.DecisionDay);
    const [date_of_admission_to_the_union, setDateOfAdmissionToTheUnion] = useState<string | undefined>(overview.DateOfAdmissionToTheUnion);

    const [phone, setPhone] = useState<string | undefined>(contact.PhoneNumber);
    const [email, setEmail] = useState<string | undefined>(contact.Email);
    const [phone_other, setPhoneOther] = useState<string | undefined>(contact.OtherPhoneNumber);
    const [email_other, setEmailOther] = useState<string | undefined>(contact.OtherEmail);

    const [place_of_birth, setPlaceOfBirth] = useState<string | undefined>(address.PlaceOfBirth);
    const [current_residential_address, setCurrentResidentialAddress] = useState<string | undefined>(address.CurrentResidentialAddress);
    const [permanent_address, setPermanentAddress] = useState<string | undefined>(address.PermanentAddress);
    const [address_contact, setAddressContact] = useState<string | undefined>(address.AddressContact);

    const [account_holder, setAccountHolder] = useState<string | undefined>(bank.AccountHolder);
    const [name, setName] = useState<string | undefined>(bank.Name);
    const [branch, setBranch] = useState<string | undefined>(bank.Branch);
    const [account_number, setAccountNumber] = useState<string | undefined>(bank.AccountNumber);

    useEffect(() => {
        setCccd(overview.CccdNumber);
        setDateRange(overview.DateRange);
        setIssuedBy(overview.IssuedBy);
        setHealthInsuranceCardNumber(overview.HealthInsuranceCardNumber);
        setPolicyObject(overview.PolicyObject);
        setPriorityObject(overview.PriorityObject);
        setBloodGroup(overview.BloodGroup);
        setNationality(overview.Nationality);
        setEthnic(overview.Ethnic);
        setReligion(overview.Religion);
        setPartyAdmissionDate(overview.PartyAdmissionDate);
        setNumberOfDecisionsToJoinTheParty(overview.NumberOfDecisionsToJoinTheParty);
        setDecisionDay(overview.DecisionDay);
        setDateOfAdmissionToTheUnion(overview.DateOfAdmissionToTheUnion);

        setPhone(contact.PhoneNumber);
        setEmail(contact.Email);
        setPhoneOther(contact.OtherPhoneNumber);
        setEmailOther(contact.OtherEmail);

        setPlaceOfBirth(address.PlaceOfBirth);
        setCurrentResidentialAddress(address.CurrentResidentialAddress);
        setPermanentAddress(address.PermanentAddress);
        setAddressContact(address.AddressContact);

        setAccountHolder(bank.AccountHolder);
        setName(bank.Name);
        setBranch(bank.Branch);
        setAccountNumber(bank.AccountNumber);
    }, [overview, contact, address, bank])
    
    useEffect(() => {

        dispatch(ThunkfunctionGetOverview());
        dispatch(ThunkfunctionGetContact());
        dispatch(ThunkfuntionGetAddress());
        dispatch(ThunkfunctionGetBank());

        if (message === "Done") {
            dispatch({
                type: ActionTypeGeneralInformation.CHANGE_MESSAGE,
                payload: ""
            })
            alert("Thành công");
            setUpdate(false);
        } else if (message === "Error") {
            dispatch({
                type: ActionTypeGeneralInformation.CHANGE_MESSAGE,
                payload: ""
            })
            alert("Thất bại");
            setUpdate(false);
        }
    }, [message])


    return (
        <div className="col-md-12" style={{ paddingBottom: "50px" }}>
            <div className="col-md-12">
                <div className="col-md-12">
                    <h3 style={{ float: "left" }}>Tổng quan</h3>
                    <div className="row" style={{ float: "right", marginBottom: "20px" }}>
                        {!update && <button className="btn" style={{ marginLeft: "5px" }}
                            onClick={() => {
                                setUpdate(!update);
                            }}
                        >Chỉnh sửa</button>}
                        {update && <button className="btn btn-success" style={{ marginLeft: "5px" }}
                            onClick={() => {

                                const newOverview: ModelOverview = {
                                    CccdNumber: cccd,
                                    DateRange: date_range,
                                    IssuedBy: issued_by,
                                    HealthInsuranceCardNumber: health_insurance_card_number,
                                    PolicyObject: policy_object,
                                    PriorityObject: priority_object,
                                    BloodGroup: blood_group,
                                    Nationality: nationality,
                                    Ethnic: ethnic,
                                    Religion: religion,
                                    PartyAdmissionDate: party_admission_date,
                                    NumberOfDecisionsToJoinTheParty: number_of_decisions_to_join_the_party,
                                    DecisionDay: decision_day,
                                    DateOfAdmissionToTheUnion: date_of_admission_to_the_union
                                }

                                const newContact: ModelContact = {
                                    PhoneNumber: phone,
                                    Email: email,
                                    OtherPhoneNumber: phone_other,
                                    OtherEmail: email_other
                                }

                                const newAddress: ModelAddress = {
                                    PlaceOfBirth: place_of_birth,
                                    CurrentResidentialAddress: current_residential_address,
                                    PermanentAddress: permanent_address,
                                    AddressContact: address_contact
                                }

                                const newBank: ModelBank = {
                                    AccountHolder: account_holder,
                                    Name: name,
                                    Branch: branch,
                                    AccountNumber: account_number
                                }

                                dispatch(ThunkfunctionUpdateGeneralInformation(newOverview, newContact, newAddress, newBank));
                            }}
                        >Cập nhật</button>}
                        {update && <button className="btn btn-danger" style={{ marginLeft: "5px" }}
                            onClick={() => {
                                setUpdate(!update);
                            }}
                        >Hủy</button>}
                    </div>
                </div>
                <br />
                <div className="col-md-12 row">
                    <div className="col-md-6">
                        <div className="col-md-12">
                            <div className="type fields"><p>Số CMND/CCCD</p></div>
                            <TypeComponent
                                originalData={overview.CccdNumber}
                                data={cccd}
                                setData={setCccd}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Ngày cấp</p></div>
                            <TypeComponent
                                originalData={overview.DateRange}
                                data={date_range}
                                setData={setDateRange}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Nơi cấp</p></div>
                            <TypeComponent
                                originalData={overview.IssuedBy}
                                data={issued_by}
                                setData={setIssuedBy}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Số thẻ BHYT</p></div>
                            <TypeComponent
                                originalData={overview.HealthInsuranceCardNumber}
                                data={health_insurance_card_number}
                                setData={setHealthInsuranceCardNumber}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Đối tượng chính sách</p></div>
                            <TypeComponent
                                originalData={overview.PolicyObject}
                                data={policy_object}
                                setData={setPolicyObject}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Đối tượng ưu tiên</p></div>
                            <TypeComponent
                                originalData={overview.PriorityObject}
                                data={priority_object}
                                setData={setPriorityObject}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Nhóm máu</p></div>
                            <TypeComponent
                                originalData={overview.BloodGroup}
                                data={blood_group}
                                setData={setBloodGroup}
                                type={update}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col-md-12">
                            <div className="type fields"><p>Quốc tịch</p></div>
                            <TypeComponent
                                originalData={overview.Nationality}
                                data={nationality}
                                setData={setNationality}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Dân tộc</p></div>
                            <TypeComponent
                                originalData={overview.Ethnic}
                                data={ethnic}
                                setData={setEthnic}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Tôn giáo</p></div>
                            <TypeComponent
                                originalData={overview.Religion}
                                data={religion}
                                setData={setReligion}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Ngày kết nạp đảng</p></div>
                            <TypeComponent
                                originalData={overview.PartyAdmissionDate}
                                data={party_admission_date}
                                setData={setPartyAdmissionDate}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Số quyết định vào đảng</p></div>
                            <TypeComponent
                                originalData={overview.NumberOfDecisionsToJoinTheParty}
                                data={number_of_decisions_to_join_the_party}
                                setData={setNumberOfDecisionsToJoinTheParty}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Ngày quyết định</p></div>
                            <TypeComponent
                                originalData={overview.DecisionDay}
                                data={decision_day}
                                setData={setDecisionDay}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Ngày kết nạp Đoàn</p></div>
                            <TypeComponent
                                originalData={overview.DateOfAdmissionToTheUnion}
                                data={date_of_admission_to_the_union}
                                setData={setDateOfAdmissionToTheUnion}
                                type={update}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 row" style={{ marginTop: "30px" }}>
                    <div className="col-md-6">
                        <h3 className="col-md-12">Liên Hệ</h3>
                        <div className="col-md-12">
                            <div className="type fields"><p>SĐT Liên hệ</p></div>
                            <TypeComponent
                                originalData={contact.PhoneNumber}
                                data={phone}
                                setData={setPhone}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Email</p></div>
                            <TypeComponent
                                originalData={contact.Email}
                                data={email}
                                setData={setEmail}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>SĐT khác</p></div>
                            <TypeComponent
                                originalData={contact.OtherPhoneNumber}
                                data={phone_other}
                                setData={setPhoneOther}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Email khác</p></div>
                            <TypeComponent
                                originalData={contact.OtherEmail}
                                data={email_other}
                                setData={setEmailOther}
                                type={update}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="col-md-12">Địa Chỉ</h3>
                        <div className="col-md-12">
                            <div className="type fields"><p>Nơi sinh</p></div>
                            <TypeComponent
                                originalData={address.PlaceOfBirth}
                                data={place_of_birth}
                                setData={setPlaceOfBirth}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Địa chỉ cư trú hiện tại</p></div>
                            <TypeComponent
                                originalData={address.CurrentResidentialAddress}
                                data={current_residential_address}
                                setData={setCurrentResidentialAddress}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Địa chỉ thường trú</p></div>
                            <TypeComponent
                                originalData={address.PermanentAddress}
                                data={permanent_address}
                                setData={setPermanentAddress}
                                type={update}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="type fields"><p>Địa chỉ liên hệ</p></div>
                            <TypeComponent
                                originalData={address.AddressContact}
                                data={address_contact}
                                setData={setAddressContact}
                                type={update}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6" style={{ marginTop: "30px" }}>
                    <h3>Ngân Hàng</h3>
                    <table className="col-md-12 table">
                        <thead>
                            <tr>
                                <th>Chủ tài khoản</th>
                                <th>Ngân hàng</th>
                                <th>Chi nhánh</th>
                                <th>STK</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <TypeComponentForBank
                                        originalData={bank.AccountHolder}
                                        data={account_holder}
                                        setData={setAccountHolder}
                                        type={update}
                                    />
                                </td>
                                <td>
                                    <TypeComponentForBank
                                        originalData={bank.Name}
                                        data={name}
                                        setData={setName}
                                        type={update}
                                    />
                                </td>
                                <td>
                                    <TypeComponentForBank
                                        originalData={bank.Branch}
                                        data={branch}
                                        setData={setBranch}
                                        type={update}
                                    />
                                </td>
                                <td>
                                    <TypeComponentForBank
                                        originalData={bank.AccountNumber}
                                        data={account_number}
                                        setData={setAccountNumber}
                                        type={update}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ComponentGeneralInformation;