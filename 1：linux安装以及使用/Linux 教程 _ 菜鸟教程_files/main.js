// author: runoob
jQuery(document).ready(function ($){
	//搜索
	$(".search-reveal").click(function() {
        $(".row-search-mobile").slideToggle("400",
        function() {});
    });
	
	$('.placeholder').on('blur',function(){
	    if($(this).val() == ""){
	     $(this).val("搜索……");
	     }
	});
	$('.placeholder').on('focus',function(){
	 if($(this).val() == '搜索……') {
	      $(this).val('');
	   }
	});
	$('#feed_email').on('blur',function(){
	    if($(this).val() == ""){
	     $(this).val("输入邮箱 订阅笔记");
	     }
	});
	$('#feed_email').on('focus',function(){
	 if($(this).val() == '输入邮箱 订阅笔记') {
	      $(this).val('');
	   }
	});
	
	//代码高亮
	$('pre').each(function() {
		if(!$(this).hasClass("prettyprint")) {
			$(this).addClass("prettyprint");
		}
	});

	// 评论区域样式

	$(".comt-main li").prepend( "<i style=\"font-size:12px;color:#cfcfcf;padding-right: 4px;\" class=\"fa fa-circle\" aria-hidden=\"true\"></i>" );
	
	// 列表
	color_flag = false; //配色标记
	prev_title_flag = false;
	next_title_flag = false;
 	href = window.location.href;
 	
 	if($("#content img").hasClass('navup')) {
 		navup_flag = false;
 		$("#leftcolumn").find("a").each(function(index, value){
 			if(href.indexOf($(this).prop("href")) != -1) {
 				navup_flag = true;
 				return false; 
 			}
 		});
		if(!navup_flag) {
			href = $(".navup").parent('a').prop("href");
		}
	}

	
 	var total = $("#leftcolumn a").length;
 	// var _atop = 0;
	$("#leftcolumn").find("a").each(function(index, value){
		if(next_title_flag) {
				return false; //结束循环
		} 
		
		
		cur_href = $(this).prop("href");
		
		cur_obj = $(this);
		
		//if(href.match(cur_href) != null) {
		if(href.indexOf(cur_href) != -1) {
			// _cura = $(this);
			// _atop =  $(this).offset().top;
		if(index==0) {
			$(".previous-design-link").hide();
		}
		if(index==(total-1)) {
			$(".next-design-link").hide();
		}
			
			
			if(cur_href.indexOf('/') == -1) { //第二重判断
				tmp_url = href.substring(0, href.lastIndexOf('/')+1) + cur_href;
				
				if(href != tmp_url) return;
			}
			if(!color_flag) {
				$(this).css({"background-color":"#96b97d","font-weight":"bold", "color":"#fff"});
				color_flag = true;
			}
			prev_href = $(this).prev("a").prop("href");
			prev_title = $(this).prev("a").prop("title");
			if(!prev_title) prev_title=$(this).prev("a").text();
			next_href = $(this).next("a").prop("href");
			next_title = $(this).next("a").prop("title");
			if(!next_title) next_title=$(this).next("a").text();
			if(!prev_title_flag) {
				if( prev_title ) {
					$(".previous-design-link a").prop("href", prev_href);
					$(".previous-design-link a").prop("title", prev_title);
					$(".previous-design-link a").text( prev_title);
				} else {
					if(typeof(prev_obj) != 'undefined') {
						prev_href = prev_obj.prop("href");
						prev_title = prev_obj.prop("title");
						if(!prev_title) prev_title=prev_obj.text();
						if(prev_title) {
							$(".previous-design-link a").prop("href", prev_href);
							$(".previous-design-link a").prop("title", prev_title);
							$(".previous-design-link a").text( prev_title);
						}
					}
					
				}
				prev_title_flag = true;
			}
			if(next_title) {
				if($(".next-design-link a").prop("href")) {
					$(".next-design-link a").prop("href", next_href);
					$(".next-design-link a").prop("title", next_title);
					$(".next-design-link a").text( next_title);
				} else {
					$(".next-design-link").html("<a href=\"" + next_href + "\" rel=\"next\" title=\"" + next_title + "\">" + next_title + "</a> &raquo;");
				}
				
				next_title_flag = true;
				
			}
			//return false; 
		} else {
			prev_obj = cur_obj;
			if(next_title_flag) {
				return false;
			} else {
				if(prev_title_flag) {
					next_href = $(this).prop("href");
					next_title = $(this).prop("title");
					if(!next_title) next_title=$(this).text();
					if(next_title) {
						if($(".next-design-link a").prop("href")) {
							$(".next-design-link a").prop("href", next_href);
							$(".next-design-link a").prop("title", next_title);
							$(".next-design-link a").text( next_title);
						} else {
							$(".next-design-link").html("<a href=\"" + next_href + "\" rel=\"next\" title=\"" + next_title + "\">" + next_title + "</a> &raquo;");
						}
						next_title_flag = true;
					}
				}
			}
		}
	});
	
	// 侧栏
	$(".sidebar-tree > ul > li").hover(function(){
		$(this).addClass("selected");
		$(this).children("a:eq(0)").addClass("h2-tit");
		$(this).children("ul").show();
	},function(){
		$(this).removeClass("selected");
		$(this).children(".tit").removeClass("h2-tit");
		$(this).children("ul").hide();
	})
	// 关闭QQ群
	$(".qqinfo").hide();
	//$.getJSON("/try/qqinfo.php", function(data) {
	//	$("#qqid").text(data.qqid);
	//	$("#qqhref").prop("href", data.qqhref);
	//});
	// 首页导航
	$("#index-nav li").click(function(){
		$(this).find("a").addClass("current");
		$(this).siblings().find("a").removeClass("current");
		id = $(this).find("a").attr("data-id");
		$(".sub-navigation-articles").hide();
		if(id == 'index') {
			
		}
		if(id == 'note') {
			
		} else if(id == 'tool') {

		} else if(id == 'quiz') {
			$("#tool").hide();
			$("#manual").hide();
			$("#" + id).show();
			$(".sub-navigation-articles").show();
		} else if(id == 'manual') {
			$("#tool").hide();
			$("#quiz").hide();
			$("#" + id).show();
			$(".sub-navigation-articles").show();
		} else {
			$("#tool").hide();
			$("#quiz").hide();
			$("#manual").hide();
		}
    });
    $("#note-nav li").each(function(){
        if(window.location.pathname == $(this).find("a").attr("href")) {
        	$(this).find("a").addClass("current");
        	return false;
        }
  	});
	$("#cate0").click(function() {
		$(".codelist-desktop").show();
	})
	$(".design").click(function() {
		id = $(this).prop("id");
		$("." + id).show();
		$("." + id).siblings().hide();
	})
	//移动设备点击链接	
	$('a').on('click touchend', function(e) {
		if(screen.availHeight==548 && screen.availHeight==320) {
	  		var el = $(this);
	  		var link = el.attr('href');
	  		window.location = link;
  		}
	});
	
	$("#pull").click(function() {
		$(".left-column").slideToggle("400",function() {});
	})
	$(".qrcode").hover(function(){
		$("#bottom-qrcode").show();
		},function(){
			$("#bottom-qrcode").hide();
	});
	/*
	if($("#leftcolumn").length && $(".previous-next-links").length) {
		var _dheight = $(document).height();
		var _wheight = $(window).height();
		var _endArticle = $(".previous-next-links:eq(1)").offset().top;
		var _leftaTop = $("#leftcolumn a").last().offset().top;
		var _maxScrollTop = _dheight - $(window).height();
	} 
	
	var _srollWidth = '180px';
	if($(window).width()< 1068) {
		_srollWidth = '16%';
	}
	 左侧滚动部分代码
	var _scrollFLag = true;
	$('.gallery-list').bind('scroll', function()
	{
		if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
		{
			_scrollFLag = false;
		} else {
			_scrollFLag = true;
		}
	});
	*/
	
	$(window).scroll(function () {
		var _stop = $(window).scrollTop();
		/*  左侧滚动部分代码
		if($("#leftcolumn").length) {
			var _wtop = $(".middle-column").offset().top + $(".middle-column").height();
			var _footerHeight = $("#footer").offset().top;
			if(_leftaTop>=_endArticle) {
				_wtop = _wtop - _stop ;
			} else if(_wheight<(_footerHeight-_stop)) {
				_wtop = _wheight;
			} else {
				_wtop = _footerHeight - _stop - 10;
			}
			
			if(_scrollFLag && _atop>0 && _stop>=120 && $(window).width() > 768) {
				var _setTop = _stop - _atop + "px";
				//debounce($(".left-column").css("margin-top", _setTop),500);
				$(".gallery-list").css({ 'width':_srollWidth, 'position' : 'fixed', 'overflow-y' : 'scroll', 'overflow-x' : 'hidden', 'height' : _wtop+"px", 'top':0 });
				$(".gallery-list").scrollTop(_cura.position().top + $(".gallery-list").scrollTop());
				console.log('s1');
			} else if(_scrollFLag){
				console.log('s2');
				_scrollFLag = true;
				//debounce($(".left-column").css("margin-top", 0),500);
				$(".gallery-list").css({ 'width':'', 'position' : '', 'overflow-y' : '', 'overflow-x' : '', 'height' : '', 'top':'' });
			}
		}
		*/
	    if(_stop>=100) {
	        $(".go-top").fadeIn();
	         if ($('#htmlfeedback-container').length){
	         	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
					 // some code..
				} else {
	         		$("#htmlfeedback-container").show();
	         	}
	         }
	    }else {
	    	$(".go-top").fadeOut();
	    }
	});


	$(".go-top").click(function(event){	
		$('html,body').animate({scrollTop:0}, 100);
		return false;
	});
	$(window).resize(function() {
		var viewportWidth = $(window).width();
		if(window.location.href.indexOf("w3cnote")!=-1) {
			//console.log('href', window.location.href);
		} else {
			if(viewportWidth>768) {
				$(".left-column").show();
			}
		}
		if (viewportWidth < 468) {
			$("#index-nav li").each(function( index ) {
				if(index > 2) {
					$(this).hide();
				}
			});
		} else {
			$("#index-nav li").show();
		}
		
	});

	
});
/**
* 用户登陆注册
*/
jQuery(document).ready(function($){
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$runoob_pop = $('.runoob-pop');
	
	//判断是否登陆
	$.post('/wp-content/themes/runoob/option/user/log.php',{action:'checklogin'},function(res){
		if(res.error==0) {
			$('<a target="_blank" href="//www.runoob.com/member">'+res.msg+'</a>').replaceAll('.runoob-pop');
		
		}
	},'json');
	
	//弹出窗口
	$runoob_pop.on('click', function(event){
		$form_modal.addClass('is-visible');	
		//show the selected form
		( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
	});

	//关闭弹出窗口
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}	
	});
	//使用Esc键关闭弹出窗口
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });

	//切换表单
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}
	$('.full-width2').on('click', function(e){
        e.preventDefault();     
        var form = $(this).parent().parent();
        var action = form.find('input[name="action"]').val();
        var inputs = '';
        var isreg = (action == 'signup') ? true : false

        if( !action ){
            return
        }

        if( isreg ){ // 注册
        	verifycode = form.find('input[name="verifycode"]').val();
        	email = form.find('input[name="email"]').val();
        	name = form.find('input[name="name"]').val();
        	password = form.find('input[name="password"]').val();
        	password2 = form.find('input[name="password2"]').val();
        	inputs = {verifycode:verifycode,name:name,password:password,email:email,password2:password2,action:action};
        }else{ // 登陆
        	username = form.find('input[name="username"]').val();
        	password = form.find('input[name="password"]').val();
        	if($('#remember-me').prop('checked')) {
        		remember = 1;
        	} else {
        		remember = 0;
        	}
        	inputs = {username:username,password:password,action:action,remember:remember};
        }

        $.ajax({  
            type: "POST",  
            url:  jsui.uri+'/option/user/log.php',  
            data: inputs,  
            dataType: 'json',
            success: function(data){

                if( data.error ){
                	error_msg = '<p class="errtip">	<strong>错误</strong>：'+data.msg+'</p>'
                    $(".err-msg").html(error_msg);
                    return
                }

                if( isreg ){
                    location.reload();
                }else{
                	 location.reload();
                }
            }  
        });  
    });
    // Bootstrap 2.x 提示
    if(window.location.href.indexOf('bootstrap-v2')!==-1) {
    	var bs2_info = '<div style="color:#a94442;background-color:#f2dede;border-color:#ebccd1;padding: 15px;margin-bottom: 20px;border: 1px solid transparent;border-radius: 4px;"><strong>提示：</strong>你当前查看的是 Bootstrap 2.x 版本，<a target="_blank" href="/bootstrap/bootstrap-tutorial.html">Bootstrap3.x 版本点我</a>。</div>';
    	$("#content").prepend(bs2_info);
    }
    $(".widget-header i:odd").click(function() {
		if($(this).hasClass("fa-caret-up")) {
			$(this).parent(".widget-header").siblings(".widget-content").hide();
			$(this).removeClass("fa-caret-up").addClass("fa-caret-down");
		} else {
			$(this).parent(".widget-header").siblings(".widget-content").show();
			$(this).removeClass("fa-caret-down").addClass("fa-caret-up");
		} 
	});

	// 夜间模式与日间模式
	var cateID = $("#moon").attr("data-cate");
	if(cateID) {
		var cookieMoon = readCookie("moon"+cateID);
	}
	$("#moon").click(function() {
		$(this).hide();
		$("#sun").show();
		$(".example_code").css({"background-color":"#eee"})
		$(".hl-main").css({"background-color":"#eee"});
		$(".article").css({"background-color":"#eee"});
		$(".reference tr:nth-child(even)" ).css( "background-color", "#eee" );
		$(".simditor-wrapper" ).css( "background-color", "#eee" );
		$(".simditor-toolbar" ).css( "background-color", "#eee" );
		$(".comt-ctrl" ).css( "background-color", "#eee" );
		$(".ipt" ).css( "background-color", "#eee" );
		if(!cookieMoon) {
			createCookie("moon" + cateID, 1, 1 )
		}
	});
	$("#sun").click(function() {
		$(this).hide();
		$("#moon").show();
		$(".example_code").css({"background-color":"#fff"});
		$(".hl-main").css({"background-color":"#fff"});
		$(".article").css({"background-color":"#fff"});
		$(".reference tr:nth-child(even)" ).css( "background-color", "#fff" );
		$(".simditor-wrapper" ).css( "background-color", "#fff" );
		$(".simditor-toolbar" ).css( "background-color", "#fff" );
		$(".comt-ctrl" ).css( "background-color", "#fbfbfb" );
		$(".ipt" ).css( "background-color", "#fff" );
		eraseCookie("moon" + cateID) 
	});
	if(cateID && cookieMoon) {
		$("#moon").trigger( "click" );
	}

});



jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};
//--------- 登陆，注册结束---------------
// 废弃弹窗
function NewWindow(text)
{
	win=window.open(text,'','top=0,left=0,width=400,height=230');
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name,"",-1);
}