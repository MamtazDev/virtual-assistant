import { useEffect, useState } from "react";
import "./App.css";
import Conversation from "./components/Conversation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import messenger from "./assets/ai-face.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const [display, setDisplay] = useState(false);
  // const [clicked, setClicked] = useState(false);
  const [config, setConfig] = useState([]);
  const [vaasId, setVaasId] = useState(null);
  const [initialAnswer, setinitialAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [permission, setPermission] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const [token, setToken] = useState(undefined);

  const [text, setText] = useState("");
  const [responseHandeler, setResponseHandeler] = useState();

  const location = useLocation();

  const initialApi = () => {
    setLoadingText("Loading ...");
    setInitialLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/converse/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        vaas_sid: null,
        question: null,
        answer: null,
        feedback: null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPermission(data.permissions);
        localStorage.setItem("veryVerseVassID", data.vaas_sid);
        setVaasId(data.vaas_sid);
        setinitialAnswer(data.answer);
        setInitialLoading(false);
        setLoadingText("");
      });
  };

  const resetHistoryHandler = () => {
    localStorage.removeItem("veryVerseVassID");
    setHistory("");
    initialApi();
  };

  const updateButtonPermission = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/converse/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        vaas_sid: vaasId,
        question: null,
        answer: null,
        feedback: null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setHistory(data.history);
        setPermission(data.permissions);
        // setLoading(false);
        // setLoadingText("");
      });
  };

  useEffect(() => {
    const Id = localStorage.getItem("veryVerseVassID");
    const tkn = localStorage.getItem("token");
    if (tkn) {
      setToken(tkn);
    }
    setLoadingText("Loading...");
    setLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/config/`, {
      headers: {
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${tkn}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
      });

    if (Id) {
      setVaasId(Id);
      setLoadingText("Loading ...");
      setLoading(true);
      fetch(`${import.meta.env.VITE_BASE_URL}/converse/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "VAAS-API-Key": import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${tkn}`,
        },
        body: JSON.stringify({
          vaas_sid: Id,
          question: null,
          answer: null,
          feedback: null,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setHistory(data.history);
          setPermission(data.permissions);
          setLoading(false);
          setLoadingText("");
        });
    } else if (!Id) {
      initialApi();
    }
  }, [location]);

  // ---previous code---
  // useEffect(() => {
  //   chatHandler();
  // }, []);
  // ---previous code---

  console.log(config);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="virtual_agent">
              <Header
                config={config}
                display={display}
                setDisplay={setDisplay}
                setText={setText}
                responseHandeler={responseHandeler}
                setResponseHandeler={setResponseHandeler}
                resetHistoryHandler={resetHistoryHandler}
              />
              <div>
                <Conversation
                  config={config}
                  loading={loading}
                  setLoading={setLoading}
                  display={display}
                  setDisplay={setDisplay}
                  vaasId={vaasId}
                  setVaasId={setVaasId}
                  initialAnswer={initialAnswer}
                  setinitialAnswer={setinitialAnswer}
                  initialLoading={initialLoading}
                  text={text}
                  setText={setText}
                  responseHandeler={responseHandeler}
                  setResponseHandeler={setResponseHandeler}
                  history={history}
                  loadingText={loadingText}
                  setLoadingText={setLoadingText}
                  setHistory={setHistory}
                  token={token}
                />

                <Footer
                  config={config}
                  permission={permission}
                  vaasId={vaasId}
                  updateButtonPermission={updateButtonPermission}
                  setToken={setToken}
                />
              </div>
            </div>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
