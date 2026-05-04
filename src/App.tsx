import React, { useEffect, useRef, useState } from 'react';

const terminalLinesData = [
  { text: '<span class="t-prompt">sami@lab</span><span class="t-path"> ~/network</span><span class="t-cmd"> $</span> whoami', delay: 0 },
  { text: '<span class="t-string">Abdul Sami</span> <span class="t-comment">// Network Engineer</span>', delay: 400 },
  { text: '', delay: 700 },
  { text: '<span class="t-prompt">sami@lab</span><span class="t-path"> ~/network</span><span class="t-cmd"> $</span> cat profile.json', delay: 900 },
  { text: '{', delay: 1300 },
  { text: '  <span class="t-key">"role"</span>: <span class="t-string">"Network Engineer"</span>,', delay: 1500 },
  { text: '  <span class="t-key">"university"</span>: <span class="t-string">"MAJU Karachi"</span>,', delay: 1700 },
  { text: '  <span class="t-key">"graduation"</span>: <span class="t-val">2027</span>,', delay: 1900 },
  { text: '  <span class="t-key">"certifications"</span>: [', delay: 2100 },
  { text: '    <span class="t-string">"Cisco CCST"</span>, <span class="t-string">"Google"</span>, <span class="t-string">"IBM"</span>', delay: 2300 },
  { text: '  ],', delay: 2500 },
  { text: '  <span class="t-key">"routing"</span>: [<span class="t-string">"OSPF"</span>, <span class="t-string">"RIPv2"</span>],', delay: 2700 },
  { text: '  <span class="t-key">"available"</span>: <span class="t-val">true</span>', delay: 2900 },
  { text: '}', delay: 3100 },
  { text: '', delay: 3300 },
  { text: '<span class="t-prompt">sami@lab</span><span class="t-path"> ~/network</span><span class="t-cmd"> $</span> <span class="cursor"></span>', delay: 3500 },
];

