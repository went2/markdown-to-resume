import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { readFile } from "@/features/editor/redux/reducer.js";

import "./HeaderLeft.less";

function HeaderLeft(props) {
  const { readFile } = props;

  const handleInputFile = useCallback(
    (evt) => readFile(evt.target.files[0]),
    []
  );

  return (
    <div>
      <div className="file-upload">
        <label htmlFor="file-upload" className="file-upload-label">
          上传文件
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

const mapDispatchToProps = (dispatch) => ({
  readFile: (file) => dispatch(readFile(file)),
});

export default connect(undefined, mapDispatchToProps)(HeaderLeft);
