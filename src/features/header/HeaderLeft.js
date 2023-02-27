import React, { useCallback } from "react";
import { connect } from "react-redux";

function HeaderLeft(props) {
  const { setEditorContent } = props;

  const handleInputFile = useCallback(
    (evt) => {
      let file = evt.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const content = reader.result;
        // console.log(content);

        setEditorContent(content);
      };
    },
    [setEditorContent]
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

const mapDispatchToProps = function (dispatch) {
  return {
    setEditorContent: (content) => {
      dispatch({
        type: "SET_EDITOR_CONTENT",
        content,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLeft);
