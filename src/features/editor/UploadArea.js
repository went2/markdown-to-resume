import React, { useCallback } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { readFile } from "@/features/editor/redux/reducer.js";
import { connect } from "react-redux";

const { Dragger } = Upload;
const props = {
  name: "md_file",
  accept: ".md",
  multiple: false,
};

const UploadArea = ({ readFile }) => {
  const customRequest = useCallback(
    (obj) => {
      const file = obj.file;
      readFile(file);
    },
    [readFile]
  );
  return (
    <Dragger {...props} customRequest={customRequest}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖放文件到这里上传</p>
    </Dragger>
  );
};

const mapDispatchToProps = (dispatch) => ({
  readFile: (file) => dispatch(readFile(file)),
});

export default connect(undefined, mapDispatchToProps)(UploadArea);
