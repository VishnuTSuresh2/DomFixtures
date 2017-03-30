import "./DomFixtures.css";
let styles = require("./DomFixtures.css.json");

class DomFixtures{
    private container:HTMLElement;
    private nonPersistantFixtures:HTMLElement[];
    constructor(container_id:string){
        this.container=document.createElement("div");
        this.container.className=styles["dom-fixture-container"];
        document.getElementById(container_id).appendChild(this.container)
        this.nonPersistantFixtures=[];
        if(this.container===null){
            throw new Error("Invalid container id");
        }
        this.container.innerHTML="";
    }
    private removeFixturesFromDom(fixtures:HTMLElement[]):void{
        fixtures.forEach((fixture)=>{
            fixture.parentNode.removeChild(fixture);
        });
    }
    private isNode(o:Node):Boolean{
        return (
            typeof Node === "object" ? o instanceof Node : 
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
        );
    }
    private isElement(o:HTMLElement):Boolean{
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
    }
    private generateFixtures(config:any[]):HTMLElement[]{
        let fixtures:HTMLElement[]=[];
        if(config.length===0){
            fixtures=[document.createElement("div")];
        }
        else if(config.length===1&&typeof config[0] === "number"){
            let arg:number=config[0];
            fixtures=[];
            for(let i=0;i<arg;i++){
                let fixture:HTMLElement=document.createElement("div");
                fixtures.push(fixture);
            }
        }else{
            let number_of_arguments:number=config.length;
            fixtures=[];
            for(let i=0;i<number_of_arguments;i++){
                let fixture:HTMLElement=document.createElement("div");
                if(typeof config[i] === "number"){
                    throw new Error("Dont pass more than one number");
                }else if(typeof config[i] === "string"){
                    fixture.innerHTML=config[i]
                    
                }else if(this.isElement(config[i])||this.isNode(config[i])){
                    fixture.appendChild(config[i]);
                }else{
                    throw new Error("Unknown argument "+i);
                }
                fixtures.push(fixture);
            }
        }
        return fixtures;
    }
    
    public mount():HTMLElement;
    public mount(number_of_fixtures:number):HTMLElement|HTMLElement[];
    public mount(htmls:(string|HTMLElement)):HTMLElement;
    public mount(...htmls:(HTMLElement|string)[]):HTMLElement[];
    public mount(...args:any[]):HTMLElement|HTMLElement[]{
        this.removeFixturesFromDom(this.nonPersistantFixtures);
        let fixtures:HTMLElement[]=this.generateFixtures(args);
        fixtures.forEach((fixture)=>{
            fixture.className=styles.fixture;
            this.container.appendChild(fixture);
        });
        this.nonPersistantFixtures=fixtures;
        if(fixtures.length===1){
            return fixtures[0];
        }else{
            return fixtures;
        }
    }
    persistLastMount():Function{
        let persistantFixtures:HTMLElement[]=this.nonPersistantFixtures;
        var flag_array:HTMLElement[]=[];
        this.nonPersistantFixtures=flag_array;
        return ()=>{
            if(this.nonPersistantFixtures!==flag_array){
                this.removeFixturesFromDom(persistantFixtures)
            }else{
                this.nonPersistantFixtures=persistantFixtures;
            }
        }
    }
}
export default DomFixtures;