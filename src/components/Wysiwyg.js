import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Wysiwyg = ({ source, record = {}, value }) => {
  value = value || record[source];
  const [state, setState] = useState({
    contentState: {}
  });
  const onEditorStateChange = contentState => {
    setState({
      contentState
    });
  };
  return (
    <Editor
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  );
};
export default Wysiwyg;
