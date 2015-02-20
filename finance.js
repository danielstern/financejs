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
		var P = principal - down;
		var equity = down;
		var i = interestRate / 12;
		var n = months;
		var annuity =  P * (i + i / (Math.pow(1+i,n) -1));
		for (var j = n - 1; j >= 0; j--) {
			balances[j] = {};
		}
		
		balances = balances.map(function(d,k){
			var prev = P;
			P*=1+i;
			P-=annuity;
			var change = prev - P;
			equity +=change;

			var exp = expenses[0] ? expenses.map(function(a){return a.cost})
				.reduce(function(a,b){
					return a + b;
				}) : 0;



			return {
				P:P,
				equity:equity,
				interest_paid:annuity-change,
				equity_paid:change,
				period:k,
				expenses:exp
			};
		})
	}

	this.expense = function(name,cost){
		var index = expenses.map(function(e){return e.name}).indexOf(name);
		if (index === -1) {

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
		interestRate = i;
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
			down = 0.01 * (+d.slice(0,d.length-1));
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

var getAmortizationMonthlyPayment = function(startingValue, annualInterest, duration) {

        var count = 1000;
        var targetPrecision = startingValue / 1000;
        var monthlyPaymentGuess = startingValue / duration;
        var adjustmentAmount = monthlyPaymentGuess / 10;
        var monthlyInterest = 1 + annualInterest / 12;
        var totalpaid = 0;

        while (count > 0) {

            totalpaid = 0;
            var currentBalance = startingValue;

            for (i = 0; i < duration; i++) {
                totalpaid += monthlyPaymentGuess;
                currentBalance *= monthlyInterest;
            }

            if (currentBalance - totalpaid < targetPrecision) {
                break;
            }

            if (currentBalance - totalpaid > 0) {
                monthlyPaymentGuess += adjustmentAmount;
            } else {
                monthlyPaymentGuess -= adjustmentAmount;
            }

            adjustmentAmount *= 0.99;

            count--;

        }


        var r = {};
        r.startingValue = startingValue;

        r.paymentMonthly = monthlyPaymentGuess;
        r.totalpaid = totalpaid;

        r.interestPaid = totalpaid - startingValue;
        r.interestRatio = r.interestPaid / startingValue;

        return r;


    }

var a = $$$.amortize(100000)