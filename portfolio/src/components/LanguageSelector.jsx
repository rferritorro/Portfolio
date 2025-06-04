import { useState, useEffect, useRef } from 'react';
import { emit } from '../utils/eventBus';

export default function LanguageSelector({ availableLocales }) {
  const defaultLang = localStorage.getItem('locale') || availableLocales[0].code;
  const [selectedLang, setSelectedLang] = useState(
    availableLocales.find(l => l.code === defaultLang)
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setOpen(false);
    localStorage.setItem('locale', lang.code);
    emit('Change Language', lang.code);
  };

  useEffect(() => {
    emit('Change Language', defaultLang);
  }, [selectedLang]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative h-full flex justify-center select-none" ref={dropdownRef}>
      <div
        className="flex w-full max-sm:w-auto items-center justify-center text-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img src={selectedLang.flagUrl} alt="flag" class="rounded-full w-10 h-10 md:w-8 md:h-8" />
      </div>

      {open && (
        <ul id="ul-selector" className="flex flex-col md:flex-row md:w-30 sm:w-25 w-12 align-center bg-white justify-between absolute z-10">
          {availableLocales.map((lang) => (
            <li
              key={lang.code}
              className="items-center p-1 cursor-pointer"
              onClick={() => handleSelect(lang)}
            >
              <img src={lang.flagUrl} alt={`${lang.code} flag`} class="rounded-full w-10 h-10 md:w-8 md:h-8" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
