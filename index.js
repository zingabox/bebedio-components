    console.log("Bro am registering your components")

    // import aframe from 'aframe';
    // import 'aframe-extras'
    // import 'aframe-look-at-component'



    AFRAME.registerComponent('orient-character', {
      dependencies: ['raycaster'],
      schema: {
        active: { type: 'boolean', default: true }
      },
      init: function() {
        window.counter = 1


        // this.el.addEventListener('raycaster-intersection-cleared', function(evt) {
        //   console.log('clearing this:')
        // })
        // this.orientCharacter=function

        // this.orientCharacter = this.orientCharacter.bind(this);
        // function orientCharacter(evt) {
        this.orientCharacter = function(evt) {
          // if (evt.detail.els[0].id !== 'cursio' && evt.detail.intersections.length >= 1) {
          numIntersects=evt.detail.els.length
          if (evt.detail.els[numIntersects-1].id !== 'cursio' && evt.detail.intersections.length >= 1) {

            // console.log('detected intersection')
            // console.log("intersected this")
            // console.log(evt.detail)
            if (this.data.active) {
              // console.log('calculating lookat')
              var lookAt = new THREE.Vector3(evt.detail.intersections[numIntersects-1].point.x, evt.detail.intersections[numIntersects-1].point.y, evt.detail.intersections[numIntersects-1].point.z);
              //4/23/2020
              // lookAt.sub(document.querySelector('#enclosure').object3D.position)
              lookAt.sub(document.querySelector('#enclosure').getAttribute('position'))
              // console.log('about to look at this position')
              // console.log(lookAt)
              document.querySelector('#player').setAttribute('look-at', lookAt)
              //4/23/2020
              // var rotation = document.querySelector('#thecam').object3D.rotation
              var rotation = document.querySelector('#thecam').getAttribute('rotation')
              var rotMetric = 0
              var rotation = 90 + rotation.y
              if (rotation >= 0) {
                rotMetric = rotation % 360
              }
              else {
                rotMetric = 360 + rotation % 360
              }
              rotMetric = rotMetric * Math.PI / 180
              ////NOTE:The variable cameraDistance is not exactly the distance
              ////It is easy to figure out what it actuallyl is
              ////The compassFactor controls how easy it is for the user to tell whether
              ////he is moving to east, west, north, or south, or in a diagonal
              ////If you ever want to decouple the three axes in the camera motion all you need
              ////to do is have separate n's or separate sines for each axis (not talking about the rotMetric sines)
              ////but about the compassFactor. In other words, just modulate each with different variables.
              ////Currently you are modulating all with the variable compassFactor, and that's why they are coupled.
              var cameraDistance = 5
              var d = new Date();
              window.counter = window.counter + 1
              var n = ((window.counter / 4000) % 1);
              var cameraOscillationAmplitude = 8 //was 8 when decent. SET TO ZERO TO DISABLE CAMERA MOTION
              var compassFactor = Math.abs(cameraOscillationAmplitude * n - cameraOscillationAmplitude / 2) - cameraOscillationAmplitude / 4 //.3
              var x = -(cameraDistance - compassFactor) * Math.cos(rotMetric)
              var z = (cameraDistance + compassFactor) * Math.sin(rotMetric)
              var y = (cameraDistance / 1.5) + (cameraOscillationAmplitude / 10) * compassFactor //Math.cos(2*Math.PI*verticalFreq*(d.getTime()/1000))

              //4/23/2020
              // .object3D.position.set(entityPosition.x, entityPosition.y, entityPosition.z)
              // document.querySelector('#thecam').object3D.position.set(x, y, z)
              document.querySelector('#thecam').setAttribute('position', new THREE.Vector3(x, y, z))
            }
            document.querySelector('#cursio').components.raycaster.init()
          }
        }

        // this.el.addEventListener('raycaster-intersection', .bind(this));
        console.log('Bro: the function being added is:')
        console.log(this.orientCharacter)
        this.el.addEventListener('raycaster-intersection', this.orientCharacter.bind(this));
      },
      tick: function() {}
      // ,pause: function() {
      //   console.log('Bro: the function being removed is:')
      //   console.log(this.orientCharacter)
      //   this.el.removeEventListener('raycaster-intersection', this.orientCharacter);
      // },
      // play: function() {
      //   console.log('Bro: playing character orientation')
      //   this.el.addEventListener('raycaster-intersection', this.orientCharacter);
      // }

    });

    AFRAME.registerComponent('character-animation', {
      tick: function() {

        var keysPressed = 'None'
        try {
          keysPressed = document.querySelector('[movement-controls]').components["keyboard-controls"].getKeys()
        }
        catch (err) {
          console.log('There was an error getting keys. The error is:')
          console.log(err)
        }
        var keysArray = Object.keys(keysPressed);

        switch (keysArray[0]) {
          case 'KeyW':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: walking')
            break;
          case 'KeyS':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: walking_backward')
            break;
          case 'KeyA':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: left_strafe')
            break;
          case 'KeyD':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: right_strafe')
            break;
          case 'Space':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: jump')
            break;
          case 'ArrowUp':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: walking')
            break;
          case 'ArrowDown':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: walking_backward')
            break;
          case 'ArrowLeft':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: left_strafe')
            break;
          case 'ArrowRight':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: right_strafe')
            break;
          case 'Space':
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: jump')
            break;

          default:
            document.querySelector('[character-animation]').setAttribute('animation-mixer', 'clip: standard_idle')

        }
      }
    });



    AFRAME.registerComponent('position-mirror', {
      schema: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }
      // ,init: function() {          this.data.position = this.el.object3D.position;}
      ,
      tick: function() {
        // this.el.setAttribute('position-mirror', this.el.object3D.position)
        // console.log('position to set is')
        // console.log(this.el.object3D.position)
        this.el.setAttribute('position-mirror', { x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z })
        // this.el.setAttribute('position', { x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z })
        // this.el.setAttribute('position-mirror', this.el.object3D.position)
        
        // this.el.setAttribute('position', this.el.object3D.position)
      }
    });
    AFRAME.registerComponent('rotation-mirror', {
      schema: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }
      // ,init: function() {          this.data.position = this.el.object3D.position;}
      ,
      tick: function() {
        this.el.setAttribute('rotation-mirror', { x: this.el.object3D.rotation.x, y: this.el.object3D.rotation.y, z: this.el.object3D.rotation.z })
        // this.el.setAttribute('position', this.el.object3D.position)
      }
    });


    AFRAME.registerComponent('track', {
      schema: {
        property: { type: 'string', default: 'position' },
        target: { type: 'string', default: 'enclosure' },
        horizontal: { type: 'boolean', default: 'false' }
      },

      // schema: { type: 'string', default: {property:'position',target:'player'} }
      // // ,init: function() {          this.data.position = this.el.object3D.position;}
      // ,
      tick: function() {
        try {
          var targetValue = this.el.sceneEl.querySelector('#' + this.data.target).object3D[this.data.property]
          // console.log('will set '+this.data.property+' in '+this.el)
          // console.log('to')
          // console.log(targetValue)
          // this.el.object3D[this.data.property].set(targetValue.x,targetValue.y,targetValue.z)


          if (this.data.horizontal) {
          
          //4/23/2020
          // this.el.object3D[this.data.property].set(targetValue.x,targetValue.y,targetValue.z)
            this.el.setAttribute(this.data.property, { x: targetValue.x, y: 0, z: targetValue.z })

          }
          else {

          //4/23/2020
          // this.el.object3D[this.data.property].set(targetValue)
            this.el.setAttribute(this.data.property, targetValue)

          }
        }
        catch (e) {
          console.warn("failed to track. exception is ")
          console.log("target is " + this.data.target)
          console.log("property is " + this.data.property)
        }

      }
    });




    //     AFRAME.registerComponent('raycaster-autorefresh', {
    //   init: function () {
    //     var el = this.el;
    //     this.el.addEventListener('model-loaded', function () {
    //       var cursorEl = el.querySelector('[raycaster]');
    //       cursorEl.components.raycaster.refreshObjects();
    //       console.log("Bro calling raycaster-autorefresh listener")
    //     });
    //   }
    // });


    AFRAME.registerComponent('raycaster-autorefresh', {
      init: function() {
        var el = this.el;
        this.el.addEventListener('model-loaded', function() {
          var cursorEl = el.querySelector('[raycaster]');
          cursorEl.components.raycaster.refreshObjects();
        });
      }
    });

    AFRAME.registerComponent('wireframe', {
      dependencies: ['material'],
      init: function() {
        this.el.components.material.material.wireframe = true;
      }
    });




    // universe, inFrontOfId, objectId, directionWrtReference, distanceFromReference, firebaseUserId
    AFRAME.registerComponent('place-in-front-of', {
      // schema: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }
      schema: {
        // universe: { type: 'string', default: 'none' },
        // inFrontOfId: { type: 'string', default: 'none' },
        // objectId: { type: 'string', default: 'none' }
        directionWrtReference: { type: 'vec3', default: { x: 1, y: 1, z: 1 } },
        distanceFromReference: { type: 'number', default: 1 },
        // firebaseUserId: { type: 'string', default: 'none' }
        followPlayer: { type: 'boolean', default: false }
      },

      init: function() {
        this.faceIt = this.faceIt.bind(this);

        this.faceIt()
      },

      tick: function() {
        // console.log('')
        if (this.data.follow) {
          console.log('following')
          this.faceIt()
        }

        // this.el.setAttribute('position-mirror', this.el.object3D.position)
        // this.el.setAttribute('position', this.el.object3D.position)
      },

      faceIt: function() {
        console.log('facing it')
        var refPos = document.querySelector('#enclosure').components['position-mirror'].data
        //FOR THE THREE LINES BELOW, SET POSITION VECTOR INSTEAD FROM
        //THE ATTRIBUTES IN THE DATABASE
        var x = Number(refPos.x)
        var y = Number(refPos.y)
        var z = Number(refPos.z)
        var position = new THREE.Vector3(x, y, z);
        //GET THIS FROM THE DATABASE TOO
        var yRot = Number(document.querySelector('#player').getAttribute('rotation-mirror').y)

        var axis = new THREE.Vector3(0, 1, 0);
        var angle = yRot
        console.log('this.data is')
        console.log(this.data)
        const direction = new THREE.Vector3(this.data.directionWrtReference.x, this.data.directionWrtReference.y, this.data.directionWrtReference.z);
        // this.data.directionWrtReference.applyAxisAngle(axis, angle); //angle );
        direction.applyAxisAngle(axis, angle); //angle );
        var entityPosition = position; //.add(biasVector );
        // this.data.directionWrtReference.normalize().multiplyScalar(this.data.distanceFromReference);; //.multiplyScalar(distanceFromCamera);
        direction.normalize().multiplyScalar(this.data.distanceFromReference);; //.multiplyScalar(distanceFromCamera);
        // entityPosition.add(this.data.directionWrtReference);
        entityPosition.add(direction);
        //SET THIS ON THE DATABASE OR ON A LOCAL OBJECT BEFORE YOU UPLOAD
        console.log('line 1:')
        // document.querySelector('#' + this.data.objectId).object3D.position.set(entityPosition.x, entityPosition.y, entityPosition.z)
        document.querySelector('#' + this.el.id).object3D.position.set(entityPosition.x, entityPosition.y, entityPosition.z)

        console.log('line 2:')
        // THIS PART YOU CAN JUST SET ON THE DATABASE OR ON THE LOCAL OBJECT THEN UPLOAD
        console.log('line 3:')
        var refRot = document.querySelector('#player').getAttribute('rotation-mirror');
        var objRotData = { x: 0, y: Math.PI, z: 0 } //document.querySelector('#' + objectId).components['rotation'].data
        // var objRotData = { x: 0, y: 0, z: 0 } //document.querySelector('#' + objectId).components['rotation'].data
        console.log('objRotData is')
        console.log(objRotData)

        console.log('refRot.y is')
        console.log(refRot.y)
        console.log('objRotData.rotation.y is')
        console.log(objRotData.y)
        var rotX = (Number(refRot.x) + Number(objRotData.x)) * 180 / Math.PI
        var rotY = (Number(refRot.y) + Number(objRotData.y)) * 180 / Math.PI
        var rotZ = (Number(refRot.z) + Number(objRotData.z)) * 180 / Math.PI
        console.log('rotY is')
        console.log(rotY)
        // document.querySelector('#' + this.data.objectId).object3D.rotation.set(THREE.Math.degToRad(rotX), THREE.Math.degToRad(rotY), THREE.Math.degToRad(rotZ))
        document.querySelector('#' + this.el.id).object3D.rotation.set(THREE.Math.degToRad(rotX), THREE.Math.degToRad(rotY), THREE.Math.degToRad(rotZ))

      }
    });

    AFRAME.registerComponent('provenance', {
      schema: {
        // directionWrtReference: { type: 'vec3', default: { x: 1, y: 1, z: 1 } },
        // distanceFromReference: { type: 'number', default: 1 },
        provider_id: { type: 'string', default: 'poly' },
        object_id_given_by_provider: { type: 'string', default: 'uninitialized by jafet' }
      }
      // tick: function() {
      //   this.el.setAttribute('position-mirror', this.el.object3D.position)
      //   // this.el.setAttribute('position', this.el.object3D.position)
      // }
    });
    