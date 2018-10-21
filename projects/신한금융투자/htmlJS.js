$(document).ready(function(){
	if(!window.si){ //퍼블리싱 페이지에서만 실행
		initUI();
		if( $('.gnbMenu').children().children().length > 0 ){
			$('#gnb .gnbList').children().children('a').off('click').on('click', function(e){
				e.preventDefault();
				shMenu.gnb1depthAni($(this));
			});
		}
		shCalendar.init();
		shComm.selectBox();
		$('.popLayer .btnArea button , .popLayer .layClose ,.newGuide_pop .layClose').on('click', function(e){
			$('.footer').css('z-index','');
			var id = $(this).closest('.popLayer').attr('id');
			$.closeDimPop(id);
		});

		//이달의 투자전략
		if( $('.landingCon').length > 0 ){
			$('.landingCon .slideWrap').shSlide({
				'autoplay': true,
				'time': 0
			});
		}
		//자산 코멘트
		if( $('.landingNote.slideWrap').length > 0 ){
			$('.landingNote.slideWrap').shLineslide({
				'autoplay': true
			});
		}
		//트레이딩 서브메인
		if( $('.tradingCon .slideWrap.asideEvent').length > 0){
			$('.tradingCon .slideWrap.asideEvent').shSlide({
				'autoplay': true
			});
		}
		//고객센터 트래이딩 채널 안내
		if( $('.slideWrap.tradingScreen').length > 0){
			$('.slideWrap.tradingScreen').shSlide({
				'autoplay': false
			});
		}
		
		//한눈에 보는 해외선물/FX마진
		shPages.fxexchange();
		//통합검색
		$(document).off('click.tsearch').on('click.tsearch', '.gnbUtil>.topSearch>button', function(e){
				$(this).next().slideDown(300);
				//image slide
				$('.totalSearch .slideWrap').shSlide();
				$('.totalSearch .slideWrap').data('shSlide').loop();
				if( $('.noticeWrap').is(':visible')){
					$('.noticeWrap').hide();
				}
				if( $('.totalMenu > .menuList').is(':visible')){
					$('.totalMenu > .menuList').hide();
				}
			});
		//전체메뉴 보기
		$(document).off('click.tmenu').on('click.tmenu' , '.totalMenu >button', function(e){
			div = $('.totalMenu > .menuList');
			div.slideDown(300);
			div.find('.inner').jScrollPane({
				mouseWheelSpeed: 100,
				verticalGutter : 0,
			});
			if( $('.topSearch>div').is(':visible') ){
				$('.topSearch .totalSearch').hide();
				$('.totalSearch .slideWrap').data('shSlide').clearloop();
			}
			if( $('.noticeWrap').is(':visible')){
				$('.noticeWrap').hide();
			}
		});
		//
		$(document).off('click.tmenulist').on('click.tmenulist', '.totalMenu .totalDep1>li>a.tit',function(e){
			e.preventDefault();
			var pli = $(this).parent();
			if( pli.hasClass('totalON') ){
				pli.removeClass('totalON');
				pli.find('div').slideUp(300,function(){
					if( $( '.totalMenu .totalDep1>li > div').filter(':visible').length < 1 ){
						div.find('.inner').css('height','480px');
					}
					div.find('.inner').data('jsp').reinitialise();
				});
			}else{
				pli.addClass('totalON');
				pli.siblings().removeClass('totalON');
				pli.find('div').slideDown(300,function(){
					div.find('.inner').data('jsp').reinitialise();
				});
				pli.siblings().find('div').slideUp(300, function(){
					div.find('.inner').data('jsp').scrollToY( pli.position().top );
					div.find('.inner').data('jsp').reinitialise();
				});
				div.find('.inner').height( 700 );
			}

		});
		//로그인 알림
		$(document).off('click.topNotice').on('click.topNotice', '.gnbUtil>.topNotice>button', function(e){
			$(this).next().slideDown(300);
			if( $('.topSearch>div').is(':visible') ){
				$('.topSearch .totalSearch').hide();
				$('.totalSearch .slideWrap').data('shSlide').clearloop();
			}
			if( $('.totalMenu > .menuList').is(':visible')){
				$('.totalMenu > .menuList').hide();
			}
		});
		//사이트맵
		$(document).off('click.tmenulistfooter').on('click.tmenulistfooter' , '#footer .footBtm a:contains(사이트맵)', function(e){
			e.preventDefault();
			$(window).scrollTop(0);
			$('.totalMenu >button').trigger('click').focus();
		});
		//연금 시뮬 next
		if( $('.planCon').length > 0 ){
			$('.myVal:not(:last) > .txtArea > button').off('click.retirementPlan').on('click.retirementPlan', function(e){
				var idx = $(this).closest('.myVal').index()+1;
				shSimul.retirementPlanAni(idx);
			});
		}
		// 유형별 레이어 
		//layer prevent chage
		$(document).off('change.portfoliomytype click.portfoliomytype').on('change.portfoliomytype click.portfoliomytype', '#typeView input', function(e){
			return false;
		});
		//펀드검색
		$(document).off('click.myfundSearchpage').on('click.myfundSearchpage', '.fundSearch>.searchTop>.btnL.btnDetail', function(e){
			$(this).toggleClass('close');
			$(this).parent().next('.searchDetail').stop().slideToggle(300);
			//jscrollpane scroll css
			if( $(this).hasClass('close') ){
			}else{
				$('.searchDetail .jspPane').css('width','');
			}
		});
		//tradingMainScroll		
		if( $('.tradingCon.tradingProd .prodScatch').length > 0 ){
			shSubMain.tradingMainScroll();
		}
	}
});
function initUI(){
	//공통
	shComm.init();
	//통합검색, 전체메뉴 보기 , 상단 로그인후 알림 레이어, 패밀리사이트
	shMenu.init();
	//gnb
	shMenu.gnb();
	//location bar
	shMenu.locationBar();
	//lnb start
	shMenu.lnbInit();
	
	//calrendar
	//shCalendar.init();
	//pages
	shPages.init();
	//portfolio ani
	shSimul.init();
	//서브메인
	shSubMain.init();
	//table set id, header
	$.setIdAndHeadersToTables();
}
"use strict";
//ie8 array indexOf
if( !Array.prototype.indexOf ){
	Array.prototype.indexOf = function(obj, start){
		for( var i=(start||0),j=this.length ; i<j ; i++ ){
			if( this[i] == obj ){ return i; }
		}
		return -1;
	}
}

//table
(function($){
	$.setIdAndHeadersToTables=function(param){
		var prefixId="tb"// id = prefixId-tbIdx-thIdx
		var tbIdx=0;

		var str = 'table.'+param;
		if(!param){
			str = 'table.tableJs';
		}

		$(str).each(function (){
			//--- set id --------------------------------------
			var thIdx=0;
			$(this).find("th").each(function (){
				if(!this.id||this.id=="") this.id=prefixId+"-"+tbIdx+"-"+thIdx;
				thIdx++;
			});

			//--- count row&column ----------------------------
			var rowCnt=$(this).find("tr").length;
			var colCnt=0;
			$(this).find("tr:eq(0)").children().each(function(){
				var colspan=$(this).attr("colspan");
				if(colspan) colCnt+=Number(colspan);
				else colCnt++;
			});

			//--- 초기화 table array ----------------------------
			var tableArr=new Array(rowCnt);
			for(var i=0;i<rowCnt;i++) tableArr[i]=new Array(colCnt);

			//--- set tableElement to array -------------------
			var row=0;
			$(this).find("tr").each(function(){
				var col=0;
				$(this).children().each(function(){
					var rs=$(this).attr("rowspan");
					var cs=$(this).attr("colspan");

					for(var i=col;i<colCnt;i++){
						if(!tableArr[row][i]){
							col=i;
							break;
						}
					}

					if(rs && cs){
						for(var i=0;i<Number(rs);i++) {
							for(var j=0;j<Number(cs);j++) {
								tableArr[row+i][col+j]=this;
							}
						}
						col+=(Number(cs)-1);
					}
					else if(rs){
						for(var i=0;i<Number(rs);i++) {
							tableArr[row+i][col]=this;
						}
					}else if(cs){
						for(var i=0;i<Number(cs);i++) {
							tableArr[row][col+i]=this;
						}
						col+=(Number(cs)-1);
					}else{
						tableArr[row][col]=this;
					}

					col++;
				});
				row++;
			});

			//--- set headers ---------------------------------
			var setHeaders=function(id,scp,i,j){
				if(scp&&scp.indexOf("row")==0){
					for(var k=j+1;k<colCnt;k++) {
						if(tableArr[i][k].tagName=="TH" || tableArr[i][k].tagName=="th") {
							var childScp=$(tableArr[i][k]).attr("scope");
							if(childScp&&childScp.indexOf("row")==-1) {
								setHeaders(id+" "+tableArr[i][k].id,childScp,i,k); //재귀
							}
							continue;
						}

						var hdrs=$(tableArr[i][k]).attr("headers");
						var idArr=id.split(" ");

						for(var x=0;x<idArr.length;x++){
							if( !hdrs ) continue;/////////////////////////////////////////////////////////////////////////
							if(hdrs && hdrs.split(" ").indexOf(idArr[x])!=-1) continue;

							if(hdrs==""|| !hdrs) {
								hdrs=idArr[x];
								$(tableArr[i][k]).attr("headers",hdrs);
							}
							else {
								hdrs+=" "+idArr[x];
								$(tableArr[i][k]).attr("headers",hdrs);
							}
						}
					}
				}else if(scp&&scp.indexOf("col")==0){
					for(var k=i+1;k<rowCnt;k++) {
						if(tableArr[k][j].tagName=="TH" || tableArr[k][j].tagName=="th") {
							var childScp=$(tableArr[k][j]).attr("scope");
							if(childScp&&childScp.indexOf("col")==-1) {
								setHeaders(id+" "+tableArr[k][j].id,childScp,k,j); //재귀
							}
							continue;
						}

						var hdrs=$(tableArr[k][j]).attr("headers");
						var idArr=id.split(" ");

						for(var x=0;x<idArr.length;x++){
							if(hdrs && hdrs.split(" ").indexOf(idArr[x])!=-1) continue;
							if(hdrs==""|| !hdrs) {
								hdrs=idArr[x];
								$(tableArr[k][j]).attr("headers",hdrs);
							}
							else {
								hdrs+=" "+idArr[x];
								$(tableArr[k][j]).attr("headers",hdrs);
							}
						}
					}
				}
			};

			for(var i=0;i<rowCnt;i++){
				for(var j=0;j<colCnt;j++){
					if(tableArr[i][j].tagName=="TH" || tableArr[i][j].tagName=="th") {
						setHeaders(tableArr[i][j].id,$(tableArr[i][j]).attr("scope"),i,j);
					}
				}
			}
			//-------------------------------------------------

			tbIdx++;
		});

	}
}(jQuery));
//-------------------common-------------------
(function($){
	var module = window.shComm = {};
	module.focusElement = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
	//select box
	module.selectBox = function(){
		// 셀렉트 박스 일괄 적용
		$("select").each(function(idx){
			var $t=$(this);
			var $p=$t.parent();
			var $d=$p.children('div.select');
			var o={height:250,zindex:100,direction:$p.hasClass("selectBtm")?"up":"down"};
			if(!$d.length){
				// selectbox 미생성
				(new SelectBox($t, o)).initSB();
			}else if(!$d.data('scope')){
				// selectbox 생성 후 ko에 의해 이벤트 제거됨 if / for 내부
				$($d).remove();
				(new SelectBox($t, o)).initSB();
			}
		});
	};
	//tab
	module.tab = function(){ //e.name = initTab
		var tabUL = $("#tabScript");	///탭 아이디 ???
		if( $("*[id^='tabScript']").length > 1 ){
			tabUL = $("*[id^='tabScript']");
		}else{
			tabUL = $("#tabScript");
		}
		if (tabUL.length === 0) return false;
		tabUL.each(function(m){
			$(this).find('li').each(function(l){
				var a = $(this).find('a');
				if ( !a.attr("target") && a.attr("href").indexOf('#') === 0 ){
					$(this).data('tablist',l);
					if( l > 0 ){
						if( $(this).prev().data('tablist') === undefined ){
							$(this).data('tablist',l-1);
						}
						if( parseInt($(this).prev().data('tablist')) - l < -1 ){
							$(this).data('tablist',l-1);
						}
					}
				}
			});

		});
		tabUL.off("click.initTab").on("click.initTab", "> li > a", function (e){
			var target = $(e.currentTarget);
			var li = target.closest("li");
			var content = target.closest("ul,ol").nextAll('.tabCont:lt('+li.siblings().andSelf().length+')');//.siblings(".tabCont");
			if (content.length === 0) content = target.closest("ul,ol").parent().siblings(".tabCont");

			li.addClass("on").siblings("li").removeClass("on");

			var idx = li.data('tablist');

			content.hide().eq(idx).show();
			if ( !target.attr("target") && target.attr("href").length < 2 ){
				e.preventDefault();
			}
		
		});
	};
	//accodian type1 faq
	module.faq = function(){ //e.name = initFaq
		var listUL = $(".listToggle:not(.planList)");

		if (listUL.length === 0) return false;

		//모두 닫아 놓기
		if( listUL.hasClass('planList') ){
			listUL.find('li:first').addClass("open");
		}else{
			defaultList();
		}

		//리스트 열기
		listUL.off("click.initFaqopen").on("click.initFaqopen", "li > a.tit", function (e){
			var target = $(e.currentTarget);
			if( target.closest('.listToggle').hasClass('planList') ){
				target.parent().hasClass('open') ? target.next("div").hide() : target.next("div").show();
				target.parent().toggleClass("open");
			}else{
				change(target);
			}
			e.preventDefault();
		});

		//리스트 닫기
		listUL.off("click.initFaqclose").on("click.initFaqclose", ".eBtn_close", function (e){
			defaultList();

			e.preventDefault();
		});

		//리스트 변경 함수, 인자로 a 태그의 jquery object
		function change(target){
			if (target.length === 0) return false;

			var li = target.closest("li");
			var content = target.next("div");
			var isHidden = (content.filter(":hidden").length > 0) ? true : false;

			defaultList();
			listUL.find("li").find(">div").hide(); //2016-06-09
			if (isHidden){
				li.addClass("open");
				content.show();
			}
		}

		//리스트에 on을 삭제하고 컨텐츠 모두 닫음
		function defaultList(){
			listUL.find("li.open").removeClass("open");
		}
	}
	//login radio tab
	module.loginTab = function(){ //e.name = initLogin
		var tabUL = $("#idLogin");

		if (tabUL.length === 0) return false;

		tabUL.off("click.initLogin").on("click.initLogin", ".formWrap > label", function (e)
		{
			var target = $(e.currentTarget);
			var li = target.closest("p");
			var idx = li.index();
			var content = target.closest(".radArea").siblings("div.loginInp");
			if (content.length === 0) content = target.closest(".radArea").parent().siblings("div.loginInp");

			content.hide().eq(idx).show();

			if (target.attr("href") === "#") e.preventDefault();
		});
	};
	//labelToggle show hide
	module.labelToggle = function(){ //e.name =labeltoggle
		var sBox = $('.searchBox');
		var eName = 'change.labeltoggle paste.labeltoggle keyup.labeltoggle';
		sBox.find('.inp>input').off(eName).on(eName, function(e){
			if( $(this).val() ){
				$(this).prev().hide();
			}else{
				$(this).prev().show();
			}
		});
		//login tab
		$('.loginInp').off(eName).on(eName, 'input[type="text"], input[type="password"]', function(e){
			if( $(this).val() ){
				$(this).next().hide();
			}else{
				$(this).next().show();
			}
		});
	};

	//agree box check
	module.agreeArea = function(){ //e.name = formview,icoCheck
		var div = $('div.agreeArea');
		//내용보기 input:radio
		//div.find('.formView').children('input').off('click').on('click', function(e){
		$(document).off('click.formview').on('click.formview', 'div.agreeArea .formView>input', function(e){
			var elem = $(this);
			if( $(this).closest('.formView').next().is(':hidden') ){
				$(this).closest('.formView').next().show().hide();
			}
			if( $(this).next().text().match(/(내용보기)/) ){
				$(this).next().text('내용닫기');
			}else if( $(this).next().text().match(/(내용닫기)/) ){
				$(this).next().text('내용보기');
			}
			$(this).closest('.formView').next().slideToggle(300, function(){
				elem.closest('.agreeArea').toggleClass('open');

			});
		}).off('keydown.formview').on('keydown.formview', 'div.agreeArea .formView', function(e){
			if( e.keyCode === 13 ) $(this).trigger('click');
		});
		//투자위험고지사항 보기
		$(document).off('click.icoCheck').on('click.icoCheck', 'div.agreeArea .btnBox button.btnM.btnIco.icoCheck', function(e){
			var idx = $(this).index('.btnBox button');
			$(this).siblings().removeClass('toggleON');
			$(this).toggleClass('toggleON');
			$(this).parent().find('.toggleCont').not(':eq('+idx+')').hide();
			$(this).parent().find('.toggleCont').eq(idx).slideToggle(300);
		});
	};

	//layer type1 modal
	module.layerModal = function(){ //e.name = initPop
		var linkTag = $("a[href], input:not([disabled]), button:not([disabled])");	// 페이지에 팝업을 띄울 수 있는 태그 전부
		linkTag.each(function (idx){
			if ($(this).attr("data-path") !== undefined){
		
				// 팝업 띄우는 이벤트
				$(this).off("click.initPop").on("click.initPop", function (e){
					var target = $(e.currentTarget);
					var id = target.attr("data-path");

					$.openDimPop(id, target);

					e.preventDefault();
				});

			} // end if
		}); // end each*/

	};
	// step line animation
	module.stepLine = function(){
		var obj = $('.stepType').find('.recent');
		var ani = $('.stepType .recent').find('.bar');
		//
		if( ani.attr('style') ){
			ani.removeAttr('style');
		}
		ani.css({
			'display':'block',
			'overflow': 'hidden',
			'background': '#16a3db',
			'opacity': '1'
		});
		if( obj.hasClass('on') ){
			obj.removeClass('on');
		}
		if( obj.index() !== 0 ){
			obj.find('em').css('border-color','#cacdce');
			ani.animate({'width':136}, 800, function(){
				$(this).parent('.recent').addClass('on');
				if( obj.find('em').length < 2 ){
					obj.find('em').clone().insertBefore( obj.find('em') );
				}
				obj.find('em').eq(0).css('border-color','#1598dc').hide().fadeIn(350);
				obj.find('em').eq(1).fadeOut(700, function(){
					$(this).remove();
				});
			});
		}else{
			ani.parent('.recent').addClass('on');
			obj.find('em').clone().insertBefore( obj.find('em') );
			obj.find('em').eq(0).css('border-color','#1598dc').hide().fadeIn(350);
			obj.find('em').eq(1).fadeOut(700, function(){
				$(this).remove();
			});
		}


	};

	//if layer show : prevenet Scroll
	module.preventScroll = function(){ //e.name = pl
		var deltaSave = 0, scrollElem;
		var layerElem;
		$(document).off('DOMMouseScroll mousewheel wheel').on('DOMMouseScroll mousewheel wheel', function(e){
			if( scrollElem ){  // layer popup scroll cont
				e.preventDefault();
				var wheelEvent = e.originalEvent;
				var dY = wheelEvent.deltaY ? wheelEvent.deltaY : -(wheelEvent.wheelDelta);
				var unknownVal = 0;
				scrollElem.parent().hasClass('popCont')|| scrollElem.hasClass('popLayer') ? unknownVal = 0: unknownVal = -2;
				scrollElem.each(function(m){
					var $scElem = $(this), otherScroll = $scElem.scrollTop();
					if( $scElem[0].scrollHeight - $scElem.scrollTop() === ($scElem.outerHeight()+unknownVal) ){
						dY > 0? deltaSave = 1 : deltaSave = -1;
					}else{
						dY > 0? deltaSave = 1 : deltaSave = -1;
						if( $scElem.scrollTop() === 0 ){
							dY <0? deltaSave = 0 : deltaSave;
						}
					}
					$scElem.scrollTop( otherScroll + deltaSave*100 );
				});

			}
			if ( $('.popLayer').is(':visible') ){	// layer popup
				e.preventDefault();
			}else{
				scrollElem = undefined;
			}
			if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){ //after 3d menu , safari scroll
				if( ($(window).scrollTop()-(e.originalEvent.wheelDelta))%120 === 0 ){
					$(window).scrollTop( $(window).scrollTop()-(e.originalEvent.wheelDelta) );
				}
			}
		}).off('mouseenter.pl').on('mouseenter.pl', '.popLayer ', function(e){//.tableScroll
			var findElem = $(this).find('div').filter( function(){ if( $(this).css('overflow-y') =='auto' || $(this).css('overflow-y') =='scroll' ) return $(this) } );
			if( $(this).css('overflow-y') =='auto' || $(this).css('overflow-y') =='scroll' ){
				var pElem = $(this);
				scrollElem = $(this);
				if( findElem.length > 0 ){
					findElem.off('mouseenter').on('mouseenter', function(e){
						scrollElem = $(this);
					}).off('mouseleave').on('mouseleave',function(e){
						scrollElem = pElem;
					});
				}
			}else{
				scrollElem = $(this).find('div').filter( function(){ if( $(this).css('overflow-y') =='auto' || $(this).css('overflow-y') =='scroll' ) return $(this) } );
				scrollElem.off('mouseenter').on('mouseenter', function(e){
					scrollElem = $(this);
				}).off('mouseleave').on('mouseleave',function(e){
					if( $(this).closest('.layCont').length > 0 ){
						scrollElem = $(this).closest('.layCont');
					}
				});
			}
			if( scrollElem.length < 1 ) scrollElem = undefined;

		}).off('mouseleave.pl').on('mouseleave.pl', '.popLayer ', function(e){//.tableScroll
			scrollElem = undefined;
		}).off('keydown.pl').on('keydown.pl', function(e){ // keyCode : 32 = space, 37-40 = arrows, 33 = pageUp, 34 = pageDown
			var doc = $(this);
			if ( $('.popLayer').is(':visible') ){	// layer popup
				var scrollElemFocus;
				if( doc.find('.popLayer ').css('overflow-y') =='auto' || doc.find('.popLayer ').css('overflow-y') =='scroll' ){
					scrollElemFocus = doc.find('.popLayer ');
				}else{
					scrollElemFocus = doc.find('.popLayer .popCont div').filter( function(){ if( $(this).css('overflow-y') =='auto' || $(this).css('overflow-y') =='scroll' ) return $(this) } );
				}
				scrollElemFocus.each(function(i){
					var unknownVal = -2;
					var scrollElemFocusThis = $(this);
					scrollElemFocusThis.parent().hasClass('popCont') || scrollElemFocusThis.hasClass('layCont') ? unknownVal = 0: unknownVal = -2;
					var arraySElem = scrollElemFocus.map(function(v,k){ return k; });//focusElement
					if( $(arraySElem[i]).attr('class') === scrollElemFocusThis.filter(':focus').attr('class') || scrollElemFocusThis.find(shComm.focusElement).is(':focus') ){	//radio....
						if( scrollElemFocusThis[0].scrollHeight - scrollElemFocusThis.scrollTop() === (scrollElemFocusThis.outerHeight()+unknownVal) && $(arraySElem[i]).is(':focus') ){
							if( e.keyCode == 32 || e.keyCode == 40 || e.keyCode == 34  ) e.preventDefault(); //e.keyCode == 40 ||
						}else{
							if( scrollElemFocusThis.scrollTop() === 0 ){
								if( e.keyCode == 38 || e.keyCode == 33 ) e.preventDefault();
							}
						}
					}
				});
				if( scrollElemFocus.filter(':focus').length > 0 || scrollElemFocus.find(shComm.focusElement).filter(':focus').length > 0 ){
				}else{
					if( e.keyCode == 32 || e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode == 33 || e.keyCode == 34 ) e.preventDefault();
				}
			}
			// 디자인 스크롤 div안의 컨턴츠에 포커스가 있을때 화살표를 누를시 스크롤 이동
			if( $(e.target).closest('.jspScrollable').length > 0 ){
				if( e.keyCode >= 37 && e.keyCode <= 40 ) e.preventDefault();
				var isUp = e.keyCode == 38 ? true : false;
				var isDown = e.keyCode == 40 ? true : false;
				var jsAble = $(e.target.closest('.jspScrollable'));
				if( jsAble.length > 0 ){
					var pos = jsAble.data('jsp').getContentPositionY();

					if( isUp ){
						jsAble.data('jsp').scrollToY( -50+pos );
					}else if( isDown ){
						jsAble.data('jsp').scrollToY( 50+pos );
					}
				}

			}
		});
	};
	//테이블 안 클래스더보기 버튼
	module.classMoreView = function(){ //e.name = classmoreview
		//toggle
		$(document).off('click.classmoreview').on('click.classmoreview', '.prodList .prodAnother .btnOther',function(e){
			e.preventDefault();
			$(this).parent().toggleClass('open');
			$(this).closest('tbody').next('.classMore').toggle(0,function(){
				$(this).toggleClass('open');
			});
		});
	}

	//sortForm radio addclass=on
	module.sortForm = function(){ //e.name = sortForm
		var sort = $('.sortForm input');
		sort.off('change.sortForm').on('change.sortForm',function(e){
			var $elem = $(this);
			$(this).parent().siblings().filter(function(k){
				if( $elem.attr('name') === $(this).find('input').attr('name') ) return $(this);
			}).removeClass('on');
			$(this).parent().addClass('on');
			if( $('.marketLst').length > 0 ){
				$('.marketLst li').show();
			}
		});
	};

	//top btn
	module.topbtn = function(){ //e.name = topbtn
		var setbtnTimer;
		$(window).off('scroll.topbtn').on('scroll.topbtn',function(){
			if( $('style[meny]').length < 1 && $('.gnbMenu:visible').length < 1 ){
				if( $(window).scrollTop() > 0 ){
					clearTimeout(setbtnTimer);
					$('#pageTop').fadeOut(100);
					setbtnTimer = setTimeout(function(){
						$('#pageTop').fadeIn(100);
						if( $('style[meny]').length > 0 ){
							$('#pageTop').hide();
						}
					},500);
				}
			}
		});
		$(document).off('click.topbtn').on('click.topbtn', '#pageTop',function(e){
			$(window).scrollTop(0);
		});
	};

	module.init = function(){
		setTimeout(function(){
			module.tab();
			module.loginTab();
			module.labelToggle();
			module.faq();
			module.agreeArea();
			module.layerModal();
			//
			module.stepLine();
			module.preventScroll();

			module.classMoreView();
			module.sortForm();
			module.topbtn();
		},10);
	};
}(jQuery));

