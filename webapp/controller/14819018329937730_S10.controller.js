sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(BaseController, History, Popover, Button, Filter, MessageToast, JSONModel) {
	"use strict";

	return BaseController.extend("generated.app.controller.14819018329937730_S10", {
		onInit: function() {
			//###################################### STANDARD CODE ####################################################
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("14819018329937730_S10").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			//#########################################################################################################

			//===========================================
			//Code to display fields in frgaments begins
			//===========================================
			var oData = {
				"d": {
					"results": [{
						"Stext": "Sales Document"
					}, {
						"Stext": "Net Value"
					}, {
						"Stext": "Unit"
					}, {
						"Stext": "Billing date"
					}]
				}
			};

			var oJSONModel = new JSONModel(oData);
			this.getView().setModel(oJSONModel);
			//===========================================
			//Code to display fields in frgaments ends
			//===========================================

			//======================================
			//Code to hide the SideNavigation option
			//======================================
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			toolPage.setSideExpanded(false);

			//=======================================================
			//Array Data For the Table Billing Document
			//=======================================================
			var oJSONModel = new JSONModel(BillingDocument);
			// console.log("Json", oJSONModel);
			this.getView().byId(
					"bdtable")
				.setModel(
					oJSONModel);

			//=====================================
			//Array Data for the Address in header 
			//=====================================
			var oJSONModelAdr = new JSONModel(Address);
			this.getView().byId("Address").setModel(oJSONModelAdr);
			this.getView().byId("Address1").setModel(oJSONModelAdr);
			this.rowCount();
		},

		//************* SRINI 20/02/2017 - CODE BEGINS **********************************
		//=================================================
		//To handle close functionality in fragment begins
		//=================================================
		handleClose: function(oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts.length) {
				//MessageToast.show("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().Stext; }).join(", "));
			}
			oEvent.getSource().getBinding("items").filter([]);
			var column_selected = [];
			column_selected = aContexts.map(function(oContext) {
				return oContext.getObject().Stext;
			});

			for (var i = 0; i < column_selected.length; i++) {
				if (column_selected[i] === "Sales Document") {
					this.byId("bdtable").getColumns()[1].setVisible(true);
					break;
				} else {
					this.byId("bdtable").getColumns()[1].setVisible(false);
				}
			}
			for (var i = 0; i < column_selected.length; i++) {
				if (column_selected[i] === "Net Value") {
					this.byId("bdtable").getColumns()[2].setVisible(true);
					break;
				} else {
					this.byId("bdtable").getColumns()[2].setVisible(false);
				}
			}
			for (var i = 0; i < column_selected.length; i++) {
				if (column_selected[i] === "Unit") {
					this.byId("bdtable").getColumns()[3].setVisible(true);
					break;
				} else {
					this.byId("bdtable").getColumns()[3].setVisible(false);
				}
			}
			for (var i = 0; i < column_selected.length; i++) {
				if (column_selected[i] === "Billing Date") {
					this.byId("bdtable").getColumns()[0].setVisible(true);
					break;
				} else {
					this.byId("bdtable").getColumns()[0].setVisible(false);
				}
			}
		},
		//===============================================
		//To handle close functionality in fragment ends 
		//===============================================

		//=================================================
		//Code to get selected columns from fragment begins
		//=================================================
		getcolumn: function(oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("navCust", "generated.app.Dialog", this);
				this._oDialog.setModel(this.getView().getModel());
			}

			// Multi-select if required
			var bMultiSelect = !!oEvent.getSource().data("multi");
			this._oDialog.setMultiSelect(bMultiSelect);

			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._oDialog.setRememberSelections(bRemember);

			// clear the old search filter
			this._oDialog.getBinding("items").filter([]);

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
		//===============================================
		//Code to get selected columns from fragment ends
		//===============================================
		//************* SRINI 20/02/2017 - CODE ENDS ************************************

		//***** SRINI 23/01/2017 - CODE TO CHECK ROW COUNT BEGINS ********************
		rowCount: function() {
			if (BillingDocument.BillingDocument.length <= 7) {
				this.getView().byId("bdtable").setVisibleRowCount(BillingDocument.BillingDocument.length);
			} else {
				this.getView().byId("bdtable").setVisibleRowCount(7);
			}
		},
		//***** SRINI 23/01/2017 - CODE ENDS *****************************************

		//=====================================
		//To Expand the Side Navigation option 
		//=====================================  		
		onSideNavButtonPress: function() {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},
		//===============================================================
		//code for logoff functionality
		//===============================================================
		handleLogoffPress: function() {
			var oBindingContext = this.getView().getBindingContext();
			this.doNavigate("login", oBindingContext);
		},
		//===============================================================
		//code for Back To Customer functionality
		//===============================================================
		handleBackPress: function() {
			history.go(-1);
		},
		//==========================================================
		//Tile Press functionality to navigating to specific screen
		//==========================================================
		_onStandardTilePress: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14819014925569885_S1", oBindingContext);

		},
		_onStandardTilePress1: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14819016772901124_S2", oBindingContext);

		},
		salesOrder: function() {
			var oBindingContext = this.getView().getBindingContext();
			this.doNavigate("salesorder", oBindingContext);
		},
		_onStandardTilePress5: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14819017226063143_S6", oBindingContext);

		},
		_onStandardTilePress4: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14819017148924392_S5", oBindingContext);

		},
		_onStandardTilePress3: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14806681306277823_S0", oBindingContext);

		},
		_onStandardTilePress6: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14819017307934167_S7", oBindingContext);

		},
		_onStandardTilePress8: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14819017477321011_S9", oBindingContext);

		},
		_onStandardTilePress7: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14819017384062359_S8", oBindingContext);

		},
		_onStandardTilePress9: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14819018329937730_S10", oBindingContext);

		},
		_onStandardTilePress10: function() {
			var oBindingContext = this.getView().getBindingContext();
			this.doNavigate("14819017062921644_S4", oBindingContext);
		},
		_onStandardTilePress2: function() {
			var oBindingContext = this.getView().getBindingContext();

			this.doNavigate("14819016979836433_S3", oBindingContext);

		},

		//===============
		//For Navigation
		//===============
		doNavigate: function(sRouteName, oBindingContext) {
			var that = this;
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var entityNameSet;
			if (sPath !== null && sPath !== "") {

				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
				}
				entityNameSet = sPath.split("(")[0];
			}
			var navigationPropertyName;
			var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

			if (entityNameSet !== null) {
				navigationPropertyName = that.getOwnerComponent().getNavigationPropertyForNavigationWithContext(entityNameSet, sRouteName);
			}
			if (navigationPropertyName !== null && navigationPropertyName !== undefined) {
				if (navigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(navigationPropertyName, oBindingContext, null, function(bindingContext) {
						sPath = bindingContext.getPath();
						if (sPath.substring(0, 1) === "/") {
							sPath = sPath.substring(1);
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							that.oRouter.navTo(sRouteName);
						} else {
							that.oRouter.navTo(sRouteName, {
								context: sPath,
								masterContext: sMasterContext
							}, false);
						}
					});
				}
			} else {
				this.oRouter.navTo(sRouteName);
			}
		},

		//==================================
		//To get the Row index of the Table
		//==================================
		getContextByIndex: function() {
			var iIndex = this.getView().byId("bdtable").getSelectedIndex();
			var sMsg;
			if (iIndex < 0) {
				sMsg = "No Item Selected";
			} else {
				sMsg = this.getView().byId("bdtable").getSelectedIndex(iIndex);
			}
			MessageToast.show(sMsg);
		},

		//========================
		//Search Option for Table
		//========================
		filterGlobally: function(oEvent) {
			var sQuery = oEvent ? oEvent.getParameter("query") : null;

			// add filter for search
			var filters = [];
			if (sQuery) {
				filters = [new sap.ui.model.Filter([new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sQuery)])];
			}

			// update list binding
			var list = this.getView().byId("bdtable");
			var binding = list.getBinding("rows");
			binding.filter(filters);
		},

		//==============================
		//Clear the sort/filter options
		//============================== 
		clearSelection: function() {
			this.getView().byId("bdtable").clearSelection();
			var oTable = this.getView().byId("bdtable");
			oTable.getBinding("rows").sort(null);
			oTable.getBinding("rows").filter(null);
			this._resetSortingState();
		},

		//================================
		//To Undo the Sort/Filter details
		//================================
		_resetSortingState: function() {
			var oTable = this.getView().byId("bdtable");
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				aColumns[i].setSorted(false);
				aColumns[i].setFiltered(false);
			}
		},

		//========================
		//Filter by Documnet Type
		//========================
		getTAonly: function() {
			var oFilter = new Filter("Net value", sap.ui.model.FilterOperator.GT, '30000.00');
			var oBinding = this.getView().byId("bdtable").getBinding("rows");
			oBinding.filter([oFilter]);
		},

		//#################################### STANDARD CODE #################################	
		handleRouteMatched: function(oEvent) {
				var params = {};
				if (oEvent.mParameters.data.context || oEvent.mParameters.data.masterContext) {
					this.sContext = oEvent.mParameters.data.context;
					this.sMasterContext = oEvent.mParameters.data.masterContext;

					if (!this.sContext) {
						this.getView().bindElement("/" + this.sMasterContext, params);
					} else {
						this.getView().bindElement("/" + this.sContext, params);
					}
				}
			}
			//#####################################################################################
	});
}, /* bExport= */ true);