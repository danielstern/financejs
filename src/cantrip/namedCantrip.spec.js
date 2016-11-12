import namedCantrip from './namedCantrip';
import { expect } from 'chai';
describe("the named cantrip",()=>{
    it("should, given a collection of data and a key, add an element to the end of an array with that key",()=>{
        const data = {
            candy:[]
        }
        const _namedCantrip = namedCantrip(null, data)(`candy`);
        _namedCantrip("skittles",50);
        expect(data.candy.length).to.equal(1);
        _namedCantrip("twix",100);
        expect(data.candy.length).to.equal(2);
    });

    it ("should, given a name and a null value, delete the entry",()=>{
        const data = {
            candy:[{
                name:"skittles",
                value:50
            },{
                name:"m&ms",
                value:25
            }]
        }
        const _namedCantrip = namedCantrip(null, data)(`candy`);
        _namedCantrip("skittles",null);
        expect(data.candy.length).to.equal(1);
        expect(data.candy[0].name).to.equal(`m&ms`);
    })

    // it ("should, given ")
})