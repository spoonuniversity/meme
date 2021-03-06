/*
* MemeEditorView
* Manages form capture, model updates, and selection state of the editor form.
*/
MEME.MemeEditorView = Backbone.View.extend({

  initialize: function() {
    this.buildForms();
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  // Builds all form options based on model option arrays:
  buildForms: function() {
    var d = this.model.toJSON();

    function buildOptions(opts) {
      return _.reduce(opts, function(memo, opt) {
        return memo += ['<option value="', opt.hasOwnProperty('value') ? opt.value : opt, '">', opt.hasOwnProperty('text') ? opt.text : opt, '</option>'].join('');
      }, '');
    }

    if (d.textShadowEdit) {
      $('#text-shadow').parent().show();
    }

    // Build text alignment options:
    if (d.textAlignOpts && d.textAlignOpts.length) {
      $('#text-align').append(buildOptions(d.textAlignOpts)).show();
    }

    // Build font size options:
    if (d.fontSizeOpts && d.fontSizeOpts.length) {
      $('#font-size').append(buildOptions(d.fontSizeOpts)).show();
    }


    // Build body size options:
    if (d.bodySizeOpts && d.bodySizeOpts.length) {
      $('#body-size').append(buildOptions(d.bodySizeOpts)).show();
    }

    // Build font weight options:
    if (d.fontWeightOpts && d.fontWeightOpts.length) {
      $('#font-weight').append(buildOptions(d.fontWeightOpts)).show();
    }

    // Build product options:
    if (d.productOps && d.productOps.length) {
      $('#product').append(buildOptions(d.productOps)).show();
    }


    // Build font family options:
    if (d.fontFamilyOpts && d.fontFamilyOpts.length) {
      $('#font-family').append(buildOptions(d.fontFamilyOpts)).show();
    }

     // Build text position options:
    if (d.textPositionOpts && d.textPositionOpts.length) {
      $('#text-position').append(buildOptions(d.textPositionOpts)).show();
    }

         // Build body position options:
    if (d.bodyPositionOpts && d.bodyPositionOpts.length) {
      $('#body-position').append(buildOptions(d.bodyPositionOpts)).show();
    }

    // Build watermark options:
    if (d.watermarkOpts && d.watermarkOpts.length) {
      $('#watermark').append(buildOptions(d.watermarkOpts)).show();
    }

    // Build overlay color options:
    if (d.overlayColorOpts && d.overlayColorOpts.length) {
      var overlayOpts = _.reduce(d.overlayColorOpts, function(memo, opt) {
        var color = opt.hasOwnProperty('value') ? opt.value : opt;
        return memo += '<li><label><input class="m-editor__swatch" style="background-color:'+color+'" type="radio" name="overlay" value="'+color+'"></label></li>';
      }, '');

      $('#overlay').show().find('ul').append(overlayOpts);
    }

    // Build background color options:
    if (d.backgroundColorOpts && d.backgroundColorOpts.length) {
      var backgroundOpts = _.reduce(d.backgroundColorOpts, function(memo, opt) {
        var color = opt.hasOwnProperty('value') ? opt.value : opt;
        return memo += '<li><label><input class="m-editor__swatch" style="background-color:'+color+'" type="radio" name="background" value="'+color+'"></label></li>';
      }, '');

      $('#background').show().find('ul').append(backgroundOpts);
    }
  },

  render: function() {
    var d = this.model.toJSON();
    this.$('#headline').val(d.headlineText);
    this.$('#body').val(d.bodyText);
    this.$('#credit').val(d.creditText);
    this.$('#watermark').val(d.watermarkSrc);
    this.$('#image-scale').val(d.imageScale);
    this.$('#headline-scale').val(d.headlineScale);
    this.$('#body-scale').val(d.bodyScale);
    this.$('#font-size').val(d.fontSize);
    this.$('#body-size').val(d.bodySize);
    this.$('#font-weight').val(d.fontWeight);
    this.$('#font-family').val(d.fontFamily);
    this.$('#text-align').val(d.textAlign);
    this.$('#text-position').val(d.textPosition);
    this.$('#body-position').val(d.bodyPosition);
    this.$('#text-shadow').prop('checked', d.textShadow);
    this.$('#logo').prop('checked', d.logo);
    this.$('#overlay').find('[value="'+d.overlayColor+'"]').prop('checked', true);
    this.$('#background').find('[value="'+d.backgroundColor+'"]').prop('checked', true);
  },

  events: {
    'input #headline': 'onHeadline',
    'input #body': 'onBody',
    'input #credit': 'onCredit',
    'input #image-scale': 'onScale',
    'input #headline-scale': 'headlineScale',
    'input #body-scale': 'bodyScale',
    'change #font-size': 'onFontSize',
    'change #body-size': 'onBodySize',
    'change #font-weight': 'onFontWeight',
    'change #font-family': 'onFontFamily',
    'change #watermark': 'onWatermark',
    'change #product': 'onProduct',
    'change #text-align': 'onTextAlign',
    'change #text-position': 'onTextPosition',
    'change #body-position': 'onBodyPosition',
    'change #text-shadow': 'onTextShadow',
    'change #logo': 'onLogo',
    'change [name="overlay"]': 'onOverlayColor',
    'change [name="background"]': 'onBackgroundColor',
    'dragover #dropzone': 'onZoneOver',
    'dragleave #dropzone': 'onZoneOut',
    'drop #dropzone': 'onZoneDrop'
  },

  onCredit: function() {
    this.model.set('creditText', this.$('#credit').val());
  },

  onHeadline: function() {
    this.model.set('headlineText', this.$('#headline').val());
  },

  onBody: function() {
    this.model.set('bodyText', this.$('#body').val());
  },

  onTextAlign: function() {
    this.model.set('textAlign', this.$('#text-align').val());
  },

  onTextPosition: function() {
    this.model.set('textPosition', this.$('#text-position').val());
  },
   onBodyPosition: function() {
    this.model.set('bodyPosition', this.$('#body-position').val());
  },

  onTextShadow: function() {
    this.model.set('textShadow', this.$('#text-shadow').prop('checked'));
  },

  onLogo: function() {
    this.model.set('logo', this.$('#logo').prop('checked'));
  },

  onFontSize: function() {
    this.model.set('fontSize', this.$('#font-size').val());
  },

  onBodySize: function() {
    this.model.set('bodySize', this.$('#body-size').val());
  },

  onFontWeight: function() {
    this.model.set('fontWeight', this.$('#font-weight').val());
  },

  onFontFamily: function() {
    this.model.set('fontFamily', this.$('#font-family').val());
  },

  onWatermark: function() {
    this.model.set('watermarkSrc', this.$('#watermark').val());
    if (localStorage) localStorage.setItem('meme_watermark', this.$('#watermark').val());
  },

  onProduct: function() {
    var selection = this.$('#product').val();
    this.model.set('product', selection);
    if ( selection == 'Facebook Share') {
      this.model.set('width', 764);
      this.model.set('height', 400);
    } else if ( selection == 'Pinterest') {
      this.model.set('width', 600);
      this.model.set('height', 900);
    } else if ( selection == 'Flyer' ) {
      this.model.set('width', 1000);
      this.model.set('height', 1200);
    } else if ( selection == 'Instagram' ) {
      this.model.set('width', 700);
      this.model.set('height', 700);
    } else if ( selection == 'Facebook Cover' ) {
      this.model.set('width', 851);
      this.model.set('height', 315);
    }

  },

  onScale: function() {
    this.model.set('imageScale', this.$('#image-scale').val());
  },

  headlineScale: function() {
    console.log('headline-scale');
    this.model.set('headlineScale', this.$('#headline-scale').val());
  },

  bodyScale: function() {
    console.log('body-scale');
    this.model.set('bodyScale', this.$('#body-scale').val());
    console.log('set',this.model);
  },

  onOverlayColor: function(evt) {
    this.model.set('overlayColor', this.$(evt.target).val());
  },

   onBackgroundColor: function(evt) {
    this.model.set('backgroundColor', this.$(evt.target).val());
  },

  getDataTransfer: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return evt.originalEvent.dataTransfer || null;
  },

  onZoneOver: function(evt) {
    var dataTransfer = this.getDataTransfer(evt);
    if (dataTransfer) {
      dataTransfer.dropEffect = 'copy';
      this.$('#dropzone').addClass('pulse');
    }
  },

  onZoneOut: function(evt) {
    this.$('#dropzone').removeClass('pulse');
  },

  onZoneDrop: function(evt) {
    var dataTransfer = this.getDataTransfer(evt);
    if (dataTransfer) {
      this.model.loadBackground(dataTransfer.files[0]);
      this.$('#dropzone').removeClass('pulse');
    }
  }
});
