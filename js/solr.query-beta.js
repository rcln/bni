var stopwords_fr = {};
$.ajax({
    url: bnicfg.url_stopwords_fr,
    async: false,
    dataType: 'json',
    success: function (response) {
        stopwords_fr = response;
    }
});

if(typeof default_author == "undefined"){
    default_author = "adam-smith";
}

function bnisolr(query_string){
    query_string = query_string.trim().replace(/\s+/gi, " ");
    query_string_list = query_string.toLowerCase().split(",");
    /* var word_list_qs = query_string.toLowerCase().split(/[\s']/).filter(function(w){
                                            return !(w == "" || stopwords_fr.hasOwnProperty(w.replace(/[:.,]/gi, "")));
                        });   */
    var multiterm_query = "";
    var word_list_qs = []
    for(var qstr in query_string_list){
        var full_new_term = query_string_list[qstr].trim();
        var one_query_terms = full_new_term.split(/[\s]/);
        var filtered_word_list = one_query_terms.filter(function(w){
                                return !(w == "" || stopwords_fr.hasOwnProperty(w.replace(/[:.,]/gi, "")));
                            });
        if(filtered_word_list.length > 0){
            word_list_qs.push(full_new_term);
            if(filtered_word_list.length == 1){
                multiterm_query += ' OR (' + full_new_term + ')';
            }else{
                multiterm_query += ' OR ((' + filtered_word_list.join(' AND ') + ') OR "' + full_new_term + '")';
                word_list_qs = word_list_qs.concat(filtered_word_list);
            }
        }
    }
    console.log("NEW QUERY!", word_list_qs, multiterm_query);

    //var addtional_query = word_list_qs.length > 0? " OR (" + word_list_qs.join(" AND ") + ")" : "";
    //console.log("Current query: ", word_list_qs, addtional_query);

    //var query_string_encoded = encodeURIComponent(('"' + query_string + '"' + addtional_query));
    var query_string_encoded = encodeURIComponent(('"' + query_string + '"' + multiterm_query));

    var term_list = word_list_qs;
    term_list.push(query_string.toLowerCase())
    console.log("term list", term_list);

    /*var work_alias = {
                "Théorie des sentiments moraux": 
                {"pdf": "tds.pdf", "id": "tds", "page-offset": 21, "pdf-page-offset": 27 }
            }; */ 
    console.log("Query string: ", query_string, query_string_encoded);

    var rendering_highligth = function(p_text){
        re = new RegExp("(" + query_string + ")", "ig");
        if(re.test(p_text)){
            p_text = p_text.replace(re, "<b>$1</b>");
        }else{
            for(var i in word_list_qs){
                re = new RegExp("(" + word_list_qs[i] + ")", "ig");
                if(re.test(p_text)){
                    p_text = p_text.replace(re, "<b>$1</b>");
                }
            }
        }      
        return p_text;
    }

    var redering_paragraph = function(p_text){
        var render_works = "";
        render_works += '           <ul>';                
        render_works += '              <li>' + p_text + '</li>';
        render_works += '           </ul>';
        return render_works; 
    }

    var rendering_works = function(groups){
        var render_works = "";
        for(g in groups){
            var paragraphs = groups[g].doclist.docs;
            var title = paragraphs[0]["title"];
            render_works += '<div class="mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col">';
            render_works += '   <div class="mdl-card__supporting-text">';
            render_works += '       <div class="mdl-card__title">';
            render_works += '           <h2 class="mdl-card__title-text mdl-color-text--black">' + title + '</h2>';
            render_works += '       </div>';
            var tpm_page = "0000000";
            var page_counter = 0;
            for(var p = 0; p < paragraphs.length; p++){
                var page = paragraphs[p]["page"];
                var page_hash = paragraphs[p]["page_hash"];
                var page_next = (typeof paragraphs[p+1] !== "undefined")? paragraphs[p+1]["page_hash"] : "undefined";
                var p_text = paragraphs[p]["p"];
                p_text = rendering_highligth(p_text);
                var hl = p_text.search("<b>");
                var excerpt_offset = 25;
                var excerpt = ((hl - excerpt_offset > 0 )? "..." : "") + 
                                p_text.slice((hl-excerpt_offset > 0)? hl-excerpt_offset : 0, hl + excerpt_offset + 10) + 
                                ((p_text.length >  hl + excerpt_offset + 10)? "..." : "");
                page_counter++;
                if(tpm_page != page_hash){ 
                    render_works += '   <ul class="chapter">';
                    render_works += '       <li class="bni-list">Page ' + page + ' : <i class="excerpt">' + excerpt + '</i>';
                    render_works += '           <div class="subcontent" style="display: none;">';
                    tpm_page = page_hash;
                }
                render_works +=                 redering_paragraph(p_text);
                if(tpm_page != page_next){ 
                    render_works += '           </div>';
                    render_works += '       <span class="excerpt">(' + page_counter + ')</span></li>';
                    render_works += '   </ul>';
                   page_counter = 0; 
                }
            }
            render_works += '   </div>';
            render_works += '</div>';
        }
        return render_works;
    }
    $.getJSON(bnicfg.url_to_source_beta + 
                "?wt=json&q=type:primary_literature%20AND%20p:(" + query_string_encoded + ")%20AND%20skip:false%20AND%20author:" + 
                default_author + "%20AND%20lang:fr&group=true" +
                "&group.field=file_name_hash&group.limit=30&sort=page%20asc", 
                function(response){
        console.log(default_author);
        console.log(response.grouped.file_name_hash.matches > 0);
        if(typeof response.grouped != 'undefined' && response.grouped.file_name_hash.matches > 0 ){
            $("#result-not-found").hide(); 
            $("#result-items").show(); 
            var groups = response.grouped.file_name_hash.groups;
            console.log("Number of groups:", groups.length);
            render_works = rendering_works(groups);
            $("#works").html(render_works);

            $("ul.chapter").on('click', 'li', function(){
                li_local = this;
                if(typeof li_local.shown == 'undefined'){
                    li_local.shown = false;
                }
                if(!li_local.shown){
                    $(this).find(".excerpt").hide("fast")

                    $(this).find(".subcontent").show("fast", function(){
                        li_local.shown = true;
                    });
                }else{
                    $(this).find(".excerpt").show("fast")
                    $(this).find(".subcontent").hide("fast", function(){
                        li_local.shown = false;
                    });
                   
                }
            });

            $("ul.chapter li.bni-list").on('click', '.subcontent', function(){
                $(this).hide('slow', function(){
                       $(this).parent()[0].shown = false;
                    });
            });


        }else{
            $("#result-items").hide(); 
            $("#result-not-found").show(); 
        }

        ontograph(term_list);
    });
} 

