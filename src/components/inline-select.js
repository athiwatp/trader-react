import React, {Component} from "react";
import classnames from "classnames";
import "./inline-select.css";

class InlineSelect extends Component {
    render() {

        return (
            <div>
                <p>{this.props.label}</p>
                <ul className="inline-select">
                    {
                        this.props.options.map((o, idx) => {
                            console.log(o.value);
                            let optionClassNames = classnames({
                                option: true,
                                selected: o.value === this.props.selected
                            });
                            return (
                                <li
                                    className={optionClassNames} key={o.value || idx}
                                    onClick={this.props.onSelect.bind(o.value)}
                                >
                                    {o.text}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default InlineSelect;