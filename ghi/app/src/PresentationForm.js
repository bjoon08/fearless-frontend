import React, {useEffect, useState} from 'react';

function PresentationForm() {
    const [conferences, setConferences] = useState([]);
    const [presenterName, setName] = useState('');
    const [presenterEmail, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conference, setConference] = useState('');

    const presenterNameChange = (event) => {
        setName(event.target.value);
    }
    const presenterEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const companyNameChange = (event) => {
        setCompanyName(event.target.value);
    }
    const titleChange = (event) => {
        setTitle(event.target.value);
    }
    const synopsisChange = (event) => {
        setSynopsis(event.target.value);
    }
    const conferenceChange = (event) => {
        setConference(event.target.value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.conference = conference;
        data.presenter_name = presenterName;
        data.presenter_email = presenterEmail;
        data.company_name = companyName;
        data.title = title;
        data.synopsis = synopsis;

        const presentationUrl = `http://localhost:8000${conference}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            setConference('');
            setName('');
            setEmail('');
            setCompanyName('');
            setTitle('');
            setSynopsis('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new presentation</h1>
                <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                    <input onChange={presenterNameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" value={presenterName}/>
                    <label htmlFor="presenter_name">Presenter name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={presenterEmailChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" value={presenterEmail}/>
                    <label htmlFor="presenter_email">Presenter email</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={companyNameChange} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" value={companyName}/>
                    <label htmlFor="company_name">Company name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={titleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control" value={title}/>
                    <label htmlFor="title">Title</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="synopsis">Synopsis</label>
                    <textarea onChange={synopsisChange} className="form-control" id="synopsis" rows="3" name="synopsis" value={synopsis}></textarea>
                </div>
                <div className="mb-3">
                    <select onChange={conferenceChange} required name="conference" id="conference" className="form-select">
                    <option value="">Choose a conference</option>
                    {conferences.map(conference => {
                        return (
                            <option key={conference.href} value={conference.href}>
                                {conference.name}
                            </option>
                        )
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default PresentationForm;
