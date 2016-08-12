//This is the version which use the total_count of each author as its radius.
// And it's an directed graph.

var $ = jQuery.noConflict();
// "Array.prototype" allows us to add aditional methods to the Array object. Here we add "insert" and "delete" methods

// "insert" method lets us add an element at any index
// e.g.
// [a,b,d].insert('c', 2); // [a,b,c,d]
Array.prototype.insert = function(element, index) {
	this.splice(index, 0, element);
}

// "remove" method lets us remove elements within index range
// e.g.
// [a,b,c,d].remove(0, 2); // [d]
Array.prototype.delete = function(startIndex, endIndex) {
	return this.splice(startIndex, (endIndex - startIndex) + 1);
}

function addname(authorobj)
{
    var pair = [
        {"id": "02703842883068409645", "name": "Judith Olson"},
        {"id": "02880917016095882147", "name": "Simon Huynh"},
        {"id": "10501801004479529726", "name": "Jordan Speer"},
        {"id": "10707270566895505267", "name": "David Nguyen"},
        {"id": "15354552024294614961", "name": "Melody Budiono"},
        {"id": "14306990042510655029", "name": "kenny compass"},
        {"id": "14530296631031693905", "name": "Mike Tang"},
        {"id": "15167284772437909646", "name": "melanie okamuro"},
        {"id": "15418495286523979709", "name": "BookAnyone Y"},
        {"id": "00243482287514387879", "name": "Michael Cupino"},
        {"id": "01459300326715533264", "name": "Deleted Author"},
        {"id": "09485119782717895620", "name": "Marcel Mariusz Pufal"},
        {"id": "13287795404101530068", "name": "Galina Tucker"},
        {"id": "16417202936448014408", "name": "asdf asdfasdfasdf"},
        {"id": "01553418506900772105", "name": "Ferdinand Lucero"},
        {"id": "10821572396991449990", "name": "Danielle Yu"},
        {"id": "11681678739348388065", "name": "Shawn Ridgeway"},
        {"id": "12347647493437600134", "name": "Deleted Author"},
        {"id": "05890976967686304979", "name": "Kenny Pham"},
        {"id": "08094436981704944517", "name": "Chris Lang"},
        {"id": "13638524324088584736", "name": "Alex Taubman"},
        {"id": "16682995488468428954", "name": "Raymond Lam"},
        {"id": "17110218403352683446", "name": "Steve Abrams"},
        {"id": "18310079704025146856", "name": "Styopful"},
        {"id": "05569939944663086046", "name": "Fooby Tooby"},
        {"id": "07329780835145516128", "name": "vatsal shah"},
        {"id": "07842005017024894000", "name": "Jingwen Zhang"},
        {"id": "10618081988947059762", "name": "Chris Gau"},
        {"id": "17218861008218881324", "name": "Josh Ettlin"},
        {"id": "18364111256057082543", "name": "Martina Mickos"},
        {"id": "02135481392268123961", "name":"Tawny Le"},
        {"id": "04649304070135475667", "name": "Myron Cotran"},
        {"id": "05806503899427172220", "name": "Tri Pham"},
        {"id": "15622568552368691747", "name": "Warren Trinh"},
        {"id": "03101429957824594028", "name": "Candace Chen"},
        {"id": "06833328504531923602", "name": "Linh Lam"},
        {"id": "10299863492932906680", "name": "Ammar Taki El-Din"},
        {"id": "11530940997908066395", "name": "Steven N"},
        {"id": "16578049557931713311", "name": "Matthew Ito"},
        {"id": "08094436981704944517", "name": "Chris Lang"},
        {"id": "13638524324088584736", "name": "Alex Taubman"},
        {"id": "16682995488468428954", "name": "Raymond Lam"},
        {"id": "17110218403352683446", "name": "Steve Abrams"},
        {"id": "18310079704025146856", "name": "Styopful"},
        {"id": "01880925436724924511", "name": "Grant Arjani"},
        {"id": "06326729701024633288", "name": "Kevin Sar"},
        {"id": "15725024396200531081", "name": "Muhammad Zaman"},
        {"id": "17060302225180119562", "name": "Aaron Donk"},
        {"id": "05569939944663086046", "name": "Fooby Tooby"},
        {"id": "07329780835145516128", "name": "vatsal shah"},
        {"id": "10618081988947059762", "name": "Chris Gau"},
        {"id": "18364111256057082543", "name": "Martina Mickos"},
        {"id": "00243482287514387879", "name": "Michael Cupino"},
        {"id": "01459300326715533264", "name": "Deleted Author"},
        {"id": "09485119782717895620", "name": "Marcel Mariusz Pufal"},
        {"id": "13287795404101530068", "name": "Galina Tucker"},
        {"id": "16417202936448014408", "name": "asdf asdfasdfasdf"},
        {"id": "01553418506900772105", "name": "Ferdinand Lucero"},
        {"id": "10821572396991449990", "name": "Danielle Yu"},
        {"id": "11681678739348388065", "name": "Shawn Ridgeway"},
        {"id": "12347647493437600134", "name": "Deleted Author"},
        {"id": "00629840512201218845", "name": "Minda Wang"},
        {"id": "02135481392268123961", "name":"Tawny Le"},
        {"id": "04649304070135475667", "name": "Myron Cotran"},
        {"id": "05806503899427172220", "name": "Tri Pham"},
        {"id": "15622568552368691747", "name": "Warren Trinh"},
        {"id": "03101429957824594028", "name": "Candace Chen"},
        {"id": "06833328504531923602", "name": "Linh Lam"},
        {"id": "10299863492932906680", "name": "Ammar Taki El-Din"},
        {"id": "11530940997908066395", "name": "Steven N"},
        {"id": "16578049557931713311", "name": "Matthew Ito"},
        {"id": "04649304070135475667", "name": "Myron Cotran"},
        {"id": "05806503899427172220", "name": "Tri Pham"},
        {"id": "15622568552368691747", "name": "Warren Trinh"},
        {"id": "08094436981704944517", "name": "Chris Lang"},
        {"id": "13638524324088584736", "name": "Alex Taubman"},
        {"id": "16682995488468428954", "name": "Raymond Lam"},
        {"id": "17110218403352683446", "name": "Steve Abrams"},
        {"id": "18310079704025146856", "name": "Styopful"},
        {"id": "01880925436724924511", "name": "Grant Arjani"},
        {"id": "03765123875391401874", "name": "Deleted Author"},
        {"id": "06287517911256457317", "name": "Anonymous Author"},
        {"id": "06326729701024633288", "name": "Kevin Sar"},
        {"id": "17060302225180119562", "name": "Aaron Donk"},
        {"id": "12290931711648662814", "name": "Camille Mercado"},
        {"id": "16177063939308443946", "name": "Vasken Houdoverdov"},
        {"id": "16440983667413912259", "name": "William Yeh"},
        {"id": "01259840063876530305", "name": "Danilo Fabian"},
        {"id": "04263340004691435622", "name": "Jonathan Chang"},
        {"id": "03197640770545781392", "name": "Julia Katherine Haines"},
        {"id": "08157760590190814593", "name": "Cameron Ruarra"},
        {"id": "10953155332786329205", "name": "Kevin Chhour"},
        {"id": "09413502275486337909", "name": "Vince Pacubas"},
        {"id": "12602472045544818640", "name": "Steven Dunn"},
        {"id": "12735685359351828455", "name": "Justyne Catacutan"},
        {"id": "14289880204969321892", "name": "Zafar Mehboob"},
        {"id": "09413502275486337909", "name": "Vince Pacubas"},
        {"id": "12602472045544818640", "name": "Steven Dunn"},
        {"id": "12735685359351828455", "name": "Justyne Catacutan"},
        {"id": "14289880204969321892", "name": "Zafar Mehboob"},
        {"id": "01793567636778341739", "name": "milin shah"},
        {"id": "04096874345193163508", "name": "JT JT"},
        {"id": "12717223956176385694", "name": "Atul Sehdev"},
        {"id": "16388964346663900615", "name": "Christine Liang"},
        {"id": "17724274615216747229", "name": "Derek Vo"},
        {"id": "05284955739613235618", "name": "Kristen Wakamoto"},
        {"id": "07174610359497149637", "name": "Jeremy Anoc"},
        {"id": "11109228934568628929", "name": "Dakuo Wang"},
        {"id": "12116683882993800751", "name": "Daniel Lobato"},
        {"id": "16436582708101468723", "name": "ZR Plascencia"},
        {"id": "01078358405923817069", "name": "Rachel Rose Ulgado"},
        {"id": "03204735025190445044", "name": "Aaron Pecson"},
        {"id": "15218326554999396005", "name": "Stefan Adamov"},
        {"id": "17012917518020206611", "name": "Ryan Beach"},
        {"id": "01078358405923817069", "name": "Rachel Rose Ulgado"},
        {"id": "03204735025190445044", "name": "Aaron Pecson"},
        {"id": "15218326554999396005", "name": "Stefan Adamov"},
        {"id": "00565968836529884056", "name": "Melvin Chien"},
        {"id": "09524451016988941693", "name": "Jola Bolaji"},
        {"id": "14436720037150063355", "name": "Kevin McNamara"},
        {"id": "16231506449038542227", "name": "Scott Cashin"},
        {"id": "05890976967686304979", "name": "Kenny Pham"},
        {"id": "07255281081717693554", "name": "pfuckoff grewgle"},
        {"id": "10329525794174828825", "name": "Chhai Eng"},
        {"id": "11916687224007865289", "name": "Juliano Yi"},
        {"id": "12802012653647101892", "name": "Patrick Chen"},
        {"id": "08950345528336709453", "name": "Deleted Author"},
        {"id": "12290931711648662814", "name": "Camille Mercado"},
        {"id": "16177063939308443946", "name": "Vasken Houdoverdov"},
        {"id": "16440983667413912259", "name": "William Yeh"},
        {"id": "00565968836529884056", "name": "Melvin Chien"},
        {"id": "14436720037150063355", "name": "Kevin McNamara"},
        {"id": "16231506449038542227", "name": "Scott Cashin"},
        {"id": "01793567636778341739", "name": "milin shah"},
        {"id": "12717223956176385694", "name": "Atul Sehdev"},
        {"id": "16388964346663900615", "name": "Christine Liang"},
        {"id": "17724274615216747229", "name": "Derek Vo"},
        {"id": "05284955739613235618", "name": "Kristen Wakamoto"},
        {"id": "07174610359497149637", "name": "Jeremy Anoc"},
        {"id": "12116683882993800751", "name": "Daniel Lobato"},
        {"id": "16436582708101468723", "name": "ZR Plascencia"},
        {"id": "09413502275486337909", "name": "Vince Pacubas"},
        {"id": "12602472045544818640", "name": "Steven Dunn"},
        {"id": "12735685359351828455", "name": "Justyne Catacutan"},
        {"id": "14289880204969321892", "name": "Zafar Mehboob"},
        {"id": "01259840063876530305", "name": "Danilo Fabian"},
        {"id": "04263340004691435622", "name": "Jonathan Chang"},
        {"id": "08157760590190814593", "name": "Cameron Ruarra"},
        {"id": "10953155332786329205", "name": "Kevin Chhour"},
        {"id": "06859355820164013432", "name": "Helen Zhu"},
        {"id": "14070659077316322037", "name": "Deleted Author"},
        {"id": "18188412320179593920", "name": "Mark Chege"},
        {"id": "01078358405923817069", "name": "Rachel Rose Ulgado"},
        {"id": "03204735025190445044", "name": "Aaron Pecson"},
        {"id": "15218326554999396005", "name": "Stefan Adamov"},
        {"id": "10329525794174828825", "name": "Chhai Eng"},
        {"id": "11916687224007865289", "name": "Juliano Yi"},
        {"id": "12802012653647101892", "name": "Patrick Chen"},
        {"id": "08950345528336709453", "name": "Deleted Author"},
        {"id": "09974732414835475822", "name": "Osama Ahmad"},
        {"id": "12290931711648662814", "name": "Camille Mercado"},
        {"id": "16177063939308443946", "name": "Vasken Houdoverdov"},
        {"id": "16440983667413912259", "name": "William Yeh"},
        {"id": "00565968836529884056", "name": "Melvin Chien"},
        {"id": "07070953006231440687", "name": "Freddie Zenteno"},
        {"id": "09524451016988941693", "name": "Jola Bolaji"},
        {"id": "14436720037150063355", "name": "Kevin McNamara"},
        {"id": "16231506449038542227", "name": "Scott Cashin"},
        {"id": "01793567636778341739", "name": "milin shah"},
        {"id": "04096874345193163508", "name": "JT JT"},
        {"id": "12717223956176385694", "name": "Atul Sehdev"},
        {"id": "16388964346663900615", "name": "Christine Liang"},
        {"id": "17724274615216747229", "name": "Derek Vo"},
        {"id": "06899941699478068610", "name": "Martin Shelton"},
        {"id": "05284955739613235618", "name": "Kristen Wakamoto"},
        {"id": "07174610359497149637", "name": "Jeremy Anoc"},
        {"id": "09413502275486337909", "name": "Vince Pacubas"},
        {"id": "12602472045544818640", "name": "Steven Dunn"},
        {"id": "12735685359351828455", "name": "Justyne Catacutan"},
        {"id": "14289880204969321892", "name": "Zafar Mehboob"},
        {"id": "06859355820164013432", "name": "Helen Zhu"},
        {"id": "13055127735503255476", "name": "Deleted Author"},
        {"id": "14070659077316322037", "name": "Deleted Author"},
        {"id": "18188412320179593920", "name": "Mark Chege"},
        {"id": "01259840063876530305", "name": "Danilo Fabian"},
        {"id": "04263340004691435622", "name": "Jonathan Chang"},
        {"id": "08157760590190814593", "name": "Cameron Ruarra"},
        {"id": "10953155332786329205", "name": "Kevin Chhour"},
        {"id": "07255281081717693554", "name": "pfuckoff grewgle"},
        {"id": "10329525794174828825", "name": "Chhai Eng"},
        {"id": "11916687224007865289", "name": "Juliano Yi"},
        {"id": "12802012653647101892", "name": "Patrick Chen"},
        {"id": "09974732414835475822", "name": "Osama Ahmad"},
        {"id": "12290931711648662814", "name": "Camille Mercado"},
        {"id": "16177063939308443946", "name": "Vasken Houdoverdov"},
        {"id": "16440983667413912259", "name": "William Yeh"},
        {"id": "01793567636778341739", "name": "milin shah"},
        {"id": "03197640770545781392", "name": "Julia Katherine Haines"},
        {"id": "04096874345193163508", "name": "JT JT"},
        {"id": "12717223956176385694", "name": "Atul Sehdev"},
        {"id": "16388964346663900615", "name": "Christine Liang"},
        {"id": "17724274615216747229", "name": "Derek Vo"},
        {"id": "01259840063876530305", "name": "Danilo Fabian"},
        {"id": "04263340004691435622", "name": "Jonathan Chang"},
        {"id": "08157760590190814593", "name": "Cameron Ruarra"},
        {"id": "10953155332786329205", "name": "Kevin Chhour"},
        {"id": "05284955739613235618", "name": "Kristen Wakamoto"},
        {"id": "07174610359497149637", "name": "Jeremy Anoc"},
        {"id": "12116683882993800751", "name": "Daniel Lobato"},
        {"id": "16436582708101468723", "name": "ZR Plascencia"},
        {"id": "00565968836529884056", "name": "Melvin Chien"},
        {"id": "07070953006231440687", "name": "Freddie Zenteno"},
        {"id": "09524451016988941693", "name": "Jola Bolaji"},
        {"id": "14436720037150063355", "name": "Kevin McNamara"},
        {"id": "16231506449038542227", "name": "Scott Cashin"},
        {"id": "09413502275486337909", "name": "Vince Pacubas"},
        {"id": "12602472045544818640", "name": "Steven Dunn"},
        {"id": "12735685359351828455", "name": "Justyne Catacutan"},
        {"id": "14289880204969321892", "name": "Zafar Mehboob"},
        {"id": "01078358405923817069", "name": "Rachel Rose Ulgado"},
        {"id": "03204735025190445044", "name": "Aaron Pecson"},
        {"id": "15218326554999396005", "name": "Stefan Adamov"},
        {"id": "17012917518020206611", "name": "Ryan Beach"},
        {"id": "06859355820164013432", "name": "Helen Zhu"},
        {"id": "14070659077316322037", "name": "Deleted Author"},
        {"id": "18188412320179593920", "name": "Mark Chege"},
        {"id": "07255281081717693554", "name": "pfuckoff grewgle"},
        {"id": "10329525794174828825", "name": "Chhai Eng"},
        {"id": "11916687224007865289", "name": "Juliano Yi"},
        {"id": "12802012653647101892", "name": "Patrick Chen"},
        {"id": "02196503282415559656", "name": "Shelby Yokote"},
        {"id": "08323260184647045851", "name": "Luke Fiji"},
        {"id": "10923188259270963416", "name": "Andrea Lau"},
        {"id": "12488977718389101954", "name": "Sohrob Raja"},
        {"id": "13781745195984197267", "name": "Kelvin Nguyen"},
        {"id": "10782725189745670577", "name": "Minhnhut Thanh Vo"},
        {"id": "07653984003100297471", "name": "Albert Luk"},
        {"id": "12488977718389101954", "name": "Sohrob Raja"},
        {"id": "13781745195984197267", "name": "Kelvin Nguyen"},
        {"id": "10782725189745670577", "name": "Minhnhut Thanh Vo"},
        {"id": "03449088183070087967", "name": "Ian McNicol"},
        {"id": "08653039508864734049", "name": "Victor Lee"},
        {"id": "10067694100010349885", "name": "Deleted Author"},
        {"id": "17351120041436223315", "name": "Christina Ryder"},
        {"id": "07295158539944406106", "name": "Evelina S."},
        {"id": "15724998811166077204", "name": "Sheena P"},
        {"id": "12932529145443351731", "name": "Horiya Ameen"},
        {"id": "14713994657396403410", "name": "Aileen Lee"},
        {"id": "01551801310162654806", "name": "Anne Cheung"},
        {"id": "10557779735059710126", "name": "Michael Kunisaki"},
        {"id": "10916997197699959584", "name": "Francesca Reyes"},
        {"id": "12747732434538864464", "name": "Kevin T Lee"},
        {"id": "01551801310162654806", "name": "Anne Cheung"},
        {"id": "10557779735059710126", "name": "Michael Kunisaki"},
        {"id": "10916997197699959584", "name": "Francesca Reyes"},
        {"id": "12747732434538864464", "name": "Kevin T Lee"},
        {"id": "04564340222433511678", "name": "Victor Lelas"},
        {"id": "05752411179684896192", "name": "Andrew Lam"},
        {"id": "09698818980685636676", "name": "Saloni Soni"},
        {"id": "04085127507448869586", "name": "Jessica Dear"},
        {"id": "06715881684157333872", "name": "Joe Yu"},
        {"id": "09427526489257456230", "name": "Janina P"},
        {"id": "12381832804161795257", "name": "Shibani Dhume"},
        {"id": "03005984783217762474", "name": "Darien Vidaure"},
        {"id": "03490112974665556707", "name": "jk chew"},
        {"id": "06711622638823516443", "name": "Jamie Lin"},
        {"id": "09783585395660654559", "name": "derickt"},
        {"id": "14219504650494918167", "name": "chewp2001"},
        {"id": "03630904776599645190", "name": "Cherrie Yu Cheng"},
        {"id": "10379718042308587531", "name": "Mona Man"},
        {"id": "15425198184083003278", "name": "Kathy Nguyen"},
        {"id": "16439262705570068141", "name": "danny lam"},
        {"id": "18092868799096983834", "name": "Deleted Author"},
        {"id": "03934110019831375601", "name": "Tuan Minh Vo"},
        {"id": "06791355010885329941", "name": "Brian Wance"},
        {"id": "14346346655391572877", "name": "Joseph Chang"},
        {"id": "12488977718389101954", "name": "Sohrob Raja"},
        {"id": "13781745195984197267", "name": "Kelvin Nguyen"},
        {"id": "10782725189745670577", "name": "Minhnhut Thanh Vo"},
        {"id": "07653984003100297471", "name": "Albert Luk"},
        {"id": "04200104125416578109", "name": "Jay Tolentino"},
        {"id": "05043756468534135257", "name": "Johnson Ng"},
        {"id": "08310549892381945982", "name": "Jay Caparino"},
        {"id": "17419892481534260352", "name": "Kevin Nguyen"},
        {"id": "07295158539944406106", "name": "Evelina S."},
        {"id": "12932529145443351731", "name": "Horiya Ameen"},
        {"id": "14713994657396403410", "name": "Aileen Lee"},
        {"id": "15724998811166077204", "name": "Sheena P"},
        {"id": "04737980880607386853", "name": "Noxil Dynth"},
        {"id": "04873443049514238882", "name": "Antonio Montalvo"},
        {"id": "07752017619520478002", "name": "Deleted Author"},
        {"id": "08890528377444710982", "name": "mgk daps"},
        {"id": "17848155065217743592", "name": "Martin Shelton"},
        {"id": "01551801310162654806", "name": "Anne Cheung"},
        {"id": "10557779735059710126", "name": "Michael Kunisaki"},
        {"id": "10916997197699959584", "name": "Francesca Reyes"},
        {"id": "12747732434538864464", "name": "Kevin T Lee"},
        {"id": "04564340222433511678", "name": "Victor Lelas"},
        {"id": "05752411179684896192", "name": "Andrew Lam"},
        {"id": "09698818980685636676", "name": "Saloni Soni"},
        {"id": "04085127507448869586", "name": "Jessica Dear"},
        {"id": "06715881684157333872", "name": "Joe Yu"},
        {"id": "09427526489257456230", "name": "Janina P"},
        {"id": "12381832804161795257", "name": "Shibani Dhume"},
        {"id": "03005984783217762474", "name": "Darien Vidaure"},
        {"id": "03490112974665556707", "name": "jk chew"},
        {"id": "06711622638823516443", "name": "Jamie Lin"},
        {"id": "09783585395660654559", "name": "derickt"},
        {"id": "03014941252322488357", "name": "Van E. Custodio"},
        {"id": "03934110019831375601", "name": "Tuan Minh Vo"},
        {"id": "06791355010885329941", "name": "Brian Wance"},
        {"id": "03014941252322488357", "name": "Van E. Custodio"},
        {"id": "17848155065217743592", "name": "Martin Shelton"},
        {"id": "06791355010885329941", "name": "Brian Wance"},
        {"id": "14346346655391572877", "name": "Joseph Chang"},
        {"id": "03630904776599645190", "name": "Cherrie Yu Cheng"},
        {"id": "10379718042308587531", "name": "Mona Man"},
        {"id": "15425198184083003278", "name": "Kathy Nguyen"},
        {"id": "16439262705570068141", "name": "danny lam"},
        {"id": "17848155065217743592", "name": "Martin Shelton"},
        {"id": "18092868799096983834", "name": "Deleted Author"},
        {"id": "07653984003100297471", "name": "Albert Luk"},
        {"id": "10782725189745670577", "name": "Minhnhut Thanh Vo"},
        {"id": "12488977718389101954", "name": "Sohrob Raja"},
        {"id": "13781745195984197267", "name": "Kelvin Nguyen"},
        {"id": "04200104125416578109", "name": "Jay Tolentino"},
        {"id": "05043756468534135257", "name": "Johnson Ng"},
        {"id": "08310549892381945982", "name": "Jay Caparino"},
        {"id": "17419892481534260352", "name": "Kevin Nguyen"},
        {"id": "03449088183070087967", "name": "Ian McNicol"},
        {"id": "10067694100010349885", "name": "Deleted Author"},
        {"id": "17351120041436223315", "name": "Christina Ryder"},
        {"id": "07295158539944406106", "name": "Evelina S."},
        {"id": "12932529145443351731", "name": "Horiya Ameen"},
        {"id": "14713994657396403410", "name": "Aileen Lee"},
        {"id": "15724998811166077204", "name": "Sheena P"},
        {"id": "01551801310162654806", "name": "Anne Cheung"},
        {"id": "10557779735059710126", "name": "Michael Kunisaki"},
        {"id": "10916997197699959584", "name": "Francesca Reyes"},
        {"id": "12747732434538864464", "name": "Kevin T Lee"},
        {"id": "09698818980685636676", "name": "Saloni Soni"},
        {"id": "01802491293479160924", "name": "Steven Mail"},
        {"id": "04085127507448869586", "name": "Jessica Dear"},
        {"id": "06715881684157333872", "name": "Joe Yu"},
        {"id": "12381832804161795257", "name": "Shibani Dhume"},
        {"id": "02196503282415559656", "name": "Shelby Yokote"},
        {"id": "08323260184647045851", "name": "Luke Fiji"},
        {"id": "10923188259270963416", "name": "Andrea Lau"},
        {"id": "11676266978705056872", "name": "Andrew Albright"},
        {"id": "03005984783217762474", "name": "Darien Vidaure"},
        {"id": "03490112974665556707", "name": "jk chew"},
        {"id": "06711622638823516443", "name": "Jamie Lin"},
        {"id": "09783585395660654559", "name": "derickt"},
        {"id": "03361004049168135740", "name": "Deleted Author"},
        {"id": "03909489588822141870", "name": "Kevin Juneja"},
        {"id": "09142497438119729002", "name": "Manuel Yang"},
        {"id": "10118568332354346325", "name": "Jason William Parsons"},
        {"id": "03014941252322488357", "name": "Van E. Custodio"},
        {"id": "03934110019831375601", "name": "Tuan Minh Vo"},
        {"id": "06791355010885329941", "name": "Brian Wance"},
        {"id": "14346346655391572877", "name": "Joseph Chang"},
        {"id": "12488977718389101954", "name": "Sohrob Raja"},
        {"id": "04200104125416578109", "name": "Jay Tolentino"},
        {"id": "05043756468534135257", "name": "Johnson Ng"},
        {"id": "08310549892381945982", "name": "Jay Caparino"},
        {"id": "11109228934568628929", "name": "Dakuo Wang"},
        {"id": "17419892481534260352", "name": "Kevin Nguyen"},
        {"id": "03449088183070087967", "name": "Ian McNicol"},
        {"id": "08653039508864734049", "name": "Victor Lee"},
        {"id": "10067694100010349885", "name": "Deleted Author"},
        {"id": "17351120041436223315", "name": "Christina Ryder"},
        {"id": "07295158539944406106", "name": "Evelina S."},
        {"id": "12932529145443351731", "name": "Horiya Ameen"},
        {"id": "14713994657396403410", "name": "Aileen Lee"},
        {"id": "15724998811166077204", "name": "Sheena P"},
        {"id": "04737980880607386853", "name": "Noxil Dynth"},
        {"id": "04873443049514238882", "name": "Antonio Montalvo"},
        {"id": "07752017619520478002", "name": "Deleted Author"},
        {"id": "08890528377444710982", "name": "mgk daps"},
        {"id": "01551801310162654806", "name": "Anne Cheung"},
        {"id": "10557779735059710126", "name": "Michael Kunisaki"},
        {"id": "10916997197699959584", "name": "Francesca Reyes"},
        {"id": "12747732434538864464", "name": "Kevin T Lee"},
        {"id": "03005984783217762474", "name": "Darien Vidaure"},
        {"id": "03490112974665556707", "name": "jk chew"},
        {"id": "06711622638823516443", "name": "Jamie Lin"},
        {"id": "09783585395660654559", "name": "derickt"},
        {"id": "04564340222433511678", "name": "Victor Lelas"},
        {"id": "05752411179684896192", "name": "Andrew Lam"},
        {"id": "09698818980685636676", "name": "Saloni Soni"},
        {"id": "03014941252322488357", "name": "Van E. Custodio"},
        {"id": "03934110019831375601", "name": "Tuan Minh Vo"},
        {"id": "06791355010885329941", "name": "Brian Wance"},
        {"id": "14346346655391572877", "name": "Joseph Chang"}
    ];

    var a = _.find(pair, function(eachpair)
        {
            if (authorobj.id === eachpair.id)
            {
                authorobj.name = eachpair.name;
            }
        });
    if(typeof a === undefined)
    {
        console.log("match name error");
    }
    return authorobj;
}

