"use client";

import { useEffect, useState } from "react";

const projects = [
  { name: "NOVA", text: "A new frequency for music culture", category: "Branding · Digital", color: "#b8f04c", shape: "blob" },
  { name: "ARC", text: "Architecture in perpetual motion", category: "Strategy · Identity", color: "#7566f4", shape: "ring" },
  { name: "MIRA", text: "Modern objects, considered", category: "E-commerce · Art direction", color: "#ef7858", shape: "triangle" },
];

const services = [
  ["01", "Brand systems", "Strateji, konumlandırma ve görsel kimlik."],
  ["02", "Digital worlds", "Web deneyimleri, ürün arayüzleri ve içerik."],
  ["03", "Motion language", "Hareketli tasarım ve kampanya evrenleri."],
];

function Logo() {
  return <span className="tk" aria-label="TK logo"><b>T</b><b>K</b></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const [pointer, setPointer] = useState({ x: 50, y: 48 });

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }).format(new Date()));
    updateTime();
    const timer = setInterval(updateTime, 30000);
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    const move = (event) => setPointer({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
    window.addEventListener("pointermove", move, { passive: true });
    return () => { clearInterval(timer); observer.disconnect(); window.removeEventListener("pointermove", move); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className="header">
        <a className="brand" href="#top" aria-label="True Kinetic Studio ana sayfa"><Logo /><span>True Kinetic</span><i>|</i><span>Studio</span></a>
        <nav aria-label="Ana navigasyon"><a href="#about">Stüdyo</a><a href="#work">İşler</a><a href="#services">Hizmetler</a></nav>
        <button className={`menu ${menuOpen ? "active" : ""}`} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span>{menuOpen ? "Kapat" : "Menü"}</span><b /><b /></button>
      </header>
      <div className={`drawer ${menuOpen ? "open" : ""}`}><a onClick={closeMenu} href="#about">Stüdyo</a><a onClick={closeMenu} href="#work">İşler</a><a onClick={closeMenu} href="#services">Hizmetler</a><a onClick={closeMenu} href="#contact">İletişim</a></div>

      <section id="top" className="hero pad" style={{ "--mx": `${pointer.x}%`, "--my": `${pointer.y}%` }}>
        <div className="aura one" /><div className="aura two" /><div className="hero-grid" />
        <p className="eyebrow intro reveal">Independent creative studio<br />Istanbul — Everywhere</p>
        <div className="hero-main">
          <p className="hero-kicker reveal">Brands that<br />refuse to stand still.</p>
          <h1 aria-label="Studio"><span>S</span><span>t</span><span>u</span><span>d</span><span>i</span><span>o</span></h1>
          <a href="#about" className="round magnetic">Keşfet <b>↓</b></a>
        </div>
        <div className="hero-foot"><span>Scroll to discover</span><span>IST {time}</span></div>
      </section>

      <div className="ticker" aria-label="True Kinetic Studio hizmetleri"><span>STRATEGY</span><i>✳</i><span>IDENTITY</span><i>✳</i><span>DIGITAL</span><i>✳</i><span>MOTION</span><i>✳</i><span>STRATEGY</span><i>✳</i><span>IDENTITY</span></div>

      <section id="about" className="about pad">
        <p className="eyebrow">(01) — Biz kimiz</p>
        <div className="about-copy reveal"><h2>Fikirleri <em>harekete</em> dönüştüren bağımsız bir yaratıcı stüdyoyuz.</h2><div><p>True Kinetic, markaların daha net, daha cesur ve daha anlamlı bir yer edinmesine yardımcı olur. Stratejiyi, tasarımı ve hareketi tek bir ritimde buluştururuz.</p><a href="#contact" className="line-link">Stüdyoyu tanıyın <span>↗</span></a></div></div>
        <div className="stats reveal"><div><strong>12+</strong><span>Yıllık deneyim</span></div><div><strong>38</strong><span>Hayata geçen proje</span></div><div><strong>07</strong><span>Ülkede iş ortağı</span></div></div>
      </section>

      <section id="work" className="work pad"><div className="split"><p className="eyebrow">(02) — Seçili işler</p><p>Markalar için anlamlı hareket alanları yaratıyoruz.</p></div><div className="cards">{projects.map((project, index) => <article className="reveal" key={project.name}><div className="visual" style={{ "--card": project.color }}><small>0{index + 1}</small><span>{project.name}</span><i className={project.shape} /><em>{index === 0 ? "MOVE" : index === 1 ? "FORM" : "FEEL"}</em></div><div className="card-info"><small>{project.name} / 2026</small><h3>{project.text}</h3><p>{project.category} <b>↗</b></p></div></article>)}</div><a href="#contact" className="line-link all">Tüm işleri görüntüle <span>↗</span></a></section>

      <section id="services" className="services pad"><p className="eyebrow">(03) — Ne yapıyoruz</p><div className="service-intro reveal"><h2>Her temas noktasını daha <em>anlamlı</em> kılıyoruz.</h2><p>İlk düşünceden lansmana kadar; karakteri, netliği ve etkisi olan markalar tasarlıyoruz.</p></div><div className="service-list">{services.map(([number, title, description]) => <div className="reveal" key={number}><small>{number}</small><h3>{title}</h3><p>{description}</p><b>+</b></div>)}</div></section>

      <section className="manifesto pad"><p className="eyebrow">(04) — Yaklaşımımız</p><div className="manifesto-grid reveal"><h2>İyi tasarım dikkat çekmez.<br /><em>Yön verir.</em></h2><span className="orbit">TRUE<br />KINETIC</span><p>Merakla başlar, ortaklıkla büyür ve kültürde yer eder. Her projeye doğru soruyu bularak yaklaşırız.</p></div></section>

      <footer id="contact" className="footer pad"><p className="eyebrow">(05) — Birlikte hareket edelim</p><a className="email magnetic" href="mailto:hello@truekinetic.studio">hello@<em>truekinetic.studio</em><b>↗</b></a><div className="footer-bottom"><a className="brand" href="#top"><Logo /><span>True Kinetic</span><i>|</i><span>Studio</span></a><div><a href="#top">Instagram</a><a href="#top">LinkedIn</a><span>© 2026</span></div></div></footer>
    </main>
  );
}
