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
      /*
        {P: 70359.36398033104, 
        equity: 66540.63601966896, 
        interest_paid: 327.6621230204943, 
        interest_rate: 0.05562500000000001, 
        equity_paid: 327.29,
        cap_rate: 0.0020847868910960476,
        deductions_from_depreciation: 168.84333333333333,
        deductions_from_expenses: 753.4229833333333,
        depreciation: 456.3333333333333,
        equity: 66540.63601966896,
        equity_paid: 327.2962667856191,
        expenses: 2036.2783333333332,
        expenses_calculated: Array[6],
        income: 1670,
        incomes_calculated: Array[2],
        interest_paid: 327.6621230204943,
        interest_rate: 0.05562500000000001,
        net_after_deductions: 228.32586031283913,
        net_before_deductions: -693.9404563538275,
        payment: 654.9583898061134,
        period: 150,
        roi: 0.0034313747804476584
      
### Use with D3

    d3
        .select('svg')
        .data($$$.amortize(100000).balances())
        .enter(); //sweet!

