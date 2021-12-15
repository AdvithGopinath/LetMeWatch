(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', './js/third-party/analytics.js', 'ga');

ga('create', 'UA-208644341-1', 'auto');

// Modifications: 
ga('set', 'checkProtocolTask', null); // Disables file protocol checking.
ga('send', 'pageview', '/popup'); // Set page, avoiding rejection due to chrome-extension protocol 


var origSearch = document.querySelector('html').innerHTML;
let vidUrl = "";
const imdbApiKey = "k_2569wth0";
const omdbApiKey = "62ede3db";
const tmdbApiKey = "04c908115dc6ff5e5aa3709b5a735393";
const nflApiKey = "cc0c2fcfc6964e4c80eba43c7c924f84"; //https://sportsdata.io/developers/api-documentation/nfl#/sports-data

const autoCompleteConfig = {
    renderOption(media) {
        let title = "";
        let release_date = "";
        let type = "";
        let country = "";
        let poster = "";
        if (media.name) {
            title = media.name;
            release_date = media.first_air_date.substring(0, 4);
            if (media.last_air_date) {
                release_date += "-" + media.last_air_date.substring(0, 4);
            }
            country = media.origin_country;
            //type = "TV Series";
        } else if (media.title) {
            title = media.title;
            release_date = media.release_date.substring(0, 4);
            if (media.original_language === "en") {
                country = "US";
            } else {
                country = media.original_language.toUpperCase();
            }
        }
        let rating = parseInt(media.vote_average, 10);
        let filled = Math.floor(rating / 2)
        let ratingStars = "";
        for (let i = 0; i < 5; i++) {
            if (i >= filled) {
                if (i == filled && rating % 2 != 0) {
                    ratingStars += `<span class="fa fa-star-half-full checked"></span>`;
                } else {
                    ratingStars += `<span class="fa fa-star-o checked"></span>`;
                }
            } else {
                ratingStars += `<span class="fa fa-star checked"></span>`;
            }
        }
        //
        if (media.poster_path) {
            poster = "https://image.tmdb.org/t/p/w200/" + media.poster_path;
        } else {
            poster = "./images/noposter3.jpeg";
        }
        return `
            <img src="${poster}" />     
            <div class = "content" id="suggestDescription">
                
                <h1 id="tvTitle">${title}</h1>
                
                
                <h4 id="suggSubhead">${release_date}&ensp;&bull;&ensp;${country}&ensp;&bull;&ensp;${ratingStars}</h4>
            </div>		
            `;
    },
    inputValue(media) {
        if (media.name) {
            return media.name;
        } else if (media.title) {
            return media.title;
        }
    },
    async fetchData(searchTerm) {
        if (searchTerm.length < 1) {
            return [];
        }
        const tvResponse = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&query=' + searchTerm + '&page=1&include_adult=false');
        const movieResponse = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&query=' + searchTerm + '&page=1&include_adult=false');
        const combResponse = ((tvResponse.data.results).concat(movieResponse.data.results)).slice(0, 16);
        console.log(combResponse);
        const sortedResponse = sortJSON(combResponse, 'popularity', '321');
        return sortedResponse;
    },
};

function sortJSON(arr, key, way) {
    return arr.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

const onMediaSelect = (media, summaryElement) => {
    let tmdbID = media.id;
    let mediaType = '';
    let mediaDetail;
    document.querySelector('#autocomplete').style.display = 'none';
    summaryElement.style.display = 'block';
    summaryElement.innerHTML = '';
    if (media.title) { //means movie
        mediaType = "movie";
    } else {
        mediaType = "tv";
    }
    async function getMediaDetail() {
        let mediaResponse = await axios.get('https://api.themoviedb.org/3/' + mediaType + '/' + tmdbID + '?api_key=04c908115dc6ff5e5aa3709b5a735393&append_to_response=credits,external_ids&language=en-US&page=1&include_adult=false');
        mediaDetail = mediaResponse.data;

    }
    getMediaDetail().then(res => {
        setTemplate(mediaType, tmdbID, summaryElement, mediaDetail);
        addEventListeners(mediaType, mediaDetail);
    }).catch(err => console.log(err));
};

const onSportSelect = async(sportType) => {

    let descriptionHTML = ``;
    //let sportsTypeUpper = sportType.toUpperCase();
    //if (sportType) {
    const currDate = (new Date(Date.now()));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    //const currDayMonth = currDate.substring(0, currDate.length() - 4);
    const currMonth = currDate.getMonth();
    const currDay = currDate.getDay();
    const currYear = currDate.getFullYear();
    const currHour = currDate.getHours();
    const currMinute = currDate.getMinutes();
    const currSecond = currDate.getSeconds();
    descriptionHTML += `
            <article class="media" id="contentArticle">                
                <div class="media-content" id="contentDiv" style="height: 200px;">
                    <div class="content" id="sportsHeader" style="display:flex;">
                        <img src="../images/sports/NFL/${sportType}.jpg" width="20px" height="20px"/>
                        <h1 id="sportsTitle">${sportType}</h1>  
                        <div style="display:block;">
                            <button class="pill-servers" id="sportsButton1" style="white-space: nowrap;display: flex;margin-left: 15px;">
                                Games
                                <div id="dropdownarrow" style="/* position: absolute; *//* top: 6px; *//* left: 142px; *//* justify-self: right; *//* padding-left: 5px; */">&#x25BE</div>     
                            </button>
    `;
    if (sportType === "NFL") {
        let nflOverviewDetail = (await axios.get(`http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`));
        let nflSeasonDetail = (await axios.get(`http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${currYear}?lang=en&region=us`)).data;

        const currWeek = "" + nflSeasonDetail.type.week.number;
        const nflTeams = {
            1: ["ATL", "Atlanta Falcons"],
            2: ["BUF", "Buffalo Bills"],
            3: ["CHI", "Chicago Bears"],
            4: ["CIN", "Cincinnati Bengals"],
            5: ["CLE", "Cleveland Browns"],
            6: ["DAL", "Dallas Cowboys"],
            7: ["DEN", "Denver Broncos"],
            8: ["DET", "Detroit Lions"],
            9: ["GB", "Green Bay Packers"],
            10: ["TEN", "Tennessee Titans"],
            11: ["IND", "Indianapolis Colts"],
            12: ["KC", "Kansas City Chiefs"],
            13: ["LV", "Las Vegas Raiders"],
            14: ["LAR", "Los Angeles Rams"],
            15: ["MIA", "Miami Dolphins"],
            16: ["MIN", "Minnesota Vikings"],
            17: ["NE", "New England Patriots"],
            18: ["NO", "New Orleans Saints"],
            19: ["NYG", "New York Giants"],
            20: ["NYJ", "New York Jets"],
            21: ["PHI", "Philadelphia Eagles"],
            22: ["ARI", "Arizona Cardinals"],
            23: ["PIT", "Pittsburgh Steelers"],
            24: ["LAC", "Los Angeles Chargers"],
            25: ["SF", "San Francisco 49ers"],
            26: ["SEA", "Seattle Seahawks"],
            27: ["TB", "Tampa Bay Buccaneers"],
            28: ["WSH", "Washington Football Team"],
            29: ["CAR", "Carolina Panthers"],
            30: ["JAX", "Jacksonville Jaguars"],
            33: ["BAL", "Baltimore Ravens"],
            34: ["HOU", "Houston Texans"]
        }
        descriptionHTML += `
                            <button class="pill-servers" id="sportsButton2" style="white-space: nowrap;display: flex;margin-left:317px">
                                <div id="nflGamesLeftButt" style="/* display: none; */font-size: 15px;margin-top: 0px;padding-right:10px;">&#x27A4;</div>
                                &nbsp;Week ${currWeek}
                                <div id="nflGamesRighttButt" style="/* display: none; */font-size: 15px;margin-top: 0px;padding-left:5px;">&#x27A4;</div>
                            </button>
                            <div id="sportsOptions1" style="display: none;margin-left: 10px;">
                                <button class="pill-servers" id="sportsOption1Drop1" style="white-space: nowrap;display: flex;/* margin-left:260px; */margin-top: 30px;">Standings</button>
                                <button class="pill-servers" id="sportsOption1Drop2" style="white-space: nowrap;display: flex;/* margin-left:260px; */margin-top: 60px;">Teams</button>
                                <button class="pill-servers" id="sportsOption1Drop3" style="white-space: nowrap;display: flex;/* margin-left:260px; */margin-top: 90px;">Players</button>
                            </div>
                        </div>
                    </div>       
            `;
        let nflWeekDetail = (await axios.get(`http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/types/2/weeks/${currWeek}/events?lang=en&region=us`)).data.items;
        descriptionHTML += `
                    <div class="nflGameContainer" id="week${currWeek}Games">
            `;
        for (let i = 0; i < nflWeekDetail.length; i++) {

            //let currGameDetail = (await axios.get("" + nflWeekDetail[i].$ref)).data;
            let currGameLink = "" + nflWeekDetail[i].$ref;
            let currGameID = currGameLink.substring(currGameLink.indexOf("?") - 9, currGameLink.indexOf("?"));
            console.log("" + currGameID);
            let currGameDetail = (await axios.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=" + currGameID)).data.header.competitions[0];
            let firstTeamName = currGameDetail.competitors[1].team.displayName;
            let firstTeamAbbr = currGameDetail.competitors[1].team.abbreviation;
            let firstTeamID = currGameDetail.competitors[1].team.id;
            let firstTeamScore = currGameDetail.competitors[1].score;
            let secondTeamName = currGameDetail.competitors[0].team.displayName;
            let secondTeamAbbr = currGameDetail.competitors[0].team.abbreviation;
            let secondTeamID = currGameDetail.competitors[0].team.id;
            let secondTeamScore = currGameDetail.competitors[0].score;
            let firstWinner = "";
            let secondWinner = "Win"
            if (firstTeamScore > secondTeamScore) {
                firstWinner = "Win";
                secondWinner = "";
            }
            descriptionHTML += `
                        <article class="media nflGame" id="nflGame${currWeek}-${i}" style="border:0px;margin:4px;padding:5px;display:block;">
                            <div class="content" style="display:flex;justify-content:unset;">
                                <img class="nflLogo" src="../images/sports/NFL/${firstTeamID}.png" width="20px" height="20px" style="margin-top:-5px"/>
                                <div style="display:block;margin-top: -3px;">
                                    <h1 id="firstTeamAbbr">${firstTeamAbbr}</h1>  
                                    <h4 id="firstTeamName" style="margin-left:11px;">${firstTeamName}</h4>
                                </div>
                                <h1 class="nflGameScore${i%2}" id="firstTeamScore${firstWinner}">${firstTeamScore}</h1>
                            </div>
                            <div class="content" style="display:flex;justify-content:unset;">
                                <img class="nflLogo" src="../images/sports/NFL/${secondTeamID}.png" width="20px" height="20px" style="margin-top:-5px;"/>
                                <div style="display:block;margin-top: -3px;">    
                                    <h1 id="secondTeamAbbr">${secondTeamAbbr}</h1> 
                                    <h4 id="secondTeamName" style="margin-left:11px;">${secondTeamName}</h4>     
                                </div>
                                    <h1 class="nflGameScore${i%2}" id="secondTeamScore${secondWinner}">${secondTeamScore}</h1>
                            </div>
                        </article>
            `;
        }

        descriptionHTML += `
                    </div>
                </div>
            </article>
        `;
    }
    document.getElementById("summary").innerHTML += descriptionHTML;
    document.getElementById('contentArticle').style.width = "200px";
    // addEventListeners("sports", null);
}

const setTemplate = (mediaType, mediaID, summaryElement, mediaDetail) => {

    // let mediaDetail = (await axios.get('https://api.themoviedb.org/3/' + mediaType + '/' + mediaID + '?api_key=04c908115dc6ff5e5aa3709b5a735393&append_to_response=credits,external_ids&language=en-US&page=1&include_adult=false')).data;
    let descriptionHTML = ``;

    let genres = '';
    let actors = '';
    let sortedActors = sortJSON(mediaDetail.credits.cast, 'popularity', '321');
    let rating = parseInt(mediaDetail.vote_average, 10);
    let filled = Math.floor(rating / 2)
    let ratingStars = "";
    for (let i = 0; i < mediaDetail.genres.length; i++) {
        if (i > 2) {
            break;
        }
        if (i == 0) {
            genres += mediaDetail.genres[i].name;
        } else {
            genres += ', ' + mediaDetail.genres[i].name;
        }

    }
    for (let i = 0; i < sortedActors.length; i++) {
        if (i >= 3) {
            break;
        }
        if (i == 0) {
            actors += sortedActors[i].name;
        } else {
            actors += ', ' + sortedActors[i].name;
        }

    }
    for (let i = 0; i < 5; i++) {
        if (i >= filled) {
            if (i == filled && rating % 2 != 0) {
                ratingStars += `<span class="fa fa-star-half-full checked"></span>`;
            } else {
                ratingStars += `<span class="fa fa-star-o checked"></span>`;
            }
        } else {
            ratingStars += `<span class="fa fa-star checked"></span>`;
        }
    }

    if (mediaType === 'movie') {
        //mediaDetail = (await axios.get('https://api.themoviedb.org/3/movie/' + mediaID + '?api_key=04c908115dc6ff5e5aa3709b5a735393&append_to_response=credits,external_ids&language=en-US&page=1&include_adult=false')).data;
        let movieDetail = mediaDetail;
        descriptionHTML += `
            <article class="media" id="contentArticle">                
                <div class="media-content" id="contentDiv">
                    <div class="content" id="movieHeader">
                        <h1 id="movieTitle">${movieDetail.title}</h1>  
                        <h4 id="currSzn"></h4>
                    </div>
                    <!--h4 id="movieActors">${movieDetail.Runtime}</h4>                                
                    <h4 id="movieGenre"> ${movieDetail.Genre}</h4>  
                    <h4 id="movieActors">${movieDetail.Actors}</h4-->     
                    <h4 id="movieSubhead">${ratingStars} &bull; ${movieDetail.runtime} min <br>${genres}<br>${actors}</h4>                           
                    <p id="description">${movieDetail.overview}</p>	
                    <button class="pill" id="watchNow">Let me watch!</button>
                    <article class="episodes"></article>
                </div>
                <figure class="media-right">
                    <p class="image">
                        <img src="https://image.tmdb.org/t/p/w200/${movieDetail.poster_path}" />
                    </p>
                </figure>
            </article>
        `;
    } else {
        //mediaDetail = (await axios.get('https://api.themoviedb.org/3/tv/' + mediaID + '?api_key=04c908115dc6ff5e5aa3709b5a735393&append_to_response=credits,external_ids&language=en-US&page=1&include_adult=false')).data;
        let tvDetail = mediaDetail;
        let numSeasons = parseInt(tvDetail.number_of_seasons);
        descriptionHTML += ` 
            <article class="media" id="contentArticle">
                
                <div class="media-content" id="contentDiv">
                    <div class="content" id="tvHeader">
                        <h1 id="tvTitleSumm">${tvDetail.name}</h1> 
                            <h4 id="currSzn"></h4>
                    </div>  
                        <h4 id= "tvSubhead">${ratingStars}<br>${genres}<br>${actors}</h4>                                         
                    <p id="description">${tvDetail.overview}</p>	
        `;
        if (numSeasons > 5) {
            var numSzScreens = 0;
            if (numSeasons % 5 != 0) {
                numSzScreens = parseInt((numSeasons / 5) + 1);
            } else {
                numSzScreens = parseInt((numSeasons / 5));
            }
            console.log(numSzScreens);
            for (let currSzScr = 0; currSzScr < numSzScreens; currSzScr++) {
                if (currSzScr > 0) {
                    descriptionHTML += `
                        <article class="seasons" id="seasonButtons${currSzScr}" style="display:none">
                    `;
                } else {
                    descriptionHTML += `
                        <article class="seasons" id="seasonButtons${currSzScr}">
                    `;
                }

                for (let i = 1 + (5 * currSzScr); i <= (5 * currSzScr) + 5; i++) {
                    if (i <= numSeasons) {
                        descriptionHTML += `      
                                    <button class="pill" id="szn` + i + `" tabindex="0">S${i}</button>
                        `;
                    }
                }
                descriptionHTML += `      
                                <button class="pill-nxtszn" id="nxt${currSzScr}" tabindex="0"></button>
                            </article>
                `;
            }
        } else {
            descriptionHTML += `
                        <article class="seasons" id="seasonButtons">
            `;
            for (let i = 1; i <= numSeasons; i++) {
                descriptionHTML += `      
                                <button class="pill" id="szn` + i + `" tabindex="0">S${i}</button>
                    `;
            }
            descriptionHTML += `
                        </article>
            `;
        }
        descriptionHTML += `
                <article class="episodes" id ="allEps" style="position:absolute;bottom: 9px;right: 200px; left:20px;"></article>

                </div>
            <figure class="media-right">
            <p class="image">
                <img src="https://image.tmdb.org/t/p/w200/${tvDetail.poster_path}" />
            </p>
            </figure>
        </article>

        `;

    }
    summaryElement.innerHTML += descriptionHTML;
    /*mediaDetailInp = mediaDetail;
     return descriptionHTML;*/
};

const addEventListeners = (mediaType, mediaDetail) => {
    //if (!(document.contains(document.getElementById('backButton')))) {
    let backButton = document.createElement("button");
    let logoSummary = document.getElementById("logoHeader").cloneNode(true);
    backButton.setAttribute('id', 'backButton');
    backButton.setAttribute('class', 'pill-back');
    logoSummary.setAttribute('class', 'content');
    document.getElementById("summary").insertBefore(backButton, document.getElementById("contentArticle"));
    document.getElementById("summary").insertBefore(logoSummary, document.getElementById("contentArticle"));
    backButton.addEventListener('click', () => {
        document.getElementById("autocomplete").style.display = "block";
        document.getElementById("summary").style.display = 'none';
        document.querySelector('input').focus();
        document.querySelector('input').select();
        document.querySelector('html').style.height = '100%';
        document.getElementById("logoSummaryTV").style.display = 'none';
    });
    //  }

    if (mediaType === 'movie') {
        let watchNowButton = document.getElementById("watchNow");
        logoSummary.setAttribute('id', 'logoSummaryMovie');
        document.getElementById("currSzn").innerText += "" + mediaDetail.release_date.substring(0, 4);
        watchNowButton.addEventListener("click", function() {
            var currMoviePageSummary = $("#summary").clone(true);
            chrome.storage.local.set({ "savedPage": currMoviePageSummary });
            let twoEmbUrl = "https://www.2embed.ru/embed/imdb/movie?id=" + mediaDetail.external_ids.imdb_id + "";
            //let vidSrcUrl = "https://vidsrc.me/embed/" + mediaDetail.external_ids.imdb_id + "/";
            //let vidCloudUrl = "https://vidclouds.us/" + mediaDetail.external_ids.imdb_id + ".html";
            let dbgoUrl = "https://dbgo.fun/imdb.php?id=" + mediaDetail.external_ids.imdb_id + "";
            let movies123Url = "https://api.123movie.cc/imdb.php?imdb=" + mediaDetail.external_ids.imdb_id + "&server=serverf4";
            let firesonicUrl = "https://firesonic.sc/play_video.php?getvideo?key=UdK4VbZNuo02uapi&video_id=" + mediaDetail.external_ids.imdb_id + "";
            let oneMoviesUrl = "https://s0.1movietv.com/playstream/" + mediaDetail.external_ids.imdb_id + "";
            //let trailersToUrl = "https://Trailers.to/video/embed%20%20%20%20%20%20%20%20%20%20%20/imdb/" + mediaDetail.external_ids.imdb_id + "";
            // let trailersToUrl = "https://Trailers.to/video/embed%20%20%20%20%20%20%20%20%20%20%20/imdb/" + mediaDetail.external_ids.imdb_id + "";
            let trailersToUrl = "https://Trailers.to/player/embed/imdb/" + mediaDetail.external_ids.imdb_id + "";
            //let trailersToUrl = "https://Trailers.to/video/embed%20%20%20%20%20%20%20%20%20%20%20/imdb/tt6264654" + mediaDetail.external_ids.imdb_id + "";
            //localStorage.setItem('vidSrcUrl', vidSrcUrl);
            // localStorage.setItem('vidCloudUrl', vidCloudUrl);
            //chromtrailersToUrl;
            localStorage.setItem('dbgoUrl', dbgoUrl);
            localStorage.setItem('movies123Url', movies123Url);
            localStorage.setItem('firesonicUrl', firesonicUrl);
            localStorage.setItem('oneMoviesUrl', oneMoviesUrl);

            localStorage.setItem('twoEmbUrl', twoEmbUrl);
            let vidTitle = mediaDetail.title + " - LetMeWatch";
            localStorage.setItem('vidTitle', vidTitle);
            chrome.storage.local.set({ 'savedSummary': document.getElementById("summary").outerHTML });
            chrome.storage.local.set({ 'savedPopup': document.getElementById("popupBody").innerHTML });
            localStorage.setItem('lastWatchedType', "movie");
            /*let trailersTabID;
            let trailersTabURL;
            chrome.tabs.create({ url: trailersToUrl, active: false },
                function(tab) {
                    trailersTabID = tab.id;
                }
            );

            window.setTimeout(function() {
                chrome.tabs.get(trailersTabID, async(tab) => {
                    trailersToUrl = "https://s0" + tab.url.substring(10);
                    localStorage.setItem('trailersToUrl', trailersToUrl);
                    //trailersToUrl = "https://s0" + trailersToUrl.substring(10);
                    chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
                });

                //titleVideo.contentWindow.location.href = trailersToUrl;
                //titleVideo.src = titleVideo.contentWindow.location.href;
            }, 1000);
            */
            localStorage.setItem('trailersToUrl', trailersToUrl);

            chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
            /*
                                    chrome.tabs.query({ active: true, currentWindow: true },
                                        function(tab) {
                                            trailersToUrl = (tab.url);

                                            trailersToUrl = "https://s0" + trailersToUrl.substring(10);
                                            localStorage.setItem('trailersToUrl', trailersToUrl);
                                            chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });

                                        }
                                    );*/
            //chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
            /*(async() => {
                const tab = await chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
                const tabId = tab.id;
                if (!tab.url) await onTabUrlUpdated(tabId);
                const results = await chrome.scripting.executeScript({
                    target: { tabId },
                    files: ['js/adstop.js'],
                });
                chrome.tabs.sendMessage(tabId, { msg: 'analysis background' }, res => {
                    port.postMessage(res);
                    chrome.tabs.remove(tabId);
                });
            })();

            function onTabUrlUpdated(tabId) {
                return new Promise((resolve, reject) => {
                    const onUpdated = (id, info) => id === tabId && info.url && done(true);
                    const onRemoved = id => id === tabId && done(false);
                    chrome.tabs.onUpdated.addListener(onUpdated);
                    chrome.tabs.onRemoved.addListener(onRemoved);

                    function done(ok) {
                        chrome.tabs.onUpdated.removeListener(onUpdated);
                        chrome.tabs.onRemoved.removeListener(onRemoved);
                        (ok ? resolve : reject)();
                    }
                });
            }*/
        });
    } else if (mediaType === "tv") {
        let plotNumLines = ((document.getElementById("description").offsetHeight) - 9) / (19);
        let tvDetail = mediaDetail;
        let sznButts = document.getElementsByClassName("seasons");
        let numSzn = parseInt(tvDetail.number_of_seasons);

        let numNxtButt = (numSzn / 5) + 1;
        console.log("" + plotNumLines);
        for (let i = 0; i < sznButts.length; i++) {
            sznButts[i].style.position = "absolute";
            sznButts[i].style.bottom = "18px";
        }

        logoSummary.setAttribute('id', 'logoSummaryTV');
        if (tvDetail.last_air_date && tvDetail.first_air_date) {
            document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + '-' + tvDetail.last_air_date.substring(0, 4);
        } else if (tvDetail.first_air_date) {
            document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + '-';
        } else {
            document.getElementById("currSzn").innerText = ``;
        }
        if (numSzn % 5 != 0) {
            numNxtButt++;
        }
        for (let i = 0; i < numNxtButt; i++) {
            let nxtButton = document.getElementById("nxt" + i);
            if (nxtButton) {
                nxtButton.addEventListener("click", () => {
                    document.getElementById("seasonButtons" + i).style.display = 'none';
                    if (document.getElementById("seasonButtons" + (i + 1))) {
                        document.getElementById("seasonButtons" + (i + 1)).style.display = 'block';
                    } else {
                        document.getElementById("seasonButtons0").style.display = 'block';
                    }
                });
            }
        }
        for (let i = 1; i <= numSzn; i++) { //add season button event handlers
            let sznButton = document.getElementById("szn" + i);
            if (sznButton) {
                sznButton.addEventListener("click", () => {
                    //once season is clicked/selected, change summary screen to 
                    //load episodes and change various elements

                    let currSeason = document.getElementById('currSzn');
                    currSeason.innerText = "Season " + i;
                    let prevSubHeader = document.getElementById("tvSubhead").innerHTML;
                    sznButton.parentElement.style.display = 'none';
                    document.getElementById("backButton").style.display = 'none';
                    document.getElementById("logoSummaryTV").style.display = 'none';
                    onSeasonSelect(tvDetail, i, document.querySelector('.episodes'));
                    localStorage.setItem("lastSubhead", prevSubHeader);
                    console.log("height: " + document.getElementById("tvTitleSumm").offsetHeight);
                    console.log("CAheight: " + document.getElementById("contentArticle").offsetHeight);

                    if (parseInt(document.getElementById("tvTitleSumm").offsetHeight) > 28) {
                        console.log("suh=d")
                        document.getElementById("contentArticle").style.height = "240px";
                    }
                    console.log("height: " + document.getElementById("tvTitleSumm").offsetHeight);
                    console.log("CAheight: " + document.getElementById("contentArticle").offsetHeight);


                    //add new back button to go back to season screen when clicked
                    //instead of search starting screen
                    if (document.getElementById("Ep1")) {
                        document.getElementById("Ep1").focus();
                    }

                    if (document.body.contains(document.getElementById("logoSummaryTVSzn"))) {
                        console.log("hereagain");
                        document.getElementById("logoSummaryTVSzn").style.display = 'flex';
                        document.getElementById("backButtonSzn").style.display = 'inline-block';
                        //document.getElementById("logoSummaryTV").style.display = 'none';
                        //document.getElementById("backButton").style.display = 'none';
                    } else {
                        console.log("hereagain2");

                        let backButtonSzn = document.createElement("button");
                        let logoSummaryTVSzn = document.getElementById("logoHeader").cloneNode(true);
                        backButtonSzn.setAttribute('id', 'backButtonSzn');
                        backButtonSzn.setAttribute('class', 'pill-back');
                        logoSummaryTVSzn.setAttribute('id', 'logoSummaryTVSzn');
                        logoSummaryTVSzn.setAttribute('class', 'content');

                        document.getElementById("summary").insertBefore(backButtonSzn, document.getElementById("contentArticle"));
                        document.getElementById("summary").insertBefore(logoSummaryTVSzn, document.getElementById("contentArticle"));
                        backButtonSzn.addEventListener('click', () => {
                            document.getElementById("autocomplete").style.display = 'none';
                            document.getElementById("logoSummaryTVSzn").style.display = 'none';
                            document.getElementById("backButtonSzn").style.display = 'none';
                            document.getElementById("summary").style.display = 'block';
                            if (tvDetail.last_air_date) {
                                document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + ' - ' + tvDetail.last_air_date.substring(0, 4);
                            } else {
                                document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + ' - ';
                            }

                            if (parseInt(document.getElementById("tvTitleSumm").offsetHeight) > 28) {
                                console.log("suh=d")
                                document.getElementById("contentArticle").style.height = "220px";
                            }
                            document.getElementById("contentArticle").style.minWidth = "515px";
                            sznButton.parentElement.style.display = 'block';
                            document.querySelector(".episodes").innerHTML = ``;
                            document.getElementById("tvSubhead").innerHTML = prevSubHeader;
                            document.querySelector('figure .image img').style.height = '190px';
                            document.getElementById("description").innerText = tvDetail.overview;
                            document.getElementById("backButton").style.display = 'inline-block';
                            document.getElementById("logoSummaryTV").style.display = 'flex';
                        });
                    }
                });
                /*sznButton.addEventListener('keydown', event => {
                    event.preventDefault();
                    if (event.key === "ArrowDown") {
                        var currActive = document.activeElement;
                        if (currActive.nextElementSibling) {
                            currActive.nextElementSibling.focus();
                        } else {
                            resultsWrapper.firstElementChild.focus();
                        }
                    }
                    if (event.key === "ArrowUp") {
                        var currActive = document.activeElement;
                        if (currActive.previousElementSibling) {
                            console.log("prev sibling");
                            currActive.previousElementSibling.focus();
                        } else {
                            resultsWrapper.lastElementChild.focus();
                        }
                    } else if (event.key === "Enter") {
                        onSeasonSelect(tvDetail, i, document.querySelector('.episodes'));
                    }

                });*/
            }
        }
        console.log("height: " + document.getElementById("tvTitleSumm").offsetHeight);
        console.log("CAheight: " + document.getElementById("contentArticle").offsetHeight);
        if (parseInt(document.getElementById("tvTitleSumm").offsetHeight) > 28) {
            console.log("suh=d")
            document.getElementById("contentArticle").style.height = "220px"
        }
        console.log("height: " + document.getElementById("tvTitleSumm").offsetHeight);
        console.log("CAheight: " + document.getElementById("contentArticle").offsetHeight);
        console.log(document.getElementById("contentArticle").innerHTML);

    } else {
        let sportsButton1 = document.getElementById("sportsButton1");
        //serverButt.style.width = "175px";
        let sportsOptions1 = document.getElementById("sportsOptions1");
        sportsButton1.addEventListener('click', () => {
            if (sportsOptions1.style.display == "none") {
                sportsOptions1.style.display = "block";
            } else {
                sportsOptions1.style.display = "none";
            }
        });

        let sportsButton2 = document.getElementById("sportsButton2");
        //serverButt.style.width = "175px";
        let sportsOptions2 = document.getElementById("sportsOptions2");
        sportsButton2.addEventListener('click', () => {
            if (sportsOptions2.style.display == "none") {
                sportsOptions2.style.display = "block";
            } else {
                sportsOptions2.style.display = "none";
            }
        });


        console.log("hii");
    }
};

const onSeasonSelect = async(tvDetail, numSzn, summaryElement) => {

    //get tmdb tvShow season & episodes from tmdbID
    const tmdbResponse = await axios.get('https://api.themoviedb.org/3/tv/' + tvDetail.id + '/season/' + numSzn + '?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US');
    const tmdbID = tvDetail.id;
    const epiCount = tmdbResponse.data.episodes;
    let description = ``;
    if (epiCount.length > 10) {

        var numEpScreens = 0;
        if (epiCount.length % 10 != 0) {
            numEpScreens = parseInt((epiCount.length / 10) + 1);
        } else {
            numEpScreens = parseInt((epiCount.length / 10));
        }
        console.log(numEpScreens);
        for (let currEpScr = 0; currEpScr < numEpScreens; currEpScr++) {
            if (currEpScr > 0) {
                description += `
                        <article class="episodeHolder" id="episodeButtons${currEpScr}" style="display:none;">
                    `;
            } else {
                description += `
                        <article class="episodeHolder" id="episodeButtons${currEpScr}">
                    `;
            }

            for (let i = 1 + (10 * currEpScr); i <= (10 * currEpScr) + 5; i++) {
                if (i <= epiCount.length) {
                    if (i > 9) {
                        description += `      
                                <button class="pill-eps" id="Ep` + i + `" tabindex="0" style="padding:10px 17px">E${i}</button>
                        `;
                    } else {
                        description += `      
                                    <button class="pill-eps" id="Ep` + i + `" tabindex="0">E${i}</button>
                        `;
                    }
                }
            }
            description += `      
                                <button class="pill-nxtep" id="nxtEp${currEpScr}" tabindex="0"></button>
                            
                `;

            for (let i = 6 + (10 * currEpScr); i <= (10 * currEpScr) + 10; i++) {
                if (i <= epiCount.length) {
                    if (i > 9) {
                        description += `      
                                    <button class="pill-eps" id="Ep` + i + `" tabindex="0" style="padding:10px 17px">E${i}</button>
                            `;
                    } else {
                        description += `      
                                    <button class="pill-eps" id="Ep` + i + `" tabindex="0" >E${i}</button>
                            `;
                    }
                }
            }
            description += `
                    </article>
            `;
        }
    } else {
        description += `
                        <article class="episodeHolder" id="episodeButtons">
            `;
        for (let i = 1; i <= epiCount.length; i++) {
            description += `
                <button class="pill-eps" id="Ep` + i + `">E${i}</button>
                `;
        }
        description += `
                        </article>
            `
    }

    summaryElement.innerHTML = description;
    let lastEps = document.getElementById("allEps");
    if ((lastEps.lastElementChild.childElementCount) < 6) {
        lastEps.lastElementChild.style.position = 'absolute';
        lastEps.lastElementChild.style.bottom = '41px';
        lastEps.lastElementChild.lastElementChild.style.left = "320px";
        lastEps.lastElementChild.lastElementChild.style.marginTop = "6px";
        //document.getElementById("ds").style.mar
    }

    //initialize sznVars
    var numNxtEpiButt = epiCount.length / 10;
    if (epiCount.length % 10 != 0) {
        numNxtEpiButt++;
    }
    for (let i = 0; i < numNxtEpiButt; i++) {
        let nxtButton = document.getElementById("nxtEp" + i);
        if (nxtButton) {
            nxtButton.addEventListener("click", () => {

                if (document.getElementById("episodeButtons" + (i + 1))) {
                    document.getElementById("episodeButtons" + i).style.display = 'none';
                    document.getElementById("episodeButtons" + (i + 1)).style.display = 'inline-block';
                } else {
                    document.getElementById("episodeButtons" + i).style.display = 'none';
                    document.getElementById("episodeButtons0").style.display = 'inline-block';
                }
            });
        }
    }
    document.querySelector('figure .image img').style.height = "215px";
    document.getElementById("contentArticle").style.minWidth = "515px";
    console.log(tvDetail.external_ids);
    let rating = parseInt(tvDetail.vote_average, 10);
    let filled = Math.floor(rating / 2)
    let ratingStars = "";
    for (let i = 0; i < 5; i++) {
        if (i >= filled) {
            if (i == filled && rating % 2 != 0) {
                ratingStars += `<span class="fa fa-star-half-full checked"></span>`;
            } else {
                ratingStars += `<span class="fa fa-star-o checked"></span>`;
            }
        } else {
            ratingStars += `<span class="fa fa-star checked"></span>`;
        }
    }
    document.getElementById("tvSubhead").innerHTML = ratingStars;
    document.getElementById("tvSubhead").innerText += "Episode 1: " + epiCount[0].name + "\nReleased: " + epiCount[0].air_date + "";
    for (let i = 1; i <= epiCount.length; i++) {
        let currEpisodeButton = document.getElementById("Ep" + i);
        currEpisodeButton.addEventListener("click", function() {
            // let currEpsPageSummary = $("#summary").clone(true);
            //console.log(currEpsPageSummary.innerHTML);
            //chrome.storage.local.set({ "savedPage": currEpsPageSummary });
            currEpisodeButton.style = 'background-image:linear-gradient( 136deg, #363636dc 10%, #c1c1c1 100%);'
                //document.getElementById("tvSubhead").innerText += " (Watched)";

            let twoEmbUrl = "https://www.2embed.ru/embed/imdb/tv?id=" + tvDetail.external_ids.imdb_id + "&s=" + numSzn + "&e=" + i + "";
            let vidSrcUrl = "https://vidsrc.me/embed/" + tvDetail.external_ids.imdb_id + "/" + numSzn + "-" + i + "/";
            // let vidCloudUrl = "https://vidclouds.us/tv.php?imdb=" + tvDetail.external_ids.imdb_id + "&season=" + numSzn + "&episode=" + i + "";
            let dbgoUrl = "https://dbgo.fun/imdbse.php?id=" + tvDetail.external_ids.imdb_id + "&s=" + numSzn + "&e=" + i;
            let movies123Url = "https://api.123movie.cc/tmdb_api.php?se=" + numSzn + "&ep=" + i + "&tmdb=" + tmdbID + "&server_name=vcu";
            let firesonicUrl = "N/A";
            let oneMoviesUrl = "https://1movietv.com/playstream/" + tmdbID + "-" + numSzn + "-" + i + "";
            // let trailersToUrl = "https://Trailers.to/video/embed%20%20%20%20%20%20%20%20%20%20%20/imdb/" + tvDetail.external_ids.imdb_id + "";
            let trailersToUrl = "https://Trailers.to/player/embed/imdb/" + tvDetail.external_ids.imdb_id + "/S" + numSzn + "E" + i + "";

            localStorage.setItem('twoEmbUrl', twoEmbUrl);
            //localStorage.setItem('vidSrcUrl', vidSrcUrl);
            //localStorage.setItem('vidCloudUrl', vidCloudUrl);
            localStorage.setItem('dbgoUrl', dbgoUrl);
            localStorage.setItem('movies123Url', movies123Url);
            localStorage.setItem('firesonicUrl', firesonicUrl);
            localStorage.setItem('oneMoviesUrl', oneMoviesUrl);

            let vidTitle = "S" + numSzn + "E" + i + " " + tvDetail.name + " - LetMeWatch";
            localStorage.setItem('vidTitle', vidTitle);
            localStorage.setItem('lastWatchedEps', JSON.stringify(epiCount));
            localStorage.setItem('lastWatched', JSON.stringify(tvDetail));
            localStorage.setItem('lastWatchedIMDB', JSON.stringify(tvDetail.external_ids.imdb_id));
            chrome.storage.local.set({ 'savedSummary': document.getElementById("summary").outerHTML });
            chrome.storage.local.set({ 'savedPopup': document.getElementById("popupBody").innerHTML });
            localStorage.setItem('lastWatchedSzn', numSzn + "");
            localStorage.setItem('lastWatchedType', "tv");

            localStorage.setItem('trailersToUrl', trailersToUrl);
            chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });

            //chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
            /*(async() => {
                const tab = await chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
                const tabId = tab.id;
                if (!tab.url) await onTabUrlUpdated(tabId);
                const results = await chrome.scripting.executeScript({
                    target: { tabId },
                    files: ['js/adstop.js'],
                });
                chrome.tabs.sendMessage(tabId, { msg: 'analysis background' }, res => {
                    port.postMessage(res);
                    chrome.tabs.remove(tabId);
                });
            })();

            function onTabUrlUpdated(tabId) {
                return new Promise((resolve, reject) => {
                    const onUpdated = (id, info) => id === tabId && info.url && done(true);
                    const onRemoved = id => id === tabId && done(false);
                    chrome.tabs.onUpdated.addListener(onUpdated);
                    chrome.tabs.onRemoved.addListener(onRemoved);

                    function done(ok) {
                        chrome.tabs.onUpdated.removeListener(onUpdated);
                        chrome.tabs.onRemoved.removeListener(onRemoved);
                        (ok ? resolve : reject)();
                    }
                });
            }*/
            document.getElementById("tvSubhead").innerText += " (Watched)";

        });
        currEpisodeButton.addEventListener("mouseover", function() {
            document.getElementById("tvSubhead").innerHTML = ``;
            document.getElementById("tvSubhead").innerText += "Episode " + (i) + ": " + epiCount[i - 1].name + "\nReleased: " + epiCount[i - 1].air_date + "";
            document.getElementById("description").innerText = epiCount[i - 1].overview;
        });
    }

};

chrome.storage.local.get('savedSummary', function(items) {
    createAutoComplete({
        ...autoCompleteConfig,
        root: document.querySelector('#autocomplete'),

        onOptionSelect(media) {
            onMediaSelect(media, document.querySelector('#summary'));
        },
    });
    console.log("here5");
    if (items['savedSummary']) { //means there is prev watched tv/movie
        console.log("saved");
        if (localStorage.getItem('lastWatchedType') === 'movie') {
            console.log("saved - movie");
            document.getElementById("summary").outerHTML = items['savedSummary'];
            document.getElementById("autocomplete").style.display = "none";
            const backButton = document.getElementById("backButton");
            backButton.addEventListener('click', () => {
                document.getElementById("autocomplete").style.display = "block";
                document.getElementById("summary").style.display = 'none';
                document.querySelector('input').focus();
                document.querySelector('input').select();
                //chrome.storage.local.clear();
                chrome.storage.local.remove('savedSummary');
            });
            let watchNowButton = document.getElementById("watchNow");
            watchNowButton.addEventListener("click", function() {
                let vidTitle = document.getElementById("movieTitle").innerText + " - LetMeWatch";
                localStorage.setItem('vidTitle', vidTitle);
                chrome.storage.local.set({ 'savedSummary': document.getElementById("summary").outerHTML });
                chrome.storage.local.set({ 'vidUrl': vidUrl });
                //chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
                /*(async() => {
                    const tab = await chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
                    const tabId = tab.id;
                    if (!tab.url) await onTabUrlUpdated(tabId);
                    const results = await chrome.scripting.executeScript({
                        target: { tabId },
                        files: ['js/adstop.js'],
                    });
                    chrome.tabs.sendMessage(tabId, { msg: 'analysis background' }, res => {
                        port.postMessage(res);
                        chrome.tabs.remove(tabId);
                    });
                })();

                function onTabUrlUpdated(tabId) {
                    return new Promise((resolve, reject) => {
                        const onUpdated = (id, info) => id === tabId && info.url && done(true);
                        const onRemoved = id => id === tabId && done(false);
                        chrome.tabs.onUpdated.addListener(onUpdated);
                        chrome.tabs.onRemoved.addListener(onRemoved);

                        function done(ok) {
                            chrome.tabs.onUpdated.removeListener(onUpdated);
                            chrome.tabs.onRemoved.removeListener(onRemoved);
                            (ok ? resolve : reject)();
                        }
                    });
                }*/
            });
        } else if (localStorage.getItem('lastWatchedType') === 'tv') {
            console.log("saved - tv");

            const epiCount = JSON.parse(localStorage.getItem('lastWatchedEps'));
            const tvDetail = JSON.parse(localStorage.getItem('lastWatched'));
            const tvIMDB = JSON.parse(localStorage.getItem('lastWatchedIMDB'));
            const lastSub = localStorage.getItem('lastSubhead');
            const numSzn = localStorage.getItem('lastWatchedSzn');

            //document.getElementById("backButton").style.display = 'none';
            //document.getElementById("logoSummaryTV").style.display = 'none';
            document.getElementById("summary").outerHTML = items['savedSummary'];


            document.getElementById("autocomplete").style.display = "none";

            var numNxtEpiButt = epiCount.length / 10;
            if (epiCount.length % 10 != 0) {
                numNxtEpiButt++;
            }
            for (let i = 0; i < numNxtEpiButt; i++) {
                let nxtButton = document.getElementById("nxtEp" + i);
                if (nxtButton) {
                    nxtButton.addEventListener("click", () => {

                        if (document.getElementById("episodeButtons" + (i + 1))) {
                            document.getElementById("episodeButtons" + i).style.display = 'none';
                            document.getElementById("episodeButtons" + (i + 1)).style.display = 'inline-block';
                        } else {
                            document.getElementById("episodeButtons" + i).style.display = 'none';
                            document.getElementById("episodeButtons0").style.display = 'inline-block';
                        }
                    });
                }
            }

            let sznButton = document.getElementById("szn" + numSzn);
            let backButtonSzn = document.getElementById("backButtonSzn");
            backButtonSzn.addEventListener('click', () => {
                document.getElementById("autocomplete").style.display = 'none';
                document.getElementById("logoSummaryTVSzn").style.display = 'none';
                document.getElementById("backButtonSzn").style.display = 'none';
                document.getElementById("summary").style.display = 'block';
                if (tvDetail.last_air_date) {
                    document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + ' - ' + tvDetail.last_air_date.substring(0, 4);
                } else {
                    document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + ' - ';
                }

                if (parseInt(document.getElementById("tvTitleSumm").offsetHeight) > 28) {
                    console.log("suh=d")
                    document.getElementById("contentArticle").style.height = "220px";
                }
                document.getElementById("contentArticle").style.minWidth = "515px";
                sznButton.parentElement.style.display = 'block';
                document.querySelector(".episodes").innerHTML = ``;
                document.getElementById("tvSubhead").innerHTML = lastSub;
                document.querySelector('figure .image img').style.height = '190px';
                document.getElementById("description").innerText = tvDetail.overview;
                document.getElementById("summary").removeChild(document.getElementById("backButton"));
                document.getElementById("summary").removeChild(document.getElementById("logoSummaryTV"));
                addEventListeners("tv", tvDetail);

            });
            for (let i = 1; i <= epiCount.length; i++) {
                let currEpisodeButton = document.getElementById("Ep" + i);
                currEpisodeButton.addEventListener("click", function() {
                    currEpisodeButton.style = 'background-image:linear-gradient( 136deg, #363636dc 10%, #c1c1c1 100%);'

                    let twoEmbUrl = "https://www.2embed.ru/embed/imdb/tv?id=" + tvIMDB + "&s=" + numSzn + "&e=" + i + "";
                    let vidSrcUrl = "https://vidsrc.me/embed/" + tvIMDB + "/" + numSzn + "-" + i + "/";
                    let dbgoUrl = "https://dbgo.fun/imdbse.php?id=" + tvIMDB + "&s=" + numSzn + "&e=" + i;
                    let trailersToUrl = "https://Trailers.to/player/embed/imdb/" + tvIMDB + "/S" + numSzn + "E" + i + "";
                    //let vidUrl = "https://firesonic.sc/play_video.php?video_id=" + tvIMDB + "&s=" + numSzn + "&e=" + i + "";
                    localStorage.setItem('twoEmbUrl', twoEmbUrl);
                    localStorage.setItem('vidSrcUrl', vidSrcUrl);
                    localStorage.setItem('dbgoUrl', dbgoUrl);

                    let vidTitle = "S" + numSzn + "E" + i + " " + document.getElementById("tvTitleSumm").innerText + " - LetMeWatch";
                    localStorage.setItem('vidTitle', vidTitle);
                    chrome.storage.local.set({ 'savedSummary': document.getElementById("summary").outerHTML });
                    localStorage.setItem('lastWatchedType', "tv");

                    localStorage.setItem('trailersToUrl', trailersToUrl);
                    chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
                    //chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
                    /*(async() => {
                        const tab = await chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
                        const tabId = tab.id;
                        if (!tab.url) await onTabUrlUpdated(tabId);
                        const results = await chrome.scripting.executeScript({
                            target: { tabId },
                            files: ['js/adstop.js'],
                        });
                        chrome.tabs.sendMessage(tabId, { msg: 'analysis background' }, res => {
                            port.postMessage(res);
                            chrome.tabs.remove(tabId);
                        });
                    })();

                    function onTabUrlUpdated(tabId) {
                        return new Promise((resolve, reject) => {
                            const onUpdated = (id, info) => id === tabId && info.url && done(true);
                            const onRemoved = id => id === tabId && done(false);
                            chrome.tabs.onUpdated.addListener(onUpdated);
                            chrome.tabs.onRemoved.addListener(onRemoved);

                            function done(ok) {
                                chrome.tabs.onUpdated.removeListener(onUpdated);
                                chrome.tabs.onRemoved.removeListener(onRemoved);
                                (ok ? resolve : reject)();
                            }
                        });
                    }*/
                    document.getElementById("tvSubhead").innerText += " (Watched)";
                });
                currEpisodeButton.addEventListener("mouseover", function() {
                    document.getElementById("tvSubhead").innerHTML = ``;
                    document.getElementById("tvSubhead").innerText += "Episode " + (i) + ": " + epiCount[i - 1].name + "\nReleased: " + epiCount[i - 1].air_date + "";
                    document.getElementById("description").innerText = epiCount[i - 1].overview;
                });
            }
        }
    } else {
        console.log("hello12");
    }
    console.log("here13");

});

/*onSeasonSelect(tvDetail, numSzn, document.getElementById(".episodes"));     
            document.getElementById("backButton").style.display = 'none';
            document.getElementById("logoSummaryTV").style.display = 'none';
            onSeasonSelect(tvDetail, numSzn, document.querySelector('.episodes'));
            let backButtonSzn = document.getElementById("backButtonSzn");
            let sznButton = document.getElementById("szn" + numSzn);
            backButtonSzn.addEventListener('click', () => {
                //setTemplate("tv", 100000, document.getElementById("summary"), tvDetail);
                addEventListeners("tv", tvDetail);
               document.getElementById("autocomplete").style.display = 'none';
                document.getElementById("logoSummaryTVSzn").style.display = 'none';
                document.getElementById("backButtonSzn").style.display = 'none';
                document.getElementById("summary").style.display = 'block';
                if (tvDetail.last_air_date) {
                    document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + ' - ' + tvDetail.last_air_date.substring(0, 4);
                } else {
                    document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + ' - ';
                }

                if (parseInt(document.getElementById("tvTitleSumm").offsetHeight) > 28) {
                    console.log("suh=d")
                    document.getElementById("contentArticle").style.height = "220px";
                }
                document.getElementById("contentArticle").style.minWidth = "500px";
                sznButton.parentElement.style.display = 'block';
                document.querySelector(".episodes").innerHTML = ``;
                document.getElementById("tvSubhead").innerHTML = prevSubHeader;
                document.querySelector('figure .image img').style.height = '190px';
                document.getElementById("description").innerText = tvDetail.overview;
                document.getElementById("backButton").style.display = 'inline-block';
                document.getElementById("logoSummaryTV").style.display = 'inline-flex';
            });
            // addEventListeners("tv", tvDetail);
            //document.removeChild(document.getElementById("backButton"));
            //document.removeChild(document.getElementById("logoSummaryTV"));
            addEventListeners("tv", tvDetail);
            var numNxtEpiButt = epiCount.length / 10;
            if (epiCount.length % 10 != 0) {
                numNxtEpiButt++;
            }
            for (let i = 0; i < numNxtEpiButt; i++) {
                let nxtButton = document.getElementById("nxtEp" + i);
                if (nxtButton) {
                    nxtButton.addEventListener("click", () => {

                        if (document.getElementById("episodeButtons" + (i + 1))) {
                            document.getElementById("episodeButtons" + i).style.display = 'none';
                            document.getElementById("episodeButtons" + (i + 1)).style.display = 'inline-block';
                        } else {
                            document.getElementById("episodeButtons" + i).style.display = 'none';
                            document.getElementById("episodeButtons0").style.display = 'inline-block';
                        }
                    });
                }
            }

            for (let i = 1; i <= epiCount.length; i++) {
                let currEpisodeButton = document.getElementById("Ep" + i);
                currEpisodeButton.addEventListener("click", function() {
                    let twoEmbUrl = "https://www.2embed.ru/embed/imdb/tv?id=" + tvIMDB + "&s=" + numSzn + "&e=" + i + "";
                    let vidSrcUrl = "https://vidsrc.me/embed/" + tvIMDB + "/" + numSzn + "-" + i + "/";
                    //let vidUrl = "https://firesonic.sc/play_video.php?video_id=" + tvIMDB + "&s=" + numSzn + "&e=" + i + "";
                    localStorage.setItem('twoEmbUrl', twoEmbUrl);
                    localStorage.setItem('vidSrcUrl', vidSrcUrl);
                    let vidTitle = document.getElementById("tvTitleSumm").innerText + " S" + numSzn + "E" + i + " - LetMeWatch";
                    localStorage.setItem('vidTitle', vidTitle);
                    chrome.storage.local.set({ 'savedSummary': document.getElementById("summary").outerHTML });
                    localStorage.setItem('lastWatchedType', "tv");
                    chrome.tabs.create({ url: chrome.runtime.getURL("../viewPage.html") });
                });
                currEpisodeButton.addEventListener("mouseover", function() {
                    document.getElementById("tvSubhead").innerHTML = ``;
                    document.getElementById("tvSubhead").innerText += "Episode " + (i) + ": " + epiCount[i - 1].name + "\nReleased: " + epiCount[i - 1].air_date + "";
                    document.getElementById("description").innerText = epiCount[i - 1].overview;
                });
            }
            let backButtonSzn = document.getElementById("backButtonSzn");
            let sznButton = document.getElementById("szn" + numSzn);
            backButtonSzn.addEventListener('click', () => {
                document.getElementById("autocomplete").style.display = 'none';
                document.getElementById("logoSummaryTVSzn").style.display = 'none';
                document.getElementById("backButtonSzn").style.display = 'none';
                document.getElementById("summary").style.display = 'block';
                if (tvDetail.last_air_date) {
                    document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + ' - ' + tvDetail.last_air_date.substring(0, 4);
                } else {
                    document.getElementById("currSzn").innerText = '' + tvDetail.first_air_date.substring(0, 4) + ' - ';
                }
                if (parseInt(document.getElementById("tvTitleSumm").offsetHeight) > 28) {
                    console.log("suh=d")
                    document.getElementById("contentArticle").style.height = "220px";
                }
                document.getElementById("contentArticle").style.minWidth = "500px";
                sznButton.parentElement.style.display = 'block';
                document.querySelector(".episodes").innerHTML = ``;
                document.getElementById("tvSubhead").innerHTML = lastSub;
                document.querySelector('figure .image img').style.height = '190px';
                document.getElementById("description").innerText = tvDetail.overview;
                document.getElementById("backButton").style.display = 'none';
                document.getElementById("logoSummaryTV").style.display = 'none';
                addTVEvList(tvDetail);
                //addEventListeners("tv", tvDetail);
            });
            const backButton = document.getElementById("backButton");
            backButton.addEventListener('click', () => {
                document.getElementById("autocomplete").style.display = "block";
                document.getElementById("summary").style.display = 'none';
                document.querySelector('input').focus();
                document.querySelector('input').select();
                //  chrome.storage.local.clear();
                chrome.storage.local.remove('savedSummary');

            });

        }
    } else {
        console.log("hello12");
    }
    console.log("here13");

});*/

/*var popShows;
var popMovies;
var popMovieArr;
var popShowArr;
var acElems;
loadStored(function(items) {
    popMovies = items.savedPopMovies;
    popShows = items.savedPopShows;
    popMovieArr = items.pmArr;
    popShowArr = items.psArr;

});

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#autocomplete'),

    onOptionSelect(media) {
        onMediaSelect(media, document.querySelector('#summary'));
    },
});
//let savedHTMLPage;
chrome.storage.local.get('savedPage', (items) => {

    if (items.savedPage) {
        console.log("saved a page");
        console.log(Object.keys(items.savedPage));
        console.log(Object.keys(items['savedPage']));
        console.log(Object.entries(items.savedPage));
        console.log(Object.entries(items['savedPage']));
        //console.log(items['savedPage']);
        //savedHTMLPage = items.savedPage;
    } else {
        console.log("didn't save a page");

        createAutoComplete({
            ...autoCompleteConfig,
            root: document.querySelector('#autocomplete'),

            onOptionSelect(media) {
                onMediaSelect(media, document.querySelector('#summary'));
            },
        });
    }
});*/

/*chrome.storage.local.get('savedSummary', function(items) {
    if (items['savedSummary']) {
        if (localStorage.getItem('lastWatchedType') === 'movie') {

        } else if (localStorage.getItem('lastWatchedType') === 'tv') {

        }
    } else {
        createAutoComplete({
            ...autoCompleteConfig,
            root: document.querySelector('#autocomplete'),

            onOptionSelect(media) {
                onMediaSelect(media, document.querySelector('#summary'));
            },
        });
    }
});
*/