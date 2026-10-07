import { allDocs, docGroups, findDoc } from "./docs.js";

const root = document.querySelector("#root");
const toaster = document.querySelector("#toaster");

const nav = [
  { href: "/logs", label: "Logs" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/docs/introduction", label: "Docs", match: "/docs" },
  { href: "/launch", label: "Launch a log" },
];

function activeHref(path) {
  const item = nav.find((entry) =>
    entry.match ? path.startsWith(entry.match) : path === entry.href
  );
  return item?.href || "";
}

function header(path) {
  const current = activeHref(path);
  const links = nav
    .map(
      (entry) =>
        `<a href="${entry.href}" class="${entry.href === current ? "active" : ""}">${entry.label}</a>`
    )
    .join("");
  return `
    <header class="site-header">
      <div class="header-bar">
        <a href="/" aria-label="Chop home"><img class="logo" src="/brand/chop-lockup-light.svg" alt="Chop"></a>
        <nav class="desktop-nav" aria-label="Main navigation">${links}</nav>
        <button class="btn btn-sm btn-primary js-connect" type="button">Connect wallet</button>
      </div>
      <nav class="mobile-nav" aria-label="Mobile navigation">${links}</nav>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-rail" aria-hidden="true"></div>
      <div class="footer-grid">
        <div>
          <img class="logo" src="/brand/chop-lockup-light.svg" alt="Chop">
          <p class="display tagline">Markets chop.<br>Get paid for it.</p>
        </div>
        <div>
          <nav class="footer-nav" aria-label="Footer">
            <a href="/logs">Logs</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/docs/introduction">Docs</a>
            <a href="/docs/risks">Risks</a>
            <a href="/docs/contracts">Contracts</a>
            <a href="https://x.com/ChopLogsApp" target="_blank" rel="noreferrer">X</a>
          </nav>
          <p class="footer-note">Chop is experimental software. <a class="text-link" href="/docs/risks">Read the risks</a> before depositing.</p>
          <p class="footer-note">Built on Robinhood Chain, utilizing proven peapod infrastructure</p>
        </div>
      </div>
    </footer>`;
}

function home() {
  return `
    <section class="hero">
      <img class="hero-image" src="/images/hero-log.jpg" alt="A freshly split log revealing its grain">
      <div class="hero-fade"></div>
      <div class="hero-rail" aria-hidden="true"></div>
      <div class="hero-tick" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="kicker"><span></span>Volatility farming</p>
          <h1 class="display">Get paid for the chop.</h1>
          <p class="lede">Wrap a token into a log. Farm its paired market. Harvest $CHOP rewards. Every wrap, unwrap and trade fee buys back $CHOP.</p>
          <p class="lede-strong">Crypto, stock and meme pairs bring volatility farming to new markets on Robinhood Chain.</p>
          <div class="chips">
            <span class="chip">Crypto</span>
            <span class="chip">Stocks</span>
            <span class="chip">Meme pairs</span>
          </div>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/logs">Open the logs</a>
            <a class="btn btn-outline" href="/docs/introduction">Read the docs</a>
          </div>
        </div>
      </div>
    </section>
    <div class="wrap">
      <p class="soon">Logs open soon.</p>
      <hr class="rule">
      <section class="section">
        <h2 class="display">Why swings pay</h2>
        <p class="prose">When the market chops, a log token's price drifts away from the token it holds. Traders close the gap by wrapping, unwrapping and trading, and every one of those moves pays fees. After the burns and any partner share, the rest is swapped for $CHOP: 20% is burned and 80% goes to farmers.</p>
        <div class="steps">
          <div class="step"><span class="display step-num">1</span><h3>Wrap</h3><p>Deposit a token, get its log token.</p></div>
          <div class="step"><span class="display step-num">2</span><h3>Farm</h3><p>Once the pool is seeded, add its paired token and stake the liquidity.</p></div>
          <div class="step"><span class="display step-num">3</span><h3>Harvest</h3><p>Claim your share of the $CHOP paid to farmers.</p></div>
        </div>
      </section>
      <hr class="rule rule-stamp">
      <section class="fees">
        <div class="fees-tick" aria-hidden="true"></div>
        <h2 class="display">How fees are split</h2>
        <p class="prose">From every 10,000 of fee value, 15% is burned as log tokens. With no partner fee, the remaining 85% is converted to $CHOP by the configured fee route; 20% of that $CHOP is burned and 80% is paid to farmers.</p>
        <div class="bar" aria-hidden="true">
          <i class="seg-blaze" style="width:15%"></i>
          <i class="seg-stamp" style="width:17%"></i>
          <i class="seg-gain" style="width:68%"></i>
        </div>
        <div class="legend">
          <div><small><i class="swatch seg-blaze"></i>Burned as log tokens</small><span class="num">1,500 USDG equivalent</span></div>
          <div><small><i class="swatch seg-stamp"></i>$CHOP burned</small><span class="num">1,700 USDG equivalent</span></div>
          <div><small><i class="swatch seg-gain"></i>Paid to farmers</small><span class="num">6,800 USDG equivalent</span></div>
          <div><small>Treasury</small><span class="num">0 USDG equivalent</span></div>
        </div>
        <p class="fine">Example using 10,000 USDG equivalent of fee value. The 1,700 and 6,800 figures are value equivalents, not $CHOP token amounts. The number of $CHOP tokens depends on its pool price. This assumes no partner fee and is not a forecast.</p>
        <p class="fine">If nobody is farming the log, the $CHOP that would have gone to farmers is burned instead.</p>
        <a class="text-link inline-link" href="/docs/fees">How fees work</a>
      </section>
      <hr class="rule rule-border">
      <section class="section">
        <h2 class="display blaze-title">$CHOP</h2>
        <div class="chop-list">
          <p>Farmers pair log tokens with each log's selected pool asset.</p>
          <p>Traders arbitrage gaps between log prices and backing through those pools.</p>
          <p>After the log-token burn and any partner share, the rest is converted to $CHOP by the fee route.</p>
          <p>Of that $CHOP, 20% is burned and 80% goes to farmers.</p>
        </div>
        <a class="text-link inline-link" href="/docs/chop-token">About $CHOP</a>
      </section>
      <hr class="rule rule-border">
      <section class="section">
        <h2 class="display">What we won't do</h2>
        <div class="plain-list">
          <p>No yield forecasts. Historical APY uses what has happened on-chain, not guesses about what comes next.</p>
          <p>No leverage or borrowing.</p>
          <p>No unlimited approvals. You approve exactly what you use.</p>
        </div>
      </section>
      <hr class="rule rule-border">
      <section class="cta">
        <div class="cta-rail" aria-hidden="true"></div>
        <h2 class="display">Markets chop. <span>Get paid for it.</span></h2>
        <div class="cta-actions">
          <a class="btn btn-primary" href="/logs">Open the logs</a>
          <a class="text-link" href="/docs/risks">Read the risks</a>
        </div>
      </section>
    </div>`;
}

function logsPage() {
  return `
    <div class="page">
      <h1 class="display">Logs</h1>
      <p class="lede">Wrap your token into its chop-wrapped version, deposit it alongside the paired asset into the log's pool, and earn a share of the fees every wrap, unwrap and trade generates. Three moves: wrap, farm, harvest.</p>
      <div class="panel">
        <h2>No logs are open yet.</h2>
        <p>The first ones are being seeded.</p>
      </div>
    </div>`;
}

function portfolioPage() {
  return `
    <div class="page">
      <p class="eyebrow">Positions</p>
      <h1 class="display">Your cut.</h1>
      <p class="lede">Balances, farmed liquidity, and $CHOP rewards ready to harvest.</p>
      <div class="panel">
        <p>Connect a wallet to see your positions.</p>
        <button class="btn btn-primary js-connect" type="button">Connect wallet</button>
      </div>
    </div>`;
}

function launchPage() {
  return `
    <div class="page">
      <h1 class="display">Launch a log</h1>
      <div class="panel">
        <p>Contracts are not configured for this network yet.</p>
      </div>
    </div>`;
}

function docsPage(slug, query = "") {
  const found = findDoc(slug) || findDoc("introduction");
  const { page, prev, next } = found;
  const q = query.trim().toLowerCase();
  const groups = docGroups
    .map((group) => {
      const links = group.pages
        .map((item) => {
          const hay = `${item.nav} ${item.title}`.toLowerCase();
          const hidden = q && !hay.includes(q) ? " hidden" : "";
          const active = item.slug === page.slug ? " active" : "";
          return `<a class="${active}${hidden}" href="/docs/${item.slug}">${item.nav}</a>`;
        })
        .join("");
      const visible = group.pages.some((item) => !q || `${item.nav} ${item.title}`.toLowerCase().includes(q));
      return visible ? `<div class="docs-group"><p>${group.label}</p>${links}</div>` : "";
    })
    .join("");
  const toc = page.toc.length
    ? `<aside class="toc"><p>On this page</p>${page.toc
        .map(([id, label]) => `<a href="#${id}">${label}</a>`)
        .join("")}</aside>`
    : `<aside class="toc"></aside>`;
  const pager = `
    <div class="pager">
      <div>${prev ? `<a href="/docs/${prev.slug}"><small>Previous</small>${prev.nav}</a>` : ""}</div>
      <div>${next ? `<a href="/docs/${next.slug}"><small>Next</small>${next.title}</a>` : ""}</div>
    </div>`;
  return `
    <div class="docs-layout">
      <aside class="docs-side">
        <button class="btn btn-sm btn-outline docs-menu-btn" type="button" id="docs-menu">Docs menu</button>
        <label class="docs-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
          <input id="doc-search" type="search" placeholder="Search docs" aria-label="Search docs" value="${escapeAttr(query)}">
        </label>
        <nav class="docs-nav" id="docs-nav" aria-label="Docs">${groups || `<p class="empty-search">No matching pages.</p>`}</nav>
      </aside>
      <article class="doc">
        <div class="doc-kicker" aria-hidden="true"></div>
        <h1 class="display">${page.title}</h1>
        <div class="doc-body">${page.body}${pager}</div>
      </article>
      ${toc}
    </div>`;
}

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function render() {
  const path = location.pathname.replace(/\/$/, "") || "/";
  let title = "Chop | Get paid for the chop";
  let main = home();

  if (path === "/logs") {
    title = "Logs | Chop";
    main = logsPage();
  } else if (path === "/portfolio") {
    title = "Portfolio | Chop";
    main = portfolioPage();
  } else if (path === "/launch") {
    title = "Launch a log | Chop";
    main = launchPage();
  } else if (path.startsWith("/docs")) {
    const slug = path.split("/")[2] || "introduction";
    const known = allDocs().some((page) => page.slug === slug);
    const pageSlug = known ? slug : "introduction";
    const doc = findDoc(pageSlug);
    title = `${doc.page.title} | Chop docs`;
    main = docsPage(pageSlug, new URLSearchParams(location.search).get("q") || "");
    if (!known) history.replaceState({}, "", "/docs/introduction");
  } else if (path !== "/") {
    history.replaceState({}, "", "/");
    main = home();
  }

  document.title = title;
  root.innerHTML = `${header(path)}<main id="main-content" class="w-full">${main}</main>${footer()}`;
  document.querySelector("#docs-menu")?.addEventListener("click", () => {
    document.querySelector("#docs-nav")?.classList.toggle("open");
  });
}

function filterDocs(query) {
  const q = query.trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll(".docs-group").forEach((group) => {
    let groupVisible = 0;
    group.querySelectorAll("a").forEach((link) => {
      const match = !q || link.textContent.toLowerCase().includes(q);
      link.classList.toggle("hidden", !match);
      if (match) groupVisible += 1;
    });
    group.hidden = groupVisible === 0;
    visible += groupVisible;
  });
  let empty = document.querySelector(".empty-search");
  const navEl = document.querySelector("#docs-nav");
  if (!visible) {
    if (!empty && navEl) {
      empty = document.createElement("p");
      empty.className = "empty-search";
      empty.textContent = "No matching pages.";
      navEl.append(empty);
    }
  } else {
    empty?.remove();
  }
}

function showToast() {
  toaster.innerHTML = `
    <div class="toast" role="status">
      <strong>No wallet found</strong>
      <p>Install a browser wallet like MetaMask or Rabby, then try again.</p>
      <a class="btn btn-sm btn-primary" href="https://metamask.io/download/" target="_blank" rel="noreferrer">Get MetaMask</a>
    </div>`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toaster.innerHTML = "";
  }, 6000);
}

document.addEventListener("input", (event) => {
  if (event.target.id === "doc-search") filterDocs(event.target.value);
});

document.addEventListener("click", (event) => {
  const connect = event.target.closest(".js-connect");
  if (connect) {
    event.preventDefault();
    showToast();
    return;
  }
  const link = event.target.closest("a");
  if (!link) return;
  if (link.target === "_blank" || link.origin !== location.origin) return;
  if (link.getAttribute("href")?.startsWith("#")) return;
  event.preventDefault();
  const url = new URL(link.href);
  if (url.pathname === location.pathname && url.search === location.search) {
    if (url.hash) {
      document.querySelector(url.hash)?.scrollIntoView();
      history.replaceState({}, "", url.pathname + url.hash);
    }
    return;
  }
  history.pushState({}, "", url.pathname + url.search + url.hash);
  render();
  if (url.hash) document.querySelector(url.hash)?.scrollIntoView();
  else window.scrollTo(0, 0);
});

window.addEventListener("popstate", () => {
  render();
  window.scrollTo(0, 0);
});

render();
