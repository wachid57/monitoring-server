import{j as v,a3 as Mt,r as F}from"./index-CJWZi9CB.js";import{B as Rt}from"./Breadcrumb-DR6zDa-i.js";import{P as Bt}from"./PageContainer-BR_WMDrZ.js";import{r as Ht,h as Vt,C as tt,d as Dt}from"./CodeDialog-BDx_UOfm.js";import{P as et}from"./ParentCard-CuAAl3Vl.js";import{c as zt,u as it}from"./Paper-Dk0UhltF.js";import{_ as z,b as dt,v as Lt,u as $t,T as vt}from"./Typography-DW8TAfFy.js";import{f as Ft,a as Ct,p as Q,z as St,Z as Et,B as Ut,R as Kt,D as Nt,C as Ot,c as Gt}from"./ChartsAxisHighlight-YKpwFUDQ.js";import{u as It,I as wt,b as At,a as Xt,w as Yt}from"./useChartContainerDimensions-CjTkzPDm.js";import{a as Zt,C as qt,b as Qt,e as ht}from"./ChartsOverlay-DMH5itXO.js";import{C as Jt}from"./ChartsGrid-rc7OgK4l.js";import{S as J}from"./Stack-C8hAk-Ua.js";import{S as Wt}from"./Slider-BP_fZjTi.js";import{F as xt}from"./FormControlLabel-gVATSXRg.js";import{C as ut}from"./Checkbox-H4Hg7Z4o.js";import{B as yt}from"./Box-B21Vn3Wr.js";import{I as te}from"./IconButton-Cf6Oa_Gi.js";import{G as ee}from"./Grid2-TKUllLdh.js";import"./index.esm-CBP19pFL.js";import"./index-BwqtTtay.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./ChartsText-CN86VXtv.js";import"./createStack-B05ZxkoV.js";import"./composeClasses-CkcSq-l_.js";import"./clamp-DyuOe9kr.js";import"./visuallyHidden-Dan1xhjv.js";import"./isHostComponent-DVu5iVWx.js";import"./formControlState-Dq1zat_P.js";import"./useFormControl-D8zMB56u.js";import"./SwitchBase-D_lOZTBK.js";const ie=zt(v.jsx("path",{d:"M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8"}),"UndoOutlined");var se=Ht();const jt=Mt(se);var kt=Vt(jt,{});kt.registerLanguage=jt.registerLanguage;function ne(u){const{series:t,xScale:e,yScale:s,color:i,colorGetter:n,markerSize:a,onItemClick:o}=u,r=It(),{useVoronoiInteraction:c}=F.useContext(wt),h=c||t.disableHover,l=Ft(h),{isFaded:d,isHighlighted:x}=Ct(),m=F.useMemo(()=>{const y=Q(e),_=Q(s),p=[];for(let g=0;g<t.data.length;g+=1){const C=t.data[g],w=y(C.x),T=_(C.y),k=r.isPointInside({x:w,y:T}),A={type:"scatter",seriesId:t.id,dataIndex:g};if(k){const I={seriesId:A.seriesId,dataIndex:A.dataIndex},f=x(I);p.push({x:w,y:T,isHighlighted:f,isFaded:!f&&d(I),interactionProps:l(A),id:C.id,dataIndex:g,color:n?n(g):i})}}return p},[e,s,r,t.data,t.id,x,d,l,n,i]);return v.jsx("g",{children:m.map(y=>v.jsx("circle",z({cx:0,cy:0,r:(y.isHighlighted?1.2:1)*a,transform:`translate(${y.x}, ${y.y})`,fill:y.color,opacity:y.isFaded&&.3||1,onClick:o&&(_=>o(_,{type:"scatter",seriesId:t.id,dataIndex:y.dataIndex})),cursor:o?"pointer":"unset"},y.interactionProps),y.id))})}function ae(u){const{slots:t,slotProps:e,onItemClick:s}=u,i=St(),n=At(),{zAxis:a,zAxisIds:o}=F.useContext(Et);if(i===void 0)return null;const{series:r,seriesOrder:c}=i,{xAxis:h,yAxis:l,xAxisIds:d,yAxisIds:x}=n,m=d[0],y=x[0],_=o[0],p=(t==null?void 0:t.scatter)??ne;return v.jsx(F.Fragment,{children:c.map(g=>{const{id:C,xAxisKey:w,yAxisKey:T,zAxisKey:k,xAxisId:A,yAxisId:I,zAxisId:f,markerSize:b,color:S}=r[g],j=Ut(r[g],h[A??w??m],l[I??T??y],a[f??k??_]),M=h[A??w??m].scale,R=l[I??T??y].scale;return v.jsx(p,z({xScale:M,yScale:R,color:S,colorGetter:j,markerSize:b??4,series:r[g],onItemClick:s},e==null?void 0:e.scatter),C)})})}const E=11102230246251565e-32,L=134217729,oe=(3+8*E)*E;function at(u,t,e,s,i){let n,a,o,r,c=t[0],h=s[0],l=0,d=0;h>c==h>-c?(n=c,c=t[++l]):(n=h,h=s[++d]);let x=0;if(l<u&&d<e)for(h>c==h>-c?(a=c+n,o=n-(a-c),c=t[++l]):(a=h+n,o=n-(a-h),h=s[++d]),n=a,o!==0&&(i[x++]=o);l<u&&d<e;)h>c==h>-c?(a=n+c,r=a-n,o=n-(a-r)+(c-r),c=t[++l]):(a=n+h,r=a-n,o=n-(a-r)+(h-r),h=s[++d]),n=a,o!==0&&(i[x++]=o);for(;l<u;)a=n+c,r=a-n,o=n-(a-r)+(c-r),c=t[++l],n=a,o!==0&&(i[x++]=o);for(;d<e;)a=n+h,r=a-n,o=n-(a-r)+(h-r),h=s[++d],n=a,o!==0&&(i[x++]=o);return(n!==0||x===0)&&(i[x++]=n),x}function re(u,t){let e=t[0];for(let s=1;s<u;s++)e+=t[s];return e}function Y(u){return new Float64Array(u)}const le=(3+16*E)*E,ce=(2+12*E)*E,de=(9+64*E)*E*E,N=Y(4),mt=Y(8),ft=Y(12),pt=Y(16),$=Y(4);function he(u,t,e,s,i,n,a){let o,r,c,h,l,d,x,m,y,_,p,g,C,w,T,k,A,I;const f=u-i,b=e-i,S=t-n,j=s-n;w=f*j,d=L*f,x=d-(d-f),m=f-x,d=L*j,y=d-(d-j),_=j-y,T=m*_-(w-x*y-m*y-x*_),k=S*b,d=L*S,x=d-(d-S),m=S-x,d=L*b,y=d-(d-b),_=b-y,A=m*_-(k-x*y-m*y-x*_),p=T-A,l=T-p,N[0]=T-(p+l)+(l-A),g=w+p,l=g-w,C=w-(g-l)+(p-l),p=C-k,l=C-p,N[1]=C-(p+l)+(l-k),I=g+p,l=I-g,N[2]=g-(I-l)+(p-l),N[3]=I;let M=re(4,N),R=ce*a;if(M>=R||-M>=R||(l=u-f,o=u-(f+l)+(l-i),l=e-b,c=e-(b+l)+(l-i),l=t-S,r=t-(S+l)+(l-n),l=s-j,h=s-(j+l)+(l-n),o===0&&r===0&&c===0&&h===0)||(R=de*a+oe*Math.abs(M),M+=f*h+j*o-(S*c+b*r),M>=R||-M>=R))return M;w=o*j,d=L*o,x=d-(d-o),m=o-x,d=L*j,y=d-(d-j),_=j-y,T=m*_-(w-x*y-m*y-x*_),k=r*b,d=L*r,x=d-(d-r),m=r-x,d=L*b,y=d-(d-b),_=b-y,A=m*_-(k-x*y-m*y-x*_),p=T-A,l=T-p,$[0]=T-(p+l)+(l-A),g=w+p,l=g-w,C=w-(g-l)+(p-l),p=C-k,l=C-p,$[1]=C-(p+l)+(l-k),I=g+p,l=I-g,$[2]=g-(I-l)+(p-l),$[3]=I;const H=at(4,N,4,$,mt);w=f*h,d=L*f,x=d-(d-f),m=f-x,d=L*h,y=d-(d-h),_=h-y,T=m*_-(w-x*y-m*y-x*_),k=S*c,d=L*S,x=d-(d-S),m=S-x,d=L*c,y=d-(d-c),_=c-y,A=m*_-(k-x*y-m*y-x*_),p=T-A,l=T-p,$[0]=T-(p+l)+(l-A),g=w+p,l=g-w,C=w-(g-l)+(p-l),p=C-k,l=C-p,$[1]=C-(p+l)+(l-k),I=g+p,l=I-g,$[2]=g-(I-l)+(p-l),$[3]=I;const P=at(H,mt,4,$,ft);w=o*h,d=L*o,x=d-(d-o),m=o-x,d=L*h,y=d-(d-h),_=h-y,T=m*_-(w-x*y-m*y-x*_),k=r*c,d=L*r,x=d-(d-r),m=r-x,d=L*c,y=d-(d-c),_=c-y,A=m*_-(k-x*y-m*y-x*_),p=T-A,l=T-p,$[0]=T-(p+l)+(l-A),g=w+p,l=g-w,C=w-(g-l)+(p-l),p=C-k,l=C-p,$[1]=C-(p+l)+(l-k),I=g+p,l=I-g,$[2]=g-(I-l)+(p-l),$[3]=I;const B=at(P,ft,4,$,pt);return pt[B-1]}function Z(u,t,e,s,i,n){const a=(t-n)*(e-i),o=(u-i)*(s-n),r=a-o,c=Math.abs(a+o);return Math.abs(r)>=le*c?r:-he(u,t,e,s,i,n,c)}const gt=Math.pow(2,-52),q=new Uint32Array(512);class W{static from(t,e=fe,s=pe){const i=t.length,n=new Float64Array(i*2);for(let a=0;a<i;a++){const o=t[a];n[2*a]=e(o),n[2*a+1]=s(o)}return new W(n)}constructor(t){const e=t.length>>1;if(e>0&&typeof t[0]!="number")throw new Error("Expected coords to contain numbers.");this.coords=t;const s=Math.max(2*e-5,0);this._triangles=new Uint32Array(s*3),this._halfedges=new Int32Array(s*3),this._hashSize=Math.ceil(Math.sqrt(e)),this._hullPrev=new Uint32Array(e),this._hullNext=new Uint32Array(e),this._hullTri=new Uint32Array(e),this._hullHash=new Int32Array(this._hashSize),this._ids=new Uint32Array(e),this._dists=new Float64Array(e),this.update()}update(){const{coords:t,_hullPrev:e,_hullNext:s,_hullTri:i,_hullHash:n}=this,a=t.length>>1;let o=1/0,r=1/0,c=-1/0,h=-1/0;for(let f=0;f<a;f++){const b=t[2*f],S=t[2*f+1];b<o&&(o=b),S<r&&(r=S),b>c&&(c=b),S>h&&(h=S),this._ids[f]=f}const l=(o+c)/2,d=(r+h)/2;let x,m,y;for(let f=0,b=1/0;f<a;f++){const S=ot(l,d,t[2*f],t[2*f+1]);S<b&&(x=f,b=S)}const _=t[2*x],p=t[2*x+1];for(let f=0,b=1/0;f<a;f++){if(f===x)continue;const S=ot(_,p,t[2*f],t[2*f+1]);S<b&&S>0&&(m=f,b=S)}let g=t[2*m],C=t[2*m+1],w=1/0;for(let f=0;f<a;f++){if(f===x||f===m)continue;const b=ye(_,p,g,C,t[2*f],t[2*f+1]);b<w&&(y=f,w=b)}let T=t[2*y],k=t[2*y+1];if(w===1/0){for(let S=0;S<a;S++)this._dists[S]=t[2*S]-t[0]||t[2*S+1]-t[1];G(this._ids,this._dists,0,a-1);const f=new Uint32Array(a);let b=0;for(let S=0,j=-1/0;S<a;S++){const M=this._ids[S],R=this._dists[M];R>j&&(f[b++]=M,j=R)}this.hull=f.subarray(0,b),this.triangles=new Uint32Array(0),this.halfedges=new Uint32Array(0);return}if(Z(_,p,g,C,T,k)<0){const f=m,b=g,S=C;m=y,g=T,C=k,y=f,T=b,k=S}const A=me(_,p,g,C,T,k);this._cx=A.x,this._cy=A.y;for(let f=0;f<a;f++)this._dists[f]=ot(t[2*f],t[2*f+1],A.x,A.y);G(this._ids,this._dists,0,a-1),this._hullStart=x;let I=3;s[x]=e[y]=m,s[m]=e[x]=y,s[y]=e[m]=x,i[x]=0,i[m]=1,i[y]=2,n.fill(-1),n[this._hashKey(_,p)]=x,n[this._hashKey(g,C)]=m,n[this._hashKey(T,k)]=y,this.trianglesLen=0,this._addTriangle(x,m,y,-1,-1,-1);for(let f=0,b,S;f<this._ids.length;f++){const j=this._ids[f],M=t[2*j],R=t[2*j+1];if(f>0&&Math.abs(M-b)<=gt&&Math.abs(R-S)<=gt||(b=M,S=R,j===x||j===m||j===y))continue;let H=0;for(let U=0,nt=this._hashKey(M,R);U<this._hashSize&&(H=n[(nt+U)%this._hashSize],!(H!==-1&&H!==s[H]));U++);H=e[H];let P=H,B;for(;B=s[P],Z(M,R,t[2*P],t[2*P+1],t[2*B],t[2*B+1])>=0;)if(P=B,P===H){P=-1;break}if(P===-1)continue;let V=this._addTriangle(P,j,s[P],-1,-1,i[P]);i[j]=this._legalize(V+2),i[P]=V,I++;let D=s[P];for(;B=s[D],Z(M,R,t[2*D],t[2*D+1],t[2*B],t[2*B+1])<0;)V=this._addTriangle(D,j,B,i[j],-1,i[D]),i[j]=this._legalize(V+2),s[D]=D,I--,D=B;if(P===H)for(;B=e[P],Z(M,R,t[2*B],t[2*B+1],t[2*P],t[2*P+1])<0;)V=this._addTriangle(B,j,P,-1,i[P],i[B]),this._legalize(V+2),i[B]=V,s[P]=P,I--,P=B;this._hullStart=e[j]=P,s[P]=e[D]=j,s[j]=D,n[this._hashKey(M,R)]=j,n[this._hashKey(t[2*P],t[2*P+1])]=P}this.hull=new Uint32Array(I);for(let f=0,b=this._hullStart;f<I;f++)this.hull[f]=b,b=s[b];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(t,e){return Math.floor(xe(t-this._cx,e-this._cy)*this._hashSize)%this._hashSize}_legalize(t){const{_triangles:e,_halfedges:s,coords:i}=this;let n=0,a=0;for(;;){const o=s[t],r=t-t%3;if(a=r+(t+2)%3,o===-1){if(n===0)break;t=q[--n];continue}const c=o-o%3,h=r+(t+1)%3,l=c+(o+2)%3,d=e[a],x=e[t],m=e[h],y=e[l];if(ue(i[2*d],i[2*d+1],i[2*x],i[2*x+1],i[2*m],i[2*m+1],i[2*y],i[2*y+1])){e[t]=y,e[o]=d;const p=s[l];if(p===-1){let C=this._hullStart;do{if(this._hullTri[C]===l){this._hullTri[C]=t;break}C=this._hullPrev[C]}while(C!==this._hullStart)}this._link(t,p),this._link(o,s[a]),this._link(a,l);const g=c+(o+1)%3;n<q.length&&(q[n++]=g)}else{if(n===0)break;t=q[--n]}}return a}_link(t,e){this._halfedges[t]=e,e!==-1&&(this._halfedges[e]=t)}_addTriangle(t,e,s,i,n,a){const o=this.trianglesLen;return this._triangles[o]=t,this._triangles[o+1]=e,this._triangles[o+2]=s,this._link(o,i),this._link(o+1,n),this._link(o+2,a),this.trianglesLen+=3,o}}function xe(u,t){const e=u/(Math.abs(u)+Math.abs(t));return(t>0?3-e:1+e)/4}function ot(u,t,e,s){const i=u-e,n=t-s;return i*i+n*n}function ue(u,t,e,s,i,n,a,o){const r=u-a,c=t-o,h=e-a,l=s-o,d=i-a,x=n-o,m=r*r+c*c,y=h*h+l*l,_=d*d+x*x;return r*(l*_-y*x)-c*(h*_-y*d)+m*(h*x-l*d)<0}function ye(u,t,e,s,i,n){const a=e-u,o=s-t,r=i-u,c=n-t,h=a*a+o*o,l=r*r+c*c,d=.5/(a*c-o*r),x=(c*h-o*l)*d,m=(a*l-r*h)*d;return x*x+m*m}function me(u,t,e,s,i,n){const a=e-u,o=s-t,r=i-u,c=n-t,h=a*a+o*o,l=r*r+c*c,d=.5/(a*c-o*r),x=u+(c*h-o*l)*d,m=t+(a*l-r*h)*d;return{x,y:m}}function G(u,t,e,s){if(s-e<=20)for(let i=e+1;i<=s;i++){const n=u[i],a=t[n];let o=i-1;for(;o>=e&&t[u[o]]>a;)u[o+1]=u[o--];u[o+1]=n}else{const i=e+s>>1;let n=e+1,a=s;X(u,i,n),t[u[e]]>t[u[s]]&&X(u,e,s),t[u[n]]>t[u[s]]&&X(u,n,s),t[u[e]]>t[u[n]]&&X(u,e,n);const o=u[n],r=t[o];for(;;){do n++;while(t[u[n]]<r);do a--;while(t[u[a]]>r);if(a<n)break;X(u,n,a)}u[e+1]=u[a],u[a]=o,s-n+1>=a-e?(G(u,t,n,s),G(u,t,e,a-1)):(G(u,t,e,a-1),G(u,t,n,s))}}function X(u,t,e){const s=u[t];u[t]=u[e],u[e]=s}function fe(u){return u[0]}function pe(u){return u[1]}const _t=1e-6;class K{constructor(){this._x0=this._y0=this._x1=this._y1=null,this._=""}moveTo(t,e){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")}lineTo(t,e){this._+=`L${this._x1=+t},${this._y1=+e}`}arc(t,e,s){t=+t,e=+e,s=+s;const i=t+s,n=e;if(s<0)throw new Error("negative radius");this._x1===null?this._+=`M${i},${n}`:(Math.abs(this._x1-i)>_t||Math.abs(this._y1-n)>_t)&&(this._+="L"+i+","+n),s&&(this._+=`A${s},${s},0,1,1,${t-s},${e}A${s},${s},0,1,1,${this._x1=i},${this._y1=n}`)}rect(t,e,s,i){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${+s}v${+i}h${-s}Z`}value(){return this._||null}}class lt{constructor(){this._=[]}moveTo(t,e){this._.push([t,e])}closePath(){this._.push(this._[0].slice())}lineTo(t,e){this._.push([t,e])}value(){return this._.length?this._:null}}class ge{constructor(t,[e,s,i,n]=[0,0,960,500]){if(!((i=+i)>=(e=+e))||!((n=+n)>=(s=+s)))throw new Error("invalid bounds");this.delaunay=t,this._circumcenters=new Float64Array(t.points.length*2),this.vectors=new Float64Array(t.points.length*2),this.xmax=i,this.xmin=e,this.ymax=n,this.ymin=s,this._init()}update(){return this.delaunay.update(),this._init(),this}_init(){const{delaunay:{points:t,hull:e,triangles:s},vectors:i}=this;let n,a;const o=this.circumcenters=this._circumcenters.subarray(0,s.length/3*2);for(let y=0,_=0,p=s.length,g,C;y<p;y+=3,_+=2){const w=s[y]*2,T=s[y+1]*2,k=s[y+2]*2,A=t[w],I=t[w+1],f=t[T],b=t[T+1],S=t[k],j=t[k+1],M=f-A,R=b-I,H=S-A,P=j-I,B=(M*P-R*H)*2;if(Math.abs(B)<1e-9){if(n===void 0){n=a=0;for(const D of e)n+=t[D*2],a+=t[D*2+1];n/=e.length,a/=e.length}const V=1e9*Math.sign((n-A)*P-(a-I)*H);g=(A+S)/2-V*P,C=(I+j)/2+V*H}else{const V=1/B,D=M*M+R*R,U=H*H+P*P;g=A+(P*D-R*U)*V,C=I+(M*U-H*D)*V}o[_]=g,o[_+1]=C}let r=e[e.length-1],c,h=r*4,l,d=t[2*r],x,m=t[2*r+1];i.fill(0);for(let y=0;y<e.length;++y)r=e[y],c=h,l=d,x=m,h=r*4,d=t[2*r],m=t[2*r+1],i[c+2]=i[h]=x-m,i[c+3]=i[h+1]=d-l}render(t){const e=t==null?t=new K:void 0,{delaunay:{halfedges:s,inedges:i,hull:n},circumcenters:a,vectors:o}=this;if(n.length<=1)return null;for(let h=0,l=s.length;h<l;++h){const d=s[h];if(d<h)continue;const x=Math.floor(h/3)*2,m=Math.floor(d/3)*2,y=a[x],_=a[x+1],p=a[m],g=a[m+1];this._renderSegment(y,_,p,g,t)}let r,c=n[n.length-1];for(let h=0;h<n.length;++h){r=c,c=n[h];const l=Math.floor(i[c]/3)*2,d=a[l],x=a[l+1],m=r*4,y=this._project(d,x,o[m+2],o[m+3]);y&&this._renderSegment(d,x,y[0],y[1],t)}return e&&e.value()}renderBounds(t){const e=t==null?t=new K:void 0;return t.rect(this.xmin,this.ymin,this.xmax-this.xmin,this.ymax-this.ymin),e&&e.value()}renderCell(t,e){const s=e==null?e=new K:void 0,i=this._clip(t);if(i===null||!i.length)return;e.moveTo(i[0],i[1]);let n=i.length;for(;i[0]===i[n-2]&&i[1]===i[n-1]&&n>1;)n-=2;for(let a=2;a<n;a+=2)(i[a]!==i[a-2]||i[a+1]!==i[a-1])&&e.lineTo(i[a],i[a+1]);return e.closePath(),s&&s.value()}*cellPolygons(){const{delaunay:{points:t}}=this;for(let e=0,s=t.length/2;e<s;++e){const i=this.cellPolygon(e);i&&(i.index=e,yield i)}}cellPolygon(t){const e=new lt;return this.renderCell(t,e),e.value()}_renderSegment(t,e,s,i,n){let a;const o=this._regioncode(t,e),r=this._regioncode(s,i);o===0&&r===0?(n.moveTo(t,e),n.lineTo(s,i)):(a=this._clipSegment(t,e,s,i,o,r))&&(n.moveTo(a[0],a[1]),n.lineTo(a[2],a[3]))}contains(t,e,s){return e=+e,e!==e||(s=+s,s!==s)?!1:this.delaunay._step(t,e,s)===t}*neighbors(t){const e=this._clip(t);if(e)for(const s of this.delaunay.neighbors(t)){const i=this._clip(s);if(i){t:for(let n=0,a=e.length;n<a;n+=2)for(let o=0,r=i.length;o<r;o+=2)if(e[n]===i[o]&&e[n+1]===i[o+1]&&e[(n+2)%a]===i[(o+r-2)%r]&&e[(n+3)%a]===i[(o+r-1)%r]){yield s;break t}}}}_cell(t){const{circumcenters:e,delaunay:{inedges:s,halfedges:i,triangles:n}}=this,a=s[t];if(a===-1)return null;const o=[];let r=a;do{const c=Math.floor(r/3);if(o.push(e[c*2],e[c*2+1]),r=r%3===2?r-2:r+1,n[r]!==t)break;r=i[r]}while(r!==a&&r!==-1);return o}_clip(t){if(t===0&&this.delaunay.hull.length===1)return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];const e=this._cell(t);if(e===null)return null;const{vectors:s}=this,i=t*4;return this._simplify(s[i]||s[i+1]?this._clipInfinite(t,e,s[i],s[i+1],s[i+2],s[i+3]):this._clipFinite(t,e))}_clipFinite(t,e){const s=e.length;let i=null,n,a,o=e[s-2],r=e[s-1],c,h=this._regioncode(o,r),l,d=0;for(let x=0;x<s;x+=2)if(n=o,a=r,o=e[x],r=e[x+1],c=h,h=this._regioncode(o,r),c===0&&h===0)l=d,d=0,i?i.push(o,r):i=[o,r];else{let m,y,_,p,g;if(c===0){if((m=this._clipSegment(n,a,o,r,c,h))===null)continue;[y,_,p,g]=m}else{if((m=this._clipSegment(o,r,n,a,h,c))===null)continue;[p,g,y,_]=m,l=d,d=this._edgecode(y,_),l&&d&&this._edge(t,l,d,i,i.length),i?i.push(y,_):i=[y,_]}l=d,d=this._edgecode(p,g),l&&d&&this._edge(t,l,d,i,i.length),i?i.push(p,g):i=[p,g]}if(i)l=d,d=this._edgecode(i[0],i[1]),l&&d&&this._edge(t,l,d,i,i.length);else if(this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2))return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];return i}_clipSegment(t,e,s,i,n,a){const o=n<a;for(o&&([t,e,s,i,n,a]=[s,i,t,e,a,n]);;){if(n===0&&a===0)return o?[s,i,t,e]:[t,e,s,i];if(n&a)return null;let r,c,h=n||a;h&8?(r=t+(s-t)*(this.ymax-e)/(i-e),c=this.ymax):h&4?(r=t+(s-t)*(this.ymin-e)/(i-e),c=this.ymin):h&2?(c=e+(i-e)*(this.xmax-t)/(s-t),r=this.xmax):(c=e+(i-e)*(this.xmin-t)/(s-t),r=this.xmin),n?(t=r,e=c,n=this._regioncode(t,e)):(s=r,i=c,a=this._regioncode(s,i))}}_clipInfinite(t,e,s,i,n,a){let o=Array.from(e),r;if((r=this._project(o[0],o[1],s,i))&&o.unshift(r[0],r[1]),(r=this._project(o[o.length-2],o[o.length-1],n,a))&&o.push(r[0],r[1]),o=this._clipFinite(t,o))for(let c=0,h=o.length,l,d=this._edgecode(o[h-2],o[h-1]);c<h;c+=2)l=d,d=this._edgecode(o[c],o[c+1]),l&&d&&(c=this._edge(t,l,d,o,c),h=o.length);else this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2)&&(o=[this.xmin,this.ymin,this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax]);return o}_edge(t,e,s,i,n){for(;e!==s;){let a,o;switch(e){case 5:e=4;continue;case 4:e=6,a=this.xmax,o=this.ymin;break;case 6:e=2;continue;case 2:e=10,a=this.xmax,o=this.ymax;break;case 10:e=8;continue;case 8:e=9,a=this.xmin,o=this.ymax;break;case 9:e=1;continue;case 1:e=5,a=this.xmin,o=this.ymin;break}(i[n]!==a||i[n+1]!==o)&&this.contains(t,a,o)&&(i.splice(n,0,a,o),n+=2)}return n}_project(t,e,s,i){let n=1/0,a,o,r;if(i<0){if(e<=this.ymin)return null;(a=(this.ymin-e)/i)<n&&(r=this.ymin,o=t+(n=a)*s)}else if(i>0){if(e>=this.ymax)return null;(a=(this.ymax-e)/i)<n&&(r=this.ymax,o=t+(n=a)*s)}if(s>0){if(t>=this.xmax)return null;(a=(this.xmax-t)/s)<n&&(o=this.xmax,r=e+(n=a)*i)}else if(s<0){if(t<=this.xmin)return null;(a=(this.xmin-t)/s)<n&&(o=this.xmin,r=e+(n=a)*i)}return[o,r]}_edgecode(t,e){return(t===this.xmin?1:t===this.xmax?2:0)|(e===this.ymin?4:e===this.ymax?8:0)}_regioncode(t,e){return(t<this.xmin?1:t>this.xmax?2:0)|(e<this.ymin?4:e>this.ymax?8:0)}_simplify(t){if(t&&t.length>4){for(let e=0;e<t.length;e+=2){const s=(e+2)%t.length,i=(e+4)%t.length;(t[e]===t[s]&&t[s]===t[i]||t[e+1]===t[s+1]&&t[s+1]===t[i+1])&&(t.splice(s,2),e-=2)}t.length||(t=null)}return t}}const _e=2*Math.PI,O=Math.pow;function be(u){return u[0]}function ve(u){return u[1]}function Ce(u){const{triangles:t,coords:e}=u;for(let s=0;s<t.length;s+=3){const i=2*t[s],n=2*t[s+1],a=2*t[s+2];if((e[a]-e[i])*(e[n+1]-e[i+1])-(e[n]-e[i])*(e[a+1]-e[i+1])>1e-10)return!1}return!0}function Se(u,t,e){return[u+Math.sin(u+t)*e,t+Math.cos(u-t)*e]}class ct{static from(t,e=be,s=ve,i){return new ct("length"in t?Ie(t,e,s,i):Float64Array.from(we(t,e,s,i)))}constructor(t){this._delaunator=new W(t),this.inedges=new Int32Array(t.length/2),this._hullIndex=new Int32Array(t.length/2),this.points=this._delaunator.coords,this._init()}update(){return this._delaunator.update(),this._init(),this}_init(){const t=this._delaunator,e=this.points;if(t.hull&&t.hull.length>2&&Ce(t)){this.collinear=Int32Array.from({length:e.length/2},(d,x)=>x).sort((d,x)=>e[2*d]-e[2*x]||e[2*d+1]-e[2*x+1]);const r=this.collinear[0],c=this.collinear[this.collinear.length-1],h=[e[2*r],e[2*r+1],e[2*c],e[2*c+1]],l=1e-8*Math.hypot(h[3]-h[1],h[2]-h[0]);for(let d=0,x=e.length/2;d<x;++d){const m=Se(e[2*d],e[2*d+1],l);e[2*d]=m[0],e[2*d+1]=m[1]}this._delaunator=new W(e)}else delete this.collinear;const s=this.halfedges=this._delaunator.halfedges,i=this.hull=this._delaunator.hull,n=this.triangles=this._delaunator.triangles,a=this.inedges.fill(-1),o=this._hullIndex.fill(-1);for(let r=0,c=s.length;r<c;++r){const h=n[r%3===2?r-2:r+1];(s[r]===-1||a[h]===-1)&&(a[h]=r)}for(let r=0,c=i.length;r<c;++r)o[i[r]]=r;i.length<=2&&i.length>0&&(this.triangles=new Int32Array(3).fill(-1),this.halfedges=new Int32Array(3).fill(-1),this.triangles[0]=i[0],a[i[0]]=1,i.length===2&&(a[i[1]]=0,this.triangles[1]=i[1],this.triangles[2]=i[1]))}voronoi(t){return new ge(this,t)}*neighbors(t){const{inedges:e,hull:s,_hullIndex:i,halfedges:n,triangles:a,collinear:o}=this;if(o){const l=o.indexOf(t);l>0&&(yield o[l-1]),l<o.length-1&&(yield o[l+1]);return}const r=e[t];if(r===-1)return;let c=r,h=-1;do{if(yield h=a[c],c=c%3===2?c-2:c+1,a[c]!==t)return;if(c=n[c],c===-1){const l=s[(i[t]+1)%s.length];l!==h&&(yield l);return}}while(c!==r)}find(t,e,s=0){if(t=+t,t!==t||(e=+e,e!==e))return-1;const i=s;let n;for(;(n=this._step(s,t,e))>=0&&n!==s&&n!==i;)s=n;return n}_step(t,e,s){const{inedges:i,hull:n,_hullIndex:a,halfedges:o,triangles:r,points:c}=this;if(i[t]===-1||!c.length)return(t+1)%(c.length>>1);let h=t,l=O(e-c[t*2],2)+O(s-c[t*2+1],2);const d=i[t];let x=d;do{let m=r[x];const y=O(e-c[m*2],2)+O(s-c[m*2+1],2);if(y<l&&(l=y,h=m),x=x%3===2?x-2:x+1,r[x]!==t)break;if(x=o[x],x===-1){if(x=n[(a[t]+1)%n.length],x!==m&&O(e-c[x*2],2)+O(s-c[x*2+1],2)<l)return x;break}}while(x!==d);return h}render(t){const e=t==null?t=new K:void 0,{points:s,halfedges:i,triangles:n}=this;for(let a=0,o=i.length;a<o;++a){const r=i[a];if(r<a)continue;const c=n[a]*2,h=n[r]*2;t.moveTo(s[c],s[c+1]),t.lineTo(s[h],s[h+1])}return this.renderHull(t),e&&e.value()}renderPoints(t,e){e===void 0&&(!t||typeof t.moveTo!="function")&&(e=t,t=null),e=e==null?2:+e;const s=t==null?t=new K:void 0,{points:i}=this;for(let n=0,a=i.length;n<a;n+=2){const o=i[n],r=i[n+1];t.moveTo(o+e,r),t.arc(o,r,e,0,_e)}return s&&s.value()}renderHull(t){const e=t==null?t=new K:void 0,{hull:s,points:i}=this,n=s[0]*2,a=s.length;t.moveTo(i[n],i[n+1]);for(let o=1;o<a;++o){const r=2*s[o];t.lineTo(i[r],i[r+1])}return t.closePath(),e&&e.value()}hullPolygon(){const t=new lt;return this.renderHull(t),t.value()}renderTriangle(t,e){const s=e==null?e=new K:void 0,{points:i,triangles:n}=this,a=n[t*=3]*2,o=n[t+1]*2,r=n[t+2]*2;return e.moveTo(i[a],i[a+1]),e.lineTo(i[o],i[o+1]),e.lineTo(i[r],i[r+1]),e.closePath(),s&&s.value()}*trianglePolygons(){const{triangles:t}=this;for(let e=0,s=t.length/3;e<s;++e)yield this.trianglePolygon(e)}trianglePolygon(t){const e=new lt;return this.renderTriangle(t,e),e.value()}}function Ie(u,t,e,s){const i=u.length,n=new Float64Array(i*2);for(let a=0;a<i;++a){const o=u[a];n[a*2]=t.call(s,o,a,u),n[a*2+1]=e.call(s,o,a,u)}return n}function*we(u,t,e,s){let i=0;for(const n of u)yield t.call(s,n,i,u),yield e.call(s,n,i,u),++i}function Ae(u){const{voronoiMaxRadius:t,onItemClick:e}=u,s=Xt(),i=It(),{xAxis:n,yAxis:a,xAxisIds:o,yAxisIds:r}=At(),{dispatch:c}=F.useContext(wt),{series:h,seriesOrder:l}=St()??{},d=F.useRef({}),x=F.useRef(void 0),m=F.useRef(void 0),{setHighlighted:y,clearHighlighted:_}=Ct(),p=o[0],g=r[0];return dt(()=>(c({type:"updateVoronoiUsage",useVoronoiInteraction:!0}),()=>{c({type:"updateVoronoiUsage",useVoronoiInteraction:!1})}),[c]),dt(()=>{if(l===void 0||h===void 0)return;d.current={};let C=[];l.forEach(w=>{const{data:T,xAxisId:k,yAxisId:A,xAxisKey:I,yAxisKey:f}=h[w],b=n[k??I??p].scale,S=a[A??f??g].scale,j=Q(b),M=Q(S),R=T.flatMap(({x:H,y:P})=>{const B=j(H),V=M(P);return i.isPointInside({x:B,y:V})?[B,V]:[-i.width,-i.height]});d.current[w]={seriesId:w,startIndex:C.length,endIndex:C.length+R.length},C=C.concat(R)}),x.current=new ct(C),m.current=void 0},[p,g,h,l,n,a,i]),F.useEffect(()=>{const C=s.current;if(C===null)return;function w(I){const f=Yt(C,I);if(!i.isPointInside(f))return m.current=void 0,"outside-chart";if(!x.current)return"no-point-found";const b=x.current.find(f.x,f.y,m.current);if(b===void 0)return"no-point-found";m.current=b;const S=Object.values(d.current).find(M=>2*b>=M.startIndex&&2*b<M.endIndex);if(S===void 0)return"no-point-found";const j=(2*b-d.current[S.seriesId].startIndex)/2;if(t!==void 0){const M=x.current.points[2*b],R=x.current.points[2*b+1];if((M-f.x)**2+(R-f.y)**2>t**2)return"outside-voronoi-max-radius"}return{seriesId:S.seriesId,dataIndex:j}}const T=()=>{c({type:"exitChart"}),_()},k=I=>{const f=w(I);if(f==="outside-chart"){c({type:"exitChart"}),_();return}if(f==="outside-voronoi-max-radius"||f==="no-point-found"){c({type:"leaveItem",data:{type:"scatter"}}),_();return}const{seriesId:b,dataIndex:S}=f;c({type:"enterItem",data:{type:"scatter",seriesId:b,dataIndex:S}}),y({seriesId:b,dataIndex:S})},A=I=>{if(!e)return;const f=w(I);if(typeof f=="string")return;const{seriesId:b,dataIndex:S}=f;e(I,{type:"scatter",seriesId:b,dataIndex:S})};return C.addEventListener("pointerleave",T),C.addEventListener("pointermove",k),C.addEventListener("click",A),()=>{C.removeEventListener("pointerleave",T),C.removeEventListener("pointermove",k),C.removeEventListener("click",A)}},[s,c,a,n,t,e,y,_,i]),v.jsx(F.Fragment,{})}const je=["xAxis","yAxis","zAxis","series","tooltip","axisHighlight","voronoiMaxRadius","disableVoronoi","legend","width","height","margin","colors","sx","grid","topAxis","leftAxis","rightAxis","bottomAxis","onItemClick","children","slots","slotProps","loading","highlightedItem","onHighlightChange","className"],ke=u=>{const{xAxis:t,yAxis:e,zAxis:s,series:i,tooltip:n,axisHighlight:a,voronoiMaxRadius:o,disableVoronoi:r,legend:c,width:h,height:l,margin:d,colors:x,sx:m,grid:y,topAxis:_,leftAxis:p,rightAxis:g,bottomAxis:C,onItemClick:w,children:T,slots:k,slotProps:A,loading:I,highlightedItem:f,onHighlightChange:b,className:S}=u,j=Lt(u,je),M=z({},j,{series:i.map(Tt=>z({type:"scatter"},Tt)),width:h,height:l,margin:d,colors:x,xAxis:t,yAxis:e,sx:m,highlightedItem:f,onHighlightChange:b,className:S}),R={zAxis:s},H={voronoiMaxRadius:o,onItemClick:w},P={topAxis:_,leftAxis:p,rightAxis:g,bottomAxis:C,slots:k,slotProps:A},B={vertical:y==null?void 0:y.vertical,horizontal:y==null?void 0:y.horizontal},V={onItemClick:r?w:void 0,slots:k,slotProps:A},D={loading:I,slots:k,slotProps:A},U=z({},c,{slots:k,slotProps:A}),nt=z({y:"none",x:"none"},a),Pt=z({trigger:"item"},n,{slots:k,slotProps:A});return{chartContainerProps:M,zAxisProps:R,voronoiHandlerProps:H,chartsAxisProps:P,gridProps:B,scatterPlotProps:V,overlayProps:D,legendProps:U,axisHighlightProps:nt,tooltipProps:Pt,children:T}},st=F.forwardRef(function(t,e){const s=$t({props:t,name:"MuiScatterChart"}),{chartContainerProps:i,zAxisProps:n,voronoiHandlerProps:a,chartsAxisProps:o,gridProps:r,scatterPlotProps:c,overlayProps:h,legendProps:l,axisHighlightProps:d,tooltipProps:x,children:m}=ke(s);return v.jsx(Kt,z({ref:e},i,{children:v.jsxs(Nt,z({},n,{children:[!s.disableVoronoi&&v.jsx(Ae,z({},a)),v.jsx(Zt,z({},o)),v.jsx(Jt,z({},r)),v.jsx("g",{"data-drawing-container":!0,children:v.jsx(ae,z({},c))}),v.jsx(qt,z({},h)),v.jsx(Qt,z({},l)),v.jsx(Ot,z({},d)),!s.loading&&v.jsx(Gt,z({},x)),m]}))}))});function Pe(){return v.jsx(tt,{children:`
import * as React from 'react';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useTheme } from "@mui/material";


const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'BasicScatterChart ',
},
]; 