//-------------------menu & location bar & totalSearch btn -------------------
(function($){
	var module = window.shMenu = {};
	module.gnb1depthAni = function(a){ // element = $('#gnb .gnbList > li > a')
		var mgnb = $('#gnb').filter(function(k){
			if( $(this).attr('class').split(' ').length < 2 ){
				return $(this);
			}
		});
		if( mgnb.length > 0 ){
			gnbtype1();
		}else{
			if( $('.gnbMenu').is(':hidden') ){
				$('.gnbMenu').css('min-height','0px');
				$('.gnbMenu').slideDown(function(){
					$('.gnbMenu').css('min-height','');
				});
			}
		}
		function gnbtype1(){
			var $elem =  mgnb.find('.gnbList > li > a:focus , .gnbList > li:hover > a');
			var topHi = 145;
			$elem.next().css('min-height','0px');
			if( $elem.next().is(':hidden') ) {
				$elem.next().css('z-index','').css('visibility','hidden').show().css('visibility','visible').hide();
			}

			if( $elem.next().height() > $(window).height() - topHi  ){
				$elem.next().height( $(window).height() - topHi );
			}

			if( $elem.parent().siblings().find('>div:visible').length > 0 ){
				$elem.next().show();
				$elem.next().css('min-height','');
				setTimeout(function(){
					if( $elem.next().find('.gnbDep1').height()+64 > $(window).height() - topHi ){
						$elem.next().height( $(window).height() - topHi );
						jscrollset();
					}
				},5);
			}else{
				if( $elem.parent().hasClass('gnbON') && $elem.next().is(':visible') ){
					$elem.next().css('min-height','');
					setTimeout(function(){
						if( $elem.next().find('.gnbDep1').height()+64 > $(window).height() - topHi ){
							$elem.next().height( $(window).height() - topHi );
							jscrollset();
						}
						return false;
					},5);
				}else{
					if( $elem.next().find('.gnbDep1').height()+64 > $(window).height() - topHi && $elem.next().data('jsp') ){
						$elem.next().height( $(window).height() - topHi );
					}
					$elem.next().css('min-height','0px');
					$elem.next().stop().slideDown(function(){
						$elem.next().css('min-height','');
						setTimeout(function(){
							if( $elem.next().find('.gnbDep1').height()+64 > $(window).height() - topHi ){
								jscrollset();
							}
						},1);
					});
				}

			}
			function jscrollset(){
				if( $elem.next().data('jsp') ){
					$elem.next().data('jsp').reinitialise();
					$elem.next().find('.jspContainer').width(992).css('overflow-x','visible');
				}else{
					$elem.next().jScrollPane({
						mouseWheelSpeed: 100,
						contentWidth : 981,
						verticalGutter : 0//,autoReinitialise: true
					}).css('overflow','visible');
					$elem.next().find('.jspContainer').width(992).css('overflow-x','visible');
				}
			}
			$elem.parent().addClass('gnbON');
			$elem.parent().siblings().find('>div').hide();
			$elem.parent().siblings().removeClass('gnbON');
			$elem.parent().siblings().find('>div').css('z-index','0');
			//2depth set
			$('#gnb .gnbList').find('.gnbSub').removeClass('open');
			$('#gnb .gnbList').find('.subON').removeClass('on');
			$('.directMenu').css('z-index','');
			//util menu close
			if( $('.topSearch>div').is(':visible') ){
				$('.topSearch .totalSearch').hide();
				$('.totalSearch .slideWrap').data('shSlide').clearloop();
			}
			if( $('.totalMenu > .menuList').is(':visible')){
				$('.totalMenu > .menuList').hide();
			}
			if( $('.noticeWrap').is(':visible')){
				$('.noticeWrap').hide();
			}
		}

	};
	//
	module.gnb = function(){ //e.name = gnb
		var gnb = $('#gnb .gnbList');
		//jspscroll
		var topHi = 145;

		var sHpos = $(window).height();
		$(window).resize(function(){
			if ( sHpos !== $(window).height() ) {
			   $('.gnbMenu').each(function(i) {
					  if ( $(this).data('jsp') ) {
							if ($(this).find('.jspPane').height() > $(window).height() - topHi) {
										 $(this).height($(window).height() - topHi);
							}
					 }else{
							$(this).jScrollPane({
								   mouseWheelSpeed : 100,
								  contentWidth : 981,
								  verticalGutter : 0//,autoReinitialise: true
							}).css('overflow', 'visible');
							$(this).find('.jspContainer').width(992).css('overflow-x', 'visible');
					 }
			   });
			   var nowMenuDiv = $('.gnbMenu:visible');
			   if ( nowMenuDiv.data('jsp') ) {
					 if( nowMenuDiv.find('.jspPane').height() > $(window).height() - topHi ) {
							nowMenuDiv.data('jsp').reinitialise();
							nowMenuDiv.find('.jspContainer').width(992).css('overflow-x', 'visible');
					  }else{
							nowMenuDiv.find('.jspContainer').removeAttr('style');
							nowMenuDiv.data('jsp').reinitialise();
					  }
			   }
			   sHpos = $(window).height();
			}

		});
		$(document).off('click.gnb2depth').on('click.gnb2depth', '#gnb .gnbList .subON > a', function(e){
			e.preventDefault();
			var $gnbSub = $(this).closest('.gnbSub');
			$('.directMenu').css('z-index','');

			$gnbSub.addClass('open');
			$gnbSub.siblings().removeClass('open');
			$gnbSub.siblings().find('.subON').removeClass('on');
			$(this).parent().siblings().removeClass('on');
			$(this).parent().toggleClass('on');

			if( $gnbSub.find('.subON.on').length < 1  ){
				$gnbSub.removeClass('open');
			}
			//
			if( $gnbSub.index() > 5 && $gnbSub.hasClass('open') ){ //&& $gnbSub.hasClass('open')
				$gnbSub.parent().prev('.directMenu').css('z-index','-100');
			}else{
				$gnbSub.parent().prev('.directMenu').css('z-index','');
			}
		});
		$(document).off('click.gnbdirect').on('click.gnbdirect', '#gnb .directMenu>ul>li>a', function(e){
			e.preventDefault();
			var $this = $(this);
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
			$(this).parent().siblings().find('div').slideUp(300);
			$(this).next().slideToggle(300,function(){
				if( $(this).is(':hidden') ){
					$this.parent().removeClass('on');
				}
			});

		}).off('mousedown.gnbdirect').on('mousedown.gnbdirect', '#gnb .directMenu>ul>li>a', function(e){
			e.preventDefault();
		});
		//closediv',
		$(document).off('click.gnbshgnbclose').on('click.gnbshgnbclose', function(e){
			if( $(e.target).closest('#gnb').length < 1 ){
				close();
			}
		});
		$(document).off('focus.gnbclosefocus').on('focus.gnbclosefocus', '#header',function(e){
			if( $(e.target).closest('#gnb').length < 1 ){
				close();
			}
		});
		$(document).off('click.gnbclose').on('click.gnbclose', '#gnb .close', function(e){
			close();
		});
		var gnbprev = $('#gnb .gnbList > li.gnbON').index();
		function close(){
			//$('#gnb .close').fadeOut(100);
			$('.gnbMenu:visible').css('min-height','0');
			$('.gnbMenu:visible').slideUp(function(){
				$(this).css('min-height','');
				if( gnbprev >= 0 ){
					$('#gnb .gnbList>.gnbON').removeClass('gnbON');
					$('#gnb .gnbList> li').eq(gnbprev).addClass('gnbON');
				}else{
					$('#gnb .gnbList>.gnbON').removeClass('gnbON');
				}
				if( $(this).data('jsp') ){
					$(this).data('jsp').destroy();
					$('.gnbMenu:visible').hide();
				}
			});
			//2depth set
			gnb.find('.gnbSub').removeClass('open');
			gnb.find('.subON').removeClass('on');
			//
			gnb.find('.directList .on div').hide();
			gnb.find('.directList .on').removeClass('on');
		}

		//IB, Tops gnb focus Depth1
		var gnbType2list = ".gnbArea.gnbSwap .gnbList a," + ".gnbArea.gnbIB .gnbList a," + ".gnbArea.gnbTops .gnbList a";
		var gnbType2menu = ".gnbArea.gnbSwap .gnbMenu a," + ".gnbArea.gnbIB .gnbMenu a," + ".gnbArea.gnbTops .gnbMenu a";
		$(document).off('keydown.gnbtype2Depth1').on('keydown.gnbtype2Depth1', gnbType2list, function(e){
			if( $(this).closest('.gnbList').length > 0 ){
				var idx = $(this).parent().index();
				if( e.keyCode === 9 ){
					if( e.shiftKey ){
						setTimeout(function(){
							if( idx-1 >= 0 ){
								$('.gnbList>li').eq(idx-1).find('a:first').focus();
							}
						},1);
					}else{
						setTimeout(function(){
							$('.gnbMenu>ul>li').eq(idx).find('a:first').focus();
						},1);
					}
				}
			}
		});
		//IB, Tops gnb focus Depth2
		$(document).off('keydown.gnbtype2Depth2').on('keydown.gnbtype2Depth2', gnbType2menu, function(e){
			var iidx = $(this).closest('.gnbSub').index();
			if( $(this).index('.gnbSub:eq('+iidx+') a') === 0 ){
				if( e.keyCode === 9 ){
					if( e.shiftKey ){
						setTimeout(function(){
							if( iidx-1 >= 0 ){
								$('.gnbList>li').eq(iidx-1).find('a:first').focus();
							}else{
								$('.gnbList>li').eq(0).find('a:first').focus();
							}
						},1);
					}else{
						if( $(this).closest('.gnbSub').find('a').length === 1 ){
							setTimeout(function(){
								if( iidx+1 < $('.gnbList>li').length+1 ){
									$('.gnbList>li').eq(iidx+1).find('a:first').focus();
								}
							},1);
						}
					}
				}
			}else if( $(this).index('.gnbSub:eq('+iidx+') a') === $(this).closest('.gnbSub').find('a').length -1 ){
				if( e.keyCode === 9 ){
					if( e.shiftKey ){
					}else{
						setTimeout(function(){
							if( iidx+1 < $('.gnbList>li').length+1 ){
								$('.gnbList>li').eq(iidx+1).find('a:first').focus();
							}
						},1);
					}
				}
			}
		});

	};

	module.locationBar = function(){ //e.name = fbar
		var locationDIV = $(".sGnb");
		var headerDiv = $("#header");

		locationDIV.find('.sGnbList>li').removeClass('sGnbON');
		changeScroll();
		$(window).off("scroll.initfbar").on("scroll.initfbar", function (e){
			if( $('style[meny]').length < 1 ){
				changeScroll();
			}
		});
		function changeScroll(){
			var scrollYpos = (document.documentElement.scrollTop !== 0) ? document.documentElement.scrollTop : document.body.scrollTop;
			if (scrollYpos > 120){
				locationDIV.addClass("sGnbTop");

				headerDiv.css('margin-bottom','40px');
			}
			else{
				locationDIV.removeClass("sGnbTop");
				headerDiv.css('margin-bottom','');

			}
		}
		locationDIV.find('.sGnbList>li>a').off('click.fbarsubonList').on('click.fbarsubonList',function(e){
			e.preventDefault();
			$(this).parent().toggleClass('sGnbON');
			if( locationDIV.find('.sGnbList>li.sGnbON').length > 1 ){
				$(this).parent().siblings().find('.sgnbDep2').hide();
				$(this).parent().siblings().removeClass('sGnbON');
				$(this).next().toggle();
			}else{
				$(this).next().toggle();
			}

		});
		var outst,inst;
		// set css
		$('.sGnbList .sgnbDep2 li').css('padding-top','1px');
		$('.sGnbList .sgnbDep2 li>a').css('margin-top','0px');
		var mPt;
		$(document).off('mousemove.fbarsubon').on('mousemove.fbarsubon', '.sGnbList .sgnbDep2', function(e){
			mPt = e.pageX;
		});
		$(document).off('mouseenter.fbarsubon focus.fbarsubon').on('mouseenter.fbarsubon focus.fbarsubon', '.sGnbList .sgnbDep2 li>a', function(e){ //dep3 dep4 .sGnbList .subON>a
			var $elem = $(this);
			$('.sGnbList ul').find('a').attr('subon',0);
			$(this).attr('subon',1);
			inst = setTimeout(function(){
				$elem.parent().siblings().find('ul').hide();
				$elem.next().not('.sgnbDep2').show();
				$elem.closest('ul').show();
				if( $elem.closest('ul').parent().find('ul:visible').length > 1 ){
					$elem.closest('ul').parent().siblings().find('ul').hide();
				}
			},50);
			$elem.closest('ul').show();
			clearTimeout(outst);
			//st set
		}).off('mouseleave.fbarsubon').on('mouseleave.fbarsubon', '.sGnbList .sgnbDep2 li>a', function(e){ //.sGnbList .subON>a ] .sGnbList .sgnbDep2 li>a ] blur.subon
			var $elem = $(this);			
			if( $elem.next().find('[subon=1]').length > 0 ||  $elem.next().find('a:focus').length > 0  ){				
			}else{
				if( mPt - Math.floor($elem.offset().left)+1 >= $elem.closest('ul').width() || mPt - Math.floor($elem.offset().left) === 0 ){

				}else{
					outst = setTimeout(function(){
						$elem.next().hide();
						$elem.attr('subon',0);

						if( $('.sGnbList ul').find('[subon=1]').length < 1 ){
							$('.sGnbList .sgnbDep2 ul').hide();
						}
					},350);
					clearTimeout(inst);
				}

			}
		});
		$('.sGnb>.inner').children().not('.sGnbList').find(shComm.focusElement).off('focus').on('focus', function(e){
			close();
		});
		$(document).off('click.fbarclose').on('click.fbarclose', function(e){
			if( $(e.target).closest('#sGnb .sGnbList').length < 1 ){
				close();
			}
		});
		function close(){
			$('.sGnbList ul').find('a').attr('subon',0);
			$('.sGnbList>li.sGnbON>a').trigger('click');			
		}

	};
	module.lnbCheck = (function(){
		var div = document.createElement('div'),
			vendors = 'Khtml Ms O Moz Webkit'.split(" "),
			len = vendors.length;
		return function(prop){
			if( prop in div.style ) return true;
			prop = prop.replace(/^[a-z]/, function(val){
				return val.toUpperCase();
			});
			while(len--){
				if( vendors[len] + prop in div.style ){
					return true;
				}
			}
			return false;
		}
	}());
	module.lnbAni = function(){ //e.name = lnbsub
		//desing scroll
		if( $('.meny #lnb').length < 1 ) return false;
		var shLsc = $('.meny #lnb').height('100%').jScrollPane({
			mouseWheelSpeed: 100,
			verticalGutter : 0//,
		});
		shLsc.hide();
		//resize
		var sHpos = $(window).height();
		$(window).resize(function(){
			if( sHpos !== $(window).height() ) {
				$('.meny #lnb').height('100%');
				shLsc.data('jsp').reinitialise();
				sHpos = $(window).height();
			}
		});
		//list on/off //accodian
		$(document).off('click.lnbsub').on('click.lnbsub', '.meny #lnb li.subON a',function(e){
			var $elem = $(this);
			$(this).parent().siblings().children('ul').slideUp(100, function(){
				$elem.parent().siblings().removeClass('on');
			});
			if( $(this).next().is(':hidden') ){
				$elem.parent().addClass('on');
				if( $(this).next().is(':visible') ) $(this).next().hide();
				$(this).next().slideDown(100, function(){
					shLsc.data('jsp').reinitialise();
				});
			}else{
				$(this).next().slideUp(100,function(){
					$elem.parent().removeClass('on');
					shLsc.data('jsp').reinitialise();
				});
			}
		});

		var sc;
		var footDiv = $('.footer').clone();
		var ssc = 0;
		var focusSelector = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])," +
									"button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

		//absolute or fixed
		var fixedElem = [];
		//time
		var outTime, inTime;
		//
		var isMouse = false;

		// arrow btn mouse enter
		//$('.meny-arrow').off('mouseenter focus').on('mouseenter focus',function(e){
		$('.meny-arrow').on('click',function(e){
			if( $('body').css('perspective') && !$('#wrapper').hasClass('on') ){
				$('style[meny],meta[meny]').remove();
				metaSet();
			}

			if( new Date().getTime() - outTime < 1000  || $('#wrapper').hasClass('on') ) return false; //

			//if( e.type === 'mouseenter'){
			if( e.type === 'click'){
				inTime = new Date().getTime();
				isMouse = true;
			}
			footDiv.remove();
			$('.footer').hide();
			footDiv.show();
			$('#wrapper').append(footDiv);
			//------------------------------------------------
			sc = $(window).scrollTop();
			cssSet();
			//top btn add----
			$('#pageTop').hide();
		});
		// wrapper mouse enter -- > gradation Div
		$('.graDiv').off('mouseenter').on('mouseenter',function(e){
			if( new Date().getTime() - inTime < 600 ) return false;
			if( $('.meny').is(':animated') || $('.meny-arrow').is(':focus') || $('.meny').find('button , a').first().is(':focus') ){
				if( !isMouse ) return false;
			}
			setTimeout(function(){
				$('.wrapper').width('').removeClass('on');
				$('.meny').addClass('on');
				ssc = $('#wrapper').scrollTop();
				$('.graDiv').fadeOut();
				isMouse = false;
			},1);

		});

		//fixed 되는 element 조정 필요 ---- scroll
		var wtpos = $(window).scrollTop();
		$(window).off('scroll.lnbfixed').on('scroll.lnbfixed',function(e){
			if( wtpos !== $(window).scrollTop() ){
				scrollFixedElem();
				wtpos = $(window).scrollTop();
			}
		});

		//animation callback
		$('.meny').off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
			if(  $(this).hasClass('on') ){
				$('head style[meny], meta[meny]').remove();
				metaSet();
				if( $('#wrapper #formeny').length > 0 ){
					$('#wrapper #formeny').children().unwrap();
				}
				$(window).scrollTop(ssc);
				footDiv.remove();
				$('.footer').show();
				$('.meny #lnb').hide();

				$('.meny-arrow').blur();
				$('.meny').height($(window).height()); //safari
				
			}else{
				//focus  focus first
				$('.meny').find(focusSelector).first().focus();
				//
				outTime = new Date().getTime();
				//top btn add----
				$('#pageTop').hide();
				
			}
		});
		$('.skipNavi').find(focusSelector).off('focus').on('focus',function(e){
			$('.graDiv').trigger('mouseenter');
		});
		//focus first, last floatBtn
		$('.wrapper').find(focusSelector).off('focus').on('focus',function(){
			//graDiv
			$('.graDiv').trigger('mouseenter');
		});
		function cssSet(){
			$('meta[menyend]').remove();
			if( $('head style[meny]').length < 1 ){
				$('head').append(
					'<meta meny name="viewport" content="width=800, user-scalable=no">'+
					'<style meny>'+
						'html {height: 100%;}'+ ///-- css
						'body{overflow: hidden; height: 100%; width: 100%; perspective: 800px; perspective-origin: 0px 50%; -webkit-perspective: 800px; -webkit-perspective-origin: 0px 50%; background:#2e2e2e;}'+
						'#wrapper{width: 100%; height: 100%; overflow-y: auto; background : white;}'+
					'</style>'
				);

				$('.meny #lnb').show();
				$('.wrapper').width('120%').addClass('on');
				$('.meny').removeClass('on');
				$('#wrapper').scrollTop(sc);//scrollFixedElem(0);
				//gradation
				$('.graDiv').fadeIn();
			}

		}
		function metaSet(){
			if( $('meta[menyend]').length < 1 ){
				$('head').append(
					'<meta menyend name="viewport" content="user-scalable=yes">'
				);
			}
		}
		var is_safari = false;
		if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
			is_safari = true;
		}
		function scrollFixedElem( pos ){
			var fixElem = $('#wrapper').find('div').filter(function(i){
				if( $(this).css('position') ==='fixed' ) return $(this);
			});
			if( $('head style[meny]').length > 0 ){
				fixElem.each( function(k){
					var tp = parseInt($(this).css('top'));
					if( !is_safari ){
						$(this).css('position','absolute');
						fixedElem.push($(this));
						if( $(this).hasClass('sGnb') ){ //location bar
							if( sc > 120 ){
								$(this).addClass('sGnbTop').css('top',sc);
								$("#header").css('margin-bottom','40px');
							}else{
								$(this).removeClass('sGnbTop');
								$("#header").css('margin-bottom','');
							}
						}else if( $(this).hasClass('messageBoxArea') ){
							$('.messageBoxArea').css('bottom', -sc +5 +'px');
						}else{
							if( $('#aside').find('.research').length > 0 && window.ko ){ //리서치 탐색기
								$('#aside').css({'top': sc+tp-224+'px' }); //??
							}else{
								$('#aside').css({'top': sc+tp+'px' });
							}
							$('#footer').css('z-index','0');

						}
					}else{
						$('#wrapper').scrollTop(0);
						$(this).removeClass('sGnbTop').removeAttr('style');
						$("#header").css('margin-bottom','');
					}
				});

			}else{
				$.each(fixedElem , function(){ $(this).removeAttr('style'); });
				fixedElem = [];
				if( $(window).scrollTop() > 120 ){
					$('.sGnb.sGnbTop').css('position','fixed');
					$('.sGnb.sGnbTop').css('top', 0);
				}else{
					$('.sGnb').removeClass('sGnbTop');
					$('.sGnb').removeAttr('style');

				}
			}
		}

	};
	module.ieCheck = module.lnbCheck('perspective');
	module.lnbInit = function(){
		var ie = module.ieCheck;
		if( !ie ){
			$('.meny-arrow').hide();
			$('.meny').hide();
		}else{
			module.lnbAni();
		}
	};

	//통합검색
	module.totalSearch = function(){//e.name = tsearch
		if( $('.totalSearch').children().length > 0 ){			
			$(document).off('click.tsearchclose').on('click.tsearchclose', '.gnbUtil>.topSearch button.close', function(e){
				$('.totalSearch').slideUp(300);
				$('.totalSearch .slideWrap').data('shSlide').clearloop();
			});			
		}
	};

	//
	module.totalSearchOpen = function(){
		//image slide
		$('.totalSearch .slideWrap').shSlide({autoplay:true});
		$('.gnbUtil>.topSearch>button').next().slideDown(300);
		if( $('.noticeWrap').is(':visible')){
			$('.noticeWrap').hide();
		}
		if( $('.totalMenu > .menuList').is(':visible')){
			$('.totalMenu > .menuList').hide();
		}
	}

	// 전체메뉴보기
	module.allMenuView = function() { 	// e.name = tmenu
		var btn = $('.totalMenu >button'),
			div = $('.totalMenu > .menuList'),
			list = div.find('.totalDep1>li>a');
		//btn
		div.find('.inner').height( 700 );
		
		//close
		$(document).off('click.tmenuclose').on('click.tmenuclose' , '.totalMenu > .menuList >button',function(e){
			close();
 		});
 		//list
 		
		//else
		$(document).off('click.tmenucloseelse').on('click.tmenucloseelse' , function(e){
			setTimeout(function(){
				if( $(e.target).closest('.totalMenu').length < 1 ){
					if( $(e.target).filter(':contains(사이트맵)').length > 0 ){
					}else{
						close();
					}
				}
			},5);
		});

		function close() {
			div = $('.totalMenu > .menuList');
			div.slideUp(300,function(){
				div.find('.totalON').find('div').hide();
				div.find('.totalON').removeClass('totalON');
				div.find('.menu01').addClass('totalON');
				div.find('.menu01').find('div').show();
				if( div.find('.inner').data('jsp') ){
					div.find('.inner').data('jsp').destroy();
				}

			});
		}
		
	};
	//
	module.allMenuViewOpen = function(){
		var div = $('.totalMenu > .menuList');
		div.slideDown(300);
		div.find('.inner').jScrollPane({
			mouseWheelSpeed: 100,
			verticalGutter : 0,
		});
		if( $('.topSearch>div').is(':visible') ){
			$('.topSearch .totalSearch').hide();
			$('.totalSearch .slideWrap').data('shSlide').clearloop();
		}
		if( $('.noticeWrap').is(':visible')){
			$('.noticeWrap').hide();
		}
	}
	//
	module.allMenuViewDepthOpen = function(){
		var div = $('.totalMenu > .menuList');
		var pli = $('.totalMenu .totalDep1>li>a.tit:focus, .totalMenu .totalDep1>li:hover>a.tit').parent(); // $(this).parent();
		if( pli.hasClass('totalON') ){
			
			pli.removeClass('totalON');
			pli.find('div').slideUp(300,function(){
				if( $( '.totalMenu .totalDep1>li > div').filter(':visible').length < 1 ){
					div.find('.inner').css('height','480px');
				}
				div.find('.inner').data('jsp').reinitialise();
			});
			
			//return false;
		}else{
			pli.addClass('totalON');
			pli.siblings().removeClass('totalON');
			pli.find('div').slideDown(300,function(){
				div.find('.inner').data('jsp').reinitialise();
			});
			pli.siblings().find('div').slideUp(300, function(){
				div.find('.inner').data('jsp').scrollToY( pli.position().top );
				div.find('.inner').data('jsp').reinitialise();
			});
			div.find('.inner').height( 700 );

		}
	};

	//상단 로그인후 알림 레이어
	module.topNotice = function(){ //e.name = topNotice
		
		$(document).off('click.topNoticeclose').on('click.topNoticeclose', '.gnbUtil>.topNotice button.close', function(e){
			$('.noticeWrap').slideUp(300);
		});
	};

	//
	module.topNoticeOpen = function(){
		$('.gnbUtil>.topNotice>button').next().slideDown(300);
		if( $('.topSearch>div').is(':visible') ){
			$('.topSearch .totalSearch').hide();
			$('.totalSearch .slideWrap').data('shSlide').clearloop();
		}
		if( $('.totalMenu > .menuList').is(':visible')){
			$('.totalMenu > .menuList').hide();
		}
	}

	//footer familySite
	module.familySite = function(){ //e.name = familysite
		$('#footer .familySite > div.list .inner').height('auto');
		if( $('#footer .familySite > div.list').length > 0 ){
			$('#footer .familySite > div.list').height(165).width(236).jScrollPane({
				mouseWheelSpeed: 100,
				verticalGutter : 0,
			});
		}

		$(document).off('click.familysite').on('click.familysite', '#footer .familySite>a', function(e){
			e.preventDefault();
			if( $('#footer .familySite > div.list').is(':visible') ){
				$('#footer').css('z-index','');
			}else{
				$('#footer').css('z-index','103');
			}
			$(this).next().slideToggle(200, function(){
				$('#footer .familySite > div.list').data('jsp').reinitialise();
			});
		});

		$(document).off('click.familysiteclose').on('click.familysiteclose', function(e){
			if( $(e.target).closest('.familySite').length < 1 ){
				$('#footer').css('z-index','');
				$('#footer .familySite>.list').slideUp();
			}
		});
		$(document).off('focus.familysiteclose').on('focus.familysiteclose', '#footer',function(e){
			if( $(e.target).closest('.familySite').length < 1 ){
				$('#footer').css('z-index','');
				$('#footer .familySite>.list').slideUp();
			}
		});
	};

	module.init = function(){
		module.totalSearch();
		module.allMenuView();
		module.topNotice();
		module.familySite();
	};

}(jQuery));

