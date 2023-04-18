import React, {useEffect, useState} from 'react';

function AttendConferenceForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.full_name = fullName;
        data.email = email;
        console.log(data);

        const attendeeUrl = 'http://localhost:8000/api/id/attendees/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {
            const newAttendee = await response.json();
            console.log(newAttendee);

            setFullName('');
            setEmail('');
            setShowSuccessMessage(true);
        }
    }

    const [conferences, setConferences] = useState([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [fullName, setFullName] = useState('');
    const handleFullNameChange = (event) => {
        const value = event.target.value;
        setFullName(value);
    }
    const [email, setEmail] = useState('');
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="my-5">
        <div className="row">
            <div className="col col-sm-auto">
            <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg"/>
            </div>
            <div className="col">
            <div className="card shadow">
                <div className="card-body">
                <form id="create-attendee-form">
                    <h1 className="card-title">It's Conference Time!</h1>
                    <p className="mb-3">
                    Please choose which conference
                    you'd like to attend.
                    </p>
                    <div className="d-flex justify-content-center mb-3 d-none" id="loading-conference-spinner">
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
                    <div className="mb-3">
                    <select name="conference" id="conference" className="form-select" required>
                        <option value="">Choose a conference</option>
                        {conferences.map(conference => {
                            return (
                                <option key={conference.name} value={conference.name}>
                                    {conference.name}
                                </option>
                            );
                        })}
                    </select>
                    </div>
                    <p className="mb-3">
                    Now, tell us about yourself.
                    </p>
                    <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleFullNameChange} required placeholder="Your full name" type="text" id="name" name="name" className="form-control"/>
                        <label htmlFor="name">Your full name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleEmailChange} required placeholder="Your email address" type="email" id="email" name="email" className="form-control"/>
                        <label htmlFor="email">Your email address</label>
                        </div>
                    </div>
                    </div>
                    <button className="btn btn-lg btn-primary">I'm going!</button>
                </form>
                <div className="alert alert-success d-none mb-0" id="success-message">
                    Congratulations! You're all signed up!
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default AttendConferenceForm;
