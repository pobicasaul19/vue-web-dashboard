import{u as R,s as I}from"./layout-BlCXgmBg.js";import{B as H,a as P,b as Z,g as D,$ as N,c as U,f as F,i as V,d as j,s as M,r as C,e as q,o as r,h as K,w as m,j as l,T as Y,m as b,k as G,l as d,n as S,p as J,q as Q,t as L,u as W,v as i,F as w,x as X,y as $,z as v,A as ee,C as g,D as te}from"./index-zO9eK7yN.js";import{Z as k,O as h,C as ne,s as oe}from"./index-BAEB1jw8.js";import{F as ie}from"./index-DOIKZ7a2.js";import{R as se,s as re,a as ae}from"./index-BGHzph7n.js";var le=function(e){var n=e.dt;return`
.p-popover {
    margin-block-start: `.concat(n("popover.gutter"),`;
    background: `).concat(n("popover.background"),`;
    color: `).concat(n("popover.color"),`;
    border: 1px solid `).concat(n("popover.border.color"),`;
    border-radius: `).concat(n("popover.border.radius"),`;
    box-shadow: `).concat(n("popover.shadow"),`;
}

.p-popover-content {
    padding: `).concat(n("popover.content.padding"),`;
}

.p-popover-flipped {
    margin-block-start: calc(`).concat(n("popover.gutter"),` * -1);
    margin-block-end: `).concat(n("popover.gutter"),`;
}

.p-popover-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-popover-leave-to {
    opacity: 0;
}

.p-popover-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-popover-leave-active {
    transition: opacity 0.1s linear;
}

.p-popover:after,
.p-popover:before {
    bottom: 100%;
    left: calc(`).concat(n("popover.arrow.offset")," + ").concat(n("popover.arrow.left"),`);
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.p-popover:after {
    border-width: calc(`).concat(n("popover.gutter"),` - 2px);
    margin-left: calc(-1 * (`).concat(n("popover.gutter"),` - 2px));
    border-style: solid;
    border-color: transparent;
    border-bottom-color: `).concat(n("popover.background"),`;
}

.p-popover:before {
    border-width: `).concat(n("popover.gutter"),`;
    margin-left: calc(-1 * `).concat(n("popover.gutter"),`);
    border-style: solid;
    border-color: transparent;
    border-bottom-color: `).concat(n("popover.border.color"),`;
}

.p-popover-flipped:after,
.p-popover-flipped:before {
    bottom: auto;
    top: 100%;
}

.p-popover.p-popover-flipped:after {
    border-bottom-color: transparent;
    border-top-color: `).concat(n("popover.background"),`;
}

.p-popover.p-popover-flipped:before {
    border-bottom-color: transparent;
    border-top-color: `).concat(n("popover.border.color"),`;
}
`)},ce={root:"p-popover p-component",content:"p-popover-content"},de=H.extend({name:"popover",theme:le,classes:ce}),ue={name:"BasePopover",extends:re,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:de,provide:function(){return{$pcPopover:this,$parentInstance:this}}},z={name:"Popover",extends:ue,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(e){e?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&k.clear(this.container),this.overlayEventListener&&(h.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(e,n){this.visible?this.hide():this.show(e,n)},show:function(e,n){this.visible=!0,this.eventTarget=e.currentTarget,this.target=n||e.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(e){var n=this;P(e,{position:"absolute",top:"0",left:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&k.set("overlay",e,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(s){n.container.contains(s.target)&&(n.selfClick=!0)},this.focus(),h.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),h.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(e){this.autoZIndex&&k.clear(e)},alignOverlay:function(){Z(this.container,this.target,!1);var e=D(this.container),n=D(this.target),s=0;e.left<n.left&&(s=n.left-e.left),this.container.style.setProperty(N("popover.arrow.left").name,"".concat(s,"px")),e.top<n.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&U(this.container,"p-popover-flipped"))},onContentKeydown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.hide(),F(this.target))},onButtonKeydown:function(e){switch(e.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":e.preventDefault()}},focus:function(){var e=this.container.querySelector("[autofocus]");e&&e.focus()},onKeyDown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var e=this;!this.outsideClickListener&&V()&&(this.outsideClickListener=function(n){e.visible&&!e.selfClick&&!e.isTargetClicked(n)&&(e.visible=!1),e.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new ne(this.target,function(){e.visible&&(e.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!j()&&(e.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(e){return this.eventTarget&&(this.eventTarget===e.target||this.eventTarget.contains(e.target))},containerRef:function(e){this.container=e},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var e;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",M(this.styleElement,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.head.appendChild(this.styleElement);var n="";for(var s in this.breakpoints)n+=`
                        @media screen and (max-width: `.concat(s,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[s],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=n}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(e){h.emit("overlay-click",{originalEvent:e,target:this.target})}},directives:{focustrap:ie,ripple:se},components:{Portal:oe}},pe=["aria-modal"];function fe(t,e,n,s,a,o){var y=C("Portal"),u=q("focustrap");return r(),K(y,{appendTo:t.appendTo},{default:m(function(){return[l(Y,b({name:"p-popover",onEnter:o.onEnter,onLeave:o.onLeave,onAfterLeave:o.onAfterLeave},t.ptm("transition")),{default:m(function(){return[a.visible?G((r(),d("div",b({key:0,ref:o.containerRef,role:"dialog","aria-modal":a.visible,onClick:e[3]||(e[3]=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)}),class:t.cx("root")},t.ptmi("root")),[t.$slots.container?S(t.$slots,"container",{key:0,closeCallback:o.hide,keydownCallback:function(p){return o.onButtonKeydown(p)}}):(r(),d("div",b({key:1,class:t.cx("content"),onClick:e[0]||(e[0]=function(){return o.onContentClick&&o.onContentClick.apply(o,arguments)}),onMousedown:e[1]||(e[1]=function(){return o.onContentClick&&o.onContentClick.apply(o,arguments)}),onKeydown:e[2]||(e[2]=function(){return o.onContentKeydown&&o.onContentKeydown.apply(o,arguments)})},t.ptm("content")),[S(t.$slots,"default")],16))],16,pe)),[[u]]):J("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}z.render=fe;const ve={class:"layout-topbar"},he={class:"layout-topbar-container space-x-6"},me={class:"layout-topbar-menu"},ye={class:"layout-topbar-action"},be={class:"flex flex-col space-y-4"},Le={class:"flex item-center space-x-5"},ge={class:"flex flex-col"},ke={class:"font-medium capitalize"},we={class:"capitalize text-sm text-gray-500"},Ce=Q({__name:"AppHeader",setup(t){var p,E,x;const{toggleDarkMode:e,isDarkTheme:n}=R(),s=L(),a=L([{label:"Dashboard",to:"/"},{label:"All Media",to:"/media"}]),o=W(),y=()=>{o.logout(),te.push("/account/login")},u=L({name:`${(p=o.userInfo)==null?void 0:p.firstName} ${(E=o.userInfo)==null?void 0:E.lastName}`,type:(x=o.userInfo)==null?void 0:x.type}),_=O=>{s.value.toggle(O)};return(O,f)=>{const T=C("router-link"),A=ae,B=z;return r(),d(w,null,[i("div",ve,[i("div",he,[(r(!0),d(w,null,X(a.value,c=>(r(),K(T,{key:c,to:c.to},{default:m(()=>[ee(g(c.label),1)]),_:2},1032,["to"]))),128))]),i("div",me,[i("div",ye,[i("i",{class:$(["layout-topbar-actions pi",{"pi-moon":v(n),"pi-sun":!v(n)}]),onClick:f[0]||(f[0]=(...c)=>v(e)&&v(e)(...c))},null,2),i("div",{class:"layout-topbar-actions"},[i("i",{class:"pi pi-user",onClick:_})])])])]),l(B,{ref_key:"op",ref:s},{default:m(()=>[i("div",be,[i("div",Le,[f[1]||(f[1]=i("img",{src:"https://xsgames.co/randomusers/avatar.php?g=female",style:{width:"32px"},class:"rounded-full"},null,-1)),i("div",ge,[i("span",ke,g(u.value.name),1),i("span",we,g(u.value.type),1)])]),l(A,{class:"w-full",label:"Logout",onClick:y})])]),_:1},512)],64)}}}),_e={class:"layout-wrapper"},Ee={class:"layout-main"},xe={class:"layout-main-container"},Te={__name:"AppLayout",setup(t){return(e,n)=>{const s=C("router-view"),a=I;return r(),d(w,null,[i("div",_e,[l(Ce),i("div",Ee,[i("div",xe,[l(s)])])]),l(a)],64)}}};export{Te as default};
