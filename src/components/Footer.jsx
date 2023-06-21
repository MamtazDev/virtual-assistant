import calender from "../assets/calender.png";
import text from "../assets/text.png";
import call from "../assets/call.png";

const Footer = ({ config }) => {
  console.log(config, "connn");
  return (
    <div className="footer">
      <div className="container">
        <div className="footer_inner">
          <div className="btn_group">
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
          </div>
          <p>
            <a
              style={{
                color: `${config?.text_us_bg_color ? text_us_bg_color : "red"}`,
              }}
              target="_blank"
              href={
                config.text_us_url
                  ? config.text_us_url
                  : "https://squareup.com/appointments/book/fzx6h5zvy9re4e/LYG594QJD0CHT/services"
              }
              rel="noreferrer"
            >
              {config.text_us ? config.text_us : "Text us"}
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
