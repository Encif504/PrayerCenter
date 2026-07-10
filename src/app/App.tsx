import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Facebook, MapPin, Clock, ChevronDown, ChevronUp, Star, Cross } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const TESTIMONIALS = [
  {
    name: "Grace Wanjiru",
    location: "Nairobi, Kenya",
    text: "Coming to House of Prayer changed my spiritual walk entirely. The peace and stillness here is unlike anywhere I have ever been. I left renewed and deeply anchored in faith.",
    stars: 5,
  },
  {
    name: "Pastor James Omondi",
    location: "Kisumu, Kenya",
    text: "We brought our church leadership team here for a fasting retreat. The environment is sacred, well-kept, and the management is extremely respectful. Highly recommended.",
    stars: 5,
  },
  {
    name: "Dr. Sarah Muthoni",
    location: "Kampala, Uganda",
    text: "As an international visitor, I was warmly welcomed. The prayer mountain at sunset is breathtaking — truly a place where heaven meets earth.",
    stars: 5,
  },
];

const SERVICES = [
  {
    tier: "VIP",
    price: "2,500",
    description: "Private VIP room with dedicated prayer space, ensuite facilities, and premium amenities for a deeply focused retreat.",
    features: ["Private ensuite room", "Dedicated prayer chamber", "Priority access to Power Room", "Daily rate per person"],
    highlight: true,
  },
  {
    tier: "Double Room",
    price: "800",
    description: "Comfortable shared room for two guests, ideal for couples or prayer partners seeking a joint retreat.",
    features: ["Shared room for two", "Access to all common areas", "Full prayer grounds access", "Daily rate per person"],
    highlight: false,
  },
  {
    tier: "Regular",
    price: "500",
    description: "Standard accommodation within the prayer compound — simple, clean, and purpose-built for focused prayer.",
    features: ["Standard room allocation", "Access to all prayer areas", "Common facilities", "Daily rate per person"],
    highlight: false,
  },
];

const REGULATIONS = [
  "No eating within the premises",
  "No making noise or creating disturbances",
  "Enter only through the main gate",
  "Do not preach within the compound",
  "Maintain silence in all prayer areas",
  "Respect other guests' prayer time",
];

const GALLERY_CATEGORIES = [
  { id: "exterior", label: "Exterior" },
  { id: "reception", label: "Reception" },
  { id: "regular", label: "Regular Rooms" },
  { id: "power", label: "Power Room" },
  { id: "double", label: "Double Rooms" },
  { id: "vip", label: "VIP Rooms" },
  { id: "commissioning", label: "Commissioning" },
];

