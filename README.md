# Remindr

## Description

Le but du projet est de créer des rappels pour les différents projets, devoirs, ou attendus à rendre sur des
classes, des groupes et autres, avec les détails de contexte nécessaires.

## Attendus

- Authentification utilisateur utilisant next-auth, vous pouvez utiliser n’importe quel provider.
- Une landing page simple pour présenter le produit, accessible par tout le monde
- Une interface de gestion des Remindr réservé aux utilisateurs authentifiés

### Fonctionnalités de Remindr

- Pouvoir créer des groupes où vous pouvez inviter d’autres utilisateurs de la plateforme (pas besoin de
mail ou autre, simplement sélectionner un utilisateur pour l’ajouter au groupe)
- Les utilisateurs faisant parti d’un groupe peuvent ajouter des rappels à l’intérieur de ce groupe avec les
propriétés suivantes :
- Title
- Date de rendu
- Description
- Couleur
- Photo (optionnel)
- Les utilisateurs du groupe peuvent modifier, et supprimer tous les rappels faisant parti de ce groupe
- Lorsqu’un rappel arrive presque à terme (1 semaine avant), un email doit être envoyé à tous les
utilisateurs du groupe pour leur rappeler que le projet arrive à terme bientôt.
- Les groupes doivent être affichés dans l’interface et modifiable par toute personne du groupe
- On ne doit voit que les groupes dont on fait parti
- Une fois que l’on accède à un groupe, on accède à tous les rappels de ce groupe

## Getting Started

### 1. Cloner le projet

```
git clone https://github.com/alexiglnt/Remindr.git
npm install
```

### 2. Configurer l'environnement local

Copier .env.local.example dans .env.local (ignorer par Git):

```
cp .env.local.example .env.local
```

Ajouter un ou plusieurs provider (e.g. Google, Twitter, GitHub, Email, etc).

### 3. Créer une base de données et générer la avec prisma
  
  ```
  npx prisma generate
  npx prisma db push
  ```


### 4. Lancer le projet

Pour lancer le projet en mode développement, utilisez:

```
npm run dev
```

Pour lancer le projet en mode production, utilisez:

```
npm run build
npm run start
```

