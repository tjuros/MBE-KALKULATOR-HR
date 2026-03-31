import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle2, Package2, Truck, Zap, Plus, Trash2, Copy, MapPin } from "lucide-react";

const LOGOS = {
  GLS: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/GLS_Logo.svg/512px-GLS_Logo.svg.png",
  DPD: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/DPD_logo.svg/512px-DPD_logo.svg.png",
  HP: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Hrvatska_po%C5%A1ta_logo.svg/512px-Hrvatska_po%C5%A1ta_logo.svg.png",
  "Overseas Single": "https://www.overseas.hr/wp-content/uploads/2020/10/overseas-logo.png",
  "Overseas Multi": "https://www.overseas.hr/wp-content/uploads/2020/10/overseas-logo.png",
  InTime: "https://www.in-time.hr/images/logo.png",
};

const POSTAL_LOOKUP = {
  "10000": "Zagreb",
  "10010": "Zagreb-Sloboština",
  "10020": "Zagreb-Novi Zagreb",
  "10040": "Zagreb-Dubrava",
  "10090": "Zagreb-Susedgrad",
  "10250": "Lučko",
  "10251": "Hrvatski Leskovac",
  "10253": "Donji Dragonožec",
  "10255": "Gornji Stupnik",
  "10257": "Brezovica",
  "10290": "Zaprešić",
  "10291": "Prigorje Brdovečko",
  "10292": "Šenkovec",
  "10293": "Dubravica",
  "10294": "Donja Pušća",
  "10295": "Kupljenovo",
  "10296": "Luka",
  "10297": "Jakovlje",
  "10298": "Donja Bistra",
  "10299": "Marija Gorica",
  "10310": "Ivanić-Grad",
  "10311": "Posavski Bregi",
  "10312": "Kloštar Ivanić",
  "10313": "Graberje Ivanićko",
  "10314": "Križ",
  "10315": "Novoselec",
  "10316": "Lijevi Dubrovčak",
  "10340": "Vrbovec",
  "10341": "Lonjica",
  "10342": "Dubrava",
  "10343": "Nova Kapela",
  "10344": "Farkaševac",
  "10345": "Gradec",
  "10346": "Preseka",
  "10347": "Rakovec",
  "10360": "Sesvete",
  "10361": "Sesvete-Kraljevec",
  "10362": "Kašina",
  "10363": "Belovar",
  "10370": "Dugo Selo",
  "10372": "Oborovo",
  "10373": "Ivanja Reka",
  "10380": "Sveti Ivan Zelina",
  "10381": "Bedenica",
  "10382": "Donja Zelina",
  "10383": "Komin",
  "10408": "Velika Mlaka",
  "10410": "Velika Gorica",
  "10411": "Orle",
  "10412": "Donja Lomnica",
  "10413": "Kravarsko",
  "10414": "Pokupsko",
  "10415": "Novo Čiče",
  "10417": "Buševec",
  "10418": "Dubranec",
  "10419": "Vukovina",
  "10430": "Samobor",
  "10431": "Sveta Nedjelja",
  "10432": "Bregana",
  "10434": "Strmec Samoborski",
  "10435": "Sveti Martin pod Okićem",
  "10436": "Rakov Potok",
  "10437": "Bestovje",
  "10450": "Jastrebarsko",
  "10451": "Pisarovina",
  "10453": "Gorica Svetojanska",
  "10454": "Krašić",
  "10455": "Kostanjevac",
  "10456": "Kalje",
  "10457": "Sošice",
  "20000": "Dubrovnik",
  "20205": "Topolo",
  "20207": "Mlini",
  "20210": "Cavtat",
  "20215": "Gruda",
  "20216": "Dubravka",
  "20217": "Pridvorje",
  "20218": "Pločice",
  "20221": "Koločep",
  "20222": "Lopud",
  "20223": "Suđurađ",
  "20224": "Maranovići",
  "20225": "Babino Polje",
  "20230": "Ston",
  "20231": "Doli",
  "20232": "Slano",
  "20233": "Trsteno",
  "20234": "Orašac",
  "20235": "Zaton Veliki",
  "20236": "Mokošica",
  "20240": "Trpanj",
  "20242": "Oskorušno",
  "20243": "Kuna Pelješka",
  "20244": "Potomje",
  "20245": "Trstenik",
  "20246": "Janjina",
  "20247": "Žuljana",
  "20248": "Putniković",
  "20250": "Orebić",
  "20260": "Korčula",
  "20263": "Lumbarda",
  "20264": "Račišće",
  "20267": "Kučište",
  "20269": "Lovište",
  "20270": "Vela Luka",
  "20271": "Blato",
  "20272": "Smokvica",
  "20273": "Čara",
  "20274": "Pupnat",
  "20275": "Žrnovo",
  "20278": "Nova Sela",
  "21000": "Split",
  "21201": "Prgomet",
  "21202": "Lećevica",
  "21203": "Donji Muć",
  "21204": "Dugopolje",
  "21205": "Donji Dolac",
  "21206": "Boraja",
  "21207": "Klis",
  "21208": "Kučine",
  "21209": "Mravince",
  "21210": "Solin",
  "21211": "Vranjic",
  "21212": "Kaštel Sućurac",
  "21213": "Kaštel Gomilica",
  "21214": "Kaštel Kambelovac",
  "21215": "Kaštel Lukšić",
  "21216": "Kaštel Stari",
  "21217": "Kaštel Štafilić",
  "21218": "Seget Donji",
  "21220": "Trogir",
  "21222": "Marina",
  "21223": "Okrug Gornji",
  "21224": "Slatine",
  "21225": "Drvenik Veliki",
  "21226": "Vinišće",
  "21227": "Primorski Dolac",
  "21228": "Blizna Donja",
  "21229": "Crivac",
  "21230": "Sinj",
  "21231": "Klis",
  "21232": "Dicmo",
  "21233": "Hrvace",
  "21234": "Otok",
  "21235": "Vrlička Krajina",
  "21236": "Vrlika",
  "21238": "Otok",
  "21240": "Trilj",
  "21241": "Obrovac Sinjski",
  "21242": "Grab",
  "21243": "Ugljane",
  "21244": "Cista Velika",
  "21245": "Tijarica",
  "21246": "Aržano",
  "21247": "Neorić",
  "21250": "Šestanovac",
  "21251": "Žrnovnica",
  "21252": "Tugare",
  "21253": "Gata",
  "21254": "Blato na Cetini",
  "21255": "Zadvarje",
  "21256": "Cista Provo",
  "21257": "Lovreć",
  "21260": "Imotski",
  "21261": "Runović",
  "21262": "Kamenmost",
  "21263": "Krivodol",
  "21264": "Donji Proložac",
  "21265": "Studenci",
  "21266": "Zmijavci",
  "21267": "Ričice",
  "21270": "Zagvozd",
  "21271": "Grabovac",
  "21272": "Slivno",
  "21273": "Župa",
  "21274": "Kozička Poljica",
  "21275": "Dragljane",
  "21276": "Vrgorac",
  "21300": "Makarska",
  "21310": "Omiš",
  "21311": "Stobreč",
  "21312": "Podstrana",
  "21314": "Jesenice",
  "21315": "Dugi Rat",
  "21317": "Lokva Rogoznica",
  "21318": "Mimice",
  "21320": "Baška Voda",
  "21322": "Brela",
  "21325": "Tučepi",
  "21327": "Podgora",
  "21328": "Drašnice",
  "21329": "Igrane",
  "21330": "Gradac",
  "21333": "Drvenik",
  "21334": "Zaostrog",
  "21335": "Podaca",
  "21400": "Supetar",
  "21403": "Sutivan",
  "21404": "Ložišća",
  "21405": "Milna",
  "21410": "Postira",
  "21412": "Pučišća",
  "21413": "Povlja",
  "21420": "Bol",
  "21423": "Nerežišća",
  "21424": "Pražnica",
  "21425": "Selca",
  "21426": "Sumartin",
  "21430": "Grohote",
  "21432": "Stomorska",
  "21450": "Hvar",
  "21454": "Brusje",
  "21460": "Stari Grad",
  "21462": "Vrbanj",
  "21463": "Vrboska",
  "21465": "Jelsa",
  "21466": "Zastražišće",
  "21467": "Gdinj",
  "21468": "Bogomolje",
  "21469": "Sućuraj",
  "21480": "Vis",
  "21483": "Komiža",
  "22000": "Šibenik",
  "22202": "Primošten",
  "22203": "Rogoznica",
  "22211": "Vodice",
  "22212": "Tribunj",
  "22213": "Pirovac",
  "22214": "Murter",
  "22221": "Lozovac",
  "22222": "Skradin",
  "22232": "Zlarin",
  "22233": "Prvić Luka",
  "22234": "Prvić Šepurine",
  "22235": "Kaprije",
  "22236": "Žirje",
  "22240": "Tisno",
  "22242": "Jezera",
  "22243": "Murter",
  "22244": "Betina",
  "22300": "Knin",
  "22303": "Oklaj",
  "22305": "Kistanje",
  "22310": "Kijevo",
  "22320": "Drniš",
  "22321": "Siverić",
  "22322": "Ružić",
  "22323": "Unešić",
  "23000": "Zadar",
  "23205": "Bibinje",
  "23206": "Sukošan",
  "23207": "Sveti Filip i Jakov",
  "23210": "Biograd na Moru",
  "23211": "Pakoštane",
  "23212": "Tkon",
  "23222": "Zemunik",
  "23223": "Škabrnja",
  "23231": "Petrčane",
  "23232": "Nin",
  "23233": "Privlaka",
  "23234": "Vir",
  "23235": "Vrsi",
  "23241": "Poličnik",
  "23242": "Posedarje",
  "23243": "Jasenice",
  "23244": "Starigrad",
  "23245": "Tribanj",
  "23247": "Ražanac",
  "23248": "Ljubač",
  "23249": "Povljana",
  "23250": "Pag",
  "23251": "Kolan",
  "23262": "Pašman",
  "23263": "Ždrelac",
  "23264": "Neviđane",
  "23271": "Kukljica",
  "23272": "Kali",
  "23273": "Preko",
  "23274": "Lukoran",
  "23275": "Ugljan",
  "23281": "Sali",
  "23282": "Žman",
  "23283": "Rava",
  "23284": "Veli Iž",
  "23285": "Brbinj",
  "23286": "Božava",
  "23287": "Veli Iž",
  "23291": "Sestrunj",
  "23292": "Molat",
  "23293": "Ist",
  "23294": "Premuda",
  "23295": "Silba",
  "23296": "Olib",
  "23297": "Lun",
  "23299": "Veli Olib",
  "23312": "Novigrad",
  "23420": "Benkovac",
  "23422": "Stankovci",
  "23423": "Polača",
  "23440": "Gračac",
  "23445": "Srb",
  "23446": "Pađene",
  "23447": "Zrmanja",
  "23450": "Obrovac",
  "31000": "Osijek",
  "31204": "Bijelo Brdo",
  "31205": "Aljmaš",
  "31206": "Erdut",
  "31207": "Tenja",
  "31208": "Petrijevci",
  "31214": "Laslovo",
  "31215": "Ernestinovo",
  "31216": "Antunovac",
  "31220": "Višnjevac",
  "31221": "Josipovac",
  "31222": "Bistrinci",
  "31224": "Koška",
  "31225": "Breznica Našička",
  "31226": "Bizovac",
  "31227": "Valpovo",
  "31228": "Petrijevci",
  "31230": "Našice",
  "31231": "Koška",
  "31232": "Donja Motičina",
  "31233": "Podgorač",
  "31234": "Viljevo",
  "31235": "Belišće",
  "31236": "Budimci",
  "31237": "Petlovac",
  "31300": "Beli Manastir",
  "31301": "Branjin Vrh",
  "31302": "Kneževo",
  "31303": "Popovac",
  "31304": "Luč",
  "31305": "Draž",
  "31306": "Batina",
  "31307": "Bilje",
  "31308": "Zmajevac",
  "31309": "Kopačevo",
  "31315": "Karanac",
  "31321": "Petrijevci",
  "31400": "Đakovo",
  "31402": "Semeljci",
  "31403": "Vuka",
  "31404": "Punitovci",
  "31410": "Strizivojna",
  "31411": "Trnava",
  "31412": "Satnica Đakovačka",
  "31413": "Drenje",
  "31414": "Levanjska Varoš",
  "31415": "Selci Đakovački",
  "31416": "Mandićevac",
  "31417": "Piškorevci",
  "31418": "Semeljci",
  "31420": "Viškovci",
  "31421": "Gorjani",
  "31422": "Kešinci",
  "31423": "Bračevci",
  "31424": "Punitovci",
  "31431": "Čepin",
  "31432": "Vladislavci",
  "31433": "Podravska Moslavina",
  "31500": "Našice",
  "31511": "Đurđenovac",
  "31512": "Feričanci",
  "31513": "Donji Miholjac",
  "31540": "Donji Miholjac",
  "31550": "Valpovo",
  "31551": "Belišće",
  "32000": "Vukovar",
  "32100": "Vinkovci",
  "32211": "Trpinja",
  "32212": "Nuštar",
  "32213": "Markušica",
  "32214": "Tordinci",
  "32221": "Nuštar",
  "32222": "Retkovci",
  "32223": "Gradište",
  "32224": "Bošnjaci",
  "32225": "Privlaka",
  "32226": "Babina Greda",
  "32227": "Cerna",
  "32228": "Ivankovo",
  "32229": "Vrbanja",
  "32232": "Nijemci",
  "32233": "Štitar",
  "32234": "Otok",
  "32235": "Stari Mikanovci",
  "32236": "Drenovci",
  "32237": "Posavski Podgajci",
  "32238": "Račinovci",
  "32239": "Banovci",
  "32241": "Cerić",
  "32242": "Slakovci",
  "32243": "Orolik",
  "32244": "Andrijaševci",
  "32245": "Sotin",
  "32246": "Bapska",
  "32247": "Tovarnik",
  "32248": "Ilača",
  "32249": "Mirkovci",
  "32251": "Privlaka",
  "32252": "Berak",
  "32253": "Lovo",
  "32254": "Lovas",
  "32255": "Tordinci",
  "32256": "Pačetin",
  "32257": "Bršadin",
  "32258": "Negoslavci",
  "32259": "Borovo",
  "32260": "Gunja",
  "32261": "Rajevo Selo",
  "32262": "Strošinci",
  "32263": "Babina Greda",
  "32270": "Županja",
  "32271": "Rokovci-Andrijaševci",
  "32272": "Cerna",
  "32273": "Gradište",
  "32274": "Vrbanja",
  "32275": "Bošnjaci",
  "32276": "Babina Greda",
  "32280": "Jarmina",
  "32281": "Ivankovo",
  "32282": "Retkovci",
  "32283": "Vođinci",
  "32284": "Stari Mikanovci",
  "32285": "Đeletovci",
  "32286": "Prkovci",
  "32287": "Cerna",
  "32288": "Drenovci",
  "33000": "Virovitica",
  "33404": "Špišić Bukovica",
  "33405": "Pitomača",
  "33406": "Lukač",
  "33410": "Suhopolje",
  "33411": "Gradina",
  "33412": "Cabuna",
  "33414": "Čađavica",
  "33415": "Orahovica",
  "33416": "Mikleuš",
  "33417": "Zdenci",
  "33418": "Voćin",
  "33420": "Slatina",
  "33511": "Sopje",
  "33513": "Crnac",
  "33514": "Čađavica",
  "33515": "Nova Bukovica",
  "33520": "Slatina",
  "34000": "Požega",
  "34308": "Jakšić",
  "34310": "Pleternica",
  "34311": "Vetovo",
  "34312": "Kaptol",
  "34320": "Orljavac",
  "34322": "Brestovac",
  "34330": "Velika",
  "34334": "Kula",
  "34335": "Pakrac",
  "34340": "Kutjevo",
  "34343": "Čaglin",
  "34350": "Čaglin",
  "34550": "Pakrac",
  "35000": "Slavonski Brod",
  "35207": "Gornja Vrba",
  "35208": "Ruščica",
  "35209": "Bukovlje",
  "35210": "Vrpolje",
  "35211": "Trnjani",
  "35212": "Garčin",
  "35213": "Oprisavci",
  "35214": "Donji Andrijevci",
  "35215": "Sikirevci",
  "35216": "Prnjavor",
  "35217": "Slavonski Šamac",
  "35220": "Bebrina",
  "35221": "Klapavica",
  "35222": "Gornji Bogićevci",
  "35224": "Nova Kapela",
  "35250": "Oriovac",
  "35252": "Sibinj",
  "35253": "Brodski Stupnik",
  "35254": "Batrina",
  "35255": "Slavonski Kobaš",
  "35257": "Lužani",
  "35260": "Cernik",
  "35261": "Rešetari",
  "35400": "Nova Gradiška",
  "35403": "Dragalić",
  "35404": "Staro Petrovo Selo",
  "35410": "Nova Kapela",
  "35414": "Vrbova",
  "35420": "Stara Gradiška",
  "35422": "Zapolje",
  "35423": "Davor",
  "35424": "Okučani",
  "35425": "Stara Kapela",
  "35428": "Dragalić",
  "35429": "Gornji Bogićevci",
  "35430": "Nova Gradiška",
  "35435": "Staro Petrovo Selo",
  "35450": "Stara Gradiška",
  "35460": "Davor",
  "40000": "Čakovec",
  "40305": "Nedelišće",
  "40306": "Macinec",
  "40311": "Lopatinec",
  "40312": "Štrigova",
  "40313": "Sveti Martin na Muri",
  "40314": "Selnica",
  "40315": "Mursko Središće",
  "40316": "Vratišinec",
  "40317": "Podturen",
  "40318": "Prelog",
  "40319": "Belica",
  "40320": "Donji Kraljevec",
  "40321": "Mala Subotica",
  "40322": "Orehovica",
  "40323": "Prelog",
  "40324": "Goričan",
  "40325": "Dekanovec",
  "40326": "Sveta Marija",
  "40327": "Donja Dubrava",
  "40328": "Donji Vidovec",
  "40329": "Kotoriba",
  "42000": "Varaždin",
  "42201": "Beretinec",
  "42202": "Trnovec Bartolovečki",
  "42203": "Jalžabet",
  "42204": "Turčin",
  "42205": "Vidovec",
  "42206": "Petrijanec",
  "42207": "Vinica",
  "42208": "Cestica",
  "42209": "Sračinec",
  "42210": "Novi Marof",
  "42213": "Breznički Hum",
  "42214": "Sveti Ilija",
  "42220": "Novi Marof",
  "42222": "Ljubešćica",
  "42223": "Varaždinske Toplice",
  "42224": "Maruševec",
  "42225": "Tužno",
  "42226": "Bisag",
  "42230": "Ludbreg",
  "42231": "Mali Bukovec",
  "42232": "Donji Martijanec",
  "42233": "Sveti Đurđ",
  "42240": "Ivanec",
  "42241": "Radovan",
  "42242": "Lepoglava",
  "42243": "Margečan",
  "42244": "Klenovnik",
  "42245": "Donja Voća",
  "42246": "Cvetlin",
  "43000": "Bjelovar",
  "43202": "Veliko Trojstvo",
  "43203": "Kapela",
  "43211": "Predavac",
  "43212": "Rovišće",
  "43220": "Berek",
  "43226": "Velika Pisanica",
  "43227": "Štefanje",
  "43231": "Ivanska",
  "43232": "Mali Zdenci",
  "43240": "Čazma",
  "43245": "Gornji Draganec",
  "43246": "Dežanovac",
  "43247": "Narta",
  "43251": "Gudovac",
  "43252": "Prgomelje",
  "43270": "Veliki Grđevac",
  "43271": "Velika Trnovitica",
  "43272": "Nova Rača",
  "43273": "Bulinac",
  "43274": "Severin",
  "43280": "Garešnica",
  "43282": "Velika Bršljanica",
  "43283": "Hercegovac",
  "43284": "Hrastovac",
  "43285": "Veliki Zdenci",
  "43290": "Grubišno Polje",
  "43293": "Velika Peratovica",
  "43400": "Križevci",
  "43500": "Daruvar",
  "43505": "Končanica",
  "43506": "Dežanovac",
  "43507": "Uljanik",
  "43531": "Veliki Bastaji",
  "43532": "Đulovac",
  "43541": "Sirač",
  "43543": "Ivanovo Selo",
  "43545": "Garešnički Brestovac",
  "43550": "Pakrac",
  "43551": "Lipik",
  "44000": "Sisak",
  "44203": "Gušće",
  "44204": "Jabukovac",
  "44210": "Sunja",
  "44211": "Blinjski Kut",
  "44213": "Kratečko",
  "44214": "Bestrma",
  "44220": "Petrinja",
  "44222": "Šaš",
  "44230": "Hrvatska Kostajnica",
  "44231": "Dvor",
  "44232": "Topusko",
  "44233": "Gvozd",
  "44240": "Glina",
  "44250": "Petrinja",
  "44253": "Mošćenica",
  "44271": "Letovanić",
  "44272": "Lekenik",
  "44273": "Vukojevac",
  "44274": "Lipovljani",
  "44275": "Greda",
  "44276": "Kutina",
  "44280": "Kutina",
  "44317": "Popovača",
  "44318": "Voloder",
  "44320": "Kutina",
  "44321": "Tomić",
  "44322": "Lipovljani",
  "44323": "Stara Subocka",
  "44324": "Jasenovac",
  "44325": "Krapje",
  "44330": "Novska",
  "44332": "Rajić",
  "44333": "Stara Subocka",
  "44335": "Stara Gradiška",
  "44400": "Glina",
  "44410": "Topusko",
  "44415": "Topusko",
  "44420": "Gvozd",
  "44425": "Gornja Bučica",
  "44430": "Hrvatska Kostajnica",
  "44431": "Donji Kukuruzari",
  "44432": "Mečenčani",
  "44433": "Majur",
  "44435": "Divuša",
  "44436": "Donja Velešnja",
  "44440": "Dvor",
  "44441": "Brđani Šamarički",
  "44443": "Donji Žirovac",
  "44444": "Hrvatska Dubica",
  "44450": "Hrvatska Dubica",
  "47000": "Karlovac",
  "47201": "Draganići",
  "47203": "Rečica",
  "47204": "Šišljavić",
  "47205": "Vukmanić",
  "47206": "Lasinja",
  "47211": "Mahično",
  "47212": "Skakavac",
  "47213": "Krnjak",
  "47214": "Banski Moravci",
  "47220": "Vojnić",
  "47222": "Cetingrad",
  "47240": "Slunj",
  "47241": "Generalski Stol",
  "47242": "Krnjak",
  "47243": "Rakovica",
  "47244": "Cetingrad",
  "47245": "Saborsko",
  "47246": "Plaški",
  "47250": "Duga Resa",
  "47251": "Bosiljevo",
  "47252": "Barilović",
  "47253": "Perjasica",
  "47261": "Ribnik",
  "47262": "Lasinja",
  "47263": "Kamanje",
  "47264": "Budačka Rijeka",
  "47271": "Netretić",
  "47272": "Ribnik",
  "47273": "Ozalj",
  "47274": "Jaškovo",
  "47275": "Gornje Pokupje",
  "47276": "Žakanje",
  "47280": "Ozalj",
  "47300": "Ogulin",
  "47303": "Josipdol",
  "47304": "Plaški",
  "47305": "Lička Jesenica",
  "47306": "Saborsko",
  "47307": "Gomirje",
  "47313": "Tounj",
  "47314": "Jasenak",
  "47320": "Vrbovsko",
  "47321": "Brod Moravice",
  "47322": "Lukovdol",
  "47323": "Skrad",
  "47324": "Moravice",
  "47325": "Severin na Kupi",
  "47326": "Delnice",
  "47327": "Skrad",
  "47328": "Lokve",
  "47329": "Brod na Kupi",
  "47330": "Delnice",
  "47331": "Mrkopalj",
  "47332": "Crni Lug",
  "47333": "Prezid",
  "47334": "Čabar",
  "47335": "Tršće",
  "47336": "Plešce",
  "48000": "Koprivnica",
  "48214": "Sveti Ivan Žabno",
  "48260": "Križevci",
  "48306": "Sokolovac",
  "48312": "Rasinja",
  "48314": "Koprivnički Ivanec",
  "48316": "Đelekovec",
  "48317": "Legrad",
  "48321": "Peteranec",
  "48322": "Drnje",
  "48323": "Hlebine",
  "48324": "Koprivnički Bregi",
  "48325": "Novigrad Podravski",
  "48326": "Virje",
  "48327": "Molve",
  "48331": "Gola",
  "48350": "Đurđevac",
  "48355": "Novo Virje",
  "48356": "Ferdinandovac",
  "48361": "Kalinovac",
  "48362": "Kloštar Podravski",
  "48363": "Podravske Sesvete",
  "49000": "Krapina",
  "49210": "Zabok",
  "49214": "Veliko Trgovišće",
  "49215": "Tuhelj",
  "49216": "Desinić",
  "49217": "Klanjec",
  "49218": "Pregrada",
  "49221": "Bedekovčina",
  "49222": "Poznanovec",
  "49223": "Sveti Križ Začretje",
  "49224": "Lepajci",
  "49225": "Đurmanec",
  "49231": "Hum na Sutli",
  "49232": "Radoboj",
  "49233": "Gornje Jesenje",
  "49234": "Petrovsko",
  "49240": "Donja Stubica",
  "49243": "Oroslavje",
  "49244": "Stubičke Toplice",
  "49245": "Gornja Stubica",
  "49246": "Marija Bistrica",
  "49247": "Zlatar Bistrica",
  "49250": "Zlatar",
  "49251": "Mače",
  "49252": "Mihovljan",
  "49253": "Lobor",
  "49254": "Belec",
  "49255": "Novi Golubovec",
  "49282": "Konjščina",
  "49283": "Hraščina-Trgovišće",
  "49284": "Budinščina",
  "49285": "Radoboj",
  "49290": "Klanjec",
  "51211": "Matulji",
  "51212": "Vele Mune",
  "51213": "Jurdani",
  "51214": "Šapjane",
  "51215": "Kastav",
  "51216": "Viškovo",
  "51217": "Klana",
  "51218": "Dražice",
  "51219": "Čavle",
  "51221": "Kostrena",
  "51222": "Bakar",
  "51223": "Škrljevo",
  "51224": "Krasica",
  "51225": "Praputnjak",
  "51226": "Hreljin",
  "51227": "Kukuljanovo",
  "51241": "Križišće",
  "51242": "Drivenik",
  "51243": "Tribalj",
  "51244": "Grižane-Belgrad",
  "51250": "Novi Vinodolski",
  "51251": "Ledenice",
  "51252": "Klenovica",
  "51253": "Bribir",
  "51260": "Crikvenica",
  "51261": "Bakarac",
  "51262": "Kraljevica",
  "51263": "Šmrika",
  "51264": "Jadranovo",
  "51265": "Dramalj",
  "51266": "Selce",
  "51270": "Senj",
  "51271": "Krivi Put",
  "51280": "Rab",
  "51281": "Lopar",
  "51282": "Kampor",
  "51283": "Supetarska Draga",
  "51284": "Mundanije",
  "51285": "Barbat na Rabu",
  "51286": "Palit",
  "51287": "Banjol",
  "51288": "Rab",
  "51300": "Delnice",
  "51311": "Skrad",
  "51312": "Brod na Kupi",
  "51313": "Kupjak",
  "51314": "Lokve",
  "51315": "Mrkopalj",
  "51316": "Ravna Gora",
  "51317": "Crni Lug",
  "51321": "Moravice",
  "51322": "Fužine",
  "51323": "Lič",
  "51324": "Zlobin",
  "51325": "Moravice",
  "51326": "Vrbovsko",
  "51327": "Plešce",
  "51328": "Prezid",
  "51329": "Tršće",
  "51330": "Brod Moravice",
  "51331": "Skrad",
  "51332": "Lukovdol",
  "51333": "Severin na Kupi",
  "51410": "Opatija",
  "51414": "Ičići",
  "51415": "Lovran",
  "51416": "Mošćenička Draga",
  "51417": "Veprinac",
  "51418": "Brseč",
  "51500": "Krk",
  "51511": "Malinska",
  "51512": "Njivice",
  "51513": "Omišalj",
  "51514": "Dobrinj",
  "51515": "Šilo",
  "51516": "Vrbnik",
  "51517": "Kornić",
  "51521": "Punat",
  "51522": "Draga Bašćanska",
  "51523": "Baška",
  "51531": "Sveti Vid-Miholjice",
  "51532": "Sveti Anton",
  "51533": "Porat",
  "51550": "Mali Lošinj",
  "51551": "Veli Lošinj",
  "51552": "Ilovik",
  "51554": "Nerezine",
  "51555": "Belej",
  "51556": "Martinšćica",
  "51557": "Cres",
  "51559": "Beli",
  "51561": "Susak",
  "51562": "Unije",
  "51564": "Ćunski",
  "51565": "Mali Lošinj",
  "51566": "Osor",
  "51567": "Punta Križa",
  "52100": "Pula",
  "52104": "Štinjan",
  "52105": "Valbandon",
  "52106": "Marčana",
  "52107": "Barban",
  "52108": "Roč",
  "52109": "Pomer",
  "52110": "Rovinj",
  "52111": "Bale",
  "52112": "Fažana",
  "52113": "Pazin",
  "52114": "Tinjan",
  "52115": "Vodnjan",
  "52116": "Galižana",
  "52117": "Svetvinčenat",
  "52118": "Buzet",
  "52119": "Karojba",
  "52120": "Labin",
  "52121": "Rabac",
  "52122": "Koromačno",
  "52123": "Raša",
  "52124": "Kršan",
  "52125": "Šušnjevica",
  "52126": "Potpićan",
  "52127": "Pićan",
  "52128": "Sveti Lovreč",
  "52129": "Žminj",
  "52130": "Rakalj",
  "52131": "Nedešćina",
  "52132": "Krnica",
  "52203": "Medulin",
  "52204": "Ližnjan",
  "52206": "Marčana",
  "52207": "Barban",
  "52210": "Rovinj",
  "52211": "Bale",
  "52212": "Fažana",
  "52215": "Vodnjan",
  "52216": "Galižana",
  "52220": "Labin",
  "52221": "Rabac",
  "52222": "Koromačno",
  "52223": "Raša",
  "52224": "Kršan",
  "52231": "Nedešćina",
  "52232": "Krnica",
  "52233": "Šišan",
  "52234": "Muntić",
  "52241": "Žminj",
  "52242": "Svetvinčenat",
  "52243": "Rovinjsko Selo",
  "52244": "Kanfanar",
  "52245": "Sveti Petar u Šumi",
  "52246": "Nova Vas",
  "52247": "Višnjan",
  "52248": "Kaštelir",
  "52249": "Tar",
  "52341": "Žminj",
  "52342": "Svetvinčenat",
  "52352": "Kanfanar",
  "52361": "Žminj",
  "52420": "Buzet",
  "52422": "Lanišće",
  "52423": "Karojba",
  "52424": "Motovun",
  "52425": "Roč",
  "52426": "Lupoglav",
  "52427": "Livade",
  "52428": "Oprtalj",
  "52429": "Novigrad",
  "52440": "Poreč",
  "52441": "Sveti Lovreč",
  "52442": "Vižinada",
  "52443": "Tinjan",
  "52444": "Višnjan",
  "52445": "Baderna",
  "52446": "Nova Vas",
  "52447": "Tar",
  "52448": "Kaštelir",
  "52449": "Červar-Porat",
  "52450": "Vrsar",
  "52451": "Funtana",
  "52452": "Kanfanar",
  "52460": "Buje",
  "52462": "Momjan",
  "52463": "Višnjan",
  "52464": "Kaštelir-Labinci",
  "52465": "Tar-Vabriga",
  "52466": "Novigrad",
  "52470": "Umag",
  "52474": "Brtonigla",
  "52475": "Savudrija",
  "52477": "Lovrečica",
  "52478": "Buzet",
  "53000": "Gospić",
  "53202": "Perušić",
  "53203": "Kosinj",
  "53206": "Brinje",
  "53211": "Smiljan",
  "53212": "Kaluđerovac",
  "53213": "Donje Pazarište",
  "53220": "Otočac",
  "53223": "Vrhovine",
  "53224": "Ličko Lešće",
  "53230": "Korenica",
  "53231": "Plitvička Jezera",
  "53233": "Udbina",
  "53234": "Bunić",
  "53235": "Bunić",
  "53244": "Lovinac",
  "53250": "Donji Lapac",
  "53260": "Brinje",
  "53270": "Senj",
  "53271": "Krasno",
  "53273": "Brinje",
  "53284": "Sveti Juraj",
  "53287": "Karlobag",
  "53288": "Lukovo Šugarje",
  "53291": "Novalja",
  "53294": "Lun",
  "53296": "Zubovići",
  "53297": "Kustići",
  "53298": "Metajna",
  "53299": "Povljana",
  "10001": "Zagreb - poštanski pretinac",
  "10002": "Zagreb - poštanski pretinac",
  "10003": "Zagreb - poštanski pretinac",
  "10110": "Zagreb - poštanski pretinac",
  "10111": "Zagreb - poštanski pretinac",
  "10112": "Zagreb - poštanski pretinac",
  "10113": "Zagreb - poštanski pretinac",
  "10114": "Zagreb - poštanski pretinac",
  "10115": "Zagreb - poštanski pretinac",
  "10116": "Zagreb - poštanski pretinac",
  "10117": "Zagreb - poštanski pretinac",
  "10118": "Zagreb - poštanski pretinac",
  "10119": "Zagreb - poštanski pretinac",
  "10136": "Zagreb - poštanski pretinac",
  "10137": "Zagreb - poštanski pretinac",
  "10138": "Zagreb - poštanski pretinac",
  "10139": "Zagreb - poštanski pretinac",
  "10170": "Zagreb - poštanski pretinac",
  "10171": "Zagreb - poštanski pretinac",
  "10173": "Zagreb - poštanski pretinac",
  "10174": "Zagreb - poštanski pretinac",
  "10175": "Zagreb - poštanski pretinac",
  "10176": "Zagreb - poštanski pretinac",
  "10177": "Zagreb - poštanski pretinac",
  "10179": "Zagreb - poštanski pretinac",
  "10180": "Zagreb - poštanski pretinac",
  "10181": "Zagreb - poštanski pretinac",
  "10182": "Zagreb - poštanski pretinac",
  "10183": "Zagreb - poštanski pretinac",
  "10184": "Zagreb - poštanski pretinac",
  "10185": "Zagreb - poštanski pretinac",
  "10186": "Zagreb - poštanski pretinac",
  "10189": "Zagreb - poštanski pretinac",
  "10190": "Zagreb - poštanski pretinac",
  "10191": "Zagreb - poštanski pretinac",
  "10192": "Zagreb - poštanski pretinac",
  "10193": "Zagreb - poštanski pretinac",
  "10194": "Zagreb - poštanski pretinac",
  "10195": "Zagreb - poštanski pretinac",
  "10196": "Zagreb - poštanski pretinac",
  "10197": "Zagreb - poštanski pretinac",
  "10198": "Zagreb - poštanski pretinac",
  "10199": "Zagreb - poštanski pretinac"
};

