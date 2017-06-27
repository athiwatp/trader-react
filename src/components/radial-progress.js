import React, {Component} from "react";
import "./radial-progress.css";

class RadialProgress extends Component {


    calcProgressOffset(progress) {
        return 339.292 * (1 - progress);
    }

    render() {

        let val = this.props.value;

        if (val < -100) {
            val = -100;
        } else if (val > 100) {
            val = 100;
        }

        let progressColor = (val < 0) ? '#e74c3c' : '#27ae60';

        let offset = this.calcProgressOffset(val / 100);
        let needleAngle = (360 * val) / 100;
        return (
            <svg className="radial-progress" width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12"/>
                <circle cx="60" cy="60" r="54" fill="none" stroke={progressColor} strokeWidth="12"
                        strokeDasharray="339.292" strokeDashoffset={offset}/>
                <circle cx="60" cy="60" r="5" fill="#000"/>
                <line
                    x1="60"
                    y1="60"
                    x2="120"
                    y2="60"
                    stroke="#000"
                    strokeWidth={2}
                    strokeLinecap={'round'}
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 60 60`}
                        to={`${needleAngle} ${60} ${60}`}
                        dur=".5s"
                        fill="freeze"
                    />
                </line>
            </svg>
        );
    }
}

export default RadialProgress;