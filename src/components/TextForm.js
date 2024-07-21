import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = Text.toUpperCase();
    setText(newText);
    props.showAlert(" Change to Uppercase ", "success");
  };
  const handleLoClick = () => {
    let newText = Text.toLowerCase();
    setText(newText);
    props.showAlert(" Change to Lowercase ", "success");
  };
  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert(" Text Cleared! ", "success");
  };
  const handleCopyClick = () => {
    var copyText = document.getElementById("myBox");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    props.showAlert(" Text copied! ", "success");
  };

  const handleOnChange = (event) => {
    console.log(`On change`);
    setText(event.target.value);
  };
  const [Text, setText] = useState("Enter the text here ");

  return (
    <>
      <div>
        <h2>{props.heading}</h2>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={Text}
            id="myBox"
            rows="8"
            onChange={handleOnChange}
            style={{
              color: props.mode === "dark" ? "white" : "black",
              backgroundColor: props.mode === "dark" ? "grey" : "white",
            }}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          convert to Uppercase
        </button>

        <button className="btn btn-primary mx-1 my-1 " onClick={handleLoClick}>
          convert to Lowercase
        </button>
        <button
          className="btn btn-primary mx-1 my-1 "
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          className="btn btn-primary mx-1 my-1 "
          onClick={handleCopyClick}
        >
          Copy Text
        </button>
      </div>
      <div className="container my-3">
        <h1>Text Summary</h1>
        <p>
          {Text.split(" ").filter((element) => element.length !== 0).length}{" "}
          words and {Text.length} characters
        </p>
        <p>{Text.split(" ").length * 0.008} Minutes read </p>
        <h2>Preview</h2>
        <p>
          {Text.length > 0
            ? Text
            : "Enter some text in the above box to view here "}
        </p>
      </div>
    </>
  );
}
