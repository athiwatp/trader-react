import React, {Component} from "react";
import "./wealth-meter.css";
import colors from  '../data/colors';

let size = 300;
let centerX = size / 2;
let centerY = size / 2;
let radius = size / 2;
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
        let angles = [];
        let rotateAngles = wealthPercents.slice(0);
        rotateAngles.reduce((memo, ra) => {
            angles.push(memo);
            return memo + ra;
        }, 0);
        return (
            <div className="wealth-meter">
                <svg
                    width={size}
                    height={size / 2}
                    viewBox={`0 0 ${size} ${size / 2}`}
                >
                    {
                        wealthPercents.map((wp, idx) => {
                            let p = arcXY(centerX, centerY, radius, angleInRadians(wp));
                            return (
                                <path
                                    transform={`rotate(${-angles[idx]},${centerX}, ${centerY})`}
                                    key={'stock-' + idx}
                                    fill={`#${colors.styleOne[idx]}`}
                                    d={`M${centerX},${centerY} l${centerX},0 A${centerX},${centerY} 0 0,0 ${p.x},${p.y} z`}
                                    strokeWidth={5}
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
                </svg>
            </div>
        )
    }
}

export default WealthMeter;