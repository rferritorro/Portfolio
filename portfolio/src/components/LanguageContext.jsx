import { useState, useEffect } from 'react';
import { on } from '../utils/eventBus';

export default function Contenido({ translations }) {
  const [idioma, setIdioma] = useState('es');

  useEffect(() => {
    on('Change Language', setIdioma);
  }, []);

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  
  return (
    <>
    <li>
      <button className="cursor-pointer bg-transparent border-none" onClick={() => scrollToSection("introduction")}>
        {translations[idioma].data.introduction}
      </button>
    </li>
    <li>
      <button className="cursor-pointer bg-transparent border-none" onClick={() => scrollToSection("my-projects")}>
        {translations[idioma].data.projects}
      </button>
    </li>
    <li>
      <button className="cursor-pointer bg-transparent border-none" onClick={() => scrollToSection("about-me")}>
        {translations[idioma].data.about}
      </button>
    </li>
    <li>
      <button className="cursor-pointer bg-transparent border-none" onClick={() => scrollToSection("contact-me")}>
        {translations[idioma].data.contact}
      </button>
    </li>
  </>
  );
}
