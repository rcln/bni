$(function(){
    $.get(bnicfg.url_to_source_beta + bnicfg.url_get_works 
            + " AND lang:en AND type:primary_literature "
            + " AND author:" + default_author,
        function(data){
            var works = data.grouped.file_name_hash.groups;
            for(w in works){
                var work = works[w].doclist.docs[0];
                var title = work.title;
                $("#oeuvres").append("<li>" + title + "</li>")
            }
        }
    , "json");
});
