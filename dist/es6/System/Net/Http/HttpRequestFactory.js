/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
import { ArgumentNullException } from "../../Exceptions/ArgumentNullException";
import { DisposableBase } from "../../Disposable/DisposableBase";
import { GET, PUT, POST, DELETE } from "./HttpMethod";
import { Uri } from "../../Uri/Uri";
import __extendsImport from "../../../extends";
const __extends = __extendsImport;
export default class HttpRequestFactory extends DisposableBase {
    constructor(_http, uriDefaults) {
        super();
        this._http = _http;
        this._disposableObjectName = 'HttpRequestFactory';
        if (!_http)
            throw new ArgumentNullException('_http');
        this._uriDefaults = Uri.from(uriDefaults);
    }
    _onDispose() {
        this._http = null;
        this._uriDefaults = null;
    }
    uri(uri) {
        const _ = this;
        _.throwIfDisposed();
        var d = _._uriDefaults, u = Uri.from(uri, d);
        return d && u.equals(d)
            ? _
            : new HttpRequestFactory(_._http, u);
    }
    params(params) {
        const _ = this;
        _.throwIfDisposed();
        return _.uri(_._uriDefaults.updateQuery(params));
    }
    request(method, data) {
        const _ = this;
        _.throwIfDisposed();
        return _._http.request({
            method: method,
            uri: _._uriDefaults,
            data: data
        });
    }
    get() {
        return this.request(GET);
    }
    put() {
        return this.request(PUT);
    }
    post(data) {
        return this.request(POST, data);
    }
    'delete'() {
        return this.request(DELETE);
    }
}
//# sourceMappingURL=HttpRequestFactory.js.map