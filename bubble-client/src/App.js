import React, { useEffect } from "react";
import "./App.scss";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user";
import { getPosts } from "./actions/posts";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./layout/Home/Home";
import NewPost from "./layout/NewPost/NewPost";
import PostPage from "./layout/PostPage/PostPage";
import ProfilePage from "./layout/ProfilePage/ProfilePage";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    if (localStorage.getItem("bubble-profile")) {
      dispatch(getUser(JSON.parse(localStorage.getItem("bubble-profile"))));
    } else {
      dispatch(getUser(""));
    }
  }, [dispatch]);
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="site-wrapper">
          <Switch>
            <Redirect exact from="/reload" to="/" />
            <Route path="/" exact component={Home}></Route>
            <Route path="/auth" exact component={Auth}></Route>
            <Route path="/new-post" exact component={NewPost}></Route>
            <Route path="/posts/:id" exact component={PostPage}></Route>
            <Route path="/profile/:id" exact component={ProfilePage}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
