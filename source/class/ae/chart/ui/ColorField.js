/**
 * ColorField widget
 */
qx.Class.define("ae.chart.ui.ColorField", {
	extend : qx.ui.form.TextField,

	construct : function (){
		this.base(arguments);
		this.bind("value", this, "backgroundColor");
		
		var popup = this.popup = new qx.ui.control.ColorPopup();
		popup.addListener("changeValue", function(e) {
			//this.setDecorator("main");
			//this.setBackgroundColor(e.getData());
			this.setValue(qx.util.ColorUtil
					.rgbToHexString(qx.util.ColorUtil.cssStringToRgb(e
							.getData())));
		}, this);

		
		this.addListener("click", function(e) {
			this.popup.placeToWidget(this);
			this.popup.show();
		}, this);
	}
});
