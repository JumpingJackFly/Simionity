
/**
*
 */
function getOffresTabTitle(nbRes) {
	cr = "";
	if (nbRes <= 1)
		cr += nbRes + " " + _TAB_OFFRES_TITRE_SING;
	else
		cr += nbRes + " " + _TAB_OFFRES_TITRE_PLUR;	
	return 	cr; ;
}

/**
*
 */
function initStructure(pOptions) {
	// Créer le menu & tabs' (vides)
	var tabHeaderTargetDiv = document.getElementById('simio_result_details_tabs');
	tabHeaderTargetDiv.innerHTML = '';
	tabHeaderTargetDiv.innerHTML += '<li class="nav-item"><a id="' + _OFFRES_MENU_ITEM + '" class="nav-link active" role="tab" data-toggle="tab" href="#' + _TAB_OFFRES_ID + '">' + getOffresTabTitle(0) + '</a></li>';
	
	if (pOptions[_OPTION_LA_CARTE] === true)	
		tabHeaderTargetDiv.innerHTML += '<li class="nav-item"><a id="' + _CARTE_MENU_ITEM + '" class="nav-link" role="tab" data-toggle="tab" href="#' + _TAB_CARTE_ID + '">' + 'Carte des Stations' + '</a></li>';

	// Init contenu des tabs (vide)
	var tabContentTargetDiv = document.getElementById('simio_result_details_tabs-content');
	tabContentTargetDiv.innerHTML = '';

	// Créer le container pour le premier tab avec table vide
	var htmlTabContent = '<div class="tab-pane container active" id="' + _TAB_OFFRES_ID + '" display:inline-block >';
	htmlTabContent += '<div class="bottom-buffer"><table id="' 
						+ _TABLE_DETAILS_OFFRES_ID 
						+ '" data-show-export="true" data-search="true" data-show-footer="true" data-footer-style="simTabFooterStyler"></table>';			
	htmlTabContent += '</div>';
	htmlTabContent += '</div>';
	
	if (pOptions[_OPTION_LA_CARTE] === true) {
		htmlTabContent += '<div class="tab-pane container" id="' + _TAB_CARTE_ID + '" >';
		htmlTabContent += '<div class="col-sm-12">';		
		htmlTabContent += '<iframe src="https://www.google.com/maps/d/embed?mid=1Di2pheZgnNojK5WxfT-D40dyAuKRvO5L&hl=fr&ehbc=2E312F&callback=initGMap" width="100%" height="800"></iframe>';
	    htmlTabContent += '</div>';
		htmlTabContent += '</div>';		
	}	
	
	tabContentTargetDiv.innerHTML += htmlTabContent;
}

function isOperateurIncluded(pOpName, pFiltres) {
	var isIn = true;
	
	// If at least 1 filter to check
	if (pFiltres.length > 0) {
		if (pOpName !== "") {
			isIn = pFiltres.includes(pOpName);
		} 
	}
	
	//console.log("isOperateurIncluded(" + pOpName + ", " + aFiltresOperateurs + ") = " + isIn);
	
	return (isIn);
}

/**
*
 */
