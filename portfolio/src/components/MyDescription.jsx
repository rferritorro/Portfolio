import { useState, useEffect } from 'react';
import { on } from '../utils/eventBus';

export default function MyDescription({ translations }) {
    const [idioma, setIdioma] = useState('es');

    useEffect(() => {
        on('Change Language', setIdioma);
    }, []);

    const DownloadCV = () => {
        const lang = localStorage.getItem('locale') || 'es';
        const enlace = document.createElement("a");
        enlace.href = `cv/RAFA-2025-CV-${lang.toUpperCase()}.pdf`;
        enlace.download = `Rafa-2025-CV-${lang.toUpperCase()}.pdf`;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex justify-center items-center w-full mb-4">
                <h1 className="md:text-5xl sm:text-3xl text-4xl font-semibold text-left">
                {translations[idioma].data.greeting_hi} {translations[idioma].data.greeting_whoami}
                <span className="font-bold text-white ml-2">Rafa</span>
                </h1>
                <div id="top-line-description" className="flex-grow md:ml-10 md:mr-10 sm:ml-2 sm:mr-2 ml-2 mr-2 md:h-[5px] sm:h-[4px] h-[3px] bg-white"></div>
            </div>

            <p className="md:text-5xl sm:text-2xl text-2xl w-full text-black text-left">
                {translations[idioma].data.greeting_intro}
            </p>

            <div className="flex items-center w-full mt-4 gap-4">
                <div id="bottom-line-description" className="flex-grow md:h-[5px] sm:h-[4px] h-[3px] bg-white"></div>
                <button className="boton-bonito whitespace-nowrap" onClick={DownloadCV}>
                {translations[idioma].data.download_cv_button} ▼
                </button>
                <div id="bottom-line-description" className="flex-grow md:h-[5px] sm:h-[4px] h-[3px] bg-white"></div>
            </div>
        </div>
    );
}
