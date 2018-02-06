$(function(){
    $("form.search").submit(function(){
        console.log("Form return False");
        return false;
    });
    console.log("search script ...", $("#search"));
    $('#search').click(function(e){
        console.log("search");
        var query_string = $.trim($("#query").val()).replace(/\s+/, " ").replace(/ /g,"+");
        if(query_string == ""){
            $("#query").focus();
            $("#query").attr("placeholder", "This field is required!");
        }else{
            window.open("search/" + query_string, "_self", false);
        }
    });
});
