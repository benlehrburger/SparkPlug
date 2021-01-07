from libratom.lib.pff import PffArchive
from pathlib import Path
from xlwt import Workbook
import re

archive = PffArchive("Sample.pst")
eml_out = Path(Path.cwd() / "pstFiles")

if not eml_out.exists():
    eml_out.mkdir()

wb = Workbook()
sheet1 = wb.add_sheet('Sheet 1')

row = 0
subject_col = 0
sender_col = 1
body_col = 2
email_col = 3

print("Writing messages to .eml")
for folder in archive.folders():
    if folder.get_number_of_sub_messages() != 0:
        for message in folder.sub_messages:
            if message.subject and message and message.plain_text_body is not None and len(message.plain_text_body.decode()) < 32767:
                name = message.subject.replace(" ", "_")
                name = name.replace("/", "-")
                filename = eml_out / f"{message.identifier}_{name}.eml"
                filename.write_text(archive.format_message(message))

                body = message.plain_text_body.decode()
                sender = message.sender_name
                subject = message.subject

                def write_to_excel(row_num, email_sender, body_content):
                    sheet1.write(row_num, subject_col, subject)
                    sheet1.write(row_num, sender_col, email_sender)
                    sheet1.write(row_num, body_col, body_content)

                def get_herrmann_email(text, row_num):
                    if "@think.herrmann.com" or "@hbdi.com" in text:
                        new_emails = re.findall(r'[\w\.-]+@think.herrmann.com', text)
                        old_emails = re.findall(r'[\w\.-]+@hbdi.com', text)
                        uk_emails = re.findall(r'[\w\.-]+@hbdi.co.uk', text)
                        emails = str(set(old_emails + new_emails + uk_emails)).replace('{', '').replace('}', '').replace('\'', '')
                        if emails != 'set()':
                            sheet1.write(row_num, email_col, emails)
                    else:
                        return None

                if "From:" in body:
                    sub_messages = body.split("From: ")
                    write_to_excel(row, sender, sub_messages[0])
                    get_herrmann_email(sub_messages[0], row)
                    del sub_messages[0]
                    row += 1
                    print(row)

                    for i in sub_messages:
                        idx = min(i.index('\r'), i.index('\n'))
                        sender_str = i[0:idx]
                        if '<' in sender_str:
                            aliases = sender_str.split('<')
                            new_sender = aliases[0]
                        elif '[' in sender_str:
                            aliases = sender_str.split('[')
                            new_sender = aliases[0]
                        else:
                            new_sender = i[0:idx]
                        sub_message = i.rstrip()
                        sub_message = "From: " + sub_message
                        get_herrmann_email(sub_message, row)
                        write_to_excel(row, new_sender, sub_message)
                        row += 1
                        print(row)
                else:
                    write_to_excel(row, sender, body)
                    row += 1
                    print(row)

                wb.save('Sample-Full-Archive.xls')

print("Done!")
