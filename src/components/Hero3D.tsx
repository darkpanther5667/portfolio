"use client";

import { useRef, useEffect, useState } from "react";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDesktop = useDesktopEffects();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    let animId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const init = async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        50,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // --- Main Icosahedron (wireframe only) ---
      const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
      const edgesGeo = new THREE.EdgesGeometry(icoGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.35,
      });
      const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
      scene.add(wireframe);

      // --- Orbiting particles (reduced from 80 to 40) ---
      const particleCount = 40;
      const particlePositions = new Float32Array(particleCount * 3);
      const particleSpeeds: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2 + Math.random() * 1.2;

        particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = r * Math.cos(phi);
        particleSpeeds.push(0.2 + Math.random() * 0.5);
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3)
      );
      const particleMat = new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 0.03,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // --- Single ring (removed second) ---
      const ringGeo = new THREE.RingGeometry(2.3, 2.32, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      scene.add(ring);

      // --- Lights (reduced to 2) ---
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x3b82f6, 2, 10);
      pointLight1.position.set(3, 3, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x8b5cf6, 1.5, 10);
      pointLight2.position.set(-3, -2, 2);
      scene.add(pointLight2);

      // --- Mouse tracking ---
      const handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", handleMouseMove);

      // --- Resize ---
      const handleResize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      setReady(true);

      // --- Animate ---
      const clock = new THREE.Clock();

      const animate = () => {
        const t = clock.getElapsedTime();

        // Smooth mouse
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        // Rotate wireframe
        wireframe.rotation.x = t * 0.15 + mouseY * 0.3;
        wireframe.rotation.y = t * 0.2 + mouseX * 0.3;

        // Particles orbit
        const pPos = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const speed = particleSpeeds[i];
          const i3 = i * 3;
          const x = pPos[i3];
          const z = pPos[i3 + 2];
          const angle = speed * 0.01;
          pPos[i3] = x * Math.cos(angle) - z * Math.sin(angle);
          pPos[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Ring rotate
        ring.rotation.z = t * 0.08;

        // Camera follows mouse
        camera.position.x = mouseX * 0.5;
        camera.position.y = mouseY * 0.3;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 1s ease-out" }}
      />
    </div>
  );
}