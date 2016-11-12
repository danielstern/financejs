

import { cantrip, namedCantrip } from './../cantrip';
import defaults from './defaults';
import percentify from './percentify';
import percentOfDownify from './percentOfDownify';
import periodify from './periodify';
import calculateBalances from './calculateBalances';



class Amortization {
    constructor () {
        this.data = defaults();
    }

    expense (name, cost) {
        return namedCantrip(this, this.data)(`expenses`)(name, cost);
    }

    income (name, value) {
        return namedCantrip(this, this.data)(`incomes`)(name, value);
    }

    period (p) {
        return cantrip(this, this.data)(`months`, periodify)(p);
    }

    interest (i) {
        return cantrip(this, this.data)(`interestRate`, percentify)(i);
    }

    depreciation (d) {
        return cantrip(this, this.data)(`depreciation`, percentify)(d);
    }

    tax (t) {
        return cantrip(this, this.data)(`taxRate`, percentify)(t);
    }

    principal (p) {
        return cantrip(this, this.data)(`principal`)(p);
    }

    down (d) {
        return cantrip(this, this.data)(`down`, percentOfDownify)(d, this.data);
    }

    balances () {
        return this.data.balances;
    }

    calculate () {

        calculateBalances(this.data);
        console.log("calculated.",this.data);

        return this;
    }
}

export default Amortization;