const data = [
    {
        id: 'data-0',
        x1: 329.39,
        x2: 391.29,
        y1: 443.28,
        y2: 153.9,
    },
    {
        id: 'data-1',
        x1: 96.94,
        x2: 139.6,
        y1: 110.5,
        y2: 217.8,
    },
    {
        id: 'data-2',
        x1: 336.35,
        x2: 282.34,
        y1: 175.23,
        y2: 286.32,
    },
    {
        id: 'data-3',
        x1: 159.44,
        x2: 384.85,
        y1: 195.97,
        y2: 325.12,
    },
    {
        id: 'data-4',
        x1: 188.86,
        x2: 182.27,
        y1: 351.77,
        y2: 144.58,
    },
    {
        id: 'data-5',
        x1: 143.86,
        x2: 360.22,
        y1: 43.253,
        y2: 146.51,
    },
    {
        id: 'data-6',
        x1: 202.02,
        x2: 209.5,
        y1: 376.34,
        y2: 309.69,
    },
    {
        id: 'data-7',
        x1: 384.41,
        x2: 258.93,
        y1: 31.514,
        y2: 236.38,
    },
    {
        id: 'data-8',
        x1: 256.76,
        x2: 70.571,
        y1: 231.31,
        y2: 440.72,
    },
    {
        id: 'data-9',
        x1: 143.79,
        x2: 419.02,
        y1: 108.04,
        y2: 20.29,
    },
    {
        id: 'data-10',
        x1: 103.48,
        x2: 15.886,
        y1: 321.77,
        y2: 484.17,
    },
    {
        id: 'data-11',
        x1: 272.39,
        x2: 189.03,
        y1: 120.18,
        y2: 54.962,
    },
    {
        id: 'data-12',
        x1: 23.57,
        x2: 456.4,
        y1: 366.2,
        y2: 418.5,
    },
    {
        id: 'data-13',
        x1: 219.73,
        x2: 235.96,
        y1: 451.45,
        y2: 181.32,
    },
    {
        id: 'data-14',
        x1: 54.99,
        x2: 434.5,
        y1: 294.8,
        y2: 440.9,
    },
    {
        id: 'data-15',
        x1: 134.13,
        x2: 383.8,
        y1: 121.83,
        y2: 273.52,
    },
    {
        id: 'data-16',
        x1: 12.7,
        x2: 270.8,
        y1: 287.7,
        y2: 346.7,
    },
    {
        id: 'data-17',
        x1: 176.51,
        x2: 119.17,
        y1: 134.06,
        y2: 74.528,
    },
    {
        id: 'data-18',
        x1: 65.05,
        x2: 78.93,
        y1: 104.5,
        y2: 150.9,
    },
    {
        id: 'data-19',
        x1: 162.25,
        x2: 63.707,
        y1: 413.07,
        y2: 26.483,
    },
    {
        id: 'data-20',
        x1: 68.88,
        x2: 150.8,
        y1: 74.68,
        y2: 333.2,
    },
    {
        id: 'data-21',
        x1: 95.29,
        x2: 329.1,
        y1: 360.6,
        y2: 422.0,
    },
    {
        id: 'data-22',
        x1: 390.62,
        x2: 10.01,
        y1: 330.72,
        y2: 488.06,
    },
];

