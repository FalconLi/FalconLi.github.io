$(document).ready(function() {

  // Variables
  var $codeSnippets = $('.code-example-body'),
      $nav = $('.navbar'),
      $body = $('body'),
      $window = $(window),
      $popoverLink = $('[data-popover]'),
      navOffsetTop = $nav.offset().top,
      $document = $(document),
      entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
      }

  function init() {
    $window.on('scroll', onScroll)
    $window.on('resize', resize)
    $popoverLink.on('click', openPopover)
    $document.on('click', closePopover)
    $('a[href^="#"]').on('click', smoothScroll)
    buildSnippets();
    initVisitorCounter();
  }

  function smoothScroll(e) {
    e.preventDefault();
    $(document).off("scroll");
    var target = this.hash,
        menu = target;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top-40
    }, 0, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
    });
  }

  function openPopover(e) {
    e.preventDefault()
    closePopover();
    var popover = $($(this).data('popover'));
    popover.toggleClass('open')
    e.stopImmediatePropagation();
  }

  function closePopover(e) {
    if($('.popover.open').length > 0) {
      $('.popover').removeClass('open')
    }
  }

  $("#button").click(function() {
    $('html, body').animate({
        scrollTop: $("#elementtoScrollToID").offset().top
    }, 2000);
});

  function resize() {
    $body.removeClass('has-docked-nav')
    navOffsetTop = $nav.offset().top
    onScroll()
  }

  function onScroll() {
    if(navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
      $body.addClass('has-docked-nav')
    }
    if(navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
      $body.removeClass('has-docked-nav')
    }
  }

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function buildSnippets() {
    $codeSnippets.each(function() {
      var newContent = escapeHtml($(this).html())
      $(this).html(newContent)
    })
  }

  function initVisitorCounter() {
    var counter = document.querySelector('[data-visit-counter]');

    if (!counter) {
      return;
    }

    var apiUrl = counter.getAttribute('data-counter-api');
    var canonicalCounterUrl = counter.getAttribute('data-counter-url') || 'https://haiyingli.me/';
    var isLocal = isLocalPreviewHost();
    var counterUrl = normalizeCounterUrl(canonicalCounterUrl);

    if (!window.fetch || !apiUrl) {
      return;
    }

    fetchWithTimeout(apiUrl, {
      method: isLocal ? 'GET' : 'POST',
      headers: {
        'x-bsz-referer': counterUrl
      },
      credentials: 'include',
      cache: 'no-store'
    }, 7000)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Counter request failed');
      }

      return response.json();
    })
    .then(function(payload) {
      var data = payload && payload.data ? payload.data : payload;
      var hasAnyValue = false;

      counter.querySelectorAll('[data-counter-value]').forEach(function(item) {
        var key = item.getAttribute('data-counter-value');
        var didUpdate = animateCounterNumber(item, data ? data[key] : null);
        hasAnyValue = hasAnyValue || didUpdate;
      });

      if (!hasAnyValue) {
        throw new Error('Counter response was empty');
      }
    })
    .catch(function() {
      counter.classList.add('visitor-counter--unavailable');
    });
  }

  function isLocalPreviewHost() {
    var host = window.location.hostname.toLowerCase();

    return !host ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host) ||
      window.location.protocol === 'file:';
  }

  function normalizeCounterUrl(url) {
    return String(url).replace(/\/?$/, '/');
  }

  function animateCounterNumber(element, value) {
    var endValue = normalizeCounterNumber(value);

    if (endValue === null) {
      element.textContent = '--';
      return false;
    }

    if (!window.requestAnimationFrame || prefersReducedMotion()) {
      element.textContent = formatCounterNumber(endValue);
      return true;
    }

    var duration = 900;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }

      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var currentValue = Math.round(endValue * easedProgress);

      element.textContent = formatCounterNumber(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
    return true;
  }

  function normalizeCounterNumber(value) {
    var number = parseInt(String(value).replace(/[^\d]/g, ''), 10);

    if (isNaN(number)) {
      return null;
    }

    return number;
  }

  function formatCounterNumber(number) {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function fetchWithTimeout(url, options, timeout) {
    if (!window.Promise) {
      return fetch(url, options);
    }

    return new Promise(function(resolve, reject) {
      var timer = window.setTimeout(function() {
        reject(new Error('Counter request timed out'));
      }, timeout);

      fetch(url, options).then(function(response) {
        window.clearTimeout(timer);
        resolve(response);
      }).catch(function(error) {
        window.clearTimeout(timer);
        reject(error);
      });
    });
  }


  init();

});
