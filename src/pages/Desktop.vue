<template>
    <div class="desktop-box">
        <div
            class="background-image"
            :style="{
                'background-image': `url('${backgroundImage}')`
            }"
        ></div>
        <div class="desktop-windows-container"></div>
        <div class="desktop-system-ui-box">
            <div class="taskbar-box">
                <div class="taskbar-content">
                    <div class="task-row">
                        <div class="task">
                            <img src="/public/images/nodejs.png" />
                        </div>
                        <div class="task">
                            <img src="/public/images/vue.png" />
                        </div>
                    </div>
                    <div class="taskbar"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" >import { ref } from 'vue';
import { imagePath } from '../public';

const backgroundImage = ref(`${imagePath}background.jpg`);
</script>

<style scoped lang="scss" >
@import "/src/scss/utils/space.scss";
@import "/src/scss/utils/mixin/center.scss";
@import "/src/scss/utils/mixin/shadow.scss";
@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/background.scss";

$taskbarHeight: 20px;
$taskBarMarginBottom: 10px;

$taskSize: 70px;
$taskMarginBottom: 10px;
.desktop-box {
    & > .background-image {
        @include position-fixed-fill;
        @include desktop-background;
        z-index: 0;
    }
    & > .desktop-windows-container {
        @include position-fixed-fill;
        z-index: 1;
    }
    & > .desktop-system-ui-box {
        @include position-fixed-fill;
        user-select: none;
        z-index: 2;
        & > .taskbar-box {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            .taskbar-content {
                position: relative;
                padding: 0 25px;
                & > .taskbar {
                    @include shadow-less;
                    border-radius: 15px;
                    height: $taskbarHeight;
                    margin-bottom: 10px;
                    border: 1px solid #fff1;
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 0;
                }
                .task-row { 
                    display: flex;
                    & > .task {
                        @include shadow-less;
                        border: 1px solid #fff1;
                        position: relative;
                        width: $taskSize;
                        height: $taskSize;
                        border-radius: 15px;
                        backdrop-filter: blur(10px);
                        margin: 0 10px;
                        padding: 10px;
                        z-index: 1;
                        top: -($taskMarginBottom + $taskBarMarginBottom);
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
            }
        }
    }
}
</style>