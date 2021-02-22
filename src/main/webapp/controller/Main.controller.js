sap.ui.define([
	"com/leave/model/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.leave.model.controller.Main", {

		onInit: function() {
			this.ui = new sap.ui.model.json.JSONModel({count: 0});
			this.getView().setModel(this.ui, "ui");
		},
		
		onSearchPressed: function(event) {
			var search = event.getParameters().query;
			this.getView().byId("table").getBinding("items").filter(
				[ new Filter([
					new Filter("FirstName", FilterOperator.Contains, search),
					new Filter("LastName", FilterOperator.Contains, search)
				], false)]);
		},

		onUpdateFinished: function(event) {
			this.ui.setProperty("/count", event.getParameter("total"));	
		},
		
		onAddPressed: function() {
			this.getRouter().navTo("AddMember");
		}

	});

});
