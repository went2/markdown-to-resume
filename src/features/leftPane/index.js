import React from "react";
import { connect } from "react-redux";

// components
import MdEditor from "./MdEditor";
import CssEditor from "./CssEditor";

function LeftPane(props) {
  const { isMdEditing } = props;
  return <div>{isMdEditing ? <MdEditor /> : <CssEditor />}</div>;
}

const mapStateToProps = (state) => {
  return {
    isMdEditing: state.editor.isMdEditing,
  };
};

export default connect(mapStateToProps)(LeftPane);
