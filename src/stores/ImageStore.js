import { defineStore } from "pinia";
import { Configuration, OpenAIApi } from "openai";

export const useImageStore=  defineStore('ImageStore',{
    state: () => ({
        Image:null,
        name:"Jaykef",
        data:null
    }),
    actions:{
        async getImage(value){
            const configuration = new Configuration({
                apiKey: import.meta.env.VITE_OpenApiKey,
            });              
            const openai = new OpenAIApi(configuration);
              this.image = await openai.createImage({
                  prompt: value,
                  n: 6,
                  size: "256x256",
              });
              this.data = this.image.data.data;
              console.log(this.data)
        }
    },
    getters:{
    }
})