//-------------------calendar-------------------
(function($){
	var module = window.shCalendar = {};

	module.calendarBtn = function(){
		// 달력 연결된 버튼
		var calBtn = $(".btnCal");

		if (calBtn.length === 0) return false;

		//포커스 색상
		calBtn.siblings("input[type='text']").off(".initCalendar");
		calBtn.siblings("input[type='text']").on("focusin.initCalendar focusout.initCalendar", function (e) {
			var target = $(e.currentTarget);
			var div = target.parent();

			switch (e.type)
			{
				case "focusin" :
					div.addClass("focus");
					break;
				case "focusout" :
					div.removeClass("focus");
					break;
				default :
			}
		});

		// 달력이 그려진 후 발생
		calBtn.off(".calendar");
		calBtn.on("complete.calendar", function (e){
			var calendarDIV = $(this).next(".calendar");
			//년,월 선택 시 발생
			calendarDIV.on("change.calendar", function (e, data){
				var input = $(this).siblings("input[type='text']");
			});
			//일 선택 시 발생, 인풋에 날짜 변경시킴
			calendarDIV.on("select.calendar", function (e, year, month, date){
				var input = $(this).siblings("input[type='text']");
				input.val(year + month + date);
				input.blur();
			});
		});
		
		calBtn.each(function (){
			var target = $(this);
			target.next(".calendar").remove();
			target.off('mouseenter.cal focusin.cal').on('mouseenter.cal focusin.cal', function (e){
				if( target.next(".calendar").length > 0 ) return false;
				target.next(".calendar").remove();
				target.parent().css('zIndex','99');
				var calendar = new WCalendar(target, {input: target.prev(), isHiddenDate:false}); 
				calendar.init();
			});
		});

	};

	module.init = function(){
		setTimeout(function(){
			module.calendarBtn();
		},10);
	};
}(jQuery));

