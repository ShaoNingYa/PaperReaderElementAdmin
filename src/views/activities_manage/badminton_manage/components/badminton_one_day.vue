<template>
  <div v-loading="loading_today" style="font-size: 2vmin">
    <el-tabs type="card" tab-position="up" @tab-click="tab_click">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> 早上</span>
        <el-row>
          <el-col :span="2" style="text-align: center">球场</el-col>
          <el-col :span="7">9：00</el-col>
          <el-col :span="7">10：00</el-col>
          <el-col :span="7">11：00</el-col>
        </el-row>
        <el-row v-for="data_one in data_one_day.data_morning" class="order_one_row">
          <el-col :span="2" class="order_one_id">{{ data_one.id }}</el-col>
          <el-col v-for="data_one_one in data_one.data_detail" :span="7">
            <div
              v-if="data_one_one.is_order!=='None'"
              class="order_one order_yes"
              @click="click_order(data_one_one.pic_url, data_one_one.order_id, data_one_one.remarks)"
            >{{ data_one_one.is_order }}
            </div>
            <div
              v-if="data_one_one.is_order==='None'"
              class="order_one order_no"
              @click="click_order_no(data_one_one.order_id)"
            >{{ data_one_one.is_order }}
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> 下午</span>
        <el-row>
          <el-col :span="2" style="text-align: center">球场</el-col>
          <el-col :span="4">12：00</el-col>
          <el-col :span="4">13：00</el-col>
          <el-col :span="4">14：00</el-col>
          <el-col :span="4">15：00</el-col>
          <el-col :span="4">16：00</el-col>
        </el-row>
        <el-row v-for="data_one in data_one_day.data_afternoon" class="order_one_row">
          <el-col :span="2" class="order_one_id">{{ data_one.id }}</el-col>
          <el-col v-for="data_one_one in data_one.data_detail" :span="4">
            <div
              v-if="data_one_one.is_order!=='None'"
              class="order_one order_yes"
              @click="click_order(data_one_one.pic_url, data_one_one.order_id, data_one_one.remarks)"
            >{{ data_one_one.is_order }}
            </div>
            <div
              v-if="data_one_one.is_order==='None'"
              class="order_one order_no"
              @click="click_order_no(data_one_one.order_id)"
            >{{ data_one_one.is_order }}
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> 晚上</span>
        <el-row>
          <el-col :span="2" style="text-align: center">球场</el-col>
          <el-col :span="4">17：00</el-col>
          <el-col :span="4">18：00</el-col>
          <el-col :span="4">19：00</el-col>
          <el-col :span="4">20：00</el-col>
          <el-col :span="4">21：00</el-col>
        </el-row>
        <el-row v-for="data_one in data_one_day.data_night" class="order_one_row">
          <el-col :span="2" class="order_one_id">{{ data_one.id }}</el-col>
          <el-col v-for="data_one_one in data_one.data_detail" :span="4">
            <div
              v-if="data_one_one.is_order!=='None'"
              class="order_one order_yes"
              @click="click_order(data_one_one.pic_url, data_one_one.order_id, data_one_one.remarks)"
            >{{ data_one_one.is_order }}
            </div>
            <div
              v-if="data_one_one.is_order==='None'"
              class="order_one order_no"
              @click="click_order_no(data_one_one.order_id)"
            >{{ data_one_one.is_order }}
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="pic_show"
      :fullscreen="true"
      top="0"
      :lock-scroll="true"
      :show-close="true"
      :center="true"
    >
      <el-divider content-position="left">备注</el-divider>
      <span v-if="order_remarks_text!==''">{{ order_remarks_text }}</span>
      <span v-if="order_remarks_text===''">没有备注</span>
      <el-divider content-position="left">预定截图</el-divider>
      <img :src="order_pic_url" class="order_pic_class" alt="" @click="pic_show=false">
      <el-divider content-position="left">删除</el-divider>
      <el-button type="danger" plain @click="order_del">删除此预定</el-button>
    </el-dialog>
    <el-dialog
      :visible.sync="pic_upload"
      :fullscreen="true"
      top="0"
      :lock-scroll="true"
      :show-close="false"
      :center="true"
      :destroy-on-close="true"
    >
      <el-input v-model="pic_upload_para.order_name" placeholder="输入哪个人预定的（必填）" clearable/>
      <el-input
        v-model="pic_upload_para.order_remarks"
        type="textarea"
        placeholder="备注（可不填）"
        maxlength="30"
        show-word-limit
      />
      <el-upload
        ref="upload_pic"
        :action="pic_upload_api"
        list-type="picture-card"
        :auto-upload="false"
        :data="pic_upload_para"
        :limit="1"
        :on-exceed="submitUploadPicWarn"
        :on-success="submitOneOrderSuccess"
      >
        <i class="el-icon-plus"/>
      </el-upload>
      <el-button type="danger" plain @click="submitUploadPic">确定</el-button>
      <el-button type="danger" plain @click="pic_upload=false">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>

