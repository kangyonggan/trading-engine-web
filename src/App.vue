<template>
  <router-view />
</template>

<script>
export default {}
</script>

<style lang="scss">
$--color-primary: #D8BE33;

html, body, #app {
  height: 100%;
  font-size: 15px;
  background: #171a21;
  color: #828ea1;
  margin: 0;
  padding: 0;
}

html {
  overflow-y: scroll; //这是为了兼容ie8，不支持:root, vw。这个可以删掉
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
}

// message
.el-message {
  z-index: 99999 !important;
}

//加载中
.el-loading-mask {
  background: none !important;
}

//下拉菜单
.el-dropdown-menu {
  background: #171a21 !important;

  .el-dropdown-menu__item {
    color: #828ea1 !important;
    line-height: 30px !important;
  }

  .el-dropdown-menu__item--divided {
    padding-top: 8px;
  }

  .el-dropdown-menu__item--divided:before {
    background-color: #828ea1 !important;
    height: 0 !important;
  }

  .el-dropdown-menu__item:not(.is-disabled):hover {
    background: #171a21 !important;
    color: $--color-primary !important;
  }
}
.el-input-group__append {
  padding: 0 10px !important;
}
.el-dropdown-link {
  color: #a6afc6 !important;
}

// card
.el-card {
  background: rgba(30, 36, 50, .7) !important;
  border: 0 !important;
  color: #828ea1 !important;

  .el-card__header {
    color: #d5d5d5;
    font-size: 16px;
    border-bottom: 1px solid #828ea1;
  }
}

// table
.el-table::before {
  background-color: #293448 !important;
}

.el-table {
  background: none !important;
  border-color: #293448 !important;

  tr, th, td {
    background: none !important;
    border-color: #293448 !important;
    color: #828ea1;
  }
}

// button
.el-button--default {
  background: none !important;
  color: rgb(132, 142, 156) !important;
}

.el-button--primary {
  background: $--color-primary !important;
  color: #171a21 !important;
}

.el-button--success {
  background: rgb(14, 203, 129) !important;
}

.el-button--success:hover {
  background: rgb(50, 217, 147) !important;
}

.el-button--danger {
  background: rgb(246, 70, 93) !important;
}

.el-button--danger:hover {
  background: rgb(255, 112, 126) !important;
}

// message box
.el-message-box {
  background: #1d2635 !important;

  .el-message-box__title, .el-message-box__message {
    color: #828ea1;
  }

}

// select
.el-input__inner {
  background: none !important;
  color: #a6afc6 !important;
}

.el-select__popper.el-popper[role="tooltip"] {
  background: #1d2635 !important;
}

.el-popper .el-select-dropdown__item {
  color: #6a6e77;
}

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  background: #265c5c !important;
}

.el-popper.is-light .el-popper__arrow::before {
  background: $--color-primary !important;
}

// autocomplete
.el-autocomplete__popper.el-popper[role="tooltip"] {
  background-color: #1d2635 !important;
}

.el-autocomplete-suggestion.is-loading li:hover {
  background: #1d2635 !important;
}

.el-autocomplete-suggestion li {
  color: #6a6e77 !important;
}

.el-autocomplete-suggestion li:hover {
  background: #265c5c !important;
  color: #6a6e77 !important;
}

// input
.el-input {
  .el-input-group__prepend {
    background: none;
    color: #a6afc6 !important;
  }

  .el-input-group__append {
    background: none;
    cursor: pointer;
    color: #a6afc6 !important;
  }

  .el-input__inner {
    background: none;
    color: #d5d5d5 !important;
  }

  .el-input__inner::placeholder {
    color: #6a6e77;
  }
}

// radio
.el-radio__inner {
  background: none !important;
}

.el-radio__label {
  color: #828ea1 !important;
}

// form-item
.el-form-item {
  margin-bottom: 28px !important;
}

// form-label
.el-form-item__label {
  color: #828ea1 !important;
}

// input-number
.el-input-number__decrease, .el-input-number__increase {
  color: #a6afc6 !important;
  background: none !important;
}

// checkbox
.el-checkbox__inner {
  background: none !important;
}
.el-checkbox__label {
  color: #828ea1 !important;
}

// slider
.el-slider__runway {
  background: #293448 !important;
  margin-top: 5px !important;
}
.el-slider__button {
  background: #c5c5c5 !important;
}
.el-slider__stop {
  background: #c5c5c5 !important;
}
.el-popper.is-dark {
  background: none !important;
  bottom: -18px !important;

  .el-popper__arrow {
    display: none;
  }
}

// el-pagination
.el-pagination {
  button:disabled {
    background-color: #171a21 !important;
  }

  .el-pager li, .btn-next, .btn-prev {
    background-color: #171a21 !important;
    color: #828ea1 !important;
  }

  .el-pager li {
    color: #828ea1 !important;
  }

  .el-pager li.active {
    color: $--color-primary !important;
  }
}
</style>
