export const defaults = ()=>({
  principal:100000,
  interestRate:0.1,
  compoundingFrequency : 2,
  interestRate : 0.1,
  down : 20000,
  months : 240,
  taxrate : 0.35,
  depreciation : 0.04,
  expenses : [],
  incomes : [],
  balances : []
});

class Amortization {
  constructor(){
    _.assign(this, defaults());
  }
  calculate(){
    const n = months;

    while(balances.length > n && n > 0) {
      balances.pop();
    }

    let P = principal - down;
    let equity = down;

    for (let j = 0; j < n; j++) {
      balances[j] = getBalance(a,j);
    }

    const getBalance = (d,k)=>{

      let i;
      let balance = balances[k] || {};

      if (isFunction(this.interestRate)){
        i = this.interestRate(a,k) / 12;
      } else {
        i = this.interestRate / 12;
      }

      let annuity =  P * (i + i / (Math.pow(1+i,n-k) -1));
      let prev = P;

      P*=1+i;
      P-=annuity;

      let change = prev - P;
      equity += change;

      //todo.. rename variable
      // todo... more elegant way to support functions and standard vars

      let expenses_calculated =  expenses.map(a=>isFunction(a.cost) ? { name:a.name, cost:a.cost(mortgage,k) } : a);

      let expenses_total = expenses_calculated[0] ? expenses_calculated
        .map(function(z){return z.cost}).reduce(function(a,b){
        return a + b;
      }) : 0;

      let incomes_calculated = incomes.map(a=> isFunction(a.value) ? { name:a.name, value:a.value(mortgage,k) } : a)

      let incomes_total = incomes_calculated[0] ? incomes_calculated.map(function(x){return x.value}).reduce(function(a,b){
        return a + b;
      }) : 0;

      let interest_paid = annuity - change;
      let expenses_deductible = expenses_total * taxrate;
      let interest_deductible = interest_paid * taxrate;
      let depreciation_total = depreciation * principal  / 12;
      let interest_rate = i * 12;
      let depreciation_deductible = depreciation_total * taxrate;
      let net_before_deductions = incomes_total-expenses_total-interest_paid;
      let net_after_deductions = net_before_deductions + expenses_deductible + depreciation_deductible + interest_deductible;
      let cap_rate = net_after_deductions * 12 / (principal);
      let roi = net_after_deductions * 12 / equity;
      let period = k;

      balance = {
        P,
        equity,
        interest_paid,
        interest_rate,
        interest_deductible,
        equity_paid,
        period,
        expenses_calculated,
        income,
        expenses,
        payment,
        incomes_calculated,
        net_before_deductions,
        net_after_deductions,
        depreciation,
        cap_rate,
        roi,
         ... balance
       }

      return balance;

    }
  }
}

const amortize = ()=>{
  console.log("Amortizing.....");
}

export default amortize;
