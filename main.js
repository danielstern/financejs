angular.module('Mortgage.Demo',[])
.run(function($rootScope,$location){
	// debugger;
	if ($location.search().o) {
		$rootScope.output = true;
	}

	// if ($location.search().d) {
	// 	$rootScope.details = JSON.parse($location.search().d);
	// } 

	// if (!$rootScope.details && localStorage['plans']) {
	// 	$rootScope.details = JSON.parse(localStorage['plans']);
	// }

	if (!$rootScope.details) {
		$rootScope.details = {
			price:136900,
			askingPrice:142000,
			closing:3,
			down:20,
			property_tax:1200,
			taxrate:35,
			tax_increase:3,
			interest_rate:4,
			interest_rate_increase:0.5,
			name:'1812-1152 Sunnyvale Crescent',
			depreciable_percentage:2,
			imgsrc:'http://40.media.tumblr.com/tumblr_maz6c1LrML1r010fmo1_500.jpg',
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
				annual_increase:0,
				calculated:'Percent of Income'
			},{
				name:'Insurance',
				value:0.5,
				annual_increase:3,
				calculated:'Percent of Value'
			}]

		}
	}

	
	

	function calculate() {
		var plans = $rootScope.details;
		localStorage['plans'] = JSON.stringify(plans);
		$location.search('d',JSON.stringify(plans));
		var mortgage = $$$.amortize(+plans.price + +plans.closing*plans.price/100)
			.down(plans.down+'%')
			.interest(function(d,i){
				return (+plans.interest_rate / 100) + (i / 12  * +plans.interest_rate_increase / 100);
			})
			.taxrate(+plans.taxrate / 100)
			.depreciation(+plans.depreciable_percentage / 100)
			.period(+plans.amortization * 12)
			.expense('Property Tax', function(d,i){
				return (+plans.property_tax / 12) + (i / 12  * +plans.tax_increase / 100 * plans.property_tax / 12);
			 });

		plans.incomes.forEach(function(income){
			mortgage.income(income.name,function(d,i){
				return (1- +income.vac_rate / 100) * (+income.value + i / 12 * +income.annual_increase / 100 * +income.value); 
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
					return mortgage.principal() * (+expense.value / 100 / 12 + +expense.value / 100 / 12 * i *  +expense.annual_increase / 12 / 100);
				}
			})
		})

		$rootScope.mortgage = mortgage;
		$rootScope.balances = mortgage.balances();

		$rootScope.simpleBalances = mortgage.balances()
			.filter(function(a,b){return !b||b%60===59});



	}

	$rootScope.calculate = calculate;
	calculate();

	$rootScope.export = function(){
		 window.open(window.location+'&o=true', '_blank');
	}

	// barchart1($rootScope.mortgage.balances());

	


})

