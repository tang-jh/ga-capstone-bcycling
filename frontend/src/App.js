import "./App.css";
import "axios";
import { tokenAtom } from "./components/pages/LoginSignup";
import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
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
  const [token, setToken] = useAtom(tokenAtom);

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
            element={
              token ? (
                <Dashboard constants={constants} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/myroutes/new"
            element={
              token ? (
                <BrouteCreateUpdate
                  mode={constants.CREATE}
                  constants={constants}
                />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/myroutes"
            element={
              token ? (
                <BrouteList mode={constants.MYROUTES} constants={constants} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/myroutes/:r_id"
            element={
              token ? (
                <BrouteView mode={constants.MYROUTES} constants={constants} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/broutes/:r_id/*"
            element={
              token ? (
                <BrouteView mode={constants.FRIENDS} constants={constants} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          >
            <Route
              path="comments/:c_id"
              element={
                token ? (
                  <CommentReply mode={constants.READ} constants={constants} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="comments/new"
              element={
                token ? (
                  <CommentReply mode={constants.CREATE} constants={constants} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
          </Route>
          <Route
            path="/friends"
            element={
              token ? (
                <PeopleIndex mode={constants.FRIENDS} constants={constants} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/friends/:userid"
            element={
              token ? (
                <BrouteList mode={constants.FRIENDS} constants={constants} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/people"
            element={
              token ? (
                <PeopleIndex mode={constants.PEOPLE} constants={constants} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/people/:userid"
            element={
              token ? (
                <PeopleProfile mode={constants.PEOPLE} constants={constants} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/to_review"
            element={
              token ? (
                <PeopleIndex mode={constants.TO_REVIEW} constants={constants} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/to_review/:userid"
            element={
              token ? (
                <PeopleProfile
                  mode={constants.TO_REVIEW}
                  constants={constants}
                />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
