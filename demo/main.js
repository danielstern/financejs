angular.module('Mortgage.Demo',[])
.run(function($rootScope,$location){
	if ($location.search().o) {
		$rootScope.output = true;
	}

	if (!$rootScope.details) {
		$rootScope.details = {
			price:136900,
			askingPrice:142000,
			closing:3,
			down:20,
			propertyTax:1200,
			taxRate:35,
			taxIncrease:3,
			interestRate:4,
			interestRateIncrease:0.5,
			name:'1812-1152 Sunnyvale Crescent',
			depreciablePercentage:2,
			imgsrc:'http://40.media.tumblr.com/tumblr_maz6c1LrML1r010fmo1_500.jpg',
			amortization:25,
			incomes:[{
				name:'Rent',
				value:1100,
				annualIncrease:3,
				vac_rate:15
			}],
			expenses:[{
				name:'Maintenance',
				value:400.75,
				annualIncrease:3,
				calculated:'Flat Rate'
			},{
				name:'Property Mangement',
				value:8,
				annualIncrease:0,
				calculated:'Percent of Income'
			},{
				name:'Insurance',
				value:0.5,
				annualIncrease:3,
				calculated:'Percent of Value'
			}]

		}
	}




	function calculate() {
		var plans = $rootScope.details;
		localStorage['plans'] = JSON.stringify(plans);
		$location.search('d',JSON.stringify(plans));
		var mortgage = $$$.amortize()
            .principal(+plans.price + +plans.closing*plans.price/100)
			.down(plans.down+'%')
			.interest(function(d,i){
				return (+plans.interestRate / 100) + (i / 12  * +plans.interestRateIncrease / 100);
			})
			.tax(+plans.taxRate / 100)
			.depreciation(+plans.depreciablePercentage / 100)
			.period(+plans.amortization * 12)
			.expense('Property Tax', function(d,i){
				return (+plans.propertyTax / 12) + (i / 12  * +plans.taxIncrease / 100 * plans.propertyTax / 12);
            });

		plans.incomes.forEach(function(income){
			mortgage.income(income.name,function(d,i){
				return (1 - +income.vac_rate / 100) * (+income.value + i / 12 * +income.annualIncrease / 100 * +income.value);
			});
		});

		plans.expenses.forEach(function(expense){
			mortgage.expense(expense.name,function(d,i){

				if (expense.calculated === 'Flat Rate') {
					return +expense.value + +expense.value * i * +expense.annualIncrease / 12 / 100;
				} else if (expense.calculated === 'Percent of Income') {

					if (mortgage.income()[0]){
						return mortgage.income().map(function(a){return a.value(d,i)}).reduce(function(b,c){return b+c},0) * +expense.value / 100;
					}
				} else if (expense.calculated === 'Percent of Value') {
					return mortgage.principal() * (+expense.value / 100 / 12 + +expense.value / 100 / 12 * i *  +expense.annualIncrease / 12 / 100);
				}
			});
		});

		$rootScope.mortgage = mortgage;
		$rootScope.balances = mortgage.balances();

		$rootScope.simpleBalances = mortgage.balances()
			.filter(function(a,b){return !b || b%60 === 59});

	}
	$rootScope.calculate = calculate;
	calculate();

	$rootScope.export = function(){
	    window.open(window.location+'&o=true', '_blank');
	};
});
