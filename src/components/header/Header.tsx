import { IconLogout, IconBrandGithubFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import Button from "../UI/button/Button";
import { LinkButton } from "../UI/linkButton/LinkButton";
// import Logo from "../../../public/assets/logo.jpg"

interface HeaderProps {
  showLogoutBtn?: boolean;
  showGithubBtn?: boolean;
}

function Header({ showLogoutBtn, showGithubBtn }: HeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onGithubClick = () => {
    window.open("https://github.com/rprakash262/image-gallery-frontend", "_blank")
  }

  const goToHome = () => {
    navigate("/")
  }

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
        <img
          src="/assets/logo.jpg"
          style={{ height: "58px", cursor: "pointer" }}
          onClick={goToHome}
        />
      </div>
      {showLogoutBtn && (
        <div>
          <LinkButton onClick={logout} label="Logout" icon={IconLogout} />
        </div>
      )}
      {showGithubBtn && (
        <div>
          <LinkButton
            onClick={onGithubClick}
            icon={IconBrandGithubFilled}
            iconSize={26}
          />
        </div>
      )}
    </div>
  );
}

export default Header;
