import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Facebook, MapPin, Clock, ChevronDown, ChevronUp, Star, Cross, Moon, Sun } from "lucide-react";

// --- Data --------------------------------------------------------------------

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
    text: "As an international visitor, I was warmly welcomed. The prayer mountain at sunset is breathtaking - truly a place where heaven meets earth.",
    stars: 5,
  },
];

const SERVICES = [
  {
    tier: "VIP",
    price: "250",
    description: "Private VIP spacious room with dedicated prayer space, ensuite facilities for a deeply focused retreat.",
    features: ["Private ensuite room", "Dedicated prayer chamber", "Daily rate per person"],
    highlight: true,
  },

  {
    tier: "Dormitory",
    price: "200",
    description: "Standard accommodation within the prayer compound - simple, clean, and purpose-built for focused prayer.",
    features: ["Standard room allocation","shared rooms", "Access to all prayer areas", "Common facilities", "Daily rate per person"],
    highlight: false,
  },
];

const REGULATIONS = [
  "You're required to provide national ID, telephone,next of kin",
  "No making noise or creating disturbances",
  "All visitors will be subjected through security inspection",
  "Do not preach within the compound",
  "Respect other guests' prayer time",
  "Decent dressing while on the mountain at all times",
  "We don't accept sick people. Seek medical services incase you are feeling well",
  "Couples are not allowed to share a room",
];

const GALLERY_CATEGORIES = [
  { id: "exterior", label: "Exterior" },
  { id: "reception", label: "Reception" },
  { id: "regular", label: "Regular Rooms" },
  { id: "vip", label: "VIP Rooms" },
  { id: "commissioning", label: "Commissioning" },
];

const GALLERY_IMAGES: Record<string, { url: string; alt: string }[]> = {
  exterior: [
    { url: "/images/compound01.jpg", alt: "Hill landscape at the prayer ground" },
    { url: "/images/compound02.jpg", alt: "Green grass field near mountain" },
  ],
  reception: [
    { url: "/images/reception.jpg", alt: "Reception area" },
    { url: "/images/reception02.jpg", alt: "Welcoming entrance" },
  ],
  regular: [
    { url: "/images/regular01.jpg", alt: "Regular prayer room" },
    { url: "/images/regular02.jpg", alt: "Simple clean room" },
  ],
  vip: [
    { url: "/images/vip01.jpg", alt: "VIP prayer suite" },
    { url: "/images/vip02.jpg", alt: "Premium VIP room" },
  ],
  commissioning: [
    { url: "https://images.unsplash.com/photo-1532641422418-0418d1903a1d?w=600&h=400&fit=crop&auto=format", alt: "Commissioning service at sunset" },
    { url: "https://images.unsplash.com/photo-1457139621581-298d1801c832?w=600&h=400&fit=crop&auto=format", alt: "Commissioning prayer gathering" },
  ],
};

// --- Logo SVG ----------------------------------------------------------------

function LogoMark({ size = 36, light: _light = false }: { size?: number; light?: boolean }) {
  return (
    <img
      src="/images/logo.svg"
      alt="House of Prayer logo"
      width={size}
      height={size}
      className="object-contain"
    />
  );
}


// --- Navigation --------------------------------------------------------------

