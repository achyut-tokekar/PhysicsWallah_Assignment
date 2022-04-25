const mongoose = require('mongoose');
const clothes = require('./clothes');
const Campground = require('../models/product');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const imgUrl = [
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1650846195/YelpCamp/toa-heftiba-AS_1JiGIuHQ-unsplash_yihger.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1650846195/YelpCamp/don-delfin-almonte-ebTNU_YTWgc-unsplash_zlmd82.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1650846195/YelpCamp/lena-kudryavtseva-itUsEU7GgDU-unsplash_hk6ft1.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1650846192/YelpCamp/pro-church-media-A77QfVfNA8Y-unsplash_t6gm9c.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1650846187/YelpCamp/alex-haigh-fEt6Wd4t4j0-unsplash_tfh8rv.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1650846181/YelpCamp/faith-yarn-Wr0TpKqf26s-unsplash_xfxkzj.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1650846180/YelpCamp/md-salman-tWOz2_EK5EQ-unsplash_pbg4em.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1650846174/YelpCamp/ryan-hoffman-A7f7XRKgUWc-unsplash_ersbcr.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1650846176/YelpCamp/ryan-hoffman-6Nub980bI3I-unsplash_w0kefi.jpg'
];
const userId = ['61a4cbeb19e913a99a93a838', '61a4cbbc19e913a99a93a715', '61a4cb6919e913a99a93a5f2', '61a4cadc19e913a99a93a16c', '61a4c9f019e913a99a93a049', '61a4c9d519e913a99a939f26', '61a4c94919e913a99a939e03', '61a4c92919e913a99a939ce0', '61a4c8b219e913a99a939bb8'];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < clothes.length; i++) {
        const randomUrl1 = Math.floor(Math.random() * imgUrl.length);
        const randomUrl2 = Math.floor(Math.random() * imgUrl.length);
        const randomUser = Math.floor(Math.random() * userId.length);
        const price = Math.floor(Math.random() * 800) + 100;
        const camp = new Campground({
            author: userId[randomUser],
            location: `${clothes[i].city}, ${clothes[i].state}`,
            title: `${clothes[i].title}`,
            description: `${clothes[i].description}`,
            price,
            images: [
                {
                    url: imgUrl[randomUrl1],
                    filename: "YelpCamp/ryan-hoffman-A7f7XRKgUWc-unsplash_ersbcr"
                },
                {
                    url: imgUrl[randomUrl2],
                    filename: "YelpCamp/alex-haigh-fEt6Wd4t4j0-unsplash_tfh8rv"
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


