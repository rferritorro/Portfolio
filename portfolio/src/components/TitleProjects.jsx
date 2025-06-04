import { useState, useEffect } from 'react';
import { on } from '../utils/eventBus';


export default function MyDescription({translations, type}) {
    const [idioma, setIdioma] = useState('es');

    useEffect(() => {
        on('Change Language', setIdioma);
    }, []);
    const content = () => {
    if (type === 'timeline') {
        return translations?.[idioma]?.data?.experience;
    } else if (type === 'projects') {
        return translations?.[idioma]?.data?.projects;
    }
    return null;
    };
    return (
    <span id="title-card" className="px-4 text-lg font-semibold">
        {content()}
    </span>
    )
};

