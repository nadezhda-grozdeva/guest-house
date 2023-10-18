import { ref, onMounted } from 'vue'

export function useIntersectionObserver() {
    const target = ref();
    const animate = ref(false);

    // FADE IN EFFECT FOR COMPONENTS APPPLY ONLY FOR BIGGER SCREENS
    if(window.screen.width < 768) {
        animate.value = true;
    } else {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) {
                    animate.value = true;
                }
            },
            {
                threshold: 0.5,
            }
        );
        onMounted(() => {
            observer.observe(target.value);
        });
    }

    return {
        animate,
        target
    }
}