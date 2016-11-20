import getBalance, { calculateAnnuity } from './getBalance';
import { expect } from 'chai';

const defaults = ()=> ({
    'principal': 10,
    'interestRate': 0.1,
    'compoundingFrequency': 2,
    'down': 1,
    'months': 300,
    'taxRate': 0.25,
    'depreciation': 0.01,
    'expenses': [],
    'incomes': [],
    'balances': []
});

describe("calculate annuity (payment)",()=>{
    it("should do the right thing on zero interest",()=>{
        const annuity = calculateAnnuity({
            interestRatePerPeriod:0,
            periods:10,
            presentValue:10
        },1);
        expect(annuity).to.equal(1);
    })

    it("should do interest good",()=>{
        const annuity = calculateAnnuity({
            interestRatePerPeriod:0.1 / 12,
            periods:120,
            presentValue:10000
        },1);
        // expect(annuity).to.be.greaterThan(1);
        expect(annuity).to.be.approximately(132.15, 0.001);
    })

    it("should do interest good 2",()=>{
        const annuity = calculateAnnuity({
            interestRatePerPeriod:0.1 / 12,
            periods:36,
            presentValue:100000
        },1);
        // expect(annuity).to.be.greaterThan(1);
        expect(annuity).to.be.approximately(3226.72, 0.01);
    })


})

describe("The getting of a balance",()=>{
    it("Should work",()=>{
        const balance = getBalance(defaults());
        expect(balance.equity).not.to.be.NaN;
        expect(balance.equity).not.to.equal(-Infinity);
    });

    xit("should return the state after one period on a zero value",()=>{
        const balance = getBalance(defaults(),0);
        // console.log("Balance?",balance);
    });
})

describe("a series of balances",()=>{
    it.only("Should have equal cap rate and ROI at the last period",()=>{
        const balance = getBalance(defaults(),10);
        expect(balance.roi).to.be.approximately(balance.capRate, 0.0001);
    })
})