const GALLERY_IMAGES: Record<string, { url: string; alt: string }[]> = {
  exterior: [
    { url: "https://images.unsplash.com/photo-1535338881181-3646e5ab2ee2?w=600&h=400&fit=crop&auto=format", alt: "Aerial view of green mountains" },
    { url: "https://images.unsplash.com/photo-1554490826-3645c4942797?w=600&h=400&fit=crop&auto=format", alt: "Hill landscape at the prayer ground" },
    { url: "https://images.unsplash.com/photo-1604994227683-e7ea73825377?w=600&h=400&fit=crop&auto=format", alt: "Green grass field near mountain" },
  ],
  reception: [
    { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop&auto=format", alt: "Reception area" },
    { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop&auto=format", alt: "Welcoming entrance" },
  ],
  regular: [
    { url: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&h=400&fit=crop&auto=format", alt: "Regular prayer room" },
    { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop&auto=format", alt: "Simple clean room" },
  ],
  power: [
    { url: "https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?w=600&h=400&fit=crop&auto=format", alt: "Power prayer room interior" },
    { url: "https://images.unsplash.com/photo-1609151376730-f246ec0b99f5?w=600&h=400&fit=crop&auto=format", alt: "Sanctuary prayer space" },
  ],
  double: [
    { url: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&h=400&fit=crop&auto=format", alt: "Double room" },
    { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&auto=format", alt: "Shared room for two" },
  ],
  vip: [
    { url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&h=400&fit=crop&auto=format", alt: "VIP prayer suite" },
    { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop&auto=format", alt: "Premium VIP room" },
  ],
  commissioning: [
    { url: "https://images.unsplash.com/photo-1532641422418-0418d1903a1d?w=600&h=400&fit=crop&auto=format", alt: "Commissioning service at sunset" },
    { url: "https://images.unsplash.com/photo-1457139621581-298d1801c832?w=600&h=400&fit=crop&auto=format", alt: "Commissioning prayer gathering" },
  ],
};

// ─── Logo SVG ────────────────────────────────────────────────────────────────

function LogoMark({ size = 36, light = false }: { size?: number; light?: boolean }) {
  const fg = light ? "#F7F2E9" : "#1C3A1C";
  const gold = "#C49A3C";
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mountain */}
      <path d="M2 30 L12 12 L18 20 L24 10 L34 30 Z" fill={fg} opacity="0.9" />
      {/* Cross on summit */}
      <rect x="22.5" y="4" width="3" height="12" rx="1" fill={gold} />
      <rect x="19" y="7" width="10" height="3" rx="1" fill={gold} />
    </svg>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const current = sections.findLast((el) => el && el.getBoundingClientRect().top <= 100);
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(28, 58, 28, 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196,154,60,0.2)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
          <LogoMark size={36} light />
          <div className="text-left">
            <div
              className="font-bold leading-tight tracking-wide text-sm"
              style={{ fontFamily: "'Playfair Display', serif", color: "#F7F2E9", letterSpacing: "0.06em" }}
            >
              House of Prayer
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#C49A3C", fontSize: "0.6rem" }}>
              Bungoma · Kenya
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm tracking-widest uppercase transition-colors duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: active === link.id ? "#C49A3C" : "rgba(247,242,233,0.85)",
                fontWeight: active === link.id ? 600 : 400,
                letterSpacing: "0.1em",
                borderBottom: active === link.id ? "1px solid #C49A3C" : "1px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded"
          style={{ color: "#F7F2E9" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{ background: "rgba(28, 58, 28, 0.98)", borderColor: "rgba(196,154,60,0.2)" }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left px-6 py-4 text-sm tracking-widest uppercase border-b transition-colors"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: active === link.id ? "#C49A3C" : "rgba(247,242,233,0.85)",
                borderColor: "rgba(196,154,60,0.1)",
                letterSpacing: "0.1em",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-stone-800"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1457139621581-298d1801c832?w=1600&h=1000&fit=crop&auto=format')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(28,58,28,0.55) 0%, rgba(12,24,12,0.75) 60%, rgba(8,18,8,0.92) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center gap-3">
          <LogoMark size={56} light />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#C49A3C", fontFamily: "'DM Sans', sans-serif" }}
          >
            Established 2025 · Interdominational
          </span>
        </div>

        <h1
          className="mb-4 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            fontWeight: 600,
            color: "#F7F2E9",
            lineHeight: 1.15,
          }}
        >
          Come Pray With Us
        </h1>

        <p
          className="mb-2 text-lg"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: "rgba(247,242,233,0.78)",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          }}
        >
          A destination for your prayer
        </p>

        <div className="my-6 w-16 h-px" style={{ background: "#C49A3C" }} />

        <p
          className="max-w-xl text-base leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.72)", lineHeight: 1.8 }}
        >
          A sacred place of fasting and prayer nestled in the hills of Bungoma, Kenya. Whether for one day or many, the door is open.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "#C49A3C",
              color: "#1C2B1C",
              fontWeight: 600,
              letterSpacing: "0.12em",
              borderRadius: "2px",
            }}
          >
            Plan Your Stay
          </button>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              border: "1px solid rgba(247,242,233,0.5)",
              color: "rgba(247,242,233,0.9)",
              fontWeight: 400,
              letterSpacing: "0.12em",
              borderRadius: "2px",
            }}
          >
            Learn More
          </button>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 animate-bounce opacity-50" style={{ color: "#C49A3C" }}>
          <ChevronDown size={24} />
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: "300+", label: "Monthly Guests" },
    { value: "Intl.", label: "Visitors Welcome" },
    { value: "6am–8pm", label: "Daily Hours" },
    { value: "From 500", label: "KSh per Day" },
  ];
  return (
    <div style={{ background: "#1C3A1C" }}>
      <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "#C49A3C" }}
            >
              {s.value}
            </div>
            <div
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.65)", letterSpacing: "0.12em" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── About Section ───────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-24 px-5" style={{ background: "#F7F2E9" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div
              className="absolute -top-4 -left-4 w-full h-full"
              style={{ border: "2px solid #C49A3C", borderRadius: "2px", opacity: 0.35 }}
            />
            <img
              src="https://images.unsplash.com/photo-1535338881181-3646e5ab2ee2?w=700&h=500&fit=crop&auto=format"
              alt="Green mountain hills at House of Prayer, Bungoma"
              className="w-full object-cover"
              style={{ borderRadius: "2px", aspectRatio: "4/3" }}
            />
          </div>

          {/* Text */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#C49A3C" }}
            >
              Who We Are
            </p>
            <h2
              className="mb-6 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#1C2B1C",
                fontWeight: 600,
              }}
            >
              A Place Set Apart for{" "}
              <em style={{ fontStyle: "italic", color: "#1C3A1C" }}>Prayer & Fasting</em>
            </h2>
            <div className="w-10 h-0.5 mb-6" style={{ background: "#C49A3C" }} />
            <p
              className="leading-relaxed mb-5 text-base"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#4A4030", lineHeight: 1.85 }}
            >
              Founded in 2025, House of Prayer stands at the border of Bungoma and Kakamega counties — a quiet hillside sanctuary where Christians of all denominations come to seek the face of God. We are interdenominational, welcoming every believer regardless of their church background.
            </p>
            <p
              className="leading-relaxed mb-8 text-base"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#4A4030", lineHeight: 1.85 }}
            >
              Our grounds are carefully maintained to preserve an atmosphere of holiness and stillness. Whether you come for one day or an extended fast, you will find peace, provision, and the presence of God.
            </p>

            {/* Board & Partners */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4" style={{ background: "#EDE6D3", borderRadius: "2px", borderLeft: "3px solid #C49A3C" }}>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6050" }}
                >
                  Governance
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C", fontWeight: 600 }}>
                  Board of Management
                </div>
              </div>
              <div className="p-4" style={{ background: "#EDE6D3", borderRadius: "2px", borderLeft: "3px solid #C49A3C" }}>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6050" }}
                >
                  Partners
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C", fontWeight: 600 }}>
                  MBCI
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulations */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p
              className="text-xs tracking-[0.25em] uppercase mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#C49A3C" }}
            >
              Compound Guidelines
            </p>
            <h3
              className="text-2xl"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C", fontWeight: 600 }}
            >
              Regulations for All Guests
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGULATIONS.map((rule, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4"
                style={{ background: "#FDFAF3", borderRadius: "2px", border: "1px solid rgba(28,43,28,0.1)" }}
              >
                <span
                  className="mt-1 text-xs font-bold shrink-0 w-5 h-5 flex items-center justify-center rounded-full"
                  style={{ background: "#1C3A1C", color: "#C49A3C", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {i + 1}
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#4A4030", lineHeight: 1.7 }}
                >
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section
      className="py-24 px-5 relative overflow-hidden"
      style={{
        background: "#1C3A1C",
        backgroundImage: `url('https://images.unsplash.com/photo-1615963519626-156298ea17ae?w=1400&h=600&fit=crop&auto=format')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(28,58,28,0.91)" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#C49A3C" }}
          >
            Testimonies
          </p>
          <h2
            className="text-3xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#F7F2E9", fontWeight: 600 }}
          >
            What Guests Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="p-7 flex flex-col gap-4"
              style={{
                background: "rgba(247,242,233,0.06)",
                border: "1px solid rgba(196,154,60,0.25)",
                borderRadius: "2px",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={13} fill="#C49A3C" color="#C49A3C" />
                ))}
              </div>
              <p
                className="leading-relaxed text-sm flex-1"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  color: "rgba(247,242,233,0.82)",
                  lineHeight: 1.85,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#F7F2E9" }}
                >
                  {t.name}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#C49A3C" }}
                >
                  {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Donations note */}
        <div
          className="mt-12 text-center p-6 max-w-xl mx-auto"
          style={{ background: "rgba(196,154,60,0.12)", border: "1px solid rgba(196,154,60,0.3)", borderRadius: "2px" }}
        >
          <p
            className="text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.8)", lineHeight: 1.7 }}
          >
            <span style={{ color: "#C49A3C", fontWeight: 600 }}>Donations are welcome</span> and accepted at the site. Your generosity helps us maintain this sacred space for all who come to seek God.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section id="services" className="py-24 px-5" style={{ background: "#F7F2E9" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#C49A3C" }}
          >
            Accommodation & Pricing
          </p>
          <h2
            className="text-3xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C", fontWeight: 600 }}
          >
            Choose Your Stay
          </h2>
          <p
            className="max-w-lg mx-auto text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6050", lineHeight: 1.8 }}
          >
            All rates are per person per day. Minimum stay is one day — you may extend as long as you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.tier}
              className="relative flex flex-col p-8 transition-transform duration-200 hover:-translate-y-1"
              style={{
                background: s.highlight ? "#1C3A1C" : "#FDFAF3",
                border: s.highlight ? "none" : "1px solid rgba(28,43,28,0.12)",
                borderRadius: "2px",
              }}
            >
              {s.highlight && (
                <div
                  className="absolute top-0 left-0 right-0 text-center py-1 text-xs tracking-widest uppercase"
                  style={{
                    background: "#C49A3C",
                    color: "#1C2B1C",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                  }}
                >
                  Most Premium
                </div>
              )}
              <div className={s.highlight ? "mt-5" : ""}>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: s.highlight ? "#F7F2E9" : "#1C2B1C",
                  }}
                >
                  {s.tier}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#C49A3C" }}
                  >
                    KSh {s.price}
                  </span>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: s.highlight ? "rgba(247,242,233,0.55)" : "#6B6050" }}
                  >
                    / day
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: s.highlight ? "rgba(247,242,233,0.72)" : "#4A4030",
                    lineHeight: 1.75,
                  }}
                >
                  {s.description}
                </p>
                <div className="border-t mb-6" style={{ borderColor: s.highlight ? "rgba(196,154,60,0.2)" : "rgba(28,43,28,0.1)" }} />
                <ul className="flex flex-col gap-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span style={{ color: "#C49A3C", fontSize: "1rem", lineHeight: 1 }}>✦</span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: s.highlight ? "rgba(247,242,233,0.8)" : "#4A4030",
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Hours */}
        <div
          className="mt-12 p-6 flex flex-col sm:flex-row items-center gap-4 justify-center"
          style={{ background: "#EDE6D3", borderRadius: "2px" }}
        >
          <Clock size={20} style={{ color: "#C49A3C" }} />
          <div className="text-center sm:text-left">
            <span
              className="font-semibold text-sm mr-2"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#1C2B1C" }}
            >
              Operating Hours:
            </span>
            <span
              className="text-sm"
              style={{ fontFamily: "'Playfair Display', serif", color: "#4A4030", fontStyle: "italic" }}
            >
              6:00 AM – 8:00 PM daily
            </span>
          </div>
          <div className="hidden sm:block h-5 w-px" style={{ background: "rgba(28,43,28,0.2)" }} />
          <p
            className="text-xs text-center sm:text-left"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6050" }}
          >
            Gate closes at 8 PM. Please plan your arrival accordingly.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ─────────────────────────────────────────────────────────

function GallerySection() {
  const [activeTab, setActiveTab] = useState("exterior");

  return (
    <section id="gallery" className="py-24 px-5" style={{ background: "#EDE6D3" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#C49A3C" }}
          >
            Gallery
          </p>
          <h2
            className="text-3xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C", fontWeight: 600 }}
          >
            Inside the Grounds
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.1em",
                background: activeTab === cat.id ? "#1C3A1C" : "rgba(28,43,28,0.06)",
                color: activeTab === cat.id ? "#F7F2E9" : "#4A4030",
                borderRadius: "2px",
                border: activeTab === cat.id ? "none" : "1px solid rgba(28,43,28,0.15)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Images grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(GALLERY_IMAGES[activeTab] || []).map((img, i) => (
            <div
              key={i}
              className="overflow-hidden group"
              style={{ borderRadius: "2px", background: "#C8BFA8" }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {(GALLERY_IMAGES[activeTab] || []).length === 0 && (
          <div
            className="text-center py-16"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#6B6050" }}
          >
            Photos coming soon.
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Contact Section ─────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-5" style={{ background: "#F7F2E9" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#C49A3C" }}
          >
            Get in Touch
          </p>
          <h2
            className="text-3xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C", fontWeight: 600 }}
          >
            Find Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            {/* Phone */}
            <a
              href="tel:+254712345678"
              className="flex items-start gap-4 p-6 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#FDFAF3", borderRadius: "2px", border: "1px solid rgba(28,43,28,0.1)", textDecoration: "none" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: "#1C3A1C", borderRadius: "2px" }}
              >
                <Phone size={16} color="#C49A3C" />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6050" }}
                >
                  Phone
                </div>
                <div
                  className="font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C" }}
                >
                  +254 712 345 678
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:houseofprayer@gmail.com"
              className="flex items-start gap-4 p-6 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#FDFAF3", borderRadius: "2px", border: "1px solid rgba(28,43,28,0.1)", textDecoration: "none" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: "#1C3A1C", borderRadius: "2px" }}
              >
                <Mail size={16} color="#C49A3C" />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6050" }}
                >
                  Email
                </div>
                <div
                  className="font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C" }}
                >
                  houseofprayer@gmail.com
                </div>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="flex items-start gap-4 p-6 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#FDFAF3", borderRadius: "2px", border: "1px solid rgba(28,43,28,0.1)", textDecoration: "none" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: "#1C3A1C", borderRadius: "2px" }}
              >
                <Facebook size={16} color="#C49A3C" />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6050" }}
                >
                  Facebook
                </div>
                <div
                  className="font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C" }}
                >
                  House of Prayer — Official Page
                </div>
              </div>
            </a>

            {/* Location */}
            <div
              className="flex items-start gap-4 p-6"
              style={{ background: "#FDFAF3", borderRadius: "2px", border: "1px solid rgba(28,43,28,0.1)" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: "#1C3A1C", borderRadius: "2px" }}
              >
                <MapPin size={16} color="#C49A3C" />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6050" }}
                >
                  Location
                </div>
                <div
                  className="font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C" }}
                >
                  Bungoma – Kakamega County Border, Kenya
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div
            className="flex flex-col overflow-hidden"
            style={{ borderRadius: "2px", border: "1px solid rgba(28,43,28,0.12)", minHeight: "380px" }}
          >
            <div
              className="flex-1 flex flex-col items-center justify-center gap-4 p-10 text-center"
              style={{ background: "#EDE6D3" }}
            >
              <MapPin size={36} style={{ color: "#C49A3C" }} />
              <div>
                <p
                  className="font-semibold text-lg mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1C2B1C" }}
                >
                  Google Maps
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6050", lineHeight: 1.7 }}
                >
                  Interactive map will be embedded here once coordinates are confirmed.
                </p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "#1C3A1C",
                  color: "#F7F2E9",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#111D11" }}>
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoMark size={32} light />
              <span
                className="font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#F7F2E9", fontSize: "1rem" }}
              >
                House of Prayer
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.5)", lineHeight: 1.8 }}
            >
              An interdenominational prayer destination at the Bungoma–Kakamega border, Kenya. Open daily 6am–8pm.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#C49A3C", letterSpacing: "0.15em" }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm transition-colors duration-150 hover:text-amber-400"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.6)" }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#C49A3C", letterSpacing: "0.15em" }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li
                className="flex items-center gap-2 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.6)" }}
              >
                <Phone size={13} style={{ color: "#C49A3C" }} />
                +254 712 345 678
              </li>
              <li
                className="flex items-center gap-2 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.6)" }}
              >
                <Mail size={13} style={{ color: "#C49A3C" }} />
                houseofprayer@gmail.com
              </li>
              <li
                className="flex items-center gap-2 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.6)" }}
              >
                <MapPin size={13} style={{ color: "#C49A3C" }} />
                Bungoma–Kakamega, Kenya
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(196,154,60,0.12)" }}
        >
          <p
            className="text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.3)" }}
          >
            © 2025 House of Prayer. All rights reserved.
          </p>
          <p
            className="text-xs italic"
            style={{ fontFamily: "'Playfair Display', serif", color: "rgba(196,154,60,0.45)" }}
          >
            "My house shall be called a house of prayer." — Isaiah 56:7
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#F7F2E9" }}
    >
      <Navbar />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <TestimonialsSection />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
