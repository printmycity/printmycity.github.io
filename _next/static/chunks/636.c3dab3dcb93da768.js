"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{5636:function(e,t,r){r.r(t),r.d(t,{default:function(){return y}});var o,n=r(7437),i=r(2265),a=r(6496),c=r(1448),s=r(9285),l=((o=l||{})[o.NONE=0]="NONE",o[o.START=1]="START",o[o.ACTIVE=2]="ACTIVE",o);let u=e=>e&&e.isOrthographicCamera,m=e=>e&&e.isBox3,f=e=>1-Math.exp(-5*e)+.007*e,d=i.createContext(null);function p({children:e,maxDuration:t=1,margin:r=1.2,observe:o,fit:n,clip:a,interpolateFunc:p=f,onFit:g}){let x=i.useRef(null),{camera:P,size:h,invalidate:v}=(0,s.D)(),w=(0,s.D)(e=>e.controls),y=i.useRef(g);y.current=g;let C=i.useRef({camPos:new c.Vector3,camRot:new c.Quaternion,camZoom:1}),M=i.useRef({camPos:void 0,camRot:void 0,camZoom:void 0,camUp:void 0,target:void 0}),z=i.useRef(l.NONE),T=i.useRef(0),[R]=i.useState(()=>new c.Box3),V=i.useMemo(()=>{function e(){let e=R.getSize(new c.Vector3),t=R.getCenter(new c.Vector3),o=Math.max(e.x,e.y,e.z),n=u(P)?4*o:o/(2*Math.atan(Math.PI*P.fov/360)),i=u(P)?4*o:n/P.aspect;return{box:R,size:e,center:t,distance:r*Math.max(n,i)}}return{getSize:e,refresh(e){if(m(e))R.copy(e);else{let t=e||x.current;if(!t)return this;t.updateWorldMatrix(!0,!0),R.setFromObject(t)}if(R.isEmpty()){let e=P.position.length()||10;R.setFromCenterAndSize(new c.Vector3,new c.Vector3(e,e,e))}return C.current.camPos.copy(P.position),C.current.camRot.copy(P.quaternion),u(P)&&(C.current.camZoom=P.zoom),M.current.camPos=void 0,M.current.camRot=void 0,M.current.camZoom=void 0,M.current.camUp=void 0,M.current.target=void 0,this},reset(){let{center:t,distance:r}=e(),o=P.position.clone().sub(t).normalize();M.current.camPos=t.clone().addScaledVector(o,r),M.current.target=t.clone();let n=new c.Matrix4().lookAt(M.current.camPos,M.current.target,P.up);return M.current.camRot=new c.Quaternion().setFromRotationMatrix(n),z.current=l.START,T.current=0,this},moveTo(e){return M.current.camPos=Array.isArray(e)?new c.Vector3(...e):e.clone(),z.current=l.START,T.current=0,this},lookAt({target:e,up:t}){M.current.target=Array.isArray(e)?new c.Vector3(...e):e.clone(),t?M.current.camUp=Array.isArray(t)?new c.Vector3(...t):t.clone():M.current.camUp=P.up.clone();let r=new c.Matrix4().lookAt(M.current.camPos||P.position,M.current.target,M.current.camUp);return M.current.camRot=new c.Quaternion().setFromRotationMatrix(r),z.current=l.START,T.current=0,this},to({position:e,target:t}){return this.moveTo(e).lookAt({target:t})},fit(){if(!u(P))return this.reset();let e=0,t=0,o=[new c.Vector3(R.min.x,R.min.y,R.min.z),new c.Vector3(R.min.x,R.max.y,R.min.z),new c.Vector3(R.min.x,R.min.y,R.max.z),new c.Vector3(R.min.x,R.max.y,R.max.z),new c.Vector3(R.max.x,R.max.y,R.max.z),new c.Vector3(R.max.x,R.max.y,R.min.z),new c.Vector3(R.max.x,R.min.y,R.max.z),new c.Vector3(R.max.x,R.min.y,R.min.z)],n=M.current.camPos||P.position,i=M.current.target||(null==w?void 0:w.target),a=M.current.camUp||P.up,s=i?new c.Matrix4().lookAt(n,i,a).setPosition(n).invert():P.matrixWorldInverse;for(let r of o)r.applyMatrix4(s),e=Math.max(e,Math.abs(r.y)),t=Math.max(t,Math.abs(r.x));e*=2,t*=2;let m=(P.top-P.bottom)/e,f=(P.right-P.left)/t;return M.current.camZoom=Math.min(m,f)/r,z.current=l.START,T.current=0,y.current&&y.current(this.getSize()),this},clip(){let{distance:t}=e();return P.near=t/100,P.far=100*t,P.updateProjectionMatrix(),w&&(w.maxDistance=10*t,w.update()),v(),this}}},[R,P,w,r,v]);i.useLayoutEffect(()=>{if(w){let e=()=>{if(w&&M.current.target&&z.current!==l.NONE){let e=new c.Vector3().setFromMatrixColumn(P.matrix,2),t=C.current.camPos.distanceTo(w.target),r=(M.current.camPos||C.current.camPos).distanceTo(M.current.target),o=(1-T.current)*t+T.current*r;w.target.copy(P.position).addScaledVector(e,-o),w.update()}z.current=l.NONE};return w.addEventListener("start",e),()=>w.removeEventListener("start",e)}},[w]);let S=i.useRef(0);return i.useLayoutEffect(()=>{(o||0==S.current++)&&(V.refresh(),n&&V.reset().fit(),a&&V.clip())},[h,a,n,o,P,w]),(0,s.F)((e,r)=>{if(z.current===l.START)z.current=l.ACTIVE,v();else if(z.current===l.ACTIVE){if(T.current+=r/t,T.current>=1)M.current.camPos&&P.position.copy(M.current.camPos),M.current.camRot&&P.quaternion.copy(M.current.camRot),M.current.camUp&&P.up.copy(M.current.camUp),M.current.camZoom&&u(P)&&(P.zoom=M.current.camZoom),P.updateMatrixWorld(),P.updateProjectionMatrix(),w&&M.current.target&&(w.target.copy(M.current.target),w.update()),z.current=l.NONE;else{let e=p(T.current);M.current.camPos&&P.position.lerpVectors(C.current.camPos,M.current.camPos,e),M.current.camRot&&P.quaternion.slerpQuaternions(C.current.camRot,M.current.camRot,e),M.current.camUp&&P.up.set(0,1,0).applyQuaternion(P.quaternion),M.current.camZoom&&u(P)&&(P.zoom=(1-e)*C.current.camZoom+e*M.current.camZoom),P.updateMatrixWorld(),P.updateProjectionMatrix()}v()}}),i.createElement("group",{ref:x},i.createElement(d.Provider,{value:V},e))}var g=r(1119);let x=parseInt(c.REVISION.replace(/\D+/g,"")),P=function(e,t,r,o){let n=class extends c.ShaderMaterial{constructor(o={}){let n=Object.entries(e);super({uniforms:n.reduce((e,[t,r])=>{let o=c.UniformsUtils.clone({[t]:{value:r}});return{...e,...o}},{}),vertexShader:t,fragmentShader:r}),this.key="",n.forEach(([e])=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t})),Object.assign(this,o)}};return n.key=c.MathUtils.generateUUID(),n}({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new c.Color,sectionColor:new c.Color,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new c.Vector3,worldPlanePosition:new c.Vector3},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${x>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),h=i.forwardRef(({args:e,cellColor:t="#000000",sectionColor:r="#2080ff",cellSize:o=.5,sectionSize:n=1,followCamera:a=!1,infiniteGrid:l=!1,fadeDistance:u=100,fadeStrength:m=1,fadeFrom:f=1,cellThickness:d=.5,sectionThickness:p=1,side:x=c.BackSide,...h},v)=>{(0,s.e)({GridMaterial:P});let w=i.useRef(null);i.useImperativeHandle(v,()=>w.current,[]);let y=new c.Plane,C=new c.Vector3(0,1,0),M=new c.Vector3(0,0,0);return(0,s.F)(e=>{y.setFromNormalAndCoplanarPoint(C,M).applyMatrix4(w.current.matrixWorld);let t=w.current.material,r=t.uniforms.worldCamProjPosition,o=t.uniforms.worldPlanePosition;y.projectPoint(e.camera.position,r.value),o.value.set(0,0,0).applyMatrix4(w.current.matrixWorld)}),i.createElement("mesh",(0,g.Z)({ref:w,frustumCulled:!1},h),i.createElement("gridMaterial",(0,g.Z)({transparent:!0,"extensions-derivatives":!0,side:x},{cellSize:o,sectionSize:n,cellColor:t,sectionColor:r,cellThickness:d,sectionThickness:p},{fadeDistance:u,fadeStrength:m,fadeFrom:f,infiniteGrid:l,followCamera:a})),i.createElement("planeGeometry",{args:e}))});var v=r(5903);function w(e){let{geometry:t}=e,r=(0,i.useMemo)(()=>new c.MeshStandardMaterial({vertexColors:!0,roughness:.85,metalness:0}),[]);return(0,n.jsx)("mesh",{geometry:t,material:r,rotation:[-Math.PI/2,0,0]})}function y(e){let{geometry:t}=e;return(0,n.jsxs)(a.Xz,{camera:{position:[60,60,60],fov:45,near:.1,far:1e5},gl:{antialias:!0},dpr:[1,2],children:[(0,n.jsx)("color",{attach:"background",args:["#020617"]}),(0,n.jsx)("ambientLight",{intensity:.6}),(0,n.jsx)("directionalLight",{position:[100,200,100],intensity:1.4}),(0,n.jsx)("directionalLight",{position:[-80,50,-60],intensity:.4}),(0,n.jsx)(p,{fit:!0,clip:!0,observe:!0,margin:1.2,children:(0,n.jsx)(w,{geometry:t})}),(0,n.jsx)(h,{args:[2e3,2e3],cellSize:10,cellThickness:.5,cellColor:"#1e293b",sectionSize:50,sectionThickness:1,sectionColor:"#334155",fadeDistance:1500,infiniteGrid:!0,position:[0,-.01,0]}),(0,n.jsx)(v.z,{makeDefault:!0,enableDamping:!0,dampingFactor:.08,minDistance:1,maxDistance:5e3,maxPolarAngle:Math.PI/2.05})]})}}}]);