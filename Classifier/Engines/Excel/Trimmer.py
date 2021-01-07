import xlrd


loc = ("Training-Array.xls")

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)

limit = 999

for col in range(sheet.ncols):
    for row in range(sheet.nrows):
        if len(sheet.cell_value(row, col)) > limit:
            print("Row: " + str(row))
            print("Col: " + str(col))
            print(sheet.cell_value(row, col) + '\n' + '-------------------')

print('Done!')
