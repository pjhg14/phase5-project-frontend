import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function CalendarPage() {
    const [events, setEvents] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetch(`http://localhost:3000/applications/user/index`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedApplications => {
                if (queriedApplications.error) {
                    console.log(queriedApplications.details)
                } else {
                    const applicationEvents = queriedApplications.map(application => {
                        const builder = [
                            {
                                id: application.id,
                                title: `Application to: ${application.business.name}`,
                                start: application.apply_date,
                                allDay: true
                            }
                        ]
                        if (application.start_date) {
                            builder.push({
                                id: application.id,
                                title: `Expected start date for: ${application.business.name}`,
                                start: application.start_date,
                                allDay: true
                            }) 
                        }
                            
                        return builder
                    }).flat()

                    setEvents(applicationEvents)
                }
            })
    },[])
    

    function handleSelection(clickInfo) {
        // console.log(clickInfo.event["_def"])
        // console.log(clickInfo.event.id)
        history.push(`/feed/applications/info/${clickInfo.event.id}`)
    }

    return(
        <FullCalendar 
            plugins={[ dayGridPlugin, interactionPlugin ]} 
            initialView="dayGridMonth"
            selectable={true}
            events={events}
            // eventContent={renderEventContent} // custom render function
            eventClick={handleSelection}
        />
    )
}

export default CalendarPage

const initialEvents = [
    {
        title: "test1",
        test: "Hi There",
        start: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
        end: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
        allDay: true
    },
    {
        title: "test2",
        test: "Hoi",
        start: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
        end: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
        allDay: true
    },
    // {
    //     id: 3,
    //     title: "test3",
    //     start: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     end: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     allDay: true
    // },
    // {
    //     id: 4,
    //     title: "test4",
    //     start: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     end: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     allDay: true
    // },
    // {
    //     id: 5,
    //     title: "test4",
    //     start: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     end: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     allDay: true
    // },
    // {
    //     id: 6,
    //     title: "test4",
    //     start: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     end: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     allDay: true
    // },
    // {
    //     id: 7,
    //     title: "test4",
    //     start: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     end: new Date().toISOString().replace(/T.*$/, ''), // YYYY-MM-DD of today
    //     allDay: true
    // }
]