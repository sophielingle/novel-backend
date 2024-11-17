const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
app.use(cors());
app.use(express.static("public"));
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const books = [
    {
        "id": 1,
        "title": "The Housemaid is Watching",
        "bestSeller": "yes",
        "image": "watching.jpg",
        "author": "Freida McFadden",
        "publication_year": "2024",
        "genre": "Drama",
        "description": "You must be our new neighbors! Mrs. Lowell gushes and waves across the picket fence. I clutch my daughter’s hand and smile back: but the second Mrs. Lowell sees my husband a strange expression crosses her face. In that moment I make a promise. We finally have a family home. My past is far, far behind us. And I’ll do anything to keep it that way…",
        "extended_description": "You must be our new neighbors! Mrs. Lowell gushes and waves across the picket fence. I clutch my daughter’s hand and smile back: but the second Mrs. Lowell sees my husband a strange expression crosses her face. In that moment I make a promise. We finally have a family home. My past is far, far behind us. And I’ll do anything to keep it that way… I used to clean other people’s houses—now, I can’t believe this home is actually mine. The charming kitchen, the quiet cul-de-sac, the huge yard where my kids can play. My husband and I saved for years to give our children the life they deserve. Even though I’m wary of our new neighbor Mrs. Lowell, when she invites us over for dinner it’s our chance to make friends. Her maid opens the door wearing a white apron, her hair in a tight bun. I know exactly what it’s like to be in her shoes. But her cold stare gives me chills… The Lowells’ maid isn’t the only strange thing on our street. I’m sure I see a shadowy figure watching us. My husband leaves the house late at night. And when I meet a woman who lives across the way, her words chill me to the bone: Be careful of your neighbors. Did I make a terrible mistake moving my family here? I thought I’d left my darkest secrets behind. But could this quiet suburban street be the most dangerous place of all?",
        "price": "$17.99",
        "favorite_chapters": [
            "Chapter 3",
            "Chapter 7",
            "Chapter 10"
        ]
    },
    {
        "id": 2,
        "title": "Witches Get Stuff Done",
        "bestSeller": "yes",
        "image": "witches.jpg",
        "author": "Molly Harper",
        "publication_year": "2024",
        "genre": "Romance",
        "description": "Juggling newfound witchy powers, a house full of ghosts, and verbal battles with the handsome local librarian is almost too much for a new witch to manage. A new witch with a coven, however, can get so much more done...",
        "extended_description": "Juggling newfound witchy powers, a house full of ghosts, and verbal battles with the handsome local librarian is almost too much for a new witch to manage. A new witch with a coven, however, can get so much more done... From the moment Riley Everett set foot in Starfall Point, magic bubbled inside of her. But with only her late aunt's journals and a cantankerous live-in ghost butler to instruct her on all things witchy—including her newly inherited Victorian haunted house—Riley seeks out a coven for sisterhood and support. The last person she expects to be drawn to is the town's frustrating, yet ridiculously attractive head librarian. Edison Held knows almost everything there is to know about Starfall Point, but Shaddow House was always off-limits, thanks to its elusive owner. If he can convince the new owner, Riley, to let him take a peek inside, there's so much he could learn. But as he gets closer to Riley, he's fascinated by her dazzling wit and fiery spirit. Edison will do whatever he can to help Riley keep her family legacy alive, especially if it means spending more time with the captivating new witch in town. Bestselling author Molly Harper wields a magical pen in this hilarious, delightful witchy romcom perfect for readers of The Ex Hex and Payback's a Witch.",
        "price": "$17.99",
        "favorite_chapters": [
            "Chapter 1",
            "Chapter 5",
            "Chapter 8"
        ]
    },
    {
        "id": 3,
        "title": "No Strangers Here",
        "bestSeller": "yes",
        "image": "strangers.jpg",
        "author": "Carlene O'Connor",
        "publication_year": "2022",
        "genre": "Mystery",
        "description": "On a rocky beach in the southwest of Ireland, the body of Johnny O’Reilly, sixty-nine years old and dressed in a suit and his dancing shoes, is propped on a boulder, staring sightlessly out to sea. A cryptic message is spelled out next to the body with sixty-nine polished black stones and a discarded vial of deadly veterinarian medication lies nearby. Johnny was a wealthy racehorse owner, known far and wide as The Dancing Man. In a town like Dingle, everyone knows a little something about everyone else.",
        "extended_description": "On a rocky beach in the southwest of Ireland, the body of Johnny O’Reilly, sixty-nine years old and dressed in a suit and his dancing shoes, is propped on a boulder, staring sightlessly out to sea. A cryptic message is spelled out next to the body with sixty-nine polished black stones and a discarded vial of deadly veterinarian medication lies nearby. Johnny was a wealthy racehorse owner, known far and wide as The Dancing Man. In a town like Dingle, everyone knows a little something about everyone else. But dig a bit deeper, and there’s always much more to find. And when Detective Inspector Cormac O'Brien is dispatched out of Killarney to lead the murder inquiry, he's determined to unearth every last buried secret. Dimpna Wilde hasn’t been home in years. As picturesque as Dingle may be for tourists in search of their roots and the perfect jumper, to her it means family drama and personal complications. In fairness, Dublin hasn’t worked out quite as she hoped either. Faced with a triple bombshell—her mother rumored to be in a relationship with Johnny, her father’s dementia is escalating, and her brother is avoiding her calls—Dimpna moves back to clear her family of suspicion.",
        "price": "$14.99",
        "favorite_chapters": [
            "Chapter 7",
            "Chapter 9",
            "Chapter 13"
        ]
    },
    {
        "id": 4,
        "title": "This Is How You Lose the Time War",
        "bestSeller": "yes",
        "image": "time.jpg",
        "author": "Amal El-Mohtar and Max Gladstone",
        "publication_year": "2019",
        "genre": "Science Fiction",
        "description": "Among the ashes of a dying world, an agent of the Commandant finds a letter. It reads: Burn before reading. Thus begins an unlikely correspondence between two rival agents hellbent on securing the best possible future for their warring factions. Now, what began as a taunt, a battlefield boast, grows into something more. Something epic. Something romantic. Something that could change the past and the future.",
        "extended_description": "Among the ashes of a dying world, an agent of the Commandant finds a letter. It reads: Burn before reading. Thus begins an unlikely correspondence between two rival agents hellbent on securing the best possible future for their warring factions. Now, what began as a taunt, a battlefield boast, grows into something more. Something epic. Something romantic. Something that could change the past and the future. Except the discovery of their bond would mean death for each of them. There's still a war going on, after all. And someone has to win that war.",
        "price": "$16.99",
        "favorite_chapters": [
            "Chapter 7",
            "Chapter 9",
            "Chapter 13"
        ]
    },
    {
        "id": 5,
        "title": "Notes From Underground",
        "bestSeller": "yes",
        "image": "notes.jpg",
        "author": "Fyodor Dostoesvky",
        "publication_year": "1864",
        "genre": "Fiction",
        "description": "Dostoevsky’s most revolutionary novel, Notes from Underground marks the dividing line between nineteenth- and twentieth-century fiction, and between the visions of self each century embodied. One of the most remarkable characters in literature, the unnamed narrator is a former official who has defiantly withdrawn into an underground existence. In complete retreat from society, he scrawls a passionate, obsessive, self-contradictory narrative that serves as a devastating attack on social utopianism and an assertion of man’s essentially irrational nature.",
        "extended_description": "Dostoevsky’s most revolutionary novel, Notes from Underground marks the dividing line between nineteenth- and twentieth-century fiction, and between the visions of self each century embodied. One of the most remarkable characters in literature, the unnamed narrator is a former official who has defiantly withdrawn into an underground existence. In complete retreat from society, he scrawls a passionate, obsessive, self-contradictory narrative that serves as a devastating attack on social utopianism and an assertion of man’s essentially irrational nature. Richard Pevear and Larissa Volokhonsky, whose Dostoevsky translations have become the standard, give us a brilliantly faithful edition of this classic novel, conveying all the tragedy and tormented comedy of the original.",
        "price": "$15.00",
        "favorite_chapters": [
            "Chapter 1",
            "Chapter 9",
            "Chapter 16"
        ]
    },
    {
        "id": 6,
        "title": "What Moves the Dead",
        "bestSeller": "no",
        "image": "moves_dead.jpg",
        "author": "Ursula Vernon",
        "publication_year": "2022",
        "genre": "Horror",
        "description": "From the award-winning author of The Twisted Ones comes a gripping and atmospheric retelling of Edgar Allan Poe's classic The Fall of the House of Usher. When Alex Easton, a retired soldier, receives word that their childhood friend Madeline Usher is dying, they race to the ancestral home of the Ushers in the remote countryside of Ruravia. What they find there is a nightmare of fungal growths and possessed wildlife, surrounding a dark, pulsing lake. Madeline sleepwalks and speaks in strange voices at night, and her brother Roderick is consumed with a mysterious malady of the nerves.",
        "extended_description": "From the award-winning author of The Twisted Ones comes a gripping and atmospheric retelling of Edgar Allan Poe's classic The Fall of the House of Usher. When Alex Easton, a retired soldier, receives word that their childhood friend Madeline Usher is dying, they race to the ancestral home of the Ushers in the remote countryside of Ruravia. What they find there is a nightmare of fungal growths and possessed wildlife, surrounding a dark, pulsing lake. Madeline sleepwalks and speaks in strange voices at night, and her brother Roderick is consumed with a mysterious malady of the nerves. Aided by a redoubtable British mycologist and a baffled American doctor, Alex must unravel the secret of the House of Usher before it consumes them all.",
        "price": "$14.99",
        "favorite_chapters": [
            "Chapter 6",
            "Chapter 9",
            "Chapter 11"
        ]
    },
    {
        "id": 7,
        "title": "The Shining",
        "bestSeller": "no",
        "image": "shining.jpg",
        "author": "Stephen King",
        "publication_year": "1977",
        "genre": "Horror",
        "description": "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he'll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote...and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.",
        "extended_description": "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he'll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote...and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.",
        "price": "$8.99",
        "favorite_chapters": [
            "Chapter 3",
            "Chapter 15",
            "Chapter 17"
        ]
    },
    {
        "id": 8,
        "title": "Mexican Gothic",
        "bestSeller": "no",
        "image": "gothic.jpg",
        "author": "Silvia Moreno-Garcia",
        "publication_year": "2020",
        "genre": "Horror",
        "description": "After receiving a frantic letter from her newly-wed cousin begging for someone to save her from a mysterious doom, Noemí Taboada heads to High Place, a distant house in the Mexican countryside. She’s not sure what she will find—her cousin’s husband, a handsome Englishman, is a stranger, and Noemí knows little about the region.",
        "extended_description": "After receiving a frantic letter from her newly-wed cousin begging for someone to save her from a mysterious doom, Noemí Taboada heads to High Place, a distant house in the Mexican countryside. She’s not sure what she will find—her cousin’s husband, a handsome Englishman, is a stranger, and Noemí knows little about the region. Noemí is also an unlikely rescuer: She’s a glamorous debutante, and her chic gowns and perfect red lipstick are more suited for cocktail parties than amateur sleuthing. But she’s also tough and smart, with an indomitable will, and she is not afraid: Not of her cousin’s new husband, who is both menacing and alluring; not of his father, the ancient patriarch who seems to be fascinated by Noemí; and not even of the house itself, which begins to invade Noemí’s dreams with visions of blood and doom. Her only ally in this inhospitable abode is the family’s youngest son. Shy and gentle, he seems to want to help Noemí, but might also be hiding dark knowledge of his family’s past. For there are many secrets behind the walls of High Place. The family’s once colossal wealth and faded mining empire kept them from prying eyes, but as Noemí digs deeper she unearths stories of violence and madness. And Noemí, mesmerized by the terrifying yet seductive world of High Place, may soon find it impossible to ever leave this enigmatic house behind.",
        "price": "$17.99",
        "favorite_chapters": [
            "Chapter 6",
            "Chapter 10",
            "Chapter 13"
        ]
    },
    {
        "id": 9,
        "title": "The List",
        "bestSeller": "no",
        "image": "list.jpg",
        "author": "Yomi Adegoke",
        "publication_year": "2023",
        "genre": "Drama",
        "description": "Ola Olajide, a celebrated journalist at Womxxxn magazine, is set to marry the love of her life in one month. She and her fiancé Michael are considered the “couple goals” of their social network and seem to have it all—that is, until one morning when they both wake up to the same message: Oh my god, have you seen The List?",
        "extended_description": "Ola Olajide, a celebrated journalist at Womxxxn magazine, is set to marry the love of her life in one month. She and her fiancé Michael are considered the “couple goals” of their social network and seem to have it all—that is, until one morning when they both wake up to the same message: “Oh my god, have you seen The List?” It began as a crowdsourced collection of names and somehow morphed into an anonymous account posting allegations on social media. Ola would usually be the first to support such a list—she’d retweet it, call for the men to be fired, write article after article. Except this time Michael’s name is on it.",
        "price": "$18.99",
        "favorite_chapters": [
            "Chapter 2",
            "Chapter 6",
            "Chapter 8"
        ]
    },
    {
        "id": 10,
        "title": "Then She Was Gone",
        "bestSeller": "no",
        "image": "gone.jpg",
        "author": "Lisa Jewell",
        "publication_year": "2017",
        "genre": "Drama",
        "description": "THEN She was fifteen, her mother's golden girl. She had her whole life ahead of her. And then, in the blink of an eye, Ellie was gone. NOW It’s been ten years since Ellie disappeared, but Laurel has never given up hope of finding her daughter.",
        "extended_description": "THEN She was fifteen, her mother's golden girl. She had her whole life ahead of her. And then, in the blink of an eye, Ellie was gone. NOW It’s been ten years since Ellie disappeared, but Laurel has never given up hope of finding her daughter. And then one day a charming and charismatic stranger called Floyd walks into a café and sweeps Laurel off her feet. Before too long she’s staying the night at this house and being introduced to his nine year old daughter. Poppy is precocious and pretty - and meeting her completely takes Laurel's breath away. Because Poppy is the spitting image of Ellie when she was that age. And now all those unanswered questions that have haunted Laurel come flooding back. What happened to Ellie? Where did she go? Who still has secrets to hide?",
        "price": "$8.99",
        "favorite_chapters": [
            "Chapter 1",
            "Chapter 3",
            "Chapter 5"
        ]
    },
    {
        "id": 11,
        "title": "The Guest List",
        "bestSeller": "no",
        "image": "guest.jpg",
        "author": "Lucy Foley",
        "publication_year": "2017",
        "genre": "Mystery",
        "description": "A wedding celebration turns dark and deadly in this deliciously wicked and atmospheric thriller reminiscent of Agatha Christie from the New York Times bestselling author of The Hunting Party. The bride – The plus one – The best man – The wedding planner – The bridesmaid – The body.",
        "extended_description": "A wedding celebration turns dark and deadly in this deliciously wicked and atmospheric thriller reminiscent of Agatha Christie from the New York Times bestselling author of The Hunting Party. The bride – The plus one – The best man – The wedding planner – The bridesmaid – The body On an island off the coast of Ireland, guests gather to celebrate two people joining their lives together as one. The groom: handsome and charming, a rising television star. The bride: smart and ambitious, a magazine publisher. It’s a wedding for a magazine, or for a celebrity: the designer dress, the remote location, the luxe party favors, the boutique whiskey. The cell phone service may be spotty and the waves may be rough, but every detail has been expertly planned and will be expertly executed. But perfection is for plans, and people are all too human. As the champagne is popped and the festivities begin, resentments and petty jealousies begin to mingle with the reminiscences and well wishes. The groomsmen begin the drinking game from their school days. The bridesmaid not-so_accidentally ruins her dress. The bride’s oldest (male) friend gives an uncomfortably caring toast. And then someone turns up dead. Who didn’t wish the happy couple well? And perhaps more important, why?",
        "price": "$13.99",
        "favorite_chapters": [
            "Chapter 5",
            "Chapter 6",
            "Chapter 18"
        ]
    },
    {
        "id": 12,
        "title": "The Da Vinci Code",
        "bestSeller": "no",
        "image": "davinci.jpeg",
        "author": "Dan Brown",
        "publication_year": "2003",
        "genre": "Mystery",
        "description": "While in Paris on business, Harvard symbologist Robert Langdon receives an urgent late-night phone call: the elderly curator of the Louvre has been murdered inside the museum. Near the body, police have found a baffling cipher. While working to solve the enigmatic riddle, Langdon is stunned to discover it leads to a trail of clues hidden in the works of Da Vinci -- clues visible for all to see -- yet ingeniously disguised by the painter.",
        "extended_description": "While in Paris on business, Harvard symbologist Robert Langdon receives an urgent late-night phone call: the elderly curator of the Louvre has been murdered inside the museum. Near the body, police have found a baffling cipher. While working to solve the enigmatic riddle, Langdon is stunned to discover it leads to a trail of clues hidden in the works of Da Vinci -- clues visible for all to see -- yet ingeniously disguised by the painter. Langdon joins forces with a gifted French cryptologist, Sophie Neveu, and learns the late curator was involved in the Priory of Sion -- an actual secret society whose members included Sir Isaac Newton, Botticelli, Victor Hugo, and Da Vinci, among others. In a breathless race through Paris, London, and beyond, Langdon and Neveu match wits with a faceless powerbroker who seems to anticipate their every move. Unless Langdon and Neveu can decipher the labyrinthine puzzle in time, the Priory's ancient secret -- and an explosive historical truth -- will be lost forever. The Da Vinci Code heralds the arrival of a new breed of lightning-paced, intelligent thriller utterly unpredictable right up to its stunning conclusion.",
        "price": "$12.99",
        "favorite_chapters": [
            "Chapter 4",
            "Chapter 8",
            "Chapter 11"
        ]
    },
    {
        "id": 13,
        "title": "Lovely War",
        "bestSeller": "no",
        "image": "lovely.jpg",
        "author": "Julie Berry",
        "publication_year": "2019",
        "genre": "Romance",
        "description": "It's 1917, and World War I is at its zenith when Hazel and James first catch sight of each other at a London party. She's a shy and talented pianist; he's a newly minted soldier with dreams of becoming an architect. When they fall in love, it's immediate and deep--and cut short when James is shipped off to the killing fields.",
        "extended_description": "It's 1917, and World War I is at its zenith when Hazel and James first catch sight of each other at a London party. She's a shy and talented pianist; he's a newly minted soldier with dreams of becoming an architect. When they fall in love, it's immediate and deep--and cut short when James is shipped off to the killing fields. Aubrey Edwards is also headed toward the trenches. A gifted musician who's played Carnegie Hall, he's a member of the 15th New York Infantry, an all-African-American regiment being sent to Europe to help end the Great War. Love is the last thing on his mind. But that's before he meets Colette Fournier, a Belgian chanteuse who's already survived unspeakable tragedy at the hands of the Germans. Thirty years after these four lovers' fates collide, the Greek goddess Aphrodite tells their stories to her husband, Hephaestus, and her lover, Ares, in a luxe Manhattan hotel room at the height of World War II. She seeks to answer the age-old question: Why are Love and War eternally drawn to one another? But her quest for a conclusion that will satisfy her jealous husband uncovers a multi-threaded tale of prejudice, trauma, and music and reveals that War is no match for the power of Love.",
        "price": "$13.99",
        "favorite_chapters": [
            "Chapter 5",
            "Chapter 9",
            "Chapter 18"
        ]
    },
    {
        "id": 14,
        "title": "Red, White and Royal Blue",
        "bestSeller": "no",
        "image": "red.jpg",
        "author": "Casy McQuiston",
        "publication_year": "2019",
        "genre": "Romance",
        "description": "First Son Alex Claremont-Diaz is the closest thing to a prince this side of the Atlantic. With his intrepid sister and the Veep’s genius granddaughter, they’re the White House Trio, a beautiful millennial marketing strategy for his mother, President Ellen Claremont. International socialite duties do have downsides—namely, when photos of a confrontation with his longtime nemesis Prince Henry at a royal wedding leak to the tabloids and threaten American/British relations. The plan for damage control: staging a fake friendship between the First Son and the Prince.",
        "extended_description": "First Son Alex Claremont-Diaz is the closest thing to a prince this side of the Atlantic. With his intrepid sister and the Veep’s genius granddaughter, they’re the White House Trio, a beautiful millennial marketing strategy for his mother, President Ellen Claremont. International socialite duties do have downsides—namely, when photos of a confrontation with his longtime nemesis Prince Henry at a royal wedding leak to the tabloids and threaten American/British relations. The plan for damage control: staging a fake friendship between the First Son and the Prince. As President Claremont kicks off her reelection bid, Alex finds himself hurtling into a secret relationship with Henry that could derail the campaign and upend two nations. What is worth the sacrifice? How do you do all the good you can do? And, most importantly, how will history remember you?",
        "price": "$9.99",
        "favorite_chapters": [
            "Chapter 1",
            "Chapter 8",
            "Chapter 15"
        ]
    }
];

