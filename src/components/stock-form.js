import React, {Component} from "react";
import "./stock-form.css";
import InlineSelect from "./inline-select";
import {ACTIONS, EMPTY_STOCK, EXCHANGES} from "../data/constants";

class StockForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            closing: false,
            stock: Object.assign({}, EMPTY_STOCK, props.stock)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stock: Object.assign({}, nextProps.stock)
        });
    }

    saveForm = (e) => {
        e.preventDefault();
        let txn = Object.assign({}, this.state.stock);
        this.clearForm();
        this.props.onSave(txn);
    }

    cancelForm = (e) => {
        e.preventDefault();
        this.props.onClose();
    }

    clearForm = () => {
        this.setState({
            stock: EMPTY_STOCK
        })
    }

    handleInputChange = (e) => {
        let stock = {};
        stock[e.target.id] = e.target.value;
        this.setState({
            stock: Object.assign({}, this.state.stock, stock)
        });
    }

    handleActionSelect = (selected) => {
        this.setState({
            stock: Object.assign({}, this.state.stock, {
                action: selected
            })
        })
    }

    handleExchangeSelect = (selected) => {
        this.setState({
            stock: Object.assign({}, this.state.stock, {
                exchange: selected
            })
        })
    }

    render() {
        let stock = this.state.stock;
        return (
            <div className="stock-form">
                <form onSubmit={this.saveForm}>
                    <ul className="fields">
                        <li className="field">
                            <InlineSelect
                                label="Action"
                                options={[{
                                    text: ACTIONS.BUY,
                                    value: ACTIONS.BUY
                                }, {
                                    text: ACTIONS.SELL,
                                    value: ACTIONS.SELL
                                }]}
                                selected={stock.action}
                                onSelect={this.handleActionSelect.bind(this)}
                            />
                        </li>
                        <li className="field">
                            <InlineSelect
                                label="Exchange"
                                options={
                                    Object.keys(EXCHANGES).map((e) => ({
                                        text: EXCHANGES[e],
                                        value: EXCHANGES[e]
                                    }))
                                }
                                selected={stock.exchange}
                                onSelect={this.handleExchangeSelect}
                            />
                        </li>
                        <li className="field">
                            <div className="input-field">
                                <input
                                    id="symbol"
                                    type="text"
                                    value={stock.symbol}
                                    onChange={this.handleInputChange}
                                    placeholder="Symbol"
                                    className="symbol"
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
                                    value={stock.price}
                                    onChange={this.handleInputChange}
                                    placeholder="Price"
                                    className="price"
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
                                    value={stock.quantity}
                                    onChange={this.handleInputChange}
                                    placeholder="Quantity"
                                    className="quantity"
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
                                    value={stock.date}
                                    onChange={this.handleInputChange}
                                    placeholder="DD/MM/YYYY"
                                    className="date"
                                    pattern="\d{1,2}/\d{1,2}/\d{4}"
                                    required='required'
                                />
                            </div>
                        </li>
                    </ul>
                    <div className="cta-buttons">
                        <button className="secondary" onClick={this.cancelForm}>Cancel</button>
                        <button className="primary" type="submit">{this.props.mode === 'edit' ? 'Save' : 'Add'}</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default StockForm;