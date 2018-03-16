
/*
 * vx
 */ 
var vxCache={recv:[],logs:[],resp:[]};



var handleImage=function(msg){
	
}

var handleText=function(msg){
	var sender=msg.fromusername;
	var meName=msg.tousername;
	//var msgType=msg.msgtype;
	var content=msg.content;
	var msgid=msg.msgid;	
	
	var replyC='';
	if(content=='gzf'){
		replyC= vxCache.scraper.pages.gzf.post.subject+'@'+vxCache.scraper.pages.gzf.post.month+vxCache.scraper.pages.gzf.post.day+'@'+vxCache.scraper.pages.gzf.post.url;
	}else if (content=='gycq'){
		replyC= vxCache.scraper.pages.gycq.project.subject;		
	}else{
		replyC= "fish:"+content;
	}
	
	if(!replyC){
		replyC='empty';
	}
	
	var repl='<xml> <ToUserName><![CDATA['+sender+']]></ToUserName> <FromUserName><![CDATA['+meName+']]></FromUserName> <CreateTime>'+Date.now()+'</CreateTime> <MsgType><![CDATA[text]]></MsgType> <Content><![CDATA['+replyC+']]></Content> </xml>';
	
	return repl;
}

var handleMsg=function(msg){
	var msgType=msg.msgtype;
	
	if(msgType=='text'){
		handleText(msg);
	}else if(msgType=='image'){
		handleText(msg);
	}else if(msgType=='voice'){
		handleText(msg);
	}else if(msgType=='vedio'){
		handleText(msg);
	}else if(msgType=='shortvedio'){
		handleText(msg);
	}else if(msgType=='location'){
		handleText(msg);
	}else if(msgType=='link'){
		handleText(msg);
	}
}


 
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
	 
		var repl = handleMsg(result.xml);
		
		vxCache.resp.push({msg:repl});
		res.send(repl);
	}

};