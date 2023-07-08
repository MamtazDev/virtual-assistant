import React from "react";
import { Modal } from "react-bootstrap";

const SignUpSuccess = ({ signUpSuccessShow, setSignUpSuccessShow }) => {
  return (
    <Modal show={signUpSuccessShow} onHide={() => setSignUpSuccessShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>SIGN OUT</Modal.Title>
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
            style={{ backgroundColor: "#ED5684" }}
            type="submit"
            className="btn w-100 text-white "
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
