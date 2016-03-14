/**
 * Chart widget
 * 
 * @asset(ae/chart/plotly.js)
 * 
 * @ignore(Plotly.*)
 */
qx.Class.define("ae.chart.ui.Chart", {
	extend : qx.ui.core.Widget,

	properties : {
		
		/**
		 * Plotly data
		 */
		data: {
			check : "Object"
		},
		
		/**
		 * Plotly layout
		 */
		layout:{
			check : "Object"
		},
		
		/**
		 * Settings user interface
		 */
		settingsUI: {
			check : "qx.ui.container.Composite"
			
		}
	},

	construct : function() {
		this.base(arguments);

		this.setDecorator("main");

		this.setSettingsUI(new ae.chart.ui.Settings(this));
		
        this.addListener("resize", function (e) {
        	Plotly.Plots.resize(this.getContentElement().getDomElement());
        },this);
        
        
	},

	members : {
		/**
		 * Get Plotly div
		 * @return {Element} Plotly div
		 */
		getPlotlyDiv : function(){
			return this.getContentElement().getDomElement();
		},
		
		/**
		 * Change styling of an existing plot
		 * @param update {Object} updated attributes
		 * @param traces {Array} integer or array of integers for the traces to alter (all if omitted)
		 */
		restyle : function(update,traces){
			Plotly.restyle(this.getPlotlyDiv(),update,traces)
			this.setData(this.getPlotlyDiv().data);
		},
		
		/**
		 * Change layout of an existing plot
		 * @param update {Object} updated attributes
		 */
		relayout : function(update){
			Plotly.relayout(this.getPlotlyDiv(),update);
			this.setLayout(this.getPlotlyDiv().layout);
		},
		
		/**
		 * Add data traces to an existing graph
		 * @param traces  {Object} The object or array of objects to add
		 * @param indices {Array} Locations to add traces
		 */
		addTraces : function(traces,indices){
			Plotly.addTraces(this.getPlotlyDiv(),traces,indices);
			this.setData(this.getPlotlyDiv().data);
		},
		
		/**
		 * Delete traces from an existing graph
		 * @param indices {Array} indices of traces to remove
		 */
		deleteTraces : function(indices){
			Plotly.deleteTraces(this.getPlotlyDiv(),indices);
			this.setData(this.getPlotlyDiv().data);
		},
		
		/**
		 * Move traces at currentIndices array to locations in newIndices array. If newIndices is omitted, currentIndices will be moved to the end
		 * @param currentindices {Array} The locations of traces to be moved
		 * @param newindices {Array} The locations to move traces to
		 */
		moveTraces : function(currentindices,newindices){
			Plotly.moveTraces(this.getPlotlyDiv(),currentindices,newindices);
			this.setData(this.getPlotlyDiv().data);
		},
		
		
		/**
		 * Convenient function to force a full redraw
		 */
		redraw : function(){
			this.getPlotlyDiv().data = this.getData();
			this.getPlotlyDiv().layout = this.getLayout();
			Plotly.redraw(this.getPlotlyDiv());
		},
		
		/**
		 * Plot a new chart
		 * @param data {Object} Plotly data
		 * @param layout {Object} Plotly layout
		 */
		plot : function(data,layout){
			Plotly.newPlot(this.getPlotlyDiv(), data, layout);//,{modeBarButtonsToRemove: ['sendDataToCloud','hoverCompareCartesian'],displaylogo: false} );
			
			this.setData(this.getPlotlyDiv().data);
			this.setLayout(this.getPlotlyDiv().layout);
			//Remove modebar
			document.getElementsByClassName('modebar')[0].style.display="None";
			this.getSettingsUI().loadSettings();
		}
	}
});
