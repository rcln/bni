function ontograph(start_node){ 
    var svg = d3.select("#ontograph"),
    svg_currentbound = svg.node().getBoundingClientRect(),
    width =+ svg_currentbound.width,
    height =+ svg_currentbound.height;
    midwidth = width/2;
    midheight = height/2;

    console.assert(width > 0, height > 0, "svg: Wrong boundaries!");
    
    var default_circle_size = 25; 

    g = svg.append("g").attr("transform", "translate(" + midwidth*.1  + "," + 0 + ")");
   
    svg.append("defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
      .enter().append("marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", default_circle_size)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("markerUnits", "strokeWidth")
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,5 L10,0 L0,-5");

    var graph_offset = default_circle_size;
   
    var tree_rigth = d3.tree()
        .size([height - graph_offset, midwidth*1.2 ])

    /*
    var stratify = d3.stratify()
        .id(function(d) { return d.id; })
        .parentId(function(d) { 
                //console.log("PARENT --->", d.parent, typeof d.parent);
                return (d.parent && typeof d.parent == "object")? d.parent[0] : d.parent; 
            });
    
    */
    /*var stratify = function(data){
            for(var d in data){
                data[d].
            }
        };*/

    d3.json("data/bni-thesaurus-v2.json", function(error, thesaurus) {
        if (error) throw error;
        console.assert(thesaurus != {}, "Empty data.")
   
        var if_node_rigth = function(){ return true;}

        var term_list = {};
        for(var term in thesaurus){
            for(var variant in thesaurus[term].variants){
                term_list[thesaurus[term].variants[variant]] = thesaurus[term] ;
            }
        }

        console.log("Term list", term_list);
    
        var add_children = function(graph, graph_nodes, children){
            for(var ch in children){
                if(!graph_nodes.hasOwnProperty(children[ch])){
                    graph_nodes[thesaurus[children[ch]]["id"]] = true;
                    graph.push(thesaurus[children[ch]]);
                    make_graph(graph, graph_nodes, thesaurus[children[ch]]["parent"]);
                }
            }
        }

        var make_graph = function(pnode, curnode = null){
            if(typeof pnode != "undefined"){
                if(typeof pnode.children != "undefined" && pnode.children.length > 0){
                    var children = pnode.children.slice();
                    pnode.children = [];
                    for(var ch in children){
                        child = thesaurus[children[ch]];
                        var newchild = {
                                    "data": child,
                                    "name": child["id"],
                                    "label": child["label"]
                                };
                        if(curnode && curnode["name"] == newchild["name"]){
                            newchild = curnode;
                        }
                        pnode.children.push(newchild);
                    }
                }else{
                    pnode.children = null;
                }
                console.log(pnode);
                return (pnode["parent"] && pnode["parent"].length > 0)? make_graph(thesaurus[pnode["parent"][0]], pnode) : pnode;
            }else{
                return curnode;
            }
        }

        var graph = {};

        var was_term_found = false;
        var max_length_term = 0; 
        for(var sge in start_node){
            if(typeof term_list[start_node[sge]] != "undefined"){
                if(max_length_term < start_node[sge].length){
                    graph = term_list[start_node[sge]];
                    was_term_found = true;
                    max_length_term = start_node[sge].length;
                }
            }
        }
        //console.log("max len", max_length_term, start_node);

        if(!was_term_found){
            $("#concepts").hide();       
        }

        if(graph.length < 1){
           $("#concepts").hide(); 
        }

        graph["main"] = true;
        graph = make_graph(graph);
        //add_children(graph, graph_nodes, data["children"]);
        console.log("graph", graph);

        var hierarchy_nodes = d3.hierarchy(graph);
        var rigth_graph = tree_rigth(hierarchy_nodes);
    
        var root_offset = -200;
        var svg_margin = 0;

        var position_link = function(d) {
            return "M" + d.parent.y  + "," + d.parent.x
                    + "L " + d.y + "," + d.x;    
        }

        var link_rigth = g.selectAll(".link")
            .data(rigth_graph.descendants().slice(1))
            .enter().append("path")
                .attr("class", "link")
                .attr("d", position_link)
                .attr("marker-end", "url(#end)");

        var node_class = function(d) { 
            return "node" + (d.children ? " node--internal" : " node--leaf") + ((d.data &&  d.data.main)? " node--main": ""); 
        }
    
        var node_rigth = g.selectAll(".node")
            .data(rigth_graph.descendants())
            .enter().append("g")
                .attr("class", node_class)
                .attr("transform", function(d) { 
                        return "translate(" + (d.y) + "," + d.x + ")"; 
                }); 

        node_rigth.append("circle")
            .attr("r", default_circle_size/2);

        var default_text_dy = default_circle_size/4 + 10; 
        var default_text_dx = default_circle_size/2 ; 
        var default_text_width = default_circle_size * 3.5; 
        var texts = g.selectAll(".node")
            .append("text")
            //.attr("textposition", function(d){return d.data.position})
            .attr("dy", default_text_dy)
            .attr("dx", default_text_dx)
            .attr("width", default_text_width)
            //.attr("x", function(d) { return d.children ? 8 : -50; })
            .style("text-anchor", "start")
            .text(function(d) {
                return d.data.label; 
            });

        var whole_graph = g.selectAll(".node").on("click", function(d) {
            window.open("/bni/search/" + decodeURIComponent(d.data.label.replace(/ /g, "+")), "_self", false);
        });
     

        var text_labels = g.selectAll("text").on("mouseenter", function(d) {
            console.log(d);
            //d.style("background-color", "white");
        });
        $("#back-to-graph").show();
    });

}

/*
$("#back-to-graph").hide();
navigation();

$(function(){
    $("#back-to-graph").click(function(){
            window.open("/bni/nav/", "_self", false);
    });
});
*/