function Navbar({ darkMode, onToggleTheme }: { darkMode: boolean; onToggleTheme: () => void }) {
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
        background: scrolled ? "rgba(40, 194, 78, 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.2)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
          <LogoMark size={36} light />
          <div className="text-left">
            <div
              className="font-bold leading-tight tracking-wide text-sm"
              style={{ fontFamily: "'Playfair Display', serif", color: scrolled ? "#000000" : "#FFFFFF", letterSpacing: "0.06em" }}
            >
              All Nations Prayer
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#9737BD", fontSize: "0.8rem" }}>
              Mountain of Zion
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
                color: scrolled ? "#000000" : active === link.id ? "#9737BD" : "rgba(255,255,255,0.85)",
                fontWeight: active === link.id ? 600 : 400,
                letterSpacing: "0.1em",
                borderBottom: active === link.id ? `1px solid ${scrolled ? "#000000" : "#9737BD"}` : "1px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded transition-colors"
            style={{ color: scrolled ? "#000000" : "#FFFFFF" }}
            onClick={onToggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={darkMode}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded"
            style={{ color: scrolled ? "#000000" : "#FFFFFF" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{ background: scrolled ? "rgba(40, 194, 68, 0.98)" : "rgba(0, 0, 0, 0.98)", borderColor: "rgba(0,0,0,0.2)" }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left px-6 py-4 text-sm tracking-widest uppercase border-b transition-colors"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: scrolled ? "#000000" : active === link.id ? "#9737BD" : "rgba(255,255,255,0.85)",
                borderColor: "rgba(0,0,0,0.1)",
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

// --- Hero Section ------------------------------------------------------------

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
          
         
        </div>

        <h1
          className="mb-4 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            fontWeight: 600,
            color: "#28C244",
            lineHeight: 1.15,
            paddingTop: "6rem",
          }}
        >
          Come Pray With Us
        </h1>

        <p
          className="mb-2 text-lg"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: "#28C244",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          }}
        >
          "My house shall be called a house of prayer." - Isaiah 56:7
        </p>

        <div className="my-6 w-16 h-px" style={{ background: "#9737BD" }} />

        <p
          className="max-w-xl text-base leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}
        >
          A sacred place of fasting and prayer, set in the peaceful surroundings of Bungoma, Kenya. Whether you come for one day or many, the door is open. A peaceful place to seek God, draw closer to Him, and find new strength in His presence.

        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "#9737BD",
              color: "#000000",
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
        <div className="mt-16 animate-bounce opacity-50" style={{ color: "#9737BD" }}>
          <ChevronDown size={24} />
        </div>
      </div>
    </section>
  );
}

// --- Stats Bar ---------------------------------------------------------------

function StatsBar() {
  const stats = [
    { value: "100+", label: "Monthly Guests" },
    { value: "7am-8pm", label: "Daily Hours" },
    { value: "From 200", label: "KSh per Day" },
    {value: "Interdenominational", label: "Open to All christians" }
  ];
  return (
    <div style={{ background: "#000000" }}>
      <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "#9737BD" }}
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

// --- About Section -----------------------------------------------------------

