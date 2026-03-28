const ICONS = {
    bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>',
    overview: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="4" rx="1"/><rect x="14" y="10" width="7" height="11" rx="1"/><rect x="3" y="13" width="7" height="8" rx="1"/></svg>',
    history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    transfer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>',
    shared: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19c0-2.21-2.69-4-6-4s-6 1.79-6 4"/><circle cx="9" cy="9" r="3.5"/><path d="M22 19c0-2.21-1.94-4-4.5-4-.88 0-1.7.2-2.43.57"/><circle cx="17" cy="9" r="2.5"/></svg>',
    savings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7V4a1 1 0 00-1-1H5a2 2 0 00-2 2v14a2 2 0 002 2h13a1 1 0 001-1v-3"/><path d="M17 9h4v6h-4a3 3 0 110-6z"/></svg>',
    loans: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    deposit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
    withdraw: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
    dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
};

const Banking = {
    mode: null,
    account: null,
    authenticated: false,
    currentPage: 'overview',
    pinBuffer: '',
    confirmBuffer: '',
    isConfirming: false,
    pinLength: 4,
    quickAmounts: [],
    activeAction: null,
    historyPage: 1,
    historyFilter: 'all',
    searchTimeout: null,
    currentSharedId: null,
    enableLoans: true,

    init() {
        window.addEventListener('message', (e) => this.onMessage(e));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },

    async post(endpoint, data = {}) {
        try {
            const resp = await fetch(`https://mid-banking/${endpoint}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            return await resp.json();
        } catch (e) {
            return null;
        }
    },

    onMessage(e) {
        if (!e.data || !e.data.action) return;
        const { action, data } = e.data;
        switch (action) {
            case 'open': this.open(data); break;
            case 'close': this.close(); break;
            case 'notify': break;
        }
    },

    open(data) {
        this.mode = data.mode;
        this.account = data.account;
        this.authenticated = false;
        this.pinBuffer = '';
        this.confirmBuffer = '';
        this.isConfirming = false;
        this.pinLength = data.pinLength || 4;
        this.quickAmounts = data.quickAmounts || [100, 500, 1000, 5000, 10000, 50000];
        this.enableLoans = data.enableLoans !== false;
        this.activeAction = null;
        this.historyPage = 1;
        this.historyFilter = 'all';
        this.currentSharedId = null;

        if (this.mode === 'bank') {
            this.openBank();
        } else {
            this.openAtm();
        }
    },

    close() {
        const app = document.getElementById('app');
        app.innerHTML = '';
        this.post('close');
        this.mode = null;
        this.authenticated = false;
    },

    formatMoney(n) {
        if (n === null || n === undefined) return '$0';
        return '$' + Math.floor(n).toLocaleString('en-US');
    },

    formatDate(str) {
        if (!str) return '';
        const d = new Date(str);
        const now = new Date();
        const diff = now - d;
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        return d.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    },

    animateCounter(el, target) {
        const current = parseInt(el.dataset.current || '0');
        const diff = target - current;
        if (diff === 0) { el.textContent = this.formatMoney(target); return; }
        const duration = 700;
        const start = performance.now();
        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(current + diff * eased);
            el.textContent = this.formatMoney(value);
            el.dataset.current = value;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    },

    toast(type, message) {
        this.post('notify', {type: type, message: message});
    },

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    renderNumpad(prefix = '') {
        let html = '';
        for (let i = 1; i <= 9; i++) html += `<button class="${prefix}numpad-btn" onclick="Banking.pinInput('${i}')">${i}</button>`;
        html += `<button class="${prefix}numpad-btn fn clear" onclick="Banking.pinClear()">CLR</button>`;
        html += `<button class="${prefix}numpad-btn" onclick="Banking.pinInput('0')">0</button>`;
        html += `<button class="${prefix}numpad-btn fn confirm" onclick="Banking.pinSubmit()">OK</button>`;
        return html;
    },

    renderPinDots(prefix = '') {
        let html = '';
        for (let i = 0; i < this.pinLength; i++) {
            html += `<div class="${prefix}pin-dot" id="${prefix}dot-${i}"></div>`;
        }
        return html;
    },

    updatePinDots(prefix = '') {
        for (let i = 0; i < this.pinLength; i++) {
            const dot = document.getElementById(`${prefix}dot-${i}`);
            if (dot) {
                dot.classList.toggle('filled', i < this.pinBuffer.length);
                dot.classList.remove('error');
            }
        }
    },

    pinInput(digit) {
        if (this.pinBuffer.length >= this.pinLength) return;
        this.pinBuffer += digit;
        const prefix = this.mode === 'atm' ? 'atm-' : '';
        this.updatePinDots(prefix);
        this.post('playSound', {sound: 'pin'});
    },

    pinClear() {
        this.pinBuffer = '';
        const prefix = this.mode === 'atm' ? 'atm-' : '';
        this.updatePinDots(prefix);
    },

    async pinSubmit() {
        if (this.pinBuffer.length !== this.pinLength) return;

        if (this.mode === 'bank' && !this.account) {
            if (!this.isConfirming) {
                this.confirmBuffer = this.pinBuffer;
                this.pinBuffer = '';
                this.isConfirming = true;
                this.updatePinDots();
                const stepLabel = document.getElementById('pin-step-label');
                if (stepLabel) stepLabel.textContent = 'Confirm your PIN';
                return;
            }

            if (this.pinBuffer !== this.confirmBuffer) {
                this.shakePin();
                this.toast('error', 'PINs do not match');
                this.pinBuffer = '';
                this.confirmBuffer = '';
                this.isConfirming = false;
                this.updatePinDots();
                const stepLabel = document.getElementById('pin-step-label');
                if (stepLabel) stepLabel.textContent = 'Create your PIN';
                return;
            }

            const result = await this.post('register', {pin: this.confirmBuffer});
            if (result && result.success) {
                this.account = result.account;
                this.authenticated = true;
                this.toast('success', 'Account created! Welcome to Mid Bank.');
                this.showDashboard();
            } else {
                this.toast('error', result?.message || 'Registration failed');
                this.pinBuffer = '';
                this.confirmBuffer = '';
                this.isConfirming = false;
                this.updatePinDots();
            }
            return;
        }

        const prefix = this.mode === 'atm' ? 'atm-' : '';
        const result = await this.post('verifyPin', {pin: this.pinBuffer});
        if (result && result.success) {
            this.authenticated = true;
            this.account = result.account;
            if (this.mode === 'bank') {
                this.showDashboard();
            } else {
                this.showAtmMenu();
            }
        } else {
            this.shakePin(prefix);
            const errEl = document.getElementById(`${prefix}pin-error`);
            if (errEl) errEl.textContent = result?.message || 'Wrong PIN';
            this.pinBuffer = '';
            setTimeout(() => this.updatePinDots(prefix), 500);
        }
    },

    shakePin(prefix = '') {
        for (let i = 0; i < this.pinLength; i++) {
            const dot = document.getElementById(`${prefix}dot-${i}`);
            if (dot) {
                dot.classList.add('error');
            }
        }
    },

    // bank

    openBank() {
        const app = document.getElementById('app');
        if (!this.account) {
            app.innerHTML = `
                <div class="pin-wrapper">
                    <div class="register-card">
                        <div class="register-logo">
                            ${ICONS.bank}
                            <h1>MID BANK</h1>
                            <p class="welcome-text">Create your bank account to get started with deposits, transfers, savings, and more.</p>
                        </div>
                        <div class="register-divider"></div>
                        <p class="pin-step-label" id="pin-step-label">Create your PIN</p>
                        <div class="pin-dots">${this.renderPinDots()}</div>
                        <div class="numpad">${this.renderNumpad()}</div>
                        <div class="pin-error-msg" id="pin-error"></div>
                    </div>
                </div>`;
        } else {
            app.innerHTML = `
                <div class="pin-wrapper">
                    <div class="pin-card">
                        <div class="pin-logo">
                            ${ICONS.bank}
                            <h2>MID BANK</h2>
                            <p>Enter your PIN to continue</p>
                        </div>
                        <div class="pin-dots">${this.renderPinDots()}</div>
                        <div class="numpad">${this.renderNumpad()}</div>
                        <div class="pin-error-msg" id="pin-error"></div>
                    </div>
                </div>`;
        }
    },

    showDashboard() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="bank-wrapper">
                <div class="sidebar">
                    <div class="sidebar-header">
                        ${ICONS.bank}
                        <span>MID BANK</span>
                    </div>
                    <nav class="sidebar-nav" id="sidebar-nav">
                        <a data-page="overview" class="active" onclick="Banking.navigate('overview')">${ICONS.overview} Overview</a>
                        <a data-page="history" onclick="Banking.navigate('history')">${ICONS.history} History</a>
                        <a data-page="transfer" onclick="Banking.navigate('transfer')">${ICONS.transfer} Transfer</a>
                        <a data-page="shared" onclick="Banking.navigate('shared')">${ICONS.shared} Shared</a>
                        <a data-page="savings" onclick="Banking.navigate('savings')">${ICONS.savings} Savings</a>
                        ${this.enableLoans ? `<a data-page="loans" onclick="Banking.navigate('loans')">${ICONS.loans} Loans</a>` : ''}
                        <a data-page="settings" onclick="Banking.navigate('settings')">${ICONS.settings} Settings</a>
                    </nav>
                    <div class="sidebar-footer">
                        <div class="sidebar-account">
                            <span class="acc-number">${this.account.account_number}</span>
                            <span class="acc-level-badge" style="background:${this.account.level_color}22;color:${this.account.level_color}">${this.account.level}</span>
                        </div>
                        <button class="sidebar-close" onclick="Banking.close()">${ICONS.close} Close</button>
                    </div>
                </div>
                <div class="main-content">
                    <div class="content-header">
                        <h1 id="page-title">Overview</h1>
                    </div>
                    <div class="content-area" id="content-area"></div>
                </div>
            </div>`;
        this.showPage('overview');
    },

    navigate(page) {
        if (page === this.currentPage) return;
        this.post('playSound', {sound: 'click'});
        document.querySelectorAll('#sidebar-nav a').forEach(a => {
            a.classList.toggle('active', a.dataset.page === page);
        });
        const title = document.getElementById('page-title');
        const titles = {overview:'Overview', history:'History', transfer:'Transfer', shared:'Shared Accounts', savings:'Savings', loans:'Loans', settings:'Settings'};
        if (title) title.textContent = titles[page] || page;
        this.showPage(page);
    },

    async showPage(page) {
        this.currentPage = page;
        this.currentSharedId = null;
        const area = document.getElementById('content-area');
        if (!area) return;

        area.classList.add('fade-out');
        await new Promise(r => setTimeout(r, 150));

        switch (page) {
            case 'overview': await this.renderOverview(area); break;
            case 'history': await this.renderHistory(area); break;
            case 'transfer': this.renderTransfer(area); break;
            case 'shared': await this.renderShared(area); break;
            case 'savings': this.renderSavings(area); break;
            case 'loans': await this.renderLoans(area); break;
            case 'settings': this.renderSettings(area); break;
        }

        area.classList.remove('fade-out');
    },

    async renderOverview(area) {
        area.innerHTML = `
            <div class="stat-grid">
                <div class="stat-card card-primary">
                    <div class="icon-box">${ICONS.savings}</div>
                    <div class="stat-info">
                        <span class="stat-label">Bank Balance</span>
                        <span class="stat-value" id="ov-balance">${this.formatMoney(this.account.balance)}</span>
                    </div>
                </div>
                <div class="stat-card card-green">
                    <div class="icon-box">${ICONS.dollar}</div>
                    <div class="stat-info">
                        <span class="stat-label">Cash</span>
                        <span class="stat-value" id="ov-cash">${this.formatMoney(this.account.cash)}</span>
                    </div>
                </div>
                <div class="stat-card card-purple">
                    <div class="icon-box">${ICONS.savings}</div>
                    <div class="stat-info">
                        <span class="stat-label">Savings</span>
                        <span class="stat-value" id="ov-savings">${this.formatMoney(this.account.savings)}</span>
                    </div>
                </div>
                <div class="stat-card card-orange">
                    <div class="icon-box">${ICONS.overview}</div>
                    <div class="stat-info">
                        <span class="stat-label">Account Level</span>
                        <span class="stat-value" style="color:${this.account.level_color};font-size:16px">${this.account.level}</span>
                    </div>
                </div>
            </div>
            <div class="quick-actions">
                <button class="quick-btn" onclick="Banking.toggleAction('deposit')">${ICONS.deposit} Deposit</button>
                <button class="quick-btn" onclick="Banking.toggleAction('withdraw')">${ICONS.withdraw} Withdraw</button>
                <button class="quick-btn" onclick="Banking.navigate('transfer')">${ICONS.transfer} Transfer</button>
            </div>
            <div class="action-panel" id="action-panel"></div>
            <div class="bottom-grid">
                <div class="card-block">
                    <h3>Weekly Activity</h3>
                    <div class="chart-wrap"><canvas id="weekly-chart"></canvas><div class="chart-tooltip" id="chart-tooltip"></div></div>
                </div>
                <div class="card-block">
                    <h3>Recent Transactions</h3>
                    <div class="tx-list" id="recent-list">
                        <div class="loading-shimmer"></div>
                        <div class="loading-shimmer"></div>
                        <div class="loading-shimmer"></div>
                    </div>
                </div>
            </div>`;

        const [stats, txns] = await Promise.all([
            this.post('getStats'),
            this.post('getTransactions', {page: 1, limit: 5, filter: 'all'})
        ]);

        if (stats && stats.chart) {
            const canvas = document.getElementById('weekly-chart');
            if (canvas) this.drawActivityChart(canvas, stats.chart);
        }

        if (txns && txns.transactions) {
            const list = document.getElementById('recent-list');
            if (list) {
                list.innerHTML = txns.transactions.length > 0
                    ? txns.transactions.map(tx => this.renderTxItem(tx)).join('')
                    : '<div class="empty-state"><p>No transactions yet</p></div>';
            }
        }
    },

    toggleAction(action) {
        const panel = document.getElementById('action-panel');
        if (!panel) return;

        if (this.activeAction === action) {
            panel.classList.remove('open');
            this.activeAction = null;
            return;
        }

        this.activeAction = action;
        const label = action === 'deposit' ? 'Deposit Cash' : 'Withdraw Cash';

        panel.innerHTML = `
            <div class="action-panel-inner">
                <h4>${label}</h4>
                <div class="amount-row">
                    <div class="amount-input-wrap">
                        <span class="currency">$</span>
                        <input type="number" id="action-amount" placeholder="Enter amount" min="1">
                    </div>
                    <button class="confirm-btn" onclick="Banking.confirmAction()">${action === 'deposit' ? 'Deposit' : 'Withdraw'}</button>
                </div>
                <div class="preset-amounts">
                    ${this.quickAmounts.map(a => `<button class="preset-btn" onclick="Banking.setAmount(${a})">${this.formatMoney(a)}</button>`).join('')}
                </div>
            </div>`;
        panel.classList.add('open');
    },

    setAmount(val) {
        const input = document.getElementById('action-amount');
        if (input) input.value = val;
    },

    async confirmAction() {
        const input = document.getElementById('action-amount');
        if (!input) return;
        const amount = parseInt(input.value);
        if (!amount || amount < 1) return this.toast('error', 'Enter a valid amount');

        const endpoint = this.activeAction;
        const result = await this.post(endpoint, {amount});

        if (result && result.success) {
            this.account.balance = result.balance;
            this.account.cash = result.cash;
            this.toast('success', `${endpoint === 'deposit' ? 'Deposited' : 'Withdrew'} ${this.formatMoney(amount)}`);
            this.refreshBalanceCards();
            input.value = '';

            const list = document.getElementById('recent-list');
            if (list) {
                const txns = await this.post('getTransactions', {page: 1, limit: 5, filter: 'all'});
                if (txns && txns.transactions) {
                    list.innerHTML = txns.transactions.map(tx => this.renderTxItem(tx)).join('');
                }
            }
        } else {
            this.toast('error', result?.message || 'Operation failed');
        }
    },

    refreshBalanceCards() {
        const bal = document.getElementById('ov-balance');
        const cash = document.getElementById('ov-cash');
        const sav = document.getElementById('ov-savings');
        if (bal) this.animateCounter(bal, this.account.balance);
        if (cash) this.animateCounter(cash, this.account.cash);
        if (sav) this.animateCounter(sav, this.account.savings);
    },

    renderTxItem(tx) {
        const typeLabels = {
            deposit: 'Deposit', withdraw: 'Withdrawal', transfer_in: 'Received',
            transfer_out: 'Sent', interest: 'Interest', loan: 'Loan',
            loan_payment: 'Loan Payment', savings_in: 'To Savings',
            savings_out: 'From Savings', account_created: 'Account Opened'
        };
        const isPositive = ['deposit', 'transfer_in', 'interest', 'loan', 'savings_out'].includes(tx.type);

        return `<div class="tx-item">
            <div class="tx-icon ${tx.type}">${ICONS[this.txIconMap(tx.type)]}</div>
            <div class="tx-details">
                <div class="tx-desc">${typeLabels[tx.type] || tx.type}${tx.reference ? ' &middot; ' + this.escapeHtml(tx.reference) : ''}</div>
                <div class="tx-date">${this.formatDate(tx.created_at)}</div>
            </div>
            <div class="tx-amount ${isPositive ? 'positive' : 'negative'}">${isPositive ? '+' : '-'}${this.formatMoney(tx.amount)}</div>
        </div>`;
    },

    txIconMap(type) {
        const map = {deposit:'deposit', withdraw:'withdraw', transfer_in:'deposit', transfer_out:'transfer', interest:'savings', loan:'loans', loan_payment:'loans', savings_in:'savings', savings_out:'savings', account_created:'bank'};
        return map[type] || 'bank';
    },

    async renderHistory(area) {
        this.historyPage = 1;
        this.historyFilter = 'all';
        area.innerHTML = `
            <div class="history-filters" id="history-filters">
                <button class="filter-btn active" data-filter="all" onclick="Banking.setFilter('all')">All</button>
                <button class="filter-btn" data-filter="deposit" onclick="Banking.setFilter('deposit')">Deposits</button>
                <button class="filter-btn" data-filter="withdraw" onclick="Banking.setFilter('withdraw')">Withdrawals</button>
                <button class="filter-btn" data-filter="transfer" onclick="Banking.setFilter('transfer')">Transfers</button>
            </div>
            <div class="tx-list" id="history-list">
                <div class="loading-shimmer"></div>
                <div class="loading-shimmer"></div>
                <div class="loading-shimmer"></div>
            </div>
            <div class="pagination" id="history-pagination"></div>`;
        await this.loadHistory();
    },

    async setFilter(filter) {
        this.historyFilter = filter;
        this.historyPage = 1;
        document.querySelectorAll('#history-filters .filter-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.filter === filter);
        });
        await this.loadHistory();
    },

    async loadHistory() {
        const result = await this.post('getTransactions', {
            page: this.historyPage, limit: 15, filter: this.historyFilter
        });

        const list = document.getElementById('history-list');
        const pag = document.getElementById('history-pagination');
        if (!list || !result) return;

        if (result.transactions && result.transactions.length > 0) {
            list.innerHTML = result.transactions.map(tx => this.renderTxItem(tx)).join('');
        } else {
            list.innerHTML = '<div class="empty-state"><p>No transactions found</p></div>';
        }

        if (pag && result.total > 15) {
            const totalPages = Math.ceil(result.total / 15);
            pag.innerHTML = `
                <button class="page-btn" onclick="Banking.historyPrev()" ${this.historyPage <= 1 ? 'disabled' : ''}>Prev</button>
                <span class="page-info">${this.historyPage} / ${totalPages}</span>
                <button class="page-btn" onclick="Banking.historyNext()" ${this.historyPage >= totalPages ? 'disabled' : ''}>Next</button>`;
        } else if (pag) {
            pag.innerHTML = '';
        }
    },

    async historyPrev() { if (this.historyPage > 1) { this.historyPage--; await this.loadHistory(); } },
    async historyNext() { this.historyPage++; await this.loadHistory(); },

    renderTransfer(area) {
        area.innerHTML = `
            <div class="transfer-form">
                <div class="form-group">
                    <label class="form-label">Recipient Account</label>
                    <input class="form-input" type="text" id="transfer-target" placeholder="Search by name or account number..." oninput="Banking.searchRecipient(this.value)">
                    <div class="search-results hidden" id="search-results"></div>
                </div>
                <div class="form-group">
                    <label class="form-label">Amount</label>
                    <div class="amount-input-wrap">
                        <span class="currency">$</span>
                        <input type="number" id="transfer-amount" placeholder="0" min="1">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Note (optional)</label>
                    <input class="form-input" type="text" id="transfer-note" placeholder="What's this for?" maxlength="100">
                </div>
                <button class="confirm-btn" onclick="Banking.submitTransfer()">Send Transfer</button>
            </div>`;
    },

    searchRecipient(query) {
        clearTimeout(this.searchTimeout);
        const results = document.getElementById('search-results');
        if (!results) return;

        if (query.length < 2) {
            results.classList.add('hidden');
            return;
        }

        this.searchTimeout = setTimeout(async () => {
            const data = await this.post('searchPlayers', {query});
            if (!data || data.length === 0) {
                results.classList.add('hidden');
                return;
            }
            results.innerHTML = data.map(p => `
                <div class="search-result" onclick="Banking.selectRecipient('${p.account_number}')">
                    <span class="sr-name">${this.escapeHtml((p.firstname||'') + ' ' + (p.lastname||''))}</span>
                    <span class="sr-acc">${p.account_number}</span>
                </div>`).join('');
            results.classList.remove('hidden');
        }, 300);
    },

    selectRecipient(accNum) {
        const input = document.getElementById('transfer-target');
        const results = document.getElementById('search-results');
        if (input) input.value = accNum;
        if (results) results.classList.add('hidden');
    },

    async submitTransfer() {
        const target = document.getElementById('transfer-target')?.value?.trim();
        const amount = parseInt(document.getElementById('transfer-amount')?.value);
        const note = document.getElementById('transfer-note')?.value?.trim() || '';

        if (!target) return this.toast('error', 'Enter recipient account');
        if (!amount || amount < 1) return this.toast('error', 'Enter a valid amount');

        const result = await this.post('transfer', {accountNumber: target, amount, note});
        if (result && result.success) {
            this.account.balance = result.balance;
            this.account.cash = result.cash;
            this.toast('success', `Sent ${this.formatMoney(amount)} successfully`);
            document.getElementById('transfer-target').value = '';
            document.getElementById('transfer-amount').value = '';
            document.getElementById('transfer-note').value = '';
        } else {
            this.toast('error', result?.message || 'Transfer failed');
        }
    },

    async renderShared(area) {
        area.innerHTML = '<div class="loading-shimmer"></div>';
        const accounts = await this.post('getSharedAccounts');

        area.innerHTML = `
            <div class="shared-grid" id="shared-grid">
                ${(accounts || []).map(a => `
                    <div class="shared-card" onclick="Banking.openSharedDetail(${a.id})">
                        <div class="flex-between mb-16">
                            <span class="shared-name">${this.escapeHtml(a.name)}</span>
                            <span class="shared-role ${a.role}">${a.role}</span>
                        </div>
                        <div class="shared-acc-num">${a.account_number}</div>
                        <div class="shared-balance">${this.formatMoney(a.balance)}</div>
                        <div class="shared-meta">
                            <span>${a.member_count} member${a.member_count !== 1 ? 's' : ''}</span>
                        </div>
                    </div>`).join('')}
                <button class="create-shared-btn" onclick="Banking.showCreateShared()">
                    ${ICONS.plus}
                    <span>Create Shared Account</span>
                </button>
            </div>
            <div id="shared-detail-area"></div>
            <div id="create-shared-area"></div>`;
    },

    showCreateShared() {
        const area = document.getElementById('create-shared-area');
        if (!area) return;
        area.innerHTML = `
            <div class="inline-modal mt-20">
                <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">Create Shared Account</h3>
                <div class="form-group">
                    <label class="form-label">Account Name</label>
                    <input class="form-input" type="text" id="shared-name" placeholder="e.g. Business Funds" maxlength="40">
                </div>
                <div class="btn-row">
                    <button class="confirm-btn" onclick="Banking.confirmCreateShared()">Create</button>
                    <button class="confirm-btn danger" onclick="document.getElementById('create-shared-area').innerHTML=''">Cancel</button>
                </div>
            </div>`;
    },

    async confirmCreateShared() {
        const name = document.getElementById('shared-name')?.value?.trim();
        if (!name || name.length < 2) return this.toast('error', 'Enter a name (min 2 characters)');

        const result = await this.post('createShared', {name});
        if (result && result.success) {
            this.toast('success', 'Shared account created');
            await this.renderShared(document.getElementById('content-area'));
        } else {
            this.toast('error', result?.message || 'Failed to create');
        }
    },

    async openSharedDetail(id) {
        this.currentSharedId = id;
        const detail = await this.post('getSharedDetails', {sharedId: id});
        if (!detail) return this.toast('error', 'Could not load account');

        const grid = document.getElementById('shared-grid');
        const detailArea = document.getElementById('shared-detail-area');
        if (grid) grid.classList.add('hidden');
        if (!detailArea) return;

        detailArea.innerHTML = `
            <div class="shared-detail-header">
                <button class="back-btn" onclick="Banking.renderShared(document.getElementById('content-area'))">${ICONS.back} Back</button>
                <h3>${this.escapeHtml(detail.name)}</h3>
                <span class="shared-role ${detail.role}" style="margin-left:auto">${detail.role}</span>
            </div>
            <div class="stat-grid" style="grid-template-columns:repeat(2,1fr)">
                <div class="stat-card card-primary">
                    <div class="icon-box">${ICONS.savings}</div>
                    <div class="stat-info">
                        <span class="stat-label">Shared Balance</span>
                        <span class="stat-value" id="shared-bal">${this.formatMoney(detail.balance)}</span>
                    </div>
                </div>
                <div class="stat-card card-green">
                    <div class="icon-box">${ICONS.shared}</div>
                    <div class="stat-info">
                        <span class="stat-label">Members</span>
                        <span class="stat-value">${detail.members.length}</span>
                    </div>
                </div>
            </div>
            <div class="quick-actions">
                <button class="quick-btn" onclick="Banking.sharedAction('deposit')">${ICONS.deposit} Deposit</button>
                <button class="quick-btn" onclick="Banking.sharedAction('withdraw')">${ICONS.withdraw} Withdraw</button>
                ${detail.role === 'owner' || detail.role === 'admin' ? `<button class="quick-btn" onclick="Banking.showInviteModal(${id})">${ICONS.plus} Invite</button>` : ''}
                ${detail.role !== 'owner' ? `<button class="quick-btn" onclick="Banking.leaveShared(${id})">${ICONS.close} Leave</button>` : ''}
                ${detail.role === 'owner' ? `<button class="quick-btn" onclick="Banking.deleteShared(${id})">${ICONS.trash} Delete</button>` : ''}
            </div>
            <div class="action-panel" id="shared-action-panel"></div>
            <div id="invite-modal-area"></div>
            <div class="two-col mt-16">
                <div class="card-block">
                    <h3>Members</h3>
                    <div class="members-list">
                        ${detail.members.map(m => `
                            <div class="member-item">
                                <div class="member-info">
                                    <span class="member-name">${this.escapeHtml((m.firstname||'') + ' ' + (m.lastname||''))}</span>
                                    <span class="shared-role ${m.role}" style="margin-left:8px">${m.role}</span>
                                </div>
                                ${detail.role === 'owner' && m.role !== 'owner' ? `<button class="member-kick" onclick="Banking.kickMember(${id}, ${m.id})">Remove</button>` : ''}
                            </div>`).join('')}
                    </div>
                </div>
                <div class="card-block">
                    <h3>Recent Activity</h3>
                    <div class="tx-list">
                        ${detail.transactions.length > 0 ? detail.transactions.slice(0, 10).map(tx => this.renderTxItem(tx)).join('') : '<div class="empty-state"><p>No activity yet</p></div>'}
                    </div>
                </div>
            </div>`;
    },

    sharedAction(action) {
        const panel = document.getElementById('shared-action-panel');
        if (!panel || !this.currentSharedId) return;

        if (panel.classList.contains('open') && panel.dataset.action === action) {
            panel.classList.remove('open');
            return;
        }

        panel.dataset.action = action;
        panel.innerHTML = `
            <div class="action-panel-inner">
                <h4>${action === 'deposit' ? 'Deposit to Shared' : 'Withdraw from Shared'}</h4>
                <div class="amount-row">
                    <div class="amount-input-wrap">
                        <span class="currency">$</span>
                        <input type="number" id="shared-amount" placeholder="Amount" min="1">
                    </div>
                    <button class="confirm-btn" onclick="Banking.confirmSharedAction('${action}')">${action === 'deposit' ? 'Deposit' : 'Withdraw'}</button>
                </div>
            </div>`;
        panel.classList.add('open');
    },

    async confirmSharedAction(action) {
        const amount = parseInt(document.getElementById('shared-amount')?.value);
        if (!amount || amount < 1) return this.toast('error', 'Enter a valid amount');

        const endpoint = action === 'deposit' ? 'depositShared' : 'withdrawShared';
        const result = await this.post(endpoint, {sharedId: this.currentSharedId, amount});

        if (result && result.success) {
            this.account.cash = result.cash;
            this.toast('success', `${action === 'deposit' ? 'Deposited' : 'Withdrew'} ${this.formatMoney(amount)}`);
            const bal = document.getElementById('shared-bal');
            if (bal) this.animateCounter(bal, result.balance);
            document.getElementById('shared-amount').value = '';
        } else {
            this.toast('error', result?.message || 'Failed');
        }
    },

    async showInviteModal(sharedId) {
        const modalArea = document.getElementById('invite-modal-area');
        if (!modalArea) return;

        const players = await this.post('getOnlinePlayers');
        modalArea.innerHTML = `
            <div class="inline-modal">
                <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">Invite Player</h3>
                <div class="online-list">
                    ${(players || []).length > 0 ? (players || []).map(p => `
                        <div class="online-player">
                            <div>
                                <span class="op-info">${this.escapeHtml(p.name)}</span>
                                <span class="op-id"> (ID: ${p.id})</span>
                            </div>
                            <button class="invite-btn" onclick="Banking.inviteMember(${sharedId}, ${p.id}, this)">Invite</button>
                        </div>`).join('') : '<p class="text-muted text-sm">No other players online</p>'}
                </div>
                <button class="confirm-btn danger mt-16" onclick="document.getElementById('invite-modal-area').innerHTML=''">Close</button>
            </div>`;
    },

    async inviteMember(sharedId, playerId, btn) {
        if (btn) btn.disabled = true;
        const result = await this.post('inviteShared', {sharedId, playerId});
        if (result && result.success) {
            this.toast('success', 'Player invited');
            if (btn) btn.textContent = 'Invited';
        } else {
            this.toast('error', result?.message || 'Failed');
            if (btn) btn.disabled = false;
        }
    },

    async kickMember(sharedId, memberId) {
        const result = await this.post('kickShared', {sharedId, memberId});
        if (result && result.success) {
            this.toast('success', 'Member removed');
            this.openSharedDetail(sharedId);
        } else {
            this.toast('error', result?.message || 'Failed');
        }
    },

    async leaveShared(sharedId) {
        const result = await this.post('leaveShared', {sharedId});
        if (result && result.success) {
            this.toast('info', 'Left shared account');
            await this.renderShared(document.getElementById('content-area'));
        } else {
            this.toast('error', result?.message || 'Failed');
        }
    },

    async deleteShared(sharedId) {
        const result = await this.post('deleteShared', {sharedId});
        if (result && result.success) {
            this.toast('success', 'Shared account deleted');
            await this.renderShared(document.getElementById('content-area'));
        } else {
            this.toast('error', result?.message || 'Failed');
        }
    },

    renderSavings(area) {
        area.innerHTML = `
            <div class="savings-overview">
                <div class="savings-card-big">
                    <div class="s-label">Bank Balance</div>
                    <div class="s-value" id="sav-bank">${this.formatMoney(this.account.balance)}</div>
                </div>
                <div class="savings-card-big">
                    <div class="s-label">Savings Account</div>
                    <div class="s-value text-primary" id="sav-savings">${this.formatMoney(this.account.savings)}</div>
                    <div class="s-rate">Interest Rate: ${0.1}% per cycle</div>
                </div>
            </div>
            <div class="two-col">
                <div class="card-block">
                    <h3>Transfer to Savings</h3>
                    <div class="form-group">
                        <div class="amount-input-wrap">
                            <span class="currency">$</span>
                            <input type="number" id="savings-to-amount" placeholder="Amount" min="1">
                        </div>
                    </div>
                    <button class="confirm-btn" onclick="Banking.savingsTransfer('to')">Move to Savings</button>
                </div>
                <div class="card-block">
                    <h3>Withdraw from Savings</h3>
                    <div class="form-group">
                        <div class="amount-input-wrap">
                            <span class="currency">$</span>
                            <input type="number" id="savings-from-amount" placeholder="Amount" min="1">
                        </div>
                    </div>
                    <button class="confirm-btn" onclick="Banking.savingsTransfer('from')">Move to Bank</button>
                </div>
            </div>`;
    },

    async savingsTransfer(direction) {
        const inputId = direction === 'to' ? 'savings-to-amount' : 'savings-from-amount';
        const amount = parseInt(document.getElementById(inputId)?.value);
        if (!amount || amount < 1) return this.toast('error', 'Enter a valid amount');

        const result = await this.post('transferSavings', {direction, amount});
        if (result && result.success) {
            this.account.balance = result.balance;
            this.account.savings = result.savings;
            this.account.cash = result.cash;
            this.toast('success', `Moved ${this.formatMoney(amount)} ${direction === 'to' ? 'to savings' : 'to bank'}`);
            const sb = document.getElementById('sav-bank');
            const ss = document.getElementById('sav-savings');
            if (sb) this.animateCounter(sb, result.balance);
            if (ss) this.animateCounter(ss, result.savings);
            document.getElementById(inputId).value = '';
        } else {
            this.toast('error', result?.message || 'Failed');
        }
    },

    async renderLoans(area) {
        area.innerHTML = '<div class="loading-shimmer"></div>';
        const loans = await this.post('getLoans');
        const activeLoan = (loans || []).find(l => l.status === 'active');

        let html = '';

        if (activeLoan) {
            const paid = activeLoan.amount - (activeLoan.remaining - (activeLoan.amount * activeLoan.interest_rate / 100));
            const totalOwed = Math.floor(activeLoan.amount * (1 + activeLoan.interest_rate / 100));
            const progress = Math.max(0, Math.min(100, ((totalOwed - activeLoan.remaining) / totalOwed) * 100));

            html += `
                <div class="loan-status-card">
                    <div class="flex-between mb-16">
                        <h3 style="font-size:16px;font-weight:700">Active Loan</h3>
                        <span class="shared-role admin">Active</span>
                    </div>
                    <div class="loan-progress-bar">
                        <div class="loan-progress-fill" style="width:${progress}%"></div>
                    </div>
                    <div class="loan-info-row"><span class="l-label">Original Amount</span><span class="l-value">${this.formatMoney(activeLoan.amount)}</span></div>
                    <div class="loan-info-row"><span class="l-label">Interest Rate</span><span class="l-value">${activeLoan.interest_rate}%</span></div>
                    <div class="loan-info-row"><span class="l-label">Total With Interest</span><span class="l-value">${this.formatMoney(totalOwed)}</span></div>
                    <div class="loan-info-row"><span class="l-label">Remaining</span><span class="l-value text-danger">${this.formatMoney(activeLoan.remaining)}</span></div>
                    <div class="loan-form">
                        <h4 style="font-size:13px;font-weight:600;margin-bottom:8px">Make Payment</h4>
                        <div class="amount-row">
                            <div class="amount-input-wrap">
                                <span class="currency">$</span>
                                <input type="number" id="loan-pay-amount" placeholder="Amount" min="1" max="${activeLoan.remaining}">
                            </div>
                            <button class="confirm-btn" onclick="Banking.payLoan(${activeLoan.id})">Pay</button>
                        </div>
                        <div class="preset-amounts mt-16">
                            <button class="preset-btn" onclick="Banking.setLoanAmount(${Math.min(1000, activeLoan.remaining)})">$1,000</button>
                            <button class="preset-btn" onclick="Banking.setLoanAmount(${Math.min(5000, activeLoan.remaining)})">$5,000</button>
                            <button class="preset-btn" onclick="Banking.setLoanAmount(${Math.min(10000, activeLoan.remaining)})">$10,000</button>
                            <button class="preset-btn" onclick="Banking.setLoanAmount(${activeLoan.remaining})">Pay All</button>
                        </div>
                    </div>
                </div>`;
        } else {
            html += `
                <div class="card-block mb-16">
                    <h3>Take a Loan</h3>
                    <p class="text-sm text-muted mb-16">Borrow up to ${this.formatMoney(500000)} with ${5.0}% interest.</p>
                    <div class="loan-form">
                        <div class="form-group">
                            <label class="form-label">Loan Amount</label>
                            <div class="amount-input-wrap">
                                <span class="currency">$</span>
                                <input type="number" id="loan-request-amount" placeholder="1,000 - 500,000" min="1000" max="500000" oninput="Banking.updateLoanCalc()">
                            </div>
                        </div>
                        <div class="loan-calc" id="loan-calc">
                            <div class="calc-row"><span>Amount</span><span id="calc-amount">$0</span></div>
                            <div class="calc-row"><span>Interest (${5.0}%)</span><span id="calc-interest">$0</span></div>
                            <div class="calc-row calc-total"><span>Total Repayment</span><span id="calc-total">$0</span></div>
                        </div>
                        <button class="confirm-btn mt-16" onclick="Banking.requestLoan()">Request Loan</button>
                    </div>
                </div>`;
        }

        const paidLoans = (loans || []).filter(l => l.status === 'paid');
        if (paidLoans.length > 0) {
            html += `<div class="card-block mt-20"><h3>Loan History</h3><div class="tx-list">`;
            paidLoans.forEach(l => {
                html += `<div class="tx-item">
                    <div class="tx-icon loan">${ICONS.loans}</div>
                    <div class="tx-details">
                        <div class="tx-desc">Loan - ${this.formatMoney(l.amount)}</div>
                        <div class="tx-date">${this.formatDate(l.created_at)}</div>
                    </div>
                    <div class="tx-amount positive">Paid</div>
                </div>`;
            });
            html += `</div></div>`;
        }

        area.innerHTML = html;
    },

    setLoanAmount(val) {
        const input = document.getElementById('loan-pay-amount');
        if (input) input.value = val;
    },

    updateLoanCalc() {
        const amount = parseInt(document.getElementById('loan-request-amount')?.value) || 0;
        const interest = Math.floor(amount * 5.0 / 100);
        const total = amount + interest;
        const ca = document.getElementById('calc-amount');
        const ci = document.getElementById('calc-interest');
        const ct = document.getElementById('calc-total');
        if (ca) ca.textContent = this.formatMoney(amount);
        if (ci) ci.textContent = this.formatMoney(interest);
        if (ct) ct.textContent = this.formatMoney(total);
    },

    async requestLoan() {
        const amount = parseInt(document.getElementById('loan-request-amount')?.value);
        if (!amount || amount < 1000) return this.toast('error', 'Minimum loan: $1,000');

        const result = await this.post('takeLoan', {amount});
        if (result && result.success) {
            this.account.balance = result.balance;
            this.account.cash = result.cash;
            this.toast('success', `Loan approved: ${this.formatMoney(amount)}`);
            await this.renderLoans(document.getElementById('content-area'));
        } else {
            this.toast('error', result?.message || 'Loan denied');
        }
    },

    async payLoan(loanId) {
        const amount = parseInt(document.getElementById('loan-pay-amount')?.value);
        if (!amount || amount < 1) return this.toast('error', 'Enter payment amount');

        const result = await this.post('payLoan', {loanId, amount});
        if (result && result.success) {
            this.account.balance = result.balance;
            this.account.cash = result.cash;
            this.toast('success', `Payment of ${this.formatMoney(amount)} applied`);
            if (result.remaining <= 0) {
                this.toast('success', 'Loan fully paid off!');
            }
            await this.renderLoans(document.getElementById('content-area'));
        } else {
            this.toast('error', result?.message || 'Payment failed');
        }
    },

    renderSettings(area) {
        area.innerHTML = `
            <div class="settings-section">
                <h3>Account Information</h3>
                <div class="settings-row">
                    <span class="settings-label">Account Number</span>
                    <span class="settings-value" onclick="Banking.copyText('${this.account.account_number}')" title="Click to copy">${this.account.account_number} ${ICONS.copy}</span>
                </div>
                <div class="settings-row">
                    <span class="settings-label">Account Level</span>
                    <span class="settings-value" style="color:${this.account.level_color};cursor:default">${this.account.level}</span>
                </div>
                <div class="settings-row">
                    <span class="settings-label">Member Since</span>
                    <span class="settings-value" style="cursor:default">${this.account.created_at ? new Date(this.account.created_at).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'}) : 'N/A'}</span>
                </div>
            </div>
            <div class="settings-section">
                <h3>Change PIN</h3>
                <div class="pin-change-form">
                    <div class="form-group">
                        <label class="form-label">Current PIN</label>
                        <input class="form-input" type="password" id="old-pin" maxlength="${this.pinLength}" placeholder="Enter current PIN">
                    </div>
                    <div class="form-group">
                        <label class="form-label">New PIN</label>
                        <input class="form-input" type="password" id="new-pin" maxlength="${this.pinLength}" placeholder="Enter new PIN">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Confirm New PIN</label>
                        <input class="form-input" type="password" id="confirm-new-pin" maxlength="${this.pinLength}" placeholder="Confirm new PIN">
                    </div>
                    <button class="confirm-btn" onclick="Banking.changePin()">Update PIN</button>
                </div>
            </div>`;
    },

    async changePin() {
        const oldPin = document.getElementById('old-pin')?.value;
        const newPin = document.getElementById('new-pin')?.value;
        const confirmPin = document.getElementById('confirm-new-pin')?.value;

        if (!oldPin || oldPin.length !== this.pinLength) return this.toast('error', `Current PIN must be ${this.pinLength} digits`);
        if (!newPin || newPin.length !== this.pinLength) return this.toast('error', `New PIN must be ${this.pinLength} digits`);
        if (newPin !== confirmPin) return this.toast('error', 'New PINs do not match');

        const result = await this.post('changePin', {oldPin, newPin});
        if (result && result.success) {
            this.toast('success', 'PIN changed successfully');
            document.getElementById('old-pin').value = '';
            document.getElementById('new-pin').value = '';
            document.getElementById('confirm-new-pin').value = '';
        } else {
            this.toast('error', result?.message || 'Failed to change PIN');
        }
    },

    copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.toast('info', 'Copied to clipboard');
            }).catch(() => this.fallbackCopy(text));
        } else {
            this.fallbackCopy(text);
        }
    },

    fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            this.toast('info', 'Copied to clipboard');
        } catch (e) {
            this.toast('error', 'Failed to copy');
        }
        document.body.removeChild(ta);
    },

    // atm

    openAtm() {
        const app = document.getElementById('app');

        if (!this.account) {
            app.innerHTML = `
                <div class="atm-wrapper">
                    <div class="atm-frame">
                        <div class="atm-header">
                            <span class="atm-logo">MID ATM</span>
                            <button class="atm-close" onclick="Banking.close()">&times;</button>
                        </div>
                        <div class="atm-screen">
                            <div class="atm-content">
                                <div class="atm-no-account">
                                    ${ICONS.bank}
                                    <p>No bank account found.<br>Visit a bank branch to register.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            return;
        }

        app.innerHTML = `
            <div class="atm-wrapper">
                <div class="atm-frame">
                    <div class="atm-header">
                        <span class="atm-logo">MID ATM</span>
                        <button class="atm-close" onclick="Banking.close()">&times;</button>
                    </div>
                    <div class="atm-screen">
                        <div class="atm-content">
                            <div class="atm-title">Enter PIN</div>
                            <div class="atm-pin-dots">${this.renderPinDots('atm-')}</div>
                            <div class="atm-numpad">${this.renderNumpad('atm-')}</div>
                            <div class="atm-error-msg" id="atm-pin-error"></div>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    showAtmMenu() {
        const screen = document.querySelector('.atm-content');
        if (!screen) return;

        screen.innerHTML = `
            <div class="atm-title">Welcome</div>
            <div class="atm-balance-display">
                <div class="atm-balance-label">Available Balance</div>
                <div class="atm-balance-value" id="atm-bal">${this.formatMoney(this.account.balance)}</div>
            </div>
            <div class="atm-menu-grid">
                <button class="atm-menu-btn" onclick="Banking.showAtmWithdraw()">${ICONS.withdraw} Withdraw</button>
                <button class="atm-menu-btn" onclick="Banking.showAtmDeposit()">${ICONS.deposit} Deposit</button>
                <button class="atm-menu-btn" onclick="Banking.showAtmBalance()">${ICONS.savings} Balance</button>
                <button class="atm-menu-btn" onclick="Banking.showAtmStatement()">${ICONS.history} Statement</button>
            </div>`;
    },

    showAtmWithdraw() {
        const screen = document.querySelector('.atm-content');
        if (!screen) return;

        screen.innerHTML = `
            <div class="atm-title">Withdraw Cash</div>
            <div class="atm-subtitle">Select amount or enter custom</div>
            <div class="atm-quick-grid">
                ${this.quickAmounts.map(a => `<button class="atm-quick-btn" onclick="Banking.atmQuickWithdraw(${a})">${this.formatMoney(a)}</button>`).join('')}
            </div>
            <div class="atm-input-wrap">
                <span class="atm-currency">$</span>
                <input type="number" id="atm-withdraw-amount" placeholder="Custom amount">
            </div>
            <button class="atm-confirm-btn" onclick="Banking.atmWithdraw()">Withdraw</button>
            <button class="atm-back-btn" onclick="Banking.showAtmMenu()">Back to Menu</button>`;
    },

    atmQuickWithdraw(amount) {
        const input = document.getElementById('atm-withdraw-amount');
        if (input) input.value = amount;
    },

    async atmWithdraw() {
        const amount = parseInt(document.getElementById('atm-withdraw-amount')?.value);
        if (!amount || amount < 1) return this.toast('error', 'Enter amount');

        const result = await this.post('withdraw', {amount});
        if (result && result.success) {
            this.account.balance = result.balance;
            this.account.cash = result.cash;
            this.toast('success', `Withdrew ${this.formatMoney(amount)}`);
            this.showAtmMenu();
        } else {
            this.toast('error', result?.message || 'Failed');
        }
    },

    showAtmDeposit() {
        const screen = document.querySelector('.atm-content');
        if (!screen) return;

        screen.innerHTML = `
            <div class="atm-title">Deposit Cash</div>
            <div class="atm-subtitle">Enter amount to deposit</div>
            <div class="atm-input-wrap">
                <span class="atm-currency">$</span>
                <input type="number" id="atm-deposit-amount" placeholder="Enter amount">
            </div>
            <div class="atm-quick-grid">
                ${this.quickAmounts.slice(0, 6).map(a => `<button class="atm-quick-btn" onclick="document.getElementById('atm-deposit-amount').value=${a}">${this.formatMoney(a)}</button>`).join('')}
            </div>
            <button class="atm-confirm-btn" onclick="Banking.atmDeposit()">Deposit</button>
            <button class="atm-back-btn" onclick="Banking.showAtmMenu()">Back to Menu</button>`;
    },

    async atmDeposit() {
        const amount = parseInt(document.getElementById('atm-deposit-amount')?.value);
        if (!amount || amount < 1) return this.toast('error', 'Enter amount');

        const result = await this.post('deposit', {amount});
        if (result && result.success) {
            this.account.balance = result.balance;
            this.account.cash = result.cash;
            this.toast('success', `Deposited ${this.formatMoney(amount)}`);
            this.showAtmMenu();
        } else {
            this.toast('error', result?.message || 'Failed');
        }
    },

    showAtmBalance() {
        const screen = document.querySelector('.atm-content');
        if (!screen) return;

        screen.innerHTML = `
            <div class="atm-title">Account Balance</div>
            <div class="atm-balance-display">
                <div class="atm-balance-label">Bank Balance</div>
                <div class="atm-balance-value">${this.formatMoney(this.account.balance)}</div>
            </div>
            <div class="atm-balance-display" style="margin-top:10px">
                <div class="atm-balance-label">Cash on Hand</div>
                <div class="atm-balance-value" style="font-size:22px;opacity:0.7">${this.formatMoney(this.account.cash)}</div>
            </div>
            <div class="atm-balance-display" style="margin-top:10px">
                <div class="atm-balance-label">Savings</div>
                <div class="atm-balance-value" style="font-size:22px;opacity:0.7">${this.formatMoney(this.account.savings)}</div>
            </div>
            <button class="atm-back-btn" style="margin-top:auto" onclick="Banking.showAtmMenu()">Back to Menu</button>`;
    },

    async showAtmStatement() {
        const screen = document.querySelector('.atm-content');
        if (!screen) return;

        screen.innerHTML = `<div class="atm-title">Mini Statement</div><div style="opacity:0.3;text-align:center">Loading...</div>`;

        const result = await this.post('getTransactions', {page: 1, limit: 8, filter: 'all'});
        const txns = result?.transactions || [];

        screen.innerHTML = `
            <div class="atm-title">Mini Statement</div>
            <div style="flex:1;overflow-y:auto">
                ${txns.length > 0 ? txns.map(tx => {
                    const isPositive = ['deposit', 'transfer_in', 'interest', 'loan', 'savings_out'].includes(tx.type);
                    return `<div class="atm-tx-item">
                        <span class="atm-tx-desc">${tx.description || tx.type}</span>
                        <span class="atm-tx-amount ${isPositive ? 'pos' : 'neg'}">${isPositive ? '+' : '-'}${this.formatMoney(tx.amount)}</span>
                    </div>`;
                }).join('') : '<div style="text-align:center;color:rgba(74,222,128,0.3);padding:20px">No transactions</div>'}
            </div>
            <button class="atm-back-btn" onclick="Banking.showAtmMenu()">Back to Menu</button>`;
    },

    // chart

    drawActivityChart(canvas, data) {
        if (!canvas || !data || data.length === 0) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const pad = {top: 15, right: 15, bottom: 25, left: 55};
        const cw = w - pad.left - pad.right;
        const ch = h - pad.top - pad.bottom;

        const maxVal = Math.max(...data.map(d => Math.max(d.income || 0, d.expenses || 0)), 1);

        const chartPoints = data.map((d, i) => ({
            x: pad.left + (cw / (data.length - 1)) * i,
            income: d.income || 0,
            expenses: d.expenses || 0,
            label: d.label || ''
        }));

        const renderChart = (hoverIdx) => {
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            ctx.strokeStyle = 'rgba(255,255,255,0.04)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 4; i++) {
                const y = pad.top + (ch / 4) * i;
                ctx.beginPath();
                ctx.moveTo(pad.left, y);
                ctx.lineTo(pad.left + cw, y);
                ctx.stroke();

                ctx.fillStyle = 'rgba(148,163,184,0.4)';
                ctx.font = '10px Inter';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                const val = Math.round(maxVal - (maxVal / 4) * i);
                ctx.fillText(val >= 1000 ? Math.round(val / 1000) + 'k' : val, pad.left - 8, y);
            }

            const drawLine = (values, color, fillAlpha) => {
                if (values.length < 2) return;
                const points = values.map((v, i) => ({
                    x: chartPoints[i].x,
                    y: pad.top + ch - (v / maxVal) * ch
                }));

                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    const cp1x = (points[i - 1].x + points[i].x) / 2;
                    ctx.bezierCurveTo(cp1x, points[i - 1].y, cp1x, points[i].y, points[i].x, points[i].y);
                }
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.lineTo(points[points.length - 1].x, pad.top + ch);
                ctx.lineTo(points[0].x, pad.top + ch);
                ctx.closePath();

                const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
                gradient.addColorStop(0, color.replace('1)', fillAlpha + ')'));
                gradient.addColorStop(1, color.replace('1)', '0)'));
                ctx.fillStyle = gradient;
                ctx.fill();

                points.forEach((p, i) => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, i === hoverIdx ? 5 : 3, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                });
            };

            drawLine(data.map(d => d.income || 0), 'rgba(16,185,129,1)', '0.2');
            drawLine(data.map(d => d.expenses || 0), 'rgba(239,68,68,1)', '0.1');

            if (hoverIdx !== -1) {
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(chartPoints[hoverIdx].x, pad.top);
                ctx.lineTo(chartPoints[hoverIdx].x, pad.top + ch);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            ctx.fillStyle = 'rgba(148,163,184,0.5)';
            ctx.font = '10px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            data.forEach((d, i) => {
                ctx.fillText(d.label || '', chartPoints[i].x, h - 12);
            });
        };

        renderChart(-1);

        const tooltip = document.getElementById('chart-tooltip');

        canvas.addEventListener('mousemove', (e) => {
            const canvasRect = canvas.getBoundingClientRect();
            const mx = e.clientX - canvasRect.left;
            let closest = -1;
            let closestDist = Infinity;
            chartPoints.forEach((p, i) => {
                const dist = Math.abs(mx - p.x);
                if (dist < closestDist && dist < cw / (data.length - 1) / 2 + 10) {
                    closestDist = dist;
                    closest = i;
                }
            });

            if (closest !== -1 && tooltip) {
                const p = chartPoints[closest];
                tooltip.innerHTML = `<div class="chart-tooltip-label">${this.escapeHtml(p.label)}</div>`
                    + `<div class="chart-tooltip-row"><span class="chart-tooltip-dot" style="background:#10b981"></span> Income: ${this.formatMoney(p.income)}</div>`
                    + `<div class="chart-tooltip-row"><span class="chart-tooltip-dot" style="background:#ef4444"></span> Expenses: ${this.formatMoney(p.expenses)}</div>`;
                let tx = p.x;
                const tw = 160;
                if (tx - tw / 2 < 0) tx = tw / 2 + 4;
                if (tx + tw / 2 > w) tx = w - tw / 2 - 4;
                tooltip.style.left = tx + 'px';
                tooltip.style.bottom = (h - pad.top + 8) + 'px';
                tooltip.classList.add('visible');
                renderChart(closest);
            } else if (tooltip) {
                tooltip.classList.remove('visible');
                renderChart(-1);
            }
        });

        canvas.addEventListener('mouseleave', () => {
            if (tooltip) tooltip.classList.remove('visible');
            renderChart(-1);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Banking.init());
