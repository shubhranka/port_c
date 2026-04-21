// Network Topology Visualization
let nodes = [];
let edges = [];
let dataParticles = [];
let nodeGroups = [];

// Node definitions representing tech stack
const nodeData = [
    // Cloud & AWS services
    { id: 'eks', label: 'EKS', type: 'cloud', position: [0, 5, 0], color: 0xff6b35, size: 1.5 },
    { id: 's3', label: 'S3', type: 'cloud', position: [8, 2, -5], color: 0xff6b35, size: 1.2 },
    { id: 'lambda', label: 'Lambda', type: 'cloud', position: [-8, 3, 5], color: 0xff6b35, size: 1.2 },
    { id: 'cloudfront', label: 'CloudFront', type: 'cloud', position: [10, 0, 0], color: 0xff6b35, size: 1 },
    { id: 'iam', label: 'IAM', type: 'cloud', position: [-10, 1, 0], color: 0xff6b35, size: 1 },
    { id: 'cloudtrail', label: 'CloudTrail', type: 'cloud', position: [6, -3, 5], color: 0xff6b35, size: 1 },

    // Databases & Storage
    { id: 'redis', label: 'Redis', type: 'database', position: [5, -2, -8], color: 0x00d4ff, size: 1.3 },
    { id: 'mongodb', label: 'MongoDB', type: 'database', position: [-5, -1, -10], color: 0x00d4ff, size: 1.3 },
    { id: 'sql', label: 'SQL', type: 'database', position: [0, -4, 5], color: 0x00d4ff, size: 1.2 },

    // Message Queues
    { id: 'kafka', label: 'Kafka', type: 'queue', position: [-7, 4, -6], color: 0xff00ff, size: 1.4 },

    // Languages & Runtimes
    { id: 'java', label: 'Java', type: 'language', position: [12, 4, 8], color: 0x8b5cf6, size: 1.1 },
    { id: 'javascript', label: 'JavaScript', type: 'language', position: [-12, 3, 8], color: 0x8b5cf6, size: 1.1 },
    { id: 'golang', label: 'Go', type: 'language', position: [0, 8, -10], color: 0x8b5cf6, size: 1.1 },
    { id: 'python', label: 'Python', type: 'language', position: [14, -2, -6], color: 0x8b5cf6, size: 1.1 },

    // Tools & Platforms
    { id: 'docker', label: 'Docker', type: 'tool', position: [-14, -2, -6], color: 0x10b981, size: 1.1 },
    { id: 'terraform', label: 'Terraform', type: 'tool', position: [8, 6, 8], color: 0x10b981, size: 1.1 },
    { id: 'kubernetes', label: 'K8s', type: 'tool', position: [-8, 6, 8], color: 0x10b981, size: 1.1 },
    { id: 'nodejs', label: 'Node.js', type: 'tool', position: [3, -5, -12], color: 0x10b981, size: 1.1 },

    // Companies (Work Experience)
    { id: 'sourcefuse', label: 'SourceFuse', type: 'company', position: [15, 0, 12], color: 0xfbbf24, size: 1.6 },
    { id: 'innovenes', label: 'Innovenes', type: 'company', position: [-15, 0, 12], color: 0xfbbf24, size: 1.6 },
    { id: 'avrl', label: 'AVRL', type: 'company', position: [0, 0, 15], color: 0xfbbf24, size: 1.6 },

    // Projects
    { id: 'chalkky', label: 'Chalkky', type: 'project', position: [-12, -5, -12], color: 0xec4899, size: 1.3 },
    { id: 'jupyter', label: 'Jupyter', type: 'project', position: [12, -5, -12], color: 0xec4899, size: 1.3 },
    { id: 'https-server', label: 'HTTPS Server', type: 'project', position: [-15, -6, 6], color: 0xec4899, size: 1.2 },
    { id: 'screen-recorder', label: 'Screen Recorder', type: 'project', position: [15, -6, 6], color: 0xec4899, size: 1.2 },
];

// Edge connections
const edgeData = [
    // Cloud connections
    ['eks', 's3'], ['eks', 'lambda'], ['eks', 'kafka'],
    ['eks', 'redis'], ['eks', 'mongodb'],
    ['cloudfront', 's3'], ['iam', 'lambda'], ['cloudtrail', 'eks'],

    // Data flow
    ['kafka', 'redis'], ['kafka', 'mongodb'],
    ['lambda', 's3'], ['lambda', 'redis'],

    // Language connections
    ['java', 'eks'], ['golang', 'kafka'], ['javascript', 'nodejs'],
    ['python', 'lambda'], ['golang', 'docker'],

    // Tool connections
    ['docker', 'eks'], ['terraform', 'eks'], ['kubernetes', 'eks'],

    // Company tech stacks
    ['sourcefuse', 'eks'], ['sourcefuse', 'kafka'], ['sourcefuse', 'redis'],
    ['innovenes', 'eks'], ['innovenes', 'cloudfront'], ['innovenes', 's3'],
    ['avrl', 'kafka'], ['avrl', 'nodejs'], ['avrl', 'javascript'],

    // Project tech
    ['chalkky', 'javascript'], ['chalkky', 'mongodb'], ['chalkky', 'websocket'],
    ['jupyter', 'javascript'], ['jupyter', 'react'],
    ['https-server', 'java'], ['screen-recorder', 'golang'],
];

