
/*
 * GET users listing.
 */
 
var request = require('request');
var cheerio = require('cheerio');

exports.getScraper = function(){
	
	
	var scraper={};
	
	scraper.pages={gzf:{},gycq:{}};
	
	scraper.start=function(){
		setInterval(scraper.run,10000);
	}
	
	scraper.run=function(){
		scraper.grab('http://www.bphc.com.cn/article/list/b02e7e29e33642f789e4d1e41db08b7d.html',function($){
			
			var json = { 
				title : $("title").text(), 
				time:new Date(), 
				post: {
					suject:$(".publicity .list-right h2").first().text(),
					month:$(".publicity .list-left2").first().text(),
					day:$(".publicity .list-left1").first().text(),
					summary:$(".publicity ul li").first().text()
				}
			}; 
			
			scraper.pages.gzf=json;
		});
		
		scraper.grab('http://zzfws.bjjs.gov.cn/enroll/home.jsp',function($){
			
			var json = { 
				title : $("title").text(), 
				time:new Date(), 
				project: {
					summary:$("#projectContainer .ProjInfo").first().text(),
					subject:$("#projectContainer caption").first().text()
				}
			}; 
			
			scraper.pages.gycq=json;
		});		
	}
	
	scraper.grab=function(url, cb){ 

		// The structure of our request call
		// The first parameter is our URL
		// The callback function takes 3 parameters, an error, response status code and the html

		request(url, function(error, response, html){

			// First we'll check to make sure no errors occurred when making the request

			if(!error){
				// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
				var $ = cheerio.load(html);
				cb($);
				// Finally, we'll define the variables we're going to capture
			}
		});			
	}
	
	
	
	return scraper;
	

};

