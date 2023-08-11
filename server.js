const express = require('express');
const cors = require('cors');
const path = require('path');
const archive_url = 'http://localhost:3000/archive';

const app = express();
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const ReadArchive = async (url) => {
    const response = await fetch(url);
    const status = response.status;
    const data = await response.json();
    return data ;
};

const json_file = './data.json';
app.get('/archive', (req,res) => {
    res.json(require(json_file));
})

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTweets', async(req,res, next) => {
    const data = await ReadArchive(archive_url);

    if(data != null){
        //requirements:
        //create time: created_at
        //id: id
        //tweet text: text
        //Retrieves the necessary information from the json file.
        const tweetDate = data.map(item => item.created_at);
        const tweetID = data.map(item => item.id_str);
        const tweetTxt = data.map(item => item.text);

        //returns a json file containing the requirements.
        return res.status(200).json({
            tweetDate: tweetDate,
            tweetID: tweetID,
            tweetTxt: tweetTxt
        });

    }
    else{
        return res.status(401).json({"message":"Error"});
    }
});

//Retrieves all the users from the json file: Total of 9, even extracts the ones that are mentions.
app.get('/getUsers', async(req,res, next) => {
    //Borrowed the readarchive function from the apidemo3
    const data = await ReadArchive(archive_url);
    //checks to see if the data is null
    if(data != null){
        //gets all the screen_names that are not mentions
        const users = data.map(item => item.user.screen_name);
        //gets all the mentioned users from the json file and flattens them in order to be able to add them into our array
        const mentions = data.map(item => item.entities.user_mentions.map(mention => mention.screen_name)).flat();
        //Combines all the names gathered
        const allNames = users.concat(mentions);
        //Creates a new array from the two arrays we created.
        const uniqueNames = Array.from(new Set(allNames));
        //sorts the users in alphabetical order.
        uniqueNames.sort();
        //returns that array and will be displayed on the site.
        return res.status(200).json(uniqueNames);
    }
    else{
        return res.status(401).json({"message":"Error"});
    }

});

//Retrieves the details of a tweet given the id of said tweet
app.get('/tweetDetails/:tweetId', async(req,res, next) => {
    const id = req.params.tweetId;
    const data = await ReadArchive(archive_url);
    const tweet = [];

    if(data != null){
        
        data.forEach(element => {
            if(element.id_str == id){
                tweet.push({
                    created_at: element.created_at,
                    id_str: element.id_str,
                    text: element.text,
                    source: element.source,
                    retweet_count: element.retweet_count,
                    hashtags: element.entities.hashtags,
                    user_mentions: element.entities.user_mentions.flat
                });     
            }
        });
            
    }
    if(tweet.length >0){
        return res.status(200).json(tweet);
    }
    else{
        return res.status(404).json({message:"Tweet with that id does not exist"});
    }
    
});

//Retrieves the detailed information of a given twitter user given the screen name
app.get('/getProfile/:profile', async(req,res, next) =>{
    const screenname = req.params.profile;
    const data = await ReadArchive(archive_url);
    const profile = [];

    if(data != null){
        data.forEach(element => {
            if(element.user.screen_name == screenname){
                profile.push({
                    Profile_ID: element.user.id_str,
                    Name: element.user.name,
                    ScreenName: element.user.screen_name,
                    Location: element.user.location,
                    follower_count: element.user.followers_count,
                    friends_count: element.user.friends_count,
                    listed_count: element.user.listed_count,
                    created: element.user.created_at,
                    favorite_count: element.user.favorites_count


                })
            }
        })
    }
    if(profile.length > 0){
        return res.status(200).json(profile);
    }
    else{
        return res.status(404).json({message:"Profile with that screen name was not found"});
    }
})
module.exports = app;

const http = require('http');

const port = 3000;

const server = app.listen(3000, () => {
    console.log(`Server is connected at port: ${port}`);
})
