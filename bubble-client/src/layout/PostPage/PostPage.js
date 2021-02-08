import React from "react";
import FullPost from "../../components/FullPost/FullPost";
import NavBar from "../../components/NavBar/NavBar";
export default function PostPage(props) {
  return (
    <>
      <NavBar />
      <FullPost id={props.match.params.id} />
    </>
  );
}
