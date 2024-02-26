// import { applyMiddleware, createStore, conf } from "redux";
// import ThunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import AuthReducer from "./reducers/authReducer";
import QuizReducer from "./reducers/quizReducer";

// const Store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));
const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    quiz: QuizReducer,
  },
});

export default Store;
