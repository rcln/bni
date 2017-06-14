//TODO: Is there no user-land API for this?
    var getGroup = function getGroup(nodeId) {
    var nodesHandler = network.nodesHandler;
    var innerNodes = nodesHandler.body.nodes;
    //Lazily assume ids match indices
    var node = innerNodes[nodeId];
    return node.options.group;
    };

    var getGroupNodes = function getGroupNodes(group) {
    // http://elijahmanor.com/reducing-filter-and-map-down-to-reduce/
      /*var filtered = nodes.reduce(function(output, node) {
        if (node.group === group) {
          output.push(node.id);
        }
        return output;
       }, []);
      return filtered;*/
      return group;
    };
    var color = 'gray';
    var len = undefined;

    var nodes_main = { 
        nodes: [
            {id: 0, shape: 'circularImage', image: 'adam-smith.jpg', label:'Adam SMITH', group: 1, size : 40, level : 0},
            {id: 1, label: 'Philosophie morale', group: 13, size : 35, level : 1},
            {id: 2, label: 'Economie', group: 14, size : 35, level : 1},
            {id: 3, label: 'Philosophie  Politique',  group: 15, size : 35, level : -1},
            {id: 4, label: 'Les écrits  épistémologiques  et esthétiques', group: 16, size : 35, level : -1 }
        ],
        edges: [
            {from: 0,    to: 1},
            {from: 0,    to: 2},
            {from: 0,    to: 3},
            {from: 0,    to: 4}
        ]
    };  

    var nodes_all = {
        1: [
            /* node 1 */
                {id: 11, label: 'La sympathie', group: 2, size: 25, level : 2},
                    {id: 111, label: 'Le transport de  l\'imagination', group: 2, level :3},
                    {id: 112, label: 'Le principe d\'atténuation', group: 2,level : 3},
                        {id: 1121, label: 'Les deux vertus', group: 3, level : 4},
                            {id: 11211, label: 'Amabilité', group: 3, level : 5},
                            {id: 11212, label: 'Empire sur soie',group: 3, level : 5},
                        {id:1122, label: 'L\'auto-régulation des passions',group: 13, level : 4},
          ]
    };
    
    // create an array with edges
    var edges_all = [
            {from: 0,    to: 1},
            {from: 0,    to: 2},
            {from: 0,    to: 3},
            {from: 0,    to: 4},

            {from: 1,    to: 11},
            {from: 1,    to: 12},
            {from: 2,    to: 21},
            {from: 2,    to: 22},
            {from: 2,    to: 23},
            {from: 3,    to: 31},
            {from: 3,    to: 32},
            {from: 3,    to: 33},
            {from: 4,    to: 41},
            {from: 4,    to: 42},
            
                {from: 11,   to: 111},
                {from: 11,   to: 112},

                {from: 12,   to: 121},
                {from: 12,   to: 122},
                {from: 12,   to: 123},
                {from: 12,   to: 124},

                {from: 21,   to: 211},
                {from: 21,   to: 212},
                {from: 21,   to: 213},
                {from: 21,   to: 214},

                {from: 22,   to: 221},
                {from: 22,   to: 222},
                {from: 22,   to: 223},
                {from: 22,   to: 224},

                {from: 23,   to: 231},
                {from: 23,   to: 232},

                {from: 31,   to: 311},
                {from: 31,   to: 312},
                {from: 31,   to: 313},
                {from: 31,   to: 314},

                {from: 32,   to: 321},
                {from: 32,   to: 322},
                {from: 32,   to: 323},
                {from: 32,   to: 324},

                {from: 41,   to: 411},
                {from: 41,   to: 412},
                {from: 41,   to: 413},

                {from: 42,   to: 421},
                {from: 42,   to: 422},
                {from: 42,   to: 423},

                    {from: 112,  to: 1121},
                    {from: 112,  to: 1122},

                    {from: 123,  to: 1231},
                    {from: 123,  to: 1232},

                    {from: 124,  to: 1241},
                    {from: 124,  to: 1242},

                        {from: 1121, to: 11211},
                        {from: 1121, to: 11212},
            
                            {from: 1242, to: 12421},
                            {from: 1242, to: 12422},
    ];


    

// create a network
var container = document.getElementById('navigation');
var nodes = new vis.DataSet(nodes_all[1]);
var edges = new vis.DataSet(edges_all);
var data = {
  nodes: nodes,
  edges: edges
};

var options = {
            autoResize: true,
            height: '100%',
            nodes: {
                shape: 'dot',
                borderWidth: 2,
                fixed: true,
                scaling: {
                    min: 10,
                    max: 30,
                }
            },
            edges: {
                smooth: true,
                arrows: {to : true }
            },
            

            layout: {
                    hierarchical: {
                        direction: 'tree'
                    }
                },
            /*
            title: {
                fixed : true,
                hiden : false
            },*/
            
            interaction:{
                hover: true,
                keyboard: true,
                navigationButtons: true
            },

            //highlightNearest :true,
            //multiselect: true

        };

network = new vis.Network(container, data, options);

//END Vis.js group example

network.on("click", function(e) {
    //Zoom only on single node clicks, zoom out otherwise
    if (e.nodes.length !== 1) {
      network.fit();
      return;
    }
    var nodeId = e.nodes[0];
    //Find out what group the node belongs to
    var group = getGroup(nodeId);

    if(nodeId >= 0 && nodeId <= 4){
      //First four children
      nodes.clear();
      nodes.add(nodes_all[nodeId]);
      network.fit({nodes: nodes});
    }
    
    //TODO: How do you want to handle ungrouped nodes?
    if (group === undefined) return;
    var groupNodes = getGroupNodes(group);
    network.fit({
      nodes: groupNodes
    });

});
