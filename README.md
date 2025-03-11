
# SIMIONITY

## Changelog

#### 4.1.x (en cours)
- .4
12/03/2025 - Ajout des tarifs pour LU
12/03/2025 - Ajout tarifs ELECTRA (BE / LU)
- .3
11/03/2025 - Mise à jour tarifs ALLEGO et ATLANTE (FR)
- .2
10/03/2025 - Ajout tarifs TOTALENERGIES (FR)
- .1
09/03/2025 - Mise à jour des tarifs ELLI (FR / BE / DE)

#### 4.1.0 (09/03/2025)
- Nettoyage du code pour première publication sur Github pages (https://jumpingjackfly.github.io/Simionity/)
- Ajout de la conservation du dernier filtre entre 2 recherches
- Mise à jour tarifs FR//BE/DE
- Limitation de la couverture à FR/BE/DE
- Retrait des offres Tesla
- Purge des tarifs expirés

#### 4.0.0 (06/10/2024)
- Mise à jour offres (FR)
- Ajout option bonus Electroverse

#### 3.5.0 (25/07/2024)
- Mise à jour offre Electroverse (EU)
- Mise à jour offre Maingau (EU)

#### 3.4.0 (28/05/2024)
- Mise à jour offre IONITY (Motion + Power)

#### 3.3.0 (19/04/2024)
- Mise à jour tarifs Mobilize

#### 3.2.0 (18/04/2024)
- Mise à jour tarifs Tesla

#### 3.1.0 (30/03/2024)
- Ajout Opérateur TotalEnergie

#### 3.0.2 (30/03/2024)
- Mise à jour tarifs TotalEnergies

#### 3.0.1 (29/03/2024)
- Ajout Fastned avec abonnement

#### 3.0.0 (29/03/2024)
- Ajout filtre Opérateur
- Reactivation offres Tesla
- Maj tarifs Electra (FR + BE + IT)

#### 2.2.0 (16/03/2024)
- Maj tarifs Electra (FR + BE)

#### 2.1.0 (15/03/2024)
- Add Mobilize Renault option (FR + BE)

#### 2.0.0 (xx/02/2024)
- Add bonus Elli option

#### 1.15.0 (15/02/2024)
- Retrait de BeCharge en France

#### 1.14.0 (23/08/2023)
- Mise à jour des prix abonnement Ionity / Passport (11,99€ -> 5,99€)

#### 1.13.0 (19/01/2024)
- Mise à jour de l'URL IONITY pour les prix (now https://ionity.eu/en/network/access-and-payment)
- Mise à jour prix Electroverse IONITY & IECharge (FR)

#### 1.12.11 (05/12/2023)
- Mise à jour tarif Inity Flex

#### 1.12.10 (01/12/2023)
- Mise à jour config Freshmile Ionity (FR + NL)

#### 1.12.9 (17/11/2023)
- Mise à jour config Freshmile Ionity (FR + NL)

#### 1.12.8 (08/11/2023)
- Mise à jour tarifs Freshmile Ionity (FR + NL)

#### 1.12.7 (24/10/2023)
- Mise à jour tarifs Electroverse Ionity

#### 1.12.6 (xx/xx/2023)
- Rajout des prix CMH - Flex

#### 1.12.5 (05/09/2023)
- Ajout offre Electroverse IECharge
- Ajout offre IECharge (native)

#### 1.12.4 (02/09/2023)
- Ajout offre Electroverse Ionity

#### 1.12.3 (01/09/2023)
- Déactivation offres Tesla - Trop imprévisibles

#### 1.12.2 (18/08/2023)
- Mise à jour des prix CMH

#### 1.12.1 (18/08/2023)
- Mise à jour des prix Ionity / Passport pour DE, FR , NO 

#### 1.12.0 (02/08/2023)
- Mise à jour des prix Ionity / ChargeMyHyndai pour CH & DK

#### 1.11.0 (27/07/2023)
- Mise à jour des prix Ionity / ChargeMyHyndai

#### 1.10.0 (15/06/2023)
- Ajout de la pagination des résultats
- Mise à jour de la note en bas de page pour "PromoFin"

#### 1.9.0 (04/06/2023)
- Mise à jour des prix Ionity / Passport (à partir du 06/06/2023)
- Mise à jour des prix Elli (passage au kWh à partir du 01/06/2023)
- Affichage systématique des offres futures (plus conditionnées à l'option avancée)
- Ajout du paramètres "durée" pour la réalisation du kilométrage
- AJout de la notion de durée de préavis pour résilier abo (param "PreavisResil")
- Ajout de la notion de date limite de promo pour abonnement/forfait (param "PromoFin")
- AJout de la notion de durée d'engagement minimum (param "EngagementMini")

#### 1.8.1 (01/06/2023)
- Mise à jour prix EnelX

#### 1.8.0 (17/05/2023)
- Mise à jour prix Tesla
- Changement de la couleur des offres à venir (future). Passage de l'orange au vert
- Sauvegarde des paramètres dans cookie (avant dans session locale)
- Ajout option "Crédit gratuit Maingau"
- Ajout option "Crédit gratuit CMH"
- Ajout controle sur les nombres saisis dans les paramètres
- Cache le tableau des résultats dès que les paramètres sont modifiés

#### 1.7.0 (28/04/2023)
- Mise à jour prix CMH 01/06/2023
- Mise à jour prix Maingau au 01/05/2023
- Ajout gestion dynamique des notes de fin de tableau
- Ajout option pour inclure (O/N) les formules passées & futures
- Config: Remplacement de "Status" (On/Off) par "DateDebut" et "DateFin"
- Découpage paramètres en 2 sections ("basiques" & "avancés")

#### 1.6.0 (15/04/2023)
- Mise à jour prix Freshmile
- Activation Pays-Bas
- Activation Danemark
- Ajout page de maintenance
- Supression code php (language non supporté par l'hébergeur)

#### 1.5.0 (10/04/2023)
- Activation Luxembourg
- Activation Allemagne
- Activation Belgique
- Activation Autriche
- Activation Suisse
- Ajout option "VariationLocale" dans cfg
- Ajout colonne "cout/kWh" (vue détaillée)
- Correction faute "Enel-W" dans nuage de mots
- Integration de la carte GMAP "Carte des bornes rapides par opérateurs + appels d'offre" dans nouvel onglet (caché avec param dans URL)
- Ajout option pour inclure (O/N) les formules avec abonnement
- Ajout option pour inclure (O/N) les formules avec forfait
- Ajout gestion prix en devise dans .cfg

#### 1.4.0 (07/04/2023)
- Ajout selection du pays dans les paramètres
- Split fichier de configuration des offres par pays
- Ajout formule "CMH - Easy - Autres DC" (config France)
- Ajout nuage de mots en illustration

#### 1.3.0 (05/04/2023)
- Fige les entetes de la table lorsque l'on scroll vers le bas.
- Ajout de l'URL vers les tarifs (quand ils existent) sous le nom de l'opérateur
- Optimisation des labels
- Bug fixing dans le calcul du rang de l'offre (si cout total > 1000€)
- Ajout du nombre de résultats dans le titre du tab

#### 1.2.0 (04/04/2023)
- Ajout option "Vue détaillée / Compilée"
- Revamp mise en page
- Ajout info "RenewAuto" dans config offres
- Correction formule BeCharge (passage de abo -> Forfaits)
- Ajout offre "Freshmile autres DC"
- Ajout d'une colone "Rand" (Classement) pour avoir la position de l'offre même quand on filtre ou ré-ordonne

#### 1.0.1 (03/04/2023)
- Correction tarifs forfaits Elli

#### 1.0.0 (03/04/2023)
- Première version


