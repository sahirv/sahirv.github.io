(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"0BQV":function(e,t,n){e.exports={childrenContainer:"blog-module--childrenContainer--L2Gnb",blogDescription:"blog-module--blogDescription--1DmUR",blogText:"blog-module--blogText--3j_ps",blogImage:"blog-module--blogImage--1odrZ",blogSubheading:"blog-module--blogSubheading--3dB7n",entry:"blog-module--entry--12zxG",mediumLink:"blog-module--mediumLink--14LJ8"}},dj31:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),i=n.n(a),o=n("Wbzz"),s=n("Bl7J"),r=n("vrFN"),l=n("0BQV"),c=n.n(l),d=n("9eSz"),h=n.n(d);t.default=function(){var e=Object(o.useStaticQuery)("4048705352").images.edges[0],t="ResizeObserver is a JavaScript web API that allows you to run code whenever an element's size changes.";return i.a.createElement(s.a,{pageTitle:"Resize Observer"},i.a.createElement(r.a,{title:"Resize Observer",description:t}),i.a.createElement("div",{className:c.a.childrenContainer},i.a.createElement("h1",null,"Detecting when an element changes size with ResizeObserver"),i.a.createElement("div",{className:c.a.blogDescription},t),i.a.createElement("div",{className:c.a.blogText},"Before getting into the ResizeObserver, let's first get refreshed on the different boxes HTML elements are made of. A standard element, take a ",i.a.createElement("code",null,"  <div> "),"for example, consists of a content box, and border box. The content box, depicted in blue in the image below, consists of all the content within the padding of the element. The border box consists of the border and everything within it."),i.a.createElement("div",{className:c.a.blogImage},i.a.createElement(h.a,{fluid:Object.assign({},e.node.childImageSharp.fluid),loading:"eager"})),i.a.createElement("div",{className:c.a.blogText},"As a web developer, you may want to choose which box size is relevant for your application. If it's just the content-box, then you can use ResizeObserver to observe only the content box. If you anticipate changes to padding or border, then the border-box can be observed as well."),i.a.createElement("div",{className:c.a.blogText},"If you want to observe SVG elements, ResizeObserver is able to track changes to the SVG bounding box. The bounding box, according to the ",i.a.createElement("a",{href:"https://www.w3.org/TR/SVG2/coords.html#BoundingBoxes"},"W3 SVG spec"),", is \"the tightest fitting rectangle aligned with the axes of that element's user coordinate system that entirely encloses it and its descendants.\" This means that ResizeObserver will report the bounding box size as the content box and border box for SVG elements. The ResizeObserver can also track changes to the device-pixel-content-box. I'll touch on this later on."),i.a.createElement("div",{className:c.a.blogSubheading},"How it works"),i.a.createElement("div",{className:c.a.blogText},"In order to use the API, you need to do two things. First, register the callback that is to be run."),i.a.createElement("pre",null,"\nvar ro = new ResizeObserver( entries => {\n  for (let entry of entries) {\n    let cs = window.getComputedStyle(entry.target);\n    console.log('watching element:', entry.target);\n    console.log(entry.borderBoxSize[0].inlineSize,' is ', cs.width);\n    console.log(entry.borderBoxSize[0].blockSize,' is ', cs.height);\n  }\n}"),i.a.createElement("div",{className:c.a.blogText},"As you create a ResizeObserver instance, pass in your callback, which takes an array of ResizeObserverEntry objects. Here, we're simply logging the newly reported border box size to the console via an anonymous callback. To take a deeper dive into what properties ResizeObserverEntry has, check out its prototype in dev tools! Or you can also see the spec ",i.a.createElement("a",{href:"https://www.w3.org/TR/resize-observer/#resize-observer-entry-interface"},"here"),"."),i.a.createElement("div",{className:c.a.blogText},"Next, start observing the element in question by calling ",i.a.createElement("br",null),i.a.createElement("code",null,"ro.observe(element, box: [box-type]);"),i.a.createElement("br",null),'Box type can be: "border-box", "content-box" or "device-pixel-content-box". Now, everytime our element changes its observed box, ResizeObserver will run our code above. Pretty simple in the end right?'),i.a.createElement("div",{className:c.a.blogSubheading},"Device-Pixel-Content-Box"),i.a.createElement("div",{className:c.a.blogText},"As seen earlier, ResizeObserver can also watch for changes to the device pixel (dp) content box. This box visually is the same as content-box, but its dimensions are recorded in physical device pixels rather than CSS pixels, which are what CSS normally uses."),i.a.createElement("div",{className:c.a.blogText},"This is useful for obtaining pixel snapped dimensions, which are essential for graphics related purposes; for example, setting the right canvas size which avoids Moire patterns. Let's say we have a canvas that is 50px wide, but located at (0.5, 0). Its width in device pixels would be 51 because it is covering half of the 0th pixel and half of the 51st pixel (in order to avoid anti-aliasing, the browser rounds up 0.5 to 1 and fully allocates that pixel as part of the canvas. In this case, we will want to resize the canvas width to 51px, so that everything inside it is drawn correctly."),i.a.createElement("div",{className:c.a.blogText},"Another application of dp content-box is on high DPI (dots per inch) displays. Due to pixel snapping described earlier, element.width * window.devicePixelRatio is not as accurate as getting the pixel snapped width from ResizeObserver. Check out this excellent",i.a.createElement("a",{href:"https://web.dev/device-pixel-content-box/"}," article")," for further details on device-pixel-content-box."),i.a.createElement("div",{className:c.a.blogSubheading},"Example Usage In sahirvellani.com"),i.a.createElement("div",{className:c.a.blogText},"I use ResizeObserver for my personal website in order to run some code when the page changes size. Here is how I did it, and how it can be used if you are using React."),i.a.createElement("pre",null,"\nconst MyComponent = ({ children }) => {\n  let handleResize = (entries) => {\n    let width;\n    if (entries[0].contentBoxSize) {\n      if (entries[0].contentBoxSize.inlineSize != undefined){\n        width = entries[0].contentBoxSize.inlineSize;\n      } else {\n        width = entries[0].contentBoxSize[0].inlineSize;\n      }\n    } else {\n      width = entries[0].contentRect.width;\n    }\n    if (width < 600) {\n      setIsMobile(true);\n    } else {\n      setIsMobile(false);\n    }\n  }\n\n  useEffect(() => {\n    let resize_observer = new ResizeObserver(handleResize);\n    if (ref.current) {\n      resize_observer.observe(ref.current);\n    }\n  }, [ref]);\n\n  return (\n    <div ref={ref}>\n      ...\n    </div>\n  )\n}\n          "),i.a.createElement("div",{className:c.a.blogText},"I use the ",i.a.createElement("a",{href:"https://reactjs.org/docs/hooks-effect.html"},"UseEffect")," hook to initialize the ResizeObserver and set it to observe the element I'm interested in via ",i.a.createElement("a",{href:"https://reactjs.org/docs/hooks-reference.html#useref"},"ref"),". It is re-initialized whenever the referenced element changes.")))}}}]);
//# sourceMappingURL=component---src-pages-blog-resize-observer-js-26df95a2bc521cc404a4.js.map