const DPD_FREE_ISLANDS = new Set(["51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517", "23250", "53291", "21220", "21223", "23234", "22243"]);
const OVERSEAS_ZONE2 = new Set(["20210", "20213", "20231", "20216", "20000", "20215", "20207", "20236", "20234", "20218", "20217", "20232", "20205", "20233", "20235"]);
const INTIME_ZONE_2 = new Set(["20210", "20213", "20231", "20216", "20000", "20215", "20207", "20236", "20234", "20218", "20217", "20232", "20205", "20233", "20235", "20225", "20230", "20240", "20244", "20246", "20250"]);
const INTIME_ZONE_3 = new Set(["20221", "20222", "20223", "23283", "23284", "23291", "23292", "23293", "23294", "23295", "23296"]);
const GLS_ALLOWED_POSTALS = new Set([
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "51280", "51550", "51557", "51562",
  "23234", "23250", "53291", "21220", "21223", "22243",
  "21400", "21420", "21450", "21480",
  "20225", "20240", "20244", "20246", "20250",
  "23262", "23263", "23264", "23273", "23274", "23281"
]);

const GLS_1 = [
  { max: 1, price: 3.10 }, { max: 2, price: 3.10 }, { max: 3, price: 3.30 }, { max: 5, price: 4.08 },
  { max: 10, price: 5.25 }, { max: 15, price: 5.93 }, { max: 20, price: 7.33 }, { max: 25, price: 7.90 },
  { max: 30, price: 9.32 }, { max: 40, price: 10.52 },
];
const GLS_2_4 = [
  { max: 1, price: 2.34 }, { max: 2, price: 2.34 }, { max: 3, price: 2.51 }, { max: 5, price: 2.62 },
  { max: 10, price: 3.32 }, { max: 15, price: 4.26 }, { max: 20, price: 4.95 }, { max: 25, price: 5.67 },
  { max: 30, price: 6.99 }, { max: 40, price: 7.74 },
];
const GLS_5P = [
  { max: 1, price: 2.04 }, { max: 2, price: 2.04 }, { max: 3, price: 2.25 }, { max: 5, price: 2.36 },
  { max: 10, price: 3.08 }, { max: 15, price: 3.96 }, { max: 20, price: 4.64 }, { max: 25, price: 5.38 },
  { max: 30, price: 6.47 }, { max: 40, price: 7.54 },
];

