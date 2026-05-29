// EduSolver Platform - Home Page Interactive Logic (main.js)

document.addEventListener('DOMContentLoaded', function () {

  // ------------------------------------------
  // 1. Search Autocomplete Suggestions Logic
  // ------------------------------------------
  const heroSearch = document.getElementById('hero-search');
  const suggestionsBox = document.getElementById('search-suggestions');

  if (heroSearch && suggestionsBox) {
    heroSearch.addEventListener('keyup', function () {
      const query = heroSearch.value.trim().toLowerCase();
      suggestionsBox.innerHTML = '';

      if (query.length === 0) {
        suggestionsBox.classList.add('hidden');
        return;
      }

      // Fetch dynamic suggestions list from window.EduSolverData configuration
      const list = (window.EduSolverData && window.EduSolverData.searchSuggestions) || [];
      const matches = list.filter(item => item.name.toLowerCase().includes(query));

      if (matches.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = 'px-4 py-3 text-xs font-medium text-slate-400 italic';
        noResult.innerText = "No direct course or university matched.";
        suggestionsBox.appendChild(noResult);
      } else {
        matches.forEach(item => {
          const div = document.createElement('a');
          div.href = item.url;
          div.className = 'flex items-center justify-between px-4 py-3 hover:bg-brand-50 transition-colors border-b border-slate-50 last:border-0';

          let icon = '<i class="fa-solid fa-graduation-cap text-brand-500 mr-3 shrink-0"></i>';
          if (item.type === 'university') {
             icon = '<i class="fa-solid fa-university text-brand-500 mr-3 shrink-0"></i>';
          }

          div.innerHTML = `
            <div class="flex items-center text-xs font-semibold text-slate-800">
              ${icon}
              <span>${item.name}</span>
            </div>
            <span class="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider shrink-0 ml-2">${item.type}</span>
          `;

          div.addEventListener('click', () => {
            heroSearch.value = item.name;
            suggestionsBox.classList.add('hidden');
          });

          suggestionsBox.appendChild(div);
        });
      }
      suggestionsBox.classList.remove('hidden');
    });

    // Close suggestions box when clicking outside
    document.addEventListener('click', function (e) {
      if (!heroSearch.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.classList.add('hidden');
      }
    });
  }

  // ------------------------------------------
  // 2. Testimonial Slider Carousel Logic
  // ------------------------------------------
  let currentTestimonialIndex = 0;
  let totalTestimonials = 0;

  window.initTestimonials = function () {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('slider-dots');
    if (slides.length === 0) return;
    
    totalTestimonials = slides.length;

    // Dynamically generate dot indicators if container exists
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const btn = document.createElement('button');
        btn.className = `slider-dot w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-brand-500 scale-125' : 'bg-slate-300 hover:bg-slate-400'}`;
        btn.setAttribute('onclick', `setTestimonial(${idx})`);
        btn.setAttribute('aria-label', `Slide ${idx + 1}`);
        dotsContainer.appendChild(btn);
      });
    }

    setTestimonial(0);
  };

  window.setTestimonial = function (index) {
    currentTestimonialIndex = index;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slides.length === 0) return;

    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.remove('hidden');
        setTimeout(() => {
          slide.classList.remove('opacity-0');
          slide.classList.add('opacity-100');
        }, 50);
      } else {
        slide.classList.add('hidden', 'opacity-0');
        slide.classList.remove('opacity-100');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('bg-brand-500', 'scale-125');
        dot.classList.remove('bg-slate-300');
      } else {
        dot.classList.add('bg-slate-300');
        dot.classList.remove('bg-brand-500', 'scale-125');
      }
    });
  };

  window.nextTestimonial = function () {
    let nextIndex = currentTestimonialIndex + 1;
    if (nextIndex >= totalTestimonials) nextIndex = 0;
    setTestimonial(nextIndex);
  };

  window.prevTestimonial = function () {
    let prevIndex = currentTestimonialIndex - 1;
    if (prevIndex < 0) prevIndex = totalTestimonials - 1;
    setTestimonial(prevIndex);
  };

  // Autoplay testimonials
  const sliderContainer = document.getElementById('testimonial-slider-container');
  if (sliderContainer) {
    initTestimonials();
    let testimonialAutoplay = setInterval(nextTestimonial, 5000);

    // Pause autoplay on mouse enter
    const sliderBox = sliderContainer.parentElement;
    if (sliderBox) {
      sliderBox.addEventListener('mouseenter', () => clearInterval(testimonialAutoplay));
      sliderBox.addEventListener('mouseleave', () => testimonialAutoplay = setInterval(nextTestimonial, 5000));
    }
  }

  // ------------------------------------------
  // 3. Numeric Count-up Animation (Stats)
  // ------------------------------------------
  function animateCounters(elementsArray) {
    const statsList = elementsArray || [
      { id: "counter-students", suffix: "+" },
      { id: "counter-universities", suffix: "+" },
      { id: "counter-success", suffix: "%" },
      { id: "counter-partners", suffix: "+" }
    ];

    statsList.forEach(stat => {
      const el = document.getElementById(stat.id);
      if (!el) return;
      if (el.getAttribute('data-animated') === 'true') return;
      el.setAttribute('data-animated', 'true');

      const targetValue = parseFloat(el.getAttribute('data-target'));
      const duration = 1800; // 1.8 seconds animation
      const frameRate = 30; // 30 updates per second
      const totalFrames = (duration / 1000) * frameRate;
      const increment = targetValue / totalFrames;

      let currentValue = 0;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        currentValue += increment;

        if (frame >= totalFrames) {
          clearInterval(timer);
          el.innerText = targetValue.toLocaleString() + stat.suffix;
        } else {
          el.innerText = Math.floor(currentValue).toLocaleString() + stat.suffix;
        }
      }, 1000 / frameRate);
    });
  }

  // Trigger stats counter increment on view scroll
  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    let animatedAlready = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedAlready) {
          animatedAlready = true;
          animateCounters();
          observer.unobserve(statsSection);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(statsSection);
  }

  // Trigger hero counter ribbon on view scroll
  const heroStatsSection = document.getElementById('hero-stats-section');
  if (heroStatsSection) {
    let animatedAlready = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedAlready) {
          animatedAlready = true;
          animateCounters([
            { id: "hero-counter-students", suffix: "+" },
            { id: "hero-counter-match", suffix: "%" },
            { id: "hero-counter-partners", suffix: "+" },
            { id: "hero-counter-rating", suffix: "/5" }
          ]);
          observer.unobserve(heroStatsSection);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(heroStatsSection);
  }

});

