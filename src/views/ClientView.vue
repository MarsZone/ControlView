<template>
    <div class="connect" v-if="isShowConnect">
      <el-input v-model="inputValue" placeholder="接入码" class="cinput"/>
      <el-button round class="cbtn" @click="toConnect">接入</el-button>
    </div>
    <el-button round class="cbtn" @click="checkConnect">查询状态</el-button>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      inputValue:"",
      isShowConnect:true
    }
  },
  methods:{
    toConnect(){
      console.log("connect")
      this.axios.post("/cvConnect",{'key':this.inputValue}
      ).then(res=>{
        console.log(res.data);
        this.showMssage(res.data)
        
      })
    },
    checkConnect(){
      this.axios.get("/checkConnect").then(res=>{
        console.log(res.data);
      })
    },
    showMssage(resposne){
      var code = resposne.code
      if(code=='200'){
          this.showSuccess("链接正常")
          this.isShowConnect=false
        }
        if(code=='400'){
          this.showError(resposne.message)
        }
    },
    showSuccess(msg){
      ElMessage({
        message:msg,
        type:"success"
      })
    },
    showError(msg){
      ElMessage.error(msg)
    }
  }
}
</script>

<style lang="less" scoped>
.connect{
  display: flex;
  flex-direction: column;
  .cbtn{
    margin: 10px;
  }
}
</style>