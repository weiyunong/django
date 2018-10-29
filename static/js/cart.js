$(function(){

var goodsList = $.cookie("cart1");
new1()	
function new1(){	
	if (goodsList) {
        goodsList = JSON.parse(goodsList);
		console.log(goodsList);
		for (var i=0; i<goodsList.length; i++) {
			var goods = goodsList[i];
				
	     	//创建节点
	        var div=$('<div class="buygoods_detail" id="'+goods.id+'"></div>');
	        var dl=$('<dl class="top"></dl>');
	        var dt=$('<dt><input class="chkall" name="" type="checkbox"></dt>');
	        var dd1=$('<dd class="sp"></dd>');
	        var dd1_span1=$('<span class="left"><a href=""><img src="'+goods.img+'"/></a></span>');
	        var dd1_span2=$('<span class="right"></span>');
	        var dd1_span2_span1=$('<span class="right_in"><a class="goods-link" href="" target="_blank">'+goods.name+'</a></span>');
	        var dd1_span2_span2=$('<span class="ziliao">品牌：韩伊儿　尺寸:'+goods.size+'颜色：'+goods.color+'</span>');
	        var dd2=$('<dd class="dj"><p class="price">￥<span class="price-icon dprice-icon">'+goods.price+'</span></p></dd>');
	        var dd3=$('<dd class="sl clearfix"><a class="J_minus minus" href="">-</a><input class="J_num num spinnerExample" value="'+goods.num+'" type="text"><a class="J_add add" href="">+</a></dd>')
	        var dd4=$('<dd class="jexj">￥<span class="price-icon tprice-icon">'+parseInt(goods.price)*parseInt(goods.num)+'</span></dd>');
			var dd5=$('<dd class="cz"></dd>');
			var dd5_p1=$('<p class="xiugai"><span class="J_edit operation"> 修改 </span></p>');
			var dd5_p2=$('<p class="delect"><span class="J_del operation"> 移除 </span></p>');
			
			$('.buygoods').append(div);
			div.append(dl);
			dl.append(dt,dd1,dd2,dd3,dd4,dd5);
			dd1.append(dd1_span1,dd1_span2);
			dd1_span2.append(dd1_span2_span1,dd1_span2_span2);
			dd5.append(dd5_p1,dd5_p2);			
		}
		
		xiugai(goodsList);
		zongjia();
		yichuchu(goodsList);
		jiesuan();
	}
}

//判断是否全选
quanxuan();
function quanxuan(){
	$('input#chkall').click(function(){
		
        var flag = $(this).prop("checked");
        $("[class='chkall']:checkbox").each(function(){ 
            $(this).prop("checked", flag); 
			xhTp();
//          if($(this).prop("checked")==true){
//          	addPrice();
//          }else{
//          	$('.howmuch').html(0);
//          	$('.nump').html(0);
//          }
        }) 
	})
}



//修改产品信息
function xiugai(goodsList){
	$('.J_edit').click(function(event){
		if(confirm("修改商品属性 请点击确定")){
			add_minus(goodsList);
		}else{
		    window.location.reload()
		}
	})	
}

function add_minus(goodsList){

	    $('.add').click(function(event){	
	    	event.preventDefault();
	    	var count = $(this).parent().find('input');
	    	var value = parseInt(count.val());
	    	value++;
	    	if(value >= 100){
	    		value =100;
	    	}
	    	count.val(value);
	    	
	    	for(var i=0;i<goodsList.length;i++){
	    		if($(this).parent().parent().parent().attr('id')==goodsList[i].id){
	    			goodsList[i].num++;
	    			$.cookie("cart1",JSON.stringify(goodsList), {expires:20, path:"/"});
	    		}
	    	}
	    	var dPrice= $(this).parent().siblings('.dj').find('.dprice-icon').text();
	    	var tPrice= $(this).parent().siblings('.jexj').find('.tprice-icon');
	    	tPrice.html(parseInt(dPrice)*value);
	    	xhTp();
	    	
	    })
	    
	    $('.minus').click(function(event){	
	    	event.preventDefault();
	    	var count = $(this).parent().find('input');
	    	var value = parseInt(count.val());
	    	value--;
	    	if(value <= 0){
			    if(confirm("点击确认 移除商品")){
					for(var i=0;i<goodsList.length;i++){
			    		if($(this).parent().parent().parent().attr('id')==goodsList[i].id){
			    			goodsList.splice(i,1);
			    			$.cookie("cart1",JSON.stringify(goodsList), {expires:20, path:"/"});
			    			$(this).parent().parent().parent().remove();
			    		}
			    	}
				}else{
				    goodsList[i].num=2;
				    value=1;
				}
	    	}	
	    	count.val(value);
	    	
	    	for(var i=0;i<goodsList.length;i++){
	    		if($(this).parent().parent().parent().attr('id')==goodsList[i].id){
	    			goodsList[i].num--;
	    			$.cookie("cart1",JSON.stringify(goodsList), {expires:20, path:"/"});
	    		}
	    	}
	    	
	    	var dPrice= $(this).parent().siblings('.dj').find('.dprice-icon').text();
	    	var tPrice= $(this).parent().siblings('.jexj').find('.tprice-icon');
	    	tPrice.html(parseInt(dPrice)*value);
	    	xhTp();
	    })
	
}



function zongjia(){
	$('input.chkall').click(function(){    
	   xhTp();
    })	
}

function xhTp(){
	var sumTotal = 0;
	var num2=0;
	for(var i=0;i<$('input.chkall').length;i++){
		if($('input.chkall').eq(i).prop('checked')==true){
			 var jexj = $('input.chkall').eq(i).parent().siblings('dd.jexj').find('span').text();
			 var val_num = $('input.chkall').eq(i).parent().siblings('dd.sl').find('input.J_num').val();
			 sumTotal = sumTotal + parseInt(jexj);
			 num2 = num2+parseInt(val_num);
		}
	}
	$('.howmuch').html(sumTotal);
	$('.nump').html(num2);
}



function yichuchu(goodsList){
	$('.J_del').click(function(){
		for(var i=0;i<goodsList.length;i++){
			if($(this).parent().parent().parent().parent().attr('id')==goodsList[i].id){
				goodsList.splice(i,1);
				if(goodsList.length ==0){
						$('.howmuch').html(0);
	                    $('.nump').html(0);
				}
				$.cookie("cart1",JSON.stringify(goodsList), {expires:20, path:"/"});
				$(this).parent().parent().parent().parent().remove();
			}
		}
	})
}

function jiesuan(){
    $('#J_toSettlement').click(function(){
    	alert('商品总价格为：'+$('.howmuch').html());
    })
}

})		    			