function check_new_author_assign_color(list, id_str, color_fill)
{
    var flag=1;
    var tempcount=list.length;

    if (tempcount === 0)
    {
        list.push(
        {
            id:id_str,
            name: "",
            color:color_fill(tempcount),
            only_as: 1,
            x:20*tempcount,
            y:50*tempcount^3+Math.floor(Math.sqrt(1000*tempcount)),
            // total_edit: 0,
            other_edit: 0,
            self_edit: 0
        });
    }
    else
    {
        for (var k=0; k<tempcount; k++)
        {
            if (id_str === list[k].id)
            {
                flag=0;
            }
        }
        if (flag === 1)
        {
            list.push(
            {
                id:id_str,
                name: "",
                color: color_fill(tempcount),
                only_as: 1,
                x: 20*tempcount,
                y: 50*tempcount^3+Math.floor(Math.sqrt(1000*tempcount)),
                // total_edit: 0,
                other_edit: 0,
                self_edit: 0
            });
        }
    }

    return list;
}

function addlink(targetauthor, sourceauthor, revisedlength, relation)
{
	var temp = _.find(relation, function(eachrelation)
		{
			return (eachrelation.source === sourceauthor && eachrelation.target === targetauthor);
		});
	if(typeof temp === "undefined")
	{
		relation.push(
			{
				source: sourceauthor,
				target: targetauthor,
				count: revisedlength
			});
	}
	else
	{
		_.find(relation, function(eachrelation)
			{
				if (eachrelation.source === sourceauthor && eachrelation.target === targetauthor)
					eachrelation.count += revisedlength;
			});
	}
    return relation;
}

