!function(e){var t={};function r(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(o,i,function(t){return e[t]}.bind(null,i));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=0)}([function(e,t){console.log("Bro am registering your components"),AFRAME.registerComponent("orient-character",{dependencies:["raycaster"],schema:{active:{type:"boolean",default:!0}},init:function(){window.counter=1,this.orientCharacter=function(e){if("cursio"!==e.detail.els[0].id&&e.detail.intersections.length>=1){if(this.data.active){var t=new THREE.Vector3(e.detail.intersections[0].point.x,e.detail.intersections[0].point.y,e.detail.intersections[0].point.z);t.sub(document.querySelector("#enclosure").getAttribute("position")),document.querySelector("#player").setAttribute("look-at",t);var r,o=0;o=(o=(r=90+(r=document.querySelector("#thecam").getAttribute("rotation")).y)>=0?r%360:360+r%360)*Math.PI/180;new Date;window.counter=window.counter+1;var i=window.counter/4e3%1,n=Math.abs(8*i-4)-2,a=-(5-n)*Math.cos(o),c=(5+n)*Math.sin(o),s=5/1.5+.8*n;document.querySelector("#thecam").setAttribute("position",new THREE.Vector3(a,s,c))}document.querySelector("#cursio").components.raycaster.init()}},console.log("Bro: the function being added is:"),console.log(this.orientCharacter),this.el.addEventListener("raycaster-intersection",this.orientCharacter.bind(this))},tick:function(){}}),AFRAME.registerComponent("character-animation",{tick:function(){var e="None";try{e=document.querySelector("[movement-controls]").components["keyboard-controls"].getKeys()}catch(e){console.log("There was an error getting keys. The error is:"),console.log(e)}switch(Object.keys(e)[0]){case"KeyW":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: walking");break;case"KeyS":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: walking_backward");break;case"KeyA":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: left_strafe");break;case"KeyD":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: right_strafe");break;case"Space":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: jump");break;case"ArrowUp":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: walking");break;case"ArrowDown":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: walking_backward");break;case"ArrowLeft":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: left_strafe");break;case"ArrowRight":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: right_strafe");break;case"Space":document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: jump");break;default:document.querySelector("[character-animation]").setAttribute("animation-mixer","clip: standard_idle")}}}),AFRAME.registerComponent("position-mirror",{schema:{type:"vec3",default:{x:0,y:0,z:0}},tick:function(){this.el.setAttribute("position-mirror",this.el.object3D.position)}}),AFRAME.registerComponent("rotation-mirror",{schema:{type:"vec3",default:{x:0,y:0,z:0}},tick:function(){this.el.setAttribute("rotation-mirror",{x:this.el.object3D.rotation.x,y:this.el.object3D.rotation.y,z:this.el.object3D.rotation.z})}}),AFRAME.registerComponent("track",{schema:{property:{type:"string",default:"position"},target:{type:"string",default:"enclosure"},horizontal:{type:"boolean",default:"false"}},tick:function(){try{var e=this.el.sceneEl.querySelector("#"+this.data.target).object3D[this.data.property];this.data.horizontal?this.el.setAttribute(this.data.property,{x:e.x,y:0,z:e.z}):this.el.setAttribute(this.data.property,e)}catch(e){console.warn("failed to track. exception is "),console.log("target is "+this.data.target),console.log("property is "+this.data.property)}}}),AFRAME.registerComponent("raycaster-autorefresh",{init:function(){var e=this.el;this.el.addEventListener("model-loaded",(function(){e.querySelector("[raycaster]").components.raycaster.refreshObjects()}))}}),AFRAME.registerComponent("wireframe",{dependencies:["material"],init:function(){this.el.components.material.material.wireframe=!0}}),AFRAME.registerComponent("place-in-front-of",{schema:{directionWrtReference:{type:"vec3",default:{x:1,y:1,z:1}},distanceFromReference:{type:"number",default:1},followPlayer:{type:"boolean",default:!1}},init:function(){this.faceIt=this.faceIt.bind(this),this.faceIt()},tick:function(){this.data.follow&&(console.log("following"),this.faceIt())},faceIt:function(){console.log("facing it");var e=document.querySelector("#enclosure").components["position-mirror"].data,t=Number(e.x),r=Number(e.y),o=Number(e.z),i=new THREE.Vector3(t,r,o),n=Number(document.querySelector("#player").getAttribute("rotation-mirror").y),a=new THREE.Vector3(0,1,0),c=n;console.log("this.data is"),console.log(this.data);const s=new THREE.Vector3(this.data.directionWrtReference.x,this.data.directionWrtReference.y,this.data.directionWrtReference.z);s.applyAxisAngle(a,c);var l=i;s.normalize().multiplyScalar(this.data.distanceFromReference),l.add(s),console.log("line 1:"),document.querySelector("#"+this.el.id).object3D.position.set(l.x,l.y,l.z),console.log("line 2:"),console.log("line 3:");var u=document.querySelector("#player").getAttribute("rotation-mirror"),d={x:0,y:Math.PI,z:0};console.log("objRotData is"),console.log(d),console.log("refRot.y is"),console.log(u.y),console.log("objRotData.rotation.y is"),console.log(d.y);var m=180*(Number(u.x)+Number(d.x))/Math.PI,y=180*(Number(u.y)+Number(d.y))/Math.PI,p=180*(Number(u.z)+Number(d.z))/Math.PI;console.log("rotY is"),console.log(y),document.querySelector("#"+this.el.id).object3D.rotation.set(THREE.Math.degToRad(m),THREE.Math.degToRad(y),THREE.Math.degToRad(p))}}),AFRAME.registerComponent("provenance",{schema:{provider_id:{type:"string",default:"poly"},object_id_given_by_provider:{type:"string",default:"uninitialized by jafet"}}})}]);