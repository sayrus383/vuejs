<template>
    <div class="big-banner">
        <div class="wrap">
            <div class="big-banner__block">
                <div class="big-banner__inner">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'big-banner'
    }
</script>
<style lang="less" scoped>

    .big-banner {
        margin-bottom: 120px;
        &__inner {
            max-width: 100%;
            height: 120px;
            background: #333333;
        }
        &__block {
            margin-bottom: 30px;
        }
    }

    @media print {
        .big-banner {
            display: none;
        }
    }
</style>

