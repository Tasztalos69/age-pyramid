(this["webpackJsonpage-pyramid"]=this["webpackJsonpage-pyramid"]||[]).push([[0],{26:function(e,t,a){e.exports=a(65)},64:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(22),s=a.n(o),l=a(8),i=a.n(l),c=a(11),u=a(2),d=a(4),m=a(23),p=a(6),y=a(5),h=a(7),f=a(10),b=a.n(f),g=a(0),w=a(24);function E(){return(E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function v(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var S=r.a.createElement("animate",{attributeName:"stroke-dashoffset",repeatCount:"indefinite",dur:"1.1627906976744184s",keyTimes:"0;1",values:"0;256.58892822265625"}),T=function(e){var t=e.svgRef,a=e.title,n=v(e,["svgRef","title"]);return r.a.createElement("svg",E({style:{background:"none",display:"block",shapeRendering:"auto"},width:"200px",height:"200px",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",ref:t},n),a?r.a.createElement("title",null,a):null,r.a.createElement("path",{fill:"none",stroke:"#5aa300",strokeWidth:8,strokeDasharray:"187.30991760253906 69.27901062011719",d:"M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z",strokeLinecap:"round",style:{transform:"scale(0.66)",transformOrigin:"50px 50px"}},S))},x=r.a.forwardRef((function(e,t){return r.a.createElement(T,E({svgRef:t},e))}));a.p;function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function C(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var Y=r.a.createElement("path",{d:"M89.243,80.511l-27.16-22.102c2.969-4.504,4.704-9.891,4.704-15.678c0-15.753-12.815-28.568-28.568-28.568  S9.65,26.978,9.65,42.73s12.816,28.568,28.568,28.568c7.811,0,14.896-3.153,20.059-8.251l27.179,22.117  c0.557,0.452,1.226,0.673,1.892,0.673c0.872,0,1.736-0.378,2.329-1.106C90.722,83.446,90.528,81.557,89.243,80.511z M38.219,65.299  c-12.444,0-22.568-10.124-22.568-22.568s10.124-22.568,22.568-22.568c12.444,0,22.568,10.124,22.568,22.568  S50.663,65.299,38.219,65.299z"}),O=function(e){var t=e.svgRef,a=e.title,n=C(e,["svgRef","title"]);return r.a.createElement("svg",k({x:"0px",y:"0px",viewBox:"0 0 100 125",enableBackground:"new 0 0 100 100",xmlSpace:"preserve",ref:t},n),a?r.a.createElement("title",null,a):null,Y)},_=r.a.forwardRef((function(e,t){return r.a.createElement(O,k({svgRef:t},e))})),j=(a.p,a(25)),q=a.n(j),P=(a(64),function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(y.a)(t).call(this,e))).searchCountry=function(e){if(document.querySelector(".cnt-list").style.opacity=1,a.setState({countryInput:e.target.value}),null===e.target.value||""===e.target.value||void 0===e.target.value)a.setState({matchedCountries:[]});else{var t=new RegExp("^".concat(e.target.value),"gi"),n=a.state.countries.filter((function(e){return e.name.match(t)}));a.setState({matchedCountries:n})}},a.handleYearChange=function(e){a.setState(Object(u.a)({},e.target.name,e.target.value))},a.state={countries:[],years:[{name:""}],countryInput:"",matchedCountries:[],selectedCountryId:null,selectedCountry:null,yearStart:"",yearEnd:"",modalDb:!1,modalTech:!1,modalAbout:!1},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(c.a)(i.a.mark((function e(){var t,a,n,r=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={headers:{Accept:"text/json"}},"https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5.F._T..M",e.next=4,b.a.get("https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5.F._T..M",t).then((function(e){var t=e.data.structure.dimensions.series.filter((function(e){return"REF_AREA"===e.id}))[0].values,a=e.data.structure.dimensions.observation[0].values;r.setState({countries:t,years:a})})).catch((function(e){console.error(e),document.querySelector("#loader-main").style.opacity=0,document.querySelector("#error").style.display="block",document.querySelector("#error").style.opacity=1}));case 4:document.querySelector("#loader-main").style.opacity=0,setTimeout((function(){document.querySelector("#loader-main").style.display="none"}),500),a=document.querySelector("footer").offsetHeight+5+"px",n=document.querySelector("footer").offsetWidth+"px",document.querySelector(".modalDb").style.bottom=a,document.querySelector(".modalTech").style.bottom=a,document.querySelector(".modalAbout").style.bottom=a,document.querySelector(".modalAbout").style.width=n;case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"initGraph",value:function(){var e=Object(c.a)(i.a.mark((function e(t){var a,n,r,o,s,l,c,u,d,m,p,y,h,f,E,v,S,T,x,k,C,Y,O,_,j,q,P,A,I,M,D,z,N,R,F,L,W,B,H,G,U,J,K,Q,V,X,Z,$=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),null!==this.state.selectedCountry&&""!==this.state.yearStart&&""!==this.state.yearEnd){e.next=9;break}(a=document.querySelectorAll(".input-number"))[0].style.border="2px solid #ff0000",a[1].style.border="2px solid #ff0000",null===this.state.selectedCountry&&(document.querySelector("#input-text").style.border="2px solid #ff0000"),setTimeout((function(){document.querySelector("#input-text").style.border="2px solid transparent",a[0].style.border="2px solid transparent",a[1].style.border="2px solid transparent"}),300),e.next=84;break;case 9:if(n=parseInt(this.state.years[0].name),r=parseInt(this.state.years[this.state.years.length-1].name),!(parseInt(this.state.yearStart)<n||parseInt(this.state.yearStart)>r||parseInt(this.state.yearEnd)<n||parseInt(this.state.yearEnd)>r||parseInt(this.state.yearEnd)-parseInt(this.state.yearStart)>75)){e.next=19;break}o=document.querySelectorAll(".input-number"),document.querySelector(".years-minmax").style.color="red",o[0].style.border="2px solid #ff0000",o[1].style.border="2px solid #ff0000",setTimeout((function(){o[0].style.border="2px solid transparent",o[1].style.border="2px solid transparent",document.querySelector(".years-minmax").style.color="black"}),600),e.next=84;break;case 19:for(document.querySelector("#loader-form").style.opacity=1,s=new g.m,l=new g.g;s.children.length>0;)s.remove(s.children[0]);for(;l.children.length>0;)l.remove(l.children[0]);for(s.dispose(),s.background=new g.d(16777215),c=new g.k(75,window.innerWidth/window.innerHeight,.1,1e3),(u=new g.t({antialias:!0})).setSize(window.innerWidth,window.innerHeight),document.body.appendChild(u.domElement),c.position.z=5,d=.05*(parseInt(this.state.yearEnd)-parseInt(this.state.yearStart))+.05,m=new g.c(.15,2.1,d),p=new g.j({color:1052688}),y=new g.j({color:16777215}),h=new g.i(m,p),s.add(h),f=new g.c(6.15,.2,.05),E=new g.i(f,p),l.add(E),E.position.set(0,-1.15,0),v=new g.c(6.15,.005,.005),S=new g.i(v,y),l.add(S),S.position.set(0,-1.15,.025),T={headers:{Accept:"text/json"}},x=[],k=[],C=0;C<21;C++)k[C]=[],x[C]=[];return Y=function(e,t,a){for(var n=0;n<parseInt($.state.yearEnd)-(parseInt($.state.yearStart)-1);n++){var r=t[Object.keys(t)[n]][0];"M"===e?k[a][n]=r:x[a][n]=r}},O="https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5+Y5T10+Y10T14+Y15T19+Y20T24+Y25T29+Y30T34+Y35T39+Y40T44+Y45T49+Y50T54+Y55T59+Y60T64+Y65T69+Y70T74+Y75T79+Y80T84+Y85T89+Y90T94+Y95T99+Y_GE100.M._T.".concat(this.state.selectedCountryId,".M?startPeriod=").concat(this.state.yearStart,"&endPeriod=").concat(this.state.yearEnd),e.next=51,b.a.get(O,T).then((function(e){for(var t=e.data.dataSets[0].series,a=0;a<21;a++){var n=t[Object.keys(t)[a]].observations;Y("M",n,0===a?20:1===a?0:12===a?1:a<=11?a:a-1)}})).catch((function(e){console.error(e),document.querySelector("#error").style.display="block",document.querySelector("#error").style.opacity=1}));case 51:return O="https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5+Y5T10+Y10T14+Y15T19+Y20T24+Y25T29+Y30T34+Y35T39+Y40T44+Y45T49+Y50T54+Y55T59+Y60T64+Y65T69+Y70T74+Y75T79+Y80T84+Y85T89+Y90T94+Y95T99+Y_GE100.F._T.".concat(this.state.selectedCountryId,".M?startPeriod=").concat(this.state.yearStart,"&endPeriod=").concat(this.state.yearEnd),e.next=54,b.a.get(O,T).then((function(e){for(var t=e.data.dataSets[0].series,a=0;a<21;a++){var n=t[Object.keys(t)[a]].observations;Y("F",n,0===a?20:1===a?0:12===a?1:a<=11?a:a-1)}})).catch((function(e){document.querySelector("#error").style.display="block",document.querySelector("#error").style.opacity=1,console.error(e)}));case 54:for(_=k.map((function(e){return Math.max.apply(Math,e)})),j=Math.max.apply(null,_),q=x.map((function(e){return Math.max.apply(Math,e)})),P=Math.max.apply(null,q),A=Math.max(j,P),I=new g.j({map:(new g.q).load("texture_short.png")}),M=new g.j({map:(new g.q).load("texture_long.png")}),D=new g.j({map:(new g.q).load("texture_med.png")}),z=new g.j({map:(new g.q).load("texture_med_low.png")}),N=function(e){return e>2?[I,I,M,M,M,M]:e>1?[I,I,D,D,D,D]:e>.05?[I,I,z,z,z,z]:[I,I,I,I,I,I]},R=0;R<k.length;R++)for(F=0;F<k[R].length;F++)k[R][F]>.01&&(L=k[R][F]/A*3,W=new g.b(L,.1,.05),B=N(L),H=new g.i(W,B),l.add(H),H.position.set(L/-2-.076,.1*R-1,0+-.05*F));for(G=0;G<x.length;G++)for(U=0;U<x[G].length;U++)x[G][U]>.01&&(J=x[G][U]/A*3,K=new g.b(J,.1,.05),Q=N(J),V=new g.i(K,Q),l.add(V),V.position.set(J/2+.075,.1*G-1,0+-.05*U));(new g.f).load("Comfortaa_Regular.json",(function(e){for(var t=new g.j({color:16777215}),a=0;a<101;a+=10){var n=new g.p(a.toString(),{font:e,size:.05,height:.01});n.center();var r=new g.i(n,t);l.add(r),r.position.set(0,.02*a-1,.03)}var o=new g.p("Male",{font:e,size:.05,height:.01}),s=new g.p("Female",{font:e,size:.05,height:.01});o.center(),s.center();var i=new g.i(o,t),c=new g.i(s,t);l.add(i),l.add(c),i.position.set(-1.5,-1.2,.03),c.position.set(1.5,-1.2,.03);var u=new g.p(j.toString(),{font:e,size:.05,height:.01}),d=new g.p(P.toString(),{font:e,size:.05,height:.01}),m=new g.p((j/2).toString(),{font:e,size:.05,height:.01});m.center();var p=new g.p((P/2).toString(),{font:e,size:.05,height:.01});p.center();var y=new g.p("0",{font:e,size:.05,height:.01});y.center();var h=new g.i(u,t),f=new g.i(d,t),b=new g.i(m,t),w=new g.i(p,t),E=new g.i(y,t),v=E.clone();l.add(h,f,b,w,E,v),h.position.set(-3,-1.12,.03),f.position.set(2.7,-1.12,.03),b.position.set(-1.5,-1.1,.03),w.position.set(1.5,-1.1,.03),E.position.set(.15,-1.1,.03),v.position.set(-.15,-1.1,.03)})),s.add(l),X=(new g.a).setFromObject(l),l.position.set(0,0,X.getSize().z/2-.025),(Z=new w.a(c,u.domElement)).rotateSpeed=.5,Z.zoomSpeed=1.2,Z.panSpeed=.8,Z.maxDistance=10,Z.minDistance=4,Z.enableDamping=!0,function e(){requestAnimationFrame(e),Z.update(),u.render(s,c)}(),console.log(u.info),window.addEventListener("resize",(function(){c.aspect=window.innerWidth/window.innerHeight,c.updateProjectionMatrix(),u.setSize(window.innerWidth,window.innerHeight)}),!1),document.querySelector("#reset").addEventListener("click",(function(){Z.reset()})),setTimeout((function(){document.querySelector("form").style.opacity=0,setTimeout((function(){document.querySelector("form").style.display="none"}),500)}),500);case 84:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement(q.a,{effect:"solid",place:"right",type:"dark"}),r.a.createElement("div",{id:"error"},r.a.createElement("p",null,"An error ocurred."),r.a.createElement("button",{onClick:function(){window.location.reload()}},"Reload")),r.a.createElement("div",{id:"loader-main"},r.a.createElement(x,{id:"loader-gif"})),r.a.createElement("h1",null,"Age pyramid visualizer"),r.a.createElement("form",null,r.a.createElement("div",{className:"form-wrapper"},r.a.createElement("p",null,"1. Select Country"),r.a.createElement("div",{className:"cnt-input-wrapper"},r.a.createElement(_,{id:"search"}),r.a.createElement("input",{id:"input-text",type:"text",name:"country",value:this.state.countryInput,onChange:this.searchCountry,autoFocus:!0,autoComplete:"off",required:!0}),r.a.createElement("ul",{className:"cnt-list",style:{opacity:0!==this.state.matchedCountries.length?1:0}},this.state.matchedCountries.map((function(t){return r.a.createElement("li",{className:"cnt-list__li ".concat(e.state.selectedCountry===t.name?"cnt-list__li-active":""),key:t.id,onClick:function(){e.setState({selectedCountryId:t.id,selectedCountry:t.name,countryInput:t.name,matchedCountries:[]}),document.querySelector(".cnt-list").style.opacity=0}},t.name)}))),r.a.createElement("i",{className:"fas fa-info-circle","data-tip":"Type in the country or region whose pyramids you want to display."})),r.a.createElement("p",{style:{opacity:null!==this.state.selectedCountryId?1:0}},"2. Specify start and end years"),r.a.createElement("div",{className:"years-wrapper",style:{opacity:null!==this.state.selectedCountryId?1:0}},r.a.createElement("input",{type:"number",name:"yearStart",value:this.state.yearStart,onChange:this.handleYearChange,autoComplete:"off",required:!0,className:"input-number"}),r.a.createElement("p",null,"-"),r.a.createElement("input",{type:"number",name:"yearEnd",value:this.state.yearEnd,onChange:this.handleYearChange,autoComplete:"off",required:!0,className:"input-number"}),r.a.createElement("p",{className:"years-minmax"},"Available years: ",this.state.years[0].name," -"," ",this.state.years[this.state.years.length-1].name," | Max timespan: 75 years"),r.a.createElement("i",{className:"fas fa-info-circle","data-tip":"Type in the start and the end date of the pyramids."})),r.a.createElement("button",{onClick:this.initGraph.bind(this),style:{opacity:""!==this.state.yearStart&&""!==this.state.yearEnd?1:0}},"Submit"),r.a.createElement(x,{id:"loader-form"}))),r.a.createElement("div",{id:"back",onClick:function(){window.location.reload()}},r.a.createElement("i",{className:"fas fa-chevron-left"}),r.a.createElement("p",null,"Modify query")),r.a.createElement("footer",null,r.a.createElement("p",null,"Current Country: ",r.a.createElement("b",null,this.state.selectedCountry),r.a.createElement("br",null),"Current Years:"," ",r.a.createElement("b",null,this.state.yearStart," - ",this.state.yearEnd),r.a.createElement("br",null),r.a.createElement("span",{id:"reset"},r.a.createElement("b",null,"Reset view"))),r.a.createElement("hr",null),r.a.createElement("p",null,"Created by"," ",r.a.createElement("a",{href:"https://github.com/Tasztalos69",style:{color:"black"}},"BMK.")," ",r.a.createElement("br",null)," Licensed under ",r.a.createElement("b",null,"MIT")," License. ",r.a.createElement("br",null)," ",r.a.createElement("u",{onClick:function(){e.setState({modalDb:!e.state.modalDb,modalTech:!1,modalAbout:!1})}},"Database"),"|",r.a.createElement("u",{onClick:function(){e.setState({modalTech:!e.state.modalTech,modalDb:!1,modalAbout:!1})}},"Technology"),"|",r.a.createElement("u",{onClick:function(){e.setState({modalAbout:!e.state.modalAbout,modalDb:!1,modalTech:!1})}},"About"))),r.a.createElement("div",{className:"modals modalDb",style:{opacity:this.state.modalDb?1:0}},r.a.createElement("p",null,"Database used:"," ",r.a.createElement("a",{href:"https://data.un.org"},"https://data.un.org"))),r.a.createElement("div",{className:"modals modalTech",style:{opacity:this.state.modalTech?1:0}},r.a.createElement("h3",null,"Technology used:"),r.a.createElement("ul",null,r.a.createElement("li",null,"Framework:"," ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://reactjs.org"},"React")),r.a.createElement("li",null,"Renderer:"," ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://threejs.org"},"Three js")),r.a.createElement("li",null,"Requests:"," ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/axios/axios"},"Axios")))),r.a.createElement("div",{className:"modals modalAbout",style:{opacity:this.state.modalAbout?1:0}},r.a.createElement("p",null,"Age pyramid visualizer is a tool, which draws the age pyramids of a country (or regions) in a specific time range, one after another. It's aim is to help the students and teachers understand the changes of a country's population.")))}}]),t}(r.a.Component));s.a.render(r.a.createElement(P,null),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.2f5fe69b.chunk.js.map