import React, {Component} from "react";
import "./stock-form.css";
import InlineSelect from "./inline-select";

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

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

    handleActionSelect = (selected) => {
        this.setState({
            action: selected
        })
    }

    handleExchangeSelect = (selected) => {
        this.setState({
            exchange: selected
        })
    }

    render() {
        let stock = this.props.stock || {};
        return (
            <form onSubmit={this.saveForm}>
                <ul className="fields">
                    <li className="field">
                        <InlineSelect
                            label="Action"
                            options={[{
                                text: 'Bought',
                                value: 'bought'
                            }, {
                                text: 'Sold',
                                value: 'sold'
                            }]}
                            selected={this.state.action}
                            onSelect={this.handleActionSelect}
                        />
                    </li>
                    <li className="field">
                        <InlineSelect
                            label="Exchange"
                            options={[{
                                text: 'NSE',
                                value: 'NSE'
                            }, {
                                text: 'BSE',
                                value: 'BSE'
                            }, {
                                text: 'NASDAQ',
                                value: 'NASDAQ'
                            }]}
                            selected={this.state.exchange}
                            onSelect={this.handleExchangeSelect}
                        />
                    </li>
                    <li className="field">
                        <div className="input-field">
                            <input
                                id="symbol"
                                type="text"
                                defaultValue={stock.symbol}
                                placeholder="Symbol"
                                className="symbol"
                                ref={(elm) => this.symbolElm = elm}
                                pattern="[a-zA-Z]+"
                                required='required'
                            />
                        </div>
                    </li>
                    <li className="field">
                        <div className="input-field">
                            <input
                                id="price"
                                type="tel"
                                defaultValue={stock.price}
                                placeholder="Price"
                                className="price"
                                ref={(elm) => this.priceELm = elm}
                                pattern="^\d{0,8}(\.\d{1,4})?$"
                                required='required'
                            />
                        </div>
                    </li>
                    <li className="field">
                        <div className="input-field">
                            <input
                                id="quantity"
                                type="tel"
                                defaultValue={stock.qty}
                                placeholder="Quantity"
                                className="qty"
                                ref={(elm) => this.qtyElm = elm}
                                pattern="^\d{0,8}$"
                                required='required'
                            />
                        </div>
                    </li>
                    <li className="field">
                        <div className="input-field">
                            <input
                                id="date"
                                type="text"
                                defaultValue={stock.date}
                                placeholder="DD/MM/YYYY"
                                className="date"
                                ref={(elm) => this.dateElm = elm}
                                pattern="\d{1,2}/\d{1,2}/\d{4}"
                                required='required'
                            />
                        </div>
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