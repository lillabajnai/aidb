import mongoose from 'mongoose';
import { Movie } from './src/model/Movie';

const movies = [
    { id: 1, title: 'Movie 1', year: 2024, image: '../../assets/movies/movie1.jpg', description: 'description 1' },
    { id: 2, title: 'Movie 2', year: 2024, image: '../../assets/movies/movie2.jpg', description: 'description 2' },
    { id: 3, title: '3022', year: 2019, image: '../../assets/movies/3022.jpg', description: 'A group of astronauts living in the haunting emptiness of deep space awake to find Earth has suffered an extinction level event.' },
    { id: 4, title: 'The Exterminators of the year 3000', year: 1983, image: '../../assets/movies/the-exterminators-of-the-year-3000.jpg', description: 'In the year 3000, the Earth has turned into a desert due to nuclear war, and survivors search for rare and valuable water, but evil Exterminators stand in their way.' },
    { id: 5, title: 'Dracula 3000', year: 2004, image: '../../assets/movies/dracula-3000.jpg', description: 'Count Dracula terrorizes the crew of a spaceship in this horror sci-fi mashup.' },
    { id: 6, title: '2103: The Deadly Wake', year: 1997, image: '../../assets/movies/2103-the-deadly-wake.jpg', description: 'A former ship captain is given a new identity and tasked with taking charge of a large ship on one voyage, only to realize the mission is not as straightforward as it seems.' },
    { id: 7, title: 'Cyborg 2087', year: 1966, image: '../../assets/movies/cyborg-2087.jpg', description: 'Earth’s future civilization sends a cyborg back to the 1960s to change the future.' },
    { id: 8, title: '2084', year: 2009, image: '../../assets/movies/2084.jpg', description: 'After a virus forces people to stay inside forever, the world is left in a post-apocalyptic state with few survivors.' },
    { id: 9, title: '2069: A Sex Odyssey', year: 1974, image: '../../assets/movies/2069-a-sex-odyssey.jpg', description: 'Five females from Venus are sent to Earth to bring back sperm samples, discovering that sex is an easier method than their initial approach.' },
    { id: 10, title: '2067', year: 2020, image: '../../assets/movies/2067.jpg', description: 'One man’s journey to the future to save a dying world.' },
    { id: 11, title: 'Love Story 2050', year: 2008, image: '../../assets/movies/love-story-2050.jpg', description: 'An action-packed adventure drama that takes place in the future.' },
    { id: 12, title: 'Same Time, Next year', year: 1978, image: '../../assets/movies/same-time-next-year.jpg', description: 'A romantic comedy that follows a couple who meet up once a year, despite being married to others.' },
];

const populateDB = async () => {
    try {
        await mongoose.connect('mongodb://mongo:6000/mongo_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Movie.insertMany(movies);
        console.log('Database populated with initial data');
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error populating database:', error);
    }
};

populateDB();
