import React, { useCallback } from "react";
import { connect } from "react-redux";
import { updateContent, md2Html } from "../editor/redux/reducer.js";

function HeaderLeft(props) {
  const { updateContent, convertMd2Html } = props;

  const handleInputFile = useCallback(
    (evt) => {
      let file = evt.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const content = reader.result;
        updateContent(content);
        convertMd2Html(content);
      };
    },
    [updateContent, convertMd2Html]
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
  updateContent: (file) => dispatch(updateContent(file)),
  convertMd2Html: (content) => dispatch(md2Html(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLeft);
