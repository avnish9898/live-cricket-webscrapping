let fs=require('fs')
let request=require('request')
let cheerio=require('cheerio');
let loadedHtml;
let name = "";
let maxW = 0;



function f(error,response,body){
    if(!error){
    loadedHtml=cheerio.load(body); 
    let allComments=loadedHtml(".d-flex.match-comment-padder.align-items-center .col-14.col-md-15.col-lg-14");
    let comment=loadedHtml(allComments[1]).text();
    console.log(comment);
    }
}

function f2(err, res, body) {
    if (!err) {
      loadedHtml = cheerio.load(body);
      let allTables = loadedHtml(".table.bowler");
      let row=loadedHtml(allTables[0]).find("tr");
      for(let i=0;i<row.length;i++){
        let cols=loadedHtml(row[i]).find("td");
        let curr=loadedHtml(cols[2]).text();
        if(maxW<curr){
            maxW=curr;
            name=loadedHtml(cols[0]).text();
        }   
        
      }
     console.log(name+" "+maxW)
     
    }
  }
  
  




request(
    "https://www.espncricinfo.com/series/zimbabwe-tour-of-united-arab-emirates-2020-21-1252053/afghanistan-vs-zimbabwe-2nd-test-1252057/ball-by-ball-commentary",f);

request(
        "https://www.espncricinfo.com/series/kathmandu-mayor-s-cup-2020-21-1253570/nepal-police-club-vs-armed-police-force-club-final-1253581/full-scorecard",
        f2
      );
      