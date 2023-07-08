import { useEffect, useState } from "react";
import "./App.css";
import Conversation from "./components/Conversation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import messenger from "./assets/ai-face.png";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const [text, setText] = useState("");
  const [responseHandeler, setResponseHandeler] = useState();

  const initialApi = () => {
    setLoadingText("Loading ...");
    setInitialLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/historyv2/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
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
    fetch(`${import.meta.env.VITE_BASE_URL}/historyv2/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
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
    setLoadingText("Loading...");
    setLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/config/`, {
      headers: {
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
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
      fetch(`${import.meta.env.VITE_BASE_URL}/historyv2/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "VAAS-API-Key": import.meta.env.VITE_API_KEY,
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
  }, []);

  // ---previous code---
  // useEffect(() => {
  //   chatHandler();
  // }, []);
  // ---previous code---

  console.log(config, "config");
  console.log(permission, "permiss");

  return (
    <div>
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
          />

          <Footer
            config={config}
            permission={permission}
            vaasId={vaasId}
            updateButtonPermission={updateButtonPermission}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