function createNetwork() {
    // Wait for scene to be initialized
    const checkScene = setInterval(() => {
        if (window.scene) {
            clearInterval(checkScene);
            buildNetwork();
        }
    }, 100);
}

function buildNetwork() {
    const group = new THREE.Group();

    // Create nodes
    nodeData.forEach(data => {
        const node = createNode(data);
        nodes.push(node);
        group.add(node);
    });

    // Create edges
    edgeData.forEach(edge => {
        const sourceNode = nodes.find(n => n.userData.id === edge[0]);
        const targetNode = nodes.find(n => n.userData.id === edge[1]);

        if (sourceNode && targetNode) {
            const edgeMesh = createEdge(sourceNode, targetNode);
            edges.push(edgeMesh);
            group.add(edgeMesh);

            // Add data particles for this edge
            const particle = createDataParticle(sourceNode, targetNode);
            if (particle) {
                dataParticles.push(particle);
                group.add(particle);
            }
        }
    });

    nodeGroups.push(group);
    window.scene.add(group);

    // Setup interaction
    setupInteraction();
}

function createNode(data) {
    const geometry = new THREE.IcosahedronGeometry(data.size, 1);
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);

    const material = new THREE.LineBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.8
    });

    const mesh = new THREE.LineSegments(wireframeGeometry, material);
    mesh.position.set(...data.position);
    mesh.userData = { ...data, originalColor: data.color };

    // Add inner glow
    const innerGeometry = new THREE.IcosahedronGeometry(data.size * 0.5, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.3
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mesh.add(innerMesh);

    return mesh;
}

function createEdge(source, target) {
    const points = [];
    points.push(source.position.clone());
    points.push(target.position.clone());

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.3
    });

    const line = new THREE.Line(geometry, material);
    line.userData = { source, target };

    return line;
}

function createDataParticle(source, target) {
    const geometry = new THREE.SphereGeometry(0.15, 8, 8);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.8
    });

    const particle = new THREE.Mesh(geometry, material);
    particle.position.copy(source.position);
    particle.userData = {
        source: source.position,
        target: target.position,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.005
    };

    return particle;
}

function setupInteraction() {
    const canvas = document.getElementById('canvas');
    let hoveredNode = null;
    let selectedNode = null;

    canvas.addEventListener('mousemove', (event) => {
        window.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        window.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        window.raycaster.setFromCamera(window.mouse, window.camera);
        const intersects = window.raycaster.intersectObjects(nodes);

        // Reset previous hover
        if (hoveredNode && hoveredNode !== selectedNode) {
            hoveredNode.material.color.setHex(hoveredNode.userData.originalColor);
            hoveredNode.material.opacity = 0.8;
            document.body.style.cursor = 'default';
        }

        if (intersects.length > 0) {
            hoveredNode = intersects[0].object;
            hoveredNode.material.color.setHex(0xffffff);
            hoveredNode.material.opacity = 1;
            document.body.style.cursor = 'pointer';
        } else {
            hoveredNode = null;
        }
    });

    canvas.addEventListener('click', (event) => {
        if (hoveredNode) {
            // Handle node click - scroll to related section
            const nodeId = hoveredNode.userData.id;
            const sectionMap = {
                'sourcefuse': 'experience',
                'innovenes': 'experience',
                'avrl': 'experience',
                'chalkky': 'projects',
                'jupyter': 'projects',
                'https-server': 'projects',
                'screen-recorder': 'projects',
                'eks': 'skills',
                'kafka': 'skills',
                'redis': 'skills',
                'mongodb': 'skills',
                'java': 'skills',
                'javascript': 'skills',
                'golang': 'skills',
                'python': 'skills',
            };

            const section = sectionMap[nodeId];
            if (section) {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });

                // Highlight related card
                setTimeout(() => {
                    const card = document.querySelector(`[data-node="${nodeId}"]`);
                    if (card) {
                        card.style.transform = 'scale(1.05)';
                        card.style.boxShadow = 'var(--glow-cyan)';
                        setTimeout(() => {
                            card.style.transform = '';
                            card.style.boxShadow = '';
                        }, 2000);
                    }
                }, 500);
            }
        }
    });
}

function animateNetwork() {
    // Animate nodes (gentle floating)
    nodes.forEach((node, i) => {
        node.rotation.x += 0.002;
        node.rotation.y += 0.003;
        node.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
    });

    // Animate data particles along edges
    dataParticles.forEach(particle => {
        particle.userData.progress += particle.userData.speed;
        if (particle.userData.progress > 1) {
            particle.userData.progress = 0;
        }

        particle.position.lerpVectors(
            particle.userData.source,
            particle.userData.target,
            particle.userData.progress
        );
    });

    requestAnimationFrame(animateNetwork);
}

// Initialize network
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createNetwork();
        animateNetwork();
    }, 500);
});
