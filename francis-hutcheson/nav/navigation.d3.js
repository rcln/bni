function navigation(){ 
    var svg = d3.select("#navigation"),
    svg_currentbound = svg.node().getBoundingClientRect(),
    width =+ svg_currentbound.width,
    height =+ svg_currentbound.height;
    midwidth = width/2;
    midheight = height/2;

    console.assert(width > 0, height > 0, "svg: Wrong boundaries!");
    
    var default_circle_size = 70; 
    var default_text_dy = default_circle_size/2 + 25; 
    var default_text_width = default_circle_size * 3.5; 

    g = svg.append("g").attr("transform", "translate(" + width/2+ "," + 0+ ")");
   
    svg.append("defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
      .enter().append("marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 10)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("markerUnits", "strokeWidth")
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,5 L10,0 L0,-5");

    var graph_offset = 160;
 
    var tree_left = d3.cluster()
        .size([midheight*1.5, midwidth - graph_offset])
    
    var tree_rigth = d3.cluster()
        .size([midheight*1.5, midwidth - graph_offset])
 
    var stratify = d3.stratify()
        .id(function(d) { return d.id; })
        .parentId(function(d) { return d.parent; });
    
    d3.json("francis-hutcheson/nav/francis-hutcheson.json", function(error, data) {
        if (error) throw error;
        console.assert(data != {}, "Empty data.")
   
        var if_node_left = function(position){ return position != "rigth"}
        var if_node_rigth = function(position){ return position != "left"}


        var left_nodes = data.filter(function(node){return if_node_left(node.position);}); 
        var rigth_nodes = data.filter(function(node){return if_node_rigth(node.position);}); 
 
        var left_graph = tree_left(stratify(left_nodes));
        var rigth_graph = tree_rigth(stratify(rigth_nodes));


        console.log(left_graph, rigth_graph);
    
        var root_offset = 200;
        var svg_margin = 100;
        //var nodes = updateNodePositions(root);
        var position_link = function(d) {
                    if(if_node_rigth(d.data.position)){
                        //return "M" + d.y + "," + d.x
                        //        + "L" + d.parent.y + " " + d.parent.x;
                        return "M" + d.parent.y + "," + d.parent.x
                            + "C" + (d.y - root_offset) + "," + d.parent.x
                            + " " + (d.y - root_offset - svg_margin) + "," + d.x
                            + " " + (d.y - default_circle_size/2 - svg_margin) + "," + d.x;
                    }else{
                        return "M" + (-d.parent.y) + "," + d.parent.x
                            + "C" + (-d.y + root_offset) + "," + d.parent.x
                            + " " + (-d.y + root_offset + svg_margin) + "," + d.x
                            + " " + (-d.y + default_circle_size/2 + svg_margin) + "," + d.x;
                    }
                }

        var link_left = g.selectAll(".link").filter(function(d, i) { return if_node_left(d.data.position); })
            .data(left_graph.descendants().slice(1))
            .enter()
                .append("path")
                .attr("class", "link")
                .attr("d", position_link)
                .attr("marker-end", "url(#end)");


        var link_rigth = g.selectAll(".link").filter(function(d, i) { return if_node_rigth(d.data.position); })
            .data(rigth_graph.descendants().slice(1))
            .enter().append("path")
                .attr("class", "link")
                .attr("d", position_link)
                .attr("marker-end", "url(#end)");


        var node_class = function(d) { 
            return "node" + (d.children ? " node--internal" : " node--leaf") + ( " node-side--" + d.data.position ); 
        }
        var node_left = g.selectAll(".node").filter(function(d, i) { return if_node_left(d.data.position); })
            .data(left_graph.descendants())
            .enter().append("g")
                .attr("class", node_class)
                .attr("transform", function(d) { 
                    if(d.data.position != "root"){
                        return "translate(" + (-d.y + svg_margin) + "," + d.x + ")"; 
                    }else{
                        return "translate(" + (-d.y) + "," + d.x + ")"; 
                    }
                });
    
        var node_rigth = g.selectAll(".node").filter(function(d, i) { return if_node_rigth(d.data.position); })
            .data(rigth_graph.descendants())
            .enter().append("g")
                .attr("class", node_class)
                .attr("transform", function(d) { 
                    if(d.data.position != "root"){
                        return "translate(" + (d.y - svg_margin) + "," + d.x + ")"; 
                    }else{
                        return "translate(" + (-d.y) + "," + d.x + ")"; 
                    }

                }); 

        node_left.append("circle")
            .attr("r", default_circle_size/2);
        node_rigth.append("circle")
            .attr("r", default_circle_size/2);

        var root_node = g.selectAll(".node-side--root");
        var default_circle_root_size = default_circle_size*1.3;
        //root_node.select("circle").remove();
        root_node
            .append("defs")
            .append("clipPath")
            .attr("id", "avatarCircle")
            .append("circle")
            .attr("r", default_circle_root_size/2);
        root_node
            .append("image")
            .attr("xlink:href", "/bni/francis-hutcheson.jpg")
            .attr("height", default_circle_root_size)
            .attr("x", - default_circle_root_size/2 - 26)
            .attr("y", - default_circle_root_size/2)
            .attr("clip-path", "url(#avatarCircle)");

        var texts = g.selectAll(".node")
            .append("text")
            //.attr("textposition", function(d){return d.data.position})
            .attr("dy", default_text_dy)
            .attr("width", default_text_width)
            //.attr("x", function(d) { return d.children ? 8 : -50; })
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.label; 
            });

        var whole_graph = g.selectAll(".node").filter(function(d, i){ return d.data.position === "root"? false : true; }).on("click", function(d) {
            console.log(d);
            navigation_subgraph(svg, d.data.name);
            window.open("/bni/francis-hutcheson/nav/#" + decodeURIComponent(d.data.name), "_self", false);
        });

        (function(){
            var url_hash = location.hash.replace("#",""); 
            console.log("url", url_hash);
            g.selectAll(".node").filter(function(d, i){
                if(d.data.name === url_hash){
                    d3.select(this).dispatch("click");
                }
            }); 
        })();
    });

}

function navigation_subgraph(svg, subgraph){ 
    console.log("subgraph", subgraph);
    svg.selectAll("*").remove();
    var svg_currentbound = svg.node().getBoundingClientRect(),
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
        .parentId(function(d) { return d.parent; });
    
    d3.json("francis-hutcheson/nav/francis-hutcheson-subnodes.json", function(error, data) {
        if (error) throw error;
        console.assert(data != {}, "Empty data.")
   
        var if_node_rigth = function(position){ return true }

        var data = data[subgraph] || [];

        var rigth_nodes = data; 
 
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
            return "node" + (d.children ? " node--internal" : " node--leaf"); 
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

        var default_text_dy = default_circle_size/4; 
        var default_text_dx = default_circle_size/2 + 2; 
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
            window.open("/bni/francis-hutcheson/search-fh/" + decodeURIComponent(d.data.label.replace(/ /g, "+")), "_self", false);
        });
     
        $("#back-to-graph").show();
    });

}

$("#back-to-graph").hide();
navigation();

$(function(){
    $("#back-to-graph").click(function(){
            window.open("/bni/francis-hutcheson/nav/", "_self", false);
    });
});

