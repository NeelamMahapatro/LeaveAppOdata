/*eslint-disable no-console, no-alert */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox",
	"sap/ui/core/ValueState",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/m/Text"
], function (Controller, uiComp, MessageBox, ValueState, Dialog, DialogType, Button, ButtonType, Text) {
	"use strict";

	return Controller.extend("com.leavemodel.odata.controller.AllRequestDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.allRequestDetail
		 */
		onInit: function () {
			this.model = this.getOwnerComponent().getModel();
		},
		getRouter: function () {
			return uiComp.getRouterFor(this);
		},
		onPressDelete: function(oEvent)
		{
			var that = this;
			this.leaveId = oEvent.getSource().data("leaveid");
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
		navigation: function (oEvent) {
			var id = oEvent.getSource().data("leaveid");
			console.log(id);
			this.getRouter().navTo("requestDetail", {
				"leaveId": id
			});
		},
		onPressEdit: function (oEvent) {
			console.log(this.getView());
			var id = oEvent.getSource().data("leaveid");
			this.getRouter().navTo("EditLeaveDetail", {
				"leaveId": id
			});
		},
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.allRequestDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.allRequestDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.allRequestDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});