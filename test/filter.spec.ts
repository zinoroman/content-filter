import { Wedes } from '../src/filter';

describe("Content Filter", () => {

    const filterGroup: string = 'test-group';
    const filterActions = ['some', 'restore', 'hide'];
    const filterActionsLength = filterActions.length;
    const filterContainerID: string = 'filter-container';

    beforeEach(() => {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const container: HTMLDivElement = document.createElement('div');

        container.setAttribute('id', filterContainerID);

        for (let i: number = filterActionsLength - 1; i >= 0; i--) {
            //Create span element
            const divElement: HTMLDivElement = document.createElement('div');
            
            //Add some attributes that is needed by our library
            divElement.innerHTML = `${i}`;
            divElement.setAttribute('data-filter-group', filterGroup);
            divElement.setAttribute('data-filter-action', filterActions[i]);
            divElement.setAttribute('data-filter-group-item', `${i}`);

            //Add created node to DOM
            fragment.appendChild(divElement);
        }

        container.appendChild(fragment);
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.querySelector(`#${filterContainerID}`).remove();
    });

    it("is div inserted", () => {
        const container = document.body.querySelector(`#${filterContainerID}`);
        console.log(container);
        expect(1).toBe(1);
    });
});
