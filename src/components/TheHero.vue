<template>
    <div class="wrapper">
        <img class="wrapper-img" src="../assets/images/hero/hero-img-3.jpg" alt="Borumovata kushta" />
        <div class="wrapper-text">
            <Transition>
                <h1>Борумовата къща</h1>
            </Transition>
        </div>
    </div>
</template>

<script>
</script>

<style scoped lang="scss">
@import '../assets/styles/mixins';

.wrapper {
    position: relative;
    z-index: 2;

    &-img {
        position: relative;
        filter: blur(5px);
        -webkit-filter: blur(5px);
        width: 100%;
        height: 90vh;
    }

    .wrapper-text {
        display: block;
        width: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left:0;
        right: 0;
        bottom:0;
        max-width: 100%;
        max-height: 100%;

        h1 {
            // font-family: $font-family-heading;
            color: #fff;
            text-shadow: 4px 4px 3px rgba(1, 1, 1, 0.86);
            text-transform: uppercase;
            text-align: center;
            letter-spacing: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 3px solid #010101;
            background-color: rgba(255,255,255, 0.65);
            padding: 3rem 1rem;

            @media only screen and (min-width: 768px){
                font-size: 4.5rem;
                width: 80%;
            }

            @media only screen and (min-width: 600px) and (max-width: 768px) {
                font-size: 2.8rem;
            }

            @include responsive(landscape-tablets) {
                width: 90%;
            }

            @include responsive(phone) {
                font-size: 2rem;
            }

            span {
                display: block;
            }
        }
    }
}

.v-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}
.v-enter-active {
    transition: all 5s ease-out
}
.v-enter-to {
    opacity: 1;
    transform: translateY(0);
}

</style>