import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Menu, Plus, X } from 'lucide-react'
import { projects } from './data/projects'
import OrbCanvas from './components/OrbCanvas'
import heroArtwork from './assets/northstar-hero.jpg'

const img = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`
const MAIN_EMAIL = 'syedraqi1710@gmail.com'
const ease = [0.22, 1, 0.36, 1] as const

function BrandMark() {
  return <span className="brand-mark-3d" aria-hidden="true"><span className="brand-mark-aura" /><svg viewBox="0 0 100 100"><defs><linearGradient id="markFace" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f0f6dd"/><stop offset=".42" stopColor="#b8ca9a"/><stop offset="1" stopColor="#65735a"/></linearGradient><linearGradient id="markSide" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#647252"/><stop offset="1" stopColor="#303a2d"/></linearGradient></defs><path className="mark-shadow" d="M50 5 60 36 92 20 70 47 98 59 65 62 72 96 50 70 28 96 35 62 2 59 30 47 8 20 40 36Z"/><path className="mark-side" d="M50 2 60 33 92 17 70 44 98 56 65 59 72 93 50 67 28 93 35 59 2 56 30 44 8 17 40 33Z"/><path className="mark-face" d="M50 0 60 31 92 15 70 42 98 54 65 57 72 91 50 65 28 91 35 57 2 54 30 42 8 15 40 31Z"/><circle cx="50" cy="48" r="5" className="mark-core"/></svg><span className="mark-orbit orbit-a"/><span className="mark-orbit orbit-b"/></span>
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 48); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  const links = [['Work', '#work'], ['Studio', '#studio'], ['Services', '#services'], ['Contact', '#contact']]
  return <>
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <a href="#home" className="wordmark" aria-label="Northstar home"><BrandMark /><span>NORTHSTAR<small>® &nbsp; INDEPENDENT STUDIO</small></span></a>
      <nav className="nav-links">{links.map(([label, href]) => <a key={label} href={href}>{label}<span /></a>)}</nav>
      <a className="nav-cta" href={`mailto:${MAIN_EMAIL}`}>Let’s talk <ArrowUpRight size={14} /></a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .45, ease }}>
      <span className="eyebrow">MENU / 2026</span>{links.map(([label, href], i) => <motion.a key={label} href={href} onClick={() => setOpen(false)} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * .07 }}>{label}<ArrowUpRight /></motion.a>)}<p>Independent by nature.<br />Connected by design.</p>
    </motion.div>}</AnimatePresence>
  </>
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, 180])
  const scale = useTransform(scrollY, [0, 900], [1.05, 1.19])
  return <section className="hero" id="home">
    <motion.div className="hero-image" style={{ y, scale, backgroundImage: `url(${heroArtwork})` }} />
    <div className="hero-shade" />
    <div className="hero-meta"><span>INDEPENDENT CREATIVE STUDIO</span><span>BHATKAL · INDIA</span></div>
    <div className="hero-content">
      <motion.p className="eyebrow hero-kicker" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .8 }}>A LITTLE FURTHER, A LITTLE DIFFERENT.</motion.p>
      <h1><span className="hero-line"><motion.span initial={{ y: '115%', opacity: 0, rotateX: 18 }} animate={{ y: '0%', opacity: 1, rotateX: 0 }} transition={{ duration: 1.05, delay: .16, ease }}>We make</motion.span></span><span className="hero-line indent"><motion.span initial={{ y: '115%', opacity: 0, rotateX: 18 }} animate={{ y: '0%', opacity: 1, rotateX: 0 }} transition={{ duration: 1.15, delay: .34, ease }}>what’s <i>next.</i></motion.span></span></h1>
      <motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9, duration: .9 }}>
        <p>Independent thinking for a world<br />that never stands still.</p>
        <a className="round-link" href="#work" aria-label="Explore our work"><ArrowDown size={18} /></a>
        <a className="text-link hero-work" href="#work">Explore our work <ArrowDownRight size={15} /></a>
      </motion.div>
    </div>
    <div className="hero-emblem"><div className="hero-emblem-core"><BrandMark /></div><span className="eyebrow">BHATKAL / INDIA</span></div>
    <div className="hero-index"><span>01</span><span className="index-line"/><span>10</span></div>
    <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>© 2026 NORTHSTAR STUDIO</span></div>
  </section>
}

function StudioTicker() {
  const items = ['IMAGINE FURTHER', 'MAKE IT MATTER', 'STAY CURIOUS', 'BUILT TO MOVE']
  return <div className="studio-ticker" aria-label="Imagine further. Make it matter. Stay curious. Built to move."><div className="ticker-track" aria-hidden="true">{[0, 1].map(copy => <div className="ticker-group" key={copy}>{items.map(item => <span key={`${copy}-${item}`}>{item}<i>✳</i></span>)}</div>)}</div></div>
}

function Intro() {
  const words = 'We believe the future belongs to those who imagine it differently.'.split(' ')
  return <section className="intro section-pad" id="studio">
    <Reveal className="intro-aside"><span className="eyebrow">01 / A POINT OF VIEW</span><Asterisk size={18} /></Reveal>
    <div className="intro-copy"><p className="eyebrow intro-label">A CREATIVE PARTNER FOR THE CURIOUS.</p><h2>{words.map((word, i) => <motion.span key={i} initial={{ opacity: .18 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .7 }} transition={{ duration: .45, delay: i * .045 }}>{word} </motion.span>)}</h2>
      <Reveal className="intro-foot"><span>Strategy, design & technology<br />in service of a brighter tomorrow.</span><a className="text-link" href="#studio-more">Get to know us <ArrowUpRight size={15} /></a></Reveal>
    </div>
  </section>
}

function FeaturedWork({ onDiscuss }: { onDiscuss: (projectName: string) => void }) {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<typeof projects[number] | null>(null)
  const categories = ['All', ...projects.map(project => project.category)]
  useEffect(() => {
    if (!selected) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape) }
  }, [selected])
  const visibleProjects = projects.filter(project => filter === 'All' || project.category === filter)
  return <section className="work section-pad" id="work">
    <div className="section-heading"><Reveal><span className="eyebrow">02 / SELECTED WORK</span><h2>Made to<br /><i>move you.</i></h2></Reveal><Reveal delay={.1}><p>Different challenges. Shared ambition.<br />A few things we’re proud to put into the world.</p><span className="eyebrow work-count">{String(visibleProjects.length).padStart(2, '0')} PROJECTS / 04</span></Reveal></div>
    <div className="work-filters" role="group" aria-label="Filter projects">{categories.map(category => <button key={category} className={filter === category ? 'selected' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div>
    <div className="project-grid">{visibleProjects.map((project, i) => <motion.button type="button" onClick={() => setSelected(project)} className={`project ${project.className}`} key={project.number} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.012, rotateX: -1, rotateY: i % 2 ? 1 : -1 }} style={{ transformPerspective: 1100 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .8, delay: i % 2 ? .12 : 0, ease }} aria-label={`View ${project.name} project details`}>
      <div className="project-photo" style={{ backgroundImage: `url(${project.image})` }} /><div className="project-overlay" />
      <span className="project-top"><span>{project.number} / 04</span><span>{project.year}</span></span><span className="project-info"><span><span className="eyebrow">{project.type}</span><span className="project-name">{project.name}</span><span className="project-note">{project.note}</span></span><span className="project-arrow"><ArrowUpRight size={19} /></span></span><span className="view-cursor">VIEW <ArrowUpRight size={12} /></span>
    </motion.button>)}</div>
    <div className="work-end"><span className="eyebrow">GOOD WORK. GOOD PEOPLE.</span><span className="work-line"/><span className="eyebrow">SCROLL TO KEEP EXPLORING ↓</span></div>
    <AnimatePresence>{selected && <motion.div className="project-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null) }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" initial={{ opacity: 0, y: 28, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .98 }} transition={{ duration: .4, ease }}>
        <div className="modal-image" style={{ backgroundImage: `url(${selected.image})` }} /><div className="modal-content"><div className="modal-meta eyebrow"><span>{selected.number} / NORTHSTAR CASE STUDY</span><button onClick={() => setSelected(null)} aria-label="Close project details"><X size={19} /></button></div><p className="eyebrow">{selected.type} · {selected.year}</p><h3 id="project-modal-title">{selected.name}</h3><p className="modal-description">{selected.description}</p><button className="text-link modal-discuss" onClick={() => { const name = selected.name; setSelected(null); onDiscuss(name) }}>Discuss a similar project <ArrowUpRight size={15} /></button></div>
      </motion.article>
    </motion.div>}</AnimatePresence>
  </section>
}

function ContactDialog({ projectName, onClose }: { projectName: string | null; onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [brief, setBrief] = useState('')
  const [draftUrl, setDraftUrl] = useState('')
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape) }
  }, [onClose])
  const prepareDraft = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = projectName ? `A project like ${projectName}` : 'A new project with Northstar'
    const body = `Hi Northstar,\n\n${brief}\n\n${name}\n${email}`
    setDraftUrl(`mailto:${MAIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }
  return <motion.div className="project-modal-backdrop contact-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.section className="contact-panel" role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .98 }} transition={{ duration: .35, ease }}>
      <div className="contact-panel-head"><span className="eyebrow">A GOOD PLACE TO START</span><button onClick={onClose} aria-label="Close contact form"><X size={19} /></button></div>
      <h2 id="contact-title">Let’s make<br /><i>something matter.</i></h2>
      <p className="contact-context">{projectName ? `Inspired by ${projectName}? Tell us a little about what you have in mind.` : 'Tell us a little about what you have in mind.'}</p>
      <form onSubmit={prepareDraft}>
        <label>Your name<input required autoComplete="name" value={name} onChange={event => setName(event.target.value)} placeholder="Jane Smith" /></label>
        <label>Your email<input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="jane@company.com" /></label>
        <label>A little about the project<textarea required rows={3} value={brief} onChange={event => setBrief(event.target.value)} placeholder="What are you hoping to make?" /></label>
        {!draftUrl ? <button className="contact-submit" type="submit">Prepare email draft <ArrowUpRight size={16} /></button> : <div className="draft-ready"><span>Your note is ready.</span><a href={draftUrl} className="contact-submit">Open email draft <ArrowUpRight size={16} /></a><small>If your email app doesn’t open, write to <a href={`mailto:${MAIN_EMAIL}`}>{MAIN_EMAIL}</a>.</small></div>}
      </form>
    </motion.section>
  </motion.div>
}

