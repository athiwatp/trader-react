import React, {Component} from "react";
import "./stock-form.css";

class Form extends Component {
    render() {
        let txn = this.props.txn || {};

        return (
            <form onSubmit={this.save}>
                <ul className="fields inline">
                    <li className="field">
                        <input
                            id="symbol"
                            type="text"
                            defaultValue={txn.symbol}
                            placeholder="Symbol"
                            className="symbol"
                            ref={(elm) => this.symbolElm = elm}
                            pattern="[a-zA-Z]+"
                            required='required'
                        />
                    </li>
                    <li className="field">
                        <input
                            id="price"
                            type="tel"
                            defaultValue={txn.price}
                            placeholder="Price"
                            className="price"
                            ref={(elm) => this.priceELm = elm}
                            pattern="^\d{0,8}(\.\d{1,4})?$"
                            required='required'
                        />
                    </li>
                    <li className="field">
                        <input
                            id="quantity"
                            type="tel"
                            defaultValue={txn.qty}
                            placeholder="Quantity"
                            className="qty"
                            ref={(elm) => this.qtyElm = elm}
                            pattern="^\d{0,8}$"
                            required='required'
                        />
                    </li>
                    <li className="field">
                        <input
                            id="date"
                            type="text"
                            defaultValue={txn.date}
                            placeholder="DD/MM/YYYY"
                            className="date"
                            ref={(elm) => this.dateElm = elm}
                            pattern="\d{1,2}/\d{1,2}/\d{4}"
                            required='required'
                        />
                    </li>
                </ul>
                <div className="cta-buttons">
                    <button className="secondary">Cancel</button>
                    <button className="primary">Add</button>
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
                <Form {...this.props} />
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