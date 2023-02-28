import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { updateContent, md2Html, updateDoc } from "../editor/redux/reducer.js";

import "./HeaderLeft.less";

function HeaderLeft(props) {
  const { updateContent, updateDoc } = props;
  const [labelText, setLabelText] = useState("上传文件");

  const handleInputFile = useCallback(
    (evt) => {
      let file = evt.target.files[0];
      let reader = new FileReader();
      setLabelText("正在解析");
      reader.readAsText(file);
      reader.onload = function () {
        const content = reader.result;
        updateDoc(content);
        setLabelText("上传文件");

        // updateContent(content);
      };
    },
    [updateDoc]
  );

  return (
    <div>
      <div className="file-upload">
        <label for="file-upload" className="file-upload-label">
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
  updateDoc: (content) => dispatch(updateDoc(content)),
  updateContent: (file) => dispatch(updateContent(file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLeft);
