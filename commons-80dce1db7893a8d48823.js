(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"8+s/":function(e,t,r){"use strict";var n,a=r("q1tI"),i=(n=a)&&"object"==typeof n&&"default"in n?n.default:n;function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var s,l=[];function u(){s=e(l.map((function(e){return e.props}))),d.canUseDOM?t(s):r&&(s=r(s))}var d=function(e){var t,r;function a(){return e.apply(this,arguments)||this}r=e,(t=a).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,a.peek=function(){return s},a.rewind=function(){if(a.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=s;return s=void 0,l=[],e};var o=a.prototype;return o.UNSAFE_componentWillMount=function(){l.push(this),u()},o.componentDidUpdate=function(){u()},o.componentWillUnmount=function(){var e=l.indexOf(this);l.splice(e,1),u()},o.render=function(){return i.createElement(n,this.props)},a}(a.PureComponent);return o(d,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(n)+")"),o(d,"canUseDOM",c),d}}},"8ypT":function(e,t,r){},"9eSz":function(e,t,r){"use strict";var n=r("TqRt");t.__esModule=!0,t.default=void 0;var a,i=n(r("PJYZ")),o=n(r("VbXa")),c=n(r("8OQS")),s=n(r("pVnL")),l=n(r("q1tI")),u=n(r("17x9")),d=function(e){var t=(0,s.default)({},e),r=t.resolutions,n=t.sizes,a=t.critical;return r&&(t.fixed=r,delete t.resolutions),n&&(t.fluid=n,delete t.sizes),a&&(t.loading="eager"),t.fluid&&(t.fluid=T([].concat(t.fluid))),t.fixed&&(t.fixed=T([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(b&&!!window.matchMedia(t).matches)},p=function(e){var t=e.fluid,r=e.fixed,n=m(t||r||[]);return n&&n.src},m=function(e){if(b&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t];var r=e.findIndex((function(e){return void 0===e.media}));if(-1!==r)return e[r]}return e[0]},h=Object.create({}),g=function(e){var t=d(e),r=p(t);return h[r]||!1},y="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,b="undefined"!=typeof window,v=b&&window.IntersectionObserver,w=new WeakMap;function S(e){return e.map((function(e){var t=e.src,r=e.srcSet,n=e.srcSetWebp,a=e.media,i=e.sizes;return l.default.createElement(l.default.Fragment,{key:t},n&&l.default.createElement("source",{type:"image/webp",media:a,srcSet:n,sizes:i}),l.default.createElement("source",{media:a,srcSet:r,sizes:i}))}))}function T(e){var t=[],r=[];return e.forEach((function(e){return(e.media?t:r).push(e)})),[].concat(t,r)}function E(e){return e.map((function(e){var t=e.src,r=e.media,n=e.tracedSVG;return l.default.createElement("source",{key:t,media:r,srcSet:n})}))}function O(e){return e.map((function(e){var t=e.src,r=e.media,n=e.base64;return l.default.createElement("source",{key:t,media:r,srcSet:n})}))}function C(e,t){var r=e.srcSet,n=e.srcSetWebp,a=e.media,i=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(a?'media="'+a+'" ':"")+'srcset="'+(t?n:r)+'" '+(i?'sizes="'+i+'" ':"")+"/>"}var k=function(e,t){var r=(void 0===a&&"undefined"!=typeof window&&window.IntersectionObserver&&(a=new window.IntersectionObserver((function(e){e.forEach((function(e){if(w.has(e.target)){var t=w.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(a.unobserve(e.target),w.delete(e.target),t())}}))}),{rootMargin:"200px"})),a);return r&&(r.observe(e),w.set(e,t)),function(){r.unobserve(e),w.delete(e)}},L=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',r=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSet?'srcset="'+e.srcSet+'" ':"",a=e.title?'title="'+e.title+'" ':"",i=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",c=e.height?'height="'+e.height+'" ':"",s=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",l=e.loading?'loading="'+e.loading+'" ':"",u=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?C(e,!0):"")+C(e)})).join("")+"<img "+l+o+c+r+n+t+i+a+s+u+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},A=l.default.forwardRef((function(e,t){var r=e.src,n=e.imageVariants,a=e.generateSources,i=e.spreadProps,o=e.ariaHidden,c=l.default.createElement(I,(0,s.default)({ref:t,src:r},i,{ariaHidden:o}));return n.length>1?l.default.createElement("picture",null,a(n),c):c})),I=l.default.forwardRef((function(e,t){var r=e.sizes,n=e.srcSet,a=e.src,i=e.style,o=e.onLoad,u=e.onError,d=e.loading,f=e.draggable,p=e.ariaHidden,m=(0,c.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return l.default.createElement("img",(0,s.default)({"aria-hidden":p,sizes:r,srcSet:n,src:a},m,{onLoad:o,onError:u,ref:t,loading:d,draggable:f,style:(0,s.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},i)}))}));I.propTypes={style:u.default.object,onError:u.default.func,onLoad:u.default.func};var j=function(e){function t(t){var r;(r=e.call(this,t)||this).seenBefore=b&&g(t),r.isCritical="eager"===t.loading||t.critical,r.addNoScript=!(r.isCritical&&!t.fadeIn),r.useIOSupport=!y&&v&&!r.isCritical&&!r.seenBefore;var n=r.isCritical||b&&(y||!r.useIOSupport);return r.state={isVisible:n,imgLoaded:!1,imgCached:!1,fadeIn:!r.seenBefore&&t.fadeIn},r.imageRef=l.default.createRef(),r.placeholderRef=t.placeholderRef||l.default.createRef(),r.handleImageLoaded=r.handleImageLoaded.bind((0,i.default)(r)),r.handleRef=r.handleRef.bind((0,i.default)(r)),r}(0,o.default)(t,e);var r=t.prototype;return r.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:g(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},r.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},r.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=k(e,(function(){var e=g(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},r.handleImageLoaded=function(){var e,t,r;e=this.props,t=d(e),(r=p(t))&&(h[r]=!0),this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},r.render=function(){var e=d(this.props),t=e.title,r=e.alt,n=e.className,a=e.style,i=void 0===a?{}:a,o=e.imgStyle,c=void 0===o?{}:o,u=e.placeholderStyle,f=void 0===u?{}:u,p=e.placeholderClassName,h=e.fluid,g=e.fixed,y=e.backgroundColor,b=e.durationFadeIn,v=e.Tag,w=e.itemProp,T=e.loading,C=e.draggable,k=!1===this.state.fadeIn||this.state.imgLoaded,j=!0===this.state.fadeIn&&!this.state.imgCached,x=(0,s.default)({opacity:k?1:0,transition:j?"opacity "+b+"ms":"none"},c),P="boolean"==typeof y?"lightgray":y,N={transitionDelay:b+"ms"},R=(0,s.default)({opacity:this.state.imgLoaded?0:1},j&&N,c,f),z={title:t,alt:this.state.isVisible?"":r,style:R,className:p,itemProp:w};if(h){var _=h,M=m(h);return l.default.createElement(v,{className:(n||"")+" gatsby-image-wrapper",style:(0,s.default)({position:"relative",overflow:"hidden",maxWidth:M.maxWidth?M.maxWidth+"px":null,maxHeight:M.maxHeight?M.maxHeight+"px":null},i),ref:this.handleRef,key:"fluid-"+JSON.stringify(M.srcSet)},l.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/M.aspectRatio+"%"}}),P&&l.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,s.default)({backgroundColor:P,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},j&&N)}),M.base64&&l.default.createElement(A,{ariaHidden:!0,ref:this.placeholderRef,src:M.base64,spreadProps:z,imageVariants:_,generateSources:O}),M.tracedSVG&&l.default.createElement(A,{ariaHidden:!0,ref:this.placeholderRef,src:M.tracedSVG,spreadProps:z,imageVariants:_,generateSources:E}),this.state.isVisible&&l.default.createElement("picture",null,S(_),l.default.createElement(I,{alt:r,title:t,sizes:M.sizes,src:M.src,crossOrigin:this.props.crossOrigin,srcSet:M.srcSet,style:x,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:T,draggable:C})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:L((0,s.default)({alt:r,title:t,loading:T},M,{imageVariants:_}))}}))}if(g){var H=g,D=m(g),V=(0,s.default)({position:"relative",overflow:"hidden",display:"inline-block",width:D.width,height:D.height},i);return"inherit"===i.display&&delete V.display,l.default.createElement(v,{className:(n||"")+" gatsby-image-wrapper",style:V,ref:this.handleRef,key:"fixed-"+JSON.stringify(D.srcSet)},P&&l.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,s.default)({backgroundColor:P,width:D.width,opacity:this.state.imgLoaded?0:1,height:D.height},j&&N)}),D.base64&&l.default.createElement(A,{ariaHidden:!0,ref:this.placeholderRef,src:D.base64,spreadProps:z,imageVariants:H,generateSources:O}),D.tracedSVG&&l.default.createElement(A,{ariaHidden:!0,ref:this.placeholderRef,src:D.tracedSVG,spreadProps:z,imageVariants:H,generateSources:E}),this.state.isVisible&&l.default.createElement("picture",null,S(H),l.default.createElement(I,{alt:r,title:t,width:D.width,height:D.height,sizes:D.sizes,src:D.src,crossOrigin:this.props.crossOrigin,srcSet:D.srcSet,style:x,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:T,draggable:C})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:L((0,s.default)({alt:r,title:t,loading:T},D,{imageVariants:H}))}}))}return null},t}(l.default.Component);j.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var x=u.default.shape({width:u.default.number.isRequired,height:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string,media:u.default.string}),P=u.default.shape({aspectRatio:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,sizes:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string,media:u.default.string,maxWidth:u.default.number,maxHeight:u.default.number});function N(e){return function(t,r,n){var a;if(!t.fixed&&!t.fluid)throw new Error("The prop `fluid` or `fixed` is marked as required in `"+n+"`, but their values are both `undefined`.");u.default.checkPropTypes(((a={})[r]=e,a),t,"prop",n)}}j.propTypes={resolutions:x,sizes:P,fixed:N(u.default.oneOfType([x,u.default.arrayOf(x)])),fluid:N(u.default.oneOfType([P,u.default.arrayOf(P)])),fadeIn:u.default.bool,durationFadeIn:u.default.number,title:u.default.string,alt:u.default.string,className:u.default.oneOfType([u.default.string,u.default.object]),critical:u.default.bool,crossOrigin:u.default.oneOfType([u.default.string,u.default.bool]),style:u.default.object,imgStyle:u.default.object,placeholderStyle:u.default.object,placeholderClassName:u.default.string,backgroundColor:u.default.oneOfType([u.default.string,u.default.bool]),onLoad:u.default.func,onError:u.default.func,onStartLoad:u.default.func,Tag:u.default.string,itemProp:u.default.string,loading:u.default.oneOf(["auto","lazy","eager"]),draggable:u.default.bool};var R=j;t.default=R},Bl7J:function(e,t,r){"use strict";var n=r("q1tI"),a=r.n(n),i=r("Wbzz"),o=r("fcpr"),c=r.n(o),s=r("dI71"),l=r("uEY5"),u=r.n(l),d=function(e){return a.a.createElement("div",{className:u.a.navbutton},a.a.createElement(i.Link,{to:e.to,className:u.a.navlink},e.children))};d.defaultProps={};var f=d,p=function(e){function t(t){var r;return(r=e.call(this,t)||this).defaultProps={siteTitle:"",opacityIndex:.5,pageTitle:"Sahir Vellani"},r}return Object(s.a)(t,e),t.prototype.render=function(){return a.a.createElement("header",{style:{position:"fixed",width:"100%",background:"rgba(10, 10, 10, 0.7)",transition:"opacity 0.2s ease-in-out",zIndex:1,top:0},className:"Sahir Vellani"===this.props.pageTitle?u.a.dontshowheader:u.a.showheader},a.a.createElement("div",{style:{padding:"0.2rem 1.0875rem",float:"left",display:"Sahir Vellani"===this.props.pageTitle?"none":"inline-block"}},a.a.createElement(f,{to:"/"},"Sahir Vellani")),a.a.createElement("div",{style:{maxWidth:960,padding:"0.2rem 1.0875rem",float:"right"}},a.a.createElement(f,{to:"/astro/"},"Space"),a.a.createElement(f,{to:"/travel/"},"Earth")))},t}(a.a.Component),m=r("9eSz"),h=r.n(m),g=r("KZ+/"),y=r.n(g),b=function(e){var t=e.pageTitle,r=e.isMobile,n=Object(i.useStaticQuery)("4115185537"),o="Earth"==t?n.earthImage:n.astroImage;return r&&(o="Earth"==t?n.mobileEarthImage:n.mobileAstroImage),null==r?a.a.createElement(h.a,{fluid:void 0,backgroundColor:"#000"}):a.a.createElement(h.a,{fluid:o.childImageSharp.fluid,className:y.a.background,imgStyle:{objectFit:"cover"},fadeIn:!0,loading:"eager"})},v=r("Gc/d"),w=r.n(v),S=(r("FmS5"),function(e){var t=e.showDrawer,r=e.toggle,n=w.a.navDrawerContainer+" draweropen",o=t?n:w.a.navDrawerContainer;return a.a.createElement("div",{className:o},a.a.createElement("div",{className:w.a.navDrawer},a.a.createElement("div",{className:w.a.drawerLinksContainerGroup},a.a.createElement("div",{className:w.a.drawerLinkContainer},a.a.createElement(i.Link,{to:"/",className:w.a.drawerLink,onClick:function(){return r()}},"Home")),a.a.createElement("div",{className:w.a.drawerLinkContainer},a.a.createElement(i.Link,{to:"/astro/",className:w.a.drawerLink,onClick:function(){return r()}},"Space")),a.a.createElement("div",{className:w.a.drawerLinkContainer},a.a.createElement(i.Link,{to:"/travel/",className:w.a.drawerLink,onClick:function(){return r()}},"Earth")))),a.a.createElement("div",{className:w.a.drawerOverlay,onClick:function(){return r()}}))}),T=function(e){var t=e.toggle,r=e.showDrawer,n=w.a.rect_top_active+" "+w.a.rectstyle,i=w.a.rect_middle_active+" "+w.a.rectstyle,o=w.a.rect_bottom_active+" "+w.a.rectstyle;return a.a.createElement("div",{className:w.a.navDrawerButton},a.a.createElement("svg",{className:w.a.buttonContainer,onClick:function(){return t()}},a.a.createElement("g",{id:"layer1"},a.a.createElement("path",{className:r?n:w.a.rectstyle,d:"m 4.8823464,4.1102541 44.2857196,0 0,2.57142 -44.2857196,0 z",id:"rect_top"}),a.a.createElement("path",{id:"rect_middle",d:"m 4.9966364,13.938824 44.2857196,0 0,2.57142 -44.2857196,0 z",className:r?i:w.a.rectstyle}),a.a.createElement("path",{className:r?o:w.a.rectstyle,d:"m 4.9966364,23.338824 44.2857196,0 0,2.57142 -44.2857196,0 z",id:"rect_bottom"}))))};r("8ypT"),t.a=function(e){var t=e.children,r=e.pageTitle,o=(Object(i.useStaticQuery)("3649515864"),function(){return"Sahir Vellani"==r}),s=function(e){var t;t=e[0].contentBoxSize?null!=e[0].contentBoxSize.inlineSize?e[0].contentBoxSize.inlineSize:e[0].contentBoxSize[0].inlineSize:e[0].contentRect.width,w(t<600)},l=Object(n.useState)(1),u=(l[0],l[1],Object(n.useState)(.5)),d=u[0],f=(u[1],Object(n.useState)("Earth"==r?"rgb(10,10,10)":"rgb(236, 236, 236)")),m=(f[0],f[1],Object(n.useState)(!1)),h=m[0],g=m[1],y=Object(n.useState)(!0),v=y[0],w=y[1],E=Object(n.useRef)();Object(n.useEffect)((function(){var e=new ResizeObserver(s);E.current&&e.observe(E.current)}),[E]);var O=function(){g(!h)},C=o()?c.a.maintitle+" "+c.a.mainTitleHome:c.a.maintitle+" "+c.a.mainTitleOther;return a.a.createElement(a.a.Fragment,null,v?"":a.a.createElement(p,{opacityIndex:d,pageTitle:r}),v?a.a.createElement(T,{toggle:function(){return O()},showDrawer:h,className:c.a.showDrawerButton}):"",a.a.createElement("div",{className:C,ref:E},r),a.a.createElement(b,{pageTitle:r,isMobile:v}),v?"":a.a.createElement("div",{class:"mainlinkbar",style:{display:o()?"block":"none"}},a.a.createElement("div",{class:"mainlinkcontainer"},a.a.createElement(i.Link,{to:"/astro/",class:"mainlink"},"Space")),a.a.createElement("div",{class:"mainlinkcontainer"},a.a.createElement(i.Link,{to:"/travel/",class:"mainlink"},"Earth"))),a.a.createElement("div",{style:{margin:"0 auto",padding:"0 1.0875rem 1.45rem",background:"#fdfdfd",zIndex:1}},a.a.createElement("main",null,t)),a.a.createElement(S,{showDrawer:h,toggle:function(){return O()}}))}},FmS5:function(e,t,r){},"Gc/d":function(e,t,r){e.exports={rect_top_active:"drawer-module--rect_top_active--3w_YO",rect_bottom_active:"drawer-module--rect_bottom_active--2oXmI",rect_middle_active:"drawer-module--rect_middle_active--1wqCu",rectstyle:"drawer-module--rectstyle--SzbmY",buttonContainer:"drawer-module--buttonContainer--RgfBB",navDrawerContainer:"drawer-module--navDrawerContainer--3XNE9",navDrawer:"drawer-module--navDrawer--1lICG",drawerLink:"drawer-module--drawerLink--cHoyW",drawerLinkContainer:"drawer-module--drawerLinkContainer--2DFAQ",drawerOverlay:"drawer-module--drawerOverlay--2YfM_",navDrawerButton:"drawer-module--navDrawerButton--r6EPP",hrStyle:"drawer-module--hrStyle--16fpz",navDrawerIcon:"drawer-module--navDrawerIcon--2ouSJ",drawerCloseButton:"drawer-module--drawerCloseButton--tijQk",drawerLinksContainerGroup:"drawer-module--drawerLinksContainerGroup--y1hI6"}},"KZ+/":function(e,t,r){e.exports={background:"home-background-module--background--1qykt"}},bmMU:function(e,t){var r="undefined"!=typeof Element,n="function"==typeof Map,a="function"==typeof Set,i="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;e.exports=function(e,t){try{return function e(t,o){if(t===o)return!0;if(t&&o&&"object"==typeof t&&"object"==typeof o){if(t.constructor!==o.constructor)return!1;var c,s,l,u;if(Array.isArray(t)){if((c=t.length)!=o.length)return!1;for(s=c;0!=s--;)if(!e(t[s],o[s]))return!1;return!0}if(n&&t instanceof Map&&o instanceof Map){if(t.size!==o.size)return!1;for(u=t.entries();!(s=u.next()).done;)if(!o.has(s.value[0]))return!1;for(u=t.entries();!(s=u.next()).done;)if(!e(s.value[1],o.get(s.value[0])))return!1;return!0}if(a&&t instanceof Set&&o instanceof Set){if(t.size!==o.size)return!1;for(u=t.entries();!(s=u.next()).done;)if(!o.has(s.value[0]))return!1;return!0}if(i&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(o)){if((c=t.length)!=o.length)return!1;for(s=c;0!=s--;)if(t[s]!==o[s])return!1;return!0}if(t.constructor===RegExp)return t.source===o.source&&t.flags===o.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===o.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===o.toString();if((c=(l=Object.keys(t)).length)!==Object.keys(o).length)return!1;for(s=c;0!=s--;)if(!Object.prototype.hasOwnProperty.call(o,l[s]))return!1;if(r&&t instanceof Element)return!1;for(s=c;0!=s--;)if(("_owner"!==l[s]&&"__v"!==l[s]&&"__o"!==l[s]||!t.$$typeof)&&!e(t[l[s]],o[l[s]]))return!1;return!0}return t!=t&&o!=o}(e,t)}catch(o){if((o.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw o}}},fcpr:function(e,t,r){e.exports={mainTitleHome:"layout-module--mainTitleHome--2i5_A",mainTitleOther:"layout-module--mainTitleOther--V-BrK",maintitle:"layout-module--maintitle--3eK5y"}},qhky:function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return he}));var n,a,i,o,c=r("17x9"),s=r.n(c),l=r("8+s/"),u=r.n(l),d=r("bmMU"),f=r.n(d),p=r("q1tI"),m=r.n(p),h=r("6qGY"),g=r.n(h),y="bodyAttributes",b="htmlAttributes",v="titleAttributes",w={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},S=(Object.keys(w).map((function(e){return w[e]})),"charset"),T="cssText",E="href",O="http-equiv",C="innerHTML",k="itemprop",L="name",A="property",I="rel",j="src",x="target",P={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},N="defaultTitle",R="defer",z="encodeSpecialCharacters",_="onChangeClientState",M="titleTemplate",H=Object.keys(P).reduce((function(e,t){return e[P[t]]=t,e}),{}),D=[w.NOSCRIPT,w.SCRIPT,w.STYLE],V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},B=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},W=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r},Y=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},U=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},G=function(e){var t=Z(e,w.TITLE),r=Z(e,M);if(r&&t)return r.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var n=Z(e,N);return t||n||void 0},K=function(e){return Z(e,_)||function(){}},J=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return F({},e,t)}),{})},Q=function(e,t){return t.filter((function(e){return void 0!==e[w.BASE]})).map((function(e){return e[w.BASE]})).reverse().reduce((function(t,r){if(!t.length)for(var n=Object.keys(r),a=0;a<n.length;a++){var i=n[a].toLowerCase();if(-1!==e.indexOf(i)&&r[i])return t.concat(r)}return t}),[])},X=function(e,t,r){var n={};return r.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&ne("Helmet: "+e+' should be of type "Array". Instead found type "'+V(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,r){var a={};r.filter((function(e){for(var r=void 0,i=Object.keys(e),o=0;o<i.length;o++){var c=i[o],s=c.toLowerCase();-1===t.indexOf(s)||r===I&&"canonical"===e[r].toLowerCase()||s===I&&"stylesheet"===e[s].toLowerCase()||(r=s),-1===t.indexOf(c)||c!==C&&c!==T&&c!==k||(r=c)}if(!r||!e[r])return!1;var l=e[r].toLowerCase();return n[r]||(n[r]={}),a[r]||(a[r]={}),!n[r][l]&&(a[r][l]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var i=Object.keys(a),o=0;o<i.length;o++){var c=i[o],s=g()({},n[c],a[c]);n[c]=s}return e}),[]).reverse()},Z=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},$=(n=Date.now(),function(e){var t=Date.now();t-n>16?(n=t,e(t)):setTimeout((function(){$(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||$:e.requestAnimationFrame||$,re="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:e.cancelAnimationFrame||ee,ne=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},ae=null,ie=function(e,t){var r=e.baseTag,n=e.bodyAttributes,a=e.htmlAttributes,i=e.linkTags,o=e.metaTags,c=e.noscriptTags,s=e.onChangeClientState,l=e.scriptTags,u=e.styleTags,d=e.title,f=e.titleAttributes;se(w.BODY,n),se(w.HTML,a),ce(d,f);var p={baseTag:le(w.BASE,r),linkTags:le(w.LINK,i),metaTags:le(w.META,o),noscriptTags:le(w.NOSCRIPT,c),scriptTags:le(w.SCRIPT,l),styleTags:le(w.STYLE,u)},m={},h={};Object.keys(p).forEach((function(e){var t=p[e],r=t.newTags,n=t.oldTags;r.length&&(m[e]=r),n.length&&(h[e]=p[e].oldTags)})),t&&t(),s(e,m,h)},oe=function(e){return Array.isArray(e)?e.join(""):e},ce=function(e,t){void 0!==e&&document.title!==e&&(document.title=oe(e)),se(w.TITLE,t)},se=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute("data-react-helmet"),a=n?n.split(","):[],i=[].concat(a),o=Object.keys(t),c=0;c<o.length;c++){var s=o[c],l=t[s]||"";r.getAttribute(s)!==l&&r.setAttribute(s,l),-1===a.indexOf(s)&&a.push(s);var u=i.indexOf(s);-1!==u&&i.splice(u,1)}for(var d=i.length-1;d>=0;d--)r.removeAttribute(i[d]);a.length===i.length?r.removeAttribute("data-react-helmet"):r.getAttribute("data-react-helmet")!==o.join(",")&&r.setAttribute("data-react-helmet",o.join(","))}},le=function(e,t){var r=document.head||document.querySelector(w.HEAD),n=r.querySelectorAll(e+"[data-react-helmet]"),a=Array.prototype.slice.call(n),i=[],o=void 0;return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n))if(n===C)r.innerHTML=t.innerHTML;else if(n===T)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[n]?"":t[n];r.setAttribute(n,c)}r.setAttribute("data-react-helmet","true"),a.some((function(e,t){return o=t,r.isEqualNode(e)}))?a.splice(o,1):i.push(r)})),a.forEach((function(e){return e.parentNode.removeChild(e)})),i.forEach((function(e){return r.appendChild(e)})),{oldTags:a,newTags:i}},ue=function(e){return Object.keys(e).reduce((function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n}),"")},de=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[P[r]||r]=e[r],t}),t)},fe=function(e,t,r){switch(e){case w.TITLE:return{toComponent:function(){return e=t.title,r=t.titleAttributes,(n={key:e})["data-react-helmet"]=!0,a=de(r,n),[m.a.createElement(w.TITLE,a,e)];var e,r,n,a},toString:function(){return function(e,t,r,n){var a=ue(r),i=oe(t);return a?"<"+e+' data-react-helmet="true" '+a+">"+U(i,n)+"</"+e+">":"<"+e+' data-react-helmet="true">'+U(i,n)+"</"+e+">"}(e,t.title,t.titleAttributes,r)}};case y:case b:return{toComponent:function(){return de(t)},toString:function(){return ue(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,r){var n,a=((n={key:r})["data-react-helmet"]=!0,n);return Object.keys(t).forEach((function(e){var r=P[e]||e;if(r===C||r===T){var n=t.innerHTML||t.cssText;a.dangerouslySetInnerHTML={__html:n}}else a[r]=t[e]})),m.a.createElement(e,a)}))}(e,t)},toString:function(){return function(e,t,r){return t.reduce((function(t,n){var a=Object.keys(n).filter((function(e){return!(e===C||e===T)})).reduce((function(e,t){var a=void 0===n[t]?t:t+'="'+U(n[t],r)+'"';return e?e+" "+a:a}),""),i=n.innerHTML||n.cssText||"",o=-1===D.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+a+(o?"/>":">"+i+"</"+e+">")}),"")}(e,t,r)}}}},pe=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,a=e.htmlAttributes,i=e.linkTags,o=e.metaTags,c=e.noscriptTags,s=e.scriptTags,l=e.styleTags,u=e.title,d=void 0===u?"":u,f=e.titleAttributes;return{base:fe(w.BASE,t,n),bodyAttributes:fe(y,r,n),htmlAttributes:fe(b,a,n),link:fe(w.LINK,i,n),meta:fe(w.META,o,n),noscript:fe(w.NOSCRIPT,c,n),script:fe(w.SCRIPT,s,n),style:fe(w.STYLE,l,n),title:fe(w.TITLE,{title:d,titleAttributes:f},n)}},me=u()((function(e){return{baseTag:Q([E,x],e),bodyAttributes:J(y,e),defer:Z(e,R),encode:Z(e,z),htmlAttributes:J(b,e),linkTags:X(w.LINK,[I,E],e),metaTags:X(w.META,[L,S,O,A,k],e),noscriptTags:X(w.NOSCRIPT,[C],e),onChangeClientState:K(e),scriptTags:X(w.SCRIPT,[j,C],e),styleTags:X(w.STYLE,[T],e),title:G(e),titleAttributes:J(v,e)}}),(function(e){ae&&re(ae),e.defer?ae=te((function(){ie(e,(function(){ae=null}))})):(ie(e),ae=null)}),pe)((function(){return null})),he=(a=me,o=i=function(e){function t(){return q(this,t),Y(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!f()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case w.SCRIPT:case w.NOSCRIPT:return{innerHTML:t};case w.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,n=e.arrayTypeChildren,a=e.newChildProps,i=e.nestedChildren;return F({},n,((t={})[r.type]=[].concat(n[r.type]||[],[F({},a,this.mapNestedChildrenToProps(r,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,n=e.child,a=e.newProps,i=e.newChildProps,o=e.nestedChildren;switch(n.type){case w.TITLE:return F({},a,((t={})[n.type]=o,t.titleAttributes=F({},i),t));case w.BODY:return F({},a,{bodyAttributes:F({},i)});case w.HTML:return F({},a,{htmlAttributes:F({},i)})}return F({},a,((r={})[n.type]=F({},i),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=F({},t);return Object.keys(e).forEach((function(t){var n;r=F({},r,((n={})[t]=e[t],n))})),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return m.a.Children.forEach(e,(function(e){if(e&&e.props){var a=e.props,i=a.children,o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[H[r]||r]=e[r],t}),t)}(W(a,["children"]));switch(r.warnOnInvalidChildren(e,i),e.type){case w.LINK:case w.META:case w.NOSCRIPT:case w.SCRIPT:case w.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:o,nestedChildren:i});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:o,nestedChildren:i})}}})),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=W(e,["children"]),n=F({},r);return t&&(n=this.mapChildrenToProps(t,n)),m.a.createElement(a,n)},B(t,null,[{key:"canUseDOM",set:function(e){a.canUseDOM=e}}]),t}(m.a.Component),i.propTypes={base:s.a.object,bodyAttributes:s.a.object,children:s.a.oneOfType([s.a.arrayOf(s.a.node),s.a.node]),defaultTitle:s.a.string,defer:s.a.bool,encodeSpecialCharacters:s.a.bool,htmlAttributes:s.a.object,link:s.a.arrayOf(s.a.object),meta:s.a.arrayOf(s.a.object),noscript:s.a.arrayOf(s.a.object),onChangeClientState:s.a.func,script:s.a.arrayOf(s.a.object),style:s.a.arrayOf(s.a.object),title:s.a.string,titleAttributes:s.a.object,titleTemplate:s.a.string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=a.peek,i.rewind=function(){var e=a.rewind();return e||(e=pe({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},o);he.renderStatic=he.rewind}).call(this,r("yLpj"))},uEY5:function(e,t,r){e.exports={navlink:"header-module--navlink--E0eEm",navbutton:"header-module--navbutton--3_TMm",navdrawer:"header-module--navdrawer--14uHX",dontshowheader:"header-module--dontshowheader--1i4yr",showheader:"header-module--showheader--wJsXu"}},vrFN:function(e,t,r){"use strict";var n=r("q1tI"),a=r.n(n),i=r("qhky"),o=r("Wbzz");function c(e){var t=e.description,r=e.lang,n=e.meta,c=e.title,s=Object(o.useStaticQuery)("63159454").site,l=t||s.siteMetadata.description;return a.a.createElement(i.a,{htmlAttributes:{lang:r},title:c,titleTemplate:"%s | "+s.siteMetadata.title,meta:[{name:"description",content:l},{property:"og:title",content:c},{property:"og:description",content:l},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:s.siteMetadata.author},{name:"twitter:title",content:c},{name:"twitter:description",content:l}].concat(n)})}c.defaultProps={lang:"en",meta:[],description:""},t.a=c},yLpj:function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(n){"object"==typeof window&&(r=window)}e.exports=r}}]);
//# sourceMappingURL=commons-80dce1db7893a8d48823.js.map