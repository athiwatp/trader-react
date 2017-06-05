import React, {Component} from "react";
import "./transaction-form.css";

class TransactionForm extends Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
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

    render() {
        let txn = this.props.txn || {};
        return (
            <form className="transaction-form" onSubmit={this.save}>
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
                <input
                    d="btn-submit"
                    type="submit"
                    value={'+'}
                    className="input-field btn"
                />
            </form>
        )
    }
}

TransactionForm.defaultProps = {
    txn: {
        id: '',
        symbol: '',
        price: '',
        qty: '',
        date: ''
    }
}

export default TransactionForm;