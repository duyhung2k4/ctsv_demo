import { combineReducers } from "redux";
import reducerLogin from "./reducerLogin";
import reducerGeneralInformation from "./reducerGeneralInformation";
import reducerEnrollmentInformation from "./reucerEnrollmentInformation";
import reducerFamilyRelationship from "./reducerFamilyRelationship";
import reducerAttendance from "./reducerAttendance";
import reducerStudyScore from "./reducerStudyScore";

const reducer = combineReducers({
    login: reducerLogin,
    generalInformation: reducerGeneralInformation,
    enrollmentInformation: reducerEnrollmentInformation,
    familyRelationship: reducerFamilyRelationship,
    attendance: reducerAttendance,
    studyScore: reducerStudyScore
})

export type TypeReducer = ReturnType<typeof reducer>

export default reducer