function fillTableAbo(pOptions, pData)  {

	VUE_DETAILLEE = pOptions[_OPTION_DETAILS];
	var headerInfoNbTotCol = 0;
		headerAboNbTotCol = 0,
		headerForfaitNbTotCol = 0,
		headerSimNbTotCol = 0,
		fRistourneMaingau = parseFloat(pOptions[_OPTION_BONUS_MAINGAU] * 0.08),
		fRistourneCMH = parseFloat(pOptions[_OPTION_BONUS_CMH]),
		fRistourneELECTRO = parseFloat(pOptions[_OPTION_BONUS_ELECTRO]),
		fRistourneELLI = parseFloat(pOptions[_OPTION_BONUS_ELLI]),
		aFiltresOperateurs = pOptions[_OPTION_FILTRES_OP];
	
	var tableColumns = [{'field': _SIMTAB_COLUMN_ID_POSITION_ 
						, 'title':'Rang'
						, 'align':'center'
						, 'falign': 'center'
						, 'halign':'center'
						, 'sortable' : true
						}];
	headerInfoNbTotCol++;
	
	if (VUE_DETAILLEE === true) {
		tableColumns = tableColumns.concat([
						{'field': _SIMTAB_COLUMN_ID_PRESTATAIRE_ 
						, 'title':'Fournisseur'
						, 'align':'center'
						, 'falign': 'center'
						, 'halign':'center'
						, 'sortable' : true
						}]);
		headerInfoNbTotCol++;
	}
	
	tableColumns = tableColumns.concat([
						{ 'field':_SIMTAB_COLUMN_ID_OFFRE
						, 'title':'Formule - Bornes'
						, 'align':'left'
						, 'falign': 'right'
						, 'halign':'left'
						, 'sortable' : true
						}
						,{ 'field':_SIMTAB_COLUMN_ID_PRICE_KWH
						, 'title':'Prix kWh'
						, 'align':'left'
						, 'falign': 'right'
						, 'halign':'left'
						, 'sortable' : true
						}
						,{ 'field':_SIMTAB_COLUMN_ID_PRICE_MIN
						, 'title':'Prix Min'
						, 'align':'left'
						, 'falign': 'right'
						, 'halign':'left'
						, 'sortable' : true
						}]);
	headerInfoNbTotCol += 3
						
	if (pOptions[_OPTION_AVEC_ABO] === true) {
		tableColumns = tableColumns.concat([
							{ 'field':_SIMTAB_COLUMN_ID_SABO_PRICE_
							, 'title':'Prix'
							, 'align':'left'
							, 'falign': 'right'
							, 'halign':'left'
							, 'sortable' : true
							}]);
		headerAboNbTotCol++;
							
		if (VUE_DETAILLEE === true) {
			tableColumns = tableColumns.concat([				
							{ 'field':_SIMTAB_COLUMN_ID_SABO_PERIOD_
							, 'title':'Périodicité'
							, 'align':'left'
							, 'falign': 'right'
							, 'halign':'left'
							, 'sortable' : true
							}]);
			headerAboNbTotCol++;
			
			tableColumns = tableColumns.concat([				
							{ 'field':_SIMTAB_COLUMN_ID_SABO_ENGAG_MINI_
							, 'title':'Engagement'
							, 'align':'left'
							, 'falign': 'right'
							, 'halign':'left'
							, 'sortable' : true
							}]);
			headerAboNbTotCol++;
		}			
	}
	
	if (pOptions[_OPTION_AVEC_FORF] === true) {
		tableColumns = tableColumns.concat([
							{ 'field':_SIMTAB_COLUMN_ID_FORF_PRICE_
							, 'title':'Prix'
							, 'align':'left'
							, 'falign': 'right'
							, 'halign':'left'
							, 'sortable' : true
							}]);
		headerForfaitNbTotCol++;
							
		if (VUE_DETAILLEE === true) {
			tableColumns = tableColumns.concat([
							{ 'field':_SIMTAB_COLUMN_ID_FORF_PERIOD_
							, 'title':'Durée'
							, 'align':'left'
							, 'falign': 'right'
							, 'halign':'left'
							, 'sortable' : true
							}]);
			headerForfaitNbTotCol++;
		}	
		
		tableColumns = tableColumns.concat([
							{ 'field':_SIMTAB_COLUMN_ID_FORF_QTY_
							, 'title':'Qté'
							, 'align':'left'
							, 'falign': 'right'
							, 'halign':'left'
							, 'sortable' : true
							}]);
		headerForfaitNbTotCol++;
	}
						
						
	if (VUE_DETAILLEE === true) {
		tableColumns = tableColumns.concat([
						{ 'field': _SIMTAB_COLUMN_ID_SIM_TOT_KM_
						, 'title':'Km'
						, 'align':'left'
						, 'falign': 'right'
						, 'halign':'left'
						, 'sortable' : true
						}]);
		headerSimNbTotCol++;
	}

	tableColumns = tableColumns.concat([
					{ 'field': _SIMTAB_COLUMN_ID_SIM_TOT_KHW_
					, 'title':'kWh'
					, 'align':'left'
					, 'falign': 'right'
					, 'halign':'left'
					, 'sortable' : true
					}]);
	headerSimNbTotCol++;
						
	if (VUE_DETAILLEE === true) {
		if (pOptions[_OPTION_AVEC_FORF] === true) {
			tableColumns = tableColumns.concat([						
							{ 'field':_SIMTAB_COLUMN_ID_SIM_NB_FORFAITS_
							, 'title':'Nb forfaits'
							, 'align':'left'
							, 'falign': 'right'
							, 'halign':'left'
							, 'sortable' : true
							}]);
			headerSimNbTotCol++;
		}
	}
		
	if (pOptions[_OPTION_AVEC_ABO] === true) {
		tableColumns = tableColumns.concat([						
						{ 'field':_SIMTAB_COLUMN_ID_SIM_TOT_ABO_
						, 'title':'€ Abo'
						, 'align':'left'
						, 'falign': 'right'
						, 'halign':'left'
						, 'sortable' : true
						}]);
		headerSimNbTotCol++;

		tableColumns = tableColumns.concat([						
							{ 'field':_SIMTAB_COLUMN_ID_SIM_TOT_RECHARGE_
							, 'title':'€ Recharge'
							, 'align':'left'
							, 'falign': 'right'
							, 'halign':'left'
							, 'sortable' : true
							}]);						
		headerSimNbTotCol++;
	}
						
	if ((fRistourneMaingau > 0.0) || (fRistourneCMH > 0.0) 
		|| (fRistourneELLI > 0.0) || (fRistourneELECTRO > 0.0))  {
		
		if (VUE_DETAILLEE === true) {
			tableColumns = tableColumns.concat([						
							{ 'field':_SIMTAB_COLUMN_ID_SIM_RISTOURNE_
							, 'title':'Ristourne'
							, 'align':'left'
							, 'falign': 'right'
							, 'halign':'left'
							, 'sortable' : true
							}]);						
	
			headerSimNbTotCol += 1;			
		}
	}

	tableColumns = tableColumns.concat([						
						{ 'field':_SIMTAB_COLUMN_ID_SIM_TOT_COUT_
						, 'title':'€ Total'
						, 'align':'left'
						, 'falign': 'right'
						, 'halign':'left'
						, 'sortable' : true
						}]);						
	headerSimNbTotCol++;

	if (VUE_DETAILLEE === true) {
		tableColumns = tableColumns.concat([						
						{ 'field':_SIMTAB_COLUMN_ID_SIM_COUT_100KM_
						, 'title':'€/100 km'
						, 'align':'left'
						, 'falign': 'right'
						, 'halign':'left'
						, 'sortable' : true
						},
						{ 'field':_SIMTAB_COLUMN_ID_SIM_COUT_KWH_
						, 'title':'€/kWh'
						, 'align':'left'
						, 'falign': 'right'
						, 'halign':'left'
						, 'sortable' : true
						}]);
		headerSimNbTotCol += 2;
	}
			
	var tableHeader = [{ 'field': _SIMTAB_COLUMN_ID_HINFO_
						, 'title': 'OFFRES' + '<br/>' + '(Tarifs au ' + new Date().toLocaleDateString("fr-FR") + ')'
						, 'colspan': headerInfoNbTotCol
						, 'align': 'center'
						, 'valign': 'middle'
						}];
						
	if (pOptions[_OPTION_AVEC_ABO] === true) {
		tableHeader = tableHeader.concat([					
						{ 'field': _SIMTAB_COLUMN_ID_HABO_
						, 'title': 'ABO'
						, 'colspan': headerAboNbTotCol
						, 'align': 'center'
						, 'valign': 'middle'
						}]);
	}
	
	if (pOptions[_OPTION_AVEC_FORF] === true) {
		tableHeader = tableHeader.concat([					
						{ 'field': _SIMTAB_COLUMN_ID_HFORFAIT_
						, 'title': 'FORFAIT'
						, 'colspan': headerForfaitNbTotCol
						, 'align': 'center'
						, 'valign': 'middle'
						}]);					
	}

	tableHeader = tableHeader.concat([					
						{ 'field': _SIMTAB_COLUMN_ID_HSIMU_
						, 'title': 'SIMULATEUR'
						, 'colspan': headerSimNbTotCol
						, 'align': 'center'
						, 'valign': 'middle'
						}]);

	var tableData = [],
		leBonPays = [],
		notes = []; 
		
	// Pré-rempli liste des notes avec notes statiques
	notes[0] = {"code": "RenewAuto", "label" : "Attention ces forfaits se renouvellent automatiquement en fin d'échéance (voir périodicité). Pensez à repasser à la formule 'pay per use' une fois le(s) forfait(s) consommé(s) afin le pas être réfacturé inutilement."};
	notes[1] = {"code": "VariationLocale", "label" : "Prix moyen. Ces tarifs peuvent varier légèrement d'une station à l'autre au sein du même pays, en fonction de promotions ponctuelles et des taxes locales."};	
	notes[2] = {"code": "Devise", "label" : "Les prix peuvent légèrement varier en fonction du taux de conversion Devise - Euro."};	
	
	// Sélectionne les offres du bon pays
	for (var unPays of pData['Pays']) {
		if (unPays['Code'] === pOptions[_OPTION_PAYS]) {
			leBonPays = unPays;
			break;	
		}
	}
	
	if ((leBonPays['Offres']) && (leBonPays['Offres'].length > 0)) {
		for (var unPrestataire of leBonPays['Offres']) {
			var partName = unPrestataire['Fournisseur'];
	
			for (var uneOffre of unPrestataire['Formules']) {

				// Filtre l'offre en fonction des paramètres de simulation
				var offreOK = true;
				if ((uneOffre['PrixAbo']) && (pOptions[_OPTION_AVEC_ABO] === false))
					offreOK = false;					
				else if ((uneOffre['PrixForfait']) && (pOptions[_OPTION_AVEC_FORF] === false))
					offreOK = false;
				else if (isOperateurIncluded (uneOffre['Operateur'], aFiltresOperateurs) == false)
					offreOK = false;
					
				if (offreOK === true) {
					var rowData = {},
						totalKm = parseFloat(pOptions[_OPTION_KMS]),
						totKWhConso = parseFloat(pOptions[_OPTION_KMS]) / 100.0 * parseFloat(pOptions[_OPTIONS_CONSO])
						coutRecharge = 0.0,
						coutTotal = 0.0,
						coutMinutes = 0.0;
					
					var today = new Date();
					if (uneOffre['DateFin']) {
						var dateFinOffre = getFRDate(uneOffre['DateFin']);
						uneOffre['Status'] = (dateFinOffre < today) ? "Past" : "Expire";	
						uneOffre['StatusDate'] = uneOffre['DateFin'];							
					}
					else if (uneOffre['DateDebut']) {
						var dateDebutOffre = getFRDate(uneOffre['DateDebut']);
						uneOffre['Status'] = (dateDebutOffre >= today) ? "Future" : "Active";														
						uneOffre['StatusDate'] = uneOffre['DateDebut'];							
					}
					else
						uneOffre['Status'] = "Active";
					
					// Si offre à afficher (en fonction des options)
					var offreAafficher = false;
					switch (uneOffre['Status']) {
						case 'Past':
							if (pOptions[_OPTION_PASSE_FUTURE] === true)
								offreAafficher = true; 
							break;						
						case 'Active':
						case 'Expire':
						case 'Future':
							offreAafficher = true;
							break;						
						default:
							offreAafficher = false;
							break;
					}
										
					if (offreAafficher === true) {
						var offreLabel = "",
							prestaUrl = (uneOffre['Status'] !== "Past") ? ('<a class="' + uneOffre['Status'] + 'HiddenLink" href="' + unPrestataire['Url'] + '" target="_blank">' + partName + '<a>') : partName,
							offreUrl = (uneOffre['Status'] !== "Past") ? ('<a class="' + uneOffre['Status'] + 'HiddenLink" href="' + unPrestataire['Url'] + '" target="_blank">' + uneOffre['Offre'] + '<a>') : uneOffre['Offre'];
							
						if (VUE_DETAILLEE === true) {
							rowData[_SIMTAB_COLUMN_ID_PRESTATAIRE_] = prestaUrl;				
							offreLabel = offreUrl;
						} else {
							offreLabel = prestaUrl + " - " + offreUrl;				
						}
		
						if ((uneOffre['RenewAuto']) && (uneOffre['RenewAuto'] === 'Yes')) {
							var noteIndex = getIndexNote(notes, 'RenewAuto') + 1;
							offreLabel += '<span class="noteAsterisque"> <sup>(' + noteIndex + ')</sup></span>';						
						}
		
						if ((uneOffre['VariationLocale']) && (uneOffre['VariationLocale'] === 'Yes')) {
							var noteIndex = getIndexNote(notes, 'VariationLocale') + 1;
							offreLabel += '<span class="noteAsterisque"> <sup>(' + noteIndex + ')</sup></span>';						
						}
		
						if (unPrestataire['Devise']) {
							var noteIndex = getIndexNote(notes, 'Devise') + 1;
							offreLabel += '<span class="noteAsterisque"> <sup>(' + noteIndex + ')</sup></span>';						
						}
	
						if (uneOffre['Status'] !== 'Active') {
							var noteCode = uneOffre['Status'] + '-' + uneOffre['StatusDate'],
								noteLabel = '',
								noteIndex = getIndexNote(notes, noteCode) + 1;					
							if (noteIndex < 0) {
								switch (uneOffre['Status']) {
									case 'Past':
										noteLabel = "Offre expirée depuis le " + uneOffre['StatusDate'];
										break;
									case 'Expire':
										noteLabel = "Offre valable uniquement jusqu'au " + uneOffre['StatusDate'];
										break;
									case 'Future':
										noteLabel = "Offre valable à partir de " + uneOffre['StatusDate'];
										break;
									default:
										noteLabel = "Attention date limite - " + noteCode;
										break;
								} 
								notes[notes.length] = {"code": noteCode, "label" : noteLabel};
								noteIndex = notes.length;
							}
							offreLabel += '<span class="noteAsterisque"> <sup>(' + noteIndex + ')</sup></span>';						
						}
	
						if (uneOffre['PreavisResil']) {
							var noteCode = 'PreavisResil' + '-' + uneOffre['PreavisResil'],
								noteIndex = getIndexNote(notes, noteCode) + 1,						
								noteLabel = 'Préavis de résiliation : ' + uneOffre['PreavisResil'] + ' mois';
							if (noteIndex < 0) {
								notes[notes.length] = {"code": noteCode, "label" : noteLabel};
								noteIndex = notes.length;
							}
							offreLabel += '<span class="noteAsterisque"> <sup>(' + noteIndex + ')</sup></span>';						
						}

						if (uneOffre['PromoFin']) {
							var noteCode = 'PromoFin' + '-' + uneOffre['PromoFin'],
								noteIndex = getIndexNote(notes, noteCode) + 1,						
								noteLabel = 'Pour toute souscription effectuée avant le ' + uneOffre['PromoFin'] + " et jusqu'à l'échéance de renouvellement (habituellement 1 an)";
							if (noteIndex < 0) {
								notes[notes.length] = {"code": noteCode, "label" : noteLabel};
								noteIndex = notes.length;
							}
							offreLabel += '<span class="noteAsterisque"> <sup>(' + noteIndex + ')</sup></span>';						
						}
						
						rowData[_SIMTAB_COLUMN_ID_OFFRE] = offreLabel;
		
						if (VUE_DETAILLEE === true) {
							rowData[_SIMTAB_COLUMN_ID_SIM_TOT_KM_] = totalKm + ' km';
						}
	
						rowData[_SIMTAB_COLUMN_ID_SIM_TOT_KHW_] = totKWhConso + ' kWh';				
						
						// Cout "per use"
						if (uneOffre['PrixKwh']) {
							coutRecharge = parseFloat(uneOffre['PrixKwh']) * totKWhConso;
							coutTotal = coutRecharge;
							rowData[_SIMTAB_COLUMN_ID_PRICE_KWH] = euroFormatter(uneOffre['PrixKwh']);		
						}
						
						// Cout abonnement 
						if (uneOffre['PrixAbo']) {
							if (VUE_DETAILLEE === true) {
								rowData[_SIMTAB_COLUMN_ID_SABO_PRICE_] = euroFormatter(uneOffre['PrixAbo']);	
								rowData[_SIMTAB_COLUMN_ID_SABO_ENGAG_MINI_] = uneOffre['EngagementMini'] + ' mois';									
								if (parseFloat(uneOffre['PeriodeAbo']) === 1)
									rowData[_SIMTAB_COLUMN_ID_SABO_PERIOD_] = 'Mensuelle';							
								else if (parseFloat(uneOffre['PeriodeAbo']) === 12)
									rowData[_SIMTAB_COLUMN_ID_SABO_PERIOD_] = 'Annuelle';							
								else
									rowData[_SIMTAB_COLUMN_ID_SABO_PERIOD_] = uneOffre['PeriodeAbo'] + ' mois';							
							} else {
								var strAboPriceCompil = euroFormatter(uneOffre['PrixAbo']) + ' / ';
								if (parseFloat(uneOffre['PeriodeAbo']) === 1)
									 strAboPriceCompil += ' mois'
								else if (parseFloat(uneOffre['PeriodeAbo']) === 12)
									 strAboPriceCompil += ' an'
								else
									 strAboPriceCompil += uneOffre['PeriodeAbo'] + ' mois'
								rowData[_SIMTAB_COLUMN_ID_SABO_PRICE_] = strAboPriceCompil;		
							}
							
							var nbMensualites = (parseFloat(pOptions[_OPTION_DUREE]) <= parseFloat(uneOffre['EngagementMini'])) 
										? parseFloat(uneOffre['EngagementMini']) 
										: Math.ceil(parseFloat(pOptions[_OPTION_DUREE]) / parseFloat(uneOffre['EngagementMini'])) * parseFloat(uneOffre['EngagementMini']);
										;	
																				
							var totAbo = nbMensualites / parseFloat(uneOffre['PeriodeAbo']) * parseFloat(uneOffre['PrixAbo']);
			
							rowData[_SIMTAB_COLUMN_ID_SIM_TOT_ABO_] = euroFormatter(totAbo);					
							if (uneOffre['PrixKwh']) {
								rowData[_SIMTAB_COLUMN_ID_PRICE_KWH] = euroFormatter(uneOffre['PrixKwh']);
								coutRecharge = parseFloat(uneOffre['PrixKwh']) * totKWhConso;				
								coutTotal = coutRecharge + totAbo;			
							} else {
								//rowData[_SIMTAB_COLUMN_ID_PRICE_KWH] = euroFormatter(uneOffre['PrixKwh']);
								coutRecharge = 0.0;				
								coutTotal = totAbo;			
							}
						}
			
						// Cout forfait
						if (uneOffre['PrixForfait']) {
							if (VUE_DETAILLEE === true) {
								rowData[_SIMTAB_COLUMN_ID_FORF_PRICE_] = euroFormatter(uneOffre['PrixForfait']);	
								rowData[_SIMTAB_COLUMN_ID_FORF_PERIOD_] = uneOffre['PeriodeForfait'] + ' mois';	
							} else {
								var strForfaitPriceCompil = euroFormatter(uneOffre['PrixForfait']) + ' / ';
								if (parseFloat(uneOffre['PeriodeForfait']) === 1.0)
									 strForfaitPriceCompil += ' mois'
								else
									 strForfaitPriceCompil += uneOffre['PeriodeForfait'] + ' mois'					
								rowData[_SIMTAB_COLUMN_ID_FORF_PRICE_] =  strForfaitPriceCompil;
							}
			
							rowData[_SIMTAB_COLUMN_ID_FORF_QTY_] = uneOffre['QteForfaitKwh'] + 'kWh';	
							rowData[_SIMTAB_COLUMN_ID_PRICE_KWH] = euroFormatter( parseFloat(uneOffre['PrixForfait']) / parseFloat(uneOffre['QteForfaitKwh']) );
			
							var nbForfait = Math.ceil( totKWhConso / parseFloat(uneOffre['QteForfaitKwh']) );
							coutRecharge = nbForfait * parseFloat(uneOffre['PrixForfait']);
							coutTotal = coutRecharge;
							
							if (VUE_DETAILLEE === true)
								rowData[_SIMTAB_COLUMN_ID_SIM_NB_FORFAITS_] = nbForfait;
						}
			
						// Cout à la minute
						if (uneOffre['PrixMin']) {
							prixMinute = parseFloat(uneOffre['PrixMin']);
							rowData[_SIMTAB_COLUMN_ID_PRICE_MIN] = euroFormatter(uneOffre['PrixMin']);			
							coutMinutes = totKWhConso / parseFloat(pOptions[_OPTION_PUISSANCE]) * 60 * prixMinute;
							coutRecharge += coutMinutes;
							coutTotal += coutMinutes;
						}
						
						// Ristournes
						if ((partName === 'Maingau') && (fRistourneMaingau > 0.0)) {
							rowData[_SIMTAB_COLUMN_ID_SIM_RISTOURNE_] = euroFormatter(Math.abs(fRistourneMaingau) * -1);		
							coutTotal -= fRistourneMaingau;
						}
						else if ((partName === 'CMH') && (fRistourneCMH > 0.0)) {
							rowData[_SIMTAB_COLUMN_ID_SIM_RISTOURNE_] = euroFormatter(Math.abs(fRistourneCMH) * -1);									
							coutTotal -= fRistourneCMH;
						}
						else if ((partName === 'Electroverse') && (fRistourneELECTRO > 0.0)) {
							rowData[_SIMTAB_COLUMN_ID_SIM_RISTOURNE_] = euroFormatter(Math.abs(fRistourneELECTRO) * -1);									
							coutTotal -= fRistourneELECTRO;
						}
						else if ((partName === 'Elli') && (fRistourneELLI > 0.0)) {
							rowData[_SIMTAB_COLUMN_ID_SIM_RISTOURNE_] = euroFormatter(Math.abs(fRistourneELLI) * -1);									
							coutTotal -= fRistourneELLI;
						}
						
						// Controle passage possible en négatif avec le jeu des ristournes
						coutTotal = (coutTotal < 0.0) ? 0.0 : coutTotal;
							
						// Totaux
						rowData[_SIMTAB_COLUMN_ID_SIM_TOT_RECHARGE_] = euroFormatter(coutRecharge);	
						rowData[_SIMTAB_COLUMN_ID_SIM_TOT_COUT_] = euroFormatter(coutTotal);
			
						// Cout / 100 km
						if (VUE_DETAILLEE === true) {
							rowData[_SIMTAB_COLUMN_ID_SIM_COUT_100KM_] = euroFormatter(coutTotal / totalKm * 100);
							rowData[_SIMTAB_COLUMN_ID_SIM_COUT_KWH_] = euroFormatter((coutTotal / totKWhConso), 3);
						}
						
						// offre dispo ou historique (invisible mais présent pour le styler)
						rowData[_SIMTAB_COLUMN_ID_OFFRE_STATUS_] = uneOffre['Status'];
											
						tableData.push(rowData);	
					}
							
				} // Offre selectionnée
				
			} // Pour chaque offre
		} // Pour chaque prestataire
	} // if nb offres > 0
	
	// Ajout de la position dans le "classement"
	tableData.sort(function(a, b) {
		var cr = 0;
		var va = parseFloat(deviseUnformatter(a[_SIMTAB_COLUMN_ID_SIM_TOT_COUT_]));
		var vb = parseFloat(deviseUnformatter(b[_SIMTAB_COLUMN_ID_SIM_TOT_COUT_]));
		if (va < vb) // Compare years first, then months
			cr = -1;
		else 
			cr = 1;
		return (cr);
	});
	for (var i = 0; i < tableData.length; i++) {
		tableData[i][_SIMTAB_COLUMN_ID_POSITION_] = i+1;
	}				
		
	// Hydrate la table avec les données (header + data)
	$('#' + _TABLE_DETAILS_OFFRES_ID).bootstrapTable({'columns': [tableHeader, tableColumns]
									, 'headerStyle' : simHeaderStyler 
									, 'sortable' : true
									, 'sortName' : _SIMTAB_COLUMN_ID_SIM_TOT_COUT_
									, 'sortOrder' : 'asc'
									, 'customSort' : simTableCustomSorter
									, 'rowStyle' : simIssueRowStyler
									, 'stickyHeader' : true
									, 'pagination': 'true'
									, 'pageList' : '[5, 10, 25, 50, All]'
									, 'pageSize' : '10'
									, 'stickyHeaderOffsetLeft' : parseInt($('body').css('padding-left'), 10)
									, 'stickyHeaderOffsetRight': parseInt($('body').css('padding-right'), 10)
									, 'data': tableData
									});
							
	// Mets à jour le titre avec le nombre d'offres affichées.			
	document.getElementById(_OFFRES_MENU_ITEM).innerHTML = getOffresTabTitle(tableData.length);
	
	// Liste les notes de bas de page
	var notesTargetDiv = document.getElementById('simio_result_notes_div');
	notesTargetDiv.innerHTML = '';
	for (var i = 0 ; i < notes.length ; i++) {
		notesTargetDiv.innerHTML += '<p><span class="noteAsterisque"><sup>' + '(' + (i+1) + ')' + '</sup></span> ' + notes[i].label + '</p>';		
	}
}

