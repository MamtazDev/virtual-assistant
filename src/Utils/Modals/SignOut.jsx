import React from "react";
import { Modal } from "react-bootstrap";

const SignOut = ({ signOutShow, setSignOutShow, handleSignout }) => {
  return (
    <Modal show={signOutShow} onHide={() => setSignOutShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>SIGN OUT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="text-center my-5">Confirm Sign Out</p>
          <button
            style={{ backgroundColor: "#ED5684" }}
            type="submit"
            className="btn w-100 text-white mb-5"
            onClick={handleSignout}
          >
            CONFIRM
          </button>
          <button
            style={{ backgroundColor: "#a2a2a2" }}
            type="submit"
            className="btn w-100 text-white mb-5"
          >
            CANCEL
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignOut;
