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
        0: [
            {id: 0, shape: 'circularImage', image: 'adam-smith.jpg', label:'Adam SMITH', group: 1, size : 40, level : 0},
            {id: 1, label: 'Philosophie morale', group: 13, size : 25, level : 1},
            {id: 2, label: 'Economie', group: 14, size : 25, level : 1},
            {id: 3, label: 'Philosophie  Politique',  group: 15, size : 25, level : -1},
            {id: 4, label: 'Les écrits épistémologiques\n et esthétiques', group: 1, size : 25, level : -1 }
        ],
        1: [
            /* node 1 */
            {id: 1, label: 'Philosophie morale', group: 13, size : 35, level : 1},
                {id: 11, label: 'La sympathie', group: 14, size: 25, level : 2},
                    {id: 111, label: 'Le transport de  l\'imagination', group: 15, level :3},
                    {id: 112, label: 'Le principe d\'atténuation', group: 15,level : 3},
                        {id: 1121, label: 'Les deux vertus', group: 16, level : 4},
                            {id: 11211, label: 'Amabilité', group: 17, level : 5},
                            {id: 11212, label: 'Empire sur soie',group: 17, level : 5},
                        {id:1122, label: 'L\'auto-régulation des passions',group: 16, level : 4},
                {id: 12, label: 'Les règles morales', group: 14, size: 25, level : 2},
                    {id: 121, label: 'La convenance', group: 15, level : 3},
                    {id: 122, label: 'L\'approbation ou le jugement moral', group:15, level : 3},
                    {id: 123, label: 'La double évaluation', group: 15, level : 3},
                        {id: 1231, label: 'Motif et conséquence', group: 16, level : 4},
                        {id: 1232, label: 'Absolu et relatif', group: 16, level : 4},
                    {id: 124, label: 'Le Spectateur Impartial', group: 15, level : 3},
                        {id: 1241, label: 'Genèse du SI', group: 16, level : 4},
                        {id: 1242, label: 'Les contradictions de la symapthie', group: 16, level : 4},
                            {id: 12421, label: 'Le défaut: règles morales', group: 17,level : 5},
                            {id: 12422, label: 'L\'excès: la vanité, l\'amour des puissants', group: 17,level : 5},
          ],
          2: [
            /* node 2 */
            {id: 2, label: 'Economie', group: 14, size : 35, level : 1},
                {id: 21, label: 'L\'échange', group: 1, size: 25, level :2},
                    {id: 211, label: 'Fondement  de l\'échange', group: 3, level :3},
                    {id: 212, label: 'Penchant  et   besoin', group: 3, level :3},
                    {id: 213, label: 'Bienveillance  et  intérêt', group: 3, level :3},
                    {id: 214, label: 'L\'amélioration  de  son sort', group: 3, level :3},
                {id: 22, label: 'L\'auto régulation des échanges', group: 1, size: 25, level :2},
                    {id: 221, label: 'Critique de  la physiocratie', group: 3, level :3},
                    {id: 222, label: 'Critique  du  mercantilisme', group: 3, level :3},
                    {id: 223, label: 'Le système de la liberté naturelle', group: 3, level :3},
                    {id: 224, label: 'La frugalité', group: 3, level :3},
                {id: 23, label: 'La division  du  travail', group: 1, size: 25, level :2},
                    {id: 231, label: 'La valeur des marchandises', group: 3, level :3},
                    {id: 232, label: 'la division  sociale  et l\'égalité', group: 3, level :3}
          ],
          3: [
            /* node 3 */
            {id: 3, label: 'Philosophie  Politique',  group: 15, size : 35, level : 1},
                {id: 31, label: 'sympathie  et  société', group: 7, size: 25, level :2},
                    {id: 311, label: 'La sociabilité', group: 6, level :3},
                    {id: 312, label: 'Les limites  de la  sympathie', group: 6, level :3},
                    {id: 313, label: 'La critique de l\'état de nature  et du contrat', group: 6, level :3},
                    {id: 314, label: 'Le principe  de proximité', group: 6, level :3},
                {id: 32, label: 'L\'Etat',  group: 7, size: 25, level :2},
                    {id: 321, label: 'Justice  et  vengeance', group: 6, level :3},
                    {id: 322, label: 'Les règles  de  justice', group: 6, level :3},
                    {id: 323, label: 'Critiques  de  l\'Etat', group: 6, level :3},
                    {id: 324, label: 'Fonction  négative  de l\'Etat', group: 6, level :3},
                {id: 33, label: 'La main  invisible', group: 7, size: 25, level :2},
            ],
          4: [
            /* node 4 */
            {id: 4, label: 'Les écrits  épistémologiques  et esthétiques', group: 1, size : 35, level : 1 },
                {id: 41, label: 'histoire  de l\'astronomie', group: 15, size: 25, level :2},
                    {id: 411, label: 'La surprise,  l\'étonnement', group: 11, level :3},
                    {id: 412, label: 'Les liaisons  imaginatives', group: 11, level :3},
                    {id: 413, label: 'La main  invisible dans le champ  scientifique', group: 11, level :3},
                {id: 42, label: 'Esthétique', group: 15, size: 25, level :2},
                    {id: 421, label: 'L\'imitation', group: 11, level :3},
                    {id: 422, label: 'La musique', group: 11, level :3},
                    {id: 423, label: 'L\'origine du langage', group: 11, level :3}
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
var nodes = new vis.DataSet(nodes_all[0]);
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
                borderWidth: 0,
                fixed: true,
                scaling: {
                    min: 10,
                    max: 30,
                },
                font: {
                    size: 15
                }

            },
            edges: {
                smooth: false,
                borderWidth: 1,
                hoverWidth: 0,
                arrows: {to : true },
                color: '#ffffff',
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

network.fit(nodes);

//END Vis.js group example
network.on("click", function(e) {
    //Zoom only on single node clicks, zoom out otherwise
    //network.fit(e.nodes);
    //if( e.nodes.length > 0 && e.nodes[0] == 11 ){
    var nodeId = e.nodes[0];
    $(document).click();
    if( e.nodes.length > 0 && nodeId > 4 ){
        for(na_i in nodes_all){
            for(node_properties in nodes_all[na_i]){
                console.assert(nodeId != nodes_all[na_i][node_properties].id, nodeId, nodes_all[na_i][node_properties].label );
                search_string = encodeURI(nodes_all[na_i][node_properties].label);
                //window.location = "http://tal.lipn.univ-paris13.fr/bni/search/" +  search_string;
            }
        }
    }

    if (e.nodes.length !== 1) {
      network.fit();
      return;
    }
    //Find out what group the node belongs to
    var group = getGroup(nodeId);

    if(nodeId >= 0 && nodeId <= 4){
      //First four children
      nodes.clear();
      nodes.add(nodes_all[nodeId]);
      network.fit({nodes: nodes});
    }
    
    //TODO: How do you want to handle ungrouped nodes?
    /*if (group === undefined) return;
    var groupNodes = getGroupNodes(group);
    network.fit({
      nodes: groupNodes
    });
   */
});
