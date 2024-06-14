import { HiChevronUpDown } from "react-icons/hi2";
import styled, { css } from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { Avatar } from "../authentication/UserAvatar";

const Text = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  ${(props) =>
    props.type === "fade" &&
    css`
      color: var(--color-grey-200);
    `}
`;

function UserRow({ user }) {
  const { fullName, email, avatar, is_admin: isAdmin, user_id: userId } = user;

  const role = isAdmin ? "admin" : "staff";

  const roleToTagName = {
    admin: "blue",
    staff: "green",
  };

  return (
    <Table.Row>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <Text>{fullName}</Text>
      <Text>{email}</Text>
      <Tag role={role} type={roleToTagName[role]}>
        <p>{role}</p>

        {/* <HiChevronUpDown /> */}
      </Tag>
      <Text type="fade">{userId}</Text>
    </Table.Row>
  );
}

export default UserRow;
