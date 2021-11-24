import "./App.css";
import "axios";
import { Route, Routes } from "react-router-dom";
import LoginSignup from "./components/pages/LoginSignup";
import Layout from "./components/Layout";
import Dashboard from "./components/pages/Dashboard";
import BrouteList from "./components/pages/BrouteList";
import BrouteView from "./components/pages/BrouteView";
import BrouteCreateUpdate from "./components/pages/BrouteCreateUpdate";
import CommentReply from "./components/CommentReply";
import PeopleIndex from "./components/pages/PeopleIndex";
import PeopleProfile from "./components/pages/PeopleProfile";

const constants = {
  CREATE: "create",
  FRIENDS: "friends",
  LOGIN: "login",
  MYROUTES: "myroutes",
  PEOPLE: "people",
  READ: "read",
  SIGNUP: "signup",
  TO_REVIEW: "to_review",
};

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            path="/signup"
            element={
              <LoginSignup mode={constants.SIGNUP} constants={constants} />
            }
          />
          <Route
            path="/login"
            element={
              <LoginSignup mode={constants.LOGIN} constants={constants} />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard constants={constants} />}
          />
          <Route
            path="/myroutes/new"
            element={
              <BrouteCreateUpdate
                mode={constants.CREATE}
                constants={constants}
              />
            }
          />
          <Route
            path="/myroutes"
            element={
              <BrouteList mode={constants.MYROUTES} constants={constants} />
            }
          />
          <Route
            path="/myroutes/:r_id"
            element={
              <BrouteView mode={constants.MYROUTES} constants={constants} />
            }
          />
          <Route
            path="/broutes/:r_id/*"
            element={
              <BrouteView mode={constants.FRIENDS} constants={constants} />
            }
          >
            <Route
              path="comments/:c_id"
              element={
                <CommentReply mode={constants.READ} constants={constants} />
              }
            />
            <Route
              path="comments/new"
              element={
                <CommentReply mode={constants.CREATE} constants={constants} />
              }
            />
          </Route>
          <Route
            path="/friends"
            element={<PeopleIndex mode={constants.FRIENDS} />}
          />
          <Route
            path="/friends/:userid"
            element={<BrouteList mode={constants.FRIENDS} />}
          />
          <Route
            path="/people"
            element={<PeopleIndex mode={constants.PEOPLE} />}
          />
          <Route
            path="/people/:userid"
            element={<PeopleProfile mode={constants.PEOPLE} />}
          />
          <Route
            path="/to_review"
            element={<PeopleIndex mode={constants.TO_REVIEW} />}
          />
          <Route
            path="/to_review/:userid"
            element={<PeopleProfile mode={constants.TO_REVIEW} />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
