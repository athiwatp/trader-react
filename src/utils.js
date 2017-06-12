let CURRENCY = '₹';

let Utils = {
    currency: (value = 0) => {
        return (CURRENCY + value.toLocaleString());
    }
};

export default Utils;
