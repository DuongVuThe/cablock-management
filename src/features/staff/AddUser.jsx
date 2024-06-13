import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SignupForm from "../authentication/SignupForm";

function AddUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-user-form">
          <Button>Add new user</Button>
        </Modal.Open>
        <Modal.Window name="add-user-form">
          <SignupForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
