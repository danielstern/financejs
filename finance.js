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
	this.interestRate = 0.1;
	var down = 20000;
	var months = 240;

	this.expenses = [];
	this.incomes = [];
	this.balances = [];

	this.calculate = function(){
		a.balances = [];
		var P = principal - down;
		var equity = down;
		var i = a.interestRate / 12;
		var n = months;
		var annuity =  P * (i + i / (Math.pow(1+i,n) -1));
		for (var j = n - 1; j >= 0; j--) {
			a.balances[j] = {};
		}
		
		a.balances = a.balances.map(function(d,k){
			var prev = P;
			P*=1+i;
			P-=annuity;
			var change = prev - P;
			equity +=change;



			return {
				P:P,
				equity:equity,
				interest_paid:annuity-change,
				equity_paid:change,
				period:k
			};
		})
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
			return a.interestRate;
		}
		a.interestRate = i;
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