const DPD_TABLE = [
  { max: 1, price: 2.59 }, { max: 2, price: 2.59 }, { max: 3, price: 2.67 }, { max: 5, price: 2.67 },
  { max: 10, price: 3.25 }, { max: 15, price: 3.25 }, { max: 20, price: 4.09 }, { max: 25, price: 4.09 }, { max: 31.5, price: 5.64 },
];

const HP_TABLE = [
  { max: 5, price: 2.20 }, { max: 10, price: 2.80 }, { max: 15, price: 3.30 }, { max: 20, price: 4.05 }, { max: 30, price: 5.45 },
];

const OS_SINGLE = [
  { max: 10, price: 2.61 }, { max: 20, price: 3.24 }, { max: 31.5, price: 3.52 },
];

const OS_MULTI = [
  { max: 5, price: 2.63 }, { max: 10, price: 2.84 }, { max: 20, price: 4.17 }, { max: 30, price: 5.40 }, { max: 40, price: 6.31 },
  { max: 50, price: 7.81 }, { max: 60, price: 8.74 }, { max: 70, price: 10.09 }, { max: 80, price: 11.80 }, { max: 90, price: 13.21 }, { max: 100, price: 14.56 },
];

const INTIME = {
  1: [
    { max: 2, price: 3.9 }, { max: 5, price: 4.47 }, { max: 10, price: 5.57 }, { max: 15, price: 6.69 }, { max: 20, price: 7.79 },
    { max: 25, price: 10.03 }, { max: 30, price: 11.29 }, { max: 35, price: 13.80 }, { max: 40, price: 16.29 }, { max: 45, price: 21.90 },
    { max: 50, price: 24.60 }, { max: 60, price: 27.30 }, { max: 70, price: 30.20 }, { max: 80, price: 33.20 }, { max: 90, price: 36.17 },
    { max: 100, price: 39.12 }, { max: 150, price: 44.07 }, { max: 200, price: 49.90 }, { max: 250, price: 54.80 }, { max: 300, price: 59.70 },
    { max: 350, price: 64.60 }, { max: 400, price: 74.50 }, { max: 450, price: 84.30 }, { max: 500, price: 94.20 }, { max: 600, price: 109.80 },
    { max: 700, price: 124.50 }, { max: 800, price: 139.10 }, { max: 900, price: 154.80 }, { max: 1000, price: 169.30 },
  ],
  2: [
    { max: 2, price: 4.47 }, { max: 5, price: 5.57 }, { max: 10, price: 6.69 }, { max: 15, price: 7.79 }, { max: 20, price: 10.03 },
    { max: 25, price: 13.80 }, { max: 30, price: 15.06 }, { max: 35, price: 17.56 }, { max: 40, price: 20.70 }, { max: 45, price: 27.40 },
    { max: 50, price: 32.90 }, { max: 60, price: 37.40 }, { max: 70, price: 42.10 }, { max: 80, price: 47.90 }, { max: 90, price: 52.80 },
    { max: 100, price: 57.70 }, { max: 150, price: 64.60 }, { max: 200, price: 71.50 }, { max: 250, price: 78.50 }, { max: 300, price: 85.30 },
    { max: 350, price: 92.10 }, { max: 400, price: 102.90 }, { max: 450, price: 112.80 }, { max: 500, price: 122.70 }, { max: 600, price: 137.30 },
    { max: 700, price: 152.10 }, { max: 800, price: 167.50 }, { max: 900, price: 182.10 }, { max: 1000, price: 197.80 },
  ],
  3: [
    { max: 2, price: 8.61 }, { max: 5, price: 10.33 }, { max: 10, price: 12.05 }, { max: 15, price: 14.56 }, { max: 20, price: 17.20 },
    { max: 25, price: 18.93 }, { max: 30, price: 20.65 }, { max: 35, price: 25.15 }, { max: 40, price: 29.13 }, { max: 45, price: 35.80 },
    { max: 50, price: 40.10 }, { max: 60, price: 45.20 }, { max: 70, price: 50.10 }, { max: 80, price: 55.20 }, { max: 90, price: 60.20 },
    { max: 100, price: 65.40 }, { max: 150, price: 80.40 }, { max: 200, price: 95.40 }, { max: 250, price: 110.10 }, { max: 300, price: 125.60 },
    { max: 350, price: 140.70 }, { max: 400, price: 155.90 }, { max: 450, price: 170.10 }, { max: 500, price: 185.60 }, { max: 600, price: 225.80 },
    { max: 700, price: 265.60 }, { max: 800, price: 305.50 }, { max: 900, price: 345.70 }, { max: 1000, price: 385.90 },
  ],
};

