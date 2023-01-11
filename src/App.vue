<script setup>
import { initCustomFormatter, ref } from 'vue';


import {useImageStore} from "./stores/ImageStore"
import { onMounted } from 'vue';
const ImageStore  = useImageStore();
const disabled =ref(false);
const state = ref("Images will show here")


async function search(){
    disabled.value = true;
    ImageStore.data = null;
    state.value = "Loading ..."
    try{
        await ImageStore.getImage(prompt.value); 
        disabled.value = false;
    }
    catch(err){
        console.log(err);
    }
}

var prompt = ref();

</script>

<template>
    <div class="container">
        <main>
            <h1>OpenAI Image generation - Vuejs</h1>
            <LoadingIndicator v-if="disabled" />
                <div class="imgs-container" v-if="ImageStore.data">
                   <transition-group appear name="list" >
                        <img v-for="img in ImageStore.data " :key="img.url" :src="img.url" alt="" class="image">
                   </transition-group>
                </div>
                <div class="div-loading" v-else>
                    <p>{{state}}</p>
                </div>
        </main>
        <footer>
            <div class="results-input" ref="promptElement">
                <input
                    type="text"
                    placeholder="Give a detail description of your image!"
                    v-model="prompt"
                    :disabled="disabled"
                    autofocus
                    @keyup.enter="search()"
                />
                <button @click="search()">Send</button>
            </div>
            <p style="top: 20px">👨🏽‍💻: Jaykef(苏杰) - Jaward Sesay</p>
        </footer>
    </div>
</template>

<style scoped>
.list-enter-from{
    opacity: 0;
    transform: scale(0.6);
  }
  
  .list-enter-to{
    opacity: 1;
    transform: scale(1);
  }
  
  .list-enter-active{
    transition: all 0.4s ease;
  }
  .list-leave-from{
    opacity: 1;
    transform: scale(1);
  }
  
  .list-leave-to{
    opacity: 0;
    transform: scale(1);
  }
  
  .list-leave-active{
   /* position: absolute;*/
    transition: all 0.4s ease;
    position: absolute;
  }
  .list-move{
    transition: all 0.3s ease;
  }
h1{
    font-size: 3rem;
    padding-top: 20px;
    padding-bottom: 30px;
    font-weight: 700;
    background: -webkit-linear-gradient(86deg,#ff4e4e, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
p{
    font-size: 18px;
    font-weight: 500;
}
.imgs-container {
    width: 80%;
    background: #ffffff26;
    border-radius: 20px;
    left: 10%;
    bottom: 15px;
    overflow-x: hidden;
    display:  grid;
    justify-content: space-around;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    gap: 0px;
    height: 70vh;
    padding: 30px 0px 30px 0px;
}
.div-loading{
    width: 80%;
    background: #ffffff26;
    border-radius: 20px;
    left: 10%;
    bottom: 15px;
    overflow-x: hidden;
    display:  grid;
    justify-content: space-around;
    justify-items: center;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    gap: 20px;
    height: 70vh;
}
.div-loading{
    display: grid;
    align-items: center;
}
.img{
    width: 800px;
    border-radius: 15px;
}

.img img{
    width: 100%;
}
.image {
    border-radius: 20px;
}
footer{
    width: 80%;
    margin: auto;
    bottom: -20px;
    height: 30vh;
}
.container{
    text-align: center;
    background-image: linear-gradient(60deg,  #d76712 0%, #c74f4f 100%)
}
.message {
    list-style: none;
    padding: 0;
    margin: 0;
    color: rgb(210, 219, 231, 0.8);
}
.message li {
    margin: 0;
    padding: 1rem var(--container-padding-horizontal);
}
.message li:nth-child(even) {
    background: #222;
}

.results-input {
    display: grid;
    grid-direction: column;
    grid-template-columns: 1fr auto;
    gap: 0;
    margin: 1rem var(--container-padding-horizontal);
    padding: -20px;
    background-color:  #d76712 ;
}

.results-input input,
.results-input button {
    padding: 1em 1.2em;
    border-radius: 0.3em;
    border: 0;
}
.results-input input {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}
.results-input button {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

@media (prefers-color-scheme: dark) {
    body {
        background: #111;
        color: rgb(174, 201, 201);
    }
    button,
    input {
        background: rgb(255, 255, 255);
        color: rgb(0, 0, 0);
        border-color: #222;
        outline: #222;
        font-size:  18px;
    }
}
</style>
