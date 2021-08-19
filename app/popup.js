const autoCompleteConfig = {
	renderOption(movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
            <img src="${imgSrc}" />     
            ${movie.Title} (${movie.Year})
            `;
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
		const response = await axios.get('https://www.omdbapi.com/', {
			params: {
				apikey: '62ede3db',
				s: searchTerm,
			},
		});

		if (response.data.Error) {
			return [];
		}

		console.log(response.data.Search);
		return response.data.Search;
	},
};

createAutoComplete({
	...autoCompleteConfig,
	root: document.querySelector('#autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#summary'));
	},
});

let movieCenter;

const onMovieSelect = async (movie, summaryElement) => {
	const response = await axios.get('https://www.omdbapi.com/', {
		params: {
			apikey: '62ede3db',
			i: movie.imdbID,
		},
	});

	summaryElement.innerHTML = movieTemplate(response.data);
    movieCenter = response.data;
};



const movieTemplate = (movieDetail) => {


	return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
    `;
};
