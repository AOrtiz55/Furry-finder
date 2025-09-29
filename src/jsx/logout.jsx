import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens or session data
    localStorage.removeItem("authToken"); // or cookies/sessionStorage/etc.

    // Redirect to login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
}

export default LogoutButton;
