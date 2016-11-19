# Jupyter_module
DragonBox est un jeu éducatif visant à enseigner l’algèbre de façon ludique à des écoliers et collégiens. Le but du jeu étant de manipuler des formules via drag’n drop afin de les résoudre. Notre client est un particulier qui travaille dans le secteur de l’enseignement supérieur. Il est amené à fréquemment utiliser Sage dans le cadre de ses cours. Après avoir découvert le jeu DragonBox, il trouva l’interface de Sage trop rudimentaire et compliqué pour ses étudiants. Il aimerait donc apporter à celui-ci des améliorations afin de rendre son utilisation plus divertissant. Pour le moment nous disposons d’une interface de Sage nommée Jupyter. C’est une application serveur-client développée en JavaScript qui utilise MathJax, une librairie qui permet d’afficher des notations mathématiques, permet de les éditer ainsi que de faire tourner des notebooks via un navigateur web. Ces notebooks sont des feuilles de calculs qui proposent une présentation plus lisible que l’utilisation de Sage en ligne de commande. Ainsi, les travaux effectués avec Sage peuvent être facilement édités, sauvegardés et partagés. Cependant, l’utilisation de Jupyter nécessite tout de même la connaissance des commandes Sage.

# Display latex expression
%display latex

# add code in notenook/templates/notebook.js

<!-- Include header sageDragon ---------------------------->
{% include base_url + "/sageDragon/templates/header.html" %}
<!--------------------------------------------------------->

#add module sageDragon

import notebook.nbextensions
notebook.nbextensions.install_nbextension('local/lib/python2.7/site-packages/notebook/sageDragon/extensions/sagedragon.js', user=True)


<!--activer le script-->

%%javascript
Jupyter.utils.load_extensions('sagedragon')

#clone repositories path
local/lib/python2.7/site-packages/notebook/sageDragon



