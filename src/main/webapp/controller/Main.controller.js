sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,uiComp, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.leavemodel.odata.controller.Main", {

		onInit: function () {
			
		},
		getRouter: function () {
			return uiComp.getRouterFor(this);
		},
		/**
		 *@memberOf controller.App
		 */
		navigation: function (oEvent) {
			
			var id = oEvent.getSource().data("leaveid");
			this.getRouter().navTo("requestDetail", {
				"leaveId": id
			});
		},
		onPressEdit: function (oEvent) {
			
			var id = oEvent.getSource().data("leaveid");
			this.getRouter().navTo("EditLeaveDetail", {
				"leaveId": id
			});
		},
		/**
		 *@memberOf mytrial.leavDemo.myLeaveApp.controller.App
		 */
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
	});
});
