# music-merge-2
An application that allows users to "merge" their playlists from other online streaming services to their connected Spotify Account.
(Currently supports merging from the Deezer platform... waiting on SoundCloud Developer account)

### Visuals
<img width="400" alt="Screen Shot 2022-09-13 at 6 34 20 PM" src="https://user-images.githubusercontent.com/81380688/190038794-79a97d9c-4105-4f9e-8003-3148d952010e.png"> <img width="400" alt="Screen Shot 2022-09-13 at 6 34 34 PM" src="https://user-images.githubusercontent.com/81380688/190038821-6d0646fc-5cae-42df-8416-76c54bb8c52e.png">
<img width="400" alt="Screen Shot 2022-09-13 at 6 35 09 PM" src="https://user-images.githubusercontent.com/81380688/190038883-2a313f33-14ce-43d1-aff5-5911386d20d2.png"> <img width="400" alt="Screen Shot 2022-09-13 at 6 35 44 PM" src="https://user-images.githubusercontent.com/81380688/190038968-ca170c2f-f2d1-494b-bd4f-eed353884048.png">


### Technologies Used
#### clientside
- React.js, CSS
#### serverside
- Express.js, Node.js
- Spotify API, Spotify OAuth
#### backend
- MongoDB

## Features
- [x] User account creation and login + (encrypted in database)
- [x] Allow users to connect Spotify Account and search for songs to add to their Spotify playlist
- [x] Allow users to import songs from Deezer playlist and add to their Spotify playlist
- [x] Merge page where users can view songs to be merged and remove songs from queue, and merge to selected playlist
- [x] Artist page where users can view their followed artists on Spotify and add from artists' top songs to merge queue
- [x] User can change email

#### Roadmap/Future Features
- [ ] Account Settings: User can change password, profile picture, and connected Spotify Account
- [ ] Light and dark mode
- [ ] Library page to view recent and favorited songs/playlists
- [ ] More accurate import of songs 
- [ ] Create playlists on music merge
- [ ] Allow user to customize home page


