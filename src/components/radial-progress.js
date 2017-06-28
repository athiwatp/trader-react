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

        let progressColor = (val < 0) ? '#e74c3c' : '#27ae60';

        let offset = this.calcProgressOffset(val / 100);
        let needleAngle = (360 * val) / 100;
        let radialTicks = [];
        for (let i = 0; i <= 360; i += 10) {
            radialTicks.push(i);
        }
        return (
            <svg className="radial-progress" width="120" height="120" viewBox="0 0 120 120">
                <defs>
                    <line id="tick" x1="104" y1="60" x2="110" y2="60"
                          strokeLinecap={'round'}/>
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
                <g transform="translate(3,-15)">
                    <text className="tickLabel" x={95} y={70} textAnchor="center" transform="rotate(90 90,65)">0</text>
                    <text className="tickLabel" x={53} y={35} textAnchor="center" transform="rotate(90 53,35)">50</text>
                    <text className="tickLabel" x={20} y={65} textAnchor="center" transform="rotate(90 20,65)">100
                    </text>
                    <text className="tickLabel" x={60} y={95} textAnchor="center" transform="rotate(90 53,95)">50</text>
                </g>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12"/>
                <circle cx="60" cy="60" r="54" fill="none" stroke={progressColor} strokeWidth="12"
                        strokeDasharray="339.292" strokeDashoffset={offset}/>
                <circle cx="60" cy="60" r="5" fill="#9a9a9a"/>
                <line
                    x1="60"
                    y1="60"
                    x2="120"
                    y2="60"
                    stroke="#9a9a9a"
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