export default function App() {
  const [isLight, setIsLight] = useState(true);
  const [termLines, setTermLines] = useState<string[]>([]);
  const termBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsLight(false);
      document.documentElement.classList.remove('light');
    } else {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }

    // Terminal typing logic
    const timeouts: NodeJS.Timeout[] = [];
    terminalLinesData.forEach(({ text, delay }) => {
      const t = setTimeout(() => {
        setTermLines((prev) => [...prev, text]);
      }, delay);
      timeouts.push(t);
    });

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), 0);
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      const siblings = Array.from(el.parentElement?.children || []).filter((c) =>
        c.classList.contains('reveal')
      );
      const idx = siblings.indexOf(el);
      (el as HTMLElement).style.transitionDelay = `${idx * 80}ms`;
      observer.observe(el);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [termLines]);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const navH = document.querySelector('nav.app-nav')?.clientHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="circuit-trace ct-1"></div>
      <div className="circuit-trace ct-2"></div>
      <div className="circuit-trace ct-3"></div>

      <nav className="app-nav">
        <div className="nav-logo">
          Abdul Sami
          <span>v2027</span>
        </div>
        <ul className="nav-links">
          <li><a href="#skills" data-num="01" onClick={(e) => handleSmoothScroll(e, '#skills')}>Skills</a></li>
          <li><a href="#projects" data-num="02" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a></li>
          <li><a href="#certs" data-num="03" onClick={(e) => handleSmoothScroll(e, '#certs')}>Certifications</a></li>
          <li><a href="#education" data-num="04" onClick={(e) => handleSmoothScroll(e, '#education')}>Education</a></li>
          <li><a href="#contact" data-num="05" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a></li>
        </ul>
        <button
          className="theme-toggle"
          id="themeToggle"
          title="Toggle theme"
          aria-label="Toggle light/dark theme"
          onClick={toggleTheme}
        >
          {/* Sun icon */}
          <svg className="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          {/* Moon icon */}
          <svg className="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-left">
          <div className="hero-tag">Network Engineer & Infrastructure Specialist</div>
          <h1 className="hero-name">
            Abdul
            <span className="last">Sami.</span>
          </h1>
          <p className="hero-role">CS Undergraduate · Cisco Certified · Karachi, PK</p>
          <p className="hero-desc">
            Building and securing network infrastructure — from OSPF backbone routing to IoT-connected systems. Certified by Cisco, Google, and IBM with hands-on expertise in Cisco IOS, Packet Tracer, and enterprise topology design.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="app-btn btn-primary" onClick={(e) => handleSmoothScroll(e, '#projects')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              View Projects
            </a>
            <a href="#contact" className="app-btn btn-ghost" onClick={(e) => handleSmoothScroll(e, '#contact')}>Get in Touch</a>
          </div>
        </div>

        <div className="hero-right">
          <div className="terminal">
            <div className="terminal-bar">
              <div className="dot dot-r"></div>
              <div className="dot dot-y"></div>
              <div className="dot dot-g"></div>
              <span className="terminal-title">sami@network-lab ~ bash</span>
            </div>
            <div className="terminal-body" ref={termBodyRef} style={{ overflowY: 'auto' }}>
              {termLines.map((line, idx) => (
                <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">4</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat">
              <div className="stat-num">2</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat">
              <div className="stat-num">3+</div>
              <div className="stat-label">Languages</div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="app-section">
        <div className="section-header reveal">
          <span className="section-num">01</span>
          <h2 className="section-title">Skills</h2>
          <div className="section-line"></div>
        </div>

        <div className="skills-grid">
          <div className="skill-card reveal">
            <div className="skill-category">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="8" rx="1" />
                <rect x="2" y="14" width="20" height="8" rx="1" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              Network Infrastructure
            </div>
            <div className="skill-items">
              <div className="skill-item">Router & Switch Config (Cisco IOS)</div>
              <div className="skill-item">OSPF & RIPv2 Dynamic Routing</div>
              <div className="skill-item">IP Addressing & Subnetting (IPv4/IPv6)</div>
              <div className="skill-item">VLANs, Trunking & DHCP/DNS</div>
              <div className="skill-item">LAN/WAN Administration</div>
              <div className="skill-item">Wireshark & CLI Troubleshooting</div>
            </div>
          </div>

          <div className="skill-card reveal">
            <div className="skill-category">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Programming & Dev
            </div>
            <div className="skill-items">
              <div className="skill-item">C++ & Object-Oriented Programming</div>
              <div className="skill-item">Data Structures & Algorithms</div>
              <div className="skill-item">Git & GitHub Version Control</div>
              <div className="skill-item">Database Management Systems</div>
              <div className="skill-item">Digital Logic Design</div>
            </div>
          </div>

          <div className="skill-card reveal">
            <div className="skill-category">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Security & IoT
            </div>
            <div className="skill-items">
              <div className="skill-item">Network Security Best Practices</div>
              <div className="skill-item">IoT Network Topologies</div>
              <div className="skill-item">RFID & Sensor Integration</div>
              <div className="skill-item">Cybersecurity Fundamentals (IBM)</div>
              <div className="skill-item">Industrial Networking Essentials</div>
            </div>
          </div>

          <div className="skill-card reveal">
            <div className="skill-category">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Hardware & Tools
            </div>
            <div className="skill-items">
              <div className="skill-item">Wireless Access Points (WAP)</div>
              <div className="skill-item">Network Interface Cards (NICs)</div>
              <div className="skill-item">Cabling Standards (Cat5e/6)</div>
              <div className="skill-item">Cisco Packet Tracer</div>
              <div className="skill-item">Microsoft Office & Google Workspace</div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="app-section">
        <div className="section-header reveal">
          <span className="section-num">02</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line"></div>
        </div>

        <div className="projects-grid">
          <div className="project-card reveal" data-index="01">
            <div className="project-tag">IoT · Network Design</div>
            <h3 className="project-title">Smart Parking Plaza System</h3>
            <p className="project-desc">
              Designed and simulated an automated parking architecture using IoT devices and Cisco networking equipment in Packet Tracer. Configured sensors and actuators — barriers and RFID readers — to communicate with a central Registration Server for real-time slot tracking.
            </p>
            <p className="project-desc" style={{ marginBottom: 0 }}>
              Implemented Gateway connectivity to link IoT components with the main network, and troubleshot connectivity issues between end devices and the server for seamless data transmission.
            </p>
            <div className="project-tech" style={{ marginTop: '24px' }}>
              <span className="tech-tag highlight">Cisco Packet Tracer</span>
              <span className="tech-tag highlight">IoT</span>
              <span className="tech-tag">RFID</span>
              <span className="tech-tag">IP Addressing</span>
              <span className="tech-tag">Gateway Config</span>
            </div>
            <div className="project-timeline">Oct 2025 – Dec 2025</div>
          </div>

          <div className="project-card reveal" data-index="02">
            <div className="project-tag">Routing · Enterprise Network</div>
            <h3 className="project-title">Enterprise Routing Implementation</h3>
            <p className="project-desc">
              Simulated a multi-router network topology using Cisco Packet Tracer to establish dynamic connectivity across disparate subnets. Configured OSPF area 0 for high-speed backbone routing between core routers.
            </p>
            <p className="project-desc" style={{ marginBottom: 0 }}>
              Implemented RIPv2 for edge network segments and verified route propagation using <code style={{ color: 'var(--accent)', background: 'var(--surface)', padding: '1px 6px', fontSize: '11px' }}>show ip route</code>. Validated path selection and convergence speed through Ping and Traceroute.
            </p>
            <div className="project-tech" style={{ marginTop: '24px' }}>
              <span className="tech-tag highlight">OSPF</span>
              <span className="tech-tag highlight">RIPv2</span>
              <span className="tech-tag">Cisco IOS</span>
              <span className="tech-tag">Subnetting</span>
              <span className="tech-tag">Traceroute</span>
            </div>
            <div className="project-timeline">Nov 2025 – Dec 2025</div>
          </div>
        </div>
      </section>

      <section id="certs" className="app-section">
        <div className="section-header reveal">
          <span className="section-num">03</span>
          <h2 className="section-title">Certifications</h2>
          <div className="section-line"></div>
        </div>

        <div className="certs-list">
          <div className="cert-card reveal">
            <div className="cert-icon">🔐</div>
            <div>
              <div className="cert-issuer">IBM</div>
              <div className="cert-name">Introduction to Cybersecurity Careers & Roles</div>
            </div>
          </div>

          <div className="cert-card reveal">
            <div className="cert-icon">🏭</div>
            <div>
              <div className="cert-issuer">Cisco</div>
              <div className="cert-name">Industrial Networking Essentials</div>
            </div>
          </div>

          <div className="cert-card reveal">
            <div className="cert-icon">🌐</div>
            <div>
              <div className="cert-issuer">Google</div>
              <div className="cert-name">Connect and Protect: Networks and Network Security</div>
            </div>
          </div>

          <div className="cert-card reveal">
            <div className="cert-icon">🎓</div>
            <div>
              <div className="cert-issuer">Cisco</div>
              <div className="cert-name">Cisco Certified Support Technician (CCST): Network Support and Security</div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="app-section">
        <div className="section-header reveal">
          <span className="section-num">04</span>
          <h2 className="section-title">Education</h2>
          <div className="section-line"></div>
        </div>

        <div className="edu-timeline">
          <div className="edu-item reveal">
            <div className="edu-period">Feb 2023 – Jun 2027 (Expected)</div>
            <div className="edu-degree">B.Sc. Computer Science</div>
            <div className="edu-school">Mohammed Ali Jinnah University, Karachi</div>
          </div>

          <div className="edu-item reveal">
            <div className="edu-period">2020 – 2022</div>
            <div className="edu-degree">Intermediate</div>
            <div className="edu-school">Iqra Public Higher Secondary School, Gambat, Khairpur, Sindh</div>
          </div>

          <div className="edu-item reveal">
            <div className="edu-period">2018 – 2020</div>
            <div className="edu-degree">Matriculation</div>
            <div className="edu-school">Iqra Public Higher Secondary School, Gambat, Khairpur, Sindh</div>
          </div>
        </div>
      </section>

      <section id="contact" className="app-section">
        <div className="contact-inner">
          <div className="reveal">
            <h2 className="contact-big">Let's <span>build</span> something together.</h2>
            <p className="contact-sub">
              Open to internships, networking opportunities, and collaborative projects in network engineering and infrastructure.
            </p>
            <div className="contact-links">
              <a href="mailto:abdulsamichandio123@gmail.com" className="contact-link">
                <span className="cl-label">Email</span>
                <span className="cl-value">abdulsamichandio123@gmail.com</span>
                <span className="cl-arrow">→</span>
              </a>
              <a href="tel:03190293260" className="contact-link">
                <span className="cl-label">Phone</span>
                <span className="cl-value">0319 0293260</span>
                <span className="cl-arrow">→</span>
              </a>
              <a href="https://linkedin.com/in/abdul-sami-915480296" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="cl-label">LinkedIn</span>
                <span className="cl-value">linkedin.com/in/abdul-sami-915480296</span>
                <span className="cl-arrow">→</span>
              </a>
              <a href="#" className="contact-link" onClick={(e) => e.preventDefault()}>
                <span className="cl-label">Location</span>
                <span className="cl-value">Karachi, Pakistan</span>
                <span className="cl-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="reveal">
            <div className="availability">
              <div className="avail-status">
                <div className="avail-dot"></div>
                <span className="avail-text">Available for Opportunities</span>
              </div>
              <div className="avail-title">Open to Work</div>
              <p className="avail-desc">
                Currently seeking internships and entry-level positions in network engineering, IT infrastructure, or cybersecurity. Available for remote or Karachi-based roles.
              </p>
              <a href="mailto:abdulsamichandio123@gmail.com" className="app-btn btn-primary" style={{ display: 'inline-flex' }}>
                Send a Message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '12px' }}>Languages</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text2)' }}>English</span>
                  <span style={{ color: 'var(--border2)' }}>·</span>
                  <span style={{ fontSize: '12px', color: 'var(--text2)' }}>Urdu</span>
                  <span style={{ color: 'var(--border2)' }}>·</span>
                  <span style={{ fontSize: '12px', color: 'var(--text2)' }}>Sindhi <span style={{ color: 'var(--text3)', fontSize: '10px' }}>(Native)</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="app-footer">
        <div className="footer-copy">© 2025 Abdul Sami. All rights reserved.</div>
        <div className="footer-made">Network Engineer · <span>Karachi, Pakistan</span></div>
      </footer>
    </>
  );
}
