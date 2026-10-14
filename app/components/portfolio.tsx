"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, BrainCircuit, CircuitBoard, Code2, Cpu,
  Download, GitBranch as Github, GraduationCap, Link2 as Linkedin, Mail, Menu, Network, Radar,
  Satellite, X, type LucideIcon,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Missions", href: "#missions" },
  { label: "Systems", href: "#systems" },
  { label: "Contact", href: "#contact" },
];

const experienceEntries = [
  {
    index: "01", period: "Oct 2025 - Present", role: "Undergraduate Research Assistant",
    organization: "Cal State LA · Dr. Manveen Kaur's Lab",
    highlights: [
      "Developing real-time UAV perception pipelines with Python, OpenCV, and YOLO; curated 5,000+ labeled images in Roboflow.",
      "Evaluating latency, sensor noise, edge-compute limits, and simulation-to-real deployment constraints.",
    ],
    tags: ["Computer Vision", "UAV", "Edge AI"],
  },
  {
    index: "02", period: "Aug 2026 - Present", role: "Software Engineering Intern & Project Leader",
    organization: "LA Tech Rising Technical Internship",
    highlights: [
      "Leading technical planning, development tasks, milestones, and team collaboration for an industry-focused application.",
      "Contributing to software design, implementation, testing, and debugging in an industry-mentored project.",
    ],
    tags: ["Leadership", "Software", "Testing"],
  },
  {
    index: "03", period: "Aug 2026 - Present", role: "JPL-Sponsored DTN Senior Design",
    organization: "Cal State LA · JPL & Caltech Mentors",
    highlights: [
      "Collaborating with JPL and Caltech technical mentors on resilient terrestrial communications.",
      "Implementing and evaluating DTN algorithms for Internet2 integration across disrupted and intermittent networks.",
    ],
    tags: ["DTN", "Networking", "Internet2"],
  },
  {
    index: "04", period: "Jun 2026 - Aug 2026", role: "AI, Robotics & Engineering Instructor",
    organization: "iD Tech at Caltech",
    highlights: [
      "Taught weekly cohorts of approximately 10 students through hands-on VEX, C++, AI/ML, and engineering builds.",
      "Built and troubleshot motors, sensors, controllers, and mechanical systems; led an all-girls BattleBots course.",
    ],
    tags: ["VEX", "C++", "Hardware"],
  },
];

const missionEntries = [
  {
    code: "CV-UAV", title: "Autonomous UAV Perception", type: "Perception + Navigation",
    summary: "Trained YOLO models on 5,000+ labeled images, deployed real-time detection to a Raspberry Pi 5, and integrated perception with navigation logic across a 4-person vision team and 8-person autonomy team.",
    tools: "Python · OpenCV · YOLO · Roboflow", icon: Radar,
  },
  {
    code: "NET-DTN", title: "JPL Delay Tolerant Networking", type: "Resilient Communications",
    summary: "Implementing and evaluating Delay Tolerant Networking algorithms with JPL and Caltech mentors for Internet2 integration across disrupted and intermittent terrestrial links.",
    tools: "DTN · Internet2 · Networking", icon: Satellite,
  },
  {
    code: "RLA-01", title: "Roo Labs", type: "Project details pending",
    summary: "Project summary and technical contributions will be added when the project information is available.",
    tools: "Details to be added", icon: CircuitBoard, placeholder: true,
  },
  {
    code: "VEX-BB", title: "VEX BattleBots", type: "Robotics Instruction",
    summary: "Built, tested, troubleshot, and disassembled VEX robots while teaching motors, sensors, controllers, C++, and iterative engineering design.",
    tools: "VEX · C++ · Sensors · Prototyping", icon: Cpu,
  },
  {
    code: "AI-PRD", title: "PRD Autopilot", type: "World Product Day Hackathon",
    summary: "Built on a three-person team to generate PRDs, validation reports, engineering tickets, and pitch decks; implemented authentication workflows and end-to-end QA.",
    tools: "Authentication · QA · AI Product", icon: BrainCircuit,
  },
];

