document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------
    // 1. Theme Toggle (Dark/Light Mode)
    // -------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone Sol (para mudar para Light)
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone Lua (para mudar para Dark)
        }
    }

    // Carrega o tema salvo, padrão é "light"
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // -------------------------------------------------
    // 2. Animação das Barras de Progresso e Skill Items
    // -------------------------------------------------
    const skillItems = document.querySelectorAll('.skill-item');

    const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const progressBar = item.querySelector('.skill-progress');
                
                // Pega a porcentagem do atributo style (que será substituída)
                const widthValue = progressBar.style.width; 
                
                // Reseta a largura para 0 antes da animação
                progressBar.style.width = '0%'; 

                // Aplica a largura real com um pequeno delay para iniciar a animação CSS
                setTimeout(() => {
                    progressBar.style.width = widthValue;
                }, 100);

                // Animação de fade-in do item
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
                
                observer.unobserve(item);
            }
        });
    }, skillObserverOptions);

    // Inicia a observação dos elementos e aplica um delay em cascata
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 80}ms`; // Animação mais suave em cascata
        skillObserver.observe(item);
    });
    
    // -------------------------------------------------
    // 3. Interatividade: Expandir Detalhes da Carreira
    // -------------------------------------------------
    const careerItems = document.querySelectorAll('.career-item');

    careerItems.forEach(item => {
        item.addEventListener('click', () => {
            // Alterna a classe 'expanded' no item clicado
            const isExpanded = item.classList.contains('expanded');
            
            // Opcional: Fechar todos os outros itens
            careerItems.forEach(otherItem => {
                otherItem.classList.remove('expanded');
            });

            // Se o item não estava expandido, expanda-o agora
            if (!isExpanded) {
                item.classList.add('expanded');
            }
            
            // Rola suavemente para o item expandido
            setTimeout(() => {
                item.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400); // Espera a animação de expansão começar
        });
    });

});