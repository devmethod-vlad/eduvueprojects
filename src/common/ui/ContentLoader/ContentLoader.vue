<template>
    <div class="qst-loader-showbox">
        <div class="qst-loader">
            <svg class="qst-loader-circular" viewBox="25 25 50 50">
                <circle
												class="path"
												cx="50"
												cy="50"
												r="20"
												fill="none"
												stroke-width="2"
												stroke-miterlimit="10"
								/>
            </svg>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

.qst-loader {
    position: relative;
    margin: 0 auto;
    width: 50px;
    &:before {
        content: '';
        display: block;
        padding-top: 100%;
    }
}

.qst-loader-circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}

@keyframes color {
    100%,
    0% {
        stroke: #269999;
    }
    40% {
        stroke: #269999;
    }
    66% {
        stroke: #269999;
    }
    80%,
    90% {
        stroke: #269999;
    }
}

</style>