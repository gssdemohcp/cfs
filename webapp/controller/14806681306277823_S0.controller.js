var array = [];
var Last10 = [];
var ContactPerson = [];
var OrderTracking = [];
var SalesDocumentSearch = [];
var Deliveries = [];
var openQuotations = [];
var BillingDocument = [];
var OpenBillingDocuments = [];
var SalesDocBlockedforBilling = [];
var OpenSalesOrder = [];
var Address = [];
var SaleDocSearch;
var name;
var custnr;
sap.ui.define(["sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History",
		"sap/ui/model/json/JSONModel",
		"sap/m/Popover",
		"sap/m/Button",
		"sap/m/Dialog",
		'sap/ui/layout/VerticalLayout'
	], function(BaseController, History, JSONModel, Popover, Button, Dialog, VerticalLayout) {
		"use strict";

		return BaseController.extend("generated.app.controller.14806681306277823_S0", {
			// ******* CREATE JSON MODEL INSTANCE *******************
			oEmployeeModel: new JSONModel(),
			//############### STANDARD FUNCTION FOR INITIAL PROCESSING OF DASHBOARD VIEW **************	//standard function for initial processing of Dashboard view
			onInit: function(evt) {
				//###########STANDARD CODE#################################################################################		//standard code
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.oRouter.getTarget("14806681306277823_S0").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
				//#########################################################################################################
				//******* CODE TO HIDE SIDE NAVIGATION *********************
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(false);
				var oView = this.getView();
				this.getView().addEventDelegate({
					onBeforeShow: function(evt) {
						//*************************************************************************************
						//********* SABARI - 02/02/2017  - CODE BEGIN *****************************************
						//*************************************************************************************
						//==============================================
						//OData call to get the data from the EDV System
						//===============================================
						var url = "/sap/opu/odata/SAP/ZCFS_SRV/";
						var url6 = "('";
						var url1 = CustomerId;
						// "'1000'";
						var url5 = "')";
						var fUrl = url6 + url1 + url5;
						var fUrl1 = url + "ZCFS_CustSet" + fUrl;
						//===========================
						//Ajax Call to get the Data 
						//===========================
						$.ajax({
							type: "GET",
							contentType: "application/json; charset=utf-8",
							datatype: "json",
							url: fUrl1,
							//async: false,
							//cache: false,
							beforeSend: function(XMLHttpRequest2) {
								var token = "gujersey" + ':' + "gss888";
								var hash = "";
								if (btoa) {
									hash = btoa(token);
								}
								hash = "Basic " + hash;
								XMLHttpRequest2.setRequestHeader("Accept", "application/json");
							},
							success: function(oData, textStatus, jqXHR) {
								//***************SABARI - 16/01/2017 - CODE BEGIN **************************************
								//==============================================
								//To get the Last 10 Sales Document from odata  to array
								//==============================================
								array = JSON.parse(oData.d.EvLastTenSd);
								Last10 = {
									last10: array
								};
								//=============================================================
								//To get array of Last 10 Sales Doc to bind to the list control
								//==============================================================
								var oJSONModel = new JSONModel(Last10);
								//==================================================	
								//Binding the array to the list control in the tile
								//==================================================	
								oView.byId(
										"Last10List")
									.setModel(
										oJSONModel);
								//==============================================
								//To get the Order Tracking from odata  to array
								//==============================================
								array = JSON.parse(oData.d.EvOrderTracking);
								OrderTracking = {
									OrderTracking: array
								};
								//==============================================
								//To get the Sales Document Search from odata  to array
								//==============================================
								array = JSON.parse(oData.d.EvSalesDocumentSearch);
								SalesDocumentSearch = {
									SalesDocumentSearch: array
								};
								//==============================================
								//To get the Deliveries from odata  to array
								//==============================================
								array = JSON.parse(oData.d.EvDeliveries);
								Deliveries = {
									Deliveries: array
								};
								//===============================================================
								//To SetModle To Deliveries Tile
								//===============================================================
								var oJSONModelDel = new JSONModel(Deliveries);
								oView.byId("Deliveries").setModel(oJSONModelDel);
								//=====================================================
								//To get the Percentage for Billing
								//=====================================================	
								// var BillingDocPercentage = oData.d.EvBillingDocPercentage;
								// oView.byId("BillingDocPercentage").setPercentage(BillingDocPercentage);
								//=====================================================	
								//To get the Billing Document from odata to array
								//=====================================================
								array = JSON.parse(oData.d.EvBillingDocument);
								BillingDocument = {
									BillingDocument: array
								};
								//=====================================================	
								//To get the Open Billing Document from odata to array
								//=====================================================	
								array = JSON.parse(oData.d.EvOpenBillingDocuments);
								OpenBillingDocuments = {
									OpenBillingDocuments: array
								};

								//*************************************************************************************
								//********* SABARI - 02/02/2017  - CODE END********************************************
								//*************************************************************************************
								//*************************************************************************************
								//********* SABARI - 16/02/2017  - CODE BEGIN********************************************
								//*************************************************************************************

								//=======================================================
								//To get the Sales Order to array
								//=======================================================	
								array = JSON.parse(oData.d.EvOpenSalesOrder);
								OpenSalesOrder = {
									OpenSalesOrder: array
								};
								//*************************************************************************************
								//********* SABARI - 16/02/2017  - CODE END********************************************
								//*************************************************************************************

								// var oJSONModelSDBlocked = new JSONModel(SalesDocBlockedforBilling);
								// oView.byId("SalesDocBlockedforBilling").setModel(oJSONModelSDBlocked);
								//*************************************************************************************
								//********* SABARI - 02/02/2017  - CODE END********************************************
								//*************************************************************************************
								//======================================================================================
								//for Current order tracking graph tab
								//======================================================================================
								//======================================================================================
								//  1.Get the id of the VizFrame
								//======================================================================================
								//======================================================================================
								//To get the id of the vizType used
								//======================================================================================
								var oVizFrame2 = oView.byId("idpiechart2");
								//======================================================================================
								//  2.Create a JSON Model and set the data
								//======================================================================================
								var oModelPC2 = new sap.ui.model.json.JSONModel();
								var data2 = {
									'CSales': [{
										"OrderName": "Not Yet",
										"Revenue": "3"
									}, {
										"OrderName": "Partially",
										"Revenue": "2"
									}, {
										"OrderName": "Completely",
										"Revenue": "3"
									}]
								};
								oModelPC2.setData(OrderTracking);
								//======================================================================================
								//  3. Create Viz dataset to feed to the data to the graph
								//======================================================================================
								// var oDataset2 = new sap.viz.ui5.data.FlattenedDataset({
								// 	dimensions: [{
								// 		name: "Created On",
								// 		value: "{ERDAT}"
								// 	}],

								// 	measures: [{
								// 		name: "Net Value",
								// 		value: "{NETWR}"
								// 	}],

								// 	data: {
								// 		path: "/OrderTracking"
								// 	}
								// });
								// oVizFrame2.setDataset(oDataset2);
								oVizFrame2.setModel(oModelPC2);
								//======================================================================================
								//  4.Set Viz properties
								//======================================================================================
								oVizFrame2.setVizProperties({
									title: {
										text: "Analytics for Order Tracking"
									},
									plotArea: {
										colorPalette: d3.scale.category20().range(),
										drawingEffect: "glossy"
									}
								});

								//*************************************************************************************
								//********* SABARI - 23/01/2017  - CODE END********************************************
								//*************************************************************************************

								//======================================================================================
								//Bar chart code begins - Srinivas
								//======================================================================================
								//======================================================================================
								//To get the id of the vizType used
								//======================================================================================
								var oVizFrame = oView.byId("idVizFrame");
								//======================================================================================
								//Code to build the array for chart input
								//======================================================================================
								var oModelPC3 = new sap.ui.model.json.JSONModel();
								var data2 = {
									'CSales': [{
										"OrderName": "Not Yet",
										"Revenue": "3"
									}, {
										"OrderName": "Partially",
										"Revenue": "2"
									}, {
										"OrderName": "Completely",
										"Revenue": "3"
									}]
								};
								oModelPC3.setData(OpenBillingDocuments);
								//======================================================================================
								//Setting the model to the variable of the VizType control
								//======================================================================================
								oVizFrame.setModel(oModelPC3);

								oVizFrame.setVizProperties({
									interaction: {
										behaviorType: null
									},
									plotArea: {
										dataLabel: {
											// formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
											visible: true
										}
									},
									valueAxis: {
										label: {
											// formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
										},
										title: {
											visible: false
										}
									},
									categoryAxis: {
										title: {
											visible: false
										}
									},
									title: {
										visible: true,
										text: 'Analytics for Open Billing Document'
									},
									tooltip: {
										visible: true,
										// formatString:CustomerFormat.FIORI_LABEL_FORMAT_2,
										bodyDimensionLabel: "Order Name",
										bodyDimensionValue: "Order Name"
									}
								});
								//======================================================================================
								//Bar chart code ends - Srinivas
								//======================================================================================
								//=====================================================
								//To get the Open Quotation form odata to array.
								//=====================================================
								array = JSON.parse(oData.d.EvOpenQuotations);
								openQuotations = {
									openQuotations: array
								};
								//=====================================================
								//To get the Percentage for Quotations
								//=====================================================
								var openQuotPer = oData.d.EvOpenQuotPercentage;
								oView.byId("openQuotations").setPercentage(openQuotPer);
								//==============================================
								//To get the Contact Person from odata  to array
								//==============================================
								array = JSON.parse(oData.d.EvContactperson);
								ContactPerson = {
									ContactPerson: array
								};
								//===============================================================
								//To Set Model To Contact Person Tile
								//===============================================================
								var oJSONModelCP = new JSONModel(ContactPerson);
								oView.byId("ContactPerson").setModel(oJSONModelCP);
								//==============================================
								//To get the Address from odata  to array
								//==============================================
								array = JSON.parse(oData.d.EvAddress);
								Address = {
									Address: array
								};
								//=======================================================
								//To get the Sales Document Blocked for Billing to array
								//=======================================================	
								array = JSON.parse(oData.d.EvSdBlockedForBilling);
								SalesDocBlockedforBilling = {
									SalesDocBlockedforBilling: array
								};
							}
						});
					}
				});

				//*************************************************************************************
				//********* SABARI - 30/01/2017  - CODE BEGIN********************************************
				//*************************************************************************************
				//===============================================================
				//For Customer Details Pop Over
				//===============================================================
				var mEmployeeData = {
					pages: [{
						pageId: "employeePageId",
						header: "Customer Info",
						icon: "/webapp/cust.png",
						title: "Jessica D. Prince - Customer",
						description: "Account Manager",
						groups: [{
							heading: "Contact Details",
							elements: [{
								label: "Mobile",
								value: "+001 6101 34869-0",
								elementType: sap.m.QuickViewGroupElementType.mobile
							}, {
								label: "Phone",
								value: "+001 6101 34869-1",
								elementType: sap.m.QuickViewGroupElementType.phone
							}, {
								label: "Email",
								value: "main.contact@company.com",
								emailSubject: 'Subject',
								elementType: sap.m.QuickViewGroupElementType.email
							}]
						}, {
							heading: "Company",
							elements: [{
								label: "Name",
								value: "Adventure Company",
								url: "http://sap.com",
								type: sap.m.QuickViewGroupElementType.link
							}, {
								label: "Address",
								value: "Main Street 4572, Los Angeles USA"
							}]
						}]
					}]
				};
				this.oEmployeeModel.setData(mEmployeeData);
			},
			//===============================================================
			//Search Option for Sales Document Search
			//===============================================================
			filterGlobally: function(oEvent) {
				SaleDocSearch = oEvent ? oEvent.getParameter("query") : null;
				//===============================================================
				//to Navigate to Sale Document Search page
				//===============================================================
				this._onStandardTilePress2();
			},
			//===============================================================
			//To Popover the customer Details 
			//===============================================================
			press: function(oEvent) {
				this.openQuickView(oEvent, this.oEmployeeModel);
			},
			openQuickView: function(oEvent, oModel) {
				this.createPopover();

				this._oQuickView.setModel(oModel);
				//===============================================================
				// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
				//===============================================================
				var oButton = oEvent.getSource();
				jQuery.sap.delayedCall(0, this, function() {
					this._oQuickView.openBy(oButton);
				});
			},
			onExit: function() {
				if (this._oQuickView) {
					this._oQuickView.destroy();
				}
			},
			createPopover: function() {
				if (!this._oQuickView) {
					this._oQuickView = sap.ui.xmlfragment("navCust", "generated.app.Customer", this);
					this.getView().addDependent(this._oQuickView);
				}
			},
			//===============================================================
			//To get popup on the press of the User Name. 
			//===============================================================
			handleUserNamePress: function(event) {
				var popover = new Popover({
					showHeader: false,
					placement: sap.m.PlacementType.Bottom,
					content: [
						new Button({
							text: 'Feedback',
							type: sap.m.ButtonType.Transparent
								// onclick: this.doNavigate("")
						}),
						new Button({
							text: 'Help',
							type: sap.m.ButtonType.Transparent
								// onclick: this.doNavigate("")
						}),
						new Button({
							text: 'Logout',
							type: sap.m.ButtonType.Transparent
						})
					]
				}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

				popover.openBy(event.getSource());
			},
			//===============================================================
			//Standard Code
			//===============================================================
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
			},
			//===============================================================
			//To Expand the Side Navigation option .
			//===============================================================
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
				var oBindingContext = this.getView().getBindingContext();
				this.doNavigate("Customer", oBindingContext);
			},
			//===============================================================
			//Tile Press functionality to navigating to specific screen
			//===============================================================
			_onStandardTilePress2: function() {
				var oBindingContext = this.getView().getBindingContext();
				this.doNavigate("14819016979836433_S3", oBindingContext);
			},
			//===============================================================
			//For Naviagtion
			//===============================================================
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

			salesOrder: function() {
				var oBindingContext = this.getView().getBindingContext();
				this.doNavigate("salesorder", oBindingContext);
			},

			_onStandardTilePress: function() {
				var oBindingContext = this.getView().getBindingContext();

				this.doNavigate("14819014925569885_S1", oBindingContext);

			},
			_onStandardTilePress1: function() {
				var oBindingContext = this.getView().getBindingContext();

				this.doNavigate("14819016772901124_S2", oBindingContext);

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
			//To covert table data to PDF
			handlePdf: function() {
				// var tabledata = oTable.getModel().getData();
				var oTable = new JSONModel(Last10)
				console.log("pdfdata", oTable);
				this.JSONToPDFConvertor(Last10.last10);
			},

			JSONToPDFConvertor: function(JSONData) {
				// To get the last 10 Sales Document.
				var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				name = arrData["0"]["Sold To Party Name"];
				custnr = arrData["0"]["Sold To Party ID"];
				var columns = new Array;
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					columns.push(index);
				}
				var rows = new Array;
				console.log(arrData);
				for (var i = 0; i < arrData.length; i++) {
					rows[i] = new Array;

					for (var j = 0; j < arrData.length;) {

						for (var index in arrData[0]) {

							rows[i][j] = arrData[i][index];
							j++;
						}
					}
				}
				if (columns.length < 4) {
					var doc = new jsPDF('p', 'pt');
				} else {
					var doc = new jsPDF('l', 'pt');
				}
				doc.text(7, 15, "Last 10");
				doc.autoTable(columns, rows, {
					startY: 20,
					margin: {
						horizontal: 7
					},
					styles: {
						columnWidth: 'wrap'
					},
					columnStyles: {
						text: {
							columnWidth: 'auto'
						}
					}
				});
				//To get the sales Order
				JSONData = OrderTracking.OrderTracking;
				arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				var columns1 = new Array;
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					columns1.push(index);
				}
				var rows1 = new Array;
				console.log(arrData);
				for (var i = 0; i < arrData.length; i++) {
					rows1[i] = new Array;

					for (var j = 0; j < arrData.length;) {

						for (var index in arrData[0]) {

							rows1[i][j] = arrData[i][index];
							j++;
						}
					}
				}
				doc.text("Order Tracking", 7, doc.autoTableEndPosY() + 12);
				doc.autoTable(columns1, rows1, {
					startY: doc.autoTableEndPosY() + 15,
					margin: {
						horizontal: 7
					},
					styles: {
						columnWidth: 'wrap'
					},
					columnStyles: {
						text: {
							columnWidth: 'auto'
						}
					}
				});
				//To get the Deliveries 
				JSONData = Deliveries.Deliveries;
				arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				var columns2 = new Array;
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					columns2.push(index);
				}
				var rows2 = new Array;
				console.log(arrData);
				for (var i = 0; i < arrData.length; i++) {
					rows2[i] = new Array;

					for (var j = 0; j < arrData.length;) {

						for (var index in arrData[0]) {

							rows2[i][j] = arrData[i][index];
							j++;
						}
					}
				}
				doc.text("Deliveries", 7, doc.autoTableEndPosY() + 12);
				doc.autoTable(columns2, rows2, {
					startY: doc.autoTableEndPosY() + 15,
					margin: {
						horizontal: 7
					},
					styles: {
						columnWidth: 'wrap'
					},
					columnStyles: {
						text: {
							columnWidth: 'auto'
						}
					}
				});
				//To get the BillingDocument 
				JSONData = BillingDocument.BillingDocument;
				arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				var columns3 = new Array;
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					columns3.push(index);
				}
				var rows3 = new Array;
				console.log(arrData);
				for (var i = 0; i < arrData.length; i++) {
					rows3[i] = new Array;

					for (var j = 0; j < arrData.length;) {

						for (var index in arrData[0]) {

							rows3[i][j] = arrData[i][index];
							j++;
						}
					}
				}
				doc.text("Billing Document", 7, doc.autoTableEndPosY() + 10);
				doc.autoTable(columns3, rows3, {
					startY: doc.autoTableEndPosY() + 15,
					margin: {
						horizontal: 7
					},
					styles: {
						columnWidth: 'wrap'
					},
					columnStyles: {
						text: {
							columnWidth: 'auto'
						}
					}
				});
				//To get the OpenBillingDocuments 
				JSONData = OpenBillingDocuments.OpenBillingDocuments;
				arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				var columns4 = new Array;
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					columns4.push(index);
				}
				var rows4 = new Array;
				console.log(arrData);
				for (var i = 0; i < arrData.length; i++) {
					rows4[i] = new Array;

					for (var j = 0; j < arrData.length;) {

						for (var index in arrData[0]) {

							rows4[i][j] = arrData[i][index];
							j++;
						}
					}
				}
				doc.text("Open Billing Documents", 7, doc.autoTableEndPosY() + 10);
				doc.autoTable(columns4, rows4, {
					startY: doc.autoTableEndPosY() + 15,
					margin: {
						horizontal: 7
					},
					styles: {
						columnWidth: 'wrap'
					},
					columnStyles: {
						text: {
							columnWidth: 'auto'
						}
					}
				});
				//To get the openQuotations 
				JSONData = openQuotations.openQuotations;
				arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				var columns6 = new Array;
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					columns6.push(index);
				}
				var rows6 = new Array;
				console.log(arrData);
				for (var i = 0; i < arrData.length; i++) {
					rows6[i] = new Array;

					for (var j = 0; j < arrData.length;) {

						for (var index in arrData[0]) {

							rows6[i][j] = arrData[i][index];
							j++;
						}
					}
				}
				doc.text("Open Quotations", 7, doc.autoTableEndPosY() + 10);
				doc.autoTable(columns6, rows6, {
					startY: doc.autoTableEndPosY() + 15,
					margin: {
						horizontal: 7
					},
					styles: {
						columnWidth: 'wrap'
					},
					columnStyles: {
						text: {
							columnWidth: 'auto'
						}
					}
				});
				//To get the ContactPerson 
				JSONData = ContactPerson.ContactPerson;
				arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				var columns7 = new Array;
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					columns7.push(index);
				}
				var rows7 = new Array;
				console.log(arrData);
				for (var i = 0; i < arrData.length; i++) {
					rows7[i] = new Array;

					for (var j = 0; j < arrData.length;) {

						for (var index in arrData[0]) {

							rows7[i][j] = arrData[i][index];
							j++;
						}
					}
				}
				doc.text("Contact Person", 7, doc.autoTableEndPosY() + 10);
				doc.autoTable(columns7, rows7, {
					startY: doc.autoTableEndPosY() + 15,
					margin: {
						horizontal: 7
					},
					styles: {
						columnWidth: 'wrap'
					},
					columnStyles: {
						text: {
							columnWidth: 'auto'
						}
					}
				});
				//To get the SalesDocBlockedforBilling
				JSONData = SalesDocBlockedforBilling.SalesDocBlockedforBilling;
				arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				var columns8 = new Array;
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					columns8.push(index);
				}
				var rows8 = new Array;
				console.log(arrData);
				for (var i = 0; i < arrData.length; i++) {
					rows8[i] = new Array;

					for (var j = 0; j < arrData.length;) {

						for (var index in arrData[0]) {

							rows8[i][j] = arrData[i][index];
							j++;
						}
					}
				}
				doc.text("Sales Doc Blocked for Billing", 7, doc.autoTableEndPosY() + 10);
				doc.autoTable(columns8, rows8, {
					startY: doc.autoTableEndPosY() + 15,
					margin: {
						horizontal: 7
					},
					styles: {
						columnWidth: 'wrap'
					},
					columnStyles: {
						text: {
							columnWidth: 'auto'
						}
					}
				});
				var filename = 'Customer Factsheet ' + custnr + '-' + name + '.pdf';
				doc.save(filename);

			}
		});
	},
	/* bExport= */
	true);