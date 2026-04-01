import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

export type EventItem = {
  id: number;
  title: string;
  date: string;
};

function App() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const handleAddEvent = (title: string, date: string) => {
    const newEvent: EventItem = {
      id: Date.now(),
      title,
      date,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));

    if (editingEvent && editingEvent.id === id) {
      setEditingEvent(null);
    }
  };

  const handleStartEdit = (event: EventItem) => {
    setEditingEvent(event);
  };

  const handleUpdateEvent = (id: number, title: string, date: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, title, date } : event
      )
    );

    setEditingEvent(null);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  return (
    <div className="app">
      <h1>Список мероприятий</h1>

      <EventForm
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        editingEvent={editingEvent}
        onCancelEdit={handleCancelEdit}
      />

      <EventList
        events={events}
        onDeleteEvent={handleDeleteEvent}
        onEditEvent={handleStartEdit}
      />
    </div>
  );
}

export default App;