// ------------------------------------------
// 4. Course Categories Filter
// ------------------------------------------
window.filterCourses = function (category) {
  const cards = document.querySelectorAll('.course-card');
  const buttons = document.querySelectorAll('.course-tab-btn');

  // Update button styling
  buttons.forEach(btn => {
    btn.classList.remove('active', 'bg-brand-500', 'text-white', 'border-brand-500', 'shadow-md');
    btn.classList.add('bg-slate-50', 'text-slate-600', 'border-slate-200');
  });

  // Find selected button to format active state
  const targetBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(category));
  if (targetBtn) {
    targetBtn.classList.remove('bg-slate-50', 'text-slate-600', 'border-slate-200');
    targetBtn.classList.add('active', 'bg-brand-500', 'text-white', 'border-brand-500', 'shadow-md');
  }

  // Filter cards
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.classList.remove('hidden');
      card.style.opacity = '1';
    } else {
      card.classList.add('hidden');
      card.style.opacity = '0';
    }
  });
};

// ------------------------------------------
// 5. Interactive University Comparison Engine
// ------------------------------------------
window.updateComparison = function () {
  const amityChecked = document.getElementById('chk-amity').checked;
  const lpuChecked = document.getElementById('chk-lpu').checked;
  const manipalChecked = document.getElementById('chk-manipal').checked;
  const chandigarhChecked = document.getElementById('chk-chandigarh').checked;

  // Select columns
  toggleCol('col-h-amity', 'col-app-amity', 'col-naac-amity', 'col-fee-amity', 'col-sal-amity', 'col-corp-amity', 'col-sup-amity', amityChecked);
  toggleCol('col-h-lpu', 'col-app-lpu', 'col-naac-lpu', 'col-fee-lpu', 'col-sal-lpu', 'col-corp-lpu', 'col-sup-lpu', lpuChecked);
  toggleCol('col-h-manipal', 'col-app-manipal', 'col-naac-manipal', 'col-fee-manipal', 'col-sal-manipal', 'col-corp-manipal', 'col-sup-manipal', manipalChecked);
  toggleCol('col-h-chandigarh', 'col-app-chandigarh', 'col-naac-chandigarh', 'col-fee-chandigarh', 'col-sal-chandigarh', 'col-corp-chandigarh', 'col-sup-chandigarh', chandigarhChecked);
};

function toggleCol(...args) {
  const isVisible = args.pop();
  args.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (isVisible) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });
}

