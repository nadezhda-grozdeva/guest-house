import { ref, onMounted } from 'vue'

export function useIntersectionObserver() {
    const target = ref();
    const animate = ref(false);
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

    return {
        animate,
        target
    }
}