import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGithub, FiMail, FiLinkedin, FiArrowRight, FiCode,
  FiSmartphone, FiLayout, FiDatabase, FiMenu, FiX, FiArrowUp,
  FiExternalLink, FiDownload, FiAward, FiBookOpen
} from 'react-icons/fi';
import {
  SiPython, SiJavascript, SiHtml5, SiTailwindcss, SiSqlite,
  SiLinux, SiReact, SiFastapi, SiGit
} from 'react-icons/si';
import heroImage from './assets/myimage2.png';

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const navLinks = ['Home', 'About', 'Projects', 'Education', 'Skills', 'Contact'];

const stats = [
  { label: 'Projects Built', value: '5+' },
  { label: 'Skills Learned', value: '10+' },
  { label: 'Years Coding', value: '2+' },
  { label: 'Cups of Coffee', value: '∞' },
];

const aboutPoints = [
  'Passionate developer studying M.Sc. Software Systems at Kongu Engineering College.',
  'Love building clean, modern web apps with React and Python backends.',
  'Enjoy solving real-world problems through technology.',
  'Currently exploring AI/ML tools and full-stack development.',
];

const services = [
  { title: 'Web Development', icon: <FiLayout />, desc: 'Responsive, fast websites & SPAs using React and modern CSS.' },
  { title: 'App Dev', icon: <FiSmartphone />, desc: 'Cross-platform experiences with great UX and clean code.' },
  { title: 'Backend Systems', icon: <FiDatabase />, desc: 'REST APIs with FastAPI or Node.js, connected to SQL/NoSQL databases.' },
  { title: 'Clean Code', icon: <FiCode />, desc: 'Maintainable, well-structured code following best practices.' },
];

