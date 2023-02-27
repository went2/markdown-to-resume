import React, { useCallback } from "react";
import { connect } from "react-redux";
import { uploadFile } from "./redux/reducer";

function HeaderLeft(props) {
  const { uploadFile } = props;

  const handleInputFile = useCallback(
    (evt) => {
      let file = evt.target.files[0];
      uploadFile(file);
    },
    [uploadFile]
  );

  return (
    <div>
      <div>
        <input
          type="file"
          id="input-file"
          accept=".md "
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
  uploadFile: (file) => dispatch(uploadFile(file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLeft);
