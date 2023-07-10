import React from "react";
import { Modal } from "react-bootstrap";

const SignOut = ({ signOutShow, setSignOutShow, handleSignout, config }) => {
  return (
    <Modal show={signOutShow} onHide={() => setSignOutShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>SIGN OUT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="text-center ">Confirm Sign Out</p>
          <div className="p-1">
            <p>
              All private files uploaded or custom conversations (if any) will
              be permanently removed.
            </p>
            <p className="mb-5">Config file key: “sign_out_message”.</p>
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
            className="btn w-100 text-white mb-5"
            onClick={handleSignout}
          >
            CONFIRM
          </button>
          <button
            style={{
              backgroundColor: config?.modal_secondary_button_bg_color
                ? `#${config?.modal_secondary_button_bg_color}`
                : "#a2a2a2",
              color: config?.modal_secondary_button_text_color
                ? `#${config?.modal_secondary_button_text_color}`
                : "#FFFFFF",
            }}
            type="submit"
            className="btn w-100 text-white mb-5"
            onClick={() => setSignOutShow(false)}
          >
            CANCEL
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignOut;