function constructSegment(authorId, segStr, segID, parentSegID, offset, startIndex, endIndex, type, permanentFlag) {
	return {
		sindex: startIndex,
		eindex: endIndex,
		segStr: segStr,
		permanentFlag: permanentFlag,
		segID: segID,
		parentSegID: parentSegID,
		offset: offset,
		authorId: authorId,
		type: type
	};
}

function adjustStatisticData(authorId, type, length, list)
{
    var foundIndex = _.findIndex(list, function(eachAuthor, index){
            return (eachAuthor.id === authorId)
        });
    // console.log("This time the foundindex is:"+foundIndex);
    if(foundIndex != -1)
    {
        if (type === "self")
        {
            // console.log("self editing, before:"+ list[foundIndex].self_edit);
            // console.log("length:"+length);
            list[foundIndex].self_edit += length;
            // console.log("after:" + list[foundIndex].self_edit);
        }
        else if (type === "other")
        {
            // console.log(list[foundIndex]);
            // console.log("length:"+length);
            list[foundIndex].other_edit += length;
            // console.log("after:" + list[foundIndex].other_edit);
        }
        else
            console.log("this writing type not defined");
    }
    else
    {
        console.log("Error111");
    }
    return list;
}

function analyzeEachEditInChangelog(entry, authorId, currentSegID,segArray ,list, relation) 
{
	var type = entry.ty,
	insertStartIndex = null,
	deleteStartIndex = null,
	deleteEndIndex = null;

	if (type === 'mlti') {
		_.each(entry.mts, function(ent) {
			segArray = analyzeEachEditInChangelog(ent, authorId, currentSegID, segArray, list, relation);
		});
	} else if (type === 'rplc') {
        // console.log("this is rplc");
		_.each(entry.snapshot, function(ent) {
			segArray = analyzeEachEditInChangelog(ent, authorId, currentSegID, segArray, list, relation);
		});
	} else if (type === 'rvrt') {
        // console.log("this is rvrt");
		segArray = [];
		_.each(entry.snapshot, function(ent) {
			segArray = analyzeEachEditInChangelog(ent, authorId, currentSegID, segArray, list, relation);
		});
	} else if (type === 'is' || type === 'iss') {
		insertStartIndex = entry.ibi - 1;
        _.find(list, function(each)
            {
                if ((each.id === authorId)&&(each.only_as === 1))
                    each.only_as = 0;
            });
		segArray = buildSegmentsWhenInsert(entry.s, insertStartIndex, authorId, segArray ,currentSegID, list, relation);
	} else if (type === 'ds' || type === 'dss') {
		deleteStartIndex = entry.si - 1;
		deleteEndIndex = entry.ei - 1;
        _.find(list, function(each)
            {
                if ((each.id === authorId)&&(each.only_as === 1))
                    each.only_as = 0;
            });
		segArray = buildSegmentsWhenDelete(deleteStartIndex, deleteEndIndex, authorId, segArray, currentSegID, list ,relation);
	}
	else {
        	// all other types such as AS (formatting)
            // delete the author!!!
        }
        return segArray;
}

