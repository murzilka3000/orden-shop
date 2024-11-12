import React, { useEffect } from 'react';
import s from './Notification.module.scss'; // Стили для компонента

type NotificationProps = {
    message: string;
    onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    useEffect(() => {
        // Таймер для автоматического скрытия уведомления через 3 секунды
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={s.notification}>
            {message}
        </div>
    );
};

export default Notification;