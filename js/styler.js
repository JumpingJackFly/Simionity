
/**
*
 */
function simHeaderStyler(column) {
	var hStyle = { classes: 'simHeaderColumnStyle'};
	return hStyle;
}

/**
*
 */
function simIssueRowStyler(row, index) {
	var rowStyle = row[_SIMTAB_COLUMN_ID_OFFRE_STATUS_] + 'RowStyle';
	return { classes: rowStyle };
}

/**
*
*/
function simTabFooterStyler (column) {
	var hStyle = { classes: 'simFooterColumnStyle'};
	return hStyle;
}

/**
*
*/
function simTableCustomSorter(columnID, sortOrder, data) {

	var order = (sortOrder === 'desc') ? -1 : 1;		
	
	switch(columnID) {	
		// Colonnes texte - tri A-Z
		case _SIMTAB_COLUMN_ID_PRESTATAIRE_ :
		case _SIMTAB_COLUMN_ID_OFFRE :
			data.sort(function (a, b) {				
				var cr = 0,
					aVal = a[columnID],
					bVal = b[columnID];
				if (aVal < bVal) {
					cr = order * -1;
				} else if (aVal > bVal) {
					cr = order;
				}
				return(cr);
			});
			break;

		// Colonnes durée
		case _SIMTAB_COLUMN_ID_SABO_PERIOD_:	
		case _SIMTAB_COLUMN_ID_SABO_ENGAG_MINI_:	
		case _SIMTAB_COLUMN_ID_FORF_PERIOD_:
			data.sort(function (a, b) {				
				var cr = 0,
					aVal = parseFloat((typeof a[columnID] !== 'undefined') ? a[columnID].replace('mois','') : '0');
					bVal = parseFloat((typeof b[columnID] !== 'undefined') ? b[columnID].replace('mois','') : '0');
				if (aVal < bVal) {
					cr = order * -1;
				} else if (aVal > bVal) {
					cr = order;
				}
				return(cr);
			});
			break;

		// Colonnes Prix - Tri €
		case _SIMTAB_COLUMN_ID_PRICE_KWH :
		case _SIMTAB_COLUMN_ID_PRICE_MIN:
		case _SIMTAB_COLUMN_ID_SABO_PRICE_:
		case _SIMTAB_COLUMN_ID_FORF_PRICE_:
		case _SIMTAB_COLUMN_ID_SIM_TOT_ABO_:
		case _SIMTAB_COLUMN_ID_SIM_TOT_RECHARGE_:
		case _SIMTAB_COLUMN_ID_SIM_TOT_COUT_:
		case _SIMTAB_COLUMN_ID_SIM_COUT_100KM_:
			data.sort(function (a, b) {
				var cr = 0,
					afloat = parseFloat(deviseUnformatter(a[columnID])),
					bfloat = parseFloat(deviseUnformatter(b[columnID]));
				if (afloat < bfloat) {
					cr = order * -1;
				} else if (afloat > bfloat) {
					cr = order;
				}
				return(cr);
			});
			break;

		// Colonnes kWh
		case _SIMTAB_COLUMN_ID_FORF_QTY_:
		case _SIMTAB_COLUMN_ID_SIM_TOT_KHW_:
			data.sort(function (a, b) {				
				var cr = 0,
					aVal = parseFloat((typeof a[columnID] !== 'undefined') ? a[columnID].replace('kWh','') : '0');
					bVal = parseFloat((typeof b[columnID] !== 'undefined') ? b[columnID].replace('kWh','') : '0');
				if (aVal < bVal) {
					cr = order * -1;
				} else if (aVal > bVal) {
					cr = order;
				}
				return(cr);
			});
			break;

		// Colonnes km
		case _SIMTAB_COLUMN_ID_SIM_TOT_KM_:
			data.sort(function (a, b) {				
				var cr = 0,
					aVal = parseFloat((typeof a[columnID] !== 'undefined') ? a[columnID].replace('km','') : '0');
					bVal = parseFloat((typeof b[columnID] !== 'undefined') ? b[columnID].replace('km','') : '0');
				if (aVal < bVal) {
					cr = order * -1;
				} else if (aVal > bVal) {
					cr = order;
				}
				return(cr);
			});
			break;

		// Autre colonne numérique - Tri numérique simple
		case _SIMTAB_COLUMN_ID_SIM_NB_FORFAITS_:		
			data.sort(function (a, b) {
				var cr = 0,
					afloat = parseFloat((typeof a[columnID] !== 'undefined') ? a[columnID] : '0'),
					bfloat = parseFloat((typeof b[columnID] !== 'undefined') ? b[columnID] : '0');
				if (afloat < bfloat) {
					cr = order * -1;
				} else if (afloat > bfloat) {
					cr = order;
				}
				return(cr);
			});
			break;

		default: 
			data.sort(function (a, b) {				
				var cr = 0,
					aVal = a[columnID],
					bVal = b[columnID];
				if (aVal < bVal) {
					cr = order * -1;
				} else if (aVal > bVal) {
					cr = order;
				}
				return(cr);
			});
			break;
	}	
}

