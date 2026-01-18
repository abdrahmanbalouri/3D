import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Waves,
  Sparkles,
  Code,
  Palette,
  Rocket,
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  Box,
  MeshDistortMaterial,
  PerspectiveCamera,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

// 3D Components
const RotatingBox = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const animate = () => {
      meshRef.current!.rotation.x += 0.005;
      meshRef.current!.rotation.y += 0.01;
    };
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]}>
      <meshPhongMaterial color="#0ea5e9" emissive="#06b6d4" />
    </Box>
  );
};

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const animate = () => {
      meshRef.current!.rotation.x += 0.003;
      meshRef.current!.rotation.y += 0.007;
    };
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#06b6d4"
        emissive="#0ea5e9"
        distort={0.4}
        speed={2}
      />
    </Sphere>
  );
};

const FloatingOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    let time = 0;
    const animate = () => {
      time += 0.01;
      meshRef.current!.position.y = Math.sin(time) * 0.5;
      meshRef.current!.rotation.x += 0.003;
      meshRef.current!.rotation.y += 0.005;
    };
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <Sphere ref={meshRef} args={[1.2, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#0ea5e9"
        metalness={0.7}
        roughness={0.2}
      />
    </Sphere>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Studio 3D
          </motion.div>
          <div className="hidden md:flex gap-8">
            {["Features", "3D Showcase", "Contact"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-slate-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D */}
      <motion.section
        className="relative min-h-screen pt-20 pb-20 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.div variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Enter 3D
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-300 mb-8 max-w-xl"
            >
              Experience stunning 3D animations and immersive interactions that
              bring your vision to life
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 flex-wrap"
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Now <ArrowRight size={20} />
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-slate-600 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-900/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 3D Canvas */}
          <motion.div
            variants={itemVariants}
            className="h-96 rounded-lg overflow-hidden border border-slate-700"
          >
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <FloatingOrb />
              <OrbitControls
                autoRotate
                autoRotateSpeed={2}
                enableZoom={false}
              />
            </Canvas>
          </motion.div>
        </div>
      </motion.section>

      {/* 3D Features Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          3D Experiences
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-center text-slate-400 mb-16 max-w-2xl mx-auto"
        >
          Immersive 3D models and interactive scenes
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {[
            {
              icon: Zap,
              title: "3D Models",
              desc: "High-performance 3D rendering",
            },
            {
              icon: Waves,
              title: "Interactive",
              desc: "Touch and rotate with OrbitControls",
            },
            {
              icon: Sparkles,
              title: "Distortion",
              desc: "Dynamic mesh distortion effects",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-8 hover:border-slate-600 group overflow-hidden"
                whileHover={{
                  y: -10,
                  borderColor: "rgb(71, 147, 224)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="mb-4 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={24} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* 3D Showcase Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          3D Objects in Action
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Rotating Sphere */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-8 overflow-hidden"
          >
            <h3 className="text-2xl font-semibold mb-6">Distorted Sphere</h3>
            <div className="h-80 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[5, 5, 5]} intensity={1} />
                <AnimatedSphere />
                <OrbitControls autoRotate autoRotateSpeed={3} />
              </Canvas>
            </div>
          </motion.div>

          {/* Rotating Cube */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-8 overflow-hidden"
          >
            <h3 className="text-2xl font-semibold mb-6">Spinning Cube</h3>
            <div className="h-80 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[5, 5, 5]} intensity={1} />
                <RotatingBox />
                <OrbitControls autoRotate autoRotateSpeed={4} />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Particles Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <motion.div
          className="relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-slate-700 rounded-2xl p-12 md:p-16 overflow-hidden"
          variants={itemVariants}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0"
            animate={{
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          <div className="relative z-10">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              3D is the Future
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-slate-300 mb-8 text-lg"
            >
              Create immersive web experiences with cutting-edge 3D technology,
              interactive models, and stunning visual effects.
            </motion.p>
            <motion.button
              variants={itemVariants}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Building 3D <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Feature Cards with Animation */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Why Choose 3D
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-center text-slate-400 mb-16 max-w-2xl mx-auto"
        >
          Leverage modern technologies for next-generation web experiences
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {[
            {
              icon: Rocket,
              title: "Performance",
              desc: "Optimized rendering with GPU acceleration",
            },
            {
              icon: Code,
              title: "Developer Friendly",
              desc: "Easy integration with React Three Fiber",
            },
            {
              icon: Palette,
              title: "Customizable",
              desc: "Complete control over 3D materials and effects",
            },
            {
              icon: Zap,
              title: "Interactive",
              desc: "Real-time user interaction and controls",
            },
            {
              icon: Waves,
              title: "Responsive",
              desc: "Beautiful on all devices and screen sizes",
            },
            {
              icon: Sparkles,
              title: "Modern",
              desc: "Built with latest web standards and practices",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-8 hover:border-slate-600 group"
                whileHover={{
                  y: -10,
                  borderColor: "rgb(71, 147, 224)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="mb-4 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={24} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="border-t border-slate-800 bg-slate-950/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Studio 3D</h3>
              <p className="text-slate-400">
                Creating immersive 3D experiences
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    3D Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Docs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Studio 3D. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
