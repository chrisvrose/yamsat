# yamsat

**Y**et **A**nother **M**ongoose-based **S**tateless **A**PI **T**est, is a simple backend for storing information about various sports players.

Note: A mongodb server is required. It will use the collection `playerInfo`.

## Usage

Use `config/generalConfig.js` to provide any configuration required.
It is recommended to start the database fresh.

```bash
npm i
# other config
npm start
```

## Endpoints

### /

- GET - Get links

### /players

- GET : Get list of players
- POST : Insert new player

### /players/:id

- PUT : Modify/update player with id
- DELETE : Remove player with id

## Route input formats

### /players/:id PUT

```json
{
    "playerName":"<String>",
    "age": "<Number>",
    "skill": "<[String]>"
}
```

### /players/ POST

```json
{
    "college":"<String>",
    "sport":"<String>",
    "player":{
        //Refer to above PUT request
    }
}
```

Dependencies: `mongoose express body-parser`
