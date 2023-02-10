import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])
    console.log(events)
    return (
        <article className="events">
              <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/event/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.description}</div>
                    </section>
                })
            }
        </article>
    )
}