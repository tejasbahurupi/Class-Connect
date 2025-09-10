import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { studentReducer } from "../studentRelated/studentSlice";
import { noticeReducer } from "../noticeRelated/noticeSlice";
import { sclassReducer } from "../sclassRelated/sclassSlice";
import { teacherReducer } from "../teacherRelated/teacherSlice";
import { complainReducer } from "../complainRelated/complainSlice";

const store = configureStore({
  reducer: {
    complain: complainReducer,
    notice: noticeReducer,
    sclass: sclassReducer,
    student: studentReducer,
    teacher: teacherReducer,
    user: userReducer,
  },
});

export default store;
