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
], function (Controller, JSONModel,uiComp, History, ValueState, Dialog, DialogType, Button, ButtonType, Text) {
	"use strict";
	return Controller.extend("com.leavemodel.odata.controller.CreateLeaveRequest", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.CreateLeaveRequest
		 */
		onInit: function () {
			
			this.getView().byId("leaveCreateFormLess").setVisible(false);
			this.model = this.getOwnerComponent().getModel();
			
		},

		moreSelect:function (OEvent) {
			var txt = OEvent.getSource().getButtons()[OEvent.getParameter("selectedIndex")].getText();
			if(txt === "More Than One Day")
			{
				this.getView().byId("leaveCreateFormMore").setVisible(true);
				this.getView().byId("leaveCreateFormLess").setVisible(false);
				console.log(this.getView().byId("leaveCreateFormLess").getVisible());
			}
			else
			{
				this.getView().byId("leaveCreateFormMore").setVisible(false);
				this.getView().byId("leaveCreateFormLess").setVisible(true);
			}
			
		},
		saveRequest: function(){
			/*var model = this.getOwnerComponent().getModel("leaveEmployeeM");
			var x = this.getOwnerComponent().getModel("leaveEmployeeM").getProperty("/LeaveEmployeeCollection");
			console.log(this.getView().byId("leaveListCombo").getSelectedKey());
			x.push({
			"id": model.getData().LeaveEmployeeCollection.length,
			"leaveId": this.getView().byId("leaveListCombo").getSelectedKey(), 
			"leaveType":  "Illnesss Leave",
			"startDate": this.getView().byId("dateInput").getValue(),
			"endDate": this.getView().byId("dateInput").getValue(),
			"createdDate": "31-12-2020",
			"status": 0,
			"approver": "Nirmala Shetter",
			"quotaUsed": 1,
			"note": this.getView().byId("noteInput").getValue()
			});
			this.getOwnerComponent().getModel("leaveEmployeeM").setProperty("/LeaveEmployeeCollection",x);
			var y  = this.getOwnerComponent().getModel("leaveEmployeeM").getProperty("/LeaveEmployeeCollection");
			console.log(y);
			*/
			var startDate = this.getView().byId("startDateInputM").getDateValue();
			var endDate = this.getView().byId("endDateInputM").getDateValue();
			var oEntry={};
			oEntry.ApproverName = this.getView().byId("approverInputM").getValue().toString();
			var oModel = this.model;
			if(this.getView().byId("leaveCreateFormLess").getVisible() == true)
			{
				oEntry.EndDate = this.getView().byId("dateInputL").getValue();
				oEntry.StartDate = this.getView().byId("dateInputL").getValue();
				oEntry.Note = this.getView().byId("noteInputL").getValue();
				oEntry.QuotaUsed = 1;
				oEntry.Status = 0;
			}
			else
			{
				var diff = Math.abs(startDate.getTime() - endDate.getTime());
				var quotaUsed = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
				oEntry.Note = this.getView().byId("noteInputM").getValue();
				oEntry.EndDate = this.getView().byId("endDateInputM").getValue();
				oEntry.StartDate = this.getView().byId("startDateInputM").getValue();
				oEntry.QuotaUsed = parseInt(quotaUsed)+1;
				oEntry.Status = 0;
			} 				
			
			var leaveType = parseInt(this.getView().byId("leaveListCombo").getSelectedKey());
			oEntry.TLeaveTypeDetails = { "__metadata": { "uri": "TLeaveTypes("+leaveType+")" }  }
			oEntry.TEmployeeDetails = { "__metadata": { "uri": "TEmployees(1)" }  }
			
			var that = this;
			console.log(oEntry);
			oModel.create("/TEmpLeaves",oEntry,{
				success: function(result){
					console.log("successfully created");
					let oSuccessMessageDialog = new Dialog({
						type: DialogType.Message,
						title: "Success",
						state: ValueState.Success,
						content: new Text({ text: "Leave Request has been created Succesfully" }),
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
				error: function(e){
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
				},
				 
			}); 
			this.onNavBack();
			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//oRouter.navTo("RouteApp", true);
		},
		getRouter: function () {
			return uiComp.getRouterFor(this);
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteApp", true);
			}
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.CreateLeaveRequest
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mytrial.leavDemo.myLeaveApp.view.CreateLeaveRequest
		 */
		//	onExit: function() {
		//
		//	}

	});

});