import { useEffect, useState } from "react";

import heroCardImage from "./assets/hero-card.jpg";
import profileImage from "./assets/profile-hero.jpg";

const roles = [
  "Desenvolvedor.",
  "Engenheiro de Software.",
  "Analista de Sistemas.",
  "DBA.",
  "Freelancer.",
];

const aboutRoles = ["Victor Hugo.", ...roles];

const navLinks = [
  { label: "Início", href: "#home" },
  { label: "Sobre mim", href: "#about" },
  { label: "Contato", href: "#contact" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/victor-hugo99/", external: true },
  { label: "GitHub", href: "https://github.com/victor99dev", external: true },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/victor-hugo99/" },
  { label: "GitHub", href: "https://github.com/victor99dev" },
  { label: "Instagram", href: "https://www.instagram.com/victor.hug99/" },
  { label: "Twitch", href: "https://www.twitch.tv/vitorcalltv" },
  { label: "YouTube", href: "https://www.youtube.com/c/vitorcalltv" },
  { label: "DeviantArt", href: "https://www.deviantart.com/torugo99" },
];

const blockedCtrlKeys = ["u", "s", "c", "x", "a", "p"];
const blockedCtrlShiftKeys = ["i", "j", "c"];
const localhostNames = ["localhost", "127.0.0.1"];

function isBlockedShortcut(event) {
  const key = event.key.toLowerCase();

  return (
    event.key === "F12" ||
    (event.ctrlKey && blockedCtrlKeys.includes(key)) ||
    (event.ctrlKey && event.shiftKey && blockedCtrlShiftKeys.includes(key))
  );
}

function useTypewriter(words, speed = 105, pause = 1700) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const holdTime = currentWord.length <= 4 ? pause + 1000 : pause;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentWord.slice(0, displayText.length + 1);
          setDisplayText(nextText);

          if (nextText === currentWord) {
            setIsDeleting(true);
          }
          return;
        }

        const nextText = currentWord.slice(0, Math.max(displayText.length - 1, 0));
        setDisplayText(nextText);

        if (nextText.length === 0) {
          setIsDeleting(false);
          setWordIndex((current) => (current + 1) % words.length);
        }
      },
      isDeleting ? Math.max(speed / 2, 50) : displayText === currentWord ? holdTime : speed,
    );

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, pause, speed, wordIndex, words]);

  return displayText;
}

