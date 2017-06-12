import React, {Component} from "react";
import "./radial-progress.css";

class RadialProgress extends Component {
    render() {
        return (
            <svg className="radial-progress" width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12"/>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#f77a52" strokeWidth="12"
                        strokeDasharray="339.292" strokeDashoffset="135.717"/>
            </svg>
        );
    }
}

export default RadialProgress;