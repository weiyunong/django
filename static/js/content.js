$(function(){

$('.out').on('click',function(){
    start();
}).triggerHandler('click');

$('.xx').click(function(event){
    event.preventDefault();
    $(this).parent().parent().hide();
})

function start(){
    var left = window.innerWidth/2 - $('.in img').width()/2;
    var top = window.innerHeight/2 - $('.in img').height()/2;
    $('.in').css({'left':left,'top':top});
}

//热销产品开始
    //热销tab
    $('.hot_text .hot_list span').eq(0).addClass('hotact0');
    $('.hot_text .hot_tab').find('li').eq(0).show().siblings().hide();
    var hot_list= $('.hot_text .hot_list span');
    var hot_tab= $('.hot_text .hot_tab').find('li');
    var index=0;
    hot_list.mouseenter(function(){
    	index = $(this).index();
    	pn_Move(index);
        list_original();
        lunbo_original();
        $(this).addClass('hotact'+index);
        $(this).parent().siblings('.hot_tab').find('li').eq(index).show();
    })
    //初始化
    function list_original(){
    	for(var i=0; i<hot_list.length;i++){
    		if(hot_list.eq(i).hasClass('list'+i)){
    			hot_list.eq(i).removeClass('hotact'+i);
    		}else{
    			hot_list.eq(i).removeClass('hotact'+i).addClass('list'+i);
    		}
        }
    }
    function lunbo_original(){
    	for(var i=0; i<hot_tab.length;i++){
        	hot_tab.eq(i).hide();
        }
    }  
    //左边右边
    pn_Move(index);
    function pn_Move(index){
        $('span.lr_prev').click(function(){
        	index--;
        	if(index < 0){
        		index=hot_list.length-1;
        	}
        	list_original();
        	lunbo_original();
        	$('.hot_text .hot_list span').eq(index).addClass('hotact'+index);
            $('.hot_text .hot_tab').find('li').eq(index).show();
        })
        $('span.lr_next').click(function(){
        	index++;
        	if(index > hot_list.length-1){
        		index=0;
        	}
        	list_original();
        	lunbo_original();
        	$('.hot_text .hot_list span').eq(index).addClass('hotact'+index);
            $('.hot_text .hot_tab').find('li').eq(index).show();
        })
    }
//热销产品结束


//每周新品开始 
    var list_lis=$('.turns_list ul').children('li');
    var turns_pn=$('.turns_pn ul').children('li');
    var j=0;
    var newTimer;
    new_startMove();
    new_lr();
    function new_startMove(){
    	window.clearInterval(newTimer);
        newTimer=window.setInterval(function(){
        	newStart();
        	j++;
        	if(j>=list_lis.length){
        		j=0;
        		list_lis.eq(0).css({opacity: 1});
        	}
        	newpn_Move(j);
        },3000);
    }
    
    function newStart(){ 
    	list_lis.eq(j).stop().animate({left: '-20px'},1)
    	                     .animate({opacity: 0},100)
    	                     .queue(function(next){
	              	                $(this).css({left: '0'})
	              	                        next();
	                  				}).next().css({opacity: '1'});
    	
    } 
    //小圆点
    function newpn_Move(j){
    	turns_pn.eq(j).removeClass('newact').addClass('newact').siblings().removeClass('newact');
    }
    
    //左边右边
    function new_lr(){
    	$('.new_prev').click(function(){
        	j--;
        	console.log(j)
        	if(j < 0){
        		j=list_lis.length-1;
        	}
        	window.clearInterval(newTimer);
            list_lis.eq(j).css({opacity: '1'}).next().css({opacity: '0'});
            new_startMove();
            newpn_Move(j);
        })
    	$('.new_next').click(function(){
        	j++;
        	if(j >= list_lis.length){
        		j=0;
        		window.clearInterval(newTimer);
        		list_lis.eq(0).css({opacity: 1});
        		list_lis.eq(7).css({opacity: 0});
        	}else{
        		window.clearInterval(newTimer);
                list_lis.eq(j).css({opacity: '1'}).prev().css({opacity: '0'});
        	}
            new_startMove();
            newpn_Move(j);
        })
    	
    	//鼠标触碰
    	list_lis.hover(function () {
            window.clearInterval(newTimer);
        }, function () {
            new_startMove();
        });
    }
//每周新品结束


//活动开始  
    $.get("json/campaign.json",function(data){ 	
    	for(var i=0;i<data.length;i++){
    		var camObj = data[i];
    		var a = $("<a href=''><img src="+camObj.camimg+" /></a>");
    	    $('.campaign_text').append(a);
    	}
    })
//活动结束

//女士>欧美时尚
    $.ajax({
    	type:"get",
    	url:"json/women.json",
    	async:true,
    	success:function(data){
//			console.log('请求成功，data'+data);
			for(var i=0; i<data.length; i++){
			    var dl=$('<dl id="'+data[i].wmID+'"></dl>');
			    var dt=$('<dt><a href=""><img src='+data[i].wmImg+' alt="" width="230"/></a></dt>')
		        var dd=$('<dd><a href="" class="goods_name">'+data[i].wmName+'</a></dd>');
		        var dd_div=$('<div class="goods_price"><i>'+data[i].wmPricetype+'</i><span>'+data[i].wmPrice+'</span><del>'+data[i].wmdel+'</del></div>')
		        $('div.goods_list').append(dl);
		        dl.append(dt);
		        dl.append(dd);
		        dd.append(dd_div);    
		    } 
		}		
//		error:function(){
//			console.log('请求失败');
//		},
//		
//		complete:function(){
//			console.log('请求完成');
//		},  
   });    
         
 //女士>日韩潮流
     $.ajax({
    	type:"get",
    	url:"json/rhWomne.json",
    	async:true,
    	success:function(data){
			for(var i=0; i<data.length; i++){
		        var rwmdl=$('<dl id="'+data[i].rwmID+'"></dl>');
			    var rwmdt=$('<dt><a href=""><img src="'+data[i].rwmImg+'" alt="" width="230"/></a></dt>')
		        var rwmdd=$('<dd><a href="" class="goods_name">'+data[i].rwmName+'</a></dd>');
		        var rwmdd_div=$('<div class="goods_price"><i>'+data[i].rwmPricetype+'</i><span>'+data[i].rwmPrice+'</span><del>'+data[i].rwmdel+'</del></div>')
		        $('div.goods_list1').append(rwmdl);
		        rwmdl.append(rwmdt);
		        rwmdl.append(rwmdd);
		        rwmdd.append(rwmdd_div);
		    } 
		}	
    });
   
gClick();
function gClick(){
//点击匹配ID 直接跳转到该物品详情
    var goodsClick = $('div.goods_list1');
    for(var i=0;i<goodsClick.length;i++){
        goodsClick.eq(i).on("click",'dl',function(event){
            event.preventDefault();
        	var users = [];
        	var nameId = {
				id: $(this).attr('id')
					}
        	users.push(nameId); 
        	$.cookie("users", JSON.stringify(users), {expires:22, path:"/"});
			console.log($.cookie("users"));            
            window.open("detail_information.html");
        })
    }
}

//男士>商务男装
    $.ajax({
    	type:"get",
    	url:"json/men.json",
    	async:true,
    	success:function(data){
			for(var i=0; i<data.length; i++){
		        var mdl=$('<dl id="'+data[i].mID+'"></dl>');
			    var mdt=$('<dt><a href=""><img src='+data[i].mImg+' alt="" width="230"/></a></dt>')
		        var mdd=$('<dd><a href="" class="goods_name">'+data[i].mName+'</a></dd>');
		        var mdd_div=$('<div class="goods_price"><i>'+data[i].mPricetype+'</i><span>'+data[i].mPrice+'</span><del>'+data[i].mdel+'</del></div>')
		        $('div.mgoods_list').append(mdl);
		        mdl.append(mdt);
		        mdl.append(mdd);
		        mdd.append(mdd_div);
		   } 
		}		
   });
   
//优选名品大牌
var xbb = $('div.excellent_l span').eq(0).find('img').attr('xsrc');
$('div.excellent_l span').eq(0).find('img').attr('src',xbb);
    $('.excellent_l span').mouseenter(function(){
    	hh();
    	var index=$(this).index();
    	var _xsrc = $(this).find("img").attr('xsrc');
    	$(this).find("img").attr('src',_xsrc);
    	$('.excellent_r ul li').eq(index).stop().fadeIn('fast').siblings().fadeOut('fast');
    }).mouseleave(function(){
    	hh();
    	var _xsrc = $(this).find("img").attr('xsrc');
    	$(this).find("img").attr('src',_xsrc);
    	
    })
    
function hh(){
	for(var i=0;i<$('.excellent_l span').length;i++){
		var _ysrc=$('.excellent_l span').eq(i).find("img").attr('ysrc');
	    $('.excellent_l span').eq(i).find("img").attr('src',_ysrc);
	}
}
   
//单品
    $.ajax({
    	type:"get",
    	url:"json/alonegoods.json",
    	async:true,
    	success:function(data){
			for(var i=0; i<data.length; i++){
		        var aLdl=$('<dl id="'+data[i].aLID+'"></dl>');
			    var aLdt=$('<dt><a href=""><img src='+data[i].aLImg+' alt="" width="230"/></a></dt>')
		        var aLdd=$('<dd><a href="" class="alone_name">'+data[i].aLName+'</a></dd>');
		        var aLdd_div=$('<div class="alone_price"><i>'+data[i].aLPricetype+'</i><span>'+data[i].aLPrice+'</span><del>'+data[i].aLdel+'</del></div>')
		        $('div.alone_con').append(aLdl);
		        aLdl.append(aLdt);
		        aLdl.append(aLdd);
		        aLdd.append(aLdd_div);
		   } 
		}		
   });
   
   //右侧菜单栏关闭按钮事件
   $('.close').click(function(){
   	    $(this).parent().hide();
   })
   
tog()
function tog(){  
    var hasCookie = $.cookie("cart1");
    var sum=0;
    var totalP=0;
    if(hasCookie){
    	emptyshop();
    	hasCookie = JSON.parse($.cookie("cart1"));    	
    	for (var i=0; i<hasCookie.length; i++) {
    		addcart1(hasCookie[i].id,hasCookie[i].img,hasCookie[i].name,hasCookie[i].size,hasCookie[i].color,hasCookie[i].price,hasCookie[i].num);
    	    sum=sum+hasCookie[i].num;
    	    totalP=totalP+parseInt(hasCookie[i].price*hasCookie[i].num);
    	}
    	$('.cartSum_h').html(sum);
    	$('.twoli_redpn_span').html(sum);
    	$('#accounts_price').html(totalP)
    }
    
	var getcookie = $.cookie("indexlogin");   	
	if(getcookie){ 
	    console.log($.cookie("indexlogin"));
	    getcookie = JSON.parse(getcookie);
	    $('.startlogin').html("用户 "+getcookie[0].username);
    }

    
    
       
	//点击移除商品	    	
	$('.p3').click(function(e){
	    if($(e.target).hasClass('orderDes_del')){
        	console.log(hasCookie)
            for(var i=0;i<hasCookie.length;i++){
      	        if(hasCookie[i].id == $(e.target).closest('dl').attr('id')){
      	           //移除对应模块 对应数量 对应价钱
      	            $(e.target).closest('dl').parent().remove();
      	            var shu = $('.twoli_redpn_span').html();
      	            $('.twoli_redpn_span').html(parseInt(shu)-hasCookie[i].num);
      	            $('.cartSum_h').html(parseInt(shu)-hasCookie[i].num);
      	            var delzj = hasCookie[i].num*hasCookie[i].price;
      	            totalP=totalP-delzj;
      	            $('#accounts_price').html(totalP);
	      	        
	      	        if($('#accounts_price').html()==0){
			    	    $('.twoli_shop').find('div.twoli_shop_empty').show();
			    	    $('.accounts').hide();
			        }
      	           
      	            hasCookie.splice(i,1);
      	            $.cookie("cart1",JSON.stringify(hasCookie), {expires:20, path:"/"});
      	        } 
      	    }      
      	    console.log(hasCookie);
		}     
	})
} 

//删除购物车中的“添加到购物车”按钮
function emptyshop(){
    $('.twoli_shop').find('.twoli_shop_empty').hide();
    $('.accounts').show();
};
   
//将商品详情添加到购物车
function addcart1(id,img,name,size,color,price,count){
	var cartdiv=$('<div class="order_List"></div>');
	var cartdl=$('<dl id='+id+'></dl>');
	var cartdd=$('<dd class="order_Listli"></dd>');
	var cartdd_div1=$('<div class="order_title"><span>梦芭莎</span></div>');
	var cartdd_div2=$('<div class="order_goods"></div>');
	var cartdd_div2_div1=$('<div class="orderPic"></div>');
	var cartdd_div2_div1_a=$('<a href=""><img src="'+img+'" alt="" style="width: 34px;"/></a>')
	var cartdd_div2_div2=$('<div class="orderDes"></div>');
	var cartdd_div2_div2_p1=$('<p title="'+name+'" class="p1"><a href="" target="_blank">'+name+'</a></p>')
	var cartdd_div2_div2_p2=$('<p style="color: #9F9F9F;" class="p2">'+size+color+'</p>');
	var cartdd_div2_div2_p3=$('<p style="color:#999" class="p3"></p>');
	var cartdd_div2_div2_p3_span=$('<span class="orderDes_del">删除</span><span style="color:#e50065;font-family:arial">¥</span><span style="color:#e50065;font-family:arial">'+price+'</span><span>*'+count+'</span>');
	
	$('.accounts').before(cartdiv);
	cartdiv.append(cartdl);
	cartdl.append(cartdd);
	cartdd.append(cartdd_div1);
	cartdd.append(cartdd_div2);
	cartdd_div2.append(cartdd_div2_div1);
	cartdd_div2_div1.append(cartdd_div2_div1_a)
	cartdd_div2.append(cartdd_div2_div2);
	cartdd_div2_div2.append(cartdd_div2_div2_p1);
	cartdd_div2_div2.append(cartdd_div2_div2_p2);
	cartdd_div2_div2.append(cartdd_div2_div2_p3);
	cartdd_div2_div2_p3.append(cartdd_div2_div2_p3_span);
}    

//点击跳转到购物车
$('.clo-btn').click(function(){   	
    	window.open("shopping_cart.html");
})



//点击跳转到登录页面
$('.startlogin').click(function(){   	
    window.open("login.html");
    	
})
})