function money(n) {
  return new Intl.NumberFormat("hr-HR", { style: "currency", currency: "EUR" }).format(n || 0);
}
const formatMoney = money;
function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
function ceilDiv(a, b) {
  return Math.ceil(a / b);
}
function tierPrice(table, kg) {
  const row = table.find((r) => kg <= r.max);
  return row ? row.price : null;
}
function girth(p) {
  return Number(p.length) + 2 * Number(p.width) + 2 * Number(p.height);
}
function totalWeight(packages) {
  return round2(packages.reduce((sum, p) => sum + Number(p.weight || 0), 0));
}
function volumeWeightInTime(packages) {
  return round2(packages.reduce((sum, p) => {
    const l = Number(p.length || 0) / 100;
    const w = Number(p.width || 0) / 100;
    const h = Number(p.height || 0) / 100;
    return sum + l * w * h * 200;
  }, 0));
}
function getInTimeZone(postal) {
  if (INTIME_ZONE_3.has(postal)) return 3;
  if (INTIME_ZONE_2.has(postal)) return 2;
  return 1;
}
function looksIsland(postal) {
  return [
    "20221","20222","20223","20224","20225","20230","20240","20244","20246","20250","20260","20263","20264","20270","20271","20272","20273","20274","20275","20278",
    "21220","21223","21224","21225",
    "21400","21403","21404","21405","21410","21412","21413","21420","21423","21424","21425","21426","21430","21432","21450","21454","21460","21462","21463","21465","21466","21467","21468","21469","21480","21483",
    "22232","22233","22234","22235","22236","22242","22243","22244",
    "23212","23234","23249","23250","23251","23262","23263","23264","23271","23272","23273","23274","23275","23281","23282","23283","23284","23285","23286","23287","23291","23292","23293","23294","23295","23296","23297","23299",
    "51280","51281","51282","51283","51284","51285","51286","51287","51288",
    "51500","51511","51512","51513","51514","51515","51516","51517","51521","51522","51523","51550","51551","51552","51554","51555","51556","51557","51559","51561","51562","51564","51565","51566","51567",
    "53291","53294","53296","53297","53298","53299"
  ].includes(postal);
}

