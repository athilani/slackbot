const { parse } = require('./parser.js')

describe('Parse message', ()=> {
    it('Should parse correct formated message', () => {
        const botUser='Test'
        const expected = {
            system: 'test',
            why: 'reason',
            who: 'abc'
        }
         const message = '@TestSystem: test \nWhy: reason\n Who:abc';
        expect(parse(message, botUser)).toEqual(expected);

    });
})
