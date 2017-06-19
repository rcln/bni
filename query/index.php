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
                font: 12pt sans-serif;
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
                            <img class="img-avatar--secondary" src="adam-smith.jpg" style="margin-left: -3vh;">
                        </div>
                        <h6 class="main-title--secondary">Immersion dans l'oeuvre <br>d'Adam SMITH</h6>
                    </div>
                </div>
                <div class="mdl-cell--6-col">
                    <form action="/bni/search/" class="search search--secondary" autocomplete="off">
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

                <div class="mdl-card mdl-card--expand mdl-cell mdl-cell--12-col mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                    <div class="mdl-card__supporting-text mdl-cell mdl-cell--12-col ">
                        <div class="query-from">
                            <span class="mdl-color-text--blue-grey-900">Résultats:</span> 
                            <span class="mdl-color-text--blue-grey-900 title-bold"><?php echo $_REQUEST["query"];?></span>
                        </div>
                        <div id="result" style="display: none;">
                            <h4 class="title-bold mdl-color-text--deep-orange-900">Par oeuvre</h4>
                            <div id="works">
                            </div>
                            <div id="concepts">
                            <h4 class="title-bold mdl-color-text--deep-orange-900">Concepts philosophique</h4>
                            <div class="mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col">
                                <svg id="ontograph"></svg>
                            </div> 
                            </div> 
                        </div> 
                        <div id="result-not-found" style="display: none;">
                            <h5 class="center">Aucun résultat trouvé pour "<b><?php echo $_REQUEST["query"];?></b>".</h5>
                        </div> 
                     </div>
                </div>
            </section>
        </main>
        <footer class="mdl-mini-footer">
            <div class="mdl-mini-footer__left-section">
                <div class="mdl-logoi really-mini">Financé par le Labex EFL</div>
            </div>
        </footer>
    </div>
    <script src="js/jquery-1.10.2.js"></script>
    <script src="js/main.js"></script>
    <script src="js/search.js"></script>
    <script src="js/d3.v4.min.js"></script>
    <script src="js/onto.d3.js"></script>
    <script src="js/solr.query.js"></script>
    <script>
        var query_string = decodeURI('<?php echo $query_string; ?>'); 
        bnisolr(query_string);
    </script>


</body>
</html>