function isGlsPossible(postal) {
  if (!looksIsland(postal)) return true;
  return GLS_ALLOWED_POSTALS.has(postal);
}

function isOverseasSpecialZone(postal) {
  return looksIsland(postal) || postal.startsWith("20") || OVERSEAS_ZONE2.has(postal);
}

function resultCard(result, price, details, reasons) {
  return { service: result.service, type: result.type, possible: reasons.length === 0, price: round2(price), details, reasons };
}

function calcDPD(packages, postal, cod) {
  const reasons = [];
  for (let i = 0; i < packages.length; i += 1) {
    const p = packages[i];
    if (p.weight > 31.5) reasons.push(`Paket ${i + 1}: masa > 31,5 kg`);
    if (p.length > 175) reasons.push(`Paket ${i + 1}: duljina > 175 cm`);
    if (girth(p) > 300) reasons.push(`Paket ${i + 1}: L+2Š+2V > 300 cm`);
  }
  let price = 0;
  if (reasons.length === 0) {
    if (packages.length >= 2) price = packages.length * 2.89;
    else price = tierPrice(DPD_TABLE, packages[0].weight) || 0;
    if (looksIsland(postal) && !DPD_FREE_ISLANDS.has(postal)) price += 3.5;
  }
  const details = [packages.length >= 2 ? "2+ paketa: 2,89 € po paketu" : "Standardni cjenik", cod ? "COD uključen" : "Bez COD dodatka"];
  if (looksIsland(postal) && !DPD_FREE_ISLANDS.has(postal)) details.push("Otočna nadoplata +3,50 €");
  return resultCard({ service: "DPD", type: "MBE Economy" }, price, details, reasons);
}