export default function BasicScatterChart() {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    return (
     

            <ScatterChart
                height={300}
                series={[
                    {
                        label: 'Series A',
                        data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                        color: primary
                    },
                    {
                        label: 'Series B',
                        data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                        color: secondary
                    },
                ]}
            />
       
    );
}

`})}const bt=[{id:"data-0",x1:329.39,x2:391.29,y1:443.28,y2:153.9},{id:"data-1",x1:96.94,x2:139.6,y1:110.5,y2:217.8},{id:"data-2",x1:336.35,x2:282.34,y1:175.23,y2:286.32},{id:"data-3",x1:159.44,x2:384.85,y1:195.97,y2:325.12},{id:"data-4",x1:188.86,x2:182.27,y1:351.77,y2:144.58},{id:"data-5",x1:143.86,x2:360.22,y1:43.253,y2:146.51},{id:"data-6",x1:202.02,x2:209.5,y1:376.34,y2:309.69},{id:"data-7",x1:384.41,x2:258.93,y1:31.514,y2:236.38},{id:"data-8",x1:256.76,x2:70.571,y1:231.31,y2:440.72},{id:"data-9",x1:143.79,x2:419.02,y1:108.04,y2:20.29},{id:"data-10",x1:103.48,x2:15.886,y1:321.77,y2:484.17},{id:"data-11",x1:272.39,x2:189.03,y1:120.18,y2:54.962},{id:"data-12",x1:23.57,x2:456.4,y1:366.2,y2:418.5},{id:"data-13",x1:219.73,x2:235.96,y1:451.45,y2:181.32},{id:"data-14",x1:54.99,x2:434.5,y1:294.8,y2:440.9},{id:"data-15",x1:134.13,x2:383.8,y1:121.83,y2:273.52},{id:"data-16",x1:12.7,x2:270.8,y1:287.7,y2:346.7},{id:"data-17",x1:176.51,x2:119.17,y1:134.06,y2:74.528},{id:"data-18",x1:65.05,x2:78.93,y1:104.5,y2:150.9},{id:"data-19",x1:162.25,x2:63.707,y1:413.07,y2:26.483},{id:"data-20",x1:68.88,x2:150.8,y1:74.68,y2:333.2},{id:"data-21",x1:95.29,x2:329.1,y1:360.6,y2:422},{id:"data-22",x1:390.62,x2:10.01,y1:330.72,y2:488.06}];function Te(){const u=it(),t=u.palette.primary.main,e=u.palette.secondary.main;return v.jsx(et,{title:"Basic Chart",codeModel:v.jsx(Pe,{}),children:v.jsx(st,{height:300,series:[{label:"Series A",data:bt.map(s=>({x:s.x1,y:s.y1,id:s.id})),color:t},{label:"Series B",data:bt.map(s=>({x:s.x1,y:s.y2,id:s.id})),color:e}]})})}function Me(){return v.jsx(tt,{children:`
import * as React from 'react';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useTheme } from "@mui/material";
const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'ScatterDataset ',
},
]; 