export default function App() {
  const typedRole = useTypewriter(roles);
  const typedAboutRole = useTypewriter(aboutRoles);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth <= 720;

      setShowScrollTop(currentScrollY > 420);
      setIsHeaderHidden(!isMobile && currentScrollY > 120 && currentScrollY > lastScrollY);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (localhostNames.includes(window.location.hostname)) {
      return undefined;
    }

    const preventDefault = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (isBlockedShortcut(event)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);
    document.addEventListener("dragstart", preventDefault);
    document.addEventListener("selectstart", preventDefault);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      document.removeEventListener("dragstart", preventDefault);
      document.removeEventListener("selectstart", preventDefault);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((current) => !current);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-shell">
      <header className={`site-header ${isHeaderHidden ? "is-hidden" : ""}`}>
        <a className="brand" href="#home" aria-label="Ir para o início" onClick={handleMenuClose}>
          <span className="brand-mark">V</span>
          <span className="brand-text">
            <strong>Victor99Dev</strong>
            <small>Engenheiro de Software</small>
          </span>
        </a>

        <button
          className={`nav-toggle ${isMenuOpen ? "is-open" : ""}`}
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          onClick={handleMenuToggle}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${isMenuOpen ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              onClick={handleMenuClose}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Olá, eu sou</p>
            <h1>Victor Hugo</h1>
            <h2>
              Eu sou, <span className="typewriter">{typedRole}</span>
            </h2>
            <p>
              Atuo na concepção, evolução e sustentação de <span className="inline-highlight">sistemas</span>, <span className="inline-highlight">back-ends escaláveis</span>, <span className="inline-highlight">APIs</span> e integrações para produtos que exigem estabilidade, clareza técnica e capacidade real de crescimento.
              <br />
              Hoje trabalho principalmente com <span className="inline-highlight">.NET/C#</span> e <span className="inline-highlight">Node/TypeScript</span>. Sou formado em <span className="inline-highlight">Análise e Desenvolvimento de Sistemas</span> e pós-graduado em <span className="inline-highlight">Engenharia de Software</span>, com foco em construir soluções bem estruturadas, sustentáveis e alinhadas ao negócio.
            </p>

            <div className="hero-actions">
              <a className="button button-primary hero-button" href="https://drive.google.com/file/d/137UZEUvOC-EaqEj1DZC4tAXhlPQsnGbB/view" target="_blank" rel="noreferrer">
                Ver currículo
              </a>
            </div>

            <div className="social-grid">
              {socialLinks.map((social) => (
                <a key={social.label} className="social-chip" href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-backdrop visual-backdrop-full">
              <img src={heroCardImage} alt="Imagem de destaque do portfólio" />
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-heading">
            <p className="eyebrow">Sobre mim</p>
            <h2>Quem eu sou</h2>
          </div>

          <div className="about-grid">
            <div className="about-photo-card">
              <img src={profileImage} alt="Victor Hugo" />
            </div>

            <div className="about-copy">
              <h3>
                Eu sou, <span className="typewriter">{typedAboutRole}</span>
              </h3>
              <p>
                Minha atuação vai além do desenvolvimento de software tradicional. Trabalho na interseção entre <span className="inline-highlight">tecnologia</span>, <span className="inline-highlight">produto</span> e <span className="inline-highlight">negócio</span>, transformando requisitos complexos em soluções escaláveis, sustentáveis e orientadas a valor.
              </p>
              <p>
                Tenho experiência consistente na construção de sistemas modernos, com forte atuação em <span className="inline-highlight">Back-End</span>, integrações críticas e ambientes que exigem confiabilidade, clareza técnica e evolução contínua. Atuo desde a concepção até a entrega, mantendo alinhamento entre decisões técnicas, qualidade e impacto real no produto.
              </p>
              <p>
                Mais do que desenvolver software, meu foco está em organizar cenários complexos, dar estrutura ao que ainda está difuso e viabilizar produtos digitais que sustentem crescimento real de negócio. Hoje também atuo na construção de iniciativas próprias e parcerias estratégicas, conectando execução técnica a oportunidades concretas de mercado.
              </p>
              <p>
                Se quiser entender melhor minha forma de pensar, construir e evoluir sistemas, meu <span className="inline-highlight">LinkedIn</span> e <span className="inline-highlight">GitHub</span> refletem bem essa jornada.
              </p>

              <div className="about-links">
                <a href="https://www.linkedin.com/in/victor-hugo99/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://github.com/victor99dev" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-card">
            <div>
              <p className="eyebrow">Contato</p>
              <h2>Aberto a posições em equipe, projetos bem estruturados e parcerias que exigem entrega técnica com visão de produto.</h2>
              <p className="contact-copy">
                Se a sua empresa busca um desenvolvedor com repertório em arquitetura, Back-End e engenharia de software, o meu LinkedIn é o melhor ponto para iniciar essa conversa.
              </p>
            </div>
            <a className="button button-primary contact-button" href="https://www.linkedin.com/in/victor-hugo99/" target="_blank" rel="noreferrer">
              Chamar no LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="footer-brand" href="#home" aria-label="Voltar para o início">
            <span className="brand-mark footer-mark">V</span>
            <div>
              <strong>Victor99Dev</strong>
              <p>Desenvolvimento, arquitetura e engenharia de software com visão de produto e execução.</p>
            </div>
          </a>
        </div>
        <div className="footer-bottom">
          <small className="footer-legal">© 2022 - {new Date().getFullYear()} Victor99Dev - Todos os direitos reservados.</small>
        </div>
      </footer>

      <button className={`scroll-top ${showScrollTop ? "is-visible" : ""}`} type="button" aria-label="Voltar ao topo" onClick={handleScrollTop}>
        ↑
      </button>
    </div>
  );
}