//-------------------pages-------------------
(function($){
	var module = window.shPages = {};

	module.stockCalendarScroll = function(){ //e.name = stock
		var cont = $('.stockCalendar .scrollDiv'),
			conScroll;
		if( cont.length > 0 ){
			conScroll = cont.jScrollPane({
				mouseWheelSpeed: 100,
				autoReinitialise: true
			});
			set();
		}
		function set(){
			if( $('style[stock]').length < 1 ){
				var cssSet ="<style stock> .scrollDiv .jspContainer{ background-color : #fff }</style>";
				$('head').append(cssSet);
			}
		}
		//중시캘린더 scroll
		$(document).off('click.stock').on('click.stock', '.aside table.calType button', function(e){
			e.preventDefault();
			var calRoll = conScroll.filter(function(l){
				if( $(this).closest('.aside').length < 1 ) return $(this);
			});
			var txt = $(this).text();
			if( parseInt($(this).text()) < 10 ){
				txt = 0+$(this).text();
			}
			var offsetElm = calRoll.find('.listDay').filter(function(m){ if( txt === $(this).find('em').text() ) return $(this);  });
			if( offsetElm.length > 0 ){
				calRoll.data('jsp').scrollToY(offsetElm.position().top);
				$(this).closest('tbody').find('td').removeClass('today');
				$(this).parent().addClass('today');
			}
		});

	};
	//뱅킹>즉시이체>step2: 추가인증 선택
	module.selConfirm = function(){ //e.name = selconfirm
		if( $('input[type=radio]').closest('th').next('td').find('.depArea.bgForm').length > 0 ){
			$('input[type=radio]').off('change.selconfirm').on('change.selconfirm', function(){
				if( $(this).prop('checked') ){
					$(this).closest('tr').siblings().find('input[type=radio]').prop('checked',false);
					$(this).closest('tr').siblings().find('.depArea.bgForm').hide();
					$(this).closest('th').next('td').find('.depArea.bgForm').show();
				}
			});
		}
	};
	//자산관리몰>펀드>펀드검색
	module.myfundSearchPage = function(){ //e.name =  myfundSearchpage
		//scroll 5
		setTimeout(function(){
			if( $('.fundSearch').length >0 ){
				var scrollConts = $('.fundSearch .searchDetail .top').children();
				if( $('style[funfScroll]').length < 1 ){
					$('head').append('<style funfScroll>.searchDetail .jspContainer{ background-color : #ecf5fd; } .searchDetail .jspVerticalBar{ right : 0px; } </style>');
				}
				scrollConts.each(function(i){
					$(this).jScrollPane({
						mouseWheelSpeed: 100,
						autoReinitialise: true
					});
				});

			}
		},1);
		
	};
	module.myfundSearchPageOpen = function(){
		$('.fundSearch>.searchTop>.btnL.btnDetail').removeClass('close');
		$('.fundSearch>.searchTop>.btnL.btnDetail').parent().next('.searchDetail').stop().slideDown(300);
		//jscrollpane scroll css
		$('.searchDetail .jspPane').css('width','');
	};
	module.myfundSearchPageClose = function(){
		$('.fundSearch>.searchTop>.btnL.btnDetail').addClass('close');
		$('.fundSearch>.searchTop>.btnL.btnDetail').parent().next('.searchDetail').stop().slideUp(300);
	};
	// slide+tap length 1   :: 자산관리몰 > ELS/DLS 투자가이드 > 온라인 가입안내
	module.elsInvestGuide =function(){
		if( $('.sliderTabImg').length > 0 ){
			slidetTab();
		}
		function slidetTab(){
			var list = $('.sliderTabImg li a') , arrow = $('.sliderTabImg .btnCtr');
			list.off('click').on('click',function(e){
				e.preventDefault();
				var li = $(this).parent();
				li.siblings().removeClass('on');
				li.addClass('on');
			});
			arrow.off('click').on('click', function(e){
				e.preventDefault();
				if( $(this).hasClass('prev') ){
					if( list.parent().filter('.on').prev().length < 1 ){
						list.parent().filter('.on').removeClass('on');
						list.parent().filter(':last').addClass('on');
					}else{
						list.parent().filter('.on').removeClass('on').prev().addClass('on');
					}
				}else{
					if( list.parent().filter('.on').next().length < 1 ){
						list.parent().filter('.on').removeClass('on');
						list.parent().filter(':first').addClass('on');
					}else{
						list.parent().filter('.on').removeClass('on').next().addClass('on');
					}
				}
			});
		}
	};
	//월간펀드 메인
	module.fundMonthSlide = function(){
		if( $('.monthFund_Main').length > 0 ){
			fundmain();
		}
		function fundmain(){
			var arrow = $('.monthFund_Main .controller button'), cont = $('.monthFund_Main .monthCont');
			//css
			cont.css({
				'position':'absolute'
			});
			arrow.off('click').on('click', function(e){
				if( cont.is(':animated') ) return false;
				var prev = cont.filter(':visible').prev('.monthCont') , next = cont.filter(':visible').next('.monthCont');
				var num = parseInt ($('.monthFund_Main .controller strong').text());
				if( $(this).parent().hasClass('prev') ){
					cont.filter(':visible').stop().fadeOut();
					if( prev.length > 0 ){
						prev.stop().fadeIn();
						num = prev.index('.monthCont');
					}else{
						cont.filter(':last').stop().fadeIn();
						num = cont.length -1;
					}
				}else{
					cont.filter(':visible').stop().fadeOut();
					if( next.length > 0 ){
						next.stop().fadeIn();
						num = next.index('.monthCont');
					}else{
						cont.filter(':first').stop().fadeIn();
						num = 0;
					}
				}
				$('.monthFund_Main .controller strong').text( num+1 );
				$(this).closest('.pageBtn').find('li span.page').removeClass('on');
				$(this).closest('.pageBtn').find('li.prev span.page').eq( num-1 < 0 ? num = cont.length -1 : num-1 ).addClass('on');
				$(this).closest('.pageBtn').find('li.next span.page').eq( num+1 > cont.length-1 ? num = 0 : num+1 ).addClass('on');
			});
			//1
			$('.valList a').off('click').on('click', function(e){
				e.preventDefault();
				//var idx = $(this).parent().index()+1;
				var idx = parseInt( $(this).attr('class').replace('link','') );
				cont.filter(':visible').stop().fadeOut();
				cont.eq(idx).stop().fadeIn();
				$('.monthFund_Main .controller strong').text( idx+1 );
				$('.monthFund_Main .pageBtn').find('li span.page').removeClass('on');
				$('.monthFund_Main .pageBtn').find('li.prev span.page').eq( idx-1 < 0 ? idx = cont.length -1 : idx-1 ).addClass('on');
				$('.monthFund_Main .pageBtn').find('li.next span.page').eq( idx+1 > cont.length-1 ? idx = 0 : idx+1 ).addClass('on');
			});
		}
	};
	//나의자산분석 > 잔고 > 금융상품 addBtn
	module.productAddLayer = function(){ //e.name = addBtn
		var btn = '.addLayer>.addBtn';
		$(document).off('click.addBtn').on('click.addBtn', btn , function(e){
			e.preventDefault();
			var $elem = $(this);
			var idx = $(btn).index(this);
			$('.addLayer').not(":eq("+idx+")").removeClass('on');
			$('.addLayer>.addCon').not(":eq("+idx+")").hide();
			$elem.next().toggle( 1, function(){
				$elem.parent().toggleClass('on');
				$elem.text().match(/(보기)/) ? $elem.text( $elem.text().replace('보기','닫기') ) : $elem.text( $elem.text().replace('닫기','보기') );
				addLayerFocus( $elem.next(), $elem );
			});

		});
		function addLayerFocus( div, btn ){
			var $div = div, $btn = btn
			$div.find(shComm.focusElement).filter(':last').off('keydown');
			$div.find(shComm.focusElement).filter(':last').on('keydown' , function(e){
				if( window.tab.getTab(e) ){	//tab
					$btn.focus();
					setTimeout(function(){ if( !$btn.is(':focus') ) $btn.focus(); },1);
				}
			});
		}
	}

	//트레이딩 > 시장별 유의사항 > 해외주식 시장별 안내
	module.orstockMarketInfo = function(){
		if( $('.ovrMarket').length > 0 ){
			marketInfo();
		}
		function marketInfo(){
			$('.markList').not(':first').hide();
			$('.ovrMarket .leftMap a').off('click.ovrmarketleftmap').on('click.ovrmarketleftmap', function(e){
				e.preventDefault();
				$(this).siblings().removeClass('on');
				$(this).addClass('on');
				$('.rightMList .markList').hide();
				$('.rightMList .markList').eq($(this).index('.leftMap>a')).show();
				$('.rightMList .title').text( $(this).text() );
			});
			$('.rightMList a').off('click.ovrmarketlist').on('click.ovrmarketlist',function(e){
				//e.preventDefault();
				$('.rightMList li').removeClass('on');
				$(this).parent().addClass('on');
				var idx = $(this).closest('.markList').index();
				$('#tabScript li').eq(idx).find('a').trigger('click');
			});
		}
	};
	//그래프 숨기기/보이기
	module.graphView = function(){ //e.name = wrapgraph
		$(document).off('click.wrapgraph').on('click.wrapgraph', '.btnSide.wrapGraph> button', function(e){
			e.preventDefault();
			$(this).toggleClass('close');
			$(this).text().match(/보기/)? $(this).text('그래프숨기기') : $(this).text('그래프보기');
			$(this).parent().parent().next().slideToggle(200);
		})
	}
	//트레이딩>해외선물/FX마진>해외선물 in Life
	module.inLifeToon = function(){ //e.name = inlife
		if( $('.boxFxSlider').length > 0 ){
			boxFxSlider();
		}
		function boxFxSlider(){
			var arrow = $('.boxFxSlider .controller'),
				indi = $('.boxFxSlider .tabList a'),
				div = $('.boxFxSlider .sliderArea');
			arrow.find('span.page').removeClass('on');
			arrow.find('.next span.page:eq(1)').addClass('on');
			arrow.find('.prev span.page:last').addClass('on');
			$(window).off('scroll.inlife').on('scroll.inlife',function(){
				if( $('style[meny]').length > 0 ) return false;
				if( $('.boxFxSlider').offset().top < $(window).scrollTop() ){
					if( arrow.position().top > $('.boxFxSlider').height() ) return false;
					var aTop = $(window).scrollTop()-$('.boxFxSlider').offset().top+ parseInt($(window).height()/2);
					if( aTop > $('.boxFxSlider').height() ){
						aTop = $('.boxFxSlider').height();
					}
					arrow.css('top', aTop +'px');
				}else{
					arrow.css('top','6%');
				}
			});
			arrow.find('button').off('click').on('click', function(e){
				if( div.is(':animated') ) return false;
				if( $(this).parent().hasClass('next') ){
					if( indi.parent().filter('.on').next().length < 1 ){
						indi.parent().filter(':first').find('a').trigger('click');
					}else{
						indi.parent().filter('.on').next().find('a').trigger('click');
					}
				}else{
					if( indi.parent().filter('.on').prev().length < 1 ){
						indi.parent().filter(':last').find('a').trigger('click');
					}else{
						indi.parent().filter('.on').prev().find('a').trigger('click');
					}
				}
				$(window).scrollTop(0);
			});
			indi.off('click').on('click', function(e){
				e.preventDefault();
				var $elem = $(this),
					idx = $elem.parent().index(),
					now = div.filter(':visible');
				if( $(this).parent().hasClass('on') || div.is(':animated') ) return false;
				now.fadeOut(200);
				setCss(div.eq(idx));
				div.eq(idx).fadeIn(200,function(){
					$(this).removeAttr('style').show();
					var num = $(this).index();
					arrow.find('button').find('span.page').removeClass('on');
					arrow.find('button').parent('.next').find('span.page').eq( num >3 ? 0 : num ).addClass('on');
					arrow.find('button').parent('.prev').find('span.page').eq( num-2 ).addClass('on');
				});
				$elem.parent().siblings().removeClass('on');
				$elem.parent().addClass('on');

			});
			function setCss(elem){
				return elem.css({
					'position':'absolute',
					'top':'50px',
					'left':'50%',
					'margin-left': ((elem.width()/2)-25)*-1 +'px'
				});
			}
		}
	}
	//자산관리몰 > 포트폴리오매니저 landing page
	module.portfoliolanding = function(){
		//이달의 투자전략
		if( $('.landingCon').length > 0 ){
			$('.landingCon .slideWrap').shSlide({
				'autoplay': true,
				'time': 0
			});
		}
		//자산 코멘트
		if( $('.landingNote.slideWrap').length > 0 ){
			$('.landingNote.slideWrap').shLineslide({
				'autoplay': true
			});
		}
	};
	//Tops Club > 가상테스트 > 등급 시뮬레이션
	module.topsclubSbtn = function(){ //e.name = topsclubSbtn
		$(document).off('click.topsclubSbtn').on('click.topsclubSbtn', '.graphWrap .layPopS>.btnGuide', function(e){
			e.preventDefault();
			$('.layContS:visible').hide();
			$(this).next().show();
		});
		$(document).off('click.topsclubSbtnclose').on('click.topsclubSbtnclose', '.graphWrap .layPopS>.layContS .close', function(e){
			e.preventDefault();
			$(this).parent('.layContS').hide();
		});
	};
	//투자정보 > 리서치 탐색기
	module.researchListLeft = function(){ //e.name = researchListLeft
		if( $('.researchWrap .lnbWrap').length > 0 ){
			$('.researchWrap .lnbWrap').jScrollPane({
				mouseWheelSpeed: 100,
				verticalGutter : 0//,
			});
		}

		$(document).off('click.researchListLeft').on('click.researchListLeft', '.researchWrap .researchLNB a',function(e){
			e.preventDefault();
			var $elem = $(this);
			$(this).parent().siblings().children('ul').slideUp(100, function(){
				$elem.parent().siblings().removeClass('on');
			});
			if( $(this).next().is(':hidden') ){
				$elem.parent().addClass('on');
				if( $(this).next().is(':visible') ) $(this).next().hide();
				$(this).next().slideDown(100, function(){
					$('.researchWrap .lnbWrap').data('jsp').reinitialise();
				});
			}else{
				if( $elem.closest('ul').find('>.on').length === $elem.closest('ul').find('>li').length  ){
					$elem.parent().siblings().removeClass('on');
					$elem.parent().siblings().children('ul').hide();
					$('.researchWrap .lnbWrap').data('jsp').reinitialise();
				}else{
					$(this).next().slideUp(100,function(){
						$elem.parent().removeClass('on');
						$('.researchWrap .lnbWrap').data('jsp').reinitialise();
					});
				}
			}

		});
		//all view
		$(document).off('click.researchListLeftopen').on('click.researchListLeftopen', '.researchWrap .lnbWrap .btns .open', function(e){
			$('.researchWrap .researchLNB li.subON').addClass('on');
			$('.researchWrap .researchLNB ul').show();
			$('.researchWrap .lnbWrap').data('jsp').reinitialise();
		});
		//all close
		$(document).off('click.researchListLeftclose').on('click.researchListLeftclose', '.researchWrap .lnbWrap .btns .close', function(e){
			$('.researchWrap .researchLNB li.subON').removeClass('on');
			$('.researchWrap .researchLNB ul').hide();
			$('.researchWrap .lnbWrap').data('jsp').reinitialise();
		});
	};
	// 고객센터 > 자주 묻는 질문
	module.customerCenterFaq = function(){ //e.name = customercenterfaq
		$(document).off('click.customercenterfaq').on('click.customercenterfaq', '.faqBox .faqCate a',function(e){ //boxDepth1
			e.preventDefault();
			var t = $(this).attr('class');

			module.customerCenterFaqOpen(t);
		});

		//tab
		$(document).off('click.customercenterfaqt').on('click.customercenterfaqt', '.faqBox + .tabType a',function(e){
			e.preventDefault();
			var idx = $(this).parent().index();
			if( idx > 0 ){
				$('.faqBox .faqCate>li').eq(idx-1).find('.tit>a').trigger('click');
			}else{
				$('.faqCont .titDep2').text('전체 FAQ');
				$(this).parent().addClass('on');
				$(this).parent().siblings().removeClass('on');
				$('.faqCont >ul>li').hide();
				$('.faqCont >ul>li').show(); 
			}
		});
	};
	module.customerCenterFaqOpen = function( className ){
		if( !className ){
			$('.faqCont .titDep2').text('전체 FAQ');
			$('.tabType>li').removeClass('on');
			$('.tabType>li:eq(0)').addClass('on');
			$('.faqCont >ul>li').hide();
			$('.faqCont >ul>li').show(); //.filter(':lt('+showDefault+')')
		}else{
			var cl = className.match(/[0-9][0-9]/) ? cl = className.replace(/\d{2}/,"") : cl = className;
			$('.faqCont .titDep2').text( $('.faqBox .'+cl).text() );
			$('.tabType>li').removeClass('on');
			$('.tabType>li:eq('+ ($('.faqBox .'+cl).parent().parent().index() +1 )+')').addClass('on');
			$('.faqCont >ul>li').hide();
			$('.faqCont >ul>li.open').removeClass('open');
			$('.faqCont >ul>li').filter(function(i){
				if( $(this).hasClass(className) ){
					return $(this);
				}
			}).show(); 
		}

	};
	//트레이딩 > 해외선물 개요
	module.fxexchange = function(){
		if( $('.slideWrap.fxBanner').length > 0 ){
			$('.slideWrap.fxBanner').shSlide({
				'autoplay': true
			});
		}
	};
	//자산관리몰 > 펀드 > 펀드상세 롤링
	module.fundmessageBox = function(){ //e.name = fundmessagebox
		var div = $('.messageBoxArea');
		var timer;
		//close
		div.find('.messageClose').off('click.fundmessagebox').on('click.fundmessagebox',function(){
			div.hide();
			stop();
		});
		//
		function start(){
			if( $('.messageBoxArea').length < 1 && $('.messageBoxArea p').length < 2 ) return false;
			timer = setInterval(function(){
				move();
			},4000);
			$('.messageBoxArea').data('rollfundmessage',timer);

		}
		if( $('.messageBoxArea').data('rollfundmessage' ) ){
			stop();
			start();
		}else{
			start();
		}
		function move(){
			var li = $('.messageBoxArea p');
			if( li.length > 1 ){
				$('.messageBoxArea p:first').animate({ 'margin-top':-li.height()+'px'}, 300, function(){
					$('.messageBoxArea p').first().appendTo( $('.messageBox') );
					$('.messageBoxArea p').css('margin-top','');
				});
			}
		}
		function stop(){
			clearInterval( $('.messageBoxArea').data('rollfundmessage' )  );
		}

	};

	module.init = function(){
		module.selConfirm();
		module.myfundSearchPage();
		module.stockCalendarScroll();
		module.elsInvestGuide();
		module.fundMonthSlide();
		module.productAddLayer();
		module.orstockMarketInfo();
		module.graphView();
		module.inLifeToon();
		module.topsclubSbtn();
		module.researchListLeft();
		module.customerCenterFaq();
		module.fundmessageBox();
	};
}(jQuery));
//-------------------portfolio-------------------
(function($){
	var module = window.shSimul = {};
	//--내게 맞는 상품 추천
	module.portfolioMyprodStep = function(){ //e.name = portfolioMyprodtype
		return{
				"st" : function( cn ){
					var cont = cn;
					$('.myVal').filter(':visible').hide();
					cont.show();
					cont.find( shComm.focusElement ).first().focus();
					cont.find('.bg').css('visiblity','hidden').css('visiblity','').hide().fadeIn();
					cont.find('.charArea').css('visiblity','hidden').css('visiblity','').hide().delay(600).fadeIn(600);
					cont.find('.person li').removeClass('on');
					//input set
					$('.myVal:eq('+cont.index()+')').find('input[type="text"]').val("").trigger('change');
					$('.myVal:eq('+cont.index()+')').find('input[type="radio"]').prop('checked',false).trigger('change');
					$('.myVal:gt('+cont.index()+')').find('input[type="text"]').val("").trigger('change');
					$('.myVal:gt('+cont.index()+')').find('input[type="radio"]').prop('checked',false).trigger('change');
					module.portfolioMyprodStep()['pop']( cont );
				},
				0: function(){
					$('.myVal').find('input[type="text"]').val("").trigger('change');
					$('.myVal.typeStart').show();
					$('.myVal.typeStart').siblings().hide();
					$('.myVal.typeStart').find( shComm.focusElement ).first().focus();
					$('div.hidden span').text("");
					$('div.hidden').removeData('setper');
					$('div.hidden').removeData('setfam');
					$('div.hidden').removeData('setarmr');
					$('div.hidden').removeData('setarml');
				},
				1: function(){
					var cont = $('.myVal.type01');
					module.portfolioMyprodStep()['st']( cont );
					var eventNames = 'change'+'.portfolioMyprodtype0'+cont.index()+' paste'+'.portfolioMyprodtype0'+cont.index()+' keyup'+'.portfolioMyprodtype0'+cont.index();
					$('.myVal.type01 .formArea input').off(eventNames).on(eventNames, function(e){
						if( $(this).val().length > 0 ){
							cont.find('.person').prev().show();
							cont.find('.person li').removeClass('on');
							$(this).prev().hide();
						}else{
							cont.find('.person').prev().hide();
							$(this).prev().show();
						}
						var str = $(this).val();
						str = str.replace(/[^0-9]/g ,"");
						cont.find('.person').prev().show();
						cont.find('.person li').removeClass('on');
						if( str.length > 1 ){
							cont.find('.person li').removeClass('on');
							var age = parseInt( str/10 )-1;
							cont.find('.person').prev().hide();
							cont.find('.person li').eq( age>6|| age==-1? age=6 : age  ).addClass('on');
							$('div.hidden').data('setper',age);
							//hidden set
							var htext = str? str : "";
							$('div.hidden span.result01').text( htext +"세" );
						}

					});
				},
				2:function(){
					var cont = $('.myVal.type02');
					module.portfolioMyprodStep()['st']( cont );
					var eventNames = 'change'+'.portfolioMyprodtype0'+cont.index()+' paste'+'.portfolioMyprodtype0'+cont.index()+' keyup'+'.portfolioMyprodtype0'+cont.index();
					cont.find('.formArea input').off(eventNames).on(eventNames, function(e){
						cont.find('.person li').removeClass('on');
						if( $(this).val().length > 0 ){
							$(this).prev().hide();
						}else{
							$(this).prev().show();
						}
						var str = $(this).val();
						str = str.replace(/[^0-9]/g ,"");
						//$(this).val(str);
						cont.find('.person li').removeClass('on');
						var prevAge = new String(parseInt($('div.hidden span.result01').text())).slice(-1);
						var age = parseInt(str.slice(-1))+parseInt(prevAge) < 10 ? (Math.floor( str/10 )-1) : (Math.ceil( str/10 )-1);
						var setAge = parseInt( $('.perAge').attr('class').split(" ")[1].replace("age","") );
						age = age + parseInt(setAge/10);
						cont.find('.person li').eq( age>6|| age==-1? age=6 : age  ).addClass('on');
						var htext = str? str : "";
						$('div.hidden span.result02').text( htext );

					});

				},
				3:function(){
					var cont = $('.myVal.type03');
					module.portfolioMyprodStep()['st']( cont );
					cont.find('.perAge span').removeClass('on');
					var eventNames = 'change'+'.portfolioMyprodtype0'+cont.index()+' paste'+'.portfolioMyprodtype0'+cont.index()+' keyup'+'.portfolioMyprodtype0'+cont.index();
					cont.find('.formArea input').off(eventNames).on(eventNames, function(e){
						if( $(this).val().length > 0 ){
							$(this).prev().hide();
							cont.find('.perAge span.armL').addClass('on');
						}else{
							cont.find('.perAge span.armL').removeClass('on');
							$(this).prev().show();
						}
						var str = $(this).val();
						str = str.replace(/[^0-9]/g ,"");
						//$(this).val(str);
						cont.find('.perAge span.armL').addClass('on');
						var htext = str? str : "";
						$('div.hidden span.result03').text( htext );
					});

				},
				4:function(){
					var cont = $('.myVal.type04');
					module.portfolioMyprodStep()['st']( cont );
					var eventNames = 'change'+'.portfolioMyprodtype0'+cont.index()+' paste'+'.portfolioMyprodtype0'+cont.index()+' keyup'+'.portfolioMyprodtype0'+cont.index();
					cont.find('.formArea input').off(eventNames).on(eventNames, function(e){
						$('.familyArea').removeClass("famType01 famType02 famType03 famType04 famType05");
						$('.familyArea').addClass('famType0'+($(this).filter(':checked').parent().index()+1));
						var htext = $(this).filter(':checked').next().text()? $(this).filter(':checked').next().text() : "";
						$('div.hidden span.result04').text( htext );
						$('div.hidden').data('setfam',($(this).filter(':checked').parent().index()+1));
					});
				},
				5:function(){
					var cont = $('.myVal.type05');
					module.portfolioMyprodStep()['st']( cont );
					var isCiso = shMenu.ieCheck;
					cont.find('.formArea.portRad').css('z-index','1000');
					var eventNames = 'change'+'.portfolioMyprodtype0'+cont.index()+' paste'+'.portfolioMyprodtype0'+cont.index()+' keyup'+'.portfolioMyprodtype0'+cont.index();
					cont.find('.formArea input').off(eventNames).on(eventNames, function(e){
						var idx = ($(this).filter(':checked').parent().index()+1);
						if( cont.find('.formArea input:checked').length < 1 ) idx = 1;
						cont.find('.perAge span.armR').removeClass('type01 type02 type03');
						cont.find('.perAge span.armR').addClass( 'type0'+ idx);
						//
						if( isCiso ){
							if( cont.find('.stateCiso').length < 2 ){
								cont.find('.charArea').append( cont.find('.stateCiso').clone().css('background','transparent') );
								cont.find('.stateCiso').eq(0).find('span').remove();
							}
							cont.find('.stateCiso').removeClass('stCiso');
							$('style[ciso]').remove();
							var cisoRo = [0,30,15];
							$('head').append('<style ciso>.stCiso{transform: rotate('+cisoRo[idx-1]+'deg); transition : transform 0.3s ease;} '+
								'</style>');
							cont.find('.stateCiso').eq(0).addClass('stCiso');
						}else{
							cont.find('.stateCiso').removeClass('type01 type02 type03');
							cont.find('.stateCiso').addClass( 'type0'+idx );
						}
						var htext = $(this).filter(':checked').next().text()? $(this).filter(':checked').next().text() : "";
						$('div.hidden span.result05').text( htext );
						$('div.hidden').data('setarmr', idx);
					});
				},
				6:function(){
					var cont = $('.myVal.type06');
					module.portfolioMyprodStep()['st']( cont );
					var eventNames = 'change'+'.portfolioMyprodtype0'+cont.index()+' paste'+'.portfolioMyprodtype0'+cont.index()+' keyup'+'.portfolioMyprodtype0'+cont.index();
					cont.find('.formArea input').off(eventNames).on(eventNames, function(e){
						var idx = ($(this).filter(':checked').parent().index()+1);
						if( cont.find('.formArea input:checked').length < 1 ) idx = 3;
						cont.find('.perAge span.armL').removeClass('type00 type01 type02 type03 type04');
						cont.find('.perAge span.armL').addClass( 'type0'+idx );
						var htext = $(this).filter(':checked').next().text()? $(this).filter(':checked').next().text() : "";
						$('div.hidden span.result06').text( htext );
						$('div.hidden').data('setarml',idx);
					});
				},
				'pop':function( c ){
					var cont = c ||$('.myVal.myResult');
					c ? cont = c : cont = $('.myVal.myResult');
					//p
					cont.find('.perAge').removeClass('age10 age20 age30 age40 age50 age60 age70');
					cont.find('.perAge').addClass( "age"+ parseInt($('div.hidden').data('setper')+1)*10 );
					//arR
					cont.find('.perAge span.armR').removeClass('type01 type02 type03');
					var ar = $('div.hidden').data('setarmr') === undefined? 1 :$('div.hidden').data('setarmr');
					cont.find('.perAge span.armR').addClass( "type0"+ ar );
					//f
					cont.find('.familyArea').removeClass("famType00 famType01 famType02 famType03 famType04 famType05");
					cont.find('.familyArea').addClass( "famType0"+ $('div.hidden').data('setfam') );
					//arL
					var al = $('div.hidden').data('setarml') === undefined? 3 :$('div.hidden').data('setarml');
					cont.find('.perAge span.armL').removeClass('type01 type02 type03 type04');
					cont.find('.perAge span.armL').addClass( "type0"+ al );
					if( !c ){
						$('.myVal.myResult').show();
						cont.find( shComm.focusElement ).first().focus();
					}
				}
			}
	};
	module.portfolioMyprodBgCarStepAni = function(setI){
		var bg = $('.bgArea .bgGround'),
				car = $('.bgArea .car'),
				mystep = $(".myStep"),
				bgobj = $('.myVal .bg'),
				bgColor = $('.portBg>div');
		var vIdx = $('.myVal').filter(':visible').index();
			if( car.is(':animated') ) return false;
			if( setI > $('.myVal').length-2 ) return false;

			var ps = parseInt(bg.css('left')),
				stepWi = 164,
				stepLe = 160;
			var sIndex = setI,
				carPs = -16;
			bgColor.filter(':visible').fadeOut(600);
			bgColor.eq(sIndex).fadeIn(600);
			if( !bg.is(':animated') ){
				bg.stop().animate({'left': ps+(-700)+'px' }, 1500 ,function(){
					if( parseInt(bg.css('left')) < -3200 ) {
						bg.css('left', (parseInt(bg.css('left'))+3200)+'px');
					}
				});
			}
			if( sIndex > 0 ){
				if( sIndex <= vIdx ){
					mystep.find('.bar').show().width(stepWi*sIndex);
					mystep.find('li').removeClass('on prev');
					mystep.find('li:lt('+sIndex+')').removeClass('on');
					mystep.find('li:eq('+sIndex+')').addClass('on').prev().addClass('prev');
					$('div.hidden span:gt('+(sIndex-2)+')').text("");
					$('div.hidden').removeData('setper');
					$('div.hidden').removeData('setfam');
					$('div.hidden').removeData('setarmr');
					$('div.hidden').removeData('setarml');
					var age = parseInt(parseInt($('div.hidden span.result01').text())/10)-1;
					$('div.hidden').data('setper',  age>6|| age==-1? age=6 : age );
					var f = $('.myVal.type04 label').filter(function(i){
						if( $(this).text() == $('div.hidden span.result04').text()  ){ return $(this); }
					}).parent().index()+1;
					$('div.hidden').data('setfam', f > 0? f : 0);
					$('div.hidden').data('setarmr', $('.myVal.type05 input:checked').index() > 0 ? $('.myVal.type05 input:checked').index() : 1 );
					$('div.hidden').data('setarml', $('.myVal.type06 input:checked').index() > 0 ? $('.myVal.type06 input:checked').index() : 3 );

					$('.myVal:gt('+sIndex+')').find('input[type="text"]').val("").trigger('change');
					$('.myVal:gt('+sIndex+')').find('input[type="radio"]').prop('checked',false).trigger('change');

				}else{
					setTimeout(function(){
						mystep.find('.bar').show().animate({ left : stepLe +'px' },function(){
							$(this).css({
								'left': '0px'
							});
						});
						var barCl = mystep.find('.bar').clone();
						mystep.append(barCl);
						barCl.show().animate({ width : stepWi*sIndex },function(){
							mystep.find('.bar').width(stepWi*sIndex);
							mystep.find('li:lt('+sIndex+')').removeClass('on').removeClass('prev');
							mystep.find('li:gt('+sIndex+')').removeClass('on');
							mystep.find('li:eq('+sIndex+')').addClass('on').prev().addClass('prev');
							if( sIndex == mystep.find('li').length-1){
								mystep.find('.bar').width((stepWi*sIndex)-4);
							}
							barCl.remove();
						});
					},1);
				}

				carPs = -16;
			}else{
				carPs = 22;
				mystep.find('.bar').removeAttr('style');
				mystep.find('li').removeClass('on prev');
			}
			if( !car.is(':animated') ){
				car.stop().animate({'right':'-506px'},500,function(){
					if( car.is(':animated') ){
					}else{
						$(this).css('right','100%').delay(100).stop().animate({'right': carPs+'%'},1500);
					}
				});
			}else{
				if( sIndex > 0 && carPs !== 22 ){
					car.css('right', -16+'%');
					car.stop().animate({'right':'-506px'},500,function(){
						if( car.is(':animated') ){
						}else{
							$(this).css('right','100%').delay(100).stop().animate({'right': carPs+'%'},1500);
						}
					});
				}
				if( sIndex == 0 ){
					car.css('right', -16+'%');
					car.stop().animate({'right':'-506px'},500,function(){
						if( car.is(':animated') ){
						}else{
							$(this).css('right','100%').delay(100).stop().animate({'right': 22+'%'},1500);
						}
					});
				}
			}
			module.portfolioMyprodStep()[setI]();

	};
	module.portfolioMyprod = function(){ //e.name = portfolioMyprod
		if( $('.myProd').length > 0 ){
			if( $('[src="/siw/common/js/jquery-ui.min.js"]').length < 1 ){
			}
			if( $('.myVal:visible').index() === 0 ){
				$('.bgArea .car').css('right','100%').delay(500).stop().animate({'right':'22%'},800);
			}
			$('.myVal>button').off('click.portfolioMyprod').on('click.portfolioMyprod', function(e){
				if( $('.bgArea .car').is(':animated') ) return false;
				var idx = $(this).parent().index();
				var an = ["","나이를","필요시기를","투자 금액을","가계상황을","내용 중 하나를","내용 중 하나를"];
				if( idx === 1 &&  $(this).parent().find('.formArea input[type=text]').val().length < 2 ){
					return false;
				}
				if(  $(this).parent().find('.formArea input[type=text]').length > 0 && $(this).parent().find('.formArea input[type=text]').val().length < 1 ){
					return false;
				}
				if(  $(this).parent().find('.formArea input[type=radio]').length > 0 && $(this).parent().find('.formArea input[type=radio]:checked').length < 1 ){
					return false;
				}
				if( idx+1 > 6 ){
					module.portfolioMyprodStep()['pop']();
				}else{
					module.portfolioMyprodBgCarStepAni(idx+1);
				}
			});
			$('.myStep .start > a').off('click.portfolioMyprod').on('click.portfolioMyprod', function(e){
				e.preventDefault();
				if( $('.myVal.typeStart').is(':visible') ) return false;
				module.portfolioMyprodBgCarStepAni(0);
			});
			$('.myVal.myResult .close').off('click.portfolioMyprod').on('click.portfolioMyprod', function(e){
				e.preventDefault();
				$('.myVal:visible>button').focus();
				$('.myVal.myResult').hide();
			}).off('keydown.portfolioMyprod').on('keydown.portfolioMyprod',function(e){
				if( window.tab.getTab(e) ) setTimeout(function(){ $('.myVal.myResult').find(shComm.focusElement ).first().focus(); },1);
			});
			$('.myVal.myResult .btns .btnXL.btnWhite').off('click.portfolioMyprod').on('click.portfolioMyprod', function(e){
				e.preventDefault();
				$('.myVal.myResult').hide();
				$('.myStep .start > a').trigger('click');
			});
			$('ul.myValStep li').not('.start').find('>a').off('click.portfolioMyprod').on('click.portfolioMyprod', function(e){
				e.preventDefault();
				var idx = $(this).parent().index();
				var cont = $('.myVal').filter(':visible');
				if( idx == $('.myVal:visible').index() ) return false;
				
				module.portfolioMyprodBgCarStepAni(idx);

			});
		}
	};
	//--유형별 추천 포트폴리오
	module.portfolioMytypeAni = function(){
		var ball = $('.myTypeArea .typeForm.boxBg span.check.on');

		$('.bgM').addClass('operate');
		var times = [];
		times[0] = setTimeout(function(){ $('.bgM').removeClass('operate'); },1500);
		times[1] = setTimeout(function(){
			$.when($('.bgP').clone().insertAfter($('.bgP'))).done(function(){
				$('.bgP').eq(1).addClass('operate');
				var imgurl = $('.bgP.operate').css('background-image');
				var tmp = new Date();
				var opset = imgurl.replace( imgurl.substring( imgurl.indexOf('.gif'),imgurl.indexOf(')')) ,'.gif'+"?"+tmp.getTime() );
				if( $('body').hasClass('lt-ie8') ){//ie8
					$('.bgP.operate').css('background-image', opset );
				}else{
					$('.bgP.operate').attr('style', 'background-image:'+opset );
				}

			});
		},900);
		times[2] = setTimeout(function(){
			$('.bgP').not(':eq(0)').remove();
			$('.bgP.operate').remove();
		},2000);

	};
	module.portfolioMytype = function(){ //e.name = portfoliomytype
		if( $('.myTypeArea').length > 0 ){
			new Image().src = '/siw/common/images/management/bg_m_gear.gif';
			var cont = $('.myTypeArea');
			$(document).off('click.portfoliomytypebutton').on('click.portfoliomytypebutton', '.myTypeArea >button',function(){
				$(this).hide();
				$('.typeForm.boxBg').show();
				$('.typeBox.boxBg').addClass('operate');
				$('.myTypeArea .typeForm.boxBg span.check.on').removeClass('on');
				cont.find('.boxLst button').removeClass('on');
			});
			$(document).off('change.portfoliomytypeinput').on('change.portfoliomytypeinput', '.myTypeArea .typeForm.boxBg li input',function(e){
				if( $(this).prop('checked') ){
					$(this).parent('span').addClass('on');
				}else{
					$(this).parent('span').removeClass('on');
				}
			});
			//조회
			var clickTime = 0;
			$(document).off('click.portfoliomytypeicobg').on('click.portfoliomytypeicobg', '.myTypeArea .typeForm .search.icoBg',function(e){
				if( new Date() - clickTime < 2000 ) return false;
				clickTime = new Date();
				if( cont.find('.typeForm.boxBg li input:checked').length === 0 ) return false;
				$('.typeBox.boxBg').removeClass('operate');
				$('.boxTxt.icoBg').hide();
				module.portfolioMytypeAni();
			});
			//초기화
			$(document).off('click.portfoliomytypereseticobg').on('click.portfoliomytypereseticobg', '.myTypeArea .typeForm .reset.icoBg',function(e){
				if( new Date() - clickTime < 2000 ) return false;
				$('.typeForm.boxBg').hide();
				cont.find('>button').show();
				cont.find('.typeForm.boxBg li input').each(function(l){
					$(this).prop('checked', false ).trigger('change');
				});
				$('.typeBox.boxBg').removeClass('operate');
				$('.boxTxt.icoBg').removeAttr('style');
				$('.typeBox.boxBg button.on').removeClass('on');
			});
			var islstin = false;
			$(document).off('focus.portfoliomytypeboxlstbutton').on('focus.portfoliomytypeboxlstbutton', '.myTypeArea .boxLst button',function(e){
				if( islstin ){
					if( cont.find('.boxLst button:focus').length < 1 || cont.find('.boxLst button.on').length < 1  ){
						islstin = false;
					}
				}else{
					//$('.typeBox.boxBg').addClass('operate');
					$('.typeBox.boxBg p.boxTxt.icoBg').hide();
				}
			}).off('blur.portfoliomytypeboxlstbutton').on('blur.portfoliomytypeboxlstbutton', '.myTypeArea .boxLst button',function(){
				if( $('.typeForm.boxBg').is(':hidden') ) $('.typeBox.boxBg p.boxTxt.icoBg').show();//$('.typeBox.boxBg').removeClass('operate');
			}).off('mousedown.portfoliomytypeboxlstbutton').on('mousedown.portfoliomytypeboxlstbutton','.myTypeArea .boxLst button', function(e){
				islstin = true;
			}).off('click.portfoliomytypeboxlstbutton').on('click.portfoliomytypeboxlstbutton','.myTypeArea .boxLst button', function(e){ //선택 한게 없을 때 상품 선택
				if( $('.typeForm.boxBg').is(':hidden') ){
					$('.typeBox.boxBg p.boxTxt.icoBg').hide();
					$(this).addClass('on');
					$(this).siblings().removeClass('on');
				}
			});
			
		}
	};
	//-- 은퇴설계 시뮬레이션
	module.retirementPlanStep = function(){ //e.name = retirementtype
		return{
			"st" : function( cn ){
				var cont = cn;

				function before(){
					//ani set
					cont.find('.homeArea>.on').removeClass('on').removeAttr('style');
					cont.find('.homeArea').removeData('times');
				}
				function after(){
					$('.myVal').filter(':visible').hide();
					cont.show();
					cont.find( shComm.focusElement ).first().focus();
					cont.find('.planForm').removeClass('soloForm').addClass( $('.planStep').data('plantype') );
					cont.find('.charArea').removeClass('userMan userWoman mateWoman mateMan').addClass( $('.planStep').data('user') +" "+ $('.planStep').data('mate') );
				}
				$.when( before() ).done(function(){
					setTimeout( function(){
						after();
						module.retirementPlanStep()['ani']( cont );
					} , 100 );
				});
			},
			"ani" : function(cn ,f ,i){
				var cont = cn;
				var pig, pipe;//, obj = [];
				//
				cont.find('.homeArea>.on').removeClass('on').removeAttr('style');
				cont.find('.homeArea').removeData('times');
				cont.find('.pig').css('visiblity','hidden').css('visiblity','').addClass('on');
				set(cont.find('.pig.on'));

				setTimeout(function(){
					cont.find('.pipe').addClass('on');
					set(cont.find('.pipe.on'));
				},1000);
				var s ;
				var ss = 0;
				setTimeout(function(){
					cont.find('.homeArea>.obj').each(function(i){
						var $this = $(this);
						s = 300*(i+1);
						ss =+ s;
						setTimeout(function(){
							$this.addClass('on');
							set($this);
						},s);
					});
					
				},3000);

				function set(elem){
					elem.each(function(m){
						var imgurl = $(this).css('background-image');
						var tmp = new Date();
						var opset = imgurl.replace( imgurl.substring( imgurl.indexOf('.gif'),imgurl.indexOf(')')) ,'.gif'+"?"+tmp.getTime() );
						if( !shMenu.ieCheck ){//ie8
							$(this).css('background-image', opset ).hide().show();
						}else{
							if( $(this).hasClass('obj') ){
								$(this).attr('style', 'background-image:'+opset ).hide().show();
							}else{
								$(this).attr('style', 'background-image:'+opset );
							}
						}
					});
				}
			},
			0 : function(){
				var cont = $('.myVal.typeStart');
				$('.myVal').filter(':visible').hide();
				cont.show();
				var eventNames = 'change'+'.retirementtype0'+cont.index()+' paste'+'.retirementtype0'+cont.index()+' keyup'+'.retirementtype0'+cont.index();
				
				$(document).off(eventNames).on(eventNames, '.myVal.typeStart .planForm input[type=radio]',function(e){
					if( $(this).prop('checked') ){
						var $elem = $(this);
						$(this).parent().siblings().filter(function(k){
							if( $elem.attr('name') === $(this).find('input').attr('name') ) return $(this);
						}).removeClass('on');
						$(this).parent().addClass('on');
						var user = $('.myVal.typeStart .planCheck .txt:eq(0)').nextAll('.on').eq(0);
						var mate = $('.myVal.typeStart .planCheck .txt:eq(1)').nextAll('.on').eq(0);
						var planType = $('.planType input');
						if( $('.planType input:eq(0)').prop('checked') ){
							$('.myVal.typeStart .planCheck .txt:eq(1)').nextAll().show().andSelf().show();
							if( $(this).parent().index('.planCheck .check') < 2 ){
								if( $(this).parent().index('.planCheck .check') === 0 ){
									$('.myVal.typeStart .planCheck .txt:eq(1)').next().next().find('input').prop('checked',true);
									$('.myVal.typeStart .planCheck .txt:eq(1)').next().removeClass('on');
									$('.myVal.typeStart .planCheck .txt:eq(1)').next().next().addClass('on');
								}else if( $(this).parent().index('.planCheck .check') === 1 ){
								}
							}
							setTimeout(function(){
								user = $('.myVal.typeStart .planCheck .txt:eq(0)').nextAll('.on').eq(0);
								mate = $('.myVal.typeStart .planCheck .txt:eq(1)').nextAll('.on').eq(0);
								user = user.index('.check') === 2 ? "userMan" : user.index('.check') === 3 ? "userWoman" : "userMan";
								mate = mate.index('.check') === 4 ? "mateMan" : mate.index('.check') === 5 ? "mateWoman" : "mateMan";
								planType ='';
								$('.myVal.typeStart .charArea').removeClass('userMan userWoman mateWoman mateMan').addClass( user +" "+ mate );
							}, 1);
						}else{
							$('.myVal.typeStart .charArea').removeClass('mateWoman mateMan');
							$('.myVal.typeStart .planCheck .txt:eq(1)').hide();
							$('.myVal.typeStart .planCheck .txt:eq(1)').nextAll().hide();
							user = user.index('.check') === 2 ? "userMan" : user.index('.check') === 3 ? "userWoman" : "userMan";
							mate = "";
							planType ='soloForm';
							$('.myVal.typeStart .charArea').removeClass('userMan userWoman').addClass( user );
						}
						//set data
						setTimeout(function(){
							$('.planStep').data('plantype', planType );
							$('.planStep').data('user', user );
							$('.planStep').data('mate', mate );
						}, 1);
					}
				});
			},
			"contents": function( cn ){
				var cont = cn; //$('.myVal.type01');
				module.retirementPlanStep()['st']( cont );
				var isAni = false;
				var eventNames = 'change'+'.retirementtype0'+cont.index()+' paste'+'.retirementtype0'+cont.index()+' keyup'+'.retirementtype0'+cont.index();
			}

		}
	};
	module.retirementPlanAni = function( setidx ){
		var bgColor = $('.planBg .bgColor'),
			vIdx = $('.myVal').filter(':visible').index(),
			mystep = $(".planStep"),
			stepWi = 140,
			stepLe = 140,
			setIdx = setidx;

		//bg
		bgColor.filter(':visible').stop().fadeOut(1000);
		bgColor.eq(setIdx).stop().fadeIn(600);
		if( setIdx > 0 ){
			if( setIdx <= vIdx ){
				mystep.find('.bar').show().width(stepWi*setIdx);
				mystep.find('li').removeClass('on prev');
				mystep.find('li:lt('+setIdx+')').removeClass('on');
				mystep.find('li:eq('+setIdx+')').addClass('on').prev().addClass('prev');
				mystep.find('li:lt('+setIdx+') .guide').hide();
				mystep.find('li:gt('+setIdx+') .guide').hide();
				mystep.find('li:eq('+setIdx+') .guide').show();
				//data set
			}else{
				//pig step
				mystep.find('.bar').delay(400).animate({ left : stepLe +'px' },0,function(){
					$(this).css({
						'left': '0px'
					});
				});
				var barPg = mystep.find('.bar').clone();
				setTimeout(function(){
					mystep.find('.bar').show();
				},500);
				setTimeout(function(){
					mystep.append(barPg);
					barPg.show().stop().animate({ width : stepWi*setIdx },function(){
						mystep.find('.bar').width(stepWi*setIdx);
						mystep.find('li:lt('+setIdx+')').removeClass('on').removeClass('prev');
						mystep.find('li:gt('+setIdx+')').removeClass('on');
						mystep.find('li:lt('+setIdx+') .guide').hide();
						mystep.find('li:eq('+setIdx+') .guide').show();
						mystep.find('li:eq('+setIdx+')').addClass('on').prev().addClass('prev');
						barPg.remove();
					});
				},1);
			}
			//cont
			module.retirementPlanStep()["contents"]( $('.myVal.type0'+setIdx) );
		}else{
			mystep.find('.bar').removeAttr('style');
			mystep.find('li').removeClass('on prev');
			mystep.find('li .guide').hide();
			$('.myVal.typeStart').find( shComm.focusElement ).first().focus();
			//cont
			module.retirementPlanStep()[0]();
		}

	};
	module.retirementPlan = function(){//e.name = retirementPlan
		if( $('.planCon').length > 0 ){
			var imgEl = $('.myVal').find('div').filter(function(l){
						if( $(this).css('background-image').match(/(.png)/) ){
							return $(this);
						}
					});
			
			//images
			imgEl.each(function(k){
				var srctxt = $(this).css('background-image').replace('url("',"").replace('")',"");
				new Image().src = srctxt;
			});
			//input start
			module.retirementPlanStep()[0]();
			//set default
			setTimeout(function(){
				$('.planForm .check.on input').prop('checked', true ).trigger('change');
			},20);
			//prev
			$(document).off('click.retirementPlan').on('click.retirementPlan', 'ul.myValStep li:not(.start)>a',function(e){
				e.preventDefault();
				var idx = $(this).parent().index();
				var cont = $('.myVal').filter(':visible');
				if( idx == $('.myVal:visible').index() ) return false;
				shSimul.retirementPlanAni(idx);
			});
			//start
			$(document).off('click.retirementPlanstart').on('click.retirementPlanstart', '.myValStep .start > a',function(e){
				e.preventDefault();
				var cont = $('.myVal').filter(':visible');
				if( $('.myVal.typeStart').is(':visible') ) return false;
					module.retirementPlanAni(0);
			});


		}
	};
	//신규고객가이드
	module.customerGuideStep = function(){
		return{
			'btnevent': function(idx){
				var cont = $('.newguideWrap .newGuide:visible');
				var eventNames = 'click'+'.customerguide0'+cont.index('.newGuide');
				cont.find('.ladder').hide();
				cont.find('.imgAni a, .questBox a, .certSelect a, .assetBox a').off(eventNames).on(eventNames,function(e){
					e.preventDefault();
					var idname = $(this).attr('href').replace('#','');

					if( $(this).next('.ladder').length > 0 ){
						$(this).parent().addClass('on');
						$(this).parent().siblings().removeClass('on');
						cont.find('.ladder').hide();
						var imgurl = $(this).next('.ladder').find('img').attr('src');
						var tmp = new Date();
						var opset = imgurl.replace( '.gif' ,'.gif'+"?"+tmp.getTime() );
						$(this).next('.ladder').show();
						$(this).next('.ladder').find('img').attr('src', opset );

						setTimeout(function(){
							var target = $(e.currentTarget);
							var id = target.attr("href").replace('#',"");
							$.openDimPop(id, target);
							$('.footer').css('z-index','0');
						},2300);
					}else{
						if( idname.length === 0 ){
							var txt = $(this).find('strong').text().replace(" ","");
							var num = $('.newGuide.guide06').filter(function(k){
								var $txt =  new String($(this).find('.subTit >em').text());
								if( $txt.replace(" ","").replace(" ","").indexOf(txt) === 0 ){
									return $(this);
								}
							}).index('.newGuide.guide06');

							$('.newGuide.guide06.result0'+ num ).children().children().show();
							$('.newGuide').hide();
							$('.newGuide.guide06.result0'+ num ).show();
						}else{
							var target = $(e.currentTarget);
							var id = target.attr("href").replace('#',"");
							$.openDimPop(id, target);
							$('.footer').css('z-index','0');
						}
					}
				});
			}
		};
	};
	module.customerGuideAni = function(setidx){
		var prcont = $('.newguideWrap .newGuide:visible');
		var cont = $('.newguideWrap .newGuide.guide0'+ setidx );//.eq(setidx);
		if( setidx === 6 ) cont = $('.newguideWrap .newGuide.guide06').eq(0);
		if( prcont.index() === cont.index() ) return false;
		if( cont.length < 1 ) return false;
		if( prcont.length > 1 ) return false;

		//사라짐
		function objecthide(){
			prcont.find('.imgAni >.left').each(function(i){
				var now = parseInt( $(this).css('left') );
				$(this).animate({
					left: (now-50)+'px'
				},800);
			});
			prcont.find('.imgAni >.right').each(function(i){
				var now = parseInt( $(this).css('right') );
				$(this).animate({
					right: (now-50)+'px'
				},800);
			});
			prcont.find('.imgAni >.top').each(function(i){
				var now = parseInt( $(this).css('top') );
				$(this).animate({
					top: (now-50)+'px'
				},800);
			});
			prcont.find('.subTit').stop().fadeOut(function(){
				bgset();
				prcont.find('.imgAni').children().hide();
			});
			prcont.find('.questBox').stop().fadeOut();
			prcont.find('.certSelect li').stop().fadeOut();
			prcont.find('.charTxt p').removeAttr('style');
			prcont.find('.charTxt p').hide();
			prcont.find('.assetBox').stop().fadeOut();
			prcont.find('.imgAni').stop().fadeOut();
		}
		objecthide();

		//배경
		function bgset(){
			var bgtopps = -900;
			var $ele = prcont;
			if( cont.index() > prcont.index() ){
				$ele = cont;
				bgtopps = 'up';
			}else{
				$ele = prcont;
				bgtopps = 'down';
			}

			cont.show();
			cont.find('.charTxt p').hide();
			cont.find('.subTit,.imgAni,.questBox,.certSelect li').hide();
			cont.find('.questBox li.on').removeClass('on');
			$ele.find('.bg').css('top',  bgtopps === 'up'? 0 : -900+'px');

			$ele.find('.bg').stop().animate({
				'top': bgtopps === 'up'? -900 : 0 +'px'
			},400,function(){
				prcont.hide();
				cont.find('.bg').css('top','0px');
				objectmove();
				var personArr = [512, 490, 490, 490, 490, 490];//[512, 490, 510, 526, 490, 510];
				cont.find('.person').css('top','725px');
				cont.find('.person').animate({'top': personArr[setidx-1]+'px'},800);
			});
			if( setidx > 1){
				$('.newguideWrap >button').fadeIn();
				if( setidx === $('.newguideWrap .newGuide').not('.result01,.result02,.result03').length ){
					$('.newguideWrap >button.next').hide();
				}
			}else{
				$('.newguideWrap >button').hide();
			}

			//인디케이터
			$('.newAside li.on').removeClass('on');
			$('.newAside li').eq(setidx-1).addClass('on');
		}
		//등장
		function objectmove(){
			cont.find('.imgAni').children().show();
			cont.find('.subTit').fadeIn();
			cont.find('.imgAni').fadeIn();
			cont.find('.questBox').fadeIn();
			cont.find('.assetBox').fadeIn();
			cont.find('.certSelect li').fadeIn();
			$('.newguideWrap .newGuide.guide01 .btnStart a').css({'opacity':'1','transform':'scale(1.0)'});
			cont.find('.imgAni >.left').each(function(i){
				var now = parseInt( $(this).css('left') );
				$(this).delay(100*i).animate({
					left: (now+50)+'px'
				},800);
			});
			cont.find('.imgAni >.right').each(function(i){
				var now = parseInt( $(this).css('right') );
				$(this).delay(100*i).animate({
					right: (now+50)+'px'
				},800);
			});
			cont.find('.imgAni >.top').each(function(i){
				var now = parseInt( $(this).css('top') );
				$(this).delay(100*i).animate({
					top: (now+50)+'px'
				},800);
			});
			//
			cont.find('.charTxt p').show();
			if( setidx%2 === 1 ){  //woman
				cont.find('.charTxt p').css('left','-373px');
				cont.find('.charTxt p').animate({'left':0},800);
			}else{
				cont.find('.charTxt p').css('left','100%');
			}
			if( setidx%2 === 0 ){
				cont.find('.charTxt p').css('position','absolute');
				cont.find('.charTxt p').css('left','365px');
				cont.find('.charTxt p').animate({'left':'0px'},800);
			}else{
				cont.find('.charTxt p').removeAttr('style');
			}
			if( module.customerGuideStep()['btnevent'] ){
				module.customerGuideStep()['btnevent']();
			}
		}

	};
	module.customerGuide = function(){ //e.name = customerguide
		if( $('.newguideWrap .newGuide.guide01').length > 0 ){ //첫등장
			setTimeout(function(){
				module.customerGuideStartAni();
			},100);

		}

		//이전/다음
		$('.newguideWrap >button').off('click.customerguide').on('click.customerguide', function(e){
			if( $('.newguideWrap .newGuide .bg').is(':animated') ){
				return false;
			}
			var now = $('.newguideWrap .newGuide:visible').attr('class').split(' ');//.index('.newGuide');
			var nowNum;
			for( var k=0 in now ){
				if( new String(now[k]).indexOf('guide') == 0 ){
					nowNum = now[k].replace('guide0','');
				}
			}

			if( $(this).hasClass('prev') ){
				if( $('.newguideWrap .newGuide:visible').hasClass('result01') || $('.newguideWrap .newGuide:visible').hasClass('result02') || $('.newguideWrap .newGuide:visible').hasClass('result03') ){
					$('.newguideWrap .newGuide:visible').hide();
					$('.newGuide.guide06').eq(0).show();
				}else{
					module.customerGuideAni( parseInt(nowNum)-1);
				}
			}else{
				module.customerGuideAni( parseInt(nowNum)+1);
			}
		});
		//list
		$('.newguideWrap').prev('.newAside').find('a').off('click.customerguide').on('click.customerguide', function(e){
			e.preventDefault();
			var idx = $(this).parent().index()+1;
			module.customerGuideAni(idx);
		});
		//start
		$('.newguideWrap .newGuide.guide01 .btnStart a').off('click.customerguide').on('click.customerguide', function(e){
			e.preventDefault();
			$(this).css('transition','all 0.5s ease-in-out');
			$(this).css('transform','scale(1.2)');
			$(this).css('opacity','0');
			module.customerGuideAni(2);
		});
		//05.자산관리 시작 결과내 버튼
		$('.newGuide.guide06.result01 .result>a,.newGuide.guide06.result02 .result>a, .newGuide.guide06.result03 .result>a').off('click.customerguide').on('click.customerguide',function(e){
			e.preventDefault();

			var txt = $(this).find('strong').text().replace(" ","");
			var num = $('.newGuide.guide06').filter(function(k){
				var $txt =  new String($(this).find('.subTit >em').text());
				if( $txt.replace(" ","").replace(" ","").indexOf(txt) === 0 ){
					return $(this);
				}
			}).index('.newGuide.guide06');

			$('.newGuide.guide06.result0'+ (num) ).children().children().show();
			$('.newGuide').hide();
			$('.newGuide.guide06.result0'+ (num) ).show();
		});
	};
	//
	module.customerGuideStartAni = function(){
		$('.newguideWrap .newGuide.guide01 .imgAni').hide();
		$('.newguideWrap >button').hide();
		$('.newguideWrap .newGuide.guide01 .imgAni').children().show();
		$('.newguideWrap .newGuide.guide01 .imgAni').hide().fadeIn(700);
		$('.newguideWrap .newGuide.guide01').find('.imgAni .left').each(function(i){
			var now = parseInt( $(this).css('left') );
			$(this).delay(150*i).animate({
				left: (now+50)+'px'
			},1000);
		});
		$('.newguideWrap .newGuide.guide01').find('.imgAni .right').each(function(i){
			var now = parseInt( $(this).css('right') );
			$(this).delay(150*i).animate({
				right: (now+50)+'px'
			},1000);
		});
		$('.newguideWrap .newGuide.guide01').find('.imgAni .top').each(function(i){
			var now = parseInt( $(this).css('top') );
			$(this).delay(150*i).animate({
				top: (now+50)+'px'
			},1000);
		});
		$('.newguideWrap .newGuide.guide01').find('.person').animate({'top':'512px'},1000);
	};

	module.init = function(){
		//--내게 맞는 상품 추천
		module.portfolioMyprod();
		//--유형별 추천 포트폴리오
		module.portfolioMytype();
		//-- 은퇴설계 시뮬레이션
		module.retirementPlan();
		//--신규고객가이드
		module.customerGuide();
	}

}(jQuery));
//-------------------subMain-------------------
(function($){
	var module = window.shSubMain = {};
	//나의 자산 현황
	module.myassetMain = function(){
		if( $('.myassetCon .allBuild .car').length > 0 ){
			var ani = false;
			if( $('.myassetCon .allBuild .car').offset().top < parseInt($(window).height()/2)+$(window).scrollTop() +400){
				myassetcarAni();
				ani = true;
			}
			$(window).off('scroll.allBuildcar').on('scroll.allBuildcar', function(){
				var $wtop = $(window).scrollTop();
				if( $('.myassetCon .allBuild .car').offset().top < parseInt($(window).height()/2)+$wtop +400){
					if( !ani ){
						myassetcarAni();
						ani = true;
					}
				}
			});
		}
		function myassetcarAni(){
			var car = $('.myassetCon .allBuild .car');
			if( car.hasClass('on') ){
				car.removeClass('on');
			}
			var tmp = new Date();
			var imgurl = car.css('background-image');
			var opset = imgurl.replace( imgurl.substring( imgurl.indexOf('.gif'),imgurl.indexOf(')')) ,'.gif'+"?"+tmp.getTime() );

			if( $('body').hasClass('lt-ie8') ){//ie8
				car.css('background-image', opset );
			}else{
				car.hide().attr('style', 'background-image:'+opset ).show();
			}
			car.delay(1500).animate({'left' : '770px'}, 2500, function(){
				$(this).css('background-image','');
				$(this).addClass('on');
			});
		}
	};
	//투자정보
	module.insightsMain = function(){ //e.name = insightsTodayList
		//기업산업분석
		if( $('.insightsAnalysis').length > 0 ){
			$('.insightsAnalysis .slideWrap').shSlide({
				'autoplay': true,
				'time': 0
			});
		}
		//오늘의 투자전략
		var idx = 0;
		$(document).off('click.insightsTodayList').on('click.insightsTodayList', '.insightsTodayList .controller button',function(e){
			if( $(this).hasClass('prev') ){
				idx--;
				idx = idx < 0 ? idx = $('.insightsToday').find('>.cont').length - 1 : idx;
			}else{
				idx++;
				idx = idx > $('.insightsToday').find('>.cont').length - 1 ? idx = 0 : idx;
			}
			$('.insightsToday').find('>.cont').hide();
			$('.insightsToday').find('>.cont').eq( idx ).show();
		});
	};
	//연금자산
	module.pensionMain = function(){//e.name = pensionmain
		//top
		if( $('.slideWrap.pensionTop').length > 0 ){
			$('.slideWrap.pensionTop .list li').width( $('.slideWrap.pensionTop').width() );
			$('.slideWrap.pensionTop').shSlide({
				'autoplay': true//,
			});
		}
		//이달의 추천상품
		var btn = $('.submainCont.submainCont01 .prodBox .list li a');
		$(document).off('click.pensionmainprodbox').on('click.pensionmainprodbox', '.submainCont.submainCont01 .prodBox .list li a', function(e){
			e.preventDefault();
			$('.submainCont.submainCont01 .prodBox .list li.on').find('.cont').hide();
			$('.submainCont.submainCont01 .prodBox .list li.on').removeClass('on');
			$(this).parent().addClass('on');
			$(this).next().show();
		});
	};
	//자산관리몰
	module.wealthMain = function(){ //e.name = wealthmain;
		var wsliderArrow = $('.wealthCon .marketLst>button');
		var setlen = 8;
		$('.wealthCon .marketLst>ul>li:gt('+(setlen-1)+')').hide();
		$(document).off('click.wealthmain').on('click.wealthmain', '.wealthCon .marketLst>button',function(e){
			if( $('.wealthCon .marketLst>ul>li').length < setlen+1 ){
				$('.wealthCon .marketLst>ul>li').show();
				return false;
			}
			if( $(this).hasClass('prev') ){
				if( $('.wealthCon .marketLst>ul>li:visible').length == $('.wealthCon .marketLst>ul>li').length ){
					$('.wealthCon .marketLst>ul>li:gt('+(setlen-1)+')').hide();
					$('.wealthCon .marketLst>ul>li:lt('+(setlen)+')').show();
				}else{
					if( $('.wealthCon .marketLst>ul>li:visible').first().index() === 0 ){
						var lastlis = Math.floor(($('.wealthCon .marketLst>ul>li').length-1)/setlen)*setlen;
						$('.wealthCon .marketLst>ul>li:gt('+(lastlis-1)+')').show();
						$('.wealthCon .marketLst>ul>li').slice(0,setlen).hide();
					}else{
						$('.wealthCon .marketLst>ul>li:visible').first().prevAll().slice(0,setlen).show();
						$('.wealthCon .marketLst>ul>li:visible:gt('+(setlen-1)+')').hide();
					}
				}
			}else{
				if( $('.wealthCon .marketLst>ul>li:visible').length == $('.wealthCon .marketLst>ul>li').length ){
					$('.wealthCon .marketLst>ul>li:gt('+(setlen-1)+')').show();
					$('.wealthCon .marketLst>ul>li:lt('+(setlen)+')').hide();
				}else{
					if( $('.wealthCon .marketLst>ul>li:visible').last().index() === $('.wealthCon .marketLst>ul>li').length-1 ){
						$('.wealthCon .marketLst>ul>li').slice(0,setlen).show();
						$('.wealthCon .marketLst>ul>li:gt('+setlen+')').hide();
					}else{
						$('.wealthCon .marketLst>ul>li:visible').last().nextAll().slice(0,setlen).show();
						$('.wealthCon .marketLst>ul>li:visible:lt('+setlen+')').hide();
					}
				}
			}
		});
		//
		if( $('.wealthCon.wealthSvc .slideWrap.svcEvent').length > 0){
			$('.wealthCon.wealthSvc .slideWrap.svcEvent').shSlide({
				'autoplay': true
			});
		}
	};
	//트레이딩
	module.tradingMain = function(){ //e.name = tradingmain
		var list = $('.stratData a');
		
		$(document).off('mouseenter.tradingmain').on('mouseenter.tradingmain', '.stratData a',function(e){
			e.preventDefault();
			$(this).parent().addClass('on');
			$(this).parent().siblings().removeClass('on');
		});
		
	};
	module.tradingMainScroll = function(){
		var settp = $('.tradingCon.tradingProd .prodScatch').offset().top;
		var bottomMargin = $('.tradingCon.tradingProd .prodScatch .s_more').outerHeight();
		$(window).off('scroll.tradingmain').on('scroll.tradingmain', function(){
			   var $wtop = $(window).scrollTop(); 
			   var $elem = $('.tradingCon.tradingProd .prodScatch');                    
			   if( $('style[meny]').length < 1 ){
					 if( $wtop < 100 ) settp = $('.tradingCon.tradingProd .prodScatch').offset().top;
					 if( settp-80+47 < $wtop ){ // 80+47: 상단에 띄워질 높이
							$elem.css({
								   'position':'fixed',
								   'left':'-490px',
								   'margin-left' : '50%'
							});
							if( $('#footer').offset().top-$wtop < $elem.height() +(80) ){
								   $elem.css('top', $('#footer').offset().top - $wtop - $elem.height() -bottomMargin +'px' ); // - bottomMargin                          
							}else{
								   $elem.css('top',(80-27)+'px');
							}
					 }else{
							$elem.removeAttr('style');
					 }
			   }else{
					 if( $('#wrapper').scrollTop() ){
							if( $elem.position().top !== 0 && $elem.position().top > 86 ){
								   $elem.css('top',(80-27 + ( $('#wrapper').scrollTop() - settp -34  ) )+'px');
							}else if( $elem.position().top !== 0 && $elem.position().top < 87 ){ 
								   var p = 0; 
								   if( $('#footer').offset().top < 800 ){
										 p = -($(window).height() - $('#footer').offset().top - $wtop +5);
										 if( p < 0 ){
												p = $('#container').height() - $('#wrapper').scrollTop() - $elem.height() - 93;
										 }
								   }else{
										 p = 0;
								   }
								   $elem.css('top',(80-27 +p + ( $('#wrapper').scrollTop() -settp ) )+'px');
							}
					 }
			   }		
		});
	}
	//
	module.topsclubMain = function(){
		$('.topsIntro .topsCon').children().hide();
		setTimeout(function(){
			if( $('.topsIntro .topsCon .introTxt').is(':hidden') ){
				$('.topsIntro .topsCon .introTxt').fadeIn(600);
				$('.topsIntro .topsCon .introCon').delay(400).fadeIn(600,function(){
					$(this).next().fadeIn();
				});
			}
		},300);
	};
	//
	module.ibMain = function(){
		$('.ibIntro').children().hide();
		setTimeout(function(){
			if( $('.ibIntro .introTxt').is(':hidden') ){
				$('.ibIntro .introTxt').fadeIn(800);
			}
		},600);
	};
	//
	module.init = function(){
		//나의 자산 현황
		module.myassetMain();
		//투자정보
		module.insightsMain();
		//연금자산
		module.pensionMain();
		//자산관리몰
		module.wealthMain();
		//트레이딩
		module.tradingMain();
		//
		module.topsclubMain();
		//
		module.ibMain();
	};
}(jQuery));
//-------------------나의 자산 현황 > 숫자애니메이션-------------------
// element : 숫자를 가진 태그
(function($){
	$.fn.shNumberCountAni = function( op ){
		return this.each(function(i){
			var $this = $(this);
			var data = $this.data('shNumberCountAni');
			if( !data ) $this.data('shNumberCountAni', (data = new ShNumberCountAni($.extend({'ele':$this},op)) ) );
		});
	}
	$.fn.shNumberCountAni.Constructor = ShNumberCountAni;
}(jQuery));
function ShNumberCountAni(op){
	this.option = $.extend({
		'ele':$.noop(),
		'value': 'Number'
	},op);

	var module = this,
		ele = module.option.ele;

	if( ele.offset().top < parseInt($(window).height()/2)+$(window).scrollTop() +300){
		if( ele.parent('.newrate').length < 1 ){
			module.start();
		}
	}
	$(window).off('scroll.shnumbercountani').on('scroll.shnumbercountani', function(){
		var $wtop = $(window).scrollTop();
		if( ele.offset().top < parseInt($(window).height()/2)+$wtop +300){
			if( ele.parent('.newrate').length < 1 ){
				module.start();
			}
		}
	});

}
$.extend(ShNumberCountAni.prototype,{
	setHtml : function(){
		var module = this,
			ele = module.option.ele;
		var textArr = new String( Math.abs(module.option.value) ).split("");//ele.text().split(""); //16-07-29 -

		if( ele.is('div') ){
			ele = ele.find('strong.rate');
		}
		if( ele.parent('.newrate').length > 0 ){
			ele.parent('.newrate').find('.in').remove();
			ele.unwrap();
			ele.show();
		}
		if( ele.closest('.allBuild').length > 0 ){
			if(module.option.value > 0 && module.option.value < 100){
				ele.closest('li').removeClass('size1 size2 size3 size4 size5').addClass('size' + ( Math.floor(module.option.value/20)+1 ) );
			}else{
				ele.closest('li').removeClass('size1 size2 size3 size4 size5').addClass('size' + 1 );
			}
			if( module.option.value > 99 ){
				ele.closest('li').removeClass('size1 size2 size3 size4 size5').addClass('size' + 5);
			}
		}

		ele.wrap('<div class="newrate" />');
		//ele.hide();
		ele.css({
			'visibility':'hidden'
		}).text(module.option.value).hide();

		$.each(textArr, function(i){
			var tag = ele[0].tagName.toLowerCase();
				ele.parent('.newrate').append('<div class="in" style="visibility:hidden"><'+tag+'>01234567890</'+tag+'></div>');
		});
		if( module.option.value < 0 ){ //16-07-29 -
			ele.parent('.newrate').parent().prepend('-');
		}
		ele.parent('.newrate').addClass( ele.attr('class') );
			ele.parent('.newrate').css({
				'display':'inline'
			});
			ele.parent('.newrate').find('.in').css({
				'display':'inline-block',
				'overflow':'hidden',
				'vertical-align': 'middle',
				'visibility':'visible'
			}).height(ele.height()).width( new String(module.option.value).length > 1 ? (ele.width()/new String(module.option.value).length) : ele.width() );
			ele.parent('.newrate').find('.in strong').css({
				'position':'relative',
				'top': ele.height() +'px'
			});
		setTimeout(function(){
			ele.parent('.newrate').find('.in').height(ele.height()).width( new String(module.option.value).length > 1 ? (ele.width()/new String(module.option.value).length) : ele.width() );
			ele.parent('.newrate').find('.in strong').css({
				'position':'relative',
				'top': ele.height() +'px'
			});
		},200);
	},
	start : function(){
		var module = this,
			ele = module.option.ele;
		if( ele.is('div') ){
			ele = ele.find('strong.rate');
		}
		var textArr = new String( Math.abs(module.option.value) ).split("");
		module.setHtml();
		var is_ie = window.navigator.userAgent.indexOf("MSIE") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
		var times = textArr.length < 4? 800 : 400,
			delayTime = textArr.length < 4? 300 : 50;

		ele.parent('.newrate').find('.in').each(function(k){  //'strong:visible'
			var st = $(this).find('strong');
			if( parseInt(textArr[k]) === 0 && textArr.length > 1 ){
				st.delay(delayTime*(textArr.length - k -1) ).animate({'top': 10*-ele.height()+'px'}, times, function(){
					$(this).css('top','0px');
				});
			}else{
				var height = ele.height();
				if( is_ie && ele.closest('.allBuild').length > 0 ){ //ie font size
					height = ele.height() -0.5;
				}
				if(  window.navigator.userAgent.indexOf("Firefox") > 0 ){ //Firefox font size
					height = ele.height() -0.5;
				}
				st.delay(delayTime*(textArr.length - k -1)).animate({'top': (parseInt(textArr[k])*-height)+'px'}, times);
			}
		});
	}
});

