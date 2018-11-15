


export function PaintCanvas() {
  const canvas = document.querySelector('canvas');

  this.canvas = canvas;
  this.context = canvas.getContext('2d');
}

PaintCanvas.prototype = {
  /**
   * 画圆
   *
   * @param {*} style
   */
  arc(style) {
    const minRadius = Math.min(this.context.canvas.width, this.context.canvas.height) / 2;
    this.context.fillStyle = style || '#000';
    this.context.beginPath();
    this.context.arc(this.context.canvas.width / 2, this.context.canvas.height / 2, minRadius, 0, 2 * Math.PI);
    this.context.fill();
  },
  /**
   * 画方
   *
   */
  rect() {
    this.context.fillStyle = 'rgba(0,0,0,.4)';
    this.context.fillRect(10, 10, 100, 100);
  },
  /**
   * 文本
   *
   */
  text() {
    this.context.font = '24px STheiti, SimHei';
    this.context.fillText('季明壮', 100, 100);
  },

  /**
   * canvas dom对象
   * 属性
   * 方法
   *
   */
  canvasFn() {
    const base64 = this.canvas.toDataURL();
    const blob = this.canvas.toBlob((blob) => {
      console.log(blob, URL.createObjectURL(blob));
    });
    console.log(this.canvas.width, this.canvas.height);
  },
  scale() {
    this.context.fillRect(10, 10, 10, 10);
    this.context.scale(2, 2);
    this.context.fillRect(10, 10, 10, 10);
    return this;
  },
  /**
   * 清除矩形中的像素
   *
   */
  clearRectFn() {
    this.fillStyle = '#000';
    this.context.fillRect(100, 100, 100, 100);
    this.context.clearRect((100 - 40) / 2, (100 - 40) / 2, 40, 40);
    return this;
  },

  /**
   * 菊花loading
   *
   */
  loading() {
    // 圆心坐标
    var center = [20, 20];
    // 线长度和距离圆心距离
    var length = 8, offset = 8;
    // 开始绘制
    this.context.lineWidth = 4;
    this.context.lineCap = 'round';
    for (var angle = 0; angle < 360; angle += 45) {
      // 正余弦
      var sin = Math.sin(angle / 180 * Math.PI);
      var cos = Math.cos(angle / 180 * Math.PI);
      // 开始绘制
      this.context.beginPath();
      this.context.moveTo(center[0] + offset * cos, center[1] + offset * sin);
      this.context.lineTo(center[0] + (offset + length) * cos, center[1] + (offset + length) * sin);
      this.context.strokeStyle = 'rgba(0,0,0,' + (0.25 + 0.75 * angle / 360) + ')';
      this.context.stroke();
    }

    requestAnimationFrame(this.loading.bind(this));
  },

  run() {
    // 偏移大小
    var offset = 0;
    // 绘制
    var draw = function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.setLineDash([8, 4]);
      this.context.lineDashOffset = offset;
      this.context.strokeRect(2, 2, 236, 116);
    }

    var run = function () {
      offset += 0.5;
      if (offset > 24) {
        offset = 0;
      }
      draw.call(this);
      // 继续绘制
      requestAnimationFrame(run.bind(this));
    }
    run.call(this);
  },

  /**
   * 画线
   *  [0,0]
   *  [200,100]
   */
  line() {
    this.context.lineWidth = 4;

    // 另起绘制
    this.context.beginPath();
    this.context.strokeStyle = 'red';

    // 起始坐标
    this.context.moveTo(20, 20);
    // 结束坐标
    this.context.lineTo(100, 100);
    this.context.stroke();

    this.context.beginPath();
    this.context.strokeStyle = 'green';
    this.context.moveTo(100, 100);
    this.context.lineTo(100, 3);
    this.context.stroke();

    this.context.beginPath();
    this.context.strokeStyle = 'blue';
    this.context.moveTo(100, 3);
    this.context.lineTo(20, 20);
    this.context.stroke();
  },
  /**
   * 画布阴影颜色
   * 画布阴影模糊程度
   *
   */
  shadowBlur() {
    this.context.shadowColor = 'red';
    this.context.shadowBlur = 10;
    this.context.shadowOffsetX = 5;
    this.context.shadowOffsetY = 10;
    this.context.fillRect(20, 20, 50, 50);

    this.context.font = '30px STheiti, simHei';
    this.context.fillText('季明壮', 10, 30);
  },
  /**
   * 描边
   * 值： 颜色，渐变，图案
   */
  stroke() {
    this.context.strokeStyle = 'red';
    this.context.lineWidth = 10;
    this.context.strokeRect(10, 10, 100, 20);
  },
  /**
   * 字体
   *
   */
  font(){
    this.context.font='20px STheiti, simHei';
    this.context.textAlign='left';
    this.context.textBaseline = 'bottom';
    this.context.fillText('jmz',20,20);
  }
};
