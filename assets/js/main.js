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
            icon = '<i class="fa-solid fa-university text-indigo-500 mr-3 shrink-0"></i>';
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
  const totalTestimonials = 2;

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
        dot.classList.add('bg-brand-500');
        dot.classList.remove('bg-slate-300');
      } else {
        dot.classList.add('bg-slate-300');
        dot.classList.remove('bg-brand-500');
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
    let testimonialAutoplay = setInterval(nextTestimonial, 6000);

    // Pause autoplay on mouse enter
    const sliderBox = sliderContainer.parentElement;
    if (sliderBox) {
      sliderBox.addEventListener('mouseenter', () => clearInterval(testimonialAutoplay));
      sliderBox.addEventListener('mouseleave', () => testimonialAutoplay = setInterval(nextTestimonial, 6000));
    }
  }

  // ------------------------------------------
  // 3. Numeric Count-up Animation (Stats)
  // ------------------------------------------
  function animateCounters() {
    const statsList = [
      { id: "counter-students", suffix: "+" },
      { id: "counter-universities", suffix: "+" },
      { id: "counter-success", suffix: "%" },
      { id: "counter-partners", suffix: "+" }
    ];

    statsList.forEach(stat => {
      const el = document.getElementById(stat.id);
      if (!el) return;

      const targetValue = parseInt(el.getAttribute('data-target'));
      const duration = 2000; // 2 seconds animation
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
