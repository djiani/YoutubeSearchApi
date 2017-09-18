const YOUTUBE_SEARCH_URL = 	"https://www.googleapis.com/youtube/v3/search";
let searchTerm = "";

/*
part: identifies the resource properties that should be included in an APi response. 
fields: filter part the reponse based on part parameter to include only specific field
link for better description: 
https://developers.google.com/youtube/v3/getting-started#part
https://developers.google.com/youtube/v3/docs/videos/list

Question: why it is possible to add more fieds in part parameter!!
part: 'snippet, status',
fiels: 'items(id,snippet, statistics)',
*/

function getDataFromApi(searchTerm, callback){
	const query = {
		part: 'snippet',
		fiels: 'items(id,snippet)',
		key: 'AIzaSyBqoLH2qqo68-dUI4OmHYYHmCJ4-ON5ODs',
		q: `${searchTerm}`,
		//per_page: 20
		maxResults: 20
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

/*
	adding aria-live session to region
	I do not understand why it is not working
*/

function displayYoutubeSearchData(data){
	//console.log(data.items);
	console.log(data.items.length);
	const results = data.items.map((item, index) => renderResult(item));
	let htmlResults = `<h3> ${data.items.length} video  of ${searchTerm} were found!</h3>`;
  	$('.js-search-results').empty().append(htmlResults+results).prop("hidden", false);


}

function watchSubmit(){
	$('.js-search-form').submit(event => {
		event.preventDefault();
		//console.log("test passed!!");
		const queryTarget = $(event.currentTarget).find(".js-query");
		const query = queryTarget.val();
		searchTerm = query;
		console.log(query);
		queryTarget.val(""); //clear the search input
		getDataFromApi(query, displayYoutubeSearchData);
	})
}

$(watchSubmit);