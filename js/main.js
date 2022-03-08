//grab dom elements and put them into variables

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search states.json and filter it
const searchStates = async searchText => {
    const res = await fetch('data/states.json'); //fetching data
    const states = await res.json(); //getting us the data back in json

    //get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}` , 'gi') // searching for terms that "start with"
        return state.name.match(regex) || state.abbr.match(regex);
    });
    // console.log(states) //checking to see if fetch worked

    //if there is no searches in the input box do not populate any states
    if(searchText.length === 0) {
        matches = [];
        matches.innerHTML = '';
    }
    outputHtml(matches)
}
    // console.log(matches) //checking to see if the matches function worked

    //show results in html
    const outputHtml = matches => {
        if (matches.length > 0) {
            const html = matches.map(match => `
            <div class="card card-body mb-1 ">
                <h4>${match.name} (${match.abbr}) 
                <span class="text-primary">${match.capital}</span> 
                </h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>`).join("");
            matchList.innerHTML = html; //appending the html to the div
        }
    }

    search.addEventListener('input', () => searchStates(search.value));
// function that will grab the states from the function above, anytime a button is pushed in the input box it will retrieve info from the API

