// EduSolver Platform - Modular Reusable Components (Navbar & Footer)

(function () {
  // Helper to get relative path prefix based on URL depth
  function getPathPrefix() {
    const pathname = window.location.pathname;
    // Check if we are inside nested subdirectories under pages
    if (
      pathname.includes('/courses/') || 
      pathname.includes('/universities/') || 
      pathname.includes('/accreditations/')
    ) {
      return '../../';
    }
    // Check if we are inside /pages/ or /admin/ (single level)
    if (pathname.includes('/pages/') || pathname.includes('/admin/')) {
      return '../';
    }
    return './';
  }

  // 1. STICKY NAVBAR WEB COMPONENT
  class EduNavbar extends HTMLElement {
    connectedCallback() {
      const prefix = getPathPrefix();

      this.innerHTML = `
        <header id="main-header" class="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent py-4">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="glass shadow-sm rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300">

              <!-- Logo Area -->
              <a href="${prefix}index.html" class="flex items-center space-x-2 flex-shrink-0 group">
                <img src="${prefix}logo.webp" alt="EduSolver Logo"
                  class="h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-300">
              </a>

              <!-- Desktop Navigation Items -->
              <nav class="hidden lg:flex items-center space-x-1">
                <a href="${prefix}index.html"
                  class="px-3 py-2 text-sm font-semibold text-slate-900 hover:text-brand-500 rounded-lg transition-colors">Home</a>
                <a href="${prefix}pages/services.html"
                  class="px-3 py-2 text-sm font-semibold text-slate-900 hover:text-brand-500 rounded-lg transition-colors">Services</a>

                <!-- Dropdown: Courses -->
                <div class="relative nav-item py-2">
                  <button
                    class="flex items-center px-3 py-2 text-sm font-semibold text-slate-900 hover:text-brand-500 rounded-lg transition-colors focus:outline-none">
                    Courses <i class="fa-solid fa-chevron-down text-[10px] ml-1.5 transition-transform duration-200"></i>
                  </button>

                  <!-- MEGA MENU: Courses -->
                  <div
                    class="mega-menu absolute left-1/2 -translate-x-[20%] top-full mt-2 w-[720px] rounded-[24px] bg-white border border-slate-100 shadow-2xl p-6 grid grid-cols-3 gap-6 z-50">
                    <div class="col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <h4 class="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3.5 px-2">Trending Degrees</h4>
                        <ul class="space-y-1">
                          <li><a href="${prefix}pages/courses/online-mba.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>Online MBA</a></li>
                          <li><a href="${prefix}pages/courses/online-mca.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>Online MCA</a></li>
                          <li><a href="${prefix}pages/courses/online-bba.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>Online BBA</a></li>
                          <li><a href="${prefix}pages/courses/online-bca.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>Online BCA</a></li>
                          <li><a href="${prefix}pages/courses/bsc-it-cs.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>B.Sc (IT/CS)</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 class="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3.5 px-2">Certifications</h4>
                        <ul class="space-y-1">
                          <li><a href="${prefix}pages/courses/data-science-pg.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>Data Science PG</a></li>
                          <li><a href="${prefix}pages/courses/digital-marketing.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>Digital Marketing</a></li>
                          <li><a href="${prefix}pages/courses/full-stack-development.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>Full Stack Dev</a></li>
                          <li><a href="${prefix}pages/courses/ai-ml.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>AI & Machine Learning</a></li>
                          <li><a href="${prefix}pages/courses/cyber-security.html"
                              class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><span
                                class="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2.5 inline-block shrink-0"></span>Cyber Security</a></li>
                        </ul>
                      </div>
                    </div>
                    <div
                      class="bg-[#f0fdf4]/80 border border-brand-100/50 p-5 rounded-[20px] flex flex-col justify-between shadow-sm">
                      <div>
                        <span
                          class="inline-block bg-[#dcfce7] text-[#0f9a07] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2.5">Featured Program</span>
                        <h5 class="text-sm font-extrabold text-slate-900 leading-snug mb-1">AI-Powered Executive MBA</h5>
                        <p class="text-[11px] text-slate-500 leading-relaxed mb-3">Learn leadership & AI application tools side-by-side with global mentorship.</p>
                      </div>
                      <a href="${prefix}pages/courses/online-mba.html"
                        class="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center transition-all">Explore Program <i class="fa-solid fa-arrow-right ml-1"></i></a>
                    </div>
                  </div>
                </div>

                <!-- Dropdown: Universities -->
                <div class="relative nav-item py-2">
                  <button
                    class="flex items-center px-3 py-2 text-sm font-semibold text-slate-900 hover:text-brand-500 rounded-lg transition-colors focus:outline-none">
                    Universities <i class="fa-solid fa-chevron-down text-[10px] ml-1.5 transition-transform duration-200"></i>
                  </button>

                  <!-- MEGA MENU: Universities -->
                  <div
                    class="mega-menu absolute left-1/2 -translate-x-[40%] top-full mt-2 w-[760px] rounded-[24px] bg-white border border-slate-100 shadow-2xl p-6 grid grid-cols-3 gap-6 z-50">
                    <div>
                      <h4 class="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3.5 px-2">Top Ranked</h4>
                      <ul class="space-y-1">
                        <li><a href="${prefix}pages/universities/amity-university.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-award text-brand-500 mr-2.5 text-[15px]"></i>Amity University</a></li>
                        <li><a href="${prefix}pages/universities/lpu-online.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-award text-brand-500 mr-2.5 text-[15px]"></i>LPU Online</a></li>
                        <li><a href="${prefix}pages/universities/manipal-university.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-award text-brand-500 mr-2.5 text-[15px]"></i>Manipal University</a></li>
                        <li><a href="${prefix}pages/universities/chandigarh-university.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-award text-brand-500 mr-2.5 text-[15px]"></i>Chandigarh University</a></li>
                        <li><a href="${prefix}pages/universities/jain-online.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-award text-brand-500 mr-2.5 text-[15px]"></i>Jain Online</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3.5 px-2">Accreditation Categories</h4>
                      <ul class="space-y-1">
                        <li><a href="${prefix}pages/accreditations/ugc-deb.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-circle-check text-brand-500 mr-2.5 text-[14px]"></i>UGC-DEB Approved</a></li>
                        <li><a href="${prefix}pages/accreditations/naac.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-circle-check text-brand-500 mr-2.5 text-[14px]"></i>NAAC A+/A++ Grade</a></li>
                        <li><a href="${prefix}pages/accreditations/nirf.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-circle-check text-brand-500 mr-2.5 text-[14px]"></i>NIRF Top 100 Ranked</a></li>
                        <li><a href="${prefix}pages/accreditations/aicte.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-circle-check text-brand-500 mr-2.5 text-[14px]"></i>AICTE Approved</a></li>
                        <li><a href="${prefix}pages/accreditations/wes.html"
                            class="flex items-center px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all"><i
                              class="fa-solid fa-circle-check text-brand-500 mr-2.5 text-[14px]"></i>WES Approved Universities</a></li>
                      </ul>
                    </div>
                    <div
                      class="bg-[#f0fdf4]/80 border border-brand-100/50 p-5 rounded-[20px] flex flex-col justify-between shadow-sm">
                      <div>
                        <h5 class="text-sm font-extrabold text-slate-900 leading-snug mb-1">University Matcher</h5>
                        <p class="text-[11px] text-slate-500 leading-relaxed mb-3">Not sure which university fits your budget and goal? Try our interactive university matching analyzer.</p>
                      </div>
                      <a href="${prefix}pages/universities.html"
                        class="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center transition-all">Launch Matcher <i class="fa-solid fa-arrow-right ml-1"></i></a>
                    </div>
                  </div>
                </div>

                <!-- Dropdown: Privacy & Policy -->
                <div class="relative nav-item py-2">
                  <button
                    class="flex items-center px-3 py-2 text-sm font-semibold text-slate-900 hover:text-brand-500 rounded-lg transition-colors focus:outline-none">
                    Privacy & Policy <i class="fa-solid fa-chevron-down text-[10px] ml-1.5 transition-transform duration-200"></i>
                  </button>

                  <!-- DROPDOWN MENU: Privacy & Policy -->
                  <div
                    class="mega-menu absolute right-0 top-full mt-2 w-[240px] rounded-[24px] bg-white border border-slate-100 shadow-2xl p-4 z-50 flex flex-col">
                    <a href="${prefix}pages/privacy-policy.html"
                      class="block w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 rounded-lg transition-colors">Privacy Policy</a>
                    <div class="h-[1px] bg-slate-100 my-1 w-full"></div>
                    <a href="${prefix}pages/refund-policy.html"
                      class="block w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 rounded-lg transition-colors">Refund Policy</a>
                    <div class="h-[1px] bg-slate-100 my-1 w-full"></div>
                    <a href="${prefix}pages/pay-now.html"
                      class="block w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 rounded-lg transition-colors">Pay Now</a>
                    <div class="h-[1px] bg-slate-100 my-1 w-full"></div>
                    <a href="${prefix}pages/terms-conditions.html"
                      class="block w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 rounded-lg transition-colors">Terms & Conditions</a>
                    <div class="h-[1px] bg-slate-100 my-1 w-full"></div>
                    <a href="${prefix}pages/shipping-delivery.html"
                      class="block w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 rounded-lg transition-colors">Shipping & Delivery</a>
                    <div class="h-[1px] bg-slate-100 my-1 w-full"></div>
                    <a href="${prefix}pages/help-desk.html"
                      class="block w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 rounded-lg transition-colors">EduSolver Help Desk</a>
                  </div>
                </div>

                <a href="${prefix}pages/blog.html"
                  class="px-3 py-2 text-sm font-semibold text-slate-900 hover:text-brand-500 rounded-lg transition-colors">Blogs</a>
                <a href="${prefix}pages/about.html"
                  class="px-3 py-2 text-sm font-semibold text-slate-900 hover:text-brand-500 rounded-lg transition-colors">About</a>
                <a href="${prefix}pages/contact.html"
                  class="px-3 py-2 text-sm font-semibold text-slate-900 hover:text-brand-500 rounded-lg transition-colors">Contact</a>
              </nav>

              <!-- Right Button Actions -->
              <div class="hidden lg:flex items-center space-x-3">
                <!-- Language Selector Dropdown -->
                <div class="relative group py-2">
                  <button class="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-black text-slate-700 hover:text-brand-500 bg-slate-50 hover:bg-brand-50 border border-slate-200 rounded-xl transition-all focus:outline-none select-none">
                    <i class="fa-solid fa-earth-americas text-brand-500"></i>
                    <span>EN</span>
                    <i class="fa-solid fa-chevron-down text-[8px] transition-transform group-hover:rotate-180 duration-200"></i>
                  </button>
                  <!-- Dropdown options -->
                  <div class="absolute right-0 top-full mt-1.5 w-[120px] rounded-xl bg-white border border-slate-100 shadow-2xl p-2 z-50 flex flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <button class="w-full text-left px-3 py-1.5 text-xs font-bold text-slate-800 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors flex items-center justify-between">
                      <span>English</span> <i class="fa-solid fa-circle-check text-brand-500 text-[10px]"></i>
                    </button>
                    <button class="w-full text-left px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors flex items-center justify-between">
                      <span>हिन्दी</span>
                    </button>
                  </div>
                </div>

                <a href="${prefix}index.html#contact"
                  class="px-5 py-2.5 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition-all shadow-md shadow-brand-200 hover:shadow-brand-300 relative overflow-hidden group">
                  <span
                    class="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-600 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span class="relative z-10">Apply Now</span>
                </a>
              </div>

              <!-- Mobile Hamburger Toggle Button -->
              <div class="flex lg:hidden items-center">
                <button id="mobile-toggle" class="p-2 rounded-lg text-slate-600 hover:text-brand-500 focus:outline-none"
                  aria-label="Toggle navigation menu">
                  <i class="fa-solid fa-bars text-xl"></i>
                </button>
              </div>

            </div>
          </div>

          <!-- Mobile Navigation Drawer -->
          <div id="mobile-menu"
            class="hidden lg:hidden w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100 absolute top-full left-0 z-40 transition-all duration-300 px-6 py-4 flex flex-col space-y-3">
            <a href="${prefix}index.html"
              class="block py-2 text-base font-semibold text-slate-900 hover:text-brand-500 transition-colors">Home</a>
            <a href="${prefix}pages/services.html"
              class="block py-2 text-base font-semibold text-slate-900 hover:text-brand-500 transition-colors">Services</a>
            <hr class="border-slate-100">
            <button
              class="flex items-center justify-between w-full py-2 text-base font-semibold text-slate-900 hover:text-brand-500 transition-colors focus:outline-none"
              onclick="toggleMobileSubmenu('mob-courses')">
              Courses <i class="fa-solid fa-chevron-down text-xs transition-transform" id="mob-courses-arrow"></i>
            </button>
            <div id="mob-courses" class="hidden pl-4 space-y-2 text-sm">
              <a href="${prefix}pages/courses/online-mba.html" class="block py-1 text-slate-600 hover:text-brand-500">Online MBA</a>
              <a href="${prefix}pages/courses/online-mca.html" class="block py-1 text-slate-600 hover:text-brand-500">Online MCA</a>
              <a href="${prefix}pages/courses/online-bba.html" class="block py-1 text-slate-600 hover:text-brand-500">Online BBA</a>
              <a href="${prefix}pages/courses/online-bca.html" class="block py-1 text-slate-600 hover:text-brand-500">Online BCA</a>
              <a href="${prefix}pages/courses/bsc-it-cs.html" class="block py-1 text-slate-600 hover:text-brand-500">B.Sc (IT/CS)</a>
            </div>
            <hr class="border-slate-100">
            <button
              class="flex items-center justify-between w-full py-2 text-base font-semibold text-slate-900 hover:text-brand-500 transition-colors focus:outline-none"
              onclick="toggleMobileSubmenu('mob-universities')">
              Universities <i class="fa-solid fa-chevron-down text-xs transition-transform" id="mob-universities-arrow"></i>
            </button>
            <div id="mob-universities" class="hidden pl-4 space-y-2 text-sm">
              <a href="${prefix}pages/universities/amity-university.html" class="block py-1 text-slate-600 hover:text-brand-500">Amity University</a>
              <a href="${prefix}pages/universities/lpu-online.html" class="block py-1 text-slate-600 hover:text-brand-500">LPU Online</a>
              <a href="${prefix}pages/universities/manipal-university.html" class="block py-1 text-slate-600 hover:text-brand-500">Manipal University</a>
              <a href="${prefix}pages/universities/chandigarh-university.html" class="block py-1 text-slate-600 hover:text-brand-500">Chandigarh University</a>
              <a href="${prefix}pages/universities/jain-online.html" class="block py-1 text-slate-600 hover:text-brand-500">Jain Online</a>
            </div>
            <hr class="border-slate-100">
            <button
              class="flex items-center justify-between w-full py-2 text-base font-semibold text-slate-900 hover:text-brand-500 transition-colors focus:outline-none"
              onclick="toggleMobileSubmenu('mob-privacy')">
              Privacy & Policy <i class="fa-solid fa-chevron-down text-xs transition-transform" id="mob-privacy-arrow"></i>
            </button>
            <div id="mob-privacy" class="hidden pl-4 space-y-2 text-sm">
              <a href="${prefix}pages/privacy-policy.html" class="block py-1 text-slate-600 hover:text-brand-500">Privacy Policy</a>
              <a href="${prefix}pages/refund-policy.html" class="block py-1 text-slate-600 hover:text-brand-500">Refund Policy</a>
              <a href="${prefix}pages/pay-now.html" class="block py-1 text-slate-600 hover:text-brand-500">Pay Now</a>
              <a href="${prefix}pages/terms-conditions.html" class="block py-1 text-slate-600 hover:text-brand-500">Terms & Conditions</a>
              <a href="${prefix}pages/shipping-delivery.html" class="block py-1 text-slate-600 hover:text-brand-500">Shipping & Delivery</a>
              <a href="${prefix}pages/help-desk.html" class="block py-1 text-slate-600 hover:text-brand-500">EduSolver Help Desk</a>
            </div>
            <hr class="border-slate-100">
            <a href="${prefix}pages/blog.html"
              class="block py-2 text-base font-semibold text-slate-900 hover:text-brand-500 transition-colors">Blogs</a>
            <a href="${prefix}pages/about.html"
              class="block py-2 text-base font-semibold text-slate-900 hover:text-brand-500 transition-colors">About</a>
            <a href="${prefix}pages/contact.html"
              class="block py-2 text-base font-semibold text-slate-900 hover:text-brand-500 transition-colors">Contact</a>
            <a href="${prefix}index.html#contact"
              class="block text-center w-full py-3 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition-all shadow-md">Apply Now</a>
          </div>
        </header>
      `;

      // Set up scrolling effects
      this.initNavbarEffects();
    }

    initNavbarEffects() {
      const header = this.querySelector('#main-header');
      if (!header) return;
      const innerContainer = header.querySelector('.glass');
      if (!innerContainer) return;

      window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
          header.classList.remove('py-4');
          header.classList.add('py-2');
          innerContainer.classList.add('shadow-md');
          innerContainer.style.background = "rgba(255, 255, 255, 0.95)";
        } else {
          header.classList.remove('py-2');
          header.classList.add('py-4');
          innerContainer.classList.remove('shadow-md');
          innerContainer.style.background = "rgba(255, 255, 255, 0.85)";
        }
      });

      // Mobile Menu Toggle
      const mobileToggle = this.querySelector('#mobile-toggle');
      const mobileMenu = this.querySelector('#mobile-menu');
      if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function () {
          mobileMenu.classList.toggle('hidden');
          const icon = mobileToggle.querySelector('i');
          if (mobileMenu.classList.contains('hidden')) {
            icon.className = 'fa-solid fa-bars text-xl';
          } else {
            icon.className = 'fa-solid fa-xmark text-xl';
          }
        });
      }
    }
  }

  // 2. PREMIUM FOOTER WEB COMPONENT
  class EduFooter extends HTMLElement {
    connectedCallback() {
      const prefix = getPathPrefix();

      this.innerHTML = `
        <footer id="about" class="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900 relative">
          <!-- Extra CTA area above footer -->
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-slate-900">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-8 space-y-2">
                <h3 class="text-lg font-bold text-white">Subscribe to Educational Updates</h3>
                <p class="text-xs text-slate-500">Get weekly inputs about UGC policy revisions, NAAC ratings, and corporate
                  placements straight to your inbox.</p>
              </div>
              <div class="lg:col-span-4">
                <form id="newsletter-form" class="flex gap-2">
                  <input type="email" placeholder="Your Email Address" required
                    class="w-full bg-slate-900 border border-slate-800 text-xs text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-500 placeholder-slate-500">
                  <button type="submit"
                    class="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors">Subscribe</button>
                </form>
              </div>
            </div>
          </div>

          <!-- Main footer layout -->
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 font-sans">
            <!-- Company column -->
            <div class="space-y-4">
              <img src="${prefix}logo.webp" alt="EduSolver Footer Logo" class="h-10 w-auto object-contain brightness-100">
              <p class="text-xs text-slate-500 leading-relaxed">
                EduSolver is India's leading accredited education consultancy platform providing transparent, unbiased
                university comparison solutions.
              </p>

              <!-- Social handle grid -->
              <div class="flex space-x-3.5 pt-2">
                <a href="#"
                  class="w-8 h-8 rounded-lg bg-slate-900 hover:bg-brand-500 hover:text-white flex items-center justify-center text-sm transition-colors"
                  aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"
                  class="w-8 h-8 rounded-lg bg-slate-900 hover:bg-brand-500 hover:text-white flex items-center justify-center text-sm transition-colors"
                  aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                <a href="#"
                  class="w-8 h-8 rounded-lg bg-slate-900 hover:bg-brand-500 hover:text-white flex items-center justify-center text-sm transition-colors"
                  aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="#"
                  class="w-8 h-8 rounded-lg bg-slate-900 hover:bg-brand-500 hover:text-white flex items-center justify-center text-sm transition-colors"
                  aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              </div>
            </div>

            <!-- Quick links column -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
              <ul class="space-y-2 text-xs">
                <li><a href="${prefix}index.html" class="hover:text-white transition-colors">Home Portal</a></li>
                <li><a href="${prefix}pages/services.html" class="hover:text-white transition-colors">Curated Programs</a></li>
                <li><a href="${prefix}pages/universities.html" class="hover:text-white transition-colors">Side Comparison</a></li>
                <li><a href="${prefix}pages/blog.html" class="hover:text-white transition-colors">Insights & Blogs</a></li>
                <li><a href="${prefix}pages/contact.html" class="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <!-- Popular Courses column -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold text-white uppercase tracking-wider">Popular Programs</h4>
              <ul class="space-y-2 text-xs">
                <li><a href="${prefix}pages/courses/online-mba.html" class="hover:text-white transition-colors">Online MBA Programs</a></li>
                <li><a href="${prefix}pages/courses/online-mca.html" class="hover:text-white transition-colors">Online MCA Programs</a></li>
                <li><a href="${prefix}pages/courses/online-bba.html" class="hover:text-white transition-colors">Online BBA Programs</a></li>
                <li><a href="${prefix}pages/courses/online-bca.html" class="hover:text-white transition-colors">Online BCA Programs</a></li>
                <li><a href="${prefix}pages/courses/ai-ml.html" class="hover:text-white transition-colors">AI & Machine Learning Pro</a></li>
              </ul>
            </div>

            <!-- Partner Universities column -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold text-white uppercase tracking-wider">Accredited Partner universities</h4>
              <ul class="space-y-2 text-xs">
                <li><a href="${prefix}pages/universities/amity-university.html" class="hover:text-white transition-colors">Amity University Online</a></li>
                <li><a href="${prefix}pages/universities/lpu-online.html" class="hover:text-white transition-colors">LPU Online Programs</a></li>
                <li><a href="${prefix}pages/universities/manipal-university.html" class="hover:text-white transition-colors">Sikkim Manipal Online</a></li>
                <li><a href="${prefix}pages/universities/chandigarh-university.html" class="hover:text-white transition-colors">Chandigarh University Online</a></li>
                <li><a href="${prefix}pages/universities/jain-online.html" class="hover:text-white transition-colors">Jain University Online</a></li>
              </ul>
            </div>

            <!-- Contact column -->
            <div class="space-y-3" id="contact">
              <h4 class="text-xs font-bold text-white uppercase tracking-wider">Contact Admissions Desk</h4>
              <ul class="space-y-2 text-xs text-slate-500 leading-relaxed">
                <li><i class="fa-solid fa-phone text-brand-500 mr-2"></i> +91 1800-456-7890 (Toll Free)</li>
                <li><i class="fa-solid fa-envelope text-brand-500 mr-2"></i> admissions@edusolver.in</li>
                <li><i class="fa-solid fa-location-dot text-brand-500 mr-2 text-sm"></i> Floor 4, EduSolver Hub, Connaught Place, New Delhi, India</li>
              </ul>
            </div>
          </div>

          <!-- Trust Seals / Accreditations row -->
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-4 border-t border-b border-slate-900 flex flex-wrap items-center justify-between gap-4">
            <span class="text-[10px] uppercase font-bold text-slate-500">TRUST SEALS & COMPLIANCES:</span>
            <div class="flex items-center space-x-6 text-slate-500 text-xs">
              <span><i class="fa-solid fa-circle-check text-brand-500 mr-1.5"></i>UGC-DEB Compliant</span>
              <span><i class="fa-solid fa-shield-halved text-brand-500 mr-1.5"></i>ISO 9001:2015</span>
              <span><i class="fa-solid fa-lock text-brand-500 mr-1.5"></i>SSL Secure Payments</span>
            </div>
          </div>

          <!-- Subfooter copyright -->
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-600 gap-4 pt-4">
            <span>&copy; 2026 EduSolver Platform. All Rights Reserved.</span>
            <div class="flex space-x-4">
              <a href="${prefix}pages/terms-conditions.html" class="hover:underline hover:text-slate-400">Terms of Service</a>
              <a href="${prefix}pages/privacy-policy.html" class="hover:underline hover:text-slate-400">Privacy Policy</a>
              <a href="${prefix}pages/refund-policy.html" class="hover:underline hover:text-slate-400">Refund Policy</a>
            </div>
          </div>
        </footer>
      `;

      this.initFooterEvents();
    }

    initFooterEvents() {
      const form = this.querySelector('#newsletter-form');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          alert('Subscribed successfully!');
          form.reset();
        });
      }
    }
  }

  // Define dynamic global helpers
  window.toggleMobileSubmenu = function (id) {
    const submenu = document.getElementById(id);
    const arrow = document.getElementById(id + '-arrow');
    if (!submenu) return;
    submenu.classList.toggle('hidden');
    if (submenu.classList.contains('hidden')) {
      arrow.style.transform = 'rotate(0deg)';
    } else {
      arrow.style.transform = 'rotate(180deg)';
    }
  };

  // Register Custom Elements
  customElements.define('edu-navbar', EduNavbar);
  customElements.define('edu-footer', EduFooter);
})();
