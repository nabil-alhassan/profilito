// Main JavaScript file for additional interactivity

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get loading element
    const loading = document.querySelector('.loading');
    const loadingText = document.querySelector('.loading-text');
    
    // Remove loading animation after everything is loaded
    window.addEventListener('load', () => {
        if (loading) {
            // Fade out loading text first
            if (loadingText) {
                loadingText.style.opacity = '0';
                loadingText.style.transform = 'translateY(-20px)';
            }
            
            // Then fade out the entire loading screen
            setTimeout(() => {
                loading.style.opacity = '0';
                loading.style.visibility = 'hidden';
                
                // Remove loading screen from DOM after fade out
                setTimeout(() => {
                    loading.remove();
                }, 500);
            }, 300);
        }
    });

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Scroll animations for sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Hover effect for skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Typing effect for title
    const title = document.querySelector('.title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect when header is in view
        ScrollTrigger.create({
            trigger: 'header',
            start: 'top center',
            onEnter: () => typeWriter()
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: {
                        y: target,
                        offsetY: 50
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Scroll-triggered animations for images
    gsap.utils.toArray('.skill-image, .project-image, .timeline-image').forEach(image => {
        gsap.from(image, {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: image,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Skill progress animations
    document.querySelectorAll('.skill-card li').forEach((skill, index) => {
        const progressBar = skill.querySelector('.skill-progress-bar');
        const percentSpan = skill.querySelector('.skill-percent');
        if (progressBar && percentSpan) {
            const percent = parseInt(progressBar.getAttribute('data-percent'));
            gsap.fromTo(progressBar, {
                width: '0%'
            }, {
                width: percent + '%',
                duration: 1.2,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: skill,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => animateCounter(percentSpan, percent),
                    onLeaveBack: () => animateCounter(percentSpan, 0)
                }
            });
        }
    });

    function animateCounter(element, target) {
        let current = parseInt(element.textContent);
        gsap.to(element, {
            innerText: target,
            duration: 1,
            snap: { innerText: 1 },
            onUpdate: function () {
                element.textContent = Math.round(this.targets()[0].innerText) + '%';
            }
        });
    }

    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.from(item, {
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Contact info hover effects
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Scroll-triggered animations for additional skills
    gsap.utils.toArray('.skill-item').forEach((item, index) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    if (document.querySelector('.engineering-swiper')) {
        new Swiper('.engineering-swiper', {
            loop: true,
            pagination: {
                el: '.engineering-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.engineering-swiper .swiper-button-next',
                prevEl: '.engineering-swiper .swiper-button-prev',
            },
            lazy: {
                loadPrevNext: true,
            },
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
        });
    }

    // سلايدر المحاسبة
    if (document.querySelector('.accountant-swiper')) {
        new Swiper('.accountant-swiper', {
            loop: true,
            pagination: {
                el: '.accountant-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.accountant-swiper .swiper-button-next',
                prevEl: '.accountant-swiper .swiper-button-prev',
            },
            lazy: {
                loadPrevNext: true,
            },
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
        });
    }

    // سلايدر المتاجر الإلكترونية
    if (document.querySelector('.ecommerce-swiper')) {
        const ecommerceSwiper = new Swiper('.ecommerce-swiper', {
            loop: true,
            pagination: {
                el: '.ecommerce-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.ecommerce-swiper .swiper-button-next',
                prevEl: '.ecommerce-swiper .swiper-button-prev',
            },
            lazy: {
                loadPrevNext: true,
            },
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0
        });
    }
}); 