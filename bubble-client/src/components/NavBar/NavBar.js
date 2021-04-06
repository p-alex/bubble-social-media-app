import React from "react";
import "./NavBar.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/user";
export default function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <nav className="nav">
      <div className="nav_main">
        <Link to="/">
          <span className="nav_logo">BUBBLE</span>
        </Link>
        {user ? <Link to="/new-post">New Post</Link> : null}
      </div>

      <div className="nav_user">
        <div className="nav_userImage">
          {user ? (
            <>
              <Link to={`/profile/${user.googleId}`}>
                <img src={user?.imageUrl} alt={user?.name} />
              </Link>
            </>
          ) : null}
        </div>
        <div className="nav_logout">
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
