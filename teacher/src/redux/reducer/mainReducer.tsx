import { combineReducers } from "redux";
import reducerLogin from "./reducerLogin";
import reducerCourseCode from "./reducerCourseCode";
import reducerStudyScore from "./reducerStudyScore";
import reducerAttendance from "./reducerAttendance";

const reducer = combineReducers({
    login: reducerLogin,
    courseCode: reducerCourseCode,
    studyScore: reducerStudyScore,
    attendance: reducerAttendance
})

export type TypeReducer = ReturnType<typeof reducer>;

export default reducer;