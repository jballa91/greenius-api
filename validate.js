require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (error, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

async function isTokenValid(token) {
  if (token) {
    const result = new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getKey,
        {
          audience: process.env.API_IDENTIFIER,
          issuer: `${process.env.AUTH0_DOMAIN}/`,
          algorithms: ["RS256"],
        },
        (error, decoded) => {
          if (error) {
            resolve({ error });
          }
          if (decoded) {
            resolve({ decoded });
          }
        }
      );
    });

    return result;
  }

  return { error: "No token provided" };
}

module.exports = { isTokenValid };
