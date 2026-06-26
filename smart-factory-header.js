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
        .app-icon{width:52px;height:64px;background:rgba(255,255,255,.09);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;cursor:pointer;transition:background .15s ease;color:#fff;border:0;}
        .screen-switcher.open .app-icon,.app-icon:hover{background:rgba(255,255,255,.16);}
        .screen-menu{position:absolute;left:8px;top:64px;width:238px;background:#fff;border:1px solid rgba(0,0,0,.14);border-radius:12px;box-shadow:0 18px 48px rgba(8,16,38,.22);padding:8px;display:none;color:#1f2937;}
        .screen-switcher.open .screen-menu{display:block;}
        .screen-menu-title{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:rgba(0,0,0,.52);padding:8px 10px 6px;}
        .screen-menu-item{width:100%;border:0;background:#fff;border-radius:8px;padding:10px;display:flex;align-items:center;gap:10px;text-align:left;cursor:pointer;color:#1f2937;}
        .screen-menu-item:hover{background:#eaf1ff;color:#115dff;}
        .screen-menu-item.active{background:#eef4ff;color:#115dff;}
        .screen-menu-icon{width:30px;height:30px;border-radius:8px;background:#f3f6fb;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
        .screen-menu-label{display:block;font-size:13px;font-weight:800;line-height:1.15;}
        .screen-menu-sub{display:block;font-size:11px;color:rgba(0,0,0,.55);margin-top:2px;}
        .brand{display:flex;align-items:center;gap:8px;padding-left:16px;padding-right:20px;}
        .bd-mark{width:36px;height:36px;border-radius:999px;background:#fff;color:var(--nav);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0;position:relative;}
        .bd-mark:before{content:"";width:20px;height:20px;border-radius:50%;background:conic-gradient(from 0deg,var(--nav) 0 10%,transparent 10% 20%,var(--nav) 20% 30%,transparent 30% 40%,var(--nav) 40% 50%,transparent 50% 60%,var(--nav) 60% 70%,transparent 70% 80%,var(--nav) 80% 90%,transparent 90% 100%);position:absolute;}
        .bd-text{font-size:25px;font-weight:800;letter-spacing:-.02em;line-height:1;}
        .factory-text{font-size:20px;font-weight:800;line-height:1;margin-left:4px;}
        .search-wrap{flex:1;display:flex;justify-content:center;}
        .search{position:relative;width:260px;}
        .search input{height:40px;width:100%;border:0;border-radius:10px;padding:0 44px 0 16px;font-size:14px;color:#1f2937;background:#fff;}
        .search-dot{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:30px;height:30px;border-radius:999px;background:var(--accent);display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;}
        .top-actions{display:flex;align-items:center;gap:12px;padding-right:20px;}
        .location{font-size:12px;white-space:nowrap;}
        .line-pill{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.10);border-radius:999px;padding:7px 12px;font-size:11px;font-weight:800;white-space:nowrap;}
        .line-pill span{opacity:.6;margin-left:4px;}
        .top-divider{width:1px;height:24px;background:rgba(255,255,255,.16);}
        .topbar-icon{width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:#fff;position:relative;}
        .notify-dot{position:absolute;right:0;top:0;width:8px;height:8px;border-radius:999px;background:#ff6b2c;}
        .shift-btn{height:40px;border:0;border-radius:10px;padding:0 16px;background:var(--accent);color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;gap:8px;}
        .avatar{width:36px;height:36px;border-radius:999px;background:linear-gradient(135deg,#d6b08b,#6f8a66);border:2px solid rgba(255,255,255,.18);}
        .flow-header{height:90px;background:#fff;position:relative;z-index:30;}
        .flow-inner{height:72px;margin-top:9px;display:flex;align-items:stretch;padding:0 40px;min-width:0;}
        .title-block{display:flex;flex-direction:column;justify-content:center;flex-shrink:0;}
        .flow-title{font-size:20px;font-weight:800;white-space:nowrap;}
        .product-block{display:flex;flex-direction:column;justify-content:center;flex-shrink:0;margin-left:100px;}
        .product-name{font-size:14px;font-weight:400;white-space:nowrap;}
        .flow-copy{font-size:12px;color:rgba(0,0,0,.6);white-space:nowrap;}
        .flow-divider{width:1px;height:46px;align-self:center;background:var(--line);flex-shrink:0;margin-left:12px;}
        .bottleneck{display:flex;flex-direction:column;justify-content:center;gap:2px;flex-shrink:0;margin-left:12px;}
        .active-category{flex:1;border-radius:8px;padding:0 16px;margin-left:12px;display:flex;flex-direction:column;justify-content:center;min-width:0;position:relative;overflow:hidden;background:var(--cat-bg, var(--green-bg));transition:background .15s ease;}
        .active-category:before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;background:var(--cat-accent, var(--green));transition:background .15s ease;}
        .active-category-label{font-size:20px;font-weight:400;color:var(--cat-accent, var(--green));transition:color .15s ease;}
        .active-category-sub{font-size:10px;color:rgba(0,0,0,.72);}
        .status-control{padding-left:16px;display:flex;flex-direction:column;justify-content:center;gap:6px;flex-shrink:0;}
        .status-buttons{display:flex;align-items:center;gap:8px;}
        .header-action{height:32px;min-width:52px;padding:0 14px;border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.12s;border:1px solid transparent;background:#fff;color:var(--accent);}
        .header-action.primary{background:var(--accent);color:#fff;}
        .header-action.outline{border-color:rgba(37,99,235,.4);}
        .header-action:hover{filter:brightness(.96);background:#e9f0fe;}
        .header-action.primary:hover{background:var(--accent);filter:brightness(.94);}
        .button-divider{width:1px;height:32px;background:var(--line);}
      </style>
      <div class="topbar">
        <div class="screen-switcher" id="switcher">
          <button class="app-icon" type="button" aria-label="Switch screens" id="switchButton">&#9638;</button>
          <div class="screen-menu" id="screenMenu">
            <div class="screen-menu-title">Screens</div>
            <button class="screen-menu-item ${isMonitoring ? '' : 'active'}" type="button" data-path="production-work-order-v1.html">
              <span class="screen-menu-icon">&#9636;</span><span><span class="screen-menu-label">Production Work Order</span><span class="screen-menu-sub">Current flow</span></span>
            </button>
            <button class="screen-menu-item ${isMonitoring ? 'active' : ''}" type="button" data-path="figma-3d-line-monitoring.html">
              <span class="screen-menu-icon">&#9723;</span><span><span class="screen-menu-label">3D Line Monitoring</span><span class="screen-menu-sub">Figma screen</span></span>
            </button>
          </div>
        </div>
        <div class="brand"><div class="bd-mark"><span>BD</span></div><div class="bd-text">BD</div><div class="factory-text">Smart Factory</div></div>
        <div class="search-wrap"><div class="search"><input placeholder="Search ..."><span class="search-dot">&#128269;</span></div></div>
        <div class="top-actions"><span class="location">&#9679; Tijuana / Assembly Room / Unit A /</span><span class="line-pill">Line 1 <span>+2</span></span><div class="top-divider"></div><span class="topbar-icon">&#10022;</span><span class="topbar-icon">&#8962;</span><span class="topbar-icon">&#9635;</span><span class="topbar-icon">&#9679;<span class="notify-dot"></span></span><button class="shift-btn" type="button">SHIFT ENTRY <span>v</span></button><div class="avatar"></div></div>
      </div>
      <div class="flow-header">
        <div class="flow-inner">
          <div class="title-block"><div class="flow-title">Digital OEE</div></div>
          <div class="product-block"><div class="product-name">NEXIVA 20 GA X 1 IN SINGLE PORT</div><div class="flow-copy">SKU: 80-APX-50000 | Lot: L2075-0245</div></div>
          <div class="flow-divider"></div>
          <div class="bottleneck"><div class="flow-copy">Bottleneck</div><div class="flow-copy">Autoguard 13 Zone #5</div></div>
          <div class="flow-divider"></div>
          <div class="active-category"><div class="active-category-label">Production</div><div class="active-category-sub">Active Category</div></div>
          <div class="status-control"><span class="flow-copy">Status Control</span><div class="status-buttons"><button class="header-action primary" type="button" data-action="badge-auth" title="Assign & Run a Work Order"><svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M5 4l8 8-8 8V4z"/><path d="M13 4l8 8-8 8V4z"/></svg></button><button class="header-action outline" type="button" data-action="control-panel" title="Open Work Order Control Panel"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button><div class="button-divider"></div><button class="header-action outline" type="button" data-action="flag" title="Flag Category"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v18M5 4h13l-2.5 3.5L18 11H5"/></svg></button></div></div>
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
    const flagButton = this.shadowRoot.querySelector('[data-action="flag"]');
    const badgeAuthButton = this.shadowRoot.querySelector('[data-action="badge-auth"]');
    const controlPanelButton = this.shadowRoot.querySelector('[data-action="control-panel"]');
    if (badgeAuthButton) {
      badgeAuthButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        window.dispatchEvent(new Event('smart-factory:open-badge-auth'));
      });
    }
    if (controlPanelButton) {
      controlPanelButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        window.dispatchEvent(new Event('smart-factory:open-control-panel'));
      });
    }
    if (flagButton) {
      flagButton.addEventListener('click', () => {
        const row = document.getElementById('flagCategoryRow');
        if (row) {
          const isOpen = row.style.visibility === 'visible';
          row.style.opacity = isOpen ? '0' : '1';
          row.style.visibility = isOpen ? 'hidden' : 'visible';
          row.style.transform = isOpen ? 'translateY(-6px)' : 'translateY(0)';
          return;
        }
        if (typeof window.toggleFlagCategories === 'function') {
          window.toggleFlagCategories();
          return;
        }
        if (typeof window.Event === 'function') {
          window.dispatchEvent(new Event('smart-factory:toggle-flag-categories'));
        }
      });
    }
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
