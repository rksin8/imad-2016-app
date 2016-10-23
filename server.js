var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;
// you can optionally supply other values
var config = {
  host:'db.imad.hasura-app.io',
  port:'5432',
  database:'rksin8',
  user:'rksin8',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

//different part of html page
/*
var articleOne={
        title:"Article One | Ranjeet Singh",
        heading:"Article One",
        date:'Sep, 19, 2016',
        content:`<p>
                       This is my first article. this is the comtent of my article 
                    </p>
                    
                    <p>
                       This is my first article. this is the comtent of my article 
                    </p>
                    
                    
                    <p>
                       This is my first article. this is the comtent of my article 
                    </p>`
    
};

var articleTwo={
        title:"Article One | Ranjeet Singh",
        heading:"Article Two",
        date:'Sep, 20, 2016',
        content:`<p>
                       This is my first article. this is the comtent of my article 
                    </p>
                    
                    <p>
                       This is my first article. this is the comtent of my article 
                    </p>
                    
                    
                    <p>
                       This is my first article. this is the comtent of my article 
                    </p>`
    
};

var articleThree={
        title:"Article Three | Ranjeet Singh",
        heading:"Article Three",
        date:'Sep, 21, 2016',
        content:`<p>
                       This is my first article. this is the comtent of my article 
                    </p>
                    
                    <p>
                       This is my first article. this is the comtent of my article 
                    </p>
                    
                    
                    <p>
                       This is my first article. this is the comtent of my article 
                    </p>`
    
};
*/

var articles={
    'about':{
        title:'Ranjeet Singh',
        heading:'Ranjeet Singh',
	date:'',
	content:`
		<p>Hi!, I am Ranjeet. I live in mumbai. I love this course.</p>		
		<p> Personal<\hp>
		<p> This is my personal website</p>
		<p> Professional<\p>
		<p> This is a list of my work experiences:<\p>
		<style scoped>
      			p { color: red; }
    		</style>
		<p> This should print in red </p>
		<ol>
			<li> Company A:  </li>
			<li> Company B:  </li>
		</ol>`
		
	},
    'article-one':{
        title: 'Article One | Ranjeet Singh',
        heading: 'Article One',
        date: 'Sep, 19, 2016',
        content:`
	<p>
                 This is my first article. 
       
        </p>`
    
        
    },
    'article-two':{
        title: 'Article Two | Ranjeet Singh',
        heading: 'Article Two',
        date: 'Sep, 20, 2016',
        content:`<p>
                       This is my 2nd article.
                 </p>`
    
    },
    'article-three':{
        title: 'Article Three | Ranjeet Singh',
        heading: 'Article Three',
        date: 'Sep, 21, 2016',
        content:`<p>
                      This is my 3rd article.
                    </p>`
                
    }
};

//Common part of html page, copy html and remove the common portion
 function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `<html>
        <head>
                <title>
                    ${title}
                </title>
        	        <meta name="Viewport" content="width=device-width, intial-scale=1"/>
        	        <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
           <div class="container">
        
                <div>
                    <a href="/">Home</a>
                </div>
            	<hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                
                <div>
                    ${content}
                    
                </div>
        
            </div>

<div id="disqus_thread"></div>
<script>
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
     */
    /*
    var disqus_config = function () {
        this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    (function() {  // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        
        s.src = '//rksin.disqus.com/embed.js';
        
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>


        
        </body>
        
    </html>
    `;
    return htmlTemplate;
}


var pool = new Pool(config);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});






app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM test', function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
       
        
    });
 
});


/*


app.get('/articles:articleName', function (req, res) {
    //articleName==article-one
  var articleName=req.params.articleName;
  pool.query("SELECT * FROM article WHERE title= " +req.params.articleName, function(err,result){
      if(err){
         res.status(500).send(err.toString()); 
      }else{
          if(result.rows.length===0){
            res.status(404).send("Article not found");   
          }else{
              var articleData=result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
  });
  res.send(createTemplate(articles[articleName]));
});


app.get('/article-one', function (req, res) {
// res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
//res.send(createTemplate(articleOne));
});
/*
app.get('/article-two', function (req, res) {
// res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
res.send(createTemplate(articleTwo));
});

app.get('/article-three', function (req, res) {
// res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
res.send(createTemplate(articleThree));
});
*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

