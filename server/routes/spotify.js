require("dotenv").config();
const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const router = express.Router();
const jwtToken = require("jsonwebtoken");
const jwt = require("../utils/jwt");
const spotify = require("../utils/spotify");
const SpotifyAcc = require("../models/SpotifyAcc");
const App = express();
const { CustomError } = require("../utils/createError");
const User = require("../models/Users");
const bcrypt = require("bcrypt");

router.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const scopes =
  "user-read-private user-read-email streaming user-library-read user-library-modify user-read-playback-state user-read-recently-played user-follow-read playlist-modify-public playlist-modify-private playlist-read-private";

const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

router.get("/spotify-login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state,
    scope: scopes,
    show_dialog: true,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return next(new CustomError("Missing username field."));
  }
  if (!password) {
    return next(new CustomError("Missing password field."));
  }

  const user = await User.findOne({ username });
  bcrypt.compare(password, user?.password, function (err, result) {
    if (err || !result) {
      return next(
        new CustomError("User does not exist or password does not match.")
      );
    } else {
      App.locals.userId = user.id;
      const accessToken = jwtToken.sign({ id: user._id }, process.env.JWT);
      res.json({ accessToken, userId: user.id });
    }
  });
});

router.get("/callback", (req, res, next) => {
  const code = req.query.code || null;

  const data = querystring.stringify({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  });

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${new Buffer.from(
      `${CLIENT_ID}:${CLIENT_SECRET}`
    ).toString("base64")}`,
  };

  axios
    .post("https://accounts.spotify.com/api/token", data, { headers })
    .then((res) => {
      if (res.status == 200) {
        const { access_token, refresh_token, expires_in } = res.data;

        const storeTokens = async () => {
          try {
            const userId = App.locals.userId;
            const profile = await spotify.getCurrentUserProfile(access_token);
            const spotifyId = profile.data.id;

            App.locals.spotifyId = spotifyId;

            const found = await SpotifyAcc.findOne({ userId, spotifyId });
            if (found) {
              await SpotifyAcc.findOneAndUpdate(
                { userId, spotifyId },
                {
                  accessToken: access_token,
                  refreshToken: refresh_token,
                  expiresIn: expires_in,
                  timeStamp: Date.now(),
                }
              );
            } else {
              const newSpotifyAcc = new SpotifyAcc({
                userId: userId,
                spotifyId: spotifyId,
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresIn: expires_in,
                timeStamp: Date.now(),
              });
              await newSpotifyAcc.save();
            }
          } catch (err) {
            next(err);
          }
        };

        storeTokens();
        res.redirect(process.env.CLIENT_BASE_URL);
      } else {
        res.redirect(
          `/?${querystring.stringify({
            error: "invalid_token",
          })}`
        );
      }
    })
    .catch(() => {
      res.redirect(process.env.CLIENT_BASE_URL);
    });
});

router.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;
  const data = querystring.stringify({
    grant_type: "refresh_token",
    refresh_token,
  });
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${new Buffer.from(
      `${CLIENT_ID}:${CLIENT_SECRET}`
    ).toString("base64")}`,
  };
  axios
    .post("https://accounts.spotify.com/api/token", data, { headers })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/tokens", jwt.verifyJWT, async (req, res, next) => {
  try {
    const userId = req.userId;
    const tokens = await SpotifyAcc.findOne({ userId });
    console.log(tokens);
    res.status(200).json(tokens);
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/tokens", jwt.verifyJWT, async (req, res, next) => {
  try {
    const userId = req.userId;
    const spotifyId = App.locals.spotifyId;
    const { accessToken, timeStamp } = req.body;
    await SpotifyAcc.findOneAndUpdate(
      { userId, spotifyId },
      { accessToken, timeStamp }
    );
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});
module.exports = router;
