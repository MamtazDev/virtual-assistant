import React from "react";
import { Modal } from "react-bootstrap";

const SignUp = ({ signUpShow, setSignUpShow }) => {
  return (
    <Modal show={signUpShow} onHide={() => setSignUpShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>What List SIGN UP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Company URL</label>
            <input type="text" class="form-control" />
          </div>

          <button
            style={{ backgroundColor: "#ED5684" }}
            type="submit"
            class="btn w-100 text-white"
          >
            SIGN UP
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
