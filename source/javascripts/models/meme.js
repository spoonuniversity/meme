/*
* MemeModel
* Manages rendering parameters and source image datas.
*/
MEME.MemeModel = Backbone.Model.extend({
  defaults: {
    backgroundPosition: { x: null, y: null },
    bodyPosition:'bottom',
    bodyPositionOpts: ['top','middle','bottom'],
    bodyText: '',
    creditText: 'Photo by',
    creditSize: 12,
    downloadName: 'share',
    fontColor: 'white',
    fontFamily: "proxima-nova",
    product: 'Facebook',
    productOps: ['Facebook Share', 'Facebook Cover', 'Pinterest', 'Flyer'],
    fontFamilyOpts: ['Proxima Nova', 'Open Sans Condensed'],
    fontSize: 24,
    fontSizeOpts: [14, 24, 36],
    bodySize: 14,
    bodySizeOpts: [14, 24, 36],
    fontWeight: 900,
    fontWeightOpts: [100, 500, 900],
    headlineText: 'Write your own headline',
    height: 378,
    headlineScale: 1,
    bodyScale: 1,
    imageScale: 1,
    imageSrc: '',
    overlayAlpha: 0.5,
    overlayColor: '#000',
    overlayColorOpts: ['#000', '#777', '#2980b9'],
    paddingRatio: 0.05,
    textAlign: 'left',
    textAlignOpts: ['left', 'center', 'right'],
    backgroundColor: '#00C5EC',
    backgroundColorOpts: [ '#00C5EC', '#3D8A99', '#00FF9C', '#FF4440', '#CC1461'],
    textShadow: true,
    textShadowEdit: true,
    watermarkAlpha: 0.75,
    watermarkMaxWidthRatio: 0.25,
    watermarkSrc: '',
    watermarkOpts: [],
    logo: true,
    width: 755
  },

  // Initialize with custom image members used for background and watermark:
  // These images will (sort of) behave like managed model fields.
  initialize: function() {
    this.background = new Image();
    this.watermark = new Image();

    // Set image sources to trigger "change" whenever they reload:
    this.background.onload = this.watermark.onload = _.bind(function() {
      this.trigger('change');
    }, this);

    // Set initial image and watermark sources:
    if (this.get('imageSrc')) this.background.src = this.get('imageSrc');
    if (this.get('watermarkSrc')) this.setWatermarkSrc(this.get('watermarkSrc'));

    // Update image and watermark sources if new source URLs are set:
    this.listenTo(this, 'change:imageSrc', function() {
      this.background.src = this.get('imageSrc');
    });
    this.listenTo(this, 'change:watermarkSrc', function() {
      this.setWatermarkSrc(this.get('watermarkSrc'));
    });
  },

  // Specifies if the background image currently has data:
  hasBackground: function() {
    return this.background.width && this.background.height;
  },

  // Loads a file stream into an image object:
  loadFileForImage: function(file, image) {
    var reader = new FileReader();
    reader.onload = function() { image.src = reader.result; };
    reader.readAsDataURL(file);
  },

  // Loads a file reference into the background image data source:
  loadBackground: function(file) {
    this.loadFileForImage(file, this.background);
  },

  // Loads a file reference into the watermark image data source:
  loadWatermark: function(file) {
    this.loadFileForImage(file, this.watermark);
  },

  // When setting a new watermark "src",
  // this method looks through watermark options and finds the matching option.
  // The option's "data" attribute will be set as the watermark, if defined.
  // This is useful for avoiding cross-origin resource loading issues.
  setWatermarkSrc: function(src) {
    var opt = _.findWhere(this.get('watermarkOpts'), {value: src});
    var data = (opt && opt.data) || src;

    // Toggle cross-origin attribute for Data URI requests:
    if (data.indexOf('data:') === 0) {
      this.watermark.removeAttribute('crossorigin');
    } else {
      this.watermark.setAttribute('crossorigin', 'anonymous');
    }

    this.watermark.src = data;
    this.set('watermarkSrc', src);
  }
});
