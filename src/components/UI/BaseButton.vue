<template>
    <button>
        <slot name="base-button" type="button">Виж повече</slot>
    </button>
</template>

<style scoped lang="scss">
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.button {
    border: 2px solid #010101;
    background: rgba(255,255,255, 0.65);
    font: 1.8rem $font-family-text;
    color: #010101;
    padding: 1rem;
    text-transform: uppercase;
    
    @include responsive(phone) {
        font-size: 1.5rem;
    }

    &:hover,
    &:active {
        // text-shadow: 1px 1px 1px rgba(1, 1, 1, 0.6);
        box-shadow: 0px 1px 15px 2px rgba(1, 1, 1, 0.3);
    }
}

</style>