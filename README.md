Instructions to be able to run Assignment 3 Successfully.
Move index.html, server.js and data.json into a folder together.
Open folder with VS Code.
Within VS Code terminal run the commands 'npm init'
*May need to install express and cors which is done by running the command 'npm install express' and 'npm install cors'
After this click enter until terminal is fine.
After this is done you should get the node modules and should be able to run the program.
To start the program run the command: node server.js
After this open webbrowser with address: http://localhost:3000/ or http://127.0.0.1:3000/
A webpage with buttons and text boxes should appear. 
To get all the tweets from json file simply click button labeled get all tweets
To get all users click button labeled get all users
To get all external links click button labeled get all external links
To get tweet details: Input a tweet ID into the text box, if it is valid tweet details should appear under links
To get profile information: Input a valid case-sensitive username, if valid it should appear at bottom of page.

IF using thunder client:
getUsers: http://localhost:3000/getUsers or http://127.0.0.1/getUsers -> will return a json file with two arrays Array 1 is normal users attached to tweets, Array 2 is mentioned users from tweets
getTweets: http://localhost:3000/getTweets or http://127.0.0.1/getTweets -> will return three pieces of information which are date, ID and text
getLinks: http://localhost:3000/getLinks or http://127.0.0.1/getLinks -> returns a list of Links separated by tweet ID
Tweet details: http://localhost:3000/tweetDetails/:tweetID or http://127.0.0.1/tweetDetails/:tweetID -> Gives us tweet details
(tweetID) should be replaced with a valid ID from a tweet
Profile details: http://localhost:3000/getProfile/:profile or http://127.0.0.1/getProfile/:profile 
(profile) should be replaced with a valid screenname of a user that was not part of the mentioned users list
