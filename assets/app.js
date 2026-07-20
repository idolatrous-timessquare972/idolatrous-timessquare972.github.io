/* Kunal Ashar — personal site
 * Content lives in /data/*.json. This file fetches it, renders each page,
 * then wires up routing + interactions. To edit content, change the JSON. */
(function () {
  var SPARK = '<svg viewBox="0 0 24 24"><path d="M12 1 C12.9 6.6 17.4 11.1 23 12 C17.4 12.9 12.9 17.4 12 23 C11.1 17.4 6.6 12.9 1 12 C6.6 11.1 11.1 6.6 12 1 Z"/></svg>';
  var PAGES = ['home', 'experience', 'skills', 'speaking', 'about', 'contact'];

  function head(h) {
    return '<div class="page-head reveal"><span class="eyebrow"><span class="spark ' + h.sparkClass + ' sp-h">' + SPARK + '</span> ' + h.eyebrow + '</span><h1>' + h.h1 + '</h1>' + (h.intro ? '<p>' + h.intro + '</p>' : '') + '</div>';
  }
  function metrics(list) {
    if (!list || !list.length) return '';
    return '<div class="metrics">' + list.map(function (m) { return '<div class="metric"><div class="mn">' + m.n + '</div><div class="ml">' + m.l + '</div></div>'; }).join('') + '</div>';
  }

  function renderHome(d) {
    var badges = d.badges.map(function (b) { return '<span class="badge reveal"><span class="k">' + b.k + '</span><span class="v" style="' + b.style + '">' + b.v + '</span></span>'; }).join('');
    var stats = d.stats.map(function (s) { return '<div class="stat reveal" style="--c:' + s.c + '"><div class="num"><span class="count" data-to="' + s.to + '">0</span>' + s.suffix + '</div><div class="lbl">' + s.label + '</div></div>'; }).join('');
    var reach = d.reach.map(function (r) { return '<span class="ctl"><span class="box">' + r + '</span></span>'; }).join('');
    var explore = d.explore.map(function (x) { return '<a class="xcard reveal" style="--c:' + x.c + '" href="' + x.href + '"><span class="xk">' + x.k + '</span><span class="xd">' + x.d + '</span><span class="xgo">' + x.go + '</span></a>'; }).join('');
    return '<section class="page" data-route="home"><div class="wrap page-pad">' +
      '<div class="hero">' +
        '<span class="spark b flt" style="width:34px;height:34px;top:-6px;left:2%">' + SPARK + '</span>' +
        '<span class="spark o flt2" style="width:26px;height:26px;top:20px;right:3%">' + SPARK + '</span>' +
        '<span class="spark v flt" style="width:30px;height:30px;bottom:-14px;left:-14px">' + SPARK + '</span>' +
        '<div class="hero-card"><div class="hero-inner">' +
          '<div class="hero-copy"><span class="kick reveal">' + d.kicker + '</span><h1 class="reveal">' + d.titleHtml + '</h1><p class="sub reveal">' + d.sub + '</p></div>' +
          '<div class="panel reveal"><div class="panel-row">' +
            '<button class="fauxinput" id="copyEmail" type="button" title="Click to copy" data-email="' + d.email + '"><span class="sp">✦</span><span class="em">' + d.email + '</span><span class="cpy">copy</span></button>' +
            '<a class="ingest" href="mailto:' + d.email + '">Say hi</a></div>' +
            '<p class="panel-label"><span class="gdot"></span> Reach out for</p>' +
            '<div class="controls">' + reach + '</div></div>' +
        '</div></div>' +
      '</div>' +
      '<div class="badges">' + badges + '</div>' +
      '<div class="stats">' + stats + '</div>' +
      '<div class="explore">' + explore + '</div>' +
      '</div></section>';
  }

  function renderExperience(d) {
    var jobs = d.jobs.map(function (j) {
      var awards = (j.awards && j.awards.length) ? '<div class="awrow">' + j.awards.map(function (a) { return '<span class="awchip">' + a + '</span>'; }).join('') + '</div>' : '';
      var side = metrics(j.metrics) + awards;
      return '<div class="tl reveal" style="--c:' + j.c + '"><div class="jobcard">' +
        '<div class="jc-main">' +
          '<div class="when">' + j.when + (j.now ? ' <span class="now">Now</span>' : '') + '</div>' +
          '<div class="role"><span class="co">' + j.company + '</span> — ' + j.role + '</div>' +
          '<div class="place">' + j.place + '</div>' +
          '<ul>' + j.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>' +
        '</div><div class="jc-side">' + side + '</div>' +
      '</div></div>';
    }).join('');
    return '<section class="page" data-route="work"><div class="wrap page-pad">' + head(d.head) + '<div class="timeline">' + jobs + '</div></div></section>';
  }

  function renderSkills(d) {
    var cards = d.cards.map(function (c) {
      var groups = c.groups.map(function (g) {
        var chips = g.chips.map(function (ch) { return '<span class="stk' + (ch[1] ? ' hot' : '') + '">' + ch[0] + '</span>'; }).join('');
        return '<div class="cg"><span class="cg-l">' + g.l + '</span><div class="cg-c">' + chips + '</div></div>';
      }).join('');
      return '<div class="jobcard skill reveal" style="--c:' + c.c + '">' +
        '<div class="jc-main"><span class="kicker">' + c.kicker + '</span><h3>' + c.title + '</h3><p>' + c.desc + '</p></div>' +
        '<div class="jc-side">' + metrics(c.metrics) + groups + '</div></div>';
    }).join('');
    return '<section class="page" data-route="skills"><div class="wrap page-pad">' + head(d.head) + '<div class="skillstack">' + cards + '</div></div></section>';
  }

  function renderSpeaking(d) {
    var talks = d.talks.map(function (t) {
      return '<a class="tkcard reveal" style="--tc:' + t.tc + '" href="' + t.href + '" target="_blank" rel="noopener">' +
        '<span class="tk-type">' + t.type + '</span>' +
        '<span class="tk-main"><span class="tk-t">' + t.title + '</span><br><span class="tk-v">' + t.venue + '</span></span>' +
        '<span class="tk-yr">' + t.year + '</span></a>';
    }).join('');
    var recs = d.recordings.map(function (u) { return '<a class="recchip" href="' + u + '" target="_blank" rel="noopener"><span class="pl">▶</span> Recorded talk ↗</a>'; }).join('');
    var shorts = d.shorts.map(function (s) { return '<a class="recchip" href="' + s.href + '" target="_blank" rel="noopener"><span class="pl">▶</span> ' + s.label + ' ↗</a>'; }).join('');
    var comms = d.communities.map(function (c) {
      var items = c.items.map(function (it) { return '<div class="item"><div class="it-t">' + it[0] + '</div><div class="it-s">' + it[1] + '</div></div>'; }).join('');
      return '<div class="softcard mini reveal" style="--c:' + c.c + '"><h3><span class="d"></span><a href="' + c.href + '" target="_blank" rel="noopener" style="text-decoration:none">' + c.name + ' ↗</a></h3>' + items + '</div>';
    }).join('');
    var tr = d.training.items.map(function (it) { return '<div class="item"><div class="it-t">' + it[0] + '</div><div class="it-s">' + it[1] + '</div></div>'; }).join('');
    return '<section class="page" data-route="speaking"><div class="wrap page-pad">' + head(d.head) +
      '<div class="talkstack">' + talks + '</div>' +
      '<div class="reclist reveal"><p class="rl-h">More recorded sessions ▶</p><div class="recgrid">' + recs + '</div>' +
      '<p class="rl-h">Shorts ⚡</p><div class="recgrid">' + shorts + '</div></div>' +
      '<div class="two three">' + comms + '</div>' +
      '<div class="softcard mini reveal" style="--c:var(--orange); margin-top:16px"><h3><span class="d"></span>' + d.training.title + '</h3>' + tr + '</div>' +
      '</div></section>';
  }

  function renderAbout(d) {
    var paras = d.paras.map(function (p) { return '<p>' + p + '</p>'; }).join('');
    var ed = d.education.map(function (e) { return '<div class="item"><div class="it-t">' + e[0] + '</div><div class="it-s">' + e[1] + '</div></div>'; }).join('');
    var ct = d.certs.map(function (e) { return '<div class="item"><div class="it-t">' + e[0] + '</div><div class="it-s">' + e[1] + '</div></div>'; }).join('');
    return '<section class="page" data-route="about"><div class="wrap page-pad">' + head(d.head) +
      '<div class="softcard reveal"><div class="about-flex"><div>' + paras + '</div><p class="bigquote">' + d.quoteHtml + '</p></div>' +
      '<div class="two"><div class="mini" style="--c:var(--blue)"><h3><span class="d"></span>Education</h3>' + ed + '</div>' +
      '<div class="mini" style="--c:var(--orange)"><h3><span class="d"></span>Certifications</h3>' + ct + '</div></div></div>' +
      '</div></section>';
  }

  function renderContact(d) {
    var links = d.links.map(function (l) { return '<a class="cbtn line" href="' + l.href + '">' + l.label + '</a>'; }).join('');
    return '<section class="page" data-route="contact"><div class="wrap page-pad">' +
      '<div class="softcard contact-card reveal"><span class="spark y flt" style="width:30px;height:30px;top:-14px;right:7%">' + SPARK + '</span>' +
      '<span class="cs">' + d.cs + '</span><h2>' + d.h2 + '</h2><p>' + d.p + '</p>' +
      '<div class="cbtns"><a class="cbtn solid" href="mailto:' + d.email + '">✉ Say hello</a>' + links + '</div></div>' +
      '</div></section>';
  }

  var RENDER = { home: renderHome, experience: renderExperience, skills: renderSkills, speaking: renderSpeaking, about: renderAbout, contact: renderContact };

  function boot() {
    Promise.all(PAGES.map(function (n) { return fetch('data/' + n + '.json').then(function (r) { return r.json(); }); }))
      .then(function (data) {
        var html = '';
        PAGES.forEach(function (n, i) { html += RENDER[n](data[i]); });
        document.getElementById('app').innerHTML = html;
        core();
      })
      .catch(function (e) {
        document.getElementById('app').innerHTML = '<div class="wrap page-pad"><p style="font-family:var(--mono);color:var(--soft)">Could not load content (' + e + '). If you are opening this file directly, run a local server: <code>python3 -m http.server</code></p></div>';
      });
  }

  /* ---- routing + interactions (operates on the rendered DOM) ---- */
  function core() {
    (function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var routes = ['home', 'work', 'skills', 'speaking', 'about', 'contact'];
      function routeFromHash() { var h = (location.hash || '').replace(/^#\/?/, ''); return routes.indexOf(h) >= 0 ? h : 'home'; }
      var pages = document.querySelectorAll('.page');
      var navLinks = Array.prototype.slice.call(document.querySelectorAll('#mnav a'));

      function revealIn(page) {
        var revs = Array.prototype.slice.call(page.querySelectorAll('.reveal'));
        revs.forEach(function (el) { el.classList.remove('in'); el.style.transitionDelay = ''; });
        if (reduce) { revs.forEach(function (el) { el.classList.add('in'); }); return; }
        requestAnimationFrame(function () { requestAnimationFrame(function () {
          revs.forEach(function (el, i) { el.style.transitionDelay = Math.min(i, 8) * 55 + 'ms'; el.classList.add('in'); });
        }); });
      }
      function runCounters(page) {
        page.querySelectorAll('.count').forEach(function (el) {
          if (el.dataset.done) return; el.dataset.done = '1';
          var to = parseInt(el.getAttribute('data-to'), 10) || 0;
          if (reduce) { el.textContent = to; return; }
          var start = null;
          function step(ts) { if (!start) start = ts; var p = Math.min((ts - start) / 1200, 1); el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to); if (p < 1) requestAnimationFrame(step); }
          requestAnimationFrame(step);
        });
      }
      function show(route) {
        pages.forEach(function (p) { p.classList.toggle('active', p.dataset.route === route); });
        navLinks.forEach(function (a) { a.classList.toggle('active', a.dataset.route === route); });
        var page = document.querySelector('.page[data-route="' + route + '"]'); if (!page) return;
        window.scrollTo(0, 0); revealIn(page); runCounters(page); closeMenu();
        document.title = (route === 'home' ? 'Kunal Ashar — Senior Test Automation Engineer' : route.charAt(0).toUpperCase() + route.slice(1) + ' · Kunal Ashar');
      }
      window.addEventListener('hashchange', function () { show(routeFromHash()); });

      var menuBtn = document.getElementById('menuBtn'), mnav = document.getElementById('mnav');
      function closeMenu() { if (mnav) mnav.classList.remove('open'); if (menuBtn) { menuBtn.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } }
      if (menuBtn) { menuBtn.addEventListener('click', function () { var open = mnav.classList.toggle('open'); menuBtn.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open)); }); }

      var head = document.getElementById('masthead'), prog = document.getElementById('progress');
      function onScroll() { var y = window.scrollY || document.documentElement.scrollTop; if (head) head.classList.toggle('scrolled', y > 8); if (prog) { var h = document.documentElement.scrollHeight - window.innerHeight; prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'; } }
      window.addEventListener('scroll', onScroll, { passive: true });

      var toast = document.getElementById('toast'), tt;
      function showToast(msg) { if (!toast) return; toast.textContent = msg; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('show'); }, 1900); }
      var copyBtn = document.getElementById('copyEmail');
      if (copyBtn) { copyBtn.addEventListener('click', function () { var email = copyBtn.getAttribute('data-email'); if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(email).then(function () { showToast('Copied ' + email + ' ✓'); }, function () { showToast(email); }); } else { showToast(email); } }); }

      var tog = document.getElementById('openTog');
      if (tog) { tog.addEventListener('click', function () { var on = tog.getAttribute('aria-pressed') === 'true'; tog.setAttribute('aria-pressed', String(!on)); tog.querySelector('.tag-new').textContent = on ? 'NO' : 'YES'; }); }

      onScroll(); show(routeFromHash());
    })();
  }

  boot();
})();