function Showcase() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [.31, .52], [1.12, 1])
  return <section className="showcase">
    <motion.div className="showcase-photo" style={{ scale, backgroundImage: `url(${img('photo-1511818966892-d7d671e672a2', 2400)})` }} />
    <div className="showcase-overlay" /><div className="showcase-top"><span className="eyebrow">A DIFFERENT KIND OF PERSPECTIVE</span><span className="eyebrow">BHATKAL · INDIA</span></div>
    <div className="showcase-title"><p className="eyebrow">BUILT FOR THE BEAUTIFUL UNKNOWN.</p><h2>The world<br />is still <i>unwritten.</i></h2></div>
    <div className="showcase-bottom"><span className="eyebrow">A STUDIO WITHOUT BORDERS.</span><span className="eyebrow">SCROLL TO DISCOVER</span></div>
  </section>
}

const services = [
  ['01', 'Digital experiences', 'Places for brands to live, move and mean something.'], ['02', 'Brand worlds', 'A distinct point of view, made impossible to ignore.'], ['03', 'Creative technology', 'Useful magic at the edge of what’s possible.'], ['04', 'Strategy & direction', 'The clarity to know where to go. The nerve to go there.'], ['05', 'Campaigns & content', 'Ideas built to travel further than the brief.'],
]
function Services() {
  const [active, setActive] = useState(0)
  const backgrounds = ['photo-1519389950473-47ba0277781c', 'photo-1497366754035-f200968a6e72', 'photo-1635070041078-e363dbe005cb', 'photo-1451187580459-43490279c0fa', 'photo-1531058020387-3be344556be6']
  return <section className="services section-pad" id="services"><div className="services-head"><Reveal><span className="eyebrow">03 / WHAT WE DO</span><h2>Small team.<br /><i>Big picture.</i></h2></Reveal><Reveal><p>One connected studio. Every discipline<br />needed to make your next move count.</p></Reveal></div>
    <div className="services-layout"><div className="service-list">{services.map(([n, title, desc], i) => <button className={`service-row ${active === i ? 'active' : ''}`} key={n} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}><span className="service-number">{n}</span><span className="service-title">{title}</span><span className="service-desc">{desc}</span><span className="service-plus"><Plus size={18} /></span></button>)}</div>
      <div className="service-visual"><AnimatePresence mode="wait"><motion.div key={active} className="service-img" style={{ backgroundImage: `url(${img(backgrounds[active], 1000)})` }} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .55 }} /></AnimatePresence><span className="service-visual-label eyebrow">NORTHSTAR / PRACTICE {services[active][0]}</span><ArrowUpRight className="service-visual-arrow" /></div></div>
  </section>
}

