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

      // --- Main Icosahedron (wireframe) ---
      const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
      const edgesGeo = new THREE.EdgesGeometry(icoGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.35,
        linewidth: 1,
      });
      const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
      scene.add(wireframe);

      // --- Inner glowing icosahedron ---
      const innerGeo = new THREE.IcosahedronGeometry(1.55, 1);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x3b82f6,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      scene.add(innerMesh);

      // --- Orbiting particles ---
      const particleCount = 80;
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

      // --- Outer ring ---
      const ringGeo = new THREE.RingGeometry(2.3, 2.32, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      scene.add(ring);

      // --- Second ring (tilted) ---
      const ring2Geo = new THREE.RingGeometry(2.6, 2.62, 64);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = Math.PI / 3;
      ring2.rotation.y = Math.PI / 4;
      scene.add(ring2);

      // --- Ambient glow sphere ---
      const glowGeo = new THREE.SphereGeometry(1.8, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.03,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      scene.add(glow);

      // --- Lights ---
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x3b82f6, 2, 10);
      pointLight1.position.set(3, 3, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x8b5cf6, 1.5, 10);
      pointLight2.position.set(-3, -2, 2);
      scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0x06b6d4, 1, 8);
      pointLight3.position.set(0, 3, -3);
      scene.add(pointLight3);

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
        wireframe.rotation.z = t * 0.05;

        // Inner mesh follows
        innerMesh.rotation.copy(wireframe.rotation);

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
          pPos[i3 + 1] += Math.sin(t * speed + i) * 0.002;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = t * 0.02;

        // Rings rotate
        ring.rotation.z = t * 0.08;
        ring2.rotation.z = -t * 0.06;
        ring2.rotation.x = Math.PI / 3 + Math.sin(t * 0.1) * 0.1;

        // Glow pulse
        const glowScale = 1 + Math.sin(t * 0.5) * 0.05;
        glow.scale.setScalar(glowScale);

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