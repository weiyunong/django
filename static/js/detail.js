$(function(){
    //匹配id 将二级页面信息更改
    $.ajax({
    	type:"get",
    	url:"json/rhWomne.json",
    	async:true,
    	success:function(data){
    		var n=0;
			for(var i=0; i<data.length; i++){
				
				//获取传入的cookie id值
				var users = $.cookie("users");
				if (users) {		
					users = JSON.parse(users); //cookie中的所有存入的id
					if(data[i].rwmID == users[0].id){
						n = i;
						$('.pic_ct_max ul li').find('img').attr('id',data[n].rwmID);
						$('.pic_ct_max ul li').find('img').attr('src',data[n].rwmImg);
						$('.bigArea .bigPic').attr('src',data[n].bigImg);
						$('.detail_main_m h2').html(data[n].rwmName);
						$('title').html(data[n].rwmName); 
						$('.leftPrice b').html(data[n].rwmPrice);
						$('.share p').html(data[n].rwmID);
						break;
					}
				}else {
					alert("此商品不存在!");
				} 
		   } 
		}	
    });	
    
 
tog()
function tog(){  
	
	$('.order_List').remove();
	//后来存的cookie名字相同有覆盖 取出来是数量增加后的
    var hasCookie = $.cookie("cart1");
    var sum1=0;
    var totalP1=0;
    if(hasCookie){
    	emptyshop();
		hasCookie = JSON.parse($.cookie("cart1"));  
    	for (var i=0; i<hasCookie.length; i++) {
	    	addcart1(hasCookie[i].id,hasCookie[i].img,hasCookie[i].name,hasCookie[i].size,hasCookie[i].color,hasCookie[i].price,hasCookie[i].num);
	       // console.log(hasCookie[i].num);
	        sum1=sum1+hasCookie[i].num;
	        totalP1=totalP1+parseInt(hasCookie[i].price*hasCookie[i].num);
    	}
    	$('.twoli_redpn_span').html(sum1);
    	$('.cartSum_h').html(sum1);
    	$('#accounts_price').html(totalP1);
    }	

    
    $('.addcart').off("click");
    $('.addcart').click(function(){
    		fly();
    		emptyshop();
    		addCg();
    		sum1=sum1+1;  
		    totalP1=totalP1+parseInt($('.leftPrice b').html());
		    $('.twoli_redpn_span').html(sum1);
		    $('.cartSum_h').html(sum1);
		    $('#accounts_price').html(totalP1);
	 })	
	
	
	//点击移除商品 
	$('.p3').click(function(e){  
        if($(e.target).hasClass('orderDes_del')){  
        	sum1=0;  //初始化，否则点击addcart时sum1先在原数据上加一  才会初始化为1
            for(var i=0;i<hasCookie.length;i++){
      	        if(hasCookie[i].id == $(e.target).closest('dl').attr('id')){
      	           //移除对应模块 对应数量 对应价钱
      	            $(e.target).closest('dl').parent().remove();
      	            var shu = $('.twoli_redpn_span').html();
      	            $('.twoli_redpn_span').html(parseInt(shu)-hasCookie[i].num);
      	            $('.cartSum_h').html(parseInt(shu)-hasCookie[i].num);
      	            var delzj=hasCookie[i].num*hasCookie[i].price;
      	            totalP1=totalP1-delzj;
      	            $('#accounts_price').html(totalP1);
	      	        
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

//添加购物车
function addCg(){
                
	//复制当前商品所有信息(用于往购物车添加) 并传入cookie中
	var copy_cartImg = $('.pic_ct_max ul li').find('img').attr('src');
	var copy_cartPrice = $('.leftPrice b').html();
	var copy_cartColor = $('.twoli1act .s2').html();
	var copy_cartName = $('.detail_main_m h2').html();
	var copy_cartSize = $('.size_twoli .cartSize').html();
	var copy_carID = $('.pic_ct_max ul li').find('img').attr('id');
	var copy_cartNum = 1;
	
	//使用cookie存储商品信息
	var cartList = $.cookie("cart1") ? JSON.parse( $.cookie("cart1") ) :[];
	var isExists1 = false;
	for (var i=0; i<cartList.length; i++) {
		if (copy_carID == cartList[i].id) {
			cartList[i].num++;	
			isExists1 = true; 
		}
	}
	if (!isExists1) {
		var goods = {
			id: copy_carID,
			img: copy_cartImg,
			name: copy_cartName,
			price: copy_cartPrice,
			size: copy_cartSize,
			color: copy_cartColor,
			num: copy_cartNum
		}
		cartList.push(goods); 
	}
	//因为cookie名不相同 并不会覆盖   而会重新从1开始添加
	$.cookie("cart1", JSON.stringify(cartList), {expires:20, path:"/"});
    tog();    
}


//删除购物车中的“添加到购物车”按钮
function emptyshop(){
    $('.twoli_shop').find('.twoli_shop_empty').hide();
    $('.accounts').show();
};
 
 
//飞入购物车
function fly(){ 
    var $cartlist=$('.twoli');//获取到购物车
    var $currentLi = $('.pic_ct_max ul li').eq(0);
    var $currentImg = $currentLi.find('img');
    
    var $copyImg = $currentImg.clone();   //复制当前商品图片(用于实现动画效果)
    var startPos = $currentImg.offset();  //先获取原图片的位置（为了设置复制图片的初始位置）
    var startWidth = $currentImg.width();  //获取原图片的宽度
    
    //把复制的图片写入页面，并设置样式
    $copyImg.css({
    	position:'absolute',
    	left:startPos.left,
    	top:startPos.top,
    	width:startWidth
    });
    $copyImg.appendTo('body');
    
    //动画效果
    var cartPos = $cartlist.offset(); //先获取购物车的位置
    $copyImg.animate({left:cartPos.left,top:cartPos.top + $cartlist.outerHeight()/2,width:0,opacity:0},function(){
    	$copyImg.remove(); //删除用于动画的图片
    }) 
}       
    	



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
	var cartdd_div2_div2_p3_span=$('<span class="orderDes_del">删除</span><span style="color:#e50065;font-family:arial">¥</span><span style="color:#e50065;font-family:arial">'+price+'</span><span class="shuliang">*'+count+'</span>');
	
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


//右侧菜单栏关闭按钮事件
closer()	
function closer(){
    $('.close').click(function(){
    	$(this).parent().hide();
    }) 
}   
    
fangda()	
function fangda(){	
	//放大镜效果
	var smallImg = $(".smallPic"); 
	var smallArea = $(".smallArea"); 
	var bigImg = $(".bigPic");
	var bigArea = $(".bigArea");
	//计算大图片的宽高对应成比例
	bigImg.width( smallImg.width()* bigArea.width()/ smallArea.width());
	bigImg.height( smallImg.height()* bigArea.height()/smallArea.height());

	//放大倍数
	var scale = bigImg.width() / smallImg.width();
	
	$(".pic_ct_max").mousemove(function(event){
		smallArea.show();
		bigArea.show();

	    //小图区域跟随鼠标移动
		var x=event.pageX - smallImg.offset().left - smallArea.width()/2;
		var y=event.pageY - smallImg.offset().top - smallArea.height()/2;
		
		//限制小图区域移动范围
		if(x<=0){
			x=0;
		}else if(x>= smallImg.width()-smallArea.width()){
			x= smallImg.width()-smallArea.width();
		}
		
		if(y<=0){
			y=0;
		}else if(y>= smallImg.height()-smallArea.height()){
			y= smallImg.height()-smallArea.height();
		}
		smallArea.css({'left':x,'top':y});
		
		bigImg.css({'left':-x*scale,'top':-y*scale});		
	}).mouseout(function(){
		smallArea.hide();
		bigArea.hide();
	})
}


    //点击去购物车结算将商品信息保存
    $('.clo-btn').click(function(){   	
    	window.open("shopping_cart.html");
    })
    
        

    $('.size_twoli a').click(function(event){
    	event.preventDefault();
    	$(this).removeClass('cartSize').addClass('cartSize').siblings().removeClass('cartSize');
    })
    
    
    $('.color_twoli1').click(function(event){
    	event.preventDefault();
    	$(this).removeClass('twoli1act').addClass('twoli1act').siblings().removeClass('twoli1act');
    })
    
    $('.LookP_codeshow img').click(function(){
    	$('.LookP_codehide').slideDown();
    })
    $('.shut').click(function(){
    	$('.LookP_codehide').hide();
    })
 
 
minMove();
function minMove(){
   $('.pic_ct_minpn_prve').click(function(event){
       event.preventDefault();
       $('.pic_ct_minct ul').stop().animate({'left':-60},function(){
                $(this).css({'left':0}).find("li:first").appendTo(this);
       })
   })
   $('.pic_ct_minpn_next').click(function(event){
       event.preventDefault();
       $('.pic_ct_minct ul').stop().animate({'left':+60},function(){                
                $(this).css({'left':0}).find("li:last").prependTo(this);
       })
   })
}

rightM();
function rightM(){
    $('.btn_down').click(function(event){
        event.preventDefault();
        var rtop = $(this).parent().siblings().find('ul').offset().top;
        rtop-=200;
        if(rtop <= -1020){
           rtop = -1020;
        }
        $(this).parent().siblings().find('ul').css('top',rtop);
    })
    
    $('.btn_up').click(function(event){
        event.preventDefault();
        var ltop = $(this).parent().siblings().find('ul').offset().top;
        ltop+=200;
        if(ltop >=0 ){
           ltop =0;
        }
        $(this).parent().siblings().find('ul').css('top',ltop);
    })
}
})                       