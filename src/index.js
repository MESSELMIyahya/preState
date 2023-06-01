"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _State_instances, _State_v, _State_chble, _State_onChange, _State_oldV, _State_middlewareFuns, _State_RUOS, _State_RMOS, _State_Last, _State_DoComp, _State_RunMiddleware, _State_GetValue, _a;
module.exports = (_a = class State {
        constructor(value) {
            _State_instances.add(this);
            _State_v.set(this, void 0);
            _State_chble.set(this, void 0);
            _State_onChange.set(this, void 0);
            _State_oldV.set(this, void 0);
            _State_middlewareFuns.set(this, void 0);
            _State_RUOS.set(this, void 0);
            _State_RMOS.set(this, void 0);
            __classPrivateFieldSet(this, _State_v, value, "f");
            __classPrivateFieldSet(this, _State_onChange, null, "f");
            __classPrivateFieldSet(this, _State_chble, true, "f");
            __classPrivateFieldGet(this, _State_oldV, "f");
            __classPrivateFieldSet(this, _State_middlewareFuns, [], "f");
            __classPrivateFieldSet(this, _State_RUOS, true, "f");
            __classPrivateFieldSet(this, _State_RMOS, false, "f");
        }
        middleware(...mids) {
            if (mids.length > 0)
                __classPrivateFieldSet(this, _State_middlewareFuns, mids, "f");
            const use = (updateFun, { runUOS, runMOS } = { runMOS: false, runUOS: true }) => this.use(updateFun, { runUOS, runMOS });
            return { use };
        }
        useConst() {
            __classPrivateFieldSet(this, _State_chble, false, "f");
            return __classPrivateFieldGet(this, _State_v, "f");
        }
        use(updateFun = null, { runUOS, runMOS } = { runMOS: false, runUOS: true }) {
            __classPrivateFieldSet(this, _State_onChange, updateFun, "f");
            __classPrivateFieldSet(this, _State_RUOS, runUOS === undefined ? true : runUOS, "f");
            __classPrivateFieldSet(this, _State_RMOS, runMOS === undefined ? false : runMOS, "f");
            if (__classPrivateFieldGet(this, _State_RMOS, "f") && __classPrivateFieldGet(this, _State_RUOS, "f")) {
                __classPrivateFieldGet(this, _State_onChange, "f").call(this, __classPrivateFieldGet(this, _State_instances, "m", _State_RunMiddleware).call(this, __classPrivateFieldGet(this, _State_v, "f")), __classPrivateFieldGet(this, _State_instances, "m", _State_Last));
            }
            else if (__classPrivateFieldGet(this, _State_RMOS, "f")) {
                __classPrivateFieldGet(this, _State_instances, "m", _State_RunMiddleware).call(this, __classPrivateFieldGet(this, _State_v, "f"));
            }
            else if (__classPrivateFieldGet(this, _State_RUOS, "f") && __classPrivateFieldGet(this, _State_onChange, "f")) {
                __classPrivateFieldGet(this, _State_onChange, "f").call(this, __classPrivateFieldGet(this, _State_v, "f"), __classPrivateFieldGet(this, _State_instances, "m", _State_Last));
            }
            ;
            return [() => __classPrivateFieldGet(this, _State_instances, "m", _State_GetValue).call(this),
                (retValue) => {
                    typeof retValue == 'function' ? __classPrivateFieldGet(this, _State_instances, "m", _State_DoComp).call(this, retValue(__classPrivateFieldGet(this, _State_v, "f"), __classPrivateFieldGet(this, _State_oldV, "f"))) : __classPrivateFieldGet(this, _State_instances, "m", _State_DoComp).call(this, __classPrivateFieldGet(this, _State_v, "f"));
                },
                (g) => { __classPrivateFieldSet(this, _State_onChange, g, "f"); }];
        }
    },
    _State_v = new WeakMap(),
    _State_chble = new WeakMap(),
    _State_onChange = new WeakMap(),
    _State_oldV = new WeakMap(),
    _State_middlewareFuns = new WeakMap(),
    _State_RUOS = new WeakMap(),
    _State_RMOS = new WeakMap(),
    _State_instances = new WeakSet(),
    _State_Last = function _State_Last() {
        __classPrivateFieldSet(this, _State_v, __classPrivateFieldGet(this, _State_oldV, "f"), "f");
        return __classPrivateFieldGet(this, _State_v, "f");
    },
    _State_DoComp = function _State_DoComp(newV) {
        const Res = newV;
        if (Res !== __classPrivateFieldGet(this, _State_v, "f") && __classPrivateFieldGet(this, _State_chble, "f")) {
            __classPrivateFieldSet(this, _State_oldV, __classPrivateFieldGet(this, _State_v, "f"), "f");
            __classPrivateFieldSet(this, _State_v, newV, "f");
            const ForChnage = __classPrivateFieldGet(this, _State_instances, "m", _State_RunMiddleware).call(this, Res);
            if (__classPrivateFieldGet(this, _State_onChange, "f")) {
                __classPrivateFieldGet(this, _State_onChange, "f").call(this, ForChnage, () => __classPrivateFieldGet(this, _State_instances, "m", _State_Last).call(this));
            }
        }
        return;
    },
    _State_RunMiddleware = function _State_RunMiddleware(NewValue) {
        if (!__classPrivateFieldGet(this, _State_middlewareFuns, "f"))
            return NewValue;
        let Value = NewValue;
        __classPrivateFieldGet(this, _State_middlewareFuns, "f").forEach((e, i) => {
            Value = e(Value, __classPrivateFieldGet(this, _State_oldV, "f"));
        });
        return Value;
    },
    _State_GetValue = function _State_GetValue() {
        return __classPrivateFieldGet(this, _State_v, "f");
    },
    _a);