function AboutSection() {
  return (
    <section id="about" className="py-24 px-5" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
            <div
              className="absolute -top-1 -left-1 w-full h-full"
              style={{ border: "2px solid #9737BD", borderRadius: "2px", opacity: 0.35 }}
            />
            <img
              src="/images/prayercentre.jpg"
              alt="Green mountain hills at House of Prayer, Bungoma"
              className="w-full object-cover slow-zoom"
              style={{ aspectRatio: "4/3" }}
            />
          </div>

          {/* Text */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#9737BD" }}
            >
              Who We Are
            </p>
            <h2
              className="mb-6 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#000000",
                fontWeight: 600,
              }}
            >
              A Place Set Apart for{" "}
              <em style={{ fontStyle: "italic", color: "#000000" }}>Prayer & Fasting</em>
            </h2>
            <div className="w-10 h-0.5 mb-6" style={{ background: "#9737BD" }} />
            <p
              className="leading-relaxed mb-5 text-base"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#2B2B2B", lineHeight: 1.85 }}
            >
             Founded in 2023, House of Prayer is a peaceful place of fasting and prayer, located near Frag Grannada Farm in Bungoma, Kenya. Here, Christians from all denominations come together to seek God, pray, and grow closer to Him.
             

            </p>
            <p
              className="leading-relaxed mb-8 text-base"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#2B2B2B", lineHeight: 1.85 }}
            >
              Our grounds are carefully maintained to preserve an atmosphere of holiness and stillness.  Whether you come for a day or stay longer, there is a place for you here. Come, seek God, find peace, and renew your faith.
            </p>

            {/* Board & Partners */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4" style={{ background: "#F3E8F7", borderRadius: "2px", borderLeft: "3px solid #9737BD" }}>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A5A5A" }}
                >
                  Governance
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", color: "#000000", fontWeight: 600 }}>
                  Board of Management
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
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#9737BD" }}
            >
              Compound Guidelines
            </p>
            <h3
              className="text-2xl"
              style={{ fontFamily: "'Playfair Display', serif", color: "#000000", fontWeight: 600 }}
            >
              Regulations for All Guests
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGULATIONS.map((rule, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4"
                style={{ background: "#FFFFFF", borderRadius: "2px", border: "1px solid rgba(0,0,0,0.1)" }}
              >
                <span
                  className="mt-1 text-xs font-bold shrink-0 w-5 h-5 flex items-center justify-center rounded-full"
                  style={{ background: "#000000", color: "#9737BD", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {i + 1}
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#2B2B2B", lineHeight: 1.7 }}
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

// --- Testimonials ------------------------------------------------------------

function TestimonialsSection() {
  return (
    <section
      className="py-24 px-5 relative overflow-hidden"
      style={{
        background: "#000000",
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
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#9737BD" }}
          >
            Testimonies
          </p>
          <h2
            className="text-3xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF", fontWeight: 600 }}
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
                  <Star key={i} size={13} fill="#9737BD" color="#9737BD" />
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
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#FFFFFF" }}
                >
                  {t.name}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#9737BD" }}
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
            style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}
          >
            <span style={{ color: "#9737BD", fontWeight: 600 }}>Donations are welcome</span> and accepted at the prayer centre. Your generosity helps us maintain this sacred space for all who come to seek God.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- Services Section --------------------------------------------------------

function ServicesSection() {
  return (
    <section id="services" className="py-24 px-5" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#9737BD" }}
          >
            Accommodation & Pricing
          </p>
          <h2
            className="text-3xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#000000", fontWeight: 600 }}
          >
            Choose Your Stay
          </h2>
          <p
            className="max-w-lg mx-auto text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A5A5A", lineHeight: 1.8 }}
          >
            All rates are per person per day, you may extend as long as you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.tier}
              className="relative flex flex-col p-8 transition-transform duration-200 hover:-translate-y-1"
              style={{
                background: s.highlight ? "#000000" : "#FFFFFF",
                border: s.highlight ? "none" : "1px solid rgba(28,43,28,0.12)",
                borderRadius: "2px",
              }}
            >
              {s.highlight && (
                <div
                  className="absolute top-0 left-0 right-0 text-center py-1 text-xs tracking-widest uppercase"
                  style={{
                    background: "#9737BD",
                    color: "#000000",
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
                    color: s.highlight ? "#FFFFFF" : "#000000",
                  }}
                >
                  {s.tier}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#9737BD" }}
                  >
                    KSh {s.price}
                  </span>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: s.highlight ? "rgba(255,255,255,0.55)" : "#5A5A5A" }}
                  >
                    / day
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: s.highlight ? "rgba(255,255,255,0.72)" : "#2B2B2B",
                    lineHeight: 1.75,
                  }}
                >
                  {s.description}
                </p>
                <div className="border-t mb-6" style={{ borderColor: s.highlight ? "rgba(151,55,189,0.2)" : "rgba(0,0,0,0.1)" }} />
                <ul className="flex flex-col gap-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span style={{ color: "#9737BD", fontSize: "1rem", lineHeight: 1 }}>*</span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: s.highlight ? "rgba(255,255,255,0.8)" : "#2B2B2B",
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
          style={{ background: "#F3E8F7", borderRadius: "2px" }}
        >
          <Clock size={20} style={{ color: "#9737BD" }} />
          <div className="text-center sm:text-left">
            <span
              className="font-semibold text-sm mr-2"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#000000" }}
            >
              Operating Hours:
            </span>
            <span
              className="text-sm"
              style={{ fontFamily: "'Playfair Display', serif", color: "#2B2B2B", fontStyle: "italic" }}
            >
              7:00 AM - 6:00 PM daily
            </span>
          </div>
          <div className="hidden sm:block h-5 w-px" style={{ background: "rgba(28,43,28,0.2)" }} />
          <p
            className="text-xs text-center sm:text-left"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A5A5A" }}
          >
            Gate closes at 8 PM. Please plan your arrival accordingly.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- Gallery Section ---------------------------------------------------------

function GallerySection() {
  const [activeTab, setActiveTab] = useState("exterior");

  return (
    <section id="gallery" className="py-24 px-5" style={{ background: "#F3E8F7" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#9737BD" }}
          >
            Gallery
          </p>
          <h2
            className="text-3xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#000000", fontWeight: 600 }}
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
                background: activeTab === cat.id ? "#000000" : "rgba(0,0,0,0.06)",
                color: activeTab === cat.id ? "#FFFFFF" : "#2B2B2B",
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
              style={{ borderRadius: "2px", background: "#D8D8D8" }}
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
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#5A5A5A" }}
          >
            Photos coming soon.
          </div>
        )}
      </div>
    </section>
  );
}

