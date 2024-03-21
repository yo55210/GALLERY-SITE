


const ham = document.querySelector(".js_hamburger");
const nav = document.querySelector(".js_navigation");
const body = document.querySelector(".js_body");


//ハンバーガーをクリックしたら
ham.addEventListener("click", () => {
//それぞれに対してクラスをつけ外しする
  ham.classList.toggle("active");
  nav.classList.toggle("active");
  body.classList.toggle("active");
});

const navLinks = document.querySelectorAll(".l_header-nav_link");
navLinks.forEach(navLink => {
    navLink.addEventListener("click", () => {
        ham.classList.remove("active");
        nav.classList.remove("active");
        body.classList.remove("active");
    });
});

$(function() {
  // スムースScroll
// ページ内リンクのイベント
$('a[href^="#"]').click(function(){
  // リンクを取得
  let href= $(this).attr("href");
  // ジャンプ先のid名をセット
  let target = $(href == "#" || href == "" ? 'html' : href);
  // トップからジャンプ先の要素までの距離を取得
  let position = target.offset().top;
  // animateでスムーススクロールを行う
  // 600はスクロール速度で単位はミリ秒
  $("html, body").animate({scrollTop:position}, 600, "swing");
  return false;
});

// フェード表示
$(".inview").on("inview", function( event, isInView) {
  if (isInView) {
    // 要素（inviewクラス)が表示されたらshowクラスを追加する
    $(this).stop().addClass("show");
  }
});

// Scroll時のイベント
$(window).scroll(function() {
  // Scroll位置を取得
  let scroll = $(window).scrollTop();

  // メインビジュアルの拡大縮小
  mv_scale(scroll);
  // ロゴ、ハンバーガーの表示
  if (scroll > 520) {
    $('.l_header-logo').fadeIn(500);
    $('.m_hamburger').fadeIn(500);
    // Scroll位置が520px未満の場合
  }else {
    // ロゴとハンバーガーメニューをfadeoutで非表示
    $('.l_heeader-logo').fadeOut(500);
    $('m_hamburger').fadeOut(500);
  }

    /*=================================================
    サイドボタンを表示
    ===================================================*/
    // 画面下から#galleryまでの距離を取得
    let gallery_position = $('.top_gallery').offset().top - $(window).height();
    // 画面下から#accessまでの距離を取得
    let access_position = $('.top_access').offset().top - $(window).height();

    // window.innerWidthで画面幅を取得
    // PC表示の場合の処理（画面幅が900pxより大きい場合　※900pxはCSSのブレークポイントとあわせる）
    if (window.innerWidth > 900) {
      // #galleryが表示された場合（スクロール位置が、画面下から#galleryまでの距離を超えた場合）
      if(scroll > gallery_position){
        // #accessが表示されるまでの間は、#side-btnを横からスライドさせて表示する
        if(scroll < access_position){
          $('.side-btn').css({
            'transform': 'rotate(-90deg) translateY(0)'
          });
        // #accessが表示されたら、#side-btnをスライドさせて非表示にする
        } else {
          $('.side-btn').css({
            'transform': 'rotate(-90deg) translateY(60px)'
          });
        }
      // #galleryが表示される前は、#side-btnをスライドさせて非表示にする
      } else {
        $('.side-btn').css({
          'transform': 'rotate(-90deg) translateY(60px)'
        });
      }
    }
     /*=================================================
    Accessの背景画像を表示
    ===================================================*/
    // 画面下から#contactまでの距離を取得
    let contact_position = $('.top_contact').offset().top - $(window).height();

    // #accessが表示された場合
    if(scroll > access_position){
      // #contactが表示されるまでの間は、背景画像をfadeInで表示する
      if(scroll < contact_position){
        $('.bg').fadeIn(500);
      } else {
        $('.bg').fadeOut(500);
      }
    // #accessが表示される前の場合
    } else {
      // 背景画像を表示しない
      $('.bg').fadeOut(500);
    }
  });

// 画面読み込み画面変更時
$(window).on('load resize', function() {
  let scroll = $(window).scrollTop();

  mv_scale(scroll);
});
});


// メインビジュアルの拡大縮小
function mv_scale(scroll) {
  if (window.innerWidth > 900) {
    $('.top_kv_img-wrapper').css({
      'width': 100/3 + scroll/10 + '%'
    });
  } else {
    $('.top_mv_img-wrapper').css({
      'width': 100 - scroll/10 + '%'
    });
  }
}
