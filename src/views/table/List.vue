<template>
  <el-table :data="tableData">
    <el-table-column prop="date" label="日期" width="150"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="province" label="省份" width="120"></el-table-column>
    <el-table-column prop="city" label="市区" width="120"></el-table-column>
    <el-table-column prop="address" label="地址" width="600"></el-table-column>
    <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template #default="scope">
        <el-button
          @click.prevent="deleteRow(scope.$index)"
          type="text"
          size="small">
          移除
        </el-button>
        <el-button type="text">
          <router-link to="/table/detail">查看</router-link>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'List',
  setup() {
    const tableData = ref([{
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-04',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-01',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-08',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-06',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }]);

    function deleteRow(index: number) {
      tableData.value.splice(index, 1);
    }

    return {
      tableData,
      deleteRow
    };
  }
});
</script>

<style>

</style>
