import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getEvents, createEvent} from '../../managers/EventManager.js'
import { getGames } from "../../managers/GameManager.js"


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        game: 1,
        description: "",
        date: "",
        time: ""
    })

    let eventToSendToAPI = {
        ...currentEvent
    }
    
    useEffect(() => {
        getGames().then(response => setGames(response))
    }, [])

    const gamesData = () => {
        return (
            <select className="game__types" onChange={eventToSendToAPI} name="gameId" >
                {games.map(game => <option key={`game--${game.id}`} value={game.id}>{game.title}</option>)}
            </select>)
    }



    const changeEventState = (evt) => {
        eventToSendToAPI[evt.target.name] = evt.target.value
        setCurrentEvent(eventToSendToAPI)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="select">Game Category</label>
                    {gamesData()}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Description: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: currentEvent.game,
                        description: parseInt(currentEvent.description),
                        date: parseInt(currentEvent.date),
                        time: parseInt(currentEvent.time)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
