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
      <Link to="/">Bubble</Link>
      {user ? <Link to="/new-post">New Post</Link> : null}
      <div className="nav_user">
        {user ? (
          <>
            <p>{user.name}</p>
            <Link to={`/profile/${user.googleId}`}>
              <img src={user?.imageUrl} alt={user?.name} />
            </Link>
          </>
        ) : null}
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </div>
    </nav>
  );
}