// --- Contact Section ---------------------------------------------------------

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-5" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#9737BD" }}
          >
            Get in Touch
          </p>
          <h2
            className="text-3xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#000000", fontWeight: 600 }}
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
              style={{ background: "#FFFFFF", borderRadius: "2px", border: "1px solid rgba(0,0,0,0.1)", textDecoration: "none" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: "#000000", borderRadius: "2px" }}
              >
                <Phone size={16} color="#9737BD" />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A5A5A" }}
                >
                  Phone
                </div>
                <div
                  className="font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#000000" }}
                >
                  +254 118 351 091
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:houseofprayer@gmail.com"
              className="flex items-start gap-4 p-6 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#FFFFFF", borderRadius: "2px", border: "1px solid rgba(0,0,0,0.1)", textDecoration: "none" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: "#000000", borderRadius: "2px" }}
              >
                <Mail size={16} color="#9737BD" />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A5A5A" }}
                >
                  Email
                </div>
                <div
                  className="font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#000000" }}
                >
                  allnationsprayermountainofzion@gmail.com
                </div>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="flex items-start gap-4 p-6 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#FFFFFF", borderRadius: "2px", border: "1px solid rgba(0,0,0,0.1)", textDecoration: "none" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: "#000000", borderRadius: "2px" }}
              >
                <Facebook size={16} color="#9737BD" />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A5A5A" }}
                >
                  Facebook
                </div>
                <div
                  className="font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#000000" }}
                >
                  House of Prayer - Official Page
                </div>
              </div>
            </a>

            {/* Location */}
            <div
              className="flex items-start gap-4 p-6"
              style={{ background: "#FFFFFF", borderRadius: "2px", border: "1px solid rgba(0,0,0,0.1)" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: "#000000", borderRadius: "2px" }}
              >
                <MapPin size={16} color="#9737BD" />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A5A5A" }}
                >
                  Location
                </div>
                <div
                  className="font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#000000" }}
                >
                  Bungoma-Kakamega County Border, next to Frag Grannada Farm, Kenya
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
              style={{ background: "#F3E8F7" }}
            >
              <MapPin size={36} style={{ color: "#9737BD" }} />
              <div>
                <p
                  className="font-semibold text-lg mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#000000" }}
                >
                  Google Maps
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A5A5A", lineHeight: 1.7 }}
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
                  background: "#000000",
                  color: "#FFFFFF",
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

// --- Footer -------------------------------------------------------------------

function Footer() {
  return (
    <footer style={{ background: "#183d18" }}>
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoMark size={32} light />
              <span
                className="font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF", fontSize: "1rem" }}
              >
                House of Prayer
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.5)", lineHeight: 1.8 }}
            >
              An interdenominational prayer destination at the Bungoma-Kakamega border, Kenya. Open daily 6am-8pm.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#9737BD", letterSpacing: "0.15em" }}
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
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#9737BD", letterSpacing: "0.15em" }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li
                className="flex items-center gap-2 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.6)" }}
              >
                <Phone size={13} style={{ color: "#9737BD" }} />
                +254 118 351 091
              </li>
              <li
                className="flex items-center gap-2 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.6)" }}
              >
                <Mail size={13} style={{ color: "#9737BD" }} />
                allnationsprayermountainofzion@gmail.com
              </li>
              <li
                className="flex items-center gap-2 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(247,242,233,0.6)" }}
              >
                <MapPin size={13} style={{ color: "#9737BD" }} />
                Next to Frag Grannada Farm
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
            (c) 2026 House of Prayer. All rights reserved.
          </p>
          <p
            className="text-xs italic"
            style={{ fontFamily: "'Playfair Display', serif", color: "rgba(196,154,60,0.45)" }}
          >
            "My house shall be called a house of prayer." - Isaiah 56:7
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- App ----------------------------------------------------------------------

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = window.localStorage.getItem("prayer-center-theme");
    return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
    window.localStorage.setItem("prayer-center-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className="min-h-screen"
      data-theme={darkMode ? "dark" : "light"}
      style={{ fontFamily: "'DM Sans', sans-serif", background: "var(--page-bg)", color: "var(--page-text)" }}
    >
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((current) => !current)} />
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


