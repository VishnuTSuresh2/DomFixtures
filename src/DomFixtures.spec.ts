import DomFixtures from "./DomFixtures";
import * as $ from 'jquery';
let loremIpsum = require('lorem-ipsum');

function p(className?:string,content?:string):string{
    if(className===undefined){
        className="u-4327";
    }
    if(content===undefined){
        content=loremIpsum();
    }
    return `<p class="${className}">${content}</p>`;
}
function e():HTMLElement{
    let e:HTMLElement=document.createElement("p");
    e.innerHTML=loremIpsum();
    e.className="u-4327";
    return e;
}
describe("DomFixtures",()=>{
    var div=$("<div id='fixture-container'>");
    $("body").append(div);
    let fixtures:DomFixtures=new DomFixtures("fixture-container");
    describe("DomFixtures",()=>{
        it("can render fixtures into an html element",()=>{
            var div=$("<div id='testfixturecontainer'>");
            $("body").append(div);
            let fixtureContainer:DomFixtures=new DomFixtures("testfixturecontainer");
            fixtureContainer.mount("<div id='u-173544'></div>");
            expect($("#testfixturecontainer #u-173544").length).toBe(1);
            $("#testfixturecontainer").detach();
        });
    })
    describe("mount",()=>{
        it("mounts the components passed as arguments",()=>{
            fixtures.mount(p(),p(),p());
            expect($(".u-4327").length).toBe(3);
            fixtures.mount(p());
            expect($(".u-4327").length).toBe(1);
        });
        it("empties the fixture on every call before mounting the components",()=>{
            fixtures.mount(p('u-4327',"Hello"),p('u-8643',"World"));
            fixtures.mount(p('u-4327',"Mighty"),p('u-8643',"Mouse"));
            expect($(".u-4327").text()+$(".u-8643").text()).toBe("MightyMouse");
        });
        it("returns the fixture element (or array of fixtures) where the component(s) are mounted",()=>{
            var fixture=fixtures.mount(p(),p(),p());
            expect(
                fixture.length===3&&
                $(fixture[0]).find("p").length===1&&
                $(fixture[1]).find("p").length===1&&
                $(fixture[2]).find("p").length===1
            ).toBeTruthy();
        });
        it("can accept string(s), which represents valid HTML, as argument and return fixture (as array if more than one)",()=>{
            var fixture=fixtures.mount(p(),p(),p());
            expect(
                fixture.length===3&&
                $(fixture[0]).find("p").length===1&&
                $(fixture[1]).find("p").length===1&&
                $(fixture[2]).find("p").length===1
            ).toBeTruthy();
        });
        it("can accept HTMLElements as argument and return fixture (as array if more than one)",()=>{
            var fixture=fixtures.mount(e(),e(),e());
            var fixture2=fixtures.mount(e());
            expect(
                fixture.length===3&&
                $(fixture[0]).find("p").length===1&&
                $(fixture[1]).find("p").length===1&&
                $(fixture[2]).find("p").length===1&&
                $(fixture2).find("p").length===1
            ).toBeTruthy();
        });
        it("can accept HTMLElements and strings both as argument and return fixture (as array if more than one)",()=>{
            var fixture=fixtures.mount(e(),p(),e());
            var fixture2=fixtures.mount(e());
            expect(
                fixture.length===3&&
                $(fixture[0]).find("p").length===1&&
                $(fixture[1]).find("p").length===1&&
                $(fixture[2]).find("p").length===1&&
                $(fixture2).find("p").length===1
            ).toBeTruthy();
        });
        it("can accept numbers as argument to create that many empty fixtures",()=>{
            var f3=<HTMLElement[]>fixtures.mount(3);
            expect(f3.length).toBe(3);
            expect(f3[0].innerHTML+f3[1].innerHTML+f3[2].innerHTML).toBe("");
            var f1=<HTMLElement>fixtures.mount(1);
            expect(f1.innerHTML).toBe("");
        });
        it("can be called without any arguments and will return an empty fixture",()=>{
            var f3=fixtures.mount();
            expect(f3.innerHTML).toBe("");
        });
    });
    describe("persistLastMount",()=>{
        it("will persist the fixtures when mounting other fixtures",()=>{
            fixtures.mount(p());
            var done=fixtures.persistLastMount();
            fixtures.mount(p("u-9824"));
            expect($(".u-4327").length).toBe(1);
            done();

        })
        it("returns a done function which should be called when the fixture is finished using",()=>{
            fixtures.mount(p());
            var done=fixtures.persistLastMount();
            expect(typeof done).toBe("function");
            done();
        })
        describe("done",()=>{
            it("deletes the persisting fixtures if another mount has been called",()=>{
                fixtures.mount(p());
                var done=fixtures.persistLastMount();
                fixtures.mount(p("u-9824"));
                done();
                expect($(".u-4327").length).toBe(0);
            })
            it("does not delete the fixtures until another mount has been called",()=>{
                fixtures.mount(p());
                var done=fixtures.persistLastMount();
                done();
                expect($(".u-4327").length).toBe(1);
                fixtures.mount(p("u-9824"));
                expect($(".u-4327").length).toBe(0);
            })
        });
    });
});