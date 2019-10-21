class Canvas {
  constructor(elem) {
    this.$el = elem;
    this.$ctx = this.$el.getContext('2d');
  }
  setSize(width = '300', height = '150') {
    this.$el.setAttribute('width', width + 'px');
    this.$el.setAttribute('height', height + 'px');
  }
}

export default Canvas;
