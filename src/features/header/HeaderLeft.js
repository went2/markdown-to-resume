import React, { useCallback } from "react";
import { connect } from "react-redux";
import {
  readFile,
  changeMdEditing,
} from "@/features/leftPane/redux/reducer.js";

import { Switch } from "antd";

import "./HeaderLeft.less";

function HeaderLeft(props) {
  const { readFile, isMdEditing, changeMdEditing } = props;

  const handleInputFile = useCallback(
    (evt) => readFile(evt.target.files[0]),
    [readFile]
  );

  const handleSwitchChange = useCallback(() => {
    changeMdEditing();
    // setMdChecked(!mdChecked);
  });

  return (
    <div className="header-btns-container">
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
      <div>
        <Switch
          style={{
            backgroundColor: isMdEditing ? "#1E191A" : "#006bc0",
            height: "30px",
          }}
          checkedChildren="Markdown"
          unCheckedChildren="CSS"
          defaultChecked
          className="editor-switch"
          onChange={handleSwitchChange}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isMdEditing: state.editor.isMdEditing,
  };
};

const mapDispatchToProps = (dispatch) => ({
  readFile: (file) => dispatch(readFile(file)),
  changeMdEditing: () => dispatch(changeMdEditing()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLeft);
