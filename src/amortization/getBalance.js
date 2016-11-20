const periodsPerYear = 12;
import functor from './../functor';
import sum from 'lodash/sum';

export const calculateAnnuity = ({periods,interestRatePerPeriod,presentValue})=>{

    if (periods === undefined) throw new Error("Failed to specify argument option: periods");
    if (interestRatePerPeriod === undefined) throw new Error("Failed to specify argument option: interestRatePerPeriod");
    if (presentValue === undefined) throw new Error("Failed to specify argument option: presentValue");

    if (interestRatePerPeriod === 0) {
        return presentValue / periods;
    }

    const annuity = (interestRatePerPeriod * presentValue) / (1 - Math.pow( 1 + interestRatePerPeriod , -periods));

    return annuity;
}


export default (data, k=0, returnAll = false)=>{

    const {expenses, incomes, interestRate,principal,down,months,depreciation,taxRate} = data;
    const balances = [];

    for (let i = 0; i <= k; i++) {

        const interestRatePerPeriod = functor(interestRate)(this, i) / periodsPerYear;
        const prevValue = i === 0 ? principal - down : balances[i-1].presentValue;
        const numPeriods = months;

        const annuity = calculateAnnuity({interestRatePerPeriod,periods: k - i,presentValue:prevValue});
        const interestThisPeriod = prevValue * interestRatePerPeriod;
        const presentValue = prevValue + interestThisPeriod - annuity;
        const change = interestThisPeriod - annuity;

        let equity = i === 0 ? down : balances[i-1].equity;
        equity += annuity - interestThisPeriod;
        // console.log("Equity?",equity,annuity);

        const expensesCalculated = expenses.map(a => ({...a, value: functor(a.value)(data, i)}));
        const incomesCalculated = incomes.map(a => ({...a, value: functor(a.value)(data, i)}));

        const expensesTotal = sum(expensesCalculated.map(z => z.value));
        const incomesTotal = sum(incomesCalculated.map(x => x.value));

        const interestPaid = interestThisPeriod;
        const expensesDeductible = expensesTotal * taxRate;
        const interestDeductible = interestPaid * taxRate;
        const depreciationTotal = depreciation * principal / periodsPerYear;
        const interestRateFinal = interestRatePerPeriod * periodsPerYear;
        const depreciationDeductible = depreciationTotal * taxRate;
        const netBeforeDeductions = incomesTotal - expensesTotal - interestPaid;
        const netAfterDeductions = netBeforeDeductions + expensesDeductible + depreciationDeductible + interestDeductible;
        const capRate = netAfterDeductions * periodsPerYear / principal;
        const roi = (netAfterDeductions * periodsPerYear) / equity;

        const balance = {
            presentValue,
            equity,
            interestPaid,
            interestRate:interestRateFinal,
            interestDeductible,
            equityPaid: -change,
            period: i,
            expensesCalculated,
            expensesDeductible,
            income: incomesTotal,
            expenses: expensesTotal,
            payment: annuity,
            depreciationDeductible,
            incomesCalculated,
            netBeforeDeductions,
            netAfterDeductions,
            depreciation: depreciation,
            capRate,
            roi
        };

        balances.push(balance);
    }

    if (returnAll) {
        return balances;
    } else {
        return balances[k];
    }

}