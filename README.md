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
	.expense('property management',function(d,i){
		return d.income('rent').value(d,i) * 0.8;
	})
	.income('parking',120)
	.taxrate(0.37)
      
    mortgage.balances(); // [Array(240)]
    
    mortgage.balances()[150]
    {	
        P: 70359.36, 
        equity: 66540.63, 
        interest_paid: 327.663, 
        interest_rate: 0.055, 
        equity_paid: 327.29,
        cap_rate: 0.00208,
        deductions_from_depreciation: 168.84,
        deductions_from_expenses: 753.42,
        depreciation: 456.33,
        equity: 66540.63,
        equity_paid: 327.29,
        expenses: 2036.278,
        expenses_calculated: Array[6],
        income: 1670,
        incomes_calculated: Array[2],
        interest_paid: 327.66,
        interest_rate: 0.055,
        net_after_deductions: 228.32,
        net_before_deductions: -693.94,
        payment: 654.95,
        period: 150,
        roi: 0.00343
    }
      
### Use with D3

    d3
        .select('svg')
        .data($$$.amortize(100000).balances())
        .enter(); //sweet!

