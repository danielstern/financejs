const periodsPerYear = 12;
import functor from './../functor';
import sum from 'lodash/sum';

export const calculateAnnuity = ({periods,interestRatePerPeriod,presentValue})=>{
    if (periods === undefined) throw new Error("Failed to specify argument option: periods");
    if (!interestRatePerPeriod) throw new Error("Failed to specify argument option: interestRatePerPeriod");
    if (presentValue === undefined) throw new Error("Failed to specify argument option: presentValue");

    if (interestRatePerPeriod === 0) {
        return presentValue / periods;
    }
    // return presentValue * (interestRatePerPeriod + interestRatePerPeriod / (Math.pow(1 + interestRatePerPeriod, periods) - 1));
    return (interestRatePerPeriod * presentValue) / (1 - Math.pow( 1 + interestRatePerPeriod , -periods));
}

export default (data, k=0, returnAll = false)=>{

    // should this calculate every previous balance since the first cycle to correctly account for expenses and such?

    const {expenses, incomes, interestRate,principal,down,months,depreciation,taxRate} = data;
    const balances = [];
    // console.log("attempting calculation...",data);

    for (let i = 0; i <= k; i++) {
        //
        // debugger;

        const interestRatePerPeriod = functor(interestRate)(this, i) / periodsPerYear;
        // console.log(k,balances);
        let presentValue = i === 0 ? principal - down : balances[i-1].presentValue;
        let equity = down;
        const numPeriods = months;

        // let presentValue = k === 0 ? principalOwing : balances[k - 1].principalToBePaid;

        // Code is not taking into account the present value, just the value at the start...
        const annuity = calculateAnnuity({interestRatePerPeriod,periods: numPeriods - i,presentValue});
        const lastPeriodPrincipalRemaiing = presentValue;

        presentValue *= 1 + interestRatePerPeriod;
        presentValue -= annuity;

        const change = lastPeriodPrincipalRemaiing - presentValue;
        equity += change;

        const expensesCalculated = expenses.map(a => ({...a, value: functor(a.value)(data, i)}));
        const incomesCalculated = expenses.map(a => ({...a, value: functor(a.value)(data, i)}));

        const expensesTotal = sum(expensesCalculated.map(z => z.value));
        const incomesTotal = sum(incomesCalculated.map(x => x.value));

        const interestPaid = annuity - change;
        const expensesDeductible = expensesTotal * taxRate;
        const interestDeductible = interestPaid * taxRate;
        const depreciationTotal = depreciation * principal / periodsPerYear;
        const interestRateFinal = interestRatePerPeriod * periodsPerYear;
        const depreciationDeductible = depreciationTotal * taxRate;
        const netBeforeDeductions = incomesTotal - expensesTotal - interestPaid;
        const netAfterDeductions = netBeforeDeductions + expensesDeductible + depreciationDeductible + interestDeductible;
        const capRate = netAfterDeductions * periodsPerYear / principal;
        const roi = netAfterDeductions * periodsPerYear / equity;

        const balance = {
            presentValue,
            equity,
            interestPaid,
            interestRate:interestRateFinal,
            interestDeductible,
            equityPaid: change,
            period: k,
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