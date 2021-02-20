const router = require("../router");
const { authCheck, firebase } = require("../util");

const db = firebase.firestore();
const preferences = db.collection("preferences");

const DEFAULT_PREFERENCES = {
  rememberMe: false,
  theme: "dark",
};

module.exports = [
  router("/preferences")
    .get(async (req, log) => {
      const user = await authCheck(req, log);

      const fetchedPreferences = await preferences.doc(user.userId).get();

      if (fetchedPreferences.exists) {
        const data = fetchedPreferences.data();
        log.debug("Successfully fetched preferences from user", data);
        return {
          msg: "Successfully retrieved user preferences",
          preferences: {
            ...data,
            ...DEFAULT_PREFERENCES,
          },
        };
      }

      await preferences.doc(user.userId).set(DEFAULT_PREFERENCES);

      log.debug(
        "Successfully created preferences for user from defaults",
        DEFAULT_PREFERENCES
      );

      return {
        status: 201,
        msg: "Created preferences from user defaults",
        preferences: DEFAULT_PREFERENCES,
      };
    })
    .put(async (req, log) => {
      const user = await authCheck(req, log);
      await preferences.doc(user.userId).set({
        ...req.body,
        ...DEFAULT_PREFERENCES,
      });
      return {
        msg: "Successfully saved preferences",
      };
    })
    .patch(async (req, log) => {
      const user = await authCheck(req, log);
      await preferences.doc(user.userId).update(req.body);
      return {
        msg: "Successfully updated preferences",
      };
    }),
];
