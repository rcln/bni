<!DOCTYPE html>
<html>
<head>
    <base href="/bni/" />
    <meta charset="utf-8">
    <title>Adam SMITH</title>
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
    <link href="css/vis.css" rel="stylesheet">
    <script src="js/vis.js"></script>

    <script>
        var response = <?php $query_string= addslashes($_REQUEST["query"]);
                        $data = file_get_contents("http://localhost:8080/solr/bni_adam_smith/select?hl=on&indent=on&wt=json&q=type:primary_literature%20AND%20page:'".urlencode($query_string)."'");
                        echo $data; ?>;
        var query_string = decodeURI('<?php echo $query_string; ?>');
    </script>

    <script type="text/javascript" src="js/onto.js"></script> 
</head>
<body class="" onload="draw();">
    <div class="container mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header class="header mdl-layout__header">
            <div class="mdl-layout__header-row">
                <span class="mdl-layout-title"></span>
                <div class="mdl-layout-spacer"></div>
                <nav class="mdl-navigation">
                    <div class="header-img-avatar">
                        <div class="img-container">
                            <img class="img-avatar" src="adam-smith.jpg" style="margin-left: -4vh;">
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <main class="content mdl-layout__content">
            <h2 class="center">Immersion dans l'oeuvre d'Adam SMITH</h2>
            <section class="mdl-grid">
                <div class="mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                    <div class="mdl-card__supporting-text mdl-cell mdl-cell--12-col ">
                            <div class="query-from">
                                <span class="mdl-color-text--blue-grey-900">Résultats:</span> 
                                <span class="mdl-color-text--blue-grey-900 title-bold"><?php echo $_REQUEST["query"];?></span>
                            </div>
                            <h4 class="title-bold mdl-color-text--orange-500">Par oeuvre</h4>
                            <div id="works">
                            </div>
                        <h4 class="title-bold mdl-color-text--orange-500">Concepts philosophique</h4>
                        <div class="mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col">
                            <div id="onto"></div>
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
    <script src="js/solr.query.js"></script>
</body>
</html>
