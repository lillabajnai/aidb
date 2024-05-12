"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const main_class_1 = require("../main-class");
const User_1 = require("../model/User");
const Movie_1 = require("../model/Movie");
const Rating_1 = require("../model/Rating");
const Watchlist_1 = require("../model/Watchlist");
const configureRoutes = (passport, router) => {
    router.get('/', (req, res) => {
        let myClass = new main_class_1.MainClass();
        res.status(200).send('Hello, World!');
    });
    router.get('/callback', (req, res) => {
        let myClass = new main_class_1.MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            }
            else {
                res.write(result);
                res.status(200).end();
            }
        });
    });
    router.get('/promise', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let myClass = new main_class_1.MainClass();
        /* myClass.monitoringPromise().then((data: string) => {
            res.write(data);
            res.status(200).end();
        }).catch((error: string) => {
            res.write(error);
            res.status(400).end();
        }); */
        // async-await
        try {
            const data = yield myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        }
        catch (error) {
            res.write(error);
            res.status(400).end();
        }
    }));
    router.get('/observable', (req, res) => {
        let myClass = new main_class_1.MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        // deprecated variant
        /* myClass.monitoringObservable().subscribe((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('complete');
        }); */
        myClass.monitoringObservable().subscribe({
            next(data) {
                res.write(data);
            }, error(error) {
                res.status(400).end(error);
            }, complete() {
                res.status(200).end();
            }
        });
    });
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/register', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const nickname = req.body.nickname;
        const isCritique = req.body.isCritique;
        const user = new User_1.User({ email: email, password: password, nickname: nickname, isCritique: isCritique });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.post('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/getAllUsers', (req, res) => {
        if (req.isAuthenticated()) {
            const query = User_1.User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/checkAuth', (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        }
        else {
            res.status(500).send(false);
        }
    });
    router.get('/getUser', (req, res) => {
        if (req.isAuthenticated()) {
            const query = User_1.User.findOne({ _id: req.user });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.delete('/deleteUser', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User_1.User.deleteOne({ _id: id });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/makeCritique', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User_1.User.findOneAndUpdate({ _id: id, isCritique: false }, { $set: { isCritique: true } }, { new: true });
            query.then(data => {
                if (data) {
                    res.status(200).send(data);
                }
                else {
                    res.status(404).send('No user found with isCritique set to false, or user not found.');
                }
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(401).send('User is not logged in.');
        }
    });
    router.post('/movie', (req, res) => {
        const movie = new Movie_1.Movie({
            id: req.body.id,
            title: req.body.title,
            year: req.body.year,
            image: req.body.image,
            description: req.body.description
        });
        movie.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.get('/movieById/:id', (req, res) => {
        const query = Movie_1.Movie.findOne({ _id: req.params.id });
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error. ' + req.params.id);
        });
    });
    router.get('/getAllMovies', (req, res) => {
        const query = Movie_1.Movie.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    router.post('/rating', (req, res) => {
        const rating = new Rating_1.Rating({
            rating: req.body.rating,
            comment: req.body.comment,
            isCritical: req.body.isCritical,
            userId: req.body.userId,
            movieId: req.body.movieId,
        });
        rating.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.get('/getUserRatings', (req, res) => {
        const query = Rating_1.Rating.find({ isCritical: false, movieId: req.query.movieId });
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    router.get('/getCritiqueRatings', (req, res) => {
        const query = Rating_1.Rating.find({ isCritical: true, movieId: req.query.movieId });
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    router.delete('/deleteRating', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = Rating_1.Rating.deleteOne({ _id: id });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/addMovie', (req, res) => {
        const watchList = new Watchlist_1.Watchlist({
            watched: req.body.watched,
            userId: req.body.userId,
            movieId: req.body.movieId,
        });
        watchList.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.get('/getWatchlist/:id', (req, res) => {
        const query = Watchlist_1.Watchlist.find({ userId: req.params.id });
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    return router;
};
exports.configureRoutes = configureRoutes;