app.get("/",() => {
    resizeBy.sendFile(_dirname + "/index.html");
});

app.get("/api/books", (req,res) => {
    res.json(books);
});

app.post("/api/books", upload.single("img"), (req, res)=>{
    console.log("In a post request");

    if (req.body.favorite_chapters) {
        try {
          req.body.favorite_chapters = JSON.parse(req.body.favorite_chapters);
        } catch (error) {
          return res.status(400).send("Invalid format for favorite chapters");
        }
    }
  
    const result = validateBook(req.body);
  
    if(result.error){
      res.status(400).send(result.error.details[0].message);
      console.log("I have an error");
      return;
    }

    const bookId = books.length + 1;
  
    const book = {
      id:req.body.id,
      title:req.body.title,
      bestSeller:req.body.bestSeller,
      author:req.body.author,
      publication_year:req.body.publication_year,
      genre:req.body.genre,
      description:req.body.description,
      extended_description:req.body.extended_description,
      price:req.body.price,
      favorite_chapters: req.body.favorite_chapters
      //favorite_chapters:req.body.favorite_chapters1, 
    }
  
    if(req.file){
      book.image = req.file.filename;
    }
  
    books.push(book);
  
    console.log(book);
    res.status(200).send(book);
  });
  
  const validateBook = (book)=>{
    const schema = Joi.object({
        title:Joi.string().min(1).required(),
        bestSeller:Joi.string().min(2).required(),
        author:Joi.string().required(),
        publication_year:Joi.string().required(),
        genre:Joi.string().required(),
        description:Joi.string().required(),
        extended_description:Joi.string().required(),
        price:Joi.string().required(),
        favorite_chapters: Joi.array().items(Joi.string()).length(3).required()
        //favorite_chapters1:Joi.string().required(),
        //favorite_chapters2:Joi.string().required(),
        //favorite_chapters3:Joi.string().required()

    });
  
    return schema.validate(book);
};

app.listen(3001, () => {
    console.log("Listening...");
});