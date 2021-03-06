/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */
const NAME = 'Exception';
export class Exception {
    constructor(message, innerException, beforeSealing) {
        const _ = this;
        this.name = _.getName();
        this.message = message;
        this.data = {};
        if (innerException)
            _.data['innerException'] = innerException;
        if (beforeSealing)
            beforeSealing(_);
        try {
            var stack = (new Error()).stack;
            stack = stack
                && stack
                    .replace(/^Error\n/, '')
                    .replace(/(.|\n)+\s+at new.+/, '')
                || '';
            this.stack = _.toStringWithoutBrackets() + stack;
        }
        catch (ex) { }
        Object.freeze(_);
    }
    getName() { return NAME; }
    toString() {
        return `[${this.toStringWithoutBrackets()}]`;
    }
    toStringWithoutBrackets() {
        const _ = this;
        var m = _.message;
        return _.name + (m ? (': ' + m) : '');
    }
    dispose() {
        var data = this.data;
        for (let k in data) {
            if (data.hasOwnProperty(k))
                delete data[k];
        }
    }
}
export default Exception;
//# sourceMappingURL=Exception.js.map