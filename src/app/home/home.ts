import {
  AfterViewInit,
  Component,
  OnDestroy,
  Renderer2,
  NgZone,
  OnInit
} from '@angular/core';
import { Header } from '../header/header';
import { Footer } from "../footer/footer";
import { Main } from '../main/main';
declare var $: any;
declare var WOW: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [Header, Footer,Main],
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy,OnInit {
  private unlisteners: Array<() => void> = [];
  private overlayEl: HTMLElement | null = null;
   private STORAGE_KEY = 'app_primary_hex';

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}



  ngOnInit(): void {
  const saved = sessionStorage.getItem(this.STORAGE_KEY);

  if (saved) {
    this.applyHexColor(saved);
  } else {
    const defaultColor = '#42a4ff';
    this.applyHexColor(defaultColor);
    sessionStorage.setItem(this.STORAGE_KEY, defaultColor);

    // Optional: sync the color picker input visually
    const input = document.getElementById('colorPicker') as HTMLInputElement | null;
    if (input) input.value = defaultColor;
  }
}




  ngAfterViewInit(): void {
    // run most jQuery plugin init inside NgZone.runOutsideAngular to avoid change-detection churn
    this.ngZone.runOutsideAngular(() => {
      this.setupPageLoad();
      this.initStickyHeader();
      this.initScrollUp();
      this.initWow();
      this.initStickySidebar();
      this.initSliderRange(); // jQuery UI slider
      this.initHeroSlider();
      this.initCarousels();
      this.fixBootstrapTabs();
      this.initCountdowns();
      this.initProductSliders();
      this.initTestimonialSliders();
      this.initCategoriesSlider();
      this.initCategoryToggle();
      this.initSortBy();
      this.initShopFilter();
      this.initProductDetailsSliders();
      this.initMagnificPopup();
      this.initSelect2();
      this.initCheckoutToggles();
      this.paymentMethodChanged();
      this.initCounterUp();
      this.initIsotope();
      this.sidebarSearch();
      this.mobileHeaderActive(); // uses Renderer2 and registers listeners
      this.initMobileMenuBehavior(); // extra mobile menu behaviors
      this.initLanguageCurrency();
      this.initDemoOptions();
      this.initMoreMenu();
      this.initModalHandlers();
      this.initVTicker();
    });
  }

  /******************************
   * Original "on load" behavior
   ******************************/
  private setupPageLoad(): void {
    try {
      $(window).on('load', () => {
        $('#preloader-active').delay(450).fadeOut('slow');
        $('body').delay(450).css({ overflow: 'visible' });
        // show bootstrap modal if present
        if ($('#onloadModal').length) {
          $('#onloadModal').modal('show');
        }
      });
    } catch (e) {
      // plugin not present or jQuery missing -> ignore
      // console.warn('setupPageLoad failed', e);
    }
  }

  /******************************
   * Sticky header on scroll
   ******************************/
  private initStickyHeader(): void {
    try {
      const header = $('.sticky-bar');
      const win = $(window);
      win.on('scroll.stickyHeader', () => {
        const scroll = win.scrollTop();
        if (scroll < 200) {
          header.removeClass('stick');
          $('.header-style-2 .categories-dropdown-active-large').removeClass('open');
          $('.header-style-2 .categories-button-active').removeClass('open');
        } else {
          header.addClass('stick');
        }
      });
      // unregister on destroy
      this.unlisteners.push(() => win.off('scroll.stickyHeader'));
    } catch (e) {}
  }

  /******************************
   * ScrollUp plugin
   ******************************/
  private initScrollUp(): void {
    try {
      if ($.scrollUp) {
        $.scrollUp({
          scrollText: '<i class="fi-rs-arrow-small-up"></i>',
          easingType: 'linear',
          scrollSpeed: 900,
          animation: 'fade',
        });
      }
    } catch (e) {}
  }

  /******************************
   * Wow.js
   ******************************/
  private initWow(): void {
    try {
      if (typeof WOW !== 'undefined') {
        new WOW().init();
      }
    } catch (e) {}
  }

  /******************************
   * Sidebar sticky (theia)
   ******************************/
  private initStickySidebar(): void {
    try {
      if ($('.sticky-sidebar').length && $.fn.theiaStickySidebar) {
        $('.sticky-sidebar').theiaStickySidebar();
      }
    } catch (e) {}
  }

  /******************************
   * Slider-range (jQuery UI)
   ******************************/
  private initSliderRange(): void {
    try {
      if ($('#slider-range').length && $.fn.slider) {
        $('#slider-range').slider({
          range: true,
          min: 0,
          max: 500,
          values: [130, 250],
          slide: (event: any, ui: any) => {
            $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
          },
        });
        $('#amount').val(
          '$' +
            $('#slider-range').slider('values', 0) +
            ' - $' +
            $('#slider-range').slider('values', 1)
        );
      }
    } catch (e) {}
  }

  /******************************
   * Hero slider (you already had this)
   ******************************/
  initHeroSlider() {
    try {
      if ($('.hero-slider-1').length && ($('.hero-slider-1') as any).slick) {
        ($('.hero-slider-1') as any).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          infinite: true,
          dots: true,
          arrows: true,
          prevArrow:
            '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
          nextArrow:
            '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
          appendArrows: '.hero-slider-1-arrow',
          autoplay: true,
        });
      }
    } catch (e) {}
  }

  /******************************
   * Generic carousels (many variants)
   ******************************/
  private initCarousels(): void {
    try {
      // carausel-8-columns
      $('.carausel-8-columns').each(function (_: any, item: any) {
        const $it = $(item);
        const id = $it.attr('id');
        const sliderID = '#' + id;
        const appendArrowsClassName = '#' + id + '-arrows';
        if ($(sliderID).length) {
          $(sliderID).slick({
            dots: false,
            infinite: true,
            speed: 1000,
            arrows: true,
            autoplay: true,
            slidesToShow: 8,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
              { breakpoint: 1025, settings: { slidesToShow: 4 } },
              { breakpoint: 768, settings: { slidesToShow: 3 } },
              { breakpoint: 480, settings: { slidesToShow: 2 } },
            ],
            prevArrow:
              '<span class="slider-btn slider-prev"><i class="fi-rs-arrow-small-left"></i></span>',
            nextArrow:
              '<span class="slider-btn slider-next"><i class="fi-rs-arrow-small-right"></i></span>',
            appendArrows: appendArrowsClassName,
          });
        }
      });

      // carausel-10-columns (original had slidesToShow:3)
      $('.carausel-10-columns').each(function (_: any, item: any) {
        const id = $(item).attr('id');
        const sliderID = '#' + id;
        const appendArrowsClassName = '#' + id + '-arrows';
        if ($(sliderID).length) {
          $(sliderID).slick({
            dots: false,
            infinite: true,
            speed: 1000,
            arrows: true,
            autoplay: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
              { breakpoint: 1025, settings: { slidesToShow: 4 } },
              { breakpoint: 768, settings: { slidesToShow: 3 } },
              { breakpoint: 480, settings: { slidesToShow: 2 } },
            ],
            prevArrow:
              '<span class="slider-btn slider-prev"><i class="fi-rs-arrow-small-left"></i></span>',
            nextArrow:
              '<span class="slider-btn slider-next"><i class="fi-rs-arrow-small-right"></i></span>',
            appendArrows: appendArrowsClassName,
          });
        }
      });

      // carausel-4-columns (note original used slidesToShow:5 - kept same)
      $('.carausel-4-columns').each(function (_: any, item: any) {
        const id = $(item).attr('id');
        const sliderID = '#' + id;
        const appendArrowsClassName = '#' + id + '-arrows';
        if ($(sliderID).length) {
          $(sliderID).slick({
            dots: false,
            infinite: true,
            speed: 1000,
            arrows: true,
            autoplay: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
              { breakpoint: 1025, settings: { slidesToShow: 3, slidesToScroll: 3 } },
              { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ],
            prevArrow:
              '<span class="slider-btn slider-prev"><i class="fi-rs-arrow-small-left"></i></span>',
            nextArrow:
              '<span class="slider-btn slider-next"><i class="fi-rs-arrow-small-right"></i></span>',
            appendArrows: appendArrowsClassName,
          });
        }
      });

      // carausel-3-columns
      $('.carausel-3-columns').each(function (_: any, item: any) {
        const id = $(item).attr('id');
        const sliderID = '#' + id;
        const appendArrowsClassName = '#' + id + '-arrows';
        if ($(sliderID).length) {
          $(sliderID).slick({
            dots: false,
            infinite: true,
            speed: 1000,
            arrows: true,
            autoplay: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
              { breakpoint: 1025, settings: { slidesToShow: 3, slidesToScroll: 3 } },
              { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ],
            prevArrow:
              '<span class="slider-btn slider-prev"><i class="fi-rs-arrow-small-left"></i></span>',
            nextArrow:
              '<span class="slider-btn slider-next"><i class="fi-rs-arrow-small-right"></i></span>',
            appendArrows: appendArrowsClassName,
          });
        }
      });
    } catch (e) {}
  }

  /******************************
   * Fix Bootstrap tabs + slick reposition
   ******************************/
  private fixBootstrapTabs(): void {
    try {
      $('button[data-bs-toggle="tab"]').on('shown.bs.tab', () => {
        try {
          $('.carausel-4-columns').slick('setPosition');
        } catch (e) {}
      });
    } catch (e) {}
  }

  /******************************
   * Countdown timers
   ******************************/
  private initCountdowns(): void {
    try {
      $('[data-countdown]').each( () => {
        const $this = $(this);
        const finalDate = $this.data('countdown');
        if ($.fn.countdown) {
          $this.countdown(finalDate,  (event: any) => {
            $(this).html(
              event.strftime(
                '' +
                  '<span class="countdown-section"><span class="countdown-amount hover-up">%D</span><span class="countdown-period"> days </span></span>' +
                  '<span class="countdown-section"><span class="countdown-amount hover-up">%H</span><span class="countdown-period"> hours </span></span>' +
                  '<span class="countdown-section"><span class="countdown-amount hover-up">%M</span><span class="countdown-period"> mins </span></span>' +
                  '<span class="countdown-section"><span class="countdown-amount hover-up">%S</span><span class="countdown-period"> sec </span></span>'
              )
            );
          });
        }
      });
    } catch (e) {}
  }

  /******************************
   * Product slider(s)
   ******************************/
  private initProductSliders(): void {
    try {
      if ($('.product-slider-active-1').length) {
        $('.product-slider-active-1').slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          autoplay: true,
          fade: false,
          infinite: true,
          dots: false,
          arrows: true,
          prevArrow: '<span class="pro-icon-1-prev"><i class="fi-rs-angle-small-left"></i></span>',
          nextArrow: '<span class="pro-icon-1-next"><i class="fi-rs-angle-small-right"></i></span>',
          responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 3 } },
            { breakpoint: 991, settings: { slidesToShow: 2 } },
            { breakpoint: 767, settings: { slidesToShow: 2 } },
            { breakpoint: 575, settings: { slidesToShow: 1 } },
          ],
        });
      }
    } catch (e) {}
  }

  /******************************
   * Testimonial sliders
   ******************************/
  private initTestimonialSliders(): void {
    try {
      if ($('.testimonial-active-1').length) {
        $('.testimonial-active-1').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          fade: false,
          infinite: true,
          dots: false,
          arrows: true,
          prevArrow: '<span class="pro-icon-1-prev"><i class="fi-rs-angle-small-left"></i></span>',
          nextArrow: '<span class="pro-icon-1-next"><i class="fi-rs-angle-small-right"></i></span>',
          responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 3 } },
            { breakpoint: 991, settings: { slidesToShow: 2 } },
            { breakpoint: 767, settings: { slidesToShow: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1 } },
          ],
        });
      }

      if ($('.testimonial-active-3').length) {
        $('.testimonial-active-3').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          fade: false,
          infinite: true,
          dots: true,
          arrows: false,
          responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 3 } },
            { breakpoint: 991, settings: { slidesToShow: 2 } },
            { breakpoint: 767, settings: { slidesToShow: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1 } },
          ],
        });
      }
    } catch (e) {}
  }

  /******************************
   * Categories slider
   ******************************/
  private initCategoriesSlider(): void {
    try {
      if ($('.categories-slider-1').length) {
        $('.categories-slider-1').slick({
          slidesToShow: 6,
          slidesToScroll: 1,
          fade: false,
          infinite: true,
          dots: false,
          arrows: false,
          responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 4 } },
            { breakpoint: 991, settings: { slidesToShow: 3 } },
            { breakpoint: 767, settings: { slidesToShow: 2 } },
            { breakpoint: 575, settings: { slidesToShow: 1 } },
          ],
        });
      }
    } catch (e) {}
  }

  /******************************
   * Category toggle (desktop)
   ******************************/
  private initCategoryToggle(): void {
    try {
      const searchToggle = $('.categories-button-active');
      searchToggle.on('click.categoryToggle',  (e: any) => {
        e.preventDefault();
        const $this = $(this);
        if ($this.hasClass('open')) {
          $this.removeClass('open');
          $this.siblings('.categories-dropdown-active-large').removeClass('open');
        } else {
          $this.addClass('open');
          $this.siblings('.categories-dropdown-active-large').addClass('open');
        }
      });
      // cleanup
      this.unlisteners.push(() => searchToggle.off('click.categoryToggle'));
    } catch (e) {}
  }

  /******************************
   * Sort-by product area (close when clicking outside)
   ******************************/
  private initSortBy(): void {
    try {
      if ($('.sort-by-product-area').length) {
        const $body = $('body');
        const $cartWrap = $('.sort-by-product-area');
        const $cartContent = $cartWrap.find('.sort-by-dropdown');
        $cartWrap.on('click', '.sort-by-product-wrap',  (e: any) => {
          e.preventDefault();
          const $this = $(this);
          if (!$this.parent().hasClass('show')) {
            $this.siblings('.sort-by-dropdown').addClass('show').parent().addClass('show');
          } else {
            $this.siblings('.sort-by-dropdown').removeClass('show').parent().removeClass('show');
          }
        });
        // close when clicking outside
        $body.on('click.sortBy', function (e: any) {
          const $target = e.target;
          if (
            !$($target).is('.sort-by-product-area') &&
            !$($target).parents().is('.sort-by-product-area') &&
            $cartWrap.hasClass('show')
          ) {
            $cartWrap.removeClass('show');
            $cartContent.removeClass('show');
          }
        });
        this.unlisteners.push(() => $body.off('click.sortBy'));
      }
    } catch (e) {}
  }

  /******************************
   * Shop filter toggle
   ******************************/
  private initShopFilter(): void {
    try {
      $('.shop-filter-toogle').on('click', function (e: any) {
        e.preventDefault();
        $('.shop-product-fillter-header').slideToggle();
      });
      const shopFiltericon = $('.shop-filter-toogle');
      shopFiltericon.on('click.filterActive',  () => {
        $(this).toggleClass('active');
      });
      this.unlisteners.push(() => $('.shop-filter-toogle').off('.filterActive'));
    } catch (e) {}
  }

  /******************************
   * Product details image sliders
   ******************************/
  private initProductDetailsSliders(): void {
    try {
      if ($('.pro-dec-big-img-slider').length) {
        $('.pro-dec-big-img-slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          draggable: false,
          fade: false,
          asNavFor: '.product-dec-slider-small , .product-dec-slider-small-2',
        });
      }

      if ($('.product-dec-slider-small').length) {
        $('.product-dec-slider-small').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: '.pro-dec-big-img-slider',
          dots: false,
          focusOnSelect: true,
          fade: false,
          arrows: false,
          responsive: [
            { breakpoint: 991, settings: { slidesToShow: 3 } },
            { breakpoint: 767, settings: { slidesToShow: 4 } },
            { breakpoint: 575, settings: { slidesToShow: 2 } },
          ],
        });
      }
    } catch (e) {}
  }

  /******************************
   * Magnific popup
   ******************************/
  private initMagnificPopup(): void {
    try {
      if ($.fn.magnificPopup && $('.img-popup').length) {
        $('.img-popup').magnificPopup({ type: 'image', gallery: { enabled: true } });
      }
    } catch (e) {}
  }

  /******************************
   * select2 init
   ******************************/
  private initSelect2(): void {
    try {
      if ($.fn.select2) {
        $('.select-active').select2();
      }
    } catch (e) {}
  }

  /******************************
   * Checkout toggles
   ******************************/
  private initCheckoutToggles(): void {
    try {
      $('.checkout-click1').on('click', function (e: any) {
        e.preventDefault();
        $('.checkout-login-info').slideToggle(900);
      });
      $('.checkout-click3').on('click', function (e: any) {
        e.preventDefault();
        $('.checkout-login-info3').slideToggle(1000);
      });
      $('.checkout-toggle2').on('click', function () {
        $('.open-toggle2').slideToggle(1000);
      });
      $('.checkout-toggle').on('click', function () {
        $('.open-toggle').slideToggle(1000);
      });
    } catch (e) {}
  }

  /******************************
   * Payment method selection visuals
   ******************************/
  private paymentMethodChanged(): void {
    try {
      const $order_review = $('.payment-method');
      $order_review.on('click', 'input[name="payment_method"]',  () => {
        const selectedClass = 'payment-selected';
        const parent = $(this).parents('.sin-payment').first();
        parent.addClass(selectedClass).siblings().removeClass(selectedClass);
      });
    } catch (e) {}
  }

  /******************************
   * CounterUp
   ******************************/
  private initCounterUp(): void {
    try {
      if ($.fn.counterUp) {
        $('.count').counterUp({ delay: 10, time: 2000 });
      }
    } catch (e) {}
  }

  /******************************
   * Isotope masonry grid
   ******************************/
  private initIsotope(): void {
    try {
      $('.grid').imagesLoaded(function () {
        // init Isotope
        if ($.fn.isotope) {
          $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            masonry: {
              columnWidth: '.grid-item',
            },
          });
        }
      });
    } catch (e) {}
  }

  /******************************
   * Sidebar search open/close
   ******************************/
  private sidebarSearch(): void {
    try {
      const searchTrigger = $('.search-active'),
        endTriggersearch = $('.search-close'),
        container = $('.main-search-active');

      searchTrigger.on('click.sidebarSearch', function (e: any) {
        e.preventDefault();
        container.addClass('search-visible');
      });

      endTriggersearch.on('click.sidebarSearchEnd', function () {
        container.removeClass('search-visible');
      });

      this.unlisteners.push(() => {
        searchTrigger.off('.sidebarSearch');
        endTriggersearch.off('.sidebarSearchEnd');
      });
    } catch (e) {}
  }

  /******************************
   * Mobile header active (Angular-friendly)
   * This handles burger icons, close buttons and overlay via Renderer2.
   ******************************/
  private mobileHeaderActive(): void {
    try {
      const navbarTriggers = Array.from(document.querySelectorAll('.burger-icon')) as HTMLElement[];
      const endTriggers = Array.from(document.querySelectorAll('.mobile-menu-close')) as HTMLElement[];
      const container = document.querySelector('.mobile-header-active') as HTMLElement | null;
      const body = document.body as HTMLElement;

      // create and prepend overlay
      this.overlayEl = this.renderer.createElement('div') as HTMLElement;
      this.renderer.addClass(this.overlayEl, 'body-overlay-1');
      this.renderer.insertBefore(document.body, this.overlayEl, document.body.firstChild);

      // helper functions to toggle
      const openMenu = (evt?: Event) => {
        if (evt) evt.preventDefault();
        if (container) {
          this.renderer.addClass(container, 'sidebar-visible');
        }
        this.renderer.addClass(body, 'mobile-menu-active');
      };

      const closeMenu = () => {
        if (container) {
          this.renderer.removeClass(container, 'sidebar-visible');
        }
        this.renderer.removeClass(body, 'mobile-menu-active');
      };

      // attach click to burger icons
      navbarTriggers.forEach((btn) => {
        const unlisten = this.renderer.listen(btn, 'click', (event: Event) => {
          openMenu(event);
        });
        this.unlisteners.push(unlisten);
      });

      // attach click to all close buttons
      endTriggers.forEach((btn) => {
        const unlisten = this.renderer.listen(btn, 'click', () => {
          closeMenu();
        });
        this.unlisteners.push(unlisten);
      });

      // overlay click closes
      if (this.overlayEl) {
        const unlisten = this.renderer.listen(this.overlayEl, 'click', () => {
          closeMenu();
        });
        this.unlisteners.push(unlisten);
      }
    } catch (e) {}
  }

  /******************************
   * Mobile menu extra behavior (submenu toggles)
   ******************************/
 private initMobileMenuBehavior(): void {
  try {
    const $offCanvasNav = $('.mobile-menu');
    const $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');

    // Add toggle button and hide submenus (same as before)
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fi-rs-angle-small-down"></i></span>');
    $offCanvasNavSubMenu.slideUp();

    // Use e.currentTarget (not arrow function with `this`)
    $offCanvasNav.on('click', 'li a, li .menu-expand', function (this: HTMLElement, e: any) {
      // jQuery passes the matched element as currentTarget — use that
      const $this = $(e.currentTarget); // <-- safe, explicit
      const parentClass = $this.parent().attr('class') || '';

      // guard against undefined before calling match
      if (
        parentClass.match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
        ($this.attr('href') === '#' || $this.hasClass('menu-expand'))
      ) {
        e.preventDefault();
        if ($this.siblings('ul:visible').length) {
          $this.parent('li').removeClass('active');
          $this.siblings('ul').slideUp();
        } else {
          $this.parent('li').addClass('active');
          $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
          $this.closest('li').siblings('li').find('ul:visible').slideUp();
          $this.siblings('ul').slideDown();
        }
      }
    });
  } catch (e) {
    // optionally log e for debugging
    // console.warn('mobile menu init failed', e);
  }
}


  /******************************
   * language/currency, categories-button-active-2, demo, more menu
   ******************************/
  private initLanguageCurrency(): void {
    try {
      $('.mobile-language-active').on('click', function (e: any) {
        e.preventDefault();
        $('.lang-dropdown-active').slideToggle(900);
      });

      $('.categories-button-active-2').on('click', function (e: any) {
        e.preventDefault();
        $('.categori-dropdown-active-small').slideToggle(900);
      });
    } catch (e) {}
  }

  private initDemoOptions(): void {
    try {
      const demo = $('.tm-demo-options-wrapper');
      $('.view-demo-btn-active').on('click', function (e: any) {
        e.preventDefault();
        demo.toggleClass('demo-open');
      });
    } catch (e) {}
  }

  private initMoreMenu(): void {
    try {
      $('.more_slide_open').slideUp();
      $('.more_categories').on('click',  () => {
        $(this).toggleClass('show');
        $('.more_slide_open').slideToggle();
      });
    } catch (e) {}
  }

  /******************************
   * Modal shown handler to set slick position & elevateZoom
   ******************************/
  private initModalHandlers(): void {
    try {
      $('.modal').on('shown.bs.modal', function () {
        try {
          $('.product-image-slider').slick('setPosition');
          $('.slider-nav-thumbnails').slick('setPosition');

          // elevateZoom init if plugin exists
          $('.product-image-slider .slick-active img').elevateZoom({
            zoomType: 'inner',
            cursor: 'crosshair',
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 750,
          });
        } catch (e) {}
      });
    } catch (e) {}
  }

  /******************************
   * VTicker
   ******************************/
  private initVTicker(): void {
    try {
      if ($('#news-flash').length && $.fn.vTicker) {
        $('#news-flash').vTicker({
          speed: 500,
          pause: 3000,
          animation: 'fade',
          mousePause: false,
          showItems: 1,
        });
      }
    } catch (e) {}
  }

 

  /******************************
   * Clean up
   ******************************/
  ngOnDestroy(): void {
    // remove all registered listeners
    this.unlisteners.forEach((u) => u());
    this.unlisteners = [];

    // remove overlay if we added it
    if (this.overlayEl && this.overlayEl.parentNode) {
      this.renderer.removeChild(document.body, this.overlayEl);
      this.overlayEl = null;
    }

    // try to unslick common sliders to avoid memory leaks
    this.ngZone.runOutsideAngular(() => {
      try {
        const selectors = [
          '.hero-slider-1',
          '.carausel-8-columns',
          '.carausel-10-columns',
          '.carausel-4-columns',
          '.carausel-3-columns',
          '.product-slider-active-1',
          '.testimonial-active-1',
          '.testimonial-active-3',
          '.categories-slider-1',
          '.pro-dec-big-img-slider',
          '.product-dec-slider-small',
        ];
        selectors.forEach((sel) => {
          if ($(sel).hasClass('slick-initialized')) {
            try {
              $(sel).slick('unslick');
            } catch (e) {}
          }
        });
      } catch (e) {}
    });
  }



   // called from (input) event of <input type="color">
  changeColor(event: any): void {
    const hex = event.target.value; // e.g. "#ff0088"
    this.applyHexColor(hex);
    sessionStorage.setItem(this.STORAGE_KEY, hex);
  }

  // helper to call when clicking preset buttons
  applyPreset(hex: string) {
    this.applyHexColor(hex);
    sessionStorage.setItem(this.STORAGE_KEY, hex);
    const input = document.getElementById('colorPicker') as HTMLInputElement | null;
    if (input) input.value = hex;
  }

  // main function: converts hex -> shades/tints and sets CSS vars
  private applyHexColor(hex: string) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return;

    // Generate a few variants:
    const primary = this.rgbaString(rgb, 1);               // full
    const secondary = this.rgbaString(rgb, 0.1);          // very light overlay
    const third = this.rgbaString(rgb, 0.3);
    const fourth = this.rgbaString(rgb, 0.6);

    // Also create lighter/darker tints if you want:
    const lighter20 = this.rgbaString(this.mixWithWhite(rgb, 0.2), 1);
    const darker20 = this.rgbaString(this.mixWithBlack(rgb, 0.2), 1);

    // Write CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primaryColor', primary);
    root.style.setProperty('--secondaryColor', secondary);
    root.style.setProperty('--thirdColor', third);
    root.style.setProperty('--fourthColor', fourth);

    // optional additional variables
    root.style.setProperty('--primaryColor-lighter20', lighter20);
    root.style.setProperty('--primaryColor-darker20', darker20);

    // store a simple name or the hex as main-color (you used color name earlier)
    root.style.setProperty('--main-color', hex);
  }

  // convert "#rrggbb" to {r,g,b} or null
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    if (!hex) return null;
    const h = hex.replace('#', '');
    if (h.length === 3) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      return { r, g, b };
    } else if (h.length === 6) {
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return { r, g, b };
    }
    return null;
  }

  // produce rgba string "rgba(r, g, b, a)"
  private rgbaString(rgb: { r: number; g: number; b: number }, alpha = 1): string {
    return `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${alpha})`;
  }

  // mix with white — t becomes fraction of white (0..1)
  private mixWithWhite(rgb: { r: number; g: number; b: number }, t: number) {
    // result = rgb + (255 - rgb) * t
    const r = rgb.r + (255 - rgb.r) * this.clamp(t, 0, 1);
    const g = rgb.g + (255 - rgb.g) * this.clamp(t, 0, 1);
    const b = rgb.b + (255 - rgb.b) * this.clamp(t, 0, 1);
    return { r, g, b };
  }

  // mix with black — t becomes fraction of black (0..1)
  private mixWithBlack(rgb: { r: number; g: number; b: number }, t: number) {
    // result = rgb * (1 - t)
    const r = rgb.r * (1 - this.clamp(t, 0, 1));
    const g = rgb.g * (1 - this.clamp(t, 0, 1));
    const b = rgb.b * (1 - this.clamp(t, 0, 1));
    return { r, g, b };
  }

  private clamp(v: number, a: number, b: number) {
    return Math.min(Math.max(v, a), b);
  }











}
