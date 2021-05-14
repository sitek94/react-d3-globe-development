(this.webpackJsonpglobe=this.webpackJsonpglobe||[]).push([[0],{85:function(t,e,n){"use strict";n.r(e);var r=n(2),o=n.n(r),c=n(34),i=n.n(c),a=n(8),u=n(4),s=n(3),l={duration:1e3,size:400,landColor:"#eaedee",oceanColor:"#17181d",center:[0,0],rotation:[0,-30],dragSensitivity:75,minScroll:.3,maxScroll:20},d=n(1),p=n.n(d),f=n(7),j=n(37),h="https://unpkg.com/visionscarto-world-atlas@0.0.6/world/110m.json";function b(){return v.apply(this,arguments)}function v(){return(v=Object(f.a)(p.a.mark((function t(){var e,n,r,o,c;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(h);case 2:return e=t.sent,t.next=5,e.json();case 5:if(n=t.sent,!(r=n.objects.countries)){t.next=12;break}return o=Object(j.a)(n,r),c=o.features,t.abrupt("return",c);case 12:throw new Error('There was no "countries" object in "topology.objects"');case 13:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var O="https://gist.githubusercontent.com/sitek94/d1c99f4b1936ad047602cc569d30db6b/raw/countries.csv",m={id:"unknown",name:"unknown",position:[25.027684437991375,-70.99627570018042]};function w(){return g.apply(this,arguments)}function g(){return(g=Object(f.a)(p.a.mark((function t(){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(s.a)(O).then((function(t){return t.map((function(t){var e=t.id,n=t.name,r=t.latitude,o=t.longitude;return e&&n&&r&&o?{id:e,name:n,position:[Number(r),Number(o)]}:m}))})));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function x(){return(x=Object(f.a)(p.a.mark((function t(){var e,n,r,o;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([b(),w()]);case 2:return e=t.sent,n=Object(u.a)(e,2),r=n[0],o=n[1],t.abrupt("return",y(o,r));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function y(t,e){return e.map((function(e){var n=t.find((function(t){return t.id===e.id}));return Object(a.a)(Object(a.a)({},e),{},{properties:n||m})}))}function k(){var t=r.useState([]),e=Object(u.a)(t,2),n=e[0],o=e[1],c=r.useState("idle"),i=Object(u.a)(c,2),a=i[0],s=i[1],l=r.useState(null),d=Object(u.a)(l,2),p=d[0],f=d[1];return r.useEffect((function(){var t=!0;return s("pending"),function(){return x.apply(this,arguments)}().then((function(e){t&&(s("resolved"),o(e))})).catch((function(e){t&&(s("rejected"),f(e))})),function(){t=!1}}),[]),{countries:n,status:a,error:p}}var S=n(0);function C(t){var e=t.oceanColor,n=void 0===e?l.oceanColor:e,o=t.landColor,c=void 0===o?l.landColor:o,i=t.svgStyle,d=t.circleStyle,p=t.size,f=void 0===p?l.size:p,j=t.height,h=void 0===j?f:j,b=t.width,v=void 0===b?f:b,O=t.rotateX,m=void 0===O?0:O,w=t.rotateY,g=void 0===w?0:w,x=t.rotateZ,y=void 0===x?0:x,C=t.rotation,z=void 0===C?[m,g,y]:C,E=t.dragSensitivity,M=void 0===E?75:E,A=t.minScroll,G=void 0===A?.3:A,J=t.maxScroll,N=void 0===J?20:J,T=v/2,B=h/2,I=f/2,P=I,R=r.useRef(null),X=k().countries,Y=r.useMemo((function(){return Object(s.c)().scale(I).center([0,0]).rotate(z).translate([T,B])}),[I,z,T,B]),Z=Object(s.d)(Y);function q(t){R.current&&function(t){var e=t.selection,n=t.projection,r=t.pathGenerator,o=t.duration,c=void 0===o?l.duration:o,i=t.rotation,a=n.rotate();r.projection(n);var u=i,d=Object(s.e)(a,u);e.transition().attrTween("d",(function(t){return function(e){n.rotate(d(Math.pow(e,.33))),r.projection(n);var o=r(t);return null!==o?o:""}})).duration(c)}({selection:Object(s.f)(R.current).selectAll("path"),projection:Y,pathGenerator:Z,rotation:t})}return r.useEffect((function(){if(R.current&&X.length){var t=Object(s.f)(R.current),e=t.selectAll("path"),n=t.select("circle"),r=e.data(X).join("path"),o=Object(s.g)().on("zoom",(function(t){var e=t.transform.k;e>=N&&(e=N),e<=G?e=G:(Y.scale(I*e),Z.projection(Y),n.attr("r",Y.scale()),r.attr("d",Z))})),c=Object(s.b)().on("drag",(function(t){var e=Y.rotate(),n=Object(u.a)(e,2),o=n[0],c=n[1],i=M/Y.scale();Y.rotate([o+t.dx*i,c-t.dy*i]),Z.projection(Y),r.attr("d",Z)}));t.call(c).call(o),n.attr("r",Y.scale()),r.attr("d",Z)}}),[I,N,G,Y,X,Z,M]),Object(S.jsxs)("svg",{ref:R,width:v,height:h,style:Object(a.a)({fill:c},i),children:[Object(S.jsx)("style",{children:"\n          path:hover {\n            fill: blue;\n          }\n        "}),Object(S.jsx)("circle",{cx:T,cy:B,r:P,style:Object(a.a)({fill:n},d)}),X.map((function(t){return Object(S.jsx)("path",{onClick:function(){return q(t.properties.position)}},t.id)}))]})}var z=function(){return Object(S.jsxs)("div",{children:[Object(S.jsx)(C,{width:250,height:250}),Object(S.jsx)(C,{width:250,height:250}),Object(S.jsx)(C,{width:250,height:250}),Object(S.jsx)(C,{width:750,height:750})]})};i.a.render(Object(S.jsx)(o.a.StrictMode,{children:Object(S.jsx)(z,{})}),document.getElementById("root"))}},[[85,1,2]]]);
//# sourceMappingURL=main.7cdac0f3.chunk.js.map