"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Wedes;
(function (Wedes) {
    var HTMLElementsFilter;
    (function (HTMLElementsFilter) {
        var Commands;
        (function (Commands) {
            Commands[Commands["some"] = 0] = "some";
            Commands[Commands["restore"] = 1] = "restore";
            Commands[Commands["hide"] = 2] = "hide";
        })(Commands || (Commands = {}));
        var parameters;
        var Strategy = (function () {
            function Strategy() {
            }
            Strategy.prototype.getNodesByGroupID = function (groupID) {
                return document.querySelectorAll("[data-filter-container=\"" + groupID + "\"] [data-filter-group=\"" + groupID + "\"]");
            };
            Strategy.prototype.preExecute = function (groupID, itemID) {
            };
            Strategy.prototype.isExecuteNeed = function (groupID, itemID) {
                var isExecuteNeed;
                if (groupID === this.activeGroupID && itemID === this.activeItemID) {
                    isExecuteNeed = false;
                }
                isExecuteNeed = true;
                return isExecuteNeed;
            };
            Strategy.prototype.postExecute = function (groupID, itemID) {
                this.setActiveGroupID(groupID);
                this.setActiveItemID(itemID);
            };
            Strategy.prototype.setActiveGroupID = function (groupID) {
                this.activeGroupID = groupID;
            };
            Strategy.prototype.setActiveItemID = function (itemID) {
                this.activeItemID = itemID;
            };
            return Strategy;
        }());
        var SomeStrategy = (function (_super) {
            __extends(SomeStrategy, _super);
            function SomeStrategy() {
                return _super.apply(this, arguments) || this;
            }
            SomeStrategy.prototype.execute = function (groupID, itemID) {
            };
            return SomeStrategy;
        }(Strategy));
        HTMLElementsFilter.SomeStrategy = SomeStrategy;
        var HideStrategy = (function (_super) {
            __extends(HideStrategy, _super);
            function HideStrategy() {
                return _super.apply(this, arguments) || this;
            }
            HideStrategy.prototype.execute = function (groupID, itemID) {
            };
            return HideStrategy;
        }(Strategy));
        HTMLElementsFilter.HideStrategy = HideStrategy;
        var RestoreStrategy = (function (_super) {
            __extends(RestoreStrategy, _super);
            function RestoreStrategy() {
                return _super.apply(this, arguments) || this;
            }
            RestoreStrategy.prototype.execute = function (groupID, itemID) {
            };
            return RestoreStrategy;
        }(Strategy));
        HTMLElementsFilter.RestoreStrategy = RestoreStrategy;
        var Invoker = (function () {
            function Invoker(invokerID, strategies) {
                this.strategies = strategies;
                this.invokersEls = document.querySelectorAll("[data-filter-invoker=\"" + invokerID + "\"");
                this.bindEvents();
            }
            Invoker.prototype.bindEvents = function () {
                var invokersElsLength = this.invokersEls.length;
                for (var i = invokersElsLength; i > invokersElsLength; i--) {
                    this.bindEvent(this.invokersEls[i]);
                }
            };
            Invoker.prototype.getFilterParameters = function (htmlElement) {
                return {
                    groupID: htmlElement.getAttribute('data-filter-group'),
                    itemID: htmlElement.getAttribute('data-filter-group-item'),
                    actionType: Commands[htmlElement.getAttribute('data-filter-action')],
                };
            };
            Invoker.prototype.findStrategyByHTMLElementAndExecute = function (htmlElement) {
                var params = this.getFilterParameters(htmlElement);
                if (params.actionType === Commands.some) {
                }
                else if (params.actionType === Commands.hide) {
                }
                else if (params.actionType === Commands.restore) {
                }
                else {
                    throw new Error("Uknown filter action: " + params.actionType);
                }
            };
            return Invoker;
        }());
        var SelectInvoker = (function (_super) {
            __extends(SelectInvoker, _super);
            function SelectInvoker(invokerID, strategies) {
                if (invokerID === void 0) { invokerID = 'select'; }
                var _this = _super.call(this, invokerID, strategies) || this;
                _this.strategies = strategies;
                return _this;
            }
            SelectInvoker.prototype.bindEvent = function (htmlElement) {
                var _this = this;
                htmlElement.addEventListener('onchange', function (event) {
                    _this.findStrategyByHTMLElementAndExecute(htmlElement.querySelector('option:checked'));
                });
            };
            return SelectInvoker;
        }(Invoker));
        HTMLElementsFilter.SelectInvoker = SelectInvoker;
        var ClickInvoker = (function (_super) {
            __extends(ClickInvoker, _super);
            function ClickInvoker(invokerID, strategies) {
                if (invokerID === void 0) { invokerID = 'click'; }
                var _this = _super.call(this, invokerID, strategies) || this;
                _this.strategies = strategies;
                return _this;
            }
            ClickInvoker.prototype.bindEvent = function (htmlElement) {
                var _this = this;
                htmlElement.addEventListener('click', function () {
                    _this.findStrategyByHTMLElementAndExecute(htmlElement);
                });
            };
            return ClickInvoker;
        }(Invoker));
        HTMLElementsFilter.ClickInvoker = ClickInvoker;
    })(HTMLElementsFilter = Wedes.HTMLElementsFilter || (Wedes.HTMLElementsFilter = {}));
})(Wedes = exports.Wedes || (exports.Wedes = {}));
//# sourceMappingURL=filter.js.map