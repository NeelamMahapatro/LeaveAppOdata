/*eslint-disable no-console, no-alert */
sap.ui.define([
	"com/leave/model/controller/BaseController",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.leave.model.controller.AddMember", {

		onInit: function() {
			this.i18n = this.getComponent().getModel("i18n").getResourceBundle();
			this.model = this.getComponent().getModel();
			this.model.metadataLoaded().then(function() {
				this.entry = this.model.createEntry("Members");
				this.getView().setBindingContext(this.entry);
			}.bind(this));
		},

		onNavBack: function(event) {
			this.model.deleteCreatedEntry(this.entry);
			Controller.prototype.onNavBack.apply(this, arguments);
		},

		onAcceptPressed: function(event) {
			console.log(this.model);
			var that = this;
			this.model.submitChanges({
				success: function() {
					MessageBox.success(that.i18n.getText("saveSuccess"));
					that.onNavBack(event);
				},
				error: function(error) {
					MessageBox.error(that.i18n.getText("saveError"));
				}
			});
		}

	});

});