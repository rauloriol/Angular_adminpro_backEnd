
// (145) Importacion de la pagina de google -->https://developers.google.com/identity/sign-in/web/backend-auth
const {OAuth2Client} = require('google-auth-library');



var client = new OAuth2Client(process.env.GOOGLE_ID,process.env.GOOGLE_SECRET,'');

const  googleVerify =async (token) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,  

  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];

  console.log(payload);
  const {name,email,picture} = payload;
    return {name,email,picture}; 
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}


module.exports={googleVerify} // lo exportamos a auth_controller