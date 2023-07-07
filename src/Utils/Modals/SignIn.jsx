import React from "react";
import { Button, Modal } from "react-bootstrap";

const SignIn = ({ show, handleClose, handleSignUp }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>SIGN IN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSignUp}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email
            </label>
            <input type="text" class="form-control" name="name" required />
            <div class="form-text">
              We'll never share your email with anyone else.
            </div>
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
            style={{ backgroundColor: "#ED5684" }}
            type="submit"
            class="btn w-100 text-white"
          >
            SIGN IN
          </button>
        </form>
        <div>
          <p className="divider">
            <span>OR</span>{" "}
          </p>

          <p className="text-center">Need an account? Forgot password?</p>
          <h5 className="text-center">
            <u>SIGN UP</u>{" "}
          </h5>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
