/*!
	Autosize v1.18.9 - 2014-05-27
	Automatically adjust textarea height based on user input.
	(c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
	license: http://www.opensource.org/licenses/mit-license.php
*/(function(i){var o,n={className:"autosizejs",id:"autosizejs",append:`
`,callback:!1,resizeDelay:10,placeholder:!0},y='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',p=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],V=i(y).data("autosize",!0)[0];V.style.lineHeight="99px",i(V).css("lineHeight")==="99px"&&p.push("lineHeight"),V.style.lineHeight="",i.fn.autosize=function(x){return this.length?(x=i.extend({},n,x||{}),V.parentNode!==document.body&&i(document.body).append(V),this.each(function(){function C(){var z,H=window.getComputedStyle?window.getComputedStyle(s,null):!1;H?(z=s.getBoundingClientRect().width,(z===0||typeof z!="number")&&(z=parseInt(H.width,10)),i.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(ot,Q){z-=parseInt(H[Q],10)})):z=a.width(),V.style.width=Math.max(z,0)+"px"}function f(){var z={};if(o=s,V.className=x.className,V.id=x.id,v=parseInt(a.css("maxHeight"),10),i.each(p,function(ot,Q){z[Q]=a.css(Q)}),i(V).css(z).attr("wrap",a.attr("wrap")),C(),window.chrome){var H=s.style.width;s.style.width="0px",s.offsetWidth,s.style.width=H}}function e(){var z,H;o!==s?f():C(),V.value=!s.value&&x.placeholder?(a.attr("placeholder")||"")+x.append:s.value+x.append,V.style.overflowY=s.style.overflowY,H=parseInt(s.style.height,10),V.scrollTop=0,V.scrollTop=9e4,z=V.scrollTop,v&&z>v?(s.style.overflowY="scroll",z=v):(s.style.overflowY="hidden",b>z&&(z=b)),z+=q,H!==z&&(s.style.height=z+"px",nt&&x.callback.call(s,s))}function k(){clearTimeout(S),S=setTimeout(function(){var z=a.width();z!==X&&(X=z,e())},parseInt(x.resizeDelay,10))}var v,b,S,s=this,a=i(s),q=0,nt=i.isFunction(x.callback),rt={height:s.style.height,overflow:s.style.overflow,overflowY:s.style.overflowY,wordWrap:s.style.wordWrap,resize:s.style.resize},X=a.width(),et=a.css("resize");a.data("autosize")||(a.data("autosize",!0),(a.css("box-sizing")==="border-box"||a.css("-moz-box-sizing")==="border-box"||a.css("-webkit-box-sizing")==="border-box")&&(q=a.outerHeight()-a.height()),b=Math.max(parseInt(a.css("minHeight"),10)-q||0,a.height()),a.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),et==="vertical"?a.css("resize","none"):et==="both"&&a.css("resize","horizontal"),"onpropertychange"in s?"oninput"in s?a.on("input.autosize keyup.autosize",e):a.on("propertychange.autosize",function(){event.propertyName==="value"&&e()}):a.on("input.autosize",e),x.resizeDelay!==!1&&i(window).on("resize.autosize",k),a.on("autosize.resize",e),a.on("autosize.resizeIncludeStyle",function(){o=null,e()}),a.on("autosize.destroy",function(){o=null,clearTimeout(S),i(window).off("resize",k),a.off("autosize").off(".autosize").css(rt).removeData("autosize")}),e())})):this}})(window.jQuery||window.$),function(i){if(typeof define<"u"&&define.amd)define(["jquery"],i);else if(typeof module<"u"&&module.exports){var o=require("jquery");module.exports=i(o)}else window.scrollMonitor=i(jQuery)}(function(i){function o(){return window.innerHeight||document.documentElement.clientHeight}function n(){if(f.viewportTop=e.scrollTop(),f.viewportBottom=f.viewportTop+f.viewportHeight,f.documentHeight=k.height(),f.documentHeight!==z){for(ot=v.length;ot--;)v[ot].recalculateLocation();z=f.documentHeight}}function y(){f.viewportHeight=o(),n(),V()}function p(){clearTimeout(Q),Q=setTimeout(y,100)}function V(){for(T=v.length;T--;)v[T].update();for(T=v.length;T--;)v[T].triggerCallbacks()}function x(u,I){function g(F){if(F.length!==0)for(G=F.length;G--;)d=F[G],d.callback.call(_,H),d.isOne&&F.splice(G,1)}var _=this;this.watchItem=u,I?I===+I?this.offsets={top:I,bottom:I}:this.offsets=i.extend({},et,I):this.offsets=et,this.callbacks={};for(var B=0,J=X.length;B<J;B++)_.callbacks[X[B]]=[];this.locked=!1;var Y,L,W,O,G,d;this.triggerCallbacks=function(){switch(this.isInViewport&&!Y&&g(this.callbacks[S]),this.isFullyInViewport&&!L&&g(this.callbacks[s]),this.isAboveViewport!==W&&this.isBelowViewport!==O&&(g(this.callbacks[b]),!L&&!this.isFullyInViewport&&(g(this.callbacks[s]),g(this.callbacks[q])),!Y&&!this.isInViewport&&(g(this.callbacks[S]),g(this.callbacks[a]))),!this.isFullyInViewport&&L&&g(this.callbacks[q]),!this.isInViewport&&Y&&g(this.callbacks[a]),this.isInViewport!==Y&&g(this.callbacks[b]),!0){case Y!==this.isInViewport:case L!==this.isFullyInViewport:case W!==this.isAboveViewport:case O!==this.isBelowViewport:g(this.callbacks[rt])}Y=this.isInViewport,L=this.isFullyInViewport,W=this.isAboveViewport,O=this.isBelowViewport},this.recalculateLocation=function(){if(!this.locked){var F=this.top,E=this.bottom;if(this.watchItem.nodeName){var R=this.watchItem.style.display;R==="none"&&(this.watchItem.style.display="");var it=i(this.watchItem).offset();this.top=it.top,this.bottom=it.top+this.watchItem.offsetHeight,R==="none"&&(this.watchItem.style.display=R)}else this.watchItem===+this.watchItem?this.watchItem>0?this.top=this.bottom=this.watchItem:this.top=this.bottom=f.documentHeight-this.watchItem:(this.top=this.watchItem.top,this.bottom=this.watchItem.bottom);this.top-=this.offsets.top,this.bottom+=this.offsets.bottom,this.height=this.bottom-this.top,(F!==void 0||E!==void 0)&&(this.top!==F||this.bottom!==E)&&g(this.callbacks[nt])}},this.recalculateLocation(),this.update(),Y=this.isInViewport,L=this.isFullyInViewport,W=this.isAboveViewport,O=this.isBelowViewport}function C(u){H=u,n(),V()}var f={},e=i(window),k=i(document),v=[],b="visibilityChange",S="enterViewport",s="fullyEnterViewport",a="exitViewport",q="partiallyExitViewport",nt="locationChange",rt="stateChange",X=[b,S,s,a,q,nt,rt],et={top:0,bottom:0};f.viewportTop,f.viewportBottom,f.documentHeight,f.viewportHeight=o();var z,H,ot,Q,T;x.prototype={on:function(u,I,g){switch(!0){case(u===b&&!this.isInViewport&&this.isAboveViewport):case(u===S&&this.isInViewport):case(u===s&&this.isFullyInViewport):case(u===a&&this.isAboveViewport&&!this.isInViewport):case(u===q&&this.isAboveViewport):if(I(),g)return}if(this.callbacks[u])this.callbacks[u].push({callback:I,isOne:g});else throw new Error("Tried to add a scroll monitor listener of type "+u+". Your options are: "+X.join(", "))},off:function(u,I){if(this.callbacks[u]){for(var g=0,_;_=this.callbacks[u][g];g++)if(_.callback===I){this.callbacks[u].splice(g,1);break}}else throw new Error("Tried to remove a scroll monitor listener of type "+u+". Your options are: "+X.join(", "))},one:function(u,I){this.on(u,I,!0)},recalculateSize:function(){this.height=this.watchItem.offsetHeight+this.offsets.top+this.offsets.bottom,this.bottom=this.top+this.height},update:function(){this.isAboveViewport=this.top<f.viewportTop,this.isBelowViewport=this.bottom>f.viewportBottom,this.isInViewport=this.top<=f.viewportBottom&&this.bottom>=f.viewportTop,this.isFullyInViewport=this.top>=f.viewportTop&&this.bottom<=f.viewportBottom||this.isAboveViewport&&this.isBelowViewport},destroy:function(){var u=v.indexOf(this),I=this;v.splice(u,1);for(var g=0,_=X.length;g<_;g++)I.callbacks[X[g]].length=0},lock:function(){this.locked=!0},unlock:function(){this.locked=!1}};for(var t=function(u){return function(I,g){this.on.call(this,u,I,g)}},st=0,A=X.length;st<A;st++){var D=X[st];x.prototype[D]=t(D)}try{n()}catch{i(n)}return e.on("scroll",C),e.on("resize",p),f.beget=f.create=function(u,I){typeof u=="string"&&(u=i(u)[0]),u instanceof i&&(u=u[0]);var g=new x(u,I);return v.push(g),g.update(),g},f.update=function(){H=null,n(),V()},f.recalculateLocations=function(){f.documentHeight=0,f.update()},f});function countUp(i,o,n,y,p,V){for(var x=0,C=["webkit","moz","ms","o"],f=0;f<C.length&&!window.requestAnimationFrame;++f)window.requestAnimationFrame=window[C[f]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[C[f]+"CancelAnimationFrame"]||window[C[f]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(k){var v=new Date().getTime(),b=Math.max(0,16-(v-x)),S=window.setTimeout(function(){k(v+b)},b);return x=v+b,S}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(k){clearTimeout(k)}),this.options=V||{useEasing:!0,useGrouping:!0,separator:",",decimal:"."},this.options.separator==""&&(this.options.useGrouping=!1),this.options.prefix==null&&(this.options.prefix=""),this.options.suffix==null&&(this.options.suffix="");var e=this;this.d=typeof i=="string"?document.getElementById(i):i,this.startVal=Number(o),this.endVal=Number(n),this.countDown=this.startVal>this.endVal,this.startTime=null,this.timestamp=null,this.remaining=null,this.frameVal=this.startVal,this.rAF=null,this.decimals=Math.max(0,y||0),this.dec=Math.pow(10,this.decimals),this.duration=1e3*p||2e3,this.version=function(){return"1.3.1"},this.printValue=function(k){var v=isNaN(k)?"--":e.formatNumber(k);e.d.tagName=="INPUT"?this.d.value=v:this.d.innerHTML=v},this.easeOutExpo=function(k,v,b,S){return 1024*b*(-Math.pow(2,-10*k/S)+1)/1023+v},this.count=function(k){e.startTime===null&&(e.startTime=k),e.timestamp=k;var v=k-e.startTime;if(e.remaining=e.duration-v,e.options.useEasing)if(e.countDown){var b=e.easeOutExpo(v,0,e.startVal-e.endVal,e.duration);e.frameVal=e.startVal-b}else e.frameVal=e.easeOutExpo(v,e.startVal,e.endVal-e.startVal,e.duration);else if(e.countDown){var b=(e.startVal-e.endVal)*(v/e.duration);e.frameVal=e.startVal-b}else e.frameVal=e.startVal+(e.endVal-e.startVal)*(v/e.duration);e.frameVal=e.countDown?e.frameVal<e.endVal?e.endVal:e.frameVal:e.frameVal>e.endVal?e.endVal:e.frameVal,e.frameVal=Math.round(e.frameVal*e.dec)/e.dec,e.printValue(e.frameVal),v<e.duration?e.rAF=requestAnimationFrame(e.count):e.callback!=null&&e.callback()},this.start=function(k){return e.callback=k,isNaN(e.endVal)||isNaN(e.startVal)?(console.log("countUp error: startVal or endVal is not a number"),e.printValue()):e.rAF=requestAnimationFrame(e.count),!1},this.stop=function(){cancelAnimationFrame(e.rAF)},this.reset=function(){e.startTime=null,e.startVal=o,cancelAnimationFrame(e.rAF),e.printValue(e.startVal)},this.resume=function(){e.stop(),e.startTime=null,e.duration=e.remaining,e.startVal=e.frameVal,requestAnimationFrame(e.count)},this.formatNumber=function(k){k=k.toFixed(e.decimals),k+="";var v,b,S,s;if(v=k.split("."),b=v[0],S=v.length>1?e.options.decimal+v[1]:"",s=/(\d+)(\d{3})/,e.options.useGrouping)for(;s.test(b);)b=b.replace(s,"$1"+e.options.separator+"$2");return e.options.prefix+b+S+e.options.suffix},e.printValue(e.startVal)}/*! perfect-scrollbar - v0.5.8
* http://noraesae.github.com/perfect-scrollbar/
* Copyright (c) 2014 Hyunje Alex Jun; Licensed MIT */(function(i){"use strict";typeof define=="function"&&define.amd?define(["jquery"],i):i(typeof exports=="object"?require("jquery"):jQuery)})(function(i){"use strict";function o(x){return typeof x=="string"?parseInt(x,10):~~x}var n={wheelSpeed:1,wheelPropagation:!1,swipePropagation:!0,minScrollbarLength:null,maxScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0,includePadding:!1},y=0,p=function(){var x=y++;return function(C){var f=".perfect-scrollbar-"+x;return C===void 0?f:C+f}},V="WebkitAppearance"in document.documentElement.style;i.fn.perfectScrollbar=function(x,C){return this.each(function(){function f(m,w){var h=m+w,l=D-L;W=0>h?0:h>l?l:h;var r=o(W*(I-D)/(D-L));t.scrollTop(r)}function e(m,w){var h=m+w,l=A-_;B=0>h?0:h>l?l:h;var r=o(B*(u-A)/(A-_));t.scrollLeft(r)}function k(m){return T.minScrollbarLength&&(m=Math.max(m,T.minScrollbarLength)),T.maxScrollbarLength&&(m=Math.min(m,T.maxScrollbarLength)),m}function v(){var m={width:J};m.left=G?t.scrollLeft()+A-u:t.scrollLeft(),ft?m.bottom=it-t.scrollTop():m.top=yt+t.scrollTop(),E.css(m);var w={top:t.scrollTop(),height:O};dt?w.right=G?u-t.scrollLeft()-lt-Z.outerWidth():lt-t.scrollLeft():w.left=G?t.scrollLeft()+2*A-u-ht-Z.outerWidth():ht+t.scrollLeft(),M.css(w),R.css({left:B,width:_-Tt}),Z.css({top:W,height:L-St})}function b(){t.removeClass("ps-active-x"),t.removeClass("ps-active-y"),A=T.includePadding?t.innerWidth():t.width(),D=T.includePadding?t.innerHeight():t.height(),u=t.prop("scrollWidth"),I=t.prop("scrollHeight"),!T.suppressScrollX&&u>A+T.scrollXMarginOffset?(g=!0,J=A-It,_=k(o(J*A/u)),B=o(t.scrollLeft()*(J-_)/(u-A))):(g=!1,_=0,B=0,t.scrollLeft(0)),!T.suppressScrollY&&I>D+T.scrollYMarginOffset?(Y=!0,O=D-zt,L=k(o(O*D/I)),W=o(t.scrollTop()*(O-L)/(I-D))):(Y=!1,L=0,W=0,t.scrollTop(0)),B>=J-_&&(B=J-_),W>=O-L&&(W=O-L),v(),g&&t.addClass("ps-active-x"),Y&&t.addClass("ps-active-y")}function S(){var m,w,h=function(r){e(m,r.pageX-w),b(),r.stopPropagation(),r.preventDefault()},l=function(){E.removeClass("in-scrolling"),i(F).unbind(d("mousemove"),h)};R.bind(d("mousedown"),function(r){w=r.pageX,m=R.position().left,E.addClass("in-scrolling"),i(F).bind(d("mousemove"),h),i(F).one(d("mouseup"),l),r.stopPropagation(),r.preventDefault()}),m=w=null}function s(){var m,w,h=function(r){f(m,r.pageY-w),b(),r.stopPropagation(),r.preventDefault()},l=function(){M.removeClass("in-scrolling"),i(F).unbind(d("mousemove"),h)};Z.bind(d("mousedown"),function(r){w=r.pageY,m=Z.position().top,M.addClass("in-scrolling"),i(F).bind(d("mousemove"),h),i(F).one(d("mouseup"),l),r.stopPropagation(),r.preventDefault()}),m=w=null}function a(m,w){var h=t.scrollTop();if(m===0){if(!Y)return!1;if(h===0&&w>0||h>=I-D&&0>w)return!T.wheelPropagation}var l=t.scrollLeft();if(w===0){if(!g)return!1;if(l===0&&0>m||l>=u-A&&m>0)return!T.wheelPropagation}return!0}function q(m,w){var h=t.scrollTop(),l=t.scrollLeft(),r=Math.abs(m),c=Math.abs(w);if(c>r){if(0>w&&h===I-D||w>0&&h===0)return!T.swipePropagation}else if(r>c&&(0>m&&l===u-A||m>0&&l===0))return!T.swipePropagation;return!0}function nt(){function m(l){var r=l.originalEvent.deltaX,c=-1*l.originalEvent.deltaY;return(r===void 0||c===void 0)&&(r=-1*l.originalEvent.wheelDeltaX/6,c=l.originalEvent.wheelDeltaY/6),l.originalEvent.deltaMode&&l.originalEvent.deltaMode===1&&(r*=10,c*=10),r!==r&&c!==c&&(r=0,c=l.originalEvent.wheelDelta),[r,c]}function w(l){if(V||!(t.find("select:focus").length>0)){var r=m(l),c=r[0],j=r[1];h=!1,T.useBothWheelAxes?Y&&!g?(j?t.scrollTop(t.scrollTop()-j*T.wheelSpeed):t.scrollTop(t.scrollTop()+c*T.wheelSpeed),h=!0):g&&!Y&&(c?t.scrollLeft(t.scrollLeft()+c*T.wheelSpeed):t.scrollLeft(t.scrollLeft()-j*T.wheelSpeed),h=!0):(t.scrollTop(t.scrollTop()-j*T.wheelSpeed),t.scrollLeft(t.scrollLeft()+c*T.wheelSpeed)),b(),h=h||a(c,j),h&&(l.stopPropagation(),l.preventDefault())}}var h=!1;window.onwheel!==void 0?t.bind(d("wheel"),w):window.onmousewheel!==void 0&&t.bind(d("mousewheel"),w)}function rt(){var m=!1;t.bind(d("mouseenter"),function(){m=!0}),t.bind(d("mouseleave"),function(){m=!1});var w=!1;i(F).bind(d("keydown"),function(h){if((!h.isDefaultPrevented||!h.isDefaultPrevented())&&m){for(var l=document.activeElement?document.activeElement:F.activeElement;l.shadowRoot;)l=l.shadowRoot.activeElement;if(!i(l).is(":input,[contenteditable]")){var r=0,c=0;switch(h.which){case 37:r=-30;break;case 38:c=30;break;case 39:r=30;break;case 40:c=-30;break;case 33:c=90;break;case 32:case 34:c=-90;break;case 35:c=h.ctrlKey?-I:-D;break;case 36:c=h.ctrlKey?t.scrollTop():D;break;default:return}t.scrollTop(t.scrollTop()-c),t.scrollLeft(t.scrollLeft()+r),w=a(r,c),w&&h.preventDefault()}}})}function X(){function m(w){w.stopPropagation()}Z.bind(d("click"),m),M.bind(d("click"),function(w){var h=o(L/2),l=w.pageY-M.offset().top-h,r=D-L,c=l/r;0>c?c=0:c>1&&(c=1),t.scrollTop((I-D)*c)}),R.bind(d("click"),m),E.bind(d("click"),function(w){var h=o(_/2),l=w.pageX-E.offset().left-h,r=A-_,c=l/r;0>c?c=0:c>1&&(c=1),t.scrollLeft((u-A)*c)})}function et(){function m(){var j=window.getSelection?window.getSelection():document.getSlection?document.getSlection():{rangeCount:0};return j.rangeCount===0?null:j.getRangeAt(0).commonAncestorContainer}function w(){l||(l=setInterval(function(){return st()?(t.scrollTop(t.scrollTop()+r.top),t.scrollLeft(t.scrollLeft()+r.left),b(),void 0):(clearInterval(l),void 0)},50))}function h(){l&&(clearInterval(l),l=null),E.removeClass("in-scrolling"),M.removeClass("in-scrolling")}var l=null,r={top:0,left:0},c=!1;i(F).bind(d("selectionchange"),function(){i.contains(t[0],m())?c=!0:(c=!1,h())}),i(window).bind(d("mouseup"),function(){c&&(c=!1,h())}),i(window).bind(d("mousemove"),function(j){if(c){var U={x:j.pageX,y:j.pageY},$=t.offset(),K={left:$.left,right:$.left+t.outerWidth(),top:$.top,bottom:$.top+t.outerHeight()};U.x<K.left+3?(r.left=-5,E.addClass("in-scrolling")):U.x>K.right-3?(r.left=5,E.addClass("in-scrolling")):r.left=0,U.y<K.top+3?(r.top=5>K.top+3-U.y?-5:-20,M.addClass("in-scrolling")):U.y>K.bottom-3?(r.top=5>U.y-K.bottom+3?5:20,M.addClass("in-scrolling")):r.top=0,r.top===0&&r.left===0?h():w()}})}function z(m,w){function h(P,N){t.scrollTop(t.scrollTop()-N),t.scrollLeft(t.scrollLeft()-P),b()}function l(){ut=!0}function r(){ut=!1}function c(P){return P.originalEvent.targetTouches?P.originalEvent.targetTouches[0]:P.originalEvent}function j(P){var N=P.originalEvent;return N.targetTouches&&N.targetTouches.length===1?!0:!!(N.pointerType&&N.pointerType!=="mouse"&&N.pointerType!==N.MSPOINTER_TYPE_MOUSE)}function U(P){if(j(P)){pt=!0;var N=c(P);ct.pageX=N.pageX,ct.pageY=N.pageY,mt=new Date().getTime(),at!==null&&clearInterval(at),P.stopPropagation()}}function $(P){if(!ut&&pt&&j(P)){var N=c(P),vt={pageX:N.pageX,pageY:N.pageY},wt=vt.pageX-ct.pageX,gt=vt.pageY-ct.pageY;h(wt,gt),ct=vt;var kt=new Date().getTime(),bt=kt-mt;bt>0&&(tt.x=wt/bt,tt.y=gt/bt,mt=kt),q(wt,gt)&&(P.stopPropagation(),P.preventDefault())}}function K(){!ut&&pt&&(pt=!1,clearInterval(at),at=setInterval(function(){return st()?.01>Math.abs(tt.x)&&.01>Math.abs(tt.y)?(clearInterval(at),void 0):(h(30*tt.x,30*tt.y),tt.x*=.8,tt.y*=.8,void 0):(clearInterval(at),void 0)},10))}var ct={},mt=0,tt={},at=null,ut=!1,pt=!1;m&&(i(window).bind(d("touchstart"),l),i(window).bind(d("touchend"),r),t.bind(d("touchstart"),U),t.bind(d("touchmove"),$),t.bind(d("touchend"),K)),w&&(window.PointerEvent?(i(window).bind(d("pointerdown"),l),i(window).bind(d("pointerup"),r),t.bind(d("pointerdown"),U),t.bind(d("pointermove"),$),t.bind(d("pointerup"),K)):window.MSPointerEvent&&(i(window).bind(d("MSPointerDown"),l),i(window).bind(d("MSPointerUp"),r),t.bind(d("MSPointerDown"),U),t.bind(d("MSPointerMove"),$),t.bind(d("MSPointerUp"),K)))}function H(){t.bind(d("scroll"),function(){b()})}function ot(){t.unbind(d()),i(window).unbind(d()),i(F).unbind(d()),t.data("perfect-scrollbar",null),t.data("perfect-scrollbar-update",null),t.data("perfect-scrollbar-destroy",null),R.remove(),Z.remove(),E.remove(),M.remove(),t=E=M=R=Z=g=Y=A=D=u=I=_=B=it=ft=yt=L=W=lt=dt=ht=G=d=null}function Q(){b(),H(),S(),s(),X(),et(),nt(),(xt||Vt)&&z(xt,Vt),T.useKeyboard&&rt(),t.data("perfect-scrollbar",t),t.data("perfect-scrollbar-update",b),t.data("perfect-scrollbar-destroy",ot)}var T=i.extend(!0,{},n),t=i(this),st=function(){return!!t};if(typeof x=="object"?i.extend(!0,T,x):C=x,C==="update")return t.data("perfect-scrollbar-update")&&t.data("perfect-scrollbar-update")(),t;if(C==="destroy")return t.data("perfect-scrollbar-destroy")&&t.data("perfect-scrollbar-destroy")(),t;if(t.data("perfect-scrollbar"))return t.data("perfect-scrollbar");t.addClass("ps-container");var A,D,u,I,g,_,B,J,Y,L,W,O,G=t.css("direction")==="rtl",d=p(),F=this.ownerDocument||document,E=i("<div class='ps-scrollbar-x-rail'>").appendTo(t),R=i("<div class='ps-scrollbar-x'>").appendTo(E),it=o(E.css("bottom")),ft=it===it,yt=ft?null:o(E.css("top")),Tt=o(E.css("borderLeftWidth"))+o(E.css("borderRightWidth")),It=o(E.css("marginLeft"))+o(E.css("marginRight")),M=i("<div class='ps-scrollbar-y-rail'>").appendTo(t),Z=i("<div class='ps-scrollbar-y'>").appendTo(M),lt=o(M.css("right")),dt=lt===lt,ht=dt?null:o(M.css("left")),St=o(M.css("borderTopWidth"))+o(M.css("borderBottomWidth")),zt=o(M.css("marginTop"))+o(M.css("marginBottom")),xt="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,Vt=window.navigator.msMaxTouchPoints!==null;return Q(),t})}});/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */(function(i){i.fn.hoverIntent=function(o,n,y){var p={interval:100,sensitivity:6,timeout:0};typeof o=="object"?p=i.extend(p,o):i.isFunction(n)?p=i.extend(p,{over:o,out:n,selector:y}):p=i.extend(p,{over:o,out:o,selector:n});var V,x,C,f,e=function(S){V=S.pageX,x=S.pageY},k=function(S,s){if(s.hoverIntent_t=clearTimeout(s.hoverIntent_t),Math.sqrt((C-V)*(C-V)+(f-x)*(f-x))<p.sensitivity)return i(s).off("mousemove.hoverIntent",e),s.hoverIntent_s=!0,p.over.apply(s,[S]);C=V,f=x,s.hoverIntent_t=setTimeout(function(){k(S,s)},p.interval)},v=function(S,s){return s.hoverIntent_t=clearTimeout(s.hoverIntent_t),s.hoverIntent_s=!1,p.out.apply(s,[S])},b=function(S){var s=i.extend({},S),a=this;a.hoverIntent_t&&(a.hoverIntent_t=clearTimeout(a.hoverIntent_t)),S.type==="mouseenter"?(C=s.pageX,f=s.pageY,i(a).on("mousemove.hoverIntent",e),a.hoverIntent_s||(a.hoverIntent_t=setTimeout(function(){k(s,a)},p.interval))):(i(a).off("mousemove.hoverIntent",e),a.hoverIntent_s&&(a.hoverIntent_t=setTimeout(function(){v(s,a)},p.timeout)))};return this.on({"mouseenter.hoverIntent":b,"mouseleave.hoverIntent":b},p.selector)}})(jQuery);/*! Cookies.js - 0.4.0; Copyright (c) 2014, Scott Hamper; http://www.opensource.org/licenses/MIT */(function(i){"use strict";var o=function(n,y,p){return arguments.length===1?o.get(n):o.set(n,y,p)};o._document=document,o._navigator=navigator,o.defaults={path:"/"},o.get=function(n){return o._cachedDocumentCookie!==o._document.cookie&&o._renewCache(),o._cache[n]},o.set=function(n,y,p){return p=o._getExtendedOptions(p),p.expires=o._getExpiresDate(y===i?-1:p.expires),o._document.cookie=o._generateCookieString(n,y,p),o},o.expire=function(n,y){return o.set(n,i,y)},o._getExtendedOptions=function(n){return{path:n&&n.path||o.defaults.path,domain:n&&n.domain||o.defaults.domain,expires:n&&n.expires||o.defaults.expires,secure:n&&n.secure!==i?n.secure:o.defaults.secure}},o._isValidDate=function(n){return Object.prototype.toString.call(n)==="[object Date]"&&!isNaN(n.getTime())},o._getExpiresDate=function(n,y){switch(y=y||new Date,typeof n){case"number":n=new Date(y.getTime()+1e3*n);break;case"string":n=new Date(n)}if(n&&!o._isValidDate(n))throw Error("`expires` parameter cannot be converted to a valid Date instance");return n},o._generateCookieString=function(n,y,p){return n=n.replace(/[^#$&+\^`|]/g,encodeURIComponent),n=n.replace(/\(/g,"%28").replace(/\)/g,"%29"),y=(y+"").replace(/[^!#$&-+\--:<-\[\]-~]/g,encodeURIComponent),p=p||{},n=n+"="+y+(p.path?";path="+p.path:""),n+=p.domain?";domain="+p.domain:"",n+=p.expires?";expires="+p.expires.toUTCString():"",n+=p.secure?";secure":""},o._getCookieObjectFromString=function(n){var y={};n=n?n.split("; "):[];for(var p=0;p<n.length;p++){var V=o._getKeyValuePairFromCookieString(n[p]);y[V.key]===i&&(y[V.key]=V.value)}return y},o._getKeyValuePairFromCookieString=function(n){var y=n.indexOf("="),y=0>y?n.length:y;return{key:decodeURIComponent(n.substr(0,y)),value:decodeURIComponent(n.substr(y+1))}},o._renewCache=function(){o._cache=o._getCookieObjectFromString(o._document.cookie),o._cachedDocumentCookie=o._document.cookie},o._areEnabled=function(){var n=o.set("cookies.js",1).get("cookies.js")==="1";return o.expire("cookies.js"),n},o.enabled=o._areEnabled(),typeof define=="function"&&define.amd?define(function(){return o}):typeof exports<"u"?(typeof module<"u"&&module.exports&&(exports=module.exports=o),exports.Cookies=o):window.Cookies=o})();
