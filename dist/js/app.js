var renderer	= new THREE.WebGLRenderer({
		antialias	: true
	});
/* Fullscreen */
 renderer.setSize( window.innerWidth, window.innerHeight );
/* Append to HTML */
 document.getElementById("hero").appendChild(renderer.domElement);
	var onRenderFcts= [];
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(25, window.innerWidth /    window.innerHeight, 0.01, 1000);
/* Play around with camera positioning */
	camera.position.z = 15;
  camera.position.y = 2;
/* Fog provides depth to the landscape*/
  scene.fog = new THREE.Fog(0x2768d1, 0, 45);
	;(function(){
		var light	= new THREE.AmbientLight( 0x2768d1 )
		scene.add( light )
		var light	= new THREE.DirectionalLight('red', 5)
		light.position.set(0.5, 0.0, 2)
		scene.add( light )

		var light	= new THREE.DirectionalLight('red', 0.75*2)
		light.position.set(-0.5, -0.5, -2)
		scene.add( light )
	})()
	var heightMap	= THREEx.Terrain.allocateHeightMap(236,256)
	THREEx.Terrain.simplexHeightMap(heightMap)
	var geometry	= THREEx.Terrain.heightMapToPlaneGeometry(heightMap)
	THREEx.Terrain.heightMapToVertexColor(heightMap, geometry)
/* Wireframe built-in color is white, no need to change that */
	var material	= new THREE.MeshBasicMaterial({
    color: 0x1f2838,
		wireframe: true
	});
	var mesh	= new THREE.Mesh( geometry, material );
	scene.add( mesh );
	mesh.lookAt(new THREE.Vector3(0,1,0));
/* Play around with the scaling */
	mesh.scale.y	= 3.5;
	mesh.scale.x	= 3;
	mesh.scale.z	= 0.20;
	mesh.scale.multiplyScalar(10);
/* Play around with the camera */
	onRenderFcts.push(function(delta, now){
		mesh.rotation.z += 0.2 * delta;
	})
	onRenderFcts.push(function(){
		renderer.render( scene, camera );
	})
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		requestAnimationFrame( animate );
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000)
		})
	})
