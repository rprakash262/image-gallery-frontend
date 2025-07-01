import { IconLogout } from "@tabler/icons-react";

import { useAuth } from "../../hooks/useAuth";
import Button from "../UI/button/Button";
import { LinkButton } from "../UI/linkButton/LinkButton";
// import Logo from "../../../public/assets/logo.jpg"

function Header() {
  const { logout } = useAuth();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",
        boxSizing: "border-box",
        paddingLeft: 0,
      }}
    >
      <div>
        <img src="/assets/logo.jpg" style={{ height: "58px" }} />
      </div>
      <div>
        {/* <Button label="Logout" btnType="primary" onClick={logout} /> */}
        <LinkButton onClick={logout} label="Logout" icon={IconLogout} />
      </div>
    </div>
  );
}

export default Header;
