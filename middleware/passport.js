// Подключаем необходимые модули
// eslint-disable-next-line no-undef
const passport = require("passport");
// eslint-disable-next-line no-undef
const JwtStrategy = require("passport-jwt").Strategy;
// eslint-disable-next-line no-undef
const ExtractJwt = require("passport-jwt").ExtractJwt;
// eslint-disable-next-line no-undef
const db = require("../models"); // Подставьте путь к вашим моделям

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "importantsecret", // Замените на свой секретный ключ
};

passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const user = await db.users.findOne({ where: { id: jwtPayload.id } });

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

// eslint-disable-next-line no-undef
module.exports = passport;