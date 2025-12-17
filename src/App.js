import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Code, Database, Server, Briefcase, GraduationCap, Award, ChevronDown, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = {
    frontend: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap'],
    backend: ['Node.js', 'Express.js', 'RESTful APIs'],
    databases: ['PostgreSQL', 'MongoDB', 'MySQL'],
    tools: ['Git', 'GitHub', 'Postman', 'Docker', 'JWT Authentication']
  };

  const projects = [
    {
      title: 'User Management System',
      tech: 'React, Node.js, Express.js, PostgreSQL, JWT',
      description: 'Full-stack platform with JWT authentication, role-based access control, and admin dashboard with image upload functionality.',
      highlights: ['Complete CRUD operations', 'Secure password hashing', 'ElephantSQL Cloud integration', 'Real-time data sync'],
      link: 'https://github.com/SK8100/Signup-Login-Admin-Panel'
    },
    {
      title: 'MERN Stack TODO Application',
      tech: 'MongoDB, Express.js, React.js, Node.js, Bootstrap',
      description: 'Responsive task management app with real-time operations and persistent storage.',
      highlights: ['RESTful API architecture', 'React hooks implementation', 'Cross-browser compatibility', 'Comprehensive API testing'],
      link: 'https://github.com/SK8100/MERN-STACK-ToDo'
    },
    {
      title: 'Interactive Webpage',
      tech: 'HTML5, CSS3, JavaScript',
      description: 'Modern landing page with mobile-first design and optimized performance.',
      highlights: ['Responsive design', 'Vanilla JavaScript', 'Accessibility focused', 'Performance optimized'],
      link: 'https://github.com/SK8100/Cat-Photo-App'
    }
  ];

  const experience = [
    {
      role: 'Full Stack Developer Intern',
      company: 'Crayon Biz LLP',
      period: 'May 2025 – Present',
      location: 'Remote',
      achievements: [
        'Architected responsive web apps with Next.js and TypeScript using clean code patterns',
        'Optimized backend performance by 30% through efficient API design',
        'Designed PostgreSQL schemas with indexing strategies for improved data retrieval',
        'Reduced technical debt through legacy code refactoring and comprehensive documentation',
        'Collaborated in Agile sprints maintaining CI/CD pipelines'
      ]
    },
    {
      role: 'TULIP Intern',
      company: 'Tirupur Corporation',
      period: 'Nov 2021 – Nov 2022',
      location: 'Tirupur, India',
      achievements: [
        'Participated in central government scheme focusing on urban development and municipal operations'
      ]
    }
  ];

  const certifications = [
    'Deloitte Australia Technology Job Simulation – Forage (Jan 2025)',
    'Oracle Cloud Infrastructure (OCI) Certification (Jul 2023)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/70 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ST
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className="hover:text-cyan-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-purple-500/20 rounded"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Sivaramakrishnan T
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-300 mb-4">Full Stack Developer</p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Building scalable web applications with modern JavaScript technologies. 
              Specializing in React.js, Next.js, Node.js, and TypeScript.
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a href="tel:+917550300762" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91 7550300762</span>
              </a>
              <a href="mailto:shivaneuva@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>shivaneuva@gmail.com</span>
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Ariyalur, India</span>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <a href="www.linkedin.com/in/shivask08" className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/SK8100" className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-110 transition-transform">
                <Github className="w-6 h-6" />
              </a>
              <a href="mailto:shivaneuva@gmail.com" className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          
          <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Frontend', icon: Code, skills: skills.frontend, gradient: 'from-cyan-500  to-blue-500' },
              { title: 'Backend', icon: Server, skills: skills.backend, gradient: 'from-purple-500 to-pink-500' },
              { title: 'Databases', icon: Database, skills: skills.databases, gradient: 'from-green-500 to-teal-500' },
              { title: 'Tools', icon: Briefcase, skills: skills.tools, gradient: 'from-orange-500 to-red-500' }
            ].map((category, idx) => (
              <div
                key={idx}
                className="group bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className={`inline-block p-3 text-center bg-gradient-to-r ${category.gradient} rounded-lg mb-4`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <div className="space-y-2">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Professional Journey
          </h2>
          
          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                    <p className="text-xl text-purple-300">{exp.company}</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0 text-right">
                    <p>{exp.period}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-cyan-400">{project.title}</h3>
                  <a href={project.link} className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-sm text-purple-300 mb-3">{project.tech}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Education
                </h2>
              </div>
              <h3 className="text-xl font-bold text-purple-300 mb-2">Bachelor of Engineering</h3>
              <p className="text-lg text-gray-300 mb-1">Civil Engineering</p>
              <p className="text-gray-400 mb-2">Anna University, Tiruchirappalli</p>
              <p className="text-gray-400 mb-2">Sept 2017 – May 2021</p>
              <p className="text-cyan-400 font-semibold">GPA: 7.25/10</p>
            </div>

            {/* Certifications */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Certifications
                </h2>
              </div>
              <ul className="space-y-4">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Sivaramakrishnan T
          </p>
      
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;