import { useStaff } from "./useStaff";

import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import UserRow from "./UserRow";

function StaffTable() {
  const { isPending, data: users } = useStaff();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>full name</div>
          <div>email</div>
          <div>role</div>
          <div>uuid</div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UserRow user={user} key={user.id} />}
        />
      </Table>
    </Menus>
  );
}

export default StaffTable;
