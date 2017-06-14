$(function(){
    $("form.search").submit(function(){
        console.log("Form return False");
        return false;
    });
    console.log("search script ...", $("#search"));
    $('#search').click(function(e){
        console.log("search");
        var query_string = encodeURIComponent($.trim($("#query").val()));
        if(query_string == ""){
            query_string = "sympathie";
        }
        //query_string = "sympathie";
        //console.log($("form.search").attr("action"));
        window.location = "http://tal.lipn.univ-paris13.fr/bni/search/" + query_string;
    });
});
