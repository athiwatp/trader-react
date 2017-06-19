import React, {Component} from "react";
import "./stock-form.css";

class Form extends Component {

    saveForm = (e) => {
        e.preventDefault();
        let txn = {
            symbol: this.symbolElm.value || '',
            price: this.priceELm.value || '',
            qty: this.qtyElm.value || '',
            date: this.dateElm.value || ''
        };
        this.clearForm();
        this.props.onSave(txn);
    }

    cancelForm = () => {
        this.clearForm();
        this.props.onCancel();
    }

    clearForm = () => {
        this.symbolElm.value = '';
        this.priceELm.value = '';
        this.qtyElm.value = '';
        this.dateElm.value = '';
    }

    render() {
        let txn = this.props.txn || {};

        return (
            <form onSubmit={this.saveForm}>
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
                    <button className="secondary" onClick={this.cancelForm}>Cancel</button>
                    <button className="primary" type="submit">Add</button>
                </div>
            </form>
        );
    }
}

Form.defaultProps = {
    txn: {
        id: '',
        symbol: '',
        price: '',
        qty: '',
        date: ''
    }
};


class StockForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            closing: false
        };
    }

    save = (txn) => {
        this.props.onSave(txn);
    }

    close = () => {
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
                <Form
                    {...this.props}
                    onSave={this.save}
                    onCancel={this.close}
                />
            </div>
        )
    }
}


export default StockForm;