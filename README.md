# Api de gestion de projet

### Installation

Ce projet néccessite un environnement avec [Node](https://nodejs.org/en/) v10, de [NPM](https://www.npmjs.com/) v6 et d'un serveur de base de données [Mongo](https://www.mongodb.com/fr).

Une fois c'est environnement en place, placez vous à la racine du projet et installez les dependances avec la commande.

Ouvrez le fichier `config\env.js` et renseignez l'Url et le Port d'accés à votre serveur Mongo dans les champs :
```
    "databaseName": 'myDatabase',
    "databaseUrl": '127.0.0.1',
    "databasePort": '27017'
```

Une fois cette étape terminée, rendez vous à la racine du projet puis installez les dépendances avec la commande :

```sh
$ npm install
```
### Utilisation

Pour démarrer le serveur faites :
```sh
$ npm start
```

la documentation de l'API sera consultable à l'adresse `localhost:3600/api-docs`

Vous pouvez lancer les test API avec la commande :
```sh
$ npm test
```

Vous pouvez aussi inserer des données fictives afin de pouvoir tester les routes.

Pour insérer les données faites :
```sh
$ npm run load_fixtures
```

Vous aurez un utilisateur dont l'email est `admin@admin.com` et le mot de passe `password` avec lequel vous pourrez vous authentifier et avoir un token pour utiliser les endpoints.

Pour nettoyer la base de données de vos données fictives utilisez la commande :
```sh
$ npm run unload_fixtures
```

License
----

MIT

