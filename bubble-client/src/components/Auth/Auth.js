import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Auth.scss";
import { GoogleLogin } from "react-google-login";
import { getUser } from "../../actions/user";
const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSignUp, setIsSignUp] = useState(false);

  function toggleAuth() {
    if (isSignUp) {
      setIsSignUp(false);
    } else {
      setIsSignUp(true);
    }
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    //const token = res?.tokenId;

    try {
      dispatch(getUser(result));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful");
  };

  return (
    <>
      <main className="auth">
        <>
          {" "}
          <img src="/images/logos/bubble-logo.png" alt="bubble" />
          <form>
            {isSignUp ? (
              <>
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
              </>
            ) : (
              <>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
              </>
            )}
            {isSignUp ? (
              <button type="submit">Sign Up</button>
            ) : (
              <button type="submit">Log In</button>
            )}
            <div className="auth__or">
              <div className="auth__orLeftBar"></div>
              OR
              <div className="auth__orRightBar"></div>
            </div>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <i className="fab fa-google"></i>
                  Log in with google
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </form>
          {isSignUp ? (
            <div className="auth__toggleBtn">
              Already have an account? <span onClick={toggleAuth}>Log In</span>
            </div>
          ) : (
            <div className="auth__toggleBtn">
              Don't have an account? <span onClick={toggleAuth}>Sign up</span>
            </div>
          )}
        </>
      </main>
    </>
  );
};

export default Auth;
