import "./DomFixtures.css";
declare class DomFixtures {
    private container;
    private nonPersistantFixtures;
    constructor(container_id: string);
    private removeFixturesFromDom(fixtures);
    private isNode(o);
    private isElement(o);
    private generateFixtures(config);
    mount(): HTMLElement;
    mount(number_of_fixtures: number): HTMLElement | HTMLElement[];
    mount(htmls: (string | HTMLElement)): HTMLElement;
    mount(...htmls: (HTMLElement | string)[]): HTMLElement[];
    persistLastMount(): Function;
}
export default DomFixtures;
