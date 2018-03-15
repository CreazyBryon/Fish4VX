
/*
 * vx
 */ 
var vxCache={recv:[],logs:[],resp:[]};
 
exports.init=function(s){
	vxCache.scraper=s;
}

exports.debug = function(req, res){
	 
  res.send(vxCache);
};


exports.index = function(req, res){
	vxCache.recv.push({index:req.query});
	
	var signature=req.query['signature'];
	var timestamp=req.query['timestamp'];	
	var nonce=req.query['nonce'];	
	var echostr=req.query['echostr'];	

/*	var xml = "<xml>  <ToUserName>toUser</ToUserName>  <FromUserName>fromUser</FromUserName>  <CreateTime>1348831860</CreateTime>  <MsgType>text</MsgType>  <Content>this is a test</Content>  <MsgId>1234567890123456</MsgId>  </xml>"
parseString(xml, function (err, result) {
	if(!result){
		res.send("none");
	}
    res.send(result);
});
	*/
	
	vxCache.resp.push({index:echczostr});
  res.send(echczostr);
};
 
exports.msg = function(req, res){
	
	setTimeout(vxCache.scraper.run,100);
	vxCache.logs.push({'html':req.is('html'),'xml':req.is('xml'),'json':req.is('json')});
	vxCache.recv.push({msgbody:req.body,msgQu:req.query});
	
	var result = req.body;
 
	if(!result){
		res.send("success");
	}else{ 
		var sender=result.xml.fromusername;
		var meName=result.xml.tousername;
		var msgType=result.xml.msgtype;
		var content=result.xml.content;
		var msgid=result.xml.msgid;	
		
		var replyC='';
		if(content=='gzf'){
			replyC= vxCache.scraper.pages.gzf.summary;
		}else if (content=='gycq'){
			replyC= vxCache.scraper.pages.gycq.summary;		
		}else{
			replyC= "fish:"+content;
		}
		
		var repl='<xml> <ToUserName><![CDATA['+sender+']]></ToUserName> <FromUserName><![CDATA['+meName+']]></FromUserName> <CreateTime>'+Date.now()+'</CreateTime> <MsgType><![CDATA[text]]></MsgType> <Content><![CDATA['+replyC+']]></Content> </xml>';
		vxCache.resp.push({msg:repl});
		res.send(repl);
	}

};