import React, {Component} from "react";
import classnames from "classnames";

import Utils from "../utils";
import "./wealth-meter.css";
import colors from "../data/colors";

let size = 300;
let centerX = size / 2;
let centerY = size / 2;
let radius = size / 2;
let GAP = 10;
let innerRadius = radius - GAP;
let WEALTH_METER_SIZE = 180;

let angleInRadians = (angleInDegrees) => -angleInDegrees * Math.PI / 180.0;
let arcXY = (cx, cy, r, radians) => ({
    x: cx + r * Math.cos(radians),
    y: cy + r * Math.sin(radians)
});

class WealthMeter extends Component {

    render() {

        let {wealth, stocks} = this.props;
        let wealthPortions = stocks.map((stock) => stock.quantity * stock.currentPrice);
        wealthPortions.reverse();
        let wealthPercents = wealthPortions.map((wp) => {
            let percent = parseFloat((WEALTH_METER_SIZE * wp) / wealth.current);
            return Number(percent.toFixed(2));
        });
        wealthPercents = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

        let angles = [];
        let rotateAngles = wealthPercents.slice(0);
        rotateAngles.reduce((memo, ra) => {
            angles.push(memo);
            return memo + ra;
        }, 0);

        let innerCircle = arcXY(centerX, centerY, innerRadius, angleInRadians(180));

        let wealthChange = wealth.current - wealth.invested;
        let indicator = wealthChange >= 0 ? '▲' : '▼';
        let wealthChangeClassNames = classnames({
            'wealth-change': true,
            up: wealthChange >= 0,
            down: wealthChange < 0
        })
        return (
            <div className="wealth-meter">
                <svg
                    width={size}
                    height={size / 2}
                    viewBox={`0 0 ${size} ${size / 2}`}
                >
                    <defs>
                        <radialGradient id="upGrad" gradientUnits="userSpaceOnUse" cx="50%" cy="100%" r="90%">
                            <stop stopColor="#5a1a66" offset="0"/>
                            <stop stopColor="#36103d" offset="1">
                                <animate attributeName="offset" dur="1s" values="0;.20;.40;.60;.80;.95" fill="freeze" />
                            </stop>
                        </radialGradient>
                        <radialGradient id="downGrad" gradientUnits="userSpaceOnUse" cx="50%" cy="100%" r="90%">
                            <stop stopColor="#e6c3cc" offset="0"/>
                            <stop stopColor="#ff0000" offset="1" stopOpacity={.2} />
                        </radialGradient>
                    </defs>
                    {
                        wealthPercents.map((wp, idx) => {
                            let p = arcXY(centerX, centerY, radius, angleInRadians(wp));
                            return (
                                <path
                                    transform={`rotate(${-angles[idx]},${centerX}, ${centerY})`}
                                    key={'stock-' + idx}
                                    fill={`#${colors.styleOne[idx]}`}
                                    d={`M${centerX},${centerY} l${centerX},0 A${centerX},${centerY} 0 0,0 ${p.x},${p.y} z`}
                                    strokeWidth={1}
                                    stroke="#eaeaea"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from={`0 ${centerX} ${centerY}`}
                                        to={`${-angles[idx]} ${centerX} ${centerY}`}
                                        dur=".5s"
                                        fill="freeze"
                                    />
                                </path>

                            )
                        })
                    }
                    <path
                        stroke="#fdf8fd"
                        strokeWidth={2}
                        fill="url(#upGrad)"
                        d={`M${centerX},${centerY} l${centerY - GAP},0 A${centerX},${centerY} 0 0,0 ${innerCircle.x},${innerCircle.y} z`}
                    />

                    <text
                        className="wealth-current"
                        x={centerX}
                        y={centerY - 40}
                        textAnchor="middle"
                    >
                        {Utils.currency(wealth.current)}
                    </text>
                    <text
                        className={wealthChangeClassNames}
                        x={centerX}
                        y={centerY - 15}
                        textAnchor="middle"
                    >
                        {indicator} {Utils.currency(wealthChange)}
                    </text>
                </svg>
            </div>
        )
    }
}

export default WealthMeter;