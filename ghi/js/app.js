function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
        <div class="col">
            <div class="card shadow mb-3">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                    <p class="card-text">${description}</p>
                </div>
                <div class="card-footer">${starts} - ${ends}</div>
            </div>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
        // Figure out what to do when the response is bad
        console.log("We have an error here.");
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const starts = new Date(details.conference.starts).toLocaleDateString("en-US", {month:"numeric", day:"numeric", year:"numeric"});
                    const ends = new Date(details.conference.ends).toLocaleDateString("en-US", {month:"numeric", day:"numeric", year:"numeric"});
                    const location = details.conference.location.name;
                    const html = createCard(title, description, pictureUrl, starts, ends, location);
                    const column = document.querySelector('.row');
                    column.innerHTML += html;
                    console.log(html);
                    }
                }

        }
    } catch (e) {
        console.error(e);
      // Figure out what to do if an error is raised
    }

});
