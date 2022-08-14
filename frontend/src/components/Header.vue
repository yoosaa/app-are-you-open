<template>
  <header>
    <h1>近くのお店、どこが開いてる？</h1>
    <p class="attension">半径〇〇m以内にあるお店などが営業中か調べられるページ、プルダウンから距離を選択してください</p>
  </header>
</template>

<style lang="scss">
header {
  width: 100vw;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  background-color: rgba(255, 255, 255, 0.5);
  position: sticky;
  h1 {
    font-family: 'Work Sans', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .attension {
    font-size: .6rem;
  }
}
</style>