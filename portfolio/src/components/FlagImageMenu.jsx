import { useEffect, useState } from "react";
import { on } from '../utils/eventBus';


export default function LanguageFlag() {
  const [flagUrl, setFlagUrl] = useState('es');

  useEffect(() => {
    on('Change Language', setFlagUrl);;
  }, []);
    return (
        <img
            id="lang-flag"
            src={flagUrl+".png"}
            alt="language flag"
            className="w-6 h-6 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition duration-200 ease-in-out"
        />
        );
}
