const alfy = require('alfy');
const math = require('mathjs')

if (alfy.input) {
    var result;
    var resultItems = [];
    var items = [];

    // Create a expressions that can be used to evaluate stuff
    const devDays = math.compile('((a/.525)/8)*4');
    const devHrs = math.compile('(a/.525)*4');
    const unRound = math.compile('b/4');

    try {
        // attempt to calculate using the input
        result = math.eval(alfy.input);
    }
    catch(err) {
        alfy.output([{
            title: 'Unable to calculate result...'
        }]);
    }

    if (result && !isNaN(result)) {
        var devDaysCalc = unRound.eval({b: math.round(devDays.eval({a: result}))});
        resultItems.push({ 
            item: 'days', 
            value: devDaysCalc
        });

        var devHrsCalc = unRound.eval({b: math.round(devHrs.eval({a: result}))});
        resultItems.push({
            item: 'hours',
            value: devHrsCalc
        });

        items = resultItems.map(x => ({
            title: 'Total estimate ' + x.item + ' based on input: ' + x.value,
            subtitle: 'Action this item to copy the value to your clipboard.',
            arg: Number(x.value)
        }));

        alfy.output(items);
    }
}