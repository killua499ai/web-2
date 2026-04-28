document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    

const introSection = document.getElementById("climate-intro");
const closeIntro = document.getElementById("closeIntro");

document.querySelector('a[href="#climate-intro"]').addEventListener("click", (e) => {
    e.preventDefault();
    introSection.classList.remove("hidden");
});

closeIntro.addEventListener("click", () => {
    introSection.classList.add("hidden");
});



    
    
    // 1. Interactive Calculator Logic
    const transportSelect = document.getElementById('calc-transport');
    const calcResult = document.getElementById('calc-result');

    if (transportSelect) {
        transportSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            let start = 0;
            const end = parseFloat(val);
            const duration = 500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentVal = (progress * (end - start) + start).toFixed(1);
                calcResult.innerHTML = `${currentVal}<span class="text-lg ml-2"> Tons</span>`;
                if (progress < 1) requestAnimationFrame(updateCounter);
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // 2. Navigation Highlighting & Nav Background
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        let current = "";

        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        if (window.scrollY > 100) {
            nav.classList.add('py-2');
        } else {
            nav.classList.remove('py-2');
        }
    });

    // 3. Observer for Fade-up Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 4. Quiz with 10 items
    const quizData = [
        {
            q: "Since what period have human activities been the main driver of climate change?",
            opts: ["Since the 1500s", "Since the 1800s", "Since 2000", "Since 2020"],
            answer: 1
        },
        {
            q: "Which country is highlighted as highly vulnerable to climate change on this page?",
            opts: ["Japan", "Australia", "The Philippines", "Canada"],
            answer: 2
        },
        {
            q: "What is the main gas released by burning fossil fuels?",
            opts: ["Hydrogen", "Carbon dioxide", "Helium", "Nitrogen"],
            answer: 1
        },
        {
            q: "Which activity is said to contribute 7% of subtropical deforestation?",
            opts: ["Fishing", "Mining", "Tourism", "Transportation"],
            answer: 1
        },
        {
            q: "What gas can be released during mining from coal seams?",
            opts: ["Methane", "Oxygen", "Neon", "Steam"],
            answer: 0
        },
        {
            q: "Which of these is a renewable energy source?",
            opts: ["Coal", "Diesel", "Solar", "Gasoline"],
            answer: 2
        },
        {
            q: "Why are trees important in climate mitigation?",
            opts: ["They produce plastic", "They absorb CO2", "They create methane", "They increase mining"],
            answer: 1
        },
        {
            q: "What do CFC gases damage?",
            opts: ["The ozone layer", "Roads", "Mountains", "Solar panels"],
            answer: 0
        },
        {
            q: "What is a benefit of methane capture?",
            opts: ["It increases smoke", "It prevents methane from escaping", "It destroys forests", "It creates oil"],
            answer: 1
        },
        {
            q: "Which is an example of a nature-based solution?",
            opts: ["Mangrove restoration", "Burning coal", "Oil drilling", "Plastic dumping"],
            answer: 0
        }
    ];

    let quizAnswered = new Array(quizData.length).fill(null);
    const quizContainer = document.getElementById('quiz-container');

    function buildQuiz() {
        if (!quizContainer) return;

        quizContainer.innerHTML = "";

        quizData.forEach((q, qi) => {
            const div = document.createElement('div');
            div.className = 'bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm fade-up';

            div.innerHTML = `
                <div class="flex gap-4 mb-6">
                    <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm italic">${qi + 1}</span>
                    <p class="font-bold text-slate-800 text-lg">${q.q}</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="q${qi}-opts"></div>
            `;

            quizContainer.appendChild(div);

            const optionsContainer = div.querySelector(`#q${qi}-opts`);

            q.opts.forEach((o, oi) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-opt text-left px-6 py-4 rounded-2xl font-semibold text-slate-500 border-2 border-slate-50';
                btn.textContent = o;

                btn.addEventListener('click', () => {
                    if (quizAnswered[qi] !== null) return;

                    quizAnswered[qi] = oi;
                    const btns = optionsContainer.querySelectorAll('button');

                    btns.forEach((b, i) => {
                        b.disabled = true;
                        if (i === q.answer) {
                            b.classList.add('correct');
                        } else if (i === oi) {
                            b.classList.add('wrong');
                        }
                    });

                    if (quizAnswered.every(a => a !== null)) {
                        showResults();
                    }
                });

                optionsContainer.appendChild(btn);
            });

            observer.observe(div);
        });
    }

    function showResults() {
        const score = quizAnswered.filter((a, i) => a === quizData[i].answer).length;
        document.getElementById('quiz-score').textContent = `${score} / ${quizData.length}`;
        document.getElementById('quiz-result').classList.remove('hidden');
        document.getElementById('quiz-result').scrollIntoView({ behavior: 'smooth' });
    }

    buildQuiz();

    // 5. Modal Logic for image and video
    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalImg = document.getElementById('modalImg');
    const modalVideoWrapper = document.getElementById('modalVideoWrapper');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoSource = document.getElementById('modalVideoSource');
    const closeModal = document.getElementById('closeModal');

    function openModal({ title, desc, img = '', video = '' }) {
        modalTitle.textContent = title || '';
        modalDesc.textContent = desc || '';

        if (video) {
            modalVideoSource.src = video;
            modalVideo.load();
            modalVideoWrapper.classList.remove('hidden');

            modalImg.classList.add('hidden');
            modalImg.src = '';
        } else if (img) {
            modalImg.src = img;
            modalImg.classList.remove('hidden');

            modalVideo.pause();
            modalVideoSource.src = '';
            modalVideo.load();
            modalVideoWrapper.classList.add('hidden');
        } else {
            modalImg.classList.add('hidden');
            modalImg.src = '';
            modalVideo.pause();
            modalVideoSource.src = '';
            modalVideo.load();
            modalVideoWrapper.classList.add('hidden');
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeModalFunc() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modalVideo.pause();
    }

    // Causes cards -> image modal
    document.querySelectorAll('.info-card').forEach(card => {
        card.addEventListener('click', () => {
            openModal({
                title: card.dataset.title,
                desc: card.dataset.desc,
                img: card.dataset.img
            });
        });
    });

    // Strategy cards -> video modal
    document.querySelectorAll('.strategy-card').forEach(card => {
        card.addEventListener('click', () => {
            openModal({
                title: card.dataset.title,
                desc: card.dataset.desc,
                video: card.dataset.video
            });
        });
    });

    closeModal.addEventListener('click', closeModalFunc);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
});







