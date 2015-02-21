angular.module('Mortgage.Demo',[])
.run(function($rootScope){
	// 11 Sunnvale Crescent 1812
	// var mortgage = $$$.amortize(136900)
	// 	.interest(function(d,i){
	// 		// var interest = 0.04 + ((i / 12 /  8) * 0.01);
	// 		var interest = 0.04;
	// 		return interest; // interest rate ought to go up
	// 	})
	// 	// .interest('5%')
	// 	.down('20%')
	// 	.period('25y')
	// 	.income('rent',function(d,i){
	// 		return 1300 + i * 3;
	// 	})
	// 	.expense('maintenance',400.75)
	// 	.expense('property tax',1200 / 12)
	// 	.expense('improvements', 900 / 12)
	// 	.expense('down payment interest', function(d,i){
	// 		return d.down() * 0.068 / 12;
	// 	})
	// 	.expense('insurance', function(d,i){
	// 		return d.principal() * 0.005 / 12;
	// 	})
	// 	.expense('property management',function(d,i){
	// 		return d.income('rent').value(d,i) * 0.8;
	// 	})
	// 	.income('parking',120)
	// 	.taxrate(0.37);


	// $rootScope.mortgage = mortgage;
	$rootScope.details = {
		price:136900,
		down:13690,
		property_tax:1200,
		taxrate:35,
		interest_rate:4,
		interest_rate_increase:0.5,
		name:'1812-1152 Sunnyvale Crescent',
		depreciable_percentage:2,
		amortization:25,
		incomes:[{
			name:'Rent',
			value:1100,
			annual_increase:3,
			vac_rate:15
		}],
		expenses:[{
			name:'Maintenance',
			value:400.75,
			annual_increase:3,
			calculated:'Flat Rate'
		},{
			name:'Property Mangement',
			value:8,
			annual_increase:3,
			calculated:'Percent of Income'
		},{
			name:'Insurance',
			value:0.5,
			annual_increase:3,
			calculated:'Percent of Value'
		}]

	}
	

	function calculate() {
		var plans = $rootScope.details;
		var mortgage = $$$.amortize(plans.price)
			.down(plans.down)
			.interest(function(d,i){
				return +plans.interest_rate / 100 + i / 12 * +plans.interest_rate_increase / 100;
			})
			.taxrate(+plans.taxrate / 100)
			.depreciation(+plans.depreciable_percentage / 100)
			.period(+plans.amortization * 12)
			.expense('Property Tax', +plans.property_tax / 12);

		plans.incomes.forEach(function(income){
			mortgage.income(income.name,function(d,i){
				// return 100;
				// debugger;
				return (1- +income.vac_rate / 100) * (+income.value + i / 12 * +income.annual_increase * +income.value); 
			})
		})

		plans.expenses.forEach(function(expense){
			mortgage.expense(expense.name,function(d,i){
				// debugger;
				// return 100;
				if (expense.calculated === 'Flat Rate') {
					return +expense.value + +expense.value * i * +expense.annual_increase / 12 / 100;
				} else if (expense.calculated === 'Percent of Income') {
					
					if (mortgage.income()[0]){
						// debugger;
						
						return mortgage.income().map(function(a){return a.value(d,i)}).reduce(function(b,c){return b+c},0) * +expense.value / 100;
					}
				} else if (expense.calculated === 'Percent of Value') {
					// return 100;
					return mortgage.principal() * +expense.value / 100 / 12 + +expense.value / 100 / 12 * i *  +expense.annual_increase / 12 / 100;
				}
			})
		})

		$rootScope.mortgage = mortgage;
		$rootScope.balances = mortgage.balances();

		console.log(mortgage.balances());
	
		$rootScope.simpleBalances = mortgage.balances()
			.filter(function(a,b){return !b||b%60===59});

	}

	$rootScope.calculate = calculate;

	


})