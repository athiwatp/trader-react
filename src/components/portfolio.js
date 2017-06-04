import React, {Component} from "react";
import Stock from "./stock";

class Portfolio extends Component {

    render() {
        return (
            <div className="portfolio">
                {
                    this.props.stocks.map((stock) => <Stock key={stock.id} stock={stock}/>)
                }
            </div>
        )
    }

}

export default Portfolio;