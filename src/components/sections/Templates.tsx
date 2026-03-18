"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  FileText,
  Brain,
  ClipboardList,
  Heart,
  Stethoscope,
  MessageSquare,
  Users,
  Baby,
  UserCheck,
  BarChart3,
  ScrollText,
  PenLine,
  Activity,
  Send,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const templates = [
  {
    id: "adhd-interview",
    name: "ADHD Interview",
    description: "Gestructureerd klinisch interview voor ADHD-diagnostiek bij volwassenen en kinderen.",
    icon: Brain,
    color: "#6366f1",
    preview: [
      { label: "Aandacht & Concentratie", text: "Patiënt rapporteert aanzienlijke moeite met het vasthouden van langdurige concentratie, zowel op het werk als thuis. Hij geeft aan dat hij regelmatig afspraken vergeet en moeite heeft om taken af te maken die veel aandacht vereisen. Bij het lezen van documenten merkt hij dat hij na enkele minuten afdwaalt en de inhoud niet meer kan reproduceren. Op het werk ontvangt hij klachten van collega's over onafgemaakte projecten en gemiste deadlines. Zijn partner bevestigt dat hij thuis frequent vergeet wat hem is gevraagd en moeite heeft met het plannen van huishoudelijke taken." },
      { label: "Hyperactiviteit", text: "Patiënt beschrijft een constante innerlijke onrust die al sinds de kindertijd aanwezig is. Tijdens vergaderingen op het werk kan hij niet langer dan 10-15 minuten stilzitten en voelt hij de drang om op te staan of te bewegen. Hij friemelt veel met pennen en paperclips, trommelt met zijn vingers op tafel en wipt met zijn benen. 's Avonds kan hij moeilijk tot rust komen en heeft hij het gevoel dat zijn gedachten constant doorrazen. Zijn slaap is hierdoor ook verstoord; het duurt gemiddeld 45-60 minuten voordat hij in slaap valt." },
      { label: "Impulsiviteit", text: "Patiënt geeft aan dat hij collega's en gesprekspartners regelmatig onderbreekt, ook wanneer hij zich bewust probeert in te houden. Hij neemt impulsieve beslissingen zonder de gevolgen goed te overwegen, zoals het doen van grote aankopen of het aangaan van verplichtingen die hij vervolgens niet kan nakomen. In het verkeer neemt hij soms onnodige risico's door ongeduld. Hij heeft moeite met wachten op zijn beurt in gesprekken en bij de kassa. Financieel heeft de impulsiviteit geleid tot schulden door onbezonnen uitgaven." },
      { label: "Conclusie", text: "Op basis van het gestructureerde klinische interview is er een consistent beeld dat past bij ADHD, gecombineerd type, conform de DSM-5 criteria. Er zijn duidelijke symptomen van zowel onoplettendheid als hyperactiviteit-impulsiviteit die al aanwezig waren vóór het twaalfde levensjaar en die significant interfereren met het dagelijks functioneren op meerdere domeinen (werk, relatie, huishouden). Differentiaaldiagnostisch is er geen aanwijzing voor een angststoornis of bipolaire stoornis. Verwijzing naar de psychiater voor medicatie-evaluatie wordt aanbevolen, in combinatie met psycho-educatie en eventuele coachingondersteuning." },
    ],
  },
  {
    id: "autisme-interview",
    name: "Autisme Interview",
    description: "Diagnostisch interview voor autismespectrumstoornissen conform DSM-5 criteria.",
    icon: Heart,
    color: "#ec4899",
    preview: [
      { label: "Sociale Communicatie", text: "Patiënt heeft aanzienlijke moeite met het interpreteren van non-verbale communicatiesignalen. Hij neemt taal zeer letterlijk en mist vaak sarcasme, ironie en subtiele hints in gesprekken. In sociale situaties weet hij niet goed wanneer het zijn beurt is om te spreken en heeft hij moeite met het interpreteren van gezichtsuitdrukkingen van gesprekspartners. Eye contact wordt als ongemakkelijk en vermoeiend ervaren. Patiënt geeft aan dat hij zich in groepsgesprekken vaak verloren voelt en niet weet hoe hij moet aansluiten bij de lopende conversatie." },
      { label: "Sociale Interactie", text: "Patiënt heeft een beperkt aantal vriendschappen en geeft de voorkeur aan individuele activiteiten boven groepsactiviteiten. De vriendschappen die hij heeft, zijn voornamelijk gebaseerd op gedeelde specifieke interesses. Hij ervaart moeite met het aangaan en onderhouden van wederkerige relaties en begrijpt niet altijd wat anderen van hem verwachten in sociale situaties. Op het werk houdt hij zich graag afzijdig tijdens pauzes en zoekt hij een rustige plek op. Zijn partner geeft aan dat hij weinig initiatief neemt tot sociaal contact en dat het onderhouden van de relatie veel energie van hem vraagt." },
      { label: "Repetitief Gedrag", text: "Er zijn duidelijke patronen van rigide en repetitief gedrag zichtbaar. Patiënt houdt zich strikt aan vaste routines en dagindeling, raakt van slag bij onverwachte veranderingen in zijn planning. Hij heeft sterke specifieke interesses (treinen, weermodellen) waaraan hij dagelijks meerdere uren besteedt. Bij verandering in werkprocedures heeft hij significant meer tijd nodig dan collega's om zich aan te passen. Er zijn motorische stereotypieën waargenomen in de vorm van het herhaalmatig tikken met de vingers op het bureau bij concentratie." },
      { label: "Sensorische Gevoeligheid", text: "Patiënt is overgevoelig voor geluid, met name onverwachte of harde geluiden in openbare ruimtes. Hij draagt regelmatig oordoppen in de supermarkt en bij familiebijeenkomsten. Bepaalde texturen van kleding (labels, wol, synthetische stoffen) worden als zeer onaangenaam ervaren. Tl-verlichting op kantoor veroorzaakt hoofdpijn en vermoeidheid. Bepaalde geuren (parfum, schoonmaakmiddelen) leiden tot misselijkheid. De sensorische overprikkeling resulteert in vermoeidheid aan het einde van de werkdag die aanzienlijk groter is dan bij leeftijdsgenoten." },
    ],
  },
  {
    id: "depressieve-stoornis",
    name: "Depressieve Stoornis",
    description: "Screeningsinstrument voor depressieve stoornissen met ernstbeoordeling.",
    icon: Activity,
    color: "#8b5cf6",
    preview: [
      { label: "Stemming", text: "Patiënt ervaart al ruim drie weken een aanhoudende sombere stemming die gedurende het grootste deel van de dag aanwezig is. Hij beschrijft een gevoel van leegte en hopeloosheid dat 's ochtends het sterkst is en in de loop van de dag iets afneemt. Activiteiten die voorheen plezier gaven — zoals sporten, koken en afspreken met vrienden — worden nu als vermoeiend en zinloos ervaren. Patiënt geeft aan dat hij het gevoel heeft te functioneren op de automatische piloot, zonder werkelijk iets te voelen of te ervaren." },
      { label: "Slaap & Energie", text: "Het slaappatroon is ernstig verstoord. Patiënt valt pas rond 02:00 uur in slaap en wordt vaak al om 05:00 uur wakker zonder opnieuw in te kunnen slapen. Overdag is er sprake van uitgesproken vermoeidheid en een gebrek aan energie dat het uitvoeren van dagelijkse taken bemoeilijkt. Simpele activiteiten zoals douchen, boodschappen doen of de afwas kosten disproportioneel veel inspanning. Patiënt heeft de afgelopen twee weken drie keer niet op het werk kunnen verschijnen vanwege extreme vermoeidheid." },
      { label: "Cognitie", text: "Er zijn duidelijke cognitieve symptomen aanwezig. Patiënt rapporteert concentratieproblemen die het werken aan complexe taken onmogelijk maken. Beslissingen nemen, zelfs over alledaagse zaken zoals wat te eten, kost onevenredig veel moeite. Er is een uitgesproken negatief zelfbeeld met gedachten als 'ik ben waardeloos' en 'ik ben een last voor anderen'. Schuldgevoelens over het niet kunnen functioneren versterken de somberheid. Het geheugen lijkt ook aangetast; patiënt vergeet afspraken en kan zich gesprekken van de vorige dag niet goed herinneren." },
      { label: "Ernst", text: "De PHQ-9 score bedraagt 18, wat wijst op een matig-ernstige depressieve stoornis. Er is geen sprake van actieve suïcidaliteit, hoewel patiënt aangeeft soms het gevoel te hebben dat het leven weinig zin heeft. Er zijn geen concrete plannen of intenties tot zelfdoding. Het functioneren is significant beperkt op het gebied van werk (frequent verzuim), sociale relaties (terugtrekking) en dagelijkse activiteiten (verwaarlozing huishouden). De GAF-score wordt geschat op 48. Een combinatie van farmacotherapie en cognitieve gedragstherapie wordt aanbevolen." },
    ],
  },
  {
    id: "emdr",
    name: "EMDR",
    description: "Sessieverslaglegging voor Eye Movement Desensitization and Reprocessing therapie.",
    icon: Sparkles,
    color: "#f59e0b",
    preview: [
      { label: "Doelherinnering", text: "De geselecteerde doelherinnering betreft het verkeersongeval op de A2 in november 2019. Het meest belastende beeld is het moment waarop patiënt de koplampen van de tegemoetkomende auto zag naderen en besefte dat een botsing onvermijdelijk was. Bijkomende sensorische herinneringen omvatten het geluid van piepende remmen, de geur van rubber en de fysieke sensatie van de klap. Patiënt ervaart bij het ophalen van deze herinnering spanning in de borst, trillen van de handen en een verhoogde hartslag." },
      { label: "Negatieve Cognitie", text: "De negatieve cognitie die aan deze herinnering gekoppeld is: \"Ik ben niet veilig.\" De SUD-score bij aanvang van de sessie is 8/10. Patiënt geeft aan deze overtuiging dagelijks te ervaren, met name in het verkeer, maar ook in andere situaties waarin hij zich niet volledig in controle voelt. De overtuiging generaliseert naar het openbaar vervoer, drukke winkelcentra en onbekende omgevingen. De gewenste positieve cognitie is: \"Ik kan omgaan met onverwachte situaties.\" De VoC-score bij aanvang is 2/7." },
      { label: "Desensitisatie", text: "Tijdens de desensitisatiefase zijn vier sets bilaterale stimulatie (oogbewegingen) uitgevoerd. Na de eerste set rapporteert patiënt het beeld van het ongeluk vanuit een groter perspectief te zien, alsof hij er van een afstand naar kijkt. Na de tweede set komen er nieuwe associaties op met eerdere momenten waarop hij wél veilig was in het verkeer. Na de derde set daalt de SUD naar 5 en ervaart patiënt minder spanning in de borst. Na de vierde set daalt de SUD verder naar 3 en rapporteert patiënt dat het beeld minder levendig en minder belastend voelt. Er komen spontaan herinneringen op aan het moment na het ongeluk waarop hij besefte dat hij het had overleefd." },
      { label: "Positieve Cognitie", text: "Na afronding van de desensitisatiefase is de positieve cognitie \"Ik heb het overleefd en ben nu veilig\" geïnstalleerd. De VoC-score na installatie bedraagt 5/7. Bij de body scan rapporteert patiënt een lichte restspanning in de schouders, maar geen overweldigende fysieke sensaties meer. De SUD-score aan het einde van de sessie is 2/10. Patiënt wordt geïnstrueerd om de komende week een logboek bij te houden van eventuele nachtmerries, flashbacks of andere intrusieve herinneringen. De volgende sessie wordt gepland over één week om de voortgang te evalueren en eventueel door te werken aan restmateriaal." },
    ],
  },
  {
    id: "huisartsbrief",
    name: "Huisartsbrief",
    description: "Professionele correspondentie naar de huisarts met bevindingen en behandeladvies.",
    icon: Send,
    color: "#10b981",
    preview: [
      { label: "Geachte collega", text: "Hierbij informeer ik u over de bevindingen en het behandelbeleid betreffende uw patiënte mw. De Vries (geb. 14-05-1989), die sinds september 2025 bij ons in behandeling is op verwijzing van uw praktijk. Patiënte werd verwezen vanwege klachten van herbelevingen, nachtmerries en vermijdingsgedrag na een geweldsincident in juni 2025. Bij het eerste contact presenteerde zij zich met een uitgebreid klachtenbeeld dat het dagelijks functioneren significant beperkte." },
      { label: "Bevindingen", text: "Op basis van het klinisch interview (CAPS-5) en psychodiagnostisch onderzoek is de diagnose posttraumatische stressstoornis (PTSS) gesteld, conform de DSM-5 criteria. De CAPS-5 totaalscore bedroeg 38, wat wijst op een ernstige PTSS. Comorbide klachten van insomnia en milde depressieve symptomen werden eveneens vastgesteld. De BDI-II score was 16 (milde depressie). Er is geen sprake van suïcidaliteit of psychotische kenmerken. Het premorbide functioneren was goed, er zijn geen eerdere psychiatrische episodes in de voorgeschiedenis." },
      { label: "Behandelplan", text: "Er is gestart met EMDR-therapie met een frequentie van één sessie per week. Na acht sessies is er significante verbetering op alle PTSS-clusters. De herbelevingen zijn afgenomen van dagelijks naar incidenteel (1-2x per maand). Het vermijdingsgedrag is verminderd en patiënte heeft haar sociale activiteiten grotendeels hervat. De nachtmerries zijn afgenomen maar nog niet geheel verdwenen. De verwachte resterende behandelduur is 4-6 sessies, waarna een evaluatie en eventuele afbouw zal plaatsvinden." },
      { label: "Verzoek", text: "Wij verzoeken u vriendelijk om aandacht te besteden aan de aanhoudende slaapproblematiek. Patiënte slaapt gemiddeld 4-5 uur per nacht en ervaart hiervan overdag significante hinder. Wij overwegen om in overleg met u een kortdurende behandeling met slaapmedicatie in te zetten (bijv. kortwerkend benzodiazepine of trazodon) als overbrugging totdat de EMDR-therapie het traumamateriaal voldoende heeft verwerkt. Daarnaast vragen wij u om de reguliere somatische controles voort te zetten. Bij vragen kunt u contact opnemen met ondergetekende." },
    ],
  },
  {
    id: "intake",
    name: "Intake",
    description: "Uitgebreid intakeverslag met anamnese, hulpvraag en eerste diagnostische indruk.",
    icon: ClipboardList,
    color: "#3b82f6",
    preview: [
      { label: "Hulpvraag", text: "Patiënt presenteert zich met de vraag om hulp bij het leren omgaan met angstklachten die het dagelijks functioneren in toenemende mate beperken. Hij beschrijft paniekaanvallen die twee tot drie keer per week optreden, gepaard gaand met hartkloppingen, zweten, trillen en het gevoel te stikken. De aanvallen duren gemiddeld 15-20 minuten en treden zowel overdag als 's nachts op. Patiënt geeft aan dat de angst voor een volgende aanval zijn leven is gaan beheersen en dat hij steeds meer situaties vermijdt." },
      { label: "Anamnese", text: "De klachten zijn circa zes maanden geleden begonnen, kort na het verlies van zijn baan als projectmanager door een reorganisatie. Aanvankelijk ervoer patiënt voornamelijk slapeloosheid en piekeren, maar geleidelijk ontwikkelden zich paniekaanvallen die in frequentie en intensiteit zijn toegenomen. De eerste paniekaanval vond plaats in een drukke supermarkt. Sindsdien vermijdt patiënt drukke winkels, het openbaar vervoer en sociale bijeenkomsten. Hij verlaat het huis alleen nog voor noodzakelijke boodschappen en bezoeken aan de huisarts. Het sociale netwerk is hierdoor aanzienlijk verkleind. Patiënt woont samen met zijn partner, die ondersteunend maar ook bezorgd is over de toenemende beperkingen." },
      { label: "Psychiatrische VG", text: "Patiënt is eerder behandeld voor een depressieve episode in 2018 bij een eerstelijnspsycholoog (8 sessies CGT), waarna hij klachtenvrij was. Er zijn geen eerdere opnames geweest in een psychiatrische instelling. Er is nooit sprake geweest van psychotische symptomen of suïcidaliteit. Patiënt gebruikt momenteel geen psychofarmaca. In de familie komt angstproblematiek voor bij de moeder (gegeneraliseerde angststoornis) en een zus (specifieke fobie). Patiënt drinkt gemiddeld 2-3 eenheden alcohol per week, geen drugsgebruik." },
      { label: "Diagnostische Indruk", text: "Op basis van het intakegesprek en de afgenomen vragenlijsten (BAI: 32, PDSS: 16) is de voorlopige diagnostische indruk een paniekstoornis met agorafobie, conform de DSM-5 criteria. Differentiaaldiagnostisch dient een gegeneraliseerde angststoornis overwogen te worden gezien het uitgebreide piekeren. De depressieve symptomen lijken secundair aan de angstklachten. Aanbeveling: cognitieve gedragstherapie met focus op exposure en interoceptieve technieken, frequentie 1x per week, verwachte duur 12-16 sessies. Bij onvoldoende respons na 8 sessies medicatie-evaluatie overwegen." },
    ],
  },
  {
    id: "mdo",
    name: "MDO",
    description: "Multidisciplinair overleg verslag met bijdragen van alle betrokken disciplines.",
    icon: Users,
    color: "#14b8a6",
    preview: [
      { label: "Psychiater", text: "De medicatie-instelling verloopt stabiel. Sertraline is opgehoogd naar 100mg per dag, welke goed wordt verdragen met minimale bijwerkingen (lichte misselijkheid in de eerste week, inmiddels verdwenen). De stemming is verbeterd ten opzichte van de vorige evaluatie, maar er zijn nog restklachten van vermoeidheid en concentratieproblemen. Aanvullende laboratoriumuitslagen (schildklierfunctie, bloedbeeld) zijn niet-afwijkend. Voortzetting huidige medicatie wordt geadviseerd met evaluatie over zes weken." },
      { label: "Psycholoog", text: "Het CGT-traject verloopt volgens schema, momenteel bij sessie 8 van de geplande 16. Patiënt werkt actief mee aan de behandeling en past de exposure-oefeningen consequent thuis toe. De vermijding van openbare ruimtes is significant afgenomen; patiënt kan nu zelfstandig boodschappen doen en heeft vorige week voor het eerst weer het openbaar vervoer genomen. De paniekaanvallen zijn afgenomen van 3x per week naar gemiddeld 1x per twee weken. Aandachtspunt: de catastrofale cognities rondom gezondheid zijn nog hardnekkig en verdienen extra aandacht in de komende sessies." },
      { label: "SPV", text: "De sociale situatie is merkbaar verbeterd. Patiënt heeft twee weken geleden gestart met dagbesteding (creatieve werkplaats, 2 dagdelen per week) en ervaart dit als positief en structurerend. De relatie met de partner is minder belast nu de angstklachten afnemen. Financieel is er nog enige spanning vanwege de werkloosheid, maar patiënt heeft een gesprek gepland met het UWV over re-integratietrajecten. Het sociaal netwerk wordt langzaam weer uitgebreid; patiënt heeft contact hersteld met twee oude vrienden." },
      { label: "Afspraken", text: "Het volgende MDO wordt gepland over vier weken. De psycholoog zal tegen die tijd de tussentijdse evaluatie van de behandeldoelen hebben afgerond. De psychiater zal de medicatie-evaluatie uitvoeren na zes weken. De SPV zal de voortgang van de dagbesteding monitoren en indien nodig een gesprek met de werkgever faciliteren voor een eventueel re-integratietraject. Alle disciplines stemmen in met het huidige beleid. Er zijn geen aanpassingen nodig in het behandelplan op dit moment." },
    ],
  },
  {
    id: "ontwikkelingsanamnese",
    name: "Ontwikkelingsanamnese",
    description: "Gedetailleerde ontwikkelingsgeschiedenis voor kinder- en jeugdpsychiatrie.",
    icon: Baby,
    color: "#f97316",
    preview: [
      { label: "Zwangerschap & Geboorte", text: "Moeder rapporteert een ongecompliceerde zwangerschap zonder ziekten, medicatiegebruik of complicaties. De bevalling vond plaats à terme (39+4 weken) en verliep via een spontane vaginale partus na een bevalling van 12 uur. Het geboortegewicht was 3450 gram, de Apgar-scores waren 8/9. Er waren geen perinatale complicaties en moeder en kind konden na twee dagen het ziekenhuis verlaten. De voeding verliep aanvankelijk via borstvoeding gedurende de eerste vier maanden, waarna is overgeschakeld op flesvoeding." },
      { label: "Motorische Ontwikkeling", text: "De grove motorische ontwikkeling verliep grotendeels volgens de verwachte mijlpalen. Kind kon op 4 maanden het hoofd optillen, op 7 maanden zelfstandig zitten en op 14 maanden de eerste stappen zetten. Het kruipen werd overgeslagen. De fijne motoriek was volgens het consultatiebureau iets vertraagd: het grijpen van kleine voorwerpen met pincetvgreep was pas op 14 maanden aanwezig (normaal 9-12 maanden). Tekenen en kleuren bleven achter bij leeftijdsgenoten. Op de kleuterschool werd opgemerkt dat het knippen met een schaar en het schrijven van de eigen naam meer oefening vergde dan bij de meeste klasgenoten." },
      { label: "Taal & Communicatie", text: "De eerste herkenbare woordjes kwamen rond 18 maanden, wat aan de late kant is maar nog binnen de normale variatie. Tweewoordzinnen werden gevormd vanaf 2,5 jaar. De taalbegrip ontwikkelde zich sneller dan de taalproductie; kind begreep instructies goed maar had moeite met het verbaal uitdrukken van wensen en behoeften. Op het consultatiebureau werd bij 3 jaar een lichte expressieve taalvertraging vastgesteld. Verwijzing naar de logopedist volgde, waar 12 sessies spraak-taaltherapie werden gegeven met goed resultaat. Momenteel is de taal leeftijdsadequaat, hoewel het kind een voorkeur heeft voor korte zinnen." },
      { label: "Schoolgang", text: "Kind bezoekt regulier basisonderwijs en zit momenteel in groep 5. In groep 3 werden leesproblemen gesignaleerd: het automatiseren van letters en het samenvoegen van klanken tot woorden ging moeizaam. Extra begeleiding via de remedial teacher werd ingezet (2x per week, 30 minuten). Het lezen is verbeterd maar blijft onder het niveau van leeftijdsgenoten. CITO-scores liggen consequent onder het gemiddelde voor begrijpend lezen en spelling. Rekenen gaat beter en scoort gemiddeld. Sociaal functioneert het kind adequaat op school, heeft een klein vriendengroepje en wordt niet gepest. De leerkracht beschrijft het kind als rustig, behulpzaam maar snel afgeleid." },
    ],
  },
  {
    id: "patientnotitie",
    name: "Patiëntnotitie",
    description: "Korte klinische notitie voor het elektronisch patiëntendossier na consult.",
    icon: PenLine,
    color: "#772d07",
    preview: [
      { label: "Datum", text: "11-03-2026 — Regulier consult (45 min). Behandelaar: drs. J. van der Berg, GZ-psycholoog. Locatie: polikliniek GGZ Noord, behandelkamer 4. Dit betreft het zevende consult in het lopende CGT-traject voor depressieve stoornis, matig. Patiënt verschijnt op tijd en is adequaat verzorgd." },
      { label: "Bevindingen", text: "De stemming is verbeterd ten opzichte van het vorige consult twee weken geleden. Patiënt rapporteert dat de somberheid minder frequent aanwezig is (3-4 dagen per week versus dagelijks). De slaap is nog wisselend; er zijn nachten dat patiënt goed doorslaapt (5-6 uur) maar ook nachten met vroeg wakker worden rond 04:00 uur. De eetlust is toegenomen en patiënt is weer begonnen met koken. Patiënt heeft vorige week voor het eerst weer een wandeling gemaakt met een vriend en beschrijft dit als een positieve ervaring. De BDI-II score is gedaald van 22 naar 17." },
      { label: "Interventie", text: "In deze sessie is gewerkt aan cognitieve herstructurering van negatieve automatische gedachten rondom werk en eigen competentie. De kerngedachte 'ik kan niets goed doen' is uitgedaagd met behulp van het vijf-kolommen schema. Patiënt kon met ondersteuning alternatieve gedachten formuleren zoals 'ik heb in het verleden wel degelijk succesvol projecten afgerond'. Daarnaast is een gedragsexperiment opgezet: patiënt gaat komende week een oud-collega bellen om te informeren naar mogelijkheden voor freelancewerk." },
      { label: "Vervolg", text: "Vervolgafspraak over twee weken, 25 maart 2026 om 14:00 uur. Huiswerkopdrachten: (1) dagelijks gedachtendagboek bijhouden met focus op automatische gedachten rondom competentie, (2) het gedragsexperiment uitvoeren (bellen oud-collega), (3) minimaal 3x per week een activiteit ondernemen uit de plezierige activiteitenlijst. Bij verslechtering of suïcidale gedachten: contact opnemen met crisisdienst of behandelaar. Risicotaxatie: laag, geen acute suïcidaliteit, beschermende factoren aanwezig (partner, motivatie voor behandeling)." },
    ],
  },
  {
    id: "rapportage",
    name: "Rapportage",
    description: "Uitgebreide diagnostische rapportage met testresultaten en conclusies.",
    icon: BarChart3,
    color: "#0ea5e9",
    preview: [
      { label: "Testresultaten", text: "WAIS-IV: Totaal IQ 108 (gemiddeld). Verbaal Begrip Index: 112 (hoog-gemiddeld), met sterke scores op Overeenkomsten (ss=13) en Woordenschat (ss=12). Perceptueel Redeneren Index: 104 (gemiddeld). Werkgeheugen Index: 98 (gemiddeld), met een opvallend lagere score op Rekenen (ss=8) in vergelijking met Cijferreeksen (ss=11). Verwerkingssnelheid Index: 94 (gemiddeld), met lagere scores dan verwacht op basis van het verbale niveau. Het profiel toont een significante discrepantie tussen Verbaal Begrip en Verwerkingssnelheid (18 punten)." },
      { label: "Vragenlijsten", text: "BDI-II: totaalscore 24, wijzend op matig-ernstige depressieve symptomen. Hoogste scores op items gerelateerd aan vermoeidheid, concentratieproblemen en slaapstoornissen. BAI: totaalscore 19, wijzend op matige angstsymptomen, voornamelijk somatisch van aard (hartkloppingen, zweten, duizeligheid). SCL-90: totaalscore 198 (bovengemiddeld). Verhoogde scores op de subschalen Depressie (38), Angst (22), en Slaapproblemen (12). De overige subschalen vallen binnen het normale bereik. UCL: voornamelijk passieve copingstijl met vermijding als dominante strategie." },
      { label: "Klinische Observatie", text: "Patiënt maakt bij binnenkomst een vermoeide en teruggetrokken indruk. Hij is adequaat gekleed en verzorgd. Het contact verloopt vriendelijk maar geremd; patiënt neemt weinig initiatief in het gesprek en antwoorden zijn kort en feitelijk. De stemming wordt beschreven als somber en de affect is vlak met beperkte modulatie. Het bewustzijn is helder, de oriëntatie intact. Het denken is coherent maar vertraagd in tempo. Inhoudelijk zijn er negatieve cognities over zichzelf en de toekomst. Er zijn geen waarnemingsstoornissen of psychotische fenomenen. De aandacht en concentratie zijn tijdens het onderzoek wisselend; bij de langere testonderdelen neemt de prestatie af." },
      { label: "Conclusie", text: "Samenvattend toont het psychodiagnostisch onderzoek een beeld dat past bij een depressieve stoornis, enkelvoudig episode, matig van ernst. Het cognitief profiel laat een normaal intellectueel functioneren zien met een relatieve zwakte in verwerkingssnelheid en werkgeheugen, die mogelijk deels verklaard worden door de actuele depressieve klachten. Aanvullend persoonlijkheidsonderzoek wordt aanbevolen om de onderliggende persoonlijkheidsdynamiek in kaart te brengen en het behandelplan hierop af te stemmen. Geadviseerd wordt om te starten met een combinatiebehandeling van farmacotherapie (SSRI) en cognitieve gedragstherapie, met een frequentie van wekelijks gedurende minimaal 16 sessies." },
    ],
  },
  {
    id: "samenvatting",
    name: "Samenvatting",
    description: "Beknopte samenvatting van een behandeltraject of diagnostisch onderzoek.",
    icon: ScrollText,
    color: "#a855f7",
    preview: [
      { label: "Diagnose", text: "Paniekstoornis met agorafobie (F41.0), conform DSM-5 criteria. Classificatie op basis van gestructureerd klinisch interview (MINI-Plus) en psychodiagnostisch onderzoek. Comorbide diagnose: insomnia (G47.0). Er is geen sprake van middelengebruikstoornis of persoonlijkheidspathologie. De GAF-score bij aanvang van de behandeling werd geschat op 55, wijzend op matige beperkingen in het sociaal en beroepsmatig functioneren." },
      { label: "Behandeling", text: "Patiënt heeft een behandeltraject van 12 sessies cognitieve gedragstherapie doorlopen, met focus op in-vivo exposure aan vermeden situaties en cognitieve herstructurering van catastrofale interpretaties van lichamelijke sensaties. De eerste vier sessies waren gericht op psycho-educatie over het angstmodel, het opstellen van een angsthiërarchie en het aanleren van ademhalingsoefeningen als copingstrategie. Vanaf sessie 5 is systematisch gestart met exposure, oplopend van boodschappen doen in een kleine winkel tot het nemen van de trein in de spits. In sessie 9-12 is gewerkt aan generalisatie en terugvalpreventie." },
      { label: "Resultaat", text: "Er is een significante afname van paniekaanvallen gerealiseerd: van gemiddeld drie keer per week bij aanvang naar gemiddeld één keer per maand bij afsluiting. De PDSS-score daalde van 16 naar 5 (minimale ernst). De BAI-score daalde van 32 naar 11 (milde angst). Het vermijdingsgedrag is sterk afgenomen; patiënt kan nu zelfstandig het openbaar vervoer gebruiken, boodschappen doen in grote winkels en sociale bijeenkomsten bijwonen. De GAF-score bij afsluiting wordt geschat op 72 (lichte symptomen). De slaap is verbeterd met een gemiddelde slaapduur van 6,5 uur per nacht." },
      { label: "Aanbeveling", text: "Het terugvalpreventieplan is uitgebreid besproken en schriftelijk meegegeven aan patiënt. Dit omvat het herkennen van vroege waarschuwingssignalen, het toepassen van geleerde copingstrategieën en het plannen van exposure-onderhoudsoefeningen. Een boostersessie is gepland over drie maanden om de voortgang te evalueren. Bij terugval wordt geadviseerd om binnen twee weken contact op te nemen met de behandelaar voor een snelle herintake. De huisarts is geïnformeerd over het behandelresultaat en het terugvalpreventieplan. Medicatie is niet nodig gebleken." },
    ],
  },
  {
    id: "scid-5p",
    name: "SCID-5-P",
    description: "Gestructureerd klinisch interview voor DSM-5 persoonlijkheidsstoornissen.",
    icon: MessageSquare,
    color: "#e11d48",
    preview: [
      { label: "Cluster B", text: "Borderline persoonlijkheidsstoornis: 6 van de 9 criteria positief bevonden. Patiënte beschrijft een levenslang patroon van instabiele en intense interpersoonlijke relaties, gekenmerkt door een afwisseling van idealisering en devaluatie. Er is sprake van een chronisch gevoel van leegte, recurrente suïcidale gedragingen (twee eerdere pogingen), impulsiviteit op het gebied van uitgaven en eetgedrag, en affectieve instabiliteit met snelle stemmingswisselingen. Identiteitsstoornissen uiten zich in een wisselend zelfbeeld en onzekerheid over levensdoelen. Dissociatieve symptomen treden op onder stress." },
      { label: "Cluster C", text: "Vermijdende persoonlijkheidsstoornis: 3 van de 7 criteria positief bevonden, wat subklinisch is en niet voldoet aan de diagnostische drempel. Patiënte vertoont enige vermijding van sociale en beroepsmatige activiteiten vanwege angst voor kritiek en afwijzing, maar dit lijkt grotendeels secundair aan de borderline-pathologie en de daaruit voortvloeiende negatieve interpersoonlijke ervaringen. De overige cluster C-stoornissen (dwangmatig en afhankelijk) zijn niet aanwezig. Cluster A-stoornissen werden evenmin vastgesteld." },
      { label: "Functioneren", text: "Het niveau van persoonlijkheidsfunctioneren (LPFS) wordt geschat op matig tot ernstig beperkt (niveau 3). Op het gebied van identiteit is er sprake van een instabiel zelfbeeld en moeite met het reguleren van emoties. De zelfsturing is beperkt: patiënte heeft moeite met het stellen en nastreven van realistische doelen. Interpersoonlijk is het empathisch vermogen wisselend en de intimiteit wordt gekenmerkt door een afwisseling van nabijheid en afstand. Het beroepsmatig functioneren is beperkt; patiënte heeft de afgelopen vijf jaar meerdere banen gehad en is momenteel arbeidsongeschikt." },
      { label: "Conclusie", text: "Op basis van het SCID-5-P interview wordt de diagnose borderline persoonlijkheidsstoornis gesteld, met kenmerken die overeenkomen met zowel het categorale als het dimensionale model van de DSM-5. Gezien de ernst van de persoonlijkheidspathologie en de complexe behandelgeschiedenis wordt schematherapie geïndiceerd als primaire behandelmodaliteit, met een verwachte duur van minimaal twee jaar bij een frequentie van twee sessies per week. Aanvullend wordt crisisinterventie beschikbaar gesteld en is er een veiligheidsplan opgesteld in samenwerking met patiënte en haar naasten." },
    ],
  },
  {
    id: "soep",
    name: "SOEP",
    description: "Subjectief, Objectief, Evaluatie, Plan — de meest gebruikte verslagmethodiek.",
    icon: FileText,
    color: "#059669",
    preview: [
      { label: "Subjectief", text: "Patiënt meldt zich op het spreekuur met klachten van toegenomen spanning en slapeloosheid die sinds circa twee weken bestaan. Hij beschrijft een aanhoudend gevoel van onrust en prikkelbaarheid dat gedurende de hele dag aanwezig is. De slaap is verstoord: patiënt ligt 's avonds lang wakker met piekerende gedachten en wordt 's nachts meerdere keren wakker. Overdag voelt hij zich vermoeid en heeft hij moeite met concentreren op zijn werk. De klachten zijn begonnen nadat hij op het werk te horen kreeg dat zijn afdeling wordt gereorganiseerd en er ontslagen gaan vallen. Patiënt maakt zich grote zorgen over zijn baan en de financiële consequenties voor zijn gezin." },
      { label: "Objectief", text: "Bij observatie maakt patiënt een gespannen en onrustige indruk. Hij zit ongemakkelijk op zijn stoel, friemelt met zijn handen en maakt een vermoeide indruk (wallen onder de ogen). De spraak is normaal in tempo en volume, het denken is coherent en doelgericht. De stemming wordt omschreven als 'gespannen en bezorgd'. Het affect is congruent. Er zijn geen aanwijzingen voor psychotische symptomen, suïcidale ideatie of zelfbeschadigend gedrag. Vitale functies: bloeddruk 145/92 mmHg (licht verhoogd), hartslag 88 bpm (licht verhoogd). BMI: 26,3." },
      { label: "Evaluatie", text: "Het klinisch beeld past bij een aanpassingsstoornis met angst, gerelateerd aan de recente werkstressoren. De symptomen zijn van recente onset, duidelijk gekoppeld aan een identificeerbare stressor en van onvoldoende duur en ernst om te voldoen aan de criteria voor een gegeneraliseerde angststoornis. De licht verhoogde bloeddruk en hartslag passen bij de huidige stressrespons. Differentiaaldiagnostisch dient een schildklieraandoening te worden uitgesloten. De PHQ-9 score is 8 (milde depressieve symptomen), de GAD-7 score is 12 (matige angst)." },
      { label: "Plan", text: "Starten met psycho-educatie over stress en ontspanning. Patiënt ontvangt een folder over progressieve spierontspanning en wordt geïnstrueerd om deze oefeningen dagelijks uit te voeren. Verwijzing naar de bedrijfsarts voor begeleiding rondom de werksituatie en eventuele aanpassing van werkbelasting. Labonderzoek aangevraagd: TSH, vrij T4, en volledig bloedbeeld ter uitsluiting van somatische oorzaken. Controleafspraak over twee weken voor evaluatie van het beloop. Indien klachten persisteren of verergeren: overwegen verwijzing naar eerstelijnspsycholoog voor kortdurende behandeling (POH-GGZ). Bij acute verslechtering: contact opnemen met huisartsenpraktijk." },
    ],
  },
  {
    id: "verpleegkundige-anamnese",
    name: "Verpleegkundige Anamnese",
    description: "Systematische verpleegkundige anamnese conform V&VN-richtlijnen.",
    icon: Stethoscope,
    color: "#2563eb",
    preview: [
      { label: "ADL", text: "Patiënte is grotendeels zelfstandig in de persoonlijke verzorging (wassen, aankleden, toiletgang) maar geeft aan dat deze activiteiten meer tijd en energie kosten dan voorheen. Het douchen vindt plaats zittend op een douchestoel vanwege valangst. Hulp is nodig bij het aantrekken van kousen en schoenen door beperkte mobiliteit van de heup. Boodschappen worden gedaan door de dochter. Het huishouden (stofzuigen, ramen lappen) kan niet meer zelfstandig worden uitgevoerd. Maaltijden worden deels zelf bereid (eenvoudige warme maaltijden) en deels geleverd door de maaltijdservice (3x per week). De Katz-ADL score is 2 (lichte afhankelijkheid)." },
      { label: "Voeding", text: "De eetlust is de afgelopen vier weken merkbaar verminderd. Patiënte geeft aan minder trek te hebben en soms maaltijden over te slaan, met name het ontbijt. Het lichaamsgewicht is afgenomen met 3 kg in vier weken (van 68 naar 65 kg, BMI 23,1). De vochtinname is voldoende (circa 1,5 liter per dag, voornamelijk thee en water). Er zijn geen kauw- of slikproblemen. Patiënte heeft een licht verhoogd cholesterol waarvoor zij een cholesterolverlagend dieet volgt. Er zijn geen voedselallergieën of -intoleranties. De SNAQ-score is 15, wat wijst op een matig risico op ondervoeding." },
      { label: "Mobiliteit", text: "Patiënte loopt binnenshuis zelfstandig met behulp van een rollator. Buitenshuis is zij afhankelijk van begeleiding door de dochter of thuiszorg. De loopafstand is beperkt tot circa 100 meter, daarna dient zij te rusten vanwege vermoeidheid en pijn in de rechterheup. Traplopen is niet meer mogelijk; patiënte slaapt sinds twee maanden beneden. Het valrisico is verhoogd: Morse Fall Scale score 55 (matig risico). Er is één valincident geweest in de afgelopen drie maanden, zonder fracturen maar met een kneuzing van de linkerschouder. Fysiotherapie aan huis is tweemaal per week ingezet ter verbetering van balans en spierkracht." },
      { label: "Psychosociaal", text: "Patiënte is weduwe (echtgenoot overleden in 2021) en woont alleen in een eengezinswoning. De dochter woont in dezelfde stad en komt twee keer per week langs voor boodschappen en gezelschap. Een zoon woont in het buitenland en belt wekelijks. Patiënte ervaart toenemende sociale isolatie door haar beperkte mobiliteit; zij kan niet meer zelfstandig naar de kerk of het buurthuis gaan, activiteiten die voorheen belangrijk waren voor haar sociale leven. Zij geeft aan zich soms eenzaam te voelen, met name in de avonduren en weekenden. Er zijn geen aanwijzingen voor een depressieve stoornis, hoewel de stemming door verdriet over het verlies van zelfredzaamheid soms somber is." },
    ],
  },
  {
    id: "verwijsbrief",
    name: "Verwijsbrief",
    description: "Formele verwijsbrief naar specialist of instelling met relevante klinische gegevens.",
    icon: UserCheck,
    color: "#7c3aed",
    preview: [
      { label: "Aan", text: "Afdeling Psychiatrie, UMC Amsterdam, locatie AMC — t.a.v. de dienstdoende psychiater van het Expertisecentrum Traumagerelateerde Stoornissen. Betreft: mw. A.B. Jansen, geboortedatum 23-08-1991, BSN eindigend op 4572. Huisarts: dr. M.C. de Groot, Huisartsenpraktijk Centrum, Amsterdam. Verwijzer: drs. K.L. Bakker, GZ-psycholoog, GGZ Ambulant Noord." },
      { label: "Betreft", text: "Verwijzing voor nadere diagnostiek en gespecialiseerde behandeling van complexe posttraumatische stressstoornis bij een 34-jarige vrouw met een uitgebreide traumageschiedenis. Patiënte is sinds maart 2025 in behandeling bij GGZ Ambulant Noord, aanvankelijk verwezen door de huisarts vanwege klachten van herbelevingen, nachtmerries, dissociatieve episoden en ernstig vermijdingsgedrag. De klachten zijn ontstaan na meerdere traumatische ervaringen in de jeugd (verwaarlozing, fysieke mishandeling) en een recenter geweldsincident in december 2024." },
      { label: "Reden", text: "Ondanks een adequaat ingezette ambulante behandeling bestaande uit acht sessies EMDR-therapie is er onvoldoende respons op de behandeling. De herbelevingen en nachtmerries persisteren, de dissociatieve klachten zijn in ernst toegenomen en het dagelijks functioneren blijft ernstig beperkt. Tijdens de EMDR-sessies treedt frequent dissociatie op waardoor het protocol niet volledig kan worden uitgevoerd. De DES-score is 38 (verhoogd, passend bij complexe dissociatieve problematiek). De PCL-5 score is 62 (ernstige PTSS). Er is comorbide sprake van een depressieve stoornis en een vermijdende persoonlijkheidsstoornis." },
      { label: "Verzoek", text: "Wij verzoeken u vriendelijk om patiënte te beoordelen voor opname in het klinische intensieve traumabehandelingsprogramma van uw centrum. Gezien de complexiteit van de problematiek, de aanwezigheid van dissociatieve symptomen en de onvoldoende respons op ambulante behandeling, achten wij een gespecialiseerde klinische setting geïndiceerd. Wij verzoeken u tevens om een diagnostische herbeoordeling, met name gericht op de dissociatieve symptomen en de persoonlijkheidspathologie, om het behandelplan hierop af te stemmen. Alle relevante dossierinformatie (behandelverslagen, testresultaten, medicatieoverzicht) wordt op aanvraag beschikbaar gesteld." },
    ],
  },
];

