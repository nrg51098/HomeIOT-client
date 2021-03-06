import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import "./assets/css/demo.css";
import { HomeIOT } from "./components/homeiot.js";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <HomeIOT className="homeiot"/>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)