// Toggle comparison checkbox from card click
window.toggleCompare = function (courseId) {
  const checkbox = document.getElementById('compare-' + courseId);
  if (!checkbox) return;
  checkbox.checked = !checkbox.checked;

  const text = checkbox.checked ? "Added to course comparison!" : "Removed from course comparison.";

  // Simple custom visual notification toast
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 glass-dark text-white text-xs font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce';
  toast.innerHTML = `<i class="fa-solid fa-circle-info text-brand-400"></i> <span>${text}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() => toast.remove(), 500);
  }, 2500);
};

// ------------------------------------------
// 6. FAQ Accordion Mechanics
// ------------------------------------------
window.toggleAccordion = function (index) {
  const contents = document.querySelectorAll('.faq-content');
  const arrows = document.querySelectorAll('[id^="faq-arrow-"]');
  const currentArrow = document.getElementById('faq-arrow-' + index);

  contents.forEach((el, idx) => {
    if (idx === index) {
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        if (currentArrow) currentArrow.style.transform = 'rotate(180deg)';
      } else {
        el.classList.add('hidden');
        if (currentArrow) currentArrow.style.transform = 'rotate(0deg)';
      }
    } else {
      el.classList.add('hidden');
      const otherArrow = document.getElementById('faq-arrow-' + idx);
      if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
    }
  });
};

// ------------------------------------------
// 7. Global Popular Search Auto-Fill Helper
// ------------------------------------------
window.fillHeroSearch = function (text) {
  const searchInput = document.getElementById('hero-search');
  if (!searchInput) return;
  searchInput.value = text;
  // Dispatch keyup event to trigger autocomplete dropdown Suggestions
  const event = new Event('keyup');
  searchInput.dispatchEvent(event);
  searchInput.focus();
};

// ------------------------------------------
// 8. Premium Interactive Sidebar Tab Switcher
// ------------------------------------------
window.switchCourseTab = function (categoryId) {
  const container = document.getElementById('course-navigator-grid');
  if (!container) return;

  const data = (window.EduSolverData && window.EduSolverData.courseCategories) || {};
  const category = data[categoryId];
  if (!category) return;

  // 1. Update active styling on sidebar buttons
  const buttons = document.querySelectorAll('.course-sidebar-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeBtn = document.getElementById('tab-btn-' + categoryId);
  if (activeBtn) activeBtn.classList.add('active');

  // 2. Clear grid and dynamically inject premium program cards
  container.innerHTML = '';
  
  category.courses.forEach((course, idx) => {
    const colEl = document.createElement('div');
    colEl.className = 'h-full';
    // Inline style delay creates an elegant staggered waterfall slide-up effect
    colEl.style.animationDelay = `${idx * 0.06}s`;
    colEl.innerHTML = `
      <div class="course-program-card bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm flex flex-col justify-between h-full animate-slide-up-fade">
        <div>
          <div class="flex justify-between items-center mb-5">
            <span class="bg-brand-50 border border-brand-100 text-brand-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              ⚡ ${course.tag}
            </span>
          </div>

          <div class="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100/90 flex items-center justify-center mb-5 text-[#12b809] text-xl shadow-sm">
            <i class="${course.icon}"></i>
          </div>

          <h3 class="text-[17px] font-extrabold text-slate-900 mb-1.5 leading-snug">
            ${course.name}
          </h3>
          <p class="text-xs text-slate-400 font-bold mb-6">
            ${course.desc}
          </p>
        </div>

        <a href="#contact" class="block text-center bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg">
          Explore Program
        </a>
      </div>
    `;
    container.appendChild(colEl);
  });

  // 3. Render premium "View All Programs" card at the end
  const viewAllCol = document.createElement('div');
  viewAllCol.className = 'h-full';
  viewAllCol.style.animationDelay = `${category.courses.length * 0.06}s`;
  viewAllCol.innerHTML = `
    <a href="#trending-courses" class="view-all-dotted-card rounded-[28px] p-6 flex flex-col items-center justify-center text-center h-full group cursor-pointer animate-slide-up-fade min-h-[280px]">
      <div class="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 text-sm mb-4 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300">
        <i class="fa-solid fa-arrow-right text-[#12b809] text-base"></i>
      </div>
      <h4 class="text-sm font-extrabold text-slate-900 group-hover:text-brand-500 transition-colors">
        View All Programs
      </h4>
      <p class="text-[11px] text-slate-400 font-bold mt-1">
        See complete list of courses
      </p>
    </a>
  `;
  container.appendChild(viewAllCol);
};

// Initialize Premium Sidebar Navigator to show Graduation courses first
// Initialize Premium Sidebar Navigator to show Graduation courses first
if (typeof switchCourseTab === 'function') {
  switchCourseTab('graduation');
}

// ------------------------------------------
// 9. AI Quiz Matcher Controller (3-Step wizard)
// ------------------------------------------
window.EduSolverQuiz = {
  step: 1,
  answers: {
    degree: null,
    budget: null,
    priority: null
  }
};

window.selectQuizOption = function (stepNumber, value, cardElement) {
  // Store chosen value
  if (stepNumber === 1) window.EduSolverQuiz.answers.degree = value;
  if (stepNumber === 2) window.EduSolverQuiz.answers.budget = value;
  if (stepNumber === 3) window.EduSolverQuiz.answers.priority = value;

  // Visual selection updates
  const parent = cardElement.parentElement;
  if (parent) {
    const cards = parent.querySelectorAll('.quiz-option-card');
    cards.forEach(card => card.classList.remove('selected'));
  }
  cardElement.classList.add('selected');

  // Enable Next button for this step
  const nextBtn = document.getElementById(`quiz-next-${stepNumber}`);
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    nextBtn.classList.add('hover:bg-brand-600', 'shadow-lg');
  }
};

window.nextQuizStep = function (currentStep) {
  const currentBlock = document.getElementById(`quiz-step-${currentStep}`);
  const nextBlock = document.getElementById(`quiz-step-${currentStep + 1}`);

  if (currentBlock && nextBlock) {
    currentBlock.classList.add('hidden');
    nextBlock.classList.remove('hidden');
    
    // Update stepper visual timeline progress line
    const progressNode = document.getElementById(`quiz-line-${currentStep}`);
    if (progressNode) {
      progressNode.classList.add('step-connector-active');
    }
    const nextDot = document.getElementById(`quiz-dot-${currentStep + 1}`);
    if (nextDot) {
      nextDot.classList.add('timeline-glow-active', 'text-white');
      nextDot.classList.remove('bg-white', 'text-slate-400');
    }
  }
};

window.prevQuizStep = function (currentStep) {
  const currentBlock = document.getElementById(`quiz-step-${currentStep}`);
  const prevBlock = document.getElementById(`quiz-step-${currentStep - 1}`);

  if (currentBlock && prevBlock) {
    currentBlock.classList.add('hidden');
    prevBlock.classList.remove('hidden');

    // Revert visual timeline progress
    const progressNode = document.getElementById(`quiz-line-${currentStep - 1}`);
    if (progressNode) {
      progressNode.classList.remove('step-connector-active');
    }
    const currentDot = document.getElementById(`quiz-dot-${currentStep}`);
    if (currentDot) {
      currentDot.classList.remove('timeline-glow-active', 'text-white');
      currentDot.classList.add('bg-white', 'text-slate-400');
    }
  }
};

window.submitQuiz = function () {
  const answers = window.EduSolverQuiz.answers;
  const resultsContainer = document.getElementById('quiz-results-container');
  const resultsBody = document.getElementById('quiz-results-body');
  const wizardBody = document.getElementById('quiz-wizard-body');

  if (!answers.degree || !answers.budget || !answers.priority) {
    alert("Please answer all questions to find your perfect matched university.");
    return;
  }

  // Matching Decision Matrix
  let matches = [];

  if (answers.degree === 'UG') {
    if (answers.budget === 'low') {
      matches = [
        { name: "Lovely Professional University (LPU) Online", naac: "A+", fee: "₹24,000 /Sem", rating: "4.8/5", fit: "96%", badge: "AFFORDABLE CHOICE" },
        { name: "Chandigarh University Online", naac: "A+", fee: "₹28,000 /Sem", rating: "4.7/5", fit: "91%", badge: "POPULAR VALUE" }
      ];
    } else {
      matches = [
        { name: "Amity University Online", naac: "A++", fee: "₹35,000 /Sem", rating: "4.9/5", fit: "98%", badge: "BEST FIT" },
        { name: "Sikkim Manipal University Online", naac: "A+", fee: "₹40,000 /Sem", rating: "4.9/5", fit: "93%", badge: "PREMIUM SECTOR" }
      ];
    }
  } else if (answers.degree === 'PG') {
    if (answers.budget === 'low') {
      matches = [
        { name: "Lovely Professional University (LPU) Online", naac: "A+", fee: "₹29,000 /Sem", rating: "4.8/5", fit: "95%", badge: "HIGH PLACEMENT ROI" },
        { name: "Chandigarh University Online", naac: "A+", fee: "₹32,000 /Sem", rating: "4.7/5", fit: "90%", badge: "BUDGET CHOICE" }
      ];
    } else {
      matches = [
        { name: "Amity University Online", naac: "A++", fee: "₹42,000 /Sem", rating: "4.9/5", fit: "99%", badge: "PREMIUM BRAND RECOMMENDATION" },
        { name: "Sikkim Manipal University Online", naac: "A+", fee: "₹45,000 /Sem", rating: "4.9/5", fit: "95%", badge: "HIGH CORPORATE ACCEPTANCE" }
      ];
    }
  } else {
    // Diploma & Skills
    matches = [
      { name: "EduSolver Skill Academy (Full Stack Dev)", naac: "Govt Approved", fee: "₹18,000 /Sem", rating: "4.9/5", fit: "97%", badge: "100% PLACEMENT ACCELERATOR" },
      { name: "Amity Online (Specialized PG Diploma)", naac: "A++", fee: "₹28,000 /Sem", rating: "4.8/5", fit: "92%", badge: "EXECUTIVE BRAND" }
    ];
  }

  // Render results
  if (resultsBody && resultsContainer && wizardBody) {
    resultsBody.innerHTML = '';
    
    matches.forEach(m => {
      const card = document.createElement('div');
      card.className = 'bg-[#fcfdfc] border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-brand-200 transition-all duration-300';
      card.innerHTML = `
        <div>
          <div class="flex justify-between items-center mb-4">
            <span class="bg-brand-50 border border-brand-100 text-brand-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              ⚡ ${m.badge}
            </span>
            <span class="text-xs text-brand-600 font-extrabold">${m.fit} Fit Score</span>
          </div>
          <h4 class="text-base font-black text-slate-900 mb-2">${m.name}</h4>
          <div class="grid grid-cols-2 gap-4 py-3 border-t border-b border-slate-100/60 my-4 text-xs font-semibold">
            <div>
              <span class="text-[9px] text-slate-400 block font-bold uppercase">Accreditation</span>
              <span class="text-slate-800 font-extrabold">${m.naac} Rating</span>
            </div>
            <div>
              <span class="text-[9px] text-slate-400 block font-bold uppercase">Est. Fee Scale</span>
              <span class="text-brand-600 font-black">${m.fee}</span>
            </div>
          </div>
        </div>
        <div class="flex gap-2.5 pt-2">
          <a href="#comparison-tool" onclick="closeQuizModal()" class="w-1/2 text-center border border-brand-500 hover:bg-brand-50 text-brand-600 font-extrabold text-[11px] py-3 rounded-xl transition-all">Compare Fees</a>
          <a href="#contact" onclick="closeQuizModal()" class="w-1/2 text-center bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-[11px] py-3 rounded-xl transition-all shadow-md">Enquire Now</a>
        </div>
      `;
      resultsBody.appendChild(card);
    });

    wizardBody.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
  }
};

window.resetQuiz = function () {
  const answers = window.EduSolverQuiz.answers;
  answers.degree = null;
  answers.budget = null;
  answers.priority = null;

  // Revert layout
  for (let i = 1; i <= 3; i++) {
    const block = document.getElementById(`quiz-step-${i}`);
    if (block) {
      if (i === 1) block.classList.remove('hidden');
      else block.classList.add('hidden');
    }
    const nextBtn = document.getElementById(`quiz-next-${i}`);
    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
      nextBtn.classList.remove('hover:bg-brand-600', 'shadow-lg');
    }
    const dot = document.getElementById(`quiz-dot-${i}`);
    if (dot) {
      if (i === 1) {
        dot.className = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-brand-500 text-white timeline-glow-active";
      } else {
        dot.className = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-white text-slate-400 border-2 border-slate-200";
      }
    }
    const line = document.getElementById(`quiz-line-${i}`);
    if (line) {
      line.classList.remove('step-connector-active');
    }
  }

  // Clear selections
  const cards = document.querySelectorAll('.quiz-option-card');
  cards.forEach(card => card.classList.remove('selected'));

  const resultsContainer = document.getElementById('quiz-results-container');
  const wizardBody = document.getElementById('quiz-wizard-body');
  if (resultsContainer && wizardBody) {
    resultsContainer.classList.add('hidden');
    wizardBody.classList.remove('hidden');
  }
};

window.closeQuizModal = function () {
  // Soft scroll to contact section
  const contact = document.getElementById('contact');
  if (contact) {
    contact.scrollIntoView({ behavior: 'smooth' });
  }
};