//-------------------imgSlide-------------------
// element : div class=slideWrap
(function($){
	$.fn.shSlide = function( op ){
		return this.each(function(i){
			var $this = $(this);
			var data = $this.data('shSlide');
			if( !data ){
				$this.data('shSlide', (data = new ShSlide($.extend({'ele':$this},op)) ) );
			}else{
				$this.data('shSlide').destroy();
				$this.data('shSlide', (data = new ShSlide($.extend({'ele':$this},op)) ) );
			}
		});
	}
	$.fn.shSlide.Constructor = ShSlide;
}(jQuery));
function ShSlide( op ){
	this.option = $.extend({
		'ele':$.noop(),
		'autoplay' : false,
		'time': 'Number',
		'set' : 'string'
	},op);
	var $elem = $(this.option.ele);
	this.arrow = $elem.find('>button');
	this.indi = $elem.find('.indicator>a').not('.controll, .stop, .play');
	this.playbtn = $elem.find('.indicator>a').filter('.controll, .stop, .play');
	this.isMouse = false;
	this.isArrow = false;
	this.isClicked = false;
	this.setCss();
	var self = this;
	setTimeout(function(){
		self.start();
		if( self.option.autoplay ){
			self.loop();
		}
	},1);
}
$.extend(ShSlide.prototype,{
	destroy : function(){
		var $elem = $(this.option.ele);
		var div = $elem.find('.slider');
		var ul = div.find('ul');
		var li = div.find('li');
		this.clearloop();

		$elem.removeData('shSlide');

		if( div.children().length > 2 || div.children().hasClass('tab')){
			ul = undefined;
			li = div.children();
		}
		if( ul ){
			ul.removeAttr('style');
		}
		if( div.find('.tab').length > 0 ){
		}else{
			li.removeAttr('style');
		}
		this.indi.removeClass('on');
		li.eq(0).show();
		this.indi.eq(0).addClass('on');
		li.eq(0).css('left',0+'px');
		li.not(':eq(0)').hide();
		if( div.is(':hidden') ){
			div.css('visibility','hidden').show().removeAttr('style');
			li.eq(0).css('left',0+'px')
			li.not(':eq(0)').hide();
		}
	},
	setCss : function(){
		var $elem = $(this.option.ele);
		var div = $elem.find('.slider');
		var ul = div.find('ul');
		var li = div.find('li');
		if( div.children().length > 2 || div.children().hasClass('tab') ){
			ul = undefined;
			li = div.children();
		}
		if( ul ){
			ul.css({
				'position':'relative'
			})
		}
		if( div.find('.tab').length > 0 ){
		}else{
			li.css({
				'position':'absolute'
			});
		}
		if( li.length < 2 ){
			$elem.find('.indicator').hide();
		}
		if( $elem.hasClass('mainEvent')){
			ul = div;
			li = div.children();
			ul.css({'position':'relative'});
			li.css({'position':'absolute'});
		}
		this.indi.removeClass('on');
		li.eq(0).show();
		this.indi.eq(0).addClass('on');
		li.eq(0).css('left',0+'px');
		li.not(':eq(0)').hide();
		if( div.is(':hidden') ){
			div.css('visibility','hidden').show().removeAttr('style');
			li.eq(0).css('left',0+'px')
			li.not(':eq(0)').hide();
		}
	},
	loop : function(){
		var self = this;
		self.isClicked = false;
		self.playbtn.filter('.play').hide();
		self.playbtn.filter('.stop').show();
		var $elem = $(this.option.ele);
		var div = $elem.find('.slider');
		var li = div.find('li');
		if( div.children().length > 2 || div.children().hasClass('tab') ){
			li = div.children();
		}
		var indi = this.indi;
		var aTimes = this.option.time;
		this.times = setInterval(function(){
			if( li.length < 2 ) return false;
			var idx = li.filter(':visible').index(); 
			idx ==  li.length -1 ? idx = 0 : idx = idx+1;
			self.slideAni( li.eq(idx),'left', aTimes);
		},7000);
	},
	clearloop : function(){
		var self = this;
		self.playbtn.filter('.play').show();
		self.playbtn.filter('.stop').hide();
		self.isClicked = true;
		clearInterval( self.times );
	},
	slideAni : function( nElm, dir ,t ){
		var self = this;
		var $elem = $(this.option.ele);
		var div = $elem.find('.slider');
		var li = div.find('li');
		if( div.children().length > 2 || div.children().hasClass('tab')){
			li = div.children();
		}
		if( li.length < 2 ) return false;
		var nowElm = li.filter(function(){ if( parseInt($(this).css('left')) === 0 && $(this).is(':visible') ){ return $(this);} });
		var eWid = nowElm.outerWidth();
		var m = -1, n = 1;
		if( dir == 'left' ){
			m = -1; n = 1;
		}else{
			m = 1; n = -1;
		}

		if( typeof t !== "number"){
			t = 400;
		}

		self.indi.removeClass('on');
		self.indi.eq(nElm.index()).addClass('on');
		if( $elem.find('>.tab') ){//portfolio_landing
			$elem.find('>.tab').children().removeClass('on');
			$elem.find('>.tab').children().eq(nElm.index()).addClass('on');
		}
		nowElm.stop().animate({'left' : eWid*m+'px'},t);
		nElm.show().css('left',eWid*n+'px').stop().animate({'left' : 0+'px'}, t, function(){
			nowElm.hide();
		});
	},
	start : function(){
		var self = this;
		var $elem = $(this.option.ele);
		var arrow = this.arrow;
		var indi = this.indi;
		var aTimes = this.option.time;
		var div = $elem.find('.slider');
		var li = div.find('li');
		if( div.children().length > 2 || div.children().hasClass('tab') ){
			li = div.children();
		}
		//
		arrow.off('click').on('click', function(e){
			e.preventDefault();
			if( li.is(':animated') ) return false;
			var idx = li.filter(':visible').index(); 
			if( $(this).hasClass('next') ){
				idx ==  li.length -1 ? idx = 0 : idx = idx+1;
				self.slideAni( li.eq(idx),'left', aTimes);
			}else{
				idx == 0 ? idx = li.last().index() : idx = idx-1 ;
				self.slideAni( li.eq(idx),'right', aTimes);
			}
			self.isArrow = true;
		}).off('mousedown').on('mousedown', function(e){
		});
		//
		indi.off('click').on('click', function(e){
			e.preventDefault();
			if( li.is(':animated') ) return false;
			var idx =  $(this).index();
			if( idx == indi.filter('.on').index() ) return false;
			self.slideAni( li.eq(idx),'left', aTimes);
		}).off('mousedown').on('mousedown', function(e){
		});
		//focus
		li.find('a').off('focus').on('focus', function(e){
			self.clearloop();
		});
		//autoplay
		if( this.option.autoplay ){ 
			var playbtn = this.playbtn;
			var isClicked = false;
			playbtn.off('click').on('click', function(e){
				e.preventDefault();
				if( $(this).hasClass('stop') ){
					isClicked = true;
					self.clearloop();
				}else{
					isClicked = false;
					self.loop();
				}
			});
			li.off('mouseenter').on('mouseenter', function(e){
				var nowset = self.isClicked;
				self.clearloop();
				if( !isClicked  ){
					self.playbtn.filter('.play').hide();
					self.playbtn.filter('.stop').show();
				}
				if( nowset ){
					self.playbtn.filter('.play').show();
					self.playbtn.filter('.stop').hide();
				}
			}).off('mouseleave').on('mouseleave', function(e){
				if( playbtn.length < 1 ){ self.loop(); }
				if( playbtn.filter('.stop').is(':visible') ){
					self.loop();
				}
			});
		}
		if( $elem.find('>.tab') ){//portfolio_landing
			$elem.find('>.tab a').off('click').on('click', function(e){
				e.preventDefault();
				if( li.is(':animated') ) return false;
				indi.eq($(this).parent().index()).trigger('click');
			});
		}

	}
});
//
//-------------------lineSlide-------------------
// element : div class=slideWrap
(function($){
	$.fn.shLineslide = function( op ){
		return this.each(function(i){
			var $this = $(this);
			var data = $this.data('shLineslide');
			if( !data ){
				$this.data('shLineslide', (data = new ShLineslide($.extend({'ele':$this},op)) ) );
			}else{
				$this.data('shLineslide').destroy();
				$this.data('shLineslide', (data = new ShLineslide($.extend({'ele':$this},op)) ) );
			}
		});
	}
	$.fn.shLineslide.Constructor = ShLineslide;
}(jQuery));
function ShLineslide( op ){
	this.option = $.extend({
		'ele':$.noop(),
		'autoplay' : false,
		'time': 'Number',
		'set' : 'string'
	},op);
	var $elem = $(this.option.ele);
	this.arrow = $elem.find('.indicator>a').not('.controll, .stop, .play');
	this.playbtn = $elem.find('.indicator>a').filter('.controll, .stop, .play');
	this.isMouse = false;
	this.isArrow = false;
	this.setCss();
	this.start();
	if( this.option.autoplay ){
		this.loop();
	}
}
//
$.extend(ShLineslide.prototype,{
	destroy : function(){
		var $elem = $(this.option.ele);
		var li = $elem.find('>ul li');
		this.clearloop();
		$elem.removeData('shLineslide');
		li.css({
			'position':'absolute'
		});
		li.eq(0).css('top',0+'px');
		li.not(':eq(0)').css('top', li.height()+'px');//.hide();
		if( $elem.is(':hidden') ){
			$elem.css('visibility','hidden').show().removeAttr('style');
			li.eq(0).css('top',0+'px');
		li.not(':eq(0)').css('top', li.height()+'px');//.hide();
		}
	},
	setCss : function(){
		var $elem = $(this.option.ele);
		var li = $elem.find('>ul li');
		li.css({
			'position':'absolute'
		});
		li.eq(0).css('top',0+'px');
		li.not(':eq(0)').css('top', li.height()+'px');//.hide();
		if( $elem.is(':hidden') ){
			$elem.css('visibility','hidden').show().removeAttr('style');
			li.eq(0).css('top',0+'px');
		li.not(':eq(0)').css('top', li.height()+'px');//.hide();
		}
	},
	loop : function(){
		var self = this;
		self.playbtn.filter('.play').hide();
		self.playbtn.filter('.stop').show();
		var $elem = $(this.option.ele);
		var arrow = this.arrow;
		var aTimes = this.option.time;
		this.times = setInterval(function(){
			if( $elem.find('>ul li').length < 2 ) return false;
			if( $elem.find('>ul li').is(':animated') ) return false;
			var idx = $elem.find('>ul li').filter(function(){ if( parseInt($(this).css('top')) === 0 ){ return $(this);} }).index();
			idx == $elem.find('>ul li').length -1 ? idx = 0 : idx = idx+1;
			self.slideAni( $elem.find('>ul li').eq(idx),'top', aTimes);
		},5000);
	},
	clearloop : function(){
		var self = this;
		self.playbtn.filter('.play').show();
		self.playbtn.filter('.stop').hide();
		clearInterval( self.times );
	},
	slideAni : function( nElm, dir ,t ){
		var self = this;
		var $elem = $(this.option.ele);
		var nowElm = $elem.find('>ul li').filter(function(){ if( parseInt($(this).css('top')) === 0 ){ return $(this);} });
		var eHei = nowElm.height();
		if( $elem.find('>ul li').length < 2 ) return false;
		var m = -1, n = 1;
		if( dir == 'top' ){
			m = -1; n = 1;
		}else{
			m = 1; n = -1;
		}
		if( typeof t !== "number"){
			t = 200;
		}

		nowElm.stop().animate({'top' : eHei*m+'px'},t);
		nElm.show().css('top',eHei*n+'px').stop().animate({'top' : 0+'px'}, t, function(){
		});
	},
	start : function(){
		var self = this;
		var $elem = $(this.option.ele);
		var arrow = this.arrow;
		var indi = this.indi;
		var aTimes = this.option.time;
		//
		arrow.off('click').on('click', function(e){
			e.preventDefault();
			if( $elem.find('>ul li').is(':animated') ) return false;
			var idx = $elem.find('>ul li').filter(function(){ if( parseInt($(this).css('top')) === 0 ){ return $(this);} }).index();
			if( $(this).hasClass('next') ){
				idx == $elem.find('>ul li').length -1 ? idx = 0 : idx = idx+1;
				self.slideAni( $elem.find('>ul li').eq(idx),'top', aTimes);
			}else{
				idx == 0 ? idx = $elem.find('>ul li').last().index() : idx = idx-1 ;
				self.slideAni( $elem.find('>ul li').eq(idx),'down', aTimes);
			}
			self.isMouse = false;
		}).off('mousedown').on('mousedown', function(e){
			self.isMouse = true;
		}).off('focusin').on('focusin', function(e){
			if( !self.isMouse ){
				self.clearloop();
			}			
		});
		
		//focus
		$elem.find('>ul li a').off('focus').on('focus', function(e){
			self.clearloop();
		});
		//autoplay
		if( this.playbtn.length > 0 ){
			var playbtn = this.playbtn;
			var isClicked = false;
			playbtn.off('click').on('click', function(e){
				e.preventDefault();
				if( $(this).hasClass('stop') ){
					isClicked = true;
					self.clearloop();
				}else{
					isClicked = false;
					self.loop();
				}
			});
			$elem.find('>ul li').off('mouseenter').on('mouseenter', function(e){
				self.clearloop();
				if( !isClicked ){
					self.playbtn.filter('.play').hide();
					self.playbtn.filter('.stop').show();
				}
			}).off('mouseleave').on('mouseleave', function(e){
				//click check
				if( isClicked ) return false;
				self.loop();
			});
		}
		

	}
});

