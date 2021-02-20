const router = require("../router");
const { firebase, createToken } = require("../util");

module.exports = [
  router("/auth/signup").post(async (req, log) => {
    const signup = await firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password);
    log.debug(
      "Successfully signed up user via firebase",
      { email: req.body.email },
      signup
    );
    const token = createToken(
      {
        userId: signup.user.uid,
        name: signup.user.displayName,
        email: signup.user.email,
        img: signup.user.photoURL,
        emailVerified: signup.user.emailVerified,
        isAnon: signup.user.isAnonymous,
        tenantId: signup.user.tenantId,
        providerData: signup.user.providerData,
      },
      log
    );
    log.debug("Created JWT token from signup", { token });
    return {
      status: 201,
      msg: "Sign up was successful!",
      token,
    };
  }),

  router("/auth/login").post(async (req, log) => {
    const login = await firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password);
    log.debug("Successfully logged in user via firebase", login);
    const token = createToken(
      {
        userId: login.user.uid,
        name: login.user.displayName,
        email: login.user.email,
        img: login.user.photoURL,
        emailVerified: login.user.emailVerified,
        isAnon: login.user.isAnonymous,
        tenantId: login.user.tenantId,
        providerData: login.user.providerData,
      },
      log
    );
    log.debug("Created JWT token from login", { token });
    return {
      status: 200,
      msg: "User was successfully logged in!",
      token,
    };
  }),
];
