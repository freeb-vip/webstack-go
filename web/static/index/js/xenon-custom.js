var public_vars=public_vars||{};(function(t,f,p){"use strict";t(document).ready(function(){if(public_vars.$body=t("body"),public_vars.$pageContainer=public_vars.$body.find(".page-container"),public_vars.$chat=public_vars.$pageContainer.find("#chat"),public_vars.$sidebarMenu=public_vars.$pageContainer.find(".sidebar-menu"),public_vars.$sidebarProfile=public_vars.$sidebarMenu.find(".sidebar-user-info"),public_vars.$mainMenu=public_vars.$sidebarMenu.find(".main-menu"),public_vars.$horizontalNavbar=public_vars.$body.find(".navbar.horizontal-menu"),public_vars.$horizontalMenu=public_vars.$horizontalNavbar.find(".navbar-nav"),public_vars.$mainContent=public_vars.$pageContainer.find(".main-content"),public_vars.$mainFooter=public_vars.$body.find("footer.main-footer"),public_vars.$userInfoMenuHor=public_vars.$body.find(".navbar.horizontal-menu"),public_vars.$userInfoMenu=public_vars.$body.find("nav.navbar.user-info-navbar"),public_vars.$settingsPane=public_vars.$body.find(".settings-pane"),public_vars.$settingsPaneIn=public_vars.$settingsPane.find(".settings-pane-inner"),public_vars.wheelPropagation=!0,public_vars.$pageLoadingOverlay=public_vars.$body.find(".page-loading-overlay"),public_vars.defaultColorsPalette=["#68b828","#7c38bc","#0e62c7","#fcd036","#4fcdfc","#00b19d","#ff6264","#f7aa47"],public_vars.$pageLoadingOverlay.length&&t(f).load(function(){public_vars.$pageLoadingOverlay.addClass("loaded")}),f.onerror=function(){public_vars.$pageLoadingOverlay.addClass("loaded")},setup_sidebar_menu(),setup_horizontal_menu(),public_vars.$mainFooter.hasClass("sticky")&&(stickFooterToBottom(),t(f).on("xenon.resized",stickFooterToBottom)),t.isFunction(t.fn.perfectScrollbar)){public_vars.$sidebarMenu.hasClass("fixed")&&ps_init(),t(".ps-scrollbar").each(function(c,n){var e=t(n);e.hasClass("ps-scroll-down")&&e.scrollTop(e.prop("scrollHeight")),e.perfectScrollbar({wheelPropagation:!1})});var a=public_vars.$pageContainer.find("#chat .chat-inner");a.parent().hasClass("fixed")&&a.css({maxHeight:t(f).height()}).perfectScrollbar(),t(".dropdown:has(.ps-scrollbar)").each(function(c,n){var e=t(this).find(".ps-scrollbar");t(this).on("click",'[data-toggle="dropdown"]',function(i){i.preventDefault(),setTimeout(function(){e.perfectScrollbar("update")},1)})}),t("div.scrollable").each(function(c,n){var e=t(n),i=parseInt(attrDefault(e,"max-height",200),10);i=i<0?200:i,e.css({maxHeight:i}).perfectScrollbar({wheelPropagation:!0})})}var y=t(".user-info-menu .search-form, .nav.navbar-right .search-form");if(y.each(function(c,n){var e=t(n).find(".form-control");t(n).on("click",".btn",function(i){if(e.val().trim().length==0)return jQuery(n).addClass("focused"),setTimeout(function(){e.focus()},100),!1}),e.on("blur",function(){jQuery(n).removeClass("focused")})}),public_vars.$mainFooter.hasClass("fixed")&&public_vars.$mainContent.css({paddingBottom:public_vars.$mainFooter.outerHeight(!0)}),t("body").on("click",'a[rel="go-top"]',function(c){c.preventDefault();var n={pos:t(f).scrollTop()};TweenLite.to(n,.3,{pos:0,ease:Power4.easeOut,onUpdate:function(){t(f).scrollTop(n.pos)}})}),public_vars.$userInfoMenu.length&&public_vars.$userInfoMenu.find(".user-info-menu > li").css({minHeight:public_vars.$userInfoMenu.outerHeight()-1}),t.isFunction(t.fn.autosize)&&t(".autosize, .autogrow").autosize(),cbr_replace(),t(".breadcrumb.auto-hidden").each(function(c,n){var e=t(n),i=e.find("li a"),r=i.width(),o=0;i.each(function(s,l){var h=t(l);o=h.outerWidth(!0)+5,h.addClass("collapsed").width(o),h.hover(function(){h.removeClass("collapsed")},function(){h.addClass("collapsed")})})}),t(f).on("keydown",function(c){c.keyCode==27&&public_vars.$body.hasClass("modal-open")&&t(".modal-open .modal:visible").modal("hide")}),t(".input-group.input-group-minimal:has(.form-control)").each(function(c,n){var e=t(n),i=e.find(".form-control");i.on("focus",function(){e.addClass("focused")}).on("blur",function(){e.removeClass("focused")})}),t(".input-group.spinner").each(function(c,n){var e=t(n),i=e.find('[data-type="decrement"]'),r=e.find('[data-type="increment"]'),o=e.find(".form-control"),s=attrDefault(e,"step",1),l=attrDefault(e,"min",0),h=attrDefault(e,"max",0),v=l<h;i.on("click",function(g){g.preventDefault();var b=new Number(o.val())-s;v&&b<=l&&(b=l),o.val(b)}),r.on("click",function(g){g.preventDefault();var b=new Number(o.val())+s;v&&b>=h&&(b=h),o.val(b)})}),t.isFunction(t.fn.select2)&&(t(".select2").each(function(c,n){var e=t(n),i={allowClear:attrDefault(e,"allowClear",!1)};e.select2(i),e.addClass("visible")}),t.isFunction(t.fn.niceScroll)&&t(".select2-results").niceScroll({cursorcolor:"#d4d4d4",cursorborder:"1px solid #ccc",railpadding:{right:3}})),t.isFunction(t.fn.selectBoxIt)&&t("select.selectboxit").each(function(c,n){var e=t(n),i={showFirstOption:attrDefault(e,"first-option",!0),native:attrDefault(e,"native",!1),defaultText:attrDefault(e,"text","")};e.addClass("visible"),e.selectBoxIt(i)}),t.isFunction(t.fn.datepicker)&&t(".datepicker").each(function(c,n){var e=t(n),i={format:attrDefault(e,"format","mm/dd/yyyy"),startDate:attrDefault(e,"startDate",""),endDate:attrDefault(e,"endDate",""),daysOfWeekDisabled:attrDefault(e,"disabledDays",""),startView:attrDefault(e,"startView",0),rtl:rtl()},r=e.next(),o=e.prev();e.datepicker(i),r.is(".input-group-addon")&&r.has("a")&&r.on("click",function(s){s.preventDefault(),e.datepicker("show")}),o.is(".input-group-addon")&&o.has("a")&&o.on("click",function(s){s.preventDefault(),e.datepicker("show")})}),t.isFunction(t.fn.daterangepicker)&&t(".daterange").each(function(c,n){var e={Today:[moment(),moment()],Yesterday:[moment().subtract("days",1),moment().subtract("days",1)],"Last 7 Days":[moment().subtract("days",6),moment()],"Last 30 Days":[moment().subtract("days",29),moment()],"This Month":[moment().startOf("month"),moment().endOf("month")],"Last Month":[moment().subtract("month",1).startOf("month"),moment().subtract("month",1).endOf("month")]},i=t(n),r={format:attrDefault(i,"format","MM/DD/YYYY"),timePicker:attrDefault(i,"timePicker",!1),timePickerIncrement:attrDefault(i,"timePickerIncrement",!1),separator:attrDefault(i,"separator"," - ")},o=attrDefault(i,"minDate",""),s=attrDefault(i,"maxDate",""),l=attrDefault(i,"startDate",""),h=attrDefault(i,"endDate","");i.hasClass("add-ranges")&&(r.ranges=e),o.length&&(r.minDate=o),s.length&&(r.maxDate=s),l.length&&(r.startDate=l),h.length&&(r.endDate=h),i.daterangepicker(r,function(v,g){var b=i.data("daterangepicker");i.is("[data-callback]")&&callback_test(v,g),i.hasClass("daterange-inline")&&i.find("span").html(v.format(b.format)+b.separator+g.format(b.format))}),typeof r.ranges=="object"&&i.data("daterangepicker").container.removeClass("show-calendar")}),t.isFunction(t.fn.timepicker)&&t(".timepicker").each(function(c,n){var e=t(n),i={template:attrDefault(e,"template",!1),showSeconds:attrDefault(e,"showSeconds",!1),defaultTime:attrDefault(e,"defaultTime","current"),showMeridian:attrDefault(e,"showMeridian",!0),minuteStep:attrDefault(e,"minuteStep",15),secondStep:attrDefault(e,"secondStep",15)},r=e.next(),o=e.prev();e.timepicker(i),r.is(".input-group-addon")&&r.has("a")&&r.on("click",function(s){s.preventDefault(),e.timepicker("showWidget")}),o.is(".input-group-addon")&&o.has("a")&&o.on("click",function(s){s.preventDefault(),e.timepicker("showWidget")})}),t.isFunction(t.fn.colorpicker)&&t(".colorpicker").each(function(c,n){var e=t(n),i={},r=e.next(),o=e.prev(),s=e.siblings(".input-group-addon").find(".color-preview");e.colorpicker(i),r.is(".input-group-addon")&&r.has("a")&&r.on("click",function(l){l.preventDefault(),e.colorpicker("show")}),o.is(".input-group-addon")&&o.has("a")&&o.on("click",function(l){l.preventDefault(),e.colorpicker("show")}),s.length&&(e.on("changeColor",function(l){s.css("background-color",l.color.toHex())}),e.val().length&&s.css("background-color",e.val()))}),t.isFunction(t.fn.validate)&&t("form.validate").each(function(c,n){var e=t(n),i={rules:{},messages:{},errorElement:"span",errorClass:"validate-has-error",highlight:function(o){t(o).closest(".form-group").addClass("validate-has-error")},unhighlight:function(o){t(o).closest(".form-group").removeClass("validate-has-error")},errorPlacement:function(o,s){s.closest(".has-switch").length?o.insertAfter(s.closest(".has-switch")):s.parent(".checkbox, .radio").length||s.parent(".input-group").length?o.insertAfter(s.parent()):o.insertAfter(s)}},r=e.find("[data-validate]");r.each(function(o,s){var l=t(s),h=l.attr("name"),v=attrDefault(l,"validate","").toString(),g=v.split(",");for(var b in g){var _=g[b],k,x;typeof i.rules[h]>"u"&&(i.rules[h]={},i.messages[h]={}),t.inArray(_,["required","url","email","number","date","creditcard"])!=-1?(i.rules[h][_]=!0,x=l.data("message-"+_),x&&(i.messages[h][_]=x)):(k=_.match(/(\w+)\[(.*?)\]/i))&&t.inArray(k[1],["min","max","minlength","maxlength","equalTo"])!=-1&&(i.rules[h][k[1]]=k[2],x=l.data("message-"+k[1]),x&&(i.messages[h][k[1]]=x))}}),e.validate(i)}),t.isFunction(t.fn.inputmask)&&t("[data-mask]").each(function(c,n){var e=t(n),i=e.data("mask").toString(),r={numericInput:attrDefault(e,"numeric",!1),radixPoint:attrDefault(e,"radixPoint",""),rightAlign:attrDefault(e,"numericAlign","left")=="right"},o=attrDefault(e,"placeholder",""),s=attrDefault(e,"isRegex","");switch(o.length&&(r[o]=o),i.toLowerCase()){case"phone":i="(999) 999-9999";break;case"currency":case"rcurrency":var l=attrDefault(e,"sign","$");i="999,999,999.99",e.data("mask").toLowerCase()=="rcurrency"?i+=" "+l:i=l+" "+i,r.numericInput=!0,r.rightAlignNumerics=!1,r.radixPoint=".";break;case"email":i="Regex",r.regex="[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}";break;case"fdecimal":i="decimal",t.extend(r,{autoGroup:!0,groupSize:3,radixPoint:attrDefault(e,"rad","."),groupSeparator:attrDefault(e,"dec",",")})}s&&(r.regex=i,i="Regex"),e.inputmask(i,r)}),t.isFunction(t.fn.bootstrapWizard)&&t(".form-wizard").each(function(c,n){var e=t(n),i=e.find("> .tabs > li"),r=e.find(".progress-indicator"),o=e.find("> ul > li.active").index(),s=function(l,h,v){if(e.hasClass("validate")){var g=e.valid();if(!g)return e.data("validator").focusInvalid(),!1}return!0};o>0&&(r.css({width:o/i.length*100+"%"}),i.removeClass("completed").slice(0,o).addClass("completed")),e.bootstrapWizard({tabClass:"",onTabShow:function(l,h,v){var g=i.eq(v).position().left/i.parent().width()*100;i.removeClass("completed").slice(0,v).addClass("completed"),r.css({width:g+"%"})},onNext:s,onTabClick:s}),e.data("bootstrapWizard").show(o),e.find(".pager a").on("click",function(l){l.preventDefault()})}),t.isFunction(t.fn.slider)&&t(".slider").each(function(c,n){var e=t(n),i=t('<span class="ui-label"></span>'),r=i.clone(),o=attrDefault(e,"vertical",0)!=0?"vertical":"horizontal",s=attrDefault(e,"prefix",""),l=attrDefault(e,"postfix",""),h=attrDefault(e,"fill",""),v=t(h),g=attrDefault(e,"step",1),b=attrDefault(e,"value",5),_=attrDefault(e,"min",0),k=attrDefault(e,"max",100),x=attrDefault(e,"min-val",10),F=attrDefault(e,"max-val",90),S=e.is("[data-min-val]")||e.is("[data-max-val]"),M=0;if(S){e.slider({range:!0,orientation:o,min:_,max:k,values:[x,F],step:g,slide:function(z,D){var w=(s||"")+D.values[0]+(l||""),C=(s||"")+D.values[1]+(l||"");i.html(w),r.html(C),h&&v.val(w+","+C),M++},change:function(z,D){if(M==1){var w=(s||"")+D.values[0]+(l||""),C=(s||"")+D.values[1]+(l||"");i.html(w),r.html(C),h&&v.val(w+","+C)}M=0}});var T=e.find(".ui-slider-handle");i.html((s||"")+x+(l||"")),T.first().append(i),r.html((s||"")+F+(l||"")),T.last().append(r)}else{e.slider({range:attrDefault(e,"basic",0)?!1:"min",orientation:o,min:_,max:k,value:b,step:g,slide:function(D,w){var C=(s||"")+w.value+(l||"");i.html(C),h&&v.val(C),M++},change:function(D,w){if(M==1){var C=(s||"")+w.value+(l||"");i.html(C),h&&v.val(C)}M=0}});var T=e.find(".ui-slider-handle");i.html((s||"")+b+(l||"")),T.html(i)}}),t.isFunction(t.fn.knob)&&t(".knob").knob({change:function(c){},release:function(c){},cancel:function(){},draw:function(){if(this.$.data("skin")=="tron"){var c=this.angle(this.cv),n=this.startAngle,e=this.startAngle,i,r=e+c,o=1;return this.g.lineWidth=this.lineWidth,this.o.cursor&&(e=r-.3)&&(r=r+.3),this.o.displayPrevious&&(i=this.startAngle+this.angle(this.v),this.o.cursor&&(n=i-.3)&&(i=i+.3),this.g.beginPath(),this.g.strokeStyle=this.pColor,this.g.arc(this.xy,this.xy,this.radius-this.lineWidth,n,i,!1),this.g.stroke()),this.g.beginPath(),this.g.strokeStyle=o?this.o.fgColor:this.fgColor,this.g.arc(this.xy,this.xy,this.radius-this.lineWidth,e,r,!1),this.g.stroke(),this.g.lineWidth=2,this.g.beginPath(),this.g.strokeStyle=this.o.fgColor,this.g.arc(this.xy,this.xy,this.radius-this.lineWidth+1+this.lineWidth*2/3,0,2*Math.PI,!1),this.g.stroke(),!1}}}),t.isFunction(t.fn.wysihtml5)&&t(".wysihtml5").each(function(c,n){var e=t(n),i=attrDefault(e,"stylesheet-url","");t(".wysihtml5").wysihtml5({size:"white",stylesheets:i.split(","),html:attrDefault(e,"html",!0),color:attrDefault(e,"colors",!0)})}),t.isFunction(t.fn.ckeditor)&&t(".ckeditor").ckeditor({contentsLangDirection:rtl()?"rtl":"ltr"}),typeof Dropzone<"u"&&(Dropzone.autoDiscover=!1,t(".dropzone[action]").each(function(c,n){t(n).dropzone()})),t.isFunction(t.fn.tocify)&&t("#toc").length){t("#toc").tocify({context:".tocify-content",selectors:"h2,h3,h4,h5"});var u=t(".tocify"),m=scrollMonitor.create(u.get(0));u.width(u.parent().width()),m.lock(),m.stateChange(function(){t(u.get(0)).toggleClass("fixed",this.isAboveViewport)})}t(".login-form .form-group:has(label)").each(function(c,n){var e=t(n),i=e.find("label"),r=e.find(".form-control");r.on("focus",function(){e.addClass("is-focused")}),r.on("keydown",function(){e.addClass("is-focused")}),r.on("blur",function(){e.removeClass("is-focused"),r.val().trim().length>0&&e.addClass("is-focused")}),i.on("click",function(){r.focus()}),r.val().trim().length>0&&e.addClass("is-focused")})});var d=0;t(f).resize(function(){clearTimeout(d),d=setTimeout(trigger_resizable,200)})})(jQuery,window);var sm_duration=.2,sm_transition_delay=150;function setup_sidebar_menu(){if(public_vars.$sidebarMenu.length){var t=public_vars.$sidebarMenu.find("li:has(> ul)"),f=public_vars.$sidebarMenu.hasClass("toggle-others");t.filter(".active").addClass("expanded"),is("largescreen")&&public_vars.$sidebarMenu.hasClass("collapsed")==!1&&$(window).on("resize",function(){is("tabletscreen")?(public_vars.$sidebarMenu.addClass("collapsed"),ps_destroy()):is("largescreen")&&(public_vars.$sidebarMenu.removeClass("collapsed"),ps_init())}),t.each(function(p,d){var a=jQuery(d),y=a.children("a"),u=a.children("ul");a.addClass("has-sub"),y.on("click",function(m){m.preventDefault(),f&&sidebar_menu_close_items_siblings(a),a.hasClass("expanded")||a.hasClass("opened")?sidebar_menu_item_collapse(a,u):sidebar_menu_item_expand(a,u)})})}}function sidebar_menu_item_expand(t,f){if(!(t.data("is-busy")||t.parent(".main-menu").length&&public_vars.$sidebarMenu.hasClass("collapsed"))){t.addClass("expanded").data("is-busy",!0),f.show();var p=f.children(),d=f.outerHeight(),a=jQuery(window).height(),y=t.outerHeight(),u=public_vars.$sidebarMenu.scrollTop(),m=t.position().top+u,c=public_vars.$sidebarMenu.hasClass("fit-in-viewport");p.addClass("is-hidden"),f.height(0),TweenMax.to(f,sm_duration,{css:{height:d},onUpdate:ps_update,onComplete:function(){f.height("")}});var n=t.data("sub_i_1"),e=t.data("sub_i_2");window.clearTimeout(n),n=setTimeout(function(){p.each(function(s,l){var h=jQuery(l);h.addClass("is-shown")});var i=sm_transition_delay*p.length,r=parseFloat(p.eq(0).css("transition-duration")),o=parseFloat(p.last().css("transition-delay"));r&&o&&(i=(r+o)*1e3),window.clearTimeout(e),e=setTimeout(function(){p.removeClass("is-hidden is-shown")},i),t.data("is-busy",!1)},0),t.data("sub_i_1",n),t.data("sub_i_2",e)}}function sidebar_menu_item_collapse(t,f){if(!t.data("is-busy")){var p=f.children();t.removeClass("expanded").data("is-busy",!0),p.addClass("hidden-item"),TweenMax.to(f,sm_duration,{css:{height:0},onUpdate:ps_update,onComplete:function(){t.data("is-busy",!1).removeClass("opened"),f.attr("style","").hide(),p.removeClass("hidden-item"),t.find("li.expanded ul").attr("style","").hide().parent().removeClass("expanded"),ps_update(!0)}})}}function sidebar_menu_close_items_siblings(t){t.siblings().not(t).filter(".expanded, .opened").each(function(f,p){var d=jQuery(p),a=d.children("ul");sidebar_menu_item_collapse(d,a)})}function setup_horizontal_menu(){if(public_vars.$horizontalMenu.length){var t=public_vars.$horizontalMenu.find("li:has(> ul)"),f=public_vars.$horizontalMenu.hasClass("click-to-expand");f&&public_vars.$mainContent.add(public_vars.$sidebarMenu).on("click",function(p){t.removeClass("hover")}),t.each(function(p,d){var a=jQuery(d),y=a.children("a"),u=a.children("ul"),m=a.parent().is(".navbar-nav");a.addClass("has-sub"),y.on("click",function(c){isxs()&&(c.preventDefault(),sidebar_menu_close_items_siblings(a),a.hasClass("expanded")||a.hasClass("opened")?sidebar_menu_item_collapse(a,u):sidebar_menu_item_expand(a,u))}),f?y.on("click",function(c){if(c.preventDefault(),!isxs())if(m)t.filter(function(e,i){return jQuery(i).parent().is(".navbar-nav")}).not(a).removeClass("hover"),a.toggleClass("hover");else{var n;a.hasClass("expanded")==!1?(a.addClass("expanded"),u.addClass("is-visible"),n=u.outerHeight(),u.height(0),TweenLite.to(u,.15,{css:{height:n},ease:Sine.easeInOut,onComplete:function(){u.attr("style","")}}),a.siblings().find("> ul.is-visible").not(u).each(function(e,i){var r=jQuery(i);n=r.outerHeight(),r.removeClass("is-visible").height(n),r.parent().removeClass("expanded"),TweenLite.to(r,.15,{css:{height:0},onComplete:function(){r.attr("style","")}})})):(n=u.outerHeight(),a.removeClass("expanded"),u.removeClass("is-visible").height(n),TweenLite.to(u,.15,{css:{height:0},onComplete:function(){u.attr("style","")}}))}}):a.hoverIntent({over:function(){isxs()||(m?a.addClass("hover"):(u.addClass("is-visible"),sub_height=u.outerHeight(),u.height(0),TweenLite.to(u,.25,{css:{height:sub_height},ease:Sine.easeInOut,onComplete:function(){u.attr("style","")}})))},out:function(){isxs()||(m?a.removeClass("hover"):(sub_height=u.outerHeight(),a.removeClass("expanded"),u.removeClass("is-visible").height(sub_height),TweenLite.to(u,.25,{css:{height:0},onComplete:function(){u.attr("style","")}})))},timeout:200,interval:m?10:100})})}}function stickFooterToBottom(){if(public_vars.$mainFooter.add(public_vars.$mainContent).add(public_vars.$sidebarMenu).attr("style",""),isxs())return!1;if(public_vars.$mainFooter.hasClass("sticky")){var t=jQuery(window).height(),f=public_vars.$mainFooter.outerHeight(!0),p=public_vars.$mainFooter.position().top+f,d=p-f,a=public_vars.$horizontalNavbar.outerHeight();t>p-parseInt(public_vars.$mainFooter.css("marginTop"),10)&&public_vars.$mainFooter.css({marginTop:t-p-a})}}function ps_update(t){if(!isxs()&&jQuery.isFunction(jQuery.fn.perfectScrollbar)){if(public_vars.$sidebarMenu.hasClass("collapsed"))return;public_vars.$sidebarMenu.find(".sidebar-menu-inner").perfectScrollbar("update"),t&&(ps_destroy(),ps_init())}}function ps_init(){if(!isxs()&&jQuery.isFunction(jQuery.fn.perfectScrollbar)){if(public_vars.$sidebarMenu.hasClass("collapsed")||!public_vars.$sidebarMenu.hasClass("fixed"))return;public_vars.$sidebarMenu.find(".sidebar-menu-inner").perfectScrollbar({wheelSpeed:1,wheelPropagation:public_vars.wheelPropagation})}}function ps_destroy(){jQuery.isFunction(jQuery.fn.perfectScrollbar)&&public_vars.$sidebarMenu.find(".sidebar-menu-inner").perfectScrollbar("destroy")}function cbr_replace(){var t=jQuery('input[type="checkbox"].cbr, input[type="radio"].cbr').filter(":not(.cbr-done)"),f='<div class="cbr-replaced"><div class="cbr-input"></div><div class="cbr-state"><span></span></div></div>';t.each(function(p,d){var a=jQuery(d),y=a.is(":radio"),u=a.is(":checkbox"),m=a.is(":disabled"),c=["primary","secondary","success","danger","warning","info","purple","blue","red","gray","pink","yellow","orange","turquoise"];if(!(!y&&!u)){a.after(f),a.addClass("cbr-done");var n=a.next();n.find(".cbr-input").append(a),y&&n.addClass("cbr-radio"),m&&n.addClass("cbr-disabled"),a.is(":checked")&&n.addClass("cbr-checked"),jQuery.each(c,function(e,i){var r="cbr-"+i;a.hasClass(r)&&(n.addClass(r),a.removeClass(r))}),n.on("click",function(e){y&&a.prop("checked")||n.parent().is("label")||jQuery(e.target).is(a)==!1&&(a.prop("checked",!a.is(":checked")),a.trigger("change"))}),a.on("change",function(e){n.removeClass("cbr-checked"),a.is(":checked")&&n.addClass("cbr-checked"),cbr_recheck()})}})}function cbr_recheck(){var t=jQuery("input.cbr-done");t.each(function(f,p){var d=jQuery(p),a=d.is(":radio"),y=d.is(":checkbox"),u=d.is(":disabled"),m=d.closest(".cbr-replaced");u&&m.addClass("cbr-disabled"),a&&!d.prop("checked")&&m.hasClass("cbr-checked")&&m.removeClass("cbr-checked")})}function attrDefault(t,f,p){return typeof t.data(f)<"u"?t.data(f):p}function callback_test(){alert("Callback function executed! No. of arguments: "+arguments.length+`

See console log for outputed of the arguments.`),console.log(arguments)}function date(t,f){var p=this,d,a,y=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],u=/\\?(.?)/gi,m=function(n,e){return a[n]?a[n]():e},c=function(n,e){for(n=String(n);n.length<e;)n="0"+n;return n};return a={d:function(){return c(a.j(),2)},D:function(){return a.l().slice(0,3)},j:function(){return d.getDate()},l:function(){return y[a.w()]+"day"},N:function(){return a.w()||7},S:function(){var n=a.j(),e=n%10;return e<=3&&parseInt(n%100/10,10)==1&&(e=0),["st","nd","rd"][e-1]||"th"},w:function(){return d.getDay()},z:function(){var n=new Date(a.Y(),a.n()-1,a.j()),e=new Date(a.Y(),0,1);return Math.round((n-e)/864e5)},W:function(){var n=new Date(a.Y(),a.n()-1,a.j()-a.N()+3),e=new Date(n.getFullYear(),0,4);return c(1+Math.round((n-e)/864e5/7),2)},F:function(){return y[6+a.n()]},m:function(){return c(a.n(),2)},M:function(){return a.F().slice(0,3)},n:function(){return d.getMonth()+1},t:function(){return new Date(a.Y(),a.n(),0).getDate()},L:function(){var n=a.Y();return n%4===0&n%100!==0|n%400===0},o:function(){var n=a.n(),e=a.W(),i=a.Y();return i+(n===12&&e<9?1:n===1&&e>9?-1:0)},Y:function(){return d.getFullYear()},y:function(){return a.Y().toString().slice(-2)},a:function(){return d.getHours()>11?"pm":"am"},A:function(){return a.a().toUpperCase()},B:function(){var n=d.getUTCHours()*3600,e=d.getUTCMinutes()*60,i=d.getUTCSeconds();return c(Math.floor((n+e+i+3600)/86.4)%1e3,3)},g:function(){return a.G()%12||12},G:function(){return d.getHours()},h:function(){return c(a.g(),2)},H:function(){return c(a.G(),2)},i:function(){return c(d.getMinutes(),2)},s:function(){return c(d.getSeconds(),2)},u:function(){return c(d.getMilliseconds()*1e3,6)},e:function(){throw"Not supported (see source code of date() for timezone on how to add support)"},I:function(){var n=new Date(a.Y(),0),e=Date.UTC(a.Y(),0),i=new Date(a.Y(),6),r=Date.UTC(a.Y(),6);return n-e!==i-r?1:0},O:function(){var n=d.getTimezoneOffset(),e=Math.abs(n);return(n>0?"-":"+")+c(Math.floor(e/60)*100+e%60,4)},P:function(){var n=a.O();return n.substr(0,3)+":"+n.substr(3,2)},T:function(){return"UTC"},Z:function(){return-d.getTimezoneOffset()*60},c:function(){return"Y-m-d\\TH:i:sP".replace(u,m)},r:function(){return"D, d M Y H:i:s O".replace(u,m)},U:function(){return d/1e3|0}},this.date=function(n,e){return p=this,d=e===void 0?new Date:e instanceof Date?new Date(e):new Date(e*1e3),n.replace(u,m)},this.date(t,f)}