function TemplateCard({
  template,
  Icon,
  getCardStyle,
  onSelect,
  isSelected,
}: {
  template: (typeof templates)[0];
  Icon: (typeof templates)[0]["icon"];
  getCardStyle: (el: HTMLDivElement | null) => React.CSSProperties;
  onSelect: () => void;
  isSelected: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const update = () => setStyle(getCardStyle(cardRef.current));
    update();
    const scrollParent = cardRef.current?.closest(".scrollbar-hide");
    if (scrollParent) {
      scrollParent.addEventListener("scroll", update, { passive: true });
      return () => scrollParent.removeEventListener("scroll", update);
    }
  }, [getCardStyle]);

  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      className={`group relative cursor-pointer overflow-hidden rounded-xl px-4 py-3 transition-all duration-300 ${
        isSelected
          ? "bg-slate-100/80"
          : "hover:bg-slate-50/80"
      }`}
      style={{ ...style, maxWidth: "380px" }}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-500 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${template.color}18, ${template.color}08)`,
          }}
        >
          <Icon
            className="h-5 w-5"
            style={{ color: template.color }}
            strokeWidth={1.8}
          />
        </div>

        {/* Title + arrow inline */}
        <div className="flex items-center gap-2">
          <h3
            className={`text-[20px] font-semibold transition-colors duration-300 ${
              isSelected ? "text-[#772d07]" : "text-slate-800 group-hover:text-[#772d07]"
            }`}
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            {template.name}
          </h3>
          <svg
            className={`h-3.5 w-3.5 shrink-0 transition-all duration-300 ${
              isSelected ? "text-[#772d07] translate-x-0.5" : "text-slate-300 group-hover:text-[#772d07] group-hover:translate-x-0.5"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PreviewPanel({ template }: { template: (typeof templates)[0] }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      style={{
        maxHeight: "680px",
        border: "1px solid rgba(0,0,0,0.06)",
        animation: "previewSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Document header bar */}
      <div
        className="flex shrink-0 items-center gap-3 px-5 py-3"
        style={{
          background: `linear-gradient(135deg, ${template.color}08, ${template.color}04)`,
          borderBottom: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${template.color}20, ${template.color}10)`,
          }}
        >
          {React.createElement(template.icon, {
            className: "h-3.5 w-3.5",
            style: { color: template.color },
            strokeWidth: 1.8,
          })}
        </div>
        <div className="flex-1">
          <h3
            className="text-[13px] font-bold text-slate-800"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            {template.name}
          </h3>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: `${template.color}10`,
            color: template.color,
          }}
        >
          Voorbeeld
        </span>
      </div>

      {/* Document body — smaller text, like viewing a printed report */}
      <div
        className="scrollbar-hide flex-1 overflow-y-auto px-6 py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {template.preview.map((section, idx) => (
          <div
            key={idx}
            className="mb-4 last:mb-0"
            style={{
              animation: `previewFadeIn 0.4s ease-out ${idx * 0.1}s both`,
            }}
          >
            <div
              className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{ color: template.color }}
            >
              {section.label}
            </div>
            <p className="text-[11.5px] leading-[1.7] text-slate-600">
              {section.text}
            </p>
          </div>
        ))}
      </div>

      {/* Document footer */}
      <div className="shrink-0 border-t border-slate-100/80 px-5 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400">
            Gegenereerd door ZorgNotitie AI
          </span>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-slate-400">Klaar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Templates() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, forceUpdate] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedTemplate = templates.find((t) => t.id === selectedId) || null;

  // Duplicate templates many times so user never reaches the edge — no reset needed
  const loopedTemplates = Array.from({ length: 10 }, () => templates).flat();

  const handleScroll = useCallback(() => {
    // Trigger re-render to update card transforms
    forceUpdate((n) => n + 1);
  }, []);

  // Calculate 3D transform for each card based on its position in the viewport
  const getCardStyle = useCallback((cardEl: HTMLDivElement | null): React.CSSProperties => {
    if (!cardEl || !scrollRef.current) return {};
    const container = scrollRef.current;
    const containerRect = container.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();

    const containerCenter = containerRect.top + containerRect.height / 2;
    const cardCenter = cardRect.top + cardRect.height / 2;
    const distanceFromCenter = (cardCenter - containerCenter) / (containerRect.height / 2);

    // Clamp between -1 and 1
    const clamped = Math.max(-1, Math.min(1, distanceFromCenter));
    const absDist = Math.abs(clamped);

    const scale = 1 - absDist * 0.12;
    const rotateX = clamped * -6;
    const opacity = 1 - absDist * 0.55;
    const translateZ = -absDist * 40;

    return {
      transform: `perspective(800px) rotateX(${rotateX}deg) scale(${scale}) translateZ(${translateZ}px)`,
      opacity: Math.max(0.2, opacity),
      transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start in the middle of the list
    el.scrollTop = el.scrollHeight / 2 - el.clientHeight / 2;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="py-24 lg:py-32">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#772d07]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Template Bibliotheek
          </p>
          <h2
            className="mb-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Elk type verslag,{" "}
            <span className="text-[#772d07]">één platform</span>
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Kies uit meer dan 15 professionele templates. Klik op een template om een voorbeeld te bekijken.
          </p>
        </div>

        {/* White container around the entire panel */}
        <div className="relative z-10 mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-white p-6 shadow-[0_4px_50px_rgba(119,45,7,0.08)] lg:p-8">
          {/* Two-panel layout: scrollable list + preview */}
          <div
            className="grid items-stretch transition-all duration-500 ease-out"
            style={{
              gridTemplateColumns: "0.8fr auto 0.8fr",
              gap: "0",
              minHeight: "600px",
            }}
          >
            {/* Left: Scrollable curved card list */}
            <div className="relative">
              {/* Top fade */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-14"
                style={{
                  background: "linear-gradient(to bottom, white 0%, transparent 100%)",
                }}
              />

              {/* Bottom fade */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-14"
                style={{
                  background: "linear-gradient(to top, white 0%, transparent 100%)",
                }}
              />

              {/* Scrollable container */}
              <div
                ref={scrollRef}
                className="scrollbar-hide overflow-y-auto transition-all duration-500"
                style={{
                  maxHeight: selectedTemplate ? "680px" : "600px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="flex flex-col gap-0.5 py-6">
                  {loopedTemplates.map((template, idx) => {
                    const Icon = template.icon;
                    return (
                      <TemplateCard
                        key={`${template.id}-${idx}`}
                        template={template}
                        Icon={Icon}
                        getCardStyle={getCardStyle}
                        onSelect={() =>
                          setSelectedId((prev) =>
                            prev === template.id ? null : template.id
                          )
                        }
                        isSelected={selectedId === template.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Decorative vertical divider */}
            <div className="flex items-center justify-center px-12">
              <div className="relative flex h-full flex-col items-center">
                {/* Top gradient line */}
                <div
                  className="w-px flex-1"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #772d0730 40%, #772d0730 60%, transparent)",
                  }}
                />
                {/* Accent dot */}
                <div className="relative my-3">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: "#772d07", opacity: 0.3 }}
                  />
                  <div
                    className="absolute inset-0 animate-ping rounded-full"
                    style={{
                      backgroundColor: "#772d07",
                      opacity: 0.1,
                      animationDuration: "3s",
                    }}
                  />
                </div>
                {/* Bottom gradient line */}
                <div
                  className="w-px flex-1"
                  style={{
                    background: "linear-gradient(to top, transparent, #772d0730 40%, #772d0730 60%, transparent)",
                  }}
                />
              </div>
            </div>

            {/* Right: Preview panel or placeholder */}
            {selectedTemplate ? (
              <div className="lg:sticky lg:top-32">
                <PreviewPanel key={selectedTemplate.id} template={selectedTemplate} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div
                  className="flex h-full min-h-[600px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/30"
                  style={{ animation: "fadeInUp 0.3s ease-out" }}
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                      <svg
                        className="h-8 w-8 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-base font-medium text-slate-600"
                      style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                    >
                      Klik op een template
                    </p>
                    <p className="mt-1 text-sm text-slate-400">om een voorbeeld te zien</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes previewSlideIn {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes previewFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
