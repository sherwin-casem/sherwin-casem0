import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Menu, X, Code2, Brain, Eye, Workflow, Sparkles } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/60 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-blue-500/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              SC
            </div>
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-lg blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {['About', 'Projects', 'Experience', 'Skills', 'Contact'].map((item, idx) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                {item}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {['About', 'Projects', 'Experience', 'Skills', 'Contact'].map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Floating Orbs */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-background" />

          {/* Floating Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
        </div>

        {/* Mouse Glow Effect */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200
          }}
        />

        <motion.div
          style={{ scale: scaleProgress, opacity: opacityProgress }}
          className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 text-blue-400 backdrop-blur-xl"
            >
              <Sparkles className="w-4 h-4" />
              Senior AI Engineer
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-8 relative"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent drop-shadow-2xl">
                Sherwin Casem
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-3xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto bg-gradient-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent font-semibold"
            >
              AI Systems & Automation Specialist
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Building intelligent systems with LLMs, RAG, and Computer Vision to solve complex problems and automate workflows at scale
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center justify-center gap-2 font-semibold">
                  View Projects
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="relative px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 transition-all font-semibold group overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">Contact Me</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-500/5 to-background" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-4 text-center relative inline-block left-1/2 -translate-x-1/2"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent">
                About Me
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-2xl -z-10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-16"
            />

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I'm a Senior AI Engineer specializing in building production-ready AI systems that drive real business value. With deep expertise in Large Language Models, Retrieval-Augmented Generation (RAG), and Computer Vision, I transform complex challenges into elegant, scalable solutions.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  My work spans from developing intelligent automation platforms using n8n to creating advanced computer vision systems with YOLO and OpenCV. I thrive at the intersection of cutting-edge AI research and practical implementation.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Brain, label: 'LLM Applications', color: 'blue' },
                    { icon: Code2, label: 'RAG Systems', color: 'violet' },
                    { icon: Eye, label: 'Computer Vision', color: 'blue' },
                    { icon: Workflow, label: 'Automation', color: 'violet' },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-4 py-2 rounded-lg bg-${item.color}-500/10 border border-${item.color}-500/20 text-${item.color}-400 flex items-center gap-2 backdrop-blur-xl`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Python', logo: '🐍' },
                  { label: 'TensorFlow', logo: '🧠' },
                  { label: 'PyTorch', logo: '🔥' },
                  { label: 'OpenAI', logo: '🤖' },
                  { label: 'LangChain', logo: '⛓️' },
                  { label: 'YOLO', logo: '👁️' },
                  { label: 'OpenCV', logo: '📷' },
                  { label: 'n8n', logo: '⚡' },
                ].map((tech, idx) => (
                  <motion.div
                    key={tech.label}
                    initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.5 + idx * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                    }}
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card backdrop-blur-xl border border-white/10 group cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-violet-500/0 group-hover:from-blue-500/20 group-hover:to-violet-500/20 rounded-2xl transition-all duration-500"
                    />
                    <div className="relative text-5xl mb-3 group-hover:scale-110 transition-transform">{tech.logo}</div>
                    <div className="relative text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                      {tech.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-4 text-center relative inline-block left-1/2 -translate-x-1/2"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground text-center mb-20 max-w-2xl mx-auto"
            >
              Transforming ideas into intelligent solutions that make an impact
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'AI Resume Optimizer',
                  description: 'LLM-powered platform that analyzes resumes and provides intelligent optimization suggestions, improving candidate success rates by 40%.',
                  tags: ['GPT-4', 'LangChain', 'FastAPI', 'React'],
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  title: 'RAG-based AI Assistant',
                  description: 'Production-ready retrieval-augmented generation system for enterprise knowledge management with vector search and semantic understanding.',
                  tags: ['RAG', 'Pinecone', 'OpenAI', 'Python'],
                  gradient: 'from-violet-500 to-purple-500',
                },
                {
                  title: 'Computer Vision System',
                  description: 'Real-time object detection and tracking system using YOLO v8 for industrial automation, achieving 95% accuracy.',
                  tags: ['YOLO', 'OpenCV', 'PyTorch', 'Docker'],
                  gradient: 'from-blue-500 to-violet-500',
                },
                {
                  title: 'Workflow Automation Platform',
                  description: 'Intelligent automation orchestration using n8n with AI-powered decision making and multi-channel integration.',
                  tags: ['n8n', 'Node.js', 'PostgreSQL', 'Redis'],
                  gradient: 'from-cyan-500 to-blue-500',
                },
                {
                  title: 'Document Intelligence Engine',
                  description: 'Multi-modal AI system for extracting, analyzing, and structuring information from complex documents using vision and NLP.',
                  tags: ['GPT-4V', 'OCR', 'NLP', 'FastAPI'],
                  gradient: 'from-purple-500 to-pink-500',
                },
                {
                  title: 'Predictive Analytics Dashboard',
                  description: 'ML-powered analytics platform with real-time predictions and interactive visualizations for business intelligence.',
                  tags: ['scikit-learn', 'Streamlit', 'Pandas', 'SQL'],
                  gradient: 'from-violet-500 to-blue-500',
                },
              ].map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  whileHover={{
                    y: -10,
                    rotateX: 5,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative rounded-3xl bg-gradient-to-br from-card/80 to-card backdrop-blur-xl border border-white/10 overflow-hidden cursor-pointer"
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                >
                  {/* Gradient Overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}
                  />

                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute -inset-px bg-gradient-to-r ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
                  />

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, transparent 40%, rgba(59, 130, 246, 0.5) 50%, transparent 60%)`,
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />

                  <div className="relative p-8 z-10">
                    <motion.div
                      className={`h-1.5 w-20 bg-gradient-to-r ${project.gradient} rounded-full mb-6`}
                      initial={{ width: 0 }}
                      whileInView={{ width: 80 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.3 }}
                    />

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-200 group-hover:to-violet-200 transition-all">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, tagIdx) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.15 + tagIdx * 0.05 + 0.5 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:border-white/30 transition-all"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        <Github size={16} />
                        GitHub
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-500/5 to-background" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-4 text-center relative inline-block left-1/2 -translate-x-1/2"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent">
                Experience
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-20"
            />

            <div className="max-w-4xl mx-auto space-y-12">
              {[
                {
                  role: 'Senior AI Engineer',
                  company: 'Tech Innovation Labs',
                  period: '2023 - Present',
                  achievements: [
                    'Led development of enterprise RAG system serving 10k+ users, reducing query response time by 60%',
                    'Architected LLM-powered automation platform, saving 500+ engineering hours monthly',
                    'Mentored team of 5 engineers on ML best practices and production deployment strategies',
                  ],
                },
                {
                  role: 'AI/ML Engineer',
                  company: 'AI Solutions Inc',
                  period: '2021 - 2023',
                  achievements: [
                    'Built computer vision system for quality control, improving defect detection accuracy to 95%',
                    'Deployed production ML models using Docker and Kubernetes, handling 1M+ requests daily',
                    'Developed custom NLP pipelines for document processing, reducing manual work by 70%',
                  ],
                },
                {
                  role: 'Machine Learning Engineer',
                  company: 'DataTech Corp',
                  period: '2019 - 2021',
                  achievements: [
                    'Created predictive analytics models that increased customer retention by 25%',
                    'Implemented automated data pipelines processing 5TB+ of data daily',
                    'Collaborated with product teams to integrate ML features into core platform',
                  ],
                },
              ].map((exp, idx) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative pl-12"
                >
                  {/* Animated Timeline Line */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 + 0.3, duration: 0.8 }}
                    className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-violet-500"
                  />

                  {/* Animated Dot */}
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    whileInView={{ scale: 1, rotate: 360 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: idx * 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="absolute -left-[11px] top-6 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 ring-4 ring-background shadow-lg shadow-blue-500/50"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-violet-400"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                    className="relative bg-gradient-to-br from-card/80 to-card backdrop-blur-xl rounded-2xl p-8 border border-white/10 group cursor-pointer overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <motion.div
                      className="absolute -inset-px bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                    />

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />

                    <div className="relative">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div>
                          <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 + 0.2 }}
                            className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-blue-200 bg-clip-text text-transparent"
                          >
                            {exp.role}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 + 0.3 }}
                            className="text-lg bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent font-semibold"
                          >
                            {exp.company}
                          </motion.p>
                        </div>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.2 + 0.4 }}
                          className="mt-2 md:mt-0 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium backdrop-blur-xl"
                        >
                          {exp.period}
                        </motion.span>
                      </div>

                      <ul className="space-y-4">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 + 0.5 + i * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="text-muted-foreground flex items-start gap-3 group/item"
                          >
                            <motion.span
                              className="text-blue-400 mt-1 text-xl"
                              whileHover={{ scale: 1.3, rotate: 90 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              ▹
                            </motion.span>
                            <span className="group-hover/item:text-foreground transition-colors leading-relaxed">
                              {achievement}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-4 text-center relative inline-block left-1/2 -translate-x-1/2"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-20"
            />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  category: 'AI/ML',
                  skills: [
                    'Large Language Models (GPT, Claude, Llama)',
                    'RAG & Vector Databases',
                    'Computer Vision (YOLO, OpenCV)',
                    'NLP & Transformers',
                    'TensorFlow & PyTorch',
                    'scikit-learn & XGBoost',
                    'Model Optimization & Deployment',
                  ],
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  category: 'Backend & Infrastructure',
                  skills: [
                    'Python (FastAPI, Django)',
                    'Node.js & TypeScript',
                    'PostgreSQL & MongoDB',
                    'Redis & Elasticsearch',
                    'Docker & Kubernetes',
                    'AWS & GCP',
                    'CI/CD Pipelines',
                  ],
                  gradient: 'from-violet-500 to-purple-500',
                },
                {
                  category: 'Tools & Frameworks',
                  skills: [
                    'LangChain & LlamaIndex',
                    'Pinecone & Weaviate',
                    'n8n & Zapier',
                    'Streamlit & Gradio',
                    'Git & GitHub Actions',
                    'Jupyter & MLflow',
                    'Postman & Swagger',
                  ],
                  gradient: 'from-cyan-500 to-blue-500',
                },
              ].map((category, idx) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="relative rounded-3xl bg-gradient-to-br from-card/80 to-card backdrop-blur-xl border border-white/10 overflow-hidden group cursor-pointer"
                >
                  {/* Animated Top Border */}
                  <motion.div
                    className={`h-1.5 bg-gradient-to-r ${category.gradient}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 + 0.3, duration: 0.6 }}
                  />

                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute -inset-px bg-gradient-to-r ${category.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
                  />

                  {/* Animated Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
                      backgroundSize: '40px 40px',
                    }}
                    animate={{
                      backgroundPosition: ['0px 0px', '40px 40px'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  <div className="relative p-8">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 + 0.4 }}
                      className={`text-3xl font-bold mb-8 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                    >
                      {category.category}
                    </motion.h3>

                    <div className="space-y-4">
                      {category.skills.map((skill, skillIdx) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.2 + 0.5 + skillIdx * 0.05 }}
                          whileHover={{ x: 10, scale: 1.02 }}
                          className="flex items-center gap-3 group/skill"
                        >
                          <motion.div
                            className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${category.gradient}`}
                            whileHover={{ scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                          <span className="text-muted-foreground group-hover/skill:text-foreground transition-colors text-sm leading-relaxed">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${category.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-500/10 to-background" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6 relative inline-block"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent">
                Let's Build Something Amazing
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-3xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-16 leading-relaxed"
            >
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <motion.a
                href="mailto:sherwin.casem@example.com"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center justify-center gap-3 font-semibold text-lg">
                  <Mail size={24} />
                  Email Me
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex gap-6 justify-center"
            >
              {[
                { Icon: Github, href: 'https://github.com/sherwincasem', label: 'GitHub' },
                { Icon: Linkedin, href: 'https://linkedin.com/in/sherwincasem', label: 'LinkedIn' },
              ].map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + idx * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card backdrop-blur-xl border border-white/10 group overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <social.Icon className="relative group-hover:scale-110 transition-transform" size={28} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-sm"
            >
              © 2026 Sherwin Casem. All rights reserved.
            </motion.p>

            <div className="flex gap-8">
              {[
                { label: 'GitHub', href: 'https://github.com/sherwincasem' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/sherwincasem' },
                { label: 'Email', href: 'mailto:sherwin.casem@example.com' },
              ].map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -2, color: '#60a5fa' }}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm relative group"
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}