function buildSegmentsWhenInsert(entryStr, startIndex, authorId, segArray, currentSegID, list ,relation) 
{
	var effectedSegment = null;
	var segmentLocation = null;

	if(segArray != null)
    { // it shouldn't be, it could be empty, but not null
        // console.log(segArray);
		effectedSegment = _.find(segArray, function(eachSegment, index) 
		{
	        	if (eachSegment.sindex < startIndex && startIndex <= eachSegment.eindex) {
	        		segmentLocation = index;
	        		return eachSegment;
	        	}
	        	else if (startIndex === eachSegment.sindex) {
	        		segmentLocation = index;
	        		return eachSegment;                    
	        	}
	        	else if (startIndex === (eachSegment.eindex + 1) ){
	        		if (index === (segArray.length - 1) ){
	        			segmentLocation = index;
	        			return eachSegment;
	        		}
	        		else {
	        		}
	        	}
	        	else {
	            	// do nothing, keep looking
	            }    
		});
	}
    // console.log(effectedSegment);

		// meaning, the segArray is empty
		if (effectedSegment === undefined) 
		{
			currentSegID += 1;
			if (segArray.length === 0) 
			{
            	if (entryStr.length === 0)
            	{ 
                    return segArray;
            	// When an author inserts nothing right at the begining, 
            	// just leave it
            	}
            	else
            	{
            		var currentSeg =  constructSegment(authorId, entryStr, currentSegID,  currentSegID, 0, startIndex, (startIndex + entryStr.length - 1), "new segment because of no previous segment", false);
                    // console.log(currentSeg);    
            	}
            	segArray.insert(currentSeg,segArray.length);
                adjustStatisticData(authorId, "self", entryStr.length,list);
            }
            // has something in the array but couldn't find the effected, because the comment insert at the end+1
            else
            {
            	var currentSeg =  constructSegment(authorId, entryStr, currentSegID,  currentSegID, 0,(segArray[(segArray.length-1)].eindex+1), ((segArray[(segArray.length-1)].eindex+1) + entryStr.length - 1), "new segment at the end because of couldn't find previous segment", false);                	
            	// console.log(currentSeg); 
                segArray.insert(currentSeg,segArray.length);
                adjustStatisticData(authorId, "self", entryStr.length, list);
            }
        } 

        else 
        {
        	if(effectedSegment.sindex === startIndex)
        	{
        		if (startIndex === 0){
        			if (effectedSegment.permanentFlag === true){
        				 currentSegID += 1;
        				var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0, startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, permanentflag = true, when effectedSegment.sindex === startIndex and startIndex === 0", false);
        				// console.log(currentSeg);
                        segArray.insert(currentSeg, segmentLocation );

        				for (var i = (segmentLocation + 1); i < segArray.length; i++) {
        					segArray[i].sindex += entryStr.length;
        					segArray[i].eindex += entryStr.length;
        				}

                        //self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                        }
                        else if (effectedSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                    }
                    else {
                    	if (effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID) {

                    		effectedSegment.segStr = entryStr + effectedSegment.segStr;
                    		effectedSegment.eindex += entryStr.length;
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else {
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, permanentflag = false,  authorId != , when effectedSegment.sindex === startIndex and startIndex === 0", false);
                        	// console.log(currentSeg);
                            segArray.insert(currentSeg, segmentLocation );

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                                adjustStatisticData(authorId, "other", entryStr.length, list);
                            }
                            else if (effectedSegment.authorId === authorId)
                            {
                                adjustStatisticData(authorId, "self", entryStr.length, list);
                            }
                        }
                        for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                        	segArray[i].sindex += entryStr.length;
                        	segArray[i].eindex += entryStr.length;
                        }
                    }
                }
                else if ( ((effectedSegment.eindex+1) ===  startIndex )&& (segmentLocation === (segArray.length-1 ))){
                	if (effectedSegment.permanentFlag === true){
                		 currentSegID += 1;
                		var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, permanentflag = true, when ((effectedSegment.eindex+1) ===  startIndex )&& (segmentLocation === (segArray.length-1 ))", false);
                		// console.log(currentSeg);
                        segArray.insert(currentSeg, (segmentLocation+1) );

                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                        }
                        else if (effectedSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                    }
                    else {
                    	if(effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr += entryStr;
                    		effectedSegment.eindex += entryStr.length;
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, differentAuthor, permanentflag=false, when ((effectedSegment.eindex+1) ===  startIndex )&& (segmentLocation === (segArray.length-1 ))", false);
                        	// console.log(currentSeg);
                            segArray.insert(currentSeg, (segmentLocation+1) );

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                                adjustStatisticData(authorId, "other", entryStr.length, list);
                            }
                            else if (effectedSegment.authorId === authorId)
                            {
                                adjustStatisticData(authorId, "self", entryStr.length, list);
                            }
                        }
                    }
                }
        		// start Index =  effected . startIndex, effectedSegment in the middle
        		else{
        			if(effectedSegment.permanentFlag === true && segArray[segmentLocation-1].permanentFlag === true){
        				 currentSegID += 1;
        				var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment insert between two permanentflag== true", false);
        				// console.log(currentSeg);
                        segArray.insert(currentSeg, segmentLocation );
        				for (var i = (segmentLocation + 1); i < segArray.length; i++) {
        					segArray[i].sindex += entryStr.length;
        					segArray[i].eindex += entryStr.length;
        				}
                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                        }
                        else if (effectedSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                    }
                    else if (effectedSegment.permanentFlag === true && segArray[segmentLocation-1].permanentFlag === false){
                    	if (segArray[segmentLocation-1].authorId === authorId && segArray[segmentLocation-1].parentSegID === segArray[segmentLocation-1].segID){
                    		segArray[segmentLocation-1].segStr += entryStr;
                    		segArray[segmentLocation-1].eindex += entryStr.length;
                    		for (var i = segmentLocation; i < segArray.length; i++) {
                    			segArray[i].sindex += entryStr.length;
                    			segArray[i].eindex += entryStr.length;
                    		}
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment after a temporary segment with differentAuthor, before a permanent segment", false);
                        	// console.log(currentSeg);
                            segArray.insert(currentSeg, segmentLocation );
                        	for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                        		segArray[i].sindex += entryStr.length;
                        		segArray[i].eindex += entryStr.length;
                        	}

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                                adjustStatisticData(authorId, "other", entryStr.length, list);
                            }
                            else if (effectedSegment.authorId === authorId)
                            {
                                adjustStatisticData(authorId, "self", entryStr.length,list);
                            }
                        }
                    }
                    else if (effectedSegment.permanentFlag === false && segArray[segmentLocation-1].permanentFlag === true){
                    	if (effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr = entryStr + effectedSegment.segStr;
                    		effectedSegment.eindex += entryStr.length;
                    		for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                    			segArray[i].sindex += entryStr.length;
                    			segArray[i].eindex += entryStr.length;
                    		}
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment, after a permanent, before a temporary but differentAuthor", false);
                        	// console.log(currentSeg);
                            segArray.insert(currentSeg, segmentLocation );
                        	for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                        		segArray[i].sindex += entryStr.length;
                        		segArray[i].eindex += entryStr.length;
                        	}

                            //self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                                adjustStatisticData(authorId, "other", entryStr.length, list);
                            }
                            else if (effectedSegment.authorId === authorId)
                            {
                                adjustStatisticData(authorId, "self", entryStr.length, list);
                            }
                        }
                    }
                    else{
                    	if (effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr = entryStr + effectedSegment.segStr;
                    		effectedSegment.eindex += entryStr.length;
                    		for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                    			segArray[i].sindex += entryStr.length;
                    			segArray[i].eindex += entryStr.length;
                    		}
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else if (segArray[segmentLocation-1].authorId === authorId && segArray[segmentLocation-1].parentSegID === segArray[segmentLocation-1].segID) {
                        	segArray[segmentLocation-1].segStr += entryStr;
                        	segArray[segmentLocation-1].eindex += entryStr.length;
                        	for (var i = segmentLocation; i < segArray.length; i++) {
                        		segArray[i].sindex += entryStr.length;
                        		segArray[i].eindex += entryStr.length;
                        	}
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment, between two temporary but differentAuthor", false);
                        	// console.log(currentSeg);
                            segArray.insert(currentSeg, segmentLocation );
                        	for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                        		segArray[i].sindex += entryStr.length;
                        		segArray[i].eindex += entryStr.length;
                        	}

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                                adjustStatisticData(authorId, "other", entryStr.length, list);
                            }
                            else if (effectedSegment.authorId === authorId)
                            {
                                adjustStatisticData(authorId, "self", entryStr.length, list);
                            }
                        }
                    }
                }
            }

            else if (startIndex === (effectedSegment.eindex + 1)){
            	if (segmentLocation ===  (segArray.length-1)){
            		if (effectedSegment.permanentFlag === true){
            			 currentSegID += 1;
            			var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, not the same author when segmentLocation ===  (segArray.length-1)", false);
            			// console.log(currentSeg);
                        segArray.insert(currentSeg, (segmentLocation+1) );

                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                        }
                        else if (effectedSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                    }
                    else{
                    	if (effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr += entryStr;
                    		effectedSegment.eindex += entryStr.length;
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, not the same author when segmentLocation ===  (segArray.length-1)", false);
                        	// console.log(currentSeg);
                            segArray.insert(currentSeg, (segmentLocation+1) );

	            			// self edit v.s. other edit
	            			if (effectedSegment.authorId != authorId) {
	            				addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                                adjustStatisticData(authorId, "other", entryStr.length, list);
	            			}
                            else if (effectedSegment.authorId === authorId)
                            {
                                adjustStatisticData(authorId, "self", entryStr.length, list);
                            }
	            		}
	            	}
	            }	
	            else{
	            	if (effectedSegment.permanentFlag === true && segArray[segmentLocation+1].permanentFlag === true){
	            		 currentSegID += 1;
	            		var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, between two permanentFlag === true", false);
	            		// console.log(currentSeg);
                        segArray.insert(currentSeg, (segmentLocation+1) );

	            		for (var i = (segmentLocation + 2); i < segArray.length; i++) {
	            			segArray[i].sindex += entryStr.length;
	            			segArray[i].eindex += entryStr.length;
	            		}

                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                        }
                        else if (effectedSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                    }
                    else if (effectedSegment.permanentFlag === true && segArray[segmentLocation+1].permanentFlag === false){
                    	if( segArray[segmentLocation+1].authorId === authorId && segArray[segmentLocation+1].parentSegID === segArray[segmentLocation+1].segID){
                    		segArray[segmentLocation+1].segStr = entryStr + segArray[segmentLocation+1].segStr;
                    		segArray[segmentLocation+1].eindex += entryStr.length;
                    		for (var i = (segmentLocation + 2); i < segArray.length; i++) {
                    			segArray[i].sindex += entryStr.length;
                    			segArray[i].eindex += entryStr.length;
                    		}
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, between two permanentFlag === true", false);
                        	// console.log(currentSeg);
                            segArray.insert(currentSeg, (segmentLocation+1) );

                        	for (var i = (segmentLocation + 2); i < segArray.length; i++) {
                        		segArray[i].sindex += entryStr.length;
                        		segArray[i].eindex += entryStr.length;
                        	}
                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                                adjustStatisticData(authorId, "other", entryStr.length, list);
                            }
                            else if (effectedSegment.authorId === authorId)
                            {
                                adjustStatisticData(authorId, "self", entryStr.length, list);
                            }
                        }
                    }
                    else if (effectedSegment.permanentFlag === false && segArray[segmentLocation+1].permanentFlag === true) {
                    	if( effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr += entryStr;
                    		effectedSegment.eindex += entryStr.length;

                    		for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                    			segArray[i].sindex += entryStr.length;
                    			segArray[i].eindex += entryStr.length;
                    		}
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, between two permanentFlag === true", false);
                        	// console.log(currentSeg);
                            segArray.insert(currentSeg, (segmentLocation+1) );

                        	for (var i = (segmentLocation + 2); i < segArray.length; i++) {
                        		segArray[i].sindex += entryStr.length;
                        		segArray[i].eindex += entryStr.length;
                        	}

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length,relation);
                                adjustStatisticData(authorId, "other", entryStr.length, list);
                            }
                            else if (effectedSegment.authorId === authorId)
                            {
                                adjustStatisticData(authorId, "self", entryStr.length, list);
                            }
                        }
                    }
                    else {
                    	if(effectedSegment.authorId ===authorId && segArray[segmentLocation+1].authorId != authorId && effectedSegment.parentSegID === effectedSegment.segID){

                    		effectedSegment.segStr += entryStr;
                    		effectedSegment.eindex += entryStr.length;

                    		for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                    			segArray[i].sindex += entryStr.length;
                    			segArray[i].eindex += entryStr.length;
                    		}
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                        else if (effectedSegment.authorId != authorId && segArray[segmentLocation+1].authorId === authorId && segArray[segmentLocation+1].parentSegID === segArray[segmentLocation+1].segID) {
                        	segArray[(segmentLocation+1)].segStr = entryStr + segArray[segmentLocation+1].segStr;
                        	segArray[(segmentLocation+1)].eindex += entryStr.length;
                        	for (var i = (segmentLocation + 2); i < segArray.length; i++) {
                        		segArray[i].sindex += entryStr.length;
                        		segArray[i].eindex += entryStr.length;
                        	}
                        	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                        }
                        else if (effectedSegment.authorId != authorId && segArray[segmentLocation+1].authorId != authorId) {
            				// create the new segment and update
            				 currentSegID += 1;
            				var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, startIndex + entryStr.length - 1, "new segment between two temporary but differentAuthor segments", false);
            				// console.log(currentSeg);
                            segArray.insert(currentSeg, (segmentLocation+1) );
            				for (var i = (segmentLocation + 2); i < segArray.length; i++) {
            					segArray[i].sindex += entryStr.length;
            					segArray[i].eindex += entryStr.length;
            				}
            				addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                        }
                        else {
                        	effectedSegment.segStr += entryStr;
                        	effectedSegment.eindex += entryStr.length;

                        	for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                        		segArray[i].sindex += entryStr.length;
                        		segArray[i].eindex += entryStr.length;
                        	}
                            //self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                                adjustStatisticData(authorId, "other", entryStr.length, list);
                            }
                            else if (effectedSegment.authorId === authorId)
                            {
                                adjustStatisticData(authorId, "self", entryStr.length, list);
                            }
                        }
                    }
                }

            }
            else if (effectedSegment.sindex < startIndex && startIndex <= effectedSegment.eindex) 
            {
            	if (effectedSegment.permanentFlag === true) 
            	{
            		if (effectedSegment.sindex === effectedSegment.eindex) 
            		{
            			 currentSegID += 1;
            			var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new insert segment in the middle of the found permanent effected segment", false);
            			// console.log(currentSeg);
                        segArray.insert(currentSeg, (segmentLocation) );
            			for (var i = (segmentLocation + 1); i < segArray.length; i++) {
            				segArray[i].sindex += entryStr.length;
            				segArray[i].eindex += entryStr.length;
            			}
                        //self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                        }
                        else if (effectedSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                    }

                    else 
                    {
                    	var strBeforeStartIndex = effectedSegment.segStr.substring(0, startIndex - effectedSegment.sindex);
                    	var strAfterStartIndex = effectedSegment.segStr.substring(startIndex - effectedSegment.sindex);

                    	 currentSegID += 1;
                    	var segBefore =  constructSegment(effectedSegment.authorId, strBeforeStartIndex,  currentSegID, effectedSegment.segID, 0,    effectedSegment.sindex, (startIndex - 1), "from buildSegmentsWhenInsert Before when permanentFlag = true", false);
                    	// console.log(segBefore);
                        segArray.insert(segBefore, segmentLocation);

                    	 currentSegID += 1;
                    	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new insert segment in the middle of the found permanent effected segment", false);
                    	// console.log(currentSeg);
                        segArray.insert(currentSeg, (segmentLocation + 1) );

                    	 currentSegID += 1;
                    	var offset = startIndex - effectedSegment.sindex;
                    	var segAfter =  constructSegment(effectedSegment.authorId, strAfterStartIndex,  currentSegID, effectedSegment.segID, offset,    (startIndex + entryStr.length ), (effectedSegment.eindex + entryStr.length), "from buildSegmentsWhenInsert After when permanentFlag = true", false);
                        // console.log(segAfter);
                    	segArray.insert(segAfter, (segmentLocation + 2) );

                    	segArray.delete( (segmentLocation + 3 ), (segmentLocation + 3 ));

                    	for (var i = (segmentLocation + 3); i < segArray.length; i++) {
                    		segArray[i].sindex += entryStr.length;
                    		segArray[i].eindex += entryStr.length;
                    	}

                		//self edit v.s. other edit
                		if (effectedSegment.authorId != authorId) {
                			addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                		}
                        else if (effectedSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                	}
                }
                else{
                	if(effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                		if (effectedSegment.sindex === effectedSegment.eindex){
                			effectedSegment.segStr = entryStr + effectedSegment.segStr;
                			effectedSegment.eindex += entryStr.length;
                			for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                				segArray[i].sindex += entryStr.length;
                				segArray[i].eindex += entryStr.length;
                			}
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }

                        else{
                        	var strBeforeStartIndex = effectedSegment.segStr.substring(0, startIndex - effectedSegment.sindex);
                        	var strAfterStartIndex = effectedSegment.segStr.substring(startIndex - effectedSegment.sindex);

                        	effectedSegment.segStr = strBeforeStartIndex + entryStr + strAfterStartIndex;
                        	effectedSegment.eindex += entryStr.length;

                        	for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                        		segArray[i].sindex += entryStr.length;
                        		segArray[i].eindex += entryStr.length;
                        	}
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                    }
                    else{
                    	if (effectedSegment.sindex === effectedSegment.eindex){
                    		 currentSegID += 1;
                    		var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new insert segment in the middle of a one-charactor, temporary, differentAuthor effected segment", false);
                    		// console.log(currentSeg);
                            segArray.insert(currentSeg, (segmentLocation) );

                    		for (var i = (segmentLocation + 1); i < segArray.length; i++) {
                    			segArray[i].sindex += entryStr.length;
                    			segArray[i].eindex += entryStr.length;
                    		}
                    	}
                    	else {
                    		var strBeforeStartIndex = effectedSegment.segStr.substring(0, (startIndex - effectedSegment.sindex));
                    		var strAfterStartIndex = effectedSegment.segStr.substring(startIndex - effectedSegment.sindex);

                    		 currentSegID += 1;
                    		var segBefore =  constructSegment(effectedSegment.authorId, strBeforeStartIndex,  currentSegID, effectedSegment.parentSegID, effectedSegment.offset,    effectedSegment.sindex, (startIndex - 1), "from buildSegmentsWhenInsert Before when permanentFlag = false, differentAuthor", false);
                    		// console.log(segBefore);
                            segArray.insert(segBefore, segmentLocation);

                    		 currentSegID += 1;
                    		var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex , (startIndex + entryStr.length - 1), "new insert segment in the middle of the found temporary, differentAuthor effected segment", false);
                    		// console.log(currentSeg);
                            segArray.insert(currentSeg, (segmentLocation + 1) );

                    		 currentSegID += 1;
                    		var offset = startIndex - effectedSegment.sindex;
                    		var segAfter =  constructSegment(effectedSegment.authorId, strAfterStartIndex,  currentSegID, effectedSegment.parentSegID, offset + effectedSegment.offset,    (startIndex + entryStr.length ), (effectedSegment.eindex + entryStr.length), "from buildSegmentsWhenInsert After when permanentFlag = false, differentAuthor", false);
                    		// console.log(segAfter);
                            segArray.insert(segAfter, (segmentLocation + 2) );

                    		segArray.delete( (segmentLocation+3), (segmentLocation+3) );

                    		for (var i = (segmentLocation + 3); i < segArray.length; i++) {
                    			segArray[i].sindex += entryStr.length;
                    			segArray[i].eindex += entryStr.length;
                    		}
                    	}
                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length, relation);
                            adjustStatisticData(authorId, "other", entryStr.length, list);
                        }
                        else if (effectedSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", entryStr.length, list);
                        }
                    }
                }
            }
            else{
        		// shouldn't happen
        	}
        }
        // console.log(segArray);
        return segArray;
    }