/**
*
 */
function toggleResultatsDivs(show) {
	if (show === true) 	{
		$("#simio_result_details_div").show();	
		$("#simio_result_notes_div").show();
		// If filter saved, restor & apply it
		$('#' + _TABLE_DETAILS_OFFRES_ID).bootstrapTable('resetSearch', CACHED_FILTER);		
	} else {
		// if filter present, save it for later
		filter = $('.search-input').val();	
		CACHED_FILTER = (typeof filter !== 'undefined') ? filter : "";			
		$("#simio_result_details_div").hide();
		$("#simio_result_notes_div").hide();	
	}
}

/**
*
 */
function runSimulation(pOptions, pData) {
	initStructure(pOptions);
	fillTableAbo(pOptions, pData);
	toggleResultatsDivs(true);		
}

/**
*
 */
function saveOptions() {

	// Récupère les valeur du formulaire		
	var conso = $('#simio_conso').val(),
		dist = $('#simio_kms').val(),
		duree = $('#simio_duree').val(),
		puis = $('#simio_puissance').val(),
		details = $('#simio_details').is(":checked"),
		avecabo = $('#simio_avec_abo').is(":checked"),
		avecforfait = $('#simio_avec_forfait').is(":checked"),
		pays = $('#simio_pays').find(":selected").val(),
		offpassefutur = $('#simio_avec_pastfuture').is(":checked"),
		bmaingau = $('#simio_bmaingau').val(),
		bcmh = $('#simio_bcmh').val(),
		belectro = $('#simio_electro').val(),
		belli = $('#simio_belli').val(),
		filtre_op_ionity = $("#filtre_op_ionity").prop('checked'),
		filtre_op_iecharge = $("#filtre_op_iecharge").prop('checked'),
		filtre_op_fastned = $("#filtre_op_fastned").prop('checked'),
		//filtre_op_tesla = $("#filtre_op_tesla").prop('checked'),
		filtre_op_totalenergies = $("#filtre_op_totalenergies").prop('checked');

	// Valeurs par défaut si param optionels pas saisis	
	bmaingau = (bmaingau !== '') ? bmaingau : 0;
	bcmh = (bcmh !== '') ? bcmh : 0;
	belectro = (belectro !== '') ? belectro : 0;
	belli = (belli !== '') ? belli : 0;

	// Sauve les données dans la session
	setDataInCache(_OPTION_PAYS, pays, _USE_COOOKIE);
	setDataInCache(_OPTION_KMS, dist, _USE_COOOKIE);
	setDataInCache(_OPTION_DUREE, duree, _USE_COOOKIE);
	setDataInCache(_OPTIONS_CONSO, conso, _USE_COOOKIE);
	setDataInCache(_OPTION_PUISSANCE, puis, _USE_COOOKIE);
	setDataInCache(_OPTION_AVEC_ABO, avecabo, _USE_COOOKIE);
	setDataInCache(_OPTION_AVEC_FORF, avecforfait, _USE_COOOKIE);
	setDataInCache(_OPTION_DETAILS, details, _USE_COOOKIE);
	setDataInCache(_OPTION_PASSE_FUTURE, offpassefutur, _USE_COOOKIE);
	setDataInCache(_OPTION_BONUS_MAINGAU, bmaingau, _USE_COOOKIE);
	setDataInCache(_OPTION_BONUS_CMH, bcmh, _USE_COOOKIE);
	setDataInCache(_OPTION_BONUS_ELECTRO, belectro, _USE_COOOKIE);
	setDataInCache(_OPTION_BONUS_ELLI, belli, _USE_COOOKIE);
	setDataInCache(_OPTION_FILTRE_IONITY, filtre_op_ionity, _USE_COOOKIE);
	setDataInCache(_OPTION_FILTRE_IECHARGE, filtre_op_iecharge, _USE_COOOKIE);
	setDataInCache(_OPTION_FILTRE_FASTNED, filtre_op_fastned, _USE_COOOKIE);
	//setDataInCache(_OPTION_FILTRE_TESLA, filtre_op_tesla, _USE_COOOKIE);
	setDataInCache(_OPTION_FILTRE_TOTALENERGIES, filtre_op_totalenergies, _USE_COOOKIE);
		
	// Compile les valeurs pour usage future					
	var options = {};
	options[_OPTION_LA_CARTE] = false;
	options[_OPTION_PAYS] = pays;
	options[_OPTION_KMS] = dist;
	options[_OPTION_DUREE] = duree;
	options[_OPTIONS_CONSO] = conso;
	options[_OPTION_PUISSANCE] = puis;
	options[_OPTION_AVEC_ABO] = avecabo;
	options[_OPTION_AVEC_FORF] = avecforfait;
	options[_OPTION_DETAILS] = details;
	options[_OPTION_PASSE_FUTURE] = offpassefutur;
	options[_OPTION_BONUS_MAINGAU] = bmaingau;
	options[_OPTION_BONUS_CMH] = bcmh;
	options[_OPTION_BONUS_ELECTRO] = belectro;
	options[_OPTION_BONUS_ELLI] = belli;
	
	options[_OPTION_FILTRES_OP] = [];
	if (filtre_op_ionity == true)
		options[_OPTION_FILTRES_OP].push($("#filtre_op_ionity").val());
	if (filtre_op_iecharge == true)
		options[_OPTION_FILTRES_OP].push($("#filtre_op_iecharge").val());
	if (filtre_op_fastned == true)
		options[_OPTION_FILTRES_OP].push($("#filtre_op_fastned").val());
	//if (filtre_op_tesla == true)
	//	options[_OPTION_FILTRES_OP].push($("#filtre_op_tesla").val());
	if (filtre_op_totalenergies == true)
		options[_OPTION_FILTRES_OP].push($("#filtre_op_totalenergies").val());
		
	return options;
}

