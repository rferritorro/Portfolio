import { useState, useEffect } from 'react';
import { on } from "../utils/eventBus";
import { Swiper, SwiperSlide } from 'swiper/react';
import AOS from "aos";
import "aos/dist/aos.css"
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function CardProject({ projects }) {
  const [idioma, setIdioma] = useState('es');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    on('Change Language', setIdioma);
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (projects && projects.length > 0) {
      const proyectosFiltrados = projects.filter(
        project => project.id.split("/")[0] === idioma
      );
      setFilteredProjects(proyectosFiltrados);
    }
  }, [idioma, projects]);

  if (!filteredProjects || filteredProjects.length === 0) {
    return <p className="text-center text-gray-500">No hay proyectos disponibles.</p>;
  }

  return (
    <Swiper
    effect={'coverflow'}
    slidesPerView={1}
    spaceBetween={0}
    loop={true}
    pagination={true}
    modules={[EffectCoverflow, Pagination]}
    className="w-full h-full"
    data-aos="fade-up"
    >
{filteredProjects.map((project) => (
        <SwiperSlide key={project.id}>
        <div id="slider" className="w-full h-full p-8 flex flex-col xl:hidden md:hidden block sm:hidden items-center justify-center">
            <div className="relative w-full h-full group overflow-hidden rounded-lg">
              <img
                src={project.data.image}
                alt="Imagen del proyecto"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {project.data.url && (
                <a
                  href={project.data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <button className="px-4 py-2 text-black font-semibold rounded-lg shadow hover:scale-125 transition">
                    <svg id="icon-network" fill="white" viewBox="0 0 24 24" class="md:w-8 md:h-8 w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                      <path stroke="black" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.304 3.492.997.108-.776.418-1.305.76-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.47-2.38 1.236-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </button>
              </a>
              )}
            </div>
            <div className="mt-4 text-left w-full h-full">
                <h3 className="text-xl font-bold text-white">{project.data.title}</h3>
                <p className="text-gray-600">{project.data.description}</p>
                <div className="w-full flex flex-wrap justify-center mt-2">
                    {project.data.tools.map((tool) => (
                        <span
                            className="text-white px-2 py-1 rounded-full text-sm m-1 bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        </div>
        <div id="slider" className="w-full h-full xl:hidden md:hidden hidden sm:block p-8">
            <h3 className="text-xl font-bold text-white">{project.data.title}</h3>
            <div className='sm:flex sm:flex-row sm:flex-wrap w-full h-full'>
              <div className="w-1/2 h-full overflow-hidden rounded-lg">
                <img
                  src={project.data.image}
                  alt="Imagen del proyecto"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {project.data.url && (
                  <a
                    href={project.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <button className="px-4 py-2 text-black font-semibold rounded-lg shadow hover:scale-125 transition">
                      <svg id="icon-network" fill="white" viewBox="0 0 24 24" class="md:w-8 md:h-8 w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="black" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.304 3.492.997.108-.776.418-1.305.76-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.47-2.38 1.236-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </button>
                </a>
                )}
              </div>
              <div className="w-1/2 h-full flex flex-col">
                  <p className="text-gray-600 pl-4 h-2/3">{project.data.description}</p>
                  <div className="w-full flex flex-wrap justify-center mt-2 h-auto">
                      {project.data.tools.map((tool) => (
                          <span
                              className="text-white px-2 py-1 rounded-full text-sm m-1 bg-gray-700 hover:bg-gray-600 transition-colors"
                          >
                              {tool}
                          </span>
                      ))}
                  </div>
              </div>
            </div>
        </div>
        </SwiperSlide>
    ))}
    </Swiper>
  );
}
