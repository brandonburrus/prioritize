const router = require("../router");
const { firebase, createToken } = require("../util");

module.exports = [
  router("/auth/signup").post(async req => {
    const signup = await firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password);
    const token = createToken({
      userId: signup.user.uid,
    });
    return {
      status: 201,
      msg: "Sign up was successful!",
      token,
    };
  }),

  router("/auth/login").post(async req => {
    const login = await firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password);
    const token = createToken({
      userId: login.user.uid,
    });
    return {
      status: 200,
      msg: "User was successfully logged in!",
      token,
    };
  }),
];
