import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Movie } from '../model/Movie';
import {Rating} from "../model/Rating";
import {Watchlist} from "../model/Watchlist";

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.status(200).send('Hello, World!');
    });

    router.get('/callback', (req: Request, res: Response) => {
        let myClass = new MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            } else {
                res.write(result);
                res.status(200).end();
            }
        });
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();
        /* myClass.monitoringPromise().then((data: string) => {
            res.write(data);
            res.status(200).end();
        }).catch((error: string) => {
            res.write(error);
            res.status(400).end();
        }); */


        // async-await
        try {
            const data = await myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        } catch (error) {
            res.write(error);
            res.status(400).end();
        }
    });


    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
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
            next(data: string) {
                res.write(data);
            }, error(error: string) {
                res.status(400).end(error);
            }, complete() {
                res.status(200).end();
            }
        });
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const nickname = req.body.nickname;
        const isCritique = req.body.isCritique;
        const user = new User({email: email, password: password, nickname: nickname, isCritique: isCritique});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        } else {
            res.status(500).send(false);
        }
    });

    router.get('/getUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.findOne({ _id:  req.user });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/makeCritique', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.findOneAndUpdate(
                { _id: id, isCritique: false },
                { $set: { isCritique: true } },
                { new: true }
            );

            query.then(data => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('No user found with isCritique set to false, or user not found.');
                }
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        } else {
            res.status(401).send('User is not logged in.');
        }
    });

    router.post('/movie', (req: Request, res: Response) => {
        const movie = new Movie({
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
        })
    });

    router.get('/movieById/:id', (req: Request, res: Response) => {
        const query = Movie.findOne({_id: req.params.id});
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error. ' + req.params.id);
        })
    });

    router.get('/getAllMovies', (req: Request, res: Response) => {
        const query = Movie.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    });

    router.post('/rating', (req: Request, res: Response) => {
        const rating = new Rating({
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
        })
    });

    router.get('/getUserRatings', (req: Request, res: Response) => {
        const query = Rating.find({ isCritical: false, movieId: req.query.movieId });
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    });

    router.get('/getCritiqueRatings', (req: Request, res: Response) => {
        const query = Rating.find({ isCritical: true, movieId: req.query.movieId });
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    });

    router.delete('/deleteRating', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = Rating.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/addMovie', (req: Request, res: Response) => {
        const watchList = new Watchlist({
            watched: req.body.watched,
            userId: req.body.userId,
            movieId: req.body.movieId,
        });
        watchList.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.get('/getWatchlist/:id', (req: Request, res: Response) => {
        const query = Watchlist.find({userId: req.params.id});
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    });

    return router;
}