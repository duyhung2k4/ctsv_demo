import { combineReducers } from "redux";
import reducerLogin from "./reducerLogin";
import reducerGeneralInformation from "./reducerGeneralInformation";
import reducerEnrollmentInformation from "./reducerEnrollmentInformation";
import reducerAccountTeacher from "./reducerAccountTeacher";
import reducerCourse from "./reducerCourse";

const reducer = combineReducers({
    login: reducerLogin, 
    generalInformation: reducerGeneralInformation,
    enrollmentInformation: reducerEnrollmentInformation,
    accountTeacher: reducerAccountTeacher,
    course: reducerCourse
})

export type TypeReducer = ReturnType<typeof reducer>  

export default reducer