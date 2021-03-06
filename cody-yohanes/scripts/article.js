'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// Instructions for the articles. Because every constructor is capatalized. "this." calls the object and gives it a value. It represents the raw data of the object constructor.
// PUT YOUR RESPONSE HERE

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  //Personal-Note: This is where we create our object constructor to take in information as raw data hence the function rawDataObj
  this.title= rawDataObj.title;
  this.category= rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
  // Save ALL the properties of `rawDataObj` into `this`
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // PUT YOUR RESPONSE HERE
  // .clone preserves code space and prevents code clutter. cloning the article article only clones the elements and not the text area within it which is efficient for element input repetition.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name, 
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  $newArticle.find('address a').html(this.author);
  $newArticle.find('address a').attr('href', this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('section').html(this.body);
  $newArticle.find('time').attr('datetime', this.publishedOn);
  //Scott used .text(this.author); instead of .html(this.author); for security purposes!
  //
      

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  //
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

// The 2 for looops below are the original for loops we turned into foreach loops
//for(let i = 0; i > rawData.length; i++) {
//   articles.push(new Article(rawData[i]));
// }

// for(let i = 0; i < articles.length; i++) {
//   $('#articles').append(articles[i].toHtml());
// }

//this is the foreach loop scott used in class
// rawData.forEach(functon(ele) {
//   articles.push(new Article(ele))
// });

// this is how scott iterated the second for each loop
//articles.forEach(function(ele) {
//   $('#articles').append(ele.toHtml());
// })

//so value we used below is the (new Article(rawData[i])); replacement. It is set a parameter
rawData.forEach(function(value){
  articles.push(new Article(value));
});

articles.forEach(function(data){
  $('#articles').append(data.toHtml()); 
});
