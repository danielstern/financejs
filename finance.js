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
		var compoundingFrequency = 2;

		var principal = 100000;
		var interestRate = 0.1;
		var down = 20000;
		var months = 240;

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

				var exp = expenses[0] ? expenses.map(function(a){
					if (isFunction(a.cost)){
						return a.cost(a,k);
					} else {
						return a.cost;
					}				
				})
				.reduce(function(a,b){
					return a + b;
				}) : 0;

				var inc = incomes[0] ? incomes.map(function(a){
					if (isFunction(a.value)){
						return a.value(a,k);
					} else {
						return a.value;
					}				
				})
				.reduce(function(a,b){
					return a + b;
				}) : 0;



				return {
					P:P,
					equity:equity,
					interest_paid:annuity-change,
					interest_rate:i*12,
					equity_paid:change,
					period:k,
					expenses:exp,
					payment:annuity,
					income:inc,
					net_before_taxes:inc-exp-annuity
				};
			})
		}

		this.expense = function(name,cost){
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
			var index = incomes.map(function(e){return e.name}).indexOf(name);
			if (index === -1) {
				if (value === undefined) {
					return incomes[index];
				} else {
					incomes.push({
						name:name,
						value:value
					})	
				}
			} else {
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