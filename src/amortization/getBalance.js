const monthsPerYear = 12;
import functor from './../functor';
import sum from 'lodash/sum';

export default (data, k)=>{

    const {balances,expenses,incomes,interestRate,principal,down,months,depreciation,taxRate} = data;
    let balance = balances[k] || {};
    const i = functor(interestRate)(this, k) / monthsPerYear;
    let P = principal - down;
    let equity = down;
    const n = months;
    const annuity = P * (i + i / (Math.pow(1 + i, n - k) - 1));
    const prev = P;

    P *= 1 + i;
    P -= annuity;

    const change = prev - P;
    equity += change;

    const expensesCalculated = expenses.map(a => ({...a, cost: functor(a.cost)(data, k)}));
    const incomesCalculated = expenses.map(a => ({...a, value: functor(a.value)(data, k)}));

    const expensesTotal = sum(expensesCalculated.map(z => z.cost));
    const incomesTotal = sum(incomesCalculated.map(x => x.value));

    const interestPaid = annuity - change;
    const expensesDeductible = expensesTotal * taxRate;
    const interestDeductible = interestPaid * taxRate;
    const depreciationTotal = depreciation * principal / monthsPerYear;
    const interestRateFinal = i * monthsPerYear;
    const depreciationDeductible = depreciationTotal * taxRate;
    const netBeforeDeductions = incomesTotal - expensesTotal - interestPaid;
    const netAfterDeductions = netBeforeDeductions + expensesDeductible + depreciationDeductible + interestDeductible;
    const capRate = netAfterDeductions * monthsPerYear / (principal);
    const roi = netAfterDeductions * monthsPerYear / equity;

    balance = {
        P,
        equity,
        interestPaid,
        interestRate:interestRateFinal,
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
        depreciation: depreciation,
        capRate,
        roi,
        ...balance
    };

    return balance;
}