function buildSegmentsWhenDelete(deleteStartIndex, deleteEndIndex, authorId, segArray,currentSegID ,list ,relation) 
{
    // var deleteSegmentLocation = null;
    var effectedSegmentOfDelete = null;

        // delete start === delete end, only deleting 1 character
    if (deleteStartIndex === deleteEndIndex) 
    {
       var deleteIndex = deleteStartIndex;

       if(segArray != null)
       {
          effectedSegmentOfDelete = _.find(segArray, function(eachSegment, index) 
          {
            if (eachSegment.sindex === deleteIndex ) 
            {
                    	// self edit v.s. other edit
                    	if (eachSegment.authorId != authorId) {
                    		addlink(eachSegment.authorId, authorId,1,relation);
                            adjustStatisticData(authorId, "other", 1, list);
                    	}
                        else if (eachSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", 1, list);
                        }

                    	if (eachSegment.sindex === eachSegment.eindex) {
                    		
                    		// delete the whole segment
                    		segArray.delete(index, index);

                    		// updates all the following segments's start and end index
                    		for (var i = index; i <= (segArray.length-1); i++){
                    			segArray[i].sindex -= 1;
                    			segArray[i].eindex -= 1;
                    		}

                    		// deleteSegmentLocation = index;
                    		return eachSegment;
                    	}
                    	else {

                    		var strAfterDelete = eachSegment.segStr.substring(1); // = substring(1)

                    		if (eachSegment.permanentFlag === true) {

	                    		// create a new segment with offset
                                currentSegID += 1;
                                var segAfter  =  constructSegment(eachSegment.authorId, strAfterDelete,  currentSegID, eachSegment.segID, 1,    eachSegment.sindex, (eachSegment.eindex - 1), " segAfter when eleteStartIndex === deleteEndIndex, permanentflag = true", false);
                                segArray.insert(segAfter, index);

	                    		// delete the whole segment
	                    		segArray.delete((index + 1), (index + 1));

	                    		// updates all the following segments's start and end index
	                    		for (var i = (index+1); i <= (segArray.length-1); i++){
	                    			segArray[i].sindex -= 1;
	                    			segArray[i].eindex -= 1;
	                    		}
	                    		return eachSegment;
	                    	}
	                    	else {
                    			// segArray[index].segStr = strAfterDelete;
                    			// segArray[index].eindex -= 1;

                                // create a new segment with offset
                                currentSegID += 1;
                                var segAfter  =  constructSegment(eachSegment.authorId, strAfterDelete,  currentSegID, eachSegment.parentSegID, 1+eachSegment.offset,    eachSegment.sindex, (eachSegment.eindex - 1), " segAfter when eleteStartIndex === deleteEndIndex, permanentflag = true", false);
                                segArray.insert(segAfter, index);

                                // delete the whole segment
                                segArray.delete((index + 1), (index + 1));

                                // updates all the following segments's start and end index
                                for (var i = (index+1); i <= (segArray.length-1); i++){
                                	segArray[i].sindex -= 1;
                                	segArray[i].eindex -= 1;
                                }
                                return eachSegment;
                            }
                        }
                    }
                    else if (eachSegment.eindex === deleteIndex )
                    {
                    	// self edit v.s. other edit
                    	if (eachSegment.authorId != authorId) {
                    		addlink(eachSegment.authorId, authorId,1, relation);
                            adjustStatisticData(authorId, "other", 1, list);
                    	}
                        else if (eachSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", 1, list);
                        }
                    	
                    	if (eachSegment.sindex === eachSegment.eindex) 
                        {
                    		// updates all the following segments's start and end index
                    		for (var i = index; i <= (segArray.length-1); i++){
                    			segArray[i].sindex -= 1;
                    			segArray[i].eindex -= 1;
                    		}

                    		// delete the whole segment
                    		segArray.delete( (index + 1 ), (index+1));
                    		return eachSegment;
                    	}
                    	else{
                    		var strBeforeDelete = eachSegment.segStr.substring(0, (deleteIndex - eachSegment.sindex)); // = substring(0,end-1)

                    		if (eachSegment.permanentFlag === true) {

	                    		// create a new segment with offset
                                currentSegID += 1;
                                var segBefore  =  constructSegment(eachSegment.authorId, strBeforeDelete,  currentSegID, eachSegment.segID, 0,    eachSegment.sindex, (eachSegment.eindex - 1), " segBefore when eleteStartIndex === deleteEndIndex, in eachSegment.sindex != eachSegment.eindex, permanentflag = true", false);
                                segArray.insert(segBefore, index);

	                    		// delete the whole segment
	                    		segArray.delete( (index + 1 ), (index+1));

	                    		// updates all the following segments's start and end index
	                    		for (var i = (index+1); i <= (segArray.length-1); i++){
	                    			segArray[i].sindex -= 1;
	                    			segArray[i].eindex -= 1;
	                    		}
	                    		return eachSegment;
	                    	}
	                    	else {
                                // create a new segment with offset
                                currentSegID += 1;
                                var segBefore  =  constructSegment(eachSegment.authorId, strBeforeDelete,  currentSegID, eachSegment.parentSegID, eachSegment.offset,    eachSegment.sindex, (eachSegment.eindex - 1), " segBefore when eleteStartIndex === deleteEndIndex, in eachSegment.sindex != eachSegment.eindex, permanentflag = true", false);
                                segArray.insert(segBefore, index);

                                // delete the whole segment
                                segArray.delete( (index + 1 ), (index+1));

                    			// updates all the following segments's start and end index
                    			for (var i = (index+1); i <= (segArray.length-1); i++){
                    				segArray[i].sindex -= 1;
                    				segArray[i].eindex -= 1;
                    			}
                    			return eachSegment;
                    		}
                    	}
                    }
                    else if (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex){
                    	// self edit v.s. other edit
                    	if (eachSegment.authorId != authorId) {
                    		addlink(eachSegment.authorId, authorId,1, relation);
                            adjustStatisticData(authorId, "other", 1, list);
                    	}
                        else if (eachSegment.authorId === authorId)
                        {
                            adjustStatisticData(authorId, "self", 1, list);
                        }

                		var strBeforeDelete = eachSegment.segStr.substring(0, (deleteIndex - eachSegment.sindex)); // = substring(0,end-1)
                		var strAfterDelete = eachSegment.segStr.substring(deleteIndex - eachSegment.sindex + 1); //

                		if (eachSegment.permanentFlag === true) {

                    		// create two new segments, one with offset 0, another with offeset 
                         currentSegID += 1;
                         var segBefore  =  constructSegment(eachSegment.authorId, strBeforeDelete,  currentSegID, eachSegment.segID, 0,    eachSegment.sindex, (deleteIndex - 1), "segBefore when eachSegment.sindex === eachSegment.eindex, in (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex), permanentflag = true", false);
                         segArray.insert(segBefore, index);

                    		// create a new segment with offset
                         currentSegID += 1;
                         var segAfter  =  constructSegment(eachSegment.authorId, strAfterDelete,  currentSegID, eachSegment.segID, (deleteIndex - eachSegment.sindex + 1 ),    deleteIndex, (eachSegment.eindex - 1), "segAffter when when eachSegment.sindex === eachSegment.eindex, in (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex), permanentflag = true", false);
                         segArray.insert(segAfter, (index+1) );

                    		// delete the whole segment
                    		segArray.delete( (index + 2 ), (index+2));

                    		// updates all the following segments
                    		for (var i = (index+2); i <= (segArray.length-1); i++){
                    			segArray[i].sindex -= 1;
                    			segArray[i].eindex -= 1;
                    		}
                    		return eachSegment;
                    	}
                    	else {
                            // create two new segments, one with offset 0, another with offeset 
                            currentSegID += 1;
                            var segBefore  =  constructSegment(eachSegment.authorId, strBeforeDelete,  currentSegID, eachSegment.parentSegID, eachSegment.offset,    eachSegment.sindex, (deleteIndex - 1), "segBefore when eachSegment.sindex === eachSegment.eindex, in (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex), permanentflag = true", false);
                            segArray.insert(segBefore, index);

                            // create a new segment with offset
                            currentSegID += 1;
                            var segAfter  =  constructSegment(eachSegment.authorId, strAfterDelete,  currentSegID, eachSegment.parentSegID, (deleteIndex - eachSegment.sindex + 1 + eachSegment.offset),    deleteIndex, (eachSegment.eindex - 1), "segAffter when when eachSegment.sindex === eachSegment.eindex, in (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex), permanentflag = true", false);
                            segArray.insert(segAfter, (index+1) );

                            // delete the whole segment
                            segArray.delete( (index + 2 ), (index+2));

                            // updates all the following segments
                            for (var i = (index+2); i <= (segArray.length-1); i++){
                            	segArray[i].sindex -= 1;
                            	segArray[i].eindex -= 1;
                            }
                            return eachSegment;
                        }
                    }
                    else {
                        // do nothing, keep looking
                    }
                });
}
else
{
    console.log("This should never happen, segArray is null,  buildSegmentsWhenDelete when deleteStartIndex === deleteEndIndex");
}
}
    else 
    { 
    // when deleteStartIndex != deleteEndIndex

        	var deleteStartSegmentLocation = null;
        	var effectedSegmentOfDeleteStart = null;
        	var deleteEndSegmentLocation = null;
        	var effectedSegmentOfDeleteEnd = null;

        	if(segArray != null )
        	{
        		effectedSegmentOfDeleteStart = _.find(segArray, function(eachSegment, index) {
        			if (eachSegment.sindex <= deleteStartIndex && deleteStartIndex <= eachSegment.eindex) {
        				deleteStartSegmentLocation = index;
        				return eachSegment;
        			}
        			else {
        		        // do nothing, keep looking
        		    }
        		});

        		if (typeof effectedSegmentOfDeleteStart === "undefined"){
        			console.log(deleteStartIndex);
        			console.log(segArray);
        			console.log("error 1");
        		}

        		effectedSegmentOfDeleteEnd = _.find(segArray, function(eachSegment, index) {
        			if (eachSegment.sindex <= deleteEndIndex && deleteEndIndex <= eachSegment.eindex) {
        				deleteEndSegmentLocation = index;
        				return eachSegment;
        			}

        			else {
        		        // do nothing, keep looking
        		    }
        		});

        		if (typeof effectedSegmentOfDeleteEnd === "undefined" ){
        			console.log(deleteStartIndex);
        			console.log(deleteEndIndex);
        			console.log(segArray);
        			console.log("BUG 1, because of the footnote insert and delete");

        			deleteEndSegmentLocation = segArray.length-1;
        			effectedSegmentOfDeleteEnd = segArray[segArray.length-1];
        			deleteEndIndex = effectedSegmentOfDeleteEnd.eindex;
        		}

        		// delete within the same segment
        		if (deleteStartSegmentLocation === deleteEndSegmentLocation) {

                    // self edit v.s. other edit
                    if (effectedSegmentOfDeleteStart.authorId != authorId){
                    	addlink(effectedSegmentOfDeleteStart.authorId, authorId, deleteEndIndex - deleteStartIndex + 1,relation);
                        adjustStatisticData(authorId, "other", deleteEndIndex - deleteStartIndex + 1, list);    
                    }
                    else if (effectedSegmentOfDeleteStart.authorId === authorId)
                    {
                        adjustStatisticData(authorId, "self", deleteEndIndex - deleteStartIndex + 1, list);
                    }

                    if(deleteStartIndex > effectedSegmentOfDeleteStart.sindex && deleteEndIndex < effectedSegmentOfDeleteStart.eindex){
						var strBeforeDelete = effectedSegmentOfDeleteStart.segStr.substring(0, (deleteStartIndex - effectedSegmentOfDeleteStart.sindex)); // = substring(0,end-1)
						var strAfterDelete = effectedSegmentOfDeleteStart.segStr.substring(deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 ); 

						if (effectedSegmentOfDeleteStart.permanentFlag === true) {

				    		// create two new segments, one with offset 0, another with offeset 
				    		 currentSegID += 1;
				    		var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, 0,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete in the middle within a segment when permanentFlag is true", false);
				    		segArray.insert(segBefore, deleteStartSegmentLocation);

				    		// seg after
				    		 currentSegID += 1;
				    		var segAfter  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, (deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 ),    deleteStartIndex, (effectedSegmentOfDeleteStart.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete in the middle within a segment when permanentFlag is true", false);
				    		segArray.insert(segAfter, (deleteStartSegmentLocation+1) );

				    		// delete the old segment from current revision
				    		segArray.delete( (deleteStartSegmentLocation + 2), (deleteStartSegmentLocation+2));

				    		// updates all the following segments
				    		for (var i = (deleteStartSegmentLocation+2); i <= (segArray.length-1); i++){
				    			segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    			segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    		}
				    	}
				    	else {
                            // create two new segments, one with offset 0, another with offeset 
                             currentSegID += 1;
                            var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, effectedSegmentOfDeleteStart.offset,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete in the middle within a segment when permanentFlag is true", false);
                            segArray.insert(segBefore, deleteStartSegmentLocation);

                            // seg after
                             currentSegID += 1;
                            var segAfter  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, (deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 + effectedSegmentOfDeleteStart.offset),    deleteStartIndex, (effectedSegmentOfDeleteStart.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete in the middle within a segment when permanentFlag is true", false);
                            segArray.insert(segAfter, (deleteStartSegmentLocation+1) );

                            // delete the old segment from current revision
                            segArray.delete( (deleteStartSegmentLocation + 2), (deleteStartSegmentLocation+2));

                            // updates all the following segments
                            for (var i = (deleteStartSegmentLocation+2); i <= (segArray.length-1); i++){
                            	segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            	segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            }
                        }
                    }
                    else if (deleteStartIndex === effectedSegmentOfDeleteStart.sindex && deleteEndIndex < effectedSegmentOfDeleteStart.eindex){
                    	var strAfterDelete = effectedSegmentOfDeleteStart.segStr.substring(deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 ); 

                    	if (effectedSegmentOfDeleteStart.permanentFlag === true) {

				    		// create a new segment with offset
				    		 currentSegID += 1;

				    		var segAfter  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, (deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 ),    deleteStartIndex, (effectedSegmentOfDeleteStart.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from start to somewhere in the middle within a segment when permanentFlag is true", false);                               

				    		segArray.insert(segAfter, (deleteStartSegmentLocation) );

				    		// delete the whole segment
				    		segArray.delete( (deleteStartSegmentLocation + 1 ), (deleteStartSegmentLocation+1));

				    		// updates all the following segments
				    		for (var i = (deleteStartSegmentLocation+1); i <= (segArray.length-1); i++){
				    			segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    			segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    		}
				    	}
				    	else {
                            // create a new segment with offset
                             currentSegID += 1;

                            var segAfter  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, (deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 + effectedSegmentOfDeleteStart.offset),    deleteStartIndex, (effectedSegmentOfDeleteStart.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from start to somewhere in the middle within a segment when permanentFlag is true", false);                               

                            segArray.insert(segAfter, (deleteStartSegmentLocation) );

                            // delete the whole segment
                            segArray.delete( (deleteStartSegmentLocation + 1 ), (deleteStartSegmentLocation+1));

                            // updates all the following segments
                            for (var i = (deleteStartSegmentLocation+1); i <= (segArray.length-1); i++){
                            	segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            	segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            }
                        }
                    }
                    else if(deleteStartIndex > effectedSegmentOfDeleteStart.sindex && deleteEndIndex === effectedSegmentOfDeleteStart.eindex){

						var strBeforeDelete = effectedSegmentOfDeleteStart.segStr.substring(0, (deleteStartIndex - effectedSegmentOfDeleteStart.sindex)); // = substring(0,end-1)
						
						if (effectedSegmentOfDeleteStart.permanentFlag === true) {

				    		// create two new segments, one with offset 0, another with offeset 
				    		 currentSegID += 1;

				    		var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, 0,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete from middle to the end within a segment when permanentFlag is true", false);

				    		segArray.insert(segBefore, deleteStartSegmentLocation);
				    		
				    		// delete the old segment from current revision
				    		segArray.delete( (deleteStartSegmentLocation+1), (deleteStartSegmentLocation + 1 ));

				    		// updates all the following segments
				    		for (var i = (deleteStartSegmentLocation+1); i <= (segArray.length-1); i++){
				    			segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    			segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    		}
				    	}
				    	else {
                            // create two new segments, one with offset 0, another with offeset 
                             currentSegID += 1;

                            var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, effectedSegmentOfDeleteStart.offset,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete from middle to the end within a segment when permanentFlag is true", false);

                            segArray.insert(segBefore, deleteStartSegmentLocation);
                            
                            // delete the old segment from current revision
                            segArray.delete( (deleteStartSegmentLocation+1), (deleteStartSegmentLocation + 1 ));

                            // updates all the following segments
                            for (var i = (deleteStartSegmentLocation+1); i <= (segArray.length-1); i++){
                            	segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            	segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            }
                        }
                    }
                    else if (deleteStartIndex === effectedSegmentOfDeleteStart.sindex && deleteEndIndex === effectedSegmentOfDeleteStart.eindex){
                    	segArray.delete(deleteStartSegmentLocation, deleteStartSegmentLocation);
        				// updates all the following segments
        				for (var i = deleteStartSegmentLocation; i <= (segArray.length-1); i++){
        					segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
        					segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
        				}
        			}
        			else {
        				console.log("shouldn't happen in buildSegmentsWhenDelete, deleteStartSegmentLocation === deleteEndSegmentLocation");
        			}
        		}
        		// not within one segment, across multiple segments
        		else {
                    // self edit v.s. other edit
                    var selfEditCount = 0;
                    var otherEditCount = 0;

                    for (var i = (deleteStartSegmentLocation + 1); i<= deleteEndSegmentLocation-1; i++){
                    	if (segArray[i].authorId === authorId){
                    		selfEditCount += segArray[i].eindex - segArray[i].sindex + 1;
                    	}
                        else if (segArray[i].authorId != authorId)
                        {
                            otherEditCount += segArray[i].eindex - segArray[i].sindex + 1;
                        }
                    }

                    if (effectedSegmentOfDeleteStart.authorId === authorId){
                    	 adjustStatisticData(authorId, "self", (selfEditCount + effectedSegmentOfDeleteStart.eindex - deleteStartIndex + 1),list );    
                    	 adjustStatisticData(authorId, "other", otherEditCount , list);
                         addlink(effectedSegmentOfDeleteStart.authorId, authorId, otherEditCount, relation);    
                    }
                    else
                    {
                    	 adjustStatisticData(authorId, "self", (effectedSegmentOfDeleteStart.eindex - deleteStartIndex + 1) , list);    
                    	 adjustStatisticData(authorId, "other", (otherEditCount + effectedSegmentOfDeleteStart.eindex - deleteStartIndex + 1),list );
                         addlink(effectedSegmentOfDeleteStart.authorId, authorId, (otherEditCount + effectedSegmentOfDeleteStart.eindex - deleteStartIndex + 1), relation);    
                    }
                    
                    if (effectedSegmentOfDeleteEnd.authorId != authorId)
                    {
                    	addlink(effectedSegmentOfDeleteEnd.authorId, authorId, (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1),relation);
                        adjustStatisticData(authorId, "other", (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1),list);    
                    }
                    else if (effectedSegmentOfDeleteEnd.authorId === authorId)
                    {
                        adjustStatisticData(authorId, "self", (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1),list); 
                    }



                    if(deleteStartIndex > effectedSegmentOfDeleteStart.sindex && deleteEndIndex < effectedSegmentOfDeleteEnd.eindex){
						var strBeforeDelete = effectedSegmentOfDeleteStart.segStr.substring(0, (deleteStartIndex - effectedSegmentOfDeleteStart.sindex)); // = substring(0,end-1)
						var strAfterDelete = effectedSegmentOfDeleteEnd.segStr.substring(deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1); 

						if (effectedSegmentOfDeleteStart.permanentFlag === true) {
				    		// create a new segment, one with offset 0, another with offeset 
				    		 currentSegID += 1;
				    		var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, 0,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete in the middle across many segments when permanentFlag is true", false);
				    		segArray.insert(segBefore, deleteStartSegmentLocation);
				    		// delete the old segment from current revision
				    		segArray.delete((deleteStartSegmentLocation + 1), (deleteStartSegmentLocation + 1));

				    	}
				    	else {
                            // create a new segment, one with offset 0, another with offeset 
                             currentSegID += 1;
                            var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, effectedSegmentOfDeleteStart.offset,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete in the middle across many segments when permanentFlag is true", false);
                            segArray.insert(segBefore, deleteStartSegmentLocation);
                            // delete the old segment from current revision
                            segArray.delete((deleteStartSegmentLocation + 1), (deleteStartSegmentLocation + 1));
                        }

                        if (effectedSegmentOfDeleteEnd.permanentFlag === true) {
				    		// create a new segment with offset
				    		 currentSegID += 1;
				    		var segAfter  =  constructSegment(effectedSegmentOfDeleteEnd.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteEnd.segID, (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1),    deleteStartIndex, (effectedSegmentOfDeleteEnd.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from the beginning of a segment to the middle of any segment across when permanentFlag is true", false);
				    		segArray.insert(segAfter, deleteEndSegmentLocation );
				    		// delete the old segment from current revision
				    		segArray.delete( (deleteEndSegmentLocation + 1), (deleteEndSegmentLocation+ 1 ));
				    	}
				    	else {
                            // create a new segment with offset
                             currentSegID += 1;
                            var segAfter  =  constructSegment(effectedSegmentOfDeleteEnd.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteEnd.parentSegID, (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1 + effectedSegmentOfDeleteEnd.offset),    deleteStartIndex, (effectedSegmentOfDeleteEnd.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from the beginning of a segment to the middle of any segment across when permanentFlag is true", false);
                            segArray.insert(segAfter, deleteEndSegmentLocation );
                            // delete the old segment from current revision
                            segArray.delete( (deleteEndSegmentLocation + 1), (deleteEndSegmentLocation+ 1 ));
                        }

						// updates all the following segments
						for (var i = (deleteEndSegmentLocation+1); i <= (segArray.length-1); i++){
							segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
							segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
						}

						if (deleteEndSegmentLocation === (deleteStartSegmentLocation+1)){
						}
						else{
							segArray.delete( (deleteStartSegmentLocation+1), (deleteEndSegmentLocation-1));
						}
					}

					else if (deleteStartIndex === effectedSegmentOfDeleteStart.sindex && deleteEndIndex < effectedSegmentOfDeleteEnd.eindex){

						var strAfterDelete = effectedSegmentOfDeleteEnd.segStr.substring(deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1 );

						if (effectedSegmentOfDeleteEnd.permanentFlag === true) {
				    		// create a new segment with offset
				    		 currentSegID += 1;
				    		var segAfter  =  constructSegment(effectedSegmentOfDeleteEnd.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteEnd.segID, (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1),    deleteStartIndex, (effectedSegmentOfDeleteEnd.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from the beginning of a segment to the middle of any segment across when permanentFlag is true", false);
				    		segArray.insert(segAfter, deleteEndSegmentLocation );
				    		// delete the old segment from current revision
				    		segArray.delete( (deleteEndSegmentLocation + 1), (deleteEndSegmentLocation + 1 ));
				    	}
				    	else {
                            // create a new segment with offset
                             currentSegID += 1;
                            var segAfter  =  constructSegment(effectedSegmentOfDeleteEnd.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteEnd.parentSegID, (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1 + effectedSegmentOfDeleteEnd.offset),    deleteStartIndex, (effectedSegmentOfDeleteEnd.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from the beginning of a segment to the middle of any segment across when permanentFlag is true", false);
                            segArray.insert(segAfter, deleteEndSegmentLocation );
                            // delete the old segment from current revision
                            segArray.delete( (deleteEndSegmentLocation + 1), (deleteEndSegmentLocation + 1 ));
                        }

						// updates all the following segments
						for (var i = (deleteEndSegmentLocation+1); i <= (segArray.length-1); i++){
							segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
							segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
						}
						segArray.delete( deleteStartSegmentLocation, (deleteEndSegmentLocation-1));
					}
					else if (deleteStartIndex > effectedSegmentOfDeleteStart.sindex && deleteEndIndex === effectedSegmentOfDeleteEnd.eindex){
						var strBeforeDelete = effectedSegmentOfDeleteStart.segStr.substring(0, (deleteStartIndex - effectedSegmentOfDeleteStart.sindex)); // = substring(0,end-1)
						if (effectedSegmentOfDeleteStart.permanentFlag === true) {

				    		// create a new segment, one with offset 0, another with offeset 
				    		 currentSegID += 1;
				    		var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, 0,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete from middle of a segment to the end of any segment across when permanentFlag is true", false);
				    		segArray.insert(segBefore, deleteStartSegmentLocation);
				    		// delete the old segment from current revision
				    		segArray.delete( (deleteStartSegmentLocation + 1), (deleteStartSegmentLocation + 1));
				    	}
				    	else {
                            // create a new segment, one with offset 0, another with offeset 
                             currentSegID += 1;
                            var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, effectedSegmentOfDeleteStart.offset,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete from middle of a segment to the end of any segment across when permanentFlag is true", false);
                            segArray.insert(segBefore, deleteStartSegmentLocation);
                            // delete the old segment from current revision
                            segArray.delete( (deleteStartSegmentLocation + 1), (deleteStartSegmentLocation + 1));
                        }

						// updates all the following segments
						for (var i = (deleteEndSegmentLocation+1); i <= (segArray.length-1); i++){
							segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
							segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
						}
						segArray.delete((deleteStartSegmentLocation+1), deleteEndSegmentLocation);
					}
					else if (deleteStartIndex === effectedSegmentOfDeleteStart.sindex && deleteEndIndex === effectedSegmentOfDeleteEnd.eindex){

						// updates all the following segments
						for (var i = (deleteEndSegmentLocation+1); i <= (segArray.length-1); i++){
							segArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
							segArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
						}
						segArray.delete( (deleteStartSegmentLocation), (deleteEndSegmentLocation));
					}
					else {
						console.log("This should never happen, segArray is null,  buildSegmentsWhenDelete");
					}
				}
			}
			else{
				console.log("This should never happen, segArray is null,  buildSegmentsWhenDelete when deleteStartIndex === deleteEndIndex");
			}
		}
		return segArray;
	}