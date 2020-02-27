class Canvas {
  constructor(elem) {
    this.$el = elem;
    this.$ctx = this.$el.getContext('2d');
    this.$helper = this.$ctx;
  }
  setSize(width = '300', height = '150') {
    this.$el.setAttribute('width', width + 'px');
    this.$el.setAttribute('height', height + 'px');
    this.$helper.canvas.setAttribute('width', width + 'px');
    this.$helper.canvas.setAttribute('height', height + 'px');
  }
}

export default Canvas;
