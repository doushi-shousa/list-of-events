import React from 'react';
import { EventItem } from '../App';

interface EventListProps {
  events: EventItem[];
  onDeleteEvent: (id: number) => void;
  onEditEvent: (event: EventItem) => void;
}

function EventList({
  events,
  onDeleteEvent,
  onEditEvent,
}: EventListProps) {
  if (events.length === 0) {
    return <p>Список мероприятий пуст.</p>;
  }

  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id} className="event-item">
          <div className="event-info">
            <strong>{event.title}</strong>
            <p>{event.date}</p>
          </div>

          <div className="button-group">
            <button type="button" onClick={() => onEditEvent(event)}>
              Редактировать
            </button>
            <button type="button" onClick={() => onDeleteEvent(event.id)}>
              Удалить
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default EventList;