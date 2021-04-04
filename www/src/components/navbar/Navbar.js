import { Navbar, Nav, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import Cookies from "js-cookie";
import { axiosRequest } from "../../helpers/requests/axios";

const NavBar = (props) => {
  const userCookie = Cookies.get("user");
  const userObject = JSON.parse(userCookie);

  const handleLogoutButton = async (e) => {
    e.preventDefault();
    await axiosRequest(
      "POST",
      `${process.env.REACT_APP_API_URL}/v1/user/logout`,
      "application/json",
      "application/json",
      true,
      null,
      null
    );
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="mr-auto" href="#home">
        Doctor Case Label Platform
      </Navbar.Brand>

      <div className="d-flex align-items-baseline text-white">
        <p className="mr-2 mb-0 font-size-small">Signed in as: </p>
        <p className="mb-0">{userObject ? userObject.name : null}</p>
      </div>
      <Nav>
        <Button
          className="d-block ml-5"
          onClick={async (e) => {
            await handleLogoutButton(e);
          }}
        >
          <Link style={{ color: "white", margin: "10px" }} to={"/"}>
            Logout
          </Link>
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
