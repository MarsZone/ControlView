<template>
  <div class="common-layout">
    <el-row>
      <el-container>
        <div class="connect">
          <el-input v-model="inputValue" placeholder="Key" class="cinput" />
          <el-button round class="cbtn" @click="toConnect">接入</el-button>
        </div>
      </el-container>
    </el-row>

    <div class="bees">
      <div class="bee" v-for="item in beesData">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <el-row>
                <el-col :span="2">
                  <el-icon class="active-check" color="gray">
                    <CircleCheckFilled />
                  </el-icon>
                </el-col>
                <el-col :span="16">
                  <span>{{(item as any).name}}</span>
                </el-col>
                <el-col :span="6">
                  <span>{{(item as any).key}}</span>
                </el-col>
              </el-row>
            </div>
          </template>
          <el-button round @click="checkConnect((item as any).key)">上线检测</el-button>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import { timeStamp } from 'console'
import {
    ElMessage
  } from 'element-plus'
  export default {
    data() {
      return {
        inputValue: "",
        beesData:[
          // {
          //   name:"艾玛希斯",
          //   key:"TwEQ",
          //   status:"2",
          // }
        ]
      }
    },
    methods: {
      toConnect() {
        console.log("connect")
        this.axios.post("/cvConnect", {
          'key': this.inputValue
        }).then(res => {
          console.log(res.data);
          var code = res.data.code
          if (code == '200') {
            this.showSuccess("链接正常")
            this.beesData.push(
              {
                name:"未校验",
                key:""+this.inputValue,
                status:""
              }
            )
          }
          if (code == '400') {
            this.showError(res.data.message)
          }
        })
      },
      checkConnect(key) {
        this.axios.post("/checkConnect",{
          'key':key
        }
        ).then(res => {
          console.log(res.data);
          var code = res.data.code
          if (code == '400') {
            this.showError(res.data.message)
          }
        })
      },
      showSuccess(msg) {
        ElMessage({
          message: msg,
          type: "success"
        })
      },
      showError(msg) {
        ElMessage.error(msg)
      }
    }
  }
</script>

<style lang="less" scoped>
  .bees {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .bee{
      // flex: 1 0 21%; /* explanation below */
      margin: 5px;
      width: 24%;
    }
  }

  .box-card {
    margin: 10px;
  }

  .common-layout {
    width: 100%;
    // height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;
  }

  .connect {
    display: flex;
    flex-direction: column;
    margin-top:100px;
    .cbtn {
      margin: 10px;
    }
  }
</style>