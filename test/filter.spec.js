"use strict";
describe("Content Filter", function () {
    var filterGroup = 'test-group';
    var filterActions = ['some', 'restore', 'hide'];
    var filterActionsLength = filterActions.length;
    var filterContainerID = 'filter-container';
    beforeEach(function () {
        var fragment = document.createDocumentFragment();
        var container = document.createElement('div');
        container.setAttribute('id', filterContainerID);
        for (var i = filterActionsLength - 1; i >= 0; i--) {
            var divElement = document.createElement('div');
            divElement.innerHTML = "" + i;
            divElement.setAttribute('data-filter-group', filterGroup);
            divElement.setAttribute('data-filter-action', filterActions[i]);
            divElement.setAttribute('data-filter-group-item', "" + i);
            fragment.appendChild(divElement);
        }
        container.appendChild(fragment);
        document.body.appendChild(container);
    });
    afterEach(function () {
        document.body.querySelector("#" + filterContainerID).remove();
    });
    it("is div inserted", function () {
        var container = document.body.querySelector("#" + filterContainerID);
        console.log(container);
        expect(1).toBe(1);
    });
});
//# sourceMappingURL=filter.spec.js.map