const dataset = [
    {
        version: 'data-0',
        a1: 329.39,
        a2: 391.29,
        b1: 443.28,
        b2: 153.9,
    },
    {
        version: 'data-1',
        a1: 96.94,
        a2: 139.6,
        b1: 110.5,
        b2: 217.8,
    },
    {
        version: 'data-2',
        a1: 336.35,
        a2: 282.34,
        b1: 175.23,
        b2: 286.32,
    },
    {
        version: 'data-3',
        a1: 159.44,
        a2: 384.85,
        b1: 195.97,
        b2: 325.12,
    },
    {
        version: 'data-4',
        a1: 188.86,
        a2: 182.27,
        b1: 351.77,
        b2: 144.58,
    },
    {
        version: 'data-5',
        a1: 143.86,
        a2: 360.22,
        b1: 43.253,
        b2: 146.51,
    },
    {
        version: 'data-6',
        a1: 202.02,
        a2: 209.5,
        b1: 376.34,
        b2: 309.69,
    },
    {
        version: 'data-7',
        a1: 384.41,
        a2: 258.93,
        b1: 31.514,
        b2: 236.38,
    },
    {
        version: 'data-8',
        a1: 256.76,
        a2: 70.571,
        b1: 231.31,
        b2: 440.72,
    },
    {
        version: 'data-9',
        a1: 143.79,
        a2: 419.02,
        b1: 108.04,
        b2: 20.29,
    },
];