/**
*
 */
function loadOptions() {
	// récupération des données depuis la session (si présentes)
	var conso = getDataFromCache(_OPTIONS_CONSO, _USE_COOOKIE),
		dist = getDataFromCache(_OPTION_KMS, _USE_COOOKIE),
		duree = getDataFromCache(_OPTION_DUREE, _USE_COOOKIE),
		puis = getDataFromCache(_OPTION_PUISSANCE, _USE_COOOKIE),
		details = getDataFromCache(_OPTION_DETAILS, _USE_COOOKIE),
		pays = getDataFromCache(_OPTION_PAYS, _USE_COOOKIE),
		avecabo = getDataFromCache(_OPTION_AVEC_ABO, _USE_COOOKIE),
		avecforfait = getDataFromCache(_OPTION_AVEC_FORF, _USE_COOOKIE),
		offpassefutur = getDataFromCache(_OPTION_PASSE_FUTURE, _USE_COOOKIE),
		bmaingau = getDataFromCache(_OPTION_BONUS_MAINGAU, _USE_COOOKIE),
		bcmh = getDataFromCache(_OPTION_BONUS_CMH, _USE_COOOKIE),
		belectro = getDataFromCache(_OPTION_BONUS_ELECTRO, _USE_COOOKIE),
		belli = getDataFromCache(_OPTION_BONUS_ELLI, _USE_COOOKIE),
		filtre_op_ionity = getDataFromCache(_OPTION_FILTRE_IONITY, _USE_COOOKIE),
		filtre_op_iecharge = getDataFromCache(_OPTION_FILTRE_IECHARGE, _USE_COOOKIE),
		filtre_op_fastned = getDataFromCache(_OPTION_FILTRE_FASTNED, _USE_COOOKIE),
		//filtre_op_tesla = getDataFromCache(_OPTION_FILTRE_TESLA, _USE_COOOKIE),
		filtre_op_totalenergies = getDataFromCache(_OPTION_FILTRE_TOTALENERGIES, _USE_COOOKIE);
	
	// Rempli le formulaire avec les données			
	if (conso != null)
		$('#simio_conso').val(conso);
	if (dist != null)
		$('#simio_kms').val(dist);
	if (duree != null)
		$('#simio_duree').val(duree);
	if (puis != null)
		$('#simio_puissance').val(puis);
	if (details != null)
		$('#simio_details').prop('checked', (details === 'true'));
	if (pays != null)
		$("#simio_pays option[value=" + pays + "]").attr('selected', 'selected');
	if (avecabo != null)
		$('#simio_avec_abo').prop('checked', (avecabo === 'true'));
	if (avecforfait != null)
		$('#simio_avec_forfait').prop('checked', (avecforfait === 'true'));
	if (offpassefutur != null)
		$('#simio_avec_pastfuture').prop('checked', (offpassefutur === 'true'));

	if (bmaingau != null)
		$('#simio_bmaingau').val(bmaingau);
	if (bcmh != null)
		$('#simio_bcmh').val(bcmh);
	if (belectro != null)
		$('#simio_electro').val(belectro);
	if (belli != null)
		$('#simio_belli').val(belli);

	$("#filtre_op_ionity" ).prop( "checked", filtre_op_ionity==="true");
	$("#filtre_op_iecharge" ).prop( "checked", filtre_op_iecharge==="true");	
	$("#filtre_op_fastned" ).prop( "checked", filtre_op_fastned==="true");	
	//$("#filtre_op_tesla" ).prop( "checked", filtre_op_tesla==="true");	
	$("#filtre_op_totalenergies" ).prop( "checked", filtre_op_totalenergies==="true");	
}

