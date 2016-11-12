import sum from 'lodash/sum';

import { cantrip, namedCantrip } from './../cantrip';
import functor from './../functor';
import defaults from './defaults';
import percentify from './percentify';

const monthsPerYear = 12;

class Amortization {
    constructor () {
        this.data = defaults();
    }
    // should this be a method?
    getBalance (k) {
        const data = this.data;
        let balance = data.balances[k] || {};
        const i = functor(data.interestRate)(this, k) / monthsPerYear;
        let P = data.principal - data.down;
        let equity = data.down;
        const n = data.months;
        const annuity = P * (i + i / (Math.pow(1 + i, n - k) - 1));
        const prev = P;

        P *= 1 + i;
        P -= annuity;

        const change = prev - P;
        equity += change;

        // const expensesCalculated = expenses.map(a => isFunction(a.cost) ? { ...a, cost: a.cost(mortgage, k) } : a);
        //   debugger;
        console.log("Expenses?",data.expenses);
        const expensesCalculated = data.expenses.map(a => ({...a, cost: functor(a.cost)(data, k)}));

        // const incomesCalculated = incomes.map(a => isFunction(a.value) ? { ...a, value: a.value(mortgage, k) } : a);
        const incomesCalculated = data.expenses.map(a => ({...a, value: functor(a.value)(data, k)}));

        const expensesTotal = sum(expensesCalculated.map(z => z.cost));
        const incomesTotal = sum(incomesCalculated.map(x => x.value));

        const interestPaid = annuity - change;
        const expensesDeductible = expensesTotal * data.taxRate;
        const interestDeductible = interestPaid * data.taxRate;
        const depreciationTotal = data.depreciation * data.principal / monthsPerYear;
        const interestRate = i * monthsPerYear;
        const depreciationDeductible = depreciationTotal * data.taxRate;
        const netBeforeDeductions = incomesTotal - expensesTotal - interestPaid;
        const netAfterDeductions = netBeforeDeductions + expensesDeductible + depreciationDeductible + interestDeductible;
        const capRate = netAfterDeductions * monthsPerYear / (data.principal);
        const roi = netAfterDeductions * monthsPerYear / equity;

        balance = {
            P,
            equity,
            interestPaid,
            interestRate,
            interestDeductible,
            equityPaid: change,
            period: k,
            expensesCalculated,
            income: incomesTotal,
            expenses: expensesTotal,
            payment: annuity,
            incomesCalculated,
            netBeforeDeductions,
            netAfterDeductions,
            depreciation: data.depreciation,
            capRate,
            roi,
            ...balance
        };

        return balance;
    }

    expense (name, cost) {
        console.log("Expense?",name,cost,this.data);
        // debugger;
        return namedCantrip(this, this.data)(`expenses`)(name, cost);
    }

    income (name, value) {
        return namedCantrip(this, this.data)(`incomes`)(name, value);
    }

    period (p) {
        return cantrip(this, this.data)(`months`, val => val[val.length - 1] === 'y' ? 12 * (+val.slice(0, val.length - 1)) : val)(p);
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
        return cantrip(this, this.data)(`down`, (d, context) => {
            if (d[d.length - 1] === '%') {
                const percent = 0.01 * (+d.slice(0, d.length - 1));
                return percent * context.principal();
            } else {
                return d;
            }
        })(d, this.data);
    }

    balances () {
        return this.data.balances;
    }

    calculate () {
        const data = this.data;
        const balances = data.balances;
        const n = data.months;

        // what does this do?
        while (balances.length > n && n > 0) {
            balances.pop();
        }

        for (let j = 0; j < n; j++) {
            balances[j] = this.getBalance(j);
        }

        return this;
    }
}

export default Amortization;
