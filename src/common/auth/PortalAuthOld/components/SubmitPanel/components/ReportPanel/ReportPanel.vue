<template>
    <modal-content
            modalsize="responsive"
						@close-modal="emits('closereport')"
						actionelement="em-submit-panel-button-no"
    >
        <div class="em-incorrect-info-panel">
            <div class="em-incorrect-info-panel-title">
								<div class="em-incorrect-info-panel-title-icon">
										<app-icon
														name="warning"
														:size="30"
														color="#F05C46"
										/>
								</div>
								<div class="em-incorrect-info-panel-title-text">
                    Ошибочные данные:
								</div>
						</div>
            <p class="incorrect-info-panel-p">
								<span>ФИО</span> : {{ props.fio }}
						</p>
            <p class="incorrect-info-panel-p">
								<span>Логин</span>: {{ props.login }}
						</p>
            <p class="incorrect-info-panel-p">
								<span>СНИЛС</span> : {{ props.snils }}
						</p>
            <br>
            <p class="incorrect-info-panel-p-bottom" style="text-align: left;">
                Переданы в техподдержку. Дождитесь рекомендаций специалистов
						</p>
        </div>
		</modal-content>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalContent from "../../../ModalContent/ModalContent.vue";

// EMITS
const emits = defineEmits(['closereport']);

// PROPS
const props = defineProps({
    fio:
        {
            type: String,
            default: '',
            required: true

        },

    login:
        {
            type: String,
            default: '',
            required: true
        },

    snils:
        {
            type: String,
            default: '',
            required: true

        }

});

</script>

<style scoped>
.incorrect-info-panel-p-bottom {
		font-size: 20px;
		font-weight: 600;
}

.incorrect-info-panel-p span {
    font-size: 20px;
    font-weight: 400;
}

.em-incorrect-info-panel-title-text {
		margin-left: 20px;
		font-size: 26px;
		font-weight: 700;
}

.em-incorrect-info-panel-title-icon {
		display: flex;
		align-items: center;
}

.em-incorrect-info-panel-title {
		margin-bottom: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		font-weight: 600;
}

.em-incorrect-info-panel {
		padding-left: 30px;
		padding-right: 30px;
		padding-bottom: 20px;
		display: flex;
		flex-direction: column;
}

.incorrect-info-panel-p {
		font-size: 20px;
		font-weight: 400;
		margin-bottom: 0!important;
}
</style>