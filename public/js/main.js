/**
 * VibranCSE 2025 - Department CSE Fest Official Client Script
 * Principal Software Engineer & Senior UI/UX Designer
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize all modules
    initNavbar();
    initCountdown();
    initEventsFilter();
    initScheduleTabs();
    initTerminalSimulator();
    initRegistrationModal();
    initFAQAccordion();
});

/* ==========================================================================
   1. Navbar Scroll Effect & Mobile Menu
   ================================================================          */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Scroll blur & border effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-slate-950/90', 'shadow-lg', 'shadow-neon-cyan/5', 'border-slate-800');
        } else {
            navbar.classList.remove('bg-slate-950/90', 'shadow-lg', 'shadow-neon-cyan/5');
        }
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

/* ==========================================================================
   2. Countdown Timer to Fest Date (e.g. April 15, 2025)
   ================================================================          */
function initCountdown() {
    // Set fest date to 20 days from now if needed or fixed future date
    const festDate = new Date();
    festDate.setDate(festDate.getDate() + 24);
    festDate.setHours(9, 0, 0, 0);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    function updateTimer() {
        const now = new Date().getTime();
        const distance = festDate.getTime() - now;

        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(minutes).padStart(2, '0');
        secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ==========================================================================
   3. Events Filtering System
   ================================================================          */
function initEventsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    if (filterBtns.length === 0 || eventCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active styles from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('bg-neon-cyan', 'text-slate-950', 'shadow-lg', 'shadow-neon-cyan/25', 'font-semibold');
                b.classList.add('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800');
            });

            // Add active style to clicked button
            btn.classList.remove('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800');
            btn.classList.add('bg-neon-cyan', 'text-slate-950', 'shadow-lg', 'shadow-neon-cyan/25', 'font-semibold');

            const filterValue = btn.getAttribute('data-filter');

            eventCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   4. Schedule Day Tabs Switcher
   ================================================================          */
function initScheduleTabs() {
    const dayBtns = document.querySelectorAll('.schedule-tab');
    const scheduleContents = document.querySelectorAll('.schedule-content');

    if (dayBtns.length === 0 || scheduleContents.length === 0) return;

    dayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDay = btn.getAttribute('data-day');

            // Reset buttons
            dayBtns.forEach(b => {
                b.classList.remove('bg-gradient-to-r', 'from-neon-cyan', 'to-neon-purple', 'text-slate-950', 'font-bold', 'shadow-lg', 'shadow-neon-cyan/20');
                b.classList.add('bg-slate-900/80', 'text-slate-400', 'border', 'border-slate-800');
            });

            // Activate clicked button
            btn.classList.remove('bg-slate-900/80', 'text-slate-400', 'border', 'border-slate-800');
            btn.classList.add('bg-gradient-to-r', 'from-neon-cyan', 'to-neon-purple', 'text-slate-950', 'font-bold', 'shadow-lg', 'shadow-neon-cyan/20');

            // Toggle content
            scheduleContents.forEach(content => {
                if (content.id === `day-${targetDay}`) {
                    content.classList.remove('hidden');
                    content.classList.add('block');
                } else {
                    content.classList.remove('block');
                    content.classList.add('hidden');
                }
            });
        });
    });
}

/* ==========================================================================
   5. Interactive Terminal Simulator
   ================================================================          */
