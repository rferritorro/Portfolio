import { FiMail } from "react-icons/fi";
import emailjs from "@emailjs/browser"; // asegúrate de haberlo instalado
import { useEffect,useState } from "react";
import { on } from '../utils/eventBus';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactForm({ translations }) {
  const [idioma, setIdioma] = useState('es');
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  useEffect(() => {
    on('Change Language', setIdioma);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const SendMail = () => {
    const { user_name, user_email, message } = formData;

    const templateParams = {
      user_name,
      user_email,
      message,
    };

    toast.promise(
      emailjs
        .send(
          "service_pguxif4",    // <- ID real
          "template_672s0ro",   // <- ID template
          templateParams,
          "DI-iRYY2KTDeUG9mh"     // <- Public Key
        ),
        {
          loading: "Enviando mensaje...",
          success: "¡Mensaje enviado con éxito!",
          error: "Error al enviar el mensaje. Intenta nuevamente.",
      }
    );
  };

  return (
    <section id="contact-section" className="w-full h-full flex items-center justify-center">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div
        id="contact_panel"
        className="md:w-1/3 md:block xl:block sm:hidden w-80 rounded-3xl shadow-xl md:p-6"
        data-aos="fade-up"
      >
        {/* ICONO */}
        <div className="flex flex-col items-center mb-2 relative">
          <div
            id="div-icon"
            className="w-12 h-12 flex items-center justify-center rounded-md text-white relative z-10"
          >
            <FiMail className="text-2xl" />
          </div>
          <div
            id="shadow_block"
            className="absolute top-0 w-12 h-12 blur-xl rounded-full animate-pulse z-0"
          ></div>
          <h2 className="text-3xl font-semibold mt-4 text-white">
            {translations[idioma].data.contact_title}
          </h2>
        </div>

        {/* CAMPOS */}
        <div className="space-y-4 xl:block md:block sm:hidden">
          <div>
            <label className="block text-sm font-medium mb-1">
              {translations[idioma].data.contact_name}
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder={
                translations[idioma].data.contact_name_placeholder
              }
              className="w-full px-4 py-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {translations[idioma].data.contact_email}
            </label>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder={
                translations[idioma].data.contact_email_placeholder
              }
              className="w-full px-4 py-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {translations[idioma].data.contact_message}
            </label>
            <textarea
              name="message"
              rows="2"
              value={formData.message}
              onChange={handleChange}
              placeholder={
                translations[idioma].data.contact_message_placeholder
              }
              className="w-full px-4 py-3 resize-none rounded-lg text-white"
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <button type="button" className="boton-bonito" onClick={SendMail}>
              {translations[idioma].data.contact_button}
            </button>
          </div>
        </div>
      </div>
      <div
        id="contact_panel"
        className="w-3/4 sm:block hidden md:hidden xl:hidden  shadow-xl"
        data-aos="fade-up"
      >
        {/* ICONO */}
        <div className="flex flex-col relative">
          <h2 className="text-xl font-semibold text-white text-center">
            {translations[idioma].data.contact_title}
          </h2>
        </div>

        {/* CAMPOS */}
        <div className="space-x-4 block w-full flex flex-row">
          <div className="w-1/2 flex flex-col">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                {translations[idioma].data.contact_name}
              </label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder={translations[idioma].data.contact_name_placeholder}
                className="w-full px-4 py-3 mb-4 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                {translations[idioma].data.contact_email}
              </label>
              <input
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder={translations[idioma].data.contact_email_placeholder}
                className="w-full px-4 py-3 mb-4 rounded-lg"
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <button type="button" className="boton-bonito" onClick={SendMail}>
                {translations[idioma].data.contact_button}
              </button>
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                {translations[idioma].data.contact_message}
              </label>
              <textarea
                name="message"
                rows="7"
                value={formData.message}
                onChange={handleChange}
                placeholder={translations[idioma].data.contact_message_placeholder}
                className="w-full px-4 py-3 resize-none rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
