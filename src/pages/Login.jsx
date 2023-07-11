import React, { useEffect, useState } from "react";
import "./Login.css";
import crossIcon from "../assets/crossIcon.png";
import warningIcon from "../assets/warningIcon.png";
import { useNavigate } from "react-router-dom";
import SignUp from "../Utils/Modals/SignUp";

const Login = () => {
  const [config, setConfig] = useState([]);
  const [vaasId, setVaasId] = useState(null);
  const [error, setError] = useState(false);
  const [signUpShow, setSignUpShow] = useState(false);
  const [token, setToken] = useState(undefined);

  const navigate = useNavigate();

  const customeHeader = token
    ? {
        "Content-Type": "application/json",
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      }
    : {
        "Content-Type": "application/json",
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
      };

  const handleSignIn = (event) => {
    event.preventDefault();

    const form = event.target;

    const username = form.email.value;
    const password = form.password.value;

    const data = {
      username,
      password,
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
        vaas_sid: vaasId,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas);
        if (datas.message === "sign in successful") {
          localStorage.setItem("token", datas["Bearer token"]);
          navigate("/");
        } else if (datas.Error) {
          setError(true);
        }
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;

    const first = form.firstName.value;
    const last = form.lastName.value;
    const email = form.email.value;
    const url = form.companyUrl.value;

    const data = {
      first,
      last,
      email,
      url,
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/signup/`, {
      method: "POST",
      headers: {
        ...customeHeader,
        vaas_sid: vaasId,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((datas) => {
        if (datas.Notification) {
          navigate("/");
          setSignUpShow(false);
        }
      });
  };

  useEffect(() => {
    const Id = localStorage.getItem("veryVerseVassID");
    const tkn = localStorage.getItem("token");
    if (tkn) {
      setToken(tkn);
    }

    if (Id) {
      setVaasId(Id);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/config/`, {
      headers: {
        "VAAS-API-Key": import.meta.env.VITE_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
      });
  }, []);
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="mainContainer">
        <h4 className="mb-3">SIGN IN</h4>
        <form className="singinForm" onSubmit={handleSignIn}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email
            </label>
            <input type="email" class="form-control" name="email" required />
            {/* <div class="form-text">
              We'll never share your email with anyone else.
            </div> */}
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              name="password"
              required
            />
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="checkbox form-check-input" />
            <label class="form-check-label">Remember me?</label>
          </div>
          <button
            style={{
              backgroundColor: config.modal_primary_button_bg_color
                ? `#${config.modal_primary_button_bg_color}`
                : "#ED5684",
              color: config.modal_primary_button_text_color
                ? `#${config.modal_primary_button_text_color}`
                : "#FFFFFF",
            }}
            type="submit"
            class="btn w-100"
          >
            SIGN IN
          </button>

          {error && (
            <div className="custom_toast">
              <div className="warning_icon">
                <img src={warningIcon} alt="" />
                <p>Invalid username or password</p>
              </div>
              <div className="cursor_pointer" onClick={() => setError(false)}>
                <img src={crossIcon} alt="" />
              </div>
            </div>
          )}
        </form>
        <div>
          <p className="divider">
            <span>OR</span>{" "}
          </p>

          <p className="text-center">Need an account? Forgot password?</p>

          <button
            style={{
              backgroundColor: config?.modal_secondary_button_bg_color
                ? `#${config?.modal_secondary_button_bg_color}`
                : "#a2a2a2",
              color: config?.modal_secondary_button_text_color
                ? `#${config?.modal_secondary_button_text_color}`
                : "red",
            }}
            className="btn w-100  mb-5"
            onClick={() => setSignUpShow(true)}
          >
            SIGN UP
          </button>
        </div>

        <SignUp
          signUpShow={signUpShow}
          setSignUpShow={setSignUpShow}
          handleSignUp={handleSignUp}
          config={config}
        />
      </div>
    </div>
  );
};

export default Login;