const skillGroups = [
  {
    group: 'Frontend',
    color: 'from-blue-500/10 to-indigo-500/10',
    accent: 'text-indigo-600',
    skills: [
      { name: 'HTML5', icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: 'React', icon: <SiReact className="text-[#61DAFB]" /> },
      { name: 'Tailwind', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    ],
  },
  {
    group: 'Backend & Data',
    color: 'from-emerald-500/10 to-teal-500/10',
    accent: 'text-emerald-600',
    skills: [
      { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
      { name: 'FastAPI', icon: <SiFastapi className="text-[#009688]" /> },
      { name: 'SQL', icon: <SiSqlite className="text-[#003B57]" /> },
    ],
  },
  {
    group: 'Tools & OS',
    color: 'from-orange-500/10 to-yellow-500/10',
    accent: 'text-orange-600',
    skills: [
      { name: 'Git', icon: <SiGit className="text-[#F1502F]" /> },
      { name: 'Linux', icon: <SiLinux className="text-[#FCC624]" /> },
    ],
  },
];

const projects = [
  {
    title: 'Helper for Dyslexia',
    desc: 'An AI-powered tool designed to assist dyslexic students with reading and comprehension using NLP.',
    tags: ['React', 'Python', 'Tailwind'],
    gradient: 'from-violet-500/30 to-indigo-500/30',
    icon: '🧠',
    link: '#',
    github: '#',
  },
  {
    title: 'Personal Portfolio',
    desc: 'A high-performance personal website built with Vite, React, Tailwind v4 & Framer Motion.',
    tags: ['React', 'Vite', 'Framer Motion'],
    gradient: 'from-pink-500/30 to-rose-500/30',
    icon: '🌐',
    link: '#',
    github: '#',
  },
  {
    title: 'Task Management System',
    desc: 'A robust backend system for managing complex workflows and team collaboration with real-time updates.',
    tags: ['FastAPI', 'MongoDB', 'React'],
    gradient: 'from-emerald-500/30 to-teal-500/30',
    icon: '📋',
    link: '#',
    github: '#',
  },
];

const education = [
  {
    degree: 'M.Sc. Software Systems',
    school: 'Kongu Engineering College',
    period: '2023 – Present',
    detail: 'Focusing on Computer Science, Data Structures, and Software Engineering with a 4.0 GPA equivalent.',
    color: 'bg-primary',
  },
  {
    degree: 'Higher Secondary Education (12th)',
    school: 'Pem School of Excellence',
    period: '2021 – 2023',
    detail: 'CBSE School — Completed with distinction in Maths, Physics, Chemistry & Computer Science.',
    color: 'bg-secondary',
  },
];

const certifications = [
  { name: 'Python for Everybody', org: 'Coursera / University of Michigan', icon: '🐍' },
  { name: 'Responsive Web Design', org: 'freeCodeCamp', icon: '🎨' },
  { name: 'Introduction to AI', org: 'Google / Kaggle', icon: '🤖' },
];

/* ─── COMPONENT ─────────────────────────────────────────────────────────── */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      const sections = navLinks.map(n => n.toLowerCase());
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="bg-[#fcfcfd] text-slate-800 selection:bg-primary/20 min-h-screen font-sans">

      {/* ── NAVBAR ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold gradient-text"
          >
            Dharanidharan
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`transition-colors ${activeSection === link.toLowerCase() ? 'text-primary font-semibold' : 'text-slate-500 hover:text-primary'}`}
              >
                {link}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex px-5 py-2 bg-primary text-white text-sm font-bold rounded-full hover:shadow-[0_6px_20px_rgba(100,80,255,0.35)] transition-all"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map(link => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={closeMenu}
                    className="text-slate-600 font-medium hover:text-primary transition-colors py-1"
                  >
                    {link}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="mt-2 px-5 py-3 bg-primary text-white text-sm font-bold rounded-xl text-center hover:shadow-lg transition-all"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section id="home" className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Available for opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-slate-900">
              Crafting Digital <br />
              <span className="gradient-text">Experiences</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Hi, I'm <span className="text-primary font-semibold">Dharanidharan</span> — a developer &amp; student at{' '}
              <a href="https://www.kongu.edu/" target="_blank" rel="noreferrer" className="font-bold underline decoration-primary/30 hover:decoration-primary transition-all">
                Kongu Engineering College
              </a>
              , passionate about building clean, efficient applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:shadow-[0_8px_25px_rgba(100,80,255,0.3)] transition-all">
                Hire Me
              </a>
              <a href="#projects" className="px-8 py-3 bg-slate-100 text-slate-700 rounded-full font-bold hover:bg-slate-200 transition-all flex items-center gap-2 group">
                View Work <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/resume.pdf" download className="px-8 py-3 border-2 border-slate-200 text-slate-600 rounded-full font-bold hover:border-primary hover:text-primary transition-all flex items-center gap-2">
                <FiDownload /> Resume
              </a>
            </div>

            {/* Stats bar */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative lg:block hidden px-4"
          >
            <div className="w-[500px] h-[500px] bg-primary/15 rounded-full blur-[130px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden glass shadow-2xl border border-white/50 bg-white/20 hover:scale-[1.02] transition-transform duration-500">
              <img src={heroImage} alt="Dharanidharan" className="w-full h-auto object-cover max-h-[560px]" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 bg-white px-5 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <span className="text-2xl">💻</span>
              <div>
                <div className="text-xs text-slate-400 font-medium">Currently working on</div>
                <div className="text-sm text-slate-700 font-bold">Portfolio v2</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 px-6 bg-slate-50/60">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Me</span>
            <h2 className="section-title mt-2">Who I <span className="gradient-text">Am</span></h2>
            <div className="space-y-4 mt-6">
              {aboutPoints.map((pt, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mt-0.5 flex-shrink-0">✓</span>
                  <p className="text-slate-600 leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="p-3 bg-white rounded-xl text-slate-400 hover:text-primary hover:shadow-lg transition-all border border-slate-100">
                <FiGithub size={22} />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="p-3 bg-white rounded-xl text-slate-400 hover:text-primary hover:shadow-lg transition-all border border-slate-100">
                <FiLinkedin size={22} />
              </a>
              <a href="mailto:dharani94873@gmail.com" className="p-3 bg-white rounded-xl text-slate-400 hover:text-primary hover:shadow-lg transition-all border border-slate-100">
                <FiMail size={22} />
              </a>
            </div>
          </motion.div>

          {/* What I Do cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="text-3xl text-primary mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-slate-800">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────── */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">My Work</span>
            <h2 className="section-title mt-2">Featured <span className="gradient-text">Projects</span></h2>
            <p className="section-subtitle">A selection of things I've built recently.</p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col"
              >
                {/* Thumbnail */}
                <div className={`h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-7xl opacity-60 group-hover:scale-110 transition-transform duration-500">{project.icon}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded-full uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{project.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{project.desc}</p>
                  <div className="flex gap-4">
                    <a href={project.link} className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm">
                      Live Demo <FiExternalLink />
                    </a>
                    <a href={project.github} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-all text-sm">
                      <FiGithub /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ─────────────────────────────────────────────────── */}
      <section id="education" className="py-20 px-6 bg-slate-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Background</span>
            <h2 className="section-title mt-2">Education & <span className="gradient-text">Experience</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education Timeline */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <FiBookOpen className="text-primary text-2xl" />
                <h3 className="text-2xl font-bold text-slate-900">Education</h3>
              </div>
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-8 border-l-2 border-primary/20"
                  >
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 ${edu.color} rounded-full ring-4 ring-white`} />
                    <span className="text-xs font-bold text-primary/70 uppercase tracking-wide">{edu.period}</span>
                    <h4 className="text-lg font-bold text-slate-800 mt-1">{edu.degree}</h4>
                    <p className="text-primary font-semibold text-sm mb-2">{edu.school}</p>
                    <p className="text-slate-500 text-sm">{edu.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <FiAward className="text-secondary text-2xl" />
                <h3 className="text-2xl font-bold text-slate-900">Certifications</h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {cert.icon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{cert.name}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{cert.org}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Experience card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/10"
              >
                <div className="text-3xl mb-3">🚀</div>
                <h4 className="text-lg font-bold text-slate-800">Student Developer</h4>
                <p className="text-primary font-semibold text-sm mb-2">Open Source · 2024 – Present</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Building AI tools, contributing to open-source projects, and freelancing web development projects for small businesses.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────── */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Tech Stack</span>
            <h2 className="section-title mt-2">My <span className="gradient-text">Toolkit</span></h2>
            <p className="section-subtitle">Technologies I work with every day.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.15 }}
                className={`bg-gradient-to-br ${group.color} p-7 rounded-2xl border border-slate-100 bg-white shadow-sm`}
              >
                <h3 className={`text-lg font-bold mb-6 ${group.accent}`}>{group.group}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={si}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-xl p-4 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-default group"
                    >
                      <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300">{skill.icon}</div>
                      <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-6 bg-slate-50/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            <h2 className="section-title mt-2">Let's <span className="gradient-text">Connect</span></h2>
            <p className="section-subtitle">Have a project in mind or just want to say hi? Feel free to reach out!</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="glass p-10 rounded-3xl border border-slate-100 shadow-lg space-y-6 flex flex-col justify-center">
              <a href="mailto:dharani94873@gmail.com" className="flex items-center gap-4 text-slate-600 hover:text-primary transition-colors group">
                <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <FiMail className="text-2xl" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</div>
                  <span className="font-semibold">dharani94873@gmail.com</span>
                </div>
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-600 hover:text-primary transition-colors group">
                <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <FiGithub className="text-2xl" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">GitHub</div>
                  <span className="font-semibold">github.com/dharanidharan</span>
                </div>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-600 hover:text-primary transition-colors group">
                <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <FiLinkedin className="text-2xl" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">LinkedIn</div>
                  <span className="font-semibold">linkedin.com/in/dharanidharan</span>
                </div>
              </a>
            </div>

            {/* Contact form */}
            <form
              ref={formRef}
              className="glass p-10 rounded-3xl border border-slate-100 shadow-lg space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!formRef.current) return;
                setFormStatus('sending');
                try {
                  await emailjs.sendForm(
                    'service_tsff6b3',
                    'template_tj8fe0q',
                    formRef.current,
                    'DKnHtwizuTzTDww1L'
                  );
                  setFormStatus('success');
                  formRef.current.reset();
                  setTimeout(() => setFormStatus('idle'), 4000);
                } catch {
                  setFormStatus('error');
                  setTimeout(() => setFormStatus('idle'), 4000);
                }
              }}
            >
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  placeholder="How can I help you?"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  formStatus === 'success'
                    ? 'bg-emerald-500 text-white'
                    : formStatus === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-primary text-white hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {formStatus === 'sending' && '⏳ Sending...'}
                {formStatus === 'success' && '✅ Message Sent!'}
                {formStatus === 'error' && '❌ Failed — Try Again'}
                {formStatus === 'idle' && 'Send Message 🚀'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="py-16 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 items-center text-center md:text-left">
          <div>
            <div className="text-2xl font-bold gradient-text mb-3">Dharanidharan</div>
            <p className="text-slate-400 text-sm max-w-xs">Building the future of the web, one component at a time.</p>
          </div>
          <div className="flex justify-center gap-6 text-sm font-medium text-slate-500">
            {['About', 'Projects', 'Skills', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-primary transition-colors">{link}</a>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-3">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-white hover:shadow-md transition-all border border-slate-100">
                <FiGithub />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-white hover:shadow-md transition-all border border-slate-100">
                <FiLinkedin />
              </a>
              <a href="mailto:dharani94873@gmail.com" className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-white hover:shadow-md transition-all border border-slate-100">
                <FiMail />
              </a>
            </div>
            <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Dharanidharan. Built with React &amp; Vite.</p>
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center"
            aria-label="Back to top"
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
