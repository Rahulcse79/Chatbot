import { createStore } from "redux";
import enrollmentReducer from "./enrollmentReducer";

const store = createStore(enrollmentReducer);

export default store;