function AIExperience() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  return <section className="ai-section" onMouseMove={e => setPointer({ x: (e.clientX / window.innerWidth - .5) * 18, y: (e.clientY / window.innerHeight - .5) * 18 })}>
    <div className="ai-top"><span className="eyebrow">04 / HUMAN × MACHINE</span><span className="eyebrow">A NEW CREATIVE FRONTIER</span></div>
    <div className="ai-content"><Reveal><p className="eyebrow">IMAGINATION, AMPLIFIED.</p><h2>Think beyond<br />the <i>possible.</i></h2></Reveal><motion.div className="orb-stage" animate={{ x: pointer.x, y: pointer.y }} transition={{ type: 'spring', stiffness: 45, damping: 22 }}><div className="orb-halo" /><OrbCanvas /><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><span className="orb-caption eyebrow">AUGMENTED IMAGINATION — 001</span></motion.div><Reveal className="ai-description"><span className="ai-plus">✳</span><p>Technology is a tool.<br />Wonder is the point.</p><span className="eyebrow">GOOD IDEAS, MEET NEW TOOLS.</span></Reveal></div>
    <div className="ai-bottom"><span className="eyebrow">CURIOUS BY DESIGN.</span><span className="eyebrow">RESPONSIBLE BY DEFAULT.</span></div>
  </section>
}

