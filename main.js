
var a = $$$.amortize(100000)
	.interest(function(d,i){
		var interest = 0.04 + ((i / 12 /  8) * 0.01);
		return interest; // interest rate ought to go up
	})
	// .interest('5%')
	.down('10%')
	.period('25y')
	.expense('maintenance',400)
	.expense('management',function(d,i){
		return 300;
	})
	.income('rent',function(d,i){
		return 1100;
	})
	.income('parking',50)