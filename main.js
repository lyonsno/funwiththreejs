var camera, scene, renderer;
var mesh;
var vertPairs;
var counter = 0;
var verts;
var segments = 100;
var height = 50;
var thickness = 2;
var offset = 10;
init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	// camera.position.z = 30;
	// camera.position.y = 10;
	// camera.position.x = 30;
	// // camera.up = new THREE.Vector3(0,1,0);
	// camera.lookAt(new THREE.Vector3(0,5,0));

	camera.position.z = 30;
	camera.position.y = 30;
	camera.position.x = 0;
	// camera.up = new THREE.Vector3(0,1,0);
	camera.lookAt(new THREE.Vector3(0,15,0));

	scene = new THREE.Scene();

	var planeGeo = new THREE.Geometry();
	planeGeo.dynamic = true;

	verts = [];
	vertPairs = [];
	var index = 0
	// LEFT SIDE
	for(var i = 0; i < segments; i++)
	{
		var vert = new THREE.Vector3(0, ((height * i) + offset) / segments, 10);
		verts.push(vert);
		vertPairs[i] = [index];
		index++;
	}
	// RIGHT SIDE
	for(var i = segments - 1; i >= 0; i--)
	{
		var vert = new THREE.Vector3(20, ((height * i) + offset) / segments, 10);
		verts.push(vert);
		vertPairs[i].push(index)
		index++;
	}

	planeGeo.vertices = verts;
	planeGeo.mergeVertices();
	var holes = [];

	var triangles = THREE.ShapeUtils.triangulateShape ( verts, holes );

	for( var i = 0; i < triangles.length; i++ ){
		planeGeo.faces.push( new THREE.Face3( triangles[i][0], triangles[i][1], triangles[i][2]));
	}

	planeGeo.computeFaceNormals();
	planeGeo.computeVertexNormals();

	var material = new THREE.MeshPhongMaterial({
		color: new THREE.Color().setRGB( 0.8, 0.70, 0.9 ),
	});

	var light = new THREE.PointLight(0x0040ff)
	light.position.x = 40;
	light.position.y = 20;
	light.position.z = 15;
	light.intensity = 10.5;
	scene.add(light);

	mesh = new THREE.Mesh( planeGeo, material );
	mesh.dynamic = true;
	scene.add( mesh );
	mesh.rotation.z = 1.55;

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	counter += 0.1;
	for (var i = 0; i < segments; i++)
	{
		mesh.geometry.vertices[vertPairs[i][0]].x += 0.2 * Math.sin(counter + 16 * mesh.geometry.vertices[vertPairs[i][0]].y / height);
		mesh.geometry.vertices[vertPairs[i][1]].x += 0.2 * Math.sin(counter + 16 * mesh.geometry.vertices[vertPairs[i][1]].y / height);
	}
	mesh.geometry.verticesNeedUpdate = true;
	renderer.render( scene, camera );

}