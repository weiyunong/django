$(function () {
//	二维码隐藏事件
    $(".top_in a,.bot_copy .bot_copya").hover(function () {
        if ($(this).children().has('div')||$(this).siblings().has('.copy_in')) {
            $(this).children("div").show();
            $(this).siblings('.copy_in').show();
        }
    }, function () {
        $(this).children("div").hide();
        $(this).siblings('.copy_in').hide();
    });
    
//  底部导航鼠标移入事件
    $(".copy_in").mouseenter(function(){
    	$(this).show();
    }).mouseleave(function(){
    	$(this).hide();
    })
 
 
 
//横向菜单导航栏
    $('.nav_in li a').find("img").mouseenter(function(){
    	var _src = $(this).attr('src');
    	var _hsrc = $(this).attr('hsrc')
    	$(this).attr('psrc',_src);
    	$(this).attr('src',_hsrc);
    }).mouseleave(function(){
    	var _psrc=$(this).attr('psrc')
    	$(this).attr('src',_psrc);
    })
//横向菜单导航栏结束
   
   
   
//竖向菜单栏
    $('.slionav_left ul').find('li').hover(function(){
    	$(this).find('h3 a').css('color','white');
    	var index = $(this).index();
    	$(this).removeClass('lihover').addClass('lihover').siblings('li').removeClass('lihover');
        $(this).parent().parent().siblings('.slionav_right').find('ul').eq(index).show().siblings('ul').hide();     
    },function(){
    	$(this).find('h3 a').css('color','black');
    	$(this).removeClass('lihover');
    	$(this).parent().parent().siblings('.slionav_right').find('ul').hide(); 
    });
    
    $('.slionav_right').find("ul").mouseenter(function(){
    	$(this).show();
    	var index = $(this).index();
    	$(this).parent().siblings('.slionav_left').find('li').eq(index).removeClass('lihover').addClass('lihover');
    }).mouseleave(function(){
    	$(this).hide();
    	$(this).parent().siblings('.slionav_left').find('li').removeClass('lihover');
    });
 //竖向菜单栏结束   
 
 
 
    
 //banner部分
    //get请求获取背景图片
    $.get("json/banners.json",function(data){ 	
    	for(var i=0;i<data.length;i++){
    		var bgObj = data[i];
//  		console.log(bgObj.bg);
    		var ul = $("<ul></ul>");
    		var li = $("<li></li>");
    		var div1 = $("<div></div>");
    		var div2 = $("<div></div>");
    		var a = $("<a href=''><img src="+bgObj.img1+" /></a>" + "<a href=''><img src="+bgObj.img2+" /></a>" + "<a href=''><img src="+bgObj.img3+" /></a>" + "<a href=''><img src="+bgObj.img4+" /></a>");
    	    $('.banner').append(ul);
    	    ul.append(li);
    	    li.append(div1);
    	    div1.append(div2);
    	    div2.append(a); 
    	    div1.addClass('banner_bg');
    	    div2.addClass('bg_in'); 
      	    $('div.banner_bg').eq(i).css('background',"url("+bgObj.bg+") no-repeat center top");  
//    	    console.log( $('.banner_bg').eq(0));
    	}

   
    
    
    	//去除背景图片间间隙
        $('.bg_in').find('img:gt(0)').css({
        	'width':'1200px',
        	'height':'168px',
        	'marginTop':'-8px',
        	'border':'0'
        })
        $('.bg_in').find('img:first').css({
        	'width':'1200px',
        	'height':'168px',
        	'marginTop':'0',
        	'border':'0'
        })
    })
    //点击轮播
    $('.banner_point .bar').children('li').mouseenter(function(){
    	var index = $(this).index();
    	$(this).removeClass('active').addClass('active').siblings().removeClass('active');
    	$('.banner_bg').eq(index).show().parent().parent().siblings().find('.banner_bg').hide();
    	window.clearInterval(bannerTimer);
    	bannerMove(index);
    })
    
    //自动轮播
    var bannerTimer;
    var index=0;
    bannerMove();
    function bannerMove(){
    	window.clearInterval(bannerTimer);
    	bannerTimer=window.setInterval(function(){
   	           index++;
   	           if(index>=$('div.banner_bg').length){
   	           	    index=0;
   	           }
   	           bannerStartMove(index);
        },3000)
        //鼠标触碰时
        $('.banner').hover(function () {
                window.clearInterval(bannerTimer);
        }, function () {
                bannerMove();
        });
    }
    function bannerStartMove(index){
    	$('.banner_bg').eq(index).show().parent().parent().siblings().find('.banner_bg').hide();
    	$('.banner_point .bar li').eq(index).removeClass('active').addClass('active').siblings().removeClass('active');
    }
    
//banner部分结束
  
  
  
  
    
//底部滚动条 无缝循环
    var scrollTimer;
    function scrollObj(obj,time){
        if(!time){time = 1500}
        scrollTimer = setTimeout(function(){
            clearTimeout(scrollTimer)
            $(obj).find("ul:first").animate({
                marginTop: "-28px"
            }, 500, function () {
                $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
                scrollObj(obj);
            });
        },time);
    }
    $(".friendlinks_slide").hover(function () {
        clearTimeout(scrollTimer);
    }, function () {
        scrollObj(".friendlinks_slide",1500);
    });
    scrollObj(".friendlinks_slide",1500);
});
//底部滚动条 无缝循环结束