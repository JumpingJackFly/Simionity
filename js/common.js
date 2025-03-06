
const _SIMIONITY_CONFIG_FILE_ROOT = "./data/simionity_";
const _SIMIONITY_CONFIG_FILE_EXT = ".cfg";

const _USE_COOOKIE = true;

const _DEVICE_PAYS = "fr-FR";
const _DEVICE_CODE = "EUR";
const _DEVICE_DEFAUT_DIGIT = 2;

const _DELAY_DISPLAY_ERROR_NOTIF = 5000; // in ms

const _OPTION_LA_CARTE = "carte"
const _OPTIONS_CONSO = "conso";
const _OPTION_KMS = "kms";
const _OPTION_DUREE = "duree";
const _OPTION_PUISSANCE = "puis";
const _OPTION_DETAILS = "details";
const _OPTION_PAYS = "pays";
const _OPTION_AVEC_ABO = 'avecabo'
const _OPTION_AVEC_FORF = "avecforf";
const _OPTION_PASSE_FUTURE = "passefutur";
const _OPTION_BONUS_MAINGAU = "bmaingau";
const _OPTION_BONUS_CMH = "bcmh";
const _OPTION_BONUS_ELECTRO = "belectro";
const _OPTION_BONUS_ELLI = "belli";
const _OPTION_FILTRES_OP = "filtresop";
const _OPTION_FILTRE_IONITY = "filtreIonity";
const _OPTION_FILTRE_IECHARGE = "filtreIECharge";
const _OPTION_FILTRE_FASTNED = "filtreFastned";
//const _OPTION_FILTRE_TESLA = "filtreTesla";
const _OPTION_FILTRE_TOTALENERGIES = "filtreTotalenergies";

const _OFFRES_MENU_ITEM = "offres-menu-item";
const _CARTE_MENU_ITEM = "carte-menu-item";

const _TAB_OFFRES_ID = "t-offre-tab";
const _TAB_CARTE_ID = "t-carte-tab";

const _TAB_OFFRES_TITRE_SING = "Résultat";
const _TAB_OFFRES_TITRE_PLUR = "Résultats";

const _TABLE_DETAILS_OFFRES_ID = "t-offres-table";

const _SIMTAB_COLUMN_ID_HINFO_ = 'h-info';
const _SIMTAB_COLUMN_ID_HABO_ = 'h-Abo';
const _SIMTAB_COLUMN_ID_HFORFAIT_ = 'h-forfait';
const _SIMTAB_COLUMN_ID_HSIMU_ = 'h-simu';

const _SIMTAB_COLUMN_ID_POSITION_ = "Classement"
const _SIMTAB_COLUMN_ID_PRESTATAIRE_ = 'prest-name';

const _SIMTAB_COLUMN_ID_OFFRE = 'offre_name';
const _SIMTAB_COLUMN_ID_OFFRE_STATUS_ = 'offre-status';

const _SIMTAB_COLUMN_ID_PRICE_KWH = 'prix-kwh';
const _SIMTAB_COLUMN_ID_PRICE_MIN = 'prix-min';

const _SIMTAB_COLUMN_ID_SABO_PRICE_ = 'abo-price';
const _SIMTAB_COLUMN_ID_SABO_PERIOD_ = 'abo-period';
const _SIMTAB_COLUMN_ID_SABO_ENGAG_MINI_ = 'abo-engag-mini';

const _SIMTAB_COLUMN_ID_FORF_PRICE_ = 'forfait-price';
const _SIMTAB_COLUMN_ID_FORF_PERIOD_ = 'forfait-period';
const _SIMTAB_COLUMN_ID_FORF_QTY_ = 'forfait-qte';

const _SIMTAB_COLUMN_ID_SIM_TOT_KM_ = 'sim-km';
const _SIMTAB_COLUMN_ID_SIM_TOT_KHW_ = 'sim-kwh';
const _SIMTAB_COLUMN_ID_SIM_NB_FORFAITS_ = 'sim-nb-forfaits';
const _SIMTAB_COLUMN_ID_SIM_TOT_ABO_ = 'sim-tot-abo';
const _SIMTAB_COLUMN_ID_SIM_TOT_RECHARGE_ = 'sim-tot-rec';
const _SIMTAB_COLUMN_ID_SIM_RISTOURNE_ = 'sim-rist';
const _SIMTAB_COLUMN_ID_SIM_TOT_COUT_ = 'sim-tot-final';
const _SIMTAB_COLUMN_ID_SIM_COUT_100KM_ = 'sim-cout-100km';
const _SIMTAB_COLUMN_ID_SIM_COUT_KWH_ = 'sim-cout-kwh';

var AT_LEAST_ONE_SEVERE_NOTIF = false,
	VUE_DETAILLEE = false, 
	CACHED_FILTER = "";
	
