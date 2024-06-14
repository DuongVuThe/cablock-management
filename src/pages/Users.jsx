import { useUser } from "../features/authentication/useUser";
import AddUser from "../features/staff/AddUser";
import StaffTable from "../features/staff/StaffTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function NewUsers() {
  const { isPending, isAdmin } = useUser();

  if (isPending) return <Spinner />;

  return (
    <>
      <Row>
        <Heading as="h1">All users</Heading>
      </Row>
      <Row>
        <StaffTable />
        {isAdmin && <AddUser />}{" "}
      </Row>
    </>
  );
}

export default NewUsers;
