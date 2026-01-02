        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Lógica mejorada del carrusel de equipo
        function scrollTeam(direction) {
            const container = document.getElementById('team-slider');
            const card = container.querySelector('div');
            
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = 24; // gap-6 es 1.5rem = 24px
                const scrollAmount = cardWidth + gap;
                
                if (direction === 'left') {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }

        function handleSubmit(event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value;
            const telefonoCliente = document.getElementById('telefono').value;
            const numeroDestino = "51989783434"; 

            let texto = `Hola, mi nombre es *${nombre}*.\n`;
            texto += `Estoy interesado en: *${servicio}*.\n`;
            if (telefonoCliente) texto += `Mi número de contacto es: ${telefonoCliente}\n`;
            if (mensaje) texto += `Mensaje adicional: ${mensaje}`;

            const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank');
        }

        function closeModal() {
            document.getElementById('successModal').classList.add('hidden');
        }

        function openModal(title, description, iconClass) {
            const modal = document.getElementById('serviceModal');
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalDescription').innerText = description;
            const iconElement = document.getElementById('modalIcon');
            iconElement.className = iconClass;
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }

        function closeServiceModal() {
            const modal = document.getElementById('serviceModal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }

        function goToContact() {
            closeServiceModal();
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        const heroSlides = [
            {
                img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                subtitle: "Salud Mental & Bienestar",
                title: "Recupera tu equilibrio, <br><span class='text-brand-600'>reencuéntrate contigo.</span>",
                desc: "Un espacio seguro diseñado para tu crecimiento personal y sanación emocional. Terapia profesional adaptada a tus necesidades."
            },
            {
                img: "img/image11.png",
                subtitle: "Terapia Infantil",
                title: "Ayudándolos a crecer <br><span class='text-brand-600'>felices y seguros.</span>",
                desc: "Apoyo especializado para el manejo de emociones, conducta y desarrollo en niños y adolescentes."
            },
            {
                img: "img/image12.png",
                subtitle: "Terapia de Pareja",
                title: "Construyan juntos <br><span class='text-brand-600'>una relación sólida.</span>",
                desc: "Mejoren la comunicación y fortalezcan el vínculo afectivo con acompañamiento profesional."
            }
        ];

        let currentHeroSlide = 0;
        const bgElement = document.getElementById('hero-bg');
        const contentElement = document.getElementById('hero-content');
        const elSubtitle = document.getElementById('hero-subtitle');
        const elTitle = document.getElementById('hero-title');
        const elDesc = document.getElementById('hero-desc');

        function setSlide(index) {
            currentHeroSlide = index;
            updateCarousel();
        }

        function nextHeroSlide() {
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            updateCarousel();
        }

        function updateCarousel() {
            const slide = heroSlides[currentHeroSlide];
            contentElement.style.opacity = '0';
            contentElement.style.transform = 'translateY(10px)';

            setTimeout(() => {
                bgElement.style.backgroundImage = `url('${slide.img}')`;
                elSubtitle.textContent = slide.subtitle;
                elTitle.innerHTML = slide.title;
                elDesc.textContent = slide.desc;

                document.querySelectorAll('[id^="dot-"]').forEach((dot, idx) => {
                    if(idx === currentHeroSlide) {
                        dot.classList.remove('bg-gray-300');
                        dot.classList.add('bg-brand-600');
                    } else {
                        dot.classList.remove('bg-brand-600');
                        dot.classList.add('bg-gray-300');
                    }
                });

                contentElement.style.opacity = '1';
                contentElement.style.transform = 'translateY(0)';
            }, 500);
        }

        setInterval(nextHeroSlide, 5000);

        window.onclick = function(event) {
            const successModal = document.getElementById('successModal');
            if (event.target == successModal.querySelector('.bg-opacity-75')) {
                closeModal();
            }
        }

        // --- SCROLL SPY LOGIC ---
        function initScrollSpy() {

            document.getElementById('copyright-year').textContent = new Date().getFullYear();

            const sections = document.querySelectorAll("section");
            const navLinks = document.querySelectorAll(".nav-link");
            const mobileLinks = document.querySelectorAll(".mobile-link");

            window.addEventListener('scroll', () => {
                let current = "";
                const scrollPosition = window.scrollY + 150; // Offset for navbar height

                sections.forEach((section) => {
                    // Check if scroll is within section
                    if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                        current = section.getAttribute("id");
                    }
                });

                // Desktop Links
                navLinks.forEach((link) => {
                    link.classList.remove("active"); 
                    link.classList.remove("border-[#702F8A]", "text-[#702F8A]"); // Remove specific color classes
                    link.classList.add("border-transparent", "text-gray-600");   // Reset to default

                    if (link.getAttribute("href").includes(current) && current !== "") {
                        link.classList.add("active");
                        // Apply specific highlight styles via Tailwind/CSS
                        link.classList.remove("border-transparent", "text-gray-600");
                        link.classList.add("border-[#702F8A]", "text-[#702F8A]");
                    }
                });
                
                 // Mobile Links (Color text only)
                 mobileLinks.forEach((link) => {
                     link.classList.remove("text-[#702F8A]", "bg-brand-50");
                     link.classList.add("text-gray-700");
                     
                     if (link.getAttribute("href").includes(current) && current !== "") {
                         link.classList.remove("text-gray-700");
                         link.classList.add("text-[#702F8A]", "bg-brand-50");
                     }
                 });
            });
        }