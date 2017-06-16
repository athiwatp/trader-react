import React, {Component} from "react";
import classnames from "classnames";
import "./stock-form.css";

class Form extends Component {
    render() {
        let txn = this.props.txn || {};

        let formClassNames = classnames({
            animated: true,
            zoomIn: !this.state.closing,
            zoomOut: this.state.closing
        });

        return (
            <form className={formClassNames} onSubmit={this.save}>

                <a className="close-form" onClick={this.closeForm}>X</a>

                <h2>Add Stock</h2>

                <ul className="fields">
                    <li className="field">
                        <label htmlFor="symbol">Stock symbol</label>
                        <input
                            id="symbol"
                            type="text"
                            defaultValue={txn.symbol}
                            placeholder="Symbol"
                            className="input-field symbol"
                            ref={(elm) => this.symbolElm = elm}
                            pattern="[a-zA-Z]+"
                            required='required'
                        />
                    </li>
                    <li className="field">
                        <label htmlFor="price">Stock Price</label>
                        <input
                            id="price"
                            type="tel"
                            defaultValue={txn.price}
                            placeholder="Price"
                            className="input-field price"
                            ref={(elm) => this.priceELm = elm}
                            pattern="^\d{0,8}(\.\d{1,4})?$"
                            required='required'
                        />
                    </li>
                    <li className="field">
                        <label htmlFor="quantity">Number of stocks</label>
                        <input
                            id="quantity"
                            type="tel"
                            defaultValue={txn.qty}
                            placeholder="Qty"
                            className="input-field qty"
                            ref={(elm) => this.qtyElm = elm}
                            pattern="^\d{0,8}$"
                            required='required'
                        />
                    </li>
                    <li className="field">
                        <label htmlFor="date">Transaction Date</label>
                        <input
                            id="date"
                            type="text"
                            defaultValue={txn.date}
                            placeholder="DD/MM/YYYY"
                            className="input-field date"
                            ref={(elm) => this.dateElm = elm}
                            pattern="\d{1,2}/\d{1,2}/\d{4}"
                            required='required'
                        />
                    </li>
                </ul>
                <div className="cta-buttons">
                    <button>Add</button>
                </div>
            </form>
        );
    }
}

class StockForm extends Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.state = {
            closing: false
        };
    }

    save(e) {
        e.preventDefault();
        let txn = {
            symbol: this.symbolElm.value || '',
            price: this.priceELm.value || '',
            qty: this.qtyElm.value || '',
            date: this.dateElm.value || ''
        };
        this.props.onSave(txn);
        this.clear();
    }

    clear() {
        this.symbolElm.value = '';
        this.priceELm.value = '';
        this.qtyElm.value = '';
        this.dateElm.value = '';
    }

    closeForm(e) {
        e.preventDefault();
        this.setState({
            closing: true
        }, () => {
            setTimeout(() => {
                this.props.onClose();
            }, 300)
        });
    }

    render() {


        return (
            <div className="stock-form">
                <button className="toggle">+</button>
            </div>
        )
    }
}

StockForm.defaultProps = {
    txn: {
        id: '',
        symbol: '',
        price: '',
        qty: '',
        date: ''
    }
};

export default StockForm;