const periodsPerYear = 12;
import functor from './../functor';
import sum from 'lodash/sum';

export const calculateAnnuity = ({periods,interestRatePerPeriod,presentValue})=>{

    if (interestRatePerPeriod === 0) {
        return presentValue / periods;
    }
    // return presentValue * (interestRatePerPeriod + interestRatePerPeriod / (Math.pow(1 + interestRatePerPeriod, periods) - 1));
    return (interestRatePerPeriod * presentValue) / (1 - Math.pow( 1 + interestRatePerPeriod , -periods));
}

export default (data, k=0)=>{

    // should this calculate every previous balance since the first cycle to correctly account for expenses and such?

    const {balances, expenses, incomes, interestRate,principal,down,months,depreciation,taxRate} = data;
    const interestRatePerPeriod = functor(interestRate)(this, k) / periodsPerYear;
    let P = principal - down;
    let equity = down;
    const numPeriods = months;

    let presentValue = k === 0 ? P : balances[k - 1].principalToBePaid;

    // Code is not taking into account the present value, just the value at the start...
    const annuity = calculateAnnuity({interestRatePerPeriod,periods: numPeriods - k,presentValue});
    const lastPeriodPrincipalRemaiing = P;

    P *= 1 + interestRatePerPeriod;
    P -= annuity;

    const change = lastPeriodPrincipalRemaiing - P;
    equity += change;

    const expensesCalculated = expenses.map(a => ({...a, cost: functor(a.cost)(data, k)}));
    const incomesCalculated = expenses.map(a => ({...a, value: functor(a.value)(data, k)}));

    const expensesTotal = sum(expensesCalculated.map(z => z.cost));
    const incomesTotal = sum(incomesCalculated.map(x => x.value));

    const interestPaid = annuity - change;
    const expensesDeductible = expensesTotal * taxRate;
    const interestDeductible = interestPaid * taxRate;
    const depreciationTotal = depreciation * principal / periodsPerYear;
    const interestRateFinal = interestRatePerPeriod * periodsPerYear;
    const depreciationDeductible = depreciationTotal * taxRate;
    const netBeforeDeductions = incomesTotal - expensesTotal - interestPaid;
    const netAfterDeductions = netBeforeDeductions + expensesDeductible + depreciationDeductible + interestDeductible;
    const capRate = netAfterDeductions * periodsPerYear / (principal);
    const roi = netAfterDeductions * periodsPerYear / equity;

    const balance = {
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
        roi
    };

    return balance;
}