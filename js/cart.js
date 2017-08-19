new Vue({
  el: "#app",
  data: {
    list: [],
    totalMoney: 0,
    checkAllFlag: false,
    delFlag: false,
    pindex: ""
  },
  filters: {
    formateMoney(value) {
      return "¥" + value.toFixed(2);
    }
  },
  mounted() {
    this.cartView();
  },
  methods: {
    cartView() {
      this.$http.get("data/cartData.json").then(res => {
        console.log(res.body.result.list);
        this.list = res.body.result.list;
      });
    },
    changeMoney(product, way) {
      if (way > 0) {
        product.productQuantity++;
      } else {
        product.productQuantity--;
        if (product.productQuantity < 1) {
          product.productQuantity = 1;
        }
      }
      this.calcTotalPrice();
    },
    selectProduct(item) {
      if (typeof item.checked === "undefined") {
        this.$set(item, "checked", true);
      } else {
        item.checked = !item.checked;
      }
      this.calcTotalPrice();
    },
    checkAll(flag) {
      this.checkAllFlag = flag;
      this.list.forEach((item, index) => {
        if (typeof item.checked === "undefined") {
          this.$set(item, "checked", true);
        } else {
          item.checked = this.checkAllFlag;
        }
      });
      this.calcTotalPrice();
    },
    calcTotalPrice() {
      this.totalMoney = 0;
      this.list.forEach((item, index) => {
        if (item.checked) {
          this.totalMoney += item.productPrice * item.productQuantity;
        }
      });
    },
    deleteConfirm(index) {
      this.pindex = index;
      this.delFlag = true;
    },
    deleteProduct() {
      this.list.splice(this.pindex, 1);
      this.delFlag = false;
      this.calcTotalPrice();
    }
  }
});

Vue.filter("money", function(value, type) {
  return "¥" + value.toFixed(2) + type;
});