function calcGLS(packages, postal, cod) {
  const reasons = [];
  const table = packages.length === 1 ? GLS_1 : packages.length <= 4 ? GLS_2_4 : GLS_5P;

  for (let i = 0; i < packages.length; i += 1) {
    const p = packages[i];
    if (p.weight > 40) reasons.push(`Paket ${i + 1}: masa > 40 kg`);
    if (p.length > 200 || p.width > 80 || p.height > 60) reasons.push(`Paket ${i + 1}: dimenzije prelaze 200×80×60 cm`);
    if (girth(p) > 300) reasons.push(`Paket ${i + 1}: L+2Š+2V > 300 cm`);
  }

  if (!isGlsPossible(postal)) {
    reasons.push("GLS nije moguć za ovaj poštanski broj / otok.");
  }

  let price = 0;
  if (reasons.length === 0) {
    price = packages.reduce((sum, p) => sum + (tierPrice(table, p.weight) || 0), 0);
    price = price * 1.19;
    if (cod) price += 0.43;
  }

  const details = [
    packages.length === 1 ? "1 paket cjenik" : packages.length <= 4 ? "2–4 paketa cjenik" : "5+ paketa cjenik",
    "+19% dodatak",
    cod ? "COD +0,43 €" : "Bez COD dodatka"
  ];

  return resultCard({ service: "GLS", type: "MBE Express" }, price, details, reasons);
}

