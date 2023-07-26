const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;

const bkfd2Password     = require("pbkdf2-password");
const hasher            = bkfd2Password();

const UserModel         = require('./models/user')

module.exports = function () {
    //로그인 시 사용됨
    passport.serializeUser(function(account, done) {
        //session에 저장할 정보
        done(null, account);
    });
    passport.deserializeUser(function(account, done) {
        done(null, account);
    });
    passport.use('local-login', new LocalStrategy({
        usernameField: 'id',        //로그인 시 req.body.id 로 넘어온 값
        passwordField: 'password',  //로그인 시 req.body.password 로 넘어온 값
        session: true,
        passReqToCallback: true
        }, async function(req, id, password, done) {
            try {
                var account = {user: '', email: ''};
                const result = await UserModel.GetUser(id);
                if (result.error) {
                    console.log(result.error);
                    return done(false, null);
                }
                if (result.result.length === 0) {
                    return done(false, null, {message: '아이디 또는 패스워드가 일치하지 않습니다.'});
                } 
                else {
                    const user = result.result[0];
                    hasher( {password: password, salt: user[0].salt} , function(err, pass, salt, hash) {
                        console.log(password, salt, hash)
                        if (hash != user[0].password) {
                            console.log('불일치')
                            return done(false, null, {message: '아이디 또는 패스워드가 일치하지 않습니다.'});
                        } 
                        else {
                            account.user = user[0].id;
                            account.email = user[0].email;
                            return done(null, account);
                        }
                    }); //hasher
                }
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    ));
};