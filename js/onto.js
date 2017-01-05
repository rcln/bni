// initialize network
var nodes = null;
var edges = null;
var network = null;
var directionInput = document.getElementById("direction");

function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

function draw() {
    destroy();
    nodes = [];
    edges = [];
    var connectionCount = [];


// Add nodes
nodes.push({id: 'Abundance', label:'abundance'});
nodes.push({id: 'Accordance', label:'accordance'});
nodes.push({id: 'Acquaintance', label:'acquaintance'});
nodes.push({id: 'Action', label:'action'});
nodes.push({id: 'Admiration', label:'admiration'});
nodes.push({id: 'Affection', label:'affection'});
nodes.push({id: 'Ages', label:'Ages'});
nodes.push({id: 'Appearance', label:'Appearance'});
nodes.push({id: 'Approbation', label:'approbation'});
nodes.push({id: 'Aristocracy', label:'aristocracy'});
nodes.push({id: 'Army', label:'army'});
nodes.push({id: 'Astronomy', label:'Astronomy'});
nodes.push({id: 'Attention', label:'attention'});
nodes.push({id: 'Augmentation', label:'Augmentation'});
nodes.push({id: 'Benefice', label:'benefice'});
nodes.push({id: 'Benevolence', label:'benevolence'});
nodes.push({id: 'Cannon_law', label:'cannon law'});
nodes.push({id: 'Child', label:'Child'});
nodes.push({id: 'Circulation', label:'circulation'});
nodes.push({id: 'Citizen', label:'citizen'});
nodes.push({id: 'Civil_government', label:'civil government'});
nodes.push({id: 'Claim', label:'claim'});
nodes.push({id: 'Coinage', label:'coinage'});
nodes.push({id: 'Colony', label:'colony'});
nodes.push({id: 'Commerce', label:'commerce'});
nodes.push({id: 'Concience', label:'concience'});
nodes.push({id: 'Concord', label:'concord'});
nodes.push({id: 'Concurrence', label:'concurrence'});
nodes.push({id: 'Conduct', label:'conduct'});
nodes.push({id: 'Conscience', label:'Conscience'});
nodes.push({id: 'Consent', label:'consent'});
nodes.push({id: 'Consequence', label:'consequence'});
nodes.push({id: 'Constitution', label:'constitution'});
nodes.push({id: 'Contempt', label:'Contempt'});
nodes.push({id: 'Contract', label:'contract'});
nodes.push({id: 'Contrivance', label:'contrivance'});
nodes.push({id: 'Convenience', label:'convenience'});
nodes.push({id: 'Corporation', label:'corporation'});
nodes.push({id: 'Damage', label:'Damage'});
nodes.push({id: 'Deal', label:'deal'});
nodes.push({id: 'Death', label:'death'});
nodes.push({id: 'Diamond', label:'Diamond'});
nodes.push({id: 'Difference_of_talent', label:'difference of talent'});
nodes.push({id: 'Dignity', label:'Dignity'});
nodes.push({id: 'Disposition', label:'disposition'});
nodes.push({id: 'Dissobedience', label:'dissobedience'});
nodes.push({id: 'Division', label:'division'});
nodes.push({id: 'Division_of_labour', label:'division of labour'});
nodes.push({id: 'Economical_thought', label:'Economical thought'});
nodes.push({id: 'Economy', label:'economy'});
nodes.push({id: 'Ends', label:'Ends'});
nodes.push({id: 'Equality', label:'equality'});
nodes.push({id: 'Error', label:'error'});
nodes.push({id: 'Esthetics', label:'esthetics'});
nodes.push({id: 'Exchange', label:'exchange'});
nodes.push({id: 'Expence', label:'expence'});
nodes.push({id: 'Experience', label:'Experience'});
nodes.push({id: 'Fellow_feeling', label:'fellow feeling'});
nodes.push({id: 'Foreign_trade', label:'Foreign trade'});
nodes.push({id: 'Forms_of_governement', label:'Forms of governement'});
nodes.push({id: 'Fortune', label:'fortune'});
nodes.push({id: 'Foundation', label:'foundation'});
nodes.push({id: 'Free', label:'free'});
nodes.push({id: 'Frugalit\u00E9', label:'Frugalit\u00E9'});
nodes.push({id: 'Government', label:'government'});
nodes.push({id: 'Ground', label:'ground'});
nodes.push({id: 'Hand', label:'hand'});
nodes.push({id: 'Happiness', label:'happiness'});
nodes.push({id: 'History', label:'History'});
nodes.push({id: 'Honour_', label:'Honour'});
nodes.push({id: 'Human_nature', label:'human nature'});
nodes.push({id: 'Humanity', label:'humanity'});
nodes.push({id: 'Idea', label:'idea'});
nodes.push({id: 'Illusion', label:'Illusion'});
nodes.push({id: 'Imagination', label:'imagination'});
nodes.push({id: 'Impartial', label:'impartial'});
nodes.push({id: 'Impartial_spectator', label:'Impartial spectator'});
nodes.push({id: 'Imperfect_right', label:'imperfect right'});
nodes.push({id: 'Impiety', label:'impiety'});
nodes.push({id: 'Inclination', label:'Inclination'});
nodes.push({id: 'Inconsequence', label:'inconsequence'});
nodes.push({id: 'Infancey', label:'Infancey'});
nodes.push({id: 'Injustice', label:'injustice'});
nodes.push({id: 'Interest', label:'interest'});
nodes.push({id: 'Invisible_hand', label:'Invisible hand'});
nodes.push({id: 'Irregularity', label:'Irregularity'});
nodes.push({id: 'Judgement', label:'judgement'});
nodes.push({id: 'Judgment', label:'Judgment'});
nodes.push({id: 'Jurisprudence', label:'jurisprudence'});
nodes.push({id: 'Justice', label:'justice'});
nodes.push({id: 'King', label:'King'});
nodes.push({id: 'Knowledge', label:'knowledge'});
nodes.push({id: 'Labour', label:'labour'});
nodes.push({id: 'Laugh', label:'laugh'});
nodes.push({id: 'Law', label:'law'});
nodes.push({id: 'Laws', label:'Laws'});
nodes.push({id: 'Liberty', label:'Liberty'});
nodes.push({id: 'Limits', label:'Limits'});
nodes.push({id: 'Luxury', label:'luxury'});
nodes.push({id: 'Measure', label:'measure'});
nodes.push({id: 'Mercantilism', label:'mercantilism'});
nodes.push({id: 'Merchandize', label:'merchandize'});
nodes.push({id: 'Method', label:'Method'});
nodes.push({id: 'Misery', label:'misery'});
nodes.push({id: 'Monarchy', label:'Monarchy'});
nodes.push({id: 'Monney', label:'Monney'});
nodes.push({id: 'Moral', label:'moral'});
nodes.push({id: 'Moral_philosophy', label:'Moral philosophy'});
nodes.push({id: 'Motive', label:'motive'});
nodes.push({id: 'Nation', label:'nation'});
nodes.push({id: 'Natural_rights', label:'Natural rights'});
nodes.push({id: 'Neighbour', label:'neighbour'});
nodes.push({id: 'Obedience', label:'Obedience'});
nodes.push({id: 'Obligation', label:'obligation'});
nodes.push({id: 'Occupation', label:'occupation'});
nodes.push({id: 'Oeconomy', label:'oeconomy'});
nodes.push({id: 'Opposite_to_moderation_', label:'Opposite to moderation'});
nodes.push({id: 'Pain', label:'pain'});
nodes.push({id: 'Peace', label:'peace'});
nodes.push({id: 'People', label:'people'});
nodes.push({id: 'Perfect_rights', label:'Perfect rughts'});
nodes.push({id: 'Philosophy', label:'philosophy'});
nodes.push({id: 'Physiocracy', label:'Physiocracy'});
nodes.push({id: 'Physiocrat', label:'physiocrat'});
nodes.push({id: 'Piety/impiety', label:'Piety/impiety'});
nodes.push({id: 'Pleasure', label:'pleasure'});
nodes.push({id: 'Political_philosophy', label:'Political philosophy'});
nodes.push({id: 'Poor', label:'poor'});
nodes.push({id: 'Possession', label:'possession'});
nodes.push({id: 'Power', label:'power'});
nodes.push({id: 'Powers', label:'Powers'});
nodes.push({id: 'Price', label:'price'});
nodes.push({id: 'Principle', label:'principle'});
nodes.push({id: 'Promise', label:'promise'});
nodes.push({id: 'Propensity', label:'propensity'});
nodes.push({id: 'Property', label:'property'});
nodes.push({id: 'Prudence', label:'prudence'});
nodes.push({id: 'Punishment', label:'punishment'});
nodes.push({id: 'Quantity_of_labour', label:'Quantity of labour'});
nodes.push({id: 'Reason', label:'reason'});
nodes.push({id: 'Regard', label:'regard'});
nodes.push({id: 'Regulation', label:'regulation'});
nodes.push({id: 'Religion', label:'religion'});
nodes.push({id: 'Republic', label:'republic'});
nodes.push({id: 'Resentment', label:'resentment'});
nodes.push({id: 'Right', label:'right'});
nodes.push({id: 'Right_of_property', label:'Right of property'});
nodes.push({id: 'Right_of_propriety', label:'Right of propriety'});
nodes.push({id: 'Rights', label:'Rights'});
nodes.push({id: 'Rights_of_property', label:'Rights of property'});
nodes.push({id: 'Rules_of_morality', label:'Rules of morality'});
nodes.push({id: 'Self-interest', label:'Self'});
nodes.push({id: 'Self_command', label:'self command'});
nodes.push({id: 'Self_interest', label:'self interest'});
nodes.push({id: 'Sense', label:'sense'});
nodes.push({id: 'Sense_', label:'Sense'});
nodes.push({id: 'Sentiment', label:'sentiment'});
nodes.push({id: 'Slave', label:'slave'});
nodes.push({id: 'Social_division', label:'Social division'});
nodes.push({id: 'Society', label:'society'});
nodes.push({id: 'Sovereign', label:'sovereign'});
nodes.push({id: 'State', label:'state'});
nodes.push({id: 'Subject', label:'subject'});
nodes.push({id: 'Subsistance', label:'subsistance'});
nodes.push({id: 'Succession', label:'succession'});
nodes.push({id: 'Superstition', label:'superstition'});
nodes.push({id: 'Surety', label:'surety'});
nodes.push({id: 'Surprise', label:'surprise'});
nodes.push({id: 'Surprise_happiness', label:'Surprise happiness'});
nodes.push({id: 'Sympathy', label:'Sympathy'});
nodes.push({id: 'Sympathy_for_death', label:'Sympathy for death'});
nodes.push({id: 'System', label:'System'});
nodes.push({id: 'Sytem', label:'sytem'});
nodes.push({id: 'Theory', label:'theory'});
nodes.push({id: 'Thought', label:'Thought'});
nodes.push({id: 'Toil', label:'toil'});
nodes.push({id: 'Trade-commerce', label:'Trade'});
nodes.push({id: 'Utility', label:'utility'});
nodes.push({id: 'Value', label:'value'});
nodes.push({id: 'Vanity', label:'vanity'});
nodes.push({id: 'Vertue', label:'Vertue'});
nodes.push({id: 'Virtue', label:'virtue'});
nodes.push({id: 'Wealth', label:'wealth'});
nodes.push({id: 'Wisdom', label:'wisdom'});
nodes.push({id: 'abundance', label:'abundance'});
nodes.push({id: 'admiration', label:'admiration'});
nodes.push({id: 'advantages', label:'advantages'});
nodes.push({id: 'appropriation', label:'appropriation'});
nodes.push({id: 'butcher', label:'butcher'});
nodes.push({id: 'colony', label:'colony'});
nodes.push({id: 'concurrence', label:'concurrence'});
nodes.push({id: 'contrivance', label:'contrivance'});
nodes.push({id: 'deal', label:'deal'});
nodes.push({id: 'democracy', label:'democracy'});
nodes.push({id: 'dexterity', label:'dexterity'});
nodes.push({id: 'emotion', label:'emotion'});
nodes.push({id: 'expences', label:'expences'});
nodes.push({id: 'faculty', label:'faculty'});
nodes.push({id: 'father', label:'father'});
nodes.push({id: 'god', label:'god'});
nodes.push({id: 'ignorance', label:'ignorance'});
nodes.push({id: 'imagination', label:'imagination'});
nodes.push({id: 'interest', label:'interest'});
nodes.push({id: 'language', label:'language'});
nodes.push({id: 'luxury', label:'luxury'});
nodes.push({id: 'manufacture', label:'manufacture'});
nodes.push({id: 'master', label:'master'});
nodes.push({id: 'merchant', label:'merchant'});
nodes.push({id: 'motive', label:'motive'});
nodes.push({id: 'neighbour', label:'neighbour'});
nodes.push({id: 'personal_rights_-_real_rights', label:'personal rights - real rights'});
nodes.push({id: 'prudence', label:'prudence'});
nodes.push({id: 'republic', label:'republic'});
nodes.push({id: 'slave', label:'slave'});
nodes.push({id: 'sovereign', label:'sovereign'});
nodes.push({id: 'subsistance', label:'subsistance'});
nodes.push({id: 'succession', label:'succession'});
nodes.push({id: 'theory', label:'theory'});
nodes.push({id: 'utility', label:'utility'});
nodes.push({id: 'wealth', label:'wealth'});
nodes.push({id: 'workman', label:'workman'});


// Add links
// Add links
edges.push({from: 'Action', to: 'Conduct'});
edges.push({from: 'Action', to: 'Consequence'});
edges.push({from: 'Action', to: 'Irregularity'});
edges.push({from: 'Action', to: 'motive'});
edges.push({from: 'Approbation', to: 'prudence'});
edges.push({from: 'Astronomy', to: 'Attention'});
edges.push({from: 'Astronomy', to: 'Surprise'});
edges.push({from: 'Astronomy', to: 'admiration'});
edges.push({from: 'Citizen', to: 'Obedience'});
edges.push({from: 'Conscience', to: 'Error'});
edges.push({from: 'Conscience', to: 'ignorance'});
edges.push({from: 'Contract', to: 'Consent'});
edges.push({from: 'Contract', to: 'Obligation'});
edges.push({from: 'Contract', to: 'Promise'});
edges.push({from: 'Contract', to: 'deal'});

edges.push({from: 'Division_of_labour', to: 'Difference_of_talent'});
edges.push({from: 'Division_of_labour', to: 'Equality'});


edges.push({from: 'Division_of_labour', to: 'Social_division'});
edges.push({from: 'Division_of_labour', to: 'Value'});
edges.push({from: 'Division_of_labour', to: 'advantages'});

edges.push({from: 'Economical_thought', to: 'Contract'});
edges.push({from: 'Economical_thought', to: 'Exchange'});
edges.push({from: 'Economical_thought', to: 'Fortune'});
edges.push({from: 'Economical_thought', to: 'Labour'});
edges.push({from: 'Economical_thought', to: 'Liberty'});
edges.push({from: 'Economical_thought', to: 'Mercantilism'});
edges.push({from: 'Economical_thought', to: 'Physiocracy'});
edges.push({from: 'Economical_thought', to: 'Property'});
edges.push({from: 'Economical_thought', to: 'Wealth'});
edges.push({from: 'Ends', to: 'Justice'});
edges.push({from: 'Ends', to: 'Peace'});
edges.push({from: 'Ends', to: 'Surety'});
edges.push({from: 'Ends', to: 'Wealth'});
edges.push({from: 'Ends', to: 'utility'});
edges.push({from: 'Exchange', to: 'Circulation'});
edges.push({from: 'Exchange', to: 'Propensity'});
edges.push({from: 'Exchange', to: 'Trade-commerce'});
edges.push({from: 'Exchange', to: 'concurrence'});
edges.push({from: 'Forms_of_governement', to: 'Aristocracy'});
edges.push({from: 'Forms_of_governement', to: 'Monarchy'});
edges.push({from: 'Forms_of_governement', to: 'democracy'});
edges.push({from: 'Forms_of_governement', to: 'republic'});
edges.push({from: 'Fortune', to: 'Augmentation'});
edges.push({from: 'Frugalit\u00E9', to: 'luxury'});
edges.push({from: 'Government', to: 'Citizen'});
edges.push({from: 'Government', to: 'Forms_of_governement'});
edges.push({from: 'Government', to: 'Nation'});
edges.push({from: 'Government', to: 'Power'});
edges.push({from: 'Government', to: 'State'});
edges.push({from: 'Government', to: 'sovereign'});
edges.push({from: 'History', to: 'Ages'});
edges.push({from: 'History', to: 'Astronomy'});
edges.push({from: 'History', to: 'language'});
edges.push({from: 'Human_nature', to: 'Conscience'});

edges.push({from: 'Imperfect_right', to: 'Impartial_spectator'});
edges.push({from: 'Invisible_hand', to: 'Concord'});
edges.push({from: 'Judgment', to: 'Accordance'});
edges.push({from: 'Judgment', to: 'Acquaintance'});
edges.push({from: 'Judgment', to: 'Action'});
edges.push({from: 'Judgment', to: 'Approbation'});
edges.push({from: 'Judgment', to: 'Convenience'});
edges.push({from: 'Justice', to: 'Damage'});
edges.push({from: 'Justice', to: 'Punishment'});
edges.push({from: 'Labour', to: 'Division_of_labour'});
edges.push({from: 'Labour', to: 'Frugalit\u00E9'});
edges.push({from: 'Labour', to: 'Pain'});
edges.push({from: 'Laws', to: 'Justice'});
edges.push({from: 'Laws', to: 'Rights'});
edges.push({from: 'Limits', to: 'expences'});
edges.push({from: 'Mercantilism', to: 'Corporation'});
edges.push({from: 'Mercantilism', to: 'neighbour'});
edges.push({from: 'Method', to: 'Experience'});
edges.push({from: 'Method', to: 'Foundation'});
edges.push({from: 'Method', to: 'Ground'});
edges.push({from: 'Method', to: 'Idea'});
edges.push({from: 'Method', to: 'Knowledge'});
edges.push({from: 'Method', to: 'Principle'});
edges.push({from: 'Method', to: 'System'});
edges.push({from: 'Method', to: 'Thought'});
edges.push({from: 'Method', to: 'Wisdom'});
edges.push({from: 'Method', to: 'theory'});
edges.push({from: 'Monarchy', to: 'King'});
edges.push({from: 'Monarchy', to: 'father'});
edges.push({from: 'Moral_philosophy', to: 'Human_nature'});
edges.push({from: 'Moral_philosophy', to: 'Impartial_spectator'});
edges.push({from: 'Moral_philosophy', to: 'Judgment'});
edges.push({from: 'Moral_philosophy', to: 'Sympathy'});
edges.push({from: 'Moral_philosophy', to: 'Vertue'});

edges.push({from: 'Philosophy', to: 'Economical_thought'});
edges.push({from: 'Philosophy', to: 'Esthetics'});
edges.push({from: 'Philosophy', to: 'History'});

edges.push({from: 'Philosophy', to: 'Method'});
edges.push({from: 'Philosophy', to: 'Moral_philosophy'});
edges.push({from: 'Philosophy', to: 'Political_philosophy'});
edges.push({from: 'Philosophy', to: 'Religion'});
edges.push({from: 'Political_philosophy', to: 'Government'});

edges.push({from: 'Promise', to: 'succession'});
edges.push({from: 'Property', to: 'Occupation'});
edges.push({from: 'Property', to: 'Possession'});
edges.push({from: 'Property', to: 'Right_of_property'});
edges.push({from: 'Property', to: 'appropriation'});
edges.push({from: 'Religion', to: 'Invisible_hand'});
edges.push({from: 'Religion', to: 'Piety/impiety'});
edges.push({from: 'Religion', to: 'Superstition'});
edges.push({from: 'Religion', to: 'god'});
edges.push({from: 'Rights', to: 'Cannon_law'});
edges.push({from: 'Rights', to: 'Natural_rights'});
edges.push({from: 'Rights', to: 'Perfect_rights'});
edges.push({from: 'Rights', to: 'Right_of_propriety'});
edges.push({from: 'Rights', to: 'Rights_of_property'});
edges.push({from: 'Rights', to: 'personal_rights_-_real_rights'});
edges.push({from: 'Social_division', to: 'Poor'});
edges.push({from: 'Social_division', to: 'butcher'});
edges.push({from: 'Social_division', to: 'interest'});
edges.push({from: 'Social_division', to: 'master'});
edges.push({from: 'Social_division', to: 'merchant'});
edges.push({from: 'Social_division', to: 'slave'});
edges.push({from: 'Social_division', to: 'workman'});
edges.push({from: 'State', to: 'Ends'});
edges.push({from: 'State', to: 'Limits'});
edges.push({from: 'Sympathy', to: 'Child'});


edges.push({from: 'Sympathy', to: 'Infancey'});

edges.push({from: 'Sympathy', to: 'Sympathy_for_death'});
edges.push({from: 'Sympathy', to: 'Vertue'});
edges.push({from: 'Trade-commerce', to: 'Foreign_trade'});
edges.push({from: 'Trade-commerce', to: 'colony'});
edges.push({from: 'Value', to: 'Diamond'});
edges.push({from: 'Value', to: 'Monney'});
edges.push({from: 'Value', to: 'Price'});
edges.push({from: 'Value', to: 'Quantity_of_labour'});
edges.push({from: 'Vanity', to: 'Appearance'});
edges.push({from: 'Vanity', to: 'Dignity'});
edges.push({from: 'Vanity', to: 'Honour_'});
edges.push({from: 'Vanity', to: 'Illusion'});
edges.push({from: 'Vanity', to: 'Opposite_to_moderation_'});

edges.push({from: 'Vertue', to: 'Prudence'});
edges.push({from: 'Vertue', to: 'Rules_of_morality'});
edges.push({from: 'Vertue', to: 'Self_command'});
edges.push({from: 'Vertue', to: 'Vanity'});
edges.push({from: 'Wealth', to: 'abundance'});
edges.push({from: 'advantages', to: 'contrivance'});
edges.push({from: 'advantages', to: 'dexterity'});
edges.push({from: 'advantages', to: 'manufacture'});
edges.push({from: 'advantages', to: 'subsistance'});
edges.push({from: 'advantages', to: 'wealth'});
edges.push({from: 'imagination', to: 'Admiration'});
edges.push({from: 'imagination', to: 'Affection'});
edges.push({from: 'imagination', to: 'Contempt'});
edges.push({from: 'imagination', to: 'Disposition'});
edges.push({from: 'imagination', to: 'Inclination'});
edges.push({from: 'imagination', to: 'Laugh'});
edges.push({from: 'imagination', to: 'Pleasure'});
edges.push({from: 'imagination', to: 'Powers'});
edges.push({from: 'imagination', to: 'Reason'});
edges.push({from: 'imagination', to: 'Self-interest'});
edges.push({from: 'imagination', to: 'Sense_'});
edges.push({from: 'imagination', to: 'Sentiment'});
edges.push({from: 'imagination', to: 'Surprise_happiness'});
edges.push({from: 'imagination', to: 'emotion'});
edges.push({from: 'imagination', to: 'faculty'});

// create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
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
                scaling: {
                    min: 10,
                    max: 30,
                    
                }
            },
            edges: {
          smooth: false,
          arrows: {to : true }
        },
/*
            edges: {
                width: 4,
                smooth: {
                        type: 'cubicBezier',
                        roundness: 0.4
                    }
            },*/ 
            groups: {
                1: {color:'#b30086'},
                    11:{color:'#ff1ac6'},
                    12:{color:'#ff66d9'},
                    13:{color:'#ffb3ec'},
                    14:{color:'#ffe6f9'},

                2: {color:'#0000b3'},
                    21: {color:'#4d4dff'},
                    22: {color:'#b3b3ff'},
                3: {color:'#1a6600'},
                    31:{color:'#39e600'},
                    32:{color:'#c6ffb3'}, 
                4: {color:'#4d0099'},
                    41:{color:'#9933ff'},
                    42:{color:'#d9b3ff'}
            },


            layout: {
                    hierarchical: {
                        direction: 'tree'
                    }
                },


            interaction:{
                hover: true,
                keyboard: true,
                navigationButtons: true
            },
            physics:false
        };

    // initialize your network!
    var network = new vis.Network(container, data, options);
}