/****************************************************************
* 키보드 탭 컨트롤 & 포커스 저장
****************************************************************/
window.tab = {tabTarget: []};

window.tab.getTab = function (keydownEvent)
{
    var e = keydownEvent,
        isDown;

    if (e.keyCode === 9)
	{
        isDown = (e.shiftKey) ? false : true;
    }
	else
	{
        isDown = undefined;
    }

    return isDown;
};

window.tab.setTarget = function(target)
{
    this.tabTarget.push(target);
};

window.tab.getTarget = function()
{
    return this.tabTarget.pop();
};

/****************************************************************
* 달력
*
* _btn 달력과 연결할 버튼 element
* _options 오브젝트
*	only    		- 한 페이지에 한 달력이 열릴지 유무
*	zindex  		- 열릴 때 뎁스
*	input 			- 일 클릭 이벤트를 전달해줄 인풋
*	isDisable 		- 비활성화 여부
*	isHiddenDate 	- 이전 다음 일 표시여부
*	todayClass 		- 오늘날짜 표시 클래스 "." 제외
*
* 메서드
*
*	var instance = $(target).getInstance();
*
*   instance.getDate();               //날짜 반환
*   instance.setDate(2015, 1, 2);     //날짜 지정 2015년 1월 2일
*
* 이벤트
*
*	//월 변경
*   $(input or target).on("change.calendar", function (e, param) {});
*
*	//날짜 선택
*	$(input or target).on("select.calendar", function (e, param) {});
*
*	//달력 생성시
*	$(_btn).on("select.complete", function (e) {});
*
****************************************************************/
var WCalendar = (function ($)
{
    var wddoObj = function (_btn, _options)
	{
        var scope;                          // 스코프
        var $btn = _btn;                    // 달력버튼
        var $target;                        // 컨테이너
        var $month;                         // 월 표시 태그
        var $prev;                          // 이전 버튼
        var $next;                          // 다음 버튼
        var $close;                         // 닫기 버튼
		var $today;							// 오늘 버튼
        var $dayTR;                         // 날짜 찍히는 TR (월이 변화할 때 마다 변경)
        var $input;                         // 일 클릭시 전달 받을 input
        var lineNum = 6;					// 날짜가 출력될 라인수
        var startTRNum;                     // 시작 TR 줄수 (영문요일 표시가 thead 가 아닌 tbody에 있을 때를 위해.. 해당 조건이면 값 1)
        var targetSelection;                // 컨테이너 셀렉션
        var now;                            // 현재 날짜
        var current;                        // 이동 날짜
		var todayNow;						// 오늘 날짜
        var opts;                           // 옵션
        var defaults = defaultOptions();    // 기본값
        var zindex;                         // 현재 뎁스

        function defaultOptions()
		{
            return {
                only: true,                 // 한 페이지에 한 달력이 열릴지 유무
                zindex: 840212,             // 열릴 때 뎁스
                input: undefined,			// 일 클릭 이벤트에서 전달 받을 input
                isDisable: false,           // 비활성화 여부
                isHiddenDate : true,        // 이전 다음 일 표시여부
                todayClass : "today"        // 오늘날짜 표시 클래스 "." 제외
            }
        }

        function init()
		{
            opts = $.extend(defaults, _options);

            current = new Date();
            now = new Date();
			todayNow = new Date();

            createLayout();
            createDate();
            changeMonth();
            changeToday();
            initEvent();
            //2016-06-03
            //hide();

            $target.data("scope", scope);
			$btn.trigger("complete.calendar");
		
        }

        //레이아웃 생성
        function createLayout()
		{
            targetSelection = ".calendar";
			var SHINVEST_GW={}; SHINVEST_GW.isEng = false;
			if (!SHINVEST_GW.isEng) { // 2016-07-19 년도 버튼 추가
				$btn.after(	"<div class='calendar'>" +
							"<div class='calTerm'><button type='button' class='term first'>이전 년도</button>" +
							"<button type='button' class='prev'>이전 달</button>" +  /////////////////
							"<em></em><button type='button' class='next'>다음 달</button>" + /////////////////
							"<button type='button' class='last'>다음 년도</button></div>"+ /////////////////
							"<table class='tblCalendar' summary='달력 테이블은 일요일,월요일,화요일,수요일,목요일,금요일,토요일 요일별 날짜를 선택하실 수 있습니다.'>" +
							"<caption>달력 날짜 선택</caption><thead><tr><th scope='col' class='sun'>일</th><th scope='col'>월</th><th scope='col'>화</th><th scope='col'>수</th>" +
							"<th scope='col'>목</th><th scope='col'>금</th><th scope='col' class='sat'>토</th></tr></thead><tbody></tbody></table>" +
							"<button type='button' class='close'>달력 닫기</button>"
						  );
			}
			else
			{
				$btn.after(	"<div class='calendar'>" +
							"<div class='calTerm'><button type='button' class='term first'>Previous year</button><button type='button' class='term prev'>Previous momth</button>" +
							"<em></em><button type='button' class='term next'>Next year</button><button type='button' class='term last'>Next momth</button></div>" +
							"<table cellpading='0' cellspacing='0' summary='you can choose a date by days of the calendar'>" +
							"<caption>Date select calendar</caption><thead><tr><th scope='col' class='sun'>Sun</th><th scope='col'>Mon</th><th scope='col'>Tue</th><th scope='col'>Wed</th>" +
							"<th scope='col'>Thur</th><th scope='col'>Fri</th><th scope='col' class='sat'>Sat</th></tr></thead><tbody></tbody></table>" +
							"<div class='btns'><button type='button' class='kbBtn btnXS'>Today</button><button type='button' class='kbBtn btnXS'>Close</button></div></div>"
						  );
			}

            $target = $btn.siblings(targetSelection);
            $month = $target.find(".calTerm > em");
            $prev = $target.find(".calTerm > button.prev");
            $next = $target.find(".calTerm > button.next");
			// 2016-07-19 년도 버튼 추가
			$yearPrev = $target.find(".calTerm > button.first");
			$yearNext = $target.find(".calTerm > button.last");
			//
            $close = $target.find("button.close");
			$today = $target.find(".btns > button.btnXS:eq(1)");

            $input = (opts.input !== undefined) ? opts.input : jQuery.fn;

            zindex = $target.css("z-index");
            startTRNum = $target.find("tbody > tr").length;

        }

        //이벤트 적용
        function initEvent()
		{
            $btn.off("click.calendar").on("click.calendar", function (e)
			{
                if (!opts.isDisable)
				{
                    if ($target.filter(":hidden").length > 0)
					{
						if( $input.val() ){
							var dateArr = $input.val().split(".");
							$(this).next().calgetInstance().setDate(dateArr[0], dateArr[1], dateArr[2]);
						}
                        show();
                        window.tab.setTarget($(this)[0]);
                    }
					else
					{
                        hide();
                    }
                }
                e.preventDefault();

            });
            //add 20160427 sss
			$input.off("click.calendar").on("click.calendar", function(e){
				//$btn.trigger("click.calendar");
			});

            $next.off("click.calendar").on("click.calendar", function (e)
			{
                var target = (e.currentTarget);

                cm(1);

                e.preventDefault();
            });

            $prev.off("click.calendar").on("click.calendar", function (e)
			{
                var target = (e.currentTarget);

                cm(-1);

                e.preventDefault();
            });
            // 2016-07-19 년도 버튼 추가
            $yearPrev.off("click.calendar").on("click.calendar", function (e)
			{
                var target = (e.currentTarget);

                cy(-1);

                e.preventDefault();
            });
            $yearNext.off("click.calendar").on("click.calendar", function (e)
			{
                var target = (e.currentTarget);

                cy(1);

                e.preventDefault();
            });
            //
            $close.off("click.calendar").on("click.calendar", function (e)
			{
                hide();

                e.preventDefault();
            });

			//오늘 클릭
			$today.off("click.calendar").on("click.calendar", function (e)
			{
				scope.setDate(todayNow.getFullYear(), todayNow.getMonth() + 1, todayNow.getDate());

				e.preventDefault();
            });

            //일 클릭
            $target.find("tbody").off("click.calendar").on("click.calendar", "button", function (e)
			{
                selectDate(current.getFullYear(), current.getMonth(), $(this).text());
                ctc($(this).text());

                e.preventDefault();
            });

        }

		//click to close
		function ctc(date)
		{
			changeToday();
			hide();
			$target.add($input).trigger("select.calendar", [current.getFullYear()+'.', force2Digits(current.getMonth() + 1)+'.', force2Digits(parseInt(date)), now]);
			//add 20160428
			$input.trigger('change');

			var tt = window.tab.getTarget();
			if (tt !== undefined) tt.focus();
		}

		//change month
		function cm(n)
		{
			current.setMonth(current.getMonth() + n);

			removeDate();
			createDate();
			changeMonth();
			changeToday();

			$target.add($input).trigger("change.calendar", [current.getFullYear(), force2Digits(current.getMonth() + 1)]);
		}

		// 2016-07-19 년도 버튼 추가
		function cy(n)
		{
			current.setFullYear(current.getFullYear() +n);

			removeDate();
			createDate();
			changeMonth();
			changeToday();

			$target.add($input).trigger("change.calendar", [current.getFullYear(), force2Digits(current.getMonth() + 1)]);
		}

        //달력 외 영역 이벤트
        function addDocumentEvent()
		{
            $(document).on("mousedown.calendar focusin.calendar touchstart.calendar", function (e)
			{
                if ($(e.target).closest(targetSelection).length ===  0 && $(e.target).get(0) !== $btn.get(0) && $(e.target).get(0) !== $input.get(0))
				{
                    //closeAll();

                    hide();
                }
            });
        }

        function removeDocumentEvent()
		{
            $(document).off("mousedown.calendar focusin.calendar touchstart.calendar");
        }

        //날짜 생성
        function createDate()
		{
            //이전달 변수
            var prevDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
            var prevMonth = prevDate.getMonth();
            var prevDayArr = [];

            //현재달 변수
            var date = new Date(current.getFullYear(), current.getMonth(), 1); //새로운 date 객체
            var tbody = $target.find("tbody");

            //일 빈공간 생성
            var i = 0;
            var max = lineNum * 7; //최대 줄수 만큼의 일 갯수 (6*7)
            for (; i < max; i += 1)
			{
                if ((i % 7) === 0) tbody.append("<tr></tr>");

                tbody.find("tr:last").append("<td></td>");
            }

            //일 채워 넣기
            i = 1;
            max = max - 1; //for문이 1부터 시작이므로 -1

            date.setDate(1); //아래 비교를 위해 1일 셋팅
            var startTRIndex = ((date.getDay() === 0 && opts.isHiddenDate) ? 1 : 0);  //1일이 일요일 이고 전이후날 표시속성이 true면 한줄 여유두고 출력하기위해 1

            var targetTR = tbody.find("> tr:eq(" + (startTRIndex + startTRNum) + ")"); //몇번째 tr 부터 숫자 입력될지 지정
            var idx, td;
            for (; i <= max; i += 1)
			{
				//새로운 date 1씩 증가
                date.setDate(i);

				//새로운 date와 비교하여 월이 같으면.. 즉, current 일수 만큼 반복
                if (date.getMonth() === current.getMonth())
				{
					//요일 0(일)~6
                    idx = date.getDay();

					//줄 내림
                    if (date.getDay() === 0 && i !== 1) targetTR = targetTR.next();

					//날짜 입력
                    td = targetTR.find("> td").eq(idx).append("<button type='button'></button>").find("> button").text(i).end();

					//일
                    if (date.getDay() === 0) td.addClass("sun");

					//토
                    if (date.getDay() === 6) td.addClass("sat");
                }

                //이전달도 같이 셋팅하여 일수를 배열에 저장
                prevDate.setDate(i);

				//전달 일자 저장, prevDate.length : 전달총 일수
                if (prevDate.getMonth() === prevMonth) prevDayArr.push(i);
            }

            if (opts.isHiddenDate)
			{
                //입력을 위해 반전
                prevDayArr.reverse();

                //날짜 박힐 tr 갱신
                $dayTR = tbody.find("> tr").filter(function ()
				{
                    return $(this).index() >= startTRNum;
                });

                //이전달 비어있는 일(TD) 저장
                var prevTD = $dayTR.filter(":first").find("td").filter(function ()
				{
                    return $(this).text().length === 0;
                });

                //저장된 비어있는 TD에 이전달 출력
                $(prevTD.get().reverse()).each(function (i)
				{
                    $(this).append("<span>" + prevDayArr[i] + "</span>");
                });

                //다음달 비어있는 일(TD) 저장
                var nextTD = tbody.find("tr > td").filter(function ()
				{
                    return $(this).text().length === 0;
                });

                //저장된 비어있는 TD에 다음달 출력 (이전달과는 달리 무조건 1부터 출력)
                nextTD.each(function (i)
				{
                    $(this).append("<span>" + (i+1) + "</span>");
                });
            }
			else
			{
                //일 채워 넣고 남은 빈tr 삭제
                tbody.find("tr").filter(function ()
				{
                    return $(this).text().length === 0;
                }).remove();

                //날짜 박힐 tr 갱신
                $dayTR = tbody.find("> tr").filter(function ()
				{
                    return $(this).index() >= startTRNum
                });
            }
        }

        //날짜 삭제
        function removeDate()
		{
            $dayTR.remove();
        }

        //날짜 선택 시
        function selectDate(_year, _month, _date)
		{
            now.setFullYear(_year);
            now.setMonth(_month);
            now.setDate(_date);
        }

        //오늘 변경
        function changeToday(_date)
		{
            var tbody = $target.find("tbody");

            if (now.getFullYear() === current.getFullYear() && now.getMonth() === current.getMonth())
			{
                $dayTR.find("td").removeClass(opts.todayClass).find("> button").eq(now.getDate() - 1).parent().addClass(opts.todayClass);   
            }
        }

        //월 변경
        function changeMonth()
		{
            $month.text(current.getFullYear() + "." + force2Digits(current.getMonth() + 1));
        }

        //보이기
        function show()
		{
            $target.show();
            $target.css("z-index", opts.zindex);
			$target.closest(".calWrap").css("z-index","9999").addClass("on"); //2015-07-17 추가
            if (opts.only) addDocumentEvent(); // 마우스 사용자를 위한
        }

        //숨기기
        function hide()
		{

            $target.hide();

            $target.css("z-index", zindex);
			$target.closest(".calWrap").css("z-index","99").removeClass("on"); //2015-07-17 추가

            if (opts.only) removeDocumentEvent();
        }

        function closeAll()
		{
            $(targetSelection).each(function ()
			{
                $(this).calgetInstance().setHide();
            });
        }

        //숫자 1자릿수 앞에 0 붙이기
        function force2Digits(value)
		{
            return (value < 10) ? "0" + value.toString() : value.toString();
        }

        //public
        this.init = function ()
		{
            scope = this;

            if ($btn.length === 0) return;

            init() ;
        };

        this.getDate = function ()
		{
            return now;
            //return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        };

        this.setDate = function (_year, _month, _date)
		{
            now.setFullYear(_year);
            now.setMonth(_month - 1);
            now.setDate(_date);

            current.setFullYear(_year);
            current.setMonth(_month - 1);
            current.setDate(_date);

            removeDate();
            createDate();
            changeMonth();
            changeToday();
			$target.add($input).trigger("select.calendar", [current.getFullYear()+'.', force2Digits(current.getMonth() + 1)+'.', force2Digits(parseInt(current.getDate())), now]);
        };

        this.setHide = function ()
		{
            hide();
        };

        this.setDisable = function (value)
		{
            opts.isDisable = value;
        };

        if (jQuery.fn.calgetInstance === undefined) jQuery.fn.calgetInstance = function ()
		{
			return this.data("scope");
		};
    };// end Obj

    return wddoObj;
}(jQuery));


/****************************************************************
* 딤 팝업 열기
* id 열고자 하는 div 팝업의 아이디
* _btn 돌아갈 포커스 element
****************************************************************/
jQuery.openDimPop = function (id, _btn)
{
	var btn = _btn;										// 팝업 닫을 때 돌아갈 포커스 대상
	var divPop =  $("#" + id);							// 팝업 아이디
	var dimmed = $(".dimmed");				// 딤
	var container = divPop.closest("div.container");	// z-index 조정을 위한 컨테이너
	var wrapper = divPop.closest("div#wrapper");	// z-index 조정을 위한 컨테이너
	var focusSelector = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])," + "button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
	var focusElement = divPop.find(focusSelector);
	var oldPop = $(document).find(".popLayer").not(":hidden");

	if (btn !== undefined)
	{
		window.tab.setTarget(btn);
	}
	else
	{
		//돌아갈 포커스 대상이 없을 때 2중 팝업시 이전 팝업으로 포커스 돌아가게 추가
		if (oldPop.length > 0) window.tab.setTarget(oldPop.filter(":last").find(focusSelector).filter(":first"));
	}
	
	divPop.show();
	dimmed.show();
	if( !divPop.closest('#wrapper').hasClass('guideWrap') ){
		container.css("z-index", 1000);
		wrapper.css("z-index", 10001);
		$("a.pageTop").css("z-index", 1001);
	}	
	focusElement.filter(":first").focus();
	addContentEvent(divPop);
	addKeyEvent();
	setTimeout(function(){  
		addContentEvent(divPop);
	},1);

	function hasVerticalScroll(node)
	{
		if (node == undefined)
		{
			if ($(window).height())
			{
				return $(document).height() > $(window).height();
			}
			else
			{
				return document.documentElement.scrollHeight >
					document.documentElement.offsetHeight ||
					document.body.scrollHeight > document.body.offsetHeight;
			}
		}
		else
		{
			return node.scrollHeight > node.offsetHeight;
		}
	}

	// 팝업 위치, 닫기 이벤트 
	function addContentEvent($pop)
	{
		var h = $pop.outerHeight();
		if( $pop.hasClass('newGuide_pop') ){
			$pop.css('top', '50%');
			$pop.css('marginTop', -Math.floor(h / 2)+'px');
			$pop.css('position','fixed');
			return false;
		}
		// 팝업 정렬
		$pop.css(
		{
			"marginTop"	   : -Math.floor(h / 2)
		});
	}

	// 팝업에 포커스 이동을 위한 키보드 이벤트 적용
	function addKeyEvent()
	{
		focusElement.filter(":last").on("keydown.initPop", function (e)
		{
			if (window.tab.getTab(e))
			{
				focusElement.filter(":first").focus();
				e.preventDefault();
			}
		});

		focusElement.filter(":first").on("keydown.initPop", function (e)
		{
			if (window.tab.getTab(e) === false)
			{
				focusElement.filter(":last").focus();
				e.preventDefault();
			}
		});

	}

} // end openDimPop

