// Set up scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background to white

// Set up camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Data for the curve graph
const data = [3, 1, 2, 4, 2, 1, 3, 1, -2, 4, 6, -2]; // Example data, replace with your own

// Load the font
const fontLoader = new THREE.FontLoader();
let font; // Variable to store the loaded font
fontLoader.load(
  "https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json",
  function (loadedFont) {
    font = loadedFont;

    // Create 3D Curve Graph
    const curveGeometry = new THREE.BufferGeometry();
    const curveMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000, // Set color to red
      linewidth: 5000, // Set the width of the curve
    });
    const curvePoints = [];

    // Create 3D Text Labels
    const labels = data.map((value, index) => {
      const textGeometry = new THREE.TextGeometry(value.toString(), {
        font: font,
        size: 0.5, // Adjust the size of the text
        height: 0.1,
      });

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Set the color of the text
      const text = new THREE.Mesh(textGeometry, textMaterial);

      return text;
    });

    // Position the labels along the curve
    if (curvePoints) {
      labels.forEach((label, index) => {
        const point = curvePoints[index]?.clone();
        if (point) {
          point.z += 2; // Adjust the Z-coordinate to place the label in front of the curve
          label.position.copy(point);
          label.lookAt(camera.position);
          scene.add(label);
        }
      });
    }

    for (let i = 0; i < data.length; i++) {
      const x = (i - (data.length - 1) / 2) * 2; // Center and scale the curve
      const y = data[i] * 4; // Scale the y-values for better visibility
      const z = 0;

      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    curveGeometry.setFromPoints(curvePoints);

    const curve = new THREE.Line(curveGeometry, curveMaterial);
    curve.position.y = -1;
    scene.add(curve);

    // Create 3D Cone
    const coneGeometry = new THREE.ConeGeometry(5, 10, 38);
    const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.y = -10; // Position the cone beneath the curve
    scene.add(cone);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the curve graph and cone
      curve.rotation.y += 0.005;
      cone.rotation.y += 0.005;

      // Get the curve points
      const curvePoints = curve.geometry.attributes.position;

      // Update the positions of the labels to move with the curve
      labels.forEach((label, index) => {
        const x = curvePoints.getX(index);
        const y = curvePoints.getY(index);
        const z = curvePoints.getZ(index) + 2; // Adjust the Z-coordinate to place the label in front of the curve

        label.position.set(x, y, z);
        label.lookAt(camera.position);
      });

      // Render the scene
      renderer.render(scene, camera);
    };

    // Handle window resize
    window.addEventListener("resize", () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    });

    // Start animation loop
    animate();
  }
);
