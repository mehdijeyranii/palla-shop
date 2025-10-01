import { VerticalDivider } from "../ui";
import AuthButton from "./AuthButton";
import CartButton from "./CartButton";

const UserActions = () => {
  return (
    <>
      <CartButton />
      <VerticalDivider />
      <AuthButton />
    </>
  );
};

export default UserActions;
