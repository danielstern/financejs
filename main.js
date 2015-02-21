// 11 Sunnvale Crescent 1812
var mortgage = $$$.amortize(136900)
	.interest(function(d,i){
		var interest = 0.04 + ((i / 12 /  8) * 0.01);
		return interest; // interest rate ought to go up
	})
	// .interest('5%')
	.down('20%')
	.period('25y')
	.income('rent',function(d,i){
		return 1100 + i * 3;
	})
	.expense('maintenance',400.75)
	.expense('management',function(d,i){
		return d.income('rent').value(d,i) * 0.8;
	})
	.income('parking',50)
	.taxrate(0.37)