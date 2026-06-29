class SmartFactoryHeader extends HTMLElement {
  connectedCallback() {
    const activeScreen = this.getAttribute('active-screen') || 'production';
    const isMonitoring = activeScreen === 'monitoring';
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host{display:block;--accent:#2563eb;--nav:#020043;--line:rgba(0,0,0,.14);--green:#16a34a;--green-bg:#e9f8ef;font-family:'Roboto','Segoe UI',system-ui,sans-serif;color:#242424;}
        *{box-sizing:border-box;font-family:inherit;}
        .topbar{height:64px;background:var(--nav);color:#fff;display:flex;align-items:center;flex-shrink:0;}
        .screen-switcher{position:relative;z-index:200;}
        .app-icon{width:52px;height:64px;background:rgba(255,255,255,.09);display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:background .15s ease;color:#fff;border:0;}
        .app-icon svg{width:22px;height:22px;fill:currentColor;display:block;}
        .screen-switcher.open .app-icon,.app-icon:hover{background:rgba(255,255,255,.16);}
        .screen-menu{position:absolute;left:8px;top:64px;width:272px;background:#fff;border:1px solid rgba(0,0,0,.14);border-radius:12px;box-shadow:0 18px 48px rgba(8,16,38,.22);padding:10px;display:none;flex-direction:column;gap:4px;color:#1f2937;}
        .screen-switcher.open .screen-menu{display:flex;}
        .screen-menu-title{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:rgba(0,0,0,.52);padding:8px 10px 8px;}
        .screen-menu-item{width:100%;border:0;background:#fff;border-radius:9px;padding:8px 12px;display:flex;align-items:center;gap:12px;text-align:left;cursor:pointer;color:#1f2937;}
        .screen-menu-item:hover{background:#eaf1ff;color:#115dff;}
        .screen-menu-item.active{background:#eef4ff;color:#115dff;}
        .screen-menu-icon{width:34px;height:34px;border-radius:9px;background:#f3f6fb;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:currentColor;}
        .screen-menu-icon svg{width:22px;height:22px;fill:currentColor;display:block;}
        .screen-menu-label{display:block;font-size:14px;font-weight:800;line-height:1.15;}
        .brand{display:flex;align-items:center;gap:14px;padding-left:16px;padding-right:20px;}
        .bd-logotype{width:84px;height:32px;display:block;flex-shrink:0;}
        .factory-text{font-size:24px;font-weight:700;line-height:1;white-space:nowrap;}
        .header-spacer{flex:1;min-width:24px;}
        .search{position:relative;width:320px;flex-shrink:0;}
        .search input{height:36px;width:100%;border:0;border-radius:10px;padding:0 14px 0 40px;font-size:14px;color:#fff;background:rgba(255,255,255,.12);}
        .search input::placeholder{color:#fff;opacity:1;}
        .search-dot{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:18px;height:18px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.35);pointer-events:none;}
        .search-dot svg{width:18px;height:18px;fill:currentColor;display:block;}
        .top-actions{display:flex;align-items:center;gap:12px;padding-right:20px;}
        .top-divider{width:1px;height:24px;background:rgba(255,255,255,.16);}
        .topbar-icon-btn{width:40px;height:40px;border:0;border-radius:10px;background:transparent;color:#fff;display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;transition:background .15s ease;}
        .topbar-icon-btn:hover{background:rgba(255,255,255,.12);}
        .topbar-icon-btn svg{width:24px;height:24px;fill:currentColor;display:block;}
        .notify-dot{position:absolute;right:8px;top:8px;width:8px;height:8px;border-radius:999px;background:#ff6b2c;}
        .shift-btn{height:36px;border:0;border-radius:12px;padding:0 16px;background:var(--accent);color:#fff;font-size:14px;font-weight:500;line-height:1;display:flex;align-items:center;gap:8px;text-transform:uppercase;cursor:pointer;}
        .shift-btn svg{width:20px;height:20px;fill:currentColor;display:block;}
        .avatar{width:36px;height:36px;border-radius:999px;background:linear-gradient(135deg,#d6b08b,#6f8a66);border:2px solid rgba(255,255,255,.18);}
      </style>
      <div class="topbar">
        <div class="screen-switcher" id="switcher">
          <button class="app-icon" type="button" aria-label="Switch screens" id="switchButton">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4h4v4H4V4Zm6 0h4v4h-4V4Zm6 0h4v4h-4V4ZM4 10h4v4H4v-4Zm6 0h4v4h-4v-4Zm6 0h4v4h-4v-4ZM4 16h4v4H4v-4Zm6 0h4v4h-4v-4Zm6 0h4v4h-4v-4Z"/>
            </svg>
          </button>
          <div class="screen-menu" id="screenMenu">
            <div class="screen-menu-title">Use Cases</div>
            <button class="screen-menu-item ${isMonitoring ? '' : 'active'}" type="button" data-path="index.html">
              <span class="screen-menu-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h12v-2H3v2Zm0 5h18v-2H3v2ZM3 6v2h18V6H3Z"/></svg></span><span><span class="screen-menu-label">Production Overview</span></span>
            </button>
            <button class="screen-menu-item ${isMonitoring ? 'active' : ''}" type="button" data-path="line-monitoring.html">
              <span class="screen-menu-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6Z"/></svg></span><span><span class="screen-menu-label">Digital OEE</span></span>
            </button>
          </div>
        </div>
        <div class="brand">
          <svg class="bd-logotype" viewBox="0 0 84 32" fill="none" aria-label="BD">
            <g clip-path="url(#bdLogotypeClip)">
              <path d="M52.0588 27.9199H43.2239C42.1572 27.9199 41.334 27.0619 41.334 25.9953V6.00658C41.334 4.9283 42.1572 4.1167 43.2239 4.1167H51.4791C56.024 4.1167 58.7371 6.76021 58.7371 10.1921C58.7371 13.6589 56.6154 14.8995 55.8733 15.1661C57.0212 15.456 60.1285 16.7662 60.1285 21.114C60.14 24.8126 57.1371 27.9199 52.0588 27.9199ZM51.3167 7.6066C51.3167 7.6066 51.7341 7.6066 45.1485 7.6066V13.6125C48.8703 13.6125 51.3167 13.6125 51.3167 13.6125C53.7631 13.6125 54.911 12.2559 54.911 10.6095C54.911 8.92836 53.8327 7.6066 51.3167 7.6066ZM52.1979 17.0792H45.1601V24.3721C45.1601 24.3721 47.1196 24.3721 52.1979 24.3721C55.0153 24.3721 56.3139 22.5517 56.3139 20.7198C56.3139 18.9111 55.0385 17.0792 52.1979 17.0792ZM71.1431 27.9199C71.1431 27.9199 70.03 27.9199 65.2764 27.9199C64.2097 27.9199 63.3517 27.1083 63.3517 25.9953V6.00658C63.3517 4.9283 64.2097 4.1167 65.2764 4.1167H71.1431C79.0852 4.1167 83.4795 9.43851 83.4795 16.0241C83.4795 22.5865 79.0389 27.9199 71.1431 27.9199ZM70.8996 7.6066H67.2126V24.4068H70.8996C76.5229 24.4068 79.6534 21.0793 79.6534 16.0125C79.6534 10.8994 76.5693 7.6066 70.8996 7.6066Z" fill="white"/>
              <path d="M16 18.0182C18.3421 18.0182 20.2324 19.9201 20.2324 22.2506C20.2322 23.9198 19.2583 25.3687 17.8558 26.0527C21.554 25.3802 24.5333 22.7601 25.7159 19.3169C25.7391 19.2475 25.7741 19.2007 25.8665 19.189L31.8268 18.3545C30.6673 26.0531 24.0233 31.9541 16 31.9541C7.98843 31.954 1.34456 26.053 0.161914 18.3545L6.13346 19.189C6.22622 19.2006 6.26087 19.2474 6.28406 19.3169C7.46672 22.7604 10.4468 25.3803 14.1454 26.0527C12.7426 25.3688 11.7689 23.92 11.7687 22.2506C11.7687 19.9086 13.6696 18.0183 16 18.0182Z" fill="white"/>
              <path d="M9.22907 14.9113C9.27532 14.946 9.29814 14.9807 9.29814 15.0155C9.29799 15.0732 9.25185 15.0965 9.19397 15.1196C9.10766 15.1524 0.150591 18.2039 0.150591 18.2039C0.0462416 17.4735 0 16.7193 0 15.9541C3.20101e-05 13.6121 0.498542 11.3857 1.40287 9.39151C1.40287 9.39151 9.18269 14.8765 9.22907 14.9113Z" fill="white"/>
              <path d="M30.5971 9.39151C31.5015 11.3857 32 13.6121 32 15.9541C32 16.7193 31.9538 17.4735 31.8494 18.2039C31.8003 18.1872 22.8638 15.1427 22.806 15.1196C22.7597 15.0965 22.702 15.0732 22.7019 15.0155C22.7019 14.9808 22.7249 14.9459 22.7709 14.9113C22.8172 14.8766 30.5684 9.41178 30.5971 9.39151Z" fill="white"/>
              <path d="M10.8867 11.4092C10.9099 11.444 10.9105 11.4675 10.9105 11.4907C10.9104 11.5485 10.8639 11.5835 10.8176 11.5836C10.7944 11.5836 10.7593 11.5827 10.7361 11.5711C10.6378 11.5409 1.46051 9.27878 1.4493 9.27602C2.72468 6.50496 4.75401 4.17413 7.28158 2.52773C7.28158 2.52773 10.8529 11.3367 10.8867 11.4092Z" fill="white"/>
              <path d="M24.7309 2.52773C27.2584 4.17413 29.2878 6.51656 30.5632 9.27602C30.5632 9.27602 21.3448 11.5479 21.2752 11.5711C21.2521 11.5826 21.218 11.5836 21.1948 11.5836C21.1369 11.5836 21.1021 11.5486 21.102 11.4907C21.102 11.4675 21.113 11.444 21.1246 11.4092C21.1478 11.3628 24.7309 2.52773 24.7309 2.52773Z" fill="white"/>
              <path d="M14.168 9.39151C14.1564 9.47267 14.1099 9.49681 14.0752 9.49681C14.029 9.49667 14.0059 9.47285 13.9597 9.42661C13.7391 9.19449 7.39855 2.48354 7.38575 2.46999C9.85532 0.881615 12.7886 -0.0343043 15.9423 -0.0458984C15.9423 -0.0458984 14.25 8.9467 14.168 9.39151Z" fill="white"/>
              <path d="M16.0702 -0.0458984C19.2121 -0.0342265 22.1572 0.881629 24.6267 2.46999C24.6267 2.46999 18.2656 9.20193 18.0528 9.42661C18.0064 9.47299 17.9709 9.49681 17.9362 9.49681C17.9014 9.4966 17.8549 9.46086 17.8433 9.39151C17.7495 8.94502 16.0586 -0.0458984 16.0702 -0.0458984Z" fill="white"/>
            </g>
            <defs><clipPath id="bdLogotypeClip"><rect width="83.4286" height="32" fill="white"/></clipPath></defs>
          </svg>
          <div class="factory-text">Smart Factory</div>
        </div>
        <div class="header-spacer"></div>
        <div class="top-actions">
          <div class="search"><span class="search-dot"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 3C5.91 3 3 5.91 3 9.5S5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57L19.29 20 20 19.29l-5.56-5.56C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3Zm0 1C12.54 4 15 6.46 15 9.5S12.54 15 9.5 15 4 12.54 4 9.5 6.46 4 9.5 4Z"/></svg></span><input placeholder="Search (Ctrl + K)"></div>
          <div class="top-divider"></div>
          <button class="topbar-icon-btn" type="button" aria-label="AI insights"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 1l1.26 2.74L23 5l-2.74 1.26L19 9l-1.26-2.74L15 5l2.74-1.26L19 1ZM9 4l2.5 5.5L17 12l-5.5 2.5L9 20l-2.5-5.5L1 12l5.5-2.5L9 4Zm10 11l1.26 2.74L23 19l-2.74 1.26L19 23l-1.26-2.74L15 19l2.74-1.26L19 15Z"/></svg></button>
          <button class="topbar-icon-btn" type="button" aria-label="Today"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V8h14v11ZM7 10h5v5H7v-5Z"/></svg></button>
          <button class="topbar-icon-btn" type="button" aria-label="Files"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Z"/></svg></button>
          <button class="topbar-icon-btn" type="button" aria-label="Notifications"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2Zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2Z"/></svg><span class="notify-dot"></span></button>
          <button class="shift-btn" type="button">SHIFT ENTRY <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z"/></svg></button>
          <div class="avatar"></div>
        </div>
      </div>
    `;
    const switcher = this.shadowRoot.getElementById('switcher');
    this.shadowRoot.getElementById('switchButton').addEventListener('click', (event) => {
      event.stopPropagation();
      switcher.classList.toggle('open');
    });
    this.shadowRoot.querySelectorAll('[data-path]').forEach((button) => {
      button.addEventListener('click', () => { window.location.href = button.getAttribute('data-path'); });
    });
    document.addEventListener('click', () => switcher.classList.remove('open'));
  }

  setActiveCategory(label, color, bg) {
    if (!this.shadowRoot) return;
    const wrap = this.shadowRoot.querySelector('.active-category');
    const labelEl = this.shadowRoot.querySelector('.active-category-label');
    if (wrap) {
      wrap.style.setProperty('--cat-accent', color);
      wrap.style.setProperty('--cat-bg', bg);
    }
    if (labelEl) labelEl.textContent = label;
  }
}
customElements.define('smart-factory-header', SmartFactoryHeader);
