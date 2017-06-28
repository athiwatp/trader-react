import React, {Component} from "react";
import classnames from "classnames";
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

        let progressColor = (val < 0) ? '#FF4136' : '#2ECC40';
        let offset = this.calcProgressOffset(val / 200);

        let needleAngle = (270 * val) / 100;
        let radialTicks = [];
        for (let i = 0; i <= 360; i += 10) {
            radialTicks.push(i);
        }
        return (
            <svg className="radial-progress" width="120" height="120" viewBox="0 0 120 120">
                <defs>
                    <line id="tick" x1="104" y1="60" x2="110" y2="60"
                          strokeLinecap={'round'}/>
                    <radialGradient id="radialCenter" cx="50%" cy="50%" r="50%">
                        <stop stopColor="#dc3a79" offset="0"/>
                        <stop stopColor="#241d3b" offset="1"/>
                    </radialGradient>
                </defs>
                <g id="points">
                    {
                        radialTicks.map((tick) => {
                            let tickClassNames = classnames({
                                tick: true,
                                quarterTick: !!{0: 1, 90: 1, 180: 1, 270: 1, 360: 1}[tick]
                            });
                            return <use className={tickClassNames}
                                        key={'tick-' + tick}
                                        href="#tick"
                                        transform={`rotate(${tick} 60 60)`}
                            />
                        })
                    }

                </g>
                <g transform="">
                    <text className="tickLabel" x={85} y={65} textAnchor="middle" transform="rotate(90 90,65)">0</text>
                    <text className="tickLabel" x={45} y={33} textAnchor="middle" transform="rotate(90 53,35)">50</text>
                    <text className="tickLabel" x={15} y={65} textAnchor="middle" transform="rotate(90 20,65)">100
                    </text>
                    <text className="tickLabel" x={50} y={93} textAnchor="middle" transform="rotate(90 53,95)">50</text>
                </g>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#fff" strokeWidth="12"/>
                <circle cx="60" cy="60" r="54" fill="none" stroke={progressColor} strokeWidth="12"
                        strokeDasharray="339.292" strokeDashoffset={offset}/>
                <g id="needle">
                    <polygon points="57,60 65,58 60,0" fill="yellow">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={`0 60 60`}
                            to={`${needleAngle} ${60} ${60}`}
                            dur=".5s"
                            fill="freeze"
                        />
                    </polygon>
                    <circle cx="60" cy="60" r="20" fill="url(#radialCenter)" stroke="yellow" strokeWidth={2}/>
                </g>
                <text x="60" y="65" fill="#000" textAnchor="middle" transform="rotate(90 60,60)" className="value">
                    {this.props.value}
                </text>
            </svg>
        );
    }
}

export default RadialProgress;