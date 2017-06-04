import React, {Component} from "react";

class Stock extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let stock = this.props.stock;

        return (
            <div className="stock">
                <p>{stock.symbol}</p>
                <p>{stock.price}</p>
                <p>{stock.qty}</p>
                <p>{stock.date}</p>
            </div>
        )
    }
}

export default Stock;