function Stats() {
  const stats = [['12', 'Years finding the edge'], ['38', 'People we’ve met there'], ['16', 'Countries in good company'], ['∞', 'Ways to move forward']]
  return <section className="stats section-pad"><div className="stats-head"><Reveal><span className="eyebrow">05 / A FEW NUMBERS</span></Reveal><Reveal><p>Not the whole story.<br />A good place to start.</p></Reveal></div><div className="stats-grid">{stats.map(([value, label], i) => <Reveal key={label} delay={i * .08}><div className="stat-value">{value}<span>{value !== '∞' && '+'}</span></div><p>{label}</p></Reveal>)}</div></section>
}

function About() {
  return <section className="about section-pad" id="studio-more"><div className="about-top"><Reveal><span className="eyebrow">06 / THE STUDIO</span></Reveal><Reveal><span className="eyebrow">INDEPENDENT IN SPIRIT. CONNECTED BY DESIGN.</span></Reveal></div>
    <div className="about-main"><Reveal className="about-image-wrap"><div className="about-image" style={{ backgroundImage: `url(${img('photo-1524758631624-e2822e304c36', 1400)})` }} /><span className="eyebrow about-image-label">BHATKAL, INDIA / NORTHSTAR STUDIO</span></Reveal><div className="about-copy"><Reveal><h2>More than<br />a studio.<br /><i>A feeling.</i></h2><p>We’re an independent creative company for people who see the world a little differently. Curious minds, open doors, and a shared belief that the best work starts with a better question.</p><a className="text-link" href={`mailto:${MAIN_EMAIL}`}>Meet your new collaborators <ArrowUpRight size={15} /></a></Reveal></div><div className="about-stamp"><Asterisk /><span>SMALL<br />BY DESIGN</span></div></div>
  </section>
}

const quotes = [
  ['“Northstar didn’t just understand the ambition. They helped us find one we hadn’t imagined yet.”', 'ALEX MORGAN', 'Chief Brand Officer, Aether'],
  ['“The rare creative partner who can think ten years ahead and still make the next detail feel right.”', 'JAMIE PARK', 'Founder, New Matter'],
  ['“Our collaboration felt less like a project and more like opening a door we didn’t know was there.”', 'MILA ROSSI', 'Creative Director, Forma'],
]
function Testimonials() {
  const [index, setIndex] = useState(0)
  return <section className="testimonial section-pad"><div className="testimonial-head"><span className="eyebrow">07 / KIND WORDS</span><div className="quote-controls"><button onClick={() => setIndex((index + quotes.length - 1) % quotes.length)} aria-label="Previous testimonial">←</button><span>0{index + 1} / 0{quotes.length}</span><button onClick={() => setIndex((index + 1) % quotes.length)} aria-label="Next testimonial">→</button></div></div>
    <AnimatePresence mode="wait"><motion.div className="quote" key={index} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .5 }}><span className="quote-mark">“</span><blockquote>{quotes[index][0]}</blockquote><div className="quote-person"><span>{quotes[index][1]}</span><span>{quotes[index][2]}</span></div></motion.div></AnimatePresence>
    <div className="testimonial-foot"><span className="eyebrow">GOOD PEOPLE MAKE GOOD WORK.</span><span className="quote-line" /></div>
  </section>
}

