import React, { useEffect, useState } from 'react';
import { EventItem } from '../App';

interface EventFormProps {
  onAddEvent: (title: string, date: string) => void;
  onUpdateEvent: (id: number, title: string, date: string) => void;
  editingEvent: EventItem | null;
  onCancelEdit: () => void;
}

function EventForm({
  onAddEvent,
  onUpdateEvent,
  editingEvent,
  onCancelEdit,
}: EventFormProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [titleError, setTitleError] = useState('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setTitleError('');
      setDateError('');
    } else {
      setTitle('');
      setDate('');
      setTitleError('');
      setDateError('');
    }
  }, [editingEvent]);

  const validate = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Введите название мероприятия');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!date) {
      setDateError('Выберите дату мероприятия');
      isValid = false;
    } else {
      setDateError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const trimmedTitle = title.trim();

    if (editingEvent) {
      onUpdateEvent(editingEvent.id, trimmedTitle, date);
    } else {
      onAddEvent(trimmedTitle, date);
    }

    setTitle('');
    setDate('');
    setTitleError('');
    setDateError('');
  };

  const handleCancel = () => {
    setTitle('');
    setDate('');
    setTitleError('');
    setDateError('');
    onCancelEdit();
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Название</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название мероприятия"
        />
        {titleError && <p className="error">{titleError}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Дата</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {dateError && <p className="error">{dateError}</p>}
      </div>

      <div className="button-group">
        <button type="submit">
          {editingEvent ? 'Редактировать' : 'Добавить'}
        </button>

        {editingEvent && (
          <button type="button" onClick={handleCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default EventForm;