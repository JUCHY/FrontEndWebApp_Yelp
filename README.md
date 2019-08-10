# Yelp App


FrontEnd Web App Application Challenge
Git clone repository
Run by cding into folder, then npm install, then type in node app.js in command prompot, then visit localhost:3000 on your browser

Main problem I had was with cors request. Especially with distance API(which I didn't have time to figure out) Since the Yelp API didn't provide a direct distance measurement, and determining distance just based of latitude/longitude isn't that reliable I decided to use the google's distance matrix api to get distance values, but that didn't work out too well, as I kept meeting cors request,possibly because I might have been doing too many requests at once? Preferably I would've tried to just estimated the distnaced based of latitude/longitude, and would've foregone the need for all those api requests. I could also have waited for the page to load, stored all that data, then make a single request for all that data after everything else is done.

***Fixed the Cors Request with Distance Matrix Api, had forgotten to use thingproxy. Distance take a while to load though due to this method, but on the other side, everything else loads fast, and finishes before the distance requests, so this doesn't slow other aspects of the App down, but if I had time I would still like to try some of the other solutions I mentioned. 
As of now, event sorting is done by comparing latitude/longitude instead of Google's distance measurements which takes in other factors, such as the path needed to get to the location, this is why the distance and time giving by google don't match my sorting.
