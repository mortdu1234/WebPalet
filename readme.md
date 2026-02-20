# Application de WebPalet

Une application web permettant de dessiner des formes géométriques sur une zone de dessin, de les déplacer et de les supprimer.

Projet Réalisé par ROBERT Denis et ANDRINIRINA Gatien

---

## Lancement

Ouvrez simplement le fichier `template.html` dans un navigateur moderne. Aucune installation requise.

---

## Interface

L'interface est divisée en deux zones :

- **Panneau de gauche (10%)** : zone de sélection contenant les formes disponibles, le sélecteur de couleur et les contrôles.
- **Zone de dessin (90%)** : espace principal où les formes sont créées et manipulées.

---

## Utilisation

### 1. Choisir une couleur

Cliquez sur le sélecteur de couleur (carré coloré) dans le panneau gauche pour choisir la couleur de vos formes. La couleur s'applique à la prochaine forme dessinée.

### 2. Sélectionner une forme

Cliquez sur l'une des trois formes dans le panneau gauche :

- **Cercle** : dessine un cercle inscrit dans le rectangle de sélection.
- **Rectangle** : dessine un rectangle plein.
- **Triangle** : dessine un triangle isocèle.

### 3. Dessiner une forme (mode *draw*)

En mode **draw** (mode par défaut) :

1. Cliquez et maintenez le bouton de la souris dans la zone de dessin pour définir le point de départ.
2. Faites glisser la souris — un aperçu en pointillés s'affiche en temps réel.
3. Relâchez le bouton pour valider la forme. Elle est créée si le déplacement dépasse 10 pixels.

> Si vous relâchez la souris en dehors de la zone de dessin, l'action est annulée.

### 4. Changer de mode

Cliquez sur le bouton **"Changer de Mode"** pour cycler entre les trois modes disponibles. Le mode actuel est affiché sous le bouton.

| Mode | Description |
|------|-------------|
| `draw` | Dessine de nouvelles formes |
| `move` | Déplace les formes existantes |
| `suppr` | Supprime les formes au clic |

### 5. Déplacer une forme (mode *move*)

En mode **move** :

1. Cliquez sur une forme dans la zone de dessin et maintenez.
2. Relâchez la souris à l'endroit souhaité.

La forme se déplace de la différence entre le point de clic initial et le point de relâchement.

### 6. Supprimer une forme (mode *suppr*)

En mode **suppr**, cliquez simplement sur n'importe quelle forme dans la zone de dessin pour la supprimer immédiatement.

### 7. Recolorer une forme existante (mode *draw*)

En mode **draw**, cliquer sur une forme déjà présente dans la zone de dessin la redessine avec la couleur actuellement sélectionnée.
