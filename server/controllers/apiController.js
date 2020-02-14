const insta = require('instagram-web-api')
const latestTweets = require('latest-tweets')

const dotenv = require('dotenv');
dotenv.config();

const YouTube = require('youtube-node');
const youTube = new YouTube();
youTube.setKey('AIzaSyC21gqnc2mgRM868_nMwBeaiHQ0L2QISwQ');




const { mySQLConn } = require('../dbConnectivity/dbConnection');

const iClient = new insta({ 
                            username:'',
                            password:''
                        })


exports.getAllSports = (req, res) => {
    mySQLConn.query(
        'CALL allSports()',
        (err, rows, fields) => {
            if(!err) return res.status(200).json(rows);
            return res.sendStatus(400).send(err);
        }
    );
};

exports.getAllPlayersInSport = (req, res) => {
    mySQLConn.query(
        `CALL allPlayersSportsWise(
            ${req.params.sport_id})`,
        (err, row, fields) => {
            if(!err) return res.status(200).json(row);
            return res.status(400).send(err);
        }
    )
}

exports.getInsta = (req, res) =>{
    (async () => {
        await iClient.login()
            await iClient.getUserByUsername({username:req.params.username})
            .then(
                val => res.send(val.edge_owner_to_timeline_media.edges),
                err=> console.log(err)
            )
        
      })()
}

exports.getPlayerDetails = (req, res) => {
    mySQLConn.query(
        `CALL singlePlayerDetails(${req.params.player_id})`, 
        (err, row) => {
            if(!err) return res.status(200).json(row)
            return res.status(400).send(err)
        }
    )
}

exports.searchAll = (req,res)=>{
    mySQLConn.query(
        `CALL gameOrPlayerSearch('${req.params.data}')`, 
        (err, row) => {
            if(!err) return res.status(200).json(row)
            return res.status(400).send(err);
        }
    )
}

exports.getUTube =  (req, res) =>{
    youTube.search(req.params.keyword, 10, ((error, result)=> {
        if (error) {
          console.log(error);
        }
        else {
          res.send(result.items, null, 10);
        }
      })    
    )}

exports.getTwit = async (req, res) =>{
    await latestTweets(`${req.params.username}`, (err, tweets)=>{
        if(!err) res.send(tweets);
        else console.log(err)    
    })
}






