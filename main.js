var camera, scene, renderer;
var mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 10;

	scene = new THREE.Scene();

	// var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );

	// var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );

	var planeGeo = new THREE.Geometry();
	planeGeo.dynamic = true;

	// var vertices = []
	// for(var i=0;i<10;i+= 1) {
	// 	for(var j=0;j<2;j++){
	// 		vert = new THREE.Vector3(i*10, j*10, 0);
	// 		vertices.push(vert);
	// 	}
	// 	vert = new THREE.Vector3((i*10)+10, j*10, 0);
	// 	vertices.push(vert);
	// }

	verts = []
	for (var i = 0; i < 10; i++){
		verts.push(
			new THREE.Vector3(i + 0,0,0),
			new THREE.Vector3(i + 1,0,0),
			new THREE.Vector3(i + 0,1,0)
		)
	}

	planeGeo.vertices = verts;
	planeGeo.mergeVertices();
	var holes = [];

	var triangles = THREE.ShapeUtils.triangulateShape ( verts, holes );

	for( var i = 0; i < triangles.length; i++ ){
		planeGeo.faces.push( new THREE.Face3( triangles[i][0], triangles[i][1], triangles[i][2]));
	}

	var material = new THREE.MeshBasicMaterial();


	mesh = new THREE.Mesh( planeGeo, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;

	renderer.render( scene, camera );

}