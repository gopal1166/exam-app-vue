<template>
  <div>
    <a-table :columns="columns" :data-source="getData"> </a-table>
  </div>
</template>

<script>
/**
 * To display the report of users and their marks on home page
 */

export default {
  name: "report",
  data() {
    return {
      
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
      for (const key in this.$store.getters.reportData) {
        data.push({
          username: key,
          marks: this.$store.getters.reportData[key],
        });
      }
      return data;
    },
  },
};
</script>