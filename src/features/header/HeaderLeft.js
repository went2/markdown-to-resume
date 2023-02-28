import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { readFile } from "../editor/redux/reducer.js";

import "./HeaderLeft.less";

function HeaderLeft(props) {
  const { readFile } = props;
  const [labelText, setLabelText] = useState("上传文件");

  const handleInputFile = useCallback((evt) => {
    let file = evt.target.files[0];
    readFile(file);
  }, []);

  return (
    <div>
      <div className="file-upload">
        <label htmlFor="file-upload" className="file-upload-label">
          {labelText}
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".md"
          onChange={handleInputFile}
        ></input>
      </div>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  readFile: (file) => dispatch(readFile(file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLeft);
