/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";

import aiFace from "../assets/ai-face.png";
import user from "../assets/user.png";
import send from "../assets/send.png";
import liked from "../assets/liked.png";
import like from "../assets/like.png";
import disliked from "../assets/disliked.png";
import dislike from "../assets/dislike.png";
import load from "../assets/loading.png";

const Conversation = ({
  config,
  display,
  setDisplay,
  vaasId,
  setVaasId,
  initialAnswer,
  setinitialAnswer,
  loading,
  setLoading,
  setText,
  text,
  responseHandeler,
  setResponseHandeler,
  initialLoading,
  history,
  setHistory,
}) => {
  const [isLiked, setIsLiked] = useState([]);
  const [isDisliked, setIsDisliked] = useState([]);
  const [vassHistory, setVaasHistory] = useState([]);

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
    fetch("https://testenv.innobyteslab.com/vaas/history/", requestOptions)
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
        // console.log(successMessage, "mohi");
        console.log(data, "updateData");
        // setVaasHistory(data.history);
        setNewVassHistory("");
        setHistory(data.history);
      })
      .catch((error) => {
        console.error(errorMessage, error);
      });
  };

  const handleLikeDislike = (feedbacks, status, index) => {
    // const vaasSid = vaasId;

    // console.log(feedback[0], feedback[1])

    const question = feedbacks[0];
    const answer = feedbacks[1];

    // console.log(feedback, "feedback");

    // const apiUrl = `https://testenv.innobyteslab.com/vaas/?vaas_sid=${vaasSid}&question=${question}&answer=${answer}&feedback=${status}`;
    const apiUrl = `https://testenv.innobyteslab.com/vaas/history/`;
    // const successMessage = status ? "Like success:" : "Dislike success:";
    // const successMessage = status ? "Like success:" : "Dislike success:";
    // const errorMessage = status ? "Like error:" : "Dislike error:";
    const vaas_sid = vaasId;
    const feedback = status;

    updateData(
      // "https://testenv.innobyteslab.com/vaas/history/",
      apiUrl,
      vaas_sid,
      question,
      answer,
      feedback
    );

    // Update the UI state
    if (status) {
      // const liked = isDisliked.filter((i) => i !== question);
      // setIsDisliked(liked);
      // setIsLiked((current) => [...current, question]);
      // setIsLiked({ question, answer, index });
      // if (isDisliked.question === question && isDisliked.answer === answer) {
      //   setIsDisliked("");
      // }
      // localStorage.setItem("VADisLiked", JSON.stringify(liked));
      // localStorage.setItem("VALiked", JSON.stringify([...isLiked, question]));
      setFeedback({ question, answer, index, status });
      localStorage.setItem(
        "VAFeedback",
        JSON.stringify({ question, answer, index, status })
      );
    }
    if (!status) {
      // const notliked = isLiked.filter((i) => i !== question);
      // setIsLiked(notliked);
      // setIsDisliked((current) => [...current, question]);
      // setIsDisliked({ question, answer, index });
      // if (isLiked.question === question && isLiked.answer === answer) {
      //   setIsLiked("");
      // }
      // localStorage.setItem("VALiked", JSON.stringify(notliked));
      // localStorage.setItem(
      //   "VADisLiked",
      //   JSON.stringify([...isDisliked, question])
      // );

      setFeedback({ question, answer, index, status });
      localStorage.setItem(
        "VAFeedback",
        JSON.stringify({ question, answer, index, status })
      );
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, loading]);

  useEffect(() => {
    if (responseHandeler === "sh" || responseHandeler === "dt") {
      HistoryHandler();
    }
  }, [responseHandeler]);

  // useEffect(() => {
  //   const liked = JSON.parse(localStorage.getItem("VALiked"));
  //   const notLiked = JSON.parse(localStorage.getItem("VADisLiked"));
  //   if (liked) {
  //     setIsLiked(liked);
  //   }

  //   if (notLiked) {
  //     setIsDisliked(notLiked);
  //   }
  // }, [isLiked.length, isDisliked.length]);
  useEffect(() => {
    const feedbacks = JSON.parse(localStorage.getItem("VAFeedback"));
    if (feedbacks) {
      const newFeedbacks = { ...feedbacks, index: feedbacks.index - 1 };
      setFeedback(newFeedbacks);
    }
  }, [feedback.question]);

  const sanitizeData = (data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const aTags = doc.getElementsByTagName("a");
    for (let i = 0; i < aTags.length; i++) {
      aTags[i].setAttribute("target", "_blank");
    }
    return doc.body.innerHTML;
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !text.includes("\n") &&
      text !== ""
    ) {
      HistoryHandler();
      setText("")
    }
  };

  return (
    <div className="conversation">
      <div className="container">
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
          {/* <div className="reaction">
            <img
              onClick={() => handleLikeDislike(true)}
              src={like }
              alt=""
            />
            <img
              onClick={() => handleLikeDislike(false)}
              src={dislike}
              alt=""
            />
          </div> */}
        </div>
        <div ref={chatContainerRef} className="chatting">
          {history?.length > 0 &&
            history?.map((chat, index) => (
              <div key={index}>
                <div className="question">
                  {chat[0] === "Please provide  detailed answers" ||
                  chat[0] === "Please provide  short answers" ||
                  chat[0] === null ||
                  chat[0] === "\n" ? (
                    ""
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: chat[0],
                      }}
                    />
                  )}
                  {chat[0] === "Please provide  detailed answers" ||
                  chat[0] === "Please provide  short answers" ||
                  chat[0] === null ||
                  chat[0] === "\n" ? (
                    ""
                  ) : (
                    <img src={user} alt="" />
                  )}
                </div>
                <div className="answer">
                  <img src={aiFace} alt="" />
                  {/* 
                  {loading && history.length - 1 === index ? (
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
                        __html: sanitizeData(chat[1]),
                      }}
                    />
                  )} */}

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

                  {/* {history.length - 1 === index && (
                    <div className="reaction">
                      <img
                        onClick={() => handleLikeDislike(chat, true, index)}
                        src={
                          feedback.status === true &&
                          feedback.question === chat[0] &&
                          feedback.answer === chat[1]
                            ? // feedback.index === index
                              liked
                            : like
                        }
                        alt=""
                      />
                      <img
                        onClick={() => handleLikeDislike(chat, false, index)}
                        src={
                          feedback.status === false &&
                          feedback.question === chat[0] &&
                          feedback.answer === chat[1]
                            ? // feedback.index === index
                              disliked
                            : dislike
                        }
                        alt=""
                      />
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          {loading && (
            <div className="answer">
              <img src={aiFace} alt="" />
              <div
                style={{
                  borderTop: `4px solid ${
                    config.spinner_color ? config.spinner_color : ""
                  }`,
                }}
                className="loading "
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
            <button onClick={HistoryHandler} disabled={text === ""}>
              <img src={send} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
