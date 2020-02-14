const insta = require('instagram-web-api')
const latestTweets = require('latest-tweets')
const https = require('https')



const YouTube = require('youtube-node');
const youTube = new YouTube();
youTube.setKey('AIzaSyCwY8yJMczRAEHjWcTRskFf5fxrHD6fA');




    
const { mySQLConn } = require('../dbConnectivity/dbConnection');

const iClient = new insta({ 
                            username:'',
                            password:''
                        })


exports.getAllSports = async (req, res) => {
    await mySQLConn.query(
        'CALL allSports()',
        (err, rows) => {
            if(!err) return res.status(200).json(rows);
            return res.sendStatus(400).send(err);
        }
    );
};

exports.getAllPlayersInSport = async (req, res) => {
    await mySQLConn.query(
        `CALL allPlayersSportsWise(
            ${req.params.sport_id})`,
        (err, row, fields) => {
            if(!err) return res.status(200).json(row);
            return res.status(400).send(err);
        }
    )
}

exports.getInsta = async (req, res) => {
    await iClient.login()
    await iClient.getUserByUsername({username:req.params.username})
    .then(
        val => res.send(val.edge_owner_to_timeline_media.edges),
        err=> console.log(err)
    )       
}

exports.getPlayerDetails = async (req, res) => {
    await mySQLConn.query(
        `CALL singlePlayerDetails(${req.params.player_id})`, 
        (err, row) => {
            if(!err) return res.status(200).json(row)
            return res.status(400).send(err)
        }
    )
}

exports.searchAll = async (req,res) => {
    await mySQLConn.query(
        `CALL gameOrPlayerSearch('${req.params.data}')`, 
        (err, row) => {
            if(!err) return res.status(200).json(row)
            return res.status(400).send(err);
        }
    )
}

exports.getUTube = async  (req, res) =>{
    await youTube.search(req.params.keyword, 10, ((error, result) => {
        if (error) return console.log(error);
          return res.send(result.items, null, 10);
      })    
    )
}

exports.getTwit = async (req, res) =>{
    await latestTweets(`${req.params.username}`, (err, tweets) => {
        if(!err) res.send(tweets);
        else console.log(err)    
    })
}