const systems = [
  { id: "software", label: "Software", code: "SYS-01", icon: Code2, skills: ["Python", "C++", "C", "Java", "JavaScript", "SQL", "Bash"], detail: "Application logic, testing, debugging, and tooling across system layers." },
  { id: "embedded", label: "Embedded", code: "SYS-02", icon: Cpu, skills: ["Arduino", "ESP32", "Raspberry Pi", "RTOS", "ROS / ROS2"], detail: "Compute and control at the edge, shaped by real hardware constraints." },
  { id: "ai", label: "AI / Vision", code: "SYS-03", icon: BrainCircuit, skills: ["OpenCV", "PyTorch", "YOLO", "Roboflow"], detail: "Perception pipelines for sensing, detection, and autonomous behavior." },
  { id: "hardware", label: "Hardware", code: "SYS-04", icon: CircuitBoard, skills: ["KiCad", "PCB Design", "Breadboarding", "Sensors", "Circuits"], detail: "Prototyping and physical integration from sensor to signal path." },
  { id: "systems", label: "Systems", code: "SYS-05", icon: Network, skills: ["Linux", "Docker", "Git", "Wireshark", "Networking"], detail: "Reliable interfaces between software, networks, hardware, and operators." },
];

const proofPoints = [
  { value: "5,000+", label: "Images curated for UAV vision" },
  { value: "RPI 5", label: "Real-time edge deployment" },
  { value: "DTN", label: "Resilient network research" },
  { value: "ROS / RTOS", label: "Embedded systems toolkit" },
];

function SectionHeading({ code, title, description }: { code: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <div className="section-heading__index"><span>{code}</span><span className="section-heading__line" /></div>
      <div className="section-heading__copy"><h2>{title}</h2>{description ? <p>{description}</p> : null}</div>
    </div>
  );
}

function ActionLink({ href, label, icon: Icon, primary = false, download = false }: { href: string; label: string; icon: LucideIcon; primary?: boolean; download?: boolean }) {
  const isExternal = href.startsWith("http");
  return (
    <a href={href} className={`action-link ${primary ? "action-link--primary" : ""}`} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} download={download || undefined}>
      <Icon aria-hidden="true" size={16} strokeWidth={1.8} /><span>{label}</span><ArrowUpRight aria-hidden="true" className="action-link__arrow" size={14} />
    </a>
  );
}

function Wordmark() {
  return <span className="wordmark"><span className="wordmark__mark" aria-hidden="true">EA</span><span className="wordmark__name">Esmeralda Amado</span></span>;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#top" aria-label="Esmeralda Amado, back to top"><Wordmark /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item, index) => <a key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</a>)}
        </nav>
        <div className="site-header__status" aria-label="Current status"><span className="status-light" aria-hidden="true" />Open to opportunities</div>
        <button className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item, index) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</a>)}</nav> : null}
    </header>
  );
}

function OrbitInstrument() {
  return (
    <div className="orbit-instrument" aria-label="Decorative orbital systems diagram">
      <div className="orbit-instrument__sweep" aria-hidden="true" />
      <div className="orbit-instrument__label">ORBITAL REFERENCE / 34.05°N</div>
      <div className="orbit orbit--outer" /><div className="orbit orbit--middle" /><div className="orbit orbit--inner" />
      <div className="orbit-instrument__axis orbit-instrument__axis--x" /><div className="orbit-instrument__axis orbit-instrument__axis--y" />
      <div className="orbit-instrument__core"><Satellite aria-hidden="true" size={24} strokeWidth={1.4} /></div>
      <span className="orbit-instrument__node orbit-instrument__node--one" /><span className="orbit-instrument__node orbit-instrument__node--two" /><span className="orbit-instrument__node orbit-instrument__node--three" />
      <div className="orbit-instrument__readout"><span>LINK</span><strong>NOMINAL</strong></div>
      <div className="orbit-instrument__caption"><span>GROUND SEGMENT</span><span>LOS / 072.4°</span></div>
    </div>
  );
}

