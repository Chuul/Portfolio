<template>
	<transition name="modal">
		<div class="modal_mask">
			<div class="modal_wrapper">
				<div class="modal_container">
					<div class="modal_header">
						<slot name="header">
							<!-- 내용 입력 -->
						</slot>
					</div>

					<div class="modal_body">
						<slot name="body">
							<!-- 내용 입력 -->
						</slot>
					</div>

					<div class="modal_footer">
						<slot name="footer">
							<button
								class="modal_default_button"
								@click="$emit('close')"
								v-on:keyup.enter="$emit('close')"
							>
								닫기
							</button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {};
</script>

<style scoped>
.modal_mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal_wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal_container {
	width: 10rem;
	margin: 0px auto;
	padding: 2%;
	text-align: center;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: 'Noto Sans KR', sans-serif;
}

.modal_header {
	margin-top: 0;
	font-weight: 500;
	color: rgba(124, 198, 255, 0.8);
}

.modal_body {
	margin: 20px 0;
	font-weight: 300;
}

.modal_footer {
	text-align: center;
}

.modal_default_button {
	border-style: none;
	border-radius: 5px;
	cursor: pointer;
}
.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal_container,
.modal-leave-active .modal_container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
