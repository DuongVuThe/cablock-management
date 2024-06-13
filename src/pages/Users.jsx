import AddUser from "../features/staff/AddUser";
import StaffTable from "../features/staff/StaffTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function NewUsers() {
  return (
    <>
      <Row>
        <Heading as="h1">All users</Heading>
      </Row>
      <Row>
        <StaffTable />
        <AddUser />
      </Row>
    </>
  );
}

export default NewUsers;