const chartSetting = {

    sx: {
        [\`.\${axisClasses.left} .\${axisClasses.label}\`]: {
                transform: 'translate(-20px, 0)',
        },
    },
            
    height: 300,
};

export default function ScatterDataset() {
    const theme = useTheme();
            const primary = theme.palette.primary.main;
            const secondary = theme.palette.secondary.main;
            return (

            <ScatterChart
                dataset={dataset}
                series={[
                    { datasetKeys: { id: 'version', x: 'a1', y: 'a2' }, label: 'Series A', color: primary },
                    { datasetKeys: { id: 'version', x: 'b1', y: 'b2' }, label: 'Series B', color: secondary },
                ]}
                {...chartSetting}
            />

            );
}

            `})}const Re=[{version:"data-0",a1:329.39,a2:391.29,b1:443.28,b2:153.9},{version:"data-1",a1:96.94,a2:139.6,b1:110.5,b2:217.8},{version:"data-2",a1:336.35,a2:282.34,b1:175.23,b2:286.32},{version:"data-3",a1:159.44,a2:384.85,b1:195.97,b2:325.12},{version:"data-4",a1:188.86,a2:182.27,b1:351.77,b2:144.58},{version:"data-5",a1:143.86,a2:360.22,b1:43.253,b2:146.51},{version:"data-6",a1:202.02,a2:209.5,b1:376.34,b2:309.69},{version:"data-7",a1:384.41,a2:258.93,b1:31.514,b2:236.38},{version:"data-8",a1:256.76,a2:70.571,b1:231.31,b2:440.72},{version:"data-9",a1:143.79,a2:419.02,b1:108.04,b2:20.29}],Be={sx:{[`.${ht.left} .${ht.label}`]:{transform:"translate(-20px, 0)"}},height:300};function He(){const u=it(),t=u.palette.primary.main,e=u.palette.secondary.main;return v.jsx(et,{title:"Scatter Dataset",codeModel:v.jsx(Me,{}),children:v.jsx(st,{dataset:Re,series:[{datasetKeys:{id:"version",x:"a1",y:"a2"},label:"Series A",color:t},{datasetKeys:{id:"version",x:"b1",y:"b2"},label:"Series B",color:e}],...Be})})}function Ve(){return v.jsx(tt,{children:`
import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useTheme } from "@mui/material";

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'VoronoiInteractionChart ',
},
]; 

const data = [
    { x1: 529.39, y1: 643.28, x2: 191.29, y2: -46.1, id: 'data-0' },
    { x1: 296.94, y1: 310.5, x2: -60.4, y2: 17.8, id: 'data-1' },
    { x1: 536.35, y1: 375.23, x2: 82.34, y2: 86.32, id: 'data-2' },
    { x1: 359.44, y1: 395.97, x2: 184.85, y2: 125.12, id: 'data-3' },
    { x1: 388.86, y1: 551.77, x2: -17.73, y2: -55.42, id: 'data-4' },
    { x1: 343.86, y1: 243.25, x2: 160.22, y2: -53.49, id: 'data-5' },
    { x1: 402.02, y1: 576.34, x2: 9.5, y2: 109.69, id: 'data-6' },
    { x1: 584.41, y1: 231.51, x2: 58.93, y2: 36.38, id: 'data-7' },
    { x1: 456.76, y1: 431.31, x2: -129.43, y2: 240.72, id: 'data-8' },
    { x1: 343.79, y1: 308.04, x2: 219.02, y2: -179.71, id: 'data-9' },
    { x1: 303.48, y1: 521.77, x2: -184.11, y2: 284.17, id: 'data-10' },
    { x1: 472.39, y1: 320.18, x2: -10.97, y2: -145.04, id: 'data-11' },
    { x1: 223.57, y1: 566.2, x2: 256.4, y2: 218.5, id: 'data-12' },
    { x1: 419.73, y1: 651.45, x2: 35.96, y2: -18.68, id: 'data-13' },
    { x1: 254.99, y1: 494.8, x2: 234.5, y2: 240.9, id: 'data-14' },
    { x1: 334.13, y1: 321.83, x2: 183.8, y2: 73.52, id: 'data-15' },
    { x1: 212.7, y1: 487.7, x2: 70.8, y2: 146.7, id: 'data-16' },
    { x1: 376.51, y1: 334.06, x2: -80.83, y2: -125.47, id: 'data-17' },
    { x1: 265.05, y1: 304.5, x2: -121.07, y2: -49.1, id: 'data-18' },
    { x1: 362.25, y1: 613.07, x2: -136.29, y2: -173.52, id: 'data-19' },
    { x1: 268.88, y1: 274.68, x2: -49.2, y2: 133.2, id: 'data-20' },
    { x1: 295.29, y1: 560.6, x2: 129.1, y2: 222, id: 'data-21' },
    { x1: 590.62, y1: 530.72, x2: -189.99, y2: 288.06, id: 'data-22' },
  ];
  
  export default function VoronoiInteractionChart() {
    const [voronoiMaxRadius, setVoronoiMaxRadius] = React.useState(25);
    const [disableVoronoi, setDisableVoronoi] = React.useState(false);
    const [undefinedRadius, setUndefinedRadius] = React.useState(true);
  
    const handleMaxRadiusChange = (event, newValue) => {
      if (typeof newValue !== 'number') {
        return;
      }
      setVoronoiMaxRadius(newValue);
    };
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
  
    return (
     
  
        <Stack direction="column" sx={{ width: '100%' }}>
          <ScatterChart
            height={300}
            disableVoronoi={disableVoronoi}
            voronoiMaxRadius={undefinedRadius ? undefined : voronoiMaxRadius}
            dataset={data}
            series={[
              {
                label: 'Series A',
                data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                color: primary
              },
              {
                label: 'Series B',
                data: data.map((v) => ({ x: v.x2, y: v.y2, id: v.id })),
                color: secondary
              },
            ]}
          />
          <div>
            <Typography id="max-radius-value" gutterBottom>
              max radius
            </Typography>
            <Slider
              value={voronoiMaxRadius}
              onChange={handleMaxRadiusChange}
              valueLabelDisplay="auto"
              min={1}
              max={100}
              aria-labelledby="max-radius-value"
              disabled={disableVoronoi || undefinedRadius}
            />
          </div>
          <Stack direction="row">
            <FormControlLabel
              checked={disableVoronoi}
              control={
                <Checkbox
                  onChange={(event) => setDisableVoronoi(event.target.checked)}
                />
              }
              label="disableVoronoi"
              labelPlacement="end"
            />
            <FormControlLabel
              checked={undefinedRadius}
              control={
                <Checkbox
                  onChange={(event) => setUndefinedRadius(event.target.checked)}
                />
              }
              label="undefined radius"
              labelPlacement="end"
            />
          </Stack>
        </Stack>
  
    );
  }

            `})}const rt=[{x1:529.39,y1:643.28,x2:191.29,y2:-46.1,id:"data-0"},{x1:296.94,y1:310.5,x2:-60.4,y2:17.8,id:"data-1"},{x1:536.35,y1:375.23,x2:82.34,y2:86.32,id:"data-2"},{x1:359.44,y1:395.97,x2:184.85,y2:125.12,id:"data-3"},{x1:388.86,y1:551.77,x2:-17.73,y2:-55.42,id:"data-4"},{x1:343.86,y1:243.25,x2:160.22,y2:-53.49,id:"data-5"},{x1:402.02,y1:576.34,x2:9.5,y2:109.69,id:"data-6"},{x1:584.41,y1:231.51,x2:58.93,y2:36.38,id:"data-7"},{x1:456.76,y1:431.31,x2:-129.43,y2:240.72,id:"data-8"},{x1:343.79,y1:308.04,x2:219.02,y2:-179.71,id:"data-9"},{x1:303.48,y1:521.77,x2:-184.11,y2:284.17,id:"data-10"},{x1:472.39,y1:320.18,x2:-10.97,y2:-145.04,id:"data-11"},{x1:223.57,y1:566.2,x2:256.4,y2:218.5,id:"data-12"},{x1:419.73,y1:651.45,x2:35.96,y2:-18.68,id:"data-13"},{x1:254.99,y1:494.8,x2:234.5,y2:240.9,id:"data-14"},{x1:334.13,y1:321.83,x2:183.8,y2:73.52,id:"data-15"},{x1:212.7,y1:487.7,x2:70.8,y2:146.7,id:"data-16"},{x1:376.51,y1:334.06,x2:-80.83,y2:-125.47,id:"data-17"},{x1:265.05,y1:304.5,x2:-121.07,y2:-49.1,id:"data-18"},{x1:362.25,y1:613.07,x2:-136.29,y2:-173.52,id:"data-19"},{x1:268.88,y1:274.68,x2:-49.2,y2:133.2,id:"data-20"},{x1:295.29,y1:560.6,x2:129.1,y2:222,id:"data-21"},{x1:590.62,y1:530.72,x2:-189.99,y2:288.06,id:"data-22"}];function De(){const[u,t]=F.useState(25),[e,s]=F.useState(!1),[i,n]=F.useState(!0),a=(h,l)=>{typeof l=="number"&&t(l)},o=it(),r=o.palette.primary.main,c=o.palette.secondary.main;return v.jsx(et,{title:"VoronoiInteraction Chart",codeModel:v.jsx(Ve,{}),children:v.jsxs(J,{direction:"column",sx:{width:"100%"},children:[v.jsx(st,{height:300,disableVoronoi:e,voronoiMaxRadius:i?void 0:u,dataset:rt,series:[{label:"Series A",data:rt.map(h=>({x:h.x1,y:h.y1,id:h.id})),color:r},{label:"Series B",data:rt.map(h=>({x:h.x2,y:h.y2,id:h.id})),color:c}]}),v.jsxs("div",{children:[v.jsx(vt,{id:"max-radius-value",gutterBottom:!0,children:"max radius"}),v.jsx(Wt,{value:u,onChange:a,valueLabelDisplay:"auto",min:1,max:100,"aria-labelledby":"max-radius-value",disabled:e||i})]}),v.jsxs(J,{direction:"row",children:[v.jsx(xt,{checked:e,control:v.jsx(ut,{onChange:h=>s(h.target.checked)}),label:"disableVoronoi",labelPlacement:"end"}),v.jsx(xt,{checked:i,control:v.jsx(ut,{onChange:h=>n(h.target.checked)}),label:"undefined radius",labelPlacement:"end"})]})]})})}function ze(){return v.jsx(tt,{children:`
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from '@mui/material';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'ScatterClickNoSnapChart ',
},
]; 





export default function ScatterClickNoSnapChart() {

    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.secondary.main;

    const scatterChartsParams = {

        series: [
            {
                id: 'series-1',
                type: 'scatter',
                data: [
                    { x: 6.5e-2, y: -1.3, id: 0 },
                    { x: -2.1, y: -7.0e-1, id: 1 },
                    { x: -7.6e-1, y: -6.7e-1, id: 2 },
                    { x: -1.5e-2, y: -2.0e-1, id: 3 },
                    { x: -1.4, y: -9.9e-1, id: 4 },
                    { x: -1.1, y: -1.5, id: 5 },
                    { x: -7.0e-1, y: -2.7e-1, id: 6 },
                    { x: -5.1e-1, y: -8.8e-1, id: 7 },
                    { x: -4.0e-3, y: -1.4, id: 8 },
                    { x: -1.3, y: -2.2, id: 9 },
                ],
                label: 'A',
                highlightScope: {
                    highlight: 'item',
                },
                color: primaryColor,
            },
            {
                id: 'series-2',
                type: 'scatter',
                data: [
                    { x: 1.8, y: -1.7e-2, id: 0 },
                    { x: 7.1e-1, y: 2.6e-1, id: 1 },
                    { x: -1.2, y: 9.8e-1, id: 2 },
                    { x: 2.0, y: -2.0e-1, id: 3 },
                    { x: 9.4e-1, y: -2.7e-1, id: 4 },
                    { x: -4.8e-1, y: -1.6e-1, id: 5 },
                    { x: -1.5, y: 1.1, id: 6 },
                    { x: 1.3, y: 3.4e-1, id: 7 },
                    { x: -4.2e-1, y: 1.0e-1, id: 8 },
                    { x: 5.4e-2, y: 4.0e-1, id: 9 },
                ],
                label: 'B',
                highlightScope: {
                    highlight: 'item',
                },
                color: secondaryColor,
            },
        ] ,
        height: 400,
    };
    const [data, setData] = React.useState();

    const { axis, item, ...other } = data ?? {};
    const dataDisplayed = data && {
        ...(item
            ? {
                item: {
                    dataIndex: item.dataIndex,
                    series: {
                        id: item.series.id,
                        toReplace: '',
                    },
                },
            }
            : undefined),
        ...(axis ? { axis } : undefined),
        ...other,
    };

  const formattedCode = dataDisplayed
        ? JSON.stringify(dataDisplayed, null, 1).replace(
            '"toReplace": ""',
            '// ... (entire series definition)' // Replace part of the code
        )
        : '// The data will appear here';

    return (

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 0, md: 4 }}
                sx={{ width: '100%' }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <ScatterChart
                        series={scatterChartsParams.series}
                        height={scatterChartsParams.height}
                        onItemClick={(event: any, d: any) => setData(d)}
                    />
                </Box>
                <Stack direction="column" sx={{ width: { xs: '100%', md: '40%' } }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>Click on the chart</Typography>
                        <IconButton
                            aria-label="reset"
                            size="small"
                            onClick={() => {
                                setData(null);
                            }}
                        >
                            <UndoOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Box>
                     <SyntaxHighlighter language="json" style={docco}>
                        {formattedCode}
                    </SyntaxHighlighter>
                </Stack>
            </Stack>
    
    );
}


            `})}function Le(){const u=it(),t=u.palette.primary.main,e=u.palette.secondary.main,s={series:[{id:"series-1",type:"scatter",data:[{x:.065,y:-1.3,id:0},{x:-2.1,y:-.7,id:1},{x:-.76,y:-.67,id:2},{x:-.015,y:-.2,id:3},{x:-1.4,y:-.99,id:4},{x:-1.1,y:-1.5,id:5},{x:-.7,y:-.27,id:6},{x:-.51,y:-.88,id:7},{x:-.004,y:-1.4,id:8},{x:-1.3,y:-2.2,id:9}],label:"A",highlightScope:{highlight:"item"},color:t},{id:"series-2",type:"scatter",data:[{x:1.8,y:-.017,id:0},{x:.71,y:.26,id:1},{x:-1.2,y:.98,id:2},{x:2,y:-.2,id:3},{x:.94,y:-.27,id:4},{x:-.48,y:-.16,id:5},{x:-1.5,y:1.1,id:6},{x:1.3,y:.34,id:7},{x:-.42,y:.1,id:8},{x:.054,y:.4,id:9}],label:"B",highlightScope:{highlight:"item"},color:e}],height:400},[i,n]=F.useState(),{axis:a,item:o,...r}=i??{},c=i&&{...o?{item:{dataIndex:o.dataIndex,series:{id:o.series.id,toReplace:""}}}:void 0,...a?{axis:a}:void 0,...r},h=c?JSON.stringify(c,null,1).replace('"toReplace": ""',"// ... (entire series definition)"):"// The data will appear here";return v.jsx(et,{title:"ClickNoSnap Chart",codeModel:v.jsx(ze,{}),children:v.jsxs(J,{direction:{xs:"column",md:"row"},spacing:{xs:0,md:4},sx:{width:"100%"},children:[v.jsx(yt,{sx:{flexGrow:1},children:v.jsx(st,{series:s.series,height:s.height,onItemClick:(l,d)=>n(d)})}),v.jsxs(J,{direction:"column",sx:{width:{xs:"100%",md:"40%"}},children:[v.jsxs(yt,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[v.jsx(vt,{children:"Click on the chart"}),v.jsx(te,{"aria-label":"reset",size:"small",onClick:()=>{n(null)},children:v.jsx(ie,{fontSize:"small"})})]}),v.jsx(kt,{language:"json",style:Dt,children:h})]})]})})}const $e=[{to:"/",title:"Home"},{title:"ScatterCharts "}],zi=()=>v.jsxs(Bt,{title:"ScatterCharts",description:"this is ScatterCharts ",children:[v.jsx(Rt,{title:"ScatterCharts",items:$e}),v.jsxs(ee,{container:!0,spacing:3,children:[v.jsx(Te,{}),v.jsx(He,{}),v.jsx(De,{}),v.jsx(Le,{})]})]});export{zi as default};