function MissionCard({ mission }: { mission: (typeof missionEntries)[number] }) {
  const Icon = mission.icon;
  return (
    <article className={`mission-card ${mission.placeholder ? "mission-card--placeholder" : ""}`}>
      <div className="mission-card__topline"><span>{mission.code}</span><Icon aria-hidden="true" size={20} strokeWidth={1.5} /></div>
      <div className="mission-card__body"><p className="mission-card__type">{mission.type}</p><h3>{mission.title}</h3><p>{mission.summary}</p></div>
      <div className="mission-card__footer"><span>{mission.tools}</span><ArrowDownRight aria-hidden="true" size={17} /></div>
    </article>
  );
}

function SystemsBoard() {
  const [activeId, setActiveId] = useState("ai");
  const active = systems.find((system) => system.id === activeId) ?? systems[0];
  const ActiveIcon = active.icon;
  return (
    <div className="systems-board">
      <div className="systems-board__topbar"><span>EA-SYS / REV.01</span><span>SELECT A NODE TO INSPECT</span></div>
      <div className="systems-board__layout">
        <div className="pcb-map" aria-label="Interactive technical systems map">
          <svg className="pcb-map__traces" viewBox="0 0 700 420" aria-hidden="true"><path d="M350 210 H190 V95 H92" /><path d="M350 210 H510 V95 H608" /><path d="M350 210 H145 V326 H70" /><path d="M350 210 H555 V326 H630" /><circle cx="350" cy="210" r="78" /><circle cx="190" cy="95" r="4" /><circle cx="510" cy="95" r="4" /><circle cx="145" cy="326" r="4" /><circle cx="555" cy="326" r="4" /></svg>
          {systems.map((system, index) => {
            const Icon = system.icon;
            return <button key={system.id} type="button" className={`system-node system-node--${index + 1} ${activeId === system.id ? "is-active" : ""}`} aria-pressed={activeId === system.id} onClick={() => setActiveId(system.id)}><span className="system-node__code">{system.code}</span><Icon aria-hidden="true" size={20} strokeWidth={1.6} /><span>{system.label}</span></button>;
          })}
        </div>
        <motion.aside key={active.id} className="system-readout" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} aria-live="polite">
          <div className="system-readout__header"><span>{active.code} / ONLINE</span><ActiveIcon aria-hidden="true" size={22} strokeWidth={1.5} /></div>
          <p className="system-readout__eyebrow">Active system</p><h3>{active.label}</h3><p className="system-readout__detail">{active.detail}</p>
          <ul>{active.skills.map((skill) => <li key={skill}><span aria-hidden="true" />{skill}</li>)}</ul>
        </motion.aside>
      </div>
    </div>
  );
}

