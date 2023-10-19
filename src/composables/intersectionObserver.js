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
            threshold: 0.2,
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