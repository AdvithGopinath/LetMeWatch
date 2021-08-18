
let getOmdbData=function(search) {
    let url="http://www.omdbapi.com/";
    let apiKey="57ecde3c";
    let result=null;
    $.ajax({
        async: false,
        url:url,
        type:"GET",
        data:{
            "apikey":apiKey,
            "s":search
        },
        success:function(data){
            result=data;
        },
        error:function(){
            console.log("AJAX hatasi!")
        }
    })
    return result;
}

 $(document).ready(function(){
   let search=$("#search");
   let dataArea=$("#dataTable");

 search.on("keyup",function() {

     let result=getOmdbData($(this).val());
     dataArea.html("<tr><th>Poster</th><th>Title</th><th>Year</th><th>Details</th></tr>");

     if(result["Response"]){
         let movielist=result["Search"];
         $.each(movielist,function(index,item) {

            html = `<tr><td><img src="${item["Poster"]}" style="width:100px" /></td><td>${item["Title"]}</td><td>${item["Year"]}</td><td><a target='_blank' href='https://www.imdb.com/title/${item["imdbID"]}'>Details</a></td></tr>`
              dataArea.append(html);
  
         })
     }

 });

})

