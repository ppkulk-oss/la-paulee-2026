import { useState, useEffect, useRef } from "react";

// Burgundy sub-regions for geography strip (north to south)
const SUBREGIONS = ["Chablis", "Côte de Nuits", "Côte de Beaune", "Mâconnais", "Champagne"];

const PRODUCERS = [
  {
    id: 1, name: "Moreau-Naudet", station: 1, x: 8, y: 18,
    pron: "moh-ROH noh-DAY",
    region: "Chablis", village: "Chablis", subregion: "Chablis", est: "1990s",
    soil: "Kimmeridgian limestone and clay — ancient oyster-shell fossils",
    bio: "Stéphane Moreau took over his family's vines in the early 1990s and transformed a modest Chablis grower into one of the appellation's most respected names. He farms organically, ferments with indigenous yeasts, and ages in a mix of steel tanks and old oak barrels — no new wood — to preserve the pure limestone minerality that defines great Chablis. His 1er Cru holdings span some of the finest slopes: Forêts (rich and round), Montmains (taut and saline), and Beauregards (floral and fine). The village cuvée 'Les Pargues' comes from old vines and over-delivers for its classification.",
    tier: 3, wines: [
      { name: 'Chablis "Les Pargues Vieilles Vignes" 2023', price: 63, type: "white", grape: "Chardonnay" },
      { name: "Chablis 1er Cru Forêts 2023", price: 95, type: "white", grape: "Chardonnay" },
      { name: "Chablis 1er Cru Beauregards 2023", price: 96, type: "white", grape: "Chardonnay" },
      { name: "Chablis 1er Cru Montmains 2023", price: 85, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 2, name: "William Fèvre", station: 2, x: 8, y: 14,
    pron: "wee-YAHM FEV-ruh",
    region: "Chablis", village: "Chablis", subregion: "Chablis", est: "1959",
    soil: "Kimmeridgian marl and limestone, steep south-facing slopes",
    bio: "William Fèvre owns more Grand Cru vineyard land in Chablis than anyone — 16 hectares across all seven Grand Crus. Since the Henriot Champagne group acquired the estate in 1998 and installed Didier Séguier as winemaker, quality has reached extraordinary heights. The style balances the house's signature oak-touched richness with razor-sharp Chablis acidity. Les Clos, from the largest and most prestigious Grand Cru, is their flagship: a wine of immense concentration that can age for decades. Montée de Tonnerre, technically 1er Cru, is often considered Grand Cru quality by insiders.",
    tier: 2, wines: [
      { name: "Chablis 1er Cru Montée de Tonnerre 2023", price: 85, type: "white", grape: "Chardonnay" },
      { name: "Chablis 1er Cru Vaulorent 2023", price: 95, type: "white", grape: "Chardonnay" },
      { name: 'Chablis Grand Cru Bougros "Côte Bouguerots" 2023', price: 165, type: "white", grape: "Chardonnay" },
      { name: "Chablis Grand Cru Les Clos 2023", price: 235, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 3, name: "François Raveneau", station: 3, x: 8, y: 10,
    pron: "frahn-SWAH rav-NOH",
    region: "Chablis", village: "Chablis", subregion: "Chablis", est: "1940s",
    soil: "Pure Kimmeridgian limestone, steep slopes, exceptional drainage",
    bio: "Raveneau is Chablis. Full stop. Founded by François Raveneau in the 1940s, this tiny estate produces what most critics consider the greatest Chablis on earth. Now run by his grandson Maxime (his first La Paulée in NYC), the domaine farms just 10 hectares but holds prime parcels in Butteaux, Montée de Tonnerre, and the legendary Grand Cru Les Clos. Production is minuscule — maybe 4,000 cases total — and allocations are virtually impossible to get. The wines age in old oak fûts (never new) and develop extraordinary honeyed complexity while retaining electric acidity. A bottle of Les Clos with 10+ years of age is one of wine's peak experiences.",
    tier: 1, wines: [
      { name: "Chablis 2023", price: 250, type: "white", grape: "Chardonnay" },
      { name: "Chablis 1er Cru Butteaux 2023", price: 395, type: "white", grape: "Chardonnay" },
      { name: "Chablis 1er Cru Montée de Tonnerre 2023", price: 490, type: "white", grape: "Chardonnay" },
      { name: "Chablis Grand Cru Les Clos 2023", price: 2750, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 4, name: "Vocoret", station: 4, x: 5, y: 6,
    pron: "voh-koh-RAY",
    region: "Chablis", village: "Chablis", subregion: "Chablis", est: "2015",
    soil: "Kimmeridgian and Portlandian limestone, biodynamically farmed",
    bio: "Eleni and Edouard Vocoret represent a new generation in Chablis. Edouard's family has grown grapes in the region for generations, but he and his wife struck out on their own in 2015 with a biodynamic approach that's rare in this traditionally conservative appellation. Their Grand Cru Blanchot comes from the easternmost Grand Cru slope, producing wines of exceptional finesse and floral perfume — often considered the most elegant of all Chablis Grand Crus. Montée de Tonnerre shows the power of this great 1er Cru site.",
    tier: 3, wines: [
      { name: 'Chablis "Bas de Chapelot" 2023', price: 49, type: "white", grape: "Chardonnay" },
      { name: "Chablis 1er Cru Les Forêts 2023", price: 79, type: "white", grape: "Chardonnay" },
      { name: "Chablis 1er Cru Montée de Tonnerre 2023", price: 89, type: "white", grape: "Chardonnay" },
      { name: "Chablis Grand Cru Blanchot 2023", price: 145, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 5, name: "Olivier Merlin", station: 5, x: 17, y: 4,
    pron: "oh-lee-VYAY mehr-LAN",
    region: "Mâconnais", village: "La Roche-Vineuse", subregion: "Mâconnais", est: "1987",
    soil: "Limestone and clay at altitude, cooler microclimate than the Mâcon norm",
    bio: "Olivier Merlin proved that the Mâconnais — Burgundy's southern, often-overlooked region — could produce world-class Chardonnay. Based in the village of La Roche-Vineuse, he farms prime parcels in Pouilly-Fuissé, which gained its first 1er Cru designations only in 2020. His Clos des Quarts is a walled monopole vineyard producing wine of stunning depth and minerality that rivals Côte d'Or whites at a third of the price. These are the best-value whites in the room — don't sleep on them.",
    tier: 4, wines: [
      { name: 'Mâcon La Roche Vineuse "Les Cras" 2023', price: 38, type: "white", grape: "Chardonnay" },
      { name: 'Saint-Véran "La Côte Rôtie" 2023', price: 42, type: "white", grape: "Chardonnay" },
      { name: "Pouilly-Fuissé 1er Cru Sur la Roche 2023", price: 58, type: "white", grape: "Chardonnay" },
      { name: 'Pouilly-Fuissé 1er Cru "Clos des Quarts" 2023', price: 89, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 6, name: "Cassiopée", station: 6, x: 24, y: 4,
    pron: "kah-see-oh-PAY",
    region: "Côte de Beaune", village: "Maranges", subregion: "Côte de Beaune", est: "2018",
    soil: "Limestone and red clay, south-facing slopes at the southern tip of the Côte d'Or",
    bio: "Domaine de Cassiopée is new-wave Burgundy at its most exciting. Founded in 2018 by a young vigneron at the southern edge of the Côte de Beaune, the estate works with Aligoté, Chardonnay, and Pinot Noir from Bourgogne and Maranges appellations. These are entry-level Burgundy in classification only — the farming is meticulous, yields are low, and the wines are vibrant and honest. Maranges is one of Burgundy's most undervalued communes, producing structured reds from limestone soils at bargain prices. Great discovery table.",
    tier: 4, wines: [
      { name: 'Bourgogne Aligoté "En Gerlieus" 2023', price: 38, type: "white", grape: "Aligoté" },
      { name: 'Bourgogne Hautes Côtes de Beaune Blanc "Les Côtes" 2023', price: 48, type: "white", grape: "Chardonnay" },
      { name: 'Bourgogne Rouge "En Gerlieus" 2023', price: 44, type: "red", grape: "Pinot Noir" },
      { name: "Maranges Rouge Le Saugeot 2023", price: 58, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 7, name: "Simon Colin", station: 7, x: 31, y: 4,
    pron: "see-MOHN koh-LAN",
    region: "Chassagne-Montrachet", village: "Chassagne-Montrachet", subregion: "Côte de Beaune", est: "2013",
    soil: "Limestone and marl on east-facing slopes, classic Chassagne terroir",
    bio: "The Colin family is Chassagne royalty — multiple branches produce top wine in this village. Simon Colin represents the newest generation, striking out independently in 2013. His 1er Cru Les Chaumées sits on the hillside above the village with thin, stony soil that produces tight, mineral whites. Les Vergers, lower on the slope, is richer and more generous. The Santenay rouge shows the red-wine potential that Chassagne is increasingly recognized for. Excellent quality-to-price ratio across the board.",
    tier: 3, wines: [
      { name: "Chassagne-Montrachet 2023", price: 75, type: "white", grape: "Chardonnay" },
      { name: "Chassagne-Montrachet 1er Cru Les Chaumées 2023", price: 133, type: "white", grape: "Chardonnay" },
      { name: "Chassagne-Montrachet 1er Cru Les Vergers 2023", price: 107, type: "white", grape: "Chardonnay" },
      { name: "Santenay 1er Cru Les Gravières 2023", price: 95, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 8, name: "Salon / Delamotte", station: 8, x: 43, y: 4,
    pron: "sah-LOHN / deh-lah-MOHT",
    region: "Champagne", village: "Le Mesnil-sur-Oger", subregion: "Champagne", est: "1911 / 1760",
    soil: "Chalk subsoil, Côte des Blancs Grand Cru vineyards",
    bio: "Salon is arguably the most exclusive Champagne ever made. Founded in 1911, it follows a radical philosophy: one grape (Chardonnay), one village (Le Mesnil-sur-Oger), one vintage (only declared in exceptional years — roughly 37 times in a century). The 2015 is a recent release showing extraordinary chalky precision. Sister house Delamotte, founded in 1760 (the fifth-oldest Champagne house), serves as the 'second wine' — in non-Salon years, the grapes go to Delamotte. The Delamotte Blanc de Blancs is widely considered the best value in serious Champagne.",
    tier: 2, wines: [
      { name: "Salon Blanc de Blancs 2015", price: 1189, type: "champagne", grape: "Chardonnay" },
      { name: "Delamotte Brut NV", price: 95, type: "champagne", grape: "Chardonnay" },
      { name: "Delamotte Blanc de Blancs NV", price: 118, type: "champagne", grape: "Chardonnay" },
      { name: "Delamotte Blanc de Blancs 2018", price: 195, type: "champagne", grape: "Chardonnay" },
    ]
  },
  {
    id: 9, name: "Jean-Marc Pillot", station: 9, x: 18, y: 9,
    pron: "zhahn-MARK pee-YOH",
    region: "Chassagne-Montrachet", village: "Chassagne-Montrachet", subregion: "Côte de Beaune", est: "1960s",
    soil: "Limestone and clay marl, steep east-facing slopes",
    bio: "Five generations of Pillots have farmed Chassagne-Montrachet. Jean-Marc's holdings read like a greatest-hits of the village: Caillerets (considered the finest 1er Cru for whites, adjacent to Montrachet Grand Cru), Chenevottes (more floral and open), and Morgeot (rich and powerful from deeper clay soils). His winemaking is classical — whole-cluster pressing, barrel fermentation in 20-25% new oak, extended lees contact. The Caillerets is the star here: from vines directly below Le Montrachet, it's the closest thing to Grand Cru you'll taste at 1er Cru prices.",
    tier: 3, wines: [
      { name: "Chassagne-Montrachet 2023", price: 93, type: "white", grape: "Chardonnay" },
      { name: "Chassagne-Montrachet 1er Cru Chenevottes 2023", price: 103, type: "white", grape: "Chardonnay" },
      { name: "Chassagne-Montrachet 1er Cru Caillerets 2023", price: 139, type: "white", grape: "Chardonnay" },
      { name: "Chassagne-Montrachet 1er Cru Morgeot Les Fairendes 2022", price: 134, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 10, name: "Alex Moreau", station: 10, x: 18, y: 13,
    pron: "ah-LEKS moh-ROH",
    region: "Chassagne-Montrachet", village: "Chassagne-Montrachet", subregion: "Côte de Beaune", est: "2015",
    soil: "Limestone bedrock with clay-limestone topsoil, varying exposures",
    bio: "Alex Moreau is the rising star of Chassagne-Montrachet. From the illustrious Moreau family (his grandfather Bernard is a village legend), Alex launched his own label in 2015 with a low-intervention philosophy: organic farming, indigenous yeasts, minimal sulfur, and long lees aging in older barrels. His wines are crystalline and precise, letting the terroir differences between his three 1er Cru sites shine through. La Maltroie is rich and golden, Champs Gain is taut and mineral, Morgeot is structured and long. At $180-290, these are serious Chassagne.",
    tier: 3, wines: [
      { name: "Chassagne-Montrachet 2023", price: 180, type: "white", grape: "Chardonnay" },
      { name: "Chassagne-Montrachet 1er Cru Les Champs Gain 2023", price: 260, type: "white", grape: "Chardonnay" },
      { name: "Chassagne-Montrachet 1er Cru La Maltroie 2023", price: 275, type: "white", grape: "Chardonnay" },
      { name: "Chassagne-Montrachet 1er Cru Morgeot 2023", price: 288, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 11, name: "Comtes Lafon", station: 11, x: 26, y: 13,
    pron: "kohmt lah-FOHN",
    region: "Meursault", village: "Meursault", subregion: "Côte de Beaune", est: "1894",
    soil: "Deep limestone with clay, south-east exposure, mid-slope",
    bio: "Domaine des Comtes Lafon is THE reference estate for Meursault — and arguably for all white Burgundy. Dominique Lafon took over from his father in 1984 and converted entirely to biodynamics by 1998, transforming already-great wines into transcendent ones. The Meursault Charmes ($460) comes from Charmes-Dessus, the upper, better part of this famous 1er Cru, with vines adjacent to Perrières. The Clos de la Barre is the domaine's village monopole — a walled vineyard in the heart of Meursault that consistently over-delivers. Allocations are nearly impossible; this pour is a rare opportunity.",
    tier: 1, wines: [
      { name: "Volnay 1er Cru Santenots du Milieu 2023", price: 170, type: "red", grape: "Pinot Noir" },
      { name: "Puligny-Montrachet 1er Cru Les Charmes 2023", price: 178, type: "white", grape: "Chardonnay" },
      { name: 'Meursault "Clos de la Barre" 2023', price: 178, type: "white", grape: "Chardonnay" },
      { name: "Meursault 1er Cru Charmes 2023", price: 460, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 12, name: "Benjamin Leroux", station: 12, x: 25, y: 9,
    pron: "bahn-zhah-MAN luh-ROO",
    region: "Beaune", village: "Beaune", subregion: "Côte de Beaune", est: "2007",
    soil: "Various — sources from 70+ appellations across Burgundy",
    bio: "Benjamin Leroux was the acclaimed winemaker at Domaine du Comte Armand in Pommard before launching his own négociant house in 2007. What sets him apart: he controls the farming on every parcel he sources, working directly with growers under long-term contracts. His range spans from simple Bourgogne to Grand Cru, all made with the same obsessive care. The Bâtard-Montrachet ($1,025) is a Grand Cru of staggering power — rich, deep, and incredibly long. The Meursault Charmes-Dessus is from the best sector of this famous vineyard, and the Vireuils is his excellent-value village Meursault.",
    tier: 2, wines: [
      { name: 'Meursault "Vireuils" 2023', price: 129, type: "white", grape: "Chardonnay" },
      { name: 'Meursault-Blagny 1er Cru "La Pièce Sous le Bois" 2023', price: 226, type: "white", grape: "Chardonnay" },
      { name: "Meursault 1er Cru Charmes-Dessus 2023", price: 180, type: "white", grape: "Chardonnay" },
      { name: "Bâtard-Montrachet Grand Cru 2023", price: 1025, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 13, name: "La Commaraine", station: 13, x: 53, y: 4,
    pron: "lah koh-mah-REN",
    region: "Pommard", village: "Pommard", subregion: "Côte de Beaune", est: "2018 (revival)",
    soil: "Iron-rich clay over limestone, deep topsoil, walled vineyard",
    bio: "The Clos de la Commaraine is a historic walled 1er Cru monopole in the heart of Pommard — and its revival is one of Burgundy's great recent stories. In 2018, Jacques-Frédéric Mugnier (the legendary winemaker of Chambolle-Musigny's Domaine Mugnier) took charge of this long-neglected 4-hectare clos. He immediately replanted, converted to organic farming, and applied the same ethereal touch that made his Chambolle wines famous. The result is a Pommard unlike any other: refined where the village is usually rustic, perfumed where it's usually dense. The Saint-Aubin and Meursault whites are excellent too.",
    tier: 2, wines: [
      { name: "Saint-Aubin 1er Cru Les Murgers des Dents de Chien 2023", price: 165, type: "white", grape: "Chardonnay" },
      { name: "Meursault 1er Cru Les Santenots 2023", price: 260, type: "white", grape: "Chardonnay" },
      { name: "Volnay 1er Cru En Champans 2023", price: 245, type: "red", grape: "Pinot Noir" },
      { name: "Pommard 1er Cru Clos de la Commaraine 2023", price: 275, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 14, name: "Génot-Boulanger", station: 14, x: 42, y: 9,
    pron: "zhay-NOH boo-lahn-ZHAY",
    region: "Meursault", village: "Meursault", subregion: "Côte de Beaune", est: "1974",
    soil: "Limestone and marl, mid-slope, well-drained",
    bio: "Guillaume Lavollée (who married into the Génot-Boulanger family) has quietly transformed this estate into one of the Côte de Beaune's most reliable producers. Holdings span Meursault, Aloxe-Corton, Chassagne, and Beaune — a wide portfolio that reflects the diversity of the Côte. The Meursault Bouchères ($189) is from one of the village's top 1er Crus, producing wines of precision and hazelnut-tinged richness. The Corton Grand Cru Les Combes is a red from the great hill of Corton — structured, earthy, and age-worthy. Underrated table with no lines.",
    tier: 3, wines: [
      { name: 'Meursault "Clos du Cromin" 2023', price: 110, type: "white", grape: "Chardonnay" },
      { name: "Meursault 1er Cru Les Bouchères 2023", price: 189, type: "white", grape: "Chardonnay" },
      { name: "Aloxe-Corton 1er Cru Clos du Chapître 2023", price: 118, type: "red", grape: "Pinot Noir" },
      { name: "Corton Grand Cru Les Combes 2023", price: 245, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 15, name: "Dominique Lafon", station: 15, x: 36, y: 14,
    pron: "doh-mee-NEEK lah-FOHN",
    region: "Beaune", village: "Beaune / Volnay", subregion: "Côte de Beaune", est: "2008",
    soil: "Various Côte de Beaune terroirs — limestone dominant",
    bio: "This is Dominique Lafon's personal négociant label, entirely separate from the family's Comtes Lafon domaine. Launched in 2008, it gives one of Burgundy's greatest winemakers the freedom to explore appellations beyond his family estate. The Beaune 1er Cru Epenottes ($99) is the star — an elegant red from a southeast-facing 1er Cru that drinks above its price. The Bourgogne Blanc ($54) shows what a master winemaker can do with 'simple' fruit. Best-value table at the tasting from a legendary name.",
    tier: 4, wines: [
      { name: "Bourgogne Blanc 2023", price: 54, type: "white", grape: "Chardonnay" },
      { name: "Pernand-Vergelesses 2023", price: 79, type: "white", grape: "Chardonnay" },
      { name: "Volnay 2023", price: 119, type: "red", grape: "Pinot Noir" },
      { name: "Beaune 1er Cru Epenottes 2023", price: 99, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 16, name: "Guilbert-Gillet", station: 16, x: 53, y: 14,
    pron: "geel-BEHR zhee-LAY",
    region: "Savigny-lès-Beaune", village: "Savigny-lès-Beaune", subregion: "Côte de Beaune", est: "2018",
    soil: "Clay-limestone, cooler north-facing and warmer south-facing plots",
    bio: "A young couple farming biodynamically in Savigny-lès-Beaune, one of the Côte de Beaune's most undervalued villages. Savigny sits in a side valley just north of Beaune, producing fresh, crunchy reds and surprisingly fine whites from limestone-rich soils. Guilbert-Gillet's 1er Cru Les Peuillets (available in both red and white) comes from high on the slope with excellent drainage. The village cuvées 'Aux Petits Liards' and 'Les Echalas' are energetic, pure, and the cheapest wines at the tasting. Great for discovering what 'small Burgundy' can offer.",
    tier: 4, wines: [
      { name: "Savigny-lès-Beaune Blanc 1er Cru Les Peuillets 2023", price: 69, type: "white", grape: "Chardonnay" },
      { name: 'Savigny-lès-Beaune "Aux Petits Liards" 2023', price: 55, type: "red", grape: "Pinot Noir" },
      { name: 'Savigny-lès-Beaune "Les Echalas" 2023', price: 59, type: "red", grape: "Pinot Noir" },
      { name: "Savigny-lès-Beaune Rouge 1er Cru Les Peuillets 2023", price: 72, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 17, name: "Vignoble des Cabottes", station: 17, x: 55, y: 9,
    pron: "vee-NYOH-bluh day kah-BOHT",
    region: "Corton / Beaune", village: "Savigny / Pernand / Aloxe", subregion: "Côte de Beaune", est: "2014",
    soil: "Iron-rich marl and limestone on the hill of Corton",
    bio: "Formerly the vineyards of Chandon de Briailles, now owned by François Pinault — the billionaire behind Château Latour and Domaine d'Eugénie. The estate sits on the great hill of Corton, the only Grand Cru producing both red and white at the top level. Chevalier-Montrachet ($475) is the crown jewel: a tiny parcel in one of Burgundy's most revered white Grand Crus, sitting above Le Montrachet itself. The Beaune Grèves 'Vigne de l'Enfant Jésus' ($125) is one of Burgundy's most famous 1er Crus — its name ('Vine of the Baby Jesus') dates to the 15th century. Corton-Charlemagne, named for Emperor Charlemagne, is powerful white Burgundy from high on the hill.",
    tier: 2, wines: [
      { name: "Beaune 1er Cru Grèves \"Vigne de l'Enfant Jésus\" 2023", price: 125, type: "red", grape: "Pinot Noir" },
      { name: "Corton Grand Cru 2023", price: 225, type: "red", grape: "Pinot Noir" },
      { name: "Corton-Charlemagne Grand Cru 2023", price: 325, type: "white", grape: "Chardonnay" },
      { name: "Chevalier-Montrachet Grand Cru 2023", price: 475, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 18, name: "Hospices de Beaune", station: 18, x: 43, y: 22,
    pron: "oh-SPEES duh BOHN",
    region: "Beaune", village: "Beaune", subregion: "Côte de Beaune", est: "1443",
    soil: "Various prime Côte d'Or sites donated over centuries",
    bio: "The Hospices de Beaune is Burgundy's most famous institution — a 15th-century charity hospital founded in 1443 by Nicolas Rolin, chancellor to the Duke of Burgundy. For almost 600 years, vineyard owners have donated prime plots to the Hospices, creating a portfolio of exceptional holdings across the Côte d'Or. Each November, the Hospices auction sets the benchmark for Burgundy pricing. The wines are named for historical benefactors: Cuvée Guigone de Salins honors the founder's wife, Cuvée Philippe le Bon recalls the Duke himself. The Echézeaux Grand Cru ($495) is the trophy pour here.",
    tier: 2, wines: [
      { name: 'Beaune 1er Cru "Cuvée Guigone de Salins" 2023', price: 125, type: "red", grape: "Pinot Noir" },
      { name: 'Volnay 1er Cru "Cuvée Blondeau" 2023', price: 175, type: "red", grape: "Pinot Noir" },
      { name: 'Echézeaux "Cuvée Jean-Luc Bissey" 2023', price: 495, type: "red", grape: "Pinot Noir" },
      { name: 'Meursault 1er Cru Genevrières "Cuvée Philippe le Bon" 2023', price: 275, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 19, name: "Dugat-Py", station: 19, x: 55, y: 22,
    pron: "doo-GAH PEE",
    region: "Gevrey-Chambertin", village: "Gevrey-Chambertin", subregion: "Côte de Nuits", est: "1994",
    soil: "Limestone with iron-rich clay, ancient vine roots deep into bedrock",
    bio: "Bernard and Loïc Dugat-Py farm some of the oldest vines in all of Burgundy — many plots are 60-100+ years old, with gnarled trunks that produce tiny amounts of incredibly concentrated fruit. The domaine works from the oldest cellar in Burgundy, an 11th-century abbey beneath their house in Gevrey. Organic since 2003, certified in 2015, with some plots plowed by horse. The Mazoyères-Chambertin Grand Cru ($1,450) is dense, extracted, and built to age for decades. Their surprising Corton-Charlemagne ($950) white and Chassagne Morgeot ($325) show the breadth of their talent beyond Gevrey.",
    tier: 1, wines: [
      { name: "Gevrey-Chambertin 1er Cru Petite Chapelle 2023", price: 650, type: "red", grape: "Pinot Noir" },
      { name: "Mazoyères-Chambertin Grand Cru 2023", price: 1450, type: "red", grape: "Pinot Noir" },
      { name: "Chassagne-Montrachet 1er Cru Morgeot 2023", price: 325, type: "white", grape: "Chardonnay" },
      { name: "Corton-Charlemagne Grand Cru 2023", price: 950, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 20, name: "Rougeot", station: 20, x: 45, y: 30,
    pron: "roo-ZHOH",
    region: "Meursault", village: "Meursault", subregion: "Côte de Beaune", est: "1980s",
    soil: "Deep clay-limestone, mid-slope Meursault terroir",
    bio: "Marc Rougeot's family domaine makes characterful, sometimes adventurous Meursault. The headline here is the 1er Cru Charmes 'sans soufre' ($210) — a no-added-sulfur cuvée that's vibrant and slightly wild, a fascinating experiment from a traditional village. The village Meursault 'Montagne Saint Christophe' is from a lieu-dit high on the slope with excellent sun exposure. Rougeot also makes a Gevrey-Chambertin red and a Volnay Santenots, showing range across both colors and both Côtes.",
    tier: 3, wines: [
      { name: 'Meursault "Montagne Saint Christophe" 2023', price: 95, type: "white", grape: "Chardonnay" },
      { name: "Meursault 1er Cru Charmes 2023 sans soufre", price: 210, type: "white", grape: "Chardonnay" },
      { name: 'Gevrey-Chambertin "Aux Etelois" 2023', price: 110, type: "red", grape: "Pinot Noir" },
      { name: "Volnay 1er Cru Santenots 2023", price: 165, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 21, name: "Les Aligoteurs", station: 21, x: 55, y: 30,
    pron: "lay ah-lee-goh-TUHR",
    region: "Various", village: "Various", subregion: "Côte de Beaune", est: "Collective",
    soil: "Various — Aligoté thrives in cooler, higher-altitude sites across Burgundy",
    bio: "A collective of 18 producers celebrating Aligoté, Burgundy's 'other' white grape. Long dismissed as a simple aperitif wine (the base for Kir), Aligoté is having a renaissance. The best versions — like Dureuil-Janthial, Fabien Coche, and Jérôme Galeyrand — show startling complexity: citrus, saline, herbal, sometimes with an almost Riesling-like tension. Bouzeron, the only village appellation dedicated to Aligoté, is represented by several producers. This station is a palate cleanser, a conversation starter, and a genuine discovery. Prices are the lowest at the tasting ($24-49).",
    tier: 4, wines: [
      { name: "18 different Aligotés from across Burgundy", price: 30, type: "white", grape: "Aligoté" },
      { name: "Incl. Dureuil-Janthial, Taupenot-Merme", price: 39, type: "white", grape: "Aligoté" },
      { name: "Fabien Coche, Jérôme Galeyrand", price: 42, type: "white", grape: "Aligoté" },
      { name: "AMI, Clothilde Davenne & more", price: 34, type: "white", grape: "Aligoté" },
    ]
  },
  {
    id: 22, name: "Nicolas Rossignol", station: 22, x: 40, y: 38,
    pron: "nee-koh-LAH roh-see-NYOHL",
    region: "Volnay", village: "Volnay", subregion: "Côte de Beaune", est: "2000s",
    soil: "Thin limestone topsoil, iron-rich clay beneath, steep east-facing slopes",
    bio: "Nicolas Rossignol is a modern Volnay specialist producing elegant, precise Pinot Noir. Volnay is known for producing the most feminine, perfumed reds on the Côte de Beaune — silky where Pommard (its neighbor) is sturdy. The 1er Cru Santenots ($195) is fascinating: it's actually located in the commune of Meursault, but because it's planted to Pinot Noir, it's legally classified as Volnay. The resulting wine bridges both villages — Volnay's finesse with Meursault's mid-palate richness. Good vertical tasting across the hierarchy from Bourgogne to 1er Cru.",
    tier: 3, wines: [
      { name: "Bourgogne Pinot Noir 2023", price: 117, type: "red", grape: "Pinot Noir" },
      { name: "Volnay 2023", price: 110, type: "red", grape: "Pinot Noir" },
      { name: "Volnay 1er Cru 2023", price: 165, type: "red", grape: "Pinot Noir" },
      { name: "Volnay 1er Cru Santenots 2023", price: 195, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 23, name: "Didier Fornerol", station: 23, x: 50, y: 38,
    pron: "dee-DYAY for-nuh-ROHL",
    region: "Côte de Nuits-Villages", village: "Comblanchien", subregion: "Côte de Nuits", est: "1999",
    soil: "Comblanchien limestone — the same stone used in Burgundy's finest buildings",
    bio: "Before starting his own domaine, Didier Fornerol was the cellar master at Domaine de l'Arlot, one of Nuits-Saint-Georges' finest estates. In 1999 he set out independently in Côte de Nuits-Villages, an appellation at the southern edge of the Côte de Nuits that sits on the same limestone as its famous neighbors but at a fraction of the price. His 'La Rue des Foins' (literally 'Hay Street') is a charming, perfumed Pinot Noir. The rare white Côte de Nuits-Villages — there are very few — shows that Chardonnay can thrive even in this red-wine heartland. Best value reds at the tasting.",
    tier: 4, wines: [
      { name: "Bourgogne Rouge 2022", price: 42, type: "red", grape: "Pinot Noir" },
      { name: 'Côte de Nuits-Villages "La Rue des Foins" 2022', price: 58, type: "red", grape: "Pinot Noir" },
      { name: "Bourgogne Blanc 2022", price: 39, type: "white", grape: "Chardonnay" },
      { name: "Côte de Nuits-Villages Blanc 2022", price: 65, type: "white", grape: "Chardonnay" },
    ]
  },
  {
    id: 24, name: "Henri Gouges", station: 24, x: 52, y: 44,
    pron: "ahn-REE GOOZH",
    region: "Nuits-Saint-Georges", village: "Nuits-Saint-Georges", subregion: "Côte de Nuits", est: "1919",
    soil: "Iron-rich clay and limestone, varying aspects across the village's slopes",
    bio: "Henri Gouges is the reference domaine for Nuits-Saint-Georges — the estate that defined the village's identity in the 20th century. Henri himself was instrumental in creating the AOC system in the 1930s. Now in its fourth generation, the domaine holds prime parcels in four of the village's greatest 1er Crus. Les Saint Georges ($225), the southernmost and most powerful, is widely considered the village's unofficial Grand Cru — Gouges has petitioned for its promotion. Les Vaucrains is structured and tannic, Les Pruliers is spicy and complex, and Clos des Porrets is the most approachable young.",
    tier: 2, wines: [
      { name: "NSG 1er Cru Clos des Porrets Saint-Georges 2023", price: 145, type: "red", grape: "Pinot Noir" },
      { name: "NSG 1er Cru Les Pruliers 2023", price: 165, type: "red", grape: "Pinot Noir" },
      { name: "NSG 1er Cru Les Vaucrains 2023", price: 189, type: "red", grape: "Pinot Noir" },
      { name: "NSG 1er Cru Les Saint Georges 2023", price: 225, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 25, name: "Jean-Marc Millot", station: 25, x: 42, y: 44,
    pron: "zhahn-MARK mee-YOH",
    region: "Vosne-Romanée", village: "Nuits-Saint-Georges", subregion: "Côte de Nuits", est: "1980s",
    soil: "Clay-limestone with gravel, prime mid-slope Grand Cru positions",
    bio: "Jean-Marc Millot produces outstanding Grand Cru Burgundy from some of the Côte de Nuits' most revered vineyards. His Clos de Vougeot comes from 'Grand Maupertui' — a high-slope sector near the château that's considered far superior to the lower, flatter parts of this famously variable Grand Cru. The Echézeaux is from similarly well-placed vines. Millot uses significant whole-cluster fermentation (stems included), giving his wines a perfumed, silky character. His village-level Savigny and Côte de Nuits-Villages are great entry points at reasonable prices.",
    tier: 2, wines: [
      { name: 'Côte de Nuits-Villages "Aux Faulques" 2023', price: 69, type: "red", grape: "Pinot Noir" },
      { name: "Savigny-lès-Beaune 2023", price: 59, type: "red", grape: "Pinot Noir" },
      { name: 'Clos de Vougeot Grand Cru "Grand Maupertui" 2023', price: 395, type: "red", grape: "Pinot Noir" },
      { name: "Echézeaux Grand Cru 2023", price: 525, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 26, name: "Domaine d'Eugénie", station: 26, x: 62, y: 44,
    pron: "doh-MEN duh-zhay-NEE",
    region: "Vosne-Romanée", village: "Vosne-Romanée", subregion: "Côte de Nuits", est: "2006",
    soil: "Thin limestone topsoil with clay and gravel, legendary Vosne terroir",
    bio: "Domaine d'Eugénie is the Pinault family's Vosne-Romanée estate — purchased in 2006 and renamed from the historic Domaine René Engel. With the resources of François Pinault (who also owns Château Latour), no expense is spared: a new gravity-flow winery, meticulous parcel-by-parcel farming, and the guidance of some of Burgundy's finest consultants. The Grands Echézeaux ($1,795) is from a Grand Cru that directly borders Clos de Vougeot's best sector. Vosne-Romanée Brûlées ($925) is a 1er Cru adjacent to Richebourg — effectively Grand Cru quality. The 'Clos d'Eugénie' village wine is from a monopole walled vineyard.",
    tier: 1, wines: [
      { name: "Vosne-Romanée \"Clos d'Eugénie\" 2023", price: 495, type: "red", grape: "Pinot Noir" },
      { name: "Vosne-Romanée 1er Cru Brûlées 2023", price: 925, type: "red", grape: "Pinot Noir" },
      { name: "Clos Vougeot Grand Cru 2023", price: 1195, type: "red", grape: "Pinot Noir" },
      { name: "Grands Echézeaux Grand Cru 2023", price: 1795, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 27, name: "Château de la Tour", station: 27, x: 60, y: 50,
    pron: "shah-TOH duh lah TOOR",
    region: "Clos de Vougeot", village: "Vougeot", subregion: "Côte de Nuits", est: "1890",
    soil: "Clay-limestone, variable across the 50-hectare Clos — best parcels are mid to upper slope",
    bio: "Château de la Tour is the largest single owner within the walls of Clos de Vougeot — and the only domaine that still vinifies its wines inside the historic Clos itself. Their 6 hectares span the middle and upper portions of this legendary 50-hectare Grand Cru (the lower, flatter part near the road is considered inferior). The Vieilles Vignes cuvée ($615) comes from vines over 100 years old — some planted before phylloxera — producing wine of extraordinary concentration and complexity. The Labet wines (Pierre Labet is a related label) are excellent-value alternatives from Meursault and Beaune.",
    tier: 2, wines: [
      { name: 'Clos Vougeot Grand Cru "Cuvée Classique" 2023', price: 325, type: "red", grape: "Pinot Noir" },
      { name: "Clos Vougeot Vieilles Vignes 2023", price: 615, type: "red", grape: "Pinot Noir" },
      { name: 'Pierre Labet, Meursault "Les Tillets" 2023', price: 145, type: "white", grape: "Chardonnay" },
      { name: "Pierre Labet, Beaune 1er Cru Clos des Coucherias 2023", price: 125, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 28, name: "Robert Groffier", station: 28, x: 55, y: 56,
    pron: "roh-BEHR groh-FYAY",
    region: "Chambolle-Musigny", village: "Morey-Saint-Denis", subregion: "Côte de Nuits", est: "1933",
    soil: "Thin chalky clay over limestone, gentle east-facing slopes",
    bio: "Nicolas Groffier (fourth generation) continues a family legacy built on some of Chambolle-Musigny's most coveted vineyards. The star is Les Amoureuses ($754) — a 1er Cru that tastes and prices like Grand Cru, sitting just below Musigny on the slope. Only 5 hectares exist, and Groffier owns a full hectare — one of the largest holdings. The name means 'The Lovers' and the wine lives up to it: seductive, perfumed, incredibly silky. Bonnes Mares ($849) straddles Chambolle and Morey, producing a darker, more structured Grand Cru. The Chambertin-Clos de Bèze ($3,120) is their rarest — profound, age-worthy, monumental.",
    tier: 1, wines: [
      { name: "Chambolle-Musigny 1er Cru Les Amoureuses 2023", price: 754, type: "red", grape: "Pinot Noir" },
      { name: "Bonnes Mares Grand Cru 2023", price: 849, type: "red", grape: "Pinot Noir" },
      { name: "Chambertin-Clos de Bèze Grand Cru 2023", price: 3120, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 29, name: "Comte Georges de Vogüé", station: 29, x: 43, y: 56,
    pron: "kohmt zhorzh duh voh-GWAY",
    region: "Chambolle-Musigny", village: "Chambolle-Musigny", subregion: "Côte de Nuits", est: "1450",
    soil: "Thin limestone scree with red clay, very steep, perfectly east-facing",
    bio: "Twenty generations. That's how long the de Vogüé family has owned vineyards in Musigny — since 1450. They control 70% of the Musigny Grand Cru, making them effectively the sole custodians of what many consider Burgundy's single greatest vineyard. The Musigny Vieilles Vignes ($1,191) is ethereal: perfumed with roses, violets, and red fruits, impossibly silky, yet with an iron core that develops for decades. The Musigny Blanc ($1,195) is the only white Grand Cru in the Côte de Nuits — produced from a tiny 0.65-hectare plot of Chardonnay surrounded by Pinot Noir. Only ~300 cases made. Bonnes-Mares ($825) is their 'other' Grand Cru — darker and more muscular.",
    tier: 1, wines: [
      { name: "Musigny Blanc Grand Cru 2023", price: 1195, type: "white", grape: "Chardonnay" },
      { name: "Chambolle-Musigny 2023", price: 340, type: "red", grape: "Pinot Noir" },
      { name: "Bonnes-Mares Grand Cru 2023", price: 825, type: "red", grape: "Pinot Noir" },
      { name: "Musigny Grand Cru Vieilles Vignes 2023", price: 1191, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 30, name: "Arlaud", station: 30, x: 78, y: 48,
    pron: "ahr-LOH",
    region: "Morey-Saint-Denis", village: "Morey-Saint-Denis", subregion: "Côte de Nuits", est: "1942",
    soil: "Deep clay-limestone on steep slopes, biodynamically cultivated",
    bio: "Cyprien Arlaud farms 15 hectares biodynamically in Morey-Saint-Denis, a village sandwiched between Gevrey-Chambertin and Chambolle-Musigny that often combines the power of the former with the elegance of the latter. His Clos de la Roche ($468) comes from the village's largest and most celebrated Grand Cru — a complex vineyard with multiple soil types producing wine of depth and spice. Les Ruchots ($200) is from a steep 1er Cru at the Chambolle border, yielding silky, perfumed Pinot. The village Morey ($88) is one of the best introductions to this underappreciated commune.",
    tier: 2, wines: [
      { name: "Morey-Saint-Denis 2023", price: 88, type: "red", grape: "Pinot Noir" },
      { name: "Morey-Saint-Denis 1er Cru Aux Cheseaux 2023", price: 120, type: "red", grape: "Pinot Noir" },
      { name: "Morey-Saint-Denis 1er Cru Les Ruchots 2023", price: 200, type: "red", grape: "Pinot Noir" },
      { name: "Clos de la Roche Grand Cru 2023", price: 468, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 31, name: "Hubert Lignier", station: 31, x: 78, y: 41,
    pron: "oo-BEHR lee-NYAY",
    region: "Morey-Saint-Denis", village: "Morey-Saint-Denis", subregion: "Côte de Nuits", est: "1880s",
    soil: "Iron-rich limestone and clay, old vine roots deep in fractured rock",
    bio: "Laurent Lignier (son of the late Hubert) has elevated this estate to the top tier of Morey-Saint-Denis. His Clos de la Roche Grand Cru ($725) is from old vines in the heart of this great vineyard, producing wine of extraordinary concentration and spice — dark-fruited, earthy, and built to last. Compare it side-by-side with Arlaud's version (next door at station 30) to see how two biodynamic producers interpret the same Grand Cru differently. The 'Trilogie' village cuvée ($115) blends fruit from three different vineyard sites, making it an excellent introduction to the house style.",
    tier: 2, wines: [
      { name: 'Morey-Saint-Denis "Trilogie" 2023', price: 115, type: "red", grape: "Pinot Noir" },
      { name: "Morey-Saint-Denis 1er Cru Vieilles Vignes 2023", price: 265, type: "red", grape: "Pinot Noir" },
      { name: "Morey-Saint-Denis 1er Cru Les Chaffots 2023", price: 285, type: "red", grape: "Pinot Noir" },
      { name: "Clos de la Roche 2023", price: 725, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 32, name: "Duroché", station: 32, x: 78, y: 8,
    pron: "doo-roh-SHAY",
    region: "Gevrey-Chambertin", village: "Gevrey-Chambertin", subregion: "Côte de Nuits", est: "1933",
    soil: "Limestone and marl with iron-rich clay, steep east-facing",
    bio: "Pierre Duroché has catapulted this family domaine from obscurity to superstar status in barely a decade. Taking over from his father in 2005, he slashed yields, converted to organic farming, and introduced whole-cluster fermentation that gives his wines a perfumed lift. The Lavaut-Saint-Jacques ($360) is from one of Gevrey's greatest 1er Crus — a steep, south-facing slope that produces concentrated, age-worthy Pinot Noir. The Charmes-Chambertin Grand Cru ($590) is rich and generous. In 2018, the Bouygues brothers (French construction billionaires, also owners of Clos Rougeard in the Loire) acquired a majority stake, funding further improvements.",
    tier: 1, wines: [
      { name: "Gevrey-Chambertin 2023", price: 132, type: "red", grape: "Pinot Noir" },
      { name: 'Gevrey-Chambertin "Champ" 2023', price: 140, type: "red", grape: "Pinot Noir" },
      { name: "Gevrey-Chambertin 1er Cru Lavaut-Saint-Jacques 2023", price: 360, type: "red", grape: "Pinot Noir" },
      { name: "Charmes-Chambertin Grand Cru 2023", price: 590, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 33, name: "Fourrier", station: 33, x: 78, y: 4,
    pron: "foo-RYAY",
    region: "Gevrey-Chambertin", village: "Gevrey-Chambertin", subregion: "Côte de Nuits", est: "1930s",
    soil: "Shallow limestone rubble, mid-slope, cool-climate Gevrey",
    bio: "Jean-Marie Fourrier is a Gevrey-Chambertin master who makes some of the most refined, ethereal wines in a village known for power. Where many Gevrey producers aim for extraction and concentration, Fourrier pursues transparency: his wines are medium-bodied, perfumed, and incredibly detailed, revealing the specific character of each vineyard. The Clos Saint Jacques ($589) is Gevrey's greatest 1er Cru — a steep, south-facing amphitheater that many believe deserves Grand Cru status (it was actually proposed for promotion in 1936). Fourrier's version is pure silk. Combe aux Moines ($445) shows darker, more savory Gevrey character.",
    tier: 1, wines: [
      { name: "Gevrey-Chambertin 2023", price: 185, type: "red", grape: "Pinot Noir" },
      { name: "Gevrey-Chambertin 1er Cru Les Goulots 2023", price: 365, type: "red", grape: "Pinot Noir" },
      { name: "Gevrey-Chambertin 1er Cru Combe aux Moines 2023", price: 445, type: "red", grape: "Pinot Noir" },
      { name: "Gevrey-Chambertin 1er Cru Clos Saint Jacques 2023", price: 589, type: "red", grape: "Pinot Noir" },
    ]
  },
  {
    id: 34, name: "Trapet Père & Fils", station: 34, x: 78, y: 2,
    pron: "trah-PAY pehr ay FEESS",
    region: "Gevrey-Chambertin", village: "Gevrey-Chambertin", subregion: "Côte de Nuits", est: "1870",
    soil: "Ancient limestone and marl, biodynamically farmed since 1996",
    bio: "Jean-Louis Trapet was one of Burgundy's earliest converts to biodynamics (1996), and his Gevrey-Chambertin wines show the depth and vitality that great farming brings. The Chambertin Grand Cru ($870) is the crown jewel: from Le Chambertin itself — the vineyard that Napoleon famously loved, and that gives its name to the village. This is one of Burgundy's most profound wines, capable of aging 50+ years. Latricières-Chambertin ($650) sits just south of Le Chambertin and is considered its closest sibling in style. The village cuvée '1859' is named for the year the family's oldest vines were planted — still producing today.",
    tier: 1, wines: [
      { name: 'Gevrey-Chambertin "1859" 2023', price: 170, type: "red", grape: "Pinot Noir" },
      { name: "Gevrey-Chambertin 1er Cru Aux Combottes 2023", price: 238, type: "red", grape: "Pinot Noir" },
      { name: "Chambertin Grand Cru 2023", price: 870, type: "red", grape: "Pinot Noir" },
      { name: "Latricières-Chambertin Grand Cru 2023", price: 650, type: "red", grape: "Pinot Noir" },
    ]
  },
];
const FOOD_VENDORS = [
  { name: "Haute Caviar", x: 10, y: 3, icon: "🥂" },
  { name: "Taylor Shellfish", x: 5, y: 11, icon: "🦪" },
  { name: "Kru", x: 35, y: 4, icon: "🐟" },
  { name: "Brasserie Boulud", x: 30, y: 42, icon: "🍽️" },
  { name: "Despana", x: 82, y: 12, icon: "🧀" },
  { name: "Noreetuh", x: 82, y: 16, icon: "🍜" },
  { name: "Lafayette", x: 82, y: 20, icon: "🥐" },
  { name: "Veselka", x: 82, y: 28, icon: "🥟" },
  { name: "Banh by Lauren", x: 82, y: 56, icon: "🍢" },
  { name: "Andante Dairy", x: 30, y: 46, icon: "🧈" },
  { name: "Gourmet Altitude", x: 68, y: 8, icon: "🫕" },
  { name: "Manhatta", x: 20, y: 19, icon: "🍸" },
];
const TIER_META = {
  1: { label: "RUSH FIRST", color: "#FF2D55", desc: "Will run out — go at door open" },
  2: { label: "HIGH PRIORITY", color: "#FF9500", desc: "Popular but slightly more supply" },
  3: { label: "DON'T MISS", color: "#5CE1E6", desc: "Excellent quality, less pressure" },
  4: { label: "EXPLORE", color: "#34C759", desc: "Great value & hidden gems" },
};
const WALK_ROUTE = [
  { id: 3, note: "FIRST STOP. Sprint here at noon. Raveneau Les Clos is a $1,200 bottle you'll never get a pour of again." },
  { id: 29, note: "Cross to lower hall. Musigny VV ($1,100) and the ultra-rare Musigny Blanc ($1,300). Don't skip the Chambolle village either." },
  { id: 28, note: "Right next door. Groffier's Amoureuses ($870) is liquid seduction. Three wines, all Grand Cru-level." },
  { id: 26, note: "Stay in lower hall. D'Eugénie's Grands Echézeaux ($650) is Pinault money at work. Taste the Brûlées too." },
  { id: 19, note: "Back toward center. Dugat-Py's Mazoyères ($600) is dense, old-vine Gevrey. Their Corton-Charlemagne ($450) is a sleeper." },
  { id: 11, note: "Upper hall. Comtes Lafon Charmes ($500) — the Meursault benchmark. Clos de la Barre is the 'value' at $220." },
  { id: 32, note: "Right wall. Pierre Duroché's Lavaut-Saint-Jacques ($200). Superstar Gevrey." },
  { id: 33, note: "Next door. Fourrier's Clos Saint Jacques ($450) — one of Burgundy's greatest 1er Crus." },
  { id: 34, note: "Complete the Gevrey trio. Trapet Chambertin Grand Cru ($550) is biodynamic and profound." },
  { type: "food", name: "🍽️ FOOD BREAK — Despana or Gourmet Altitude", note: "You've hit 9 stations. Eat. Drink water. Reset your palate." },
  { id: 17, note: "Cabottes' Chevalier-Montrachet ($550) — Grand Cru white. The Enfant Jésus ($150) is historic Beaune." },
  { id: 8, note: "Salon 2015 ($700) — only made 37 times in a century. Then cleanse with Delamotte." },
  { id: 12, note: "Leroux Bâtard-Montrachet GC ($550). Then Meursault Charmes-Dessus ($150)." },
  { id: 2, note: "William Fèvre Les Clos ($120) — compare to Raveneau's version from earlier." },
  { id: 18, note: "Hospices de Beaune Echézeaux cuvée ($350). 600 years of charity winemaking." },
  { id: 13, note: "Mugnier's Commaraine monopole ($150) — rare Pommard from a Chambolle legend." },
  { id: 24, note: "Gouges' Les Saint Georges ($180) — the unofficial Grand Cru of Nuits." },
  { id: 25, note: "Millot's Echézeaux ($280) and Clos de Vougeot ($250). Value Grand Crus." },
  { id: 27, note: "Château de la Tour VV ($300) — only estate that vinifies inside the Clos walls." },
  { type: "food", name: "🦪 FOOD BREAK — Taylor Shellfish or Boulud", note: "Halfway done. Oysters + water. Full palate reset before round 2." },
  { id: 30, note: "Arlaud's Clos de la Roche ($300). Biodynamic Morey perfection." },
  { id: 31, note: "Hubert Lignier Clos de la Roche ($350) — compare to Arlaud's side by side." },
  { id: 1, note: "Moreau-Naudet's Chablis 1er Crus (~$65). Quieter, mineral-driven style." },
  { id: 4, note: "Vocoret Grand Cru Blanchot ($95) — biodynamic Chablis with tension." },
  { id: 9, note: "Pillot's Caillerets ($100) — serious Chassagne from old vines." },
  { id: 10, note: "Alex Moreau — next-gen Chassagne. Pure and crystalline." },
  { id: 7, note: "Simon Colin — Colin dynasty. Rising star whites." },
  { id: 14, note: "Génot-Boulanger Corton Grand Cru ($140). Underrated table." },
  { id: 20, note: "Rougeot's no-sulfur Meursault Charmes ($110). Fascinating experiment." },
  { id: 22, note: "Rossignol Volnay Santenots ($95) — the Volnay-Pommard bridge." },
  { id: 5, note: "Merlin's Pouilly-Fuissé — best value whites in the room ($50–65)." },
  { id: 15, note: "Dominique Lafon's personal label — Beaune Epenottes at $85 is a steal." },
  { id: 16, note: "Guilbert-Gillet Savigny — cheapest wines here ($32–45) and charming." },
  { id: 23, note: "Fornerol's Côte de Nuits-Villages ($22–35) — killer value." },
  { id: 21, note: "Finish with the Aligoteurs — 18 different Aligotés. Victory lap." },
];
// ─── TTS ──────────────────────────────────────────────────────────────────────
let frenchVoice = null;
function loadVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const v = window.speechSynthesis.getVoices();
  frenchVoice = v.find(x => x.lang === "fr-FR") || v.find(x => x.lang.startsWith("fr")) || null;
}
if (typeof window !== "undefined" && window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
function speak(text) {
  if (!window.speechSynthesis) return;
  if (!frenchVoice) loadVoices();
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  u.rate = 0.75;
  if (frenchVoice) u.voice = frenchVoice;
  window.speechSynthesis.speak(u);
}

function tierColor(t) { return TIER_META[t]?.color || "#888"; }
function wineIcon(t) { return t === "red" ? "🔴" : t === "champagne" ? "🥂" : "⚪"; }

// ─── SVG MAP ──────────────────────────────────────────────────────────────────
function FloorMap({ onSelect, selectedId, tastingLog }) {
  return (
    <div>
      <svg viewBox="0 0 90 64" style={{ width:"100%", display:"block" }}>
        <rect width="90" height="64" fill="#111" />
        <rect x="2" y="1" width="85" height="26" rx="1.5" fill="#181818" stroke="#252525" strokeWidth="0.2" />
        <rect x="25" y="28" width="62" height="34" rx="1.5" fill="#181818" stroke="#252525" strokeWidth="0.2" />
        <rect x="2" y="28" width="22" height="34" rx="1.5" fill="#141414" stroke="#252525" strokeWidth="0.2" />
        <text x="13" y="44" textAnchor="middle" fill="#333" fontSize="2" fontFamily="sans-serif">ENTRANCE</text>
        {FOOD_VENDORS.map((f, i) => (
          <text key={i} x={f.x} y={f.y+0.5} textAnchor="middle" fill="#3D7A3D" fontSize="1.3" fontFamily="sans-serif">{f.icon} {f.name}</text>
        ))}
        {PRODUCERS.map(p => {
          const sel = selectedId === p.id;
          const logged = tastingLog[p.id] && Object.keys(tastingLog[p.id]).length > 0;
          const r = p.tier === 1 ? 3 : 2.5;
          return (
            <g key={p.id} onClick={() => onSelect(p.id)} style={{ cursor:"pointer" }}>
              <circle cx={p.x} cy={p.y} r={r+2} fill="transparent" />
              <circle cx={p.x} cy={p.y} r={r} fill={sel ? tierColor(p.tier) : "#222"} stroke={tierColor(p.tier)} strokeWidth={sel ? 0.7 : 0.3} />
              <text x={p.x} y={p.y+0.7} textAnchor="middle" dominantBaseline="central" fill={sel?"#000":"#fff"} fontSize="2" fontWeight="700" fontFamily="sans-serif">{p.station}</text>
              {logged && <circle cx={p.x+r-0.3} cy={p.y-r+0.3} r="0.8" fill="#D4A843" />}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── VENUE MAP (original JPEG) ────────────────────────────────────────────────
function VenueMap() {
  return (
    <div style={{ overflowY:"auto", height:"calc(100vh - 100px)", WebkitOverflowScrolling:"touch", background:"#fff" }}>
      <img src="/map.jpg" alt="Venue Map" style={{ width:"100%", display:"block" }} />
    </div>
  );
}

// ─── GEOGRAPHY STRIP ──────────────────────────────────────────────────────────
function GeoStrip({ subregion }) {
  const regions = ["Chablis", "Côte de Nuits", "Côte de Beaune", "Mâconnais", "Champagne"];
  return (
    <div style={{ display:"flex", gap:2, alignItems:"center", marginBottom:16 }}>
      {regions.map(r => {
        const active = r === subregion;
        return (
          <div key={r} style={{ flex:1, textAlign:"center" }}>
            <div style={{ height:4, borderRadius:2, background: active ? "#D4A843" : "#2A2A2A", marginBottom:3 }} />
            <div style={{ fontSize:8, color: active ? "#D4A843" : "#444", fontWeight: active ? 700 : 400 }}>
              {r === "Côte de Nuits" ? "C. Nuits" : r === "Côte de Beaune" ? "C. Beaune" : r === "Mâconnais" ? "Mâcon" : r}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── PRODUCER DETAIL ──────────────────────────────────────────────────────────
function ProducerDetail({ producer: p, onClose, tastingLog, setTastingLog }) {
  const [openWine, setOpenWine] = useState(null);
  if (!p) return null;

  const logWine = (i, rating, note) => {
    setTastingLog(prev => {
      const u = { ...prev }; if (!u[p.id]) u[p.id] = {};
      u[p.id][i] = { rating, note, time: new Date().toLocaleTimeString() }; return u;
    });
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"#111", zIndex:100, overflowY:"auto", paddingBottom:40 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #222" }}>
        <span style={{ padding:"3px 10px", borderRadius:4, background:tierColor(p.tier), color:"#000", fontSize:11, fontWeight:800 }}>{TIER_META[p.tier].label}</span>
        <button onClick={onClose} style={{ background:"#222", border:"none", color:"#fff", width:36, height:36, borderRadius:18, fontSize:16, cursor:"pointer" }}>✕</button>
      </div>
      <div style={{ padding:16 }}>
        <h2 style={{ margin:"0 0 4px", fontSize:22, fontWeight:700 }}>{p.name}</h2>
        <div style={{ color:"#777", fontSize:13, marginBottom:12 }}>Station {p.station} · {p.village || p.region} · Est. {p.est}</div>

        {/* Geography strip */}
        {p.subregion && <GeoStrip subregion={p.subregion} />}

        {/* Pronunciation */}
        <button onClick={() => speak(p.name)} style={{ background:"#1A1A1A", border:"1px solid #333", borderRadius:8, color:"#D4A843", padding:"12px 14px", fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", gap:10, width:"100%", marginBottom:12 }}>
          <span style={{ fontSize:20 }}>🔊</span>
          <span style={{ fontStyle:"italic", color:"#ccc", flex:1 }}>{p.pron}</span>
          <span style={{ fontSize:11, color:"#555" }}>TAP</span>
        </button>

        {/* Soil/terroir */}
        {p.soil && (
          <div style={{ background:"#1A1A1A", borderRadius:8, padding:"10px 14px", marginBottom:12, borderLeft:"3px solid #6B5B3E" }}>
            <div style={{ fontSize:10, color:"#6B5B3E", fontWeight:700, letterSpacing:1, marginBottom:3 }}>TERROIR</div>
            <div style={{ fontSize:13, color:"#999", lineHeight:1.4 }}>{p.soil}</div>
          </div>
        )}

        {/* Bio */}
        <p style={{ color:"#999", fontSize:14, lineHeight:1.7, margin:"0 0 20px" }}>{p.bio}</p>

        <div style={{ fontSize:13, fontWeight:700, color:"#D4A843", letterSpacing:1, marginBottom:12 }}>WINES</div>
        {p.wines.map((w, i) => {
          const log = tastingLog[p.id]?.[i];
          const isOpen = openWine === i;
          const speakName = w.name.replace(/\s*20\d{2}.*$/, "").replace(/\s*\(.*\)$/, "");
          return (
            <div key={i} style={{ background:"#1A1A1A", borderRadius:10, padding:"14px 16px", marginBottom:8, border: log ? "1px solid #D4A843" : "1px solid #222" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:4 }}>
                <span style={{ fontSize:13, marginTop:1 }}>{wineIcon(w.type)}</span>
                <span style={{ flex:1, fontSize:15, fontWeight:600, lineHeight:1.3 }}>{w.name}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:6 }}>
                <span style={{ fontSize:12, color:"#777" }}>~${w.price}</span>
                {w.grape && <span style={{ fontSize:11, color:"#555", background:"#1E1E1E", padding:"2px 7px", borderRadius:4 }}>{w.grape}</span>}
                <button onClick={() => speak(speakName)} style={{ background:"#222", border:"1px solid #333", borderRadius:6, color:"#D4A843", fontSize:12, padding:"4px 10px", cursor:"pointer" }}>
                  🔊
                </button>
                <div style={{ flex:1 }} />
                <button onClick={() => setOpenWine(isOpen ? null : i)} style={{ background:"none", border:"none", color:"#555", fontSize:13, cursor:"pointer", padding:"4px 8px" }}>
                  {isOpen ? "Close ▲" : "Rate ▼"}
                </button>
              </div>
              {isOpen && (
                <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid #222" }}>
                  <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => logWine(i, s, log?.note || "")} style={{ background:"none", border:"none", fontSize:28, cursor:"pointer", color:(log?.rating||0)>=s?"#D4A843":"#333", padding:0 }}>★</button>
                    ))}
                  </div>
                  <textarea placeholder="Your tasting note..." value={log?.note||""} onChange={e => logWine(i, log?.rating||0, e.target.value)}
                    style={{ width:"100%", background:"#111", border:"1px solid #333", borderRadius:8, color:"#fff", padding:10, fontSize:14, minHeight:70, resize:"vertical", fontFamily:"inherit", boxSizing:"border-box" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ROUTE ────────────────────────────────────────────────────────────────────
function RouteView({ onSelect, tastingLog }) {
  const visited = new Set();
  PRODUCERS.forEach(p => { if (tastingLog[p.id] && Object.keys(tastingLog[p.id]).length > 0) visited.add(p.id); });
  return (
    <div style={{ padding:16 }}>
      <h2 style={{ margin:"0 0 4px", fontSize:20, fontWeight:700 }}>Walking Route</h2>
      <p style={{ color:"#777", fontSize:13, margin:"0 0 16px" }}>{visited.size}/{PRODUCERS.length} stations visited</p>
      {WALK_ROUTE.map((stop, i) => {
        if (stop.type === "food") return (
          <div key={`f${i}`} style={{ background:"#141E14", borderRadius:10, padding:"12px 16px", marginBottom:8, borderLeft:"3px solid #3D7A3D" }}>
            <div style={{ color:"#4A8C4A", fontSize:14, fontWeight:700 }}>{stop.name}</div>
            <div style={{ color:"#777", fontSize:12, marginTop:4 }}>{stop.note}</div>
          </div>
        );
        const p = PRODUCERS.find(pr => pr.id === stop.id);
        if (!p) return null;
        const done = visited.has(p.id);
        return (
          <div key={p.id} onClick={() => onSelect(p.id)} style={{
            background:"#1A1A1A", borderRadius:10, padding:"12px 14px", marginBottom:6,
            borderLeft:`3px solid ${tierColor(p.tier)}`, opacity:done?0.35:1,
            display:"flex", gap:12, alignItems:"flex-start", cursor:"pointer"
          }}>
            <div style={{ width:26, height:26, borderRadius:13, background:tierColor(p.tier), display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"#000", flexShrink:0 }}>
              {done?"✓":i+1}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600 }}>#{p.station} {p.name}</div>
              <div style={{ color:"#666", fontSize:12, marginTop:4, lineHeight:1.4 }}>{stop.note}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── LOG ──────────────────────────────────────────────────────────────────────
function LogView({ tastingLog }) {
  const entries = [];
  PRODUCERS.forEach(p => { if (tastingLog[p.id]) Object.entries(tastingLog[p.id]).forEach(([i, log]) => { if (log.rating>0||log.note) entries.push({ p, i:+i, log }); }); });
  entries.sort((a,b) => (b.log.rating||0)-(a.log.rating||0));
  const total = entries.reduce((s,e) => s+(e.p.wines[e.i]?.price||0), 0);
  return (
    <div style={{ padding:16 }}>
      <h2 style={{ margin:"0 0 4px", fontSize:20, fontWeight:700 }}>Tasting Log</h2>
      <p style={{ color:"#777", fontSize:13, margin:"0 0 16px" }}>{entries.length} wine{entries.length!==1?"s":""}</p>
      {entries.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 20px", color:"#444" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🍷</div>
          <div>Tap a station on the map to start.</div>
        </div>
      ) : <>
        {entries.map((e, idx) => (
          <div key={idx} style={{ background:"#1A1A1A", borderRadius:10, padding:"12px 14px", marginBottom:8, borderLeft:`3px solid ${tierColor(e.p.tier)}` }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600 }}>{e.p.wines[e.i]?.name}</div>
                <div style={{ color:"#777", fontSize:12, marginTop:2 }}>{e.p.name} · ~${e.p.wines[e.i]?.price}</div>
              </div>
              <div style={{ color:"#D4A843", fontSize:13 }}>{"★".repeat(e.log.rating)}{"☆".repeat(5-e.log.rating)}</div>
            </div>
            {e.log.note && <p style={{ color:"#999", fontSize:13, margin:"6px 0 0", fontStyle:"italic" }}>"{e.log.note}"</p>}
          </div>
        ))}
        <div style={{ background:"#1A1A0A", borderRadius:10, padding:14, border:"1px solid #333", marginTop:8 }}>
          <div style={{ color:"#D4A843", fontSize:12, fontWeight:700 }}>SESSION</div>
          <div style={{ color:"#999", fontSize:13, marginTop:4 }}>{entries.length} wines · {(entries.reduce((s,e)=>s+e.log.rating,0)/entries.length).toFixed(1)}★ avg · ~${total.toLocaleString()} value</div>
        </div>
      </>}
    </div>
  );
}

// ─── FOOD REMINDER ────────────────────────────────────────────────────────────
function FoodReminder({ count, dismissed, onDismiss }) {
  if (dismissed || count < 1 || count % 6 !== 0) return null;
  const tips = ["Oysters at Taylor Shellfish 🦪","Brasserie Boulud 🍽️","Despana charcuterie 🧀","Veselka pierogies 🥟","Haute Caviar 🥂"];
  return (
    <div style={{ position:"fixed", top:54, left:12, right:12, zIndex:200, background:"#1A2A1A", border:"1px solid #3D7A3D", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ flex:1 }}>
        <div style={{ color:"#4A8C4A", fontSize:12, fontWeight:700 }}>🍴 FOOD BREAK — {count} wines in</div>
        <div style={{ color:"#fff", fontSize:13, marginTop:2 }}>{tips[Math.floor(count/6)%tips.length]}</div>
      </div>
      <button onClick={onDismiss} style={{ background:"none", border:"none", color:"#4A8C4A", fontSize:18, cursor:"pointer" }}>✕</button>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("map");
  const [selectedId, setSelectedId] = useState(null);
  const [tastingLog, setTastingLog] = useState({});
  const [foodOff, setFoodOff] = useState(false);

  const wineCount = Object.values(tastingLog).reduce((s, p) => s + Object.keys(p).length, 0);
  useEffect(() => { setFoodOff(false); }, [wineCount]);
  useEffect(() => { try { const s = localStorage.getItem("lp-tasting-2026"); if (s) setTastingLog(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("lp-tasting-2026", JSON.stringify(tastingLog)); } catch {} }, [tastingLog]);

  const selected = PRODUCERS.find(p => p.id === selectedId);

  // Legend for map tab
  const Legend = () => (
    <div style={{ display:"flex", justifyContent:"center", gap:14, padding:"8px 16px", background:"#111", borderBottom:"1px solid #222", flexWrap:"wrap" }}>
      {Object.entries(TIER_META).map(([t, m]) => (
        <div key={t} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"#777" }}>
          <span style={{ width:9, height:9, borderRadius:5, background:m.color, display:"inline-block" }} />{m.label}
        </div>
      ))}
    </div>
  );

  const tabs = [
    {id:"map",icon:"🗺️",l:"Map"},
    {id:"venue",icon:"📍",l:"Venue"},
    {id:"route",icon:"🚶",l:"Route"},
    {id:"log",icon:"📝",l:"Log"},
  ];

  return (
    <div style={{ background:"#111", minHeight:"100vh", color:"#fff", fontFamily:"system-ui, -apple-system, sans-serif", maxWidth:480, margin:"0 auto", paddingBottom:60 }}>
      <div style={{ padding:"12px 16px", borderBottom:"1px solid #222", position:"sticky", top:0, zIndex:50, background:"#111" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h1 style={{ margin:0, fontSize:17, fontWeight:700, color:"#D4A843" }}>LA PAULÉE NYC 2026</h1>
            <div style={{ color:"#666", fontSize:10, letterSpacing:1, marginTop:2 }}>GRAND TASTING · SAT MAR 28 · 12–3PM</div>
          </div>
          <div style={{ background:"#1A1A1A", borderRadius:8, padding:"5px 10px", fontSize:13, color:"#D4A843", fontWeight:700 }}>{wineCount} 🍷</div>
        </div>
      </div>

      <FoodReminder count={wineCount} dismissed={foodOff} onDismiss={() => setFoodOff(true)} />

      {tab === "map" && <>
        <Legend />
        <FloorMap onSelect={setSelectedId} selectedId={selectedId} tastingLog={tastingLog} />
      </>}
      {tab === "venue" && <VenueMap />}
      {tab === "route" && <RouteView onSelect={setSelectedId} tastingLog={tastingLog} />}
      {tab === "log" && <LogView tastingLog={tastingLog} />}

      {selected && <ProducerDetail producer={selected} onClose={() => setSelectedId(null)} tastingLog={tastingLog} setTastingLog={setTastingLog} />}

      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"#111", borderTop:"1px solid #222", display:"flex", zIndex:90 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setSelectedId(null); setTab(t.id); }}
            style={{ flex:1, background:"transparent", border:"none", color:tab===t.id?"#D4A843":"#444", padding:"10px 0 8px", cursor:"pointer", fontSize:10, fontWeight:tab===t.id?700:400, fontFamily:"system-ui" }}>
            <div style={{ fontSize:18, marginBottom:1 }}>{t.icon}</div>{t.l}
          </button>
        ))}
      </div>
    </div>
  );
}