function CTA({ onContact }: { onContact: () => void }) {
  return <section className="cta" id="contact"><div className="cta-image" style={{ backgroundImage: `url(${img('photo-1519608487953-e999c86e7455', 2200)})` }} /><div className="cta-shade" /><div className="cta-top"><span className="eyebrow">08 / THE NEXT CHAPTER</span><span className="eyebrow">TAKING ON A FEW NEW PARTNERS FOR 2026</span></div>
    <div className="cta-content"><p className="eyebrow">GOT A GOOD FEELING?</p><h2>Let’s make<br />something <i>matter.</i></h2><button type="button" onClick={onContact} className="cta-link">Start a conversation <span><ArrowUpRight /></span></button></div><div className="cta-bottom"><span className="eyebrow">BIG THINKING. OPEN MINDS.</span><span className="eyebrow">WE’RE LISTENING ↗</span></div>
  </section>
}

function Footer() {
  return <footer className="footer"><div className="footer-main"><div className="footer-brand"><a href="#home" className="wordmark"><BrandMark /><span>NORTHSTAR<small>® &nbsp; INDEPENDENT STUDIO</small></span></a><p>Independent in spirit.<br />Connected by design.</p></div><div className="footer-column"><span className="eyebrow">EXPLORE</span><a href="#work">Selected work</a><a href="#studio">The studio</a><a href="#services">What we do</a></div><div className="footer-column"><span className="eyebrow">SAY HELLO</span><a href={`mailto:${MAIN_EMAIL}`}>{MAIN_EMAIL} <ArrowUpRight size={13} /></a><span>Bhatkal, India</span></div><div className="footer-column"><span className="eyebrow">ELSEWHERE</span><a href="https://www.instagram.com/m7.r4qi" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/in/syed-raqi-4799a72b9" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a></div></div>
    <div className="footer-big">STAY <i>curious.</i></div><div className="footer-bottom"><span>© NORTHSTAR STUDIO 2026</span><span>MADE WITH INTENTION · NEW YORK</span><a href="#home">BACK TO TOP ↑</a></div>
  </footer>
}

function Cursor() {
  const [pos, setPos] = useState({ x: -80, y: -80 })
  const [view, setView] = useState(false)
  useEffect(() => { const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY }); const over = (e: MouseEvent) => setView(!!(e.target as HTMLElement).closest('.project')); window.addEventListener('mousemove', move); window.addEventListener('mouseover', over); return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) } }, [])
  return <motion.div className={`custom-cursor ${view ? 'cursor-view' : ''}`} animate={{ x: pos.x, y: pos.y, scale: view ? 1 : .8 }} transition={{ type: 'spring', stiffness: 500, damping: 38 }}><span>{view ? 'VIEW' : ''}</span></motion.div>
}

function Progress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return <motion.div className="progress" style={{ scaleX }} />
}

function ScrollNav() {
  const [active, setActive] = useState('home')
  const sections = [['home', '01'], ['studio', '02'], ['work', '03'], ['services', '04'], ['studio-more', '05'], ['contact', '06']]
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-35% 0px -45% 0px', threshold: [0, .15, .35, .6] })
    sections.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])
  return <nav className="scroll-nav" aria-label="Section navigation">{sections.map(([id, number]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-label={`Go to section ${number}`}><span>{number}</span><i /></a>)}</nav>
}

export default function App() {
  const [contactProject, setContactProject] = useState<string | null | undefined>(undefined)
  const closeContact = () => setContactProject(undefined)
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: .85 })
    let frame = 0
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])
  return <><Progress /><Navbar /><ScrollNav /><main><Hero /><Intro /><StudioTicker /><FeaturedWork onDiscuss={projectName => setContactProject(projectName)} /><Showcase /><Services /><AIExperience /><Stats /><About /><Testimonials /><CTA onContact={() => setContactProject(null)} /></main><Footer /><Cursor /><AnimatePresence>{contactProject !== undefined && <ContactDialog key={contactProject ?? 'general'} projectName={contactProject} onClose={closeContact} />}</AnimatePresence></>
}
