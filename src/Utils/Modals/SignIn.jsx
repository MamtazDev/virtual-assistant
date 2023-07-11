import React from "react";
import { Button, Modal } from "react-bootstrap";
import crossIcon from "../../assets/crossIcon.png";
import warningIcon from "../../assets/warningIcon.png";

const SignIn = ({
  show,
  handleClose,
  handleSignIn,
  setShow,
  setSignUpShow,
  error,
  setError,
  config,
}) => {
  const handleSignupModal = () => {
    setSignUpShow(true);
    setShow(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>SIGN IN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSignIn} className="singinForm">
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

          {/* <h5 className="text-center">
            <u style={{ cursor: "pointer" }} onClick={handleSignupModal}>
              SIGN UP
            </u>{" "}
          </h5> */}

          <button
            style={{
              backgroundColor: config?.modal_secondary_button_bg_color
                ? `#${config?.modal_secondary_button_bg_color}`
                : "#a2a2a2",
              color: config?.modal_secondary_button_text_color
                ? `#${config?.modal_secondary_button_text_color}`
                : "#FFFFFF",
            }}
            className="btn w-100  mb-5"
            onClick={handleSignupModal}
          >
            SIGN UP
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
