import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Подключение стилей, если они есть

const NotFound: React.FC = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Страница не найдена</p>
            <Link to="/" className="not-found__link">
                Вернуться на главную
            </Link>
        </div>
    );
};

export default NotFound;