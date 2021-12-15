const createAutoComplete = async({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = ` 
    <div id="logoHeader"> 
        <img src="/images/LMWlogo.png"></img>
        <h1 id="appName">LetMeWatch</h1>
    </div>
    <input id= "inpSugg" class="input" autofocus tabindex="0" placeholder="Search for a movie or TV show..."> </input>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    <article class="popular" id="popMovies" style="display:none">
        <!--button class="pill-watchType" id="movieChoice" tabindex="0">Movies</button>
        <button class="pill-watchType" id="tvChoice" tabindex="0">TV Shows</button>
        <button class="pill-watchType" id="sportsChoice" tabindex="0">Sports</button-->
        <div style="display:flex;padding-bottom:4px;margin-left:44%;">
            <li id="tvSuggButt" data-automationid="globalnav-tv" class="NavBar__item NavBar__item--selected typeSuggestButt" role="menuitem">TV</li>
            <li id="movieSuggButt" data-automationid="globalnav-tv" class="NavBar__item NavBar__item--selected typeSuggestButt" role="menuitem">Movies</li>
            <!--li id="sportsSuggButt" data-automationid="globalnav-tv" class="NavBar__item NavBar__item--selected typeSuggestButt" role="menuitem" style="display:none">Sports</li>
            <li id="sportsSuggButt" data-automationid="globalnav-tv" class="NavBar__item NavBar__item--selected typeSuggestButt" role="menuitem">Sports</li-->
        </div>
        <div class="scrollmenu" id="pmScroll" style="display:none"></div>
        <div class="scrollmenu" id="psScroll"></div>
        <div class="scrollmenu" id="spScroll" style="display:none"></divs>
    </article>   
    <!--article class="popular" id="popShows"  style="display:none">
        <h1>Trending ~ TV Shows</h1>
        
    </article-->   
`;
    const popMovies = (await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=1')).data.results;
    const popMoviesTwo = (await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=2')).data.results;
    const popMoviesThree = (await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=3')).data.results;
    const popShows = (await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=1')).data.results;
    const popShowsTwo = (await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=2')).data.results;
    const popShowsThree = (await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=04c908115dc6ff5e5aa3709b5a735393&language=en-US&page=3')).data.results;
    // const popSports = (await fetch())
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    for (let i = 0; i < 20; i++) {
        let currPM = popMovies[i];
        let currPS = popShows[i];

        const pmElem = document.createElement('a');
        pmElem.classList.add('scrollmenu-item');
        pmElem.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${currPM.poster_path}" style="height:250px;" />`;
        pmElem.addEventListener('click', () => {
            input.value = inputValue(currPM);
            document.querySelector('html').style.height = 'auto';
            onOptionSelect(currPM);

        });
        document.getElementById("pmScroll").appendChild(pmElem);

        const psElem = document.createElement('a');
        psElem.classList.add('scrollmenu-item');
        psElem.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${currPS.poster_path}" style="height:250px;" />`;
        psElem.addEventListener('click', () => {
            input.value = inputValue(currPS);
            document.querySelector('html').style.height = 'auto';
            onOptionSelect(currPS);
        });
        document.getElementById("psScroll").appendChild(psElem);
    }
    for (let i = 0; i < 20; i++) {
        let currPM = popMoviesTwo[i];
        let currPS = popShowsTwo[i];

        const pmElem = document.createElement('a');
        pmElem.classList.add('scrollmenu-item');
        pmElem.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${currPM.poster_path}"  style="height:250px;"/>`;
        pmElem.addEventListener('click', () => {
            input.value = inputValue(currPM);
            document.querySelector('html').style.height = 'auto';
            onOptionSelect(currPM);

        });
        document.getElementById("pmScroll").appendChild(pmElem);

        const psElem = document.createElement('a');
        psElem.classList.add('scrollmenu-item');
        psElem.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${currPS.poster_path}" style="height:250px;" />`;
        psElem.addEventListener('click', () => {
            input.value = inputValue(currPS);
            document.querySelector('html').style.height = 'auto';
            onOptionSelect(currPS);
        });
        document.getElementById("psScroll").appendChild(psElem);
    }
    for (let i = 0; i < 20; i++) {
        let currPM = popMoviesThree[i];
        let currPS = popShowsThree[i];

        const pmElem = document.createElement('a');
        pmElem.classList.add('scrollmenu-item');
        pmElem.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${currPM.poster_path}" style="height:250px;" />`;
        pmElem.addEventListener('click', () => {
            input.value = inputValue(currPM);
            document.querySelector('html').style.height = 'auto';
            onOptionSelect(currPM);

        });
        document.getElementById("pmScroll").appendChild(pmElem);

        const psElem = document.createElement('a');
        psElem.classList.add('scrollmenu-item');
        psElem.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${currPS.poster_path}" style="height:250px;" />`;
        psElem.addEventListener('click', () => {
            input.value = inputValue(currPS);
            document.querySelector('html').style.height = 'auto';
            onOptionSelect(currPS);
        });
        document.getElementById("psScroll").appendChild(psElem);
    }

    //SPORTS - NFL
    /*const spElem = document.createElement('a');
    spElem.classList.add('scrollmenu-item');
    spElem.innerHTML = `<img src="../images/sports/NFL/NFL.jpg"/>`;
    spElem.addEventListener('click', () => {
        document.querySelector('#autocomplete').style.display = 'none';
        document.querySelector('#summary').style.display = 'block';
        document.querySelector('#summary').innerHTML = '';
        //setTemplate("nfl", 001, document.querySelector('#summary'), null);
        onSportSelect("NFL");
    });
    document.getElementById("spScroll").appendChild(spElem);*/



    document.getElementById("popMovies").style.display = 'block';
    let movieSugg = document.getElementById("movieSuggButt");
    let tvSugg = document.getElementById("tvSuggButt");

    tvSugg.style.backgroundColor = 'white';
    tvSugg.style.color = 'black';
    //let sportsSugg = document.getElementById("sportsSuggButt");

    movieSugg.addEventListener('click', () => {
        document.getElementById("pmScroll").style.display = 'block';
        document.getElementById("psScroll").style.display = 'none';
        document.getElementById("spScroll").style.display = 'none';
        movieSugg.style.backgroundColor = 'white';
        movieSugg.style.color = 'black';
        tvSugg.style.backgroundColor = 'black';
        tvSugg.style.color = 'white';
        sportsSugg.style.backgroundColor = 'black';
        sportsSugg.style.color = 'white';
    });
    tvSugg.addEventListener('click', () => {
        document.getElementById("pmScroll").style.display = 'none';
        document.getElementById("spScroll").style.display = 'none';
        document.getElementById("psScroll").style.display = 'block';
        tvSugg.style.backgroundColor = 'white';
        tvSugg.style.color = 'black';
        movieSugg.style.backgroundColor = 'black';
        movieSugg.style.color = 'white';
        sportsSugg.style.backgroundColor = 'black';
        sportsSugg.style.color = 'white';
    });
    /*
    sportsSugg.addEventListener('click', () => {
        document.getElementById("pmScroll").style.display = 'none';
        document.getElementById("psScroll").style.display = 'none';
        document.getElementById("spScroll").style.display = 'block';
        sportsSugg.style.backgroundColor = 'white';
        sportsSugg.style.color = 'black';
        movieSugg.style.backgroundColor = 'black';
        movieSugg.style.color = 'white';
        tvSugg.style.backgroundColor = 'black';
        tvSugg.style.color = 'white';
    });*/
    //document.getElementById("popShows").style.display = 'block';

    const onInput = async event => {
        const items = await fetchData(event.target.value);
        console.log(document.activeElement.className);
        if (!items.length) {
            document.querySelector('.dropdown-menu').style.display = 'none';
            document.querySelector('html').style.height = 'auto';
            document.querySelector('#summary').innerHTML = '';
            document.getElementById("popMovies").style.display = 'block';
            //document.getElementById("popShows").style.display = 'block';
            //document.getElementById("pmScroll").scrollLeft = 0;
            //document.getElementById("psScroll").scrollLeft = 0;
            return;
        } else {
            document.querySelector('.dropdown-menu').style.display = 'block';
            document.querySelector('html').style.height = '100%';
            document.getElementById("popMovies").style.display = 'none';
            //document.getElementById("popShows").style.display = 'none';
            //document.querySelector('.results').scrollTop = 0;
        }
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                //dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                document.querySelector('html').style.height = 'auto';
                onOptionSelect(item);
            });
            option.addEventListener('keydown', event => {

                console.log(event.key);

                if (event.key === "ArrowDown") {
                    event.preventDefault();
                    var currActive = document.activeElement;
                    if (currActive.nextElementSibling) {
                        currActive.nextElementSibling.focus();
                    } else {
                        input.focus();
                    }
                } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    var currActive = document.activeElement;
                    if (currActive.previousElementSibling) {
                        console.log("prev sibling");
                        currActive.previousElementSibling.focus();
                    } else {
                        input.focus();
                    }
                } else if (event.key === "Enter") {
                    event.preventDefault();
                    dropdown.classList.remove('is-active');
                    input.value = inputValue(item);
                    document.querySelector('html').style.height = 'auto';
                    onOptionSelect(item);
                } else {
                    event.preventDefault();
                    if (isLetter(event.key) || isNumeric(event.key)) {
                        input.value += event.key;
                    }
                    input.focus();
                }
            });
            option.setAttribute('tabindex', 0);
            resultsWrapper.appendChild(option);
        }

        function isLetter(str) {
            return str.length === 1 && str.match(/[a-z]/i);
        }

        function isNumeric(str) {
            if (typeof str != "string") return false // we only process strings!  
            return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        }
        input.addEventListener('keydown', event => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                console.log(event.key);
                resultsWrapper.firstElementChild.focus();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                console.log(event.key);
                resultsWrapper.lastElementChild.focus();
            }

        });
    };
    input.addEventListener('input', debounce(onInput, 50));

    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });

};

function loadStored(cbMedia) {
    chrome.storage.local.get(['savedPopMovies', 'savedPopShows', 'pmArr', 'psArr'], cbMedia);
}