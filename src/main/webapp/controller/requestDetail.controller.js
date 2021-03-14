/*eslint-disable no-console, no-alert */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox",
	"sap/ui/core/ValueState",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/m/Text"

], function (Controller, JSONModel, uiComp, MessageBox, ValueState, Dialog, DialogType, Button, ButtonType, Text) {
	"use strict";
	this.model = '';
	return Controller.extend("com.leavemodel.odata.controller.requestDetail", {
		
		onInit: function () {
			this.getRouter().getRoute("requestDetail").attachMatched(this._onRouteMatched, this);
			this.model = this.getOwnerComponent().getModel();
			
		},
		getRouter: function () {
			return uiComp.getRouterFor(this);
		},
		_onRouteMatched: function (oEvent) {
			
			this.leaveId = oEvent.getParameter("arguments").leaveId;
			this.model.metadataLoaded().then(function() {
				this.getView().bindElement({
				path: "/TEmpLeaves("+this.leaveId+")",
				parameters: {
				  "expand": "TLeaveTypeDetails"
				} 
			});
			
			//console.log("Here",this.model.getOData());
			}.bind(this));				
		},
		deleteRequest: function (oEvent) {
			var that = this;
			MessageBox.warning("Are you sure to delete the request ?", {
				actions: ["Delete", MessageBox.Action.CLOSE],
				emphasizedAction: "Delete",
				onClose: function (sAction) {
					if(sAction == "Delete")
					{
						that.model.remove("/TEmpLeaves("+that.leaveId+")", {
							success: function()
							{
								let oSuccessMessageDialog = new Dialog({
									type: DialogType.Message,
									title: "Success",
									state: ValueState.Success,
									content: new Text({ text: "Leave Request has been deleted successfully" }),
									beginButton: new Button({
										type: ButtonType.Emphasized,
										text: "OK",
										press: function () {
											oSuccessMessageDialog.close();
											that.getRouter().navTo("AllRequestDetail");
										}.bind(this)
									})
								});
								oSuccessMessageDialog.open();
							},
							error: function(e)
							{
								let oErrorMessageDialog = new Dialog({
									type: DialogType.Message,
									title: "Error",
									state: ValueState.Error,
									content: new Text({ text: e }),
									beginButton: new Button({
										type: ButtonType.Emphasized,
										text: "OK",
										press: function () {
											oErrorMessageDialog.close();
											that.getRouter().navTo("AllRequestDetail");
										}.bind(this)
									})
								});		
								oErrorMessageDialog.open();
							}
						});
					}
					else{
						that.getRouter().navTo("AllRequestDetail");
					}
				}
			});
		},
		editRequest: function (oEvent) {
			var id = oEvent.getSource().data("leaveid");
			this.getRouter().navTo("EditLeaveDetail", {"leaveId" : id });
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.requestDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.requestDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.requestDetail
		 */
		onExit: function () {
			this.getRouter().navTo("Main");
		}
		/**
		 *@memberOf mytrial.leavDemo.myLeaveApp.controller.requestDetail
		 */
	
	});
});