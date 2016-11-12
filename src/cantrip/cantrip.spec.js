import cantrip from './cantrip';
import { expect, assert, should } from 'chai';
describe("the cantrip",()=>{
    it ("should, given an object, return a function which returns the object if a value is passed",()=>{
        const context = {
            name:"Jon Snow",
        };

        const _cantrip = cantrip(context)();
        expect(_cantrip(`Winterfell`)).to.equal(context);

    });

    it ("should, given data, access a property of that object if passed a key but no value",()=>{
        const data = {
            name:`Sansa Stark`,
        }

        const _cantrip = cantrip(null,data)(`name`);
        expect(_cantrip()).to.equal(`Sansa Stark`);
    });

    it ("should, given data, modify a property of that data if a key and value are passed",()=>{
        const data = {
            name:`Ramsay Snow`,
        }

        const _cantrip = cantrip(null,data)(`name`);
        _cantrip(`Ramsay Bolton`);
        expect(data.name).to.equal(`Ramsay Bolton`);
    });

    it ("should throw an error if any modifiers passed are not functions",()=>{
        const modifier = "hello";
        const _cantrip = cantrip()(`value`,[modifier]);
        expect(()=>{_cantrip(5)}).to.throw(`A modifier passed to cantrip value is not a function. Be sure you are passing arguments and not an array.`);

    })

    it ("should, passed some modifiers, apply each modifier to data passed",()=>{
        const modifier1 = a=>a * 2;
        const modifier2 = a=>a + `cool`;

        const data = {};

        const _cantrip = cantrip(null,data)(`value`,modifier1,modifier2);
        _cantrip(5);
        expect(data.value).to.equal(`10cool`);


    })

})