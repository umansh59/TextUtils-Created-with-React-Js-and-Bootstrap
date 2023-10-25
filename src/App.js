import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState } from "react";
import Alert from "./components/Alert";
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Fonts from "./components/Fonts";

function App() {
  const [mode, setMode] = useState("light");
  const [colorDark, setColorDark] = useState("black");
  const darkModeBlueColor = () => {
    setColorDark("blue");
    console.log("color blue pressed");
    document.body.style.backgroundColor = "blue";
    showAlert(" Blue theme is enabled ", "success");
  };
  const darkModeGreenColor = () => {
    setColorDark("green");
    document.body.style.backgroundColor = "green";
    showAlert(" green theme is enabled ", "success");
  };
  const darkModeRedColor = () => {
    setColorDark("red");
    document.body.style.backgroundColor = "red";
    showAlert(" red theme is enabled ", "success");
  };
  const darkModeBlackColor = () => {
    setColorDark("black");
    document.body.style.backgroundColor = "black";
    showAlert(" black theme is enabled ", "success");
  };

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      document.title = "Text Utils -Light Mode ";
      showAlert(" Light mode is enabled ", "success");
    } else {
      setMode("dark");
      document.body.style.backgroundColor = colorDark;
      document.body.style.color = "white";
      document.title = "Text Utils -Dark Mode ";
      showAlert(" Dark mode is enabled ", "success");
    }
  };
  return (
    <>
      <Router>
        <Navbar
          title="TEXTutils"
          about="About Us"
          mode={mode}
          toggleMode={toggleMode}
          darkModeBlueColor={darkModeBlueColor}
          darkModeGreenColor={darkModeGreenColor}
          darkModeBlackColor={darkModeBlackColor}
          darkModeRedColor={darkModeRedColor}
        />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/"
              element={
                <TextForm
                  heading="Enter the required Text"
                  mode={mode}
                  showAlert={showAlert}
                />
              }
            />
            <Route path="/fonts" element={<Fonts/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