function calcHP(packages, cod) {
  const reasons = [];
  for (let i = 0; i < packages.length; i += 1) {
    const p = packages[i];
    if (Math.max(p.length, p.width, p.height) > 60) reasons.push(`Paket ${i + 1}: najduža stranica > 60 cm`);
    if ((Number(p.length) + Number(p.width) + Number(p.height)) > 180) reasons.push(`Paket ${i + 1}: zbroj stranica > 180 cm`);
  }
  const kg = totalWeight(packages);
  let price = 0;
  if (reasons.length === 0) {
    const base = tierPrice(HP_TABLE, kg);
    price = base !== null ? base : 5.45 + ceilDiv(kg - 30, 5) * 1;
    if (cod) price += 0.5;
  }
  const details = ["Obračun po pošiljci", cod ? "COD +0,50 €" : "Bez COD dodatka", "HP vozi sve adrese u HR bez otočnih nadoplata"];
  return resultCard({ service: "HP", type: "MBE Economy" }, price, details, reasons);
}

function calcOSSingle(packages, postal, cod) {
  const reasons = [];
  let base = 0;
  for (let i = 0; i < packages.length; i += 1) {
    const p = packages[i];
    if (p.weight > 31.5) reasons.push(`Paket ${i + 1}: masa > 31,5 kg`);
    if (p.length > 100) reasons.push(`Paket ${i + 1}: duljina > 100 cm`);
    if (girth(p) > 340) reasons.push(`Paket ${i + 1}: L+2Š+2V > 340 cm`);
    base += tierPrice(OS_SINGLE, p.weight) || 0;
  }
  let price = 0;
  if (reasons.length === 0) {
    price = base * 1.05;
    if (cod) price += 0.30;
    if (isOverseasSpecialZone(postal)) price *= 1.20;
  }
  const details = ["Obračun po paketu", "+5% dodatak", cod ? "COD +0,30 €" : "Bez COD dodatka", isOverseasSpecialZone(postal) ? "Posebna zona / otok +20%" : "Standardna zona"];
  return resultCard({ service: "Overseas Single", type: "MBE Economy" }, price, details, reasons);
}

function calcOSMulti(packages, postal, cod) {
  const reasons = [];
  for (let i = 0; i < packages.length; i += 1) {
    const p = packages[i];
    if (p.weight > 31.5) reasons.push(`Paket ${i + 1}: masa > 31,5 kg`);
    if (p.length > 100) reasons.push(`Paket ${i + 1}: duljina > 100 cm`);
    if (girth(p) > 340) reasons.push(`Paket ${i + 1}: L+2Š+2V > 340 cm`);
  }
  const kg = totalWeight(packages);
  let price = 0;
  if (reasons.length === 0) {
    const base = tierPrice(OS_MULTI, kg);
    price = base !== null ? base : 14.56 + Math.max(0, kg - 100) * 0.25;
    price = price * 1.05; // +5% gorivo
    if (cod) price += 0.30;
    if (isOverseasSpecialZone(postal)) price *= 1.20;
  }
  const details = ["Obračun po pošiljci", "+5% dodatak", cod ? "COD +0,30 €" : "Bez COD dodatka", isOverseasSpecialZone(postal) ? "Posebna zona / otok +20%" : "Standardna zona"];
  return resultCard({ service: "Overseas Multi", type: "MBE Economy" }, price, details, reasons);
}

function calcInTime(packages, postal) {
  const actual = totalWeight(packages);
  const volumetric = volumeWeightInTime(packages);
  const chargeable = Math.max(actual, volumetric);
  const zone = getInTimeZone(postal);
  const reasons = [];
  const base = tierPrice(INTIME[zone], chargeable);
  let price = 0;
  if (base === null) reasons.push("Obračunska masa prelazi 1000 kg.");
  else price = base * 1.15;
  const details = [`Zona ${zone}`, `Stvarna masa ${actual} kg`, `Volumetrijska masa ${volumetric} kg`, `Obračunska masa ${chargeable} kg`, "+15% gorivo"];
  return resultCard({ service: "InTime", type: "MBE Economy" }, price, details, reasons);
}

function getRecommendation(economy, express) {
  const valid = [...economy, ...express].filter((r) => r.possible).sort((a, b) => a.price - b.price);
  if (valid.length === 0) {
    return { title: "Nije moguće poslati", text: "Nijedna trenutno izračunata opcija ne prolazi za zadane parametre.", service: null };
  }
  const best = valid[0];
  return { title: `Preporuka: ${best.service} / ${best.type}`, text: `Najpovoljnija valjana opcija je ${best.service} (${money(best.price)}).`, service: best.service };
}

function ResultCard({ result, highlighted = false }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlighted ? "border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/60" : result.possible ? "bg-white" : "bg-slate-50"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            {LOGOS[result.service] && <img src={LOGOS[result.service]} alt={result.service} className="h-6 w-auto object-contain" />}
            <div className="text-lg font-semibold">{result.service}</div>
            <Badge className={result.type === "MBE Express" ? "bg-red-600 text-white" : "bg-emerald-600 text-white"}>{result.type}</Badge>
            {highlighted && result.possible && <Badge className="bg-emerald-700 text-white">PREPORUKA</Badge>}
            {result.possible ? (
              <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="mr-1 h-3.5 w-3.5" />Moguće</Badge>
            ) : (
              <Badge className="bg-orange-500 text-white"><AlertCircle className="mr-1 h-3.5 w-3.5" />Nije moguće</Badge>
            )}
          </div>
          <div className="mt-2 text-sm text-slate-600">{result.possible ? result.details.join(" · ") : result.reasons.join(" · ")}</div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wide text-slate-500">Cijena</div>
          <div className="text-2xl font-bold">{result.possible ? formatMoney(result.price) : "—"}</div>
        </div>
      </div>
    </div>
  );
}

