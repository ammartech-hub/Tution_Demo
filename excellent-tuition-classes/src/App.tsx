import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';
import {
  ArrowRight, Award, BookOpen, Brain, Check, ChevronDown, ChevronLeft, ChevronRight,
  Clock3, GraduationCap, Lightbulb, Mail, MapPin, Menu, Moon, Phone, Play, Quote,
  Sparkles, Sun, Target, Users, X, MessageCircle, Instagram, ArrowUp, ShieldCheck,
  Star, TrendingUp, PenLine, BarChart3
} from 'lucide-react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const navItems = [
  ['Home', 'home'], ['About', 'about'], ['Courses', 'courses'], ['Results', 'results'],
  ['Testimonials', 'testimonials'], ['Gallery', 'gallery'], ['Contact', 'contact'],
];
const benefits = [
  ['Small batch sizes', 'Real attention, not roll call.', Users],
  ['Personalised learning', 'A pace that meets your child.', Brain],
  ['Concept clarity', 'Understand first. Memorise later.', Lightbulb],
  ['Weekly assessments', 'See progress before report cards.', BarChart3],
  ['Doubt-solving hours', 'No question is too small.', MessageCircle],
  ['Exam strategy', 'Plan for the paper, not panic.', Target],
  ['Parent updates', 'A clear view of every milestone.', ShieldCheck],
  ['Study material', 'Notes built for Mumbai boards.', BookOpen],
  ['Confidence building', 'Quiet students find their voice.', Sparkles],
  ['One-to-one guidance', 'A mentor who remembers.', GraduationCap],
  ['Proven methods', '10+ years of classroom insight.', Award],
  ['A calm classroom', 'Focused, warm, and encouraging.', Star],
];
const courseImages = [
  'https://images.pexels.com/photos/5212328/pexels-photo-5212328.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/6238051/pexels-photo-6238051.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/5428012/pexels-photo-5428012.jpeg?auto=compress&cs=tinysrgb&w=700',
];
const courses = [
  ['SSC Board', 'Concept-first support for every core subject.', '10 months'],
  ['HSC Commerce', 'Clear, practical guidance for commerce subjects.', '10 months'],
  ['HSC Science', 'Strong foundations for boards and entrance prep.', '10 months'],
  ['CBSE', 'Aligned learning for confident school performance.', 'Academic year'],
  ['ICSE', 'Structured support for detailed ICSE syllabi.', 'Academic year'],
  ['Class 8 Foundation', 'Build the habits that make high school easier.', '9 months'],
  ['Class 9', 'Get ahead with clarity before boards begin.', '9 months'],
  ['Class 10', 'Focused board preparation without the panic.', '10 months'],
  ['Mathematics', 'From first principles to exam-ready problem solving.', 'Flexible'],
  ['Science', 'Make diagrams, experiments, and concepts stick.', 'Flexible'],
  ['English', 'Build language confidence for school and beyond.', 'Flexible'],
  ['Competitive Exam Preparation', 'Sharpen speed, strategy, and accuracy.', 'Flexible'],
  ['Coding Basics', 'A friendly first step into computational thinking.', 'Flexible'],
];
const process = [
  ['01', 'Know the learner', 'A short conversation reveals how your child thinks, not just what they score.'],
  ['02', 'Map the gaps', 'We turn confusing chapters into a clear, manageable learning map.'],
  ['03', 'Teach the why', 'Every formula, theorem, and idea gets a reason to stay with them.'],
  ['04', 'Practise with purpose', 'Guided practice builds accuracy without building anxiety.'],
  ['05', 'Review weekly', 'Small feedback loops keep momentum visible and motivating.'],
  ['06', 'Sharpen exam craft', 'Time management, paper reading, and presentation become second nature.'],
  ['07', 'Celebrate the climb', 'The goal is a better mark — and a child who knows they earned it.'],
];
const testimonials = [
  { quote: 'My daughter went from avoiding maths to explaining it to her friends. Rizwan Sir notices the little things and makes learning feel possible.', name: 'Farah M.', role: 'Parent of Class 9 student', initials: 'FM' },
  { quote: 'The difference is the patience. I could ask the same doubt three times and still get a new way of understanding it.', name: 'Ayaan K.', role: 'Student, Class 12 Science', initials: 'AK' },
  { quote: 'Our son scored 91% in his boards after joining mid-year. The structure, regular feedback, and care gave him his confidence back.', name: 'Nida S.', role: 'Parent of Class 10 student', initials: 'NS' },
];
const gallery = [
  ['The first breakthrough', 'A student sees the pattern.', 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=900'],
  ['Focused practice', 'Quiet work. Big progress.', 'https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=900'],
  ['Learn together', 'Good questions travel fast.', 'https://images.pexels.com/photos/5303539/pexels-photo-5303539.jpeg?auto=compress&cs=tinysrgb&w=900'],
  ['The study wall', 'Make the abstract visible.', 'https://images.pexels.com/photos/6238051/pexels-photo-6238051.jpeg?auto=compress&cs=tinysrgb&w=900'],
  ['After-class clarity', 'One last doubt, solved.', 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=900'],
  ['Celebrate progress', 'Every mark has a story.', 'https://images.pexels.com/photos/3769981/pexels-photo-3769981.jpeg?auto=compress&cs=tinysrgb&w=900'],
  ['Books open doors', 'The right guide helps.', 'https://images.pexels.com/photos/256468/pexels-photo-256468.jpeg?auto=compress&cs=tinysrgb&w=900'],
  ['Mahim after class', 'A little more ready.', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900'],
];
const faqs = [
  ['Why choose EXCELLENCE Tuition Classes?', 'Rizwan Sir combines personal attention, concept clarity, regular assessments, and a warm classroom culture so students build both marks and confidence.'],
  ['What are the batch timings?', 'Batches run Monday to Saturday between 8 AM and 8 PM. Call us to find a timing that fits your child’s school schedule.'],
  ['How many students are there per batch?', 'Our batches are intentionally small, with a maximum of 12 students, so every learner gets seen and supported.'],
  ['Are demo lectures available?', 'Yes. The first demo class is free and gives families a relaxed way to meet Rizwan Sir and experience the teaching approach.'],
  ['Do you provide study materials?', 'Yes. Students receive focused notes, practice sheets, and revision support matched to their board and current learning goals.'],
];

function App() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(0);
  const [slide, setSlide] = useState(0);
  const [sent, setSent] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [statCounts, setStatCounts] = useState([0, 0, 0, 0]);

  const statTargets = [
    { value: 10, suffix: '+', label: 'Years teaching' },
    { value: 3000, suffix: '+', label: 'Students guided' },
    { value: 98, suffix: '%', label: 'Result record' },
    { value: 12, suffix: '', label: 'Students per batch' },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.title = 'EXCELLENCE Tuition Classes | Learn with Rizwan Sir';
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', 'Personalised tuition classes in Mahim West, Mumbai led by Rizwan Sir. Book a free demo class.');
    document.head.appendChild(meta);
    const socialMeta = [
      ['og:title', 'EXCELLENCE Tuition Classes | Learn with Rizwan Sir'],
      ['og:description', 'Personalised tuition classes in Mahim West, Mumbai. Build strong concepts and quiet confidence with Rizwan Sir.'],
      ['og:type', 'website'],
    ];
    socialMeta.forEach(([property, content]) => {
      const tag = document.querySelector(`meta[property="${property}"]`) || document.createElement('meta');
      tag.setAttribute('property', property);
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    });
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, [dark]);

  useEffect(() => {
    const start = performance.now();
    const duration = 1500;
    let frame = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setStatCounts(statTargets.map(({ value }) => Math.round(value * eased)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setSlide((current) => (current + 1) % testimonials.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  return (
    <div className="site-noise min-h-[100dvh] bg-background text-foreground transition-colors duration-500">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#101a47]/80 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-3 text-left" data-testid="button-logo">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#66d7af] text-[#101a47] shadow-lg shadow-[#66d7af]/20"><PenLine size={20} strokeWidth={2.5} /></span>
            <span><span className="block text-[10px] font-bold uppercase tracking-[.25em] text-[#9de5ca]">EXCELLENCE</span><span className="display-font block text-lg leading-none">Tuition Classes</span></span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="text-xs font-semibold tracking-wide text-white/70 transition hover:text-[#8ce2bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66d7af] rounded px-1 py-2" data-testid={`link-nav-${id}`}>{label}</button>)}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <button onClick={() => setDark(!dark)} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10" aria-label="Toggle dark mode" data-testid="button-theme">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
            <button onClick={() => scrollTo('contact')} className="rounded-full bg-[#f1c66e] px-5 py-2.5 text-xs font-bold text-[#171e44] shadow-lg shadow-[#f1c66e]/10 transition hover:-translate-y-0.5 hover:bg-[#ffe09a]" data-testid="button-header-demo">Book a free demo <ArrowRight className="ml-1 inline" size={14} /></button>
          </div>
          <button onClick={() => setMenu(!menu)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 lg:hidden" aria-label="Toggle menu" data-testid="button-mobile-menu">{menu ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        {menu && <div className="border-t border-white/10 bg-[#101a47] px-5 py-4 lg:hidden">{navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="block w-full border-b border-white/10 py-3 text-left text-sm font-semibold text-white/80" data-testid={`link-mobile-${id}`}>{label}</button>)}<button onClick={() => scrollTo('contact')} className="mt-4 w-full rounded-full bg-[#f1c66e] py-3 text-sm font-bold text-[#171e44]" data-testid="button-mobile-demo">Book a free demo</button></div>}
      </header>

      <main>
        <section id="home" className="relative min-h-[760px] overflow-hidden bg-[#101a47] pt-32 text-white lg:min-h-[850px]">
          <div className="hero-grid absolute inset-0 opacity-60" />
          <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#3b56a6]/40 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-[320px] w-[420px] rounded-full bg-[#177c6d]/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-32">
            <div className="reveal max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8ce2bf]/30 bg-[#8ce2bf]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#a6ebd0]"><span className="h-1.5 w-1.5 rounded-full bg-[#f1c66e]" /> Mahim West · Mumbai</div>
              <h1 className="display-font text-[clamp(3.1rem,7vw,6.3rem)] leading-[.99] tracking-[-.045em]">Unlock your child&apos;s <span className="text-gradient">true potential</span> with Rizwan Sir.</h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/70 sm:text-lg">At EXCELLENCE Tuition Classes, we believe every student deserves personal attention, expert guidance, and quality education that builds confidence and delivers outstanding academic success.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => scrollTo('contact')} className="group rounded-full bg-[#f1c66e] px-6 py-4 text-sm font-bold text-[#171e44] transition hover:-translate-y-1 hover:bg-[#ffe09a]" data-testid="button-hero-demo">Book your free demo <ArrowRight className="ml-2 inline transition group-hover:translate-x-1" size={17} /></button>
                <a href="tel:+918976914763" className="rounded-full border border-white/25 bg-white/5 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10" data-testid="link-hero-call"><Phone className="mr-2 inline" size={16} /> Call Rizwan Sir</a>
              </div>
              <div className="mt-11 flex flex-wrap items-center gap-5 text-xs text-white/60"><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#8ce2bf]" /> Trusted by Mumbai families</span><span className="flex items-center gap-2"><Award size={16} className="text-[#f1c66e]" /> 10+ years teaching</span></div>
            </div>
            <div className="reveal relative mx-auto w-full max-w-lg lg:ml-auto" style={{ transitionDelay: '140ms' }}>
              <div className="absolute -inset-3 rounded-[2.5rem] border border-white/10 rotate-3" />
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                <img src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Student focused on learning at a desk" className="h-[470px] w-full rounded-[1.8rem] object-cover object-center" />
                <div className="absolute bottom-7 left-7 right-7 glass rounded-2xl p-4 text-white">
                  <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#a6ebd0]">The Rizwan Sir way</p><p className="mt-1 text-sm font-medium">Understand. Practise. Believe.</p></div><span className="grid h-11 w-11 place-items-center rounded-full bg-[#f1c66e] text-[#171e44]"><Play size={17} fill="currentColor" /></span></div>
                </div>
              </div>
              <div className="float absolute -left-7 top-16 hidden rounded-2xl bg-[#f5f0e7] p-4 text-[#171e44] shadow-xl sm:block"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#d5f2e7] text-[#197b62]"><TrendingUp size={17} /></span><div><p className="mono-font text-lg font-bold">98%</p><p className="text-[10px] uppercase tracking-wider text-[#596274]">results</p></div></div></div>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-12 mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid overflow-hidden rounded-3xl border border-[#dbe4e7] bg-card shadow-[0_24px_70px_rgba(16,26,71,.12)] sm:grid-cols-2 lg:grid-cols-4">
            {statTargets.map(({ suffix, label }, index) => <div key={label} className={`p-7 text-center sm:p-8 ${index !== statTargets.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-[#dbe4e7]' : ''}`} data-testid={`stat-${index}`}><p className="display-font text-4xl text-[#253d91] dark:text-[#8ce2bf]">{statCounts[index].toLocaleString()}{suffix}</p><p className="mt-1 text-xs font-bold uppercase tracking-[.16em] text-muted-foreground">{label}</p></div>)}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-36">
          <div className="grid items-center gap-16 lg:grid-cols-[.8fr_1.2fr]">
            <div className="reveal relative">
              <div className="absolute -bottom-8 -right-4 h-48 w-48 rounded-full bg-[#d5f2e7]" />
              <div className="relative overflow-hidden rounded-[2rem] bg-[#d7e2f4] p-3 shadow-xl"><img src="https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Teacher guiding a student through a lesson" className="h-[420px] w-full rounded-[1.5rem] object-cover" /></div>
              <div className="absolute -bottom-5 left-5 rounded-2xl bg-[#101a47] px-5 py-4 text-white shadow-xl"><p className="display-font text-2xl">Since 2014</p><p className="mt-1 text-[10px] uppercase tracking-[.15em] text-[#a6ebd0]">Building brighter starts</p></div>
            </div>
            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <p className="mono-font text-xs font-bold uppercase tracking-[.22em] text-[#268b70] dark:text-[#8ce2bf]">Founder &amp; Head Faculty · Rizwan Sir</p>
              <h2 className="display-font mt-4 max-w-2xl text-4xl leading-tight text-[#101a47] dark:text-white sm:text-5xl">Meet Rizwan Sir — the person beside every breakthrough.</h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">EXCELLENCE Tuition Classes is led by <strong className="text-foreground">Rizwan Sir</strong>, an educator who believes the turning point is rarely a new textbook. It is the moment a student feels safe enough to ask, try, and try again.</p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">For over a decade, our Mahim West classroom has been a focused, warm place for students to build strong academic foundations — and the self-belief to use them.</p>
              <div className="mt-8 grid grid-cols-2 gap-3">{[['10+', 'Years experience'], ['3,000+', 'Happy students'], ['98%', 'Excellent results'], ['Warm', 'Friendly teaching']].map(([value, label]) => <div key={label} className="rounded-2xl border border-[#dbe4e7] bg-card p-4"><p className="display-font text-2xl text-[#253d91] dark:text-[#8ce2bf]">{value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-muted-foreground">{label}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section className="bg-[#e9f0f2] py-24 dark:bg-[#111d31]" aria-labelledby="benefits-heading">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="reveal max-w-2xl"><p className="mono-font text-xs font-bold uppercase tracking-[.22em] text-[#268b70] dark:text-[#8ce2bf]">What changes in the classroom</p><h2 id="benefits-heading" className="display-font mt-4 text-4xl leading-tight text-[#101a47] dark:text-white sm:text-5xl">The small things that create big results.</h2></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(([title, text, Icon], i) => { const BenefitIcon = Icon as typeof Users; return <div key={title as string} className="reveal group rounded-2xl border border-[#d6e1e4] bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-[#8ed9bd] hover:shadow-lg" style={{ transitionDelay: `${(i % 4) * 60}ms` }} data-testid={`benefit-${i}`}><BenefitIcon size={21} className="text-[#268b70] dark:text-[#8ce2bf]" /><h3 className="mt-4 text-sm font-bold text-foreground">{title as string}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{text as string}</p></div>; })}</div></div>
        </section>

        <section id="courses" className="mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
            <div className="reveal"><p className="mono-font text-xs font-bold uppercase tracking-[.22em] text-[#268b70] dark:text-[#8ce2bf]">Room to grow</p><h2 className="display-font mt-4 text-4xl leading-tight text-[#101a47] dark:text-white sm:text-5xl">One mentor.<br /><span className="text-[#d39b2e]">Thirteen paths.</span></h2><p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">From a first algebra breakthrough to the calm before board exams, we teach the subjects that matter at every stage.</p><button onClick={() => scrollTo('contact')} className="mt-8 rounded-full border border-[#253d91] px-5 py-3 text-xs font-bold text-[#253d91] transition hover:bg-[#253d91] hover:text-white dark:border-[#8ce2bf] dark:text-[#8ce2bf] dark:hover:bg-[#8ce2bf] dark:hover:text-[#101a47]" data-testid="button-courses-demo">Find the right course <ArrowRight className="ml-2 inline" size={15} /></button></div>
            <div className="reveal grid gap-3 sm:grid-cols-2" style={{ transitionDelay: '100ms' }}>{courses.map(([course, description, duration], index) => <button key={course} onClick={() => scrollTo('contact')} className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lg ${index % 4 === 0 ? 'border-[#253d91] bg-[#253d91] text-white' : 'border-[#dbe4e7] bg-card text-foreground'}`} data-testid={`course-${index}`}><div className="flex items-center gap-3"><img src={courseImages[index % courseImages.length]} alt="" className="h-12 w-12 rounded-xl object-cover" /><div><span className={`mono-font text-[10px] ${index % 4 === 0 ? 'text-[#a6ebd0]' : 'text-muted-foreground'}`}>0{index + 1}</span><span className="block text-sm font-bold">{course}</span></div></div><p className={`mt-3 pr-5 text-xs leading-5 ${index % 4 === 0 ? 'text-white/70' : 'text-muted-foreground'}`}>{description}</p><div className={`mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[.12em] ${index % 4 === 0 ? 'text-[#f1c66e]' : 'text-[#268b70]'}`}><span>{duration} · Contact for fees</span><span>Enroll <ArrowRight className="ml-1 inline transition group-hover:translate-x-1" size={13} /></span></div></button>)}</div>
          </div>
        </section>

        <section id="results" className="bg-[#101a47] py-28 text-white lg:py-36"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid items-end gap-12 lg:grid-cols-[.8fr_1.2fr]"><div className="reveal"><p className="mono-font text-xs font-bold uppercase tracking-[.22em] text-[#a6ebd0]">The progress is real</p><h2 className="display-font mt-4 text-4xl leading-tight sm:text-5xl">A better score starts with a better process.</h2><p className="mt-6 max-w-md leading-7 text-white/65">No last-minute cramming. No one-size-fits-all worksheets. Just a thoughtful seven-step system that makes progress feel tangible.</p></div><div className="reveal grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ transitionDelay: '100ms' }}>{[['98%', 'Highest score'], ['95%', 'SSC topper'], ['1,000+', 'Board success stories'], ['95%', 'Parent satisfaction']].map(([n, l]) => <div key={l} className="rounded-2xl border border-white/15 bg-white/5 p-5"><p className="display-font text-3xl text-[#8ce2bf]">{n}</p><p className="mt-2 text-[10px] font-bold uppercase tracking-[.15em] text-white/50">{l}</p></div>)}</div></div><div className="mt-20 grid gap-0 lg:grid-cols-7">{process.map(([num, title, text], i) => <div key={num} className="reveal border-l border-white/15 py-5 pl-5 pr-5 first:border-l-0 lg:min-h-[230px] lg:border-t lg:pl-5" style={{ transitionDelay: `${i * 70}ms` }}><span className="mono-font text-xs text-[#f1c66e]">{num}</span><h3 className="mt-7 text-sm font-bold">{title}</h3><p className="mt-3 text-xs leading-6 text-white/55">{text}</p></div>)}</div></div></section>

        <section id="testimonials" className="mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-36"><div className="grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr]"><div className="reveal"><p className="mono-font text-xs font-bold uppercase tracking-[.22em] text-[#268b70] dark:text-[#8ce2bf]">The word around Mahim</p><h2 className="display-font mt-4 text-4xl leading-tight text-[#101a47] dark:text-white sm:text-5xl">The best results are the ones you can hear.</h2><p className="mt-6 max-w-sm leading-7 text-muted-foreground">Real families. Real turning points. A few notes from the people who make the classroom worth showing up for.</p><div className="mt-8 flex gap-2"><button onClick={() => setSlide((slide + testimonials.length - 1) % testimonials.length)} className="grid h-11 w-11 place-items-center rounded-full border border-[#dbe4e7] transition hover:border-[#268b70] hover:text-[#268b70]" aria-label="Previous testimonial" data-testid="button-testimonial-prev"><ChevronLeft size={18} /></button><button onClick={() => setSlide((slide + 1) % testimonials.length)} className="grid h-11 w-11 place-items-center rounded-full border border-[#dbe4e7] transition hover:border-[#268b70] hover:text-[#268b70]" aria-label="Next testimonial" data-testid="button-testimonial-next"><ChevronRight size={18} /></button></div></div><div className="reveal rounded-[2rem] bg-[#e8f3ef] p-7 dark:bg-[#142a2b] sm:p-10" style={{ transitionDelay: '100ms' }}><Quote className="text-[#268b70] dark:text-[#8ce2bf]" size={30} fill="currentColor" /><p className="display-font mt-7 text-2xl leading-[1.35] text-[#101a47] dark:text-white sm:text-3xl">“{testimonials[slide].quote}”</p><div className="mt-9 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#253d91] text-xs font-bold text-white">{testimonials[slide].initials}</span><div><p className="text-sm font-bold text-[#101a47] dark:text-white">{testimonials[slide].name}</p><p className="mt-0.5 text-xs text-muted-foreground">{testimonials[slide].role}</p></div><div className="ml-auto flex gap-0.5 text-[#e5ad42]">{[1,2,3,4,5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</div></div><div className="mt-8 flex gap-1">{testimonials.map((_, index) => <button key={index} onClick={() => setSlide(index)} className={`h-1 rounded-full transition-all ${index === slide ? 'w-8 bg-[#268b70]' : 'w-2 bg-[#a8cfc1]'}`} aria-label={`Show testimonial ${index + 1}`} data-testid={`button-testimonial-${index}`} />)}</div></div></div></section>

        <section id="gallery" className="bg-[#f1f3f0] py-24 dark:bg-[#101a25]"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="reveal flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mono-font text-xs font-bold uppercase tracking-[.22em] text-[#268b70] dark:text-[#8ce2bf]">Inside the classroom</p><h2 className="display-font mt-4 text-4xl text-[#101a47] dark:text-white sm:text-5xl">Where confidence gets built.</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">A glimpse of the people, practice, and small wins that fill our days.</p></div><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{gallery.map(([title, sub, image], i) => <div key={title} className={`reveal group relative overflow-hidden rounded-2xl ${i === 0 || i === 5 ? 'md:col-span-2 md:row-span-2' : ''}`} style={{ transitionDelay: `${(i % 4) * 60}ms` }}><img src={image} alt={title} className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i === 0 || i === 5 ? 'h-[330px] md:h-full' : 'h-40 md:h-48'}`} /><div className="absolute inset-0 bg-gradient-to-t from-[#101a47]/80 via-transparent to-transparent" /><div className="absolute bottom-4 left-4 text-white"><p className="text-sm font-bold">{title}</p><p className="mt-1 text-[10px] text-white/70">{sub}</p></div></div>)}</div></div></section>

        <section className="mx-auto max-w-5xl px-5 py-28 lg:px-8 lg:py-36"><div className="reveal text-center"><p className="mono-font text-xs font-bold uppercase tracking-[.22em] text-[#268b70] dark:text-[#8ce2bf]">Questions, answered</p><h2 className="display-font mt-4 text-4xl text-[#101a47] dark:text-white sm:text-5xl">Before you book the first class.</h2></div><div className="mt-12 divide-y divide-[#dbe4e7] border-y border-[#dbe4e7]">{faqs.map(([question, answer], index) => <div key={question} className="reveal" style={{ transitionDelay: `${index * 50}ms` }}><button onClick={() => setFaq(faq === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left text-sm font-bold text-[#101a47] dark:text-white" aria-expanded={faq === index} data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown className={`shrink-0 transition ${faq === index ? 'rotate-180 text-[#268b70]' : 'text-muted-foreground'}`} size={18} /></button>{faq === index && <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-muted-foreground">{answer}</p>}</div>)}</div></section>

        <section id="contact" className="relative overflow-hidden bg-[#101a47] py-24 text-white lg:py-32"><div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#267d70]/30 blur-3xl" /><div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8"><div className="reveal"><p className="mono-font text-xs font-bold uppercase tracking-[.22em] text-[#a6ebd0]">Your next chapter starts here</p><h2 className="display-font mt-4 text-5xl leading-tight sm:text-6xl">Let&apos;s make learning click.</h2><p className="mt-6 max-w-md leading-7 text-white/65">Book a relaxed, no-obligation demo class. Meet Rizwan Sir, see the room, and find the right next step for your child.</p><div className="mt-10 space-y-5 text-sm"><a href="tel:+918976914763" className="flex items-center gap-4 text-white/80 hover:text-[#8ce2bf]" data-testid="link-contact-phone"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#8ce2bf]"><Phone size={17} /></span>+91 89769 14763</a><a href="mailto:info@excellienttuitionclasses.com" className="flex items-center gap-4 text-white/80 hover:text-[#8ce2bf]" data-testid="link-contact-email"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#8ce2bf]"><Mail size={17} /></span>info@excellienttuitionclasses.com</a><div className="flex items-center gap-4 text-white/80"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#8ce2bf]"><MapPin size={17} /></span>Mahim West, Mumbai, Maharashtra</div><div className="flex items-center gap-4 text-white/80"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#8ce2bf]"><Clock3 size={17} /></span>Monday–Saturday · 8 AM–8 PM</div></div><div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#172454]"><div className="map-placeholder relative h-36 p-5"><div className="relative z-10 flex items-center gap-3 text-sm font-bold"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#f1c66e] text-[#101a47]"><MapPin size={17} /></span>Mahim West, Mumbai</div><p className="relative z-10 ml-12 mt-2 text-xs text-white/55">Google Maps location placeholder</p></div></div></div><div className="reveal rounded-[2rem] bg-[#f5f0e7] p-6 text-[#101a47] shadow-2xl sm:p-8" style={{ transitionDelay: '120ms' }}>{sent ? <div className="flex min-h-[390px] flex-col items-center justify-center text-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-[#d5f2e7] text-[#197b62]"><Check size={28} /></span><h3 className="display-font mt-7 text-3xl">You&apos;re on the list.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[#596274]">Thank you. Rizwan Sir&apos;s team will call you shortly to find a convenient demo time.</p><button onClick={() => setSent(false)} className="mt-7 text-xs font-bold text-[#197b62] underline underline-offset-4" data-testid="button-demo-another">Submit another request</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="mb-7"><p className="mono-font text-[10px] font-bold uppercase tracking-[.2em] text-[#268b70]">Free demo class</p><h3 className="display-font mt-2 text-3xl">Tell us a little about your learner.</h3></div><div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-bold">Student name<input required name="studentName" placeholder="Student name" className="mt-2 w-full rounded-xl border border-[#d8d8d0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#268b70] focus:ring-2 focus:ring-[#268b70]/20" data-testid="input-demo-student-name" /></label><label className="block text-xs font-bold">Parent name<input required name="parentName" placeholder="Parent name" className="mt-2 w-full rounded-xl border border-[#d8d8d0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#268b70] focus:ring-2 focus:ring-[#268b70]/20" data-testid="input-demo-parent-name" /></label></div><label className="mb-4 mt-4 block text-xs font-bold">Phone number<input required name="phone" type="tel" placeholder="+91 89769 14763" className="mt-2 w-full rounded-xl border border-[#d8d8d0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#268b70] focus:ring-2 focus:ring-[#268b70]/20" data-testid="input-demo-phone" /></label><label className="mb-4 block text-xs font-bold">Class / course<input required name="class" placeholder="For example, Class 9 Mathematics" className="mt-2 w-full rounded-xl border border-[#d8d8d0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#268b70] focus:ring-2 focus:ring-[#268b70]/20" data-testid="input-demo-class" /></label><label className="mb-4 block text-xs font-bold">Message<textarea name="message" rows={3} placeholder="Tell us how we can help" className="mt-2 w-full resize-none rounded-xl border border-[#d8d8d0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#268b70] focus:ring-2 focus:ring-[#268b70]/20" data-testid="input-demo-message" /></label><button type="submit" className="mt-2 w-full rounded-xl bg-[#253d91] py-4 text-sm font-bold text-white transition hover:bg-[#1b2e76]" data-testid="button-submit-demo">Request my free demo <ArrowRight className="ml-2 inline" size={16} /></button><p className="mt-4 text-center text-[10px] text-[#7a7d82]">No pressure. Just a useful conversation about what comes next.</p></form>}</div></div></section>
      </main>

      <footer className="bg-[#0a1130] py-12 text-white/55"><div className="mx-auto grid max-w-7xl gap-10 px-5 text-xs sm:grid-cols-2 lg:grid-cols-4 lg:px-8"><div><div className="flex items-center gap-3 text-white"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#66d7af] text-[#101a47]"><PenLine size={18} /></span><span className="display-font text-lg">EXCELLENCE Tuition Classes</span></div><p className="mt-4 max-w-xs leading-6">Personal attention, strong concepts, and brighter starts for Mumbai students.</p></div><div><p className="font-bold uppercase tracking-[.16em] text-white/80">Quick links</p><div className="mt-4 space-y-3"><button onClick={() => scrollTo('about')} className="block hover:text-[#8ce2bf]">About Rizwan Sir</button><button onClick={() => scrollTo('courses')} className="block hover:text-[#8ce2bf]">Courses</button><button onClick={() => scrollTo('results')} className="block hover:text-[#8ce2bf]">Results</button></div></div><div><p className="font-bold uppercase tracking-[.16em] text-white/80">Explore</p><div className="mt-4 space-y-3"><button onClick={() => scrollTo('testimonials')} className="block hover:text-[#8ce2bf]">Testimonials</button><button onClick={() => scrollTo('gallery')} className="block hover:text-[#8ce2bf]">Gallery</button><button onClick={() => scrollTo('contact')} className="block hover:text-[#8ce2bf]">Contact</button></div></div><div><p className="font-bold uppercase tracking-[.16em] text-white/80">Contact</p><div className="mt-4 space-y-3"><a href="tel:+918976914763" className="block hover:text-[#8ce2bf]">+91 89769 14763</a><span className="block">Mahim West, Mumbai</span><div className="flex gap-4 pt-2"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-[#8ce2bf]" aria-label="Instagram" data-testid="link-instagram"><Instagram size={17} /></a></div></div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-5 pt-6 text-xs lg:px-8"><p>© 2026 EXCELLENCE Tuition Classes. All Rights Reserved. <span className="ml-2 text-white/40">Made for brighter starts.</span></p></div></footer>
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3"><a href="https://wa.me/918976914763" target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-[#2bb673] text-white shadow-xl shadow-[#2bb673]/30 transition hover:-translate-y-1" aria-label="Chat on WhatsApp" data-testid="link-whatsapp"><MessageCircle size={22} /></a><a href="tel:+918976914763" className="grid h-12 w-12 place-items-center rounded-full bg-[#f1c66e] text-[#101a47] shadow-xl transition hover:-translate-y-1" aria-label="Call now" data-testid="link-floating-call"><Phone size={19} /></a>{showTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="grid h-12 w-12 place-items-center rounded-full bg-[#253d91] text-white shadow-xl transition hover:-translate-y-1" aria-label="Back to top" data-testid="button-back-top"><ArrowUp size={19} /></button>}</div>
    </div>
  );
}

function Router() {
  return <Switch><Route path="/" component={App} /><Route component={NotFound} /></Switch>;
}

function Root() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default Root;