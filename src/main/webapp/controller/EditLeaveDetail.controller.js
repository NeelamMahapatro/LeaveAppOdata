/*eslint-disable no-console, no-alert */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
	"sap/ui/core/ValueState",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/m/Text"
], function (Controller, JSONModel, uiComp, History, ValueState, Dialog, DialogType, Button, ButtonType, Text) {
	"use strict";
	return Controller.extend("com.leavemodel.odata.controller.EditLeaveDetail", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.EditLeaveDetail
		 */
		onInit: function () {
			this.getRouter().getRoute("EditLeaveDetail").attachMatched(this._onRouteMatched, this);
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
			}.bind(this));	
			this.selectedLeaveKey = this.getView().getModel().getObject(`/TEmpLeaves(${this.leaveId})`).TLeaveType;
			this.getView().byId("leaveListCombo").setSelectedKey(this.selectedLeaveKey);
		},
		saveRequest: function (oEvent) {
			console.log(this.model);
			var startDate = this.getView().byId("startDateInput").getDateValue();
			var endDate = this.getView().byId("endDateInput").getDateValue();  
			var diff = Math.abs(startDate.getTime() - endDate.getTime());
			var quotaUsed = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
			var oModel = this.model;
			
			var oEntry = {};
			oEntry.ApproverName = this.getView().byId("approverInput").getValue().toString();
			oEntry.EndDate = this.getView().byId("endDateInput").getValue();
			oEntry.Note = this.getView().byId("noteInput").getValue();
			oEntry.QuotaUsed = parseInt(quotaUsed)+1;
			oEntry.StartDate = this.getView().byId("startDateInput").getValue();
			oEntry.Status = 0;
			var leaveType = parseInt(this.getView().byId("leaveListCombo").getSelectedKey());
			oEntry.TLeaveTypeDetails = { "__metadata": { "uri": "TLeaveTypes("+leaveType+")" }  }
			console.log(oEntry);
			let that= this;
			oModel.update("/TEmpLeaves("+this.leaveId+")", oEntry, 
			{
				method: "PUT",
				success: function(data) {
					console.log("successfully updated");
					let oSuccessMessageDialog = new Dialog({
						type: DialogType.Message,
						title: "Success",
						state: ValueState.Success,
						content: new Text({ text: "Leave Request has been updated Succesfully" }),
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
				error: function(e) {
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
			
			
			},
		cancelRequest: function (oEvent) {
			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.onNavBack();
			}
		},
		onAfterRendering: function () {},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.EditLeaveDetail
		 */
		onExit: function () {
			this.getRouter().navTo("App");
		}
		/**
		 *@memberOf mytrial.leavDemo.myLeaveApp.controller.EditLeaveDetail
		 */
	});
});