
var a = $$$.amortize(100000)
	.interest(function(d,i){
		var interest = 0.04 - ((i / 12 /  15) * 0.01);
		// debugger;
		return interest; // interest rate ought to rise every five years
		// return 0.04;
	})
	// .interest('5%')
	.down('10%')
	.period('25y')