(function(){


var $$$ = {};

	$$$.amortize = function(amt) {
		var b = new Amortization();
		b.principal(amt);
		b.calculate();
		return b;
	}

	function Amortization(){

		var a = this;
		var mortgage = this;
		var compoundingFrequency = 2;

		var principal = 100000;
		var interestRate = 0.1;
		var down = 20000;
		var months = 240;

		var taxrate = 0.35;
		var depreciation = 0.04;

		var expenses = [];
		var incomes = [];
		var balances = [];

		this.calculate = function(){
			balances = [];

			var n = months;
			var P = principal - down;
			var equity = down;

			
			for (var j = n - 1; j >= 0; j--) {
				balances[j] = {};
			}
			
			balances = balances.map(function(d,k){

				var i;

				if (isFunction(interestRate)){
					i = interestRate(a,k) / 12;
				} else {
					i = interestRate / 12;
				}

				var annuity =  P * (i + i / (Math.pow(1+i,n-k) -1));
				var prev = P;

				P*=1+i;
				P-=annuity;

				var change = prev - P;
				equity +=change;

				var expenses_calculated =  expenses.map(function(a){
					if (isFunction(a.cost)){
						return {
							name:a.name,
							cost:a.cost(mortgage,k)
						}
					} else {
						return a;
					}				
				});
				var expenses_total = expenses_calculated[0] ? expenses_calculated
					.map(function(z){return z.cost}).reduce(function(a,b){
					return a + b;
				}) : 0;

				var incomes_calculated = incomes.map(function(a){
					if (isFunction(a.value)){
						return {
							name:a.name,
							value:a.value(mortgage,k)
						}
					} else {
						return a;
					}						
				})
				var incomes_total = incomes_calculated[0] ? incomes_calculated.map(function(x){return x.value}).reduce(function(a,b){
					return a + b;
				}) : 0;

				var expenses_deductible = expenses_total * taxrate;
				var depreciation_total = depreciation * principal  / 12;
				var depreciation_deductible = depreciation_total * taxrate;
				var net_after_deductions = incomes_total+change-expenses_total-annuity+expenses_deductible+depreciation_deductible;

				return {
					P:P,
					equity:equity,
					interest_paid:annuity-change,
					interest_rate:i*12,
					equity_paid:change,
					period:k,
					expenses_calculated:expenses_calculated,
					income:incomes_total,
					expenses:expenses_total,
					payment:annuity,
					incomes_calculated:incomes_calculated,
					net_before_deductions:incomes_total+change-expenses_total-annuity,
					deductions_from_expenses:expenses_deductible,
					depreciation:depreciation_total,
					deductions_from_depreciation:depreciation_deductible,
					net_after_deductions:net_after_deductions,
					cap_rate:net_after_deductions/(principal-down),
					roi:net_after_deductions/(equity),
				};
			})
		}

		this.expense = function(name,cost){
			if (name === undefined) {
				return expenses;
			}
			var index = expenses.map(function(e){return e.name}).indexOf(name);
			if (index === -1) {
				if (cost === undefined) {
					return expenses[index];
				}
				expenses.push({
					name:name,
					cost:cost
				})
			} else {
				expenses[index].cost = cost;
			}

			a.calculate();
			return a;
		}

		this.income = function(name,value){
			if (name === undefined) {
				return incomes;
			}
			var index = incomes.map(function(e){return e.name}).indexOf(name);
			if (index === -1) {
				incomes.push({
					name:name,
					value:value
				})	
			} else {
				if (value === undefined) {
					return incomes[index];
				} 

				incomes[index].value = value;
				
			}

			a.calculate();
			return a;
		}




		this.period = function(p){
			if (p === undefined) {
				return months;
			}
			var _months;
			if (p[p.length -1] === 'y') {
				_months = 12 * (+p.slice(0,p.length-1));
			} else {
				_months = p;
			}

			months = _months;
			a.calculate();
			return a;
		}

		this.interest = function(i){
			if (i === undefined) {
				return interestRate;
			}
			if (i[i.length -1] === '%') {
				interestRate = 0.01 * (+i.slice(0,i.length-1));
			} else {
				interestRate = i;
			}
			
			a.calculate();
			return a;
		}

		this.taxrate = function(t){
			if (t === undefined) {
				return taxrate;
			}
			if (t[t.length -1] === '%') {
				taxrate = 0.01 * (+t.slice(0,t.length-1));
			} else {
				taxrate = t;
			}
			
			a.calculate();
			return a;
		}


		this.principal = function(p){
			if (p === undefined) {
				return principal;
			}
			principal = p;
			a.calculate();
			return a;
		}


		this.down = function(d){
			if (d === undefined) {
				return down;
			}
			if (d[d.length -1] === '%') {
				var percent = 0.01 * (+d.slice(0,d.length-1));
				down = percent * a.principal();
			} else {
				down = d;
			}

			a.calculate();
			return a;
		}

		this.balances = function(){
			return balances;
		}

	}

	function isFunction(x) {
	  return Object.prototype.toString.call(x) == '[object Function]';
	}

	window.$$$ = $$$;
})()