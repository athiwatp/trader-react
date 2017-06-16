import React, {Component} from "react";
import classnames from "classnames";
import "./overlay.css";

class Overlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    toggle = () => {
        if (this.state.open) {
            this.setState({
                closing: true,
            }, () => {
                setTimeout(() => {
                    this.setState({
                        open: false,
                        closing: false
                    });
                }, 250);
            });
        } else {
            this.setState({
                open: true
            })
        }

    }

    render() {

        let overlayClasses = classnames({
            overlay: true,
            open: this.state.open
        });

        let contentsClass = classnames({
            contents: true,
            animated: true,
            slideInUp: this.state.open && !this.state.closing,
            slideOutDown: this.state.closing
        });

        return (
            <div className={overlayClasses}>
                <div className={contentsClass}>
                    <button
                        className="toggle"
                        onClick={this.toggle}
                    >
                        {this.state.open ? '-' : '+'}
                    </button>
                    <div className="wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Overlay;