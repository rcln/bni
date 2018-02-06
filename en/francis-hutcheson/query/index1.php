<!DOCTYPE html>
<html>
<head>
    <base href="/bni/" />
    <meta charset="utf-8">
    <title>Bibliothèque Numérique des Idées</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="css/mdl/material.min.css">
    <script src="css/mdl/material.min.js"></script>
    <link href="css/style.css" rel="stylesheet">
    <style>
     footer.mdl-mini-footer {
        padding: 32px 16px !important;
    }
    .mdl-layout__content {
        overflow: visible;   
     }
     li.bni-list { cursor: pointer; cursor: hand; }
     ul.subcontent li {
         text-align: justify;
         }
    </style>
    <script src="js/bni-config.js"></script>
    <?php $query_string= addslashes($_REQUEST["query"]); ?>
</head>
<body class="">
    <div class="container mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header class="header mdl-layout__header">
            <div class="mdl-layout__header-row">
                <span class="mdl-layout-title">
                    <a href="/bni/">Bienvenue dans la Bibliothèque Numérique des Idées</a>
                </span>
                <div class="mdl-layout-spacer"></div>
                <nav class="mdl-navigation">
                </nav>
            </div>
        </header>
                    <!-- div class="header-img-avatar">
                        <div class="img-container">
                            <img class="img-avatar" src="adam-smith.jpg" style="margin-left: -4vh;">
                        </div>
                    </div-->

        <style>
            .node circle {
                fill: #2a7c92;
                cursor: pointer;
            }
            .node text {
                font: 10pt sans-serif;
                cursor: pointer;
            }
            .node--internal circle {
                fill: #555;
            }
            .node--main circle {
                fill: #c62828;
            }
            .node--internal text {
              text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
            }
            .node circle#circle-root {
            }
            .link {
              fill: none;
              stroke: #555;
              stroke-opacity: 0.4;
              stroke-width: 1.5px;
            }
            #back-to-graph {
                margin-top: -100px;
                margin-left: 10px;        
            }
        </style>

        <main class="content mdl-layout__content">
            <section class="mdl-grid">
                <div class="mdl-cell--6-col">
                    <div class="header-img-avatar--secondary">
                        <div class="img-container">
                            <img class="img-avatar--secondary" src="francis-hutcheson.jpg" style="margin-left: -3vh;">
                        </div>
                        <h6 class="main-title--secondary">Immersion dans l'oeuvre de <br>Francis Hutcheson</h6>
                    </div>
                </div>
                <div class="mdl-cell--6-col">
                    <form action="/bni/francis-hutcheson/search-fh/" class="search search--secondary" autocomplete="off">
                        <div class="mdl-textfield mdl-js-textfield">
                            <input id="query" class="mdl-textfield__input" type="text" 
                                placeholder="Recherche" value="<?php echo $_REQUEST["query"];?>" >
                        </div>
                        <button id="search" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                            <label class="mdl-button mdl-js-button mdl-button--icon">
                                <i class="material-icons">search</i>
                            </label>
                            Chercher
                        </button>
                    </form>
                </div>

                <div id="result" class="mdl-cell 
                            mdl-cell--12-col mdl-cell--12-col-desktop 
                            mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                        <div style="background-color: transparent;" class="mdl-card mdl-card--expand mdl-cell mdl-cell--12-col">
                            <div class="query-from mdl-card__supporting-text  mdl-cell mdl-cell--12-col">
                                <span class="mdl-color-text--blue-grey-900">Résultats:</span> 
                                <span class="mdl-color-text--blue-grey-900 title-bold"><?php echo $_REQUEST["query"];?></span>
                            </div>
                            <div id="result-not-found" class="mdl-card__supporting-text mdl-cell mdl-cell--12-col" style="display: none;">
                                <h5 class="center">Aucun résultat trouvé pour "<b><?php echo $_REQUEST["query"];?></b>".</h5>
                            </div>
                            <div id="result-items" class="mdl-cell mdl-cell--12-col" style="display: none;" >
                                <div class="mdl-card__title">
                                    <h4 class="mdl-card__title-text mdl-color-text--deep-orange-900">Par oeuvre</h4>
                                </div>
                                <div id="works">
                                </div>
                            </div>
                            <div id="concepts" class="mdl-cell mdl-cell--12-col">
                                <div class="mdl-card__title">
                                    <h4 class="mdl-card__title-text mdl-color-text--deep-orange-900">Concepts philosophiques</h4>
                                </div>
                                <div class="mdl-card__media mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col">
                                    <svg id="ontograph"></svg>
                                </div> 
                            </div> 
                        </div> 
                </div>
            </section>
        </main>
        <footer class="mdl-mini-footer">
            <div class="mdl-mini-footer__left-section">
                <div class="mdl-logoi really-mini">Financé par le Labex EFL</div>
                <div class="mdl-logoi really-mini">
                    La plupart des oeuvres indexées proviennent de Gallica. Nous remercions les éditeurs Dalloz, PUF et Vrin pour avoir mis à notre disposition «Leçons sur la jurisprudence»,"Théorie des sentiments moraux» d’Adam Smith et «Le système de philosophie morale» de Francis Hutcheson. 
                </div>
            </div>
        </footer>

    </div>
    <script src="js/jquery-1.10.2.js"></script>
    <script src="js/main.js"></script>
    <script src="francis-hutcheson/js/search.js"></script>
    <script src="js/d3.v4.min.js"></script>
    <script>
        var url_thesaurus = "data/thesaurus/bni-thesaurus-francis-hutcheson.json";
        var default_author_search = "/bni/francis-hutcheson/search-fh/";
        var default_author = "francis-hutcheson";
    </script>
    <script src="js/onto.d3-beta.js"></script>
    <script src="js/solr.query-beta.js"></script>
    <script>
        var query_string = decodeURI('<?php echo $query_string; ?>'); 
        bnisolr(query_string);
    </script>


</body>
</html>
