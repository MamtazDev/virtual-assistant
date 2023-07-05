import calender from "../assets/calender.png";
import text from "../assets/text.png";
import call from "../assets/call.png";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SignIn from "../Utils/Modals/SignIn";

const Footer = ({ config, permission }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="footer">
      <div className="container">
        <div className="footer_inner">
          <div className="btn_group">
            {/* --- previous button --- */}
            {config.appointment && (
              <a
                target="_blank"
                href={
                  config.appointment_url
                    ? config.appointment_url
                    : "https://squareup.com/appointments/book/fzx6h5zvy9re4e/LYG594QJD0CHT/services"
                }
                rel="noreferrer"
              >
                <button
                  style={{
                    backgroundColor: config.appointment_bg_color
                      ? config.appointment_bg_color
                      : "",
                  }}
                  className="violet_btn"
                >
                  <img src={calender} alt="" />
                  <span>Book an Appointment</span>
                </button>
              </a>
            )}
            {config.text_us && (
              <a
                target="_blank"
                href={config.text_us_url ? config.text_us_url : ""}
                rel="noreferrer"
              >
                <button
                  style={{
                    backgroundColor: config.text_us_bg_color
                      ? config.text_us_bg_color
                      : "",
                  }}
                  className="violet_btn"
                >
                  <img src={text} alt="" />
                  <span>Text Us</span>
                </button>
              </a>
            )}
            {config.quick_call && (
              <a
                target="_blank"
                href={
                  config.quick_call_url
                    ? config.quick_call_url
                    : "tel: +1-804-222-1111"
                }
                rel="noreferrer"
              >
                <button
                  style={{
                    backgroundColor: config.quick_call_bg_color
                      ? config.quick_call_bg_color
                      : "#E7B43E",
                  }}
                  className="warning_btn"
                >
                  <img src={call} alt="" />
                  <span>Quick Call</span>
                </button>
              </a>
            )}

            {/* --- previous button --- */}

            {/* --- new button --- */}

            {config?.control_buttons &&
              permission?.length > 0 &&
              permission[0] === true && (
                <div>
                  <Button
                    style={{
                      backgroundColor: config.control_buttons_bg_color
                        ? config.control_buttons_bg_color
                        : "#333f50",
                    }}
                    className="violet_btn border-0"
                    onClick={handleShow}
                  >
                    <span>Sign in</span>
                  </Button>

                  <SignIn show={show} handleClose={handleClose} />
                </div>
              )}
            {config?.control_buttons &&
              permission?.length > 0 &&
              permission[1] === true && (
                <a
                  href="https://testenv.innobyteslab.com/page/logout.html"
                  rel="noreferrer"
                >
                  <button
                    style={{
                      backgroundColor: config.control_buttons_bg_color
                        ? config.control_buttons_bg_color
                        : "#333f50",
                    }}
                    className="violet_btn"
                  >
                    <span>Sign out</span>
                  </button>
                </a>
              )}
            {config?.control_buttons &&
              permission?.length > 0 &&
              permission[2] === true && (
                <a
                  href="https://testenv.innobyteslab.com/page/upload.html"
                  rel="noreferrer"
                >
                  <button
                    style={{
                      backgroundColor: config.control_buttons_bg_color
                        ? config.control_buttons_bg_color
                        : "#333f50",
                    }}
                    className="violet_btn"
                  >
                    <span>Upload files</span>
                  </button>
                </a>
              )}
            {config?.control_buttons &&
              permission?.length > 0 &&
              permission[3] === true && (
                <a
                  href="https://testenv.innobyteslab.com/page/delete.html"
                  rel="noreferrer"
                >
                  <button
                    style={{
                      backgroundColor: config.control_buttons_bg_color
                        ? config.control_buttons_bg_color
                        : "#333f50",
                    }}
                    className="violet_btn"
                  >
                    <span>Delete files</span>
                  </button>
                </a>
              )}
            {config?.control_buttons &&
              permission?.length > 0 &&
              permission[4] === true && (
                <a
                  href="https://testenv.innobyteslab.com/page/context.html"
                  rel="noreferrer"
                >
                  <button
                    style={{
                      backgroundColor: config.control_buttons_bg_color
                        ? config.control_buttons_bg_color
                        : "#333f50",
                    }}
                    className="violet_btn"
                  >
                    <span>Create context</span>
                  </button>
                </a>
              )}

            {/* --- new button --- */}
          </div>

          <p>
            <a
              style={{
                color: `${
                  config?.text_us_bg_color ? text_us_bg_color : "#333f50"
                }`,
              }}
              target="_blank"
              href={
                config.article_url
                  ? config.article_url
                  : "https://squareup.com/appointments/book/fzx6h5zvy9re4e/LYG594QJD0CHT/services"
              }
              rel="noreferrer"
            >
              {config.article_text ? config.article_text : ""}
            </a>{" "}
          </p>
          <p>
            <a
              target="_blank"
              href={
                config.powered_by_url
                  ? config.powered_by_url
                  : "https://squareup.com/appointments/book/fzx6h5zvy9re4e/LYG594QJD0CHT/services"
              }
              rel="noreferrer"
            >
              {config.powered_by ? config.powered_by : ""}
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
