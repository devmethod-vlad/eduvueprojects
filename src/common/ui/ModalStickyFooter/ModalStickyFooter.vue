<template>
  <div class="edu-modal-sticky-overlay">
    <div class="edu-modal-sticky">
      <div class="edu-modal-sticky-content">
        <h1>Модальное окно</h1>
        <p>Это содержимое модального окна. Прокручиваемый текст...</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit tincidunt egestas. Fusce faucibus magna sit amet nulla efficitur, et fermentum risus dictum. Integer a vestibulum nisi. Phasellus malesuada ex vel sapien volutpat, ac vulputate ligula fermentum. Donec at nisi sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam mollis est at massa luctus scelerisque.</p>
        <p>Curabitur rutrum leo nec libero tristique, at pharetra lorem iaculis. Vivamus vel vulputate lorem, sit amet condimentum nulla. Nunc sit amet magna a nunc bibendum finibus. In rutrum purus nec felis viverra, nec tincidunt ipsum gravida. Vivamus ac enim auctor, suscipit mi quis, tempor odio. Nam pellentesque ipsum nec urna malesuada vehicula. Suspendisse potenti. Fusce ut elementum enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum fermentum semper elit, quis pretium leo suscipit sit amet.</p>
      </div>
      <footer class="edu-modal-sticky-footer">
        <button onclick="closeModal()">Отмена</button>
        <button>Окей</button>
      </footer>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.edu-modal-sticky-content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.edu-modal-sticky-content {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}


.edu-modal-sticky-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edu-modal-sticky {
  background-color: #fff;
  width: 600px;
  max-width: 90%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  border: 1px #CCCCCC solid;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.edu-modal-sticky-content {
  overflow-y: auto;
  padding: 20px;
  flex: 1; /* Это дает модальному контенту гибкость */
}

.edu-modal-sticky-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
  position: sticky;
  bottom: 0;
}

.edu-modal-sticky-footer button {
  margin-left: 10px;
}
</style>