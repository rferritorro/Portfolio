import { useState, useEffect, useRef } from 'react';
import { on } from "../utils/eventBus";
import TitleProjects from "./TitleProjects.jsx";

export default function LanguageSelector({ translations, experiences }) {
    const [idioma, setIdioma] = useState('es');
    const [filteredExperiences, setFilteredExperiences] = useState([]);

    function toggleDetails(index) {
        const allDetails = document.querySelectorAll('[id^="details-"]');
            allDetails.forEach((el, i) => {
            if (i === index) {
                el.classList.toggle("hidden");
            } else {
                el.classList.add("hidden");
            }
            });
    }
    useEffect(() => {
      on('Change Language', setIdioma);
    }, []);

    useEffect(() => {
        if (experiences && experiences.length > 0) {
        const proyectosFiltrados = experiences.filter(
            experience => experience.id.split("/")[0] === idioma
        );
        proyectosFiltrados.sort((a, b) => {
            const numA = parseInt(a.id.split('-')[1]);
            const numB = parseInt(b.id.split('-')[1]);
            return numA - numB;
        });
        setFilteredExperiences(proyectosFiltrados);
        }
  }, [idioma, experiences]);
return (
    <>
        <div id="time-line" class="w-full h-full md:block xl:block sm:hidden hidden">
            <div class="flex items-center justify-center">
                <div class="flex items-center w-full max-w-md">
                    <div id="top-line-description" class="flex-grow h-[3px] w-30"></div>
                        <TitleProjects translations={translations} type="timeline" client:load/> 
                    <div id="top-line-description" class="flex-grow h-[3px] w-30"></div>
                </div>
            </div>
            <div class="absolute border-l-4 border-gray-300 h-7/8 left-1/2 transform -translate-x-1/2"></div>
                { filteredExperiences.map((experience, index) => (
                    <div key={experience.id} class={`mb-2 flex justify-between items-center w-full ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                        <div class="order-1 w-5/12"></div>
                        <div id="timeline-line" class="z-20 flex items-center justify-center order-1 bg-white border-2 border-gray-300 w-12 h-12 rounded-full shadow-md"></div>
                        <div class="order-1 timeline-card-2 rounded-lg shadow-xl w-5/12 px-6 py-4 text-white">
                            <time class="block mb-1 text-sm font-medium text-white">{experience.data.title}</time>
                            <h3 class="mb-2 font-bold text-white text-xl">{experience.data.description}</h3>
                            <p class="leading-tight">{experience.data.summary}</p>
                        </div>
                    </div>
            ))}
        </div>
        <div id="timeline-mobile" class="xl:hidden md:hidden sm:block block w-full flex-col sm:justify-between justify-center items-center gap-4">
            <div class="flex items-center justify-center">
                <div class="flex items-center w-full sm:max-w-xs max-w-xs">
                    <div id="top-line-description" class="flex-grow h-[3px] w-30 sm:w-15"></div>
                        <TitleProjects translations={translations} type="timeline" client:load/> 
                    <div id="top-line-description" class="flex-grow h-[3px] w-30 sm:w-15"></div>
                </div>
            </div>
            <div className='w-full h-full sm:flex sm:flex-row sm:flex-wrap'>
                {filteredExperiences.map((experience, index) => (
                    <div class="rounded-lg shadow-md text-white p-4 sm:w-1/2 w-full timeline-card-2 mt-2">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold">{experience.data.description}</h3>
                            <button onClick={() => toggleDetails(index)} class="boton-bonito">▼</button>
                        </div>
                        <div class="hidden mt-2 text-sm" id={`details-${index}`}>
                            <time class="block text-gray-300">{experience.data.title}</time>
                            <p>{experience.data.summary}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    </>
)
}