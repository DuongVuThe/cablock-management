import styled, { css } from "styled-components";
import Table from "../../ui/Table";
import { Avatar } from "../authentication/UserAvatar";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import { HiChevronUpDown } from "react-icons/hi2";

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

const Role = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  font-family: "Sono";

  border-radius: var(--border-radius-sm);

  width: fit-content;
  padding: 1rem 2rem;
  border-radius: 10px;
  border: none;

  &:hover {
    background-color: var(--color-grey-500);
    cursor: pointer;
  }

  ${(props) =>
    props.role === "admin" &&
    css`
      color: var(--color-yellow-700);
    `}
`;

function UserRow({ user }) {
  const { fullName, email, avatar, isAdmin, userId } = user;

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

        <HiChevronUpDown />
      </Tag>
      <Text type="fade">{userId}</Text>
    </Table.Row>
  );
}

export default UserRow;
