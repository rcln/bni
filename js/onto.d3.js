function ontograph(subgraph){ 
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
 
    var stratify = d3.stratify()
        .id(function(d) { return d.id; })
        .parentId(function(d) { 
                //console.log("PARENT --->", d.parent, typeof d.parent);
                return (d.parent && typeof d.parent == "object")? d.parent[0] : d.parent; 
            });
    
    d3.json("data/tds-rdf.json", function(error, thesaurus) {
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

        var make_graph = function(graph, graph_nodes, parents){
            for(var p in parents){
                console.log("graph_nodes", graph_nodes)
                console.log("parent ->>> ", parents[p], graph_nodes.hasOwnProperty(parents[p]));
                if(!graph_nodes.hasOwnProperty(parents[p])){
                    console.log("thesaurus ->>> ", thesaurus[parents[p]]);
                    graph_nodes[thesaurus[parents[p]]["id"]] = true;
                    graph.push(thesaurus[parents[p]]);
                    make_graph(graph, graph_nodes, thesaurus[parents[p]]["parent"]);
                    add_children(graph, graph_nodes, thesaurus[parents[p]]["children"]);
                }
            }
        }

        var data = [];

        for(var sge in subgraph){
            if(typeof term_list[subgraph[sge]] != "undefined"){
                data = term_list[subgraph[sge]];
                break;    
            }
        }

        console.log("data", data, subgraph);

        if(data.length < 1){
           $("#concepts").hide(); 
        }

        data["main"] = true;
        var graph = [data];
        var graph_nodes = {};
        graph_nodes[data["id"]] = true;
        make_graph(graph, graph_nodes, data["parent"]);
        add_children(graph, graph_nodes, data["children"]);
        console.log("graph", graph, graph_nodes, subgraph);

        var rigth_nodes = graph; 
        var rigth_graph = tree_rigth(stratify(rigth_nodes));
    
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