/**
* Callback Carte GMAP
 */
function initGMap() {	
}

/**
*
 */
$("#simio_form :input").change(function() {
	toggleResultatsDivs(false);		
});
 
/**
 * Une fois que la page est chargée complètement
 */

jQuery(window).on('load', function() {
	
	// Recharge les derniers paramètres sauvés
    try {
   		loadOptions();
    } catch (e) {
		showError(e, "danger", _DELAY_DISPLAY_ERROR_NOTIF);
   	}
			
	// Validation du formulaire
	$("#simio_form").on("submit", function(e) {
		var jOptions = {};
		
		e.preventDefault(); 
		toggleResultatsDivs(false);	
		jOptions = saveOptions();

		// Chargement du fichier de config des offres dispo
		fichierOffres = _SIMIONITY_CONFIG_FILE_ROOT + jOptions[_OPTION_PAYS] + _SIMIONITY_CONFIG_FILE_EXT;
		$.getJSON(fichierOffres, function(configData) {	
		    try {
				// Lance la simulation
				runSimulation(jOptions, configData);	
		    }
	    	catch (e) {
				showError(e, "danger", _DELAY_DISPLAY_ERROR_NOTIF);
	    	}
	    	    				
		}).fail(function() { 
			showError("Impossible de charger le fichier des offres (" + fichierOffres + ")", "danger", _DELAY_DISPLAY_ERROR_NOTIF);
		});
	}); 
});
  

