<template>
	<footer class="info_cont">
		<strong class="app_title">Private Course</strong>
		<dl class="info_list">
			<dt>제작</dt>
			<dd>이희철</dd>
			<dt>이메일</dt>
			<dd>bethejs30@gmail.com</dd>
			<a
				class="gitRepo"
				href="https://github.com/Chuul/Private-Course"
				target="_blank"
				>Visit Github Repository</a
			>
			<small class="txt_copy">CopyRight &copy;Chuul. All rights Reserved</small>
		</dl>
	</footer>
</template>

<script>
export default {};
</script>

<style scoped>
.info_cont {
	overflow: hidden;
	background: rgba(124, 198, 255, 0.247);
}
.app_title {
	display: block;
	font-size: 1.5rem;
	height: 3em;
	line-height: 3em;
	padding: 0 1em;
	border-bottom: 1px solid #c4c4c4e5;
	font-weight: 700;
}
.info_list {
	display: block;
	padding: 0 1em;
	float: left;
}
.info_list dt,
dd,
a {
	display: inline-block;
}
.info_list dt,
a {
	font-weight: 700;
	margin-right: 5px;
}
.info_list dd {
	font-weight: 400;
	margin-left: 5px;
}
.info_list dd::after {
	display: inline-block;
	content: '';
	width: 1px;
	height: 1em;
	margin: 0 1em;
	background: black;
}
.info_list dd:last-child::after {
	display: none;
}
.gitRepo:hover {
	color: #8763fb;
	cursor: pointer;
}
.txt_copy {
	display: block;
	padding: 1em 0;
}
</style>
