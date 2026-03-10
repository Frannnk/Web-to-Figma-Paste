(() => {
  if (window.__WEBLINK_CLIPBOARD_ONLY__) return;
  window.__WEBLINK_CLIPBOARD_ONLY__ = true;

  const state = {
    toolbarVisible: false,
    picking: false,
    hoverEl: null
  };

  const iconCapture =
    '<svg class="weblink-icon" viewBox="0 0 18 18" aria-hidden="true"><path d="M6.75 3.74963C7.78555 3.74963 8.62537 4.58945 8.62537 5.625V7.16199C8.74642 7.13744 8.87172 7.12463 9 7.12463C9.42247 7.12463 9.81142 7.26565 10.125 7.50146C10.4386 7.26565 10.8275 7.12463 11.25 7.12463C11.6725 7.12463 12.0614 7.26565 12.375 7.50146C12.6886 7.26565 13.0775 7.12463 13.5 7.12463C14.5356 7.12463 15.3754 7.96445 15.3754 9V11.8125C15.3752 14.6082 13.1085 16.8748 10.3129 16.875H9.93713C7.14147 16.8748 4.87483 14.6082 4.87463 11.8125V5.625C4.87463 4.58945 5.71445 3.74963 6.75 3.74963ZM6.75 5.25037C6.54288 5.25037 6.37537 5.41788 6.37537 5.625V11.8125C6.37556 13.7797 7.9699 15.3741 9.93713 15.3743H10.3129C12.2801 15.3741 13.8744 13.7797 13.8746 11.8125V9C13.8746 8.79288 13.7071 8.62537 13.5 8.62537C13.2929 8.62537 13.1254 8.79288 13.1254 9V10.8754C13.1252 11.2894 12.7891 11.6246 12.375 11.6246C11.9609 11.6246 11.6248 11.2894 11.6246 10.8754V9C11.6246 8.79288 11.4571 8.62537 11.25 8.62537C11.0429 8.62537 10.8754 8.79288 10.8754 9V10.8754C10.8752 11.2894 10.5391 11.6246 10.125 11.6246C9.71091 11.6246 9.37483 11.2894 9.37463 10.8754V9C9.37463 8.79288 9.20712 8.62537 9 8.62537C8.79288 8.62537 8.62537 8.79288 8.62537 9V10.8754C8.62517 11.2894 8.28909 11.6246 7.875 11.6246C7.46091 11.6246 7.12483 11.2894 7.12463 10.8754V5.625C7.12463 5.41788 6.95712 5.25037 6.75 5.25037ZM6.75 1.125C8.23362 1.12511 9.55046 1.84464 10.3689 2.94983C10.5878 3.24559 10.7718 3.56989 10.9138 3.91553L11.0424 4.26819L11.1313 4.59558C11.2089 4.92665 11.25 5.27162 11.25 5.625C11.2498 6.03879 10.9145 6.37498 10.5007 6.37537C10.0867 6.37537 9.75059 6.03902 9.75037 5.625C9.75033 5.30894 9.70164 5.00512 9.61194 4.72083L9.52625 4.48572C9.43178 4.25592 9.30985 4.03934 9.1637 3.84192C8.61598 3.1023 7.73818 2.62584 6.75 2.62573C5.7619 2.62585 4.88513 3.10238 4.3374 3.84192C4.14233 4.10537 3.9898 4.40229 3.88916 4.72083C3.79941 5.0052 3.75077 5.30881 3.75073 5.625C3.75051 6.03891 3.41429 6.37518 3.00037 6.37537C2.58629 6.37537 2.25022 6.03902 2.25 5.625C2.25004 5.15352 2.32326 4.69714 2.45874 4.26819L2.58728 3.91553C2.72943 3.56973 2.91314 3.24568 3.1322 2.94983C3.95064 1.84465 5.26639 1.12512 6.75 1.125Z" fill="currentColor"/></svg>';
  const iconPage =
    '<svg class="weblink-icon" viewBox="0 0 18 18" aria-hidden="true"><path d="M15.3743 1.125C16.2027 1.125 16.875 1.79731 16.875 2.62573V10.125C16.8748 10.9532 16.2026 11.6257 15.3743 11.6257H11.6257V15.3743C11.6257 16.2026 10.9533 16.8748 10.125 16.875H2.62573C1.79731 16.875 1.125 16.2027 1.125 15.3743V7.875C1.12522 7.04674 1.79745 6.37427 2.62573 6.37427H6.37427V2.62573C6.37427 1.79743 7.04671 1.12519 7.875 1.125H15.3743ZM2.62573 15.3743H10.125V11.6257H7.875C7.66771 11.6257 7.47017 11.5832 7.29053 11.5071C7.06646 11.4122 6.86975 11.2647 6.71704 11.0797C6.50288 10.8203 6.37437 10.4874 6.37427 10.125V7.875H2.62573V15.3743ZM7.875 10.125H15.3743V2.62573H7.875V10.125Z" fill="currentColor"/></svg>';
  const iconCursor =
    '<svg class="weblink-icon" viewBox="0 0 18 18" aria-hidden="true"><path d="M7.71899 7.71899C7.89621 7.5418 8.1511 7.46564 8.39685 7.51465L15.8972 9.01428C16.1943 9.0739 16.426 9.30705 16.485 9.60425C16.5438 9.9018 16.4177 10.205 16.1653 10.3733L14.6755 11.3654L16.2795 12.9694C16.5724 13.2622 16.5724 13.7366 16.2795 14.0295L14.0295 16.2795C13.7366 16.5724 13.2623 16.5724 12.9694 16.2795L11.3654 14.6755L10.3733 16.1653C10.205 16.4177 9.9018 16.5438 9.60425 16.485C9.30703 16.426 9.0739 16.1943 9.01428 15.8972L7.51465 8.39685C7.46566 8.1511 7.54179 7.8962 7.71899 7.71899ZM5.28772 11.651C5.58061 11.3585 6.05623 11.3583 6.349 11.651C6.64169 11.9438 6.64148 12.4194 6.349 12.7123L4.22754 14.8337C3.93467 15.1265 3.45913 15.1265 3.16626 14.8337C2.8735 14.5409 2.87348 14.0653 3.16626 13.7725L5.28772 11.651ZM10.1294 13.8263L10.626 13.0836L10.6754 13.0166C10.8005 12.868 10.9799 12.7725 11.1753 12.7529C11.3986 12.7308 11.6207 12.8109 11.7795 12.9694L13.4989 14.6887L14.6887 13.4989L12.9694 11.7795C12.8109 11.6207 12.7308 11.3986 12.7529 11.1753C12.7753 10.9521 12.897 10.7505 13.0836 10.626L13.8263 10.1294L9.20435 9.20435L10.1294 13.8263ZM4.5 8.24963C4.91405 8.24983 5.24927 8.58591 5.24927 9C5.24927 9.41409 4.91405 9.75017 4.5 9.75037H1.49963C1.08558 9.75018 0.749268 9.4141 0.749268 9C0.749268 8.5859 1.08558 8.24982 1.49963 8.24963H4.5ZM3.16626 3.16626C3.45916 2.8734 3.93466 2.87338 4.22754 3.16626L6.349 5.28772C6.64156 5.58063 6.64175 6.05621 6.349 6.349C6.05621 6.64178 5.58064 6.64157 5.28772 6.349L3.16626 4.22754C2.87337 3.93465 2.87337 3.45915 3.16626 3.16626ZM13.7725 3.16626C14.0653 2.87348 14.5409 2.8735 14.8337 3.16626C15.1265 3.45913 15.1265 3.93467 14.8337 4.22754L12.7123 6.349C12.4194 6.64155 11.9438 6.64171 11.651 6.349C11.3583 6.0562 11.3585 5.5806 11.651 5.28772L13.7725 3.16626ZM9 0.749268C9.41408 0.749268 9.75014 1.08561 9.75037 1.49963V4.5C9.75017 4.91405 9.41409 5.24927 9 5.24927C8.58591 5.24927 8.24983 4.91405 8.24963 4.5V1.49963C8.24986 1.08561 8.58592 0.749268 9 0.749268Z" fill="currentColor"/></svg>';
  const iconLogo =
    '<svg class="weblink-logo" viewBox="0 0 32 48" aria-hidden="true"><path d="M28.9602 35.1927L23.843 36.6673L22.3684 41.7835L19.4807 32.304L28.9602 35.1927ZM21.8704 6.87334C25.4163 6.87334 28.2913 9.7476 28.2913 13.2923C28.2911 15.5372 27.1373 17.5125 25.3909 18.6595C27.1373 19.8065 28.2912 21.7826 28.2913 24.0276C28.2913 27.5723 25.4163 30.4456 21.8704 30.4456H21.7532C20.0903 30.4455 18.5752 29.8136 17.4348 28.7767V34.7054C17.4348 38.2896 14.4968 41.1819 10.9261 41.1819C7.38771 41.1818 4.47696 38.3158 4.47684 34.764C4.47684 32.5189 5.62985 30.5429 7.37625 29.3958C5.62984 28.2487 4.47684 26.2727 4.47684 24.0276C4.4769 21.7826 5.62982 19.8065 7.37625 18.6595C5.63005 17.5125 4.47698 15.5371 4.47684 13.2923C4.47684 9.7476 7.35182 6.87334 10.8977 6.87334H21.8704ZM10.8977 30.4456C8.5123 30.4456 6.5784 32.3794 6.5784 34.764C6.57852 37.141 8.53343 39.0812 10.9261 39.0813C13.3511 39.0813 15.3333 37.1149 15.3333 34.7054V30.4456H10.8977ZM10.8977 19.7103C8.51236 19.7103 6.57849 21.6431 6.5784 24.0276C6.5784 26.4122 8.5123 28.346 10.8977 28.346H15.3333V19.7103H10.8977ZM21.7532 19.7103C19.368 19.7105 17.4349 21.6433 17.4348 24.0276C17.4348 26.4121 19.368 28.3458 21.7532 28.346H21.8704C24.2558 28.346 26.1897 26.4122 26.1897 24.0276C26.1896 21.6431 24.2558 19.7103 21.8704 19.7103H21.7532ZM10.8977 8.97393C8.5123 8.97393 6.5784 10.9077 6.5784 13.2923C6.57862 15.6767 8.51244 17.6097 10.8977 17.6097H15.3333V8.97393H10.8977ZM17.4348 17.6097H21.8704C24.2557 17.6097 26.1895 15.6767 26.1897 13.2923C26.1897 10.9077 24.2558 8.97393 21.8704 8.97393H17.4348V17.6097Z" fill="currentColor"/></svg>';

  let toolbar = null;
  let statusEl = null;
  let hoverOutline = null;

  const hideNativeStyle = document.createElement('style');
  hideNativeStyle.textContent = '#__figma_capture_toolbar_host__{display:none !important;}';
  document.documentElement.appendChild(hideNativeStyle);

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type === 'WEBLINK_TOGGLE_TOOLBAR') {
      toggleToolbar();
    }
  });

  function toggleToolbar() {
    if (state.toolbarVisible) teardownToolbar();
    else setupToolbar();
  }

  function setupToolbar() {
    if (toolbar) return;

    toolbar = document.createElement('section');
    toolbar.id = 'weblink-figma-toolbar';
    toolbar.setAttribute('data-figma-capture-ignore', '1');
    toolbar.innerHTML = `
      <header class="weblink-head">
        <div class="weblink-brand">
          ${iconLogo}
          <div>
            <div class="weblink-title">Web to Figma Paste</div>
            <div class="weblink-sub">仅限 Chrome。复制后在 Figma 使用 Cmd/Ctrl+V 粘贴。</div>
          </div>
        </div>
        <button class="weblink-close" data-act="close" aria-label="关闭">✕</button>
      </header>
      <div class="weblink-body">
        <div class="weblink-actions">
          <button class="weblink-btn weblink-btn-main" data-act="capture-main">${iconCapture}<span>拾取网页内容</span></button>
          <button class="weblink-btn" data-act="copy-body">${iconPage}<span>复制整页</span></button>
          <button class="weblink-btn" data-act="pick">${iconCursor}<span>选择元素</span></button>
        </div>
        <pre class="weblink-status" id="weblink-status"></pre>
        <div class="weblink-author">by Creative Frannnk</div>
      </div>
    `;

    // Mount overlay outside <body> so body capture never includes extension UI.
    document.documentElement.appendChild(toolbar);
    toolbar.querySelectorAll('*').forEach((node) => {
      node.setAttribute('data-figma-capture-ignore', '1');
    });
    statusEl = toolbar.querySelector('#weblink-status');

    hoverOutline = document.createElement('div');
    hoverOutline.id = 'weblink-figma-hover-outline';
    hoverOutline.setAttribute('data-figma-capture-ignore', '1');
    document.documentElement.appendChild(hoverOutline);

    toolbar.addEventListener('click', onToolbarClick);
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('click', onPageClick, true);

    state.toolbarVisible = true;
    setStatus('准备就绪...\n点击“拾取网页内容”或“选择元素”开始采集。', 'info');
  }

  function teardownToolbar() {
    if (!toolbar) return;

    toolbar.removeEventListener('click', onToolbarClick);
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('click', onPageClick, true);

    state.picking = false;
    state.hoverEl = null;

    hoverOutline?.remove();
    hoverOutline = null;

    toolbar.remove();
    toolbar = null;
    statusEl = null;
    state.toolbarVisible = false;
  }

  function onToolbarClick(event) {
    const btn = event.target.closest('button[data-act]');
    if (!btn) return;

    const act = btn.dataset.act;

    if (act === 'close') {
      teardownToolbar();
      return;
    }

    if (act === 'capture-main') {
      void copyBySelector('body', '拾取网页内容');
      return;
    }

    if (act === 'copy-body') {
      void copyBySelector('body', '复制整页');
      return;
    }

    if (act === 'pick') {
      state.picking = true;
      setStatus('选择模式已开启...\n点击页面任意元素，系统将智能采集并复制。', 'progress');
      return;
    }

  }

  function onMouseMove(event) {
    if (!state.toolbarVisible || !state.picking) return;
    const el = findTarget(event.target);
    state.hoverEl = el;
    drawHover(el);
  }

  function onPageClick(event) {
    if (!state.toolbarVisible || !state.picking) return;
    if (isInsideToolbar(event.target)) return;

    const el = findTarget(event.target);
    if (!el) return;

    event.preventDefault();
    event.stopPropagation();

    state.picking = false;
    hideHover();

    const selector = buildSelector(el);
    setStatus(`已选中元素：${selector}\n开始采集...`, 'progress');
    void copyBySelector(selector, '选择元素');
  }

  async function copyBySelector(selector, sourceLabel) {
    // capture.js treats literal "body" as whole document capture.
    // Use an equivalent selector to target only the <body> element.
    const effectiveSelector = selector === 'body' ? 'body:nth-of-type(1)' : selector;

    setStatus(`${sourceLabel}\n开始采集...`, 'progress');
    await wait(120);
    setStatus(`${sourceLabel}\n采集中...\n正在扫描 DOM、布局与样式...`, 'progress');
    await wait(180);

    const restoreOverlay = suspendOverlayForCapture();
    try {
      const responsePromise = chrome.runtime.sendMessage({
        type: 'WEBLINK_COPY_CAPTURE',
        selector: effectiveSelector
      });

      // Fast-feedback UX: if backend takes too long, switch to success copy hint quickly.
      const outcome = await Promise.race([
        responsePromise
          .then((response) => ({ type: 'response', response }))
          .catch((error) => ({ type: 'error', error })),
        wait(700).then(() => ({ type: 'timeout' }))
      ]);

      if (outcome.type === 'response' && !outcome.response?.ok) {
        throw new Error(outcome.response?.error || '未知采集错误');
      }

      if (outcome.type === 'error') {
        throw outcome.error;
      }

      setStatus(
        `${sourceLabel}\n采集完成...\n内容已复制，可去 Figma 直接粘贴。`,
        'success'
      );

      // Late failure guard: if timeout path showed success first and backend later fails, update status.
      if (outcome.type === 'timeout') {
        responsePromise
          .then((response) => {
            if (!response?.ok) {
              setStatus(`${sourceLabel}\n采集失败：${toUserFacingError(response?.error)}`, 'error');
            }
          })
          .catch((error) => {
            setStatus(`${sourceLabel}\n采集失败：${toUserFacingError(error)}`, 'error');
          });
      }
    } catch (error) {
      setStatus(`${sourceLabel}\n采集失败：${toUserFacingError(error)}`, 'error');
    } finally {
      restoreOverlay();
    }
  }

  function toUserFacingError(error) {
    const raw = String(error?.message || error || '未知采集错误');
    const lower = raw.toLowerCase();
    if (lower.includes('extension context invalidated')) {
      return '扩展已更新或重载，请刷新当前页面后重试。';
    }
    return raw;
  }

  function drawHover(el) {
    if (!hoverOutline || !el) return hideHover();

    const rect = el.getBoundingClientRect();
    hoverOutline.style.display = 'block';
    hoverOutline.style.left = `${rect.left + window.scrollX}px`;
    hoverOutline.style.top = `${rect.top + window.scrollY}px`;
    hoverOutline.style.width = `${rect.width}px`;
    hoverOutline.style.height = `${rect.height}px`;
  }

  function hideHover() {
    if (hoverOutline) hoverOutline.style.display = 'none';
  }

  function findTarget(target) {
    let el = target instanceof Element ? target : null;
    while (el && el !== document.body) {
      if (isInsideToolbar(el)) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (rect.width > 1 && rect.height > 1 && style.display !== 'none' && style.visibility !== 'hidden') {
        return el;
      }
      el = el.parentElement;
    }
    return document.body;
  }

  function buildSelector(el) {
    if (el === document.body) return 'body';
    if (el.id) return `#${CSS.escape(el.id)}`;

    const classes = Array.from(el.classList || []).slice(0, 2);
    if (classes.length) {
      const candidate = `${el.tagName.toLowerCase()}.${classes.map((c) => CSS.escape(c)).join('.')}`;
      if (document.querySelectorAll(candidate).length === 1) return candidate;
    }

    const chain = [];
    let current = el;
    while (current && current !== document.body) {
      let part = current.tagName.toLowerCase();
      if (current.id) {
        part = `#${CSS.escape(current.id)}`;
        chain.unshift(part);
        break;
      }

      const siblings = current.parentElement
        ? Array.from(current.parentElement.children).filter((n) => n.tagName === current.tagName)
        : [];

      if (siblings.length > 1) {
        part += `:nth-of-type(${siblings.indexOf(current) + 1})`;
      }

      chain.unshift(part);
      current = current.parentElement;
    }

    return chain.join(' > ') || 'body';
  }

  function isInsideToolbar(target) {
    return !!target?.closest?.('#weblink-figma-toolbar');
  }

  function setStatus(text, tone = 'info') {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.classList.remove('-info', '-progress', '-success', '-error');
    statusEl.classList.add(`-${tone}`);
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function suspendOverlayForCapture() {
    state.picking = false;
    state.hoverEl = null;
    hideHover();
    // Keep toolbar mounted to avoid visual flicker. Overlay nodes are marked
    // with data-figma-capture-ignore so they should not be included in capture.
    return () => {};
  }

})();
