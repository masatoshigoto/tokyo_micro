(function($) {

  const mqSP = 768,
        sideW = 390;

  let windowH = $(window).height(),
      windowW = $(window).width(),
      mqSPmatch = window.matchMedia('(max-width:'+mqSP+'px)').matches,
      clickEvent = 'click',
      scroll = 0,
      sp_header_h = 0,
      tl_0 = '',
      tl_1 = '',
      tl_2 = '',
      loopSliderW = '',
      philosophyTop,
      aboutTop,
      historyTop,
      groupTop,
      environmentTop,
      saleTop,
      productionTop,
      overseasTop;

  sideMenuFixed();
  SPcontentsPaddingTop();
  loopSliderinit();
  sectionTop();
  productListNameHeight();
  SPtopBgTop();

  if($('#contents').hasClass('page_company')){
    $('#nav_company').addClass('on');
  }else if($('#contents').hasClass('page_service')){
    $('#nav_service').addClass('on');
  };

  $(window).on('resize', function(){
    windowH = $(window).height(),
    windowW = $(window).width();

    mqSPmatch = window.matchMedia('(max-width:'+mqSP+'px)').matches;

    sideMenuFixed();
    SPcontentsPaddingTop();
    // loopSliderinit();
    sectionTop();
    productListNameHeight();
  });

  $(window).on('scroll', function(){
    scroll = $(this).scrollTop();

    sideMenuFixed();
    navActive();
  });

  $(window).on('resize', function(){
    sectionTop();
  });

  // PC・スマホ判定
  const ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
      // スマートフォン
      clickEvent = 'touchend';
      removeJsHover();
  } else if (ua.indexOf('iPad') > -1 || ua.indexOf('Android') > -1) {
      // タブレット
      clickEvent = 'touchend';
      removeJsHover();
  } else {
      // PC
      clickEvent = 'click';
  }

  // スムーススクロール
  $('a[href*="#"]').click(function() {
    if(location.pathname.replace(/^\//, '')!==this.pathname.replace(/^\//, '') || location.hostname!==this.hostname) return;
    var href= $(this).attr("href");
    if(href != "#" && href != ""){
        const speed = 400;
        const target = $(this.hash);
        const position = target.offset().top;
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    }
  });

  // ホバーイベントを消す
  function removeJsHover(){
    $('.js-hover').each(function(){
      $(this).removeClass('js-hover');
    });
  }

  // SP ヘッダー分コンテンツを下げる
  function SPcontentsPaddingTop(){
    if(mqSPmatch){
      sp_header_h = $('.sp_header').innerHeight();
      $('.sec_top').css('padding-top', sp_header_h + 'px');
    }
  }

  /**
   * サイド・SPヘッダーメニュー
   */
  // サイドのトグルメニュー
  if(! mqSPmatch){
    $('.js-dropdown_toggle').each(function(){
      if($(this).hasClass('on')){
        $(this).next('.js-dropdown_menu').slideDown();
      }
    });
  
    $('.js-dropdown_toggle').on('click', function(){
      if($(this).hasClass('on')){
        $(this).removeClass('on').next('.js-dropdown_menu').slideUp();
      }else{
        $(this).addClass('on').next('.js-dropdown_menu').slideDown();
      }
      return false;
    });
  }

  // PCサイドメニュー固定
  function sideMenuFixed(){
    const footer_top = $('#footer').offset().top;

    if(! mqSPmatch && footer_top >= scroll + windowH){
      $('#side').addClass('fixed');
    }else{
      $('#side').removeClass('fixed');
    }
  }

  // SP ヘッダーナビ
  $('.js-burger_toggle').on('click', function(){
    if($('#side').hasClass('open')){
      $('#side').removeClass('open');
      $('.sp_header').css('position', '');
      $('body').css('position', '');
      $('.sp_nav').fadeOut();
    }else{
      sp_header_h = $('.sp_header').innerHeight();
      $('#side').addClass('open');
      $('.sp_header').css('position', 'fixed');
      $('body').css('position', 'fixed');
      $('.sp_nav').css('padding-top', sp_header_h + 'px').fadeIn();
    }
    return false;
  });

  // サイドメニュー アクティブ判定
  function sectionTop(){
    if(! mqSPmatch){
      if($('#contents').hasClass('page_company')){
        philosophyTop = $('#philosophy').offset().top;
        aboutTop = $('#about').offset().top;
        historyTop = $('#history').offset().top;
        groupTop = $('#group').offset().top;
        environmentTop = $('#environment').offset().top;
      }else if($('#contents').hasClass('page_service')){
        saleTop = $('#sale').offset().top;
        productionTop = $('#production').offset().top;
        overseasTop = $('#overseas').offset().top;
      }
    }

    navActive();
  }

  function navActive(){
    const scrollTop = scroll;

    if(! mqSPmatch && $('#contents').hasClass('page_company')){
      if(scrollTop >= philosophyTop && aboutTop > scrollTop){
        navActiveReset('nav_philosophy');
      }else if(scrollTop >= aboutTop && groupTop > scrollTop){
        navActiveReset('nav_about');
      }else if(scrollTop >= groupTop && historyTop > scrollTop){
        navActiveReset('nav_group');
      }else if(scrollTop >= historyTop && environmentTop > scrollTop){
        navActiveReset('nav_history');
      }else if(scrollTop >= environmentTop && $('#footer').offset().top > scrollTop){
        navActiveReset('nav_environment');
      }
    }else if(! mqSPmatch && $('#contents').hasClass('page_service')){
      if(scrollTop >= saleTop && productionTop > scrollTop){
        navActiveReset('nav_sale');
      }else if(scrollTop >= productionTop && overseasTop > scrollTop){
        navActiveReset('nav_production');
      }else if(scrollTop >= overseasTop && $('#footer').offset().top > scrollTop){
        navActiveReset('nav_overseas');
      }
    }else{
      navActiveReset(null);
    }
  }

  function navActiveReset(id){
    $('.js-nav_active').each(function(){
      if($(this).attr('id') === id){
        $(this).addClass('active');
      }else{
        $(this).removeClass('active');
      }
    });
  }

  /**
   * トップページ
   */
  // 導入動画
  const keyName = 'visited';
  const keyValue = true;

  if($('#main').find('.js-landing_video').length){
    if (!sessionStorage.getItem(keyName)) {
        sessionStorage.setItem(keyName, keyValue);

        //初回アクセス時の処理
      $('.js-landing_video').get(0).addEventListener('ended', function() {
        $(this).parent('.landing').fadeOut().delay(1800).queue(function(){
          $('.page_home .sec_top .content').addClass('js-start');
        });
      });
    } else {
        //通常アクセス時の処理
        $('.landing').css('display', 'none').remove().delay(500).queue(function(){
          $('.page_home .sec_top .content').addClass('js-start');
        });
    }
  }

  // ループスライダー
  function loopSliderinit(){
    $('.page_home .slider_list').each(function(i){
      loopSlider(i);
    });
  }

  function loopSlider(i){
    const mainWidth = windowW;
    loopSliderW = $('.loop_slider').width();

    // if(((mainWidth) * 2) > loopSliderW) {
      setInfiniteAnimation(mainWidth, i);
    // }
  }

  function setInfiniteAnimation(mainWidth, i){
    const blockWidth = $('.slider_item').width(); // Block１つあたりの横幅
    const reqBlockNum = Math.ceil(((mainWidth) * 2) / blockWidth); // 必要な最低ブロック数

    let slider_list = '.slider_list_'+i;
    let slider_item = slider_list+' .slider_item';

    let tl = '';
    if(i === 0){
      // Timelineのインスタンスが生成されている場合は初期化
      if(tl_0 !== '') {
        tl_0.pause(0, true);
        tl_0.remove();
      }
      tl = tl_0;
    }else if(i === 1){
      // Timelineのインスタンスが生成されている場合は初期化
      if(tl_1 !== '') {
        tl_1.pause(0, true);
        tl_1.remove();
      }
      tl = tl_1;
    }else if(i === 2){
      // Timelineのインスタンスが生成されている場合は初期化
      if(tl_2 !== '') {
        tl_2.pause(0, true);
        tl_2.remove();
      }
      tl = tl_2;
    }

    
    tl = new TimelineMax();

    // 足らない分だけ複製する処理
    let innsertBlockNum = 0;
    do{
      $(slider_item).clone(true).appendTo($(slider_list));
      innsertBlockNum += $(slider_item).length;

    }while(innsertBlockNum <= reqBlockNum);
    
    loopSliderW = $(slider_list).width();
    
    if(i === 0){
      tl.to(slider_list, 70, {
        x: -($(slider_list).width() / 2), 
        ease:Power0.easeNone, 
        repeat:-1})
    }else if(i === 1){
      tl.to(slider_list, 70, {
        x: ($(slider_list).width() / 2), 
        ease:Power0.easeNone, 
        repeat:-1})
    }else if(i === 2){
      tl.to(slider_list, 70, {
        x: -($(slider_list).width() / 2), 
        ease:Power0.easeNone, 
        repeat:-1})
    }
    tl.play();

    if(i === 0){
      tl_0 = tl;
    }else if(i === 1){
      tl_1 = tl;
    }else if(i === 2){
      tl_2 = tl;
    }
  }
  // トップの回転画像の位置
  function SPtopBgTop(){
    if(mqSPmatch){
      sp_header_h = $('.sp_header').innerHeight();
      $('.sec_top .bg').css('top', sp_header_h + 50 + 'px');
    }
  }

  /**
   * 事業紹介ページ
   */
  // 自社製品の名前の高さを揃える
  function productListNameHeight(){
    $('.page_service .product_list .name').css('height', '');

    if(mqSPmatch) return false;

    let nameH = 0;
    $('.page_service .product_list .name').each(function(){
      if($(this).height() > nameH){
        nameH = $(this).height();
      }
    });

    $('.page_service .product_list .name').css('height', nameH+'px');
  }

})(jQuery);
