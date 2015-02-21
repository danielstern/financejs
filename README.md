# financejs
finance.js is a powerful javascript library that specializes in amortization.

using the amortize function, you can gain very powerful insights into a mortgage. 

- call `balances()` to get an array of the balance sheets at every period in the term
- define functions for interest and expenses for powerful customization
- calculate income, expenses and deductions for every period
- awesome syntax

### dependencies
none

## `amortize`
Get an amortization with handy-D3 like syntax and D3 compatible output.

Example:

```javascript
var mortgage = $$$.amortize(136900)
.interest(function(d,i){
	var interest = 0.04 + ((i / 12 /  8) * 0.01);
	return interest;
})
.down('20%')
.period('25y')
.income('rent',function(d,i){
	return 1100 + i * 3;
})
.expense('maintenance',400.75)
.expense('property tax',1200 / 12)
.expense('improvements', 1000 / 12)
.expense('down payment interest', function(d,i){
	return d.down() * 0.068 / 12;
})
.expense('insurance', function(d,i){
	return d.principal() * 0.005 / 12;
})
.depreciation('4%')
.expense('property management',function(d,i){
	return d.income('rent').value(d,i) * 0.8;
})
.income('parking',120)
.taxrate(0.37)

mortgage.balances(); // [Array(240)]

mortgage.balances()[150]
{	
	P: 70359.36, // amount owing
	equity: 66540.63, // amount you own
	interest_paid: 327.663, // interest paid this period 
	interest_rate: 0.055, // interest rate this period (calculated)
	equity_paid: 327.29, // equity paid this period
	cap_rate: 0.00208, // the cap rate this period (return on the lender's principal)
	deductions_from_depreciation: 168.84, // the amount of taxes credits available from depreciation
	deductions_from_expenses: 753.42,
	depreciation: 456.33, // how much the value of the house depreciated
	expenses: 2036.278, // total expenses this month
	expenses_calculated: Array[6], // an array of details on the calculated expenses
	income: 1670, // total inocome this month
	incomes_calculated: Array[2], // // an array of details on the calculated incomes
	net_after_deductions: 228.32, // income this month after deducting expenses and depreciation from taxes
	net_before_deductions: -693.94, // gross income minus expenses
	payment: 654.95, // how much is due this month in the mortgage
	period: 150, // what period (month) it is, relative to the first payment at 0
	roi: 0.00343 // return on your down payment
}
```
      
### Use with D3

    d3
        .select('svg')
        .data($$$.amortize(100000).balances())
        .enter(); //sweet!

