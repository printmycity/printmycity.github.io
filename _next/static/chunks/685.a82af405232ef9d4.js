"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[685],{9685:function(e,t,i){let n,r;i.r(t),i.d(t,{default:function(){return W}});var a=i(7437),o=i(2265),s=i(6496),l=i(1119),d=i(1448),c=i(9285);let f=new d.Box3,u=new d.Vector3;class p extends d.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new d.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new d.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new d.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new d.InterleavedBufferAttribute(i,3,0)),this.setAttribute("instanceEnd",new d.InterleavedBufferAttribute(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new d.InstancedInterleavedBuffer(i,2*t,1);return this.setAttribute("instanceColorStart",new d.InterleavedBufferAttribute(n,t,0)),this.setAttribute("instanceColorEnd",new d.InterleavedBufferAttribute(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new d.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new d.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),f.setFromBufferAttribute(t),this.boundingBox.union(f))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new d.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)u.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(u)),u.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(u));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}let h=parseInt(d.REVISION.replace(/\D+/g,""));class m extends d.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:d.UniformsUtils.clone(d.UniformsUtils.merge([d.UniformsLib.common,d.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new d.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${h>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let v=h>=125?"uv1":"uv2",y=new d.Vector4,g=new d.Vector3,x=new d.Vector3,S=new d.Vector4,w=new d.Vector4,b=new d.Vector4,_=new d.Vector3,E=new d.Matrix4,A=new d.Line3,L=new d.Vector3,M=new d.Box3,U=new d.Sphere,z=new d.Vector4;function B(e,t,i){return z.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),z.multiplyScalar(1/z.w),z.x=r/i.width,z.y=r/i.height,z.applyMatrix4(e.projectionMatrixInverse),z.multiplyScalar(1/z.w),Math.abs(Math.max(z.x,z.y))}class O extends d.Mesh{constructor(e=new p,t=new m({color:16777215*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,a=t.count;e<a;e++,r+=2)g.fromBufferAttribute(t,e),x.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+g.distanceTo(x);let r=new d.InstancedInterleavedBuffer(n,2,1);return e.setAttribute("instanceDistanceStart",new d.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new d.InterleavedBufferAttribute(r,1,1)),this}raycast(e,t){let i,a;let o=this.material.worldUnits,s=e.camera;null!==s||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;n=e.ray;let c=this.matrixWorld,f=this.geometry,u=this.material;if(r=u.linewidth+l,null===f.boundingSphere&&f.computeBoundingSphere(),U.copy(f.boundingSphere).applyMatrix4(c),o)i=.5*r;else{let e=Math.max(s.near,U.distanceToPoint(n.origin));i=B(s,e,u.resolution)}if(U.radius+=i,!1!==n.intersectsSphere(U)){if(null===f.boundingBox&&f.computeBoundingBox(),M.copy(f.boundingBox).applyMatrix4(c),o)a=.5*r;else{let e=Math.max(s.near,M.distanceToPoint(n.origin));a=B(s,e,u.resolution)}M.expandByScalar(a),!1!==n.intersectsBox(M)&&(o?function(e,t){let i=e.matrixWorld,a=e.geometry,o=a.attributes.instanceStart,s=a.attributes.instanceEnd,l=Math.min(a.instanceCount,o.count);for(let a=0;a<l;a++){A.start.fromBufferAttribute(o,a),A.end.fromBufferAttribute(s,a),A.applyMatrix4(i);let l=new d.Vector3,c=new d.Vector3;n.distanceSqToSegment(A.start,A.end,c,l),c.distanceTo(l)<.5*r&&t.push({point:c,pointOnLine:l,distance:n.origin.distanceTo(c),object:e,face:null,faceIndex:a,uv:null,[v]:null})}}(this,t):function(e,t,i){let a=t.projectionMatrix,o=e.material.resolution,s=e.matrixWorld,l=e.geometry,c=l.attributes.instanceStart,f=l.attributes.instanceEnd,u=Math.min(l.instanceCount,c.count),p=-t.near;n.at(1,b),b.w=1,b.applyMatrix4(t.matrixWorldInverse),b.applyMatrix4(a),b.multiplyScalar(1/b.w),b.x*=o.x/2,b.y*=o.y/2,b.z=0,_.copy(b),E.multiplyMatrices(t.matrixWorldInverse,s);for(let t=0;t<u;t++){if(S.fromBufferAttribute(c,t),w.fromBufferAttribute(f,t),S.w=1,w.w=1,S.applyMatrix4(E),w.applyMatrix4(E),S.z>p&&w.z>p)continue;if(S.z>p){let e=S.z-w.z,t=(S.z-p)/e;S.lerp(w,t)}else if(w.z>p){let e=w.z-S.z,t=(w.z-p)/e;w.lerp(S,t)}S.applyMatrix4(a),w.applyMatrix4(a),S.multiplyScalar(1/S.w),w.multiplyScalar(1/w.w),S.x*=o.x/2,S.y*=o.y/2,w.x*=o.x/2,w.y*=o.y/2,A.start.copy(S),A.start.z=0,A.end.copy(w),A.end.z=0;let l=A.closestPointToPointParameter(_,!0);A.at(l,L);let u=d.MathUtils.lerp(S.z,w.z,l),h=u>=-1&&u<=1,m=_.distanceTo(L)<.5*r;if(h&&m){A.start.fromBufferAttribute(c,t),A.end.fromBufferAttribute(f,t),A.start.applyMatrix4(s),A.end.applyMatrix4(s);let r=new d.Vector3,a=new d.Vector3;n.distanceSqToSegment(A.start,A.end,a,r),i.push({point:a,pointOnLine:r,distance:n.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,[v]:null})}}}(this,s,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(y),this.material.uniforms.resolution.value.set(y.z,y.w))}}class C extends p{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class D extends O{constructor(e=new C,t=new m({color:16777215*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let j=o.forwardRef(function({points:e,color:t=16777215,vertexColors:i,linewidth:n,lineWidth:r,segments:a,dashed:s,...f},u){var h,v;let y=(0,c.D)(e=>e.size),g=o.useMemo(()=>a?new O:new D,[a]),[x]=o.useState(()=>new m),S=(null==i||null==(h=i[0])?void 0:h.length)===4?4:3,w=o.useMemo(()=>{let n=a?new p:new C,r=e.map(e=>{let t=Array.isArray(e);return e instanceof d.Vector3||e instanceof d.Vector4?[e.x,e.y,e.z]:e instanceof d.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=16777215;let e=i.map(e=>e instanceof d.Color?e.toArray():e);n.setColors(e.flat(),S)}return n},[e,a,i,S]);return o.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),o.useLayoutEffect(()=>{s?x.defines.USE_DASH="":delete x.defines.USE_DASH,x.needsUpdate=!0},[s,x]),o.useEffect(()=>()=>{w.dispose(),x.dispose()},[w]),o.createElement("primitive",(0,l.Z)({object:g,ref:u},f),o.createElement("primitive",{object:w,attach:"geometry"}),o.createElement("primitive",(0,l.Z)({object:x,attach:"material",color:t,vertexColors:!!i,resolution:[y.width,y.height],linewidth:null!==(v=null!=n?n:r)&&void 0!==v?v:1,dashed:s,transparent:4===S},f)))});var I=i(5903),P=i(1545),T=i(3435);function R(e){let{geometry:t,scale:i,liftMm:n}=e,r=(0,o.useMemo)(()=>new d.MeshStandardMaterial({vertexColors:!0,roughness:.85,metalness:0}),[]);return(0,a.jsx)("mesh",{geometry:t,material:r,scale:i,rotation:[-Math.PI/2,0,0],position:[0,n,0]})}function V(e){let{polys:t,scale:i,thicknessMm:n,color:r}=e,s=(0,o.useMemo)(()=>{if(n<=0||!t.length)return null;let e=Math.max(.001,n/i),r=[];for(let i of t)try{r.push((0,T.O6)(i.ext,i.holes,e))}catch(e){}let a=r.length?(0,P.n4)(r,!1):null;return r.forEach(e=>e.dispose()),a},[t,i,n]),l=(0,o.useMemo)(()=>new d.MeshStandardMaterial({color:r,roughness:1,side:d.DoubleSide}),[r]);return s?(0,a.jsx)("mesh",{geometry:s,material:l,scale:i,rotation:[-Math.PI/2,0,0]}):null}function H(e,t,i,n,r){return[[e-i/2,r,t-n/2],[e+i/2,r,t-n/2],[e+i/2,r,t+n/2],[e-i/2,r,t+n/2],[e-i/2,r,t-n/2]]}function N(e){let{numX:t,numY:i,bedW:n,bedH:r,margin:s}=e,l=t*n,d=i*r,c=Math.max(1,n-s),f=Math.max(1,r-s),u=(0,o.useMemo)(()=>{let e=[];for(let a=0;a<t;a++)for(let t=0;t<i;t++)e.push({x:-l/2+(a+.5)*n,z:-d/2+(t+.5)*r,dark:(a+t)%2==0,key:"".concat(a,"_").concat(t)});return e},[t,i,n,r,l,d]);return(0,a.jsx)("group",{children:u.map(e=>(0,a.jsxs)("group",{children:[(0,a.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[e.x,-.5,e.z],receiveShadow:!0,children:[(0,a.jsx)("planeGeometry",{args:[.985*n,.985*r]}),(0,a.jsx)("meshStandardMaterial",{color:e.dark?"#0b1220":"#0f1a2e",roughness:1})]}),(0,a.jsx)(j,{points:H(e.x,e.z,.985*n,.985*r,-.4),color:"#475569",lineWidth:1.5}),(0,a.jsx)(j,{points:H(e.x,e.z,c,f,-.3),color:"#38bdf8",lineWidth:1,transparent:!0,opacity:.5})]},e.key))})}function W(e){let{geometry:t,land:i,waterBase:n,plan:r,bedW:l,bedH:d,margin:c,baseMm:f,waterMm:u}=e,p=Math.max(r.num_x*l,r.num_y*d)||256;return(0,a.jsxs)(s.Xz,{camera:{position:[.9*p,.9*p,.9*p],fov:45,near:.1,far:60*p},gl:{antialias:!0},dpr:[1,2],children:[(0,a.jsx)("color",{attach:"background",args:["#020617"]}),(0,a.jsx)("ambientLight",{intensity:.7}),(0,a.jsx)("directionalLight",{position:[p,2*p,p],intensity:1.4}),(0,a.jsx)("directionalLight",{position:[-p,p,-p],intensity:.4}),(0,a.jsx)(N,{numX:r.num_x,numY:r.num_y,bedW:l,bedH:d,margin:c}),(0,a.jsx)(V,{polys:i,scale:r.scale_mm_per_m,thicknessMm:f,color:"#c4b597"}),(0,a.jsx)(V,{polys:n,scale:r.scale_mm_per_m,thicknessMm:u,color:"#3f6f9f"}),(0,a.jsx)(o.Suspense,{fallback:null,children:(0,a.jsx)(R,{geometry:t,scale:r.scale_mm_per_m,liftMm:f})}),(0,a.jsx)(I.z,{makeDefault:!0,enableDamping:!0,dampingFactor:.08,target:[0,0,0],maxPolarAngle:Math.PI/2.02})]})}}}]);