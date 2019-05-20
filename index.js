const alfy = require('alfy');
const math = require('mathjs')

if (alfy.input) {
    var result;
    var resultItems = [];
    var items = [];

    // Create a expressions that can be used to evaluate stuff
    const devDays = math.compile('(a/.52)/8');
    const devHrs = math.compile('(a/.52)');

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
        var devDaysCalc = math.round(devDays.eval({a: result}), 2);
        resultItems.push({ 
            item: 'days', 
            value: devDaysCalc
        });

        var devHrsCalc = math.round(devHrs.eval({a: result}), 2);
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