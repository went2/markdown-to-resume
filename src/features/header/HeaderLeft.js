import React, { useCallback } from "react";
import { connect } from "react-redux";
import { updateContent } from "../editor/redux/reducer.js";

function HeaderLeft(props) {
  const { updateContent } = props;

  const handleInputFile = useCallback(
    (evt) => {
      let file = evt.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const content = reader.result;
        updateContent(content);
      };
    },
    [updateContent]
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLeft);
