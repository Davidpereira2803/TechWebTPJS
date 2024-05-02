# TP07 - JavaScript & JQuery

## Fichiers 

Le projet a 3 fichier principaux:

* index.html -> contient le code HTML necessaire pour la page web

* style.css -> contient le code CSS pour rendre la page web plus belle

* script.js -> contient JavaScript pour pouvoir ajouter, supprimer et bouger les livres d'une liste à l'autre

## Fonctionement

Afin de pouvoir bouger les livres on utilise des events de JavaScript et on donne un paramètre draggable comme true aux livres pour dire qu'ils peuvent être selectioné avec la souris et bouger. Pour pouvoir déposer les livres il faut donner un event à la place ou on veut les déposer. Dans notre cas un div qui represente un carreau dans la page web. 

Pour les livres on a une liste qui contient les livres et on peut ajouter des livres par un form sur la page web, qui rajoute un livre à la liste, on peut aussi supprimer les livres avec un button dans la case de chaque livre. Pour ajouter un livre on doit remplir les 4 inputs, name, author, price et id. Quand un livre et déplacer on change son status de vente. 