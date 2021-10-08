import shutil
import csv, json

csvfile = 'Airbnb.csv'
jsonfil= 'Airbnb.json'

#reading csv and adding data to dictionnary
data = {}
with open(csvfile, encoding='UTF8') as file : 
    csvReader = csv.DictReader(file)
    for csvRow in csvReader :
        host_name = csvRow['host_name']
        data[host_name] = csvRow

#write the json file
with open('jsonfil', 'w') as jsonfile :
    jsonfile.write(json.dumps(data, indent=4))