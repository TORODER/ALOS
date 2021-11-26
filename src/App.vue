<template>
<div class="center">
    <div class="login">
        <div class="head"></div>

        <div class="testCss">
            <div class="textLogin">用户登录</div>
            <hr>
            <div class="englishLogin">User Login</div>  
        </div>

        <div class="context">
            <span>账户：</span><input type="text">
            <br>
            <span>密码：</span><input type="text">
        </div>

        <div class="buttonClass">
            <div class="buttonTextClass">登录</div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';

</script>

<style>

.center{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(59,169,146);
}
.login{
    width: 300px;
    height: 500px;
}
.head{
    margin: 0 auto;
    padding: 0;
    width: 70px;
    height: 70px;
    border:2px solid;
    border-radius:25px;
    margin-bottom: 20px;
}
.context{
    margin: 20px;
}
input{
    margin: auto;
    width: 200px;
    height: 30px;
    border-radius: 10px;
}
.textLogin{
    letter-spacing: 3px;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    color: #fff;
}
.englishLogin{
    letter-spacing: 3px;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    color: #fff;
}
.textCss{
    margin-top: 20px;
}
.buttonClass{
    background-color: rgb(51,140,118);
    width: 120px;
    height: 50px;
    display: flex;
    font-size: 30px;
    margin: 0 auto;
    border-radius: 20px;
}
.buttonTextClass{
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 30px;
    color: #fff;
}
</style>