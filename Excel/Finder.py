import pandas
from xlwt import Workbook

emails = {"Sarah Fritz ", "Sophie D'Souza", "Andrea Longfellow", "andrea.longfellow@hbdi.com", "Andrew Swerlick", "andrew.swerlick@hbdi.com", "Ann Herrmann-Nehdi", "ann.hermann@hbdi.com",	"Ann Maxey", "ann.maxey@hbdi.com", "Anne Griswold", "anne.griswold@hbdi.com", "Ashley Baker", "ashley.baker@hbdi.com", "Bethany Epley", "bethany.epley@hbdi.com", "Bethany Fields", "bethany.fields@hbdi.com", "Betsy Summers", "betsy.summers@hbdi.com", "Bowman", "bowman@hbdi.com", "Brenda Reuter", "brenda.reuter@hbdi.com", "Cheryl Lawler", "cheryl@hbdi.com", "Christina Kaputsos", "christina.kaputsos@hbdi.com",	"Daniel Stanhope", "daniel.stanhope@hbdi.com",	"Dominic Coletto", "dominic.coletto@hbdi.com",	"Donna Martin", "Donna@hbdi.com", "Dorothy Roche", "dorothy@hbdi.com", "Emily Sims", "emily@hbdi.com", "Jacob Helman", "jacob.helman@hbdi.com", "Jeanne Hilley", "jeanne@hbdi.com",	"Jeff Easley", "jeff.easley@hbdi.com",	"Jennifer Lyons", "jennifer@hbdi.com", "Jessica McFarland", "jessica.mcfarland@hbdi.com", "Joe Chronister", "joe.chronister@hbdi.com", "joe@hbdi.com", "John Graves", "john.graves@hbdi.com", "John Tompkins", "john.tompkins@hbdi.com", "Jorge Alvarez", "jorge.alvarez@hbdi.com", "Karim Nehdi", "karim.nehdi@hbdi.com", "Kevin Sensenig", "kevin.sensenig@hbdi.com", "Kim Zappel", "kim@hbdi.com", "Laura Wang", "laura.wang@hbdi.com", "Leslie Flack", "leslie@hbdi.com", "linda@hbdi.com", "mac@hbdi.com", "Maria Lickert", "maria@hbdi.com", "Naomi Morton", "naomi.morton@hbdi.com", "nehdi@hbdi.com", "orin@hbdi.com", "Patt Herrmann", "patt.hermann@hbdi.com", "Paul", "paul@hbdi.com", "Quinton Arledge", "quinton.arledge@hbdi.com", "Randijo", "randijo@hbdi.com", "Rebecca Moses", "rebecca.moses@hbdi.com", "Sarah Fritz", "sarah.fritz@hbdi.com", "Shawna Hughes", "shawna.hughes@hbdi.com", "suzanne@hbdi.com", "Tina Chan", "tina.chan@hbdi.com", "Toni Merck", "toni.merck@hbdi.com", "Val Diamante", "val.diamante@hbdi.com", "Victoria Lincoln", "victoria@hbdi.com", "Virginia Demoss", "virginia.demoss@hbdi.com", "Virlina Choquette", "virlina.choquette@hbdi.co.uk", "wende@hbdi.com", "Yosuke Carter", "yosuke.carter@hbdi.com", "Zechariah Boyd", "zechariah.boyd@hbdi.com", "annherrmann@hbdi.co.uk", "ANN.HERRMANN-NEHDI@hbdi.com", "ann@hbdi.com", "ashley@hbdi.com",	"donna.s@hbdi.com",	"Dorothy.Roche@hbdi.com", "emily.sims@hbdi.com", "jenniferuk@hbdi.com", "jennifer.lyons@hbdi.com", "jt.tompkins@hbdi.com", "karim.nehdi@hbdi.co.uk", "leslie.flack@hbdi.com", "Orin Salas", "orin.salas@hbdi.com", "paul.fairchild@hbdi.com", "beckie.moses@hbdi.com", "shawna@hbdi.com", "Victoria.lincoln@hbdi.co.uk", "victoria.lincoln@hbdi.com", "virlina@hbdi.com", "virlina.choquette@hbdi.com"}


names = ['Sarah-Fritz', 'Bowman-Kelly', 'Brenda-Reuter', 'Christina-Kaputsos', 'Dali', 'Jeff-Easley', 'Jennifer', 'Jenny-Powell', 'Kim-Zappel', 'Shanna-Leli', 'Sophie-Dsouza', 'Sue-Farmer', 'Val-Diamante', 'Victoria-Lincoln', 'Yoskue-Carter']
for name in names:
    wb = Workbook()
    sheet1 = wb.add_sheet('Sheet 1')

    df = pandas.read_excel(name + '-Select-Archives.xls', sheet_name='Sheet 1')

    rowNum = 0
    for row in range(df.shape[0]):
        for email in emails:
            if df.loc[row][1] == email:
                sheet1.write(rowNum, 0, df.loc[row][1])
                sheet1.write(rowNum, 1, df.loc[row][2])
                rowNum += 1
                print('Anotha one!')
                wb.save(name + '-Targets.xls')

    print('Done!')