/****************************************************************
* 딤 팝업 닫기
* id 열고자 하는 div 팝업의 아이디
****************************************************************/
jQuery.closeDimPop = function (id)
{
	var divPop =  $("#" + id);							// 팝업 아이디
	if( id === undefined ) divPop = $('.popLayer:visible');
	var container = divPop.closest("div.container");	// z-index 조정을 위한 컨테이너
	var wrapper = divPop.closest("div#wrapper");
	var dimmed = $(".dimmed");				// 딤
	var focusSelector = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])," + "button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
	var focusElement = divPop.find(focusSelector);
	var btn = window.tab.getTarget();
	var oldPop;

	divPop.hide();
	dimmed.hide();

	oldPop = $(document).find(".popLayer").not(":hidden");

	if (oldPop.length === 0)
	{
		container.css("z-index", "");
		wrapper.css("z-index", "");
		$("a.pageTop").css("z-index", ""); 
	}

	if (btn !== undefined)
	{
		btn.focus();
	}

	// 팝업 키보드 이벤트 삭제
	focusElement.filter(":last").off("keydown.initPop");

	focusElement.filter(":first").off("keydown.initPop");

	// 팝업 마우스 이벤트 삭제
	if (oldPop.length === 0) {
		$(document).off(".initPop");
		$(window).triggerHandler("resize.initPop");
		$(window).off(".initPop");
	}
} // end closeDimPop


