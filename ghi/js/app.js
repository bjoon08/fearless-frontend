window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
        // Figure out what to do when the response is bad
        } else {
            const data = await response.json();

            const conference = data.conferences[0];
            const nameTag = document.querySelector('.card-title');
            nameTag.innerHTML = conference.name;

            // const descriptionTag = document.querySelector('.card-text');
            // descriptionTag.innerHTML = conference.description;

            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();

                const descriptionTag = document.querySelector('.card-text');
                const description = details.conference.description;
                descriptionTag.innerHTML = description;

                const pictureTag = document.querySelector('.card-img-top');
                const picture = details.conference.location.picture_url;
                pictureTag.src = details.conference.location.picture_url;
                pictureTag.innerHTML = picture;

                console.log(details);
            }

        }
    } catch (e) {
      // Figure out what to do if an error is raised
    }

});