export default function MbeKalkulatorHr() {
  const [postalCode, setPostalCode] = useState("");
  const [cod, setCod] = useState(false);
  const [packages, setPackages] = useState([{ weight: 2, length: 30, width: 20, height: 10 }]);

  const postalPlace = useMemo(() => POSTAL_LOOKUP[postalCode] || "", [postalCode]);
  const normalized = useMemo(() => packages.map((p) => ({
    weight: Number(p.weight) || 0,
    length: Number(p.length) || 0,
    width: Number(p.width) || 0,
    height: Number(p.height) || 0,
  })), [packages]);

  const results = useMemo(() => {
    const ready = postalCode.length === 5 && normalized.every((p) => p.weight > 0 && p.length > 0 && p.width > 0 && p.height > 0);
    if (!ready) return null;
    const economy = [
      calcDPD(normalized, postalCode, cod),
      calcHP(normalized, cod),
      calcOSSingle(normalized, postalCode, cod),
      ...(normalized.length > 1 ? [calcOSMulti(normalized, postalCode, cod)] : []),
      calcInTime(normalized, postalCode),
    ].sort((a, b) => (a.possible === b.possible ? a.price - b.price : a.possible ? -1 : 1));
    const express = [calcGLS(normalized, postalCode, cod)];
    const recommendation = getRecommendation(economy, express);
    return { economy, express, recommendation };
  }, [postalCode, normalized, cod]);

  const total = useMemo(() => totalWeight(normalized), [normalized]);

  const updatePackage = (index, field, value) => {
    setPackages((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };
  const addPackage = () => setPackages((prev) => [...prev, { weight: 1, length: 20, width: 20, height: 10 }]);
  const duplicatePackage = (index) => setPackages((prev) => [...prev.slice(0, index + 1), { ...prev[index] }, ...prev.slice(index + 1)]);
  const removePackage = (index) => setPackages((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-4">
          <img src="https://www.mbe.hr/wp-content/uploads/2020/04/mbe-logo.png" alt="MBE" className="h-10 w-auto" />
          <div className="rounded-2xl bg-white p-3 shadow-sm border"><Truck className="h-6 w-6" /></div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">MBE kalkulator HR</h1>
            <p className="text-slate-600">Poštanski broj, otoci i zone direktno utječu na izračun.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1 rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Package2 className="h-5 w-5" /> Unos pošiljke</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="postal">Poštanski broj</Label>
                <Input id="postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))} placeholder="npr. 48260" />
                {postalCode.length > 0 && (
                  <div className={`flex items-center gap-2 text-sm ${postalPlace ? "text-emerald-700" : postalCode.length === 5 ? "text-red-600" : "text-slate-500"}`}>
                    <MapPin className="h-4 w-4" />
                    {postalPlace ? `Mjesto: ${postalPlace}` : postalCode.length === 5 ? "Poštanski broj nije pronađen u lokalnoj bazi" : "Upiši svih 5 znamenki"}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 rounded-xl border p-3 bg-slate-50">
                <Checkbox id="cod" checked={cod} onCheckedChange={(checked) => setCod(Boolean(checked))} />
                <Label htmlFor="cod" className="cursor-pointer">COD / pouzeće</Label>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Paketi u pošiljci</div>
                  <Button type="button" size="sm" onClick={addPackage}><Plus className="mr-1 h-4 w-4" /> Dodaj paket</Button>
                </div>

                {packages.map((pkg, index) => (
                  <div key={index} className="rounded-2xl border bg-white p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium">Paket {index + 1}</div>
                      <div className="flex items-center gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => duplicatePackage(index)}><Copy className="mr-1 h-4 w-4" /> Dupliciraj</Button>
                        {packages.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removePackage(index)}><Trash2 className="h-4 w-4" /></Button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Težina (kg)</Label><Input type="number" step="0.01" value={pkg.weight} onChange={(e) => updatePackage(index, "weight", e.target.value)} /></div>
                      <div><Label>Duljina (cm)</Label><Input type="number" value={pkg.length} onChange={(e) => updatePackage(index, "length", e.target.value)} /></div>
                      <div><Label>Širina (cm)</Label><Input type="number" value={pkg.width} onChange={(e) => updatePackage(index, "width", e.target.value)} /></div>
                      <div><Label>Visina (cm)</Label><Input type="number" value={pkg.height} onChange={(e) => updatePackage(index, "height", e.target.value)} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5" /> MBE Economy</CardTitle></CardHeader>
                <CardContent>
                  {results?.economy?.[0] ? (
                    <div className="rounded-2xl border bg-slate-50 p-5">
                      <div className="text-sm text-slate-500">Najpovoljnija economy opcija</div>
                      <div className="mt-1 text-2xl font-bold">{results.economy[0].service}</div>
                      <div className="mt-3 text-3xl font-extrabold">{formatMoney(results.economy[0].price)}</div>
                      <div className="mt-3 text-sm text-slate-600">{results.economy[0].possible ? results.economy[0].details.join(" · ") : results.economy[0].reasons.join(" · ")}</div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed p-6 text-slate-500">Upiši poštanski broj i sve podatke o paketima.</div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" /> MBE Express</CardTitle></CardHeader>
                <CardContent>
                  {results?.express?.[0] ? (
                    <div className="rounded-2xl border bg-slate-50 p-5">
                      <div className="text-sm text-slate-500">Express opcija</div>
                      <div className="mt-1 text-2xl font-bold">{results.express[0].service}</div>
                      <div className="mt-3 text-3xl font-extrabold">{formatMoney(results.express[0].price)}</div>
                      <div className="mt-3 text-sm text-slate-600">{results.express[0].possible ? results.express[0].details.join(" · ") : results.express[0].reasons.join(" · ")}</div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed p-6 text-slate-500">Upiši podatke za izračun express opcije.</div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-2xl shadow-sm border-0 bg-slate-900 text-white">
              <CardContent className="p-6">
                <div className="text-sm uppercase tracking-wider text-slate-300">Konačna preporuka</div>
                <div className="mt-2 text-2xl font-bold">{results ? results.recommendation.title : "Čekam unos"}</div>
                <div className="mt-2 text-slate-200">{results ? results.recommendation.text : "Nakon unosa svih podataka dobit ćeš preporuku."}</div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader><CardTitle>Sažetak unosa</CardTitle></CardHeader>
              <CardContent className="grid gap-3 text-sm text-slate-600 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">Paketa: <strong>{packages.length}</strong></div>
                <div className="rounded-xl bg-slate-50 p-4">Ukupna težina: <strong>{total.toFixed(2)} kg</strong></div>
                <div className="rounded-xl bg-slate-50 p-4">COD: <strong>{cod ? "Da" : "Ne"}</strong></div>
              </CardContent>
            </Card>

            {results && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Sve economy opcije</h2>
                  <div className="grid gap-3">
                    {results.economy.map((r) => <ResultCard key={r.service} result={r} highlighted={r.service === results.recommendation.service} />)}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Express opcija</h2>
                  <div className="grid gap-3">
                    {results.express.map((r) => <ResultCard key={r.service} result={r} highlighted={r.service === results.recommendation.service} />)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
