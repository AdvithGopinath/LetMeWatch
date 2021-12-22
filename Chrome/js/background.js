chrome.runtime.onInstalled.addListener((details) => {
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    const reason = details.reason;
    /*
    chrome.storage.local.get("savedPopMovies", function(items) {
    getTrending();
    });
    chrome.alarms.get('getTrending', a => {
        if (!a){
            chrome.alarms.create('getTrending', { periodInMinutes: 1440.0 });
        } 
    });
    console.log('Previous Version: ${previousVersion }')
    console.log('Current Version: ${currentVersion }')
    */

    switch (reason) {
        case 'install':
            console.log('New User installed the extension.')
            chrome.tabs.create({ url: "https://letmewatch.app/install.html" });
            break;
        case 'update':
            console.log('User has updated their extension.')
            break;
        case 'chrome_update':
        case 'shared_module_update':
        default:
            console.log('Other install events within the browser')
            break;
    }

});

/*chrome.alarms.onAlarm.addListener(() => {
    chrome.storage.local.set({ 'savedSummary': document.getElementById("summary").outerHTML });

});

/*chrome.runtime.onStartup.addListener(() => {
    //chrome.storage.local.get("savedPopMovies", function(items) {
    getTrending();
    //});
});
/*
//const getTrending = async() => {
function getTrending() {
    //const popMovies = (await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=1')).data.results;
    // var popMovies;
    // var popShows;
    //var pmRes = 
    //var psRes;
    console.log("getTrending");
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=1').then(r => r.json()).then(popMovies => {
        console.log(popMovies.results);
        var pmRes = popMovies.results;


        let popMovieStr = `
            <article class="popular" id="popMovies" style="display:none">
                <h1>Trending ~ Movies</h1>
                <div class="scrollmenu" id="pmScroll">
        `;
        /*const pmScrMen = document.createElement('div');
        pmScrMen.classList.add('scrollmenu');
        pmScrMen.id = 'pmScroll';
        for (let i = 0; i < 20; i++) {
            let currPM = pmRes[i];
            //let currTM = topMovies[i];
            //let currTS = topShows[i];
            popMovieStr += `
                <a class="scrollmenu-item">
                    <img src="https://image.tmdb.org/t/p/original/${currPM.poster_path}" />
                </a>
            `
                /* const pmElem = document.createElement('a');
                 pmElem.classList.add('scrollmenu-item');
                 pmElem.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${currPM.poster_path}" />`;
                 pmElem.addEventListener('click', () => {
                     input.value = inputValue(currPM);
                     document.querySelector('html').style.height = 'auto';
                     onOptionSelect(currPM);

                 });
                 document.getElementById("pmScroll").appendChild(pmElem);
        }
         const popMv = document.createElement('article');
         popMv.outerHTML = `
             <article class="popular" id="popMovies" style="display:none">
                 <h1>Trending ~ Movies</h1>
             </article>   
         `;
         popMv.appendChild(pmScrMen);
        popMovieStr += `
            </div>
            </article>
        `;
        //var savedPM = $("#popMv").detach();
        chrome.storage.local.set({ 'savedPopMovies': popMovieStr });
        chrome.storage.local.set({ 'pmArr': pmRes });
        //localStorage.setItem('savedPopMovies', popMovieStr);

    });

    fetch('https://api.themoviedb.org/3/tv/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=1').then(r => r.json()).then(popShows => {
        console.log(popShows.results);
        var psRes = popShows.results;
        let popShowStr = `
            <article class="popular" id="popShows" style="display:none">
                <h1>Trending ~ Shows</h1>
                <div class="scrollmenu" id="psScroll">
        `;

        /*const psScrMen = document.createElement('div');
        psScrMen.classList.add('scrollmenu');
        psScrMen.id = 'psScroll';
        for (let i = 0; i < 20; i++) {
            //let currPM = popMovies[i];
            let currPS = psRes[i];
            //let currTM = topMovies[i];
            //let currTS = topShows[i];

            popShowStr += `
            <a class="scrollmenu-item">
                <img src="https://image.tmdb.org/t/p/original/${currPS.poster_path}" />
            </a>
            `;
            /*const psElem = document.createElement('a');
            psElem.classList.add('scrollmenu-item');
            psElem.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${currPS.poster_path}" />`;
            psElem.addEventListener('click', () => {
                input.value = inputValue(currPS);
                document.querySelector('html').style.height = 'auto';
                onOptionSelect(currPS);
            });
            psScrMen.appendChild(psElem);
        }
        popShowStr += `
                </div>
            </article>
        `;
        /*const popSh = document.createElement('article');
        popSh.outerHTML = `
            <article class="popular" id="popShows" style="display:none">
                <h1>Trending ~ Shows</h1>
            </article>   
        `;
        popSh.appendChild(psScrMen);
        chrome.storage.local.set({ 'savedPopShows': popShowStr });
        chrome.storage.local.set({ 'psArr': psRes });
        //localStorage.setItem('savedPopShows', popShowStr);
    });
//console.log("hi");

//var popMovies = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=1');
//var popShows = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=1');
/*console.log(popMovies.results);
console.log(popShows.results);
//};*/