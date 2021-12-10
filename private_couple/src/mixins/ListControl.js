export default {
  data() {
    return {
      urlText : "",
      posText : ""
    }
  },
  methods : {
    checkedItem(course) {
      this.$store.commit('checkOneItem', course);
    },
    openURL(course) {
      this.$store.commit('openURLText', course);
    },
    attachURL(course) {
      const url = this.urlText;
      this.$store.commit('attachOneURL', {course, url});
      this.urlText = "";
    },
    openPos(course) {
      this.$store.commit('openPosTxt', course);
    },
    attachPos(course) {
      const pos = this.posText;
      this.$store.commit('attachOnePOS', {course, pos});
      this.posText = "";
    },
    removeCourse(course, index) {
      this.$store.commit('removeOneCourse', {course, index});
    },
  }
}