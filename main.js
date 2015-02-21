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
	.expense('property tax',1200 / 12)
	.expense('improvements', 1000 / 12)
	.expense('down payment interest', function(d,i){
		return d.down() * 0.068 / 12;
	})
	.expense('insurance', function(d,i){
		return d.principal() * 0.005 / 12;
	})
	.expense('property management',function(d,i){
		return d.income('rent').value(d,i) * 0.8;
	})
	.income('parking',120)
	.taxrate(0.37)

angular.module('Mortgage.Demo',[])
.run(function($rootScope){

})