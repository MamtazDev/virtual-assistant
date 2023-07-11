import React from "react";
import { Modal } from "react-bootstrap";

const SignUpSuccess = ({ signUpSuccessShow, setSignUpSuccessShow, config }) => {
  return (
    <Modal show={signUpSuccessShow} onHide={() => setSignUpSuccessShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>SIGN UP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p
            className="my-5 p-3"
            style={{
              backgroundColor: "#f2f2f2",
              borderRadius: "10px",
            }}
          >
            Thanks for signing up to our waitlist. We'll be in touch soon.
          </p>
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
            className="btn w-100"
            onClick={() => setSignUpSuccessShow(false)}
          >
            DONE
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpSuccess;
