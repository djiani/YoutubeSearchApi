const YOUTUBE_SEARCH_URL = 	"https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback){
	const query = {
		part: 'snippet',
		key: 'AIzaSyBqoLH2qqo68-dUI4OmHYYHmCJ4-ON5ODs',
		q: `${searchTerm}`
	}

	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
	const thumbnails = result.snippet.thumbnails;

	//<h3> king  id : ${result.id.kind}</h3>
    //<h3> video id : ${result.id.videoId}</h3>
    //<h3> channel id : ${result.id.channelId}</h3>
    //<h3> playlist id : ${result.id.playlistId}</h3>
    //<h3> video duration: ${result.contentDetails.duration}>/h3>
    //console.log(result);

  return `
    <div class="content">
      <h2> ${result.snippet.title}</h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
      	<img src=${thumbnails.medium.url} style="width:${thumbnails.medium.width};height:${thumbnails.medium.height};">
      </a>
      <h3> video published on : ${result.snippet.publishedAt}</h3>
      
      <p><em>Description:</em>${result.snippet.description}</p>
    </div>
  `;
}

function displayYoutubeSearchData(data){
	//console.log(data.items);
	const results = data.items.map((item, index) => renderResult(item));
  	$('.js-search-results').html(results);


}

function watchSubmit(){
	$('.js-search-form').submit(event => {
		event.preventDefault();
		console.log("test passed!!");
		const queryTarget = $(event.currentTarget).find(".js-query");
		const query = queryTarget.val();
		console.log(query);
		queryTarget.val(""); //clear the search input
		getDataFromApi(query, displayYoutubeSearchData);
	})
}

$(watchSubmit);