"use client";

import { useRef, useEffect } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let mouseTargetX = 0;
    let mouseTargetY = 0;

    const init = async () => {
      const THREE = await import("three");

      const canvas = canvasRef.current;
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      camera.position.z = 30;

      // --- Particles ---
      const particleCount = 600;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 80;
        colors[i] = 0.3 + Math.random() * 0.3;
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.12,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // --- Geometric Shapes ---
      const shapes: any[] = [];
      const shapeData: { speed: number; rotSpeed: any; initialPos: any }[] = [];

      const geometries = [
        new THREE.IcosahedronGeometry(0.8, 0),
        new THREE.OctahedronGeometry(0.7, 0),
        new THREE.TorusGeometry(0.6, 0.25, 8, 16),
        new THREE.TetrahedronGeometry(0.7, 0),
        new THREE.BoxGeometry(0.6, 0.6, 0.6),
      ];

      const palette = ["#3B82F6", "#60A5FA", "#8B5CF6", "#06B6D4", "#A78BFA"];

      for (let i = 0; i < 25; i++) {
        const geo = geometries[i % geometries.length];
        const color = new THREE.Color(palette[i % palette.length]);
        const mat = new THREE.MeshPhysicalMaterial({
          color,
          metalness: 0.6,
          roughness: 0.2,
          transparent: true,
          opacity: 0.3 + Math.random() * 0.4,
          wireframe: Math.random() > 0.5,
        });
        const mesh = new THREE.Mesh(geo, mat);

        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 20 - 5;

        mesh.position.set(x, y, z);
        mesh.scale.setScalar(0.8 + Math.random() * 1.5);

        scene.add(mesh);
        shapes.push(mesh);
        shapeData.push({
          speed: 0.1 + Math.random() * 0.3,
          rotSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
          ),
          initialPos: new THREE.Vector3(x, y, z),
        });
      }

      // --- Connection lines (between nearby particles) ---
      const linePositions = new Float32Array(particleCount * 3);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.06,
      });
      const lineSystem = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lineSystem);

      // --- Mouse tracking ---
      const handleMouseMove = (e: MouseEvent) => {
        mouseTargetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseTargetY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", handleMouseMove);

      // --- Resize ---
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      // --- Animate ---
      const clock = new THREE.Clock();

      const animate = () => {
        const t = clock.getElapsedTime();

        // Smooth mouse
        mouseX += (mouseTargetX - mouseX) * 0.03;
        mouseY += (mouseTargetY - mouseY) * 0.03;

        // Move particles slowly
        const pos = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          pos[i3 + 1] += Math.sin(t * 0.1 + i) * 0.001;
          pos[i3] += Math.cos(t * 0.08 + i * 0.5) * 0.001;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Rotate shapes
        shapes.forEach((mesh, i) => {
          const d = shapeData[i];
          mesh.rotation.x += d.rotSpeed.x;
          mesh.rotation.y += d.rotSpeed.y;
          mesh.rotation.z += d.rotSpeed.z;

          // Subtle float
          mesh.position.y = d.initialPos.y + Math.sin(t * d.speed + i) * 1.5;
          mesh.position.x = d.initialPos.x + Math.cos(t * d.speed * 0.7 + i * 1.3) * 1;

          // Mouse parallax
          mesh.position.x += mouseX * 1.5;
          mesh.position.y += mouseY * 1.5;
        });

        // Camera follows mouse slightly
        camera.position.x = mouseX * 2;
        camera.position.y = mouseY * 1;
        camera.lookAt(0, 0, 0);

        // Update lines
        const linePos = lineSystem.geometry.attributes.position.array as Float32Array;
        const particlePos = particles.geometry.attributes.position.array as Float32Array;
        let lineIdx = 0;

        for (let i = 0; i < particleCount && lineIdx < particleCount * 3; i += 3) {
          for (let j = i + 3; j < particleCount && lineIdx < particleCount * 3; j += 3) {
            const dx = particlePos[i] - particlePos[j];
            const dy = particlePos[i + 1] - particlePos[j + 1];
            const dz = particlePos[i + 2] - particlePos[j + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 6) {
              linePos[lineIdx] = particlePos[i];
              linePos[lineIdx + 1] = particlePos[i + 1];
              linePos[lineIdx + 2] = particlePos[i + 2];
              linePos[lineIdx + 3] = particlePos[j];
              linePos[lineIdx + 4] = particlePos[j + 1];
              linePos[lineIdx + 5] = particlePos[j + 2];
              lineIdx += 6;
            }
          }
        }
        lineSystem.geometry.attributes.position.needsUpdate = true;
        lineSystem.geometry.setDrawRange(0, lineIdx);

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
