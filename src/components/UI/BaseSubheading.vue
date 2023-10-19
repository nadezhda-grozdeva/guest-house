<template>
    <h2>
        <slot name="subheading">Default subtitle</slot>
    </h2>
</template>

<style scoped lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

h2 {
    @include subheading-styles;
    margin: 2rem 0 4rem;
    color: $base-text-color;
    position: relative;
    text-shadow: 1px 5px 5px rgba(1, 1, 1, 0.6);

    @include responsive(portrait-tablets) {
        font-size: 2.5rem;
    }

    @media only screen and (max-width: 400px) {
        font-size: 1.5rem;
        padding: 0 1rem;
    }
    
    @media only screen and (min-width: 768px) {
        font-size: 3.5rem;
    }

    @media only screen and (min-width: 768px) {
        &:after {
            display: block;
            content: '';
            width: 30%;
            height: 5px;
            background: #181818;
            opacity: .5;
            position: absolute;
            bottom: -1rem;
            left: 50%;
            transform: translate(-50%);
        }
    }


}

</style>