/****************************************************************
* String 유틸
****************************************************************/
var StringUtil = {
	/****************************************************************
	* 문자열 전체를 특정 문자를 선택하여 변경
	* str 문자열
	* oldSubStr 변경될 문자
	* newSubStr 변경된 문자
	* return 새로운 문자열
	****************************************************************/
	setReplace: function(str, oldSubStr, newSubStr)
	{
		return str.split(oldSubStr).join(newSubStr);
	},

	/****************************************************************
	* 문자열 앞뒤 여백을 제거 할때 유용
	* str 문자열
	* char 변경할 문자
	* return 새로운 문자열
	****************************************************************/
	setTrim: function(str, char)
	{
		return StringUtil.setTrimBack(StringUtil.setTrimFront(str, char), char);
	},

	/****************************************************************
	* 문자열 앞쪽 여백제거 할때 유용
	* str 문자열
	* char 변경할 문자
	* return 새로운 문자열
	****************************************************************/
	setTrimFront: function(str, char)
	{
		char = StringUtil.getFirstCharacter(char);
		if (str.charAt(0) == char) {
			str = StringUtil.setTrimFront(str.substring(1), char);
		}
		return str;
	},

	/****************************************************************
	* 문자열 뒤쪽 여백제거 할때 유용
	* str 문자열
	* char 변경할 문자
	* return 새로운 문자열
	****************************************************************/
	setTrimBack: function(str, char)
	{
		char = StringUtil.getFirstCharacter(char);
		if (str.charAt(str.length - 1) == char) {
			str = StringUtil.setTrimBack(str.substring(0, str.length - 1), char);
		}
		return str;
	},

	/****************************************************************
	* 문자열 앞쪽 한글자씩 반환하는 메소드
	* str 문자열
	* return 맨앞문자반환
	****************************************************************/
	getFirstCharacter: function(str) {
		if (str.length == 1) {
			return str;
		}
		return str.slice(0, 1);
	}
}

//G-MAP INDEX 조회 toggle
$(document).ready(function(){
	$('dl.leftProdList > dt a').on('click', function(e) {
		$('dl.leftProdList > dd').css('display','none');
		$(this).parent().next().css('display','block');
		$('dl.leftProdList > dt').removeClass('on');
		$(this).parent().addClass('on');
		return false;
	});
});