export function PortfolioPage() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.45, ease: "easeOut" as const } };
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a><SiteHeader />
      <main id="main-content">
        <section id="top" className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero__grid">
            <motion.div className="hero__content" {...reveal}>
              <div className="coordinate-label"><span className="coordinate-label__signal" aria-hidden="true" /><span>MISSION PROFILE / SOFTWARE + PHYSICAL SYSTEMS</span></div>
              <h1 id="hero-title">Esmeralda<span>Amado</span></h1>
              <p className="hero__discipline">Software <i /> Embedded Systems <i /> AI <i /> Autonomous Systems</p>
              <p className="hero__intro">I build computer vision, embedded, and networking systems for autonomous platforms—turning models and protocols into software that works under real hardware constraints.</p>
              <div className="hero__actions">
                <ActionLink href="./Esmeralda_Amado_Resume.pdf" label="Resume" icon={Download} primary download />
                <ActionLink href="https://github.com/amadoesme" label="GitHub" icon={Github} />
                <ActionLink href="https://www.linkedin.com/in/esmeralda-amado" label="LinkedIn" icon={Linkedin} />
              </div>
              <div className="hero__telemetry" aria-label="Education overview">
                <div><span>EDU</span><strong>Cal State LA</strong></div><div><span>MAJOR</span><strong>Computer Science</strong></div><div><span>MINOR</span><strong>Biomedical Engineering</strong></div>
              </div>
            </motion.div>
            <motion.div className="hero__instrument" initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }} animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}><OrbitInstrument /></motion.div>
          </div>
          <div className="hero__footer"><span>LOS ANGELES / CA</span><a href="#about">Scroll to inspect <ArrowDownRight aria-hidden="true" size={15} /></a></div>
        </section>

        <motion.section id="about" className="section-shell content-section" {...reveal}>
          <SectionHeading code="01 / PROFILE" title="Software with a physical consequence." description="From perception models to edge compute and resilient networks, I focus on the interfaces where software meets the physical world." />
          <div className="about-grid">
            <div className="about-grid__statement"><p>I&apos;m a Computer Science senior at Cal State LA with a Biomedical Engineering minor, building across the full path from sensor input to software decision.</p><p>My current work includes real-time UAV perception on Raspberry Pi, resilient Delay Tolerant Networking, robotics instruction, and hardware-aware software testing.</p></div>
            <div className="about-grid__details">
              <div className="profile-row"><GraduationCap aria-hidden="true" /><div><span>Academic track</span><strong>B.S. Computer Science · Expected May 2027</strong></div></div>
              <div className="profile-row"><CircuitBoard aria-hidden="true" /><div><span>Engineering lens</span><strong>Hardware-aware software development</strong></div></div>
              <div className="profile-row"><Radar aria-hidden="true" /><div><span>Current focus</span><strong>Autonomy · perception · resilient systems</strong></div></div>
            </div>
          </div>
          <div className="proof-grid" aria-label="Selected technical proof points">
            {proofPoints.map((point) => <div key={point.value}><strong>{point.value}</strong><span>{point.label}</span></div>)}
          </div>
        </motion.section>

        <motion.section id="experience" className="section-shell content-section" {...reveal}>
          <SectionHeading code="02 / EXPERIENCE" title="Field log" description="Research, engineering, and instruction across software and physical systems." />
          <div className="experience-list">{experienceEntries.map((entry) => <article key={entry.index} className="experience-entry"><span className="experience-entry__index">{entry.index}</span><div className="experience-entry__date">{entry.period}</div><div className="experience-entry__main"><p>{entry.organization}</p><h3>{entry.role}</h3><div className="tag-row">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><ul className="experience-entry__summary">{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>)}</div>
        </motion.section>

        <motion.section id="missions" className="section-shell content-section" {...reveal}>
          <SectionHeading code="03 / SELECTED MISSIONS" title="Built to operate" description="Concrete engineering work across edge AI, autonomous navigation, resilient networking, robotics, and product software." />
          <div className="mission-grid">{missionEntries.map((mission) => <MissionCard key={mission.code} mission={mission} />)}</div>
        </motion.section>

        <motion.section id="systems" className="section-shell content-section" {...reveal}>
          <SectionHeading code="04 / TECHNICAL SYSTEMS" title="Integrated capability map" description="Select a board node to inspect the tools and disciplines behind the system." /><SystemsBoard />
        </motion.section>

        <motion.section id="contact" className="section-shell contact-section" {...reveal}>
          <div className="contact-panel"><div className="contact-panel__signal" aria-hidden="true"><span /><span /><span /></div><div><p className="contact-panel__eyebrow">05 / ESTABLISH CONTACT</p><h2>Let&apos;s build systems that leave the screen.</h2><p>I&apos;m looking for engineering opportunities where I can contribute to embedded software, autonomous platforms, aerospace systems, computer vision, robotics, or hardware-software integration.</p></div><div className="contact-panel__actions"><ActionLink href="mailto:amadoesmeralda6@gmail.com" label="Send an email" icon={Mail} primary /><ActionLink href="https://www.linkedin.com/in/esmeralda-amado" label="LinkedIn" icon={Linkedin} /></div></div>
        </motion.section>
      </main>
      <footer className="site-footer section-shell"><Wordmark /><p>Designed for clarity. Engineered for the physical world.</p><div className="site-footer__meta"><span>PORTFOLIO / REV.01</span><span>LOS ANGELES · 2026</span></div></footer>
    </div>
  );
}
