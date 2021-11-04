<template>
  <footer class="info-cont">
    <strong class="tit-company">Chul Company</strong>
    <dl class="info-list">
      <dt>회사명</dt>
      <dd>(주)철이</dd>
      <dt>대표</dt>
      <dd>이희철</dd>
      <dt>사업자 번호</dt>
      <dd>000-0000-0000</dd>
      <dd>웹 제작</dd>
      <dt>주소</dt>
      <dd>대전광역시</dd>
    </dl>
    <small class="txt-copy">CopyRight &copy;Chuul. All rights Reserved</small>
  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.info-cont {
  overflow : hidden;
  background: #f2f2f2;
}
.tit-company {
  display: block;
  font-size: 22px;
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #c4c4c4e5;
  font-weight: 700;
}
.info-list {
  display: block;
  padding : 1em 0;
  float : left;
}
.info-list dt, dd {
  display: inline-block;
}
.info-list dt {
  font-weight: 700;
  margin-right: 5px;
}
.info-list dd {
  font-weight: 400;
}
.info-list dd::after {
  display: inline-block;
  content : '';
  width: 1px;
  height: 1em;
  margin : 0 1em;
  background: black;
}
.info-list dd:last-child::after {
  display: none;
}
.txt-copy {
  padding : 1em 0;
  float : right;
}
</style>