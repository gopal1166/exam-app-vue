<template>
  <div>
    <a-table :columns="columns" :data-source="getData"> </a-table>
  </div>
</template>

<script>
import Vue from 'vue'
// import { delete } from 'vue/types/umd';
export default {
  name: "report",
  data() {
    return {
      records: { ...localStorage },
      data: [
        {
          username: "John Brown",
          marks: "1, 2",
        },
      ],

      columns: [
        {
          title: "Username",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "Marks",
          dataIndex: "marks",
          key: "marks",
        },
      ],
    };
  },

  computed: {
    getData() {
      let data = [];
   
      Vue.delete(this.records, 'loglevel:webpack-dev-server');
      Vue.delete(this.records, 'undefined');
      for (const key in this.records) {
        data.push({
          username: key,
          marks: this.records[key],
        });
      }

      return data;
    },
  },
};
</script>