/**
* Formateur de cout en € par defaut
*/
const EUROFORMATTER = new Intl.NumberFormat(_DEVICE_PAYS, {style: 'currency',currency: _DEVICE_CODE,minimumFractionDigits: _DEVICE_DEFAUT_DIGIT});

/**
 * Show notification to user as temp popup
 * @param msg
 * @param cat
 * @param delay
 */
function addNotif(msg, cat, delay) {

	// As defautl value in function signature is not recognized by IE11,
	// old method has to be applied as workaround
	cat = (typeof cat !== 'undefined') ? cat : 'success';
	delay = (typeof delay !== 'undefined') ? delay : 5000;

	if (cat !== 'success')
		AT_LEAST_ONE_SEVERE_NOTIF = true;

	$.notify({
		message: msg
	}, {
		type: cat,
		delay: delay,
		newest_on_top: true
	});
}

/**
 * Cache data
 * @returns /
 */
function setDataInCache(key, val, cookie, exdays) {
	
	cookie = (typeof cookie !== 'undefined') ? cookie : false;
	exdays = (typeof exdays !== 'undefined') ? exdays : 365;
	
	if (cookie === true) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = key + "=" + val + ";" + expires + ";path=/";		
	} else
		sessionStorage.setItem(key, val); 
}

/**
 * Get the data from cache
 * @return data string
 */
function getDataFromCache(key, cookie) {
	
	cookie = (typeof cookie !== 'undefined') ? cookie : false;
	
	if (cookie === true) {
		var name = key + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return null;	
	} else
		return sessionStorage.getItem(key);
}

/**
 * Check if a data has been cached in session
 * @returns true/false
 */
function isDataCached(key) {
	return (!(getDataFromCache(key) === null));
}

/**
*
 */
function euroFormatter(value, digit) {
	var fValue, cr;
	if (typeof value === 'string')
		fValue = parseFloat(value);
	else
		fValue = value;		

	digit = (typeof digit !== 'undefined') ? digit : 2;
	
	// Si on peut, on utilise le convertisseur en cache (+ rapide)
	if (digit === _DEVICE_DEFAUT_DIGIT)
		cr = EUROFORMATTER.format(fValue);
	else
		cr = Intl.NumberFormat(_DEVICE_PAYS, {style: 'currency', currency: _DEVICE_CODE, minimumFractionDigits: digit}).format(fValue);
		
	return (cr);
}

/**
*
 */
function deviseUnformatter(sValue, sDevise) {
	sValue = (typeof sValue !== 'undefined') ? sValue : '0.0';
	sDevise = (typeof sDevise !== 'undefined') ? sDevise : '€';
	
	sValue = sValue.replace(sDevise, '').replace(',', '.').replace(/\s/g, '');
	return (parseFloat(sValue));
}

/**
* converti & formatte un montant de devise X vers Euros
* ex: devise2Euro(0.79, "fr-CH", "CHF", 1.01, 2)
 */
function devise2Euro(fDevise, sDeviseLocale, sDeviseSymbole, fTauxEuro, digit) {
	fDevise = (typeof fDevise !== 'undefined') ? fDevise : 0.0;
	sDeviseLocale = (typeof sDeviseLocale !== 'undefined') ? sDeviseLocale : "fr-FR";
	sDeviseSymbole = (typeof sDeviseSymbole !== 'undefined') ? sDeviseSymbole : "EUR";
	fTauxEuro = (typeof fTauxEuro !== 'undefined') ? fTauxEuro : 1.0;
	digit = (typeof digit !== 'undefined') ? digit : 2;
	
	var fEuros = fDevise * fTauxEuro;
	var sEuros = euroFormatter(fEuros, digit);
	var sDevise = Intl.NumberFormat(sDeviseLocale, {style: 'currency', currency: sDeviseSymbole, minimumFractionDigits: digit}).format(fDevise);
	
	return {"fEuros" : fEuros, "sEuros" : sEuros, "sDevise" : sDevise};
}


/**
* Force rounding to fix known issue with floats operations in JS
 */
function roundCost(val) {
	return Math.round(val*100)/100;
}

/**
*
 */
function showError (msg, type, timeout) {
	addNotif(msg, type, timeout);	
}

/**
* convert frensh date string to js date
*/
function getFRDate(strVal) {
	var dateParts = strVal.split("/");
	// month is 0-based, that's why we need dataParts[1] - 1
	return (new Date(+dateParts[2], dateParts[1]-1, +dateParts[0])); 
}

/**
* 
*/
function getIndexNote(notes, code) {
	var idx = -99;
	for (var i = 0 ; i < notes.length ; i++) {
		if (notes[i].code === code) {
			idx = i;
			break;			
		}
	}
	
	return idx;
}