function initTerminalSimulator() {
    const terminalBody = document.getElementById('terminalBody');
    const terminalInput = document.getElementById('terminalInput');

    if (!terminalBody || !terminalInput) return;

    const commands = {
        help: "Available commands:\n  - about      : Learn about VibranCSE '25\n  - events     : List featured hackathons & coding battles\n  - sponsors   : View title sponsors & partners\n  - register   : Open event registration portal\n  - date       : Fest dates & venue info\n  - clear      : Clear terminal screen\n  - matrix     : Enter the digital realm",
        about: "VibranCSE 2025 is the premier annual National Level Technical Symposium organized by the Department of Computer Science & Engineering. Featuring 15+ high-octane events, total prize pool of $10,000+, and cutting-edge tech talks.",
        events: "Featured Events:\n1. HackMatrix 24hr Hackathon\n2. ByteWars Algorithmic Battle\n3. RoboWars AI Arena\n4. BugHunter CTF Challenge\n5. WebCraft UI/UX Design Sprint",
        sponsors: "Proudly sponsored by:\n- TechCorp Global\n- Cyberdyne Systems\n- Apex Cloud Solutions\n- NextGen AI Labs",
        register: "To register for events, click the 'Register Now' button in the navbar or select any event card below!",
        date: "Date: April 15 - 17, 2025\nVenue: University Main Auditorium & CSE Tech Park",
        matrix: "Wake up, Neo...\nThe matrix has you.\nFollow the white rabbit. 🐇"
    };

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value.trim().toLowerCase();
            if (!cmd) return;

            // Append user command
            const userLine = document.createElement('div');
            userLine.className = 'flex items-center gap-2 text-slate-300 mt-2';
            userLine.innerHTML = `<span class="text-neon-cyan">visitor@vibrancse:~$</span> <span>${escapeHtml(terminalInput.value)}</span>`;
            terminalBody.insertBefore(userLine, terminalInput.parentElement);

            // Process command
            const responseLine = document.createElement('div');
            responseLine.className = 'text-slate-400 mt-1 whitespace-pre-line font-mono text-xs leading-relaxed';

            if (cmd === 'clear') {
                // Clear all except input wrapper
                Array.from(terminalBody.children).forEach(child => {
                    if (child !== terminalInput.parentElement && !child.classList.contains('terminal-intro')) {
                        child.remove();
                    }
                });
            } else if (commands[cmd]) {
                responseLine.textContent = commands[cmd];
                terminalBody.insertBefore(responseLine, terminalInput.parentElement);
            } else {
                responseLine.textContent = `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
                responseLine.className += ' text-neon-pink';
                terminalBody.insertBefore(responseLine, terminalInput.parentElement);
            }

            terminalInput.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
}

function escapeHtml(string) {
    return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ==========================================================================
   6. Registration & Pass Generation Modal
   ================================================================          */
function initRegistrationModal() {
    // Modal state container injected dynamically if not present
    if (!document.getElementById('registerModal')) {
        createRegistrationModalHTML();
    }
}

function createRegistrationModalHTML() {
    const modalHTML = `
    <div id="registerModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl hidden opacity-0 transition-opacity duration-300">
        <div class="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-neon-purple/20 transform scale-95 transition-transform duration-300" id="modalContainer">
            <!-- Close Button -->
            <button onclick="closeRegisterModal()" class="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800/60 p-2 rounded-xl transition-colors">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <!-- Form View -->
            <div id="registrationFormView">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                        <i data-lucide="ticket" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-white">Secure Your Pass</h3>
                        <p class="text-xs text-slate-400">Join VibranCSE 2025 & unlock all events</p>
                    </div>
                </div>

                <form id="festRegForm" onsubmit="handleRegistrationSubmit(event)" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name</label>
                        <input type="text" id="regName" required placeholder="Alex Turner" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all">
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
                            <input type="email" id="regEmail" required placeholder="alex@university.edu" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Phone Number</label>
                            <input type="tel" id="regPhone" required placeholder="+1 (555) 019-2834" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Institution / College</label>
                            <input type="text" id="regCollege" required placeholder="MIT / Stanford" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Primary Event</label>
                            <select id="regEvent" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all">
                                <option value="HackMatrix 24hr Hackathon">HackMatrix 24hr Hackathon</option>
                                <option value="ByteWars Algorithmic Battle">ByteWars Algorithmic Battle</option>
                                <option value="RoboWars AI Arena">RoboWars AI Arena</option>
                                <option value="BugHunter CTF Challenge">BugHunter CTF Challenge</option>
                                <option value="WebCraft UI/UX Sprint">WebCraft UI/UX Sprint</option>
                                <option value="General Fest Pass">General Fest Pass</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" class="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-neon-cyan via-teal-400 to-neon-purple text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-neon-cyan/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2">
                        <span>Generate Pass & Register</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                </form>
            </div>

            <!-- Success Pass View (Hidden initially) -->
            <div id="registrationSuccessView" class="hidden text-center py-4">
                <div class="w-16 h-16 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <i data-lucide="check-circle-2" class="w-8 h-8"></i>
                </div>
                <h3 class="text-2xl font-black text-white mb-1">Registration Successful!</h3>
                <p class="text-sm text-slate-400 mb-6">Your digital pass has been generated. Save or screenshot this pass.</p>

                <!-- Digital Ticket Card -->
                <div class="bg-gradient-to-br from-slate-950 to-slate-900 border border-neon-cyan/40 rounded-2xl p-5 text-left relative overflow-hidden shadow-xl mb-6">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <span class="text-[10px] font-mono tracking-widest text-neon-cyan uppercase">Official Pass #</span>
                            <h4 id="passCodeDisplay" class="text-lg font-mono font-bold text-white">VIB-8X92K</h4>
                        </div>
                        <div class="px-2.5 py-1 bg-neon-cyan/20 border border-neon-cyan/40 rounded-lg text-[10px] font-mono font-semibold text-neon-cyan">
                            VERIFIED
                        </div>
                    </div>
                    <div class="space-y-2 text-xs border-t border-slate-800 pt-3">
                        <div class="flex justify-between"><span class="text-slate-400">Name:</span> <span id="passNameDisplay" class="font-medium text-white">Alex Turner</span></div>
                        <div class="flex justify-between"><span class="text-slate-400">Event:</span> <span id="passEventDisplay" class="font-medium text-white">HackMatrix</span></div>
                        <div class="flex justify-between"><span class="text-slate-400">Date:</span> <span class="font-medium text-white">April 15-17, 2025</span></div>
                    </div>
                </div>

                <div class="flex gap-3">
                    <button onclick="closeRegisterModal()" class="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-colors">
                        Close
                    </button>
                    <button onclick="window.print()" class="flex-1 py-3 bg-neon-cyan text-slate-950 rounded-xl text-sm font-bold shadow-lg shadow-neon-cyan/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        <span>Print Pass</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    lucide.createIcons();
}

function openRegisterModal(eventName = '') {
    const modal = document.getElementById('registerModal');
    const modalContainer = document.getElementById('modalContainer');
    const regEventSelect = document.getElementById('regEvent');

    if (eventName && regEventSelect) {
        for (let option of regEventSelect.options) {
            if (option.value.toLowerCase().includes(eventName.toLowerCase())) {
                regEventSelect.value = op