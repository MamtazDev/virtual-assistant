import React from "react";
import { Modal } from "react-bootstrap";

const SignUp = ({ signUpShow, setSignUpShow, handleSignUp, config }) => {
  return (
    <Modal show={signUpShow} onHide={() => setSignUpShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title> Waitlist SIGN UP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSignUp}>
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" name="firstName" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" name="lastName" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" name="email" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Company URL</label>
            <input
              type="text"
              class="form-control"
              name="companyUrl"
              required
            />
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
