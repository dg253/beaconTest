var flyers = [
    {id:0 , title:"Massive Dance Party", speaker:"Empire", time:"9:40am", room:"123 Dance St", description: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.", img: "img/b1.jpg", userPicture: "img/u1.jpg"},
    {id:1 , title:"Free Session", speaker:"804 Fitness", time:"10:10am", room:"Gym Hall 2", description: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Quisque placerat facilisis egestas cillum dolore.", img: "img/b2.jpg", userPicture: "img/u2.jpg"},
    {id:2 , title:"Big Party this Saturday", speaker:"Electric Dreams", time:"11:10am", room:"Rockhall Club", description: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.", img: "img/b3.jpg", userPicture: "img/u3.jpg"},
    {id:3 , title:"Great Breakfast Specials", speaker:"Peppermints Family Restaurant", time:"3:10Pm", room:"853 Main Ave", description: "In this session, you will learn performance techniques to speed up your mobile application.Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Prima luce, cum quibus mons aliud  consensu ab eo.", img: "img/b4.jpg", userPicture: "img/u4.jpg"},
    {id:4 , title:"Endless Summer Camp 2012", speaker:"Gerhart Hauptmann", time:"2:00pm", room:"1 Summer St", description: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Nihil hic munitissimus habendi senatus locus, nihil horum.", img: "img/b5.jpg", userPicture: "img/u5.jpg"}
];

exports.findAll = function (req, res, next) {
    res.send(flyers);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(flyers[id]);
};