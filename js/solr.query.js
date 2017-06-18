var stopwords_fr = {};
$.ajax({
    url: "/bni/js/stopwords-fr-object.json",
    async: false,
    dataType: 'json',
    success: function (response) {
        stopwords_fr = response;
    }
});

console.log(stopwords_fr);

function bnisolr(query_string){
    var word_list_qs = query_string.toLowerCase().split(/[\s']/).filter(function(w){ 
                                            return !stopwords_fr.hasOwnProperty(w);
                        });   
    var addtional_query = word_list_qs.length > 0? " OR (" + word_list_qs.join(" AND ") + ")" : "";
    console.log(word_list_qs, addtional_query);
    var query_string_encoded = encodeURIComponent('"' + query_string + '"');

    console.log(query_string, query_string_encoded);
    $.getJSON("/bnisolr/bni_adam_smith/select?hl=on&indent=on&wt=json&q=type:primary_literature%20AND%20page:(" + query_string_encoded + ")", function(response){
        console.log(response);
        var works = {};
        console.log(response.response.numFound > 0);
        if(typeof response.response != 'undefined' && response.response.numFound > 0 ){
            $("#result-not-found").hide(); 
            $("#result").show(); 
            var docs = response.response.docs;
            for(d in docs){
                if(typeof works[docs[d].title] == 'undefined'){
                    works[docs[d].title] = {};
                    works[docs[d].title]['objects'] = {};
                    works[docs[d].title]['ids'] = [];
                }
                var _id = parseInt(docs[d].id);
                works[docs[d].title]['ids'].push(_id);
                works[docs[d].title]['objects'][_id] = docs[d];
            }
            
            for(w in works){
                works[w]['ids'] = works[w]['ids'].sort(function(a,b) {
                        return a - b;
                });
            }

            var all_objects = [];
            for(w in works){
                for(_id in works[w]['ids']){
                    var id = works[w]['ids'][_id];
                    curr_obj = works[w]['objects'][id];
                    all_objects.push([w, curr_obj.section, curr_obj.chapter, id, curr_obj.page]); 
                }
            }

            all = {};
            for(o in all_objects){
                title = all_objects[o][0];
                section = all_objects[o][1];
                chapter = all_objects[o][2];
                page = all_objects[o][3];
                text = all_objects[o][4]; 

                if(typeof all[title] == 'undefined'){
                    all[title] = {};
                }
                if(typeof all[title][section] == 'undefined'){
                    all[title][section] = {};
                }
                if(typeof all[title][section][chapter] == 'undefined'){
                    all[title][section][chapter] = {};    
                }
                if(typeof all[title][section][chapter][page] == 'undefined'){
                    all[title][section][chapter][page] = [];    
                }

                for(p in text){
                    all[title][section][chapter][page].push(text[p]);
                }
            }

            render_works = '';
            _section_id = 0;
            section_pages = {};
            for(title in all){
                //render_works += '<h5 class="mdl-color-text--white">' + title + '</h5>';
                render_works += '<h5 class="">' + title + '</h5>';
                render_works += '<ul>';
                    for(section in all[title]){
                        there_is_a_section = true;
                        render_works += '   <li class="bni-list">' + section.replace(/\d\n?$/, "") + ' p. <span id="section' + (++_section_id) + '"></span>';
                        for(chapter in all[title][section]){
                            there_is_a_chapter = true;
                            render_works += '   <ul class="chapter">';
                            render_works += '       <li class="bni-list">' + chapter.replace(/\d\n?$/, "");
                            render_works += '           <ul class="subcontent" style="display: none;">';


                            for(page in all[title][section][chapter]){
                                if(typeof section_pages['section' + _section_id] == 'undefined'){
                                    section_pages['section' + _section_id] = [];
                                }
                                section_pages['section' + _section_id].push(page);
                                for(paragraph in all[title][section][chapter][page]){
                                    p_str = all[title][section][chapter][page][paragraph];
                                    re = new RegExp("(" + query_string + ")", "i");
                                    console.log("p_str", re.test(p_str), query_string);
                                    //console.assert(re.test(p_str), p_str);
                                    if(re.test(p_str)){
                                        render_works += '       <li>' + p_str.replace(re, "<b>$1</b>") + '</li>';
                                    }else{
                                        for(var i in word_list_qs){
                                            re = new RegExp("(" + word_list_qs[i] + ")", "i");
                                            if(re.test(p_str)){
                                                render_works += '       <li>' + p_str.replace(re, "<b>$1</b>") + '</li>';
                                            }
                                        }
                                    }
                                }
                            }
                            render_works += '           </ul>';
                            render_works += '       </li>';
                            render_works += '   </ul>';
                        }
                        if(typeof there_is_a_chapter == 'undefined'){
                            break;    
                        }
                        render_works += '</li>';
                    }
                    if(typeof there_is_a_section == 'undefined'){
                    }
                render_works += '</ul>';
            }

            $("#works").html(render_works);
            pages_render = '';
            for(sp in section_pages){
                pages = section_pages[sp].sort(function(a,b){return a - b;});
                for(p in pages){
                    pages_render += ', ' + pages[p];
                }
                $("#" + sp).html(pages_render.substring(1));
                pages_render = '';
            }

            $("ul.chapter").on('click', 'li', function(){
                li_local = this;
                if(typeof li_local.shown == 'undefined'){
                    li_local.shown = false;
                }
                if(!li_local.shown){
                    $(this).find("ul.subcontent").show("slow", function(){
                        li_local.shown = true;
                    });
                }else{
                    $(this).find("ul.subcontent").hide("slow", function(){
                        li_local.shown = false;
                    });
                   
                    }
            });

            $("ul.chapter li.bni-list").on('click', 'ul.subcontent', function(){
                $(this).hide('slow', function(){
                       $(this).parent()[0].shown = false;
                    });
            });

        }else{
            $("#result").hide(); 
            $("#result-not-found").show(); 
        }
    });
} 

