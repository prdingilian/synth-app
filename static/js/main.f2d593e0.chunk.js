(this["webpackJsonpsynth-app"]=this["webpackJsonpsynth-app"]||[]).push([[0],{13:function(e,a,t){},14:function(e,a,t){},15:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),l=t(6),r=t.n(l),o=(t(13),t(1)),s=t(2);var u=function(e){var a,t=e.name,l=e.color,r=Object(n.useContext)(T),o=Object(n.useContext)(x),s=o.VCO1,u=o.VCO2,i=o.VCO3,m=0;switch(t){case"VCO1":a=s,m=1;break;case"VCO2":a=u,m=2;break;case"VCO3":a=i,m=3}return c.a.createElement("div",{className:"container",style:{backgroundColor:l}},c.a.createElement("div",{className:"label"},"Oscillator ".concat(m)),c.a.createElement("div",{className:"rowOneKnobHalfOne"},c.a.createElement("input",{className:"slider",type:"range",name:"detune",id:"detune",min:"0",value:a.detune,max:"50",onChange:function(e){r({type:"update-module",payload:{module:t,property:"detune",value:parseInt(e.currentTarget.value)}})}}),c.a.createElement("label",{htmlFor:"gain"},"Detune")),c.a.createElement("div",{className:"rowOneKnobHalfTwo"},c.a.createElement("input",{className:"slider",type:"range",name:"shape",id:"shape",min:"0",step:"25",value:a.shape,max:"75",onChange:function(e){r({type:"update-module",payload:{module:t,property:"shape",value:parseInt(e.currentTarget.value)}})}}),c.a.createElement("label",{htmlFor:"gain"},"Shape")),c.a.createElement("div",{className:"rowTwoKnobHalfOne"},c.a.createElement("input",{className:"slider",type:"range",name:"octave",id:"octave",min:"1",step:"1",value:5-a.octave,max:"4",onChange:function(e){r({type:"update-module",payload:{module:t,property:"octave",value:5-e.currentTarget.value}})}}),c.a.createElement("label",{htmlFor:"octave"},"Pitch")),c.a.createElement("div",{className:"rowTwoKnobHalfTwo"},c.a.createElement("input",{className:"slider",type:"range",name:"portamento",id:"portamento",min:"0",max:"10",step:"1",value:10*a.portamento,onChange:function(e){r({type:"update-module",payload:{module:t,property:"portamento",value:e.currentTarget.value/10}})}}),c.a.createElement("label",{htmlFor:"portamento"},"Portamento")))};var i=function(e){var a=e.color,t=Object(n.useContext)(T),l=Object(n.useContext)(x).VCF;return c.a.createElement("div",{className:"container",style:{backgroundColor:a}},c.a.createElement("div",{className:"label"},"Filter"),c.a.createElement("div",{className:"rowOneKnobHalfOne"},c.a.createElement("input",{className:"slider",type:"range",name:"resonance",id:"resonance",min:"0",value:l.resonance,max:"25",onChange:function(e){t({type:"update-module",payload:{module:"VCF",property:"resonance",value:e.currentTarget.value}})}}),c.a.createElement("label",{htmlFor:"resonance"},"Resonance")),c.a.createElement("div",{className:"rowOneKnobHalfTwo"},c.a.createElement("input",{className:"slider",type:"range",name:"frequency",id:"frequency",min:"100",value:l.frequency,max:"9000",onChange:function(e){t({type:"update-module",payload:{module:"VCF",property:"frequency",value:e.currentTarget.value}})}}),c.a.createElement("label",{htmlFor:"frequency"},"Frequency")),c.a.createElement("div",{className:"rowTwoKnobFull"},c.a.createElement("label",{htmlFor:"modulator"},"Modulator"),c.a.createElement("select",{name:"modulator",value:l.modulator,onChange:function(e){t({type:"update-module",payload:{module:"VCF",property:"modulator",value:e.currentTarget.value}})}},c.a.createElement("option",{value:"none"},"None"),c.a.createElement("option",{value:"osc1"},"Oscillator 1"),c.a.createElement("option",{value:"osc2"},"Oscillator 2"),c.a.createElement("option",{value:"osc3"},"Oscillator 3"))))};var m=function(e){var a=e.color,t=Object(n.useContext)(T),l=Object(n.useContext)(x).VCA;return c.a.createElement("div",{className:"container",style:{backgroundColor:a}},c.a.createElement("div",{className:"label"},"Amp"),c.a.createElement("div",{className:"rowOneKnobFull"},c.a.createElement("input",{className:"slider",type:"range",name:"gain",id:"gain",min:"0",value:l.gain,max:"10",onChange:function(e){t({type:"update-module",payload:{module:"VCA",property:"gain",value:e.currentTarget.value}})}}),c.a.createElement("label",{htmlFor:"gain"},"Gain")))};var d=function(e){var a=e.color,t=Object(n.useContext)(T),l=Object(n.useContext)(x).Delay;return c.a.createElement("div",{className:"container",style:{backgroundColor:a}},c.a.createElement("div",{className:"label"},"Delay"),c.a.createElement("div",{className:"rowOneKnobFull"},c.a.createElement("input",{className:"slider",type:"range",name:"feedback",id:"feedback",min:"0",value:10*l.feedback,max:"9",onChange:function(e){t({type:"update-module",payload:{module:"Delay",property:"feedback",value:e.currentTarget.value/10}})}}),c.a.createElement("label",{htmlFor:"feedback"},"Feedback")),c.a.createElement("div",{className:"rowTwoKnobFull"},c.a.createElement("input",{className:"slider",type:"range",name:"time",id:"time",min:"0",value:10*l.time,max:"9",onChange:function(e){t({type:"update-module",payload:{module:"Delay",property:"time",value:e.currentTarget.value/10}})}}),c.a.createElement("label",{htmlFor:"time"},"Time")))};var p=function(){return c.a.createElement("div",{className:"rackContainer"},c.a.createElement("div",{className:"rackSlot"},c.a.createElement(u,{name:"VCO1",color:"coral"})),c.a.createElement("div",{className:"rackSlot"},c.a.createElement(u,{name:"VCO2",color:"paleturquoise"})),c.a.createElement("div",{className:"rackSlot"},c.a.createElement(u,{name:"VCO3",color:"#89edb7"})),c.a.createElement("div",{className:"rackSlot"},c.a.createElement(i,{color:"aliceblue"})),c.a.createElement("div",{className:"rackSlot"},c.a.createElement(d,{color:"cornsilk"})),c.a.createElement("div",{className:"rackSlot"},c.a.createElement(m,{color:"lavender"})))},v=t(7),b=[0,1,2,3,4,5,6,7],O=[0,1,2,3,4,5,6,7];var f=function(e){var a=e.steps,t=e.setOscSteps,n=e.clock,l=e.color,r=e.setOscClockDivide,o=e.clockDivide,s=e.scale,u=e.setOscScale;return c.a.createElement("div",{className:"allSeq"},c.a.createElement("div",{className:"seqParams"},c.a.createElement("div",null,c.a.createElement("input",{className:"slider",type:"range",name:"clockDivide",id:"clockDivide",min:"0",value:o,max:"16",step:"4",onChange:function(e){r(parseInt(e.target.value))}}),c.a.createElement("label",{htmlFor:"clockDivide"},"Clock")),c.a.createElement("div",null,c.a.createElement("input",{className:"slider",type:"range",name:"scale",id:"scale",min:"0",value:s,max:"1",step:"1",onChange:function(e){u(parseInt(e.target.value))}}),c.a.createElement("label",{htmlFor:"scale"},"Scale"))),c.a.createElement("div",{className:"seqContainer"},b.map((function(e,r){return O.map((function(e,o){return c.a.createElement("div",{onClick:function(){return function(e,n){var c=Object(v.a)(a);c[n]===b.length-1-e?c[n]=-1:c[n]=b.length-1-e,t(c)}(r,o)},style:{backgroundColor:a[o]>=b.length-1-r?l:"white",border:(n-1)%8===o?"1px solid blue":"1px solid lightgrey",opacity:(n-1)%8===o?"1":"0.7"},className:"step"})}))}))))},y=(t(14),new(window.AudioContext||window.webkitAudioContext));y.suspend();var E=y.createGain();E.gain.value=0,E.connect(y.destination);var C=y.createBiquadFilter();C.frequency.value=1e4,C.type="lowpass",C.Q.value=7;var g=y.createDelay();g.delayTime.value=.1;var j=y.createGain();j.gain.value=.5,g.connect(j),j.connect(g),g.connect(y.destination);var h=[];function k(e,a){if(-1===S(e)){var t=y.createOscillator();t.connect(C),C.connect(E),E.connect(g),t.frequency.value=0,t.type=a,t.start(),h.push({id:e,osc:t})}}function V(e,a){if(-1!==S(e))switch(function(e){var a=S(e);-1!==a&&(h[a].osc.disconnect(),h.splice(a,1))}(e),parseInt(a)){case 0:k(e,"sine");break;case 25:k(e,"triangle");break;case 50:k(e,"square");break;case 75:k(e,"sawtooth")}}function N(e,a,t){h[S(e)]&&h[S(e)].osc.frequency.linearRampToValueAtTime(a,y.currentTime+t)}function S(e){return h.findIndex((function(a){return a.id===e}))}var w,F=t(17),x=c.a.createContext(),T=c.a.createContext(),D=[[261,293,329,349,392,440,493,523],[261,293,311,349,392,440,466,523]];function q(e,a){w=e;var t=Object(s.a)({},e),n=t.VCO1,c=t.VCO2,l=t.VCO3,r=t.VCF,o=t.Delay,u=t.VCA;switch(a.type){case"update-module":switch(a.payload.module){case"VCO1":(n=Object(s.a)({},n))[a.payload.property]=a.payload.value;break;case"VCO2":(c=Object(s.a)({},c))[a.payload.property]=a.payload.value;break;case"VCO3":(l=Object(s.a)({},l))[a.payload.property]=a.payload.value;break;case"VCF":(r=Object(s.a)({},r))[a.payload.property]=a.payload.value;break;case"Delay":(o=Object(s.a)({},o))[a.payload.property]=a.payload.value;break;case"VCA":(u=Object(s.a)({},u))[a.payload.property]=a.payload.value}return{VCO1:n,VCO2:c,VCO3:l,VCF:r,Delay:o,VCA:u};default:return u}}k(0,"sine"),k(1,"triangle"),k(2,"sawtooth");var A=function(){var e=Object(n.useReducer)(q,{VCO1:{detune:0,shape:75,octave:4,portamento:0},VCO2:{detune:0,shape:25,octave:1,portamento:0},VCO3:{detune:6,shape:75,octave:2,portamento:0},VCF:{frequency:2e3,resonance:14,modulator:"osc2"},Delay:{feedback:.3,time:.5},VCA:{gain:5}}),a=Object(o.a)(e,2),t=a[0],l=t.VCO1,r=t.VCO2,s=t.VCO3,u=t.VCF,i=t.Delay,m=t.VCA,d=a[1],v=Object(n.useState)(!1),b=Object(o.a)(v,2),O=b[0],k=b[1],A=Object(n.useState)(4e3),K=Object(o.a)(A,2),I=K[0],H=K[1],P=Object(n.useState)(0),B=Object(o.a)(P,2),R=B[0],G=B[1],M=Object(n.useState)(0),J=Object(o.a)(M,2),Q=J[0],W=J[1],z=Object(n.useState)(0),$=Object(o.a)(z,2),L=$[0],U=$[1],X=Object(n.useState)([0,-1,-1,3,-1,-1,1,-1]),Y=Object(o.a)(X,2),Z=Y[0],_=Y[1],ee=Object(n.useState)([7,6,2,-1,-1,0,-1,4]),ae=Object(o.a)(ee,2),te=ae[0],ne=ae[1],ce=Object(n.useState)([2,-1,-1,1,2,4,-1,7]),le=Object(o.a)(ce,2),re=le[0],oe=le[1],se=Object(n.useState)(8),ue=Object(o.a)(se,2),ie=ue[0],me=ue[1],de=Object(n.useState)(8),pe=Object(o.a)(de,2),ve=pe[0],be=pe[1],Oe=Object(n.useState)(16),fe=Object(o.a)(Oe,2),ye=fe[0],Ee=fe[1],Ce=Object(n.useState)(8),ge=Object(o.a)(Ce,2),je=ge[0],he=ge[1],ke=Object(n.useState)(8),Ve=Object(o.a)(ke,2),Ne=Ve[0],Se=Ve[1],we=Object(n.useState)(16),Fe=Object(o.a)(we,2),xe=Fe[0],Te=Fe[1],De=Object(n.useState)(0),qe=Object(o.a)(De,2),Ae=qe[0],Ke=qe[1],Ie=Object(n.useState)(0),He=Object(o.a)(Ie,2),Pe=He[0],Be=He[1],Re=Object(n.useState)(0),Ge=Object(o.a)(Re,2),Me=Ge[0],Je=Ge[1],Qe=Object(n.useState)(0),We=Object(o.a)(Qe,2),ze=We[0],$e=We[1],Le=Object(n.useState)(0),Ue=Object(o.a)(Le,2),Xe=Ue[0],Ye=Ue[1],Ze=Object(n.useState)(0),_e=Object(o.a)(Ze,2),ea=_e[0],aa=_e[1];function ta(e){var a;a=-1===e?100:9e3*++e/8,d({type:"update-module",payload:{module:"VCF",property:"frequency",value:a}})}function na(e,a,t){w&&w[e].shape===a.shape||V(t,a.shape),w&&w[e].detune===a.detune||function(e,a){var t=S(e);-1!==t&&(h[t].osc.detune.value=a)}(t,a.detune)}return Object(n.useEffect)((function(){O?(y.resume(),E.gain.value=.05):(y.suspend(),E.gain.value=0)}),[O]),Object(F.a)((function(){Se(ve),Te(ye),he(ie)}),I),Object(F.a)((function(){D[R][Z[Pe%8]]>-1?Ke(D[R][Z[Pe%8]]):Ke(0),"osc1"===u.modulator&&ta(Z[Pe%8]),Be(Pe+1)}),I/je),Object(F.a)((function(){D[Q][te[ze%8]]>-1?Je(D[Q][te[ze%8]]):Je(0),"osc2"===u.modulator&&ta(te[ze%8]),$e(ze+1)}),I/Ne),Object(F.a)((function(){D[L][re[ea%8]]>-1?Ye(D[L][re[ea%8]]):Ye(0),"osc3"===u.modulator&&ta(re[ea%8]),aa(ea+1)}),I/xe),Object(n.useEffect)((function(){N(0,Ae/l.octave,l.portamento)}),[Ae,l.octave]),Object(n.useEffect)((function(){N(1,Me/r.octave,r.portamento)}),[Me,r.octave]),Object(n.useEffect)((function(){N(2,Xe/s.octave,s.portamento)}),[Xe,s.octave]),Object(n.useEffect)((function(){na("VCO1",l,0)}),[l]),Object(n.useEffect)((function(){na("VCO2",r,1)}),[r]),Object(n.useEffect)((function(){na("VCO3",s,2)}),[s]),Object(n.useEffect)((function(){var e;e=u.frequency,C.frequency.linearRampToValueAtTime(e,y.currentTime+.2),function(e){C.Q.value=e}(u.resonance)}),[u]),Object(n.useEffect)((function(){var e;e=i.feedback,j.gain.value=e,function(e){g.delayTime.value=e}(i.time)}),[i]),Object(n.useEffect)((function(){var e;e=m.gain,E.gain.value=e/100}),[m]),c.a.createElement(c.a.Fragment,null,c.a.createElement(x.Provider,{value:{VCO1:l,VCO2:r,VCO3:s,VCF:u,Delay:i,VCA:m}},c.a.createElement(T.Provider,{value:d},c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"header"},c.a.createElement("div",null,c.a.createElement("input",{className:"slider",type:"range",name:"bpm",id:"bpm",min:"4000",value:1e4-I,max:"6000",step:"500",onChange:function(e){H(1e4-e.target.value)}}),c.a.createElement("label",{htmlFor:"scale"},"Bpm")),c.a.createElement("h1",{className:"title"},c.a.createElement("span",{className:"spanOne"},"Sequencer")," ",c.a.createElement("span",{className:"spanTwo"},"Synthesizer")),c.a.createElement("div",null,c.a.createElement("button",{style:{backgroundColor:O?"indianred":"seagreen"},onClick:function(){return k(!O)}},O?"Mute":"Turn on Sound"))),c.a.createElement("div",{className:"sequencers"},c.a.createElement(f,{steps:Z,setOscSteps:_,clock:Pe,color:"coral",setOscClockDivide:me,clockDivide:ie,scale:R,setOscScale:G}),c.a.createElement(f,{steps:te,setOscSteps:ne,clock:ze,color:"paleturquoise",setOscClockDivide:be,clockDivide:ve,scale:Q,setOscScale:W}),c.a.createElement(f,{steps:re,setOscSteps:oe,clock:ea,color:"#89edb7",setOscClockDivide:Ee,clockDivide:ye,scale:L,setOscScale:U})),c.a.createElement(p,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,a,t){e.exports=t(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.f2d593e0.chunk.js.map