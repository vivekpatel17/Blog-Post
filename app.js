const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const testPost = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu ligula viverra, semper mi sed, tempus eros. Vivamus non viverra nibh. Nam sed mattis tortor, ut congue ligula. Nunc sodales ligula euismod urna accumsan viverra eu ut urna. Nullam et condimentum purus. Pellentesque sit amet commodo orci. Phasellus ut sem et urna varius faucibus a nec lectus.";
const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contactContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [{title: "Test Post", body: testPost}];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.post("/", function (req, res) {
  res.redirect("/compose");
});

app.get("/about", function (req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function (req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});




app.get("/posts/:postName", function (req, res) {
  const reqPost = _.lowerCase(req.params.postName);

  posts.forEach( function (post) {
    const storedPost = _.lowerCase(post.title);

    if (storedPost === reqPost) {
      res.render("post", {
        title: post.title,
        body: post.body
      })
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
