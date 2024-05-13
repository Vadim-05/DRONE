import{u as G}from"./GaDooijo.js";import{h as O,E as J,j as M,p as Q,F as H,G as X,H as C,l as Y,m as j,c as p,d as Z,r as S,o as K,g as ee,I as te,_ as R,i as b,t as x,J as I,A as _,z,x as L,K as E,L as $,B as W,y as ie,M as U,v as se,N as ne,O as oe}from"./CuQgwdZJ.js";async function re(e,t){return await ae(t).catch(i=>(console.error("Failed to get image meta for "+t,i+""),{width:0,height:0,ratio:0}))}async function ae(e){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((t,s)=>{const i=new Image;i.onload=()=>{const n={width:i.width,height:i.height,ratio:i.width/i.height};t(n)},i.onerror=n=>s(n),i.src=e})}function F(e){return t=>t?e[t]||t:e.missingValue}function de({formatter:e,keyMap:t,joinWith:s="/",valueMap:i}={}){e||(e=(o,r)=>`${o}=${r}`),t&&typeof t!="function"&&(t=F(t));const n=i||{};return Object.keys(n).forEach(o=>{typeof n[o]!="function"&&(n[o]=F(n[o]))}),(o={})=>Object.entries(o).filter(([a,l])=>typeof l<"u").map(([a,l])=>{const c=n[a];return typeof c=="function"&&(l=c(o[a])),a=typeof t=="function"?t(a):a,e(a,l)}).join(s)}function h(e=""){if(typeof e=="number")return e;if(typeof e=="string"&&e.replace("px","").match(/^\d+$/g))return Number.parseInt(e,10)}function le(e=""){if(e===void 0||!e.length)return[];const t=new Set;for(const s of e.split(" ")){const i=Number.parseInt(s.replace("x",""));i&&t.add(i)}return Array.from(t)}function ce(e){if(e.length===0)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}function ue(e){const t={};if(typeof e=="string")for(const s of e.split(/[\s,]+/).filter(i=>i)){const i=s.split(":");i.length!==2?t["1px"]=i[0].trim():t[i[0].trim()]=i[1].trim()}else Object.assign(t,e);return t}function fe(e){const t={options:e},s=(n,o={})=>V(t,n,o),i=(n,o={},r={})=>s(n,{...r,modifiers:H(o,r.modifiers||{})}).url;for(const n in e.presets)i[n]=(o,r,a)=>i(o,r,{...e.presets[n],...a});return i.options=e,i.getImage=s,i.getMeta=(n,o)=>ge(t,n,o),i.getSizes=(n,o)=>ve(t,n,o),t.$img=i,i}async function ge(e,t,s){const i=V(e,t,{...s});return typeof i.getMeta=="function"?await i.getMeta():await re(e,i.url)}function V(e,t,s){var c,u;if(t&&typeof t!="string")throw new TypeError(`input must be a string (received ${typeof t}: ${JSON.stringify(t)})`);if(!t||t.startsWith("data:"))return{url:t};const{provider:i,defaults:n}=he(e,s.provider||e.options.provider),o=me(e,s.preset);if(t=O(t)?t:J(t),!i.supportsAlias)for(const m in e.options.alias)t.startsWith(m)&&(t=M(e.options.alias[m],t.substr(m.length)));if(i.validateDomains&&O(t)){const m=Q(t).host;if(!e.options.domains.find(w=>w===m))return{url:t}}const r=H(s,o,n);r.modifiers={...r.modifiers};const a=r.modifiers.format;(c=r.modifiers)!=null&&c.width&&(r.modifiers.width=h(r.modifiers.width)),(u=r.modifiers)!=null&&u.height&&(r.modifiers.height=h(r.modifiers.height));const l=i.getImage(t,r,e);return l.format=l.format||a||"",l}function he(e,t){const s=e.options.providers[t];if(!s)throw new Error("Unknown provider: "+t);return s}function me(e,t){if(!t)return{};if(!e.options.presets[t])throw new Error("Unknown preset: "+t);return e.options.presets[t]}function ve(e,t,s){var g,N,P,k,A;const i=h((g=s.modifiers)==null?void 0:g.width),n=h((N=s.modifiers)==null?void 0:N.height),o=ue(s.sizes),r=(P=s.densities)!=null&&P.trim()?le(s.densities.trim()):e.options.densities;ce(r);const a=i&&n?n/i:0,l=[],c=[];if(Object.keys(o).length>=1){for(const f in o){const v=B(f,String(o[f]),n,a,e);if(v!==void 0){l.push({size:v.size,screenMaxWidth:v.screenMaxWidth,media:`(max-width: ${v.screenMaxWidth}px)`});for(const y of r)c.push({width:v._cWidth*y,src:D(e,t,s,v,y)})}}pe(l)}else for(const f of r){const v=Object.keys(o)[0];let y=B(v,String(o[v]),n,a,e);y===void 0&&(y={size:"",screenMaxWidth:0,_cWidth:(k=s.modifiers)==null?void 0:k.width,_cHeight:(A=s.modifiers)==null?void 0:A.height}),c.push({width:f,src:D(e,t,s,y,f)})}ye(c);const u=c[c.length-1],m=l.length?l.map(f=>`${f.media?f.media+" ":""}${f.size}`).join(", "):void 0,w=m?"w":"x",d=c.map(f=>`${f.src} ${f.width}${w}`).join(", ");return{sizes:m,srcset:d,src:u==null?void 0:u.src}}function B(e,t,s,i,n){const o=n.options.screens&&n.options.screens[e]||Number.parseInt(e),r=t.endsWith("vw");if(!r&&/^\d+$/.test(t)&&(t=t+"px"),!r&&!t.endsWith("px"))return;let a=Number.parseInt(t);if(!o||!a)return;r&&(a=Math.round(a/100*o));const l=i?Math.round(a*i):s;return{size:t,screenMaxWidth:o,_cWidth:a,_cHeight:l}}function D(e,t,s,i,n){return e.$img(t,{...s.modifiers,width:i._cWidth?i._cWidth*n:void 0,height:i._cHeight?i._cHeight*n:void 0},s)}function pe(e){var s;e.sort((i,n)=>i.screenMaxWidth-n.screenMaxWidth);let t=null;for(let i=e.length-1;i>=0;i--){const n=e[i];n.media===t&&e.splice(i,1),t=n.media}for(let i=0;i<e.length;i++)e[i].media=((s=e[i+1])==null?void 0:s.media)||""}function ye(e){e.sort((s,i)=>s.width-i.width);let t=null;for(let s=e.length-1;s>=0;s--){const i=e[s];i.width===t&&e.splice(s,1),t=i.width}}const _e=de({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(e,t)=>C(e)+"_"+C(t)}),we=(e,{modifiers:t={},baseURL:s}={},i)=>{t.width&&t.height&&(t.resize=`${t.width}x${t.height}`,delete t.width,delete t.height);const n=_e(t)||"_";return s||(s=M(i.options.nuxt.baseURL,"/_ipx")),{url:M(s,n,X(e))}},be=!0,Se=!0,xe=Object.freeze(Object.defineProperty({__proto__:null,getImage:we,supportsAlias:Se,validateDomains:be},Symbol.toStringTag,{value:"Module"})),q={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipxStatic",domains:[],alias:{},densities:[1,2],format:["webp"]};q.providers={ipxStatic:{provider:xe,defaults:{}}};const T=()=>{const e=Y(),t=j();return t.$img||t._img||(t._img=fe({...q,nuxt:{baseURL:e.app.baseURL}}))};function Ie(e){var t;(t=performance==null?void 0:performance.mark)==null||t.call(performance,"mark_feature_usage",{detail:{feature:e}})}const ze={src:{type:String,default:void 0},format:{type:String,default:void 0},quality:{type:[Number,String],default:void 0},background:{type:String,default:void 0},fit:{type:String,default:void 0},modifiers:{type:Object,default:void 0},preset:{type:String,default:void 0},provider:{type:String,default:void 0},sizes:{type:[Object,String],default:void 0},densities:{type:String,default:void 0},preload:{type:[Boolean,Object],default:void 0},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0},alt:{type:String,default:void 0},referrerpolicy:{type:String,default:void 0},usemap:{type:String,default:void 0},longdesc:{type:String,default:void 0},ismap:{type:Boolean,default:void 0},loading:{type:String,default:void 0,validator:e=>["lazy","eager"].includes(e)},crossorigin:{type:[Boolean,String],default:void 0,validator:e=>["anonymous","use-credentials","",!0,!1].includes(e)},decoding:{type:String,default:void 0,validator:e=>["async","auto","sync"].includes(e)},nonce:{type:[String],default:void 0}},$e=e=>{const t=p(()=>({provider:e.provider,preset:e.preset})),s=p(()=>({width:h(e.width),height:h(e.height),alt:e.alt,referrerpolicy:e.referrerpolicy,usemap:e.usemap,longdesc:e.longdesc,ismap:e.ismap,crossorigin:e.crossorigin===!0?"anonymous":e.crossorigin||void 0,loading:e.loading,decoding:e.decoding,nonce:e.nonce})),i=T(),n=p(()=>({...e.modifiers,width:h(e.width),height:h(e.height),format:e.format,quality:e.quality||i.options.quality,background:e.background,fit:e.fit}));return{options:t,attrs:s,modifiers:n}},Me={...ze,placeholder:{type:[Boolean,String,Number,Array],default:void 0},placeholderClass:{type:String,default:void 0}},We=Z({name:"NuxtImg",props:Me,emits:["load","error"],setup:(e,t)=>{const s=T(),i=$e(e),n=S(!1),o=S(),r=p(()=>s.getSizes(e.src,{...i.options.value,sizes:e.sizes,densities:e.densities,modifiers:{...i.modifiers.value,width:h(e.width),height:h(e.height)}})),a=p(()=>{const d={...i.attrs.value,"data-nuxt-img":""};return(!e.placeholder||n.value)&&(d.sizes=r.value.sizes,d.srcset=r.value.srcset),d}),l=p(()=>{let d=e.placeholder;if(d===""&&(d=!0),!d||n.value)return!1;if(typeof d=="string")return d;const g=Array.isArray(d)?d:typeof d=="number"?[d,d]:[10,10];return s(e.src,{...i.modifiers.value,width:g[0],height:g[1],quality:g[2]||50,blur:g[3]||3},i.options.value)}),c=p(()=>e.sizes?r.value.src:s(e.src,i.modifiers.value,i.options.value)),u=p(()=>l.value?l.value:c.value);if(e.preload){const d=Object.values(r.value).every(g=>g);G({link:[{rel:"preload",as:"image",nonce:e.nonce,...d?{href:r.value.src,imagesizes:r.value.sizes,imagesrcset:r.value.srcset}:{href:u.value},...typeof e.preload!="boolean"&&e.preload.fetchPriority?{fetchpriority:e.preload.fetchPriority}:{}}]})}const w=j().isHydrating;return K(()=>{if(l.value){const d=new Image;d.src=c.value,e.sizes&&(d.sizes=r.value.sizes||"",d.srcset=r.value.srcset),d.onload=g=>{n.value=!0,t.emit("load",g)},Ie("nuxt-image");return}o.value&&(o.value.complete&&w&&(o.value.getAttribute("data-error")?t.emit("error",new Event("error")):t.emit("load",new Event("load"))),o.value.onload=d=>{t.emit("load",d)},o.value.onerror=d=>{t.emit("error",d)})}),()=>ee("img",{ref:o,...a.value,...t.attrs,class:e.placeholder&&!n.value?[e.placeholderClass]:void 0,src:u.value})}}),je=te("/closeModal.png"),Ne={__name:"modalMessage",setup(e){var t=S(!1);const s=S("");return S(""),j().$bus.$on("dataModalWindow",n=>{t.value=!0,s.value=n.status}),(n,o)=>{const r=b("v-card-actions"),a=b("v-card-title"),l=b("v-card"),c=b("v-dialog");return x(),I(c,{class:"v-dialog",modelValue:$(t),"onUpdate:modelValue":o[1]||(o[1]=u=>E(t)?t.value=u:t=u),width:"auto"},{default:_(()=>[z(l,{class:"v-card"},{default:_(()=>[z(r,{class:"flex-end"},{default:_(()=>[L("img",{class:"close-modal-picture",onClick:o[0]||(o[0]=u=>E(t)?t.value=!1:t=!1),src:je})]),_:1}),$(s)?(x(),I(a,{key:0,class:"font-open-sans text-center"},{default:_(()=>[W(ie($(s)),1)]),_:1})):U("",!0)]),_:1})]),_:1},8,["modelValue"])}}},Pe=R(Ne,[["__scopeId","data-v-68b8a258"]]),ke=window.setInterval,Ae=[{timestamp:1683234e3,speed:"450.53",direction:"54.88"},{timestamp:1683234060,speed:"454.77",direction:"87.21"},{timestamp:1683234120,speed:"440.89",direction:"126.68"},{timestamp:1683234180,speed:"586.11",direction:"122.17"}],Oe={data(){return{droneStyle:{transform:"translate(0%, 0%)"},flightData:Ae,flightInterval:null,button:!0}},methods:{startFlight(){this.button=!1,this.flightInterval=ke(()=>{this.flightData.length>0?this.updatePosition(this.flightData.shift()):this.flightData.length==0?(this.stopFlight(null),this.$bus.$emit("dataModalWindow",{status:"Політ завершений."})):clearInterval(this.flightInterval)},1e3)},async stopFlight(e){clearInterval(this.flightInterval),this.droneStyle.transform="translate(0%, 0%)",this.button=e},updatePosition(e){const{speed:t,direction:s}=e,i=t/3600*1e3,n=i*Math.cos(s*(Math.PI/180)),o=i*Math.sin(s*(Math.PI/180));this.droneStyle.transform=`translate(${n}px, ${o}px)`}}},Ce={class:"main-content"};function Ee(e,t,s,i,n,o){const r=We,a=b("v-btn"),l=Pe;return x(),se(oe,null,[L("div",Ce,[z(r,{class:"drone position-absolute",style:ne(n.droneStyle),src:"/drone.jpg"},null,8,["style"]),n.button?(x(),I(a,{key:0,class:"stop-flight position-absolute",onClick:o.startFlight},{default:_(()=>[W("start")]),_:1},8,["onClick"])):n.button===!1?(x(),I(a,{key:1,class:"stop-flight position-absolute",onClick:t[0]||(t[0]=c=>o.stopFlight(!0))},{default:_(()=>[W("stop")]),_:1})):U("",!0)]),z(l)],64)}const De=R(Oe,[["render",Ee],["__scopeId","data-v-3b4486a5"]]);export{De as default};
