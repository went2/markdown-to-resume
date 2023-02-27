import React from "react";
import { connect } from "react-redux";

import "./Previewer.less";

const Previewer = ({ html }) => {
  return (
    <div className="rs-view">
      <iframe title="rsViewer" srcDoc={html} width="100%" height="100%" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    html: state.editor.html,
  };
};

export default connect(mapStateToProps)(Previewer);
