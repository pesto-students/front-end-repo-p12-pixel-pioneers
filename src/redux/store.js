// import { applyMiddleware, createStore, conf } from "redux";
// import ThunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import AuthReducer from "./reducers/authReducer";
import QuizReducer from "./reducers/quizReducer";
import AnalyticsReducer from "./reducers/analyticsReducer";

// const Store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));
const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    quiz: QuizReducer,
    analytics: AnalyticsReducer,
  },
});

export default Store;
