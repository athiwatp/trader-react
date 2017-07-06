import React, {Component} from "react";

class Logo extends Component {
    render() {
        let dur = "10s";
        return (
            <svg
                width='75'
                height='75'
                fill="#D4AF37"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                onClick={this.props.onClick}
            >
                <g>
                    <path
                        d="M83.125,57.125h2v-6.916h3V23.208h-3v-3.833h-2v3.833h-3v27.001h3V57.125z M82.125,25.208h4v23h-4V25.208z">
                        <animateTransform attributeName="transform"
                                          attributeType="XML"
                                          type="translate"
                                          values="0 10; 0 -20; 0 10"
                                          keyTimes="0;0.5;1"
                                          dur={dur}
                                          repeatCount="indefinite"/>
                    </path>
                    <path
                        transform="translate(0,-10)"
                        x="0"
                        d="M71.75,61.125h2v-6h3v-20.25h-3v-9.667h-2v9.667h-3v20.25h3V61.125z"
                    >
                        <animateTransform attributeName="transform"
                                          attributeType="XML"
                                          type="translate"
                                          values="0 -20; 0 20; 0-20"
                                          keyTimes="0;0.5;1"
                                          dur={dur}
                                          repeatCount="indefinite"/>
                    </path>
                    <polygon
                        points="60.375,48.25 62.375,48.25 62.375,38.333 65.375,38.333 65.375,30.667 62.375,30.667 62.375,27.167 60.375,27.167    60.375,30.667 57.375,30.667 57.375,38.333 60.375,38.333  ">
                        <animateTransform attributeName="transform"
                                          attributeType="XML"
                                          type="translate"
                                          values="0 -10; 0 5; 0-10"
                                          keyTimes="0;0.5;1"
                                          dur={dur}
                                          repeatCount="indefinite"/>
                    </polygon>
                    <path
                        d="M49,75.793h2V61.418h3V31.626h-3v-4.459h-2v4.459h-3v29.792h3V75.793z M48,33.626h4v25.792h-4V33.626z">
                        <animateTransform attributeName="transform"
                                          attributeType="XML"
                                          type="translate"
                                          values="0 20; 0 -20; 0 20"
                                          keyTimes="0;0.5;1"
                                          dur={dur}
                                          repeatCount="indefinite"/>
                    </path>
                    <path d="M37.625,73.125h2v-6.75h3v-10.75h-3V52.75h-1h-1v2.875h-3v10.75h3V73.125z">
                        <animateTransform attributeName="transform"
                                          attributeType="XML"
                                          type="translate"
                                          values="0 -10; 0 30; 0 -10"
                                          keyTimes="0;0.5;1"
                                          dur={dur}
                                          repeatCount="indefinite"/>
                    </path>
                    <polygon
                        points="26.25,61.396 28.25,61.396 28.25,58.896 31.25,58.896 31.25,43.562 28.25,43.562 28.25,34.396 26.25,34.396    26.25,43.562 23.25,43.562 23.25,58.896 26.25,58.896  "/>
                    <path
                        d="M16.875,42.896v-4h-2v4h-3v35.688h3v8.666h2v-8.666h3V42.896H16.875z M17.875,76.584h-4V44.896h4V76.584z">
                        <animateTransform attributeName="transform"
                                          attributeType="XML"
                                          type="translate"
                                          values="0 -10; 0 20; 0 -10"
                                          keyTimes="0;0.5;1"
                                          dur={dur}
                                          repeatCount="indefinite"/>
                    </path>
                </g>
            </svg>
        )
    }
}

export default Logo;