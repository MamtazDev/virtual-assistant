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

  const [text, setText] = useState("");
  const [responseHandeler, setResponseHandeler] = useState();

  // ---- previous code----
  // const initialApi = (Base_api) => {
  //   setInitialLoading(true);
  //   fetch(`${import.meta.env.VITE_BASE_URL}/`, {
  //     headers: {
  //       "VAAS-API-Key": import.meta.env.VITE_API_KEY,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setVaasId(data.vaas_sid);
  //       setClicked(true);
  //       setinitialAnswer(data.answer);
  //       setInitialLoading(false);
  //     });
  // };

  // const chatHandler = () => {
  //   const url = `${import.meta.env.VITE_BASE_URL}/`;
  //   if (!clicked) {
  //     initialApi(url);
  //   }
  // };

  // ---previous code ---

  // const initialApi = () => {
  //   setInitialLoading(true);
  //   fetch(`${import.meta.env.VITE_BASE_URL}/`, {
  //     headers: {
  //       "VAAS-API-Key": import.meta.env.VITE_API_KEY,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setVaasId(data.vaas_sid);
  //       if (data.vaas_sid) {
  //         fetch(`${import.meta.env.VITE_BASE_URL}/historyv2/`, {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "VAAS-API-Key": import.meta.env.VITE_API_KEY,
  //           },
  //           body: JSON.stringify({
  //             vaas_sid: data.vaas_sid,
  //             question: null,
  //             answer: null,
  //             feedback: null,
  //           }),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             setPermission(data.permissions);
  //           });
  //       }
  //       localStorage.setItem("veryVerseVassID", data.vaas_sid);
  //       setinitialAnswer(data.answer);
  //       setInitialLoading(false);
  //     });
  // };

  const initialApi = () => {
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
        setinitialAnswer(data.answer);
        setInitialLoading(false);
      });
  };

  const resetHistoryHandler = () => {
    localStorage.removeItem("veryVerseVassID");
    setHistory("");
    initialApi();
  };

  useEffect(() => {
    const Id = localStorage.getItem("veryVerseVassID");
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
            setHistory={setHistory}
          />

          <Footer config={config} permission={permission} />
        </div>
      </div>
    </div>
  );
}

export default App;
