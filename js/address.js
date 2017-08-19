new Vue({
  el: ".container",
  data: {
    addressList: [],
    limit: 3,
    curentIndex: 0,
    shippingMethods: 1
  },
  mounted() {
    this.$nextTick(() => {
      this.addrView();
    });
  },
  computed: {
    filterAddr() {
      return this.addressList.slice(0, this.limit);
    }
  },
  methods: {
    addrView() {
      this.$http.get("data/address.json").then(res => {
        this.addressList = res.body.result;
        console.log(this.addressList);
      });
    },
    loadMore() {
      this.limit = this.addressList.length;
    },
    setDefault(index) {
      console.log(index);
      this.addressList.forEach(item => {
        item.isDefault = false;
      });
      this.addressList[index].isDefault = true;
    }
  }
});
