export namespace Wedes {
    export namespace HTMLElementsFilter {
        /*
            Enums
        */
        
        enum Commands {
            some,
            restore,
            hide
        }

        /*
            Interfaces
        */

        interface Parameters {
            groupID: string;
            itemID: string;
            action: Commands
        }

        interface Strategies {
            some: SomeStrategy;
            hide: HideStrategy;
            restore: RestoreStrategy;
        }

        interface Event {

        }

        interface ObserverHandler {
            (event: Event): void;   
        }
        
        /*
            Helper Variables
        */

        let parameters: Parameters;
        const updateModuleParameters = (newParameters: Parameters) => {
            parameters = newParameters;
        }
        
        /*
            Strategies
        */

        /*
            Abstract strategy
        */
        
        abstract class Strategy {
            private nodes: NodeList;
            private scopeParameters: Parameters;

            abstract execute(): void;

            public setParameters(parameters: Parameters) {
                this.scopeParameters = parameters;
            }

            private getNodesByGroupID(): NodeList {
                return document.querySelectorAll(`[data-filter-container="${parameters.groupID}"] [data-filter-group="${parameters.groupID}"]`);
            }

            public preExecute(): void {
                this.nodes = this.getNodesByGroupID();
            }

            public isExecuteNeed(): boolean {
                let isExecuteNeed: boolean = true;

                if (this.scopeParameters.groupID === parameters.groupID && this.scopeParameters.itemID === parameters.itemID && this.scopeParameters.action === parameters.action) {
                    isExecuteNeed = false;
                }

                return isExecuteNeed;
            }
            
            public postExecute(): void {
                updateModuleParameters(this.scopeParameters);
            }
        }

        /*
            Some strategy
            Will show items from group that match `itemID`
        */

        export class SomeStrategy extends Strategy {
            execute(): void {
                
            }
        }

        /*
            Hide strategy
            Will hide all items from group
        */

        export class HideStrategy extends Strategy {
            execute(): void {
                
            }
        }

        /*
            Restore strategy
            Will show all items from group
        */

        export class RestoreStrategy extends Strategy {
            execute(): void {
                
            }
        }


        /*
            Invokers
        */

        /*
            Abstract Invokers
        */

        abstract class Invoker {
            public invokersEls: NodeList;

            constructor(invokerID: string, public strategies: Strategies) {
                this.invokersEls = document.querySelectorAll(`[data-filter-invoker="${invokerID}"`);
                this.bindEvents();
            }

            public bindEvents() {
                const invokersElsLength = this.invokersEls.length;

                for (let i = invokersElsLength; i > invokersElsLength; i--) {
                    this.bindEvent(this.invokersEls[i]);
                }
            }
            
            abstract bindEvent(node: Node): void;

            public getFilterParameters(htmlElement: HTMLElement): Parameters {
                return {
                    groupID: htmlElement.getAttribute('data-filter-group'),
                    itemID: htmlElement.getAttribute('data-filter-group-item'),
                    action: <Commands>parseInt(Commands[<any>htmlElement.getAttribute('data-filter-action')]),
                }
            }

            public findStrategy(parameters: Parameters): Strategy {
                let strategy: Strategy;

                if (parameters.action === Commands.some) {
                    strategy = this.strategies.some;
                }
                else if (parameters.action === Commands.hide) {
                    strategy = this.strategies.hide;
                }
                else if (parameters.action === Commands.restore) {
                    strategy = this.strategies.restore;
                }
                else {
                    throw new Error(`Uknown filter action: ${params.action}`);
                }

                return strategy;
            }

            public execute(htmlElement: HTMLElement) {
                const parameters = this.getFilterParameters(htmlElement);
                let strategy: Strategy = this.findStrategy(parameters);

                strategy.setParameters(parameters);

                if (strategy.isExecuteNeed()) {
                    strategy.preExecute();
                    strategy.execute();
                    strategy.postExecute();
                }
            }
        }

        /*
            Invoker for HTMLSelectElement
        */

        export class SelectInvoker extends Invoker {
            constructor(invokerID: string = 'select', public strategies: Strategies) {
                super(invokerID, strategies);
            }

            bindEvent(htmlElement: HTMLElement) {
                htmlElement.addEventListener('onchange', (event) => {
                    this.execute(<HTMLElement>htmlElement.querySelector('option:checked'));
                });
            }
        }

        /*
            Invoker for all focusable elements
        */

        export class ClickInvoker extends Invoker {
            constructor(invokerID: string = 'click', public strategies: Strategies) {
                super(invokerID, strategies);
            }

            bindEvent(htmlElement: HTMLElement) {
                htmlElement.addEventListener('click', (event) => {
                    this.execute(htmlElement);
                });
            }
        }

        
        /*
            Filter Observer
        */

        class Observer {
            private handlers: any[] = [];

            subscribe(handler: ObserverHandler) {
                this.handlers.push(handler);
            }

            fire(event: Event) {
                this.handlers.forEach((handler) => {
                    handler.caller.call(handler.context, event);
                });
            }
        }
    }
}

