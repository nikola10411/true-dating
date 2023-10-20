(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8006],{46901:function(e,t,n){"use strict";n.d(t,{Z:function(){return k}});var r=n(63366),o=n(87462),l=n(67294),i=n(86010),s=n(94780),a=n(41796),c=n(90948),d=n(71657),u=n(98216),p=n(90629),h=n(1588),m=n(34867);function x(e){return(0,m.Z)("MuiAlert",e)}let g=(0,h.Z)("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]);var v=n(93946),f=n(88169),Z=n(85893),j=(0,f.Z)((0,Z.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),C=(0,f.Z)((0,Z.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),A=(0,f.Z)((0,Z.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),S=(0,f.Z)((0,Z.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),w=n(34484);let y=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],M=e=>{let{variant:t,color:n,severity:r,classes:o}=e,l={root:["root",`${t}${(0,u.Z)(n||r)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return(0,s.Z)(l,x,o)},b=(0,c.ZP)(p.Z,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`${n.variant}${(0,u.Z)(n.color||n.severity)}`]]}})(({theme:e,ownerState:t})=>{let n="light"===e.palette.mode?a._j:a.$n,r="light"===e.palette.mode?a.$n:a._j,l=t.color||t.severity;return(0,o.Z)({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},l&&"standard"===t.variant&&{color:e.vars?e.vars.palette.Alert[`${l}Color`]:n(e.palette[l].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${l}StandardBg`]:r(e.palette[l].light,.9),[`& .${g.icon}`]:e.vars?{color:e.vars.palette.Alert[`${l}IconColor`]}:{color:e.palette[l].main}},l&&"outlined"===t.variant&&{color:e.vars?e.vars.palette.Alert[`${l}Color`]:n(e.palette[l].light,.6),border:`1px solid ${(e.vars||e).palette[l].light}`,[`& .${g.icon}`]:e.vars?{color:e.vars.palette.Alert[`${l}IconColor`]}:{color:e.palette[l].main}},l&&"filled"===t.variant&&(0,o.Z)({fontWeight:e.typography.fontWeightMedium},e.vars?{color:e.vars.palette.Alert[`${l}FilledColor`],backgroundColor:e.vars.palette.Alert[`${l}FilledBg`]}:{backgroundColor:"dark"===e.palette.mode?e.palette[l].dark:e.palette[l].main,color:e.palette.getContrastText(e.palette[l].main)}))}),I=(0,c.ZP)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),$=(0,c.ZP)("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),z=(0,c.ZP)("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),P={success:(0,Z.jsx)(j,{fontSize:"inherit"}),warning:(0,Z.jsx)(C,{fontSize:"inherit"}),error:(0,Z.jsx)(A,{fontSize:"inherit"}),info:(0,Z.jsx)(S,{fontSize:"inherit"})},_=l.forwardRef(function(e,t){var n,l,s,a,c,u;let p=(0,d.Z)({props:e,name:"MuiAlert"}),{action:h,children:m,className:x,closeText:g="Close",color:f,components:j={},componentsProps:C={},icon:A,iconMapping:S=P,onClose:_,role:k="alert",severity:L="success",slotProps:N={},slots:E={},variant:R="standard"}=p,W=(0,r.Z)(p,y),O=(0,o.Z)({},p,{color:f,severity:L,variant:R}),B=M(O),T=null!=(n=null!=(l=E.closeButton)?l:j.CloseButton)?n:v.Z,H=null!=(s=null!=(a=E.closeIcon)?a:j.CloseIcon)?s:w.Z,D=null!=(c=N.closeButton)?c:C.closeButton,F=null!=(u=N.closeIcon)?u:C.closeIcon;return(0,Z.jsxs)(b,(0,o.Z)({role:k,elevation:0,ownerState:O,className:(0,i.Z)(B.root,x),ref:t},W,{children:[!1!==A?(0,Z.jsx)(I,{ownerState:O,className:B.icon,children:A||S[L]||P[L]}):null,(0,Z.jsx)($,{ownerState:O,className:B.message,children:m}),null!=h?(0,Z.jsx)(z,{ownerState:O,className:B.action,children:h}):null,null==h&&_?(0,Z.jsx)(z,{ownerState:O,className:B.action,children:(0,Z.jsx)(T,(0,o.Z)({size:"small","aria-label":g,title:g,color:"inherit",onClick:_},D,{children:(0,Z.jsx)(H,(0,o.Z)({fontSize:"small"},F))}))}):null]}))});var k=_},34484:function(e,t,n){"use strict";n(67294);var r=n(88169),o=n(85893);t.Z=(0,r.Z)((0,o.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},44688:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/reset-password",function(){return n(21746)}])},21746:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return x}});var r=n(85893),o=n(67294),l=n(19451),i=n(60075),s=n(64889),a=n(86886),c=n(99226),d=n(46901),u=n(61903),p=n(83321),h=n(98456),m=n(33866);function x(){let[e,t]=(0,o.useState)(""),[n,x]=(0,o.useState)(null),[g,v]=(0,o.useState)(!1),[f,Z]=(0,o.useState)(!1),[j,C]=(0,o.useState)(null),A=async t=>{t.preventDefault(),j&&C(null),n&&x(null);let r=(0,s.o)(e);if(!r)return x(INVALID_EMAIL);Z(!0);try{await (0,l.LS)(i.I8,e,{url:"".concat(window.location.origin,"/login")}),v(!0)}catch(e){e.code===USER_NOT_FOUND?C("This email is not registered!"):C(e.message)}Z(!1)};return(0,r.jsxs)(a.ZP,{container:!0,component:"main",sx:e=>({minHeight:"100vh",backgroundColor:e.palette.grey[100]}),children:[(0,r.jsx)(a.ZP,{item:!0,xs:!1,sm:4,md:7,sx:{backgroundImage:"url(https://source.unsplash.com/1600x900/?dating)",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}}),(0,r.jsx)(a.ZP,{item:!0,container:!0,xs:12,sm:8,md:5,sx:e=>({padding:e.spacing(4)}),children:(0,r.jsxs)(a.ZP,{container:!0,alignItems:"center",direction:"column",justifyContent:"center",children:[(0,r.jsx)(c.Z,{sx:e=>({maxWidth:400,marginBottom:e.spacing(4)}),children:(0,r.jsx)(m.Z,{})}),(0,r.jsx)(c.Z,{maxWidth:500,width:"100%",children:(0,r.jsxs)(c.Z,{width:"100%",children:[(0,r.jsx)(c.Z,{pb:2,children:(0,r.jsx)(d.Z,{severity:g?"success":"info",children:g?(0,r.jsxs)("span",{children:["Follow the instructions sent to ",(0,r.jsx)("strong",{children:e})," to recover your password"]}):"Get instructions sent to this email that explain how to reset your password"})}),j&&(0,r.jsx)(c.Z,{pb:2,children:(0,r.jsx)(d.Z,{severity:"error",children:j})}),(0,r.jsx)("form",{onChange:e=>{let{target:{value:n}}=e;t(n)},onSubmit:g?e=>(e.preventDefault(),history.push(routes.login)):A,children:(0,r.jsxs)(a.ZP,{container:!0,spacing:2,children:[!g&&(0,r.jsx)(a.ZP,{item:!0,xs:12,children:(0,r.jsx)(u.Z,{variant:"outlined",required:!0,fullWidth:!0,id:"email",label:"Email",name:"email",autoComplete:"email",autoFocus:!0,error:!!n,helperText:n||""})}),(0,r.jsx)(a.ZP,{item:!0,xs:12,children:(0,r.jsx)(p.Z,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",disabled:f,endIcon:f?(0,r.jsx)(h.Z,{size:16}):void 0,children:g?"Done":"Send"})})]})})]})})]})})]})}},64889:function(e,t,n){"use strict";n.d(t,{o:function(){return r}});let r=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}},function(e){e.O(0,[1903,9774,2888,179],function(){return e(e.s=44688)}),_N_E=e.O()}]);
//# sourceMappingURL=reset-password-fc4f484ea9369dfb.js.map