import { activities_get_today, activities_order_del } from '@/api/activities_manage'

export default {
  name: 'BadmintonOneDay',
  props: {
    oneDay: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      pic_show: false,
      pic_upload: false,
      order_pic_url: '',
      order_remarks_text: '',
      data_one_day: {}, // 1-1-1-1: 第几天-早中晚-场馆-时间段
      loading_today: true,
      pic_upload_api: process.env.VUE_APP_BASE_API + 'activities/order_pic_upload/',
      pic_upload_para: {
        order_name: '',
        order_remarks: '',
        token: this.$store.getters.token,
        id_one_part: '0-0-0-0'
      }
    }
  },
  mounted() {
    // console.log('加载一个页面')
    // console.log(this.oneDay)
    this.get_activities_data_today()
  },
  methods: {
    click_order(pic_url, id, remark) {
      this.pic_show = true
      this.order_pic_url = process.env.VUE_APP_BASE_API + 'statics/' + pic_url
      this.order_remarks_text = remark
      this.order_del_id = id
      // console.log('已预定')
      // console.log(id)
    },
    click_order_no(id) {
      this.pic_upload = true
      this.pic_upload_para.id_one_part = id
      // console.log(id)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    get_activities_data_today() {
      activities_get_today({ token: this.$store.getters.token, one_day: this.oneDay }).then(response => {
        this.data_one_day = response.data
        this.loading_today = false
      })
    },
    submitUploadPicWarn() {
      this.$message({
        showClose: true,
        message: '只能选择一张截图',
        type: 'warning'
      })
    },
    submitOneOrderSuccess() {
      this.$message({
        showClose: true,
        message: '上传成功',
        type: 'success'
      })
      this.get_activities_data_today()
    },
    submitUploadPic() {
      // console.log('开始上传')
      if (this.pic_upload_para.order_name === '') {
        this.$message({
          showClose: true,
          message: '输入是谁预定的',
          type: 'warning'
        })
      } else if (this.$refs.upload_pic.uploadFiles.length < 1) {
        this.$message({
          showClose: true,
          message: '至少要选择一张截图',
          type: 'warning'
        })
      } else {
        this.$refs.upload_pic.submit()
        this.pic_upload_para.order_name = ''
        this.pic_upload_para.order_remarks = ''
        this.pic_upload = false
      }
    },
    order_del() { // 删除预定
      // console.log('删除')
      activities_order_del({ token: this.$store.getters.token, id_one_part: this.order_del_id }).then(response => {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        this.get_activities_data_today()
        this.pic_show = false
      })
    },
    tab_click() {
      this.get_activities_data_today()
    }
  }
}
</script>

<style scoped>
.order_one {
  cursor: pointer;
  height: 30px;
  line-height: 27px;
  background: #cecece;
  text-align: center;
  padding: 2px;
  border: rgba(0, 0, 0, 0.1) 2px solid;
  color: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

.order_one:hover {
  background: #727272;
  border-radius: 3px;
}
.order_one_row:hover>.order_one_id {
  background: rgba(246, 84, 84, 0.3);
  border-radius: 5px;
}
.order_yes {
  color: rgba(0, 0, 0, 1);
  font-weight: normal;
  background: #8fc767;
}
.order_yes:hover {
  background: #caffa8;
}

.order_pic_class {
  max-width: 100%;
  max-height: 100%;
  align-self: center;
  align-content: center;
}

.order_one_id {
  line-height: 32px;
  text-align: center;
  border-radius: 5px;
  transition: 0.5s;
}
</style>
