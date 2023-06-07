/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import aiFace from "../assets/ai-face.png";
import user from "../assets/user.png";
import send from "../assets/send.png";
import liked from "../assets/liked.png";
import like from "../assets/like.png";
import disliked from "../assets/disliked.png";
import dislike from "../assets/dislike.png";

const Conversation = ({
  config,
  vaasId,
  loading,
  setLoading,
  setText,
  text,
  responseHandeler,
  initialLoading,
  history,
  setHistory,
}) => {
  const [newVassHistory, setNewVassHistory] = useState("");
  const [apiKey, setApiKey] = useState("test-x0848bd789fjk13");
  const [feedback, setFeedback] = useState("");
  const textareaRef = useRef(null);
  const [response, setResponse] = useState("");

  const chatContainerRef = useRef(null);

  const maxRows = 4; // Maximum number of rows allowed
  const lineHeight = 20; // Line height of the textarea

  const handleChange = (event) => {
    setText(event.target.value);
    setNewVassHistory(event.target.value);
    adjustTextareaHeight();
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      const lastChatMessage = chatContainer.lastElementChild;
      if (lastChatMessage) {
        lastChatMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const rowCount = textareaRef.current.value.split("\n").length;
      const calculatedHeight = rowCount * lineHeight;

      if (rowCount > maxRows) {
        textareaRef.current.style.overflowY = "auto";
        textareaRef.current.style.height = `${maxRows * lineHeight}px`;
      } else {
        textareaRef.current.style.overflowY = "hidden";
        textareaRef.current.style.height = `${calculatedHeight}px`;
      }
    }
  };

  const resizeTextHandler = () => {
    setNewVassHistory("");
    const calculatedHeight = 1 * lineHeight;

    textareaRef.current.style.overflowY = "auto";
    textareaRef.current.style.height = `${1 * lineHeight}px`;
  };

  const HistoryHandler = () => {
    setLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": "test-x0848bd789fjk13",
      },
      body: JSON.stringify({
        vaas_sid: vaasId,
        question: text,
      }),
    };
    fetch("https://testenv.innobyteslab.com/vaas/historyv2/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "jfklsklfkldsf");
        setHistory(data.history);
        setResponse(data.answer);
        setNewVassHistory("");
        setLoading(false);
        setText("");
      });

    resizeTextHandler();
  };
  const lastElement = history[history.length - 1];

  console.log(lastElement, "last");

  const updateData = (apiUrl, vaas_sid, question, answer, feedback) => {
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": apiKey,
      },
      body: JSON.stringify({ vaas_sid, question, answer, feedback }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "updateData");
        setNewVassHistory("");
        setHistory(data.history);
      })
      .catch((error) => {
        console.error(errorMessage, error);
      });
  };

  const handleLikeDislike = (chat, status) => {
    const question = chat[0];
    const answer = chat[1];
    const vaas_sid = vaasId;
    const feedback = status;
    const apiUrl = `https://testenv.innobyteslab.com/vaas/historyv2/`;

    updateData(apiUrl, vaas_sid, question, answer, feedback);
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, loading]);

  useEffect(() => {
    if (responseHandeler === "sh" || responseHandeler === "dt") {
      HistoryHandler();
    }
  }, [responseHandeler]);

  useEffect(() => {
    const feedbacks = JSON.parse(localStorage.getItem("VAFeedback"));
    if (feedbacks) {
      const newFeedbacks = { ...feedbacks, index: feedbacks.index - 1 };
      setFeedback(newFeedbacks);
    }
  }, [feedback.question]);

  const sanitizeData = (data) => {
    console.log(data, "mohiiiiiiiiiii");
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const aTags = doc.getElementsByTagName("a");
    for (let i = 0; i < aTags.length; i++) {
      aTags[i].setAttribute("target", "_blank");
    }
    const sanitizedData = doc.body.innerHTML.replace(/\n/g, "<br>");
    return sanitizedData;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && text !== "") {
      e.preventDefault();
      HistoryHandler();
    }
  };

  return (
    <div className="conversation">
      <div className="container">
        {(config.appointment_url ||
          config.quick_call ||
          config.text_us_url) && (
          <div className="answer">
            <img src={aiFace} alt="" />

            {initialLoading ? (
              <div
                style={{
                  borderTop: `4px solid ${
                    config.spinner_color ? config.spinner_color : ""
                  }`,
                }}
                className="loading "
              ></div>
            ) : (
              <p
                style={{
                  backgroundColor: config.vaas_response_bg_color
                    ? config.vaas_response_bg_color
                    : "",
                  color: config.vaas_response_text_color
                    ? config.vaas_response_text_color
                    : "",
                }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeData(config.greeting),
                }}
              />
            )}
          </div>
        )}

        <div ref={chatContainerRef} className="chatting">
          {history?.length > 0 &&
            history?.map((chat, index) => (
              <div key={index}>
                <div className="question">
                  {chat[0] === "Please provide  detailed answers" ||
                  chat[0] === "Please provide  short answers" ||
                  chat[0] === "\n" ||
                  chat[0] === null ||
                  chat[0] === "" ? (
                    ""
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: sanitizeData(chat[0]),
                      }}
                    />
                  )}
                  {chat[0] === "Please provide  detailed answers" ||
                  chat[0] === "Please provide  short answers" ||
                  chat[0] === null ||
                  chat[0] === "\n" ||
                  chat[0] === "" ? (
                    ""
                  ) : (
                    <img src={user} alt="" />
                  )}
                </div>
                <div className="answer">
                  <img src={aiFace} alt="" />

                  <p
                    style={{
                      backgroundColor: config.vaas_response_bg_color
                        ? config.vaas_response_bg_color
                        : "",
                      color: config.vaas_response_text_color
                        ? config.vaas_response_text_color
                        : "",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeData(chat[1]),
                    }}
                  />

                  {chat[0] === null ? (
                    ""
                  ) : (
                    <div className="reaction">
                      <img
                        onClick={() => handleLikeDislike(chat, true)}
                        src={chat[2] === true ? liked : like}
                        alt=""
                      />
                      <img
                        onClick={() => handleLikeDislike(chat, false)}
                        src={chat[2] === false ? disliked : dislike}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

          {loading && (
            <div className="question">
              <p>{text}</p>
            </div>
          )}
          {loading && (
            <div className="answer">
              <img src={aiFace} alt="" />
              <div
                style={{
                  borderTop: `4px solid ${
                    config.spinner_color ? config.spinner_color : ""
                  }`,
                }}
                className="loading"
              ></div>
            </div>
          )}
        </div>
        <div className="input_field">
          <div className="user_input">
            <textarea
              style={{
                backgroundColor: config.user_input_bg_color
                  ? config.user_input_bg_color
                  : "#EFEFEF ",
                color: config.user_input_text_color
                  ? config.user_input_text_color
                  : "black",
              }}
              ref={textareaRef}
              value={newVassHistory}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={
                config.user_input_placeholder
                  ? config.user_input_placeholder
                  : "Type your question here.... (Scribe tu pregunta aqui....)"
              }
            />
            <button
              style={{
                backgroundColor: config.send_bg_color
                  ? config.send_bg_color
                  : "#35255C",
              }}
              onClick={HistoryHandler}
              disabled={text === ""}
            >
              <img src={send} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
