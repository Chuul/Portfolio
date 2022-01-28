<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<slot name="header">
							<!-- 내용 입력 -->
						</slot>
					</div>

					<div class="modal-body">
						<slot name="body">
							<!-- 내용 입력 -->
						</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
							<button
								class="modal-default-button"
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
.modal-mask {
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

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 10em;
	margin: 0px auto;
	padding: 2%;
	text-align: center;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: 'Noto Sans KR', sans-serif;
}

.modal-header {
	margin-top: 0;
	font-weight: 500;
	color: rgba(124, 198, 255, 0.8);
}

.modal-body {
	margin: 20px 0;
	font-weight: 300;
}

.modal-footer {
	text-align: center;
}

.modal-default-button {
	border-style: none;
	border-radius: 5px;
}
.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
